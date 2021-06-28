import { Store } from "./state";
import { MachineObject, MeObject } from './types';

interface IAppState {
  me?: MeObject,
  machines: Map<string, MachineObject>,
}

class AppState extends Store<IAppState> {
  setMe(value: MeObject){
    this.state.me = value;
  }
  getMe(){
    return this.state.me;
  }
  setMachines(machines: Array<MachineObject>){
    Object.values(machines).forEach(machine => (machine.uuid ? this.state.machines.set(machine.uuid, machine) : null));
  }
  getMachines(){
    return this.state.machines;
  }
}

export const appState = new AppState({
  me: JSON.parse(localStorage.getItem('me')!),
  machines: new Map(),
});