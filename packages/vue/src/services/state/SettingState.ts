import { State } from "./State";

export interface ISettingsState {
  opacity: number;
}

export class SettingsState extends State<ISettingsState> {
  constructor(state: ISettingsState) {
    super(state);
  }

  public get opacity(): number {
    return this.state.opacity;
  }

  public set opacity(opacity: number) {
    this.state.opacity = opacity;
  }
}
