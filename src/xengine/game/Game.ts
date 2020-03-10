import { EventDispatcher } from "xengine/events/EventDispatcher";
import { Timer } from "xengine/utils/Timer";
import Module, { ModuleClass } from "./Module";
import { Nullable } from "xengine/events/HashObject";
import Storage from "xengine/storage/Storage";
import Messenger from "xengine/events/Messenger";
import GameConfig from "config";

export enum Events {
	LOGIC_INITIALIZED = "LOGIC_INITIALIZED",
	LOGIC_STARTED = "LOGIC_STARTED",
	APP_ENTER_FOREGROUND = "APP_ENTER_FOREGROUND",
	APP_ENTER_BACKGROUND = "APP_ENTER_BACKGROUND",
}

interface GameOptions {
	modules: ModuleClass[],
	storage?: Storage,
	options?: Nullable<object>;
}

enum LoadingState {
	None,
	LOADING,
	LOADED,
}


export default class Game extends EventDispatcher {

	static inst: Game = null;
	storage: Storage = null;
	readonly messenger: Messenger = null;

	constructor(options: GameOptions) {
		super();
		if (window['game']) {
			debugger; // 不允许创建多个实例
		}
		window['game'] = this;
		Game.inst = this;

		this.modules_type_list = options.modules;
		for (const M of options.modules) {
			const name: string = M.prototype.name;
			if (!name || !name.length) {
				debugger; // 未定义模块名称
			}
			const opt = options.options ? options.options[name] : undefined;
			const m = new M(opt);
			m.name = name;
			this.modules_list.push(m);
			this.modules[name] = m;
		}
		this.messenger = new Messenger();
		this.storage = options.storage;
	}

	/** 游戏暂停标记 */
	public paused = false;
	/** 游戏逻运行时长 */
	public logic_run_time: number = 0;
	/** 初始化标记 */
	public initialized: boolean = false;
	/** 逻辑定时器，随逻辑框架暂停 */
	public timer: Timer = new Timer();
	/** 所有模块容器 */
	public modules: {[key:string]: Module} = {};

	/** 逻辑模块 */
	protected modules_list: Module[] = [];
	/** 逻辑模块类 */
	protected modules_type_list: ModuleClass[] = [];
	/** 存档脏标记 */
	protected query_saving = false;
	/** 存档是否加载完毕 */
	protected load_state = LoadingState.None;
	/** 是否已经启动成功 */
	protected stated = false;

	/** 获取模块 */
	get_module<T extends Module>(type: ModuleClass): T {
		return this.modules[type.prototype.name] as T;
	}

	/** 框架启动（在game对象创建后，所有模块注册完毕后） */
	protected setupt() {
		for (const m of this.modules_list) {
			m.setup();
		}
	}

	/** 初始化 */
	protected initialize() {
		console.log("开始初始化逻辑框架");
		this.paused = false;
		this.logic_run_time = 0;
		for (const m of this.modules_list) {
			m.initialize();
		}
		this.initialized = true;
		this.event(Events.LOGIC_INITIALIZED);
		console.log("逻辑框架初始化完毕");
	}

	/** 启动 */
	protected start() {
		console.log("启动各个逻辑模块");
		for (const m of this.modules_list) {
			m.start();
		}
		this.stated = true;
		this.event(Events.LOGIC_STARTED);
		console.log("逻辑框架启动完毕");
	}

	public is_ready(): boolean {
		for (const m of this.modules_list) {
			if (!m.is_ready())
				return false;
		}
		return true;
	}

	public update(dt: number) {
		// 存档
		if (this.query_saving ) {
			this.save();
		}
		for (const m of this.modules_list) {
			m.always_update(dt);
		}
		if (!this.paused && (this.initialized || this.is_ready())) {

			if (!this.initialized) {
				this.initialize();

				this.load_state = LoadingState.LOADING;
				this.load().then(()=>{
					this.load_state = LoadingState.LOADED;
				}).catch((err)=>{
					console.error(err);
					this.load_state = LoadingState.LOADED;
				});
			}

			if (this.load_state == LoadingState.LOADED) {

				this.logic_run_time += dt;
				if (!this.stated) { // 启动各个模块
					this.start();
				}
				// 更新各个模块
				this.timer.update(dt);
				for (const m of this.modules_list) {
					m.update(dt);
				}
			}
		}
	}

	public query_save() {
		this.query_saving = true;
	}

	public save(): { version: number } {
		let data = { version: new Date().getTime() };
		for (const key in this.modules) {
			if (this.modules.hasOwnProperty(key)) {
				const m: Module = this.modules[key];
				data[key] = m.save();
			}
		}
		this.query_saving = false;
		if (this.storage) this.storage.set_item(GameConfig.project, data);
		console.log("存档数据", data);
		return data;
	}

	public async load() {
		if (!this.storage) return undefined;
		const data = await this.storage.get_item(GameConfig.project);
		if (data) {
			console.log("读取数据", data);
			for (const key in this.modules) {
				if (this.modules.hasOwnProperty(key)) {
					const m: Module = this.modules[key];
					if (data[key] != undefined) {
						m.load(data[key]);
					}
				}
			}
		}
		return data;
	}
}
