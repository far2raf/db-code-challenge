from flask import Flask, Response
from flask_cors import CORS
import webServiceStream
from RandomDealData import *
import mysql.connector

HOST = 'localhost'
DB = 'db_grad_cs_1917'
USER = 'user'
PSW = 'password'

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return webServiceStream.index()


@app.route('/testservice')
def testservice():
    return webServiceStream.testservice()


@app.route('/streamTest')
def stream():
    return webServiceStream.stream()


@app.route('/streamTest/sse')
def sse_stream():
    return webServiceStream.sse_stream()


def bootapp():
    # global rdd
    # rdd = RandomDealData()
    # webServiceStream.bootServices()
    app.run(debug=True, port=8080, threaded=True, host=('0.0.0.0'))


def verify_existance_of_user_in_db(user_name, password_from_user):
    cursor = None
    try:
        connection = mysql.connector.connect(host=HOST, database=DB, user=USER, password=PSW)
        cursor = connection.cursor()
        get_pwd = "SELECT user_pwd FROM users where user_id = '%(un)s' """ % {"un": user_name}
        cursor.execute(get_pwd)
        pwd = cursor.fetchone()
        cursor.close()
        if pwd[0] == password_from_user:
            return {"user_exist": True, "user_id": user_name}
        else:
            return {"user_exist": False}
    except mysql.connector.Error as error:
        print("Error during connection to db".format(error))
        cursor.close()
        return {"user_exist": False}


def verify_user_id_in_db(user_name):
    cursor = None
    try:
        connection = mysql.connector.connect(host=HOST, database=DB, user=USER, password=PSW)
        cursor = connection.cursor()
        sql = """SELECT user_id FROM users where user_id = '%(un)s' """ % {"un": user_name}
        cursor.execute(sql)
        user_id = cursor.fetchone()
        cursor.close()
        if user_id is not None:
            return True
        else:
            return False
    except mysql.connector.Error as error:
        print("Error during connection to db".format(error))
        cursor.close()
        return False


if __name__ == "__main__":
    bootapp()
