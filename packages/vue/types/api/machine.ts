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

export interface IDatabaseMachine {
	uuid: uuid
	owner_uuid: uuid
	hardware_uuid: uuid
	access_token: string
	static_data: IMachineStaticData
	name: string
	status: MachineStatus
	access: string[]
	created_at: number
	updated_at: number
}

export interface IMachineStaticData {
	/**
	 * The machine's hostname
	 */
	hostname?: string
	/**
	 * The host's OS version (for arch it may say 'rolling')
	 */
	os_version?: string
	/**
	 * The host's OS name
	 */
	os_name?: string
	/**
	 * The amount of cores the CPU has
	 */
	cpu_cores?: number
	/**
	 * The public IP address of the machine
	 */
	public_ip?: string
	/**
	 * The name of the CPU model
	 */
	cpu_model: string
	/**
	 * The amount of threads the CPU has
	 */
	cpu_threads: number
	/**
	 * The total memory the machine has
	 */
	total_mem: number
}

export interface IMachineDynamicData {
	/**
	 * The CPU on the machine
	 */
	cpu?: ICPU
	/**
	 * The RAM on the machine
	 */
	ram?: IRAM
	/**
	 * The GPU on the machine
	 */
	gpu?: IGPU
	/**
	 * The disks on the machine
	 */
	disks?: IDisk[]
	/**
	 * The amount of processes running on the system
	 */
	process_count?: number
	/**
	 * Temperature sensors of the machine
	 */
	temps?: ITemp[]
	/**
	 * All the network interfaces of the machine
	 */
	network?: INetwork[]
	/**
	 * The boot time of how long the host machine has been up for
	 */
	host_uptime?: number
	/**
	 * The amount of time the reporter has been running for
	 */
	reporter_uptime?: number
	/**
	 * Server-side computed - Average usage of all the cores from 0% to 100%
	 */
	cpu_average_usage?: number
	/**
	 * Server-side computed - Average clock speed of all the cores
	 */
	cpu_average_speed?: number
	/**
	 * Server-side computed - Total download of all interfaces on the system
	 */
	total_download?: number
	/**
	 * Server-side computed - Total upload of all interfaces on the system
	 */
	total_upload?: number
	/**
	 * Server-side computed - RAM used in GB
	 */
	ram_used_gb?: number
	/**
	 * Server-side computed - RAM total in GB
	 */
	ram_total_gb?: number
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
