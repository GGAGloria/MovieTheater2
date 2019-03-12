var express = require('express'); 
var router = express.Router();
var passport = require('passport');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/mydb';

/*
* Login Page
*/
router.get('/',function(req,res){
  res.sendFile(path.join(__dirname, '../views',('index.html')));
});

/*
* authentication
*/
router.post('/login', function(req, res) { 
    var userId = req.body.Username;
    var filter = {"UserID": userId};
    MongoClient.connect(url, function(err, client) {
      var db = client.db('cinema');
      db.collection('User').findOne(filter,function(err, result){
        if (result === null)
            res.end("Login invalid");
        else if (result.UserID === userId && result.PW == req.body.Password){
            req.session.UserID = result.UserID;
            req.session.PW = result.PW;
            res.redirect("/main");
        } else {
            console.log("Credentials wrong");
            res.redirect("/");
        }
    });
  });
});

router.post('/create', function(req,res){
  var userId = req.body.username;
  var password = req.body.password;
  var addUser = new req.User({
    'UserID': userId,
    'PW': password
  });
  MongoClient.connect(url, function(err, client) {
      var db = client.db('cinema');
      db.collection('User').insertOne(addUser,function(err,result){
        if (err == null){
          res.redirect("/");
        } else 
          res.send({msg:err});
      });    
  });
});

router.get('/main',function(req,res){
  if (req.session.UserID){
    res.sendFile(path.join(__dirname, '../views',('main.html')));
  } else {
    res.redirect("/login");
  }
});

router.get('/tobuywelcome',function(req,res){
  if (req.session.UserID){
    res.sendFile(path.join(__dirname, '../views',('buywelcome.html')));
  } else {
    res.redirect("/");
  }
});

router.get('/buywelcome',function(req,res){
    MongoClient.connect(url, function(err, client) {
      var db = client.db('cinema');
      db.collection("Film").find({}).toArray(function(err, result){
        if (err === null){
          res.send(result);
        }
        else 
          res.send({msg: err});
      });
    });
});

router.post('/seat', function(req,res){
  var bc = Number(req.body.broadcast);
  req.session.BroadCastId = bc;
  var filter = {BroadcastId: bc}; 
  var filter2 = {BroadCastId: bc};
  var Film = {};
  var Ticket = [];
  MongoClient.connect(url, function(err, client) {
      var db = client.db('cinema');
      db.collection("Film").find(filter).toArray(function(err, result){
        if (err === null){
          Film = result;
        }
        else 
          res.send({msg: err});
      });
      db.collection("Ticket").find(filter2).toArray(function(err, result){
        if (err === null){
          Ticket = result;
          req.session.Film = Film;
          req.session.Ticket = Ticket;
          res.sendFile(path.join(__dirname, '../views',('seat.html')));
        }
        else 
          res.send({msg: err});
      });
  });
});

router.get('/seatInfo',function(req,res){
    res.send({"Film": req.session.Film, "Ticket":req.session.Ticket});
});

router.post('/buyticket',function(req,res){
    var seat = req.body.seat;
    // console.log(seat);
    req.session.seat = seat;
    // console.log(req.session.seat);
    res.sendFile(path.join(__dirname, '../views',('buyticket.html')));
});

router.get('/ticketinfo', function(req,res){
  MongoClient.connect(url, function(err, client) {
      var db = client.db('cinema');
      var Ticket = [];
      var seats = req.session.seat;
      res.send({"Film": req.session.Film, "Seat":seats});
  });
});

router.post('/confirm', function(req,res){
    var seats = req.session.seat;
    var tickets = [];
    for (var seat, i=0; seat = seats[i++];){
      var ticket = req.body[seat];
      console.log(ticket);
      tickets.push(ticket);
    }
    console.log(tickets);
    req.session.tickets = tickets;
    // console.log(req.session.seat);
    res.sendFile(path.join(__dirname, '../views',('confirm.html')));
});

router.get('/confirminfo', function(req,res){
  MongoClient.connect(url, function(err, client) {
      var db = client.db('cinema');
      var tickets = req.session.tickets;
      var Film = req.session.Film;
      res.send({"Film": req.session.Film, "tickets":tickets});
  });
});

router.post('/update', function(req,res){
  var SeatNo = req.body.SeatNo;
  var TicketType = req.body.TicketType;
  var TicketFee = req.body.TicketFee;
  var UserId = req.session.UserID;
  var BroadCastId = req.session.BroadCastId;
  var addTicket = new req.Ticket({
    'SeatNo': SeatNo,
    'BroadCastId': BroadCastId,
    'Valid': "Sold",
    'UserId': UserId,
    'TicketType': TicketType,
    'TicketFee': TicketFee
  });
  MongoClient.connect(url, function(err, client) {
      var db = client.db('cinema');
      db.collection('Ticket').insertOne(addTicket,function(err,result){
        if (err == null){
          res.send({msg:''});
        } else 
          res.send({msg:err});
      });    
  });
});

router.get('/tocomment',function(req,res){
  if (req.session.UserID){
    res.sendFile(path.join(__dirname, '../views',('comment.html')));
  } else {
    res.redirect("/");
  }
});

router.get('/comment',function(req,res){
  MongoClient.connect(url, function(err, client) {
      var db = client.db('cinema');
      db.collection("Film").find({}).project({"FilmName":1, "_id":0}).toArray(function(err, result){
        if (err === null){
          res.send(result);
        }
        else 
          res.send({msg: err});
      });
    });
});

router.post('/addComment',function(req,res){
  var FilmName = req.body.FilmName;
  var Comment = req.body.Comment;
  var UserID = req.session.UserID;
  var addComment = {
    'UserID': UserID,
    'FilmName': FilmName,
    'Comment': Comment
  };
  MongoClient.connect(url, function(err, client) {
      var db = client.db('cinema');
      db.collection('Comment').insertOne(addComment,function(err,result){
        if (err == null){
          res.send({msg:'success'});
        } else 
          res.send({msg:err});
      });    
  });
});

router.post('/showComment',function(req,res){
  var FilmName = req.body.FilmName;
  MongoClient.connect(url, function(err, client) {
      var db = client.db('cinema');
      db.collection("Comment").find({"FilmName": FilmName}).toArray(function(err, result){
        if (err === null){
          res.send(result);
        }
        else 
          res.send({msg: err});
      });
    });
});

router.get('/tohistory',function(req,res){
  if (req.session.UserID){
    res.sendFile(path.join(__dirname, '../views',('history.html')));
  } else {
    res.redirect("/");
  }
});

router.get('/history',function(req,res){
  var UserID = req.session.UserID;
  // console.log(UserID);
  MongoClient.connect(url, function(err, client) {
      var db = client.db('cinema');
      db.collection("Ticket").aggregate([
      {
        $match:{
          "UserId": UserID
        }
      },
      {
        $lookup:{
            from: "Film",
            localField : "BroadCastId",
            foreignField : "BroadcastId",
            as : "Film"
        }
      },
      {
        $unwind:"$Film"
      }
      ]).toArray(function(err, result){
        if (err === null){
          res.send(result);
        }
        else 
          res.send({msg: err});
      });
    });
});

router.get('/logout',function(req, res) { 
    req.session.destroy((err) =>{
      if (err)
        console.log("cannot access session");
    });
    res.redirect("/");
    return next();
});

module.exports = router;

