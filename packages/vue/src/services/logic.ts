import { useState } from "../app";
import router from "../router";
import type { INetwork } from "../types/api/machine";

const state = useState();
/**
 *  Returns true if the user is on the electron client
 */
export function isElectron() {
	// Renderer process
	if (typeof window !== "undefined" && typeof window.process === "object")
		return true;

	// Main process
	if (typeof process !== "undefined" && typeof process.versions === "object" && !!process.versions.electron)
		return true;

	// Detect the user agent when the `nodeIntegration` option is set to true
	if (
		typeof navigator === "object"
    && typeof navigator.userAgent === "string"
    && navigator.userAgent.includes("Electron")
	)
		return true;

	return false;
}

export const padNumber = (time: number) => {
	const floored = ~~time;
	return floored > 9 ? floored : `0${floored}`;
};

export const formatDate = (epoch: number) => new Date(epoch).toLocaleString();

export const formatEpoch = (ms?: number) => {
	if (!ms) return undefined;
	const days = ~~(ms / (24 * 60 * 60 * 1000));
	const daysms = ms % (24 * 60 * 60 * 1000);
	const hours = ~~(daysms / (60 * 60 * 1000));
	const hoursms = ms % (60 * 60 * 1000);
	const minutes = ~~(hoursms / (60 * 1000));
	const minutesms = ms % (60 * 1000);
	const sec = ~~(minutesms / 1000);
	return `${padNumber(days)}:${padNumber(hours)}:${padNumber(minutes)}:${padNumber(sec)}`;
};

export const detectBrowser = () => {
	if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf("OPR")) !== -1)
		return "opera";

	else if (navigator.userAgent.includes("Chrome"))
		return "chrome";

	else if (navigator.userAgent.includes("Safari"))
		return "safari";

	else if (navigator.userAgent.includes("Firefox"))
		return "firefox";

	else
		return null;
};

/**
 * Sends a message to electron's node backend
 * @param name the name of the event
 * @param data the data to send
 */
export function nodeEmit(name: string, data?: any) {
	window.postMessage({ name, data });
}

const OPERATING_SYSTEMS = [
	"arch",
	"debian",
	"freebsd",
	"fedora",
	"popos",
	"redhat",
	"ubuntu",
	"openwrt",
	"clearlinux",
	"kali",
	"suse",
	"ubnt",
	"endeavour",
	"garuda",
	"raspbian",
	"gentoo",
	"darwin",
	"windows",
	"kubuntu",
	"nixos",
	"parrot",
];

/**
 * Gets the icon key name for a specific distro
 * @param name The os name of the machine to search through
 */
export const getMachineOsImageKey = (name: string) => {
	if (!name) return;
	const lowerCasedName = name.toLowerCase().replace(/\s/g, "");
	for (let i = 0; i < OPERATING_SYSTEMS.length; i++) {
		const os = OPERATING_SYSTEMS[i];
		if (lowerCasedName.includes(os)) return os;
	}
};

export const logout = () => {
	router.push({ name: "login" });
	useState().users.logout();
};

export const isDockerInterface = (iface: INetwork) => {
	return iface.n.startsWith("veth") || iface.n.startsWith("docker0");
};

export const determineInterfaceColor = (iface: INetwork) => {
	if (isDockerInterface(iface)) return "text-docker";

	if (useState().settings.general.use_single_color_for_switch_lights) return "text-1000mbps";

	const log = ~~Math.log10(iface.s);
	switch (log) {
		case 2:
			return "text-100mbps";
		case 3:
			return "text-1000mbps";
		case 4:
			return "text-10000mbps";
		case 5:
			return "text-100000mbps";
		default:
			return "text-100mbps";
	}
};

export const secondsSince = (before: number) => {
	return ~~(Date.now() - before) / 1000;
};

export const secondsToHuman = (sec: number) => {
	function numberEnding(number: number) {
		return (number > 1) ? "s" : "";
	}

	const years = Math.abs(~~(sec / 31536000));
	if (years)
		return `${years} year${numberEnding(years)}`;

	const days = Math.abs(~~((sec %= 31536000) / 86400));
	if (days)
		return `${days} day${numberEnding(days)}`;

	const hours = Math.abs(~~((sec %= 86400) / 3600));
	if (hours)
		return `${hours} hour${numberEnding(hours)}`;

	const minutes = Math.abs(~~((sec %= 3600) / 60));
	if (minutes)
		return `${minutes} minute${numberEnding(minutes)}`;

	const seconds = sec % 60;
	if (seconds)
		return `${seconds} second${numberEnding(seconds)}`;

	return "less than a second";
};

const SLOWEST_BLINK_MS = 5000;
const FASTER_BLINK_MS = 50;

export const determineInterfaceBlinkSpeed = (iface: INetwork) => {
	const totalTraffic = (iface.tx + iface.rx) / 1000 / 1000;
	if (totalTraffic < state.settings.general.minimum_blink_speed) return 0;

	if (state.settings.general.use_new_blink_algorithm) {
		// the higher the traffic exponentially the less the ms between blinks
		const ms = totalTraffic ** 0.25 * 100;
		const result = Math.min(ms, SLOWEST_BLINK_MS);

		// flip the result
		return Math.max(FASTER_BLINK_MS, 700 - result);
	}

	const log = ~~Math.log10(totalTraffic);
	switch (log) {
		case 1:
			return 400;
		case 2:
			return 200;
		case 3:
			return 150;
		case 4:
			return 100;
		case 5:
			return 50;
		default:
			return 400;
	}
};
