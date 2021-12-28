/* eslint-disable no-console */

import { state } from "./state";

export type Verb = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
export const BASE_URL = "http://localhost:8085";

export class API {
	private debugWs(direction: "got" | "sent", event: string, data: any, ...messages: any) {
		if (state.settings.enableDebugLogger) {
			console.group(
				"%c[API Websockets]"
					+ `%c ${direction}`
          + `%c [${event.toUpperCase()}]`
          + `%c ${data}`,
				"color: black; background-color: #818DF8; padding: 2px; font-weight: bold;",
				"color: #818DF8;",
				"color: #FFF;",
				"color: #777;",
				...messages,
			);
		}
	}

	private debug(
		method: string,
		endpoint: string,
		duration: number,
		headers?: any,
		body?: any,
		...messages: any
	) {
		if (state.settings.enableDebugLogger) {
			console.group(
				"%c[API]"
          + `%c [${method.toUpperCase()}]`
          + `%c ${duration}ms`
          + `%c ${endpoint}`,
				"color: black; background-color: #818DF8; padding: 2px; font-weight: bold;",
				"color: #818DF8;",
				"color: #777;",
				"color: #FFF;",
				...messages,
			);

			if (headers) {
				console.group("%c [Headers]", "color: #818DF8;");
				console.log(
					"%cAuthorization:",
					"color: #81dDd8;",
					headers.Authorization ? "*".repeat(16) : undefined,
				);
				console.log(
					"%cContent-Type:",
					"color: #81dDd8;",
					headers["Content-Type"],
				);
				console.groupEnd();
			}

			if (body) {
				// Conceal the password
				body.password = "*".repeat(16);

				console.group("%c [Sending Body]", "color: #818DF8;");
				console.log(Object.assign({}, body));
				console.groupEnd();
			}
		}
	}

	constructor() {
		this.createWebsocketConnection();
	}

	public async createWebsocketConnection() {
		// Create WebSocket connection.
		const socket = new WebSocket(BASE_URL.replace("https", "wss").replace("http", "ws") + "/client");

		// Connection opened
		socket.addEventListener("open", (event) => {
			const encoded = JSON.stringify({ e: 0x02, data: {access_token: state.users.getToken()} });
			socket.send(encoded);
		});

		// Listen for messages
		socket.addEventListener("message", (message) => {
			const {e, data} = JSON.parse(message.toString());
			this.debugWs("got", e, data)
		});
	}

	public async request<T>(
		method: Verb,
		endpoint: string,
		body?: object,
	): Promise<T> {
		const headers = {
			"Authorization": state.users.getToken(),
			"Content-Type":
        body instanceof FormData ? "multipart/form-data" : "application/json",
		};

		const options = {
			method,
			headers,
			body: body instanceof FormData ? body : JSON.stringify(body),
		};

		const start = Date.now();
		const response = await fetch(BASE_URL + endpoint, options);
		this.debug(method, endpoint, Date.now() - start, headers, body);

		if (!response.ok) return Promise.reject(response.json());

		const data = await response.json().catch(e => console.log(e));

		if (state.settings.enableDebugLogger) {
			console.group("%c [Receiving Body]", "color: #818DF8;");
			console.log(Object.assign({}, data));
			console.groupEnd();
			console.groupEnd();
		}

		return data;
	}
}

const api = new API();

export default api;
