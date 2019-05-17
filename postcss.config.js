module.exports = {
	parser: 'postcss-scss',
	plugins: {
		'cssnano': {
			discardComments: {removeAll: true}
		},
		'postcss-preset-env': {
			browsers: 'last 2 version'
		},
	},
}
