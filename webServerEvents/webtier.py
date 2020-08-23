from flask import Flask, render_template, Response, request, jsonify, make_response
from flask_sse import sse
from flask_cors import CORS
import requests
import time
from flask_login import LoginManager, UserMixin, current_user, login_required, logout_user, login_user

login_manager = LoginManager()

app = Flask(__name__)


# how to generate new secret key
# python -c 'import os; print(os.urandom(16))'
# TODO, ask question about it
app.secret_key = b'\x97\x19\xc4\x7f]9\xfc\xe8\xdb^\xc0qO \xdf\xb8'
login_manager.init_app(app)

# TODO, create local database
# db = SQLAlchemy(app)
# class User(UserMixin, db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(256), primary_key=True)


class User(UserMixin):

    def __init__(self, username):
        self.username = username

    def get_username(self):
        return self.username

    @staticmethod
    def contains_id(user_id):
        global mock_id
        if user_id == mock_id:
            return True
        else:
            return False

    @staticmethod
    def get_user_by_id(user_id):
        global mock_id
        if user_id == mock_id:
            return User.get_mock_user()
        else:
            raise RuntimeError(f"there isn't the id: {user_id}")

    @staticmethod
    def get_mock_user():
        global mock_user
        return mock_user

    @staticmethod
    def contains_username(username):
        global mock_username
        if username == mock_username:
            return True
        else:
            return False

    @staticmethod
    def get_user_by_username(username):
        global mock_username
        if username == mock_username:
            return User.get_mock_user()
        else:
            raise RuntimeError(f"User {mock_username} does not exist")

    def get_id(self):
        global mock_id
        return mock_id


# TODO, remove it
mock_username = 'Anton'
mock_password = "12345"
mock_id = "1"
mock_user = User(mock_username)


@login_manager.user_loader
def load_user(user_id):
    if User.contains_id(user_id):
        return User.get_user_by_id(user_id)
    else:
        return None


# TODO. change it to request to data generator
def verify_existence_of_user(username, password):
    global mock_username, mock_password
    return mock_username == username and mock_password == password


@app.route('/log-in', methods=['POST'])
def log_in():
    username = request.form['username']
    password = request.form['password']
    exist = verify_existence_of_user(username, password)
    if exist:
        return make_response(({"success": True}, 200))
    else:
        return make_response({"success": False,
                              "text": "wrong username or password"}, 401)


@app.route('/log-out')
def log_out():
    logout_user()
    return make_response(({"success": True}, 200))


@app.route('/dev/log-in')
def dev_log_in():
    global mock_username, mock_password
    username = mock_username
    password = mock_password
    user = User.get_mock_user()
    login_user(user)
    return "You are logged in"


@app.route('/dev/log-out')
@login_required
def dev_log_out():
    logout_user()
    return "You are logged out"


@app.route('/dev/get-username')
@login_required
def dev_get_username():
    return f"The current user is {current_user.username}"


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
