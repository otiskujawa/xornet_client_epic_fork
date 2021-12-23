import { State } from "./State";

export interface IWindowState {
  isMaximized: boolean;
}
export class WindowState extends State<IWindowState> {
  constructor(state: IWindowState) {
    super(state);
  }

  public get isMaximized() {
    return this.state.isMaximized;
  }

  public set isMaximized(value: boolean) {
    this.state.isMaximized = value;
  }
}
