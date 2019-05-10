const {stringifyRequest} = require('loader-utils')

module.exports = () => {
}
module.exports.pitch = (request) => {
	if (this.cacheable) {
		this.cacheable()
	}

	const insertCss = require.resolve('./insert-css.js')
	return `
		var css = require(${ stringifyRequest(this, `!!${ request }`) });
		var insertCss = require(${ stringifyRequest(this, `!!${ insertCss }`) });
		
		exports = module.exports = css.locals || {};
		exports._insertCss = function() { return insertCss(css) };
		exports._toString = css.toString;
		
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
