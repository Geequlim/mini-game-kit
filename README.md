## Mini Game Kit

模块化的HTML5休闲游戏框架, 适用于开发微信、百度、抖音、OPPO、VIVO、QQ等小游戏开发。

使用 FairyGUI 制作UI表现，Unity制作3D场景，使用 LayaBox ~~或egret~~ 引擎作为渲染引擎。

## 开发工具及依赖环境
- Visual Studio Code
	- Debugger for Chrome
	- EditorConfig for VS Code
- [FairyGUI](http://www.fairygui.com/)
- Unity Editor
	- Laya 的 Unity 导出插件
- NodeJS
- Yarn 包管理器
- Python 3.6+

## 使用方式

下面所有命令都可以在 VSCode IDE 的 `NPM脚本` 面板中一键执行

* 克隆该项目到本地
* 执行 `yarn install` 安装依赖包
* 使用 FairyGUI 编辑器打开 `ui.project` UI项目，导出所需的UI脚本和美术资源
* 使用 Unity 编辑器打开 `unity.project` 项目，导出所需的3D场景
	- 设置导出为场景
	- 导出目录设置为改项目目录的 `assets/unity_exported`
	- 执行命令 `yarn scene2code` 生成场景代码
* 执行 `yarn dev` 编译项目
* 执行 `yarn run` 启动本地游戏调试服务
* 使用 VSCode 编辑器进行调试，或访问`3100` 端口进行测试

## 发布到小游戏平台
- 支持一键发布到多个小游戏平台
	- 纯Web H5游戏
	- 微信小游戏
	- QQ小游戏
	- 百度小游戏
	- VIVO小游戏
	- OPPO快游戏
	- 趣头条
	- 字节跳动小游戏平台（今日头条、抖音、西瓜视频）
- 执行`yarn publish-xxx` 即可发布到对应的平台
