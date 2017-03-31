import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {Response} from 'node-fetch'
import fetchMock from 'fetch-mock';
import sinon from 'sinon';
import FetchService, {FetchAbortError} from '../FetchService'
import { DOMParser } from 'xmldom'

global.DOMParser = DOMParser;
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('FetchService', () => {

	const AN_URL = '/url/';
	const TEXT_RESPONSE_DATA = 'HELLO WORLD';
	const JSON_RESPONSE_DATA = {hello: 'world'};
	const XML_RESPONSE_DATA = '<xml>RESPONSE</xml>';
	const XSRF_HEADER = 'X-Kronos-XSRF';
	const XSRF_HEADER_VALUE = 'ASDFASFDSAFDSAFDFD';
	const XSRF_HEADERS = {'X-Kronos-XSRF' : XSRF_HEADER_VALUE};
	const A_POST_STRING = '&key=value';
	const A_VIEW_LOCATION = '#goto_my_view';

	
	const A_SESSKEY = 'ABCDEF';


	let AN_ERROR_RESPONSE;
	let AN_ABORT_RESPONSE;
	let A_EMPTY_RESPONSE;
	let AN_UNAUTHORIZED_RESPONSE;
	let AN_UNAUTHORIZED_RESPONSE_WITH_VIEW;
	const AN_EMPTY_BODY = '';

	const app = {
		getXSRFHeaders: () => XSRF_HEADERS,
		detectedExpiredSession: ()=> {},
		detectedNetworkError: ()=> {},
		SESSION_KEY: A_SESSKEY
	};

	let detectedNetworkErrorStub;
	let detectedExpiredSessionStub;

	const sandbox = sinon.sandbox.create();

	let fetchService;

	beforeEach(() => {
		AN_ERROR_RESPONSE = new Response(AN_EMPTY_BODY, {status: 500});
		AN_ABORT_RESPONSE = new Response(AN_EMPTY_BODY, {status: 0, statusText: 'abort'});
		A_EMPTY_RESPONSE = new Response(AN_EMPTY_BODY, {status: 0});
		A_EMPTY_RESPONSE.status=0; // Mock does not allow 0 status
		AN_UNAUTHORIZED_RESPONSE = new Response(AN_EMPTY_BODY, {status: 401});
		AN_UNAUTHORIZED_RESPONSE_WITH_VIEW = new Response(JSON.stringify({view: A_VIEW_LOCATION}), {status: 401});
		detectedNetworkErrorStub = sandbox.stub(app, 'detectedNetworkError');
		detectedExpiredSessionStub = sandbox.stub(app, 'detectedExpiredSession');
		fetchService = new FetchService(app);
	});

	afterEach(() => {
		sandbox.restore();
		fetchMock.restore();
	});
	
	describe('fetch', () => {

		describe('with valid response', () => {

			let response;
			beforeEach(() => {
				fetchMock.get(AN_URL, TEXT_RESPONSE_DATA);
				response = fetchService.fetch(AN_URL);
			});

			it('should call fetch with the url', () => {
				return response.then(() => expect(fetchMock.lastUrl()).to.equal(AN_URL));
			});

			it('should eventually return a Response object', () => {
				response = response.then(FetchService.parseText);
				return expect(response).to.eventually.equals(TEXT_RESPONSE_DATA);
			});

			it('should set the same-origin options to enable cookies', () => {
				return response.then(() =>
					expect(fetchMock.lastOptions()).to.have.property('credentials', 'same-origin')
				);
			});

			it('should add the application xsrf headers', () => {
				return response.then(() => Promise.all([
					expect(fetchMock.lastOptions()).to.have.property('headers'),
					expect(fetchMock.lastOptions().headers).to.have.property(XSRF_HEADER, XSRF_HEADER_VALUE)
				]));
			});

		});

		describe('with error(500) response', () => {

			let response;
			beforeEach(() => {
				fetchMock.get(AN_URL, AN_ERROR_RESPONSE);
				response = fetchService.fetch(AN_URL);
			});

			it('should be rejected with Error', () => {
				return expect(response).to.eventually.be.rejectedWith(Error);
			});

			it('error should contains response', () => {
				return response.catch((error) =>
					expect(error).to.have.property('response', AN_ERROR_RESPONSE)
				);
			});
		});

		describe('with abort response', () => {

			let response;
			beforeEach(() => {
				fetchMock.get(AN_URL, AN_ABORT_RESPONSE);
				response = fetchService.fetch(AN_URL);
			});

			it('should be rejected with FetchAbortError', () => {
				return expect(response).to.eventually.be.rejected
					.and.be.an.instanceOf(FetchAbortError);
			});

		});

		describe('with empty(0) response', () => {

			let response;
			beforeEach(() => {
				fetchMock.get(AN_URL, A_EMPTY_RESPONSE);
				response = fetchService.fetch(AN_URL);
			});

			it('should be rejected with FetchAbortError', () => {
				return expect(response).to.eventually.be.rejected
					.and.be.an.instanceOf(FetchAbortError);
			});

			it('should notifiy application with detectedNetworkError()', () => {
				return response.catch(()=> expect(detectedNetworkErrorStub.calledOnce).to.equal(true));
			});

		});

		describe('with unauthorized(401) response', () => {

			let response;
			beforeEach(() => {
				fetchMock.get(AN_URL, AN_UNAUTHORIZED_RESPONSE);
				response = fetchService.fetch(AN_URL);
			});

			it('should be rejected with FetchAbortError', () => {
				return expect(response).to.eventually.be.rejected
					.and.be.an.instanceOf(FetchAbortError);
			});

			it('should notifiy application with detectedExpiredSession()', () => {
				return response.catch(()=> expect(detectedExpiredSessionStub.calledOnce).to.equal(true));
			});

		});

		describe('with unauthorized(401) response with view location', () => {

			let response;
			beforeEach(() => {
				fetchMock.get(AN_URL, AN_UNAUTHORIZED_RESPONSE_WITH_VIEW);
				response = fetchService.fetch(AN_URL);
			});

			it('should be rejected with FetchAbortError', () => {
				return expect(response).to.eventually.be.rejected
					.and.be.an.instanceOf(FetchAbortError);
			});

			it('should notifiy application with detectedExpiredSession()', () => {
				return response.catch(()=> Promise.all([
					expect(detectedExpiredSessionStub.calledOnce).to.equal(true),
					sinon.assert.calledWith(detectedExpiredSessionStub, A_VIEW_LOCATION)
				]));
			});

		});


	});

	describe('fetchJson', () => {

		let response;
		beforeEach(() => {
			fetchMock.get(AN_URL, JSON_RESPONSE_DATA);
			response = fetchService.fetchJson(AN_URL);
		});

		it('should eventually return the response', () => {
			return expect(response).to.eventually.deep.equals(JSON_RESPONSE_DATA);
		});
	});

	describe('fetchXml', () => {

		let response;
		beforeEach(() => {
			fetchMock.get(AN_URL, XML_RESPONSE_DATA);
			response = fetchService.fetchXml(AN_URL);
		});

		it('should eventually return the response dom document', () => {

			return response.then((document) => Promise.all([
				expect(document.firstChild.tagName).to.equal('xml'),
				expect(document.firstChild.firstChild.nodeValue).to.equal('RESPONSE')
			]));
		});
	});

	describe('post', () => {

		let response;
		beforeEach(() => {
			fetchMock.post(AN_URL, TEXT_RESPONSE_DATA);
			response = fetchService.post(AN_URL, A_POST_STRING);
		});

		it('should call fetch with the url', () => {
			return response.then(() => expect(fetchMock.lastUrl()).to.equal(AN_URL));
		});

		it('should set the method options to POST', () => {
			return response.then(() =>
				expect(fetchMock.lastOptions()).to.have.property('method', 'POST')
			);
		});

		it('should set the body option', () => {
			return response.then(() =>
				expect(fetchMock.lastOptions()).to.have.property('body', A_POST_STRING)
			);
		});

		it('should eventually return a Response object', () => {
			response = response.then(FetchService.parseText);
			return expect(response).to.eventually.equals(TEXT_RESPONSE_DATA);
		});
	});

	describe('postJson', () => {

		let response;
		beforeEach(() => {
			fetchMock.post(AN_URL, JSON_RESPONSE_DATA);
			response = fetchService.postJson(AN_URL, A_POST_STRING);
		});

		it('should set the method options to POST', () => {
			return response.then(() =>
				expect(fetchMock.lastOptions()).to.have.property('method', 'POST')
			);
		});

		it('should set the body option', () => {
			return response.then(() =>
				expect(fetchMock.lastOptions()).to.have.property('body', A_POST_STRING)
			);
		});

		it('should eventually return the response', () => {
			return expect(response).to.eventually.deep.equals(JSON_RESPONSE_DATA);
		});
	});
	

});