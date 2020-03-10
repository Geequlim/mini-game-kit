import XStage from "./XStage";
import Event from "xengine/events/Event";

/** Laya引擎`XStage`实现 */
export default class XLayaStage extends XStage {

	get stage(): Laya.Stage { return ((this.native_stage as any) as Laya.Stage); }

	constructor(native_stage: Laya.Stage) {
		super(native_stage);
		native_stage.on(Event.RESIZE, this, this.event, [Event.RESIZE]);
	}

	/** @virtual 舞台宽度 */
	get width(): number { return this.stage.width; }
	/** @virtual 舞台高度 */
	get height(): number { return this.stage.height; }

	/** @virtual 添加节点到舞台 */
	add_child<T>(node: T): T {
		return (this.stage.addChild(node as any) as any);
	}
}
