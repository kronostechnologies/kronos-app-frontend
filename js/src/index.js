import jQueryExtend from './jQueryExtend';
import sprintf from './sprintf';
import Application from './Application';
import View from './View';
import EditView from './EditView';
import DateHelper from './DateHelper';
import removeDiacritics from './removeDiacritics';
import Router from './Router';
import BrowserDetect from './BrowserDetect';
import FetchService, {FetchAbortError, FetchResponseDataError} from './FetchService';

module.exports = {
	Application,
	View,
	EditView,
	Router,
	sprintf,
	DateHelper,
	removeDiacritics,
	jQueryExtend,
	BrowserDetect,
	FetchService,
	FetchAbortError,
	FetchResponseDataError,
	externals: {
		jquery: 'jQuery',
		'raven-js': 'raven-js'
	}
};
