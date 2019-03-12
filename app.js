var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Database
var db = require('mongoose');
db.connect('mongodb://localhost/cinema', (err) => {
  if (err)
    console.log("MongoDB connection error: "+err);
  else
console.log("Connected to MongoDB");
});

//Set the Schema
var FilmSchema = new db.Schema({
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

var UserSchema = new db.Schema({
  UserId: String,
  PW: String,
  FilmName: String,
  Comment: String
});

var TicketSchema = new db.Schema({
  SeatNo: String,
  BroadcastId: Number,
  Valid: String, 
  UserId: String, 
  TicketType: String, 
  TicketFee: String
})

//Create my model
var Film = db.model("Film", FilmSchema, "Film");
var User = db.model("User", UserSchema, "User");
var Ticket = db.model("Ticket", TicketSchema, "Ticket");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/',function(req,res){
  res.sendFile(path('./public/html/index.html'));
  //__dirname : It will resolve to your project folder.
});

// Make our model accessible to routers 
app.use(function(req,res,next) {
  req.film = Film;
  req.user = User;
  req.ticket = Ticket; 
  next();
});

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
