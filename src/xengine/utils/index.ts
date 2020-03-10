// 移除数组元素
export function array_erase<T>(arr: T[], ele: T): T[] {
	return arr.filter(item => item != ele);
}

/** 随机打乱数组 */
export function shuffle_array (array: any[]){
	for (let i = array.length - 1; i > 0; i--) {
		const rand = Math.floor(Math.random() * (i + 1));
		[array[i], array[rand]] = [array[rand], array[i]];
	}
}


/**
 * 范围内取值
 *
 * @export
 * @param {number} value 输入值
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns {number} 返回值
 */
export function clamp(value: number, min: number, max: number): number {
	if (value <= max && value >= min)
		return value;
	if(value > max)
		return max;
	if(value < min)
		return min;
}

/** 范围内随机 */
export function random_range(min: number, max: number): number {
	return Math.random() * (max - min) + min;
}

/** 从数组中随机取一个元素 */
export function random_one<T>(items: T[]): T {
	return items[Math.floor(Math.random() * items.length)];
}

/** 从数组中随机取一个非空元素 */
export function random_truethy_one<T>(items: T[]): T {
	let pool = items.filter(i => i ? true : false);
	return pool[Math.floor(Math.random() * pool.length)];
}

/**
* 格式化秒数为分钟字符串
*
* @export
* @param {number} second
* @returns {string}
*/
export function format_time_duration(second: number): string {
	let m: any = Math.floor(second / 60);
	let s: any = Math.floor(second - m * 60);
	if (m < 10)
		m = `0${m}`;
	if (s < 10)
		s = `0${s}`;
	return `${m}:${s}`;
}
