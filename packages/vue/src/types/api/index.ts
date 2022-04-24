import type { API } from "/@/services/api";

export type uuid = string;

export interface IBaseDatabaseItem {
	uuid: string
	created_at: number
	updated_at: number
}

export type IBaseDatabaseItemOwnable = IBaseDatabaseItem & {owner_uuid: string};

export class BaseDatabaseItem implements IBaseDatabaseItem {
	public uuid = "";
	public created_at = 0;
	public updated_at = 0;

	constructor(data: IBaseDatabaseItem, public api: API) {
		this.uuid = data.uuid;
		this.created_at = data.created_at;
		this.updated_at = data.updated_at;
	}
}
