import { Store } from "./state";
import { MachineObject, MeObject } from "./types";

interface IAppState {
  me?: MeObject;
  machines: Map<string, MachineObject>;
  devices: Object;
}

class AppState extends Store<IAppState> {
  setMe(value: MeObject) {
    this.state.me = value;
  }
  getMe() {
    return this.state.me;
  }
  setMachines(machines: Array<MachineObject>) {
    Object.values(machines).forEach(machine => this.state.machines.set(machine.uuid, machine));
  }
  getMachines() {
    return this.state.machines;
  }
  setDevices(devices: Object) {
    this.state.devices = devices;
  }
  getDevices() {
    return this.state.devices;
  }
}

export const appState = new AppState({
  me: JSON.parse(localStorage.getItem("me")!),
  machines: new Map(),
  devices: {},
});
