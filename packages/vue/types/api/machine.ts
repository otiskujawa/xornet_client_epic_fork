import type { uuid } from "../../types/api/index";

export const enum MachineStatus {
	Unknown,
	Offline,
	Online,
}

export interface IMachine {
	uuid: uuid
	owner_uuid: uuid
	hardware_uuid: uuid
	static_data: IMachineStaticData
	dynamic_data: IMachineDynamicData
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
	processes: string
	temps?: ITemp[]
	network: INetwork[]
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
