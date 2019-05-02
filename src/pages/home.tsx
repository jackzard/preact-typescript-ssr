import { Component, h } from 'preact'
import { Link } from 'preact-router'
import { TransferState } from '../helper/transfer-state'
import style from './home.scss'

interface HomeProps {
	state: TransferState
}

export class HomePage extends Component<HomeProps, any> {

	state = {
		data: {}
	}
	ref

	async componentWillMount() {
		const state = this.props.state

		const ajax = await state.getAjax({
			key: 'homepage',
			requests: {
				url: 'https://jsonplaceholder.typicode.com/todos/1',
				method: 'get',
			},
			cache: true
		})

		this.setState({data: ajax.data})
	}

	componentDidMount(): void {
		this.ref.style.background = 'red'
	}

	render(props, state) {
		return <div ref={ ref => this.ref = ref }>
			Homepage : { state.data.id }
			<br/>

			<div class={ style.homeTest3 }>
				Test Style
			</div>
			<Link href={ '/lazy' } class={ style.homeDemo }>
				Lazy Load
			</Link>
		</div>
	}
}
