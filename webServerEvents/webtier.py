from flask import Flask, render_template, Response, request, jsonify, make_response
from flask_sse import sse
from flask_cors import CORS
import requests
import time
from flask_login import LoginManager, UserMixin, current_user, login_required, logout_user, login_user

import base64

login_manager = LoginManager()
WEB_HOST_DATA_GENERATOR = "http://localhost:8080"
app = Flask(__name__)


# how to generate new secret key
# python -c 'import os; print(os.urandom(16))'
# TODO, ask question about it
app.secret_key = b'\x97\x19\xc4\x7f]9\xfc\xe8\xdb^\xc0qO \xdf\xb8'
login_manager.init_app(app)

def generate_token(template):
    template += template[::-1]
    res = base64.b64encode(template.encode('ascii'))
    return str(res, "utf-8")


class User(UserMixin):
    dict_of_users = {}

    def __init__(self, user_id):
        assert User.contains_id(user_id) is False, f"User id: {user_id} already exist"
        self.id = id
        User.dict_of_users[id] = self

    @staticmethod
    def contains_id(user_id):
        return user_id in User.dict_of_users

    @staticmethod
    def get_user_by_id(user_id):
        if user_id in User.dict_of_users:
            return User.dict_of_users[id]
        else:
            raise RuntimeError(f"there isn't the id: {user_id}")

    @staticmethod
    def remove_user(user_id):
        del User.dict_of_users[user_id]


def verify_existence_of_user(username, password):
    resp = requests.post(f"{WEB_HOST_DATA_GENERATOR}/verify-existence-of-user",
                         data={"username": username, "password": password})
    if resp.status_code == 200:
        resp_json = resp.json()
        if resp_json['user_exist']:
            return {"status_server_response": 200,
                    "user_exist": resp_json['user_exist'],
                    "user_id": resp_json["user_id"]}
        else:
            return {"status_server_response": 200,
                    "user_exist": False}
    else:
        return {"status_server_response": resp.status_code, "response": resp}


def verify_user_id(user_id):
    resp = requests.post(f"{WEB_HOST_DATA_GENERATOR}/verify-user-id")
    if resp.status_code == 200:
        return {"status_server_response": 200, "user_exist": resp.json()['user_exist']}
    else:
        return {"status_server_response": resp.status_code, "response": resp}


def request_historical_data_from_data_generator(date_begin, date_end):
    resp = requests.post(f"{WEB_HOST_DATA_GENERATOR}/historical-data", data={"date_begin" : date_begin, "date_end" : date_end})

    if resp.status_code == 200:
        return {"status_server_response": 200, "response": resp}
    else:
        return {"status_server_response": resp.status_code, "response": resp}
def request_average_buy_sell_per_instrument_from_data_generator(instrument, counterparty, date_begin, date_end):
    resp = requests.post(f"{WEB_HOST_DATA_GENERATOR}/average-buy-sell-per-instrument",
                         data={"instrument" : instrument, "counterparty" : counterparty,
                               "date_begin" : date_begin, "date_end" : date_end})

    print(resp.json())
    if resp.status_code == 200:
        return {"status_server_response": 200, "response" : resp.json()}
    else:
        return {"status_server_response": resp.status_code, "response" : resp.json()}





@login_manager.user_loader
def load_user(user_id):
    result_of_verifying = verify_user_id(user_id)
    if result_of_verifying['status_server_response'] == 200 and\
            result_of_verifying['user_exist'] and User.contains_id(user_id):
        return User.get_user_by_id(user_id)
    else:
        User.remove_user(user_id)
        return None


@app.route('/log-in', methods=['POST'])
def log_in():
    username = request.form['username']
    password = request.form['password']
    result_of_verifying = verify_existence_of_user(username, password)
    if result_of_verifying['status_server_response'] != 200:
        # TODO. send some information about a response of data-generate server for debug
        return make_response(({"success": False}, 500))
    user_exist = result_of_verifying['user_exist']
    if user_exist:
        user_id = result_of_verifying['user_id']
        user = User(user_id)
        login_user(user)
        token = generate_token(user_id)
        return make_response(({"success": True,
                                "token": token,
                                "user": user_id}, 200))
    else:
        return make_response({"success": False,
                              "text": "wrong username or password"}, 401)


@app.route('/log-out')
@login_required
def log_out():
    User.remove_user(current_user.user_id)
    logout_user()
    return make_response(({"success": True}, 200))



@app.route('/historical-data', methods = ['POST'])
def historical_data():

    date_begin = request.form['date_begin']
    date_end = request.form['date_end']

    result_of_request = request_historical_data_from_data_generator(date_begin, date_end)

    if(result_of_request['status_server_response' != 200]):
        make_response(({"success": False}, 500))

    return make_response(result_of_request)

@app.route('/average-buy-sell-per-instrument', methods = ['POST'])
def average_buy_sell_per_instrument():
    instrument = request.form['instrument']
    counterparty = request.form['counterparty']
    date_begin = request.form['date_begin']
    date_end = request.form['date_end']


    result_of_request = request_average_buy_sell_per_instrument_from_data_generator(instrument, counterparty, date_begin, date_end)

    return make_response(result_of_request['response'])


#app.register_blueprint(sse, url_prefix='/stream')
CORS(app)


@app.route('/deals')
def forwardStream():
    r = requests.get('http://localhost:8080/streamTest', stream=True)
    def eventStream():
            for line in r.iter_lines( chunk_size=1):
                if line:
                    yield 'data:{}\n\n'.format(line.decode())
    return Response(eventStream(), mimetype="text/event-stream")

@app.route('/client/testservice')
def client_to_server():
    r = requests.get('http://localhost:8080/testservice')
    return Response(r.iter_lines(chunk_size=1), mimetype="text/json")

@app.route('/')
@app.route('/index')
def index():
    return "webtier service points are running..."


def get_message():
    """this could be any function that blocks until data is ready"""
    time.sleep(1.0)
    s = time.ctime(time.time())
    return s

def bootapp():
    app.run(port=8090, threaded=True, host=('0.0.0.0'))

if __name__ == '__main__':
     bootapp()
