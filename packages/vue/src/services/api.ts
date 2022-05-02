/* eslint-disable no-console */

import type { EventType } from "mitt";
import mitt from "mitt";
import type { AppState } from "/@/services/state/AppState";
import type { uuid } from "/@/types/api";
import type { IDatabaseMachine, IMachineDynamicData } from "/@/types/api/machine";
import pako from "pako";

export type Verb = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
export const BASE_URL = import.meta.env.MODE === "development-local" ? "http://localhost:7000" : "https://backend.xornet.cloud";

export type MittEvent = Record<EventType, unknown>;
export interface BackendToClientEvents {
	[key: string | symbol]: unknown
	"dynamic-data": IMachineDynamicData & { uuid: uuid }
	"machine-added": IDatabaseMachine
	"machine-disconnected": IDatabaseMachine
}

export class API {
	public lastHeartbeat = 0;
	public state: AppState | undefined;

	public aliveTimer = setInterval(() => {
		const isDead = Date.now() - this.lastHeartbeat > 5000;
		isDead && this.state && this.createWebsocketConnection(this.state);
	}, 5000);

	public async decompressMessage(message: Blob): Promise<{event: string; data: any}> {
		const arrayBuffer = await message.arrayBuffer();
		const uint8array = new Uint8Array(arrayBuffer);
		const decompressed = pako.ungzip(uint8array);
		const { e: event, d: data } = JSON.parse(String.fromCharCode.apply(null, decompressed as unknown as number[]));
		return { event, data };
	}

	// TODO: Make this into a class or something because everything happens within this function
	public createWebsocketConnection(state: AppState) {
		if (!localStorage.getItem("token") === undefined) return;
		this.state = state;
		// Create WebSocket connection.
		const socket = new WebSocket(`${BASE_URL.replace("https", "wss").replace("http", "ws")}/client`);
		const emitter = mitt<BackendToClientEvents>();

		// Connection opened
		socket.addEventListener("open", () => {
			state.users.getToken() && socket.send(JSON.stringify({ e: "login", d: { auth_token: state.users.getToken() } }));
		});

		// Listen for messages
		socket.addEventListener("message", async(message) => {
			const { e: event, d: data } = JSON.parse(message.data);
			// const { event, data } = await	this.decompressMessage(message.data);
			emitter.emit(event, data);
		});

		// TODO: remove this once the backend sends stuff every second
		const buffer: (IMachineDynamicData & { uuid: string })[] = [];

		// empty the buffer every 1 second and update the state
		setInterval(() => {
			if (buffer.length === 0) return;
			buffer.map(({ uuid, ...rest }) => state.machines.updateDynamicData(uuid, rest));
			buffer.length = 0;
		}, 1000);

		// TODO: Move these to a seperate file for organization
		emitter.on("dynamic-data", async(dynamicData) => {
			// state.machines.updateDynamicData(dynamicData.uuid, dynamicData);
			buffer.push(dynamicData);
		});

		emitter.on("machine-added", machine => this.state?.machines.set(machine));
		emitter.on("machine-disconnected", (machine) => {
			// TODO: fix this scuff shit
			// wait for the buffer first
			setTimeout(() => this.state?.machines.set(machine), 1000);
		});

		emitter.on("heartbeat", () => this.lastHeartbeat = Date.now());
	}

	public async request<T>(
		method: Verb,
		endpoint: string,
		body?: object,
	): Promise<T> {
		const headers = {
			"Authorization": localStorage.getItem("token") || "unset",
			"Content-Type":
        body instanceof FormData ? "multipart/form-data" : "application/json",
		};

		const options = {
			method,
			headers,
			body: body instanceof FormData ? body : JSON.stringify(body),
		};

		const response = await fetch(BASE_URL + endpoint, options);
		if (!response.ok) return Promise.reject(response.json());

		return response.json().catch(e => console.log(e));
	}
}
