import WechatPlatform from "../wechat/WechatPlatform";
import WechatADManager, { WechatADUnitID } from "../wechat/WechatADManager";
import ADManager from "modules/commerce/ADManager";

export default class QQPlatform extends WechatPlatform {
	constructor() {
		super();
	}

	protected create_ad_manager(): ADManager {
		WechatADUnitID.BANNER_AD_UNIT_ID = "186edb4228038cc8b1e15d092c38d5d6";
		WechatADUnitID.REWARD_AD_UNIT_ID = "ef45628090404778bf0ee0f715ef24e0";
		return new WechatADManager();
	}
}
