const path = require('path')
const NodeExternals = require('webpack-node-externals')

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
				loader: ['babel-loader','awesome-typescript-loader']
			},
		]
	},
}
