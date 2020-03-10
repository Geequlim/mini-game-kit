import { EventDispatcher } from "xengine/events/EventDispatcher";
import FairyGUIHelper, { FairyGUICompoentClass, FairyPakcageInformation } from "./FairyGUIHelper";
import XStage from "./XStage";
import { Nullable } from "xengine/events/HashObject";

/** 场景描述信息 */
export interface SceneInfomation {
	/** 场景名称 */
	name: string;
	/** 场景所在 pakcage 信息 */
	package: FairyPakcageInformation;
	/** 场景视图类 */
	scene_class?: FairyGUICompoentClass;
	/** 资源名 */
	res_name?: string;
	/** 场景视图 */
	view ?: fairygui.GComponent;
	/** 加载依赖资源 */
	load_dependences?: ()=>Promise<any>
}


class SceneManagerError extends Error {};

/** 场景管理器 */
export class SceneManager extends EventDispatcher {
	protected fairy: FairyGUIHelper = null;
	protected stage: XStage = null;

	/** 已注册的场景 */
	readonly scenes = new Map<string, SceneInfomation>();
	/** 场景栈 */
	readonly scene_stack: SceneInfomation[] = [];

	constructor(stage: XStage, fairy: FairyGUIHelper) {
		super();
		this.stage = stage;
		this.fairy = fairy;
	}

	/**
	 * 注册场景
	 * @param scene 场景描述
	 * @param preload 是否执行预加载
	 * @param initial_scene 是否是初始场景
	 */
	register_scene(scene: SceneInfomation, preload = false, initial_scene = false) {
		this.scenes.set(scene.name, scene);
		if (preload) {
			this.load_scene(scene).then(ret=>{
				if (initial_scene) {
					this.push(scene.name);
				}
			}).catch(err =>{
				throw err;
			});
		}
	}

	/** 加载场景 */
	protected async load_scene(scene: SceneInfomation) {
		if (!this.fairy.is_package_loaded(scene.package.name)) {
			if (scene.load_dependences) {
				await scene.load_dependences();
			}
			await this.fairy.load_package(scene.package.name, scene.package.data_file, scene.package.atlas);
		}
	}

	/** 栈顶的场景 */
	top(): Nullable<SceneInfomation> {
		return this.scene_stack.length ? this.scene_stack[this.scene_stack.length - 1] : null;
	}

	/**
	 * 压入场景，当前场景作为历史场景，可通过 `pop` 返回
	 * @param scene_name 压入的场景名
	 */
	async push(scene_name: string) {
		const scene = this.scenes.get(scene_name);
		if (!scene) {
			throw new SceneManagerError("尝试跳转到不存在未注册的场景: " + scene_name);
		}
		// 不能重复叠加相同场景
		if (this.scene_stack.length && this.scene_stack[this.scene_stack.length - 1] == scene) {
			return scene;
		}

		if (!scene.view) {
			if (!this.fairy.is_package_loaded(scene.package.name)) {
				await this.load_scene(scene);
			}
			scene.view = fairygui.UIPackage.createObject(scene.package.name, scene.res_name || scene.name, scene.scene_class).asCom;
		}

		const current = this.top();
		this.scene_stack.push(scene);
		return await this.switch_scene(current, scene);
	}

	/** 回到上一个场景 */
	async pop() {
		const current_scene = this.top();
		const previous_scene = this.scene_stack.length > 1 ? this.scene_stack[this.scene_stack.length - 2] : null;
		this.scene_stack.pop();
		return await this.switch_scene(current_scene, previous_scene);
	}

	/**
	 * 替换当前场景
	 * @param scene 要展现的水果
	 */
	async replace(scene_name: string) {
		if (!this.scene_stack.length) {
			return this.push(scene_name);
		}
		const scene = this.scenes.get(scene_name);
		if (!scene) {
			throw new SceneManagerError("尝试跳转到不存在未注册的场景: " + scene_name);
		}
		if (!scene.view) {
			if (!this.fairy.is_package_loaded(scene.package.name)) {
				await this.load_scene(scene);
			}
			scene.view = fairygui.UIPackage.createObject(scene.package.name, scene.res_name || scene.name, scene.scene_class).asCom;
		}
		const top = this.top();
		this.scene_stack[this.scene_stack.length - 1] = scene;
		return await this.switch_scene(top, scene);
	}

	/** 执行切换场景 */
	protected async switch_scene(from:SceneInfomation, to: SceneInfomation) {
		if (from) {
			from.view.removeFromParent();
		}
		if (to) {
			fairygui.GRoot.inst.addChild(to.view);
			to.view.setSize(this.stage.width, this.stage.height);
			to.view.ensureSizeCorrect();
		}
		return to;
	}
}
