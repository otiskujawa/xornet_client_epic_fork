import { reactive } from "vue";

export class State<T extends Object> {
  protected state: T;

  public constructor(data: T) {
    this.state = reactive(data) as T;
  }
}
