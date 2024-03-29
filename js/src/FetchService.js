// @flow
import ExtendableError from 'es6-error';
import encodeParam from 'jquery-param';
import type Application from './Application';
import { DOMParser } from '@xmldom/xmldom';

export type RequestBody = string | FormData | URLSearchParams | Blob;

export type FetchOptions = {
    method: string; // HTTP request method. Default: "GET"
    body: RequestBody; // HTTP request body
    headers: {} | Headers; // Default: {}
    credentials: 'omit' | 'same-origin' | 'include'; // Authentication credentials mode. Default: "omit"
};

export class FetchAbortError extends ExtendableError {
    constructor(response = {}, message = 'Fetch was aborted') {
        super(message);
        this.abort = true;
        this.response = response;
    }
}

export class FetchResponseDataError extends ExtendableError {
    constructor(data = {}, message = 'Response data status error') {
        super(message);
        this.data = data;
    }
}

const X_WWW_FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8';

export default class FetchService {
    app: Application;
    ongoingFetchPromises: Array<Promise>;

    constructor(app: Application) {
        this.app = app;
        this.ongoingFetchPromises = [];
    }

    fetch(url: string, options: FetchOptions): Promise {
        options = this._processFetchOptions(options);
        const abortable = FetchService.makeAbortable(fetch(url, options));
        this._registerFetchPromise(abortable);
        return abortable.promise
            .catch((error) => {
                if (FetchService.isTypeErrorError(error) && !FetchService.isFetchAbortError(error)) {
                    this.app.detectedNetworkError();
                    throw new FetchAbortError();
                }

                throw error;
            })
            .then((response) => this._checkStatus(response));
    }

    fetchJson(url: string, options: FetchOptions): Promise {
        return this.fetch(url, options).then(FetchService.parseJSON);
    }

    fetchXml(url: string, options: FetchOptions): Promise {
        return this.fetch(url, options).then(FetchService.parseXML);
    }

    post(url: string, body: string, options: FetchOptions) {
        options = FetchService.addPostOptions(body, options);
        return this.fetch(url, options);
    }

    postJson(url: string, body: string, options: FetchOptions): Promise {
        return this.post(url, body, options).then(FetchService.parseJSON);
    }

    _processFetchOptions(options: FetchOptions) {
        const defaultOptions = {
            credentials: 'same-origin',
        };

        options = { ...defaultOptions, ...options };
        options.headers = new Headers(options.headers || {});
        options.headers.set('X-Requested-With', 'XMLHttpRequest');

        const xsrfHeaders = new Headers(this.app.getXSRFHeaders());
        xsrfHeaders.forEach((v, h) => {
            options.headers.set(h, v);
        });

        if (URLSearchParams.polyfill && typeof options.body === 'object' && options.body instanceof URLSearchParams
            && !options.headers.has('Content-type')) {
            options.body = options.body.toString();
            options.headers.set('Content-type', X_WWW_FORM_URLENCODED);
        }

        return options;
    }

    abortOngoingFetchPromises() {
        let promise = this.ongoingFetchPromises.pop();
        while (typeof promise !== 'undefined') {
            promise.abort();
            promise = this.ongoingFetchPromises.pop();
        }
    }

    _registerFetchPromise(p) {
        this.ongoingFetchPromises.push(p);
    }

    _unregisterFetchPromise(p) {
        const index = this.ongoingFetchPromises.indexOf(p);
        if (index >= 0) {
            this.ongoingFetchPromises.splice(index, 1);
        }
    }

    _checkStatus(response) {
        if (response.statusText === 'abort') {
            throw new FetchAbortError(response);
        }

        if (response.status === 401) {
            return this._getViewFromResponse(response)
                .then((view) => {
                    this.app.detectedExpiredSession(view);
                })
                .then(() => {
                    throw new FetchAbortError(response);
                });
        }

        if (response.status === 0) {
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

        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }

    _getViewFromResponse(response) {
        return FetchService.parseJSON(response)
            .then((data) => {
                if (data.view) {
                    return data.view;
                }

                return false;
            })
            .catch(() => false);
    }

    static parseText(response) {
        return response.text();
    }

    static parseJSON(response) {
        return response.json();
    }

    static parseXML(response) {
        return FetchService.parseText(response).then((xml) => (new DOMParser()).parseFromString(xml, 'text/xml'));
    }

    /**
     * Handle standard application response data
     */
    static handleApplicationResponseData(data: {}): Promise<{}> {
        let status = data.status;

        // TODO: On devrait une fois pour toute faire le tour de l'app pour voir où c'est nécessaire
        if (typeof data.data !== 'undefined') {
            data = data.data;
            if (data.status) {
                status = data.status;
            }
        }

        if (status === 'error') {
            throw new FetchResponseDataError(data);
        }

        return data;
    }

    static makeAbortable(promise) {
        let hasAborted_ = false;

        const wrappedPromise = new Promise((resolve, reject) => {
            promise.then(
                (val) => (hasAborted_ ? reject(new FetchAbortError(val)) : resolve(val)),
                (error) => (hasAborted_ ? reject(new FetchAbortError(error)) : reject(error)),
            );
        });

        return {
            promise: wrappedPromise,
            abort() {
                hasAborted_ = true;
            },
        };
    }

    static addPostOptions(body, options = {}) {
        options.method = 'POST';
        options.headers = new Headers(options.headers || {});

        // String default to urlencode
        if (typeof body === 'string') {
            if (!options.headers.has('Content-type')) {
                options.headers.set('Content-type', X_WWW_FORM_URLENCODED);
            }
        } else if (typeof body === 'object') {
            if (!(body instanceof URLSearchParams || body instanceof FormData)) {
                body = new URLSearchParams(encodeParam(body));
            }
        }

        options.body = body;
        return options;
    }

    static isFetchAbortError(error) {
        return typeof error === 'object' && error instanceof FetchAbortError;
    }

    static isTypeErrorError(error) {
        return typeof error === 'object' && error instanceof TypeError;
    }
}
