const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const util = require('./webpack.util')


module.exports = {
	mode : 'production',
	output: {
		path: path.resolve(__dirname, '..', 'dist'),
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].js',
	},
	optimization: {
		minimize: true,
		splitChunks: {
			cacheGroups: {
				vendors: {
					// test: /[\\/]node_modules[\\/]/,
					test: /[\\/]node_modules\/(preact|rxjs|axios|redux)/,
					name: 'vendor',
					enforce: true,
					chunks: 'all'
				}
			}
		},
		runtimeChunk: {
			name: 'runtime'
		},
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					output: {
						comments: false,
					},
				},
			}),
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new CopyPlugin([
			{from: './src/assets', to: './assets'},
		]),
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
						loader: path.resolve(__dirname, './loaders/isomorphic-style-loader.min.js')
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 3,
							modules: true,
							camelCase: true,
							getLocalIdent: util.getLocalIndent(),
						}
					},
					{
						loader : 'postcss-loader',
					},
					{
						loader: 'sass-loader',
					}
				]
			}
		]
	}
}
