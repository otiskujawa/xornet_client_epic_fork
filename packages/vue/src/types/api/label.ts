import type { IBaseDatabaseItemOwnable } from ".";
import { BaseDatabaseItem } from ".";
import type { API } from "/@/services/api";

export interface ILabelProperties {
	name: string
	color: string
	icon: string
	description: string
}

export type ILabel = IBaseDatabaseItemOwnable & ILabelProperties;

export class Label extends BaseDatabaseItem implements ILabel {
	public owner_uuid: string;
	public name: string;
	public color: string;
	public icon: string;
	public description: string;

	constructor(data: ILabel, api: API) {
		super(data, api);
		this.owner_uuid = data.owner_uuid;
		this.name = data.name;
		this.color = data.color;
		this.icon = data.icon;
		this.description = data.description;
	}

	public rename(name: string): void {
		this.api.request("PATCH", `/labels/${this.uuid}`, { name }).then(() => {
			this.name = name;
		});
	}

	public changeColor(color: string): void {
		this.api.request("PATCH", `/labels/${this.uuid}`, { color }).then(() => {
			this.color = color;
		});
	}

	public changeIcon(icon: string): void {
		this.api.request("PATCH", `/labels/${this.uuid}`, { icon }).then(() => {
			this.icon = icon;
		});
	}

	public changeDescription(description: string): void {
		this.api.request("PATCH", `/labels/${this.uuid}`, { description }).then(() => {
			this.description = description;
		});
	}
}
