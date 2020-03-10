import GameConfig, { PlatformValue } from "./config";
import SplashScene from "view/splash/SplashScene";

import { SceneInfomation } from "xengine/view/SceneManager";
import MainScene from "view/main/MainScene";
import XEngine from "xengine/XEngine";
import Game, { Events } from "xengine/game/Game";
import XStorage from "xengine/storage/XStorage";
import DailyTask from "modules/common/DailyTask";
import { AudioModule } from "modules/audio";
import WechatPlatform from "modules/platform/wechat/WechatPlatform";
import Platform from "modules/platform/platform";
import { ModuleClass } from "xengine/game/Module";
import QQPlatform from "modules/platform/qq/QQPlatform";
import BaiduPlatform from "modules/platform/baidu/BaiduPlatform";
import OppoPlatform from "modules/platform/oppo/OppoPlatform";
import CommerceModule from "modules/commerce/CommerceModule";
import BytedancePlatform from "modules/platform/bytedance/BytedancePlatform";
import YunquBinder from "view/raw/Yunqu/YunquBinder";
import VivoPlatform from "modules/platform/vivo/VivoPlatform";
import QuTouTiaoPlatform from "modules/platform/qtt/QuTouTiaoPlatform";

const SCENES: {[key: string]: SceneInfomation} = {
	Splash: {
		name: 'Splash',
		package: {
			name: 'Splash',
			data_file: 'assets/ui/Splash.bin',
			atlas: 'assets/ui/Splash_atlas0.png',
		},
		scene_class: SplashScene,
	},
	Main: {
		name: 'Main',
		package: {
			name: 'Main',
			data_file: 'assets/ui/Main.bin',
			atlas: 'assets/ui/Main_atlas0.png'
		},
		scene_class: MainScene,
		load_dependences: async function(){
			if (!XEngine.inst.fairygui_helper.is_package_loaded('Common')) {
				await XEngine.inst.fairygui_helper.load_package('Common', 'assets/ui/Common.bin', 'assets/ui/Common_atlas0.png');
			}
			if (!XEngine.inst.fairygui_helper.is_package_loaded('Yunqu')) {
				YunquBinder.bindAll();
				await XEngine.inst.fairygui_helper.load_package('Yunqu', 'assets/ui/Yunqu.bin', 'assets/ui/Yunqu_atlas0.png');
			}
		}
	}
}
window['SCENES'] = SCENES;

class Engine extends XEngine {

	public game: Game = null;

	constructor(stage: Laya.Stage | egret.Stage) {
		super(stage);

		let PlatfomCls: ModuleClass = null;
		switch (GameConfig.platform) {
			case PlatformValue.WECHAT:
				PlatfomCls = WechatPlatform;
				break;
			case PlatformValue.QQ:
				Laya.MiniAdpter = Laya.QQMiniAdapter;
				PlatfomCls = QQPlatform;
				break;
			case PlatformValue.BAIDU:
				Laya.MiniAdpter = Laya.BMiniAdapter;
				PlatfomCls = BaiduPlatform;
				break;
			case PlatformValue.OPPO:
				Laya.MiniAdpter = Laya.QGMiniAdapter;
				PlatfomCls = OppoPlatform;
				break;
			case PlatformValue.BYTEDANCE:
				PlatfomCls = BytedancePlatform;
				break;
			case PlatformValue.VIVO:
				Laya.MiniAdpter = Laya.VVMiniAdapter;
				PlatfomCls = VivoPlatform;
				break;
			case PlatformValue.QTT:
				PlatfomCls = QuTouTiaoPlatform;
				break;
			case PlatformValue.WEB:
			default:
				PlatfomCls = Platform;
				break;
		}
		// 启动游戏逻辑
		this.game = new Game({
			modules: [
				PlatfomCls,
				DailyTask,
				AudioModule,
				CommerceModule,
			],
			storage: new XStorage(),
			options: {},
		});

		// 注册场景
		this.scene_manager.register_scene(SCENES.Splash, true, true);
		this.scene_manager.register_scene(SCENES.Main, true);
	}


	start() {
		super.start();
		this.game.once(Events.LOGIC_STARTED, null, ()=>{
			// 自动存档
			this.game.timer.loop(60, this.game.query_save.bind(this.game));
		});
	}

	main_loop(): number {
		const dt = super.main_loop();
		this.game.update(dt);
		return dt;
	}

}

async function main() {
	GameConfig.init();
	const engine = new Engine(GameConfig.backend_stage);
	engine.start();
};

main();
