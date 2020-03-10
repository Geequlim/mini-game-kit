import { EventDispatcher } from "xengine/events/EventDispatcher";
import { Nullable } from "xengine/events/HashObject";

/**
 * 逻辑模块
 * 代表一个逻辑功能，例如成就、商店、战斗等
 */
export default class Module extends EventDispatcher {

	/** @readonly 模块名称 */
	name: string = '';

	constructor(options?: any) { super(); };

	/** game 对象和所有模块创建完毕后执行 */
	public setup() {}

	/** 初始化 */
	public initialize() {}

	/** 逻辑更新 */
	public update(dt: number) {}

	/** 模块开始 */
	public start() {}

	/** 恒更新，不考虑逻辑是否初始化完毕或暂停等逻辑，固定每帧调用 */
	public always_update(dt: number) {}

	/** 读档 */
	public load(data: object) {}

	/** 存档 */
	public save(): Nullable<object> { return undefined; }

	/** 模块是否准备就绪 */
	public is_ready(): boolean { return true; }
}

export type ModuleClass = new(options?: any)=> Module;

/** 定义模块 */
export function game_module(name: string) {
	return function(target: ModuleClass) {
		target.prototype.name = name;
	}
}
