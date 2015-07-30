var app = require('express')();
var http = require('http').Server(app);

var io = require('socket.io')(http);
var _ = require('lodash');

var whoisonline = [];

//io.on('connection', function(socket){
//    //console.log(arguments);
//    console.log('a user connected');
//    console.log(socket.handshake.query.name);
//
//    whoisonline.push(socket.handshake.query.name);
//
//    socket.broadcast.emit('connection', socket.handshake.query.name);
//    socket.emit('connection', whoisonline.join());
//
//    socket.on('disconnect', function(){
//        console.log('user disconnected');
//        socket.broadcast.emit('offline message', socket.handshake.query.name);
//
//        _.remove(whoisonline, function(value) {
//            return value === socket.handshake.query.name;
//        })
//    });
//
//    socket.on('chat message', function(msg){
//        console.log('message: ' + msg);
//        //io.emit('chat message', msg);
//        socket.broadcast.emit('chat message', socket.handshake.query.name + ': ' + msg);
//    });
//
//    socket.on('type message', function(msg){
//        console.log('message: ' + msg);
//        //io.emit('chat message', msg);
//        socket.broadcast.emit('chat message', socket.handshake.query.name + ' is typing');
//    });
//
//});


//var nsp = io.of('/my-namespace');
//nsp.on('connection', function(socket){
//    whoisonline.push(socket.handshake.query.name);
//
//    socket.broadcast.emit('connection', socket.handshake.query.name);
//    socket.emit('connection', whoisonline.join());
//});


var nsp = io.of('/my-namespace');
nsp.on('connection', function(socket){
    whoisonline.push(socket.handshake.query.name);
    socket.join('roomA');

    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        //socket.in('roomA').emit('chat message', socket.handshake.query.name + ': ' + msg);
        //socket.to('roomA').emit('chat message', socket.handshake.query.name + ': ' + msg);
        socket.to('roomA').broadcast.emit('chat message', socket.handshake.query.name + ': ' + msg);
    });
});


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});