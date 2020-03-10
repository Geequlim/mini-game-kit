import ADManager, { ADUnit } from "modules/commerce/ADManager";
import { Vector2 } from "xengine/utils/math";
import { WatchRewardVideoFailed } from "../platform";
import XEngine from "xengine/XEngine";
import GameConfig from "config";

export const OppoADUnitID = {
	APPID: "",
	BANNER_AD_UNIT_ID: "",
	REWARD_AD_UNIT_ID: "",
	INTERSTITIAL_AD_UNIT_ID: "",
	NATIVE_AD_UNIT_ID: "",
};

export default class OppoADManager extends ADManager {

	protected banner: OppoBannerAdUnit = null;
	protected video: OppoRewardVideoAdUnit = null;
	protected interstitial: OppoInterstitialAdUnit = null;
	protected native_banner: OppoNativeAdUnit = null;

	constructor() {
		super();
		qg.initAdService({
			appId: OppoADUnitID.APPID,
			isDebug: true || GameConfig.debug,
			success: ()=>{
				console.log("oppo广告", "初始化广告服务成功", OppoADUnitID.APPID);
				this.create_ads();
			},
			fail: ()=>{
				console.error("oppo广告", "初始化广告服务失败")
			}
		});
	}

	protected create_ads() {
		if (OppoADUnitID.BANNER_AD_UNIT_ID) this.banner = new OppoBannerAdUnit(OppoADUnitID.BANNER_AD_UNIT_ID);
		if (OppoADUnitID.REWARD_AD_UNIT_ID) this.video = new OppoRewardVideoAdUnit(OppoADUnitID.REWARD_AD_UNIT_ID);
		if (OppoADUnitID.INTERSTITIAL_AD_UNIT_ID) this.interstitial = new OppoInterstitialAdUnit(OppoADUnitID.INTERSTITIAL_AD_UNIT_ID);
		if (OppoADUnitID.NATIVE_AD_UNIT_ID) this.native_banner = new OppoNativeAdUnit(OppoADUnitID.NATIVE_AD_UNIT_ID);
	}

	async initialize() {
		console.log("OPPO广告", "初始化广告管理器", OppoADUnitID);
		if (this.banner) {
			try { await this.banner.instance(); } catch (error) { console.error("OPPO广告:", "创建Banner广告失败", error); }
		}
		if (this.video) {
			try { await this.video.instance(); } catch (error) { console.error("OPPO广告:", "创建视频广告失败", error); }
		}
		if (this.interstitial) {
			try { await this.interstitial.instance(); } catch (error) { console.error("OPPO广告:", "创建插页广告失败", error); }
		}
		if (this.native_banner) {
			try { await this.native_banner.instance(); } catch (error) { console.error("OPPO广告:", "创建原生广告失败", error); }
		}
	}

	show_banner(pos?: Vector2): Promise<void> {
		console.log("OPPO广告: 尝试展示Banner");
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
		console.log("OPPO广告: 尝试隐藏Banner");
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

	show_native_ad(pos: Vector2, scale = 1) {
		if (this.native_banner) {
			this.native_banner.show(pos, scale);
		}
	}

	hide_native_ad() {
		if (this.native_banner) {
			this.native_banner.hide();
		}
	}

}


export class OppoBannerAdUnit extends ADUnit {

	readonly refresh_interval: number = 30;
	protected native_ad = null;
	protected screen_size: Vector2 = null;
	private is_visiable = false;

	/** 创建广告 */
	instance(): Promise<void> {
		return new Promise((resolve, reject) => {
			if (!this.native_ad) {
				const info = qg.getSystemInfoSync();
				this.screen_size = new Vector2(info.screenWidth, info.screenHeight);
				const width = info.screenWidth;
				const height = 100;
				const native_ad = qg['createBannerAd']({
					posId: this.id,
					adIntervals: this.refresh_interval,
					style: {left: (info.windowWidth - width) / 2, top:info.windowHeight - 100, width, height}
				}) as any;
				const initialize_size = ()=>{
					Laya.timer.once(1000, null, ()=>{
						native_ad.style.top = info.windowHeight - 100;
						native_ad.style.left = (info.windowWidth - native_ad.style.width) / 2;
					});
					native_ad.offResize(initialize_size);
				};
				native_ad.onResize(initialize_size);
				native_ad.onLoad(() => {
					console.log('OPPO广告:', 'Banner加载成功', this.id);
					this.native_ad = native_ad;
					if (!this.is_visiable) {
						this.native_ad.hide();
					}
					resolve();
				});
				native_ad.onError(err => {
					console.error('OPPO广告:', 'Banner加载失败', this.id, err);
					native_ad.offResize(initialize_size);
					reject();
				});
				this.native_ad = native_ad;
				resolve();
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
		this.is_visiable = false;
	};

	/** 展示广告 */
	async show(pos?: Vector2) {
		if (this.native_ad) {
			this.set_position(pos);
			this.native_ad.show();
		}
		this.is_visiable = true;
	};

	/** 隐藏广告 */
	async hide() {
		if (this.native_ad) {
			this.native_ad.hide();
		}
		this.is_visiable = false;
	};

	/** 设置位置（设计分辨率坐标系） */
	set_position(pos: Vector2) {
		if (this.native_ad) {
			if (pos && false) {
				const viewsize = XEngine.inst.stage.size;
				const scalar = this.screen_size.divide(viewsize);
				this.native_ad.style.left = scalar.x * pos.x;
				this.native_ad.style.top = scalar.y * pos.y;
			} else {
				const info = qg.getSystemInfoSync();
				this.native_ad.style.top = info.windowHeight - 100;
			}
		}
	}
}

enum Events {
	VIDEO_PLAY_DONE = 'VIDEO_PLAY_DONE',
	VIDEO_PLAY_CANCLED = 'VIDEO_PLAY_CANCLED',
}

export class OppoRewardVideoAdUnit extends ADUnit {
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
				// qg.showLoading({ title: "加载中", mask: true} as any);
				// Laya.timer.once(2000, null, ()=>{ qg.hideLoading();});
				this.offAll(Events.VIDEO_PLAY_DONE);
				this.offAll(Events.VIDEO_PLAY_CANCLED);
				this.on(Events.VIDEO_PLAY_DONE, null, ()=>resolve());
				this.on(Events.VIDEO_PLAY_CANCLED, null, ()=>reject(WatchRewardVideoFailed.WATCH_CANCELED));
				this.native_ad.show();
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
			const rewardedVideoAd = qg['createRewardedVideoAd']({ posId: adUnitId }) as any;
			rewardedVideoAd.onLoad(() => { console.log('OPPO广告:', '激励视频加载成功', adUnitId)});
			rewardedVideoAd.onError(err => { console.error('OPPO广告:', '激励视频加载失败', adUnitId, err)});
			rewardedVideoAd.onClose(res => {
				// 用户点击了【关闭广告】按钮
				console.log('OPPO广告:', '激励视频关闭', res);
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

export class OppoInterstitialAdUnit extends ADUnit {

	private native_ad = null;

	async instance() {
		if (!this.native_ad) {
			this.native_ad = qg['createInsertAd']({
				posId: this.id
			});
			this.native_ad.load();
			this.native_ad.onLoad(()=>{
				console.log("OPPO广告", "加载插页广告完成");
			});
			this.native_ad.onError((err)=>{
				console.error("OPPO广告", "加载插页广告失败", err);
			});
			this.native_ad.onClose(()=>{this.native_ad.load()});
		}
	}

	async show() {
		if (this.native_ad) {
			await this.native_ad.show();
		}
	}
}

export interface OppoNativeAdItem {
	adId: string,
	title: string,
	desc: string,
	icon: string,
	iconUrlList: string[],
	imgUrlList: string[],
	logoUrl: string,
	clickBtnTxt: string,
	/** 取值说明：0：无 1：纯文字 2：图片 3：图文混合 4：视频 */
	creativeType: number,
	/** 0：无 1：浏览类 2：下载类 3：浏览器（下载中间页广告） 4：打开应用首页 5：打开应用详情页 */
	interactionType: number,
	/** 是否已上报展示 */
	show_reported?: boolean,
	/** 是否已上报点击 */
	click_reported?: boolean,
};

export class OppoNativeAdUnit extends ADUnit {

	private native_ad: _NativeAd = null;

	private ad_list: OppoNativeAdItem[] = [];
	private current_ad: OppoNativeAdItem = null;

	private view = new fairygui.GComponent();
	private image = new fairygui.GLoader();
	private tag = new fairygui.GLoader;

	constructor(id: string) {
		super(id);
		this.view.addChild(this.image);
		this.view.onClick(null, ()=>{ if (this.current_ad) this.report_click(this.current_ad); });
		this.image.autoSize = true;
		this.tag.autoSize = true;
		this.view.addChild(this.tag);
		this.view.setPivot(0.5, 0.5, true);
	}

	async instance() {
		this.native_ad = qg.createNativeAd({posId: this.id});
		this.native_ad.onLoad(this.on_load);
		this.native_ad.onError(this.on_error);
		this.native_ad.load();
	}

	async destrory() {
		this.view.removeFromParent();
		if (this.native_ad) {
			this.native_ad.offLoad(this.on_load);
			this.native_ad.offError(this.on_error);
			this.native_ad.destroy();
			this.native_ad = null;
			this.current_ad = null;
		}
	}

	async show(pos: Vector2, scale = 1) {
		if (this.native_ad) {
			this.view.removeFromParent();

			if (this.current_ad) {
				if (!this.current_ad.show_reported) {
					this.report_show(this.current_ad);
				}
				this.view.setSize(this.image.width, this.image.height);
				fairygui.GRoot.inst.addChild(this.view);
				if (pos) { this.view.setXY(pos.x, pos.y);}
				this.tag.setXY(this.image.width - this.tag.width, this.image.height - this.tag.height);
				this.view.setScale(scale, scale);
			}

		}
	}

	async hide() {
		this.view.removeFromParent();
	};

	protected on_load =(res) => {
		console.log("OPPO广告:", "加载原生广告完成", res);
		this.ad_list = res.adList;
		this.switch_ad();
	}

	protected on_error =(err) => {
		this.ad_list = [];
		console.error("OPPO广告:", "加载原生广告出错", err);
		Laya.timer.once(5000, this.native_ad, this.native_ad.load);
	}

	protected async switch_ad() {
		let idx = this.ad_list.indexOf(this.current_ad);
		if (idx < this.ad_list.length - 1 && this.ad_list.length) {
			this.current_ad = this.ad_list[idx + 1];
			if (this.current_ad.imgUrlList && this.current_ad.imgUrlList.length) {
				this.image.url = this.current_ad.imgUrlList[0];
			}
			this.tag.url = this.current_ad.logoUrl;

			console.log("OPPO广告:", "切换展示的广告", this.current_ad);
		} else {
			console.log("OPPO广告:", "重新拉取原生广告");
			await this.destrory();
			await this.instance();
		}
	}

	protected report_show(ad: OppoNativeAdItem) {
		if (this.native_ad) {
			this.native_ad.reportAdShow({ adId: ad.adId } as any);
			ad.show_reported = true;
			console.log("OPPO广告:", "上报广告展示", ad);
		}
	}

	protected report_click(ad: OppoNativeAdItem) {
		if (this.native_ad) {
			this.native_ad.reportAdClick({adId: ad.adId} as any);
			console.log("OPPO广告:", "上报广告点击", ad);
			this.switch_ad();
		}
	}

}
