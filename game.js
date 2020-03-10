var config = {
	project: 'mini-game-kit',
	platform: 'web',
	appid: 'APPID',
	appkey: 'APPKEY',
	debug: true,
	inspector: false,
	backend_engine: 'laya',
	res_version: '20200310',
	version: '1.0.0',
	libs: {},
	resource_url: 'http://127.0.0.1:3100'
};
var BROWSER_PLATFORMS = ['web', 'qtt', 'pure'];

if (typeof global === 'undefined') var global = this || {};
if (typeof window === 'undefined') var window = global;
if (typeof document !== 'undefined') document.title = config.project;

function initialize() {
	window.config = config;

	if (!config.debug) {
		var cdn = config.resource_url;
		if (cdn) {
			config.base_resource_url = cdn + '/';
		}
		if (!cdn.startsWith("http://192.168.") && !cdn.startsWith("http://127.0.0.1:") && !cdn.startsWith("http://localhost:")) {
			config.base_resource_url += config.res_version + '/';
		}
		if (BROWSER_PLATFORMS.indexOf(config.platform) >= 0) {
			config.base_resource_url = "";
		}
		config.stat = false;
	}

	// 设置加载JS脚本的函数
	if (typeof(wx) !== "undefined") {
		window.wx = wx;
		wx.is_simulator = wx.getSystemInfoSync().platform == 'devtools';
		window.load_script = require;
		window.wx.config = config;
	} else if (typeof(swan) !== "undefined") {
		swan.config = config;
		window.swan = swan;
		window.load_script = require;
		window.swan.config = config;
	} else if (typeof(qg) !== "undefined") {
		window.qg = qg;
		window.load_script = require;
		window.qg.config = config;
	} else if (typeof(document) !== 'undefined') { // Web 平台
		window.load_script = function(url) {
			var script = document.createElement("script");
			script.async = false;
			script.src = url;
			return document.body.appendChild(script);
		};
	}
};


function load_lib_module(module, file) {
	var file = file || module;
	var script = "./libs/modules/" + module + "/" + file + (config.debug ? ".js" : ".min.js");
	return window.load_script(script);
}

function load_platform_adapters() {
	switch(config.platform) {
		case 'qq': {
			load_lib_module("wx", "weapp-adapter");
			if (config.backend_engine === 'laya') load_lib_module("laya", "laya.qqmini");
		} break;
		case 'bytedance':
		case 'wechat': {
			load_lib_module("wx", "weapp-adapter");
			if (config.backend_engine === 'laya') load_lib_module("wx", "laya.wxmini");
		} break;
		case 'baidu': {
			load_lib_module("swan", "swan-adapter");
			if (config.backend_engine === 'laya') load_lib_module("laya", "laya.bdmini");
		} break;
		case 'oppo': {
			if (config.backend_engine === 'laya') load_lib_module("laya", "laya.quickgamemini");
		} break;
		case 'web':
		default: {
		} break;
	}

};

function load_game_dependencies(callback) {

	var load_game_libs = function () {
		switch (config.backend_engine) {
			case 'laya': {
				load_lib_module("laya", "laya.core");
				load_lib_module("laya", "laya.html");
				load_lib_module("laya", "laya.ui");
				load_lib_module("fairygui", "fairygui.laya");
				load_lib_module("laya", "laya.d3");
				load_lib_module("laya", "laya.physics3D");
				if (config.inspector) {
					load_lib_module("laya", "laya.debugtool");
				}
				if (config.platform == 'wechat' || config.platform == 'qq') {
					// 阿拉丁SDK
					window.load_script("sdk/ald/ald-game.js");
				}
			} break;
			case 'egret':
				load_lib_module("egret", "egret");
				load_lib_module("egret", "game");
				load_lib_module("egret", "egret.web");
				load_lib_module("fairygui", "fairygui.egret");
				break;
			default:
				break;
		}
	};

	var subpackages = [
		{
			"name": "ui",
			"root": "assets/ui/"
		},
		{
			"name": "unity_exported",
			"root": "assets/unity_exported/"
		},
		{
			"name": "sounds",
			"root": "assets/sounds/"
		}
	];

	var subpackage_loader = null;
	if (typeof(wx) !== 'undefined' && wx.loadSubpackage) {
		subpackage_loader = wx.loadSubpackage;
	} else if (typeof swan !== 'undefined' && swan.loadSubpackage) {
		subpackage_loader = swan.loadSubpackage;
	}

	if (subpackage_loader && subpackages.length) {
		var loaded_package = 0;
		for (let i = 0; i < subpackages.length; i++) {
			var pkg = subpackages[i];
			subpackage_loader({
				name: pkg.name,
				success: function(res) { console.log("已加载分包", pkg); },
				fail: function(err) { console.error("加载分包出错", pkg); },
				complete: function(){
					++loaded_package;
					if (loaded_package >= subpackages.length) {
						console.log("分包加载完毕");
						load_game_libs();
						callback();
					}
				}
			});
		}
	} else {
		load_game_libs();
		callback();
	}
};

initialize();
if (config.platform === 'vivo') {
	function start_game() {
		'$VIVO_TEMPLATE_ENTRY$'
	};
	if (qg.loadSubpackage) {
		qg.loadSubpackage({
			name: 'assets',
			success: function(res) { console.log("分包加载完成"); },
			fail: function(err) { console.error("分包加载出错", JSON.stringify(err, undefined, 2)); },
			complete: function(){ start_game(); }
		});
	} else {
		start_game();
	}
} else {
	load_platform_adapters();
	load_game_dependencies(function() {
		load_lib_module('bundle');
	});
}
