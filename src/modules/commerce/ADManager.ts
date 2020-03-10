import { EventDispatcher } from "xengine/events/EventDispatcher";
import { Vector2 } from "xengine/utils/math";

/** 抽象广告单元 */
export class ADUnit extends EventDispatcher {

	id: string;

	constructor(id?: string) {
		super();
		this.id = id;
	}

	/** 创建广告 */
	async instance() {}

	/** 销毁广告 */
	async destrory() {};

	/** 展示广告 */
	async show(pos?: Vector2) {};

	/** 隐藏广告 */
	async hide() {};
}


export default class ADManager extends EventDispatcher {
	constructor() {
		super();
	}

	async initialize() {}

	/** 展示 Banner 广告  */
	show_banner(pos?: Vector2): Promise<void> {
		return new Promise((resolve, reject) => { resolve(); });
	}

	/** 隐藏 Banner 广告 */
	hide_banner(): Promise<void> {
		return new Promise((resolve, reject) => {
			resolve();
		});
	}

	/** 展示插页广告 */
	show_intersitial(): Promise<void> {
		return new Promise((resolve, reject) => { resolve(); });
	}

	/** 展示激励视频广告 */
	show_reward_video(): Promise<void> {
		return new Promise((resolve, reject) => { resolve(); });
	}
}
