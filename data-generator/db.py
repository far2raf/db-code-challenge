import mysql.connector

db = mysql.connector.connect(host='localhost', database='db_grad_cs_1917', user='arina', password='1234')
cursor = db.cursor()
newUser = """INSERT INTO users  (user_id, user_pwd)  
            VALUES ("Katya" , "1234")"""
newReq = """ SELECT * FROM users  """
cursor.execute(newUser)
db.commit()

cursor.execute(newReq)
records = cursor.fetchall()
print(records)
cursor.close()

if (db.is_connected()):
    db.close()
    print("ok")
