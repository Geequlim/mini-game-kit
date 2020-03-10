import XStage from "./XStage";
import Event from "xengine/events/Event";

/** Egret引擎`XStage`实现 */
export default class XEgretStage extends XStage {

	get stage(): egret.Stage { return ((this.native_stage as any) as egret.Stage); }

	constructor(native_stage: egret.Stage) {
		super(native_stage);
		native_stage.addEventListener(Event.RESIZE, ()=>{ this.event(Event.RESIZE); }, this);
	}

	/** @virtual 舞台宽度 */
	get width(): number { return this.stage.stageWidth; }
	/** @virtual 舞台高度 */
	get height(): number { return this.stage.stageHeight; }

	/** @virtual 添加节点到舞台 */
	add_child<T>(node: T): T {
		return (this.stage.addChild(node as any) as any);
	}
}
