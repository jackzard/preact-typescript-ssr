const crypto = require('crypto')
const date = new Date()

module.exports = {
	getLocalIndent: (debug) => {
		return (context, localIdentName, localName, options) => {

			const crypt = crypto.createHash('md5')
				.update(`${ context.resourcePath }${ localName }${ date.getDate() }${ date.getMinutes() }`)
				.digest('base64')
				.replace(/[^a-z0-9]/gi, '')

			const filtered = `_${ crypt }`
				.replace(/a/g, 'z')
				.replace(/A/g, 'Z')
				.replace(/d/g, 'x')
				.replace(/D/g, 'X')
				.replace(/s/g, 'c')
				.replace(/S/g, 'C')
				.substr(0, 6)

			return debug === true
				? `${ filtered }--${ localName }`
				: filtered
		}

	}
}
