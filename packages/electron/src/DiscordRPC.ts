import type { Presence } from "discord-rpc";
import { Client } from "discord-rpc";

export class DiscordRPC {
	public CLIENT_ID = "942200099801538600";
	public client = new Client({ transport: "ipc" });
	constructor() {
		this.client.on("ready", () => {
			// Do something when ready
		});
		this.connect();
	}

	public connect() {
		this.client.login({ clientId: this.CLIENT_ID }).catch(() => this.connect());
	}

	public clearRichPresesnce() {
		this.client.clearActivity();
	}

	public updateRichPresence(args: Presence) {
		this.client.setActivity(args);
	}
}
