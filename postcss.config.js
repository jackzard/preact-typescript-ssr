module.exports = {
	plugins: {
		'postcss-preset-env': {},
		'cssnano': {
			discardComments: {removeAll: true}
		},
	},
	minimize: true
}
