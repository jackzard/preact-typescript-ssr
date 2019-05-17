const {stringifyRequest} = require('loader-utils')
const crypto = require('crypto')

module.exports = () => {
}
module.exports.pitch = (request) => {
	if (this.cacheable) {
		this.cacheable()
	}
	// Get File Name
	let file = request.split('!/')
	file = file[file.length - 1]
	file = crypto.createHash('md5').update(file)
		.digest('base64')
		.replace(/[^a-z0-9]/gi, '')
		.substr(0, 4)
	file = `s${ file }`

	const insertCss = require.resolve('./insert-css.js')
	return `
		var css = require(${ stringifyRequest(this, `!!${ request }`) });
		var id = ${ stringifyRequest(this, `${ file }`) };
		var insertCss = require(${ stringifyRequest(this, `!!${ insertCss }`) });
		
		exports = module.exports = css.locals || {};
		exports._insertCss = function() { return insertCss(css) };
		exports._toString = css.toString;
		exports._module_id = id
		
		// Hot Module Replacement
    	// https://webpack.github.io/docs/hot-module-replacement
    	// Only activated in browser context
    	if (module.hot && typeof window !== 'undefined' && window.document) {
      		var removeCss = function() {};
      		module.hot.accept(${ stringifyRequest(this, `!!${ request }`) }, function(){
      			css = require(${ stringifyRequest(this, `!!${ request }`) });
      			removeCss = insertCss(css);
      		});
      		module.hot.dispose(function () { removeCss(); })
      	}	
	`
}
