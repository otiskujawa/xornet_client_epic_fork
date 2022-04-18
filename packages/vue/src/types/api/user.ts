import type { uuid } from "/@/types/api/index";
import { BaseDatabaseItem } from "/@/types/api/index";

export interface IUser {
	uuid: uuid
	username: string
	email: string
	avatar?: string
	banner?: string
	biography?: string
	created_at: number
	updated_at: number
	is_admin: boolean
}

export interface IUserLoginHistory {
	ip: string
	agent: string
	timestamp: number
}

export class User extends BaseDatabaseItem implements IUser {
	public username: string;
	public email: string;
	public avatar?: string;
	public banner?: string;
	public biography?: string;
	public is_admin: boolean;
	public login_history: IUserLoginHistory[] = [];

	constructor(data: IUser) {
		super(data);
		this.username = data.username;
		this.email = data.email;
		this.avatar = data.avatar;
		this.banner = data.banner;
		this.biography = data.biography;
		this.is_admin = data.is_admin;
	}
}
