import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Application from '../Application';

chai.use(chaiAsPromised);
const expect = chai.expect;

const A_VIEW = 'Contact/View';
const A_VIEW_CMD = 'doSomeStuff';
const A_VIEW_PARAM_STRING = '&param=XXX';
const A_SESSKEY = 'ABCDEF';
const A_VIEW_CMD_URL = 'index.php?k=ABCDEF&view=Contact%2FView&cmd=doSomeStuff&param=XXX';

describe('Application', () => {

	let router = {};
	let browserDetect = {};

	let app;

	beforeEach(() => {
		app = new Application(router, {
			browserDetect
		});

		app.SESSION_KEY = A_SESSKEY;
	});

	describe('getViewUrl', () => {
		
		it('should return the view url', () => {
			let url = app.getViewUrl(A_VIEW, A_VIEW_CMD, A_VIEW_PARAM_STRING);
			expect(url).to.equal(A_VIEW_CMD_URL);
		});
	});


});