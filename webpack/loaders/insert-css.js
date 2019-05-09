module.exports = (style) => {
	let id = '_s'
	// Generate Id based on total class in module, because css module give different id between browser and node
	for (const cls in style.locals) {
		id += `${cls.length}`
	}
	id += `${Object.keys(style.locals || {}).length}`

	const [_, css, media, sourceMap] = style[0]

	// Server Side
	if (typeof window === 'undefined' || typeof document === 'undefined') {
		return {id, css}
	}

	// Browser Side
	let elem = document.getElementById(id)

	if (elem) return removal.bind(null, elem)

	elem = document.createElement('style')
	elem.setAttribute('type', 'text/css')
	elem.id = id

	if (media) {
		elem.setAttribute('media', media)
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

	document.head.appendChild(elem)

	// Return removal
	return removal.bind(null, elem)
}

function removal(el) {
	el.parentNode.removeChild(el)
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
