
/** 随机条目 */
export interface RondomItem {
	weight: number;
	data: any;
	start?: number;
}

/** 带权重的随机取池 */
export default class RandomPool {

	private items: RondomItem[] = [];

	constructor(items: RondomItem[] = []) {
		for (const item of items) {
			this.items.push(item);
		}
	}

	get size(): number {
		return this.items.length;
	}

	/** 添加条目 */
	push(data: any, weight: number = 1) {
		this.items.push({
			data,
			weight,
			start: 0
		});
	}

	/**
	 * 执行随机抽取
	 * @param count 抽取数量
	 * @param norepeat 是否不重复
	 */
	random(count: number = 1, norepeat = false): any[] {
		let ret = [];
		if (norepeat && count >= this.items.length) {
			console.warn('随机池条目不足, 返还所有抽取条目');
			for (const item of this.items) {
				ret.push(item.data);
			}
			return ret;
		}

		let selected_item: RondomItem = null;
		let number = Math.random() * this.update();
		for (const item of this.items) {
			if (number >= item.start && number < item.start + item.weight) {
				selected_item = item;
				break;
			}
		}

		if (count > 1) {
			let subitems = norepeat ? this.items.filter(item=> item != selected_item) : this.items;
			let subpool = new RandomPool(subitems);
			ret = subpool.random(count -1, norepeat);
		}

		if (selected_item) {
			ret.push(selected_item.data);
		}
		return ret;
	}

	/** 更新权重链 */
	private update() {
		let start = 0;
		for (const item of this.items) {
			item.start = start;
			start += item.weight;
		}
		return start;
	}

};
