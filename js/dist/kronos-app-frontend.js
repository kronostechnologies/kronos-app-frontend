var kronosAppFrontend =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.FetchResponseDataError = exports.FetchAbortError = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _es6Error = __webpack_require__(16);

var _es6Error2 = _interopRequireDefault(_es6Error);

var _jqueryParam = __webpack_require__(17);

var _jqueryParam2 = _interopRequireDefault(_jqueryParam);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FetchAbortError = exports.FetchAbortError = function (_ExtendableError) {
	_inherits(FetchAbortError, _ExtendableError);

	function FetchAbortError() {
		var response = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Fetch was aborted";

		_classCallCheck(this, FetchAbortError);

		var _this = _possibleConstructorReturn(this, (FetchAbortError.__proto__ || Object.getPrototypeOf(FetchAbortError)).call(this, message));

		_this.abort = true;
		_this.response = response;
		return _this;
	}

	return FetchAbortError;
}(_es6Error2.default);

var FetchResponseDataError = exports.FetchResponseDataError = function (_ExtendableError2) {
	_inherits(FetchResponseDataError, _ExtendableError2);

	function FetchResponseDataError() {
		var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Response data status error";

		_classCallCheck(this, FetchResponseDataError);

		var _this2 = _possibleConstructorReturn(this, (FetchResponseDataError.__proto__ || Object.getPrototypeOf(FetchResponseDataError)).call(this, message));

		_this2.data = data;
		return _this2;
	}

	return FetchResponseDataError;
}(_es6Error2.default);

var X_WWW_FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8';

var FetchService = function () {
	function FetchService(app) {
		_classCallCheck(this, FetchService);

		this.app = app;
		this.ongoingFetchPromises = [];
	}

	_createClass(FetchService, [{
		key: 'fetch',
		value: function (_fetch) {
			function fetch(_x5, _x6) {
				return _fetch.apply(this, arguments);
			}

			fetch.toString = function () {
				return _fetch.toString();
			};

			return fetch;
		}(function (url, options) {
			var _this3 = this;

			options = this._processFetchOptions(options);
			var abortable = FetchService.makeAbortable(fetch(url, options));
			this._registerFetchPromise(abortable);
			return abortable.promise.then(function (response) {
				return _this3._checkStatus(response);
			});
		})
	}, {
		key: 'fetchJson',
		value: function fetchJson(url, options) {
			return this.fetch(url, options).then(FetchService.parseJSON);
		}
	}, {
		key: 'fetchXml',
		value: function fetchXml(url, options) {
			return this.fetch(url, options).then(FetchService.parseXML);
		}
	}, {
		key: 'post',
		value: function post(url, body, options) {
			options = FetchService.addPostOptions(body, options);
			return this.fetch(url, options);
		}
	}, {
		key: 'postJson',
		value: function postJson(url, body, options) {
			return this.post(url, body, options).then(FetchService.parseJSON);
		}
	}, {
		key: '_processFetchOptions',
		value: function _processFetchOptions(options) {
			var defaultOptions = {
				credentials: 'same-origin'
			};

			options = Object.assign({}, defaultOptions, options);
			options.headers = new Headers(options.headers || {});
			options.headers.set('X-Requested-With', 'XMLHttpRequest');

			var xsrfHeaders = new Headers(this.app.getXSRFHeaders());
			xsrfHeaders.forEach(function (v, h) {
				options.headers.set(h, v);
			});

			if (URLSearchParams.polyfill && _typeof(options.body) === 'object' && options.body instanceof URLSearchParams && !options.headers.has('Content-type')) {
				options.body = options.body.toString();
				options.headers.set('Content-type', X_WWW_FORM_URLENCODED);
			}

			return options;
		}
	}, {
		key: 'abortOngoingFetchPromises',
		value: function abortOngoingFetchPromises() {
			var promise = this.ongoingFetchPromises.pop();
			while (typeof promise !== 'undefined') {
				promise.abort();
				promise = this.ongoingFetchPromises.pop();
			}
		}
	}, {
		key: '_registerFetchPromise',
		value: function _registerFetchPromise(p) {
			this.ongoingFetchPromises.push(p);
		}
	}, {
		key: '_unregisterFetchPromise',
		value: function _unregisterFetchPromise(p) {
			var index = this.ongoingFetchPromises.indexOf(p);
			if (index >= 0) {
				this.ongoingFetchPromises.splice(index, 1);
			}
		}
	}, {
		key: '_checkStatus',
		value: function _checkStatus(response) {
			var _this4 = this;

			if (response.statusText === 'abort') {
				throw new FetchAbortError(response);
			}

			if (response.status === 401) {
				return this._getViewFromResponse(response).then(function (view) {
					_this4.app.detectedExpiredSession(view);
				}).then(function () {
					throw new FetchAbortError(response);
				});
			}

			if (response.status === 0) {
				return this._getViewFromResponse(response).then(function (view) {
					_this4.app.detectedNetworkError(view);
				}).then(function () {
					throw new FetchAbortError(response);
				});
			}

			if (response.status >= 200 && response.status < 300) {
				return response;
			} else {
				var error = new Error(response.statusText);
				error.response = response;
				throw error;
			}
		}
	}, {
		key: '_getViewFromResponse',
		value: function _getViewFromResponse(response) {
			return FetchService.parseJSON(response).then(function (data) {
				if (data.view) {
					return data.view;
				}

				return false;
			}).catch(function () {
				return false;
			});
		}
	}], [{
		key: 'parseText',
		value: function parseText(response) {
			return response.text();
		}
	}, {
		key: 'parseJSON',
		value: function parseJSON(response) {
			return response.json();
		}
	}, {
		key: 'parseXML',
		value: function parseXML(response) {
			return FetchService.parseText(response).then(function (xml) {
				return new DOMParser().parseFromString(xml, "text/xml");
			});
		}

		/**
   * Handle standard application response data
   */

	}, {
		key: 'handleApplicationResponseData',
		value: function handleApplicationResponseData(data) {
			var status = data.status;

			// TODO: On devrait une fois pour toute faire le tour de l'app pour voir où c'est nécessaire
			if (typeof data.data !== 'undefined') {
				data = data.data;
				if (data.status) {
					status = data.status;
				}
			}

			if (status === 'error') {
				throw new FetchResponseDataError(data);
			}

			return data;
		}
	}, {
		key: 'makeAbortable',
		value: function makeAbortable(promise) {
			var hasAborted_ = false;

			var wrappedPromise = new Promise(function (resolve, reject) {
				promise.then(function (val) {
					return hasAborted_ ? reject(new FetchAbortError(val)) : resolve(val);
				}, function (error) {
					return hasAborted_ ? reject(new FetchAbortError(error)) : reject(error);
				});
			});

			return {
				promise: wrappedPromise,
				abort: function abort() {
					hasAborted_ = true;
				}
			};
		}
	}, {
		key: 'addPostOptions',
		value: function addPostOptions(body) {
			var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			options.method = 'POST';
			options.headers = new Headers(options.headers || {});

			// String default to urlencode
			if (typeof body === "string") {
				if (!options.headers.has('Content-type')) {
					options.headers.set('Content-type', X_WWW_FORM_URLENCODED);
				}
			} else if ((typeof body === 'undefined' ? 'undefined' : _typeof(body)) === 'object') {
				if (!(body instanceof URLSearchParams || body instanceof FormData)) {
					body = new URLSearchParams((0, _jqueryParam2.default)(body));
				}
			}

			options.body = body;
			return options;
		}
	}]);

	return FetchService;
}();

exports.default = FetchService;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = __webpack_require__(5);

var _events2 = _interopRequireDefault(_events);

var _ravenJs = __webpack_require__(21);

var _ravenJs2 = _interopRequireDefault(_ravenJs);

var _BrowserDetect = __webpack_require__(3);

var _BrowserDetect2 = _interopRequireDefault(_BrowserDetect);

var _FetchService = __webpack_require__(0);

var _FetchService2 = _interopRequireDefault(_FetchService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Application = function (_EventEmitter) {
	_inherits(Application, _EventEmitter);

	function Application(router) {
		var dependencies = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		_classCallCheck(this, Application);

		var _this = _possibleConstructorReturn(this, (Application.__proto__ || Object.getPrototypeOf(Application)).call(this));

		_this.router = router;

		// Debugging and error handling
		_this.debug = false;
		_this.sendErrors = false;
		_this.sendErrorsOnUnload = false;
		_this.silent = false;
		_this.trace_retirement = false;
		_this._errors = [];
		_this.ajaxQueryLoading = false;
		_this.pingInterval = false; // If this is defined in a child object; a timer will be fired every "pingInterval"ms with a ping command via get.
		_this.messages = false;

		// Application configurations
		_this.JS_PATH = '/';
		_this.IMG_PATH = '/';
		_this.VIRTUALPATH = '/';
		_this.SESSION_KEY = false;

		// Hash management
		_this.isOpeningView = false;
		_this.isOpeningViewCancelled = false;
		_this._is_observing_hash = false;
		_this._hash_changed_while_not_observing = true;
		_this.hash = false;
		_this._history = [];

		// User related informations
		_this.userName = '';
		_this.cpanelUserName = '';
		_this.userVersion = 0;
		_this.menus = false;
		_this.views = false;
		_this.default_view = '';
		_this.default_goal_death = '';
		_this.default_goal_disability = '';
		_this.fna_expiration = 365;

		// View
		_this.currentView = false;
		_this._view_cache = {};
		_this._loadingDelay = 3000;
		_this._loadingTimeout = 0;
		_this._view_objects = {};

		// Languages
		_this._messages = {};

		// Validations
		_this.emailRegex = /^[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~]+(?:\.[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/;
		_this.currencyRegex = /^[0-9.,\s]+$/;
		_this.percentageRegex = /^[0-9.,]+$/;

		// List of all ongoing ajax requests. Allow abort on view change.
		_this._ongoing_xhrs = [];

		_this.unmounts = [];

		_this.browser = dependencies.browserDetect || new _BrowserDetect2.default(navigator.userAgent);

		_this.fetchService = new _FetchService2.default(_this);

		_this.detectedExpiredSessionTimeout = false;
		_this.detectedExpiredSessionGoTo = false;
		_this.detectedNetworkErrorTimeout = false;
		_this.detectedNetworkErrorGoTo = false;

		_this.ravenEnabled = false;
		return _this;
	}

	/**
  * Initialize application
  */


	_createClass(Application, [{
		key: 'init',
		value: function init() {
			var self = this;

			$(document).ajaxStart(function () {
				self.ajaxQueryLoading = true;
			});
			$(document).ajaxStop(function () {
				self.ajaxQueryLoading = false;
			});

			// if the ping interval is defined, we had the ping query interval to the document.
			if (this.pingInterval) {
				// Ping interval
				setInterval(function () {
					if (!self.ajaxQueryLoading) {
						self.get('CPanel/View', 'ping', '', function () {
							console.debug('session is still alive');
						}, false, function () {
							console.debug('got an error while doing a ping ?');
						});
					}
				}, this.pingInterval);
			}

			// Error catching function
			window.onerror = function (description, page, line) {
				// Support jsmonitor.io
				if (typeof window.UEInfo !== 'undefined') {
					window.errors.push(arguments);
					window.UEInfo.run();
				}

				return self._onError(description, page, line);
			};

			// Detect native support for unhandledrejection
			var onunhandledrejection = this.onunhandledrejection.bind(this);
			if (typeof PromiseRejectionEvent !== 'undefined') {
				window.addEventListener("unhandledrejection", onunhandledrejection);
			} else {
				// This seems to work in firefox
				window.onunhandledrejection = onunhandledrejection;
			}

			// Page change, tab closing and window closing catching function
			window.onbeforeunload = function () {
				return self._beforeUnload();
			};

			if (!window.name.match(/^GUID-/)) {
				window.name = 'GUID-' + self.generateGUID();
			}

			$('#hook_confidentiality_policy,#hook_usage_policy').safeClick(function () {
				self.showMessage($(this).text(), self._('AVAILABLE_SOON'));
			});

			$.ajaxSetup({
				beforeSend: function beforeSend(xhr) {
					if (!this.crossDomain) {
						var headers = self.getXSRFHeaders();
						$.each(headers, function (key, value) {
							xhr.setRequestHeader(key, value);
						});
					}
				}
			});
		}
	}, {
		key: 'onunhandledrejection',
		value: function onunhandledrejection(event) {

			var error = event.reason;
			if (this.isFetchAbortError(error) || this.isErrorAlreadyHandled(error)) {
				// preventDefault() does not exists in firefox for some reason.
				if (typeof event.preventDefault === 'function') {
					event.preventDefault();
				}

				return;
			}

			var reason = event.reason;
			this.logError('Unhandled promise rejection', event.reason);
		}
	}, {
		key: 'logError',
		value: function logError(error_title, error) {
			console.warn(error_title + ':', error && (error.stack || error));
			if (this.ravenEnabled) {
				_ravenJs2.default.captureException(error);
			}
		}

		/**
   * Configure how the application is built and how it works
   */

	}, {
		key: 'configure',
		value: function configure(config) {
			// Error configs
			if (config.debug) {
				this.debug = true;
			}

			if (config.sendError) {
				this.sendErrors = true;
			}

			if (config.sendErrorsOnUnload) {
				this.sendErrorsOnUnload = true;
			}

			if (config.silent) {
				this.silent = true;
			}

			if (config.trace_retirement) {
				this.trace_retirement = true;
			}

			if (config.jqueryui && config.jqueryui.startingday) {
				this.startingDay = config.jqueryui.startingday;
			}

			// Application configurations
			this.JS_PATH = config.JS_PATH;
			this.IMG_PATH = config.IMG_PATH;
			this.VIRTUALPATH = config.VIRTUALPATH;
			this.SESSION_KEY = config.SESSION_KEY;
			this.replaced_session_key = false;

			this._xsrf_cookie_name = config.xsrf_cookie_name;
			this._xsrf_header_name = config.xsrf_header_name;

			this.checkStoredSession();

			if (!config.application_version) {
				throw this._throw('Applicaiton version not defined in configuration', true);
			}
			this._application_version = config.application_version;

			if (_typeof(config.user) !== 'object') {
				throw 'No user info in application configuration';
			}

			if (config && config.sentry) {
				_ravenJs2.default.config('https://' + config.sentry.key + '@app.getsentry.com/' + config.sentry.project, { release: config.application_version });

				_ravenJs2.default.setTagsContext({
					version: config.application_version
				});

				_ravenJs2.default.setUserContext({
					email: config.user.email,
					id: config.user.id,
					name: config.user.name
				});

				_ravenJs2.default.setExtraContext({
					transaction: config.kronos_transaction_id
				});

				_ravenJs2.default.install();

				this.ravenEnabled = true;
			}

			this._configure(config);
			this.setUserConfig(config.user);

			// Find default view
			for (var k in this.views) {
				var view = this.views[k];
				if (view.default === '1') {
					this.default_view = k;
				}
			}
		}
	}, {
		key: '_configure',
		value: function _configure() {}
	}, {
		key: 'getApplicationVersion',
		value: function getApplicationVersion() {
			return this._application_version;
		}

		/**
   * Get current XSRF cookie value
   * @returns {*}
   */

	}, {
		key: 'getXSRFToken',
		value: function getXSRFToken() {
			if (this._xsrf_cookie_name) {
				var cookie_value = $.cookie(this._xsrf_cookie_name);
				if (typeof cookie_value != 'undefined') {
					return cookie_value;
				} else {
					return false;
				}
			} else {
				return false;
			}
		}

		/**
   * Get XSRF headers to append to ajax requests
   * @returns {{}}
   */

	}, {
		key: 'getXSRFHeaders',
		value: function getXSRFHeaders() {
			var self = this;
			var headers = {};
			var xsrf_token = self.getXSRFToken();
			if (self._xsrf_header_name) {
				headers[self._xsrf_header_name] = xsrf_token;
			}
			return headers;
		}

		/**
   * Get XSRF data to append to a post request (ex: in ajaxUploader)
   * @returns {{}}
   */

	}, {
		key: 'getXSRFData',
		value: function getXSRFData() {
			var self = this;
			var data = {};
			var xsrf_token = self.getXSRFToken();
			if (self._xsrf_cookie_name) {
				data[self._xsrf_cookie_name] = xsrf_token;
			}
			return data;
		}
	}, {
		key: 'setUserConfig',
		value: function setUserConfig(user_config) {
			var t = this;

			t.userVersion = user_config.version;
			t.userName = user_config.name;
			t.userEmail = user_config.email;
			t.userType = user_config.type;
			t.menus = user_config.menus;
			t.views = user_config.views;
			t.userIsAssumed = user_config['assumed'];
			t.userIsCpanelAssumed = user_config['cpanel_assumed'];
			t.cpanelUserName = user_config['cpanel_user_name'];

			t.setLocale(user_config.locale);
			t._setUserConfig(user_config);

			this._buildHeader();
		}
	}, {
		key: '_setUserConfig',
		value: function _setUserConfig() {}
	}, {
		key: 'setLocale',
		value: function setLocale(locale) {
			if (this.locale == locale) {
				return;
			}

			this.locale = locale;
			if (locale.indexOf('fr') != -1) {
				this.lang = 'fr';
			} else {
				this.lang = 'en';
			}

			moment.locale(this.lang);

			//Load language file
			if (!this._messages[this.lang]) {
				$.ajax({
					url: this.JS_PATH + this.lang + '.js',
					data: false,
					dataType: 'script',
					async: false,
					cache: true
				});
			}

			//Update datepicker locale
			var defaults = $.extend($.datepicker.regional[this.lang], { dateFormat: 'yy-mm-dd', changeMonth: true, changeYear: true, gotoCurrent: true, yearRange: '-90:+10' });
			if (this.startingDay) {
				defaults['firstDay'] = this.startingDay;
			}
			$.datepicker.setDefaults(defaults);

			/*
    * Triggering every element seems expensive,
    * we could add a class to every element that will need
    * to be updated ?
    */
			$(".localeBound").trigger('setLocaleEvent');

			this._setLocale(locale);
		}

		/**
   * Get a translation
   */

	}, {
		key: '_',
		value: function _(message_id) {

			if (!this._messages[this.lang]) {
				return message_id;
			}

			var msg = this._messages[this.lang][message_id];

			return msg ? msg : message_id;
		}

		/**
   * Start building the application
   */

	}, {
		key: 'start',
		value: function start() {
			this.hook();

			var self = this;
			window.onhashchange = function () {
				if (self._is_observing_hash) {
					self._checkHash();
				} else {
					self._hash_changed_while_not_observing = true;
				}
			};

			this._observe();
		}
	}, {
		key: 'hook',
		value: function hook() {
			var t = this;

			if (typeof this._hook == 'function') {
				this._hook();
			}

			//Init Zendesk
			$('.hook_question_comments').click(function () {
				t.showQuestionCommentDialog();
			});
		}
	}, {
		key: 'loadMessages',
		value: function loadMessages(lang, messages) {
			this._messages[lang] = messages;
		}

		/**
   * This function is triggered just before the browser change or close the page.
   */

	}, {
		key: '_beforeUnload',
		value: function _beforeUnload(e) {
			if (this.sendErrors || this.sendErrorsOnUnload) {
				this._sendErrors();
			}

			this.abortOngoingXHR();

			return; // Simply quit page. Return false or true for standard confirmation page, or return a question to the user for a custom dialog. IE does not support null. Simply return nothing.
		}

		/**
   * Create a json error from given error message.
   * Added to support sending fatal errors.
   */

	}, {
		key: '_throw',
		value: function _throw(message, fatal) {
			return $.toJSON({ message: message, type: fatal ? 'fatal' : 'error' });
		}

		/**
   * Error handling function
   *
   * @param description Error description
   * @param page JavaScript file in which the error occured
   * @param line Line number where the error occured
   */

	}, {
		key: '_onError',
		value: function _onError(description, page, line) {
			if (this.debug) {
				console.debug(description + ' (' + page + ':' + line + ')');
			}

			try {
				var error = $.secureEvalJSON(description.replace('uncaught exception: ', ''));

				if (error.type == 'fatal') {
					this._showFatalError(error.message);
				}

				description = error.message;
				error = null;
			} catch (e) {
				// That was not JSON ... but we don't care
			}

			if (this.sendErrors) {
				this._errors.push({ description: description, page: page, line: line });

				if (this._errors.length > 10) {
					this._sendErrors();
				}
			}

			return this.silent;
		}

		/**
   * Send catched errors to the server
   *
   * TODO : Offline mode
   */

	}, {
		key: '_sendErrors',
		value: function _sendErrors() {
			var t = this;
			if (this._errors.length > 0) {
				var errors = [];
				for (var i = 0; i < this._errors.length; i++) {
					for (var k in this._errors[i]) {
						errors.push('error[' + i + '][' + k + ']=' + encodeURIComponent(this._errors[i][k]));
					}
				}

				$.ajax({ async: false, url: 'index.php?k=' + t.SESSION_KEY + '&action=error&' + errors.join('&') }); // TODO: Real error receiving method

				delete this._errors;
				this._errors = [];
			}
		}
	}, {
		key: '_showNavigationError',
		value: function _showNavigationError() {
			var self = this;
			self.showModalDialog('<h2>' + self._('NAVIGATION_ERROR') + '</h2>\
										<p>\
											<strong>' + self._('INVALID_PAGE_REQUEST') + '</strong>\
											<br />\
										</p>\
										<p class="submit">\
											<input type="submit" id="hook_create_error_close" value="' + self._('OK') + '" />\
										</p>', 'fast', function () {
				$('#hook_create_error_close').safeClick(function () {
					self.hideModalDialog('fast');

					// stop looking at the location for now ...
					self._stopObservation();

					// ... revert page change ...
					self.hash = self.stepBack();
					self.addHistory(self.hash);

					// ... and then start to observe again
					self._observe();
				});
			});
		}

		/**
   *	Show a modal dialog telling the user something bad happened. He can try again or go back to where he was before.
   */

	}, {
		key: '_showFatalError',
		value: function _showFatalError(error) {
			var self = this;

			this.showModalDialog('<h2>' + self._('ERROR') + '</h2>\
						<p>\
							<strong>' + self._('FATAL_ERROR_OCCURED') + '</strong>\
							<br />\
					init	</p>\
						<p class="submit">\
							' + self._('FATAL_ERROR__YOU_CAN') + ' <a id="fatal-error-reload" href="javascript:void(0);">' + self._('FATAL_ERROR__RELOAD_PAGE') + '</a> ' + self._('OR') + ' <a id="fatal-error-stepback" href="javascript:void(0);">' + self._('FATAL_ERROR__GO_BACK') + '</a>\
						</p>', 'fast', function () {

				$('#fatal-error-reload').click(function () {
					self._hideFatalError('reload');
				});
				$('#fatal-error-stepback').click(function () {
					self._hideFatalError('stepback');
				});
				self._errors.push({ description: error, page: 'Application.js', line: 0 });
			});
		}

		/**
   *	Close the modal dialog then reload or back, depending on what the use chose.
   */

	}, {
		key: '_hideFatalError',
		value: function _hideFatalError(action) {
			var self = this;
			this.hideModalDialog('fast', function () {
				self.hideOverlay();

				$('#fatal_error').remove();

				if (action == 'reload') {
					location.reload();
				} else if (action == 'stepback') {
					self.forceStepBack();
				}
			});
		}

		/**
   * Start the hash observation loop
   */

	}, {
		key: '_observe',
		value: function _observe() {
			if (this.debug) {
				console.debug('Observing hash from now on');
			}

			this._is_observing_hash = true;

			if (this._hash_changed_while_not_observing) {
				this._hash_changed_while_not_observing = false;

				this._checkHash();
			}
		}

		/**
   * Stop the hash observation loop
   */

	}, {
		key: '_stopObservation',
		value: function _stopObservation() {
			if (this.debug) {
				console.debug('Stopped hash observation');
			}

			this._is_observing_hash = false;
		}

		/**
   * Get location hash and check if it changed
   */

	}, {
		key: '_checkHash',
		value: function _checkHash() {
			var _this2 = this;

			if (this.hash === location.hash) {
				return;
			} else if (this.isOpeningView) {
				this.isOpeningViewCancelled = true;
				return false;
			}

			//Store the new hash before the loop starts again
			if (this.debug) {
				console.debug('Hash changed');
			}

			this.hash = location.hash;

			// Get the requested view
			if (!this.hash || this.hash === '#') {
				this.goTo(this.default_view);
				return false;
			}

			var splits = this.hash.substring(1).split('&');
			var view = splits.shift();

			var pos = view.indexOf('/');
			if (pos > 0) {
				var next = view.indexOf('/', pos + 1);
				if (next > 0) {
					pos = next;

					view = view.substring(0, pos);
				}
			}

			splits = null;

			if (view === '' || view === null) {
				view = this.default_view;
			}

			var initialState = {
				fetch: true,
				cancel: false
			};

			var fetchViewPromise = Promise.resolve(initialState);
			if (this.currentView) {
				fetchViewPromise = fetchViewPromise.then(function (state) {
					return _this2._getViewObject(_this2.currentView).then(function (viewObject) {

						// Are we staying in the same view ?
						// Did the the view handled the hash change ?
						if (view === _this2.currentView && viewObject.onHashChange(_this2.hash)) {
							state.fetch = false;
							return state;
						}

						// If we where in a view ask to view to close;
						if (_this2.currentView) {

							return viewObject.close().then(function (closeResponse) {
								if (closeResponse.cancel) {
									// Cannot close current view abort view change
									if (_this2.debug) {
										console.debug('View coulnd\'t close');
									}

									// Temporarily stop the hash observation loop so we can ...
									_this2._stopObservation();
									// ... keep where the user wanted to go and stay where we were ...
									_this2.hash = _this2.stepBack();
									// ... and then start to observe again
									_this2._observe();

									state.cancel = true;
									return state;
								}

								// Close current view
								_this2.emit('viewClose', viewObject);
								return state;
							});
						}

						return state;
					}).catch(function () {
						return state;
					}); // Forward state
				});
			}

			fetchViewPromise.then(function (state) {
				if (state.cancel) {
					return false;
				}

				// We don't keep page reloads in history
				if (_this2._force_clear) {
					_this2.addHistory(_this2.hash);
					_this2._force_clear = false;
				} else if (!_this2._detectStepBack(_this2.hash)) {
					_this2.addHistory(_this2.hash);
				}

				if (state.fetch) {
					_this2.isOpeningView = true;
					_this2.isOpeningViewCancelled = false;

					// Just to be sure we leave nothing behind
					_this2.hideModalDialogNow();

					// Highlight the right menu
					_this2._selectViewMenu(view);

					// It's time to change the view
					_this2._fetchView(view);
				}
			});
		}
	}, {
		key: 'goTo',
		value: function goTo(hash, force_clear) {
			if (this.debug) {
				console.debug('Go To "' + hash + '"');
			}

			if (force_clear) {
				this._force_clear = true;
			}

			location.hash = hash;
		}
	}, {
		key: 'goToNoTriggerHashChange',
		value: function goToNoTriggerHashChange(hash) {
			this._stopObservation();
			this.goTo(hash);
			this._hash_changed_while_not_observing = false;
			this.hash = hash;
			this._observe();
		}
	}, {
		key: 'navigateBackTo',
		value: function navigateBackTo(hash) {
			this._history.pop();
			this.replace(hash);
		}
	}, {
		key: 'replace',
		value: function replace(hash) {
			if (!hash) {
				hash = '';
			}

			if (hash.charAt(0) != '#') {
				hash = '#' + hash;
			}

			if (this.isOpera()) {
				location.replace(location.protocol + '//' + location.hostname + location.pathname + hash);
				return;
			}
			location.replace(hash);
		}
	}, {
		key: 'forceGoTo',
		value: function forceGoTo(hash, force_clear) {
			this._stopObservation();

			if (this.debug) {
				console.debug('Force Go To "' + hash + '"');
			}

			if (force_clear) {
				this._force_clear = true;
			}

			location.hash = hash;
			location.reload();
		}

		/**
   * Utility function to parse the location hash.
   * Hash should look like this :
   * <view>&<param>=<value>&<param2>=<value2>&...
   * values must be urlencoded
   */

	}, {
		key: 'parseHash',
		value: function parseHash(hash) {
			var infos = {
				view: '',
				params: {}
			};

			var splits = hash.split('&');
			infos.view = splits.shift().substr(1);
			for (var i = 0; i < splits.length; i++) {
				var info = splits[i].split('=');
				var param = info.shift();

				infos.params[param] = decodeURIComponent(info.join('=')); // Just in case there was a '=' in the value
			}

			return infos;
		}
	}, {
		key: 'reload',
		value: function reload(hiddenParams, force) {
			if (force) {
				this._setViewCache(this.currentView, false, false);
			}
			this._fetchView(this.currentView, hiddenParams);
		}
	}, {
		key: '_onFetchView',
		value: function _onFetchView(viewObject) {}
	}, {
		key: '_onLoadView',
		value: function _onLoadView(viewObject, data, hiddenParams) {}

		/**
   * Fetch view html and model from server
   */

	}, {
		key: '_fetchView',
		value: function _fetchView(view, hiddenParams) {
			var _this3 = this;

			this.currentView = view;

			var self = this;

			this._getViewObject(this.currentView).then(function (viewObject) {

				self._hideLoading();
				self.abortOngoingXHR();

				var cached = _this3._isViewCached(view);
				if (cached && _this3.debug) {
					console.debug('View "' + view + '" is in cache (' + _this3.lang + ')');
				}

				self._onFetchView(viewObject);

				// Ask the requested view to transmute hash to query parameters
				var params = viewObject.parseHash(_this3.hash);

				for (var k in params.params) {
					params[k] = params.params[k];
				}
				delete params.params;

				if (hiddenParams && $.isPlainObject(hiddenParams)) {
					for (k in hiddenParams) {
						params[k] = hiddenParams[k];
					}
				}

				params.k = self.SESSION_KEY;
				params.view = self.currentView;
				params.cmd = 'view';
				params.cached = cached;
				params.version = _this3.getApplicationVersion();
				params.uv = self.userVersion;

				if (_this3.replaced_session_key) {
					params.rk = _this3.replaced_session_key;
					_this3.replaced_session_key = false;
				}

				var param_string = $.param(params);

				$.ajax({
					url: 'index.php?' + param_string,
					type: 'POST',
					data: {
						context: self.getContext()
					},
					dataType: 'json',
					headers: self.getXSRFHeaders(),
					success: function success(response) {
						self._hideLoading();

						if (self.isOpeningViewCancelled) {
							self.isOpeningView = false;
							setTimeout(function () {
								return self._checkHash();
							}, 10);
							return false;
						}

						/* Manage redirect responses from view calls. */
						if (response.redirect) {
							self.isOpeningView = false;
							self.goTo(response.view);
							return false;
						}

						if (response.status == 'error') {
							var info = response.data;
							if (info.code == 600) {
								// VIEW_CMD_ERROR;
								// Hopefuly this won't happen
								self._showFatalError('An error occured server side while fetching view data "' + view + '" (600)');
							} else if (info.code == 601 || info.code == 602) {
								// VIEW_ACL_ERROR or MODEL_ACL_ERROR
								self._showNavigationError();
							} else {
								// Unknown error
								self._showFatalError('An unknown error was sent from server while fetching view data "' + view + '" (' + info.error + ')');
							}

							return false;
						}

						self._onLoadView(viewObject, response.data, hiddenParams);
						self._loadView(response.data, hiddenParams);
					},
					error: function (_error) {
						function error(_x4, _x5, _x6) {
							return _error.apply(this, arguments);
						}

						error.toString = function () {
							return _error.toString();
						};

						return error;
					}(function (jqXHR, status, error) {
						var _this4 = this;

						self.isOpeningView = false;
						self._hideLoading();

						self.validateXHR(jqXHR).then(function (isValidXHR) {
							if (!isValidXHR) {
								return;
							}
							if (_this4.debug) {
								console.debug('AJAX query error');
								console.debug(status);
								console.debug(error);
							}

							self._showFatalError('An error occured while fetching view data "' + view + '" (' + status + ')');
						});
					})
				});

				// If we don't receive an awnser after 1.5 second, a loading overlay will appear
				_this3._loadingTimeout = setTimeout(function () {
					self._showLoading();
				}, _this3._loadingDelay);
			});
		}

		/**
   *	Standard entry point for view data (html and model).
   */

	}, {
		key: '_loadView',
		value: function _loadView(data, hiddenParams) {
			var _this5 = this;

			var self = this;

			if (data.data) {
				//backward compatibility.
				data = data.data;
			}

			var fullParams = void 0;
			if (data.params) {
				fullParams = $.extend({}, data.params, hiddenParams);
			} else {
				fullParams = $.extend({}, hiddenParams);
			}

			if (data.user && self.userVersion != data.user.version) {
				self.clearViewCache();
				self.setUserConfig(data.user);
			}

			// Application version changed server side, we have to reload the application.
			if (this.getApplicationVersion() != data.version) {
				location.reload();
			}

			return this._getViewObject(this.currentView).then(function (viewObject) {
				return self._initViewObject(viewObject, data).then(function () {
					return Promise.resolve(viewObject.load(fullParams));
				}).then(function () {
					return Promise.resolve(self._loadContentData(viewObject, data));
				}).then(function () {
					return Promise.resolve(self._hookView(viewObject));
				}).then(function () {
					return Promise.resolve(self._loadModel(viewObject, data.model));
				}).then(function () {
					return Promise.resolve(self._checkAnchor(viewObject));
				}).then(function () {
					return Promise.resolve(self._checkOnLoadScroll());
				}).then(function () {
					return Promise.resolve(self.isOpeningView = false);
				});
			}).catch(function (error) {
				_this5.isOpeningView = false;
				_this5._stopObservation();
				_this5._showFatalError(error);
				return Promise.reject(error);
			});
		}
	}, {
		key: '_initViewObject',
		value: function _initViewObject(viewObject, data) {
			window.view = viewObject;
			viewObject._validateable = data.validateable || false;
			return Promise.resolve(viewObject.init(this.hash));
		}
	}, {
		key: '_loadContentData',
		value: function _loadContentData(viewObject, data) {
			var _this6 = this;

			//* BASED on kronos-lib/Kronos/Common/View.php -> function getContent *//
			if (data.html) {
				return Promise.resolve(this._loadContent(viewObject, data.html)).then(function () {
					// We store the html and json we received
					_this6._setViewCache(_this6.currentView, data.html, false);
				});
			} else if (this._isViewCached(this.currentView)) {
				// Get no html/params but the sent version is the same as the one we have, we can use it.
				return Promise.resolve(this._loadContent(viewObject, this._getViewCachedHTML(this.currentView)));
			} else {
				return Promise.reject(new Error('View not cached and not recieved from html...'));
			}
		}

		/**
   *	Ask the view to draw the content if it can or we do it.
   *
   *	NOTE : If you want to support view redrawing, implement 'draw'.
   */

	}, {
		key: '_loadContent',
		value: function _loadContent(viewObject, html) {

			if (typeof viewObject !== 'undefined' && typeof viewObject.draw == 'function') {
				viewObject.draw(html);
			} else {
				$('#content').html(html);
			}

			scrollTo(0, 0);
		}

		/**
   * Hook the view object to the current content
   */

	}, {
		key: '_hookView',
		value: function _hookView(viewObject) {
			var self = this;
			if (typeof viewObject._preHook == 'function') {
				viewObject._preHook();
			}

			return Promise.resolve(viewObject.hook(this.hash)).then(function () {
				return self._onViewHook(viewObject);
			});
		}
	}, {
		key: '_onViewHook',
		value: function _onViewHook(viewObject) {}
	}, {
		key: '_loadModel',
		value: function _loadModel(viewObject, model) {
			model = this.recursiveCleanFloats(model);

			if (this.debug) {
				console.debug(model);
			}

			this.emit('preInject');
			viewObject.inject(model);
			this.emit('postInject');
			if (typeof viewObject._postInject == 'function') {
				viewObject._postInject();
			}

			this._onViewInject(viewObject, model);

			if ($('.page-title').length) {
				window.document.title = $('.page-title').text();
			}
		}
	}, {
		key: '_onViewInject',
		value: function _onViewInject(viewObject, model) {}
	}, {
		key: '_checkAnchor',
		value: function _checkAnchor(viewObject) {
			var params = viewObject.parseHash(this.hash);
			if (params.params['anchor']) {
				var anchor_name = params.params.anchor;
				var $element = $('[anchor=' + anchor_name + ']');
				if ($element.length === 0) {
					if (this.debug) {
						console.warn('GET parameter "anchor" found but there is no element associated with it!');
					}
					return false;
				}
				if (typeof viewObject.onScrollToAnchor === 'function') {
					viewObject.onScrollToAnchor($element, anchor_name);
				} else {
					if (this.debug) {
						console.warn('GET parameter "anchor" found but there is no `onScrollToAnchor` function on your view!');
					}
				}
			}
		}
	}, {
		key: '_checkOnLoadScroll',
		value: function _checkOnLoadScroll() {
			var scroll = this.getOnLoadScroll();
			if (scroll && this.isNumber(scroll.X) && this.isNumber(scroll.Y)) {
				window.scrollTo(scroll.X, scroll.Y);
				this.clearOnLoadScroll();
			}
		}
	}, {
		key: 'setOnLoadScroll',
		value: function setOnLoadScroll(X, Y) {
			this._onLoadScroll = {
				X: this.parseInt(X),
				Y: this.parseInt(Y)
			};
		}
	}, {
		key: 'getOnLoadScroll',
		value: function getOnLoadScroll() {
			return this._onLoadScroll;
		}
	}, {
		key: 'clearOnLoadScroll',
		value: function clearOnLoadScroll() {
			delete this._onLoadScroll;
		}
	}, {
		key: 'recursiveCleanFloats',
		value: function recursiveCleanFloats(model) {
			var self = this;
			if ($.isArray(model)) {
				for (var i = 0; i < model.length; i++) {
					model[i] = self.recursiveCleanFloats(model[i]);
				}
			} else if ((typeof model === 'undefined' ? 'undefined' : _typeof(model)) == 'object') {
				for (var k in model) {
					model[k] = self.recursiveCleanFloats(model[k]);
				}
			} else {
				//Try not to catch fields not expected to be float like SIN, Date and addresses.
				if (typeof model == "string" && model.match(/^\d+\.\d+$/i)) {
					var p = parseFloat(model);
					if (!isNaN(p)) {
						model = p;
					}
				}
			}

			return model;
		}

		/**
   * Clear all cached view html and params
   */

	}, {
		key: 'clearViewCache',
		value: function clearViewCache() {
			if (this.debug) {
				console.log('Clearing view cache');
			}

			delete this._view_cache;
			this._view_cache = [];
		}

		/**
   * Get the currently store view html version.
   */

	}, {
		key: '_isViewCached',
		value: function _isViewCached(view) {
			// No HTML no cache.
			if (this._view_cache[view] && this._view_cache[view].html) {
				return true;
			}

			return false;
		}

		/**
   * Get the currently sotre view html
   */

	}, {
		key: '_getViewCachedHTML',
		value: function _getViewCachedHTML(view) {
			if (this._view_cache[view] && this._view_cache[view].html) {
				return this._view_cache[view].html;
			} else {
				throw this._throw('View was supposed to be cached...', true);
			}
		}

		/**
   * Get the currently sotre view params
   * Does not throw and error if no params are found - they're optionnal
   */

	}, {
		key: '_getViewCachedParams',
		value: function _getViewCachedParams(view) {
			return this._view_cache[view].params;
		}

		/**
   * Store given view html, json params and its version number.
   */

	}, {
		key: '_setViewCache',
		value: function _setViewCache(view, html, params) {
			delete this._view_cache[view];

			this._view_cache[view] = {
				html: html,
				params: params ? params : null
			};

			if (this.debug) {
				console.debug('Cached version of view "' + view + '"');
			}
		}

		/**
   * Show a loading animation and put a cover over the whole page.
   */

	}, {
		key: '_showLoading',
		value: function _showLoading() {
			if (this._loadingTimeout) {
				clearTimeout(this._loadingTimeout);
				this._loadingTimeout = 0;

				if (this.debug) {
					console.debug('Show loading overlay');
				}

				if ($('#loading-overlay').length > 0) {
					// Loading is already shown
					return;
				}

				// Whole page cover
				this.showOverlay();

				// Add required html
				$('body').append('<img id="loading-overlay-image" src="' + this.IMG_PATH + 'ajax-loader-big.gif" /><div id="loading-overlay"></div>');

				// Calculate the content height (gray zone)
				var main_height = $('#main').height() + parseInt($('#main').css('padding-top'), 10) + parseInt($('#main').css('padding-bottom'), 10);

				$('#loading-overlay-image').css({
					top: $('#main').offset().top,
					paddingTop: parseInt(main_height / 2, 10) + 'px',
					position: 'absolute',
					left: Math.floor($('#main').width() / 2),
					zIndex: 89
				});

				$('#loading-overlay').css({
					height: main_height,
					left: 0,
					position: 'absolute',
					top: $('#main').offset().top,
					width: '100%',
					zIndex: 90,
					backgroundColor: '#000',
					opacity: 0.4
				}).fadeIn();
			}
		}

		/**
   * Happens whenever the _hideLoading function is beginning.
   * This function is meant to be overriden by a child class.
   */

	}, {
		key: 'beforeHideLoading',
		value: function beforeHideLoading() {}

		/**
   * Hide the loading animation and covers
   */

	}, {
		key: '_hideLoading',
		value: function _hideLoading() {
			this.beforeHideLoading();
			clearTimeout(this._loadingTimeout);
			this._loadingTimeout = 0;

			if (this.debug) {
				console.debug('Hide loading overlay');
			}

			$('#loading-overlay').remove();
			$('#loading-overlay-image').remove();

			this.hideOverlay();
			this.afterHideLoading();
		}

		/**
   * Happens whenever the _hideLoading function is finished.
   * This function is meant to be overriden by a child class.
   */

	}, {
		key: 'afterHideLoading',
		value: function afterHideLoading() {}

		/**
   * Put a cover over the whole page to prevent user manipulation while something important is going on.
   *
   * @param color CSS color for the cover
   * @param opacity Cover opacity, between 0 and 1, in increment of 0.2 (i.e 0.8)
   */

	}, {
		key: 'showOverlay',
		value: function showOverlay(color, opacity, id, zIndex) {
			if (this.debug) {
				console.debug('Show overlay');
			}

			if (!id) {
				id = 'overlay';
			}

			if ($('#' + id).length > 0) {
				// Loading is already shown
				return;
			}

			$('body').append('<div id="' + id + '"></div>');

			if (!color) {
				color = 'transparent';
			}

			if (!opacity) {
				opacity = '0';
			}

			$('#' + id).addClass('dialog-overlay').css({
				backgroundColor: color,
				opacity: opacity,
				zIndex: zIndex
			}).show();
		}

		/**
   * Remove the whole page cover
   */

	}, {
		key: 'hideOverlay',
		value: function hideOverlay(id) {
			if (this.debug) console.debug('Hide overlay');

			if (!id) id = 'overlay';

			$('#' + id).remove();
		}

		/**
   * Add an hash to the history list
   */

	}, {
		key: 'addHistory',
		value: function addHistory(hash) {
			if (!this._history[this._history.length - 1] || this._history[this._history.length - 1].hash != hash) this._history.push({ hash: hash, context: {} });
		}

		/**
   * Tries to detect if the browser navigation buttons where used
   */

	}, {
		key: '_detectStepBack',
		value: function _detectStepBack(hash) {
			if (this._history[this._history.length - 2] && this._history[this._history.length - 2].hash == hash) {
				this._history.pop();

				return true;
			}

			return false;
		}

		/**
   * Go back to previous hash
   */

	}, {
		key: 'stepBack',
		value: function stepBack(redirect) {
			var hash;

			do {
				if (this._history.length === 0) {
					hash = '';
					break;
				}

				hash = this._history.pop().hash;

				if (typeof hash == 'undefined') {
					hash = '';
					break;
				}
			} while (hash == location.hash);

			if (this.debug) console.debug('Step back to : ' + hash);

			if (redirect || typeof redirect == 'undefined') location.hash = hash;

			return hash;
		}

		/**
   * Force the page to reload;
   */

	}, {
		key: 'forceReload',
		value: function forceReload() {
			location.reload();
		}

		/**
   * Go back to the previous page and force it to reload
   */

	}, {
		key: 'forceStepBack',
		value: function forceStepBack() {
			//* Cette fonction a été modifiée dans bo-application.js *//
			//* Elle n'a pas été modifiée ici pour ne pas influencer d'autres applications. *//
			//* Avec la certitude qu'elle est utilisée seulement dans le BO, elle pourrait être effacée d'ici. *//

			this._stopObservation();

			if (this.debug) this._debugHistory();

			var hash = this.stepBack(false);

			if (hash !== '') {
				location.hash = hash;
				location.reload();
			} else {
				history.back();
				location.reload();
			}
		}

		/**
   * Go back 2 record in history
   * @param string hash
   */

	}, {
		key: 'goBack',
		value: function goBack(hash) {
			if (typeof hash === 'undefined') {
				hash = '';
			}

			if (this._history.length >= 2) {
				this._history.pop(); // Pop current page.
				hash = this._history.pop().hash; // Previous page;
			}

			if (this.debug) console.debug('Go back to "' + hash + '"');

			location.hash = hash;
		}
	}, {
		key: 'forceGoBack',
		value: function forceGoBack() {
			var hash;
			this._stopObservation();

			if (this._history.length < 2) hash = '';else {
				this._history.pop(); // Pop current page;
				hash = this._history.pop().hash; // Previous page;
			}

			if (this.debug) console.debug('Force go back to "' + hash + '"');

			location.hash = hash;
			location.reload();
		}
	}, {
		key: 'setContextValue',
		value: function setContextValue(key, value) {
			if (this._history.length > 0) {
				if (!$.isPlainObject(this._history[this._history.length - 1].context)) {
					this._history[this._history.length - 1].context = {};
				}
				this._history[this._history.length - 1].context[key] = value;
			}
		}
	}, {
		key: 'getContextValue',
		value: function getContextValue(key) {
			if (this._history.length > 0 && $.isPlainObject(this._history[this._history.length - 1].context)) return this._history[this._history.length - 1].context[key];else return false;
		}
	}, {
		key: 'getContext',
		value: function getContext() {
			if (!this._history.length) {
				return {};
			}

			var lastItem = this._history[this._history.length - 1];
			var context = lastItem.context || {};
			return context;
		}

		/**
   * Output the current browsing history to the console
   */

	}, {
		key: '_debugHistory',
		value: function _debugHistory() {
			for (var i = 0; i < this._history.length; i++) {
				console.debug(i + ' : ' + this._history[i].hash);
				console.debug(this._history[i].state);
			}
		}
	}, {
		key: '_arrayPop',
		value: function _arrayPop(array, index) {
			if (array.length && index > 0 && index < array.length) {
				for (var i = index; i < array.length - 1; i++) {
					array[i] = array[i + 1];
				}

				array.pop();
			}

			return array;
		}

		/**
   * Tries to get the request view object
   */

	}, {
		key: '_getViewObject',
		value: function _getViewObject(viewName) {
			var self = this;
			if (this._view_objects[viewName]) {
				return Promise.resolve(this._view_objects[viewName]);
			}

			return this.router.getClass(viewName).then(function (viewClass) {
				var viewObject = new viewClass(self);
				self._view_objects[viewName] = viewObject;
				return viewObject;
			}).catch(function (err) {
				console.log(err);
				return Promise.reject(err);
			});
		}
	}, {
		key: '_scrollTop',
		value: function _scrollTop() {
			var win = window.pageYOffset ? window.pageYOffset : 0;
			var doc = document.documentElement ? document.documentElement.scrollTop : 0;
			var body = document.body ? document.body.scrollTop : 0;

			var value = win ? win : 0;
			value = doc && (!value || value > doc) ? doc : value;
			value = body && (!value || value > body) ? body : value;

			return value;
		}

		/**
   * Show a modal dialog at the top of the page
   *
   * @param content HTML to put inside de dialog
   * @param speed Dialog animation speed
   * @param callback Function to call once the animation is done
   * @return Promise for modal root element
   */

	}, {
		key: 'showModalDialog',
		value: function showModalDialog(content, speed, callback, width) {
			var self = this;
			this.showOverlay('rgba(0, 0, 0, 0.4)', 1, 'overlay', 1);

			var $modalDialog = $('<div></div>').attr('id', 'modal_dialog').css({ 'display': 'none' }).append(content);

			if (width) {
				$modalDialog.css('width', width);
			}

			$('body').addClass('no-scroll').append($modalDialog);

			return new Promise(function (resolve) {
				$modalDialog.show(0, resolve);
			}).then(function () {
				if (typeof callback === 'function') {
					callback($modalDialog);
				}

				return $modalDialog;
			});
		}

		/**
   * Hide the modal dialog.
   *
   * @param speed Dialog animation speed
   * @param callback Function to call once the animation is done
   * @param use_detach True if the dialog should be detached,
   *  false if it should be removed (default)
   */

	}, {
		key: 'hideModalDialog',
		value: function hideModalDialog(speed, callback, use_detach) {
			var _this7 = this;

			var $modalDialog = $('#modal_dialog');
			return new Promise(function (resolve) {
				$modalDialog.fadeOut(speed, resolve);
			}).then(function () {
				_this7.hideOverlay();

				if (use_detach) {
					$modalDialog.detach();
				} else {
					$modalDialog.remove();
				}

				$('body').removeClass('no-scroll');

				if (typeof callback === 'function') {
					callback();
				}
			});
		}

		/**
   * Hide the modal dialog now. Mainly used to be sure no dialog is left behind
   */

	}, {
		key: 'hideModalDialogNow',
		value: function hideModalDialogNow() {
			if (this.debug) console.debug('Hide modal dialog now!');

			$('#modal_dialog').remove();
		}
	}, {
		key: 'getShowErrorHTML',
		value: function getShowErrorHTML(message) {
			var self = this;
			return '<div class="modal-dialog"><h2>' + self._('ERROR') + '</h2>\
						<p>\
							<strong>' + (message ? self._(message) : self._('FATAL_ERROR_OCCURED')) + '</strong>\
							<br />\
							' + self._('ERROR_TRY_AGAIN') + '\
							<br />\
							' + self._('CONTACT_SUPPORT_PERSIST') + '\
						</p>\
						<p class="submit">\
							<input type="submit" id="hook_create_error_close" value="' + self._('OK') + '" />\
						</p></div>';
		}
	}, {
		key: 'showError',
		value: function showError(message, onHideCallback) {
			var _this8 = this;

			var self = this;

			var resolveDialog = void 0;
			var dialogPromise = new Promise(function (resolve) {
				resolveDialog = resolve;
			});

			self.showModalDialog(self.getShowErrorHTML(message), 'fast').then(function ($dialog) {
				$dialog.find('#hook_create_error_close').safeClick(function () {
					_this8.hideModalDialog('fast').then(resolveDialog);
				});
			});

			return dialogPromise.then(function () {
				// Backward compatibility
				if (onHideCallback) {
					onHideCallback();
				}
			});
		}

		/**
   * Called when expired session is detected by an XHR.  Will eventually show the error message.
   * @param goTo
   */

	}, {
		key: 'detectedExpiredSession',
		value: function detectedExpiredSession(goTo) {
			var _this9 = this;

			if (!this.detectedExpiredSessionTimeout) {
				this.detectedExpiredSessionGoTo = goTo;
				this.detectedExpiredSessionTimeout = setTimeout(function () {
					_this9.showSessionExpiredError(_this9.detectedExpiredSessionGoTo);
				}, 100);
			}
		}
	}, {
		key: 'clearDetectedExpiredSession',
		value: function clearDetectedExpiredSession() {
			this.detectedExpiredSessionGoTo = false;
			if (this.detectedExpiredSessionTimeout) {
				clearTimeout(this.detectedExpiredSessionTimeout);
				this.detectedExpiredSessionTimeout = false;
			}
		}

		/**
   * Called when network error is detected by an XHR.  Will eventually show the error message.
   * @param goTo
   */

	}, {
		key: 'detectedNetworkError',
		value: function detectedNetworkError(goTo) {
			var _this10 = this;

			if (!this.detectedNetworkErrorTimeout) {
				this.detectedNetworkErrorGoTo = goTo;
				this.detectedNetworkErrorTimeout = setTimeout(function () {
					_this10.showXHRNetworkErrorError(_this10.detectedNetworkErrorGoTo);
				}, 100);
			}
		}
	}, {
		key: 'clearDetectedNetworkError',
		value: function clearDetectedNetworkError() {
			this.detectedNetworkErrorGoTo = false;
			if (this.detectedNetworkErrorTimeout) {
				clearTimeout(this.detectedNetworkErrorTimeout);
				this.detectedNetworkErrorTimeout = false;
			}
		}
	}, {
		key: 'getShowSessionExpiredError',
		value: function getShowSessionExpiredError() {
			var self = this;
			return '<div class="modal-dialog"><h2>' + self._('INVALID_CREDENTIAL_ERROR_TITLE') + '</h2>\
				<p>\
					<strong>' + self._('INVALID_CREDENTIAL_ERROR_BODY') + '</strong>\
					<br />\
				</p>\
				<p class="submit">\
					<input type="submit" id="hook_session_expired_error_close" value="' + self._('OK') + '" />\
				</p>\
			</div>';
		}
	}, {
		key: 'showSessionExpiredError',
		value: function showSessionExpiredError(location) {
			var self = this;
			location = location || self.VIRTUALPATH || '/?logout';
			self.showModalDialog(self.getShowSessionExpiredError(), 'fast', function () {
				$('#hook_session_expired_error_close').safeClick(function () {
					document.location = location;
					self.clearDetectedExpiredSession();
				});
			});
		}
	}, {
		key: 'getShowXHRNetworkError',
		value: function getShowXHRNetworkError() {
			var self = this;
			return '<div class="modal-dialog"><h2>' + self._('XHR_NETWORK_ERROR_TITLE') + '</h2>\
				<p>\
					<strong>' + self._('XHR_NETWORK_ERROR_BODY') + '</strong>\
					<br />\
				</p>\
				<p class="submit">\
					<input type="submit" id="hook_xhr_network_error_close" value="' + self._('OK') + '" />\
				</p>\
			</div>';
		}
	}, {
		key: 'showXHRNetworkErrorError',
		value: function showXHRNetworkErrorError(location) {
			var self = this;
			location = location || self.VIRTUALPATH || '/?logout';
			self.showModalDialog(self.getShowXHRNetworkError(), 'fast', function () {
				$('#hook_xhr_network_error_close').safeClick(function () {
					document.location = location;
					self.clearDetectedNetworkError();
				});
			});
		}
	}, {
		key: 'getShowConfirmationHTML',
		value: function getShowConfirmationHTML(title, message) {
			var self = this;
			return '<div class="modal-dialog"><h2>' + title + '</h2>\
							<p>' + message + '</p>\
						<p class="submit">\
							<input type="button" id="hook_confirmation_yes" value="' + self._('YES') + '" />\
							<input type="button" id="hook_confirmation_no" value="' + self._('NO') + '" />\
						</p></div>';
		}
	}, {
		key: 'showConfirmation',
		value: function showConfirmation(title, message, yesCallback, noCallback) {
			var self = this;
			self.showModalDialog(self.getShowConfirmationHTML(title, message), 'fast', function () {

				$('#hook_confirmation_yes').safeClick(function () {
					if (yesCallback) {
						yesCallback();
					}
					self.hideModalDialog('fast');
				});

				$('#hook_confirmation_no').safeClick(function () {
					if (noCallback) {
						noCallback();
					}
					self.hideModalDialog('fast');
				});
			});
		}
	}, {
		key: 'showMessage',
		value: function showMessage(title, message, content) {
			var self = this;
			if (title === '') this._throw('Missing title', true);
			if (message === '') this._throw('Missing message', true);

			self.showModalDialog('<h2>' + title + '</h2>\
						<p>\
							<strong>' + message + '</strong>\
						</p>\
						' + (content ? '<p>' + content + '</p>' : '') + '\
						<p class="submit">\
							<input type="submit" id="hook_show_message_close" value="' + self._('OK') + '" />\
						</p>', 'fast', function () {
				$('#hook_show_message_close').safeClick(function () {
					self.hideModalDialog('fast');
				});
			});
		}
	}, {
		key: 'showQuestionCommentDialog',
		value: function showQuestionCommentDialog(comment_type) {

			var self = this;

			var content = '<h2>' + self._('QUESTION_COMMENT_SUGGESTION') + '</h2>\
		<div class="header_line"></div>\
		<div id="hook_question_comment_form">\
		<dl class="form left_form">\
		<dt><label style="width:100px">' + self._('COMMENT_TYPE') + '</label></dt>\
		<dd><select id="hook_question_comment_type">\
		<option value="QUESTION">' + self._('QUESTION') + '</option>\
		<option value="COMMENT">' + self._('COMMENT') + '</option>\
		<option value="SUGGESTION">' + self._('SUGGESTION') + '</option>\
		</select></dd>\
		<dt><label style="width:100px">' + self._('COMMENT_FROM') + '</label></dt>\
		<dd><input type="text" id="hook_question_comment_from" style="width:350px" disabled="disabled" /></dd>\
		<dt><label style="width:100px">' + self._('COMMENT_SUBJECT') + '</label></dt>\
		<dd><input type="text" id="hook_question_comment_subject" style="width:350px" /></dd>\
		<div id="hook_question_comment_attachement_div">\
		<dt><label style="width:100px">' + self._('ATTACHMENT') + '</label></dt>\
		<dd><div id="file_upload"></div></dd>\
		<dd><ul style="margin-left:115px;" id="uploaded_files_names"></ul><dd>\
		<br />\
		</div>\
		<dd><textarea id="hook_question_comment_textarea" style="width:500px;height:150px"></textarea></dd>\
		</dl>\
		<p class="submit">\
		<input type="submit" id="hook_send_question_comment" value="' + self._('OK') + '" /> <a href="javascript:void(0);" id="hook_cancel_question_comment">' + self._('CANCEL') + '</a>\
		</p>\
		</div>\
		<div id="hook_question_comment_sent" style="display:none"><p>' + self._('THANK_YOU_FOR_YOUR_COMMENTS') + '</p></div>';

			var i = 0;

			self.showModalDialog(content, 'normal', function () {

				if (comment_type) $('#hook_question_comment_type').val(comment_type);

				$('#hook_question_comment_from').val(self.userEmail);

				$('#hook_send_question_comment').safeClick(function () {

					var type = $('#hook_question_comment_type').val();
					var subject = $('#hook_question_comment_subject').val();
					var from = $('#hook_question_comment_from').val();
					var message = $('#hook_question_comment_textarea').val();

					if (!subject) {
						$('#hook_question_comment_subject').hintError(self._('FIELD_REQUIRED')).focus();
						return false;
					}

					if (!message) {
						$('#hook_question_comment_textarea').hintError(self._('FIELD_REQUIRED')).focus();
						return false;
					}

					var postString = '&type=' + encodeURIComponent(type) + '&subject=' + encodeURIComponent(subject) + '&from=' + encodeURIComponent(from) + '&message=' + encodeURIComponent(message) + '&tmp_dir=' + encodeURIComponent(self.tmp_dir);

					$.ajax({
						url: 'index.php?k=' + self.SESSION_KEY + '&sendComment',
						type: 'POST',
						data: postString,
						dataType: 'json',
						headers: self.getXSRFHeaders(),
						success: function success(data) {

							if (data.status && data.status == 'error') {
								self.showError();
								self.hideModalDialog('fast');
								return false;
							}

							setTimeout(function () {
								self.hideModalDialog('fast');
							}, 2000);

							removeQCSAjaxFolder(self.tmp_dir);
							return true;
						},
						error: function (_error2) {
							function error(_x7, _x8, _x9) {
								return _error2.apply(this, arguments);
							}

							error.toString = function () {
								return _error2.toString();
							};

							return error;
						}(function (jqXHR, status, error) {
							self.hideModalDialog('fast');
							self.validateXHR(jqXHR).then(function (isValidXHR) {
								if (!isValidXHR) {
									return;
								}
								self.showError();
							});
						})
					});

					$('#hook_question_comment_form').fadeOut(function () {
						$("#hook_question_comment_sent").show();
					});
				});

				$('#hook_cancel_question_comment').safeClick(function () {
					self.tmp_dir = '';
					self.hideModalDialog('fast');
				});

				$('#hook_question_comment_subject').focus();
			}, 550);

			this.QCS_uploader = [];
			function generateQCSAjaxUploader() {
				return $('#file_upload').ajaxUploader({
					url: 'index.php?k=' + self.SESSION_KEY + '&uploadFile&tmp_dir=' + self.tmp_dir,
					autoUpload: true,
					progressBarConfig: {
						barImage: 'img/progressbg_orange.gif'
					},
					success: function success(data, status) {
						if (data.ajax_filename) {
							var element_number = i++;
							var filename = data.ajax_filename;
							self.tmp_dir = data.tmp_dir;
							$('#uploaded_files_names').append('<li id="ajax_file_' + element_number + '" style="list-style:none;">' + filename + '&nbsp&nbsp<span class="ico icon-cross" id="ajax_file_remove_' + element_number + '" style="position: absolute; margin-bottom:10px;"></span></li>');
							$('#ajax_file_remove_' + element_number).on('click', function () {
								removeQCSAjaxFile(self.tmp_dir, filename, element_number);
							});
							self.QCS_uploader.push(generateQCSAjaxUploader());
						} else if (data.error) {
							console.debug(data.error);
							self.showMessage(self._('ERROR'), self._('UPLOAD_FILE_ERROR_OCCURED'));
						}
					},
					error: function (_error3) {
						function error(_x10, _x11, _x12) {
							return _error3.apply(this, arguments);
						}

						error.toString = function () {
							return _error3.toString();
						};

						return error;
					}(function (jqXHR, status, error) {
						console.debug('Error uploading attachment.');
						self.showMessage(self._('ERROR'), self._('UPLOAD_FILE_ERROR_OCCURED'));
					})
				});
			}

			this.QCS_uploader.push(generateQCSAjaxUploader());

			function removeQCSAjaxFile(folder, filename, div_number) {

				var postString = '&file=' + encodeURIComponent(filename) + '&fld=' + encodeURIComponent(folder);

				$.ajax({
					url: 'index.php?k=' + self.SESSION_KEY + '&removeQCSAjaxFile',
					type: 'POST',
					data: postString,
					dataType: 'json',
					headers: self.getXSRFHeaders(),
					success: function success(data) {
						$('#ajax_file_' + div_number).remove();
						$('#ajax_file_remove_' + div_number).remove();
						return true;
					},
					error: function (_error4) {
						function error(_x13, _x14, _x15) {
							return _error4.apply(this, arguments);
						}

						error.toString = function () {
							return _error4.toString();
						};

						return error;
					}(function (jqXHR, status, error) {
						self.validateXHR(jqXHR).then(function (isValidXHR) {
							if (!isValidXHR) {
								return;
							}
							console.log(error);
						});
					})
				});
			}

			function removeQCSAjaxFolder(folder) {

				self.tmp_dir = '';
				$.ajax({
					url: 'index.php?k=' + self.SESSION_KEY + '&removeQCSAjaxFolder',
					type: 'POST',
					data: '&fld=' + encodeURIComponent(folder),
					dataType: 'json',
					headers: self.getXSRFHeaders(),
					success: function success(data) {
						return true;
					},
					error: function (_error5) {
						function error(_x16, _x17, _x18) {
							return _error5.apply(this, arguments);
						}

						error.toString = function () {
							return _error5.toString();
						};

						return error;
					}(function (jqXHR, status, error) {
						self.validateXHR(jqXHR).then(function (isValidXHR) {
							if (!isValidXHR) {
								return;
							}
							console.log(error);
						});
					})
				});
			}
		}
	}, {
		key: 'requestUnmount',
		value: function requestUnmount(callback) {
			this.unmounts.push(callback);
		}
	}, {
		key: 'performUnmounts',
		value: function performUnmounts() {
			this.unmounts.forEach(function (callback) {
				callback();
			});
			this.unmounts = [];
		}
	}, {
		key: 'htmlEntity',
		value: function htmlEntity(value) {
			if (value || this.isNumber(value)) return $('<div></div>').text(value).html();else return '';
		}
	}, {
		key: 'sleep',
		value: function sleep(milliseconds) {
			var d = new Date();
			var n;
			do {
				n = new Date();
			} while (n - d < milliseconds);
		}
	}, {
		key: 'generateGUID',
		value: function generateGUID() {
			// Taken from http://stackoverflow.com/questions/864942/in-javascript-how-can-i-uniquely-identify-one-browser-window-from-another-which

			//------------------
			var S4 = function S4() {
				return Math.floor(Math.random() * 0x10000 /* 65536 */
				).toString(16);
			};
			//------------------

			return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
		}
	}, {
		key: 'isNumber',
		value: function isNumber(value) {
			return typeof value === 'number' && isFinite(value);
		}

		/**
   * Support localized numeric representation.
   * Replace NaN by 0
   */

	}, {
		key: 'parseFloat',
		value: function (_parseFloat) {
			function parseFloat(_x) {
				return _parseFloat.apply(this, arguments);
			}

			parseFloat.toString = function () {
				return _parseFloat.toString();
			};

			return parseFloat;
		}(function (value) {
			if (typeof value == 'number') {
				return value;
			}

			value = value + ';';
			value = value.replace(/[^\d\-.,]/g, '');

			if (this.lang == 'fr') {
				if (value.indexOf(',') != -1) {
					value = value.replace(/\./g, '');
					value = value.replace(/\,/g, '.');
				}
			}

			value = value.replace(/\,/g, '');
			var val = parseFloat(value);
			if (isNaN(val)) val = 0;
			return val;
		})

		/**
   * Same as parseInt(value, 10) but replace NaN by 0
   */

	}, {
		key: 'parseInt',
		value: function (_parseInt) {
			function parseInt(_x2) {
				return _parseInt.apply(this, arguments);
			}

			parseInt.toString = function () {
				return _parseInt.toString();
			};

			return parseInt;
		}(function (value) {
			value = parseInt(value, 10);
			if (isNaN(value)) value = 0;
			return value;
		})

		/**
   * Format number according to locale and add money symbol
   */

	}, {
		key: 'formatMoney',
		value: function formatMoney(value, opts) {
			if (opts && opts.canBeNull && (value === '' || value === null)) {
				return '';
			}

			var currency_pos;
			if (this.lang == 'fr') {
				currency_pos = 'right';
			} else {
				currency_pos = 'left';
			}

			var result = this.formatNumber(value, opts);
			if (!result) result = '0';
			if (currency_pos == 'left') {
				if (opts && opts.nbsp) return '$' + result;else return '$' + result;
			} else {
				if (opts && opts.nbsp) return result + '&nbsp;$';else return result + ' $';
			}
		}

		/**
   * Formats a float value to a format easily understandable for processing.
   */

	}, {
		key: 'formatMoneyForInput',
		value: function formatMoneyForInput(value, precision) {
			var formatNumberOptions = {
				precision: precision ? precision : 2,
				facultative_decimals: false,
				decimal_separator: '.',
				thousand_separator: ''
			};

			return this.formatNumber(value, formatNumberOptions);
		}

		/**
   * Format percent according to locale
   */

	}, {
		key: 'formatPercent',
		value: function formatPercent(value, opts) {
			var separator;

			if (opts && opts.canBeNull && !value) {
				return '';
			}

			if (this.lang == 'fr') {
				if (opts && opts.nbsp) separator = '&nbsp';else separator = ' ';
			} else {
				separator = '';
			}

			var result = this.formatNumber(value, opts);
			if (!result) result = '0';
			return result + separator + '%';
		}

		/**
   * Format and localize a number
   * opts:
   * 	precision : Default precisions of the number
   *  facultative_decimals :  Hide decimals if value = 0;
   *
   */

	}, {
		key: 'formatNumber',
		value: function formatNumber(value, opts) {

			if (arguments.length === 0) return '';else if (!value && value !== 0) return '';

			var default_options = { precision: 2, facultative_decimals: true, positive: false, nbsp: false, rounded: true };
			if (this.lang == 'fr') {
				default_options = $.extend({ decimal_separator: ',', thousand_separator: ' ' }, default_options);
			} else {
				default_options = $.extend({ decimal_separator: '.', thousand_separator: ',' }, default_options);
			}

			var options = $.extend(default_options, opts);

			value = value + '';

			var neg = false;
			if (value.charAt(0) == '-') {
				if (options.positive) {
					value = '0';
				} else {
					neg = true;
					value = value.substr(1);
				}
			}

			value = value.replace(/[^\d\-.,]/g, '');

			if (options.decimal_separator == ',') {
				if (value.indexOf(options.decimal_separator) != -1) {
					value = value.replace(/\./g, '');
					value = value.replace(/,/g, '.');
				}
			}

			if (value === '') {
				value = '0';
			}

			value = value.replace(/,/g, '');
			value = parseFloat(value) + '';

			if (value == Number.NaN) value = '';

			var rounded;
			var tmp;
			if (options.precision === 0) {
				rounded = this.parseFloat(value).toFixed(0);
				tmp = rounded;
			} else {
				if (options.rounded) {
					rounded = (Math.round(value * Math.pow(10, options.precision)) / Math.pow(10, options.precision)).toFixed(options.precision);
				} else {
					rounded = (Math.floor(value * Math.pow(10, options.precision)) / Math.pow(10, options.precision)).toFixed(options.precision);
				}
				tmp = rounded.substr(0, rounded.indexOf('.'));
			}

			var integer = '';
			var pos = tmp.length;

			if (pos > 3) {
				do {
					pos = pos - 3;

					var size = 3;
					if (pos < 0) {
						size = 3 + pos;
						pos = 0;
					}

					if (integer !== '') integer = tmp.substr(pos, size) + options.thousand_separator + integer;else integer = tmp.substr(pos, size);
				} while (pos > 0);
			} else {
				integer = tmp;
			}

			var result;
			if (options.precision === 0 || options.facultative_decimals && parseInt(rounded.substr(rounded.indexOf('.') + 1)) === 0) {
				result = integer;
			} else {
				integer += options.decimal_separator;
				result = integer + rounded.substr(rounded.indexOf('.') + 1);
			}

			if (options.end_space) {
				result += ' ';
			}

			if (options.nbsp) {
				result = result.replace(/ /g, '&nbsp;');
			}

			if (neg) return '-' + result;else return result;
		}
	}, {
		key: 'formatSIN',
		value: function formatSIN(sin) {
			var old_sin = sin;

			//Remove whitespace
			old_sin = old_sin.replace(new RegExp("[^\\d]", 'g'), '');

			var new_sin = old_sin.substr(0, 3) + ' ' + old_sin.substr(3, 3) + ' ' + old_sin.substr(6, 3);
			return $.trim(new_sin);
		}
	}, {
		key: 'isSINValid',
		value: function isSINValid(sin) {

			if (sin === '') return true;

			if (sin == '*** *** ***') return true;

			sin = sin.replace(new RegExp("[^\\d]", 'g'), '');

			if (sin.length != 9) return false;

			var total = parseInt(sin.charAt(0)) + parseInt(sin.charAt(2)) + parseInt(sin.charAt(4)) + parseInt(sin.charAt(6));

			for (var i = 1; i <= 7; i += 2) {
				var tmp = parseInt(sin.charAt(i)) * 2;
				if (tmp >= 10) tmp = tmp - 9;

				total += tmp;
			}

			total += parseInt(sin.charAt(8));
			if (total % 10 !== 0) return false;else {
				return true;
			}
		}

		/**
   * Format field value objects provided by model (id, value_fr, value_en)
   */

	}, {
		key: 'formatFieldValue',
		value: function formatFieldValue(fieldValue) {
			var t = this;

			if (!fieldValue) return '';

			if ((typeof fieldValue === 'undefined' ? 'undefined' : _typeof(fieldValue)) == 'object') {
				var val = fieldValue['value_' + t.lang];

				if (typeof val == 'undefined') {
					return '';
				}

				return val;
			} else {
				return fieldValue;
			}
		}
	}, {
		key: 'parsePhone',
		value: function parsePhone(phone) {
			var extension;
			if (/(,|ext|poste|#)/.test(phone)) {
				var coma = phone.indexOf(',');
				var ext = phone.indexOf('ext');
				var poste = phone.indexOf('poste');
				var square = phone.indexOf('#');

				var pos = Math.max(coma, ext, poste, square);
				if (pos != -1) {
					extension = phone.substr(pos).replace(/[^\d]/g, '');
					phone = phone.substr(0, pos);
				}
			} else {
				extension = '';
			}

			phone = phone.replace(/[^\d]/g, '');

			var formatted;
			if (phone[0] == '1' && phone.length >= 11) {
				formatted = '1 ' + phone.substr(1, 3) + ' ' + phone.substr(4, 3) + '-' + phone.substr(7, 4);

				if (phone.length > 11) extension = phone.substr(11);
			} else if (phone.length >= 10) {
				formatted = phone.substr(0, 3) + ' ' + phone.substr(3, 3) + '-' + phone.substr(6, 4);

				if (phone.length > 10) extension = phone.substr(10);
			} else if (phone.length == 7) {
				formatted = phone.substr(0, 3) + '-' + phone.substr(3);
			} else {
				formatted = phone;
			}

			if (extension) {
				formatted += this._('PHONE_EXTENSION') + extension;
			}

			return formatted;
		}
	}, {
		key: 'formatPostalCode',
		value: function formatPostalCode(code) {
			if (/^[a-zA-Z]\d[a-zA-Z]\d[a-zA-Z]\d$/.test(code)) {
				return (code.substr(0, 3) + ' ' + code.substr(3)).toUpperCase();
			} else return code;
		}
	}, {
		key: 'pad',
		value: function pad(number, length) {

			var str = '' + number;
			while (str.length < length) {
				str = '0' + str;
			}

			return str;
		}
	}, {
		key: 'interpolate',
		value: function interpolate(message, context) {
			var match;

			if (context !== null && (typeof context === 'undefined' ? 'undefined' : _typeof(context)) === 'object') {
				while (match = /{([a-z0-9._]+)}/gi.exec(message)) {
					message = message.replace(match[0], context[match[1]] || '');
				}
			}

			return message;
		}

		/**
   * Used to detect login redirection during ajax errors.
   *
   */

	}, {
		key: 'validateXHR',
		value: function validateXHR(jqXHR) {
			var self = this;
			return new Promise(function (resolve) {
				if (!jqXHR || typeof jqXHR === 'undefined') {
					resolve(false);
					return;
				}

				if (jqXHR.statusText === 'abort') {
					resolve(false);
					return;
				}

				if (jqXHR.status === 0) {
					// self._beforeUnload calling self.abortOngoingXHR() may be trigerred after the request completion so we delay the check.
					setTimeout(function () {

						// Probably due tu a CORS error caused by a redirection to Siteminder sso login page.
						// Could also be caused by a sever network or dns error.
						self.showXHRNetworkErrorError(jqXHR.responseJSON ? jqXHR.responseJSON.view : false);

						resolve(false);
					});

					return;
				}

				if (jqXHR.status == 401) {
					self.showSessionExpiredError(jqXHR.responseJSON ? jqXHR.responseJSON.view : false);
					resolve(false);
					return;
				}

				resolve(true);
			});
		}
	}, {
		key: 'getXHRRequest',
		value: function getXHRRequest(url, successCallback, loading, errorCallback, button, skipOverlayHandling) {
			var self = this;

			var xhrRequest = $.ajax({
				url: url,
				type: 'GET',
				dataType: 'json',

				success: function success(response) {
					if (!skipOverlayHandling) {
						self.hideOverlay();
						self._hideLoading();
					}

					if (button) $(button).prop('disabled', false);

					var data;
					if (typeof response.data != 'undefined') {
						data = response.data;
					} else {
						data = response;
					}

					if (response.status && response.status == 'error') {
						if (typeof errorCallback == 'function') {
							errorCallback(data);
						} else if (typeof data.message != 'undefined') {
							self.showError(data.message);
						} else {
							self.showError();
						}
					} else if (typeof successCallback == 'function') {
						successCallback(data);
					}
				},
				error: function (_error6) {
					function error(_x19, _x20, _x21) {
						return _error6.apply(this, arguments);
					}

					error.toString = function () {
						return _error6.toString();
					};

					return error;
				}(function (jqXHR, status, error) {
					var _this11 = this;

					if (!skipOverlayHandling) {
						self.hideOverlay();
						self._hideLoading();
					}

					if (button) {
						$(button).prop('disabled', false);
					}

					self.validateXHR(jqXHR).then(function (isValidXHR) {
						if (!isValidXHR) {
							return;
						}
						if (_this11.debug) {
							console.debug('AJAX query error');
							console.debug(status);
							console.debug(error);
						}

						if (typeof errorCallback == 'function') {
							errorCallback();
						} else {
							self.showError();
						}
					});
				})
			});

			return xhrRequest;
		}
	}, {
		key: 'registerXHR',
		value: function registerXHR(xhr) {
			this._ongoing_xhrs.push(xhr);
		}
	}, {
		key: 'unregisterXHR',
		value: function unregisterXHR(xhr) {
			var index = this._ongoing_xhrs.indexOf(xhr);
			if (index >= 0) {
				this._ongoing_xhrs.splice(index, 1);
			}
		}
	}, {
		key: 'abortOngoingXHR',
		value: function abortOngoingXHR() {
			this.fetchService.abortOngoingFetchPromises();

			$.each(this._ongoing_xhrs, function (index, xhr) {
				if (typeof xhr !== 'undefined') {
					xhr.abort();
				}
			});
			this._ongoing_xhrs = [];
		}
	}, {
		key: 'getViewUrl',
		value: function getViewUrl(view, cmd, paramsString) {
			if (paramsString.length > 0) {
				if (paramsString[0] !== '&') {
					paramsString = '&' + paramsString;
				}
			}

			return 'index.php?k=' + encodeURIComponent(this.SESSION_KEY) + '&view=' + encodeURIComponent(view) + '&cmd=' + encodeURIComponent(cmd) + paramsString;
		}
	}, {
		key: 'fetch',
		value: function fetch(url, options) {
			var _this12 = this;

			if (!options) {
				options = {};
			}

			var showLoading = options.showLoading === true;
			var showOverlay = options.showOverlay === true && !showLoading;
			if (showOverlay) {
				this.showOverlay();
			}

			var $button = options.button ? $(button) : false;
			if ($button) {
				$button.prop('disabled', true);
			}

			if (showLoading) {
				// If we don't receive an awnser after 1.5 second, a loading overlay will appear
				this._loadingTimeout = setTimeout(function () {
					_this12._showLoading();
				}, this._loadingDelay);
			}

			return this.fetchService.fetch(url, options).finally(function () {
				if (showLoading) {
					_this12._hideLoading();
				}
				if (showOverlay) {
					_this12.hideOverlay();
				}
				if ($button) {
					$button.prop('disabled', false);
				}
			});
		}
	}, {
		key: 'fetchJson',
		value: function fetchJson(url, options) {
			return this.fetch(url, options).then(_FetchService2.default.parseJSON).then(_FetchService2.default.handleApplicationResponseData);
		}
	}, {
		key: 'get',
		value: function get(view, cmd, paramsString, successCallback, showLoading, errorCallback, buttonSelector, skipOverlayHandling) {
			var _this13 = this;

			var options = {
				buttonSelector: buttonSelector,
				showLoading: showLoading,
				showOverlay: !showLoading && !skipOverlayHandling
			};
			return this.fetch(this.getViewUrl(view, cmd, paramsString), options).then(_FetchService2.default.parseJSON).then(_FetchService2.default.handleApplicationResponseData).then(function (data) {
				if (typeof successCallback === 'function') {
					successCallback(data);
				}
				return data;
			}).catch(function (error) {
				return _this13.handleFetchError(error, errorCallback);
			});
		}
	}, {
		key: 'post',
		value: function post(view, cmd, paramsString, postString, successCallback, showLoading, errorCallback, buttonSelector, skipOverlayHandling) {
			var _this14 = this;

			var options = {
				buttonSelector: buttonSelector,
				showLoading: showLoading,
				showOverlay: !showLoading && !skipOverlayHandling
			};
			options = _FetchService2.default.addPostOptions(postString, options);
			return this.fetch(this.getViewUrl(view, cmd, paramsString), options).then(_FetchService2.default.parseJSON).then(_FetchService2.default.handleApplicationResponseData).then(function (data) {
				if (typeof successCallback === 'function') {
					successCallback(data);
				}
				return data;
			}).catch(function (error) {
				return _this14.handleFetchError(error, errorCallback);
			});
		}
	}, {
		key: 'handleFetchError',
		value: function handleFetchError(error, errorCallback) {
			var errorMessage = void 0;
			var data = void 0;

			if (this.isFetchAbortError(error) || this.isErrorAlreadyHandled(error)) {
				// Bubble abort to make sure any parent processing get aborted
				throw error;
			}

			if (this.isFetchResponseDataError(error)) {
				if (error.data) {
					data = error.data;
					errorMessage = data.message;
				}
			}

			this.logError('Unhandled fetch error', error);

			if (typeof errorCallback === 'function') {
				errorCallback(data);
			} else {
				this.showError(errorMessage);
			}

			// Special flag to avoid loging error twice
			error.handledByApplication = true;
			throw error;
		}
	}, {
		key: 'isFetchAbortError',
		value: function isFetchAbortError(error) {
			return (typeof error === 'undefined' ? 'undefined' : _typeof(error)) === 'object' && error instanceof _FetchService.FetchAbortError;
		}
	}, {
		key: 'isFetchResponseDataError',
		value: function isFetchResponseDataError(error) {
			return (typeof error === 'undefined' ? 'undefined' : _typeof(error)) === 'object' && error instanceof _FetchService.FetchResponseDataError;
		}
	}, {
		key: 'isErrorAlreadyHandled',
		value: function isErrorAlreadyHandled(error) {
			return (typeof error === 'undefined' ? 'undefined' : _typeof(error)) === 'object' && error.handledByApplication === true;
		}
	}, {
		key: 'datepicker',
		value: function datepicker(selector, options) {
			var self = this;
			return $(selector).bind('change', function () {
				this.value = self.date.format(this.value, 'input');
			}).datepicker(options);
		}
	}, {
		key: '_formatAddress',
		value: function _formatAddress(line1, line2, city, state, country, postalCode) {
			var address = '';

			var f = true;
			if (line1 !== '' && line1 !== false) {
				f = false;
				address += this.htmlEntity(line1);
			}

			if (line2 !== '' && line2 !== false) {
				if (!f) address += ', ';
				f = false;
				address += this.htmlEntity(line2);
			}

			if (city !== '' && city !== false) {
				if (!f) address += ', ';
				f = false;
				address += this.htmlEntity(city);
			}

			//TODO: Check with locallization
			if (state !== '' && state != "QC") {
				if (!f) address += ', ';
				f = false;
				address += this.htmlEntity(state);
			}

			if (postalCode !== '' && postalCode !== false) {
				if (!f) address += ', ';
				f = false;
				address += this.htmlEntity(postalCode);
			}

			//TODO: Check with locallization
			if (country !== '' && country !== false && country != 'Canada') {
				if (!f) address += ', ';
				f = false;
				address += this.htmlEntity(country);
			}

			return address;
		}
	}, {
		key: 'formatAddress',
		value: function formatAddress(line1, line2, city, state, country, postalCode) {
			return this._formatAddress(line1, line2, city, state, country, postalCode);
		}
	}, {
		key: 'formatGMapAddress',
		value: function formatGMapAddress(line1, line2, city, state, country, postalCode) {

			line1 = $.trim(line1);
			line2 = $.trim(line2);
			city = $.trim(city);
			country = $.trim(country);
			postalCode = $.trim(postalCode);

			line1 = line1.replace(/\bboul\./i, 'Boulevard');
			line1 = line1.replace(/,\s?\b(bur|bureau|app|appartement|appartment|local|office|porte|door)\b\.?\s*\d*/i, '');

			return (line1 ? line1 + ", " : '') + (line2 ? line2 + ", " : '') + (city ? city + ', ' : '') + (state ? state + ', ' : '') + (postalCode ? postalCode + ', ' : '') + country;
		}
	}, {
		key: 'isMobile',
		value: function isMobile() {
			return navigator.userAgent.match(/iPhone/i) !== null || navigator.userAgent.match(/iPod/i) !== null || navigator.userAgent.match(/Pre/i) !== null || navigator.userAgent.match(/Android/i) !== null;
		}

		/**
   * Download a file using an iframe
   */

	}, {
		key: 'downloadFile',
		value: function downloadFile(url) {
			var self = this;

			if (!self._iPad) {
				var frameId = 'download_iframe';
				var io = document.getElementById(frameId);
				if (!io) {
					io = document.createElement('iframe');
					io.id = frameId;
					io.name = frameId;
					io.style.position = 'absolute';
					io.style.top = '-1000px';
					io.style.left = '-1000px';
					document.body.appendChild(io);
				}

				io.src = url;
			} else {
				var content = '<h2>' + self._('DOWNLOAD_FILE_DIALOG_TITLE') + '</h2>\
			<div class="header_line"></div>\
			<a id="hook_download_file" href="javascript:void(0);">' + self._('DOWNLOAD_FILE') + '</a>\
			<br /><br />';

				self.showModalDialog(content, 'normal', function () {
					$('#hook_download_file').click(function () {
						window.open(url, '_blank');
						self.hideModalDialog('fast');
					});
				});
			}
		}
	}, {
		key: 'getIEVersion',
		value: function getIEVersion() {
			var rv = null;
			if (navigator.appName == 'Microsoft Internet Explorer') {
				var ua = navigator.userAgent;
				var re = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
				if (re.exec(ua) != null) {
					rv = parseFloat(RegExp.$1);
				}
			}

			return rv;
		}
	}, {
		key: 'isIE7',
		value: function isIE7() {

			var ieVersion = this.getIEVersion();
			ieVersion = ieVersion !== null ? ieVersion : 999; // for compatibility //

			return ieVersion < 8;
		}
	}, {
		key: 'isIE9',
		value: function isIE9() {

			var ieVersion = this.getIEVersion();
			return ieVersion >= 9 && ieVersion < 10;
		}
	}, {
		key: 'isOpera',
		value: function isOpera() {
			return navigator.appName == 'Opera';
		}
	}, {
		key: 'checkStoredSession',
		value: function checkStoredSession() {
			var self = this;
			if (this.canUseSessionStorage()) {
				var xsrf_token = self.getXSRFToken();
				if (!xsrf_token || !self._xsrf_cookie_name) {
					throw this._throw('Cannot check stored session without XSRF Token');
				}

				if (window.opener) {
					if (sessionStorage.getItem('window-name') != window.name) {
						if (this.debug) {
							console.debug('Opened from another tab, clearing cloned stored session');
						}

						sessionStorage.clear();
						sessionStorage.setItem(self._xsrf_cookie_name, xsrf_token);
					}
				}

				var stored_token = sessionStorage.getItem(self._xsrf_cookie_name);
				if (!stored_token || stored_token != xsrf_token) {
					if (this.debug) {
						console.log('Session cookie changed, clearing stored session');
					}

					sessionStorage.clear();
					sessionStorage.setItem(self._xsrf_cookie_name, xsrf_token);
				}

				if (!sessionStorage.getItem('window-name')) {
					sessionStorage.setItem('window-name', window.name);
				}

				var session_key = sessionStorage.getItem('SESSION_KEY');

				if (session_key) {
					this.replaced_session_key = this.SESSION_KEY;
					this.SESSION_KEY = session_key;

					if (this.debug) {
						console.log('Replaced given session key "' + this.replaced_session_key + '" for stored session key "' + this.SESSION_KEY + '"');
					}
				} else {
					sessionStorage.setItem('SESSION_KEY', this.SESSION_KEY);
				}
			}
		}
	}, {
		key: 'canUseSessionStorage',
		value: function canUseSessionStorage() {
			try {
				return !!sessionStorage.getItem && !!$.cookie;
			} catch (e) {
				return false;
			}
		}
	}, {
		key: 'forceElementRedraw',
		value: function forceElementRedraw($targetElement) {
			// So ugly... fix pour IE9. //
			$targetElement.hide().show();
		}

		// Access an object using dot notation

	}, {
		key: 'getByKey',
		value: function getByKey(obj, key) {
			var nav = obj;
			var tokens = key.split('.');
			for (var i = 0; i < tokens.length; i++) {
				if ((typeof nav === 'undefined' ? 'undefined' : _typeof(nav)) != "object") return undefined;
				nav = nav[tokens[i]];
			}
			return nav;
		}
	}]);

	return Application;
}(_events2.default);

exports.default = Application;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BrowserDetect = function () {
	function BrowserDetect(userAgent) {
		_classCallCheck(this, BrowserDetect);

		var browser = this;
		browser.userAgent = userAgent;
		var matched = BrowserDetect._uamatch(userAgent);
		if (matched.browser) {
			browser[matched.browser] = true;
			browser.name = matched.browser;
			browser.version = matched.version;
		}

		// Chrome is Webkit, but Webkit is also Safari.
		if (browser.chrome) {
			browser.webkit = true;
		} else if (browser.webkit) {
			browser.safari = true;
		}

		browser.iPad = userAgent.match(/iPad/) === 'iPad';
		browser.iPod = userAgent.match(/iPod/) === 'iPod';
		browser.iPhone = userAgent.match(/iPhone/) === 'iPhone';
		browser.blackberry = userAgent.match('/BlackBerry/') === 'BlackBerry' && browser.webkit === true;
		browser.palmPre = userAgent.match('/webOS/') === 'webOS' && browser.webkit === true;
		browser.mobile = userAgent.match(/iPod|iPad|iPhone|Android|BlackBerry|Opera Mini|Fennec|IEMobile|webOS/i) !== null;
		browser.legacyMSIE = browser.msie === true && browser.version < 11;
		browser.mapUrl = 'http://maps.google.com/maps';
		if (browser.iPad || browser.iPod || this.iPhone) {
			var versionMatch = userAgent.match(/OS (\d)(_\d)/i);
			if (versionMatch !== null) {
				browser.iOSVersion = {
					major: versionMatch[1],
					minor: versionMatch[2]
				};

				if (browser.iOSVersion.major > 5) {
					browser.mapUrl = 'http://maps.apple.com/';
				}
			}
		}
	}

	/**
  * Taken from jquery-migrate
  * @private
  */


	_createClass(BrowserDetect, null, [{
		key: '_uamatch',
		value: function _uamatch(ua) {
			ua = ua.toLowerCase();

			var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];

			return {
				browser: match[1] || "",
				version: match[2] || "0"
			};
		}
	}]);

	return BrowserDetect;
}();

exports.default = BrowserDetect;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = __webpack_require__(5);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var View = function (_EventEmitter) {
	_inherits(View, _EventEmitter);

	function View(app) {
		_classCallCheck(this, View);

		var _this = _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).call(this));

		_this.app = app;
		_this._view = '';
		_this._id = false;
		_this._uri_params = {};
		_this._redrawn = false;
		_this._loadSteps = [function (params) {
			return _this._load(params);
		}];
		_this._closed = false;

		_this.on('hook', function () {
			$('input').each(function (index, element) {
				if (!$(element).attr('maxlength')) {
					$(element).attr('maxlength', 255);
				}
			});
		});
		return _this;
	}

	_createClass(View, [{
		key: 'changed',
		value: function changed(element) {}
	}, {
		key: 'parseHash',
		value: function parseHash(hash) {
			var uri = this.app.parseHash(hash);

			var pos = uri.view.indexOf('/');
			if (pos > 0) {
				var next = uri.view.indexOf('/', pos + 1);
				if (next > 0) {
					pos = next;

					uri.id = uri.view.substr(pos + 1);
					uri.view = uri.view.substr(0, pos);
				}
			} else {
				uri.id = false;
			}

			return uri;
		}
	}, {
		key: 'onHashChange',
		value: function onHashChange(hash) {
			var uri = this.parseHash(hash);

			return this._onHashChange(hash, uri);
		}
	}, {
		key: '_onHashChange',
		value: function _onHashChange(hash, uri) {
			// Hash changed but we stay in the same view object

			return false; // Return true here if you want to handle the change and prevent the application from fetching data from the server
		}
	}, {
		key: 'onScrollToAnchor',
		value: function onScrollToAnchor($element, anchor_name) {
			$element.focus();
			var element_offset = $element.offset();
			window.scrollTo(element_offset.left, element_offset.top);
		}
	}, {
		key: 'init',
		value: function init(hash) {
			var uri = this.parseHash(hash);
			this._uri = uri;
			this._view = uri.view;
			this._id = uri.id;
			this._uri_params = uri.params;
			this._closed = false;
		}
	}, {
		key: 'load',
		value: function load(params) {
			var _this2 = this;

			this.app.performUnmounts();
			this.params = params;

			return Promise.all(this._loadSteps.map(function (step) {
				return step(params);
			})).then(function () {
				_this2.emit('load', params);
			});
		}
	}, {
		key: '_load',
		value: function _load(params) {}
	}, {
		key: 'addLoadStep',
		value: function addLoadStep(step) {
			this._loadSteps.push(step);
		}
	}, {
		key: 'draw',
		value: function draw(html) {
			this.app.performUnmounts();
			this._onBeforeDraw();

			if (this._canRedraw()) {
				var selectors = this._getRedrawingSelectors();

				var can_redraw = true;

				for (var i = 0; can_redraw && i < selectors.length; i++) {
					if (!$(selectors[i]).length) {
						can_redraw = false;
					}
				}

				selectors = null;

				if (can_redraw) {
					this._redrawn = true;

					if (this.app.debug) {
						console.debug('Redrawing content');
					}

					this._onDraw(true);

					return;
				}
			}

			this._redrawn = false;
			if (this.app.debug) {
				console.debug('Drawing view');
			}

			$('#content').html(html);
			this._onDraw();
		}
	}, {
		key: '_canRedraw',
		value: function _canRedraw() {
			return false;
		}
	}, {
		key: '_getRedrawingSelectors',
		value: function _getRedrawingSelectors() {
			return [];
		}

		/**
   * You can override this function to do anything before the view is drawn (or redrawn)
   */

	}, {
		key: '_onBeforeDraw',
		value: function _onBeforeDraw() {}

		/**
   * You can override this function to know when the view is done drawing
   */

	}, {
		key: '_onDraw',
		value: function _onDraw(redrawn) {}
	}, {
		key: 'hook',
		value: function hook(hash) {
			var self = this;
			if (!self._redrawn) {
				if (self.app.debug) {
					console.debug('Hooking view');
				}

				self.updateReturnToParentView();
				return Promise.resolve(this._hook(hash)).then(function () {
					self.emit('hook', hash);
				});
			} else {
				return Promise.resolve();
			}
		}
	}, {
		key: '_hook',
		value: function _hook(hash) {
			if (this.app.debug) {
				this.app._throw('View does not implement _hook function');
			}
			return Promise.resolve();
		}
	}, {
		key: 'inject',
		value: function inject(model) {
			if (this.app.debug) {
				console.debug('Injecting model');
			}

			return this._inject(model);
		}
	}, {
		key: '_inject',
		value: function _inject(model) {
			if (this.app.debug) {
				this.app._throw('View does not implement _inject function');
			}
			return Promise.resolve();
		}
	}, {
		key: 'close',
		value: function close(callback) {
			var _this3 = this;

			if (this._closed) {
				// Already closed
				return Promise.resolve({ ok: true });
			}

			return Promise.resolve(this._canClose()).then(function (canClose) {
				if (!canClose) {
					return Promise.resolve(_this3._onCancelClose()).then(function () {
						return { cancel: true };
					});
				}

				_this3._closed = true;
				_this3.emit('close');
				return Promise.resolve({ ok: true });
			}).then(function (closeState) {
				if (typeof callback === 'function') {
					callback(closeState);
				}

				return closeState;
			});
		}
	}, {
		key: '_canClose',
		value: function _canClose() {
			return true;
		}
	}, {
		key: '_onCancelClose',
		value: function _onCancelClose() {
			if (this.app.debug) {
				this.app._throw('View does not implement _onCancelClose function');
			}
		}
	}, {
		key: 'pushParentView',
		value: function pushParentView(view_name) {
			//* Utilisée dans FNA et BO. *//

			var t = this;
			var ret = '';
			if (t._uri_params.parent_view) {
				ret += t._uri_params.parent_view + '|';
			}
			ret += encodeURIComponent(view_name);
			return ret;
		}
	}, {
		key: 'popParentView',
		value: function popParentView(include_id) {
			if (typeof include_id === 'undefined') {
				include_id = true;
			}

			if (this._uri_params.parent_view === undefined) {
				return false;
			}

			var views = this._uri_params.parent_view.split('|');
			var parent_view = decodeURIComponent(views.pop());
			if (views.length === 0) {
				this._uri_params.parent_view = undefined;
			} else {
				this._uri_params.parent_view = views.join('|');
			}
			var url = '';

			if (!parent_view) {
				url = '#';
			} else if (include_id) {
				url = '#' + parent_view + '/' + this._id;
			} else {
				url = '#' + parent_view;
			}

			if (views.length > 0) {
				url += '&parent_view=' + views.join('|');
			}

			return url;
		}
	}, {
		key: 'getParentView',
		value: function getParentView() {
			var self = this;
			if (self._uri_params.parent_view === undefined) {
				return false;
			}
			if (self._uri_params.parent_view === '') {
				return self._uri_params.parent_view;
			}

			var views = self._uri_params.parent_view.split('|');
			return decodeURIComponent(views.pop());
		}
	}, {
		key: 'updateReturnToParentView',
		value: function updateReturnToParentView() {
			var self = this;
			var parent_view = self.getParentView();
			if (parent_view) {
				var translate_key = 'BACK_TO_' + parent_view.toUpperCase().split('/').splice(0, 2).join('_');
				var label = self.app._(translate_key);
				$('.hook_back_to_parent_view').text(label);
			}
		}
	}]);

	return View;
}(_events.EventEmitter);

exports.default = View;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function isObject(what) {
    return typeof what === 'object' && what !== null;
}

// Yanked from https://git.io/vS8DV re-used under CC0
// with some tiny modifications
function isError(value) {
  switch ({}.toString.call(value)) {
    case '[object Error]': return true;
    case '[object Exception]': return true;
    case '[object DOMException]': return true;
    default: return value instanceof Error;
  }
}

module.exports = {
    isObject: isObject,
    isError: isError
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});


function AsyncTask(options) {
	var self = this;

	this.options = $.extend({}, this.defaults, options);

	this.options.pollDelay = Math.max(this.options.pollDelay, 100);

	this._ajaxTimeoutId = 0;

	this.retryCount = 0;
	this._reset();

	this._onWebSocketUpdate = function (statusUpdate) {
		self._update(statusUpdate);
	};

	this._onAjaxUpdate = function (statusUpdate, httpStatus, xhr) {
		self._ajaxTimeoutId = 0;
		self._update(statusUpdate);
		if (self.isPending() || self.isProcessing()) {
			// 201 Created, the task is completed
			self._pollServer();
		}
	};
	this._onAjaxError = function (xhr) {
		self._ajaxTimeoutId = 0;
		self.inError = true;
		self._notifyError(xhr.status, xhr.responseText);
	};
	this._ajaxUpdate = function () {
		$.ajax(self.queueUrl, {
			contentType: 'application/json',
			error: self._onAjaxError,
			success: self._onAjaxUpdate
		});
	};
}

AsyncTask.prototype = {
	defaults: {
		url: '',
		postData: false,
		update: false,
		error: false,
		success: false,
		cancel: false,
		pollDelay: 500,
		websocket: false
	},

	_reset: function _reset() {
		this.lastStatus = {
			status: 'pending',
			percentage: 0,
			current: 0,
			steps: 0
		};

		this.started = false;
		this.inError = false;
		this.cancelled = false;
		this.queueUrl = false;
		this.result = false;
		this.websocket_channel = false;
	},

	getStatus: function getStatus() {
		return this.lastStatus.status;
	},

	isCompleted: function isCompleted() {
		return this.lastStatus.status == 'completed';
	},

	isPending: function isPending() {
		return this.lastStatus.status == 'pending';
	},

	isProcessing: function isProcessing() {
		return this.lastStatus.status == 'processing';
	},

	isCancelled: function isCancelled() {
		return this.cancelled;
	},

	isInError: function isInError() {
		return this.inError; // Not so sure about this...
	},

	getPercentage: function getPercentage() {
		return this.lastStatus.percentage;
	},

	getCurrentStep: function getCurrentStep() {
		return this.lastStatus.current_step;
	},

	getStepCount: function getStepCount() {
		return this.lastStatus.step_count;
	},

	getResult: function getResult() {
		return this.result;
	},

	cancel: function cancel() {
		if (this.isPending() || this.isProcessing()) {
			if (this.options.websocket) {
				this.sendWebSocketCancel();
			} else {
				this._ajaxCancel();
			}

			return true;
		} else {
			return false;
		}
	},

	_ajaxCancel: function _ajaxCancel() {
		clearTimeout(this._ajaxTimeoutId);
		this._ajaxTimeoutId = 0;
		this.cancelled = true;

		var self = this;
		$.ajax(this.queueUrl, {
			type: 'DELETE',
			error: this._onAjaxError,
			success: function success(data) {
				if ($.isFunction(self.options.cancel)) {
					self.options.cancel.call({}, this);
				}
			}
		});
	},

	retry: function retry() {
		if (this.isCompleted() || this.isInError()) {
			this.retryCount++;
			this._reset();
			this.start();

			return true;
		} else {
			return false;
		}
	},

	getRetryCount: function getRetryCount() {
		return this.retryCount;
	},

	start: function start() {
		if (!this.started) {
			this.started = true;

			var headers = {
				'Accept': 'poll' + (this.options.websocket ? ', websocket' : '')
			};

			if (this.options.websocket) {
				headers['X-WebSocket-Token'] = this.options.websocket.getToken();
			}

			var type = 'GET';
			if (this.options.postData) {
				type = 'POST';
			}

			var self = this;
			$.ajax(this.options.url, {
				type: type,
				data: this.options.postData,
				error: this._onAjaxError,
				headers: headers,
				success: function success(response, status, xhr) {
					if (xhr.status == 202) {
						self.queueUrl = response.data.location;

						if (self.options.websocket && response.data.websocket_channel) {
							self.websocket_channel = response.data.websocket_channel;
							self.options.websocket.on(self.websocket_channel, self._onWebSocketUpdate);
						} else {
							self._pollServer();
						}
					} else {
						self._notifyError(xhr.status, xhr.responseText);
					}
				}
			});

			return true;
		} else {
			return false;
		}
	},

	_pollServer: function _pollServer() {
		this._ajaxTimeoutId = setTimeout(this._ajaxUpdate, this.options.pollDelay);
	},

	_update: function _update(statusUpdate) {
		if (this.isPending() || this.isProcessing()) {
			if (this._statusChanged(statusUpdate)) {
				this.lastStatus = statusUpdate;

				switch (statusUpdate.status) {
					case 'pending':
					case 'processing':
						if ($.isFunction(this.options.update)) {
							this.options.update.call({}, this, statusUpdate.status, statusUpdate.data.percentage, statusUpdate.data.current_step, statusUpdate.data.step_count);
						}
						break;
					case 'completed':
						if ($.isFunction(this.options.success)) {
							this.options.success.call({}, this, statusUpdate.data.location, statusUpdate.data.expire_on);
						}
						this._close();
						break;
					case 'cancelled':
						this.cancelled = true;
						if ($.isFunction(this.options.cancel)) {
							this.options.cancel.call({}, this);
						}
						this._close();
						break;
					case 'error':
						this.inError = true;
						this._notifyError(500, '');
						break;
					default:
						console.debug('Unknown task status : '.statusUpdate.status);
						break;
				}
			}
		}
	},

	_statusChanged: function _statusChanged(newStatus) {
		return !this.lastStatus || !this.lastStatus.data || this.lastStatus.status != newStatus.status || this.lastStatus.data.percentage != newStatus.data.percentage || this.lastStatus.data.current != newStatus.data.current;
	},

	_close: function _close() {
		if (this.options.websocket && this.websocket_channel) {
			this.options.websocket.off(this.websocket_channel, this._onWebSocketUpdate);
			this.websocket_channel = false;
		}
	},

	_notifyError: function _notifyError(code, text) {
		if ($.isFunction(this.options.error)) {
			this.options.error.call({}, this, code, text);
		}
	}
};

exports.default = AsyncTask;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Application = __webpack_require__(2);

var _Application2 = _interopRequireDefault(_Application);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import $ from 'jquery';

var DateHelper = function () {
	function DateHelper(app) {
		_classCallCheck(this, DateHelper);

		this.app = app;
		this._date_regex = new RegExp(/^([1-9]{1}\d{3})-{0,1}([0]{1}[1-9]{1}|[1]{1}[0-2]{1})-{0,1}([0-2]{1}[1-9]{1}|[1-2]{1}[0]{1}|[3]{1}[0-1]{1})(| (\d{2}):(\d{2}):(\d{2})(|\.\d+))$/);
	}

	_createClass(DateHelper, [{
		key: "isDate",
		value: function isDate(date) {
			var m = this._date_regex.exec(date);

			return m != null;
		}
	}, {
		key: "parse",
		value: function parse(date) {
			if (date === null) return false;

			if ((typeof date === "undefined" ? "undefined" : _typeof(date)) == 'object') {
				if (typeof date.date != "undefined") {
					//Got data from model
					date = date.date;
				} else {
					//Probably got a Date object
					return date;
				}
			}

			var m = this._date_regex.exec(date);

			if (m == null) {
				if (this.app.debug) console.debug('Could not parse date "' + date + '"');

				return false;
			} else {
				var obj = new Date();

				obj.setDate(1);
				obj.setYear(m[1]);
				obj.setMonth(parseInt(m[2], 10) - 1);
				obj.setDate(m[3]);
				if (m[4]) {
					obj.setHours(m[5]);
					obj.setMinutes(m[6]);
					obj.setSeconds(m[7]);
				} else {
					obj.setHours('0');
					obj.setMinutes('0');
					obj.setSeconds('0');
				}

				return obj;
			}
		}
	}, {
		key: "format",
		value: function format(date, _format) {
			date = this.parse(date);

			if (!date) {
				return '';
			}

			if (typeof _format == 'undefined') {
				_format = 'long';
			}

			if (_format == 'input') {
				return moment(date).format('YYYY-MM-DD');
			} else if (_format == 'long') {
				return moment(date).format('LL');
			} else if (_format == 'longtime') {
				return moment(date).format('LLL');
			} else if (_format == 'short') {
				return this.app.lang === "en" ? moment(date).format('MMMM D') : moment(date).format('D MMMM');
			} else if (_format == 'longabbrmonth') {
				return moment(date).format('ll');
			} else if (_format == 'time') {
				var timeformat = 'LT';

				if ($.isPlainObject(this.app.config) && typeof this.app.config.time_format === "string") {
					timeformat = this.app.config.time_format === "24h" ? "HH:mm" : "hh:mm A";
				}
				return moment(date).format(timeformat);
			} else if (_format == 'dashboard') {
				return this.app.lang === "en" ? moment(date).format('dddd, MMMM D') : moment(date).format('dddd, D MMMM');
			}
			if (this.app.debug) {
				console.debug('Unknown date format "' + _format + '"');
			}
			return '';
		}
	}, {
		key: "getMonthName",
		value: function getMonthName(month) {

			if (typeof month == 'undefined' && arguments.length === 0) {
				month = moment().month();
			}

			var returnValue = moment.months(month);

			if ($.isArray(returnValue)) this.app._throw('Unknown month "' + month + '"');else return returnValue;
		}
	}, {
		key: "getAge",
		value: function getAge(date, now) {
			date = this.parse(date);
			now = this.parse(now) || new Date();
			if (date === false || date === '') {
				return '';
			}

			return parseInt(moment(now).diff(date, 'years'));
		}

		/**
   * get a fake birthdate for this age
   */

	}, {
		key: "getFakeBirthdate",
		value: function getFakeBirthdate(age) {
			age = parseInt(age);
			if (!age) return '';

			return moment().subtract(age, 'years').startOf('year').format('YYYY-MM-DD');
		}
	}, {
		key: "getInsuranceAge",
		value: function getInsuranceAge(date) {
			var date_obj = this.parse(date);

			if (date_obj) {
				var age = this.getAge(date);
				var lastBirthday = new Date();
				var now = new Date();
				var nextBirthday = new Date();

				lastBirthday.setMonth(date_obj.getMonth());
				lastBirthday.setDate(date_obj.getDate());

				nextBirthday.setMonth(date_obj.getMonth());
				nextBirthday.setDate(date_obj.getDate());

				if (now < lastBirthday) {
					lastBirthday.setFullYear(lastBirthday.getFullYear() - 1);
				}

				nextBirthday.setFullYear(lastBirthday.getFullYear() + 1);

				if (Math.abs(now - nextBirthday) < Math.abs(now - lastBirthday)) {
					age++;
				}
				date_obj = null;
				lastBirthday = null;
				now = null;
				nextBirthday = null;

				return age;
			} else return 0;
		}
	}, {
		key: "getYear",
		value: function getYear(date) {
			date = this.parse(date);

			if (date) {
				return moment(date).year();
			} else return 0;
		}
	}]);

	return DateHelper;
}();

exports.default = DateHelper;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _View2 = __webpack_require__(4);

var _View3 = _interopRequireDefault(_View2);

var _SaveDialog = __webpack_require__(14);

var _SaveDialog2 = _interopRequireDefault(_SaveDialog);

var _FetchService = __webpack_require__(0);

var _FetchService2 = _interopRequireDefault(_FetchService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditView = function (_View) {
	_inherits(EditView, _View);

	function EditView(app) {
		_classCallCheck(this, EditView);

		var _this = _possibleConstructorReturn(this, (EditView.__proto__ || Object.getPrototypeOf(EditView)).call(this, app));

		var self = _this;
		_this._can_save = true;
		_this._modified = false;
		_this._soft_modified = false;
		_this._validateSteps = [];

		_this.on('hook', function () {
			var $contentForm = $('#content form');

			$contentForm.on('change', ':input[name]:not(.no-form-change)', function () {
				self.changed(this);
			});

			$contentForm.on('keypress', ':input[type=text]:not(.no-form-change),:input[type=password]:not(.no-form-change)', function () {
				self.changed(this);
			});
			$('.number:not(.positive)').number();
			$('.number.positive').number({ positive: true });

			_this._initOnBeforeUnloadEvents();
		});

		_this.on('close', function () {
			$('#edit_form').off('**'); // FNA specific
			_this._restoreOnBeforeUnloadEvents();
		});

		_this.on('saveInit', function (saveResponse) {
			_this._restoreOnBeforeUnloadEvents();
		});

		_this.on('saveStart', function () {
			$('input[type=submit],input[type=button]').prop('disabled', true);

			_this.app.showOverlay();
		});

		_this.on('save', function (saveResponse) {
			if (saveResponse.cancel) {
				_this._initOnBeforeUnloadEvents();
			}
		});

		_this.on('saveEnd', function () {
			_this.app.hideOverlay();
			$('input[type=submit],input[type=button]').prop('disabled', false);
		});
		return _this;
	}

	_createClass(EditView, [{
		key: 'changed',
		value: function changed(element) {
			if (!this._modified) {
				this._modified = true;
			}
		}
	}, {
		key: 'softModified',
		value: function softModified() {
			if (!this._soft_modified) {
				this._soft_modified = true;
			}
		}
	}, {
		key: '_initOnBeforeUnloadEvents',
		value: function _initOnBeforeUnloadEvents() {
			var _this2 = this;

			var self = this;

			this._onBeforeUnloadBackup = window.onbeforeunload;

			var onBeforeUnload = function onBeforeUnload(event) {
				if (typeof _this2._onBeforeUnloadBackup !== 'undefined') {
					_this2._onBeforeUnloadBackup(event);
				}
				if (_this2._modified) {
					return _this2.app._('SAVE_CHANGES_MESSAGE');
				}
			};

			// Prevent IE to prompt that a change occured when clicking on a link with href=javascript:
			if (navigator.appName === 'Microsoft Internet Explorer') {
				$(document).on('mouseenter', 'a[href^="javascript:"]', function () {
					window.onbeforeunload = null;
				}).on('mouseleave', 'a[href^="javascript:"]', function () {
					window.onbeforeunload = onBeforeUnload;
				});
			}

			window.onbeforeunload = onBeforeUnload;
		}
	}, {
		key: '_restoreOnBeforeUnloadEvents',
		value: function _restoreOnBeforeUnloadEvents() {
			window.onbeforeunload = this._onBeforeUnloadBackup;
		}
	}, {
		key: 'inject',
		value: function inject(model) {
			if (this.app.debug) {
				console.debug('Injecting model');
			}

			this._soft_modified = false;

			this._inject(model);

			this._modified = false;
		}
	}, {
		key: 'close',
		value: function close() {
			var _this3 = this;

			if (this._closed) {
				// Already closed
				return Promise.resolve({ ok: true });
			}

			if (this._modified && this._can_save) {
				return this.showSaveDialog().then(function (saveDialogResponse) {
					if (saveDialogResponse.cancel) {
						return Promise.resolve({ cancel: true });
					}

					return _get(EditView.prototype.__proto__ || Object.getPrototypeOf(EditView.prototype), 'close', _this3).call(_this3);
				});
			}

			return _get(EditView.prototype.__proto__ || Object.getPrototypeOf(EditView.prototype), 'close', this).call(this);
		}
	}, {
		key: 'getSaveChangeDialogHtml',
		value: function getSaveChangeDialogHtml() {
			return '<div class="modal-dialog">' + '<h2>' + this.app._('SAVE_CHANGES_TITLE') + '</h2>' + '<p>' + this.app._('SAVE_CHANGES_MESSAGE') + '</p>' + '<p class="submit">' + '<a href="javascript:void(0);" id="hook_cancel_save_changes">' + this.app._('CANCEL') + '</a>' + '<input type="submit" id="hook_do_not_save_changes" value="' + this.app._('NO') + '" />' + '<input type="submit" id="hook_do_save_changes" value="' + this.app._('YES') + '" />' + '</p>' + '</div>';
		}
	}, {
		key: 'showSaveDialog',
		value: function showSaveDialog(callback) {
			var dialog = new _SaveDialog2.default(this);
			return dialog.show().then(function (response) {
				if (typeof callback === 'function') {
					callback(response);
				}
				return response;
			});
		}
	}, {
		key: 'save',
		value: function save() {
			var _this4 = this;

			var self = this;

			this.emit('saveInit');

			// When form is not allowed to save or not modified. Do nothing
			if (!this._can_save || !this._modified && !this._soft_modified) {
				return Promise.resolve({ ok: true });
			}
			return Promise.resolve(this.validate()).then(function (validateResponse) {
				if (!EditView.isValidateResponseValid(validateResponse)) {
					// Cancelled because of validations
					return Promise.resolve({ cancel: true, validateResponse: validateResponse });
				}

				_this4.emit('saveStart');

				// Perform save XHR
				var params = '&id=' + encodeURIComponent(_this4._id) + _this4._onSave();
				var url = _this4.app.getViewUrl(_this4._view, 'save', params);

				var fetchOptions = _this4._saveBuildPost();
				return _this4.app.fetchJson(url, fetchOptions).then(function (data) {
					if (!data) {
						data = {};
					}

					if (!_this4.handleServerSideValidationErrors(data)) {
						return Promise.resolve({ cancel: true });
					}

					if (data.status === 'error') {
						throw new _FetchService.FetchResponseDataError(data);
					}

					_this4._modified = false;

					return Promise.resolve({ ok: true, saved: true, data: data });
				}).finally(function () {
					_this4.emit('saveEnd');
				}).then(function (saveResponse) {
					_this4.emit('save', saveResponse);
					return saveResponse;
				});
			});
		}
	}, {
		key: 'handleServerSideValidationErrors',
		value: function handleServerSideValidationErrors(data) {
			var validationErrors = data.validation_errors;
			if (validationErrors === undefined) {
				validationErrors = data.data ? data.data.validation_errors : validationErrors;
			}
			if (validationErrors && validationErrors.length) {
				$.each(validationErrors, function (i, err) {
					$('#' + err.field).hintError(err.message);
				});

				false;
			}

			return true;
		}
	}, {
		key: 'showSaveErrorMessage',
		value: function showSaveErrorMessage() {
			this.app.showError(this.app._('SAVE_ERROR_OCCURED'));
		}
	}, {
		key: '_saveBuildPost',
		value: function _saveBuildPost(fetchOptions) {
			if (!fetchOptions) {
				fetchOptions = {};
			}

			var postString = '&model=' + encodeURIComponent(JSON.stringify(this.createModel()));
			fetchOptions = _FetchService2.default.addPostOptions(postString);
			return fetchOptions;
		}
	}, {
		key: 'validate',
		value: function validate() {
			// Return false as soon as a step return false. Do validation one step at a time.
			return this._validateSteps.reduce(function (previousStepPromise, stepFunction) {
				return previousStepPromise.then(function (previousStepResult) {
					if (!EditView.isValidateResponseValid(previousStepResult)) {
						// Form is invalid
						return previousStepResult;
					}

					// Run next step of validation
					return stepFunction();
				});
			}, Promise.resolve({ ok: true }));
		}
	}, {
		key: 'addValidateStep',


		/**
   * Add a validation step
   * fn should be a function returning promise for a boolean or a boolean indicating validation success.
   */
		value: function addValidateStep(callback) {
			this._validateSteps.push(callback);
		}
	}, {
		key: '_onSave',
		value: function _onSave() {
			return '';
		}
	}, {
		key: 'createModel',
		value: function createModel() {
			var self = this;
			var model = {};

			$("form input[name],select[name],textarea[name]").each(function (index, element) {
				var value = $(element).val();

				if (element.type == "radio" || element.type == "checkbox") {
					if (element.checked) {
						if (value == 'on') {
							model[element.name] = 'YES';
						} else {
							model[element.name] = value;
						}
					}
				} else if ($(element).hasClass('money')) {
					model[element.name] = $(element).moneyVal();
				} else if ($(element).hasClass('percent')) {
					model[element.name] = self.app.parseFloat(value.replace("%", ""));
				} else if ($(element).hasClass('number')) {
					model[element.name] = self.app.parseFloat(value);
				} else {
					model[element.name] = value;
				}
			});

			if (this._onCreateModel) {
				model = this._onCreateModel(model);
			}

			model = this._removeNullValue(model);

			return model;
		}
	}, {
		key: '_onCreateModel',
		value: function _onCreateModel(model) {
			return model;
		}
	}, {
		key: '_removeNullValue',
		value: function _removeNullValue(model) {
			if ((typeof model === 'undefined' ? 'undefined' : _typeof(model)) == "object") {
				for (var index in model) {
					model[index] = this._removeNullValue(model[index]);
				}
			} else if (!model) {
				model = '';
			}

			return model;
		}
	}], [{
		key: 'isValidateResponseValid',
		value: function isValidateResponseValid(validateResponse) {
			if (typeof validateResponse === 'undefined') {
				return false;
			}

			if (typeof validateResponse === 'boolean') {
				return validateResponse;
			}

			return !!validateResponse.ok;
		}
	}]);

	return EditView;
}(_View3.default);

exports.default = EditView;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Router = function () {
	function Router(routes) {
		_classCallCheck(this, Router);

		this.routes = routes;
	}

	_createClass(Router, [{
		key: 'getClass',
		value: function getClass(path) {
			var _this = this;

			return new Promise(function (resolve, reject) {
				_this.routes.forEach(function (route) {
					if (Router.testRoute(path, route)) {
						resolve(route.getClass());
					}
				});

				reject('No route match:"' + path + '"');
			});
		}
	}], [{
		key: 'testRoute',
		value: function testRoute(path, route) {
			if (route.match && route.match === path) {
				return true;
			}

			if (route.match instanceof RegExp && path.match(route.match)) {
				return true;
			}

			return false;
		}
	}]);

	return Router;
}();

exports.default = Router;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (jQuery, app) {
	return {
		alternateText: function alternateText(value, alternate_value) {
			this.text(value && value !== '' ? value : alternate_value);

			return this;
		},
		numberText: function numberText(value) {
			var text = app.formatNumber(value);
			this.text(text === '' ? '0' : text);
			return this;
		},
		moneyText: function moneyText(value) {
			this.text(app.formatMoney(value));

			return this;
		},
		dateText: function dateText(value) {
			this.text(app.date.format(value));

			return this;
		},
		durationVal: function durationVal(months_duration) {
			var text = void 0;
			if (!isFinite(months_duration)) {
				text = '';
			} else {
				var sign = months_duration < 0 ? '-' : '';
				var years = Math.floor(Math.abs(months_duration) / 12);
				var months = Math.abs(months_duration) - 12 * years;
				text = sign + (years === 0 ? '' : (years === 1 ? app._('YEARD').replace('%{years}', years) : app._('YEARSD').replace('%{years}', years)) + ' ') + (months === 0 ? '' : months === 1 ? app._('MONTHD').replace('%{months}', months) : app._('MONTHSD').replace('%{months}', months));
			}
			this.val(text);

			return this;
		},
		booleanText: function booleanText(value) {
			if (value === 'YES') {
				value = app._('YES');
			} else if (value === 'NO') {
				value = app._('NO');
			} else {
				value = '-';
			}

			this.text(value);

			return this;
		},
		dateVal: function dateVal(value) {
			this.val(app.date.format(value, 'input'));

			return this;
		},
		safeClick: function safeClick(fn) {
			this.click(function (eventObject) {
				if (!this.__clicked) {
					this.__clicked = true;

					fn.call(this, eventObject);

					var t = this;
					setTimeout(function () {
						t.__clicked = false;
					}, 500);
				} else if (app.debug) {
					console.debug('catched double click');
				}
			});

			return this;
		},
		numberVal: function numberVal(value, opts) {
			if (arguments.length > 0) {
				return jQuery(this).val(app.formatNumber(value, opts));
			}

			var val = app.parseFloat(this.val());

			if (jQuery(this).hasClass('positive') && jQuery(this).hasClass('number')) {
				if (val < 0) {
					return 0;
				}

				return val;
			}

			return val;
		},
		number: function number(opts) {

			return jQuery(this).each(function () {
				jQuery(this).addClass('number');
				jQuery(this).val(app.formatNumber(jQuery(this).val(), opts));

				jQuery(this).blur(function () {
					jQuery(this).val(app.formatNumber(jQuery(this).val(), opts));
				});
			});
		},
		moneyVal: function moneyVal(value, opts) {
			if (arguments.length > 0) {
				if (jQuery(this).hasClass('money')) {
					jQuery(this).data('val', app.parseFloat(value.replace('$', '')));
					return jQuery(this).val(app.formatMoney(value, opts));
				}

				return jQuery(this).val(app.formatMoney(value, opts));
			} else if (jQuery(this).hasClass('money')) {
				var val = jQuery(this).data('val');

				if (jQuery(this).hasClass('positive') && val < 0) {
					return 0;
				}

				return val;
			}

			return app.parseFloat(jQuery(this).val().replace('$', ''));
		},
		money: function money(opts) {
			return jQuery(this).each(function () {
				var $t = jQuery(this);
				$t.addClass('money');

				$t.focus(function () {
					jQuery(this).val(jQuery(this).data('val'));
					return this;
				});
				jQuery(this).click(function () {
					jQuery(this).select();
				});
				jQuery(this).blur(function () {
					var val = void 0;
					var value = jQuery(this).val();
					if (opts && opts.canBeNull && (value === '' || value === null)) {
						val = '';
					} else {
						val = app.parseFloat(value.replace('$', ''));
						if (opts && opts.true_precision) {
							if (opts.rounded) {
								val = Math.round(val * Math.pow(10, opts.true_precision)) / Math.pow(10, opts.true_precision);
							} else {
								val = Math.floor(val * Math.pow(10, opts.true_precision)) / Math.pow(10, opts.true_precision);
							}
						}
					}
					jQuery(this).data('val', val);
					jQuery(this).val(app.formatMoney(val, opts));
					return this;
				});
				if ($t.val() !== '') {
					$t.blur();
				}
			});
		},
		percentVal: function percentVal(value, opts) {
			if (arguments.length > 0) {
				return jQuery(this).val(app.formatPercent(value, opts));
			}

			var val = app.parseFloat(this.val().replace('%', ''));

			if (jQuery(this).hasClass('positive') && jQuery(this).hasClass('percent')) {
				if (val < 0) {
					return 0;
				}

				return val;
			}

			return val;
		},
		percent: function percent(opts) {
			return jQuery(this).each(function () {
				jQuery(this).addClass('percent');
				jQuery(this).val(app.formatPercent(jQuery(this).val(), opts));

				jQuery(this).blur(function () {
					jQuery(this).val(app.formatPercent(jQuery(this).val(), opts));
				});
			});
		},
		SIN: function SIN() {
			return jQuery(this).each(function () {
				jQuery(this).val(app.formatSIN(jQuery(this).val()));

				jQuery(this).blur(function () {
					this.value = app.formatSIN(jQuery(this).val());
				});
			});
		},
		datepickerInput: function datepickerInput(interval) {
			return jQuery(this).each(function () {
				var $this = jQuery(this);
				var $calendar_button = $this.next('.btn.calendar');
				if ($this.next('.btn.calendar').length === 0) {
					$calendar_button = $('<a href="javascript:void(0);" class="btn calendar" tabindex=-1><span class="icon"></span></a>');
				}
				$this.after($calendar_button);

				if ($.browser.msie) {
					$this.before($('<div class="clear"></div>'));
				}

				if ($this.width()) {
					$this.css('width', '-=' + $calendar_button.outerWidth(true)).attr('autocomplete', 'off');
				}

				// init datepicker
				if (typeof interval !== 'undefined') {
					var config = $.extend({
						dateFormat: 'yy-mm-dd',
						onClose: function onClose(value) {
							try {
								var parsed_date = $.datepicker.parseDate('yymmdd', value);
								jQuery(this).val($.datepicker.formatDate('yy-mm-dd', parsed_date));
							} catch (e) {
								jQuery(this).val(value);
							}
						}
					}, interval);
					$this.datepicker(config);
				} else {
					$this.datepicker({
						dateFormat: 'yy-mm-dd',
						onClose: function onClose(value) {
							try {
								var parsed_date = $.datepicker.parseDate('yymmdd', value);
								jQuery(this).val($.datepicker.formatDate('yy-mm-dd', parsed_date));
							} catch (e) {
								jQuery(this).val(value);
							}
						}
					});
				}

				// bind custom button attached to the input
				$calendar_button.bind('click', function (e) {
					e.preventDefault();
					if ($this.datepicker('widget').is(':hidden')) {
						$this.datepicker('show');
					}
				});
			});
		},
		hint: function hint(text, width) {
			var w = Math.max(parseInt(width, 10), 200);

			return jQuery(this).wrap('<span class="hinted"></span>').after('<span class="hint" style="width: ' + w + 'px; right: -' + (w + 50) + 'px;">' + text + '<span class="hint-pointer sprite">&nbsp;</span></span>').focus(function () {
				var t = this;
				t._focus_timeout = setTimeout(function () {
					$(t).next('.hint').fadeIn();
				}, 1000);
			}).blur(function () {
				if (this._focus_timeout) {
					clearTimeout(this._focus_timeout);
				}

				jQuery(this).next('.hint').fadeOut();
			}).keypress(function () {
				if (this._focus_timeout) {
					clearTimeout(this._focus_timeout);
				}

				jQuery(this).next('.hint').fadeOut();
			});
		},
		unhint: function unhint() {
			if (jQuery(this).parent().hasClass('hinted')) {
				jQuery(this).next('.hint').remove();
				jQuery(this).unwrap();
			} else if (jQuery(this).parent().find('.hinted')) {
				jQuery(this).next('.hint').remove();
			}

			return this;
		},
		hintError: function hintError(text, width, dont_show) {
			var blurFocusTarget = void 0;
			var $this = jQuery(this);

			if ($this.combobox && $this.combobox('instance') !== undefined) {
				$this = $this.combobox('instance').input;
				$this.data('isCombobox', true);
			}

			var target = $this;

			if (target.data('blur-field')) {
				blurFocusTarget = $('#' + target.data('blur-field'));
			} else {
				blurFocusTarget = target;
			}
			var hintedWrapperClasses = ['hinted'];

			if ($this.data('is-textbox')) {
				if ($this.next().is('.hinted')) {
					target = $this.next().find('.textboxlist');
				} else {
					target = $this.next('.textboxlist');
				}
				target.find('.textboxlist-bit-box-deletable').blur(function () {
					target.next('.hint').fadeOut();
				}).focus(function () {
					target.next('.hint').fadeIn();
				}).change(function () {
					$(target).handleHintErrorChange();
				});
			}

			if ($this.data('is-textbox') || target.hasClass('textboxlist')) {
				hintedWrapperClasses.push('contain-textbox');
				blurFocusTarget = target.find('.textboxlist-bit-editable-input');
			}
			target.unhint();
			target.addClass('save_warning');
			if (!target.data('no-hinted-span')) {
				target.wrap('<span class="' + hintedWrapperClasses.join(' ') + '"></span>');
			}

			target.after('<span class="hint">' + text + '<span class="hint-pointer sprite">&nbsp;</span></span>');

			blurFocusTarget.blur(function () {
				target.next('.hint').fadeOut();
			}).focus(function () {
				target.next('.hint').fadeIn();
			}).change(function () {
				$(target).handleHintErrorChange();
			});

			target.data('hint', target.next('.hint'));
			target.setHintErrorWidth(width);
			target.setHintErrorPosition();

			if (target.data('extra-hint-classes')) {
				target.parents('.hinted').addClass(target.data('extra-hint-classes'));
			}

			target.data('hint').click(function (e) {
				e.preventDefault();
				e.stopPropagation();
				jQuery(this).fadeOut();
			});

			if (!dont_show) {
				target.data('hint').fadeIn();
			}

			return target;
		},
		handleHintErrorChange: function handleHintErrorChange() {
			jQuery(this).unhint().removeClass('save_warning');
		},
		setHintErrorWidth: function setHintErrorWidth(width) {
			var w = Math.max(parseInt(width, 10), 200);

			jQuery(this).next('.hint').css({
				width: w
			});

			return jQuery(this);
		},
		setHintErrorPosition: function setHintErrorPosition() {
			var r = -(parseInt(jQuery(this).data('hint').css('width')) + 50);

			jQuery(this).data('hint').css({
				right: r
			});

			return jQuery(this);
		},
		signal: function signal(length) {
			length = parseInt(length);
			if (length <= 0) {
				length = 500;
			}

			return jQuery(this).each(function () {
				jQuery(this).addClass('signal');
				var t = this;
				setTimeout(function () {
					$(t).removeClass('signal');
				}, length);
			});
		},
		checkVal: function checkVal() {
			if (arguments.length > 0) {
				var checked = false;
				if (arguments[0] == 'YES' || arguments[0] === true) {
					checked = true;
				}

				this.prop('checked', checked);
				return this;
			}

			return this.val();
		},
		toggleDisabled: function toggleDisabled(disabledVal, toggleClass) {
			if (toggleClass === undefined) {
				toggleClass = true;
			}

			if (disabledVal) {
				this.attr('disabled', 'disabled');
				if (toggleClass) {
					this.addClass('disabled');
				}
			} else {
				this.removeAttr('disabled');
				if (toggleClass) {
					this.removeClass('disabled');
				}
			}
		},
		getClasses: function getClasses() {
			var all_classes = [];
			jQuery(this).each(function () {
				var classes = jQuery(this).attr('class').split(' ');

				for (var k in classes) {
					var found = false;
					for (var i in all_classes) {
						if (all_classes[i] == classes[k]) {
							found = true;
						}
					}

					if (!found) {
						all_classes.push(classes[k]);
					}
				}
			});

			return all_classes;
		}
	};
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var replacementList = [{
	base: ' ',
	chars: '\xA0'
}, {
	base: '0',
	chars: '\u07C0'
}, {
	base: 'A',
	chars: '\u24B6\uFF21\xC0\xC1\xC2\u1EA6\u1EA4\u1EAA\u1EA8\xC3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\xC4\u01DE\u1EA2\xC5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F'
}, {
	base: 'AA',
	chars: '\uA732'
}, {
	base: 'AE',
	chars: '\xC6\u01FC\u01E2'
}, {
	base: 'AO',
	chars: '\uA734'
}, {
	base: 'AU',
	chars: '\uA736'
}, {
	base: 'AV',
	chars: '\uA738\uA73A'
}, {
	base: 'AY',
	chars: '\uA73C'
}, {
	base: 'B',
	chars: '\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0181'
}, {
	base: 'C',
	chars: '\uFF43\u24B8\uFF23\uA73E\u1E08'
}, {
	base: 'D',
	chars: '\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018A\u0189\u1D05\uA779'
}, {
	base: 'Dh',
	chars: '\xD0'
}, {
	base: 'DZ',
	chars: '\u01F1\u01C4'
}, {
	base: 'Dz',
	chars: '\u01F2\u01C5'
}, {
	base: 'E',
	chars: '\u025B\u24BA\uFF25\xC8\xC9\xCA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\xCB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E\u1D07'
}, {
	base: 'F',
	chars: '\uA77C\u24BB\uFF26\u1E1E\u0191\uA77B'
}, {
	base: 'G',
	chars: '\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E\u0262'
}, {
	base: 'H',
	chars: '\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D'
}, {
	base: 'I',
	chars: '\u24BE\uFF29\xCC\xCD\xCE\u0128\u012A\u012C\u0130\xCF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197'
}, {
	base: 'J',
	chars: '\u24BF\uFF2A\u0134\u0248\u0237'
}, {
	base: 'K',
	chars: '\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2'
}, {
	base: 'L',
	chars: '\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780'
}, {
	base: 'LJ',
	chars: '\u01C7'
}, {
	base: 'Lj',
	chars: '\u01C8'
}, {
	base: 'M',
	chars: '\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C\u03FB'
}, {
	base: 'N',
	chars: '\uA7A4\u0220\u24C3\uFF2E\u01F8\u0143\xD1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u019D\uA790\u1D0E'
}, {
	base: 'NJ',
	chars: '\u01CA'
}, {
	base: 'Nj',
	chars: '\u01CB'
}, {
	base: 'O',
	chars: '\u24C4\uFF2F\xD2\xD3\xD4\u1ED2\u1ED0\u1ED6\u1ED4\xD5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\xD6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\xD8\u01FE\u0186\u019F\uA74A\uA74C'
}, {
	base: 'OE',
	chars: '\u0152'
}, {
	base: 'OI',
	chars: '\u01A2'
}, {
	base: 'OO',
	chars: '\uA74E'
}, {
	base: 'OU',
	chars: '\u0222'
}, {
	base: 'P',
	chars: '\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754'
}, {
	base: 'Q',
	chars: '\u24C6\uFF31\uA756\uA758\u024A'
}, {
	base: 'R',
	chars: '\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782'
}, {
	base: 'S',
	chars: '\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784'
}, {
	base: 'T',
	chars: '\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786'
}, {
	base: 'Th',
	chars: '\xDE'
}, {
	base: 'TZ',
	chars: '\uA728'
}, {
	base: 'U',
	chars: '\u24CA\uFF35\xD9\xDA\xDB\u0168\u1E78\u016A\u1E7A\u016C\xDC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244'
}, {
	base: 'V',
	chars: '\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245'
}, {
	base: 'VY',
	chars: '\uA760'
}, {
	base: 'W',
	chars: '\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72'
}, {
	base: 'X',
	chars: '\u24CD\uFF38\u1E8A\u1E8C'
}, {
	base: 'Y',
	chars: '\u24CE\uFF39\u1EF2\xDD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE'
}, {
	base: 'Z',
	chars: '\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762'
}, {
	base: 'a',
	chars: '\u24D0\uFF41\u1E9A\xE0\xE1\xE2\u1EA7\u1EA5\u1EAB\u1EA9\xE3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\xE4\u01DF\u1EA3\xE5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250\u0251'
}, {
	base: 'aa',
	chars: '\uA733'
}, {
	base: 'ae',
	chars: '\xE6\u01FD\u01E3'
}, {
	base: 'ao',
	chars: '\uA735'
}, {
	base: 'au',
	chars: '\uA737'
}, {
	base: 'av',
	chars: '\uA739\uA73B'
}, {
	base: 'ay',
	chars: '\uA73D'
}, {
	base: 'b',
	chars: '\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253\u0182'
}, {
	base: 'c',
	chars: '\u24D2\u0107\u0109\u010B\u010D\xE7\u1E09\u0188\u023C\uA73F\u2184C\u0106\u0108\u010A\u010C\xC7\u0187\u023B'
}, {
	base: 'd',
	chars: '\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\u018B\u13E7\u0501\uA7AA'
}, {
	base: 'dh',
	chars: '\xF0'
}, {
	base: 'dz',
	chars: '\u01F3\u01C6'
}, {
	base: 'e',
	chars: '\u24D4\uFF45\xE8\xE9\xEA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\xEB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u01DD'
}, {
	base: 'f',
	chars: '\u24D5\uFF46\u1E1F\u0192'
}, {
	base: 'ff',
	chars: '\uFB00'
}, {
	base: 'fi',
	chars: '\uFB01'
}, {
	base: 'fl',
	chars: '\uFB02'
}, {
	base: 'ffi',
	chars: '\uFB03'
}, {
	base: 'ffl',
	chars: '\uFB04'
}, {
	base: 'g',
	chars: '\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\uA77F\u1D79'
}, {
	base: 'h',
	chars: '\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265'
}, {
	base: 'hv',
	chars: '\u0195'
}, {
	base: 'i',
	chars: '\u24D8\uFF49\xEC\xED\xEE\u0129\u012B\u012D\xEF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131'
}, {
	base: 'j',
	chars: '\u24D9\uFF4A\u0135\u01F0\u0249'
}, {
	base: 'k',
	chars: '\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3'
}, {
	base: 'l',
	chars: '\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747\u026D'
}, {
	base: 'lj',
	chars: '\u01C9'
}, {
	base: 'm',
	chars: '\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F'
}, {
	base: 'n',
	chars: '\u24DD\uFF4E\u01F9\u0144\xF1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5\u043B\u0509'
}, {
	base: 'nj',
	chars: '\u01CC'
}, {
	base: 'o',
	chars: '\u24DE\uFF4F\xF2\xF3\xF4\u1ED3\u1ED1\u1ED7\u1ED5\xF5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\xF6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\xF8\u01FF\uA74B\uA74D\u0275\u0254\u1D11'
}, {
	base: 'oe',
	chars: '\u0153'
}, {
	base: 'oi',
	chars: '\u01A3'
}, {
	base: 'oo',
	chars: '\uA74F'
}, {
	base: 'ou',
	chars: '\u0223'
}, {
	base: 'p',
	chars: '\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755\u03C1'
}, {
	base: 'q',
	chars: '\u24E0\uFF51\u024B\uA757\uA759'
}, {
	base: 'r',
	chars: '\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783'
}, {
	base: 's',
	chars: '\u24E2\uFF53\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B\u0282'
}, {
	base: 'ss',
	chars: "\xDF"
}, {
	base: 't',
	chars: '\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787'
}, {
	base: 'th',
	chars: '\xFE'
}, {
	base: 'tz',
	chars: '\uA729'
}, {
	base: 'u',
	chars: '\u24E4\uFF55\xF9\xFA\xFB\u0169\u1E79\u016B\u1E7B\u016D\xFC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289'
}, {
	base: 'v',
	chars: '\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C'
}, {
	base: 'vy',
	chars: '\uA761'
}, {
	base: 'w',
	chars: '\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73'
}, {
	base: 'x',
	chars: '\u24E7\uFF58\u1E8B\u1E8D'
}, {
	base: 'y',
	chars: '\u24E8\uFF59\u1EF3\xFD\u0177\u1EF9\u0233\u1E8F\xFF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF'
}, {
	base: 'z',
	chars: '\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763'
}];

var diacriticsMap = {};
for (var i = 0; i < replacementList.length; i += 1) {
	var chars = replacementList[i].chars;
	for (var j = 0; j < chars.length; j += 1) {
		diacriticsMap[chars[j]] = replacementList[i].base;
	}
}

function removeDiacritics(str) {
	return str.replace(/[^\u0000-\u007e]/g, function (c) {
		return diacriticsMap[c] || c;
	});
}

exports.default = removeDiacritics;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = sprintf;
function convert(match, nosign) {
	if (nosign) {
		match.sign = '';
	} else {
		match.sign = match.negative ? '-' : match.sign;
	}
	var l = match.min - match.argument.length + 1 - match.sign.length;
	var pad = new Array(l < 0 ? 0 : l).join(match.pad);
	if (!match.left) {
		if (match.pad == "0" || nosign) {
			return match.sign + pad + match.argument;
		} else {
			return pad + match.sign + match.argument;
		}
	} else {
		if (match.pad == "0" || nosign) {
			return match.sign + match.argument + pad.replace(/0/g, ' ');
		} else {
			return match.sign + match.argument + pad;
		}
	}
}

function sprintf() {
	if (typeof arguments == "undefined") {
		return null;
	}
	if (arguments.length < 1) {
		return null;
	}
	if (typeof arguments[0] != "string") {
		return null;
	}
	if (typeof RegExp == "undefined") {
		return null;
	}

	var string = arguments[0];
	var exp = new RegExp(/(%([%]|(\-)?(\+|\x20)?(0)?(\d+)?(\.(\d)?)?([bcdfosxX])))/g);
	var matches = [];
	var strings = [];
	var convCount = 0;
	var stringPosStart = 0;
	var stringPosEnd = 0;
	var matchPosEnd = 0;
	var newString = '';
	var match = null;

	while (match = exp.exec(string)) {
		if (match[9]) {
			convCount += 1;
		}

		stringPosStart = matchPosEnd;
		stringPosEnd = exp.lastIndex - match[0].length;
		strings[strings.length] = string.substring(stringPosStart, stringPosEnd);

		matchPosEnd = exp.lastIndex;
		matches[matches.length] = {
			match: match[0],
			left: match[3] ? true : false,
			sign: match[4] || '',
			pad: match[5] || ' ',
			min: match[6] || 0,
			precision: match[8],
			code: match[9] || '%',
			negative: parseInt(arguments[convCount]) < 0 ? true : false,
			argument: String(arguments[convCount])
		};
	}
	strings[strings.length] = string.substring(matchPosEnd);

	if (matches.length === 0) {
		return string;
	}
	if (arguments.length - 1 < convCount) {
		return null;
	}

	match = null;

	var i = void 0;
	for (i = 0; i < matches.length; i++) {
		var substitution = void 0;
		if (matches[i].code == '%') {
			substitution = '%';
		} else if (matches[i].code == 'b') {
			matches[i].argument = String(Math.abs(parseInt(matches[i].argument, 10)).toString(2));
			substitution = convert(matches[i], true);
		} else if (matches[i].code == 'c') {
			matches[i].argument = String(String.fromCharCode(parseInt(Math.abs(parseInt(matches[i].argument, 10)))));
			substitution = convert(matches[i], true);
		} else if (matches[i].code == 'd') {
			matches[i].argument = String(Math.abs(parseInt(matches[i].argument, 10)));
			substitution = convert(matches[i]);
		} else if (matches[i].code == 'f') {
			matches[i].argument = String(Math.abs(parseFloat(matches[i].argument, 10)).toFixed(matches[i].precision ? matches[i].precision : 6));
			substitution = convert(matches[i]);
		} else if (matches[i].code == 'o') {
			matches[i].argument = String(Math.abs(parseInt(matches[i].argument, 10)).toString(8));
			substitution = convert(matches[i]);
		} else if (matches[i].code == 's') {
			matches[i].argument = matches[i].argument.substring(0, matches[i].precision ? matches[i].precision : matches[i].argument.length);
			substitution = convert(matches[i], true);
		} else if (matches[i].code == 'x') {
			matches[i].argument = String(Math.abs(parseInt(matches[i].argument, 10)).toString(16));
			substitution = convert(matches[i]);
		} else if (matches[i].code == 'X') {
			matches[i].argument = String(Math.abs(parseInt(matches[i].argument, 10)).toString(16));
			substitution = convert(matches[i]).toUpperCase();
		} else {
			substitution = matches[i].match;
		}

		newString += strings[i];
		newString += substitution;
	}

	newString += strings[i];
	return newString;
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SaveDialog = function () {
	function SaveDialog(view) {
		_classCallCheck(this, SaveDialog);

		this.view = view;
		this.app = view.app;
	}

	_createClass(SaveDialog, [{
		key: 'show',
		value: function show() {
			var _this = this;

			return this.app.showModalDialog(this.getHtml(), 'normal').then(function ($wrapper) {
				return _this.hookCommands($wrapper);
			});
		}
	}, {
		key: 'hookCommands',
		value: function hookCommands($wrapper) {
			var _this2 = this;

			return Promise.race([this.hookDialogButton($wrapper, '#hook_do_save_changes').then(function () {
				return _this2.doSave();
			}), this.hookDialogButton($wrapper, '#hook_do_not_save_changes').then(function () {
				return _this2.doNotSave();
			}), this.hookDialogButton($wrapper, '#hook_cancel_save_changes').then(function () {
				return _this2.doCancel();
			})]);
		}
	}, {
		key: 'hookDialogButton',
		value: function hookDialogButton($wrapper, selector) {
			var _this3 = this;

			return new Promise(function (resolve) {
				$wrapper.find(selector).safeClick(resolve);
			}).then(function () {
				return _this3.app.hideModalDialog('normal');
			});
		}
	}, {
		key: 'doSave',
		value: function doSave() {
			return this.view.save();
		}
	}, {
		key: 'doNotSave',
		value: function doNotSave() {
			return Promise.resolve({ ok: true });
		}
	}, {
		key: 'doCancel',
		value: function doCancel() {
			return Promise.resolve({ cancel: true });
		}
	}, {
		key: 'getHtml',
		value: function getHtml() {
			return this.view.getSaveChangeDialogHtml();
		}
	}]);

	return SaveDialog;
}();

exports.default = SaveDialog;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jQueryExtend = __webpack_require__(11);

var _jQueryExtend2 = _interopRequireDefault(_jQueryExtend);

var _sprintf = __webpack_require__(13);

var _sprintf2 = _interopRequireDefault(_sprintf);

var _Application = __webpack_require__(2);

var _Application2 = _interopRequireDefault(_Application);

var _View = __webpack_require__(4);

var _View2 = _interopRequireDefault(_View);

var _EditView = __webpack_require__(9);

var _EditView2 = _interopRequireDefault(_EditView);

var _DateHelper = __webpack_require__(8);

var _DateHelper2 = _interopRequireDefault(_DateHelper);

var _removeDiacritics = __webpack_require__(12);

var _removeDiacritics2 = _interopRequireDefault(_removeDiacritics);

var _Router = __webpack_require__(10);

var _Router2 = _interopRequireDefault(_Router);

var _BrowserDetect = __webpack_require__(3);

var _BrowserDetect2 = _interopRequireDefault(_BrowserDetect);

var _AsyncTask = __webpack_require__(7);

var _AsyncTask2 = _interopRequireDefault(_AsyncTask);

var _FetchService = __webpack_require__(0);

var _FetchService2 = _interopRequireDefault(_FetchService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
	Application: _Application2.default,
	View: _View2.default,
	EditView: _EditView2.default,
	Router: _Router2.default,
	sprintf: _sprintf2.default,
	DateHelper: _DateHelper2.default,
	removeDiacritics: _removeDiacritics2.default,
	jQueryExtend: _jQueryExtend2.default,
	BrowserDetect: _BrowserDetect2.default,
	AsyncTask: _AsyncTask2.default,
	FetchService: _FetchService2.default,
	FetchAbortError: _FetchService.FetchAbortError,
	FetchResponseDataError: _FetchService.FetchResponseDataError,
	externals: {
		jquery: 'jQuery',
		'raven-js': 'raven-js'
	}
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extendableBuiltin(cls) {
  function ExtendableBuiltin() {
    cls.apply(this, arguments);
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

var ExtendableError = function (_extendableBuiltin2) {
  _inherits(ExtendableError, _extendableBuiltin2);

  function ExtendableError() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    _classCallCheck(this, ExtendableError);

    // extending Error is weird and does not propagate `message`
    var _this = _possibleConstructorReturn(this, (ExtendableError.__proto__ || Object.getPrototypeOf(ExtendableError)).call(this, message));

    Object.defineProperty(_this, 'message', {
      configurable: true,
      enumerable: false,
      value: message,
      writable: true
    });

    Object.defineProperty(_this, 'name', {
      configurable: true,
      enumerable: false,
      value: _this.constructor.name,
      writable: true
    });

    if (Error.hasOwnProperty('captureStackTrace')) {
      Error.captureStackTrace(_this, _this.constructor);
      return _possibleConstructorReturn(_this);
    }

    Object.defineProperty(_this, 'stack', {
      configurable: true,
      enumerable: false,
      value: new Error(message).stack,
      writable: true
    });
    return _this;
  }

  return ExtendableError;
}(_extendableBuiltin(Error));

exports.default = ExtendableError;
module.exports = exports['default'];


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * @preserve jquery-param (c) 2015 KNOWLEDGECODE | MIT
 */
(function (global) {
    'use strict';

    var param = function (a) {
        var s = [], rbracket = /\[\]$/,
            isArray = function (obj) {
                return Object.prototype.toString.call(obj) === '[object Array]';
            }, add = function (k, v) {
                v = typeof v === 'function' ? v() : v === null ? '' : v === undefined ? '' : v;
                s[s.length] = encodeURIComponent(k) + '=' + encodeURIComponent(v);
            }, buildParams = function (prefix, obj) {
                var i, len, key;

                if (prefix) {
                    if (isArray(obj)) {
                        for (i = 0, len = obj.length; i < len; i++) {
                            if (rbracket.test(prefix)) {
                                add(prefix, obj[i]);
                            } else {
                                buildParams(prefix + '[' + (typeof obj[i] === 'object' ? i : '') + ']', obj[i]);
                            }
                        }
                    } else if (obj && String(obj) === '[object Object]') {
                        for (key in obj) {
                            buildParams(prefix + '[' + key + ']', obj[key]);
                        }
                    } else {
                        add(prefix, obj);
                    }
                } else if (isArray(obj)) {
                    for (i = 0, len = obj.length; i < len; i++) {
                        add(obj[i].name, obj[i].value);
                    }
                } else {
                    for (key in obj) {
                        buildParams(key, obj[key]);
                    }
                }
                return s;
            };

        return buildParams('', a).join('&').replace(/%20/g, '+');
    };

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = param;
    } else if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
            return param;
        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {
        global.param = param;
    }

}(this));



/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function RavenConfigError(message) {
    this.name = 'RavenConfigError';
    this.message = message;
}
RavenConfigError.prototype = new Error();
RavenConfigError.prototype.constructor = RavenConfigError;

module.exports = RavenConfigError;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var wrapMethod = function(console, level, callback) {
    var originalConsoleLevel = console[level];
    var originalConsole = console;

    if (!(level in console)) {
        return;
    }

    var sentryLevel = level === 'warn'
        ? 'warning'
        : level;

    console[level] = function () {
        var args = [].slice.call(arguments);

        var msg = '' + args.join(' ');
        var data = {level: sentryLevel, logger: 'console', extra: {'arguments': args}};
        callback && callback(msg, data);

        // this fails for some browsers. :(
        if (originalConsoleLevel) {
            // IE9 doesn't allow calling apply on console functions directly
            // See: https://stackoverflow.com/questions/5472938/does-ie9-support-console-log-and-is-it-a-real-function#answer-5473193
            Function.prototype.apply.call(
                originalConsoleLevel,
                originalConsole,
                args
            );
        }
    };
};

module.exports = {
    wrapMethod: wrapMethod
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*global XDomainRequest:false, __DEV__:false*/


var TraceKit = __webpack_require__(22);
var stringify = __webpack_require__(23);
var RavenConfigError = __webpack_require__(18);
var utils = __webpack_require__(6);

var isError = utils.isError,
    isObject = utils.isObject;

var wrapConsoleMethod = __webpack_require__(19).wrapMethod;

var dsnKeys = 'source protocol user pass host port path'.split(' '),
    dsnPattern = /^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/;

function now() {
    return +new Date();
}

// This is to be defensive in environments where window does not exist (see https://github.com/getsentry/raven-js/pull/785)
var _window = typeof window !== 'undefined' ? window
            : typeof global !== 'undefined' ? global
            : typeof self !== 'undefined' ? self
            : {};
var _document = _window.document;
var _navigator = _window.navigator;

// First, check for JSON support
// If there is no JSON, we no-op the core features of Raven
// since JSON is required to encode the payload
function Raven() {
    this._hasJSON = !!(typeof JSON === 'object' && JSON.stringify);
    // Raven can run in contexts where there's no document (react-native)
    this._hasDocument = !isUndefined(_document);
    this._hasNavigator = !isUndefined(_navigator);
    this._lastCapturedException = null;
    this._lastData = null;
    this._lastEventId = null;
    this._globalServer = null;
    this._globalKey = null;
    this._globalProject = null;
    this._globalContext = {};
    this._globalOptions = {
        logger: 'javascript',
        ignoreErrors: [],
        ignoreUrls: [],
        whitelistUrls: [],
        includePaths: [],
        crossOrigin: 'anonymous',
        collectWindowErrors: true,
        maxMessageLength: 0,

        // By default, truncates URL values to 250 chars
        maxUrlLength: 250,
        stackTraceLimit: 50,
        autoBreadcrumbs: true,
        instrument: true,
        sampleRate: 1
    };
    this._ignoreOnError = 0;
    this._isRavenInstalled = false;
    this._originalErrorStackTraceLimit = Error.stackTraceLimit;
    // capture references to window.console *and* all its methods first
    // before the console plugin has a chance to monkey patch
    this._originalConsole = _window.console || {};
    this._originalConsoleMethods = {};
    this._plugins = [];
    this._startTime = now();
    this._wrappedBuiltIns = [];
    this._breadcrumbs = [];
    this._lastCapturedEvent = null;
    this._keypressTimeout;
    this._location = _window.location;
    this._lastHref = this._location && this._location.href;
    this._resetBackoff();

    for (var method in this._originalConsole) {  // eslint-disable-line guard-for-in
      this._originalConsoleMethods[method] = this._originalConsole[method];
    }
}

/*
 * The core Raven singleton
 *
 * @this {Raven}
 */

Raven.prototype = {
    // Hardcode version string so that raven source can be loaded directly via
    // webpack (using a build step causes webpack #1617). Grunt verifies that
    // this value matches package.json during build.
    //   See: https://github.com/getsentry/raven-js/issues/465
    VERSION: '3.15.0',

    debug: false,

    TraceKit: TraceKit, // alias to TraceKit

    /*
     * Configure Raven with a DSN and extra options
     *
     * @param {string} dsn The public Sentry DSN
     * @param {object} options Optional set of of global options [optional]
     * @return {Raven}
     */
    config: function(dsn, options) {
        var self = this;

        if (self._globalServer) {
                this._logDebug('error', 'Error: Raven has already been configured');
            return self;
        }
        if (!dsn) return self;

        var globalOptions = self._globalOptions;

        // merge in options
        if (options) {
            each(options, function(key, value){
                // tags and extra are special and need to be put into context
                if (key === 'tags' || key === 'extra' || key === 'user') {
                    self._globalContext[key] = value;
                } else {
                    globalOptions[key] = value;
                }
            });
        }

        self.setDSN(dsn);

        // "Script error." is hard coded into browsers for errors that it can't read.
        // this is the result of a script being pulled in from an external domain and CORS.
        globalOptions.ignoreErrors.push(/^Script error\.?$/);
        globalOptions.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/);

        // join regexp rules into one big rule
        globalOptions.ignoreErrors = joinRegExp(globalOptions.ignoreErrors);
        globalOptions.ignoreUrls = globalOptions.ignoreUrls.length ? joinRegExp(globalOptions.ignoreUrls) : false;
        globalOptions.whitelistUrls = globalOptions.whitelistUrls.length ? joinRegExp(globalOptions.whitelistUrls) : false;
        globalOptions.includePaths = joinRegExp(globalOptions.includePaths);
        globalOptions.maxBreadcrumbs = Math.max(0, Math.min(globalOptions.maxBreadcrumbs || 100, 100)); // default and hard limit is 100

        var autoBreadcrumbDefaults = {
            xhr: true,
            console: true,
            dom: true,
            location: true
        };

        var autoBreadcrumbs = globalOptions.autoBreadcrumbs;
        if ({}.toString.call(autoBreadcrumbs) === '[object Object]') {
            autoBreadcrumbs = objectMerge(autoBreadcrumbDefaults, autoBreadcrumbs);
        } else if (autoBreadcrumbs !== false) {
            autoBreadcrumbs = autoBreadcrumbDefaults;
        }
        globalOptions.autoBreadcrumbs = autoBreadcrumbs;

        var instrumentDefaults = {
            tryCatch: true
        };

        var instrument = globalOptions.instrument;
        if ({}.toString.call(instrument) === '[object Object]') {
            instrument = objectMerge(instrumentDefaults, instrument);
        } else if (instrument !== false) {
            instrument = instrumentDefaults;
        }
        globalOptions.instrument = instrument;

        TraceKit.collectWindowErrors = !!globalOptions.collectWindowErrors;

        // return for chaining
        return self;
    },

    /*
     * Installs a global window.onerror error handler
     * to capture and report uncaught exceptions.
     * At this point, install() is required to be called due
     * to the way TraceKit is set up.
     *
     * @return {Raven}
     */
    install: function() {
        var self = this;
        if (self.isSetup() && !self._isRavenInstalled) {
            TraceKit.report.subscribe(function () {
                self._handleOnErrorStackInfo.apply(self, arguments);
            });
            if (self._globalOptions.instrument && self._globalOptions.instrument.tryCatch) {
              self._instrumentTryCatch();
            }

            if (self._globalOptions.autoBreadcrumbs)
                self._instrumentBreadcrumbs();

            // Install all of the plugins
            self._drainPlugins();

            self._isRavenInstalled = true;
        }

        Error.stackTraceLimit = self._globalOptions.stackTraceLimit;
        return this;
    },

    /*
     * Set the DSN (can be called multiple time unlike config)
     *
     * @param {string} dsn The public Sentry DSN
     */
    setDSN: function(dsn) {
        var self = this,
            uri = self._parseDSN(dsn),
          lastSlash = uri.path.lastIndexOf('/'),
          path = uri.path.substr(1, lastSlash);

        self._dsn = dsn;
        self._globalKey = uri.user;
        self._globalSecret = uri.pass && uri.pass.substr(1);
        self._globalProject = uri.path.substr(lastSlash + 1);

        self._globalServer = self._getGlobalServer(uri);

        self._globalEndpoint = self._globalServer +
            '/' + path + 'api/' + self._globalProject + '/store/';

        // Reset backoff state since we may be pointing at a
        // new project/server
        this._resetBackoff();
    },

    /*
     * Wrap code within a context so Raven can capture errors
     * reliably across domains that is executed immediately.
     *
     * @param {object} options A specific set of options for this context [optional]
     * @param {function} func The callback to be immediately executed within the context
     * @param {array} args An array of arguments to be called with the callback [optional]
     */
    context: function(options, func, args) {
        if (isFunction(options)) {
            args = func || [];
            func = options;
            options = undefined;
        }

        return this.wrap(options, func).apply(this, args);
    },

    /*
     * Wrap code within a context and returns back a new function to be executed
     *
     * @param {object} options A specific set of options for this context [optional]
     * @param {function} func The function to be wrapped in a new context
     * @param {function} func A function to call before the try/catch wrapper [optional, private]
     * @return {function} The newly wrapped functions with a context
     */
    wrap: function(options, func, _before) {
        var self = this;
        // 1 argument has been passed, and it's not a function
        // so just return it
        if (isUndefined(func) && !isFunction(options)) {
            return options;
        }

        // options is optional
        if (isFunction(options)) {
            func = options;
            options = undefined;
        }

        // At this point, we've passed along 2 arguments, and the second one
        // is not a function either, so we'll just return the second argument.
        if (!isFunction(func)) {
            return func;
        }

        // We don't wanna wrap it twice!
        try {
            if (func.__raven__) {
                return func;
            }

            // If this has already been wrapped in the past, return that
            if (func.__raven_wrapper__ ){
                return func.__raven_wrapper__ ;
            }
        } catch (e) {
            // Just accessing custom props in some Selenium environments
            // can cause a "Permission denied" exception (see raven-js#495).
            // Bail on wrapping and return the function as-is (defers to window.onerror).
            return func;
        }

        function wrapped() {
            var args = [], i = arguments.length,
                deep = !options || options && options.deep !== false;

            if (_before && isFunction(_before)) {
                _before.apply(this, arguments);
            }

            // Recursively wrap all of a function's arguments that are
            // functions themselves.
            while(i--) args[i] = deep ? self.wrap(options, arguments[i]) : arguments[i];

            try {
                // Attempt to invoke user-land function
                // NOTE: If you are a Sentry user, and you are seeing this stack frame, it
                //       means Raven caught an error invoking your application code. This is
                //       expected behavior and NOT indicative of a bug with Raven.js.
                return func.apply(this, args);
            } catch(e) {
                self._ignoreNextOnError();
                self.captureException(e, options);
                throw e;
            }
        }

        // copy over properties of the old function
        for (var property in func) {
            if (hasKey(func, property)) {
                wrapped[property] = func[property];
            }
        }
        wrapped.prototype = func.prototype;

        func.__raven_wrapper__ = wrapped;
        // Signal that this function has been wrapped already
        // for both debugging and to prevent it to being wrapped twice
        wrapped.__raven__ = true;
        wrapped.__inner__ = func;

        return wrapped;
    },

    /*
     * Uninstalls the global error handler.
     *
     * @return {Raven}
     */
    uninstall: function() {
        TraceKit.report.uninstall();

        this._restoreBuiltIns();

        Error.stackTraceLimit = this._originalErrorStackTraceLimit;
        this._isRavenInstalled = false;

        return this;
    },

    /*
     * Manually capture an exception and send it over to Sentry
     *
     * @param {error} ex An exception to be logged
     * @param {object} options A specific set of options for this error [optional]
     * @return {Raven}
     */
    captureException: function(ex, options) {
        // If not an Error is passed through, recall as a message instead
        if (!isError(ex)) {
            return this.captureMessage(ex, objectMerge({
                trimHeadFrames: 1,
                stacktrace: true // if we fall back to captureMessage, default to attempting a new trace
            }, options));
        }

        // Store the raw exception object for potential debugging and introspection
        this._lastCapturedException = ex;

        // TraceKit.report will re-raise any exception passed to it,
        // which means you have to wrap it in try/catch. Instead, we
        // can wrap it here and only re-raise if TraceKit.report
        // raises an exception different from the one we asked to
        // report on.
        try {
            var stack = TraceKit.computeStackTrace(ex);
            this._handleStackInfo(stack, options);
        } catch(ex1) {
            if(ex !== ex1) {
                throw ex1;
            }
        }

        return this;
    },

    /*
     * Manually send a message to Sentry
     *
     * @param {string} msg A plain message to be captured in Sentry
     * @param {object} options A specific set of options for this message [optional]
     * @return {Raven}
     */
    captureMessage: function(msg, options) {
        // config() automagically converts ignoreErrors from a list to a RegExp so we need to test for an
        // early call; we'll error on the side of logging anything called before configuration since it's
        // probably something you should see:
        if (!!this._globalOptions.ignoreErrors.test && this._globalOptions.ignoreErrors.test(msg)) {
            return;
        }

        options = options || {};

        var data = objectMerge({
            message: msg + ''  // Make sure it's actually a string
        }, options);

        if (this._globalOptions.stacktrace || (options && options.stacktrace)) {
            var ex;
            // Generate a "synthetic" stack trace from this point.
            // NOTE: If you are a Sentry user, and you are seeing this stack frame, it is NOT indicative
            //       of a bug with Raven.js. Sentry generates synthetic traces either by configuration,
            //       or if it catches a thrown object without a "stack" property.
            try {
                throw new Error(msg);
            } catch (ex1) {
                ex = ex1;
            }

            // null exception name so `Error` isn't prefixed to msg
            ex.name = null;

            options = objectMerge({
                // fingerprint on msg, not stack trace (legacy behavior, could be
                // revisited)
                fingerprint: msg,
                // since we know this is a synthetic trace, the top N-most frames
                // MUST be from Raven.js, so mark them as in_app later by setting
                // trimHeadFrames
                trimHeadFrames: (options.trimHeadFrames || 0) + 1
            }, options);

            var stack = TraceKit.computeStackTrace(ex);
            var frames = this._prepareFrames(stack, options);
            data.stacktrace = {
                // Sentry expects frames oldest to newest
                frames: frames.reverse()
            }
        }

        // Fire away!
        this._send(data);

        return this;
    },

    captureBreadcrumb: function (obj) {
        var crumb = objectMerge({
            timestamp: now() / 1000
        }, obj);

        if (isFunction(this._globalOptions.breadcrumbCallback)) {
            var result = this._globalOptions.breadcrumbCallback(crumb);

            if (isObject(result) && !isEmptyObject(result)) {
                crumb = result;
            } else if (result === false) {
                return this;
            }
        }

        this._breadcrumbs.push(crumb);
        if (this._breadcrumbs.length > this._globalOptions.maxBreadcrumbs) {
            this._breadcrumbs.shift();
        }
        return this;
    },

    addPlugin: function(plugin /*arg1, arg2, ... argN*/) {
        var pluginArgs = [].slice.call(arguments, 1);

        this._plugins.push([plugin, pluginArgs]);
        if (this._isRavenInstalled) {
            this._drainPlugins();
        }

        return this;
    },

    /*
     * Set/clear a user to be sent along with the payload.
     *
     * @param {object} user An object representing user data [optional]
     * @return {Raven}
     */
    setUserContext: function(user) {
        // Intentionally do not merge here since that's an unexpected behavior.
        this._globalContext.user = user;

        return this;
    },

    /*
     * Merge extra attributes to be sent along with the payload.
     *
     * @param {object} extra An object representing extra data [optional]
     * @return {Raven}
     */
    setExtraContext: function(extra) {
        this._mergeContext('extra', extra);

        return this;
    },

    /*
     * Merge tags to be sent along with the payload.
     *
     * @param {object} tags An object representing tags [optional]
     * @return {Raven}
     */
    setTagsContext: function(tags) {
        this._mergeContext('tags', tags);

        return this;
    },

    /*
     * Clear all of the context.
     *
     * @return {Raven}
     */
    clearContext: function() {
        this._globalContext = {};

        return this;
    },

    /*
     * Get a copy of the current context. This cannot be mutated.
     *
     * @return {object} copy of context
     */
    getContext: function() {
        // lol javascript
        return JSON.parse(stringify(this._globalContext));
    },


    /*
     * Set environment of application
     *
     * @param {string} environment Typically something like 'production'.
     * @return {Raven}
     */
    setEnvironment: function(environment) {
        this._globalOptions.environment = environment;

        return this;
    },

    /*
     * Set release version of application
     *
     * @param {string} release Typically something like a git SHA to identify version
     * @return {Raven}
     */
    setRelease: function(release) {
        this._globalOptions.release = release;

        return this;
    },

    /*
     * Set the dataCallback option
     *
     * @param {function} callback The callback to run which allows the
     *                            data blob to be mutated before sending
     * @return {Raven}
     */
    setDataCallback: function(callback) {
        var original = this._globalOptions.dataCallback;
        this._globalOptions.dataCallback = isFunction(callback)
          ? function (data) { return callback(data, original); }
          : callback;

        return this;
    },

    /*
     * Set the breadcrumbCallback option
     *
     * @param {function} callback The callback to run which allows filtering
     *                            or mutating breadcrumbs
     * @return {Raven}
     */
    setBreadcrumbCallback: function(callback) {
        var original = this._globalOptions.breadcrumbCallback;
        this._globalOptions.breadcrumbCallback = isFunction(callback)
          ? function (data) { return callback(data, original); }
          : callback;

        return this;
    },

    /*
     * Set the shouldSendCallback option
     *
     * @param {function} callback The callback to run which allows
     *                            introspecting the blob before sending
     * @return {Raven}
     */
    setShouldSendCallback: function(callback) {
        var original = this._globalOptions.shouldSendCallback;
        this._globalOptions.shouldSendCallback = isFunction(callback)
            ? function (data) { return callback(data, original); }
            : callback;

        return this;
    },

    /**
     * Override the default HTTP transport mechanism that transmits data
     * to the Sentry server.
     *
     * @param {function} transport Function invoked instead of the default
     *                             `makeRequest` handler.
     *
     * @return {Raven}
     */
    setTransport: function(transport) {
        this._globalOptions.transport = transport;

        return this;
    },

    /*
     * Get the latest raw exception that was captured by Raven.
     *
     * @return {error}
     */
    lastException: function() {
        return this._lastCapturedException;
    },

    /*
     * Get the last event id
     *
     * @return {string}
     */
    lastEventId: function() {
        return this._lastEventId;
    },

    /*
     * Determine if Raven is setup and ready to go.
     *
     * @return {boolean}
     */
    isSetup: function() {
        if (!this._hasJSON) return false;  // needs JSON support
        if (!this._globalServer) {
            if (!this.ravenNotConfiguredError) {
              this.ravenNotConfiguredError = true;
              this._logDebug('error', 'Error: Raven has not been configured.');
            }
            return false;
        }
        return true;
    },

    afterLoad: function () {
        // TODO: remove window dependence?

        // Attempt to initialize Raven on load
        var RavenConfig = _window.RavenConfig;
        if (RavenConfig) {
            this.config(RavenConfig.dsn, RavenConfig.config).install();
        }
    },

    showReportDialog: function (options) {
        if (!_document) // doesn't work without a document (React native)
            return;

        options = options || {};

        var lastEventId = options.eventId || this.lastEventId();
        if (!lastEventId) {
            throw new RavenConfigError('Missing eventId');
        }

        var dsn = options.dsn || this._dsn;
        if (!dsn) {
            throw new RavenConfigError('Missing DSN');
        }

        var encode = encodeURIComponent;
        var qs = '';
        qs += '?eventId=' + encode(lastEventId);
        qs += '&dsn=' + encode(dsn);

        var user = options.user || this._globalContext.user;
        if (user) {
            if (user.name)  qs += '&name=' + encode(user.name);
            if (user.email) qs += '&email=' + encode(user.email);
        }

        var globalServer = this._getGlobalServer(this._parseDSN(dsn));

        var script = _document.createElement('script');
        script.async = true;
        script.src = globalServer + '/api/embed/error-page/' + qs;
        (_document.head || _document.body).appendChild(script);
    },

    /**** Private functions ****/
    _ignoreNextOnError: function () {
        var self = this;
        this._ignoreOnError += 1;
        setTimeout(function () {
            // onerror should trigger before setTimeout
            self._ignoreOnError -= 1;
        });
    },

    _triggerEvent: function(eventType, options) {
        // NOTE: `event` is a native browser thing, so let's avoid conflicting wiht it
        var evt, key;

        if (!this._hasDocument)
            return;

        options = options || {};

        eventType = 'raven' + eventType.substr(0,1).toUpperCase() + eventType.substr(1);

        if (_document.createEvent) {
            evt = _document.createEvent('HTMLEvents');
            evt.initEvent(eventType, true, true);
        } else {
            evt = _document.createEventObject();
            evt.eventType = eventType;
        }

        for (key in options) if (hasKey(options, key)) {
            evt[key] = options[key];
        }

        if (_document.createEvent) {
            // IE9 if standards
            _document.dispatchEvent(evt);
        } else {
            // IE8 regardless of Quirks or Standards
            // IE9 if quirks
            try {
                _document.fireEvent('on' + evt.eventType.toLowerCase(), evt);
            } catch(e) {
                // Do nothing
            }
        }
    },

    /**
     * Wraps addEventListener to capture UI breadcrumbs
     * @param evtName the event name (e.g. "click")
     * @returns {Function}
     * @private
     */
    _breadcrumbEventHandler: function(evtName) {
        var self = this;
        return function (evt) {
            // reset keypress timeout; e.g. triggering a 'click' after
            // a 'keypress' will reset the keypress debounce so that a new
            // set of keypresses can be recorded
            self._keypressTimeout = null;

            // It's possible this handler might trigger multiple times for the same
            // event (e.g. event propagation through node ancestors). Ignore if we've
            // already captured the event.
            if (self._lastCapturedEvent === evt)
                return;

            self._lastCapturedEvent = evt;

            // try/catch both:
            // - accessing evt.target (see getsentry/raven-js#838, #768)
            // - `htmlTreeAsString` because it's complex, and just accessing the DOM incorrectly
            //   can throw an exception in some circumstances.
            var target;
            try {
                target = htmlTreeAsString(evt.target);
            } catch (e) {
                target = '<unknown>';
            }

            self.captureBreadcrumb({
                category: 'ui.' + evtName, // e.g. ui.click, ui.input
                message: target
            });
        };
    },

    /**
     * Wraps addEventListener to capture keypress UI events
     * @returns {Function}
     * @private
     */
    _keypressEventHandler: function() {
        var self = this,
            debounceDuration = 1000; // milliseconds

        // TODO: if somehow user switches keypress target before
        //       debounce timeout is triggered, we will only capture
        //       a single breadcrumb from the FIRST target (acceptable?)
        return function (evt) {
            var target;
            try {
                target = evt.target;
            } catch (e) {
                // just accessing event properties can throw an exception in some rare circumstances
                // see: https://github.com/getsentry/raven-js/issues/838
                return;
            }
            var tagName = target && target.tagName;

            // only consider keypress events on actual input elements
            // this will disregard keypresses targeting body (e.g. tabbing
            // through elements, hotkeys, etc)
            if (!tagName || tagName !== 'INPUT' && tagName !== 'TEXTAREA' && !target.isContentEditable)
                return;

            // record first keypress in a series, but ignore subsequent
            // keypresses until debounce clears
            var timeout = self._keypressTimeout;
            if (!timeout) {
                self._breadcrumbEventHandler('input')(evt);
            }
            clearTimeout(timeout);
            self._keypressTimeout = setTimeout(function () {
                self._keypressTimeout = null;
            }, debounceDuration);
        };
    },

    /**
     * Captures a breadcrumb of type "navigation", normalizing input URLs
     * @param to the originating URL
     * @param from the target URL
     * @private
     */
    _captureUrlChange: function(from, to) {
        var parsedLoc = parseUrl(this._location.href);
        var parsedTo = parseUrl(to);
        var parsedFrom = parseUrl(from);

        // because onpopstate only tells you the "new" (to) value of location.href, and
        // not the previous (from) value, we need to track the value of the current URL
        // state ourselves
        this._lastHref = to;

        // Use only the path component of the URL if the URL matches the current
        // document (almost all the time when using pushState)
        if (parsedLoc.protocol === parsedTo.protocol && parsedLoc.host === parsedTo.host)
            to = parsedTo.relative;
        if (parsedLoc.protocol === parsedFrom.protocol && parsedLoc.host === parsedFrom.host)
            from = parsedFrom.relative;

        this.captureBreadcrumb({
            category: 'navigation',
            data: {
                to: to,
                from: from
            }
        });
    },

    /**
     * Wrap timer functions and event targets to catch errors and provide
     * better metadata.
     */
    _instrumentTryCatch: function() {
        var self = this;

        var wrappedBuiltIns = self._wrappedBuiltIns;

        function wrapTimeFn(orig) {
            return function (fn, t) { // preserve arity
                // Make a copy of the arguments to prevent deoptimization
                // https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
                var args = new Array(arguments.length);
                for(var i = 0; i < args.length; ++i) {
                    args[i] = arguments[i];
                }
                var originalCallback = args[0];
                if (isFunction(originalCallback)) {
                    args[0] = self.wrap(originalCallback);
                }

                // IE < 9 doesn't support .call/.apply on setInterval/setTimeout, but it
                // also supports only two arguments and doesn't care what this is, so we
                // can just call the original function directly.
                if (orig.apply) {
                    return orig.apply(this, args);
                } else {
                    return orig(args[0], args[1]);
                }
            };
        }

        var autoBreadcrumbs = this._globalOptions.autoBreadcrumbs;

        function wrapEventTarget(global) {
            var proto = _window[global] && _window[global].prototype;
            if (proto && proto.hasOwnProperty && proto.hasOwnProperty('addEventListener')) {
                fill(proto, 'addEventListener', function(orig) {
                    return function (evtName, fn, capture, secure) { // preserve arity
                        try {
                            if (fn && fn.handleEvent) {
                                fn.handleEvent = self.wrap(fn.handleEvent);
                            }
                        } catch (err) {
                            // can sometimes get 'Permission denied to access property "handle Event'
                        }

                        // More breadcrumb DOM capture ... done here and not in `_instrumentBreadcrumbs`
                        // so that we don't have more than one wrapper function
                        var before,
                            clickHandler,
                            keypressHandler;

                        if (autoBreadcrumbs && autoBreadcrumbs.dom && (global === 'EventTarget' || global === 'Node')) {
                            // NOTE: generating multiple handlers per addEventListener invocation, should
                            //       revisit and verify we can just use one (almost certainly)
                            clickHandler = self._breadcrumbEventHandler('click');
                            keypressHandler = self._keypressEventHandler();
                            before = function (evt) {
                                // need to intercept every DOM event in `before` argument, in case that
                                // same wrapped method is re-used for different events (e.g. mousemove THEN click)
                                // see #724
                                if (!evt) return;

                                var eventType;
                                try {
                                    eventType = evt.type
                                } catch (e) {
                                    // just accessing event properties can throw an exception in some rare circumstances
                                    // see: https://github.com/getsentry/raven-js/issues/838
                                    return;
                                }
                                if (eventType === 'click')
                                    return clickHandler(evt);
                                else if (eventType === 'keypress')
                                    return keypressHandler(evt);
                            };
                        }
                        return orig.call(this, evtName, self.wrap(fn, undefined, before), capture, secure);
                    };
                }, wrappedBuiltIns);
                fill(proto, 'removeEventListener', function (orig) {
                    return function (evt, fn, capture, secure) {
                        try {
                            fn = fn && (fn.__raven_wrapper__ ? fn.__raven_wrapper__  : fn);
                        } catch (e) {
                            // ignore, accessing __raven_wrapper__ will throw in some Selenium environments
                        }
                        return orig.call(this, evt, fn, capture, secure);
                    };
                }, wrappedBuiltIns);
            }
        }

        fill(_window, 'setTimeout', wrapTimeFn, wrappedBuiltIns);
        fill(_window, 'setInterval', wrapTimeFn, wrappedBuiltIns);
        if (_window.requestAnimationFrame) {
            fill(_window, 'requestAnimationFrame', function (orig) {
                return function (cb) {
                    return orig(self.wrap(cb));
                };
            }, wrappedBuiltIns);
        }

        // event targets borrowed from bugsnag-js:
        // https://github.com/bugsnag/bugsnag-js/blob/master/src/bugsnag.js#L666
        var eventTargets = ['EventTarget', 'Window', 'Node', 'ApplicationCache', 'AudioTrackList', 'ChannelMergerNode', 'CryptoOperation', 'EventSource', 'FileReader', 'HTMLUnknownElement', 'IDBDatabase', 'IDBRequest', 'IDBTransaction', 'KeyOperation', 'MediaController', 'MessagePort', 'ModalWindow', 'Notification', 'SVGElementInstance', 'Screen', 'TextTrack', 'TextTrackCue', 'TextTrackList', 'WebSocket', 'WebSocketWorker', 'Worker', 'XMLHttpRequest', 'XMLHttpRequestEventTarget', 'XMLHttpRequestUpload'];
        for (var i = 0; i < eventTargets.length; i++) {
            wrapEventTarget(eventTargets[i]);
        }
    },


    /**
     * Instrument browser built-ins w/ breadcrumb capturing
     *  - XMLHttpRequests
     *  - DOM interactions (click/typing)
     *  - window.location changes
     *  - console
     *
     * Can be disabled or individually configured via the `autoBreadcrumbs` config option
     */
    _instrumentBreadcrumbs: function () {
        var self = this;
        var autoBreadcrumbs = this._globalOptions.autoBreadcrumbs;

        var wrappedBuiltIns = self._wrappedBuiltIns;

        function wrapProp(prop, xhr) {
            if (prop in xhr && isFunction(xhr[prop])) {
                fill(xhr, prop, function (orig) {
                    return self.wrap(orig);
                }); // intentionally don't track filled methods on XHR instances
            }
        }

        if (autoBreadcrumbs.xhr && 'XMLHttpRequest' in _window) {
            var xhrproto = XMLHttpRequest.prototype;
            fill(xhrproto, 'open', function(origOpen) {
                return function (method, url) { // preserve arity

                    // if Sentry key appears in URL, don't capture
                    if (isString(url) && url.indexOf(self._globalKey) === -1) {
                        this.__raven_xhr = {
                            method: method,
                            url: url,
                            status_code: null
                        };
                    }

                    return origOpen.apply(this, arguments);
                };
            }, wrappedBuiltIns);

            fill(xhrproto, 'send', function(origSend) {
                return function (data) { // preserve arity
                    var xhr = this;

                    function onreadystatechangeHandler() {
                        if (xhr.__raven_xhr && (xhr.readyState === 1 || xhr.readyState === 4)) {
                            try {
                                // touching statusCode in some platforms throws
                                // an exception
                                xhr.__raven_xhr.status_code = xhr.status;
                            } catch (e) { /* do nothing */ }
                            self.captureBreadcrumb({
                                type: 'http',
                                category: 'xhr',
                                data: xhr.__raven_xhr
                            });
                        }
                    }

                    var props = ['onload', 'onerror', 'onprogress'];
                    for (var j = 0; j < props.length; j++) {
                        wrapProp(props[j], xhr);
                    }

                    if ('onreadystatechange' in xhr && isFunction(xhr.onreadystatechange)) {
                        fill(xhr, 'onreadystatechange', function (orig) {
                            return self.wrap(orig, undefined, onreadystatechangeHandler);
                        } /* intentionally don't track this instrumentation */);
                    } else {
                        // if onreadystatechange wasn't actually set by the page on this xhr, we
                        // are free to set our own and capture the breadcrumb
                        xhr.onreadystatechange = onreadystatechangeHandler;
                    }

                    return origSend.apply(this, arguments);
                };
            }, wrappedBuiltIns);
        }

        if (autoBreadcrumbs.xhr && 'fetch' in _window) {
            fill(_window, 'fetch', function(origFetch) {
                return function (fn, t) { // preserve arity
                    // Make a copy of the arguments to prevent deoptimization
                    // https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
                    var args = new Array(arguments.length);
                    for (var i = 0; i < args.length; ++i) {
                        args[i] = arguments[i];
                    }

                    var fetchInput = args[0];
                    var method = 'GET';
                    var url;

                    if (typeof fetchInput === 'string') {
                        url = fetchInput;
                    } else {
                        url = fetchInput.url;
                        if (fetchInput.method) {
                            method = fetchInput.method;
                        }
                    }

                    if (args[1] && args[1].method) {
                        method = args[1].method;
                    }

                    var fetchData = {
                        method: method,
                        url: url,
                        status_code: null
                    };

                    self.captureBreadcrumb({
                        type: 'http',
                        category: 'fetch',
                        data: fetchData
                    });

                    return origFetch.apply(this, args).then(function (response) {
                        fetchData.status_code = response.status;

                        return response;
                    });
                };
            }, wrappedBuiltIns);
        }

        // Capture breadcrumbs from any click that is unhandled / bubbled up all the way
        // to the document. Do this before we instrument addEventListener.
        if (autoBreadcrumbs.dom && this._hasDocument) {
            if (_document.addEventListener) {
                _document.addEventListener('click', self._breadcrumbEventHandler('click'), false);
                _document.addEventListener('keypress', self._keypressEventHandler(), false);
            }
            else {
                // IE8 Compatibility
                _document.attachEvent('onclick', self._breadcrumbEventHandler('click'));
                _document.attachEvent('onkeypress', self._keypressEventHandler());
            }
        }

        // record navigation (URL) changes
        // NOTE: in Chrome App environment, touching history.pushState, *even inside
        //       a try/catch block*, will cause Chrome to output an error to console.error
        // borrowed from: https://github.com/angular/angular.js/pull/13945/files
        var chrome = _window.chrome;
        var isChromePackagedApp = chrome && chrome.app && chrome.app.runtime;
        var hasPushState = !isChromePackagedApp && _window.history && history.pushState;
        if (autoBreadcrumbs.location && hasPushState) {
            // TODO: remove onpopstate handler on uninstall()
            var oldOnPopState = _window.onpopstate;
            _window.onpopstate = function () {
                var currentHref = self._location.href;
                self._captureUrlChange(self._lastHref, currentHref);

                if (oldOnPopState) {
                    return oldOnPopState.apply(this, arguments);
                }
            };

            fill(history, 'pushState', function (origPushState) {
                // note history.pushState.length is 0; intentionally not declaring
                // params to preserve 0 arity
                return function (/* state, title, url */) {
                    var url = arguments.length > 2 ? arguments[2] : undefined;

                    // url argument is optional
                    if (url) {
                        // coerce to string (this is what pushState does)
                        self._captureUrlChange(self._lastHref, url + '');
                    }

                    return origPushState.apply(this, arguments);
                };
            }, wrappedBuiltIns);
        }

        if (autoBreadcrumbs.console && 'console' in _window && console.log) {
            // console
            var consoleMethodCallback = function (msg, data) {
                self.captureBreadcrumb({
                    message: msg,
                    level: data.level,
                    category: 'console'
                });
            };

            each(['debug', 'info', 'warn', 'error', 'log'], function (_, level) {
                wrapConsoleMethod(console, level, consoleMethodCallback);
            });
        }

    },

    _restoreBuiltIns: function () {
        // restore any wrapped builtins
        var builtin;
        while (this._wrappedBuiltIns.length) {
            builtin = this._wrappedBuiltIns.shift();

            var obj = builtin[0],
              name = builtin[1],
              orig = builtin[2];

            obj[name] = orig;
        }
    },

    _drainPlugins: function() {
        var self = this;

        // FIX ME TODO
        each(this._plugins, function(_, plugin) {
            var installer = plugin[0];
            var args = plugin[1];
            installer.apply(self, [self].concat(args));
        });
    },

    _parseDSN: function(str) {
        var m = dsnPattern.exec(str),
            dsn = {},
            i = 7;

        try {
            while (i--) dsn[dsnKeys[i]] = m[i] || '';
        } catch(e) {
            throw new RavenConfigError('Invalid DSN: ' + str);
        }

        if (dsn.pass && !this._globalOptions.allowSecretKey) {
            throw new RavenConfigError('Do not specify your secret key in the DSN. See: http://bit.ly/raven-secret-key');
        }

        return dsn;
    },

    _getGlobalServer: function(uri) {
        // assemble the endpoint from the uri pieces
        var globalServer = '//' + uri.host +
            (uri.port ? ':' + uri.port : '');

        if (uri.protocol) {
            globalServer = uri.protocol + ':' + globalServer;
        }
        return globalServer;
    },

    _handleOnErrorStackInfo: function() {
        // if we are intentionally ignoring errors via onerror, bail out
        if (!this._ignoreOnError) {
            this._handleStackInfo.apply(this, arguments);
        }
    },

    _handleStackInfo: function(stackInfo, options) {
        var frames = this._prepareFrames(stackInfo, options);

        this._triggerEvent('handle', {
            stackInfo: stackInfo,
            options: options
        });

        this._processException(
            stackInfo.name,
            stackInfo.message,
            stackInfo.url,
            stackInfo.lineno,
            frames,
            options
        );
    },

    _prepareFrames: function(stackInfo, options) {
        var self = this;
        var frames = [];
        if (stackInfo.stack && stackInfo.stack.length) {
            each(stackInfo.stack, function(i, stack) {
                var frame = self._normalizeFrame(stack);
                if (frame) {
                    frames.push(frame);
                }
            });

            // e.g. frames captured via captureMessage throw
            if (options && options.trimHeadFrames) {
                for (var j = 0; j < options.trimHeadFrames && j < frames.length; j++) {
                    frames[j].in_app = false;
                }
            }
        }
        frames = frames.slice(0, this._globalOptions.stackTraceLimit);
        return frames;
    },


    _normalizeFrame: function(frame) {
        if (!frame.url) return;

        // normalize the frames data
        var normalized = {
            filename:   frame.url,
            lineno:     frame.line,
            colno:      frame.column,
            'function': frame.func || '?'
        };

        normalized.in_app = !( // determine if an exception came from outside of our app
            // first we check the global includePaths list.
            !!this._globalOptions.includePaths.test && !this._globalOptions.includePaths.test(normalized.filename) ||
            // Now we check for fun, if the function name is Raven or TraceKit
            /(Raven|TraceKit)\./.test(normalized['function']) ||
            // finally, we do a last ditch effort and check for raven.min.js
            /raven\.(min\.)?js$/.test(normalized.filename)
        );

        return normalized;
    },

    _processException: function(type, message, fileurl, lineno, frames, options) {
        var stacktrace;
        if (!!this._globalOptions.ignoreErrors.test && this._globalOptions.ignoreErrors.test(message)) return;

        message += '';

        if (frames && frames.length) {
            fileurl = frames[0].filename || fileurl;
            // Sentry expects frames oldest to newest
            // and JS sends them as newest to oldest
            frames.reverse();
            stacktrace = {frames: frames};
        } else if (fileurl) {
            stacktrace = {
                frames: [{
                    filename: fileurl,
                    lineno: lineno,
                    in_app: true
                }]
            };
        }

        if (!!this._globalOptions.ignoreUrls.test && this._globalOptions.ignoreUrls.test(fileurl)) return;
        if (!!this._globalOptions.whitelistUrls.test && !this._globalOptions.whitelistUrls.test(fileurl)) return;

        var data = objectMerge({
            // sentry.interfaces.Exception
            exception: {
                values: [{
                    type: type,
                    value: message,
                    stacktrace: stacktrace
                }]
            },
            culprit: fileurl
        }, options);

        // Fire away!
        this._send(data);
    },

    _trimPacket: function(data) {
        // For now, we only want to truncate the two different messages
        // but this could/should be expanded to just trim everything
        var max = this._globalOptions.maxMessageLength;
        if (data.message) {
            data.message = truncate(data.message, max);
        }
        if (data.exception) {
            var exception = data.exception.values[0];
            exception.value = truncate(exception.value, max);
        }

        var request = data.request;
        if (request) {
            if (request.url) {
                request.url = truncate(request.url, this._globalOptions.maxUrlLength);
            }
            if (request.Referer) {
                request.Referer = truncate(request.Referer, this._globalOptions.maxUrlLength);
            }
        }

        if (data.breadcrumbs && data.breadcrumbs.values)
            this._trimBreadcrumbs(data.breadcrumbs);

        return data;
    },

    /**
     * Truncate breadcrumb values (right now just URLs)
     */
    _trimBreadcrumbs: function (breadcrumbs) {
        // known breadcrumb properties with urls
        // TODO: also consider arbitrary prop values that start with (https?)?://
        var urlProps = ['to', 'from', 'url'],
            urlProp,
            crumb,
            data;

        for (var i = 0; i < breadcrumbs.values.length; ++i) {
            crumb = breadcrumbs.values[i];
            if (!crumb.hasOwnProperty('data') || !isObject(crumb.data))
                continue;

            data = crumb.data;
            for (var j = 0; j < urlProps.length; ++j) {
                urlProp = urlProps[j];
                if (data.hasOwnProperty(urlProp)) {
                    data[urlProp] = truncate(data[urlProp], this._globalOptions.maxUrlLength);
                }
            }
        }
    },

    _getHttpData: function() {
        if (!this._hasNavigator && !this._hasDocument) return;
        var httpData = {};

        if (this._hasNavigator && _navigator.userAgent) {
            httpData.headers = {
              'User-Agent': navigator.userAgent
            };
        }

        if (this._hasDocument) {
            if (_document.location && _document.location.href) {
                httpData.url = _document.location.href;
            }
            if (_document.referrer) {
                if (!httpData.headers) httpData.headers = {};
                httpData.headers.Referer = _document.referrer;
            }
        }

        return httpData;
    },

    _resetBackoff: function() {
        this._backoffDuration = 0;
        this._backoffStart = null;
    },

    _shouldBackoff: function() {
        return this._backoffDuration && now() - this._backoffStart < this._backoffDuration;
    },

    /**
     * Returns true if the in-process data payload matches the signature
     * of the previously-sent data
     *
     * NOTE: This has to be done at this level because TraceKit can generate
     *       data from window.onerror WITHOUT an exception object (IE8, IE9,
     *       other old browsers). This can take the form of an "exception"
     *       data object with a single frame (derived from the onerror args).
     */
    _isRepeatData: function (current) {
        var last = this._lastData;

        if (!last ||
            current.message !== last.message || // defined for captureMessage
            current.culprit !== last.culprit)   // defined for captureException/onerror
            return false;

        // Stacktrace interface (i.e. from captureMessage)
        if (current.stacktrace || last.stacktrace) {
            return isSameStacktrace(current.stacktrace, last.stacktrace);
        }
        // Exception interface (i.e. from captureException/onerror)
        else if (current.exception || last.exception) {
            return isSameException(current.exception, last.exception);
        }

        return true;
    },

    _setBackoffState: function(request) {
        // If we are already in a backoff state, don't change anything
        if (this._shouldBackoff()) {
            return;
        }

        var status = request.status;

        // 400 - project_id doesn't exist or some other fatal
        // 401 - invalid/revoked dsn
        // 429 - too many requests
        if (!(status === 400 || status === 401 || status === 429))
            return;

        var retry;
        try {
            // If Retry-After is not in Access-Control-Expose-Headers, most
            // browsers will throw an exception trying to access it
            retry = request.getResponseHeader('Retry-After');
            retry = parseInt(retry, 10) * 1000; // Retry-After is returned in seconds
        } catch (e) {
            /* eslint no-empty:0 */
        }


        this._backoffDuration = retry
            // If Sentry server returned a Retry-After value, use it
            ? retry
            // Otherwise, double the last backoff duration (starts at 1 sec)
            : this._backoffDuration * 2 || 1000;

        this._backoffStart = now();
    },

    _send: function(data) {
        var globalOptions = this._globalOptions;

        var baseData = {
            project: this._globalProject,
            logger: globalOptions.logger,
            platform: 'javascript'
        }, httpData = this._getHttpData();

        if (httpData) {
            baseData.request = httpData;
        }

        // HACK: delete `trimHeadFrames` to prevent from appearing in outbound payload
        if (data.trimHeadFrames) delete data.trimHeadFrames;

        data = objectMerge(baseData, data);

        // Merge in the tags and extra separately since objectMerge doesn't handle a deep merge
        data.tags = objectMerge(objectMerge({}, this._globalContext.tags), data.tags);
        data.extra = objectMerge(objectMerge({}, this._globalContext.extra), data.extra);

        // Send along our own collected metadata with extra
        data.extra['session:duration'] = now() - this._startTime;

        if (this._breadcrumbs && this._breadcrumbs.length > 0) {
            // intentionally make shallow copy so that additions
            // to breadcrumbs aren't accidentally sent in this request
            data.breadcrumbs = {
                values: [].slice.call(this._breadcrumbs, 0)
            };
        }

        // If there are no tags/extra, strip the key from the payload alltogther.
        if (isEmptyObject(data.tags)) delete data.tags;

        if (this._globalContext.user) {
            // sentry.interfaces.User
            data.user = this._globalContext.user;
        }

        // Include the environment if it's defined in globalOptions
        if (globalOptions.environment) data.environment = globalOptions.environment;

        // Include the release if it's defined in globalOptions
        if (globalOptions.release) data.release = globalOptions.release;

        // Include server_name if it's defined in globalOptions
        if (globalOptions.serverName) data.server_name = globalOptions.serverName;

        if (isFunction(globalOptions.dataCallback)) {
            data = globalOptions.dataCallback(data) || data;
        }

        // Why??????????
        if (!data || isEmptyObject(data)) {
            return;
        }

        // Check if the request should be filtered or not
        if (isFunction(globalOptions.shouldSendCallback) && !globalOptions.shouldSendCallback(data)) {
            return;
        }

        // Backoff state: Sentry server previously responded w/ an error (e.g. 429 - too many requests),
        // so drop requests until "cool-off" period has elapsed.
        if (this._shouldBackoff()) {
            this._logDebug('warn', 'Raven dropped error due to backoff: ', data);
            return;
        }

        if (typeof globalOptions.sampleRate === 'number') {
            if (Math.random() < globalOptions.sampleRate) {
                this._sendProcessedPayload(data);
            }
        } else {
            this._sendProcessedPayload(data);
        }
    },

    _getUuid: function () {
      return uuid4();
    },

    _sendProcessedPayload: function(data, callback) {
        var self = this;
        var globalOptions = this._globalOptions;

        if (!this.isSetup()) return;

        // Send along an event_id if not explicitly passed.
        // This event_id can be used to reference the error within Sentry itself.
        // Set lastEventId after we know the error should actually be sent
        this._lastEventId = data.event_id || (data.event_id = this._getUuid());

        // Try and clean up the packet before sending by truncating long values
        data = this._trimPacket(data);

        // ideally duplicate error testing should occur *before* dataCallback/shouldSendCallback,
        // but this would require copying an un-truncated copy of the data packet, which can be
        // arbitrarily deep (extra_data) -- could be worthwhile? will revisit
        if (!this._globalOptions.allowDuplicates && this._isRepeatData(data)) {
            this._logDebug('warn', 'Raven dropped repeat event: ', data);
            return;
        }

        // Store outbound payload after trim
        this._lastData = data;

        this._logDebug('debug', 'Raven about to send:', data);

        var auth = {
            sentry_version: '7',
            sentry_client: 'raven-js/' + this.VERSION,
            sentry_key: this._globalKey
        };
        if (this._globalSecret) {
            auth.sentry_secret = this._globalSecret;
        }

        var exception = data.exception && data.exception.values[0];
        this.captureBreadcrumb({
            category: 'sentry',
            message: exception
                ? (exception.type ? exception.type + ': ' : '') + exception.value
                : data.message,
            event_id: data.event_id,
            level: data.level || 'error' // presume error unless specified
        });

        var url = this._globalEndpoint;
        (globalOptions.transport || this._makeRequest).call(this, {
            url: url,
            auth: auth,
            data: data,
            options: globalOptions,
            onSuccess: function success() {
                self._resetBackoff();

                self._triggerEvent('success', {
                    data: data,
                    src: url
                });
                callback && callback();
            },
            onError: function failure(error) {
                self._logDebug('error', 'Raven transport failed to send: ', error);

                if (error.request) {
                    self._setBackoffState(error.request);
                }

                self._triggerEvent('failure', {
                    data: data,
                    src: url
                });
                error = error || new Error('Raven send failed (no additional details provided)');
                callback && callback(error);
            }
        });
    },

    _makeRequest: function(opts) {
        var request = new XMLHttpRequest();

        // if browser doesn't support CORS (e.g. IE7), we are out of luck
        var hasCORS =
            'withCredentials' in request ||
            typeof XDomainRequest !== 'undefined';

        if (!hasCORS) return;

        var url = opts.url;

        if ('withCredentials' in request) {
            request.onreadystatechange = function () {
                if (request.readyState !== 4) {
                    return;
                } else if (request.status === 200) {
                    opts.onSuccess && opts.onSuccess();
                } else if (opts.onError) {
                    var err = new Error('Sentry error code: ' + request.status);
                    err.request = request;
                    opts.onError(err);
                }
            };
        } else {
            request = new XDomainRequest();
            // xdomainrequest cannot go http -> https (or vice versa),
            // so always use protocol relative
            url = url.replace(/^https?:/, '');

            // onreadystatechange not supported by XDomainRequest
            if (opts.onSuccess) {
                request.onload = opts.onSuccess;
            }
            if (opts.onError) {
                request.onerror = function () {
                    var err = new Error('Sentry error code: XDomainRequest');
                    err.request = request;
                    opts.onError(err);
                }
            }
        }

        // NOTE: auth is intentionally sent as part of query string (NOT as custom
        //       HTTP header) so as to avoid preflight CORS requests
        request.open('POST', url + '?' + urlencode(opts.auth));
        request.send(stringify(opts.data));
    },

    _logDebug: function(level) {
        if (this._originalConsoleMethods[level] && this.debug) {
            // In IE<10 console methods do not have their own 'apply' method
            Function.prototype.apply.call(
                this._originalConsoleMethods[level],
                this._originalConsole,
                [].slice.call(arguments, 1)
            );
        }
    },

    _mergeContext: function(key, context) {
        if (isUndefined(context)) {
            delete this._globalContext[key];
        } else {
            this._globalContext[key] = objectMerge(this._globalContext[key] || {}, context);
        }
    }
};

/*------------------------------------------------
 * utils
 *
 * conditionally exported for test via Raven.utils
 =================================================
 */
var objectPrototype = Object.prototype;

function isUndefined(what) {
    return what === void 0;
}

function isFunction(what) {
    return typeof what === 'function';
}

function isString(what) {
    return objectPrototype.toString.call(what) === '[object String]';
}


function isEmptyObject(what) {
    for (var _ in what) return false;  // eslint-disable-line guard-for-in, no-unused-vars
    return true;
}

function each(obj, callback) {
    var i, j;

    if (isUndefined(obj.length)) {
        for (i in obj) {
            if (hasKey(obj, i)) {
                callback.call(null, i, obj[i]);
            }
        }
    } else {
        j = obj.length;
        if (j) {
            for (i = 0; i < j; i++) {
                callback.call(null, i, obj[i]);
            }
        }
    }
}

function objectMerge(obj1, obj2) {
    if (!obj2) {
        return obj1;
    }
    each(obj2, function(key, value){
        obj1[key] = value;
    });
    return obj1;
}

function truncate(str, max) {
    return !max || str.length <= max ? str : str.substr(0, max) + '\u2026';
}

/**
 * hasKey, a better form of hasOwnProperty
 * Example: hasKey(MainHostObject, property) === true/false
 *
 * @param {Object} host object to check property
 * @param {string} key to check
 */
function hasKey(object, key) {
    return objectPrototype.hasOwnProperty.call(object, key);
}

function joinRegExp(patterns) {
    // Combine an array of regular expressions and strings into one large regexp
    // Be mad.
    var sources = [],
        i = 0, len = patterns.length,
        pattern;

    for (; i < len; i++) {
        pattern = patterns[i];
        if (isString(pattern)) {
            // If it's a string, we need to escape it
            // Taken from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
            sources.push(pattern.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1'));
        } else if (pattern && pattern.source) {
            // If it's a regexp already, we want to extract the source
            sources.push(pattern.source);
        }
        // Intentionally skip other cases
    }
    return new RegExp(sources.join('|'), 'i');
}

function urlencode(o) {
    var pairs = [];
    each(o, function(key, value) {
        pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    });
    return pairs.join('&');
}

// borrowed from https://tools.ietf.org/html/rfc3986#appendix-B
// intentionally using regex and not <a/> href parsing trick because React Native and other
// environments where DOM might not be available
function parseUrl(url) {
    var match = url.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
    if (!match) return {};

    // coerce to undefined values to empty string so we don't get 'undefined'
    var query = match[6] || '';
    var fragment = match[8] || '';
    return {
        protocol: match[2],
        host: match[4],
        path: match[5],
        relative: match[5] + query + fragment // everything minus origin
    };
}
function uuid4() {
    var crypto = _window.crypto || _window.msCrypto;

    if (!isUndefined(crypto) && crypto.getRandomValues) {
        // Use window.crypto API if available
        var arr = new Uint16Array(8);
        crypto.getRandomValues(arr);

        // set 4 in byte 7
        arr[3] = arr[3] & 0xFFF | 0x4000;
        // set 2 most significant bits of byte 9 to '10'
        arr[4] = arr[4] & 0x3FFF | 0x8000;

        var pad = function(num) {
            var v = num.toString(16);
            while (v.length < 4) {
                v = '0' + v;
            }
            return v;
        };

        return pad(arr[0]) + pad(arr[1]) + pad(arr[2]) + pad(arr[3]) + pad(arr[4]) +
        pad(arr[5]) + pad(arr[6]) + pad(arr[7]);
    } else {
        // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0,
                v = c === 'x' ? r : r&0x3|0x8;
            return v.toString(16);
        });
    }
}

/**
 * Given a child DOM element, returns a query-selector statement describing that
 * and its ancestors
 * e.g. [HTMLElement] => body > div > input#foo.btn[name=baz]
 * @param elem
 * @returns {string}
 */
function htmlTreeAsString(elem) {
    /* eslint no-extra-parens:0*/
    var MAX_TRAVERSE_HEIGHT = 5,
        MAX_OUTPUT_LEN = 80,
        out = [],
        height = 0,
        len = 0,
        separator = ' > ',
        sepLength = separator.length,
        nextStr;

    while (elem && height++ < MAX_TRAVERSE_HEIGHT) {

        nextStr = htmlElementAsString(elem);
        // bail out if
        // - nextStr is the 'html' element
        // - the length of the string that would be created exceeds MAX_OUTPUT_LEN
        //   (ignore this limit if we are on the first iteration)
        if (nextStr === 'html' || height > 1 && len + (out.length * sepLength) + nextStr.length >= MAX_OUTPUT_LEN) {
            break;
        }

        out.push(nextStr);

        len += nextStr.length;
        elem = elem.parentNode;
    }

    return out.reverse().join(separator);
}

/**
 * Returns a simple, query-selector representation of a DOM element
 * e.g. [HTMLElement] => input#foo.btn[name=baz]
 * @param HTMLElement
 * @returns {string}
 */
function htmlElementAsString(elem) {
    var out = [],
        className,
        classes,
        key,
        attr,
        i;

    if (!elem || !elem.tagName) {
        return '';
    }

    out.push(elem.tagName.toLowerCase());
    if (elem.id) {
        out.push('#' + elem.id);
    }

    className = elem.className;
    if (className && isString(className)) {
        classes = className.split(/\s+/);
        for (i = 0; i < classes.length; i++) {
            out.push('.' + classes[i]);
        }
    }
    var attrWhitelist = ['type', 'name', 'title', 'alt'];
    for (i = 0; i < attrWhitelist.length; i++) {
        key = attrWhitelist[i];
        attr = elem.getAttribute(key);
        if (attr) {
            out.push('[' + key + '="' + attr + '"]');
        }
    }
    return out.join('');
}

/**
 * Returns true if either a OR b is truthy, but not both
 */
function isOnlyOneTruthy(a, b) {
    return !!(!!a ^ !!b);
}

/**
 * Returns true if the two input exception interfaces have the same content
 */
function isSameException(ex1, ex2) {
    if (isOnlyOneTruthy(ex1, ex2))
        return false;

    ex1 = ex1.values[0];
    ex2 = ex2.values[0];

    if (ex1.type !== ex2.type ||
        ex1.value !== ex2.value)
        return false;

    return isSameStacktrace(ex1.stacktrace, ex2.stacktrace);
}

/**
 * Returns true if the two input stack trace interfaces have the same content
 */
function isSameStacktrace(stack1, stack2) {
    if (isOnlyOneTruthy(stack1, stack2))
        return false;

    var frames1 = stack1.frames;
    var frames2 = stack2.frames;

    // Exit early if frame count differs
    if (frames1.length !== frames2.length)
        return false;

    // Iterate through every frame; bail out if anything differs
    var a, b;
    for (var i = 0; i < frames1.length; i++) {
        a = frames1[i];
        b = frames2[i];
        if (a.filename !== b.filename ||
            a.lineno !== b.lineno ||
            a.colno !== b.colno ||
            a['function'] !== b['function'])
            return false;
    }
    return true;
}

/**
 * Polyfill a method
 * @param obj object e.g. `document`
 * @param name method name present on object e.g. `addEventListener`
 * @param replacement replacement function
 * @param track {optional} record instrumentation to an array
 */
function fill(obj, name, replacement, track) {
    var orig = obj[name];
    obj[name] = replacement(orig);
    if (track) {
        track.push([obj, name, orig]);
    }
}

if (typeof __DEV__ !== 'undefined' && __DEV__) {
    Raven.utils = {
        isUndefined: isUndefined,
        isFunction: isFunction,
        isString: isString,
        isObject: isObject,
        isEmptyObject: isEmptyObject,
        isError: isError,
        each: each,
        objectMerge: objectMerge,
        truncate: truncate,
        hasKey: hasKey,
        joinRegExp: joinRegExp,
        urlencode: urlencode,
        uuid4: uuid4,
        htmlTreeAsString: htmlTreeAsString,
        htmlElementAsString: htmlElementAsString,
        parseUrl: parseUrl,
        fill: fill
    };
};

// Deprecations
Raven.prototype.setUser = Raven.prototype.setUserContext;
Raven.prototype.setReleaseContext = Raven.prototype.setRelease;

module.exports = Raven;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * Enforces a single instance of the Raven client, and the
 * main entry point for Raven. If you are a consumer of the
 * Raven library, you SHOULD load this file (vs raven.js).
 **/



var RavenConstructor = __webpack_require__(20);

// This is to be defensive in environments where window does not exist (see https://github.com/getsentry/raven-js/pull/785)
var _window = typeof window !== 'undefined' ? window
            : typeof global !== 'undefined' ? global
            : typeof self !== 'undefined' ? self
            : {};
var _Raven = _window.Raven;

var Raven = new RavenConstructor();

/*
 * Allow multiple versions of Raven to be installed.
 * Strip Raven from the global context and returns the instance.
 *
 * @return {Raven}
 */
Raven.noConflict = function () {
	_window.Raven = _Raven;
	return Raven;
};

Raven.afterLoad();

module.exports = Raven;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var utils = __webpack_require__(6);

/*
 TraceKit - Cross brower stack traces

 This was originally forked from github.com/occ/TraceKit, but has since been
 largely re-written and is now maintained as part of raven-js.  Tests for
 this are in test/vendor.

 MIT license
*/

var TraceKit = {
    collectWindowErrors: true,
    debug: false
};

// This is to be defensive in environments where window does not exist (see https://github.com/getsentry/raven-js/pull/785)
var _window = typeof window !== 'undefined' ? window
            : typeof global !== 'undefined' ? global
            : typeof self !== 'undefined' ? self
            : {};

// global reference to slice
var _slice = [].slice;
var UNKNOWN_FUNCTION = '?';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Error_types
var ERROR_TYPES_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;

function getLocationHref() {
    if (typeof document === 'undefined' || typeof document.location === 'undefined')
        return '';

    return document.location.href;
}


/**
 * TraceKit.report: cross-browser processing of unhandled exceptions
 *
 * Syntax:
 *   TraceKit.report.subscribe(function(stackInfo) { ... })
 *   TraceKit.report.unsubscribe(function(stackInfo) { ... })
 *   TraceKit.report(exception)
 *   try { ...code... } catch(ex) { TraceKit.report(ex); }
 *
 * Supports:
 *   - Firefox: full stack trace with line numbers, plus column number
 *              on top frame; column number is not guaranteed
 *   - Opera:   full stack trace with line and column numbers
 *   - Chrome:  full stack trace with line and column numbers
 *   - Safari:  line and column number for the top frame only; some frames
 *              may be missing, and column number is not guaranteed
 *   - IE:      line and column number for the top frame only; some frames
 *              may be missing, and column number is not guaranteed
 *
 * In theory, TraceKit should work on all of the following versions:
 *   - IE5.5+ (only 8.0 tested)
 *   - Firefox 0.9+ (only 3.5+ tested)
 *   - Opera 7+ (only 10.50 tested; versions 9 and earlier may require
 *     Exceptions Have Stacktrace to be enabled in opera:config)
 *   - Safari 3+ (only 4+ tested)
 *   - Chrome 1+ (only 5+ tested)
 *   - Konqueror 3.5+ (untested)
 *
 * Requires TraceKit.computeStackTrace.
 *
 * Tries to catch all unhandled exceptions and report them to the
 * subscribed handlers. Please note that TraceKit.report will rethrow the
 * exception. This is REQUIRED in order to get a useful stack trace in IE.
 * If the exception does not reach the top of the browser, you will only
 * get a stack trace from the point where TraceKit.report was called.
 *
 * Handlers receive a stackInfo object as described in the
 * TraceKit.computeStackTrace docs.
 */
TraceKit.report = (function reportModuleWrapper() {
    var handlers = [],
        lastArgs = null,
        lastException = null,
        lastExceptionStack = null;

    /**
     * Add a crash handler.
     * @param {Function} handler
     */
    function subscribe(handler) {
        installGlobalHandler();
        handlers.push(handler);
    }

    /**
     * Remove a crash handler.
     * @param {Function} handler
     */
    function unsubscribe(handler) {
        for (var i = handlers.length - 1; i >= 0; --i) {
            if (handlers[i] === handler) {
                handlers.splice(i, 1);
            }
        }
    }

    /**
     * Remove all crash handlers.
     */
    function unsubscribeAll() {
        uninstallGlobalHandler();
        handlers = [];
    }

    /**
     * Dispatch stack information to all handlers.
     * @param {Object.<string, *>} stack
     */
    function notifyHandlers(stack, isWindowError) {
        var exception = null;
        if (isWindowError && !TraceKit.collectWindowErrors) {
          return;
        }
        for (var i in handlers) {
            if (handlers.hasOwnProperty(i)) {
                try {
                    handlers[i].apply(null, [stack].concat(_slice.call(arguments, 2)));
                } catch (inner) {
                    exception = inner;
                }
            }
        }

        if (exception) {
            throw exception;
        }
    }

    var _oldOnerrorHandler, _onErrorHandlerInstalled;

    /**
     * Ensures all global unhandled exceptions are recorded.
     * Supported by Gecko and IE.
     * @param {string} message Error message.
     * @param {string} url URL of script that generated the exception.
     * @param {(number|string)} lineNo The line number at which the error
     * occurred.
     * @param {?(number|string)} colNo The column number at which the error
     * occurred.
     * @param {?Error} ex The actual Error object.
     */
    function traceKitWindowOnError(message, url, lineNo, colNo, ex) {
        var stack = null;

        if (lastExceptionStack) {
            TraceKit.computeStackTrace.augmentStackTraceWithInitialElement(lastExceptionStack, url, lineNo, message);
            processLastException();
        } else if (ex && utils.isError(ex)) {
            // non-string `ex` arg; attempt to extract stack trace

            // New chrome and blink send along a real error object
            // Let's just report that like a normal error.
            // See: https://mikewest.org/2013/08/debugging-runtime-errors-with-window-onerror
            stack = TraceKit.computeStackTrace(ex);
            notifyHandlers(stack, true);
        } else {
            var location = {
                'url': url,
                'line': lineNo,
                'column': colNo
            };

            var name = undefined;
            var msg = message; // must be new var or will modify original `arguments`
            var groups;
            if ({}.toString.call(message) === '[object String]') {
                var groups = message.match(ERROR_TYPES_RE);
                if (groups) {
                    name = groups[1];
                    msg = groups[2];
                }
            }

            location.func = UNKNOWN_FUNCTION;

            stack = {
                'name': name,
                'message': msg,
                'url': getLocationHref(),
                'stack': [location]
            };
            notifyHandlers(stack, true);
        }

        if (_oldOnerrorHandler) {
            return _oldOnerrorHandler.apply(this, arguments);
        }

        return false;
    }

    function installGlobalHandler ()
    {
        if (_onErrorHandlerInstalled) {
            return;
        }
        _oldOnerrorHandler = _window.onerror;
        _window.onerror = traceKitWindowOnError;
        _onErrorHandlerInstalled = true;
    }

    function uninstallGlobalHandler ()
    {
        if (!_onErrorHandlerInstalled) {
            return;
        }
        _window.onerror = _oldOnerrorHandler;
        _onErrorHandlerInstalled = false;
        _oldOnerrorHandler = undefined;
    }

    function processLastException() {
        var _lastExceptionStack = lastExceptionStack,
            _lastArgs = lastArgs;
        lastArgs = null;
        lastExceptionStack = null;
        lastException = null;
        notifyHandlers.apply(null, [_lastExceptionStack, false].concat(_lastArgs));
    }

    /**
     * Reports an unhandled Error to TraceKit.
     * @param {Error} ex
     * @param {?boolean} rethrow If false, do not re-throw the exception.
     * Only used for window.onerror to not cause an infinite loop of
     * rethrowing.
     */
    function report(ex, rethrow) {
        var args = _slice.call(arguments, 1);
        if (lastExceptionStack) {
            if (lastException === ex) {
                return; // already caught by an inner catch block, ignore
            } else {
              processLastException();
            }
        }

        var stack = TraceKit.computeStackTrace(ex);
        lastExceptionStack = stack;
        lastException = ex;
        lastArgs = args;

        // If the stack trace is incomplete, wait for 2 seconds for
        // slow slow IE to see if onerror occurs or not before reporting
        // this exception; otherwise, we will end up with an incomplete
        // stack trace
        setTimeout(function () {
            if (lastException === ex) {
                processLastException();
            }
        }, (stack.incomplete ? 2000 : 0));

        if (rethrow !== false) {
            throw ex; // re-throw to propagate to the top level (and cause window.onerror)
        }
    }

    report.subscribe = subscribe;
    report.unsubscribe = unsubscribe;
    report.uninstall = unsubscribeAll;
    return report;
}());

/**
 * TraceKit.computeStackTrace: cross-browser stack traces in JavaScript
 *
 * Syntax:
 *   s = TraceKit.computeStackTrace(exception) // consider using TraceKit.report instead (see below)
 * Returns:
 *   s.name              - exception name
 *   s.message           - exception message
 *   s.stack[i].url      - JavaScript or HTML file URL
 *   s.stack[i].func     - function name, or empty for anonymous functions (if guessing did not work)
 *   s.stack[i].args     - arguments passed to the function, if known
 *   s.stack[i].line     - line number, if known
 *   s.stack[i].column   - column number, if known
 *
 * Supports:
 *   - Firefox:  full stack trace with line numbers and unreliable column
 *               number on top frame
 *   - Opera 10: full stack trace with line and column numbers
 *   - Opera 9-: full stack trace with line numbers
 *   - Chrome:   full stack trace with line and column numbers
 *   - Safari:   line and column number for the topmost stacktrace element
 *               only
 *   - IE:       no line numbers whatsoever
 *
 * Tries to guess names of anonymous functions by looking for assignments
 * in the source code. In IE and Safari, we have to guess source file names
 * by searching for function bodies inside all page scripts. This will not
 * work for scripts that are loaded cross-domain.
 * Here be dragons: some function names may be guessed incorrectly, and
 * duplicate functions may be mismatched.
 *
 * TraceKit.computeStackTrace should only be used for tracing purposes.
 * Logging of unhandled exceptions should be done with TraceKit.report,
 * which builds on top of TraceKit.computeStackTrace and provides better
 * IE support by utilizing the window.onerror event to retrieve information
 * about the top of the stack.
 *
 * Note: In IE and Safari, no stack trace is recorded on the Error object,
 * so computeStackTrace instead walks its *own* chain of callers.
 * This means that:
 *  * in Safari, some methods may be missing from the stack trace;
 *  * in IE, the topmost function in the stack trace will always be the
 *    caller of computeStackTrace.
 *
 * This is okay for tracing (because you are likely to be calling
 * computeStackTrace from the function you want to be the topmost element
 * of the stack trace anyway), but not okay for logging unhandled
 * exceptions (because your catch block will likely be far away from the
 * inner function that actually caused the exception).
 *
 */
TraceKit.computeStackTrace = (function computeStackTraceWrapper() {
    // Contents of Exception in various browsers.
    //
    // SAFARI:
    // ex.message = Can't find variable: qq
    // ex.line = 59
    // ex.sourceId = 580238192
    // ex.sourceURL = http://...
    // ex.expressionBeginOffset = 96
    // ex.expressionCaretOffset = 98
    // ex.expressionEndOffset = 98
    // ex.name = ReferenceError
    //
    // FIREFOX:
    // ex.message = qq is not defined
    // ex.fileName = http://...
    // ex.lineNumber = 59
    // ex.columnNumber = 69
    // ex.stack = ...stack trace... (see the example below)
    // ex.name = ReferenceError
    //
    // CHROME:
    // ex.message = qq is not defined
    // ex.name = ReferenceError
    // ex.type = not_defined
    // ex.arguments = ['aa']
    // ex.stack = ...stack trace...
    //
    // INTERNET EXPLORER:
    // ex.message = ...
    // ex.name = ReferenceError
    //
    // OPERA:
    // ex.message = ...message... (see the example below)
    // ex.name = ReferenceError
    // ex.opera#sourceloc = 11  (pretty much useless, duplicates the info in ex.message)
    // ex.stacktrace = n/a; see 'opera:config#UserPrefs|Exceptions Have Stacktrace'

    /**
     * Computes stack trace information from the stack property.
     * Chrome and Gecko use this property.
     * @param {Error} ex
     * @return {?Object.<string, *>} Stack trace information.
     */
    function computeStackTraceFromStackProp(ex) {
        if (typeof ex.stack === 'undefined' || !ex.stack) return;

        var chrome = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
            gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?)(?::(\d+))?(?::(\d+))?\s*$/i,
            winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,

            // Used to additionally parse URL/line/column from eval frames
            geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
            chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/,

            lines = ex.stack.split('\n'),
            stack = [],
            submatch,
            parts,
            element,
            reference = /^(.*) is undefined$/.exec(ex.message);

        for (var i = 0, j = lines.length; i < j; ++i) {
            if ((parts = chrome.exec(lines[i]))) {
                var isNative = parts[2] && parts[2].indexOf('native') === 0; // start of line
                var isEval = parts[2] && parts[2].indexOf('eval') === 0; // start of line
                if (isEval && (submatch = chromeEval.exec(parts[2]))) {
                    // throw out eval line/column and use top-most line/column number
                    parts[2] = submatch[1]; // url
                    parts[3] = submatch[2]; // line
                    parts[4] = submatch[3]; // column
                }
                element = {
                    'url': !isNative ? parts[2] : null,
                    'func': parts[1] || UNKNOWN_FUNCTION,
                    'args': isNative ? [parts[2]] : [],
                    'line': parts[3] ? +parts[3] : null,
                    'column': parts[4] ? +parts[4] : null
                };
            } else if ( parts = winjs.exec(lines[i]) ) {
                element = {
                    'url': parts[2],
                    'func': parts[1] || UNKNOWN_FUNCTION,
                    'args': [],
                    'line': +parts[3],
                    'column': parts[4] ? +parts[4] : null
                };
            } else if ((parts = gecko.exec(lines[i]))) {
                var isEval = parts[3] && parts[3].indexOf(' > eval') > -1;
                if (isEval && (submatch = geckoEval.exec(parts[3]))) {
                    // throw out eval line/column and use top-most line number
                    parts[3] = submatch[1];
                    parts[4] = submatch[2];
                    parts[5] = null; // no column when eval
                } else if (i === 0 && !parts[5] && typeof ex.columnNumber !== 'undefined') {
                    // FireFox uses this awesome columnNumber property for its top frame
                    // Also note, Firefox's column number is 0-based and everything else expects 1-based,
                    // so adding 1
                    // NOTE: this hack doesn't work if top-most frame is eval
                    stack[0].column = ex.columnNumber + 1;
                }
                element = {
                    'url': parts[3],
                    'func': parts[1] || UNKNOWN_FUNCTION,
                    'args': parts[2] ? parts[2].split(',') : [],
                    'line': parts[4] ? +parts[4] : null,
                    'column': parts[5] ? +parts[5] : null
                };
            } else {
                continue;
            }

            if (!element.func && element.line) {
                element.func = UNKNOWN_FUNCTION;
            }

            stack.push(element);
        }

        if (!stack.length) {
            return null;
        }

        return {
            'name': ex.name,
            'message': ex.message,
            'url': getLocationHref(),
            'stack': stack
        };
    }

    /**
     * Adds information about the first frame to incomplete stack traces.
     * Safari and IE require this to get complete data on the first frame.
     * @param {Object.<string, *>} stackInfo Stack trace information from
     * one of the compute* methods.
     * @param {string} url The URL of the script that caused an error.
     * @param {(number|string)} lineNo The line number of the script that
     * caused an error.
     * @param {string=} message The error generated by the browser, which
     * hopefully contains the name of the object that caused the error.
     * @return {boolean} Whether or not the stack information was
     * augmented.
     */
    function augmentStackTraceWithInitialElement(stackInfo, url, lineNo, message) {
        var initial = {
            'url': url,
            'line': lineNo
        };

        if (initial.url && initial.line) {
            stackInfo.incomplete = false;

            if (!initial.func) {
                initial.func = UNKNOWN_FUNCTION;
            }

            if (stackInfo.stack.length > 0) {
                if (stackInfo.stack[0].url === initial.url) {
                    if (stackInfo.stack[0].line === initial.line) {
                        return false; // already in stack trace
                    } else if (!stackInfo.stack[0].line && stackInfo.stack[0].func === initial.func) {
                        stackInfo.stack[0].line = initial.line;
                        return false;
                    }
                }
            }

            stackInfo.stack.unshift(initial);
            stackInfo.partial = true;
            return true;
        } else {
            stackInfo.incomplete = true;
        }

        return false;
    }

    /**
     * Computes stack trace information by walking the arguments.caller
     * chain at the time the exception occurred. This will cause earlier
     * frames to be missed but is the only way to get any stack trace in
     * Safari and IE. The top frame is restored by
     * {@link augmentStackTraceWithInitialElement}.
     * @param {Error} ex
     * @return {?Object.<string, *>} Stack trace information.
     */
    function computeStackTraceByWalkingCallerChain(ex, depth) {
        var functionName = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i,
            stack = [],
            funcs = {},
            recursion = false,
            parts,
            item,
            source;

        for (var curr = computeStackTraceByWalkingCallerChain.caller; curr && !recursion; curr = curr.caller) {
            if (curr === computeStackTrace || curr === TraceKit.report) {
                // console.log('skipping internal function');
                continue;
            }

            item = {
                'url': null,
                'func': UNKNOWN_FUNCTION,
                'line': null,
                'column': null
            };

            if (curr.name) {
                item.func = curr.name;
            } else if ((parts = functionName.exec(curr.toString()))) {
                item.func = parts[1];
            }

            if (typeof item.func === 'undefined') {
              try {
                item.func = parts.input.substring(0, parts.input.indexOf('{'));
              } catch (e) { }
            }

            if (funcs['' + curr]) {
                recursion = true;
            }else{
                funcs['' + curr] = true;
            }

            stack.push(item);
        }

        if (depth) {
            // console.log('depth is ' + depth);
            // console.log('stack is ' + stack.length);
            stack.splice(0, depth);
        }

        var result = {
            'name': ex.name,
            'message': ex.message,
            'url': getLocationHref(),
            'stack': stack
        };
        augmentStackTraceWithInitialElement(result, ex.sourceURL || ex.fileName, ex.line || ex.lineNumber, ex.message || ex.description);
        return result;
    }

    /**
     * Computes a stack trace for an exception.
     * @param {Error} ex
     * @param {(string|number)=} depth
     */
    function computeStackTrace(ex, depth) {
        var stack = null;
        depth = (depth == null ? 0 : +depth);

        try {
            stack = computeStackTraceFromStackProp(ex);
            if (stack) {
                return stack;
            }
        } catch (e) {
            if (TraceKit.debug) {
                throw e;
            }
        }

        try {
            stack = computeStackTraceByWalkingCallerChain(ex, depth + 1);
            if (stack) {
                return stack;
            }
        } catch (e) {
            if (TraceKit.debug) {
                throw e;
            }
        }
        return {
            'name': ex.name,
            'message': ex.message,
            'url': getLocationHref()
        };
    }

    computeStackTrace.augmentStackTraceWithInitialElement = augmentStackTraceWithInitialElement;
    computeStackTrace.computeStackTraceFromStackProp = computeStackTraceFromStackProp;

    return computeStackTrace;
}());

module.exports = TraceKit;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 json-stringify-safe
 Like JSON.stringify, but doesn't throw on circular references.

 Originally forked from https://github.com/isaacs/json-stringify-safe
 version 5.0.1 on 3/8/2017 and modified for IE8 compatibility.
 Tests for this are in test/vendor.

 ISC license: https://github.com/isaacs/json-stringify-safe/blob/master/LICENSE
*/

exports = module.exports = stringify
exports.getSerialize = serializer

function indexOf(haystack, needle) {
  for (var i = 0; i < haystack.length; ++i) {
    if (haystack[i] === needle) return i;
  }
  return -1;
}

function stringify(obj, replacer, spaces, cycleReplacer) {
  return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces)
}

function serializer(replacer, cycleReplacer) {
  var stack = [], keys = []

  if (cycleReplacer == null) cycleReplacer = function(key, value) {
    if (stack[0] === value) return '[Circular ~]'
    return '[Circular ~.' + keys.slice(0, indexOf(stack, value)).join('.') + ']'
  }

  return function(key, value) {
    if (stack.length > 0) {
      var thisPos = indexOf(stack, this);
      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)
      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key)
      if (~indexOf(stack, value)) value = cycleReplacer.call(this, key, value)
    }
    else stack.push(value)

    return replacer == null ? value : replacer.call(this, key, value)
  }
}


/***/ })
/******/ ]);