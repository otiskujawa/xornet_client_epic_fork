import type { Presence } from "discord-rpc";
import type { AppState } from "./state/AppState";
import { nodeEmit } from "/@/services/logic";
export class DiscordManager {
	constructor(public state: AppState) {}

	public updatePresence(args: Presence) {
		this.state.settings.client.enable_rich_presence && nodeEmit("rpc", args);
	}

	public clearPresence() {
		nodeEmit("rpc-clear");
	}
}
