const path = require('path')
const fs = require('fs')
const url = require('url')
const MimeList = {
	'.html': 'text/html',
	'.js': 'text/javascript',
	'.ico': 'image/x-icon',
	'.css': 'text/css',
	'.json': 'application/json',
	'.png': 'image/png',
	'.jpg': 'image/jpg',
	'.gif': 'image/gif',
	'.wav': 'audio/wav',
	'.mp4': 'video/mp4',
	'.woff': 'application/font-woff',
	'.ttf': 'application/font-ttf',
	'.eot': 'application/vnd.ms-fontobject',
	'.otf': 'application/font-otf',
	'.svg': 'application/image/svg+xml'
}
export const StaticServe = (res, req_url): boolean => {
	const ext = path.extname(req_url).toLowerCase()
	if (ext.indexOf('.') === -1) return false

	const parsed_url = url.parse(req_url)
	const content_type = MimeList[ext] || 'application/octet-stream'
	const path_file = `.${ parsed_url.pathname }`
	const exists = fs.existsSync(path_file)

	res.setHeader('Content-Type', content_type)

	if (!exists) {
		res.statusCode = 404
		res.setHeader('Content-Length', 0)
		res.write(Buffer.from(''))
	}

	const file = fs.readFileSync(path_file)
	res.setHeader('Content-Length',file.byteLength)
	res.write(file)

	return true
}
