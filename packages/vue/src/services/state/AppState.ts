import type { API } from "../api";
import { MachinesState } from "./MachinesState";
import { SettingsState } from "./SettingState";
import { UsersState } from "./UsersState";
import { WindowState } from "./WindowState";
import type { UserClientSettings } from "/@/types/api/user";

/**
 * Brings all the states together and includes some managing methods for them
 * and other utilities
 */
export class AppState {
	public users: UsersState;
	public machines: MachinesState;
	public settings: SettingsState & {[key: string]: any};
	public window: WindowState;

	constructor(public api: API) {
		this.users = new UsersState(this.api);
		this.machines = new MachinesState(this.api);
		this.settings = new SettingsState();
		this.window = new WindowState();
	}

	public syncSettings() {
		this.window.isSyncing = true;
		this.api.request<UserClientSettings>("GET", "/users/@settings")
			.then((newSettings) => {
				this.window.isSyncing = false;
				for (const [settingsGroupName, settings] of Object.entries(newSettings)) {
					for (const [key, value] of settings)
						this.settings[settingsGroupName][key] = value;
				}
			})
			.catch(() => this.window.isSyncing = false);
	}

	public updateSettings() {
		const settingsObject = this.settings.toObject();
		this.api.request<UserClientSettings>("PATCH", "/users/@settings", settingsObject)
			.then(() => this.window.isSyncing = false)
			.catch(() => this.window.isSyncing = false);
	}
}
