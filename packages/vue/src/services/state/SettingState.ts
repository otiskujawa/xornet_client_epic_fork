import { useLocalStorage } from "@vueuse/core";
import { watch } from "vue";

export class SettingsState {
	public opacity = useLocalStorage("opacity", 100);
	public theme = useLocalStorage("theme", "dark");
	public enableDebugLogger = useLocalStorage("debugLogging", import.meta.env.DEV);
	public enableRoundedCorners = useLocalStorage("roundedCorners", true);

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
