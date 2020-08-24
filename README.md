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
in 2 different console applications run commands
```
python webServerEvents/webtier.py
python data-generator/main.py
``'
you need also running docker sql container with correct tables. 
Read about it in next section

## sql docker
the same information you can find on 
https://deliveringtechnology2018.atlassian.net/wiki/spaces/CS2020S/pages/1314128079/MySQL+ABCs

see all docker containers that you have. maybe you already have mysql container
```bash
docker ps -a  
```

```bash
docker run  -p 3306:3306 --name mysql-server -e MYSQL_ROOT_PASSWORD=ppp -d mysql:latest
```

docker run - create new docker container. If you want create mysql again, you should do this.

```bash
dosker stop mysql-server
docker rm mysql-server
docker run ... line above ...
```

## Create needed tables in sql
the same information you can find on 
https://deliveringtechnology2018.atlassian.net/wiki/spaces/CS2020S/pages/1314128079/MySQL+ABCs

open mysqlworkbench
connect to server with host = 127.0.0.1 , user=root, password=ppp
open script ./Database/scriptsWithData
run it press lightning


## simple check working backend

```bash
python webServerEvents/devrequests.py
```

you should receive:
```
{"success":false}
 401
{"success":true}
 200
```
