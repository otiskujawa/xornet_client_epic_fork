import { useLocalStorage } from "@vueuse/core";
import { watch } from "vue";
import { isElectron } from "../logic";
import xornet from "/@/app";

/**
 * This keeps track of the user's settings and updates the local storage
 */
export class SettingsState {
	public client = useLocalStorage("clientOnlySettings", {
		enable_autosync: false,
		enable_rich_presence: true,
	}).value;

	// These are snake cased because they are used to index the JSONs we get from the backend as well
	public general = useLocalStorage("generalSettings", {
		opacity: 100,
		theme: "dark",
		enable_bloom: false,
		enable_totals: false,
		enable_sound_effects: false,
		enable_status_bar: false,
		use_single_color_for_switch_lights: false,
		show_offline_machines: true,
		show_owned: false,
		fixed_column_width: false,
	}).value;

	public columns = useLocalStorage("columns", {
		hostname: true,
		cau: true,
		cas: false,
		ram_usage: true,
		gpu_usage: false,
		gpu_power_usage: false,
		network_switch: true,
		td: true,
		tu: true,
		temperature: false,
		country: true,
		public_ip: false,
		process_count: false,
		host_uptime: false,
		reporter_uptime: false,
		reporter_version: true,
		owner: true,
	}, { deep: true }).value;

	constructor() {
		this.registerWatchers();
		this.applyCurrentTheme();
		this.applyCurrentOpacity();
	}

	public toObject() {
		const obj: {[key: string]: any} = {
			general: {},
			columns: {},
		};

		for (const category of Object.keys(obj)) {
			// @ts-ignore
			for (const [key, value] of Object.entries(this[category]))
				obj[category][key] = value;
		}

		return obj;
	}

	private registerWatchers(): void {
		watch(
			() => this.general.theme,
			() => this.applyCurrentTheme(),
		);
		watch(
			() => this.general.opacity,
			() => this.applyCurrentOpacity(),
		);
		watch(
			() => this.client.enable_rich_presence,
			(before, after) => after && xornet.Discord.clearPresence(),
		);
	}

	private applyCurrentTheme() {
		const dom = document.querySelector("html");
		dom!.className = `theme-${this.general.theme}`;
	}

	private applyCurrentOpacity() {
		// This is a hack
		setTimeout(() => {
			const main = <HTMLElement>document.querySelector("#main");
			main!.style.setProperty("--tw-bg-opacity", (isElectron() ? (this.general.opacity / 100) : 100).toString());
		}, 10);
	}
}
