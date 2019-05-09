const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const util = require('./webpack.util')

module.exports = {
	devtool: 'source-map',
	devServer: {
		noInfo: true,
		quiet: true,
		historyApiFallback: true,
		contentBase: path.join('..', 'dist'),
		hot: true,
		compress: true,
		port: 4200
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					enforce: true,
					chunks: 'all'
				}
			}
		},
		runtimeChunk: {
			name: 'runtime'
		}
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new CopyPlugin([
			{from: './src/assets', to: './assets'},
		]),
		new webpack.HotModuleReplacementPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				loader: 'awesome-typescript-loader'
			},
			{
				test: /\.(ts|tsx)$/,
				enforce: 'pre',
				use: [
					{
						loader: 'tslint-loader',
					}
				]
			},
			{
				test: /\.(sass|scss|css)$/,
				use: [
					{
						loader: path.resolve(__dirname, './loaders/isomorphic-style-loader.js')
					},
					{
						loader: 'css-loader',
						options: {
							modules: true,
							camelCase: true,
							sourceMap: true,
							getLocalIdent: util.getLocalIndent()
						}
					},
					{
						loader: 'postcss-loader',
					},
					{
						loader: 'sass-loader',
					},
				]
			}
		]
	}
}
