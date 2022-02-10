import type { uuid } from "/@/types/api/index";

export interface IUser {
	uuid: uuid
	username: string
	email: string
	avatar?: string
	biography?: string
	created_at: number
	updated_at: number
	client_settings: number
}

export interface UserClientSettings {
	general: {
		opacity: number
		theme: string
		enable_bloom: boolean
		enable_rounded_corners: boolean
		enable_sound_effects: boolean
		enable_status_bar: boolean
		show_offline_machines: boolean
		show_owned_machines_only: boolean
	}
	columns: {
		[key: string]: boolean
		hostname: boolean
		cpu_average_usage: boolean
		cpu_average_speed: boolean
		ram_usage: boolean
		gpu_usage: boolean
		gpu_power_usage: boolean
		network_switch: boolean
		download: boolean
		upload: boolean
		temperature: boolean
		country: boolean
		public_ip: boolean
		process_count: boolean
		host_uptime: boolean
		reporter_uptime: boolean
		reporter_version: boolean
		owner: boolean
		action: boolean
	}
}
