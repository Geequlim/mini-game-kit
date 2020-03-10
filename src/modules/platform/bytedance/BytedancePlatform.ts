import { game_module } from "xengine/game/Module";
import WechatPlatform from "../wechat/WechatPlatform";
import ADManager from "modules/commerce/ADManager";
import BytecodeADManager, { BytecodeADUnitID } from "./BytedanceADManager";
import { Nullable } from "xengine/events/HashObject";
import Game from "xengine/game/Game";
import DailyTask from "modules/common/DailyTask";
import { Handler } from "xengine/events/Handler";
import GameConfig from "config";
declare const tt: any;

const SHARE_ID = "687g91c3c9chg1hi1g";
const DAILY_MAX_RECORD_REWARD_TIME = 5;

export enum BytedanceHostApp {
	Toutiao = "Toutiao",
	Douyin = "Douyin",
	XiGua = "XiGua",
	news_article_lite = "news_article_lite",
}

interface GameRecorderManager {
	start(cfg:{duration: number}),
	pause(),
	recordClip(any),
	clipVideo(any),
	resume(),
	stop(),
	onStart(callback: Function),
	onResume(callback: Function),
	onPause(callback: Function),
	onStop(callback: Function),
	onError(callback: Function),
	onInterruptionBegin(callback: Function),
}

@game_module("platform")
export default class BytedancePlatform extends WechatPlatform {

	last_video_file_path: string = "";
	record_reward_time = 0;
	clip_index_list = [];

	constructor() {
		super();
		if (tt.getSystemInfoSync().platform == 'ios') {
			Laya.MiniAdpter.nativefiles = [];
		}
	}

	check_login_session () {
		return new Promise((resolve, reject) => {
			tt.checkSession({
				success(res) {
					resolve();
				},
				fail(res) {
					reject();
				}
			});
		});
	}

	async login() {
		let wxcode = "";
		try {
			await this.check_login_session();
			wxcode = await this.wx_login();
		} catch (error) {
			console.error("字节跳动", "登陆失败", error);
			throw error;
		}
		return {
			uuid: wxcode,
			name: "Hero",
			avatar: "",
			location: "China",
		};
	}

	protected create_ad_manager(): ADManager {
		BytecodeADUnitID.BANNER_AD_UNIT_ID = "26ldn4o783ph1cj1k8";
		BytecodeADUnitID.REWARD_AD_UNIT_ID = "6rp65ps2jeb2lr08kd";
		return new BytecodeADManager();
	}

	public get_recorder(): Nullable<GameRecorderManager> {
		if (tt.getGameRecorderManager) {
			let recorder:GameRecorderManager = tt.getGameRecorderManager();
			recorder.onStart((res)=>{
				console.log("字节跳动", '开始录屏', res );
				this.clip_index_list = [];
				this.last_video_file_path = "";
			});
			recorder.onStop((res)=>{
				console.log("字节跳动", '录屏已经停止', res );
				this.last_video_file_path = res.videoPath;
				if (this.record_reward_time > DAILY_MAX_RECORD_REWARD_TIME) {
					this.last_video_file_path = "";
					console.warn("字节跳动", "分享次数已到，放弃录屏结果");
				}
				if (this.clip_index_list.length) {
					recorder.clipVideo({
						path: res.videoPath,
						success: (r)=> {
							console.log("字节跳动", "剪辑精彩片段完成", r.videoPath);
							this.last_video_file_path = r.videoPath;
						}
					});
				}
			});
			recorder.onError((err)=>{
				console.error("字节跳动", '录屏出错', err );
				this.last_video_file_path = "";
			});
			return recorder;
		}
		return null;
	}

	initialize() {
		super.initialize();
		Game.inst.get_module<DailyTask>(DailyTask).add_daily_task(Handler.create(null, ()=>{
			this.record_reward_time = 0;
		}));
	}

	share_video(title: string, video: string, topics = ['小游戏']) {
		console.log("字节跳动", "发起录屏分享", video);
		return new Promise((resolve, reject) => {
			tt.shareAppMessage({
				channel: "video",
				title,
				desc: "",
				imageUrl: "",
				templateId: SHARE_ID, // 替换成通过审核的分享ID
				query: "",
				extra: {
					videoPath: video,
					videoTopics: topics
				},
				success: (ret) => {
					console.log("分享视频成功", ret);
					this.record_reward_time += 1;
					resolve();
				},
				fail: (e) => {
					console.error("分享视频失败", e);
					reject();
				}
			});
		});
	}

	record_clip(left: number = 3, right: number = 3) {
		this.get_recorder().recordClip({
			timeRange: [left, right],
			success: (r)=> {
				this.clip_index_list.push(r.index);
				console.log("字节跳动", "记录精彩剪辑", r);
			}
		});
	}

	/** 跳转到其他小程序 */
	navigate_to_app(appid: string, path?: string, extra?: any) {
		return new Promise((resolve, reject) => {
			tt.navigateToMiniProgram({
				appId:appid,
				path: path,
				extraData: extra,
				envVersion: 'current',
				success: (ret)=> {
					resolve(ret);
				},
				fail: (err)=>{
					const systemInfo = tt.getSystemInfoSync();
					// iOS 不支持，建议先检测再使用
					if (systemInfo.platform !== "ios") {
						// 打开互跳弹窗
						tt.showMoreGamesModal({
							appLaunchOptions: [
								{
									appId: GameConfig.appid,
									query: "foo=bar&baz=qux",
									extraData: {}
								}
							],
							success(res) {
								resolve(res);
							},
							fail(err) {
								reject(err);
							}
						});
					} else {
						throw new Error("iOS 平台不支持该功能");
					}
				},
				complete: undefined,
			});
		});
	}

	get support_more_game_module(): boolean {
		if (this.system_info.platform === 'ios') {
			return false;
		}
		let [ major, minor ] = this.system_info.SDKVersion.split(".");
		return major >= 1 && minor >= 33;
	}

	/** 宿主APP */
	get host_app(): BytedanceHostApp {
		return tt.getSystemInfoSync().appName;
	}
}
