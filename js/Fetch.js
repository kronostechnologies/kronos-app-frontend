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

export default class Fetch {

	constructor(app: Application){
		this.app = app;
	}

	fetch(url: string, options: FetchOptions): Promise{
		options = this._processOptions(options);
		return fetch(url, options).then((response) => this._checkStatus(response));
	}

	fetchJson(url: string, options: FetchOptions): Promise{
		return this.fetch(url, options).then(Fetch.parseJSON);
	}

	fetchXml(url: string, options: FetchOptions): Promise{
		return this.fetch(url, options).then(Fetch.parseXML);
	}

	post(url: string, body: string, options: FetchOptions){
		let postOptions = {
			method: "POST",
			body
		};

		options = Object.assign({}, postOptions, options);
		return this.fetch(url, options);
	}

	postJson(url: string, body: string, options: FetchOptions): Promise{
		return this.post(url, body, options).then(Fetch.parseJSON);
	}


	getViewUrl(view, cmd, paramsString){
		if(paramsString.length > 0) {
			if(paramsString[0] != '&') {
				paramsString = '&'+paramsString;
			}
		}

		return 'index.php?k=' + encodeURIComponent(this.app.SESSION_KEY) + '&view=' + encodeURIComponent(view) + '&cmd=' + encodeURIComponent(cmd) + paramsString;
	}

	_processOptions(options: FetchOptions){
		let defaultOptions = {
			credentials: 'same-origin'
		};

		options = Object.assign({}, defaultOptions, options);
		options.headers = Object.assign({}, this.app.getXSRFHeaders(), options.headers);
		return options;
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

			throw new FetchAbortError(response);
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
		return Fetch.parseJSON(response)
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
		return Fetch.parseText(response).then((xml) => (new DOMParser()).parseFromString(xml, "text/xml"));
	}

}