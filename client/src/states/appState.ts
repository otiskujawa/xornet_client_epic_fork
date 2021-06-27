import { Store } from "./state";
import { MeObject } from './types';

interface IAppState {
  me?: MeObject
}

class AppState extends Store<IAppState> {
  setMe(value: MeObject){
    this.state.me = value;
  }
  getMe(){
    return this.state.me;
  }
}

export const appState = new AppState({
  me: JSON.parse(localStorage.getItem('me')!),
});