import { EventDispatcher } from "xengine/events/EventDispatcher";
import XEngine from "xengine/XEngine";
import NodePool from "xengine/utils/NodePool";

export interface IToastView extends fairygui.GComponent {
	set_message(message: string, ...params);
	on_popup(): void;
	readonly popup_duration: number;
}

type ToastViewClass = new() => IToastView;

export default class ToastManager extends EventDispatcher {

	private TV: ToastViewClass = null;

	private pool: NodePool = null;

	set_toast_view(cls: ToastViewClass) {
		this.TV = cls;
	}

	popup(message: string, ...params) {
		if (!this.TV) {
			throw "无法创建对话Toast";
		}

		if (!this.pool && this.TV) {
			this.pool = new NodePool((this.TV as any).createInstance, 5);
		}

		if (this.pool) {
			let tv = (this.pool.get() as IToastView);
			tv.set_message(message, params);
			fairygui.GRoot.inst.addChild(tv);
			tv.on_popup();
			XEngine.inst.timer.once(tv.popup_duration, ()=>{
				this.pool.release(tv);
			});
		}
	}
}
