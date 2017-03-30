// import type {fetch, Response} from 'whatwg-fetch'
import 'whatwg-fetch'
import type Application from './Application';

declare type RequestBody = string | FormData | Blob;

declare type FetchOptions = {
	method: string; //HTTP request method. Default: "GET"
	body: RequestBody; // HTTP request body
	headers: {}; // Default: {}
	credentials: "omit" | "same-origin" | "include"; //Authentication credentials mode. Default: "omit"
};

export class FetchAbortError{
	constructor(response){
		this.message = "Fetch was aborted";
		this.abort = true;
		this.response = response;
	}
}

export default class FetchService {

	constructor(app: Application){
		this.app = app;
		this.ongoingFetchPromises = [];
	}

	fetch(url: string, options: ExtendedFetchOptions): Promise{
		options = this._processFetchOptions(options);
		
		let abortable = FetchService.makeAbortable(fetch(url, options));
		this._registerFetchPromise(abortable);
		return abortable.promise.then((response) => this._checkStatus(response));
	}

	fetchJson(url: string, options: ExtendedFetchOptions): Promise{
		return this.fetch(url, options).then(FetchService.parseJSON);
	}

	fetchXml(url: string, options: ExtendedFetchOptions): Promise{
		return this.fetch(url, options).then(FetchService.parseXML);
	}

	post(url: string, body: string, options: ExtendedFetchOptions){
		let postOptions = {
			method: "POST",
			body
		};

		options = Object.assign({}, postOptions, options);
		return this.fetch(url, options);
	}

	postJson(url: string, body: string, options: ExtendedFetchOptions): Promise{
		return this.post(url, body, options).then(FetchService.parseJSON);
	}

	getViewUrl(view, cmd, paramsString){
		if(paramsString.length > 0) {
			if(paramsString[0] !== '&') {
				paramsString = '&'+paramsString;
			}
		}

		return 'index.php?k=' + encodeURIComponent(this.app.SESSION_KEY) + '&view=' + encodeURIComponent(view) + '&cmd=' + encodeURIComponent(cmd) + paramsString;
	}

	_processFetchOptions(options: FetchOptions){
		let defaultOptions = {
			credentials: 'same-origin'
		};

		options = Object.assign({}, defaultOptions, options);
		options.headers = Object.assign({}, this.app.getXSRFHeaders(), options.headers);
		return options;
	}

	abortOngoingFetchPromises() {
		let p = this.ongoingFetchPromises.pop();
		while(typeof ongoingFetchPromises !== 'undefined'){
			p.abort();
			p = this.ongoingFetchPromises.pop();
		}
	}

	_registerFetchPromise(p) {
		this.ongoingFetchPromises.push(p);
	}

	_unregisterFetchPromise(p) {
		const index = this.ongoingFetchPromises.indexOf(p);
		if(index >= 0) {
			this.ongoingFetchPromises.splice(index, 1);
		}
	}

	_checkStatus(response) {
		if(response.statusText === 'abort'){
			throw new FetchAbortError(response);
		}

		if(response.status === 401){
			return this._getViewFromResponse(response)
				.then((view) => {
					this.app.detectedExpiredSession(view);
				})
				.then(() => {
					throw new FetchAbortError(response);
				});
		}

		if(response.status === 0){
			return this._getViewFromResponse(response)
				.then((view) => {
					this.app.detectedNetworkError(view);
				})
				.then(() => {
					throw new FetchAbortError(response);
				});
		}

		if (response.status >= 200 && response.status < 300) {
			return response;
		}
		else {
			let error = new Error(response.statusText);
			error.response = response;
			throw error
		}
	}

	_getViewFromResponse(response){
		return FetchService.parseJSON(response)
			.then((data)=>{
				if(data.view){
					return data.view;
				}

				return false;
			})
			.catch(()=>{
				return false;
			});
	}

	static parseText(response) {
		return response.text()
	}

	static parseJSON(response) {
		return response.json()
	}

	static parseXML(response) {
		return FetchService.parseText(response).then((xml) => (new DOMParser()).parseFromString(xml, "text/xml"));
	}

	static makeAbortable(promise) {
		let hasAborted_ = false;

		const wrappedPromise = new Promise((resolve, reject) => {
			promise.then(
				(val) => hasAborted_ ? reject(new FetchAbortError(val)) : resolve(val),
				(error) => hasAborted_ ? reject(new FetchAbortError(error)) : reject(error)
			);
		});

		return {
			promise: wrappedPromise,
			abort() {
				hasAborted_ = true;
			},
		};
	}
}