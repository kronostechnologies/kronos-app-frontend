import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import fetchMock from 'fetch-mock';
import { Response } from 'node-fetch';
import sinon from 'sinon';
import FetchService, { FetchAbortError } from '../FetchService';

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('FetchService', () => {
    const AN_URL = '/url/';
    const TEXT_RESPONSE_DATA = 'HELLO WORLD';
    const JSON_RESPONSE_DATA = { hello: 'world' };
    const XML_RESPONSE_DATA = '<xml>RESPONSE</xml>';
    const XSRF_HEADER = 'X-Kronos-XSRF';
    const XSRF_HEADER_VALUE = 'ASDFASFDSAFDSAFDFD';
    const XSRF_HEADERS = { 'X-Kronos-XSRF': XSRF_HEADER_VALUE };
    const CONTENT_TYPE_HEADER = 'Content-Type';
    const A_POST_STRING = '&key=value';
    const A_VIEW_LOCATION = '#goto_my_view';
    const A_SESSKEY = 'ABCDEF';
    const A_STRING_BODY = 'STRING_BODY';
    const AN_OBJECT_BODY = { field1: 'value1', field2: 'value2' };
    const URL_ENCODED_OBJECT_BODY = 'field1=value1&field2=value2';
    const AN_OBJECT_NESTED_BODY = { field1: { subfeld1: 'value1' }, field2: 'value2' };
    const URL_ENCODED_OBJECT_NESTED_BODY = 'field1%5Bsubfeld1%5D=value1&field2=value2';
    const AN_URLSearchParams_BODY = new URLSearchParams();
    const OPTIONS_WITH_URLSearchParams_BODY = { body: AN_URLSearchParams_BODY };
    const A_FormData_BODY = new FormData();
    const URL_ENCODED_CONTENT_TYPE = 'application/x-www-form-urlencoded;charset=UTF-8';
    const A_CUSTOM_CONTENT_TYPE = 'CustomContentType';

    let AN_ERROR_RESPONSE;
    let AN_ABORT_RESPONSE;
    let AN_UNAUTHORIZED_RESPONSE;
    let AN_UNAUTHORIZED_RESPONSE_WITH_VIEW;
    const AN_EMPTY_BODY = '';

    const app = {
        getXSRFHeaders: () => XSRF_HEADERS,
        detectedExpiredSession: () => {
        },
        detectedNetworkError: () => {
        },
        SESSION_KEY: A_SESSKEY,
    };

    let detectedNetworkErrorStub;
    let detectedExpiredSessionStub;

    const sandbox = sinon.createSandbox();

    let fetchService;

    beforeEach(() => {
        AN_ERROR_RESPONSE = new Response(AN_EMPTY_BODY, { status: 500 });
        AN_ABORT_RESPONSE = new Response(AN_EMPTY_BODY, { status: 0, statusText: 'abort' });
        AN_UNAUTHORIZED_RESPONSE = new Response(AN_EMPTY_BODY, { status: 401 });
        AN_UNAUTHORIZED_RESPONSE_WITH_VIEW = new Response(JSON.stringify({ view: A_VIEW_LOCATION }), { status: 401 });
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
                return response;
            });

            it('should call fetch with the url', () => {
                expect(fetchMock.lastUrl()).to.equal(AN_URL);
            });

            it('should eventually return a Response object', () => {
                response = response.then(FetchService.parseText);
                return expect(response).to.eventually.equals(TEXT_RESPONSE_DATA);
            });

            it('should set the same-origin options to enable cookies', () => {
                expect(fetchMock.lastOptions()).to.have.property('credentials', 'same-origin');
            });

            it('should add the application xsrf headers', () => {
                const options = fetchMock.lastOptions();
                const headers = options.headers;
                expect(options).to.have.property('headers');
                expect(headers.get(XSRF_HEADER)).to.equals(XSRF_HEADER_VALUE);
            });
        });

        describe('with error(500) response', () => {
            let response;
            beforeEach(() => {
                fetchMock.get(AN_URL, AN_ERROR_RESPONSE);
                response = fetchService.fetch(AN_URL);
            });

            it('should be rejected with Error', () => expect(response).to.eventually.be.rejectedWith(Error));

            it('error should contains response',
                () => response.catch((error) => expect(error).to.have.property('response', AN_ERROR_RESPONSE)));
        });

        describe('with abort response', () => {
            let response;
            beforeEach(() => {
                fetchMock.get(AN_URL, AN_ABORT_RESPONSE);
                response = fetchService.fetch(AN_URL);
            });

            it('should be rejected with FetchAbortError', () => expect(response).to.eventually.be.rejected
                .and.be.an.instanceOf(FetchAbortError));
        });

        describe('with unauthorized(401) response', () => {
            let response;
            beforeEach(() => {
                fetchMock.get(AN_URL, AN_UNAUTHORIZED_RESPONSE);
                response = fetchService.fetch(AN_URL);
            });

            it('should be rejected with FetchAbortError', () => expect(response).to.eventually.be.rejected
                .and.be.an.instanceOf(FetchAbortError));

            it('should notifiy application with detectedExpiredSession()',
                () => response.catch(() => expect(detectedExpiredSessionStub.calledOnce).to.equal(true)));
        });

        describe('with unauthorized(401) response with view location', () => {
            let response;
            beforeEach(() => {
                fetchMock.get(AN_URL, AN_UNAUTHORIZED_RESPONSE_WITH_VIEW);
                response = fetchService.fetch(AN_URL);
            });

            it('should be rejected with FetchAbortError', () => expect(response).to.eventually.be.rejected
                .and.be.an.instanceOf(FetchAbortError));

            it('should notifiy application with detectedExpiredSession()', () => response.catch(() => Promise.all([
                expect(detectedExpiredSessionStub.calledOnce).to.equal(true),
                sinon.assert.calledWith(detectedExpiredSessionStub, A_VIEW_LOCATION),
            ])));
        });

        describe('with polyfilled URLSearchParams body option', () => {
            let response;

            before(() => {
                URLSearchParams.polyfill = true;
            });

            beforeEach(() => {
                fetchMock.get(AN_URL, TEXT_RESPONSE_DATA);
                response = fetchService.fetch(AN_URL, OPTIONS_WITH_URLSearchParams_BODY);
                return response;
            });

            it('should add Content-Type:x-www-form-urlencoded header', () => {
                const options = fetchMock.lastOptions();
                const headers = options.headers;

                expect(options).to.have.property('headers');
                expect(headers.get(CONTENT_TYPE_HEADER)).to.equals(URL_ENCODED_CONTENT_TYPE);
            });
        });

        describe('with polyfilled URLSearchParams body option', () => {
            let response;

            before(() => {
                URLSearchParams.polyfill = false;
            });

            after(() => {
                URLSearchParams.polyfill = true;
            });

            beforeEach(() => {
                fetchMock.get(AN_URL, TEXT_RESPONSE_DATA);
                response = fetchService.fetch(AN_URL, OPTIONS_WITH_URLSearchParams_BODY);
                return response;
            });

            it('should not add Content-Type:x-www-form-urlencoded header', () => {
                const options = fetchMock.lastOptions();
                const headers = options.headers;

                expect(options).to.have.property('headers');
                expect(headers.get(CONTENT_TYPE_HEADER)).to.equals(null);
            });
        });

        describe('reject with TypeError', () => {
            let response;
            beforeEach(() => {
                fetchMock.get(AN_URL, Promise.reject(new TypeError('Failed to fetch')));
                response = fetchService.fetch(AN_URL);
            });

            it('should be rejected with FetchAbortError', () => expect(response).to.eventually.be.rejected
                .and.be.an.instanceOf(FetchAbortError));

            it('should notifiy application with detectedNetworkError()',
                () => response.catch(() => expect(detectedNetworkErrorStub.calledOnce).to.equal(true)));
        });

        describe('reject with FetchAbortError', () => {
            let response;
            let fetchAbortError;
            beforeEach(() => {
                fetchAbortError = new FetchAbortError();
                fetchMock.get(AN_URL, Promise.reject(fetchAbortError));
                response = fetchService.fetch(AN_URL);
            });

            it('should be rejected with the same FetchAbortError', () => expect(response).to.eventually.be.rejected
                .and.be.an.instanceOf(FetchAbortError)
                .and.be.equal(fetchAbortError));

            it('should NOT notifiy application with detectedNetworkError()',
                () => response.catch(() => expect(detectedNetworkErrorStub.notCalled).to.equal(true)));
        });
    });

    describe('fetchJson', () => {
        let response;
        beforeEach(() => {
            fetchMock.get(AN_URL, JSON_RESPONSE_DATA);
            response = fetchService.fetchJson(AN_URL);
        });

        it('should eventually return the response',
            () => expect(response).to.eventually.deep.equals(JSON_RESPONSE_DATA));
    });

    describe('fetchXml', () => {
        let response;
        beforeEach(() => {
            fetchMock.get(AN_URL, XML_RESPONSE_DATA);
            response = fetchService.fetchXml(AN_URL);
        });

        it('should eventually return the response dom document', () => response.then((document) => Promise.all([
            expect(document.firstChild.tagName).to.equal('xml'),
            expect(document.firstChild.firstChild.nodeValue).to.equal('RESPONSE'),
        ])));
    });

    describe('post', () => {
        let response;
        beforeEach(() => {
            fetchMock.post(AN_URL, TEXT_RESPONSE_DATA);
            response = fetchService.post(AN_URL, A_POST_STRING);
        });

        it('should call fetch with the url', () => response.then(() => expect(fetchMock.lastUrl()).to.equal(AN_URL)));

        it('should set the method options to POST',
            () => response.then(() => expect(fetchMock.lastOptions()).to.have.property('method', 'POST')));

        it('should set the body option',
            () => response.then(() => expect(fetchMock.lastOptions()).to.have.property('body', A_POST_STRING)));

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

        it('should set the method options to POST',
            () => response.then(() => expect(fetchMock.lastOptions()).to.have.property('method', 'POST')));

        it('should set the body option',
            () => response.then(() => expect(fetchMock.lastOptions()).to.have.property('body', A_POST_STRING)));

        it('should eventually return the response',
            () => expect(response).to.eventually.deep.equals(JSON_RESPONSE_DATA));
    });

    describe('addPostOptions', () => {
        let returnedOptions;

        const thenHeadersShouldContainsXFormUrlEncodedContentType = function () {
            it('headers contains x-www-form-urlencoded content type', () => {
                expect(returnedOptions.headers.get('Content-type')).to.equals(URL_ENCODED_CONTENT_TYPE);
            });
        };

        const thenBodyShouldBeInstanceOfURLSearchParams = function () {
            it('body should be an instance of URLSearchParams', () => {
                expect(returnedOptions.body).is.instanceOf(URLSearchParams);
            });
        };

        describe('with string body', () => {
            beforeEach(() => {
                returnedOptions = FetchService.addPostOptions(A_STRING_BODY);
            });

            thenHeadersShouldContainsXFormUrlEncodedContentType();

            it('body should be the given string', () => {
                expect(returnedOptions.body).to.equals(A_STRING_BODY);
            });
        });

        describe('with string body and custom content type', () => {
            beforeEach(() => {
                const options = {
                    headers: {
                        'Content-type': A_CUSTOM_CONTENT_TYPE,
                    },
                };
                returnedOptions = FetchService.addPostOptions(A_STRING_BODY, options);
            });

            it('Will keep actual Content-Type header', () => {
                expect(returnedOptions.headers.get('Content-type')).to.equals(A_CUSTOM_CONTENT_TYPE);
            });
        });

        describe('with a custom object body', () => {
            beforeEach(() => {
                returnedOptions = FetchService.addPostOptions(AN_OBJECT_BODY);
            });

            thenBodyShouldBeInstanceOfURLSearchParams();

            it('URLSearchParams should contain fields and values', () => {
                expect(returnedOptions.body.get('field1')).is.equals('value1');
                expect(returnedOptions.body.get('field2')).is.equals('value2');
            });

            it('URLSearchParams.toString() should contains fields and values urlencoded', () => {
                expect(returnedOptions.body.toString()).is.equals(URL_ENCODED_OBJECT_BODY);
            });
        });

        describe('with a custom nested object body', () => {
            beforeEach(() => {
                returnedOptions = FetchService.addPostOptions(AN_OBJECT_NESTED_BODY);
            });

            thenBodyShouldBeInstanceOfURLSearchParams();

            it('URLSearchParams.toString() should contains nested fields', () => {
                expect(returnedOptions.body.toString()).is.equals(URL_ENCODED_OBJECT_NESTED_BODY);
            });
        });

        describe('with a FormData body', () => {
            beforeEach(() => {
                returnedOptions = FetchService.addPostOptions(A_FormData_BODY);
            });

            it('body should be the given FormData', () => {
                expect(returnedOptions.body).is.equals(A_FormData_BODY);
            });
        });

        describe('with a URLSearchParams body', () => {
            beforeEach(() => {
                returnedOptions = FetchService.addPostOptions(AN_URLSearchParams_BODY);
            });

            it('body should be the given URLSearchParams', () => {
                expect(returnedOptions.body).is.equals(AN_URLSearchParams_BODY);
            });
        });
    });
});
