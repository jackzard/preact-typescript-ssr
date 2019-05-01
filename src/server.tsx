import { h } from 'preact'
import { AllRouter } from './all-router'
import { render } from 'preact-render-to-string'
import { Provider } from 'preact-redux'
import { combineReducers, createStore } from 'redux'
import { TransferState } from './helper/transfer-state'
import { StaticServe } from './helper/static-serve'

const path = require('path')
const url = require('url')

const turbo = require('turbo-http')
const fs = require('fs')

let HTMLEmbed

const store = createStore(combineReducers(
	() => {
	}
))


const Bootstrap = () => {
	const html = fs.readFileSync('./index.html', 'utf-8')

	HTMLEmbed = (str: string, state: string) => {
		return html.replace(
			'<div id="root"></div>',
			`<div id="root">${ str }</div><script type="application/javascript">${ state || '' }</script>`
		)
	}

	server.listen(8080)
}

const server = turbo.createServer(async function (req, res) {
	// parse URL
	const parsedUrl = url.parse(req.url)
	// extract URL path
	let pathname = `.${ parsedUrl.pathname }`

	const is_file = StaticServe(res, req.url)
	if (is_file) return

	const check = fs.existsSync(pathname)
	if (check && pathname !== './') {
		const file = fs.readFileSync(pathname)
		res.setHeader('Content-Length', file.byteLength)
		return res.write(file)
	}

	const state = new TransferState()

	const components = await render(
		<Provider store={ store }>
			<AllRouter url={ req.url } state={ state }/>
		</Provider>
	)


	const data = state.getData()
	const str_data = JSON.stringify(data)

	const html = HTMLEmbed(components, `window.${ state.KEY } = '${ str_data }'`)
	res.setHeader('Content-Length', html.length)
	res.write(Buffer.from(html))
})

Bootstrap()

