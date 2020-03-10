import Module, { game_module } from "xengine/game/Module";
import APIProvider, { ProviderCls } from "./APIProvider";
import GameConfig, { PlatformValue } from "config";
import { PayType, get_pay_type, PayPoint, load_pay_types } from "./payment";
import Game from "xengine/game/Game";
import Platform from "modules/platform/platform";
import SelfProvider from "./self/SelfProvider";

export enum Events {
	"PAY_DONE" = "PAY_DONE",
	"PROVIDER_INITIALIZED" = "PROVIDER_INITIALIZED",
}

@game_module('commerce')
export default class CommerceModule extends Module {

	protected providers: {[key: string]: APIProvider} = {};
	protected gameid: string = "";

	constructor() {
		super();
		this.gameid = GameConfig.appid;
		const pay_types: {[key: string]: PayType} = {};
		switch(GameConfig.platform) {
			case PlatformValue.QQ:
				pay_types[PayPoint.DOUBLE_REWARD] = PayType.REWARD_VIDEO;
				pay_types[PayPoint.RELIVE] = PayType.REWARD_VIDEO;
				break;
			case PlatformValue.BYTEDANCE:
				pay_types[PayPoint.DOUBLE_REWARD] = PayType.REWARD_VIDEO;
				pay_types[PayPoint.RELIVE] = PayType.REWARD_VIDEO;
				break;
			case PlatformValue.WECHAT:
			default:
				pay_types[PayPoint.DOUBLE_REWARD] = PayType.REWARD_VIDEO;
				pay_types[PayPoint.RELIVE] = PayType.REWARD_VIDEO;
				break;
		}
		load_pay_types(pay_types);
		this.register_provider(SelfProvider);
	}

	initialize() {
		for (const key in this.providers) {
			const p = this.providers[key];
			p.initialize().then(()=>{
				this.event(Events.PROVIDER_INITIALIZED, p);
			});
		}
	}

	/** 默认 APIProvider */
	get provider(): APIProvider {
		switch (GameConfig.platform) {
			case PlatformValue.QQ:
				break;
			case PlatformValue.WECHAT:
			default:
				break;
		}
		return null;
	}

	get_provider<T extends APIProvider>(provider: ProviderCls): T {
		return this.providers[provider.prototype.uid] as T;
	}

	register_provider(cls: (new(id: string)=> APIProvider)) {
		this.providers[cls.prototype.uid] = new cls(this.gameid);
	}

	/** 计费 */
	async pay(point: PayPoint) {
		this.send_event("pay", {point});
		await this.pay_with_type(get_pay_type(point));
		this.send_event("pay_done", {point});
		this.event(Events.PAY_DONE, [point, get_pay_type(point)]);
	}

	async pay_with_type(type: PayType) {
		switch (type) {
			case PayType.REWARD_VIDEO:
				await (Game.inst.get_module<Platform>(Platform).play_reward_video());
				break;
			case PayType.SHARE:
				await (Game.inst.get_module<Platform>(Platform).share());
				break;
			case PayType.FREE:
			case PayType.PURCHURS:
			default:
				break;
		}
	}

	async send_event(event: string, params?: {[key: string]: any}) {
		if (typeof wx != 'undefined' && typeof wx['aldSendEvent'] != 'undefined') {
			if (typeof params === 'object') {
				wx['aldSendEvent'](event, {...params});
			} else {
				wx['aldSendEvent'](event, params + '');
			}
		}
	}
}
