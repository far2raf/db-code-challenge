import mysql.connector
from RandomDealData import RandomDealData
import json
from Instrument import Instrument

db = mysql.connector.connect(host='localhost', database='db_grad_cs_1917', user='arina', password='1234')
cursor = db.cursor()
newUser = """INSERT INTO users  (user_id, user_pwd)
            VALUES ("Kaa" , "1234")"""
newReq = """ SELECT * FROM users  """
cursor.execute(newUser)
db.commit()

cursor.execute(newReq)
records = cursor.fetchall()
cursor.close()


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

if (db.is_connected()):
    db.close()
    print("ok")
