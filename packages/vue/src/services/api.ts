/* eslint-disable no-console */

import type { EventType } from "mitt";
import mitt from "mitt";
import type { AppState } from "/@/services/state/AppState";
import type { uuid } from "/@/types/api";
import type { IMachineDynamicData } from "/@/types/api/machine";

export type Verb = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
export const BASE_URL = "https://backend.xornet.cloud";

export type MittEvent = Record<EventType, unknown>;
export interface BackendToClientEvents {
	[key: string | symbol]: unknown
	machineData: IMachineDynamicData & { uuid: uuid }
}

export class API {
	constructor() {}

	public createWebsocketConnection(state: AppState) {
		if (!localStorage.getItem("token") === undefined) return;
		// Create WebSocket connection.
		const socket = new WebSocket(`${BASE_URL.replace("https", "wss").replace("http", "ws")}/client`);

		const emitter = mitt<BackendToClientEvents>();
		emitter.on("machineData", (dynamicData) => {
			state.machines.updateDynamicData(dynamicData.uuid, dynamicData);
		});

		// Connection opened
		socket.addEventListener("open", () => {
			const encoded = JSON.stringify({ e: "login", d: { auth_token: state.users.getToken() } });
			state.users.getToken() && socket.send(encoded);
		});

		socket.addEventListener("close", () => this.createWebsocketConnection(state));

		// Listen for messages
		socket.addEventListener("message", (message) => {
			const { e: event, d: data } = JSON.parse(message.data.toString());
			emitter.emit(event, data);
		});
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
