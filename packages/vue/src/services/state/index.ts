import { GlobalState } from "./GlobalState";
import { SettingsState } from "./SettingState";

const globalState = new GlobalState({
  isLoggedIn: false,
  users: new Map(),
  me: null,
  machines: new Map(),
  selectedMachine: null,
  settings: new SettingsState({
    opacity: 100,
  }),
});

export const useState = () => globalState;
