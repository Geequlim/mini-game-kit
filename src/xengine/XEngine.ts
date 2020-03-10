import FairyGUIHelper from "xengine/view/FairyGUIHelper";
import XStage from "xengine/view/XStage";
import { ResourceManager } from "xengine/res/ResourceManager";
import { FairyGUIBinder } from "view";
import XResourceLoader from "xengine/res/XResourceLoader";
import XLayaStage from "xengine/view/XStage.laya";
import { SceneManager } from "xengine/view/SceneManager";
import GameConfig, { BackendEngine } from "config";
import XEgretStage from "xengine/view/XStage.egret";
import { Timer } from "xengine/utils/Timer";
import { LayaScene3DLoader, LayaSprite3DLoader } from "./res/ResourceLoader.laya";

export default class XEngine {

	static inst: XEngine = null;

	readonly fairygui_helper: FairyGUIHelper = null;
	readonly stage: XStage = null;
	readonly res: ResourceManager = null;
	readonly scene_manager: SceneManager = null;
	readonly timer: Timer = null;

	private last_frame_time: number = 0;

	constructor(stage: Laya.Stage | egret.Stage) {
		if (global['engine']) {
			debugger; // 不允许多次创建单例
		}

		this.timer = new Timer();
		this.last_frame_time = this.now;

		XEngine.inst = this;
		global['engine'] = this;

		this.res = new ResourceManager();
		global['RES'] = this.res;
		this.res.register_loader(new Set<string>(['png', 'jpg', 'gif', 'jpeg', 'bmp']), XResourceLoader.TextureLoader);
		this.res.register_loader(new Set<string>(['json']), XResourceLoader.JSONLoader);
		this.res.register_loader(new Set<string>(['mp3', 'wav']), XResourceLoader.SoundLoader);
		this.res.register_loader(new Set<string>(['bin', 'fui']), XResourceLoader.BinaryLoader);

		// 创建抽象舞台
		switch (GameConfig.backend_engine) {
			case BackendEngine.LAYA: {
				this.stage = new XLayaStage(stage as Laya.Stage);
				if (typeof(Laya3D) !== 'undefined') {
					this.res.register_loader(new Set<string>(['ls']), LayaScene3DLoader);
					this.res.register_loader(new Set<string>(['lh']), LayaSprite3DLoader);
				}
			} break;
			case BackendEngine.EGRET:
				this.stage = new XEgretStage(stage as egret.Stage);
				break
			default:
				break;
		}

		this.fairygui_helper = new FairyGUIBinder(this.stage, this.res);
		this.scene_manager = new SceneManager(this.stage, this.fairygui_helper);
	}

	start() {
		// 绑定帧回调
		switch (GameConfig.backend_engine) {
			case BackendEngine.LAYA:
				Laya.timer.frameLoop(1, this, this.main_loop);
				break;
			case BackendEngine.EGRET:
				egret.startTick((timeStamp: number)=>{
					this.main_loop();
					return false;
				}, null);
				break
			default:
				break;
		}
	}

	main_loop() {
		const now = this.now;
		const delta = Math.min(now - this.last_frame_time, 0.1);
		this.last_frame_time = now;
		this.timer.update(delta);
		return delta;
	}

	get now(): number {
		return (new Date()).getTime() / 1000.0;
	}
}
