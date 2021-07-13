import io from "socket.io-client";
import { appState } from "../states/appState";
const WS_PATH = process.env.NODE_ENV.trim() === "development" ? "ws://localhost:8080" : "wss://backend.xornet.cloud";

const socket = io(WS_PATH, {
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
socket.on("machines", machines => appState.setMachines(machines));

export default socket;
