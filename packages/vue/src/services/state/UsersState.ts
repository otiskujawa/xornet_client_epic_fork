import type { uuid } from "types/api";
import type { IUser } from "types/api/user";
import { State } from "./State";

export interface IUsersState {
	users: Record<uuid, IUser>
}

export class UsersState extends State<IUsersState> {
	constructor() {
		super({
			users: {},
		});
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
