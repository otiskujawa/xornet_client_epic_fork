import type { API } from "../../services/api";
import { State } from "../../services/state/State";
import type { BaseDatabaseItem } from "/@/types/api";

/**
 * This is a modular manager for database items, it provides async locks for not fetching the same item twice
 * before the promise finishes if the client has to get the same item multiple times suddenly
 *
 * It is reactive so whenever the state updates it will automatically rerender in the client
 *
 * The limitation is that this does assume that every database item in the backend has at least
 * the same structure as @IBaseDatabaseItem and the same endpoints
 *
 * The item should have the following routes in the backend at minimum
 * @GET    /${item}/:uuid  => returns the item with the given id
 * @GET    /${item}/all    => returns all the items
 * @POST   /${item}/new    => creates a new item
 * @DELETE /${item}/:uuid  => deletes the item with the given id
 */
export class CachableItemManager<T extends BaseDatabaseItem, D extends Object> extends State<{items: Record<string, T>}> {
	private requestQueue: Record<string, Promise<T>> = {};

	constructor(private api: API, private Constructor: { new(data: T, api: API): T }, private itemEndpoint: string) {
		super({ items: {} }, itemEndpoint);
	}

	/**
   * Will fetch all items from the backend and set them on the state
   */
	public async fetchAll(): Promise<void> {
		const items = await this.api.request<T[]>("GET", `/${this.itemEndpoint}/all`);
		this.setAll(items);
	}

	public async create(data: Partial<D>): Promise<void> {
		const item = await this.api.request<T>("POST", `/${this.itemEndpoint}/new`, data);
		this.set(item);
	}

	public async delete(item: T): Promise<void> {
		await this.api.request("DELETE", `/${this.itemEndpoint}/${item.uuid}`);
		delete this.state.items[item.uuid];
	}

	/**
   * Fetches an item from the backend, also has an async lock so the same item is not fetched multiple times
   * before the first request finishes
   */
	public async fetch(uuid: string): Promise<void> {
		// If theres a request for this uuid of item already in the queue then return
		if (this.requestQueue[uuid] !== undefined) return;

		// if not then add this request's promise into the queue
		this.requestQueue[uuid] = this.api.request<T>("GET", `/${this.itemEndpoint}/${uuid}`);

		// wait for it to be done
		const item = await this.requestQueue[uuid];
		this.set(item);

		// remove this promise from the queue
		delete this.requestQueue[uuid];
	}

	/**
   * @returns the item with the given uuid
   */
	public get(uuid: string): T {
		const item = this.state.items[uuid];
		if (!item) this.fetch(uuid);
		return item;
	}

	/**
   * @returns all the items this manager is managing
   */
	public getAll(): T[] {
		return Object.values(this.state.items);
	}

	/**
   * Sets an item to the state
   * @param item The item to set
   */
	public set(item: T) {
		this.state.items[item.uuid] = new this.Constructor(item, this.api);
	}

	/**
   * Sets multiple items to the state
   * @param items The items to set
   */
	public setAll(items: T[]) {
		this.state.items = {};
		items.forEach(item => this.set(item));
	}
}
