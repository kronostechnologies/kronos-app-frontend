import chai from 'chai';
import sprintf from '../sprintf';

const expect = chai.expect;

describe('sprintf', function(){

	const STRING_WITHOUT_PLACEHOLDER = "AAAA";
	const STRING_WITH_STRING_PLACEHOLDER = "AAAA %s CCCC";
	const STRING_VALUE = "BBBB";
	const STRING_WITH_STRING_PLACEHOLDER_REPLACED = "AAAA BBBB CCCC";

	let result;

	it('undefined return null', function(){
		result = sprintf(undefined);
		expect(result).to.equals(null);
	});

	it('no arguments return null', function(){
		result = sprintf();
		expect(result).to.equals(null);
	});

	it('non-string first argument return null', function(){
		result = sprintf(1);
		expect(result).to.equals(null);
	});

	it('string without placeholder return string', function(){
		result = sprintf(STRING_WITHOUT_PLACEHOLDER);
		expect(result).to.equals(STRING_WITHOUT_PLACEHOLDER);
	});

	describe('string with %s placeholder', function(){

		it('without argument return string with placeholder', function(){
			result = sprintf(STRING_WITH_STRING_PLACEHOLDER);
			expect(result).to.equals(null);
		});

		it('with string argument return string with placeholder replaced by value', function(){
			result = sprintf(STRING_WITH_STRING_PLACEHOLDER, STRING_VALUE);
			expect(result).to.equals(STRING_WITH_STRING_PLACEHOLDER_REPLACED);
		});
	});

	describe('string placeholder with string argument', function(){
		it('return string value', function(){
			result = sprintf("%s", STRING_VALUE);
			expect(result).to.equals(STRING_VALUE);
		});
	});
});