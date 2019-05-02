const path = require('path')
const NodeExternals = require('webpack-node-externals')
const util = require('./webpack.util')

module.exports = {
	mode: 'development',
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
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: true,
							exportOnlyLocals: true,
							camelCase: true,
							getLocalIdent: util.getLocalIndent()
						}
					}
				]
			}
		]
	},
}
