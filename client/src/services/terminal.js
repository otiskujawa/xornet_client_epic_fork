import { Terminal } from "xterm";
import "xterm/css/xterm.css";
import { FitAddon } from 'xterm-addon-fit';
export class TerminalUI {
  constructor(socket) {
    this.terminal = new Terminal();
    this.fitAddon = new FitAddon();
    this.terminal.loadAddon(this.fitAddon);
    this.terminal.setOption("theme", {
      background: "#161b22",
      foreground: "#F5F8FA"
    });
    this.terminal.setOption("fontFamily", "Ubuntu Mono, courier-new, courier, monospace");
    this.terminal.setOption("fontWeight", "600");
    this.terminal.setOption("fontSize", 14);
    this.socket = socket;
  }

  startListening() {
    this.terminal.onData(data => this.sendInput(data));
    this.socket.removeAllListeners("output");
    this.socket.on("output", data => {
      // When there is data from PTY on server, print that on Terminal.
      this.write(data);
    });
  }

  stopListening(){
    this.socket.removeAllListeners("output");
    this.terminal.dispose();
  }

  write(text) {
    this.terminal.write(text);
  }

  prompt() {
    this.terminal.write(`\r\n$ `);
  }

  sendInput(input) {
    this.socket.emit("input", input);
  }

  attachTo(container) {
    this.terminal.open(container);
    this.fitAddon.fit();
    // Default text to display on terminal.
    this.terminal.write("Stonks");
    this.terminal.write("\n");
    this.prompt();
  }

  clear() {
    this.terminal.clear();
  }
}
