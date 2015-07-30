var app = require('express')();
var server = require('http').Server(app);
var mongo = require('socket.io-adapter-mongo');
var io = require('socket.io')(server, {path: '/mypath'});
io.adapter(mongo({ host: 'localhost', port: 27017, db: 'mubsub' }));

//var io = require('socket.io')(server);

console.log(io.of('chat'));

server.listen(8000);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index1.html');
});

//io.on('connection', function (socket) {
//    //io.emit('this', { will: 'be received by everyone'});
//    socket.broadcast.emit('this', { will: 'be received by everyone'});
//});

io.of('mynamespace').on('connection', function (socket) {
    //io.emit('this', { will: 'be received by everyone'});
    //socket.broadcast.emit('this', { will: 'be received by everyone'});

    socket.join('aRoom');

    io.of('mynamespace').in('aRoom').emit('this', {from: 'aRoom'});
});

var ids = [];
io.of('mynamespace').on('connection', function(socket){
    ids.push(socket.id);
    socket.on('say to someone', function(msg){
        ids.forEach(function(id) {
            if (id !== socket.id) {
                socket.broadcast.to(id).emit('my message', msg);
            }
        });

    });
});

console.log(io.sockets);

