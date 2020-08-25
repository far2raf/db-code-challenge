from datetime import datetime

import requests
import mysql.connector
from RandomDealData import RandomDealData
import json


HOST = 'localhost'
DB = 'db_grad_cs_1917'
USER = 'root'
PSW = 'password'


def get_generator_with_data():

    r = requests.get('http://localhost:8080/streamTest/sse', stream=True)

    def eventStream():
        for line in r.iter_lines( chunk_size=1):
            if line:
                yield line.decode()

    return eventStream()


def get_generator_with_deals():

    r = requests.get('http://localhost:8090/deals', stream=True)

    def eventStream():
        for line in r.iter_lines( chunk_size=1):
            if line:
                yield line.decode()

    return eventStream()

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

if __name__ == "__main__":
    # generator = get_generator_with_data()
    # print("print one element from stream: ", next(generator))
    # print("print list elements from stream: ", [next(generator) for i in range(3)])
    #
    # generator = get_generator_with_deals()
    # print("print one element from stream: ", next(generator))
    # print("print list elements from stream: ", [next(generator) for i in range(3)])
    for element in get_generator_with_deals():
        #print(element[5:])
        print(json.loads(element[5:]))
        dealData = json.loads(element[5:])
        print(dealData)
        instrument_name = dealData["instrumentName"]
        cpty = dealData["cpty"]
        price = dealData["price"]
        types = dealData["type"]
        quantity = dealData["quantity"]
        time = dealData["time"]
        date_time = datetime.strptime(time, '%d-%b-%Y (%H:%M:%S.%f)')
        #print(date_time)
        add_new_data_in_db(instrument_name, cpty, price, types, quantity, date_time)
        #print(add_new_data_in_db(instrument_name,cpty,price,types,quantity,date_time))