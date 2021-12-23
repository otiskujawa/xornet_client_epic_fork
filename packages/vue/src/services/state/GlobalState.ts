import { uuid } from "../../../types/api/index";
import { IMachine } from "../../../types/api/machine";
import { IUser } from "../../../types/api/user";
import { SettingsState } from "./SettingState";
import { State } from "./State";
import { WindowState } from "./WindowState";

export interface IAppState {
  isLoggedIn: boolean;
  users: Map<uuid, IUser>;
  me: uuid | null;
  machines: Map<uuid, IMachine>;
  selectedMachine: uuid | null;
  settings: SettingsState;
  window: WindowState;
}
export class GlobalState extends State<IAppState> {
  constructor(state: IAppState) {
    super(state);
  }
}
