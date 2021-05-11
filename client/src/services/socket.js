import io from 'socket.io-client';

const socket = io('ws://backend.xornet.cloud', { reconnect: true });

socket.on('connect', function() {
    console.log("[MESSAGE WS] CONNECTED")
});

socket.on('disconnect', function() {
    console.log("[MESSAGE WS] DISCONNECTED")
});

export default socket;