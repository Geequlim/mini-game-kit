import { EventDispatcher } from "../events/EventDispatcher";
import { Vector2 } from "../utils/math";

/**
 * @abstract
 * 引擎无关的舞台类
 */
export default class XStage extends EventDispatcher {

	/** 引擎相关的舞台对象 */
	readonly native_stage: any = null;

	private _size = new Vector2();
	/** 获取舞台尺寸 */
	get size(): Vector2 {
		this._size.width = this.width;
		this._size.height = this.height;
		return this._size;
	}

	constructor(native_stage: any) {
		super();
		this.native_stage = native_stage;
	}

	/** @virtual 舞台宽度 */
	get width(): number { return 0; }

	/** @virtual 舞台高度 */
	get height(): number { return 0; }

	/** @virtual 添加节点到舞台 */
	add_child<T>(node: T): T {
		return node;
	}
}
