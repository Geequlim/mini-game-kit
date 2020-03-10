import DialogWindow, { DialogInfo, dialog } from "xengine/view/DialogWindow";
import UI_TestDialog from "view/raw/Main/UI_TestDialog";
import { FairyGUIBinder } from "view";

@dialog("test")
export default class TestDialog extends DialogWindow {

	makeDialog(): DialogInfo {
		return {
			inst: UI_TestDialog.createInstance(),
			modal: true,
			title: '测试对话框'
		};
	}

	constructor() {
		super();
		FairyGUIBinder.onClick((this.dialog_view as UI_TestDialog).m_bt_close, this, this.hide);
	}

	onReadyToShow() {
		if (this.params.length) {
			(this.dialog_view as UI_TestDialog).m_lb_message.text = this.params[0];
		}
	}
}
