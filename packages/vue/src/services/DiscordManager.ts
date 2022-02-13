import type { Presence } from "discord-rpc";
import { nodeEmit } from "/@/services/logic";
export class DiscordManager {
	public updatePresence(args: Presence) {
		nodeEmit("rpc", args);
	}
}
