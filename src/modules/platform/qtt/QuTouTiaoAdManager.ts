import ADManager from "modules/commerce/ADManager";
import { Vector2 } from "xengine/utils/math";
import Game, {Events as GameEvents} from "xengine/game/Game";

declare const qttGame: any;

export default class QuTouTiaoAdManager extends ADManager {

	show_banner(pos?: Vector2): Promise<void> {
		return new Promise((resolve, reject) => {
			qttGame.showBanner();
		});
	}

	hide_banner(): Promise<void> {
		return new Promise((resolve, reject) => {
			qttGame.hideBanner();
		});
	}

	show_reward_video(): Promise<void> {
		Game.inst.event(GameEvents.APP_ENTER_BACKGROUND);
		return new Promise((resolve, reject) => {
			qttGame.showVideo((res)=>{
				if(res == 1){
					resolve();
				} else {
					reject();
				}
				Game.inst.event(GameEvents.APP_ENTER_FOREGROUND);
			});
		});
	}

	show_interactive_ads(): Promise<void> {
		return new Promise((resolve, reject) => {
			// showHDAD示例
			var options: any = {};
			options.index = 1;//广告位置（1，2，3，4...）
			options.gametype = 3;//互动游戏类型，1(砸金蛋)  2(laba)  3(大转盘)
			options.rewardtype = 1; //互动广告框，只有 1
			options.data ={};
			options.data.title ="刷新道具";//互动抽中奖后的道具提示文字
			options.data.url ="//newidea4-gamecenter-frontend.1sapp.com/game/prod/fkxxl_img/1.png"; // 动抽中奖后的道具图标(可选)
			options.callback=(res)=>{
				//回调函数
				if (res ==1){
					//播放完成，发放奖励
					resolve();
				} else{
					//res = 0 填充不足
					reject();
				}
			};
			qttGame.showHDAD(options);
		});
	}
}
