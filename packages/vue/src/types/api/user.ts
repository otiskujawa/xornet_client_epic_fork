import type { uuid } from "/@/types/api/index";

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

export class User implements IUser {
	public uuid: uuid;
	public username: string;
	public email: string;
	public avatar?: string;
	public banner?: string;
	public biography?: string;
	public created_at: number;
	public updated_at: number;
	public is_admin: boolean;
	public login_history: IUserLoginHistory[] = [];

	constructor(user: IUser) {
		this.uuid = user.uuid;
		this.username = user.username;
		this.email = user.email;
		this.avatar = user.avatar;
		this.banner = user.banner;
		this.biography = user.biography;
		this.created_at = user.created_at;
		this.updated_at = user.updated_at;
		this.is_admin = user.is_admin;
	}
}
