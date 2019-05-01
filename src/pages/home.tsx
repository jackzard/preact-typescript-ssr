import { Component, h } from 'preact'
import { Link } from 'preact-router'
import { NG } from '../helper/helper'
import { TransferState } from '../helper/transfer-state'

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
			cache:true
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
			<Link href={ '/lazy' }>
				Lazy Load
			</Link>
		</div>
	}
}
