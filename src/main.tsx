import { h, render } from 'preact'
import './styles.scss'
import { AllRouter } from './all-router'
import { Provider } from 'preact-redux'
import { RootReducer } from './store/data'
import { createStore } from 'redux'
import { TransferState } from './helper/transfer-state'

const store = createStore(RootReducer)

const state = new TransferState()
let server_data = window[state.KEY]
if (server_data) {
	server_data = JSON.parse(server_data)
} else {
	server_data = {}
}
state.storeData(server_data)


render(
	<Provider store={ store }>
		<AllRouter state={ state }/>
	</Provider>,
	document.getElementById('root'),
	document.getElementById('app')
)
