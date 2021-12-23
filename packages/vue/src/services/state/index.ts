import { GlobalState } from "./GlobalState";
import { SettingsState } from "./SettingState";
import { WindowState } from "./WindowState";

const globalState = new GlobalState({
  isLoggedIn: false,
  users: new Map(),
  me: null,
  machines: new Map(),
  selectedMachine: null,
  settings: new SettingsState({
    opacity: 100,
  }),
  window: new WindowState({
    isMaximized: false,
  }),
});

export const useState = () => globalState;
