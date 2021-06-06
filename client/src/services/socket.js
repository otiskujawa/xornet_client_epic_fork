import io from "socket.io-client";

const socket = io("wss://backend.xornet.cloud", {
  reconnect: true,
  auth: {
    type: "client",
    token: localStorage.getItem("token")
  }
});
socket.on("connect", () => console.log("%c[WS] [Connected]", "color: #ff4488; font-weight: bold;"));
socket.on("disconnect", () => console.log("%c[WS] [Disconnected]", "color: #ff4488; font-weight: bold;"));

export default socket;
