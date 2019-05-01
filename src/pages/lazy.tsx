import { Component, h } from 'preact'

export default class Lazy extends Component<any> {

	componentDidMount() {
		console.log('Async component mounted')
	}

	render() {
		return (
			<div>
				<span>Lazy Loaded</span>
			</div>
		)
	}
}
