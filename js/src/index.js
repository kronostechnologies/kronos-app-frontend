import jQueryExtend from './jQueryExtend';
import sprintf from './sprintf';
import Application from './Application';
import View from './View';
import EditView from './EditView';
import DateHelper from './DateHelper';
import removeDiacritics from './removeDiacritics';
import Router from './Router';
import BrowserDetect from './BrowserDetect';
import AsyncTask from './AsyncTask';
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
	AsyncTask,
	FetchService,
	FetchAbortError,
	FetchResponseDataError,
	externals: {
		jquery: 'jQuery',
		'raven-js': 'raven-js'
	}
};
