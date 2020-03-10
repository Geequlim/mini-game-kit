import { ResourceManager } from "../res/ResourceManager";
import XStage from "./XStage";
import XResourceLoader from "../res/XResourceLoader";
import { path } from "../utils/path";
import Event from "xengine/events/Event";
import GameConfig, { BackendEngine } from "config";
import DialogWindow, { DialogWindowClass } from "./DialogWindow";
import ToastManager, { IToastView } from "./ToastManager";

export type FairyGUICompoentClass = new() => fairygui.GComponent;


interface FairyGUIAssetProxy {
	getRes(filename: string): any;
}

export interface FairyPakcageInformation {
	name: string;
	data_file: string;
	atlas?: string|string[];
}

export default class FairyGUIHelper implements FairyGUIAssetProxy {

	private stage: XStage = null;
	private res: ResourceManager = null;
	private last_stage_size = {width: 0, height: 0};
	private full_screen_cls: FairyGUICompoentClass[] = [];
	private res_dir: string = '';
	private loaded_packages = new Set<string>();
	private dialog_instances = new Map<string, DialogWindow>();
	private dialog_classes = new Map<string, DialogWindowClass>();

	readonly toast: ToastManager = null;

	constructor(stage: XStage, res: ResourceManager, ui_res_dir: string, binary_extension: string = 'fui') {
		// 资源管理
		this.res = res;
		this.res_dir = ui_res_dir;
		this.res.register_loader(new Set<string>([binary_extension]), XResourceLoader.BinaryLoader);
		if ((fairygui as any).AssetProxy) {
			(fairygui as any).AssetProxy.inst.getRes = this.getRes.bind(this);
		}

		this.toast = new ToastManager();

		// 添加到舞台
		this.stage = stage;
		this.last_stage_size.width = stage.width;
		this.last_stage_size.height = stage.height;
		stage.add_child(fairygui.GRoot.inst.displayObject);
		this.on_stage_resized();
		stage.on(Event.RESIZE, this, this.on_stage_resized);
		// 绑定视图
		this.bind_views();
	}

	async load_package(name: string, binary_file: string, atlas?: string|string[]) {
		switch (typeof(atlas)) {
			case 'string':
				await this.res.load(atlas);
				break;
			case 'object':
				if (atlas.length) {
					for (const img of atlas) {
						await this.res.load(img);
					}
				}
				break;
			default:
				break;
		}
		let buff = await this.res.load(binary_file);
		const ret = fairygui.UIPackage.addPackage(name, buff.native_data as ArrayBuffer);
		this.loaded_packages.add(name);
		return ret;
	}

	getRes(filename: string): any {
		return this.res.get_resource(path.join(this.res_dir, filename)).native_data;
	}

	is_package_loaded(name: string) {
		return this.loaded_packages.has(name);
	}

	protected on_stage_resized() {
		if (this.stage.width != this.last_stage_size.width || this.stage.height != this.last_stage_size.height) {
			fairygui.GRoot.inst.setSize(this.stage.width, this.stage.height);
			for (const c of fairygui.GRoot.inst._children) {
				for (const cls of this.full_screen_cls) {
					if (c instanceof cls) {
						c.setSize(this.stage.width, this.stage.height);
						break;
					}
				}
				c.ensureSizeCorrect();
			}
			this.last_stage_size.width = this.stage.width;
			this.last_stage_size.height = this.stage.height;
		}
	}

	bind_view(url: string, cls: FairyGUICompoentClass, full_screen = false) {
		fairygui.UIObjectFactory.setPackageItemExtension(url, cls);
		if (full_screen) {
			this.full_screen_cls.push(cls);
		}
	}

	register_dialog(dialogClass: DialogWindowClass) {
		this.dialog_classes.set(dialogClass.prototype.uid, dialogClass);
	}

	register_toast_view(toastViewClass: new()=>IToastView) {
		this.bind_view((toastViewClass as any).URL, toastViewClass);
		this.toast.set_toast_view(toastViewClass);
	}

	hide_all_dialogs() {
		for (const name in this.dialog_instances) {
			let dialog:DialogWindow = this.dialog_instances[name];
			if(dialog){
				dialog.hide();
			}
		}
	}

	/**
	 * 展示对话框
	 * @param type 对话框类型，可以是对话框类或对话框的UID
	 * @param params 传给对话框的参数
	 */
	show_dialog(type: DialogWindowClass | string, ...params): DialogWindow {
		const uid = typeof(type) === 'function' ? type.prototype.uid : type;
		let dialog: DialogWindow = this.dialog_instances.get(uid);
		if (!dialog) {
			if (this.dialog_classes.get(uid)) {
				const DialogClass = this.dialog_classes.get(uid);
				dialog = new DialogClass();
				this.dialog_instances.set(uid, dialog);
			}
		}
		if (dialog) {
			dialog.params = params;
			dialog.show();
		} else {
			console.error("不存在对话框", uid);
		}
		return dialog;
	}

	/**
	 * 监听FairyGUI视图对象的点击事件
	 * @param target 点击目标
	 * @param caller 回调的 `this` 绑定
	 * @param listener 回调函数
	 * @param params 回调函数的参数
	 */
	static onClick(target: fairygui.GObject, caller: object, listener: Function, ...params) {
		switch (GameConfig.backend_engine) {
			case BackendEngine.EGRET:
				target['addClickListener'](null, ()=>{
					listener.apply(caller, params);
				});
				break;
			case BackendEngine.LAYA:
				target['onClick'](null, ()=>{
					listener.apply(caller, params);
				});
				break;
			default:
				break;
		}
	}

	protected bind_views() { }
}
