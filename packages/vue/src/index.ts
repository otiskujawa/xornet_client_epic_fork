import "virtual:windi.css";
import { createApp } from "vue";
import "./main.css";
import { MachinesState } from "./services/state/MachinesState";
import { SettingsState } from "./services/state/SettingState";
import { UsersState } from "./services/state/UsersState";
import { WindowState } from "./services/state/WindowState";
import App from "/@/App.vue";
import router from "/@/router";

createApp(App)
	.provide("state", {
		users: new UsersState(),
		machines: new MachinesState(),
		settings: new SettingsState(),
		window: new WindowState(),
	})
	.use(router)
	.mount("#app");
