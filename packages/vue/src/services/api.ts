/* eslint-disable no-console */

import { state } from "./state";

export type Verb = "GET" | "POST" | "DELETE"| "PUT"| "PATCH";
export const BASE_URL = "http://localhost:8085";

export class API {
	private debug(method: string, endpoint: string, headers?: any, body?: any, ...messages: any) {
		if (import.meta.env.DEV) {
			console.group(
				"%c[API]"
        + `%c [${method.toUpperCase()}]`
				+ `%c ${endpoint}`,
				"color: black; background-color: #818DF8; padding: 2px; font-weight: bold;",
				"color: #818DF8;",
				"color: #FFF;",
				...messages,
			);

			if (headers) {
				console.group("%c [Headers]", "color: #818DF8;");
				console.log("%cAuthorization:", "color: #81dDd8;", headers.Authorization);
				console.log("%cContent-Type:", "color: #81dDd8;", headers["Content-Type"]);
				console.groupEnd();
			}

			if (body) {
				body.password = "*".repeat(body.password.length);
				console.group("%c [Body]", "color: #818DF8;");
				console.log(Object.assign({}, body));
				console.groupEnd();
			}

			console.groupEnd();
		}
	}

	public async request<T>(method: Verb, endpoint: string, body?: object): Promise<T> {
		const headers = {
			"Authorization": state.users.token,
			"Content-Type": body instanceof FormData ? "multipart/form-data" : "application/json",
		};

		const options = {
			method,
			headers,
			body: body instanceof FormData ? body : JSON.stringify(body),
		};

		import.meta.env.DEV && this.debug(method, endpoint, headers, body);

		const response = await fetch(BASE_URL + endpoint, options);

		if (!response.ok) return Promise.reject(response.json());

		const data = await response.json().catch(e => console.log(e));
		return data;
	}
}

const api = new API();

export default api;
