import io from 'socket.io-client';

const socket = io('ws://backend.xornet.cloud', { 
    reconnect: true,
    auth: {
        type: 'client',
    },
});
socket.on('connect', () =>  console.log("[Socket] Connected"));
socket.on('disconnect', () =>  console.log("[Socket] Disconnected"));

export default socket;
