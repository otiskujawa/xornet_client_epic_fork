import type { Presence } from "discord-rpc";
import { Client } from "discord-rpc";

export class DiscordRPC {
	public CLIENT_ID = "942200099801538600";
	public client = new Client({ transport: "ipc" });
	constructor() {
		this.client.on("ready", () => {
			this.updateRichPresence({
				state: "Monitoring Machines",
				largeImageKey: "main_logo",
				largeImageText: "Xornet Cloud",
			});
		});
		this.connect();
	}

	public connect() {
		this.client.login({ clientId: this.CLIENT_ID }).catch(() => this.connect());
	}

	public updateRichPresence(args: Presence) {
		this.client.setActivity(args);
	}
}
