// This is where all the different modules of the frontend
// live and talk to each other, the reason for this file is to avoid
// conflicting circular dependancies of modules requiring each other to be
// initialized before themselves which is a massive code structure issue

import { API } from "/@/services/api";
import { SoundManager } from "/@/services/SoundManager";
import { MachinesState } from "/@/services/state/MachinesState";
import { SettingsState } from "/@/services/state/SettingState";
import { UsersState } from "/@/services/state/UsersState";
import { WindowState } from "/@/services/state/WindowState";

export interface GlobalState {
	users: UsersState
	machines: MachinesState
	settings: SettingsState
	window: WindowState
}

/**
 * This is the middle-end that connects all the modules together so they have
 * a common ground to talk to each other with the dependency injection paradigm
 *
 * hopefully this code structure will scale well in the end
 */
export class Xornet {
	private api: API = new API();

	public state: GlobalState = {
		users: new UsersState(this.api),
		machines: new MachinesState(this.api),
		settings: new SettingsState(),
		window: new WindowState(),
	};

	public soundManager: SoundManager = new SoundManager(this.state);

	constructor() {
		this.state.machines.fetchMachines();
		this.api.createWebsocketConnection(this.state);
	}
}

// Alias function for scope bounds
const xornet = new Xornet();

// Alias function for scope bounds
export const useState = () => xornet.state;
export const useSoundManager = () => xornet.soundManager;

// Export the middle-end as a default export
export default xornet;
