import { onKeyStroke } from "@vueuse/core";
import { State } from "./State";

export interface IWindowState {
	isMaximized: boolean
	isShowingCommandPallete: boolean
}
export class WindowState extends State<IWindowState> {
	constructor() {
		super({
			isMaximized: false,
			isShowingCommandPallete: false,
		});

		onKeyStroke("Control", (e) => {
			e.preventDefault();
			onKeyStroke("k", (e) => {
				e.preventDefault();
				this.isShowingCommandPallete = !this.isShowingCommandPallete;
			});
		});
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
