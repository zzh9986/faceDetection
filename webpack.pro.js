/**
 * name: webpack.pro.js
 * desc: demo生产环境webpack配置
 * date: 2018/9/8
 * author: kelvin
 */
const { resolve } = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: {
		app: './entry/index.tsx',
	},
	output: {
		path: resolve(__dirname, 'dist'),
		filename: '[name].bundle.js',
		chunkFilename: '[name].[chunkhash].js',
		publicPath: '/'
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
				loader: 'url-loader?limit=8192'
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
		new cleanWebpackPlugin('dist')
	],
	mode: 'production'
};
