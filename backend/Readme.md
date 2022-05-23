# Backend Framework

This is the backend development framework.

## How to Set Up

The following software should be installed and accessible from the command line.
* docker
* docker-compose
* mongosh

You need connection to 
* *Docker Hub* for downloading docker images
* *npm Registry* for installing dependencies.

This project consist of three components:
1. A simple, illustrative web app.
2. MongoDB, the database.
3. Mongo-Express, an official web-based MongoDB admin interface.

All of the following command are run at the `backend` directory.

The following command starts all of them at once.

``` bash
docker-compose up
```

Now open `http://localhost:8081`. If everything goes well, you will see a beautiful webpage -- the Mongo Express, the
web-based MongoDB interface.

**Important**: If everything goes well, you will start to see "MongoServerError: Authentication failed." coming up
from the command line. **This is an expected behavior**, because the user we use to access the database has not been created.

We will create the user with `mongosh`.

``` bash
bash >> mongosh admin -u root -p example

admin> use test
switched to db test
test> db.createUser({ user: "ReadWriter", pwd: "ReadWriter", roles: ["readWrite"] });
{ ok: 1 }
```

(Ctrl-D to exit mongosh)

If it goes well, you should find that "MongoServerError" has stopped comming up and there is a
message "MongoDB connection established." Otherwise, try to restart the project by 
first stop the containers with Ctrl+C and then start them with `docker-compose up`. 

Now everything is set up.

## How to Use

The current illustrative backend provides a simple key-val pair storage service. 

The available HTTP APIs are:
* `http://localhost:3018/getall` : Get all the key-val pairs
* `http://localhost:3018/insert?key=hello&val=5` : Inserts the pair `("hello", "5")` 
* `http://localhost:3018/get?key=hello` : Get the key-value pair whose key is `"hello"`.

## Explanation of the Code

In the following discussions, `.` refers to the backend root directory, that is, where the backend `package.json` locates.

We use [Express](https://expressjs.com/) as our backend framework.

The entry point: `./bin/www`. Generally, we don't need to modify this.

The three most important components are
* `./app.js` : define our Web App.
* `./routes/<filename>.js` : define the operations for each specific routes.
* `./models/<model-name>.js` : define the database schema and exports the model (a model is a compiled schema).

Resources
* [Mongoose](https://mongoosejs.com/) : our *Object-Document Mapper (ODM)*, that is, the abstraction between NodeJS and MongoDB.
* [Express 4 API Reference](https://expressjs.com/en/4x/api.html) : API reference for our backend framework.