import UI_Splash from "./raw/Splash/UI_Splash";
import SplashBinder from "./raw/Splash/SplashBinder";
import CommonBinder from "./raw/Common/CommonBinder";
import MainBinder from "./raw/Main/MainBinder";
import FairyGUIHelper from "xengine/view/FairyGUIHelper";
import { ResourceManager } from "xengine/res/ResourceManager";
import XStage from "xengine/view/XStage";
import SplashScene from "./splash/SplashScene";
import TestDialog from "./dialogs/TestDialog";
import MainScene from "./main/MainScene";
import UI_Main from "./raw/Main/UI_Main";
import ToastView from "./ToastView";

export class FairyGUIBinder extends FairyGUIHelper {
	constructor(stage: XStage, res: ResourceManager, res_dir: string = 'assets/ui', binary_extension = 'bin') {
		super(stage, res, res_dir, binary_extension);
	}

	protected bind_views() {
		SplashBinder.bindAll();
		CommonBinder.bindAll();
		MainBinder.bindAll();
		// 绑定视图类
		this.bind_view(UI_Splash.URL, SplashScene, true);
		this.bind_view(UI_Main.URL, MainScene, true);

		// 注册 Toast 视图
		this.register_toast_view(ToastView);

		// 注册对话框
		this.register_dialog(TestDialog);
	}
}
