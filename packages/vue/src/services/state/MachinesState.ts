import type { uuid } from "types/api";
import type { IMachine } from "types/api/machine";
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

	public setMachines(machines: IMachine[]) {
		machines.forEach(machine => this.set(machine));
	}

	public set(machine: IMachine) {
		this.state.machines[machine.uuid] = machine;
	}

	public get(uuid: uuid) {
		return this.state.machines[uuid];
	}
}
