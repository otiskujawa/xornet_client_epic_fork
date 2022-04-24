import { onKeyStroke, useKeyModifier } from "@vueuse/core";
import { useState } from "../app";
import router from "/@/router";
import { isElectron, nodeEmit } from "/@/services/logic";
import type { WindowState } from "/@/services/state/WindowState";

export class ShortcutManager {
	public ctrl = useKeyModifier("Control");
	public shift = useKeyModifier("Shift");

	public ctrlShortcut(key: string, action: () => any) {
		onKeyStroke(key, (e) => {
			// Prevent default while control
			this.ctrl.value && e.preventDefault();
			// Execute action
			this.ctrl.value && action();
		});
	}

	constructor(public windowState: WindowState) {
		isElectron()
			? this.ctrlShortcut("P", () => this.windowState.isShowingCommandPallete = true)
			: this.ctrlShortcut("k", () => this.windowState.isShowingCommandPallete = true);
		this.ctrlShortcut("1", () => router.push({ name: "machines" }));
		this.ctrlShortcut("2", () => router.push({ name: "profile", params: { uuid: useState().users.getMe()?.uuid } }));
		this.ctrlShortcut("3", () => router.push({ name: "settings" }));
		this.ctrlShortcut("4", () => router.push({ name: "admin" }));

		if (isElectron())
			onKeyStroke("F5", () => nodeEmit("refresh"));
	}
}
