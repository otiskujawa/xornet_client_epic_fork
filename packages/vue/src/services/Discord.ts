import type { Presence } from "discord-rpc";
import type { IMachine } from "../types/api/machine";
import type { AppState } from "./state/AppState";
import { getMachineOsImageKey, nodeEmit } from "/@/services/logic";
export class Discord {
	constructor(public state: AppState) {}

	public updatePresence(args: Presence) {
		this.state.settings.client.enable_rich_presence && nodeEmit("rpc", args);
	}

	public clearPresence() {
		nodeEmit("rpc-clear");
	}

	public setCurrentlyWatchingMachine(machine: IMachine) {
		this.updatePresence({
			state: machine.os_name?.replaceAll("'", ""),
			details: machine.name,
			largeImageKey: machine.os_name ? getMachineOsImageKey(machine.os_name) : "main_logo",
			largeImageText: machine.os_name,
			smallImageKey: "viewing",
			smallImageText: `Viewing ${machine.name}`,
			buttons: [
				{
					label: "See Machine",
					url: `https://xornet.cloud/#/dashboard/machines/machine/${machine.uuid}`,
				},
			],
		});
	}
}
