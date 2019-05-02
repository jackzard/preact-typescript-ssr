const crypto = require('crypto')

module.exports = {
	getLocalIndent: (debug) => {
		return (context, localIdentName, localName, options) => {
			const crypt = crypto.createHash('md5')
				.update(`${ localName }${ context.resourcePath }`)
				.digest('base64')
				.replace(/[^a-z0-9]/gi, '')

			const filtered = `_${crypt}`
				.replace(/a/g, 'z')
				.replace(/d/g, 'x')
				.replace(/s/g, 'c')
				.substr(0, 6)

			return debug === true
				? `${ filtered }--${ localName }`
				: filtered
		}

	}
}
