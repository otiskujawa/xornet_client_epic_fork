import { state } from "./state";

export type Verb = "GET" | "POST" | "DELETE"| "PUT"| "PATCH";
export const BASE_URL = "http://localhost:8085";

export class API {
	private debug(method: string, ...messages: any) {
		// eslint-disable-next-line no-console
		import.meta.env.DEV && console.log(
			"%c[API]"
      + `%c [${method.toUpperCase()}]`,
			"color: black; background-color: #00aaff; padding: 2px; border-radius: 4px; font-weight: bold;",
			"color: #ff00b6;",
			...messages,
		);
	}

	public async request<T>(method: Verb, endpoint: string, body?: object): Promise<T> {
		const url = BASE_URL + endpoint;
		let headers;
		if (body instanceof FormData) {
			headers = {
				"Content-Type": "multipart/form-data",
				"Authorization": state.users.token,
			};
		}
		else {
			headers = {
				"Content-Type": "application/json",
				"Authorization": state.users.token,
			};
		}

		const options = {
			method,
			headers,
			body: body instanceof FormData ? body : JSON.stringify(body),
		};

		import.meta.env.DEV && this.debug(method, endpoint);

		const response = await fetch(url, options);
		// eslint-disable-next-line no-console
		const data = await response.json().catch(e => console.log(e));
		return data;
	}
}

const api = new API();

export default api;
