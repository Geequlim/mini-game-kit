import { EventDispatcher } from "xengine/events/EventDispatcher";
import { SelfHotGameFloatAd, SelfBigBannerAd, SelfBottomBanner } from "./SelfAdUnit";
import XEngine from "xengine/XEngine";
import ZSelfBinder from "view/raw/ZSelf/ZSelfBinder";

export default class SelfAdProvider extends EventDispatcher {

	hot_game_ad:SelfHotGameFloatAd = null;
	big_banner_ad: SelfBigBannerAd = null;
	bottom_banner_ad: SelfBottomBanner = null;

	constructor() {
		super();
		this.hot_game_ad = new SelfHotGameFloatAd(0, 'self');
		this.big_banner_ad = new SelfBigBannerAd(0, 'self');
		this.bottom_banner_ad = new SelfBottomBanner(0, 'self');
		this.big_banner_ad.scroll = false;
	}

	async initialize() {
		if (!XEngine.inst.fairygui_helper.is_package_loaded('ZSelf')) {
			ZSelfBinder.bindAll();
			await XEngine.inst.fairygui_helper.load_package('ZSelf', 'assets/ui/ZSelf.bin', 'assets/ui/ZSelf_atlas0.png');
		}
		await this.hot_game_ad.instance();
		await this.big_banner_ad.instance();
		await this.bottom_banner_ad.instance();
	}
}
