import type { uuid } from "types/api";
import type { IUser } from "types/api/user";
import api from "../api";
import { State } from "./State";

export interface IUsersState {
	users: Record<uuid, IUser>
	token: string
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
	private me_uuid: uuid | undefined;

	constructor() {
		super({
			users: {},
			token: "unset",
		});
	}

	public getMe() {
		if (this.me_uuid) return this.get(this.me_uuid);
	}

	public async logout() {
		this.token = "unset";
	}

	public async login(form: UserLoginInput) {
		const response: {token: string; user: IUser} = await api.request("POST", "/users/@login", form);
		this.token = response.token;
		this.set(response.user);
		this.me_uuid = response.user.uuid;
	}

	public async signup(form: UserSignupInput) {
		const response: {token: string; user: IUser} = await api.request("POST", "/users/@signup", form);
		this.token = response.token;
		this.set(response.user);
		this.me_uuid = response.user.uuid;
	}

	public set token(value: string) {
		this.state.token = value;
	}

	public get token() {
		return this.state.token;
	}

	public setUsers(users: IUser[]) {
		users.forEach(user => this.set(user));
	}

	public set(user: IUser) {
		this.state.users[user.uuid] = user;
	}

	public get(uuid: uuid) {
		return this.state.users[uuid];
	}
}
