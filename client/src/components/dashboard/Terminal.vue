<template>
  <div id="terminalLmao"></div>
</template>

<script>
import { TerminalUI } from "@/services/terminal";
import socket from "@/services/socket";

export default {
    name: "Terminal",
    methods: {
        startTerminal(container, socket){
            // Create an xterm.js instance.
            const terminal = new TerminalUI(socket);

            // Attach created terminal to a DOM element.
            terminal.attachTo(container);

            // When terminal attached to DOM, start listening for input, output events.
            // Check TerminalUI startListening() for detail.
            terminal.startListening();
        },
        start(){
            const serverAddress = "http://localhost:8081";
            console.log(`connecting to ${serverAddress}`);
            const container = document.getElementById("terminalLmao");
            // Connect to socket and when it is available, start terminal.
            this.startTerminal(container, socket);
        },
    },
    mounted(){
        this.start();
    }
}
</script>

<style>

#terminalLmao {
    border-radius: 8px;
    border: 1px solid #252547;
    padding: 16px;
    background-color: var(--terminal-background);
    width: fit-content;
    height: fit-content;
    overflow: hidden;
}

#terminalLmao *::-webkit-scrollbar {
  display: none;
}
#terminalLmao * {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

</style>