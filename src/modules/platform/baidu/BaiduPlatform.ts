import WechatPlatform from "../wechat/WechatPlatform";
import WechatADManager, { WechatADUnitID } from "../wechat/WechatADManager";
import BaiduAdManager from "./BaiduAdManager";
const appSid = "bce75ddc";

/** 将百度的 `swan` 绑定给 `wx` 对象，这样便可以继续使用 `wx` 的 API */
(function add_swan_wx_adaptor() {
	if (typeof window['swan'] != 'undefined') {
		window['wx'] = window['swan'];
		global['wx'] = window['swan'];
		if (true) { // 注入百度API差异化适配
			const raw_createBannerAd_func = wx['createBannerAd'];
			wx['createBannerAd'] = (function(params){
				let args = {
					...params,
					appSid
				};
				return raw_createBannerAd_func(args);
			}).bind(window['swan']);

			const raw_createRewardedVideoAd_func = wx['createRewardedVideoAd'];
			wx['createRewardedVideoAd'] = (function(params){
				let args = {
					...params,
					appSid
				};
				return raw_createRewardedVideoAd_func(args);
			}).bind(window['swan']);
		}
	}
})();

export default class BaiduPlatform extends WechatPlatform {
	constructor() {
		super();
	}

	protected create_ad_manager() {
		WechatADUnitID.BANNER_AD_UNIT_ID = "6580748";
		WechatADUnitID.REWARD_AD_UNIT_ID = "6580749";
		return new BaiduAdManager();
	}
}
