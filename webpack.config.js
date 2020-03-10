const path = require('path');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const workSpaceDir = path.resolve(__dirname);

/** 忽略编辑的第三方库 */
const externals = {};

module.exports = (env) => {
	if (!env) { env = {production: false, analyze: false};}
	console.log("Compile config:", env);
	return ({
		entry: path.join(workSpaceDir, 'src/main.ts'),
		devServer:{
			port: 3030,
			open: true,
			historyApiFallback: true
		},
		output: {
			path: path.join(workSpaceDir, 'libs/modules/bundle'),
			filename: env.production ? 'bundle.min.js': 'bundle.js'
		},
		module: {
			rules: [
				{ test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
				{ test:/\.(md|txt|glsl)$/, use: "raw-loader" },
			]
		},
		plugins: [
			// new webpack.HotModuleReplacementPlugin(),
			env.analyze ? new BundleAnalyzerPlugin(): new webpack.DefinePlugin({}),
		],
		resolve: {
			extensions: [ '.tsx', '.ts', '.js', 'glsl', 'md', 'txt' ],
			plugins: [
				new TsconfigPathsPlugin({configFile: path.join(workSpaceDir, 'tsconfig.json')})
			]
		},
		devtool: env.production ? "" : "source-map",
		mode: env.production ? "production" : "development",
		externals: env.production ? externals : {},
	});
};
