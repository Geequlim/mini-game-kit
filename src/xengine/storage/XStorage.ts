import { XStorageLaya } from "./XStorage.laya";
import { XStorageEgret } from "./XStorage.egret";

export default (function(){
	if (typeof(Laya) !== 'undefined') return XStorageLaya;
	if (typeof(egret) !== 'undefined') return XStorageEgret;
}());

