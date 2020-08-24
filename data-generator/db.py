import mysql.connector
from RandomDealData import RandomDealData
import json
from Instrument import Instrument
from cryptography.fernet import Fernet

HOST = 'localhost'
DB = 'db_grad_cs_1917'
USER = 'user'
PSW = 'password'

pass_key = Fernet.generate_key()
cliper = Fernet(pass_key)

def encript_pass(user_password):
    encripted_psd = cliper.encrypt(user_password)
    return encripted_psd

def decripted_pass(encripted_password):
    decripted_psd = cliper.decrypt(encripted_password)
    return decripted_psd

def add_new_user(user_name, password):
    cursor = None
    try:
        connection = mysql.connector.connect(host=HOST, database=DB, user=USER, password=PSW)
        cursor = connection.cursor()
        new_user = "INSERT INTO users  (user_id, user_pwd) VALUES (%s , %s)"
        values = (user_name, password)
        cursor.execute(new_user, values)
        connection.commit()
        cursor.close()
    except mysql.connector.Error as error:
        print("Failed to insert record into users table".format(error))
        cursor.close()
        return False
    return True


def check_password(user_name, password_from_user):
    cursor = None
    try:
        connection = mysql.connector.connect(host=HOST, database=DB, user=USER, password=PSW)
        cursor = connection.cursor()
        get_pwd = "SELECT user_pwd FROM users where user_id = %s"
        values = (user_name)
        cursor.execute(get_pwd, values)
        pwd = cursor.fetchall()
        cursor.close()
    except mysql.connector.Error as error:
        print("Error during connection to db".format(error))
        cursor.close()
        return False
    return pwd == password_from_user

def loadDealDatainDB():
    datObj = RandomDealData()
    instList = datObj.createInstrumentList()
    dealData = json.loads(datObj.createRandomData(instList))
    print(dealData)
    instrumentName = dealData["instrumentName"]
    cpty = dealData["cpty"]
    price = dealData["price"]
    types = dealData["type"]
    quantity = dealData["quantity"]
    time = dealData["time"]

def downloadDealDB(datBegin, datEnd):
    print("ok")