import mysql.connector
from RandomDealData import RandomDealData
import json
from Instrument import Instrument
from cryptography.fernet import Fernet

HOST = 'localhost'
DB = 'db_grad_cs_1917'
USER = 'root'
PSW = 'password'

pass_key = "0ArBlCVPGT5XaXZMNwks3d_S0Or2dpm9o69y1nz0mdk="
cliper = Fernet(pass_key)

def encript_pass(user_password):
    encripted_psd = str(cliper.encrypt(user_password.encode('utf-8')), 'utf-8')
    return encripted_psd

def decripted_pass(encripted_password):
    decripted_psd = cliper.decrypt(encripted_password.encode('utf-8'), 'utf-8')
    return  decripted_psd

def add_new_user(user_name, password):
    cursor = None
    try:
        connection = mysql.connector.connect(host=HOST, database=DB, user=USER, password=PSW)
        cursor = connection.cursor()
        new_user = "INSERT INTO users  (user_id, user_pwd) VALUES (%s , %s)"

        pas = encript_pass(password)
        print(pas)
        values = (user_name, pas)

        password = encript_pass(password)
        values = (user_name, password)
        cursor.execute(new_user, values)
        connection.commit()
        cursor.close()
    except mysql.connector.Error as error:
        print("Failed to insert record into users table".format(error))
        cursor.close()
        return False
    return True

pass_key = "0ArBlCVPGT5XaXZMNwks3d_S0Or2dpm9o69y1nz0mdk="
cliper = Fernet(pass_key)

def add_new_data_in_db(instrument_name, cpty, price, types, quantity, time):
    cursor = None
    try:
        connection = mysql.connector.connect(host=HOST, database=DB, user=USER, password=PSW)
        cursor = connection.cursor()

        sql = """SELECT counterparty_id from counterparty where counterparty_name = '%(cpty)s' """ % {"cpty": cpty}
        cursor.execute(sql)
        counterparty_id = cursor.fetchone()
        if counterparty_id[0] is None:
            sql = """SELECT max(counterparty_id) FROM counterparty """
            cursor.execute(sql)
            counterparty_id = cursor.fetchone()
            if counterparty_id[0] is None:
                id_cpty = 1
            else:
                id_cpty = counterparty_id[0] + 1
            sql = """Insert into counterparty(counterparty_id, counterparty_name, counterparty_status, counterparty_date_registrated ) values ('%(id)d','%(cpty)s', 'A', sysdate) """ % {"id": id_cpty, "cpty": cpty}
            cursor.execute(sql)
            connection.commit()
        else:
            id_cpty = counterparty_id[0]


        sql = """SELECT instrument_id from instrument where instrument_name = '%(in_name)s' """ % {"in_name": instrument_name }
        cursor.execute(sql)
        instrument_id = cursor.fetchone()
        if instrument_id[0] is None:
            sql = """SELECT max(instrument_id) FROM instrument """
            cursor.execute(sql)
            instrument_id = cursor.fetchone()
            if instrument_id[0] is None:
                id_inst = 1
            else:
                id_inst = instrument_id[0] + 1
            sql = """Insert into instrument(instrument_id, instrument_name) values ('%(id)d','%(in_name)s') """ % {"id": id_inst, "in_name": instrument_name}
            cursor.execute(sql)
            connection.commit()
        else:
            id_inst = instrument_id[0]
        sql = """SELECT max(deal_id) FROM deal """
        cursor.execute(sql)
        deal_id = cursor.fetchone()
        if deal_id[0] is None:
            id_deal = 1
        else:
            id_deal = deal_id[0] + 1
        sql = """Insert into deal (deal_id, deal_time, deal_counterparty_id, deal_instrument_id, deal_type, deal_amount, deal_quantity) values ('%(di)d','%(dt)s', '%(dci)d','%(dii)d', '%(dty)s','%(da)d', '%(dq)d') """ % {
            "di": id_deal, "dt": time, "dci": id_cpty, "dii": id_inst, "dty": types, "da": price, "dq": quantity}
        cursor.execute(sql)
        connection.commit()
        cursor.close()
    except mysql.connector.Error as error:
        print("Failed to insert record into users table")
        print(error)
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

def get_deal(datBegin, datEnd):
    cursor = None
    try:
        connection = mysql.connector.connect(host=HOST, database=DB, user=USER, password=PSW)
        cursor = connection.cursor()
        get_pwd = """Select instrument_name, deal_type, avg(deal_amount) from deal d
		                    inner join counterparty c on d.deal_counterparty_id = c.counterparty_id
                            inner join instrument i on i.instrument_id = d.deal_instrument_id
                     where '%(strDate)s' <= deal_time and '%(endDate)s' >= dealDate
                     group by instrument_name, deal_type"""
        cursor.execute(get_pwd)
        data = cursor.fetchall()
        print(data)
        cursor.close()
    except mysql.connector.Error as error:
        print("Error during connection to db".format(error))
        cursor.close()
        return
    return

#data:{"instrumentName": "Galactia", "cpty": "Lewis", "price": 9964.235074757127, "type": "S", "quantity": 71, "time": "11-Aug-2019 (12:07:06.471252)"}


add_new_data_in_db("Galactia", "Lewis", 9964.235074757127, "S", 71, "11-Aug-2019 (12:07:06.471252)")

#add_new_user("katya", '8989')
