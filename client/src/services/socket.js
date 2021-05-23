import io from 'socket.io-client';

// TODO: turn this into a class with functions that can easily talk to the server

const socket = io('ws://backend.xornet.cloud', { 
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
