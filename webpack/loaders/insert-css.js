module.exports = (style) => {
	const [moduleId, css, media, sourceMap] = style[0]
	// Generate Id based on length of css , because css module give different id between browser and node
	const dev = process.env.NODE_ENV === 'development'
	id = dev ? `s${ moduleId }` : `s${ media.length }${ css.length }`

	// Server Side
	if (typeof window === 'undefined' || typeof document === 'undefined') {
		return {id, css}
	}

	// Browser Side
	let elem = document.getElementById(id)
	let create = false

	if (elem) {
		if (!dev) return removal.bind(null, elem)
	} else {
		create = true
		elem = document.createElement('style')
		elem.setAttribute('type', 'text/css')
		elem.id = id
		if (media) {
			elem.setAttribute('media', media)
		}
	}

	let cssText = css

	if (sourceMap && typeof btoa === 'function') {
		cssText += `\n/*# sourceMappingURL=data:application/json;base64,${ b64EncodeUnicode(
			JSON.stringify(sourceMap),
		) }*/`
		cssText += `\n/*# sourceURL=${ sourceMap.file }?${ id }*/`
	}

	if (elem.styleSheet) {
		// This is required for IE8 and below.
		elem.styleSheet.cssText = cssText
	} else {
		elem.textContent = cssText
	}

	if (create) {
		document.head.appendChild(elem)
	}


	// Return removal
	return removal.bind(null, elem)
}

function removal(el) {
	if (el && el.parentNode) {
		el.parentNode.removeChild(el)
	}
}

// Base64 encoding and decoding - The "Unicode Problem"
// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
function b64EncodeUnicode(str) {
	return btoa(
		encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) =>
			String.fromCharCode(`0x${ p1 }`),
		),
	)
}
