import chai from 'chai';
import sprintf from '../sprintf';

const expect = chai.expect;

describe('sprintf', () => {
    const STRING_WITHOUT_PLACEHOLDER = 'AAAA';
    const STRING_WITH_STRING_PLACEHOLDER = 'AAAA %s CCCC';
    const STRING_VALUE = 'BBBB';
    const STRING_WITH_STRING_PLACEHOLDER_REPLACED = 'AAAA BBBB CCCC';

    let result;

    it('undefined return null', () => {
        result = sprintf(undefined);
        expect(result).to.equals(null);
    });

    it('no arguments return null', () => {
        result = sprintf();
        expect(result).to.equals(null);
    });

    it('non-string first argument return null', () => {
        result = sprintf(1);
        expect(result).to.equals(null);
    });

    it('string without placeholder return string', () => {
        result = sprintf(STRING_WITHOUT_PLACEHOLDER);
        expect(result).to.equals(STRING_WITHOUT_PLACEHOLDER);
    });

    describe('string with %s placeholder', () => {
        it('without argument return string with placeholder', () => {
            result = sprintf(STRING_WITH_STRING_PLACEHOLDER);
            expect(result).to.equals(null);
        });

        it('with string argument return string with placeholder replaced by value', () => {
            result = sprintf(STRING_WITH_STRING_PLACEHOLDER, STRING_VALUE);
            expect(result).to.equals(STRING_WITH_STRING_PLACEHOLDER_REPLACED);
        });
    });

    describe('string placeholder with string argument', () => {
        it('return string value', () => {
            result = sprintf('%s', STRING_VALUE);
            expect(result).to.equals(STRING_VALUE);
        });
    });
});
