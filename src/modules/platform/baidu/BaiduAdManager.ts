import WechatADManager, { WechatBannerAdUnit, WechatADUnitID, WechatRewardVideoAdUnit, WechatInterstitialAdUnit } from "../wechat/WechatADManager";
import Game from "xengine/game/Game";
import { Vector2 } from "xengine/utils/math";

const start_time = (new Date()).getTime() / 1000;

export default class BaiduAdManager extends WechatADManager {
	protected create_ads() {
		if (WechatADUnitID.BANNER_AD_UNIT_ID) this.banner = new BaiduBannerAdUnit(WechatADUnitID.BANNER_AD_UNIT_ID);
		if (WechatADUnitID.REWARD_AD_UNIT_ID) this.video = new WechatRewardVideoAdUnit(WechatADUnitID.REWARD_AD_UNIT_ID);
		if (WechatADUnitID.INTERSTITIAL_AD_UNIT_ID) this.interstitial = new WechatInterstitialAdUnit(WechatADUnitID.INTERSTITIAL_AD_UNIT_ID);
	}
};

class BaiduBannerAdUnit extends WechatBannerAdUnit {

	constructor(id: string) {
		super(id);
	}

	async instance() {
		const wait_duration = Math.max(0, 5 - ((new Date()).getTime() / 1000) - start_time);
		await Game.inst.timer.wait(wait_duration);
		return await super.instance();
	}

		/** 展示广告 */
	async show(pos?: Vector2) {
		if (!this.native_ad) {
			await this.instance();
		}
		await super.show(pos);
	};
}
