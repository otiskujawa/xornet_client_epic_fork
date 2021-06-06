import io from "socket.io-client";

const socket = io("wss://backend.xornet.cloud", {
  reconnect: true,
  auth: {
    type: "client",
    token: localStorage.getItem("token")
  }
});
socket.on("connect", () => console.log("[WS] Connected"));
socket.on("disconnect", () => console.log("[WS] Disconnected"));

export default socket;
