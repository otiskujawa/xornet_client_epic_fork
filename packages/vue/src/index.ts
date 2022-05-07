import "virtual:windi.css";
import "./main.css";
import "/@/app";
import { createApp } from "vue";
import App from "/@/App.vue";
import router from "/@/router";

createApp(App)
	.use(router)
	.mount("#app");
