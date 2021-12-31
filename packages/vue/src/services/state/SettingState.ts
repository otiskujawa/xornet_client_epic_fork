import { useLocalStorage } from "@vueuse/core";
import { watch } from "vue";


export class SettingsState {
	public opacity = useLocalStorage("opacity", 100);
	public theme = useLocalStorage("theme", "dark");
	public enableDebugLogger = useLocalStorage("debugLogging", import.meta.env.DEV);

	constructor() {
		this.registerWatchers();
		this.applyCurrentTheme();
		this.applyCurrentOpacity();
	}


	private registerWatchers(): void {
		// Apply the theme when it changes
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
		const app = <HTMLElement>document.querySelector("#app");
		app!.style.setProperty("--tw-bg-opacity", (this.opacity.value / 100).toString());
	}
}
