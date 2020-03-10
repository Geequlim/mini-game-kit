import Platform from "../platform";
import QuTouTiaoAdManager from "./QuTouTiaoAdManager";

export default class QuTouTiaoPlatform extends Platform {
	constructor() {
		super();
		this.ad_manager = new QuTouTiaoAdManager();
	}
}
