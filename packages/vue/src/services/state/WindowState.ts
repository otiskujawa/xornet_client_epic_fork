import { onKeyStroke, useKeyModifier } from "@vueuse/core";
import { isElectron } from "../logic";
import { State } from "./State";
import router from "/@/router";

export interface IWindowState {
	isMaximized: boolean
	isShowingCommandPallete: boolean
}
export class WindowState extends State<IWindowState> {
	public ctrl = useKeyModifier("Control");
	public shift = useKeyModifier("Shift");
	constructor() {
		super({
			isMaximized: false,
			isShowingCommandPallete: false,
		});

		// Should probably move these somewhere else later
		isElectron()
			? onKeyStroke("P", () => this.ctrl.value && (this.isShowingCommandPallete = true))
			: onKeyStroke("k", (e) => { e.preventDefault(); (this.isShowingCommandPallete = true); });
		onKeyStroke("1", () => this.ctrl.value && router.push({ name: "machines" }));
		onKeyStroke("2", () => this.ctrl.value && router.push({ name: "settings" }));
		onKeyStroke("3", () => this.ctrl.value && router.push({ name: "profile" }));
	}

	public get isShowingCommandPallete() {
		return this.state.isShowingCommandPallete;
	}

	public set isShowingCommandPallete(value: boolean) {
		this.state.isShowingCommandPallete = value;
	}

	public get isMaximized() {
		return this.state.isMaximized;
	}

	public set isMaximized(value: boolean) {
		this.state.isMaximized = value;
	}
}
