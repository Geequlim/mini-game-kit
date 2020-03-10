/**
 * 此配置用于替换之前的config/webpack.config.js。使用此配置文件时，请将原来的config/webpack.config.js里的externals配置同步到此处。
 * 原来 webpack.config.js中拷贝的资源，放到src目录下即可，打包时会自动拷贝到build
 * @param {Object} options 提供一些参数
 * @param {String} options.context   小游戏工程目录
 * @param {String} options.src 小游戏工程src目录
 * @param {String} options.build 小游戏工程的编译目录
 */
module.exports = function (options) {

	// 使用 externals方式引入模块，请参考webpack externals的用法 https://webpack.js.org/configuration/externals/
	/**
	 * 外部依赖配置
	 * module_name [String] 表示模块名  在 game.js的中对这个模块的引用可以使用 require(module_name)
	 * module_path [String] 表示模块路径，是相对于 build 文件夹的路径，使用 module_name引入被打包后转为成为的路径
	 * module_from [String] 表示这个模块相对于当前工程中根目录的路径，在构建时会从这个路径拷贝文件到 build 目录 的modue_path下，然后被引用
	 *
	 * 例如： 如下有一条配置
	 * const externals = [{
	 *    module_name:'qgame-adapter',
	 *    module_path:'src/qgame-adapter.js',
	 *    module_from:'engine/src/qgame-adapter.js'
	 * }]
	 *
	 * 表示，在当前工程目录中存在 'engine/src/qgame-adapter.js'这个文件，在打包时会被拷贝到 build目录下的 'src/qgame-adapter.js'。
	 * 而在game.js中 使用 require('qgame-adapter') 引用时，能加载 build目录下的 'src/qgame-adapter.js' 这个模块
	 */
	const externals = [
		{
			module_name: './libs/modules/vivo/qgame-adapter.min.js',
			module_path: './libs/modules/vivo/qgame-adapter.min.js',
			module_from: 'src/libs/modules/vivo/qgame-adapter.min.js',
		},
		{
			module_name: './libs/modules/laya/laya.vvmini.min.js',
			module_path: './libs/modules/laya/laya.vvmini.min.js',
			module_from: 'src/libs/modules/laya/laya.vvmini.min.js',
		},
		{
			module_name: './libs/modules/laya/laya.core.min.js',
			module_path: './libs/modules/laya/laya.core.min.js',
			module_from: 'src/libs/modules/laya/laya.core.min.js',
		},
		{
			module_name: './libs/modules/laya/laya.d3.min.js',
			module_path: './libs/modules/laya/laya.d3.min.js',
			module_from: 'src/libs/modules/laya/laya.d3.min.js',
		},
		{
			module_name: './libs/modules/laya/laya.html.min.js',
			module_path: './libs/modules/laya/laya.html.min.js',
			module_from: 'src/libs/modules/laya/laya.html.min.js',
		},
		{
			module_name: './libs/modules/laya/laya.physics3D.min.js',
			module_path: './libs/modules/laya/laya.physics3D.min.js',
			module_from: 'src/libs/modules/laya/laya.physics3D.min.js',
		},
		{
			module_name: './libs/modules/laya/laya.ui.min.js',
			module_path: './libs/modules/laya/laya.ui.min.js',
			module_from: 'src/libs/modules/laya/laya.ui.min.js',
		},
		{
			module_name: './libs/modules/fairygui/fairygui.laya.min.js',
			module_path: './libs/modules/fairygui/fairygui.laya.min.js',
			module_from: 'src/libs/modules/fairygui/fairygui.laya.min.js',
		},
		{
			module_name: './libs/modules/bundle/bundle.min.js',
			module_path: './libs/modules/bundle/bundle.min.js',
			module_from: 'src/libs/modules/bundle/bundle.min.js',
		},
	]

	return {
		externals
	}
}
