const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const port = 3001;
const controllerUser = require('./controller/user.js');
const userMiddle = require('./middlewares/usersMiddlewares.js');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'hello-server';
 
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    app.use((req, res, next) => {  //global middlewares
        req.db = db;
        next();
    });
    app.post('/api/v1/users', userMiddle.creatUser, controllerUser.addUser);
    app.delete('/api/v1/users/:id', userMiddle.deleteUser, controllerUser.deleteUser);
    app.get('/api/v1/users', controllerUser.getListUser);
    app.get('/api/v1/users/:id', userMiddle.getUser, controllerUser.getUser);
    app.put('/api/v1/users/:id',userMiddle.updateUser, controllerUser.updateUser);
    app.use(function (err, req, res, next) {
        console.log(err);
        return res.json({
            message: err.message || 'have error'
        });
    });
});




app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});