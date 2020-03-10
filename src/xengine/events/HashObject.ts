/** 可以为空的类型标记 */
export type Nullable < T > = T | null;

/**
 * 哈希计数
 */
let $hashCount: number = 1;

/**
 * 引擎顶级对象。
 * 框架内所有对象的基类，为对象实例提供唯一的`hashCode`值。
 */
export class HashObject {

	/**
	 * 创建一个 HashObject 对象
	 */
	public constructor() {
		this.$hashCode = $hashCount++;
	}

	private $hashCode: number;

	/**
	 * 返回此对象唯一的哈希值,用于唯一确定一个对象。`hashCode` 为大于等于`1`的整数。
	 */
	public get hashCode(): number {
		return this.$hashCode;
	}
}
