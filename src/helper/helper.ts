export const NG = (obj = {}, key = '', initial = undefined): any => {
	const value = key.split('.')
		.reduce(function (o, x) {
			return (typeof o === 'undefined' || o === null) ? o : o[x]
		}, obj)
	if (typeof value === 'undefined') return initial
	return value
}

export const NS = (obj: any, path: string, value: any) => {
	let schema = obj
	const pList = path.split('.')
	const len = pList.length
	for (let i = 0; i < len - 1; i++) {
		const elem = pList[i]
		if (!schema[elem]) schema[elem] = {}
		schema = schema[elem]
	}
	schema[pList[len - 1]] = value
	return obj
}

export const SimpleParser = (str, mix) => {
	return str.replace(/{{(.*?)}}/g, (x, key, y) => {
		x = 0
		y = mix
		key = key.trim().split('.')
		while (y && x < key.length) {
			y = y[key[x++]]
		}
		return y != null ? y : ''
	})
}

export const GetDynamicComponent = (comp: any, cb) => {
	if (comp.then) {
		return comp.then(module => module.default)
	} else if (comp.default) {
		return cb({component: comp.default})
	}
}

export const IsBrowser = typeof window !== 'undefined'
