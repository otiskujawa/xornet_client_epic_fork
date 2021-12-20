import { State } from "./State";
import { SettingsState } from "./SettingState";
import { IMachine } from "../../../types/api/machine";
import { IUser } from "../../../types/api/user";
import { uuid } from "../../../types/api/index";

export interface IAppState {
  isLoggedIn: boolean;
  users: Map<uuid, IUser>;
  me: uuid | null;
  machines: Map<uuid, IMachine>;
  selectedMachine: uuid | null;
  settings: SettingsState;
}
export class GlobalState extends State<IAppState> {
  constructor(state: IAppState) {
    super(state);
  }
}
