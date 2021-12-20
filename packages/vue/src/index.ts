import { createApp } from "vue";
import App from "/@/App.vue";
import router from "/@/router";
import "/@/services/state";
import "virtual:windi.css";

createApp(App).use(router).mount("#app");
