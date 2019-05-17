const path = require('path')
const {TsConfigPathsPlugin} = require('awesome-typescript-loader')

module.exports = env => {
	const prod = env === 'production'
	let config = prod ? require('./webpack/webpack.prod') : require('./webpack/webpack.dev')

	return {
		mode: prod ? 'production' : 'development',
		devtool: prod ? '' : 'source-map',
		entry: './src/main.tsx',
		resolve: {
			extensions: ['.ts', '.tsx', '.js'],
			plugins: [
				new TsConfigPathsPlugin(),
			],
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].[hash].js',
			chunkFilename: '[name].[hash].js',
		},
		...config
	}
}
