import { useLocalStorage } from "@vueuse/core";
import type { API } from "/@/services/api";
import { State } from "/@/services/state/State";
import type { uuid } from "/@/types/api";
import type { IDatabaseMachine, IMachine, IMachineDynamicData } from "/@/types/api/machine";
import { MachineStatus } from "/@/types/api/machine";

export interface IMachinesState {
	machines: Record<uuid, IMachine>
}

/**
 * This keeps tracks of all the machines on the dashboard
 */
export class MachinesState extends State<IMachinesState> {
	public filterText = useLocalStorage("filterText", "");

	public constructor(public api: API) {
		super({
			machines: {},
		});
	}

	public async generateToken() {
		const { key, expiration } = await this.api.request<{ key: string; expiration: number }>("GET", "/machines/@newkey");
		return { key, expiration };
	}

	public async fetchMachines() {
		this.setMachines(await this.api.request("GET", "/users/@me/machines"));
	}

	public async deleteMachine(uuid: uuid) {
		await this.api.request("DELETE", `/machines/${uuid}`);
		delete this.state.machines[uuid];
	}

	public getTotal() {
		return Object.values(this.state.machines).length;
	}

	public setMachines(machines: IDatabaseMachine[]) {
		machines.forEach(machine => this.set(machine));
	}

	public updateDynamicData(machineUuid: uuid, data: IMachineDynamicData) {
		const target = this.get(machineUuid);
		target && Object.assign(target, { last_heartbeat: Date.now(), ...data });
		target.status = MachineStatus.Online;
	}

	public set(machine: IDatabaseMachine) {
		const machineFlattened = Object.assign(machine, machine.static_data);
		// @ts-ignore
		delete machineFlattened.static_data;
		this.state.machines[machine.uuid] = machineFlattened as unknown as IMachine;
	}

	public get(uuid: uuid) {
		return this.state.machines[uuid];
	}

	public getAll() {
		return Object.values(this.state.machines);
	}
}
