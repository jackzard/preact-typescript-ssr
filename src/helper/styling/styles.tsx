import { Component, h } from 'preact'
import { IsBrowser } from '../helper'

export const withStyles = (...styles) => Comp => class WrapStyles extends Component<any> {

	styles_list: any = []

	componentWillMount(): void {

		styles.map(style => {
			if (IsBrowser) {
				this.styles_list.push(style._insertCss())
			} else {
				if (this.context.insertRootCss) {
					const {id, css} = style._insertCss()
					this.context.insertRootCss(`<style type="text/css" id="${ id }">${ css }</style>`)
				}
			}
		})

	}

	componentWillUnmount() {
		// this.styles_list.map(s => s())
	}

	render(props) {
		return <Comp { ...props }/>
	}
}


interface IStyleRoot {
	insertCss: (style: string) => void
}

export class StyleRootProvider extends Component<IStyleRoot> {

	componentWillMount() {
		this.context.insertRootCss = this.props.insertCss
	}

	render(props) {
		return <div>{ props.children }</div>
	}

}
