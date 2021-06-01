import { createApp } from "vue";
import App from "./app.vue";
import router from "./router";
import api from "@/services/api.js";

let app = createApp(App);
app.use(router);
app.config.globalProperties.api = api;
app.mount("#app");
