import { inject, reactive } from "vue";
import type { MachinesState } from "./MachinesState";
import type { SettingsState } from "./SettingState";
import type { UsersState } from "./UsersState";
import type { WindowState } from "./WindowState";

export class State<T extends Object> {
	protected state: T;

	public constructor(data: T) {
		this.state = reactive(data) as T;
	}
}

export const useState = () => inject<{
	users: UsersState
	machines: MachinesState
	settings: SettingsState
	window: WindowState
}>("state")!;
