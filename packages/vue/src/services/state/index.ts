import { MachinesState } from "./MachinesState";
import { SettingsState } from "./SettingState";
import { UsersState } from "./UsersState";
import { WindowState } from "./WindowState";

export const state = {
	users: new UsersState(),
	machines: new MachinesState(),
	settings: new SettingsState(),
	window: new WindowState(),
};

state.machines.fetchMachines();

export const useState = () => state;
