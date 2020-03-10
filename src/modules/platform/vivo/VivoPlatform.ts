import { game_module } from "xengine/game/Module";
import Platform from "../platform";
import GameConfig from "config";
import nativefiles from "../wechat/nativefiles";

@game_module('platform')
export default class VivoPlatform extends Platform {
	constructor() {
		super();
		// 版本资源控制
		if (Laya.MiniAdpter) {
			if (Laya.LocalStorage.getItem('res_version') != GameConfig.res_version) {
				console.log("本地资源缓存与当前版本不一致，清理本地资源缓存");
				Laya.MiniAdpter.removeAll();
				Laya.LocalStorage.setItem('res_version', GameConfig.res_version);
			}
			// 包体内资源
			Laya.MiniAdpter.nativefiles = nativefiles;
		}
	}
}
