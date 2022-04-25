import { useLocalStorage } from "@vueuse/core";

export class State<T extends Object> {
	protected state: T;

	public constructor(data: T, storeName: string) {
		this.state = useLocalStorage(storeName, data as T).value;
	}
}
