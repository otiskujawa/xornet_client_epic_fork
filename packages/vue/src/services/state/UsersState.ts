import type { RemovableRef } from "@vueuse/core";
import { useLocalStorage } from "@vueuse/core";
import type { uuid } from "types/api";
import type { IUser } from "types/api/user";
import api from "../api";
import { State } from "./State";

export interface IUsersState {
	users: Record<uuid, IUser>
	me_uuid: uuid | undefined
}

export interface UserLoginInput {
	[key: string]: any
	password: string
	username: string
}

export interface UserSignupInput extends UserLoginInput {
	[key: string]: any
	email: string
}

export class UsersState extends State<IUsersState> {
	private token: RemovableRef<string> = useLocalStorage("token", "undefined");

	public constructor() {
		super({
			me_uuid: undefined,
			users: {},
		});
	}

	/**
	 * Resets this state
	 */
	private reset() {
		delete this.state.me_uuid;
		this.token.value = "undefined";
		this.setUsers([]);
	}

	/**
	 * Sets the user in the state and as me
	 */
	protected setMe(user: IUser) {
		this.set(user); 													// Set the user
		this.state.me_uuid = user.uuid; 					// Set this user as me
	}

	/**
	 * Gets the me user from the state and if it doesn't exist it fetches it from the backend
	 */
	public getMe() {
		if (!this.state.me_uuid) this.fetchMe(); 	// If the user isn't loaded already fetch it from the backend
		return this.get(this.state.me_uuid!);		 	// Return the user from the Record
	}

	/**
	 * Fetches the current logged in user object from the backend and sets it
	 */
	public async fetchMe() {
		const user: IUser = await api.request("GET", "/users/@me");
		this.setMe(user);
	}

	/**
	 * Fetches a user from the backend and sets it
	 */
	protected async fetch(uuid: uuid) {
		const user: IUser = await api.request("GET", `/users/${uuid}`);
		this.set(user);
	}

	/**
	 * Get the user's current login token
	 */
	public getToken() {
		return this.token.value;
	}

	/**
	 * Logs a user out and resets the state
	 */
	public logout() {
		this.reset();
	}

	/**
	 * Logs in a user to the backend and sets the return user in the state
	 */
	public async login(form: UserLoginInput) {
		const response: {token: string; user: IUser} = await api.request("POST", "/users/@login", form);
		this.token.value = response.token;
		this.setMe(response.user);
	}

	/**
	 * Signs up a user to the backend and sets the return user in the state
	 */
	public async signup(form: UserSignupInput) {
		const response: {token: string; user: IUser} = await api.request("POST", "/users/@signup", form);
		this.token.value = response.token;
		this.setMe(response.user);
	}

	/**
	 * Sets an array of users to the state
	 */
	protected setUsers(users: IUser[]) {
		users.forEach(user => this.set(user));
	}

	/**
	 * Sets a user to the state
	 */
	protected set(user: IUser) {
		this.state.users[user.uuid] = user;
	}

	/**
	 * Gets a user from the state and if it doesn't exist fetches it
	 */
	public get(uuid: uuid) {
		const user = this.state.users[uuid];
		if (!user) this.fetch(uuid);
		return user;
	}
}
