import Platform, { UserInfo, ShareError, ShareConfig, PlatformInfo } from "../platform";
import GameConfig from "config";
import { game_module } from "xengine/game/Module";
import nativefiles from "./nativefiles";
import WechatADManager, { WechatADUnitID } from "./WechatADManager";
import ADManager from "modules/commerce/ADManager";

@game_module("platform")
export default class WechatPlatform extends Platform {

	/** 设备信息 */
	protected system_info = null;
	protected user_info: UserInfo = null;
	protected share_config: ShareConfig = null;
	protected launch_options: {
		path: string;
		scene: number;
		referrerInfo: {
			appId?: string;
			extraData?: any;
		};
		query?: any;
		shareTicket?: string;
	} = null;

	constructor() {
		super();
		// 广告
		this.ad_manager = this.create_ad_manager();
		// 系统信息
		this.system_info = wx.getSystemInfoSync();
		console.log("设备信息", this.system_info);

		// 版本资源控制
		if (Laya.LocalStorage.getItem('res_version') != GameConfig.res_version) {
			console.log("本地资源缓存与当前版本不一致，清理本地资源缓存");
			Laya.MiniAdpter.removeAll();
			Laya.LocalStorage.setItem('res_version', GameConfig.res_version);
		}

		// 包体内资源
		Laya.MiniAdpter.nativefiles = nativefiles;
	}

	start() {
	}

	async get_info(): Promise<PlatformInfo> {
		return {
			uuid: "82d7268b-2707-412b-b4c4-65baf63e9b43",
			platform: GameConfig.platform,
			device: `${this.system_info.brand} ${this.system_info.brand.model}`,
			native_platform: this.system_info.platform,
			data: this.system_info
		};
	}

	async login() {

		let authorized = false;
		try {
			await this.authorize();
			authorized = true;
			console.log("微信授权成功");
		} catch (err) {
			console.warn("微信授权失败", err);
		}

		let wxcode = "";
		try {
			wxcode = await this.wx_login();
		} catch (error) {
			console.error("微信登陆失败");
			throw error;
		}
		const user_info = await this.get_user_info();
		user_info.uuid = wxcode;
		return user_info;
	}

	get_user_info(): Promise<UserInfo> {
		return new Promise((resolve, reject) => {
			if (!this.user_info) {
				this.user_info = {
					uuid: "",
					name: "Hero",
					avatar: "",
					location: "China",
				};
				this.authorize().then(()=>{
					(wx as any).getUserInfo({
						success: (res) => {
							const userInfo = res.userInfo;
							this.user_info.name = userInfo.nickName;
							this.user_info.avatar = userInfo.avatarUrl;
							this.user_info.location = userInfo.province;
							resolve(this.user_info);
						},
						fail: (err)=>{
							reject(err);
						}
					})
				}).catch(err=>{
					super.get_user_info().then(ret=>resolve(ret));
				});
			} else {
				resolve(this.user_info);
			}
		});
	}

	protected wx_login(): Promise<string> {
		return new Promise((resolve, reject) => {
			(wx.login as any)({
				success: (ret)=>{
					resolve(ret.code);
				},
				fail: (err)=>{
					reject(err);
				},
				complete: undefined
			});
		});
	}


	protected authorize(scope: string = 'scope.userInfo') {
		return new Promise((resolve, reject) => {
			let authorize_fail_count = 0;
			const retry_time = 3;
			const authorize = ()=>{
				wx.authorize({
					scope,
					success: (ret)=>{
						resolve();
					},
					fail: ()=>{
						authorize_fail_count += 1;
						if (authorize_fail_count < retry_time) {
							authorize();
						} else {
							reject();
						}
					},
					complete: undefined,
				});
			};
			wx.getSetting({
				success(res) {
					if (!res.authSetting[scope]) {
						authorize();
					} else {
						resolve();
					}
				},
				fail: ()=>{
					authorize();
				},
				complete: undefined,
			});
		});
	}

	/** 跳转到其他小程序 */
	navigate_to_app(appid: string, path?: string, extra?: any) {
		return new Promise((resolve, reject) => {
			wx.navigateToMiniProgram({
				appId:appid,
				path: path,
				extraData: extra,
				envVersion: 'release',
				success: (ret)=> {
					resolve(ret);
				},
				fail: ()=>{
					reject();
				},
				complete: undefined,
			});
		});
	}

	set_share_config(cfg: ShareConfig) {
		this.share_config = cfg;
		wx.showShareMenu({withShareTicket: true} as any);
		wx['onShareAppMessage'](()=>{
			return {
				title: cfg.title,
				imageUrl: cfg.image_url,
			}
		});
	}

	set_user_openid(id: string) {
		if (this.user_info) {
			this.user_info.uuid = id;
		}
	}

	share(): Promise<void> {
		return new Promise((resolve, reject) => {
			if (!this.share_config) {
				console.error("微信平台:", "调起分享失败, 未设置分享配置");
				reject(ShareError.CONFIGURATION_ERROR);
			}

			let started = false;
			let start_time = 0;

			const check_share_success = () => {
				const duration = ((new Date()).getTime() - start_time) / 1000;
				return duration >= 3;
			};

			const callback = ()=>{
				if (check_share_success()) {
					console.log("微信平台:", "分享成功");
					resolve();
				} else {
					console.log("微信平台:", "分享失败");
					const error =  Math.random() > 0.5 ? ShareError.NOT_SHARED_TO_DIFFRENT_GROUP : ShareError.NOT_SHARED_TO_GROUP;
					reject(error);
				}
			};

			const onStart = ()=>{
				started = true;
				start_time = (new Date()).getTime();
			};
			// wx['onHide'](onStart);


			const onShow = ()=>{
				if (started) {
					// wx['offHide'](onStart);
					wx['offShow'](onShow);
					Laya.timer.once(100, null, callback);
				}
				started = false;
			};
			wx['onShow'](onShow);

			wx['shareAppMessage']({
				title: this.share_config.title,
				imageUrl: this.share_config.image_url,
				query: this.share_config.token,
				imageUrlId: this.share_config.data.share_id,
			});
			onStart();
		});
	}

	protected create_ad_manager(): ADManager {
		WechatADUnitID.BANNER_AD_UNIT_ID = "adunit-a58d5b5c763bdf57";
		WechatADUnitID.REWARD_AD_UNIT_ID = "adunit-eab20b4b60d9d71a";
		return new WechatADManager();
	}

	alert(message: string) {
		wx.showModal({content: message, showCancel: false} as any);
	}

	/** 获取启动参数 */
	public get_launch_option() {
		if (!this.launch_options) {
			this.launch_options = wx['getLaunchOptionsSync']();
		}
		return this.launch_options;
	}
}
