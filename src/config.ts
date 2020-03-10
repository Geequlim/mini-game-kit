declare const swan: any;
declare const qg: any;
declare const wx: any;

/** 启动参数，在`game.js`中定义 */
let config: GameConfig = function(){
	if (typeof config === 'object') {
		return config;
	} else if (typeof window != 'undefined' && window['config']) {
		return window['config'];
	} else if (typeof wx != 'undefined' && wx['config']) {
		return wx['config'];
	} else if (typeof qg != 'undefined' && qg['config']) {
		return qg['config'];
	} else if (typeof(swan) != 'undefined') {
		return swan.config;
	} else {
		console.error('获取启动参数出错');
	}
}();

/** 游戏引擎 */
export enum BackendEngine {
	LAYA = 'laya',
	EGRET = 'egret',
}

export enum PlatformValue {
	WEB = 'web',
	WECHAT = 'wechat',
	QQ = 'qq',
	BAIDU = 'baidu',
	OPPO = 'oppo',
	BYTEDANCE = 'bytedance',
	VIVO = 'vivo',
	QTT = 'qtt',
}

/*
 * 游戏初始化配置;
 */
export default class GameConfig {

	static project: string = "laya-start-kit";
	static appid: string = '9d92fffa-1176-4d37-8c73-5f6280f233a6';
	static appkey: string = 'b9b84e6a-3104-469c-971d-641a5dcdf973';
	static version: string = "1.0.6";
	static server: string = 'https://api.geequlim.com/api/';
	static width: number = 750;
	static height: number = 1334;
	static scale_mode: string = "fixedwidth";
	static screen_mode: string = "vertical";
	static canvas_color: string = "#232323";
	static retinal_mode: boolean = true;
	static platform: string = 'web';
	static debug: boolean = true;
	static stat: boolean = true;
	static inspector: boolean = false;
	static physics_debug: boolean = false;
	static backend_engine: BackendEngine;
	static backend_stage: Laya.Stage | egret.Stage = null;
	static base_resource_url: string = "";
	static res_version = "";
	static adVersion = "1.0.16";
	/** 第三方库 */
	static libs: {[key:string]: any};

	static init() {
		console.log("启动配置", JSON.stringify(config, undefined, 2));
		// 读取 game.js 中的配置
		for (const key in config) this[key] = config[key];

		if (typeof(Laya) !== 'undefined') {
			this.backend_engine = BackendEngine.LAYA;
		} else if (typeof(egret) !== 'undefined') {
			this.backend_engine = BackendEngine.EGRET;
		}

		switch (this.backend_engine) {
			case BackendEngine.LAYA:
				this.start_laya();
				break;
			case BackendEngine.EGRET:
				this.start_egret();
				break;
			default:
				throw new Error("未找到受支持的游戏引擎" + this.backend_engine + "， 请检查 game.js 中是否引入引擎库");
				break;
		}
	}

	static start_laya() {
		// 根据配置启动 Laya 引擎
		typeof (Laya3D) === 'undefined' ? Laya.init(this.width, this.height): Laya3D.init(this.width, this.height);
		if (typeof (Laya.Physics) !== 'undefined') Laya.Physics.enable();
		if (this.inspector || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (this.physics_debug && Laya.PhysicsDebugDraw) Laya.PhysicsDebugDraw.enable();
		if (this.stat) Laya.Stat.show(0, 200);

		// 根据配置设置舞台数据
		Laya.stage.bgColor = this.canvas_color;
		Laya.stage.scaleMode = this.scale_mode;
		Laya.stage.screenMode = this.screen_mode;
		Laya.stage.useRetinalCanvas = this.retinal_mode;

		if (this.base_resource_url) {
			Laya.URL.basePath = this.base_resource_url;
		}
		console.log("使用资源路径", Laya.URL.basePath);

		this.backend_stage = Laya.stage;
		console.log("Laya引擎启动成功");
	}

	static start_egret() {
		global['Main'] = egret.DisplayObjectContainer;
		egret.runEgret({
			renderMode: 'webgl',
			scaleMode: egret.StageScaleMode.FIXED_WIDTH,
			frameRate: 60,
			contentWidth: this.width,
			contentHeight: this.height,
			orientation: "portrait",
			maxTouches: 10,
		});

		if (egret_stages && egret_stages.length) {
			this.backend_stage = egret_stages[0];
			console.log("Egret 引擎启动成功");
		} else {
			console.error("Egret 引擎启动失败");
		}
	}
}
