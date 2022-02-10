import type { API } from "../api";
import { MachinesState } from "./MachinesState";
import { SettingsState } from "./SettingState";
import { UsersState } from "./UsersState";
import { WindowState } from "./WindowState";

/**
 * Brings all the states together and includes some managing methods for them
 * and other utilities
 */
export class AppState {
	public users: UsersState;
	public machines: MachinesState;
	public settings: SettingsState;
	public window: WindowState;

	constructor(public api: API) {
		this.users = new UsersState(this.api);
		this.machines = new MachinesState(this.api);
		this.settings = new SettingsState();
		this.window = new WindowState();
	}

	public sync() {
		this.window.isSyncing = true;
		console.log(this.settings.toJSON());
		this.window.isSyncing = false;
	}
}
