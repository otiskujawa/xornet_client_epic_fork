import type { Presence } from "discord-rpc";
import { Client } from "discord-rpc";

export class DiscordRPC {
	public client = new Client({ transport: "ipc" });
	constructor() {
		this.client.on("ready", () => {
			this.updateRichPresence({
				state: "Monitoring Machines",
				// details: "minint-svr",
				largeImageKey: "main_logo",
				largeImageText: "Xornet Cloud",
				// smallImageKey: "main_logo",
				// smallImageText: "Viewing minint-svr",
			});
		});
		this.client.login({ clientId: "942200099801538600" });
	}

	public updateRichPresence(args: Presence) {
		console.log("setting activity");
		this.client.setActivity(args).then(a => console.log(a)).catch(e => console.log(e));
	}
}
