import { State } from "./State";

export interface ISettingsState {
  opacity: number;
}

export class SettingsState extends State<ISettingsState> {
  constructor(state: ISettingsState) {
    super(state);
  }
}
