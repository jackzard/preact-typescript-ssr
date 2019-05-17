import { h } from 'preact'
import { AllRouter } from './all-router'
import { render } from 'preact-render-to-string'
import { Provider } from 'preact-redux'
import { combineReducers, createStore } from 'redux'
import { TransferState } from './helper/transfer-state'
import { StaticServe } from './helper/static-serve'
import { StyleRootProvider } from './helper/styling/styles'

const turbo = require('turbo-http')
const fs = require('fs')

let HTMLEmbed

const store = createStore(combineReducers(
	() => {
	}
))


const Bootstrap = () => {
	const html = fs.readFileSync('./index.html', 'utf-8')

	HTMLEmbed = (str: string, state: string, styles: string) => {
		return html.replace('</head>', `${ styles }</head>`)
			.replace(
				'<div id="root"></div>',
				`<div id="root">${ str }</div>${ state }`
			)
	}

	server.listen(8080)
}

const server = turbo.createServer(async function (req, res) {
	const is_file = StaticServe(res, req.url)
	if (is_file) return

	const state = new TransferState()

	// Style collector
	let styles_string = ''
	const insertCss = (css: string) => {
		styles_string += css
	}

	const components = await render(
		<Provider store={ store }>
			<StyleRootProvider insertCss={ insertCss }>
				<AllRouter url={ req.url } state={ state }/>
			</StyleRootProvider>
		</Provider>
	)


	const data = state.getData()
	const str_data = JSON.stringify(data)

	const html = HTMLEmbed(
		components,
		`<script>window.${ state.KEY } = ${ str_data };</script>`,
		styles_string
	)
	const buff = Buffer.from(html)

	res.setHeader('Content-Length', buff.length)
	res.write(buff)

})

Bootstrap()

