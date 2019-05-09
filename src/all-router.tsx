import Router from 'preact-router'
import { h } from 'preact'
import { HomePage } from './pages/home'
import AsyncRoute from 'preact-async-route'
import { GetDynamicComponent } from './helper/helper'
import { withStyles } from './helper/styling/styles'
import sty from './styles.scss'


const Routers = (props) => (
	<div id="app">
		<Router url={ props.url }>
			<HomePage path="/" state={ props.state }/>

			<AsyncRoute path="/lazy"
						state={ props.state }
						getComponent={ async (url, callback) => {
							return GetDynamicComponent(import('./pages/lazy'), callback)
						} }/>

			<div default>
				404
			</div>
		</Router>
	</div>
)

export const AllRouter = withStyles(sty)(Routers)
