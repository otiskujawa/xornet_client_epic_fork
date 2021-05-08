import io from 'socket.io-client';

const socket = io('ws://localhost:8080', {reconnect: true});

socket.on('connection', function() {
    console.log("[MESSAGE WS] connected")
});

socket.on('disconnect', function() {
    console.log("[MESSAGE WS] DISCONNECTED")
    socket.connect();
});

export default socket;