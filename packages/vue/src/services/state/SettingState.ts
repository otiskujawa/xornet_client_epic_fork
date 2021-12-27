import { watch } from "vue";
import { State } from "./State";

export interface ISettingsState {
	opacity: number
	theme: "light" | "dark"
}

export class SettingsState extends State<ISettingsState> {
	constructor() {
		super({
			opacity: 100,
			theme: "dark",
		});
		this.registerWatchers();
	}

	private registerWatchers(): void {
		// Apply the theme when it changes
		watch(
			() => this.state.theme,
			() => this.applyCurrentTheme(),
		);

		watch(
			() => this.state.opacity,
			() => this.applyOpacity(),
		);
	}

	private applyCurrentTheme() {
		const dom = document.querySelector("html");
		dom!.className = `theme-${this.theme}`;
	}

	private applyOpacity() {
		const app = <HTMLElement>document.querySelector("#app");
		app!.style.setProperty("--tw-bg-opacity", (this.state.opacity / 100).toString());
	}

	public get theme(): "light" | "dark" {
		return this.state.theme;
	}

	public set theme(theme: "light" | "dark") {
		this.state.theme = theme;
	}

	public get opacity(): number {
		return this.state.opacity;
	}

	public set opacity(opacity: number) {
		this.state.opacity = opacity;
	}
}
