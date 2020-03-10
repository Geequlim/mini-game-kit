export default class Storage {
	async set_item(key: string, value: any) {
		return true;
	}

	async get_item(key: string): Promise<any> {
		return null;
	}
}
