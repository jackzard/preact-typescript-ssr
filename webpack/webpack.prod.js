const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const util = require('./webpack.util')

module.exports = {
	output: {
		path: path.resolve(__dirname, '..', 'dist'),
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].js',
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
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new MiniCssExtractPlugin({
			filename: 'style.[chunkhash].css',
		}),
		new OptimizeCssAssetsPlugin({
			cssProcessor: require('cssnano'),
			cssProcessorPluginOptions: {
				preset: ['default', {discardComments: {removeAll: true}}],
			},
			canPrint: false
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
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader',
						options: {
							modules: true,
							camelCase: true,
							getLocalIdent: util.getLocalIndent()
						}
					},
					{
						loader: 'sass-loader',
					},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: [
								require('autoprefixer')({}),
								require('cssnano')({preset: 'default'})
							],
							minimize: true
						}
					},
				]
			}
		]
	}
}
