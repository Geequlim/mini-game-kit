import { ResourceLoader } from "./ResourceLoader";
import { HashObject } from "../events/HashObject";

export class Resource extends HashObject {
	url: string;
	loader: ResourceLoader;
	native_data: any;

	constructor(url: string, data: any, loader?: ResourceLoader) {
		super();
		this.url = url;
		this.native_data = data;
		this.loader = loader;
	}
}
