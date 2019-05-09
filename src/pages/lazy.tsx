import { Component, h } from 'preact'
import sty from './lazy.scss'
import { withStyles } from '../helper/styling/styles'

class Lz extends Component<any> {

	componentDidMount() {
		console.log('Async component mounted')
	}

	render() {
		return (
			<div class={ sty.imSuperLazy }>
				<span>Lazy Loaded</span>
			</div>
		)
	}
}

export default withStyles(sty)(Lz)
