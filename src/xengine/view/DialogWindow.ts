import GameConfig from "config";
import { Vector2 } from "xengine/utils/math";

const DESIGN_SCREEN_SIZE = new Vector2(GameConfig.width, GameConfig.height);

export interface DialogInfo {
	inst: fairygui.GComponent,
	title?: string,
	modal?: boolean,
}

export default class DialogWindow extends fairygui.Window {

	/** @readonly 对话框ID */
	uid: string = '';

	/** 参数 */
	params: any[] = [];

	/** 对话框视图 */
	dialog_view: fairygui.GComponent = null;

	private _tween: Laya.Tween = new Laya.Tween();

	constructor() {
		super();
		const dialog = this.makeDialog();
		this.dialog_view = dialog.inst;

		if (!dialog || !dialog.inst && window['DEBUG_ENABLED']) {
			// 请实现 makeDialog 方法来创建对话框实例
			debugger;
		}
		this.contentPane = dialog.inst;
		const scale = Math.min(Laya.stage.width / DESIGN_SCREEN_SIZE.width, Laya.stage.height / DESIGN_SCREEN_SIZE.height);
		// this.contentPane.setSize(this.contentPane.width * scale, this.contentPane.height * scale);
		this.setSize(this.contentPane.width, this.contentPane.height, true);
		this.setXY(Laya.stage.width/2, Laya.stage.height/2);
		this.contentPane.setPivot(0.5, 0.5, true);
		this.contentPane.setXY(0, 0);
		this.modal = dialog.modal;
		fairygui.GRoot.inst['_modalLayer'].displayObject.alpha = 0.4;
	}

	protected makeDialog(): DialogInfo {
		return {
			inst: null,
			title: '',
			modal: true,
		}
	}

	/** 初始化回调 */
	onInit() {
		super.onInit();
	}

	/** 即将展现时的回调，一般在此处更新窗口界面 */
	onReadyToShow() {}

	/** 即弹窗动画播放完，完全展现在用户面前时的回调 */
	onShown() {
		super.onShown();
	}

	/** 隐藏后回调 */
	onHide() {
		super.onHide();
	}

	doShowAnimation() {
		this.onReadyToShow();
		this.displayObject.scale(0, 0);
		this._tween.clear();
		this._tween.to(
			this.displayObject,
			{ scaleX: 1, scaleY: 1,},
			260,
			null,
			Laya.Handler.create(this, this.onShown)
		)
	}


	doHideAnimation() {
		this.displayObject.scale(1, 1);
		this._tween.clear();
		this._tween.to(
			this.displayObject,
			{ scaleX: 0, scaleY: 0,},
			260,
			null,
			Laya.Handler.create(this, this.hideImmediately)
		);
	}

}

export type DialogWindowClass = new() => DialogWindow;

/** 定义对话框 */
export function dialog(uid: string) {
	return function(target: DialogWindowClass) {
		target.prototype.uid = uid;
	}
}
