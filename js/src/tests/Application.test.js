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
const FR_CA_LOCALE = 'fr-CA';
const EN_CA_LOCALE = 'en-CA';
const FR_CA_FORMATTED_NUMBER = '123 456 789,12';
const EN_CA_FORMATTED_NUMBER = '123,456,789.12';
const UNFORMATTED_NUMBER = 123456789.12;
const NUMBER_WITH_LOTS_OF_DECIMAL = 123.45678;

const NUMBER_TO_FORMAT = 3333333.3333;

describe('Application', () => {
    const router = {};
    const browserDetect = {};

    let app;

    beforeEach(() => {
        app = new Application(router, {
            browserDetect,
        });

        app.SESSION_KEY = A_SESSKEY;
        app.locale = 'en-US';
    });

    describe('getViewUrl', () => {
        it('should return the view url', () => {
            const url = app.getViewUrl(A_VIEW, A_VIEW_CMD, A_VIEW_PARAM_STRING);
            expect(url).to.equal(A_VIEW_CMD_URL);
        });
    });

    describe('formatNumber', () => {
        it('should return number with 2 decimals as default', () => {
            const number = app.formatNumber(NUMBER_TO_FORMAT);

            expect(number).to.equal('3,333,333.33');
        });

        it('should return number with no decimals', () => {
            const number = app.formatNumber(
                NUMBER_TO_FORMAT,
                { minimumFractionDigits: 0, maximumFractionDigits: 0 },
            );

            expect(number).to.equal('3,333,333');
        });

        it('should return number with 3 decimals', () => {
            const number = app.formatNumber(
                NUMBER_TO_FORMAT,
                { minimumFractionDigits: 0, maximumFractionDigits: 3 },
            );

            expect(number).to.equal('3,333,333.333');
        });
    });

    describe('normalizeNumberFormatOptions', () => {
        it('should return default values', () => {
            const options = app.normalizeNumberFormatOptions({});

            expect(options).to.deep.equal({
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            });
        });

        it('should map precision option to maximumFractionDigits', () => {
            const options = app.normalizeNumberFormatOptions({ precision: 5 });

            expect(options).to.deep.equal({
                precision: 5,
                minimumFractionDigits: 0,
                maximumFractionDigits: 5,
            });
        });

        it('should map maximumFractionDigits to minimumFractionDigits if facultative_decimals is false', () => {
            const options = app.normalizeNumberFormatOptions(
                { facultative_decimals: false },
            );

            expect(options).to.deep.equal({
                facultative_decimals: false,
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
        });

        it('should not map maximumFractionDigits to minimumFractionDigits if facultative_decimals is true', () => {
            const options = app.normalizeNumberFormatOptions(
                { facultative_decimals: true },
            );

            expect(options).to.deep.equal({
                facultative_decimals: true,
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            });
        });
    });

    describe('unformatNumber', () => {
        it('should unformat fr-CA numbers', () => {
            const unformattedNumber = app.unformatNumber(FR_CA_FORMATTED_NUMBER, FR_CA_LOCALE);
            expect(unformattedNumber).to.equal(UNFORMATTED_NUMBER);
        });

        it('should unformat en-CA numbers', () => {
            const unformattedNumber = app.unformatNumber(EN_CA_FORMATTED_NUMBER, EN_CA_LOCALE);
            expect(unformattedNumber).to.equal(UNFORMATTED_NUMBER);
        });

        it('should leave unformatted numbers as is', () => {
            const unformattedNumber = app.unformatNumber(UNFORMATTED_NUMBER, FR_CA_LOCALE);
            expect(unformattedNumber).to.equal(UNFORMATTED_NUMBER);
        });
    });

    describe('formatMoneyForInput', () => {
        it('should round to given precision', () => {
            const formattedNumber = app.formatMoneyForInput(NUMBER_WITH_LOTS_OF_DECIMAL, 2);
            expect(formattedNumber).to.equal(NUMBER_WITH_LOTS_OF_DECIMAL.toFixed(2));
        });
    });
});
