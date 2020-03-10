const shelljs = require("shelljs");
const path = require("path");
const fs = require("fs");
shelljs.mv('release/vivo/game.js', 'release/vivo/src/game.js');
shelljs.mv('release/vivo/assets', 'release/vivo/src/assets');

function def_module(dir, file) {
	return {
		module_name: `./libs/modules/${dir}/${file}.min.js`,
		module_path: `./libs/modules/${dir}/${file}.min.js`,
		module_from: `libs/modules/${dir}/${file}.min.js`,
	}
}

modules = [
	def_module('vivo', 'qgame-adapter'),
	def_module('laya', "laya.vvmini"),
	def_module('laya', 'laya.core'),
	def_module('laya', "laya.html"),
	def_module('laya', "laya.d3"),
	def_module('laya', "laya.ui"),
	def_module('laya', "laya.physics3D"),
	def_module('fairygui', "fairygui.laya"),
	def_module('bundle', 'bundle'),
];

// exteranl 外部模块定义
const external_lib_template = `
module.exports = function (options) {
  const externals = ${JSON.stringify(modules, undefined, 2)}
  return { externals };
}
`;
fs.writeFileSync('release/vivo/minigame.config.js', external_lib_template, { encoding: 'utf8' });

// game.js 静态require代码
let game_text = fs.readFileSync('release/vivo/src/game.js', { encoding: 'utf8' });
let require_text = `
if(!window.navigator) window.navigator = {};
window.navigator.userAgent = 'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E8301 VVGame NetType/WIFI Language/zh_CN';
`;
for (const m of modules) {
	require_text += `\trequire('${m.module_path}');\n`;
}
game_text = game_text.replace("'$VIVO_TEMPLATE_ENTRY$'", require_text);
fs.writeFileSync('release/vivo/src/game.js', game_text, { encoding: 'utf8' });

shelljs.cd("release/vivo");
shelljs.exec("yarn install");
shelljs.exec("yarn build");
shelljs.exec("yarn release");
shelljs.exec("yarn server");
