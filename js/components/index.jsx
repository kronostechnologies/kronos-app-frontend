// @flow

window.BaseApplication = require('./BaseApplication.jsx');
window.View = require('./View.jsx');
window.EditView = require('./EditView.jsx');
import Autocompleter from './Autocompleter.jsx';
import sprintf from './sprintf.jsx';
import DateHelper from './DateHelper.jsx';
import jQueryExtend from './jQueryExtend.jsx';

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
