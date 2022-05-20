'use strict';
// import necessary modules
const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000; 
const INDEX = __dirname + '/index.html'; // INDEX represents the HTML page
const server = express(); // initalizing the express library

server.get('/', (req,res)=>{ // name, function
    res.sendFile(INDEX); // respond by sending INDEX file
});

server.use(express.static('public')); // ??? 
const listener = server.listen(PORT, ()=>console.log(`Listening on ${PORT}`)); // starts listening
const io = socketIO(listener, {
    pingTimeout: 120000 // converting "listening" to socket io
});

var piecePositions = [];
for(let i = 0; i < 20; i++){
    piecePositions.push([600*Math.random(), 600*Math.random()]);
}
io.on('connection', (socket)=>{ // any functions we want to listen for go in here
    socket.emit('placePieces', piecePositions);
});


