
import type { BinaryLike } from "crypto";
import { createHash } from "crypto";
import { contextBridge, ipcRenderer, webFrame } from "electron";
import { DiscordRPC } from "./DiscordRPC";

/**
 * The "Main World" is the JavaScript context that your main vue code runs in.
 * By default, the page you load in your vue executes code in this world.
 *
 * @see https://www.electronjs.org/docs/api/context-bridge
 */

/**
 * After analyzing the `exposeInMainWorld` calls,
 * `packages/preload/exposedInMainWorld.d.ts` file will be generated.
 * It contains all interfaces.
 * `packages/preload/exposedInMainWorld.d.ts` file is required for TS is `vue`
 *
 * @see https://github.com/cawa-93/dts-for-context-bridge
 */

/**
 * Expose Environment versions.
 * @example
 * console.log( window.versions )
 */
contextBridge.exposeInMainWorld("versions", process.versions);

/**
 * Safe expose node.js API
 * @example
 * window.nodeCrypto('data')
 */
contextBridge.exposeInMainWorld("nodeCrypto", {
	sha256sum(data: BinaryLike) {
		const hash = createHash("sha256");
		hash.update(data);
		return hash.digest("hex");
	},
});

webFrame.setZoomFactor(1.0);
const discordRPC = new DiscordRPC();

/**
 * Connects the frontend to electron's backend so we can send events to node
 */
process.once("loaded", () => window.addEventListener("message", (event) => {
	const theEvent = event.data as unknown as { name: string; data: string };
	if (theEvent.name === "rpc")
		return discordRPC.updateRichPresence(theEvent.data as any);
	ipcRenderer.send("event", event.data);
}));
