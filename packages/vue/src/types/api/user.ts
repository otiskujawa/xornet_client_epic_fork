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
	client_settings: number
}

export interface IUserLoginHistory {
	ip: string
	agent: string
	timestamp: number
}
