import WechatADManager, { WechatBannerAdUnit, WechatRewardVideoAdUnit, WechatInterstitialAdUnit } from "../wechat/WechatADManager";

export const BytecodeADUnitID = {
	BANNER_AD_UNIT_ID: "",
	REWARD_AD_UNIT_ID: "",
	INTERSTITIAL_AD_UNIT_ID: "",
};

export default class BytecodeADManager extends WechatADManager {
	constructor() {
		super();
	}

	protected create_ads() {
		if (BytecodeADUnitID.BANNER_AD_UNIT_ID) this.banner = new BytecodeBannerAdUnit(BytecodeADUnitID.BANNER_AD_UNIT_ID);
		if (BytecodeADUnitID.REWARD_AD_UNIT_ID) this.video = new BytecodeRewardVideoAdUnit(BytecodeADUnitID.REWARD_AD_UNIT_ID);
		if (BytecodeADUnitID.INTERSTITIAL_AD_UNIT_ID) this.interstitial = new BytecodeInterstitialAdUnit(BytecodeADUnitID.INTERSTITIAL_AD_UNIT_ID);
	}
}


class BytecodeBannerAdUnit extends WechatBannerAdUnit {}
class BytecodeRewardVideoAdUnit extends WechatRewardVideoAdUnit {}
class BytecodeInterstitialAdUnit extends WechatInterstitialAdUnit {}
