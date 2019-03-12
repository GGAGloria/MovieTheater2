var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');



//Database
var db = require('mongoose');
db.connect('mongodb://localhost/cinema', (err) => {
  if (err)
    console.log("MongoDB connection error: "+err);
  else
console.log("Connected to MongoDB");
});

//set the schema
var schema = new db.Schema({
  UserId: String,
  PW: String,
  FilmName: String,
  Comment: String
});
//Create my model
var User = db.model("User", schema);

//set the schema
var schema = new db.Schema({
  FilmName: String,
  Duration: String,
  Category: String,
  Language: String,
  Director: String,
  BroadcastId: Number,
  Dates: String,
  Time: String,
  day: String,
  HouseID: String,
  HouseRow: String,
  HouseCol: String
});
//Create my model
var Film = db.model("Film", schema);

//set the schema
var schema = new db.Schema({
  SeatNo: String,
  BroadcastId: Number,
  Valid: String, 
  UserId: String, 
  TicketType: String, 
  TicketFee: String
});
//Create my model
var Ticket = db.model("Ticket", schema);

var router = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('./views'));



// Make our model accessible to routers 
app.use(function(req,res,next) {
  req.User = User; 
  req.Film = Film;
  req.Ticket = Ticket;
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: "thisismysecret", saveUninitialized: true, resave: false}));

app.use('/', router);


app.listen(3000);

console.log("Running at Port 3000");

