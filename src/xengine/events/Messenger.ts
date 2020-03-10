import { EventDispatcher } from "./EventDispatcher";

export type Message = string;
export type MessageLisener = (type: Message, data?: any)=> boolean;

export default class Messenger extends EventDispatcher {

	liseners: MessageLisener[] = [];

	/**
	 * 派发事件。
	 * @param type	事件类型。
	 * @param data	（可选）回调数据。<b>注意：</b>如果是需要传递多个参数 p1,p2,p3,...可以使用数组结构如：[p1,p2,p3,...] ；如果需要回调单个参数 p ，且 p 是一个数组，则需要使用结构如：[p]，其他的单个参数 p ，可以直接传入参数 p。
	 * @return 此事件类型是否有侦听者，如果有侦听者则值为 true，否则值为 false。
	 */
	event(type: Message, data?: any): boolean {

		for (const l of this.liseners) {
			if (l(type, data)) {
				return true;
			}
		}
		return super.event(type, data);
	}

	add_lisener(lisener: MessageLisener) {
		if (lisener) {
			this.liseners.push(lisener);
		}
	}

	remove_lisener(lisener: MessageLisener) {
		let idx = this.liseners.indexOf(lisener);
		if (idx != -1) {
			this.liseners.splice(idx, 1);
		}
	}
}
