import * as LayaResourceLoader from "./ResourceLoader.laya";
import * as EgretResourceLoader from "./ResourceManager.egret"

export default (function(){
	if (typeof(Laya) !== 'undefined') return LayaResourceLoader;
	if (typeof(egret) !== 'undefined') return EgretResourceLoader;
})();
