import ADManager, { ADUnit } from "modules/commerce/ADManager";
import { Vector2 } from "xengine/utils/math";
import { WatchRewardVideoFailed } from "../platform";
import XEngine from "xengine/XEngine";
import GameConfig, { PlatformValue } from "config";

export const WechatADUnitID = {
	BANNER_AD_UNIT_ID: "",
	REWARD_AD_UNIT_ID: "",
	INTERSTITIAL_AD_UNIT_ID: "",
};


export default class WechatADManager extends ADManager {

	protected banner: WechatBannerAdUnit = null;
	protected video: WechatRewardVideoAdUnit = null;
	protected interstitial: WechatInterstitialAdUnit = null;

	constructor() {
		super();
		this.create_ads();
	}

	protected create_ads() {
		if (WechatADUnitID.BANNER_AD_UNIT_ID) this.banner = new WechatBannerAdUnit(WechatADUnitID.BANNER_AD_UNIT_ID);
		if (WechatADUnitID.REWARD_AD_UNIT_ID) this.video = new WechatRewardVideoAdUnit(WechatADUnitID.REWARD_AD_UNIT_ID);
		if (WechatADUnitID.INTERSTITIAL_AD_UNIT_ID) this.interstitial = new WechatInterstitialAdUnit(WechatADUnitID.INTERSTITIAL_AD_UNIT_ID);
	}

	async initialize() {
		if (this.banner) {
			try { await this.banner.instance(); } catch (error) { console.error("微信广告:", "创建Banner广告失败", error); }
		}
		if (this.video) {
			try { await this.video.instance(); } catch (error) { console.error("微信广告:", "创建视频广告失败", error); }
		}
		if (this.interstitial) {
			try { await this.interstitial.instance(); } catch (error) { console.error("微信广告:", "创建插页广告失败", error); }
		}
	}

	show_banner(pos?: Vector2): Promise<void> {
		console.log("微信广告: 尝试展示Banner");
		return new Promise((resolve, reject) => {
			if (this.banner) {
				this.banner.show(pos).then(()=> resolve()).catch(()=>reject());
			} else {
				reject();
			}
		});
	}

	/** 隐藏 Banner 广告 */
	hide_banner(): Promise<void> {
		console.log("微信广告: 尝试隐藏Banner");
		return new Promise((resolve, reject) => {
			if (this.banner) {
				this.banner.hide();
				resolve();
			} else {
				reject();
			}
		});
	}

	show_reward_video(): Promise<void> {
		return new Promise((resolve, reject) => {
			if (this.video) {
				this.video.show().then(()=> resolve()).catch((e)=>reject(e));
			} else {
				reject(WatchRewardVideoFailed.CONFIGURATION_ERROR);
			}
		});
	}

	show_intersitial(): Promise<void> {
		return new Promise((resolve, reject) => {
			if (this.interstitial) {
				this.banner.show().then(()=> resolve()).catch(()=>reject());
			} else {
				reject();
			}
		});
	}

}


export class WechatBannerAdUnit extends ADUnit {

	readonly refresh_interval: number = 30;
	protected native_ad = null;
	protected screen_size: Vector2 = null;
	protected height: number = 105;

	/** 创建广告 */
	instance(): Promise<void> {
		return new Promise((resolve, reject) => {
			if (!this.native_ad) {
				const info = wx.getSystemInfoSync();
				this.screen_size = new Vector2(info.screenWidth, info.screenHeight);
				const width = 300;
				const native_ad = wx['createBannerAd']({
					adUnitId: this.id,
					adIntervals: this.refresh_interval,
					style: {left: (info.windowWidth - width) / 2, top:0, width}
				});
				const initialize_size = (size)=>{
					native_ad.offResize(initialize_size);

					size = size || {};
					if (!size.width) size.width = 208;
					if (!size.height) size.height = 117;
					this.height = size.height;

					native_ad.style.left = (info.windowWidth - ((size.width) || native_ad.style.realWidth || native_ad.style.width)) / 2;
					native_ad.style.top = info.windowHeight - ((size.height) || native_ad.style.realHeight || native_ad.style.height);
				};
				native_ad.onResize(initialize_size);

				native_ad.onLoad(() => {
					this.native_ad = native_ad;
					console.log('微信广告:', 'Banner加载成功', this.id, native_ad);
					resolve();
				});
				native_ad.onError(err => {
					console.log('微信广告:', 'Banner加载失败', this.id, err);
					native_ad.offResize(initialize_size);
					reject();
				});
			} else {
				resolve();
			}
		});
	}

	/** 销毁广告 */
	async destrory() {
		if (this.native_ad) {
			this.native_ad.destroy();
			this.native_ad = null;
		}
	};

	/** 展示广告 */
	async show(pos?: Vector2) {
		if (this.native_ad) {
			this.set_position(pos);
			this.native_ad.show();
		}
	};

	/** 隐藏广告 */
	async hide() {
		if (this.native_ad) {
			this.native_ad.hide();
		}
	};

	/** 设置位置（设计分辨率坐标系） */
	set_position(pos: Vector2) {
		if (this.native_ad) {
			if (pos) {
				const viewsize = XEngine.inst.stage.size;
				const scalar = this.screen_size.divide(viewsize);
				this.native_ad.style.left = scalar.x * pos.x;
				this.native_ad.style.top = scalar.y * pos.y;
			} else {
				const info = wx.getSystemInfoSync();
				let height = this.native_ad.style.realHeight || this.native_ad.style.height || this.height;
				this.native_ad.style.top = info.screenHeight - height;
			}
		}
	}
}

enum Events {
	VIDEO_PLAY_DONE = 'VIDEO_PLAY_DONE',
	VIDEO_PLAY_CANCLED = 'VIDEO_PLAY_CANCLED',
}

export class WechatRewardVideoAdUnit extends ADUnit {
	protected native_ad = null;

	/** 创建广告 */
	async instance() {
		if (!this.native_ad) {
			this.native_ad = this.create_reward_video();
		}
	}

	/** 销毁广告 */
	async destrory() {
		if (this.native_ad) {
			this.native_ad.destroy();
			this.native_ad = null;
		}
	};

	/** 展示广告 */
	show(pos?: Vector2): Promise<void> {
		return new Promise((resolve, reject) => {
			if (this.native_ad) {
				if (GameConfig.platform != PlatformValue.BYTEDANCE) {
					wx.showLoading({ title: "加载中", mask: true} as any);
					Laya.timer.once(2000, null, ()=>{ wx.hideLoading(); });
				}
				this.offAll(Events.VIDEO_PLAY_DONE);
				this.offAll(Events.VIDEO_PLAY_CANCLED);
				this.on(Events.VIDEO_PLAY_DONE, null, ()=>resolve());
				this.on(Events.VIDEO_PLAY_CANCLED, null, ()=>reject(WatchRewardVideoFailed.WATCH_CANCELED));
				this.native_ad.show().catch(()=>{
					reject(WatchRewardVideoFailed.NO_VIDEO_FILLED);
				});
			} else {
				reject(WatchRewardVideoFailed.CONFIGURATION_ERROR);
			}
		});
	};

	/** 隐藏广告 */
	hide(): Promise<void> {
		return new Promise((resolve, reject) => {
			reject();
		});
	};

	// 激励视频
	private create_reward_video() {
		let adUnitId = this.id;
		if(adUnitId) {
			const rewardedVideoAd = wx['createRewardedVideoAd']({ adUnitId });
			rewardedVideoAd.onLoad(() => { console.log('微信广告:', '激励视频加载成功', adUnitId)});
			rewardedVideoAd.onError(err => { console.log('微信广告:', '激励视频加载失败', adUnitId, err)});
			rewardedVideoAd.onClose(res => {
				// 用户点击了【关闭广告】按钮
				// 小于 2.1.0 的基础库版本，res 是一个 undefined
				if (res && res.isEnded || res === undefined) {
					// 正常播放结束，可以下发游戏奖励
					this.event(Events.VIDEO_PLAY_DONE);
				} else {
					this.event(Events.VIDEO_PLAY_CANCLED);
				}
				rewardedVideoAd.load();
			});
			rewardedVideoAd.load();
			return rewardedVideoAd;
		}
		return null;
	};
}

export class WechatInterstitialAdUnit extends ADUnit {

	private native_ad = null;

	async instance() {
		if (!this.native_ad) {
			this.native_ad = wx['createInterstitialAd']({
				adUnitId: this.id
			});
			this.native_ad.load();
			this.native_ad.onClose(()=>{this.native_ad.load()});
		}
	}

	async show() {
		if (this.native_ad) {
			await this.native_ad.show();
		}
	}
}
