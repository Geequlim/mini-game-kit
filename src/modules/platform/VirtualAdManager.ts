import ADManager, { ADUnit } from "modules/commerce/ADManager";
import { Vector2 } from "xengine/utils/math";
import Game, {Events as GameEvents} from "xengine/game/Game";

export default class VirtualAdManager extends ADManager {
	protected banner: VirtualBannerAdUnit = null;
	protected video: VirtualRewardVideoAdUnit = null;

	constructor() {
		super();
		this.banner = new VirtualBannerAdUnit();
		this.video = new VirtualRewardVideoAdUnit();
	}

	async initialize() {
		await this.banner.instance();
		await this.video.instance();
	}

	async show_banner() {
		this.banner.show();
	}

	async hide_banner() {
		this.banner.hide();
	}

	/** 展示激励视频广告 */
	show_reward_video(): Promise<void> {
		return this.video.show();
	}

}



const BANNER_STYLE = `
min-height: 120px;
position: absolute;
bottom: 0;
width: 100%;
background-color: greenyellow;
text-align: center;
margin: 0px auto;
`;

class VirtualBannerAdUnit extends ADUnit {
	native_ad: Element = null;

	async instance() {
		this.native_ad = document.createElement('div');
		let title = document.createElement('h1');
		title.innerText = '原生广告';
		this.native_ad.appendChild(title);
		this.native_ad.setAttribute('style', BANNER_STYLE);
		let container = document.getElementById('layaContainer');
		container.appendChild(this.native_ad);
		await this.hide();
	}

	async show(pos?: Vector2) {
		if (this.native_ad) {
			(this.native_ad as any).style.visibility = 'visible';
		}
	}

	async hide() {
		if (this.native_ad) {
			(this.native_ad as any).style.visibility = 'hidden';
		}
	}

}

const REWARD_VIDEO_STYLE = `
position: absolute;
top: 0;
height: 100%;
width: 100%;
background-color: gray;
text-align: center;
margin: 0px auto;
`;

class VirtualRewardVideoAdUnit extends ADUnit {
	native_ad: Element = null;

	async instance() {
		this.native_ad = document.createElement('div');
		let title = document.createElement('h1');
		title.innerText = '激励视频广告';
		this.native_ad.appendChild(title);
		this.native_ad.setAttribute('style', REWARD_VIDEO_STYLE);
		let container = document.getElementById('layaContainer');
		container.appendChild(this.native_ad);

		let buttons = document.createElement('div');
		buttons.innerHTML = `
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<button onclick='game.modules.platform.admanager.video.on_done()'><h2> 已看完 </h2></button>
<br/>
<br/>
<button onclick='game.modules.platform.admanager.video.on_cancel()'><h2> 没看完 </h2></button>
<br/>
<br/>
`;
		this.native_ad.appendChild(buttons);
		await this.hide();
	}

	async show(pos?: Vector2) {
		Game.inst.event(GameEvents.APP_ENTER_BACKGROUND);
		await this.show_ad();
	}

	async hide() {
		if (this.native_ad) {
			(this.native_ad as any).style.visibility = 'hidden';
		}
		this.offAll('play_done');
		this.offAll('play_cancel');
		Game.inst.event(GameEvents.APP_ENTER_FOREGROUND);
	}

	private show_ad() {
		return new Promise((resolve, reject) => {
			if (this.native_ad) {
				(this.native_ad as any).style.visibility = 'visible';
				this.once('play_done', null, resolve);
				this.once('play_cancel', null, reject);
			} else {
				reject();
			}
		});
	}

	private on_done() {
		this.event("play_done");
		this.hide();
	}

	private on_cancel() {
		this.event("play_cancel");
		this.hide();
	}

}
