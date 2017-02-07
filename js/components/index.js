// @flow

window.BaseApplication = require('./BaseApplication.js');
window.View = require('./View.js');
window.EditView = require('./EditView.js');
import Autocompleter from './Autocompleter.js';
import sprintf from './sprintf.js';
import DateHelper from './DateHelper.js';
import jQueryExtend from './jQueryExtend.js';

declare var jQuery: {
	extend: (object: {}) => void;
};

// App initialization
const app = new BaseApplication();
app.lang = "fr";
app.autocompleter = Autocompleter;
app.sprintf = sprintf;
app.date = new DateHelper();

// jQuery extension
jQuery.extend({app});
jQuery.fn.extend(jQueryExtend);

// Date extension // TODO: remove if possible
Date.prototype.getDayOfYear = function () {
	const onejan = new Date(this.getFullYear(), 0, 1);
	return Math.ceil((this - onejan) / 86400000);
};

Date.prototype.getDaysInYear = function () {
	const firstdate = new Date(this.getFullYear(), 0, 1);
	const lastdate = new Date(this.getFullYear(), 11, 31);
	return Math.ceil((lastdate - firstdate) / 86400000 + 1);
};

// Date extension // TODO: remove if possible
String.prototype.htmlEntity = function () {
	return $.app.htmlEntity(this.toString());
};

String.prototype.nl2br = function () {
	return this.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br />$2');
};
