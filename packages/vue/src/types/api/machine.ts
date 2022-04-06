import type { uuid } from "/@/types/api/index";

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
	 * The version of the reporter thats running on the machine
	 */
	reporter_version: string
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
	/**
	 * The code of the country the IP is from
	 */
	country?: string
}

export interface DockerMemoryStats {
	raw: string
	percent: string
}

export interface DockerStats {
	container: string
	name: string
	memory: DockerMemoryStats
	cpu: string
}

export interface IMachineDynamicData {
	/**
	 * The CPU on the machine
	 */
	cpu?: ICPU
	docker?: DockerStats[]
	/**
	 * The RAM on the machine
	 */
	ram?: IRAM
	/**
	 * The swap memory of the machine
	 */
	swap?: ISwap
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
	 * Average usage of all the cores from 0% to 100%
	 * @computed server-side
	 */
	cau?: number
	/**
	 * Average clock speed of all the cores
	 * @computed server-side
	 */
	cas?: number
	/**
	 * Total download of all physical interfaces on the system
	 * @computed server-side
	 */
	td?: number
	/**
	* Total upload of all physical interfaces on the system
	* @computed server-side
	*/
	tu?: number
	/**
	* Total download of all virtual interfaces on the system
	* @computed server-side
	*/
	tvd?: number
	/**
	 * Total upload of all virtual interfaces on the system
	 * @computed server-side
	 */
	tvu?: number
}

export interface INetwork {
	[x: string]: any
	n: string
	tx: number
	rx: number
	s: number
}
export interface ICPU {
	usage: number[]
	freq: number[]
}

export interface IRAM {
	total: number
	used: number
}

export type ISwap = IRAM;

export interface IGPU {
	brand: string
	gpu_usage: number
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
