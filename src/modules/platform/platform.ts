import Module, { game_module } from "xengine/game/Module";
import ADManager from "../commerce/ADManager";
import VirtualAdManager from "./VirtualAdManager";


/** 平台（设备）信息 */
export interface PlatformInfo {
	uuid: string;
	platform: string;
	device: string;
	native_platform?: string;
	data?: any;
}

/** 用户信息 */
export interface UserInfo {
	uuid: string;
	name: string;
	avatar: string;
	location?: string;
}

/** 分享配置 */
export interface ShareConfig {
	title: string;
	message?: string;
	url?: string;
	image_url?: string;
	token?: string;
	data?: any;
}

/** 分享失败错误代码 */
export enum ShareError {
	/** 配置错误 */
	CONFIGURATION_ERROR,
	/** 分享被取消 */
	SHARE_CANCELD = -1,
	/** 没有分享到群 */
	NOT_SHARED_TO_GROUP = -2,
	/** 重复分享到相同的群 */
	NOT_SHARED_TO_DIFFRENT_GROUP = -3,
}

/** 观看激励视频 */
export enum WatchRewardVideoFailed {
	/** 配置错误 */
	CONFIGURATION_ERROR,
	/** 激励视频没有填充 */
	NO_VIDEO_FILLED = -1,
	/** 被用户中断 */
	WATCH_CANCELED = -2,
}


@game_module("platform")
export default class Platform extends Module {
	static inst: Platform = null;
	/** 广告管理器 */
	protected ad_manager: ADManager = null;
	get admanager(): ADManager { return this.ad_manager; }

	constructor() {
		super();
		Platform.inst = this;
		this.ad_manager = new VirtualAdManager();
	}

	initialize() {
		this.ad_manager.initialize();
		console.log("初始化平台", this.ad_manager);
	}

	/** 登陆、授权 */
	async login(): Promise<UserInfo> {
		return {
			uuid: "82d7268b-2707-412b-b4c4-65baf63e9b43",
			name: "Hero",
			avatar: "",
			location: "China",
		}
	}

	async get_info(): Promise<PlatformInfo> {
		return {
			uuid: "82d7268b-2707-412b-b4c4-65baf63e9b43",
			platform: "web",
			device: "chrome",
		};
	}

	async get_user_info(): Promise<UserInfo> {
		return {
			uuid: "82d7268b-2707-412b-b4c4-65baf63e9b43",
			name: "Hero",
			avatar: "",
			location: "China",
		}
	}

	/** 跳转到其他程序 */
	navigate_to_app(appid: string, path?: string, extra?: any): Promise<any> {
		return new Promise((resolve, reject) => {
			if(resolve) resolve();
			else if(reject) reject();
		});
	}

	/**
	 * 调起分享
	 *
	 * 分享失败会抛出 `ShareError` 错误
	 */
	share(): Promise<void> {
		return new Promise((resolve, reject) => { resolve();});
	}

	/**
	 * 播放激励视频广告
	 *
	 * 失败会抛出 `WatchRewardVideoFailed` 错误
	*/
	play_reward_video(): Promise<void> {
		return this.admanager.show_reward_video();
	}

	/** 输出加载过的资源列表 */
	private dump_loaded_resources() {
		if (Laya.loader['loaded_res_pathes']) {
			return JSON.stringify(Object.keys(Laya.loader['loaded_res_pathes']), undefined, "\t");
		}
	}

	/** 弹出系统提示 */
	alert(message: string) {
		window.alert(message);
	}
}
