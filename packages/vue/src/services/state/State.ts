import { reactive } from "vue";

export class State<T extends Object> {
  public state: T;

  public constructor(data: T) {
    this.state = reactive(data) as T;
  }
}
