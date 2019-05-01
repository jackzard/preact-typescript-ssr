import Router from 'preact-router'
import { h } from 'preact'
import { HomePage } from './pages/home'
import AsyncRoute from 'preact-async-route'
import { GetDynamicComponent } from './helper/helper'

export const AllRouter = (props) => (
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
