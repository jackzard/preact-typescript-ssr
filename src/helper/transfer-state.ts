import { combineLatest } from 'rxjs'
import { AX } from './ax'

export interface TransferRequestAjax {
	method: 'get' | 'post' | 'put' | 'delete'
	url: string
	form?: any
}

export interface TransferStateAjax {
	key: string | number
	cache?: boolean
	requests: TransferRequestAjax[] | TransferRequestAjax
}

export class TransferState {
	public KEY = '___TRANSFER___'
	private is_browser
	private data: any = {}

	constructor() {
		this.is_browser = typeof window !== 'undefined'
	}

	private getAX(c: TransferRequestAjax) {
		return AX[c.method](c.url, c.form)
	}

	private async runRequest(req: TransferRequestAjax | TransferRequestAjax[]) {
		let data: any = Array.isArray(req) ? [] : null

		if (Array.isArray(req)) {
			const obs_lists = req.map(req => this.getAX(req))
			data = await combineLatest(obs_lists)
		} else {
			data = await this.getAX(req).toPromise()
		}

		return data
	}

	async getAjax(c: TransferStateAjax) {
		if (!this.is_browser) {
			// Server side always run promise
			this.data[c.key] = await this.runRequest(c.requests)
			return this.data[c.key]
		} else {
			// Browser side
			const res = this.data[c.key]
			if (typeof res !== 'undefined') {
				// Skip if need cache
				if (!c.cache) delete this.data[c.key]
				return res
			}

			return await this.runRequest(c.requests)
		}
	}


	storeData(data) {
		this.data = data
	}

	getData() {
		return this.data
	}

}
