import { IToastView } from "xengine/view/ToastManager";
import UI_ToastView from "./raw/Common/UI_ToastView";
import XEngine from "xengine/XEngine";

export default class ToastView extends UI_ToastView implements IToastView {

	get popup_duration(): number {
		return 3;
	};

	constructFromResource() {
		super.constructFromResource();
	}

	on_popup() {
		this.setXY((XEngine.inst.stage.width - this.width)/2, 30);
		this.m_anim.play();
	}

	set_message(message: string, ...params) {
		this.m_text.text = message;
	}
}
