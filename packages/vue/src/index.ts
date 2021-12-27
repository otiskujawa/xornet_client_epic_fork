import "virtual:windi.css";
import "./main.css";
import { createApp } from "vue";
import App from "/@/App.vue";
import router from "/@/router";
import "./services/state";

createApp(App)
	.use(router)
	.mount("#app");
