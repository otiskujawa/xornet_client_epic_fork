import "virtual:windi.css";
import "./main.css";
import "/@/app";
import { createApp } from "vue";
import App from "/@/App.vue";
import router from "/@/router";
import VueApexCharts from "vue3-apexcharts";

createApp(App)
	.use(router)
	.use(VueApexCharts)
	.mount("#app");
