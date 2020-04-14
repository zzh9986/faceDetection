/**
 * name: webpack.pro.js
 * desc: 模块正式打包的webpack配置
 * date: 2018/9/8
 * author: kelvin
 */
const { resolve } = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = env => {
    let base = {
        entry: {
            index: './src/index.tsx',
        },
        output: {
            path: resolve(__dirname, 'dist'),
            filename: 'index.min.js',
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
                                name: 'assets/[name]_[hash].[ext]',
                                publicPath: '/sxz-module/'
                            },
                        },
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                limit: 8192,
                                name: 'assets/[name]_[hash].[ext]',
                                publicPath: '/sxz-module/'
                            },
                        },
                    ]
                }
            ]
        },
        plugins: [
            new cleanWebpackPlugin('dist')
        ],
        mode: 'production'
    }
    if (env.DEVELOPMENT === "false") {
        base.externals = {
            'react': 'react',
            'react-dom': 'react-dom'
        }
    }
    return base;
}