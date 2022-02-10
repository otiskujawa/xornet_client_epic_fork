import { State } from "/@/services/state/State";

export interface IWindowState {
	isMaximized: boolean
	isShowingCommandPallete: boolean
	isSyncing: boolean
}

/**
 * This keeps track of the window's state regarding if it's maximized, minimize etc.
 */
export class WindowState extends State<IWindowState> {
	constructor() {
		super({
			isMaximized: false,
			isShowingCommandPallete: false,
			isSyncing: false,
		});
	}

	public get isSyncing() {
		return this.state.isSyncing;
	}

	public set isSyncing(value: boolean) {
		this.state.isSyncing = value;
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
