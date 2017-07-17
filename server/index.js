const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var massive = require('massive');
var session = require('express-session');
var config = require('./config.js');

const app = module.exports = express();

app.use(bodyParser.json());
app.use(session({
  secret: config.secret,
    resave: true,
    saveUninitialized: false,
    cookie:{
      maxAge: (1000*60*60*24*14) //this is 14 days
    }
}))

massive(config.connection)
.then( db => {
  app.set('db', db);
})

app.use(express.static(__dirname + './../build'))

var userController = require("./userController.js");

//////////Endpoints for the front end

// app.get('/api/', userController.function);
// app.get('/api/', userController.function);
// app.get('/api/', userController.function);
// app.get('/api/', userController.function);
// app.get('/api/', userController.function);
// app.get('/api/', userController.function);
// app.get('/api/', userController.function);

app.post('/api/books', userController.addBook);
app.post('/api/login', userController.login);


app.listen(config.port, console.log("you are now connected on " + config.port));
