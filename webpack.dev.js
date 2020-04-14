/**
 * name: webpack.dev.js
 * desc: demo开发环境webpack打包配置
 * date: 2018/9/8
 * author: kelvin
 */
const { resolve } = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = env => {
	const base = {
		entry: {
			app: './entry/index.tsx'
		},
		output: {
			path: resolve(__dirname, 'build'),
			filename: '[name].bundle.js',
			chunkFilename: '[name].[chunkhash].js',
			publicPath: '/',
			library: 'sxzmodule',
			libraryTarget: 'umd'
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.js']
		},
		module: {
			rules: [
				{
					test: /\.(tsx|ts)?$/,
					exclude: '/node_modules/',
					use: [{ loader: 'ts-loader' }]
				},
				{
					test: /\.html$/,
					use: 'html-loader'
				},
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader']
				},
				{
					test: /\.scss$/,
					use: [{
						loader: 'style-loader'
					}, {
						loader: 'css-modules-typescript-loader'
					}, {
						loader: 'css-loader',
						options: {
							modules: {
								mode: 'global',
								localIdentName: '[local]-[hash:base64:6]'
							}
						}
					}, {
						loader: 'sass-loader'
					}]
				},
				{
					test: /\.(png|jpg|jpeg|svg)$/,
					use: [
						{
							loader: 'url-loader',
							options: {
								limit: 8192,
								name: 'assets/[name].[ext]',
							},
						},
					]
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/,
					loader: ['file-loader']
				}
			]
		},
		plugins: [
			new htmlWebpackPlugin({
				template: './index.html'
			}),
			new cleanWebpackPlugin('build')
		],
		devServer: {
			port: 8099,
			historyApiFallback: true
		},
		mode: 'development'
	}

	if (env.LINT === "true") {
		base.module.rules.push({
			test: /\.(tsx|ts)?$/,
			enforce: "pre",
			exclude: /node_modules/,
			loader: "eslint-loader",
			options: {
				configFile: "lint_configs/.eslintrc.js",
				formatter: require('eslint-formatter-pretty')
			}
		});
		base.plugins.push(new StylelintPlugin({
			context: "src/scss",
			configFile: "lint_configs/stylelint.config.js",
			files: ["**/*.scss", "*/scss", "*.scss"],
			syntax: 'scss',
			formatter: require("stylelint-formatter-pretty")
		}));
	}

	return base;

};
