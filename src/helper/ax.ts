import { Observable, Observer, OperatorFunction } from 'rxjs'
import { map } from 'rxjs/operators'
import { AxiosResponse } from 'axios'

const axios = require('axios')

export interface AxrxResponse {
	data: any
	status: number
}

export class AX {

	static get(url: string, params: any = {}): Observable<AxrxResponse> {
		return ObservableWrap(axios.get(url, {params}))
	}

	static post(url: string, form: any = {}): Observable<AxrxResponse> {
		return ObservableWrap(axios.post(url, form))
	}

	static put(url: string, form: any = {}): Observable<AxrxResponse> {
		return ObservableWrap(axios.put(url, form))
	}

	static delete(url: string, config: any = {}): Observable<AxrxResponse> {
		return ObservableWrap(axios.delete(url, config))
	}

}

const GlobalPipe = (): OperatorFunction<any, any>[] => {
	return [
		map((res: AxiosResponse) => {
			return {data: res.data, status: res.status}
		})
	]
}

const ObservableWrap = (cb: Promise<AxiosResponse>) => {
	return Observable.create((obs: Observer<any>) => {
		return cb.then((res: AxiosResponse) => {
			obs.next(res)
			obs.complete()
		}).catch(err => {
			obs.error(err)
		})
	}).pipe(...GlobalPipe())
}
