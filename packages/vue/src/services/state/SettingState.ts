import { useLocalStorage } from "@vueuse/core";
import { watch } from "vue";

/**
 * This keeps track of the user's settings and updates the local storage
 */
export class SettingsState {
	public general = useLocalStorage("generalSettings", {
		opacity: 100,
		theme: "dark",
		enableBloom: false,
		enableRoundedCorners: true,
		enableSoundEffects: false,
		enableStatusBar: false,
		showOfflineMachines: true,
		showOwnedMachinesOnly: false,
	}).value;

	// These are snake cased because they are used to index the JSONs we get from the backend as well
	public columns = useLocalStorage("enabledColumns", {
		hostname: true,
		cpu_average_usage: true,
		cpu_average_speed: false,
		ram_usage: true,
		gpu_usage: false,
		gpu_power_usage: false,
		network_switch: true,
		download: true,
		upload: true,
		temperature: false,
		country: true,
		public_ip: false,
		process_count: false,
		host_uptime: false,
		reporter_uptime: false,
		reporter_version: true,
		owner: true,
		action: true,
	}, { deep: true }).value;

	constructor() {
		this.registerWatchers();
		this.applyCurrentTheme();
		this.applyCurrentOpacity();
	}

	public toJSON() {
		return JSON.stringify({ ...Object.entries(this.columns), ...Object.entries(this.general) });
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
	}

	private applyCurrentTheme() {
		const dom = document.querySelector("html");
		dom!.className = `theme-${this.general.theme}`;
	}

	private applyCurrentOpacity() {
		// This is a hack
		setTimeout(() => {
			const main = <HTMLElement>document.querySelector("#main");
			main!.style.setProperty("--tw-bg-opacity", (this.general.opacity / 100).toString());
		}, 10);
	}
}
