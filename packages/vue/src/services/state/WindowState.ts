import { State } from "./State";

export interface IWindowState {
  isMaximized: boolean;
}
export class WindowState extends State<IWindowState> {
  constructor(state: IWindowState) {
    super(state);
  }
}
