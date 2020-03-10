import { EventDispatcher } from "xengine/events/EventDispatcher";
import XEngine from "xengine/XEngine";
import XSprite3D from "./XSprite3D.laya";

export default class XScene3DLaya extends EventDispatcher {

	displayObject: Laya.Scene3D = null;
	readonly url: string = "";

	constructor(url: string) {
		super();
		this.url = url;
	}

	async instance(duplicate = true) {
		const ret = await XEngine.inst.res.load(this.url, !duplicate, duplicate);
		const node = ret.native_data as Laya.Scene3D;
		this.displayObject = node;
		return this.displayObject;
	}

	add_child(node: XSprite3D) {
		this.displayObject.addChild(node.displayObject);
	}
}
