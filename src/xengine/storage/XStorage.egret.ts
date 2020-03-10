import Storage from "./Storage";

export class XStorageEgret extends Storage {

	async set_item(key: string, value: any) {
		let data = value;
		const type = typeof(value);
		if ('object' === type) {
			data = JSON.stringify(value);
		}
		egret.localStorage.setItem(key, JSON.stringify( { type: typeof(value), data } ));
		return true;
	}

	async get_item(key: string): Promise<any> {

		const text: string = egret.localStorage.getItem(key);
		const item = JSON.parse(text);
		let ret = undefined;
		if (item) {
			ret = item.data;
			if (item.type === 'object') {
				ret = JSON.parse(item.data);
			}
		}
		return ret;
	}
}
