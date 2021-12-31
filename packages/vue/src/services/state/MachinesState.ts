import type { uuid } from "types/api";
import type { IMachine, IMachineDynamicData } from "types/api/machine";
import api from "../api";
import { State } from "./State";

export interface IMachinesState {
	machines: Record<uuid, IMachine>
}

export class MachinesState extends State<IMachinesState> {
	constructor() {
		super({
			machines: {},
		});
	}

	public async generateToken() {
		const { key, expiration } = await api.request<{ key: string; expiration: number }>("GET", "/machines/@newkey");
		return { key, expiration };
	}

	public async fetchMachines() {
		this.setMachines(await api.request("GET", "/users/@me/machines"));
	}

	public setMachines(machines: IMachine[]) {
		machines.forEach(machine => this.set(machine));
	}

	public updateDynamicData(machineUuid: uuid, data: IMachineDynamicData) {
		console.log(data);
		this.get(machineUuid).dynamic_data = data;
	}

	public set(machine: IMachine) {
		this.state.machines[machine.uuid] = machine;
	}

	public get(uuid: uuid) {
		return this.state.machines[uuid];
	}

	public getAll() {
		return Object.values(this.state.machines);
	}
}
