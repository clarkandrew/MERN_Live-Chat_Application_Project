require('babel-register')({
    presets: ['react']
});

const express = require('express');
const mongoose = require('mongoose');

var React = require('react');
var ReactDOMServer = require('react-dom/server');

//var Component = require('./Component.jsx');
//var Component = require('./Component.jsx');
var path = require('path');
const app = express();
var public = __dirname + "/demo/";


mongoose.connect('mongodb://localhost/nodeApp');
let db = mongoose.connection;


// Start Server
app.listen(3000, function () {
    console.log('------------------------------');
    console.log('Server Started on Port 3000...');
});

// Check Mongo Connection
db.once('open', function () {
    console.log("Connected to Mongo Database...");
    console.log('------------------------------');
});

// Check for Mongo errors
db.on('error', function (err) {
    console.log(err);
});


// Bring in DB Models
let Message = require('./models/messages');


// Serve demo if demo dir called
app.get('/', function (req, res) {
app.use('/', express.static(public));
res.sendFile(path.join(public + "index.html"));
});

//Get Messages
app.get('/getMsgs', function (req, res) {
    Message.find({}, function (err, messages) {
        if (err) {
            console.log(err);
        } else {
            res.send(messages);
        }
    });
});


// clear database
app.get('/clearMsgs', function (req, res) {
Message.collection.drop();
    res.send("Messages Cleared");
});

//Send message
app.get('/sendMsg', function (req, res) {
    var query = require('url').parse(req.url,true).query;
    var from = query.from;
    var date = query.date;
    var body = query.body;

    
    var complete = Message({
        from: from,
        data: date,
        body: body
    });
    
    complete.save(function(err) {
        if(err){
            console.log(err);
            return;
        } else {
              res.send("MESSAGE SENT: <br> From: " + from + " | Date: " + date + " | Body: " + body);
        }
    });
    
});


