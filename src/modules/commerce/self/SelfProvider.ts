import APIProvider, { provider, FloadAdItem } from "../APIProvider";
import Game from "xengine/game/Game";
import SelfAdProvider from "./SelfAdProvider";
import Platform from "modules/platform/platform";

export interface OnlineConfig {
}

@provider('self')
export default class SelfProvider extends APIProvider {


	ad_provider: SelfAdProvider = null;
	constructor(id) {
		super(id);
		this.ad_provider = new SelfAdProvider();
	}

	async initialize() {
		await this.ad_provider.initialize();
	}

	get configs(): OnlineConfig {
		return {};
	}

	async click_float_ad_item(item: FloadAdItem) {
		try {
			const platform = Game.inst.get_module<Platform>(Platform);
			await platform.navigate_to_app(item.id);
		} catch (error) {
			// XEngine.inst.fairygui_helper.show_dialog(GameCenterDialog);
			console.warn("跳转到APP失败", error);
		}
	}

	private _ads: FloadAdItem[] = null;

	/** 广告配置列表 */
	get_float_ads(flg:string,id:number): FloadAdItem[] {
		return this._ads || [];
	}

}
