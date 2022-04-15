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

export interface IGeolocation {
	ip: string
	type: string
	continent: string
	continent_code: string
	country: string
	country_code: string
	region: string
	city: string
	latitude: number
	longitude: number
	asn: string
	org: string
	isp: string
}

export interface IUserLoginHistory {
	geolocation: IGeolocation
	agent: string
	timestamp: number
}
