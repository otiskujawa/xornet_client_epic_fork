import { watch } from "vue";
import { State } from "./State";

export interface ISettingsState {
  opacity: number;
  theme: "light" | "dark";
}

export class SettingsState extends State<ISettingsState> {
  constructor(state: ISettingsState) {
    super(state);
    this.registerWatchers();
  }

  private registerWatchers(): void {
    // Apply the theme when it changes
    watch(
      () => this.state.theme,
      () => this.applyCurrentTheme()
    );
  }

  private applyCurrentTheme() {
    const dom = document.querySelector("html");
    dom!.className = `theme-${this.theme}`;
  }

  public get theme(): "light" | "dark" {
    return this.state.theme;
  }

  public set theme(theme: "light" | "dark") {
    this.state.theme = theme;
  }

  public get opacity(): number {
    return this.state.opacity;
  }

  public set opacity(opacity: number) {
    this.state.opacity = opacity;
  }
}
