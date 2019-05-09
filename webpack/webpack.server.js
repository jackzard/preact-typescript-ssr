const path = require('path')
const NodeExternals = require('webpack-node-externals')
const util = require('./webpack.util')

module.exports = {
	mode: 'production',
	entry: [
		'./src/server.tsx'
	],
	output: {
		path: path.resolve(__dirname, '..', 'dist'),
		filename: 'server.js',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	externals: [
		NodeExternals()
	],
	plugins: [],
	target: 'node',
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				loader: ['babel-loader', 'awesome-typescript-loader']
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
							importLoaders: 3,
							modules: true,
							camelCase: true,
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
	},
}
