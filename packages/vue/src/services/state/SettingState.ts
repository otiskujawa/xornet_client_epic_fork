import { useLocalStorage } from "@vueuse/core";
import { watch } from "vue";

export class SettingsState {
	public opacity = useLocalStorage("opacity", 100);
	public theme = useLocalStorage("theme", "dark");
	public enableBloom = useLocalStorage("enableBloom", false);
	public enableDebugLogger = useLocalStorage("debugLogging", import.meta.env.DEV);
	public enableRoundedCorners = useLocalStorage("roundedCorners", true);
	public enableSoundEffects = useLocalStorage("soundEffects", false);
	public showOfflineMachines = useLocalStorage("showOfflineMachines", true);
	public showOwnedMachinesOnly = useLocalStorage("showOwnedMachinesOnly", false);
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
		public_ip: false,
		process_count: false,
		owner: true,
		action: true,
	}).value;

	constructor() {
		this.registerWatchers();
		this.applyCurrentTheme();
		this.applyCurrentOpacity();
	}

	private registerWatchers(): void {
		watch(
			() => this.theme.value,
			() => this.applyCurrentTheme(),
		);
		watch(
			() => this.opacity.value,
			() => this.applyCurrentOpacity(),
		);
	}

	private applyCurrentTheme() {
		const dom = document.querySelector("html");
		dom!.className = `theme-${this.theme.value}`;
	}

	private applyCurrentOpacity() {
		// This is a hack
		setTimeout(() => {
			const main = <HTMLElement>document.querySelector("#main");
			main!.style.setProperty("--tw-bg-opacity", (this.opacity.value / 100).toString());
		}, 10);
	}
}
