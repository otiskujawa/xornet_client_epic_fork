import type { uuid } from "../../../types/api/index";
import type { IMachine } from "../../../types/api/machine";
import type { IUser } from "../../../types/api/user";
import type { SettingsState } from "./SettingState";
import { State } from "./State";
import type { WindowState } from "./WindowState";

export interface IGlobalState {
	isLoggedIn: boolean
	users: Map<uuid, IUser>
	me: uuid | null
	machines: Map<uuid, IMachine>
	selectedMachine: uuid | null
	settings: SettingsState
	window: WindowState
}
export class GlobalState extends State<IGlobalState> {
	constructor(state: IGlobalState) {
		super(state);
	}

	public get isLoggedIn() {
		return this.state.isLoggedIn;
	}

	public get users() {
		return this.state.users;
	}

	public get me() {
		return this.state.me;
	}

	public get machines() {
		return this.state.machines;
	}

	public get selectedMachine() {
		return this.state.selectedMachine;
	}

	public get settings() {
		return this.state.settings;
	}

	public get window() {
		return this.state.window;
	}
}
