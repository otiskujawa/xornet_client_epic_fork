import io from "socket.io-client";

const socket = io("wss://backend.xornet.cloud", {
  reconnect: true,
  auth: {
    type: "client",
    token: localStorage.getItem("token")
  }
});
socket.on("connect", () => {
  console.log(
    `%c[WS]` + `%c [Connected]`,
    "color: black; background-color: #ff4488; padding: 2px; border-radius: 4px; font-weight: bold;",
    "color: #ff77aa;"
  );
});
socket.on("disconnect", () => {
  console.log(
    `%c[WS]` + `%c [Disconnected]`,
    "color: black; background-color: #ff4488; padding: 2px; border-radius: 4px; font-weight: bold;",
    "color: #ff77aa;"
  );
});

export default socket;
