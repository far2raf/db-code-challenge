# db-code-challenge

---

## Frontend (React)

1. Move to front directory
```bash
cd front-db
```

2. Install dependencies
```bash
npm i
```

3. Run React server
```bash
npm start
```

4. Go to `localhost:3000`

5. Have fun!)

---
## run backend

you need running docker sql container with correct tables. 
Read about it in next section


## Create needed tables in sql
the same information you can find on 
https://deliveringtechnology2018.atlassian.net/wiki/spaces/CS2020 S/pages/1314128079/MySQL+ABCs
you need to do connection in "MYSQL Workbench" with parameters like:
hostname = 127.0.0.1
port = 3306
username = root
password = password

open file(path: Database\scriptsWithData) "scriptsWithData" in "MYSQL Workbench", tap on "lightning icon" (on russian 'молния')
tap on the update button located on the right of "SHEMAS", you can see tables like user(with login and password)

## sql docker
see all docker containers that you have. maybe you already have mysql container
```bash
docker ps -a  
```

following command
```bash
docker run  -p 3306:3306 --name mysql-server -e MYSQL_ROOT_PASSWORD=password -d mysql:latest
```

docker run - create new docker container. If you want create mysql again, you should do this.
```bash
dosker stop mysql-server
docker rm mysql-server
docker run ... line above ...
```

in 2 different console applications run commands (keep track for neccasary folders)
```python webServerEvents/webtier.py
python data-generator/main.py
```
you shouldnt see any error at this step.
 
## simple check working backend
go to the ```http://127.0.0.1:8080/``` in browser , you should see "Data Generator is running..." 
go to the ```http://127.0.0.1:8090/``` in browser, you should see "webtier service points are running..."

```bash
python webServerEvents/devr_equests.py
```

if you want make sure that the server is working, you should see:
```
{"success":true}
 200
``` 
if you point correct login and password or:
```
{"success":false,"text":"wrong username or password"}
 401
 ```
 if not.
 
 for first time running ```dev_requests``` without any changes you shoul see ```401``` and after it ```200``` code.
 
