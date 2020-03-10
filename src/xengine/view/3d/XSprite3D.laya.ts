import { EventDispatcher } from "xengine/events/EventDispatcher";
import XEngine from "xengine/XEngine";

export default class XSprite3D extends EventDispatcher {

	displayObject: Laya.Sprite3D = null;
	readonly url: string = "";
	instance_callback: Function = null;

	constructor(url: string) {
		super();
		this.url = url;
	}

	async instance(duplicate = true) {
		let node: Laya.Sprite3D = null;
		if (this.displayObject) {
			node = this.displayObject;
		} else {
			const ret = await XEngine.inst.res.load(this.url);
			node = ret.native_data as Laya.Sprite3D;
		}
		this.displayObject = duplicate ? node.clone() as Laya.Sprite3D : node;
		if (this.instance_callback) {
			this.instance_callback();
			this.instance_callback = null;
		}
		return this.displayObject;
	}

	add_child(node: XSprite3D) {
		this.displayObject.addChild(node.displayObject);
	}

	remove_child(node: XSprite3D) {
		this.displayObject.removeChild(node.displayObject);
	}

	remove_self() {
		this.displayObject.removeSelf();
	}

	remove_children() {
		this.displayObject.removeChildren();
	}

}
