import io from 'socket.io-client';

const socket = io('ws://localhost:8080', { 
    reconnect: true,
    auth: {
        type: 'client',
    },
});

socket.on('connect', function() {
    console.log("[MESSAGE WS] CONNECTED")
});

socket.on('disconnect', function() {
    console.log("[MESSAGE WS] DISCONNECTED")
});

export default socket;