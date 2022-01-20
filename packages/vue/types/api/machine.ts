import type { uuid } from "../../types/api/index";

export const enum MachineStatus {
	Unknown,
	Offline,
	Online,
}

export interface IMachine extends IMachineDynamicData, IMachineStaticData {
	uuid: uuid
	owner_uuid: uuid
	hardware_uuid: uuid
	access_token: string
	name: string
	status: MachineStatus
	access: string[]
	created_at: number
	updated_at: number
}

export interface IMachineStaticData {
	hostname?: string
	os_version?: string
	os_name?: string
	cpu_cores?: number
	public_ip?: string
	cpu_model: string
	cpu_threads: number
	total_mem: number
}

export interface IMachineDynamicData {
	cpu: ICPU
	ram: IRAM
	gpu?: IGPU
	disks: IDisk[]
	process_count: number
	temps?: ITemp[]
	network: INetwork[]
	host_uptime: number
	reporter_uptime: number

	// Computed Shit
	cpu_usage: number
	cpu_speed: number
	total_download: number
	total_upload: number
	ram_used: number
	ram_total: number
}

export interface INetwork {
	[x: string]: any
	name: string
	tx: number
	rx: number
	speed: number
}
export interface ICPU {
	usage: number[]
	freq: number[]
}

export interface IRAM {
	total: number
	used: number
}

export interface IGPU {
	brand: string
	gpu_usage: number
	mem_total: number
	mem_used: number
	power_usage: number
}

export interface IDisk {
	fs: string
	mount: string
	total: number
	type: string
	used: number
}

export interface ITemp {
	label: string
	value: number
}
