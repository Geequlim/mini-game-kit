import UI_Splash from "view/raw/Splash/UI_Splash";
import Event, { once } from "xengine/events/Event";
import XEngine from "xengine/XEngine";
import Game, {Events} from "xengine/game/Game";

/** 该场景最少展示时间 */
const MIN_SHOW_DURATION = 2;

export default class SplashScene extends UI_Splash {

	private start_time = 0;

	constructFromResource() {
		super.constructFromResource();
		once(this.displayObject, Event.ADDED, this, this.onReady);
	}

	private onReady() {
		this.start_time = Date.now();
		if (Game.inst.initialized) {
			this.start_main_scene();
		} else {
			Game.inst.once(Events.LOGIC_INITIALIZED, this, this.start_main_scene);
		}
	}

	private start_main_scene() {
		let duration = MIN_SHOW_DURATION - (Date.now() - this.start_time) / 1000;
		duration = Math.max(0, duration);
		Game.inst.timer.wait(duration).then(()=>{
			XEngine.inst.scene_manager.replace('Main');
		});
	}
}
