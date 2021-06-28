import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import api from "@/services/api/index.js";
// This is actually used, ignore your syntax highlighting
import "windi.css";

let app = createApp(App);
app.use(router);
app.config.globalProperties.api = api;
app.mount("#app");
