var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server, {path: '/mypath'});
var mongo = require('socket.io-adapter-mongo');
io.adapter(mongo({ host: 'localhost', port: 27017, db: 'mubsub' }));

server.listen(8000);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
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


