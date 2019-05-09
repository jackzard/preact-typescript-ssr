import { combineLatest } from 'rxjs'
import { AX } from './ax'

const dayjs = require('dayjs')

export interface TransferRequestAjax {
	method: 'get' | 'post' | 'put' | 'delete'
	url: string
	form?: any
}

export interface TransferStateAjax {
	key: string | number
	cache?: number // number of hours to cached
	requests: TransferRequestAjax[] | TransferRequestAjax
}

export class TransferState {
	public KEY = '___TRANSFER___'

	private timekey = '_t'
	private is_browser
	private data: any = {}

	constructor() {
		this.is_browser = typeof window !== 'undefined'
	}

	private getAX(c: TransferRequestAjax) {
		return AX[c.method](c.url, c.form)
	}

	private async runRequest(req: TransferRequestAjax | TransferRequestAjax[]) {
		let data: any = Array.isArray(req) ? [] : {}

		if (Array.isArray(req)) {
			const obs_lists = req.map(req => this.getAX(req))
			data = await combineLatest(obs_lists).toPromise()
		} else {
			data = await this.getAX(req).toPromise()
		}

		return data
	}

	async getAjax(c: TransferStateAjax) {
		if (!this.is_browser) {
			// Server side always run promise
			this.data[c.key] = await this.runRequest(c.requests)
			this.setTimeRequest(c)
			return this.data[c.key]
		} else {
			// Browser side
			let res = this.data[c.key]

			if (typeof res === 'undefined') {
				this.data[c.key] = await this.runRequest(c.requests)
				this.setTimeRequest(c)
				res = this.data[c.key]
			}

			if (!c.cache) {
				delete this.data[c.key]
			} else {
				const cache_time = this.data[`${ this.timekey }${ c.key }`]
				if (!cache_time) {
					delete this.data[c.key]
				} else {

					const now = dayjs().valueOf()
					if (cache_time < now) {
						delete this.data[c.key]
					}
				}
			}

			return res
		}
	}

	// Set Cache by Time
	setTimeRequest(c: TransferStateAjax) {
		if (c.cache) {
			this.data[`${ this.timekey }${ c.key }`] = dayjs()
				.add(c.cache, 'hour')
				.valueOf()
		}
	}

	storeData(data) {
		this.data = data
	}

	getData() {
		return this.data
	}

	removeData(key: string | number) {
		delete this.data[key]
	}

}
