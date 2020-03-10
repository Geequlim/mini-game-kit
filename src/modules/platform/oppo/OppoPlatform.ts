import Platform, { UserInfo } from "../platform";
import ADManager from "modules/commerce/ADManager";
import OppoADManager, { OppoADUnitID } from "./OppoADManager";
import nativefiles from "../wechat/nativefiles";
import GameConfig from "config";

export default class OppoPlatform extends Platform {

	private oppo_user_info: any = null;

	constructor() {
		super();
		this.ad_manager = this.create_ad_manager();
		console.log("Oppo平台", "创建");
		// 隐藏时提示创建图标
		qg.onHide(this.create_shortcut.bind(this));
		// 包体内资源
		Laya.MiniAdpter.nativefiles = nativefiles.concat([]);
	}

	protected create_ad_manager(): ADManager {
		OppoADUnitID.APPID = GameConfig.appid;
		OppoADUnitID.BANNER_AD_UNIT_ID = "139793";
		OppoADUnitID.REWARD_AD_UNIT_ID = "139795";
		OppoADUnitID.NATIVE_AD_UNIT_ID = "139809";
		OppoADUnitID.INTERSTITIAL_AD_UNIT_ID = "139803";
		return new OppoADManager();
	}

	initialize() {
		Laya.timer.once(1000, null, ()=>{
			this.admanager.initialize();
		});
	}

	/** 登陆、授权 */
	async login(): Promise<UserInfo> {
		return new Promise((resolve, reject) => {
			(qg.login as any)({
				success: (res)=> {
					console.error("OPPO平台", "登陆成功", res);
					this.oppo_user_info = res;
					resolve({
						uuid: res.data.token,
						name: "Hero",
						avatar: res.data.avatar,
						location: "China"
					});
				},
				fail: (res)=> {
					reject(res);
					console.error("OPPO平台", "登陆失败", res);
				}
			});
		});
	}

	async get_user_info(): Promise<UserInfo> {
		if (this.oppo_user_info) {
			return {
				uuid: '',
				avatar: this.oppo_user_info.data.avatar,
				name: this.oppo_user_info.nickName,
			};
		} else {
			return {
				uuid: "82d7268b-2707-412b-b4c4-65baf63e9b43",
				name: "Hero",
				avatar: "",
				location: "China",
			}
		}
	}

	/** 发起创建桌面图标请求 */
	protected create_shortcut() {
		return new Promise((resolve, reject) => {
			qg['hasShortcutInstalled']({
				success: function(res) {
					// 判断图标未存在时，创建图标
					if(res == false){
						qg['installShortcut']({
							success: function() {
								resolve();
							},
							fail: function(err) {
								reject();
							},
							complete: function() {}
						})
					} else {
						resolve();
					}
				} as any,
				fail: function(err) {
					reject();
				},
				complete: function() {}
			});
		});
	}

	alert(message: string) {
		qg.showModal({content: message, showCancel: false} as any);
	}

}
