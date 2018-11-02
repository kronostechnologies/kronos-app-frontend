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
/******/ 	return __webpack_require__(__webpack_require__.s = 45);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var misc_1 = __webpack_require__(2);
// TODO: Implement different loggers for different environments
var global = misc_1.getGlobalObject();
/** JSDoc */
var Logger = /** @class */ (function () {
    /** JSDoc */
    function Logger() {
        this.enabled = false;
    }
    /** JSDoc */
    Logger.prototype.disable = function () {
        this.enabled = false;
    };
    /** JSDoc */
    Logger.prototype.enable = function () {
        this.enabled = true;
    };
    /** JSDoc */
    Logger.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.enabled) {
            return;
        }
        misc_1.consoleSandbox(function () {
            global.console.log("Sentry Logger [Log]: " + args.join(' ')); // tslint:disable-line:no-console
        });
    };
    /** JSDoc */
    Logger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.enabled) {
            return;
        }
        misc_1.consoleSandbox(function () {
            global.console.warn("Sentry Logger [Warn]: " + args.join(' ')); // tslint:disable-line:no-console
        });
    };
    /** JSDoc */
    Logger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.enabled) {
            return;
        }
        misc_1.consoleSandbox(function () {
            global.console.error("Sentry Logger [Error]: " + args.join(' ')); // tslint:disable-line:no-console
        });
    };
    return Logger;
}());
var logger = new Logger();
exports.logger = logger;
//# sourceMappingURL=logger.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var scope_1 = __webpack_require__(12);
exports.addGlobalEventProcessor = scope_1.addGlobalEventProcessor;
exports.Scope = scope_1.Scope;
var hub_1 = __webpack_require__(39);
exports.getCurrentHub = hub_1.getCurrentHub;
exports.getHubFromCarrier = hub_1.getHubFromCarrier;
exports.getMainCarrier = hub_1.getMainCarrier;
exports.Hub = hub_1.Hub;
exports.setHubOnCarrier = hub_1.setHubOnCarrier;
//# sourceMappingURL=index.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global) {
Object.defineProperty(exports, "__esModule", { value: true });
var is_1 = __webpack_require__(3);
/**
 * Requires a module which is protected against bundler minification.
 *
 * @param request The module path to resolve
 */
function dynamicRequire(mod, request) {
    return mod.require(request);
}
exports.dynamicRequire = dynamicRequire;
/**
 * Checks whether we're in the Node.js or Browser environment
 *
 * @returns Answer to given question
 */
function isNodeEnv() {
    // tslint:disable:strict-type-predicates
    return Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';
}
exports.isNodeEnv = isNodeEnv;
/**
 * Safely get global scope object
 *
 * @returns Global scope object
 */
// tslint:disable:strict-type-predicates
function getGlobalObject() {
    return isNodeEnv() ? global : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : {};
}
exports.getGlobalObject = getGlobalObject;
/**
 * UUID4 generator
 *
 * @returns string Generated UUID4.
 */
function uuid4() {
    var global = getGlobalObject();
    var crypto = global.crypto || global.msCrypto;
    if (!(crypto === void 0) && crypto.getRandomValues) {
        // Use window.crypto API if available
        var arr = new Uint16Array(8);
        crypto.getRandomValues(arr);
        // set 4 in byte 7
        // tslint:disable-next-line:no-bitwise
        arr[3] = (arr[3] & 0xfff) | 0x4000;
        // set 2 most significant bits of byte 9 to '10'
        // tslint:disable-next-line:no-bitwise
        arr[4] = (arr[4] & 0x3fff) | 0x8000;
        var pad = function (num) {
            var v = num.toString(16);
            while (v.length < 4) {
                v = "0" + v;
            }
            return v;
        };
        return (pad(arr[0]) + pad(arr[1]) + pad(arr[2]) + pad(arr[3]) + pad(arr[4]) + pad(arr[5]) + pad(arr[6]) + pad(arr[7]));
    }
    else {
        // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            // tslint:disable-next-line:no-bitwise
            var r = (Math.random() * 16) | 0;
            // tslint:disable-next-line:no-bitwise
            var v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
}
exports.uuid4 = uuid4;
/**
 * Given a child DOM element, returns a query-selector statement describing that
 * and its ancestors
 * e.g. [HTMLElement] => body > div > input#foo.btn[name=baz]
 * @returns generated DOM path
 */
function htmlTreeAsString(elem) {
    var currentElem = elem;
    var MAX_TRAVERSE_HEIGHT = 5;
    var MAX_OUTPUT_LEN = 80;
    var out = [];
    var height = 0;
    var len = 0;
    var separator = ' > ';
    var sepLength = separator.length;
    var nextStr;
    while (currentElem && height++ < MAX_TRAVERSE_HEIGHT) {
        nextStr = htmlElementAsString(currentElem);
        // bail out if
        // - nextStr is the 'html' element
        // - the length of the string that would be created exceeds MAX_OUTPUT_LEN
        //   (ignore this limit if we are on the first iteration)
        if (nextStr === 'html' || (height > 1 && len + out.length * sepLength + nextStr.length >= MAX_OUTPUT_LEN)) {
            break;
        }
        out.push(nextStr);
        len += nextStr.length;
        currentElem = currentElem.parentNode;
    }
    return out.reverse().join(separator);
}
exports.htmlTreeAsString = htmlTreeAsString;
/**
 * Returns a simple, query-selector representation of a DOM element
 * e.g. [HTMLElement] => input#foo.btn[name=baz]
 * @returns generated DOM path
 */
function htmlElementAsString(elem) {
    var out = [];
    var className;
    var classes;
    var key;
    var attr;
    var i;
    if (!elem || !elem.tagName) {
        return '';
    }
    out.push(elem.tagName.toLowerCase());
    if (elem.id) {
        out.push("#" + elem.id);
    }
    className = elem.className;
    if (className && is_1.isString(className)) {
        classes = className.split(/\s+/);
        for (i = 0; i < classes.length; i++) {
            out.push("." + classes[i]);
        }
    }
    var attrWhitelist = ['type', 'name', 'title', 'alt'];
    for (i = 0; i < attrWhitelist.length; i++) {
        key = attrWhitelist[i];
        attr = elem.getAttribute(key);
        if (attr) {
            out.push("[" + key + "=\"" + attr + "\"]");
        }
    }
    return out.join('');
}
exports.htmlElementAsString = htmlElementAsString;
/**
 * Parses string form of URL into an object
 * // borrowed from https://tools.ietf.org/html/rfc3986#appendix-B
 * // intentionally using regex and not <a/> href parsing trick because React Native and other
 * // environments where DOM might not be available
 * @returns parsed URL object
 */
function parseUrl(url) {
    if (!url) {
        return {};
    }
    var match = url.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
    if (!match) {
        return {};
    }
    // coerce to undefined values to empty string so we don't get 'undefined'
    var query = match[6] || '';
    var fragment = match[8] || '';
    return {
        host: match[4],
        path: match[5],
        protocol: match[2],
        relative: match[5] + query + fragment,
    };
}
exports.parseUrl = parseUrl;
/**
 * Extracts either message or type+value from an event that can be used for user-facing logs
 * @returns event's description
 */
function getEventDescription(event) {
    if (event.message) {
        return event.message;
    }
    else if (event.exception && event.exception.values && event.exception.values[0]) {
        var exception = event.exception.values[0];
        if (exception.type && exception.value) {
            return exception.type + ": " + exception.value;
        }
        else {
            return exception.type || exception.value || event.event_id || '<unknown>';
        }
    }
    else {
        return event.event_id || '<unknown>';
    }
}
exports.getEventDescription = getEventDescription;
/** JSDoc */
function consoleSandbox(callback) {
    var global = getGlobalObject();
    var levels = ['debug', 'info', 'warn', 'error', 'log'];
    if (!('console' in global)) {
        return callback();
    }
    var originalConsole = global.console;
    var wrappedLevels = {};
    // Restore all wrapped console methods
    levels.forEach(function (level) {
        if (level in global.console && originalConsole[level].__sentry__) {
            wrappedLevels[level] = originalConsole[level].__sentry_wrapped__;
            originalConsole[level] = originalConsole[level].__sentry_original__;
        }
    });
    // Perform callback manipulations
    var result = callback();
    // Revert restoration to wrapped state
    Object.keys(wrappedLevels).forEach(function (level) {
        originalConsole[level] = wrappedLevels[level];
    });
    return result;
}
exports.consoleSandbox = consoleSandbox;
//# sourceMappingURL=misc.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15), __webpack_require__(16)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Checks whether given value's type is one of a few Error or Error-like
 * {@link isError}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isError(wat) {
    switch (Object.prototype.toString.call(wat)) {
        case '[object Error]':
            return true;
        case '[object Exception]':
            return true;
        case '[object DOMException]':
            return true;
        default:
            return wat instanceof Error;
    }
}
exports.isError = isError;
/**
 * Checks whether given value's type is ErrorEvent
 * {@link isErrorEvent}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isErrorEvent(wat) {
    return Object.prototype.toString.call(wat) === '[object ErrorEvent]';
}
exports.isErrorEvent = isErrorEvent;
/**
 * Checks whether given value's type is DOMError
 * {@link isDOMError}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isDOMError(wat) {
    return Object.prototype.toString.call(wat) === '[object DOMError]';
}
exports.isDOMError = isDOMError;
/**
 * Checks whether given value's type is DOMException
 * {@link isDOMException}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isDOMException(wat) {
    return Object.prototype.toString.call(wat) === '[object DOMException]';
}
exports.isDOMException = isDOMException;
/**
 * Checks whether given value's type is an undefined
 * {@link isUndefined}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isUndefined(wat) {
    return wat === void 0;
}
exports.isUndefined = isUndefined;
/**
 * Checks whether given value's type is a function
 * {@link isFunction}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isFunction(wat) {
    return typeof wat === 'function';
}
exports.isFunction = isFunction;
/**
 * Checks whether given value's type is a string
 * {@link isString}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isString(wat) {
    return Object.prototype.toString.call(wat) === '[object String]';
}
exports.isString = isString;
/**
 * Checks whether given value's type is an array
 * {@link isArray}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isArray(wat) {
    return Object.prototype.toString.call(wat) === '[object Array]';
}
exports.isArray = isArray;
/**
 * Checks whether given value's type is an object literal
 * {@link isPlainObject}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isPlainObject(wat) {
    return Object.prototype.toString.call(wat) === '[object Object]';
}
exports.isPlainObject = isPlainObject;
/**
 * Checks whether given value's type is an regexp
 * {@link isRegExp}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isRegExp(wat) {
    return Object.prototype.toString.call(wat) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
/**
 * Checks whether given value's type is a NaN
 * {@link isNaN}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isNaN(wat) {
    return wat !== wat;
}
exports.isNaN = isNaN;
//# sourceMappingURL=is.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.FetchResponseDataError = exports.FetchAbortError = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _es6Error = __webpack_require__(46);

var _es6Error2 = _interopRequireDefault(_es6Error);

var _jqueryParam = __webpack_require__(47);

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
			return abortable.promise.catch(function (error) {

				if (FetchService.isTypeErrorError(error) && !FetchService.isFetchAbortError(error)) {
					_this3.app.detectedNetworkError();
					throw new FetchAbortError();
				}

				throw error;
			}).then(function (response) {
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
	}, {
		key: 'isFetchAbortError',
		value: function isFetchAbortError(error) {
			return (typeof error === 'undefined' ? 'undefined' : _typeof(error)) === 'object' && error instanceof FetchAbortError;
		}
	}, {
		key: 'isTypeErrorError',
		value: function isTypeErrorError(error) {
			return (typeof error === 'undefined' ? 'undefined' : _typeof(error)) === 'object' && error instanceof TypeError;
		}
	}]);

	return FetchService;
}();

exports.default = FetchService;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var is_1 = __webpack_require__(3);
var object_1 = __webpack_require__(7);
var error_1 = __webpack_require__(6);
/** Regular expression used to parse a Dsn. */
var DSN_REGEX = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w\.-]+)(?::(\d+))?\/(.+)/;
/** The Sentry Dsn, identifying a Sentry instance and project. */
var Dsn = /** @class */ (function () {
    /** Creates a new Dsn component */
    function Dsn(from) {
        if (typeof from === 'string') {
            this.fromString(from);
        }
        else {
            this.fromComponents(from);
        }
        this.validate();
    }
    /**
     * Renders the string representation of this Dsn.
     *
     * By default, this will render the public representation without the password
     * component. To get the deprecated private representation, set `withPassword`
     * to true.
     *
     * @param withPassword When set to true, the password will be included.
     */
    Dsn.prototype.toString = function (withPassword) {
        if (withPassword === void 0) { withPassword = false; }
        // tslint:disable-next-line:no-this-assignment
        var _a = this, host = _a.host, path = _a.path, pass = _a.pass, port = _a.port, projectId = _a.projectId, protocol = _a.protocol, user = _a.user;
        return (protocol + "://" + user + (withPassword && pass ? ":" + pass : '') +
            ("@" + host + (port ? ":" + port : '') + "/" + (path ? path + "/" : path) + projectId));
    };
    /** Parses a string into this Dsn. */
    Dsn.prototype.fromString = function (str) {
        var match = DSN_REGEX.exec(str);
        if (!match) {
            throw new error_1.SentryError('Invalid Dsn');
        }
        var _a = __read(match.slice(1), 6), protocol = _a[0], user = _a[1], _b = _a[2], pass = _b === void 0 ? '' : _b, host = _a[3], _c = _a[4], port = _c === void 0 ? '' : _c, lastPath = _a[5];
        var path = '';
        var projectId = lastPath;
        var split = projectId.split('/');
        if (split.length > 1) {
            path = split.slice(0, -1).join('/');
            projectId = split.pop();
        }
        object_1.assign(this, { host: host, pass: pass, path: path, projectId: projectId, port: port, protocol: protocol, user: user });
    };
    /** Maps Dsn components into this instance. */
    Dsn.prototype.fromComponents = function (components) {
        this.protocol = components.protocol;
        this.user = components.user;
        this.pass = components.pass || '';
        this.host = components.host;
        this.port = components.port || '';
        this.path = components.path || '';
        this.projectId = components.projectId;
    };
    /** Validates this Dsn and throws on error. */
    Dsn.prototype.validate = function () {
        var e_1, _a;
        try {
            for (var _b = __values(['protocol', 'user', 'host', 'projectId']), _c = _b.next(); !_c.done; _c = _b.next()) {
                var component = _c.value;
                if (!this[component]) {
                    throw new error_1.SentryError("Invalid Dsn: Missing " + component);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (this.protocol !== 'http' && this.protocol !== 'https') {
            throw new error_1.SentryError("Invalid Dsn: Unsupported protocol \"" + this.protocol + "\"");
        }
        if (this.port && is_1.isNaN(parseInt(this.port, 10))) {
            throw new error_1.SentryError("Invalid Dsn: Invalid port number \"" + this.port + "\"");
        }
    };
    return Dsn;
}());
exports.Dsn = Dsn;
//# sourceMappingURL=dsn.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/** An error emitted by Sentry SDKs and related utilities. */
var SentryError = /** @class */ (function (_super) {
    __extends(SentryError, _super);
    function SentryError(message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        _this.message = message;
        // tslint:disable:no-unsafe-any
        _this.name = _newTarget.prototype.constructor.name;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return SentryError;
}(Error));
exports.SentryError = SentryError;
//# sourceMappingURL=error.js.map

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var is_1 = __webpack_require__(3);
/**
 * Transforms Error object into an object literal with all it's attributes
 * attached to it.
 *
 * Based on: https://github.com/ftlabs/js-abbreviate/blob/fa709e5f139e7770a71827b1893f22418097fbda/index.js#L95-L106
 *
 * @param error An Error containing all relevant information
 * @returns An object with all error properties
 */
function objectifyError(error) {
    // These properties are implemented as magical getters and don't show up in `for-in` loop
    var err = {
        message: error.message,
        name: error.name,
        stack: error.stack,
    };
    for (var i in error) {
        if (Object.prototype.hasOwnProperty.call(error, i)) {
            err[i] = error[i];
        }
    }
    return err;
}
var NAN_VALUE = '[NaN]';
var UNDEFINED_VALUE = '[undefined]';
/**
 * Serializer function used as 2nd argument to JSON.serialize in `serialize()` util function.
 */
function serializer() {
    var stack = [];
    var keys = [];
    var cycleReplacer = function (_, value) {
        if (stack[0] === value) {
            return '[Circular ~]';
        }
        return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join('.') + "]";
    };
    return function (key, value) {
        var currentValue = value;
        // NaN and undefined are not JSON.parseable, but we want to preserve this information
        if (is_1.isNaN(value)) {
            currentValue = NAN_VALUE;
        }
        else if (is_1.isUndefined(value)) {
            currentValue = UNDEFINED_VALUE;
        }
        if (stack.length > 0) {
            var thisPos = stack.indexOf(this);
            if (thisPos !== -1) {
                stack.splice(thisPos + 1);
                keys.splice(thisPos, Infinity, key);
            }
            else {
                stack.push(this);
                keys.push(key);
            }
            if (stack.indexOf(currentValue) !== -1) {
                currentValue = cycleReplacer.call(this, key, currentValue);
            }
        }
        else {
            stack.push(currentValue);
        }
        return currentValue instanceof Error ? objectifyError(currentValue) : currentValue;
    };
}
/**
 * Reviver function used as 2nd argument to JSON.parse in `deserialize()` util function.
 */
function reviver(_key, value) {
    // NaN and undefined are not JSON.parseable, but we want to preserve this information
    if (value === NAN_VALUE) {
        return NaN;
    }
    if (value === UNDEFINED_VALUE) {
        return undefined;
    }
    return value;
}
/**
 * Serializes the given object into a string.
 * Like JSON.stringify, but doesn't throw on circular references.
 * Based on a `json-stringify-safe` package and modified to handle Errors serialization.
 *
 * The object must be serializable, i.e.:
 *  - Only primitive types are allowed (object, array, number, string, boolean)
 *  - Its depth should be considerably low for performance reasons
 *
 * @param object A JSON-serializable object.
 * @returns A string containing the serialized object.
 */
function serialize(object) {
    return JSON.stringify(object, serializer());
}
exports.serialize = serialize;
/**
 * Deserializes an object from a string previously serialized with
 * {@link serialize}.
 *
 * @param str A serialized object.
 * @returns The deserialized object.
 */
function deserialize(str) {
    return JSON.parse(str, reviver);
}
exports.deserialize = deserialize;
/**
 * Creates a deep copy of the given object.
 *
 * The object must be serializable, i.e.:
 *  - It must not contain any cycles
 *  - Only primitive types are allowed (object, array, number, string, boolean)
 *  - Its depth should be considerably low for performance reasons
 *
 * @param object A JSON-serializable object.
 * @returns The object clone.
 */
function clone(object) {
    return deserialize(serialize(object));
}
exports.clone = clone;
/**
 * Wrap a given object method with a higher-order function
 *
 * @param source An object that contains a method to be wrapped.
 * @param name A name of method to be wrapped.
 * @param replacement A function that should be used to wrap a given method.
 * @returns void
 */
function fill(source, name, replacement) {
    if (!(name in source) || source[name].__sentry__) {
        return;
    }
    var original = source[name];
    var wrapped = replacement(original);
    wrapped.__sentry__ = true;
    wrapped.__sentry_original__ = original;
    wrapped.__sentry_wrapped__ = wrapped;
    source[name] = wrapped;
}
exports.fill = fill;
/**
 * Encodes given object into url-friendly format
 *
 * @param object An object that contains serializable values
 * @returns string Encoded
 */
function urlEncode(object) {
    return Object.keys(object)
        .map(
    // tslint:disable-next-line:no-unsafe-any
    function (key) { return encodeURIComponent(key) + "=" + encodeURIComponent(object[key]); })
        .join('&');
}
exports.urlEncode = urlEncode;
// Default Node.js REPL depth
var MAX_SERIALIZE_EXCEPTION_DEPTH = 3;
// TODO: Or is it 200kb? 🤔 — Kamil
// NOTE: Yes, it is
// 50kB, as 100kB is max payload size, so half sounds reasonable
var MAX_SERIALIZE_EXCEPTION_SIZE = 50 * 1024;
var MAX_SERIALIZE_KEYS_LENGTH = 40;
/** JSDoc */
function utf8Length(value) {
    // tslint:disable-next-line:no-bitwise
    return ~-encodeURI(value).split(/%..|./).length;
}
/** JSDoc */
function jsonSize(value) {
    return utf8Length(JSON.stringify(value));
}
/** JSDoc */
function serializeValue(value) {
    var maxLength = 40;
    if (typeof value === 'string') {
        return value.length <= maxLength ? value : value.substr(0, maxLength - 1) + "\u2026";
    }
    else if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'undefined') {
        return value;
    }
    else if (is_1.isNaN(value)) {
        // NaN and undefined are not JSON.parseable, but we want to preserve this information
        return '[NaN]';
    }
    else if (is_1.isUndefined(value)) {
        return '[undefined]';
    }
    var type = Object.prototype.toString.call(value);
    // Node.js REPL notation
    if (type === '[object Object]') {
        return '[Object]';
    }
    if (type === '[object Array]') {
        return '[Array]';
    }
    if (type === '[object Function]') {
        var name_1 = value.name;
        return name_1 ? "[Function: " + name_1 + "]" : '[Function]';
    }
    return value;
}
/** JSDoc */
function serializeObject(value, depth) {
    if (depth === 0) {
        return serializeValue(value);
    }
    if (is_1.isPlainObject(value)) {
        var serialized_1 = {};
        var val_1 = value;
        Object.keys(val_1).forEach(function (key) {
            serialized_1[key] = serializeObject(val_1[key], depth - 1);
        });
        return serialized_1;
    }
    else if (Array.isArray(value)) {
        var val = value;
        return val.map(function (v) { return serializeObject(v, depth - 1); });
    }
    return serializeValue(value);
}
exports.serializeObject = serializeObject;
/** JSDoc */
function limitObjectDepthToSize(object, depth, maxSize) {
    if (depth === void 0) { depth = MAX_SERIALIZE_EXCEPTION_DEPTH; }
    if (maxSize === void 0) { maxSize = MAX_SERIALIZE_EXCEPTION_SIZE; }
    var serialized = serializeObject(object, depth);
    if (jsonSize(serialize(serialized)) > maxSize) {
        return limitObjectDepthToSize(object, depth - 1);
    }
    return serialized;
}
exports.limitObjectDepthToSize = limitObjectDepthToSize;
/** JSDoc */
function serializeKeysToEventMessage(keys, maxLength) {
    if (maxLength === void 0) { maxLength = MAX_SERIALIZE_KEYS_LENGTH; }
    if (!keys.length) {
        return '[object has no keys]';
    }
    if (keys[0].length >= maxLength) {
        return keys[0];
    }
    for (var includedKeys = keys.length; includedKeys > 0; includedKeys--) {
        var serialized = keys.slice(0, includedKeys).join(', ');
        if (serialized.length > maxLength) {
            continue;
        }
        if (includedKeys === keys.length) {
            return serialized;
        }
        return serialized + "\u2026";
    }
    return '';
}
exports.serializeKeysToEventMessage = serializeKeysToEventMessage;
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
/** JSDoc */
function assign(target) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var e_1, _a;
    if (target === null || target === undefined) {
        throw new TypeError('Cannot convert undefined or null to object');
    }
    var to = Object(target);
    try {
        for (var args_1 = __values(args), args_1_1 = args_1.next(); !args_1_1.done; args_1_1 = args_1.next()) {
            var source = args_1_1.value;
            if (source !== null) {
                for (var nextKey in source) {
                    if (Object.prototype.hasOwnProperty.call(source, nextKey)) {
                        to[nextKey] = source[nextKey];
                    }
                }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (args_1_1 && !args_1_1.done && (_a = args_1.return)) _a.call(args_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return to;
}
exports.assign = assign;
//# sourceMappingURL=object.js.map

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = __webpack_require__(14);

var _events2 = _interopRequireDefault(_events);

var _browser = __webpack_require__(24);

var Sentry = _interopRequireWildcard(_browser);

var _BrowserDetect = __webpack_require__(9);

var _BrowserDetect2 = _interopRequireDefault(_BrowserDetect);

var _FetchService = __webpack_require__(4);

var _FetchService2 = _interopRequireDefault(_FetchService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
				Sentry.captureException(error);
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
				throw this._throw('Application version not defined in configuration', true);
			}
			this._application_version = config.application_version;

			if (_typeof(config.user) !== 'object') {
				throw 'No user info in application configuration';
			}

			if (config && config.sentry) {

				Sentry.configureScope(function (scope) {
					scope.setTag('version', config.application_version);
					scope.setUser({
						email: config.user.email,
						id: config.user.id,
						name: config.user.name
					});
					scope.setExtra('transaction', config.kronos_transaction_id);
				});

				Sentry.init({
					'dsn': config.sentry.dsn,
					'release': config.application_version,
					'environment': 'eric-dev'
				});

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
			return _FetchService2.default.isFetchAbortError(error);
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
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = __webpack_require__(14);

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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/** A simple queue that holds promises. */
var RequestBuffer = /** @class */ (function () {
    function RequestBuffer() {
        /** Internal set of queued Promises */
        this.buffer = [];
    }
    /**
     * Add a promise to the queue.
     *
     * @param task Can be any Promise<T>
     * @returns The original promise.
     */
    RequestBuffer.prototype.add = function (task) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.buffer.indexOf(task) === -1) {
                    this.buffer.push(task);
                }
                task.then(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, this.remove(task)];
                }); }); }).catch(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, this.remove(task)];
                }); }); });
                return [2 /*return*/, task];
            });
        });
    };
    /**
     * Remove a promise to the queue.
     *
     * @param task Can be any Promise<T>
     * @returns Removed promise.
     */
    RequestBuffer.prototype.remove = function (task) {
        return __awaiter(this, void 0, void 0, function () {
            var removedTask;
            return __generator(this, function (_a) {
                removedTask = this.buffer.splice(this.buffer.indexOf(task), 1)[0];
                return [2 /*return*/, removedTask];
            });
        });
    };
    /**
     * This function returns the number of unresolved promises in the queue.
     */
    RequestBuffer.prototype.length = function () {
        return this.buffer.length;
    };
    /**
     * This will drain the whole queue, returns true if queue is empty or drained.
     * If timeout is provided and the queue takes longer to drain, the promise still resolves but with false.
     *
     * @param timeout Number in ms to wait until it resolves with false.
     */
    RequestBuffer.prototype.drain = function (timeout) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        var capturedSetTimeout = setTimeout(function () {
                            if (timeout && timeout > 0) {
                                resolve(false);
                            }
                        }, timeout);
                        Promise.all(_this.buffer)
                            .then(function () {
                            clearTimeout(capturedSetTimeout);
                            resolve(true);
                        })
                            .catch(function () {
                            resolve(true);
                        });
                    })];
            });
        });
    };
    return RequestBuffer;
}());
exports.RequestBuffer = RequestBuffer;
//# sourceMappingURL=requestbuffer.js.map

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var misc_1 = __webpack_require__(2);
var object_1 = __webpack_require__(7);
/**
 * Holds additional event information. {@link Scope.applyToEvent} will be
 * called by the client before an event will be sent.
 */
var Scope = /** @class */ (function () {
    function Scope() {
        /** Flag if notifiying is happening. */
        this.notifyingListeners = false;
        /** Callback for client to receive scope changes. */
        this.scopeListeners = [];
        /** Callback list that will be called after {@link applyToEvent}. */
        this.eventProcessors = [];
        /** Array of breadcrumbs. */
        this.breadcrumbs = [];
        /** User */
        this.user = {};
        /** Tags */
        this.tags = {};
        /** Extra */
        this.extra = {};
    }
    /** Add internal on change listener. */
    Scope.prototype.addScopeListener = function (callback) {
        this.scopeListeners.push(callback);
    };
    /** Add new event processor that will be called after {@link applyToEvent}. */
    Scope.prototype.addEventProcessor = function (callback) {
        this.eventProcessors.push(callback);
        return this;
    };
    /**
     * This will be called on every set call.
     */
    Scope.prototype.notifyScopeListeners = function () {
        var _this = this;
        if (!this.notifyingListeners) {
            this.notifyingListeners = true;
            setTimeout(function () {
                _this.scopeListeners.forEach(function (callback) {
                    callback(_this);
                });
                _this.notifyingListeners = false;
            }, 0);
        }
    };
    /**
     * This will be called after {@link applyToEvent} is finished.
     */
    Scope.prototype.notifyEventProcessors = function (event, hint) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, _a, processedEvent, _b, _c, processor, e_2, e_1_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        processedEvent = event;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 8, 9, 10]);
                        _b = __values(__spread(getGlobalEventProcessors(), this.eventProcessors)), _c = _b.next();
                        _d.label = 2;
                    case 2:
                        if (!!_c.done) return [3 /*break*/, 7];
                        processor = _c.value;
                        _d.label = 3;
                    case 3:
                        _d.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, processor(__assign({}, processedEvent), hint)];
                    case 4:
                        processedEvent = _d.sent();
                        if (processedEvent === null) {
                            return [2 /*return*/, null];
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        e_2 = _d.sent();
                        return [3 /*break*/, 6];
                    case 6:
                        _c = _b.next();
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/, processedEvent];
                }
            });
        });
    };
    /**
     * Updates user context information for future events.
     * @param user User context object to merge into current context.
     */
    Scope.prototype.setUser = function (user) {
        this.user = user;
        this.notifyScopeListeners();
        return this;
    };
    /**
     * Updates tags context information for future events.
     * @param tags Tags context object to merge into current context.
     */
    Scope.prototype.setTag = function (key, value) {
        var _a;
        this.tags = __assign({}, this.tags, (_a = {}, _a[key] = value, _a));
        this.notifyScopeListeners();
        return this;
    };
    /**
     * Updates extra context information for future events.
     * @param extra context object to merge into current context.
     */
    Scope.prototype.setExtra = function (key, extra) {
        var _a;
        this.extra = __assign({}, this.extra, (_a = {}, _a[key] = extra, _a));
        this.notifyScopeListeners();
        return this;
    };
    /**
     * Sets the fingerprint on the scope to send with the events.
     * @param fingerprint string[] to group events in Sentry.
     */
    Scope.prototype.setFingerprint = function (fingerprint) {
        this.fingerprint = fingerprint;
        this.notifyScopeListeners();
        return this;
    };
    /**
     * Sets the level on the scope for future events.
     * @param level string {@link Severity}
     */
    Scope.prototype.setLevel = function (level) {
        this.level = level;
        this.notifyScopeListeners();
        return this;
    };
    /**
     * Inherit values from the parent scope.
     * @param scope to clone.
     */
    Scope.clone = function (scope) {
        var newScope = new Scope();
        object_1.assign(newScope, scope, {
            scopeListeners: [],
        });
        if (scope) {
            newScope.extra = object_1.assign(scope.extra);
            newScope.tags = object_1.assign(scope.tags);
            newScope.breadcrumbs = __spread(scope.breadcrumbs);
            newScope.eventProcessors = __spread(scope.eventProcessors);
        }
        return newScope;
    };
    /** Clears the current scope and resets its properties. */
    Scope.prototype.clear = function () {
        this.breadcrumbs = [];
        this.tags = {};
        this.extra = {};
        this.user = {};
        this.level = undefined;
        this.fingerprint = undefined;
        this.notifyScopeListeners();
    };
    /**
     * Sets the breadcrumbs in the scope
     * @param breadcrumbs Breadcrumb
     * @param maxBreadcrumbs number of max breadcrumbs to merged into event.
     */
    Scope.prototype.addBreadcrumb = function (breadcrumb, maxBreadcrumbs) {
        this.breadcrumbs =
            maxBreadcrumbs !== undefined && maxBreadcrumbs >= 0
                ? __spread(this.breadcrumbs, [breadcrumb]).slice(-maxBreadcrumbs)
                : __spread(this.breadcrumbs, [breadcrumb]);
        this.notifyScopeListeners();
    };
    /**
     * Applies the current context and fingerprint to the event.
     * Note that breadcrumbs will be added by the client.
     * Also if the event has already breadcrumbs on it, we do not merge them.
     * @param event SentryEvent
     * @param hint May contain additional informartion about the original exception.
     * @param maxBreadcrumbs number of max breadcrumbs to merged into event.
     */
    Scope.prototype.applyToEvent = function (event, hint, maxBreadcrumbs) {
        return __awaiter(this, void 0, void 0, function () {
            var hasNoBreadcrumbs;
            return __generator(this, function (_a) {
                if (this.extra && Object.keys(this.extra).length) {
                    event.extra = __assign({}, this.extra, event.extra);
                }
                if (this.tags && Object.keys(this.tags).length) {
                    event.tags = __assign({}, this.tags, event.tags);
                }
                if (this.user && Object.keys(this.user).length) {
                    event.user = __assign({}, this.user, event.user);
                }
                if (this.fingerprint && event.fingerprint === undefined) {
                    event.fingerprint = this.fingerprint;
                }
                if (this.level) {
                    event.level = this.level;
                }
                hasNoBreadcrumbs = !event.breadcrumbs || event.breadcrumbs.length === 0;
                if (hasNoBreadcrumbs && this.breadcrumbs.length > 0) {
                    event.breadcrumbs =
                        maxBreadcrumbs !== undefined && maxBreadcrumbs >= 0
                            ? this.breadcrumbs.slice(-maxBreadcrumbs)
                            : this.breadcrumbs;
                }
                return [2 /*return*/, this.notifyEventProcessors(event, hint)];
            });
        });
    };
    return Scope;
}());
exports.Scope = Scope;
/**
 * Retruns the global event processors.
 */
function getGlobalEventProcessors() {
    var global = misc_1.getGlobalObject();
    global.__SENTRY__ = global.__SENTRY__ || {};
    global.__SENTRY__.globalEventProcessors = global.__SENTRY__.globalEventProcessors || [];
    return global.__SENTRY__.globalEventProcessors;
}
/**
 * Add a EventProcessor to be kept globally.
 * @param callback EventProcessor to add
 */
function addGlobalEventProcessor(callback) {
    getGlobalEventProcessors().push(callback);
}
exports.addGlobalEventProcessor = addGlobalEventProcessor;
//# sourceMappingURL=scope.js.map

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var is_1 = __webpack_require__(3);
/**
 * Encodes given object into url-friendly format
 *
 * @param str An object that contains serializable values
 * @param max Maximum number of characters in truncated string
 * @returns string Encoded
 */
function truncate(str, max) {
    if (max === void 0) { max = 0; }
    if (max === 0 || !is_1.isString(str)) {
        return str;
    }
    return str.length <= max ? str : str.substr(0, max) + "\u2026";
}
exports.truncate = truncate;
/**
 * This is basically just `trim_line` from
 * https://github.com/getsentry/sentry/blob/master/src/sentry/lang/javascript/processor.py#L67
 *
 * @param str An object that contains serializable values
 * @param max Maximum number of characters in truncated string
 * @returns string Encoded
 */
function snipLine(line, colno) {
    var newLine = line;
    var ll = newLine.length;
    if (ll <= 150) {
        return newLine;
    }
    if (colno > ll) {
        colno = ll; // tslint:disable-line:no-parameter-reassignment
    }
    var start = Math.max(colno - 60, 0);
    if (start < 5) {
        start = 0;
    }
    var end = Math.min(start + 140, ll);
    if (end > ll - 5) {
        end = ll;
    }
    if (end === ll) {
        start = Math.max(end - 140, 0);
    }
    newLine = newLine.slice(start, end);
    if (start > 0) {
        newLine = "'{snip} " + newLine;
    }
    if (end < ll) {
        newLine += ' {snip}';
    }
    return newLine;
}
exports.snipLine = snipLine;
/**
 * Join values in array
 * @param input array of values to be joined together
 * @param delimiter string to be placed in-between values
 * @returns Joined values
 */
function safeJoin(input, delimiter) {
    var e_1, _a;
    if (!Array.isArray(input)) {
        return '';
    }
    var output = [];
    try {
        for (var input_1 = __values(input), input_1_1 = input_1.next(); !input_1_1.done; input_1_1 = input_1.next()) {
            var value = input_1_1.value;
            try {
                output.push(String(value));
            }
            catch (e) {
                output.push('[value cannot be serialized]');
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (input_1_1 && !input_1_1.done && (_a = input_1.return)) _a.call(input_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return output.join(delimiter);
}
exports.safeJoin = safeJoin;
/**
 * Checks if given value is included in the target
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes#Polyfill
 * @param target source string
 * @param search string to be looked for
 * @returns An answer
 */
function includes(target, search) {
    if (search.length > target.length) {
        return false;
    }
    else {
        return target.indexOf(search) !== -1;
    }
}
exports.includes = includes;
//# sourceMappingURL=string.js.map

/***/ }),
/* 14 */
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
/* 15 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 16 */
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
/* 17 */
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Application = __webpack_require__(8);

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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _View2 = __webpack_require__(10);

var _View3 = _interopRequireDefault(_View2);

var _SaveDialog = __webpack_require__(44);

var _SaveDialog2 = _interopRequireDefault(_SaveDialog);

var _FetchService = __webpack_require__(4);

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
		_this._isUnloadRebound = false;

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

			if (!this._isUnloadRebound) {
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
				this._isUnloadRebound = true;
			} else {
				console.log("_initOnBeforeUnloadEvents already rebound onbeforeunload. Skipped. See stack trace below.");
				console.trace();
			}
		}
	}, {
		key: '_restoreOnBeforeUnloadEvents',
		value: function _restoreOnBeforeUnloadEvents() {
			if (this._isUnloadRebound) {
				window.onbeforeunload = this._onBeforeUnloadBackup;
				this._isUnloadRebound = false;
			}
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
/* 20 */
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
/* 21 */
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
/* 22 */
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
/* 23 */
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {

Object.defineProperty(exports, '__esModule', { value: true });

var core = __webpack_require__(28);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var dist = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/** JSDoc */
var Severity;
(function (Severity) {
    /** JSDoc */
    Severity["Fatal"] = "fatal";
    /** JSDoc */
    Severity["Error"] = "error";
    /** JSDoc */
    Severity["Warning"] = "warning";
    /** JSDoc */
    Severity["Log"] = "log";
    /** JSDoc */
    Severity["Info"] = "info";
    /** JSDoc */
    Severity["Debug"] = "debug";
    /** JSDoc */
    Severity["Critical"] = "critical";
})(Severity = exports.Severity || (exports.Severity = {}));
// tslint:disable:no-unnecessary-qualifier no-namespace
(function (Severity) {
    /**
     * Converts a string-based level into a {@link Severity}.
     *
     * @param level string representation of Severity
     * @returns Severity
     */
    function fromString(level) {
        switch (level) {
            case 'debug':
                return Severity.Debug;
            case 'info':
                return Severity.Info;
            case 'warn':
            case 'warning':
                return Severity.Warning;
            case 'error':
                return Severity.Error;
            case 'fatal':
                return Severity.Fatal;
            case 'critical':
                return Severity.Critical;
            case 'log':
            default:
                return Severity.Log;
        }
    }
    Severity.fromString = fromString;
})(Severity = exports.Severity || (exports.Severity = {}));
/** The status of an event. */
var Status;
(function (Status) {
    /** The status could not be determined. */
    Status["Unknown"] = "unknown";
    /** The event was skipped due to configuration or callbacks. */
    Status["Skipped"] = "skipped";
    /** The event was sent to Sentry successfully. */
    Status["Success"] = "success";
    /** The client is currently rate limited and will try again later. */
    Status["RateLimit"] = "rate_limit";
    /** The event could not be processed. */
    Status["Invalid"] = "invalid";
    /** A server-side error ocurred during submission. */
    Status["Failed"] = "failed";
})(Status = exports.Status || (exports.Status = {}));
// tslint:disable:no-unnecessary-qualifier no-namespace
(function (Status) {
    /**
     * Converts a HTTP status code into a {@link Status}.
     *
     * @param code The HTTP response status code.
     * @returns The send status or {@link Status.Unknown}.
     */
    function fromHttpCode(code) {
        if (code >= 200 && code < 300) {
            return Status.Success;
        }
        if (code === 429) {
            return Status.RateLimit;
        }
        if (code >= 400 && code < 500) {
            return Status.Invalid;
        }
        if (code >= 500) {
            return Status.Failed;
        }
        return Status.Unknown;
    }
    Status.fromHttpCode = fromHttpCode;
})(Status = exports.Status || (exports.Status = {}));

});

unwrapExports(dist);
var dist_1 = dist.Severity;
var dist_2 = dist.Status;

var is = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Checks whether given value's type is one of a few Error or Error-like
 * {@link isError}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isError(wat) {
    switch (Object.prototype.toString.call(wat)) {
        case '[object Error]':
            return true;
        case '[object Exception]':
            return true;
        case '[object DOMException]':
            return true;
        default:
            return wat instanceof Error;
    }
}
exports.isError = isError;
/**
 * Checks whether given value's type is ErrorEvent
 * {@link isErrorEvent}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isErrorEvent(wat) {
    return Object.prototype.toString.call(wat) === '[object ErrorEvent]';
}
exports.isErrorEvent = isErrorEvent;
/**
 * Checks whether given value's type is DOMError
 * {@link isDOMError}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isDOMError(wat) {
    return Object.prototype.toString.call(wat) === '[object DOMError]';
}
exports.isDOMError = isDOMError;
/**
 * Checks whether given value's type is DOMException
 * {@link isDOMException}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isDOMException(wat) {
    return Object.prototype.toString.call(wat) === '[object DOMException]';
}
exports.isDOMException = isDOMException;
/**
 * Checks whether given value's type is an undefined
 * {@link isUndefined}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isUndefined(wat) {
    return wat === void 0;
}
exports.isUndefined = isUndefined;
/**
 * Checks whether given value's type is a function
 * {@link isFunction}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isFunction(wat) {
    return typeof wat === 'function';
}
exports.isFunction = isFunction;
/**
 * Checks whether given value's type is a string
 * {@link isString}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isString(wat) {
    return Object.prototype.toString.call(wat) === '[object String]';
}
exports.isString = isString;
/**
 * Checks whether given value's type is an array
 * {@link isArray}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isArray(wat) {
    return Object.prototype.toString.call(wat) === '[object Array]';
}
exports.isArray = isArray;
/**
 * Checks whether given value's type is an object literal
 * {@link isPlainObject}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isPlainObject(wat) {
    return Object.prototype.toString.call(wat) === '[object Object]';
}
exports.isPlainObject = isPlainObject;
/**
 * Checks whether given value's type is an regexp
 * {@link isRegExp}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isRegExp(wat) {
    return Object.prototype.toString.call(wat) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
/**
 * Checks whether given value's type is a NaN
 * {@link isNaN}.
 *
 * @param wat A value to be checked.
 * @returns A boolean representing the result.
 */
function isNaN(wat) {
    return wat !== wat;
}
exports.isNaN = isNaN;

});

unwrapExports(is);
var is_1 = is.isError;
var is_2 = is.isErrorEvent;
var is_3 = is.isDOMError;
var is_4 = is.isDOMException;
var is_5 = is.isUndefined;
var is_6 = is.isFunction;
var is_7 = is.isString;
var is_8 = is.isArray;
var is_9 = is.isPlainObject;
var is_10 = is.isRegExp;
var is_11 = is.isNaN;

var misc = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

/**
 * Requires a module which is protected against bundler minification.
 *
 * @param request The module path to resolve
 */
function dynamicRequire(mod, request) {
    return mod.require(request);
}
exports.dynamicRequire = dynamicRequire;
/**
 * Checks whether we're in the Node.js or Browser environment
 *
 * @returns Answer to given question
 */
function isNodeEnv() {
    // tslint:disable:strict-type-predicates
    return Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';
}
exports.isNodeEnv = isNodeEnv;
/**
 * Safely get global scope object
 *
 * @returns Global scope object
 */
// tslint:disable:strict-type-predicates
function getGlobalObject() {
    return isNodeEnv() ? commonjsGlobal : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : {};
}
exports.getGlobalObject = getGlobalObject;
/**
 * UUID4 generator
 *
 * @returns string Generated UUID4.
 */
function uuid4() {
    var global = getGlobalObject();
    var crypto = global.crypto || global.msCrypto;
    if (!(crypto === void 0) && crypto.getRandomValues) {
        // Use window.crypto API if available
        var arr = new Uint16Array(8);
        crypto.getRandomValues(arr);
        // set 4 in byte 7
        // tslint:disable-next-line:no-bitwise
        arr[3] = (arr[3] & 0xfff) | 0x4000;
        // set 2 most significant bits of byte 9 to '10'
        // tslint:disable-next-line:no-bitwise
        arr[4] = (arr[4] & 0x3fff) | 0x8000;
        var pad = function (num) {
            var v = num.toString(16);
            while (v.length < 4) {
                v = "0" + v;
            }
            return v;
        };
        return (pad(arr[0]) + pad(arr[1]) + pad(arr[2]) + pad(arr[3]) + pad(arr[4]) + pad(arr[5]) + pad(arr[6]) + pad(arr[7]));
    }
    else {
        // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            // tslint:disable-next-line:no-bitwise
            var r = (Math.random() * 16) | 0;
            // tslint:disable-next-line:no-bitwise
            var v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
}
exports.uuid4 = uuid4;
/**
 * Given a child DOM element, returns a query-selector statement describing that
 * and its ancestors
 * e.g. [HTMLElement] => body > div > input#foo.btn[name=baz]
 * @returns generated DOM path
 */
function htmlTreeAsString(elem) {
    var currentElem = elem;
    var MAX_TRAVERSE_HEIGHT = 5;
    var MAX_OUTPUT_LEN = 80;
    var out = [];
    var height = 0;
    var len = 0;
    var separator = ' > ';
    var sepLength = separator.length;
    var nextStr;
    while (currentElem && height++ < MAX_TRAVERSE_HEIGHT) {
        nextStr = htmlElementAsString(currentElem);
        // bail out if
        // - nextStr is the 'html' element
        // - the length of the string that would be created exceeds MAX_OUTPUT_LEN
        //   (ignore this limit if we are on the first iteration)
        if (nextStr === 'html' || (height > 1 && len + out.length * sepLength + nextStr.length >= MAX_OUTPUT_LEN)) {
            break;
        }
        out.push(nextStr);
        len += nextStr.length;
        currentElem = currentElem.parentNode;
    }
    return out.reverse().join(separator);
}
exports.htmlTreeAsString = htmlTreeAsString;
/**
 * Returns a simple, query-selector representation of a DOM element
 * e.g. [HTMLElement] => input#foo.btn[name=baz]
 * @returns generated DOM path
 */
function htmlElementAsString(elem) {
    var out = [];
    var className;
    var classes;
    var key;
    var attr;
    var i;
    if (!elem || !elem.tagName) {
        return '';
    }
    out.push(elem.tagName.toLowerCase());
    if (elem.id) {
        out.push("#" + elem.id);
    }
    className = elem.className;
    if (className && is.isString(className)) {
        classes = className.split(/\s+/);
        for (i = 0; i < classes.length; i++) {
            out.push("." + classes[i]);
        }
    }
    var attrWhitelist = ['type', 'name', 'title', 'alt'];
    for (i = 0; i < attrWhitelist.length; i++) {
        key = attrWhitelist[i];
        attr = elem.getAttribute(key);
        if (attr) {
            out.push("[" + key + "=\"" + attr + "\"]");
        }
    }
    return out.join('');
}
exports.htmlElementAsString = htmlElementAsString;
/**
 * Parses string form of URL into an object
 * // borrowed from https://tools.ietf.org/html/rfc3986#appendix-B
 * // intentionally using regex and not <a/> href parsing trick because React Native and other
 * // environments where DOM might not be available
 * @returns parsed URL object
 */
function parseUrl(url) {
    if (!url) {
        return {};
    }
    var match = url.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
    if (!match) {
        return {};
    }
    // coerce to undefined values to empty string so we don't get 'undefined'
    var query = match[6] || '';
    var fragment = match[8] || '';
    return {
        host: match[4],
        path: match[5],
        protocol: match[2],
        relative: match[5] + query + fragment,
    };
}
exports.parseUrl = parseUrl;
/**
 * Extracts either message or type+value from an event that can be used for user-facing logs
 * @returns event's description
 */
function getEventDescription(event) {
    if (event.message) {
        return event.message;
    }
    else if (event.exception && event.exception.values && event.exception.values[0]) {
        var exception = event.exception.values[0];
        if (exception.type && exception.value) {
            return exception.type + ": " + exception.value;
        }
        else {
            return exception.type || exception.value || event.event_id || '<unknown>';
        }
    }
    else {
        return event.event_id || '<unknown>';
    }
}
exports.getEventDescription = getEventDescription;
/** JSDoc */
function consoleSandbox(callback) {
    var global = getGlobalObject();
    var levels = ['debug', 'info', 'warn', 'error', 'log'];
    if (!('console' in global)) {
        return callback();
    }
    var originalConsole = global.console;
    var wrappedLevels = {};
    // Restore all wrapped console methods
    levels.forEach(function (level) {
        if (level in global.console && originalConsole[level].__sentry__) {
            wrappedLevels[level] = originalConsole[level].__sentry_wrapped__;
            originalConsole[level] = originalConsole[level].__sentry_original__;
        }
    });
    // Perform callback manipulations
    var result = callback();
    // Revert restoration to wrapped state
    Object.keys(wrappedLevels).forEach(function (level) {
        originalConsole[level] = wrappedLevels[level];
    });
    return result;
}
exports.consoleSandbox = consoleSandbox;

});

unwrapExports(misc);
var misc_1 = misc.dynamicRequire;
var misc_2 = misc.isNodeEnv;
var misc_3 = misc.getGlobalObject;
var misc_4 = misc.uuid4;
var misc_5 = misc.htmlTreeAsString;
var misc_6 = misc.htmlElementAsString;
var misc_7 = misc.parseUrl;
var misc_8 = misc.getEventDescription;
var misc_9 = misc.consoleSandbox;

var logger_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

// TODO: Implement different loggers for different environments
var global = misc.getGlobalObject();
/** JSDoc */
var Logger = /** @class */ (function () {
    /** JSDoc */
    function Logger() {
        this.enabled = false;
    }
    /** JSDoc */
    Logger.prototype.disable = function () {
        this.enabled = false;
    };
    /** JSDoc */
    Logger.prototype.enable = function () {
        this.enabled = true;
    };
    /** JSDoc */
    Logger.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.enabled) {
            return;
        }
        misc.consoleSandbox(function () {
            global.console.log("Sentry Logger [Log]: " + args.join(' ')); // tslint:disable-line:no-console
        });
    };
    /** JSDoc */
    Logger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.enabled) {
            return;
        }
        misc.consoleSandbox(function () {
            global.console.warn("Sentry Logger [Warn]: " + args.join(' ')); // tslint:disable-line:no-console
        });
    };
    /** JSDoc */
    Logger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.enabled) {
            return;
        }
        misc.consoleSandbox(function () {
            global.console.error("Sentry Logger [Error]: " + args.join(' ')); // tslint:disable-line:no-console
        });
    };
    return Logger;
}());
var logger = new Logger();
exports.logger = logger;

});

unwrapExports(logger_1);
var logger_2 = logger_1.logger;

var supports = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

/**
 * Tells whether current environment supports ErrorEvent objects
 * {@link supportsErrorEvent}.
 *
 * @returns Answer to the given question.
 */
function supportsErrorEvent() {
    try {
        // tslint:disable:no-unused-expression
        new ErrorEvent('');
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.supportsErrorEvent = supportsErrorEvent;
/**
 * Tells whether current environment supports DOMError objects
 * {@link supportsDOMError}.
 *
 * @returns Answer to the given question.
 */
function supportsDOMError() {
    try {
        // It really needs 1 argument, not 0.
        // Chrome: VM89:1 Uncaught TypeError: Failed to construct 'DOMError':
        // 1 argument required, but only 0 present.
        // @ts-ignore
        // tslint:disable:no-unused-expression
        new DOMError('');
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.supportsDOMError = supportsDOMError;
/**
 * Tells whether current environment supports DOMException objects
 * {@link supportsDOMException}.
 *
 * @returns Answer to the given question.
 */
function supportsDOMException() {
    try {
        // tslint:disable:no-unused-expression
        new DOMException('');
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.supportsDOMException = supportsDOMException;
/**
 * Tells whether current environment supports Fetch API
 * {@link supportsFetch}.
 *
 * @returns Answer to the given question.
 */
function supportsFetch() {
    if (!('fetch' in misc.getGlobalObject())) {
        return false;
    }
    try {
        // tslint:disable-next-line:no-unused-expression
        new Headers();
        // tslint:disable-next-line:no-unused-expression
        new Request('');
        // tslint:disable-next-line:no-unused-expression
        new Response();
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.supportsFetch = supportsFetch;
/**
 * Tells whether current environment supports Fetch API natively
 * {@link supportsNativeFetch}.
 *
 * @returns Answer to the given question.
 */
function supportsNativeFetch() {
    if (!supportsFetch()) {
        return false;
    }
    var global = misc.getGlobalObject();
    var fetch = global.fetch;
    // tslint:disable-next-line:no-unsafe-any
    return fetch.toString().indexOf('native') !== -1;
}
exports.supportsNativeFetch = supportsNativeFetch;
/**
 * Tells whether current environment supports sendBeacon API
 * {@link supportsBeacon}.
 *
 * @returns Answer to the given question.
 */
function supportsBeacon() {
    var global = misc.getGlobalObject();
    return 'navigator' in global && 'sendBeacon' in global.navigator;
}
exports.supportsBeacon = supportsBeacon;
/**
 * Tells whether current environment supports ReportingObserver API
 * {@link supportsReportingObserver}.
 *
 * @returns Answer to the given question.
 */
function supportsReportingObserver() {
    return 'ReportingObserver' in misc.getGlobalObject();
}
exports.supportsReportingObserver = supportsReportingObserver;
/**
 * Tells whether current environment supports Referrer Policy API
 * {@link supportsReferrerPolicy}.
 *
 * @returns Answer to the given question.
 */
function supportsReferrerPolicy() {
    // Despite all stars in the sky saying that Edge supports old draft syntax, aka 'never', 'always', 'origin' and 'default
    // https://caniuse.com/#feat=referrer-policy
    // It doesn't. And it throw exception instead of ignoring this parameter...
    // REF: https://github.com/getsentry/raven-js/issues/1233
    if (!supportsFetch()) {
        return false;
    }
    try {
        // tslint:disable:no-unused-expression
        new Request('pickleRick', {
            referrerPolicy: 'origin',
        });
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.supportsReferrerPolicy = supportsReferrerPolicy;
/**
 * Tells whether current environment supports History API
 * {@link supportsHistory}.
 *
 * @returns Answer to the given question.
 */
function supportsHistory() {
    // NOTE: in Chrome App environment, touching history.pushState, *even inside
    //       a try/catch block*, will cause Chrome to output an error to console.error
    // borrowed from: https://github.com/angular/angular.js/pull/13945/files
    var global = misc.getGlobalObject();
    var chrome = global.chrome;
    // tslint:disable-next-line:no-unsafe-any
    var isChromePackagedApp = chrome && chrome.app && chrome.app.runtime;
    var hasHistoryApi = 'history' in global && !!global.history.pushState && !!global.history.replaceState;
    return !isChromePackagedApp && hasHistoryApi;
}
exports.supportsHistory = supportsHistory;

});

unwrapExports(supports);
var supports_1 = supports.supportsErrorEvent;
var supports_2 = supports.supportsDOMError;
var supports_3 = supports.supportsDOMException;
var supports_4 = supports.supportsFetch;
var supports_5 = supports.supportsNativeFetch;
var supports_6 = supports.supportsBeacon;
var supports_7 = supports.supportsReportingObserver;
var supports_8 = supports.supportsReferrerPolicy;
var supports_9 = supports.supportsHistory;

var object = createCommonjsModule(function (module, exports) {
var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });

/**
 * Transforms Error object into an object literal with all it's attributes
 * attached to it.
 *
 * Based on: https://github.com/ftlabs/js-abbreviate/blob/fa709e5f139e7770a71827b1893f22418097fbda/index.js#L95-L106
 *
 * @param error An Error containing all relevant information
 * @returns An object with all error properties
 */
function objectifyError(error) {
    // These properties are implemented as magical getters and don't show up in `for-in` loop
    var err = {
        message: error.message,
        name: error.name,
        stack: error.stack,
    };
    for (var i in error) {
        if (Object.prototype.hasOwnProperty.call(error, i)) {
            err[i] = error[i];
        }
    }
    return err;
}
var NAN_VALUE = '[NaN]';
var UNDEFINED_VALUE = '[undefined]';
/**
 * Serializer function used as 2nd argument to JSON.serialize in `serialize()` util function.
 */
function serializer() {
    var stack = [];
    var keys = [];
    var cycleReplacer = function (_, value) {
        if (stack[0] === value) {
            return '[Circular ~]';
        }
        return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join('.') + "]";
    };
    return function (key, value) {
        var currentValue = value;
        // NaN and undefined are not JSON.parseable, but we want to preserve this information
        if (is.isNaN(value)) {
            currentValue = NAN_VALUE;
        }
        else if (is.isUndefined(value)) {
            currentValue = UNDEFINED_VALUE;
        }
        if (stack.length > 0) {
            var thisPos = stack.indexOf(this);
            if (thisPos !== -1) {
                stack.splice(thisPos + 1);
                keys.splice(thisPos, Infinity, key);
            }
            else {
                stack.push(this);
                keys.push(key);
            }
            if (stack.indexOf(currentValue) !== -1) {
                currentValue = cycleReplacer.call(this, key, currentValue);
            }
        }
        else {
            stack.push(currentValue);
        }
        return currentValue instanceof Error ? objectifyError(currentValue) : currentValue;
    };
}
/**
 * Reviver function used as 2nd argument to JSON.parse in `deserialize()` util function.
 */
function reviver(_key, value) {
    // NaN and undefined are not JSON.parseable, but we want to preserve this information
    if (value === NAN_VALUE) {
        return NaN;
    }
    if (value === UNDEFINED_VALUE) {
        return undefined;
    }
    return value;
}
/**
 * Serializes the given object into a string.
 * Like JSON.stringify, but doesn't throw on circular references.
 * Based on a `json-stringify-safe` package and modified to handle Errors serialization.
 *
 * The object must be serializable, i.e.:
 *  - Only primitive types are allowed (object, array, number, string, boolean)
 *  - Its depth should be considerably low for performance reasons
 *
 * @param object A JSON-serializable object.
 * @returns A string containing the serialized object.
 */
function serialize(object) {
    return JSON.stringify(object, serializer());
}
exports.serialize = serialize;
/**
 * Deserializes an object from a string previously serialized with
 * {@link serialize}.
 *
 * @param str A serialized object.
 * @returns The deserialized object.
 */
function deserialize(str) {
    return JSON.parse(str, reviver);
}
exports.deserialize = deserialize;
/**
 * Creates a deep copy of the given object.
 *
 * The object must be serializable, i.e.:
 *  - It must not contain any cycles
 *  - Only primitive types are allowed (object, array, number, string, boolean)
 *  - Its depth should be considerably low for performance reasons
 *
 * @param object A JSON-serializable object.
 * @returns The object clone.
 */
function clone(object) {
    return deserialize(serialize(object));
}
exports.clone = clone;
/**
 * Wrap a given object method with a higher-order function
 *
 * @param source An object that contains a method to be wrapped.
 * @param name A name of method to be wrapped.
 * @param replacement A function that should be used to wrap a given method.
 * @returns void
 */
function fill(source, name, replacement) {
    if (!(name in source) || source[name].__sentry__) {
        return;
    }
    var original = source[name];
    var wrapped = replacement(original);
    wrapped.__sentry__ = true;
    wrapped.__sentry_original__ = original;
    wrapped.__sentry_wrapped__ = wrapped;
    source[name] = wrapped;
}
exports.fill = fill;
/**
 * Encodes given object into url-friendly format
 *
 * @param object An object that contains serializable values
 * @returns string Encoded
 */
function urlEncode(object) {
    return Object.keys(object)
        .map(
    // tslint:disable-next-line:no-unsafe-any
    function (key) { return encodeURIComponent(key) + "=" + encodeURIComponent(object[key]); })
        .join('&');
}
exports.urlEncode = urlEncode;
// Default Node.js REPL depth
var MAX_SERIALIZE_EXCEPTION_DEPTH = 3;
// TODO: Or is it 200kb? 🤔 — Kamil
// NOTE: Yes, it is
// 50kB, as 100kB is max payload size, so half sounds reasonable
var MAX_SERIALIZE_EXCEPTION_SIZE = 50 * 1024;
var MAX_SERIALIZE_KEYS_LENGTH = 40;
/** JSDoc */
function utf8Length(value) {
    // tslint:disable-next-line:no-bitwise
    return ~-encodeURI(value).split(/%..|./).length;
}
/** JSDoc */
function jsonSize(value) {
    return utf8Length(JSON.stringify(value));
}
/** JSDoc */
function serializeValue(value) {
    var maxLength = 40;
    if (typeof value === 'string') {
        return value.length <= maxLength ? value : value.substr(0, maxLength - 1) + "\u2026";
    }
    else if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'undefined') {
        return value;
    }
    else if (is.isNaN(value)) {
        // NaN and undefined are not JSON.parseable, but we want to preserve this information
        return '[NaN]';
    }
    else if (is.isUndefined(value)) {
        return '[undefined]';
    }
    var type = Object.prototype.toString.call(value);
    // Node.js REPL notation
    if (type === '[object Object]') {
        return '[Object]';
    }
    if (type === '[object Array]') {
        return '[Array]';
    }
    if (type === '[object Function]') {
        var name_1 = value.name;
        return name_1 ? "[Function: " + name_1 + "]" : '[Function]';
    }
    return value;
}
/** JSDoc */
function serializeObject(value, depth) {
    if (depth === 0) {
        return serializeValue(value);
    }
    if (is.isPlainObject(value)) {
        var serialized_1 = {};
        var val_1 = value;
        Object.keys(val_1).forEach(function (key) {
            serialized_1[key] = serializeObject(val_1[key], depth - 1);
        });
        return serialized_1;
    }
    else if (Array.isArray(value)) {
        var val = value;
        return val.map(function (v) { return serializeObject(v, depth - 1); });
    }
    return serializeValue(value);
}
exports.serializeObject = serializeObject;
/** JSDoc */
function limitObjectDepthToSize(object, depth, maxSize) {
    if (depth === void 0) { depth = MAX_SERIALIZE_EXCEPTION_DEPTH; }
    if (maxSize === void 0) { maxSize = MAX_SERIALIZE_EXCEPTION_SIZE; }
    var serialized = serializeObject(object, depth);
    if (jsonSize(serialize(serialized)) > maxSize) {
        return limitObjectDepthToSize(object, depth - 1);
    }
    return serialized;
}
exports.limitObjectDepthToSize = limitObjectDepthToSize;
/** JSDoc */
function serializeKeysToEventMessage(keys, maxLength) {
    if (maxLength === void 0) { maxLength = MAX_SERIALIZE_KEYS_LENGTH; }
    if (!keys.length) {
        return '[object has no keys]';
    }
    if (keys[0].length >= maxLength) {
        return keys[0];
    }
    for (var includedKeys = keys.length; includedKeys > 0; includedKeys--) {
        var serialized = keys.slice(0, includedKeys).join(', ');
        if (serialized.length > maxLength) {
            continue;
        }
        if (includedKeys === keys.length) {
            return serialized;
        }
        return serialized + "\u2026";
    }
    return '';
}
exports.serializeKeysToEventMessage = serializeKeysToEventMessage;
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
/** JSDoc */
function assign(target) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var e_1, _a;
    if (target === null || target === undefined) {
        throw new TypeError('Cannot convert undefined or null to object');
    }
    var to = Object(target);
    try {
        for (var args_1 = __values(args), args_1_1 = args_1.next(); !args_1_1.done; args_1_1 = args_1.next()) {
            var source = args_1_1.value;
            if (source !== null) {
                for (var nextKey in source) {
                    if (Object.prototype.hasOwnProperty.call(source, nextKey)) {
                        to[nextKey] = source[nextKey];
                    }
                }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (args_1_1 && !args_1_1.done && (_a = args_1.return)) _a.call(args_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return to;
}
exports.assign = assign;

});

unwrapExports(object);
var object_1 = object.serialize;
var object_2 = object.deserialize;
var object_3 = object.clone;
var object_4 = object.fill;
var object_5 = object.urlEncode;
var object_6 = object.serializeObject;
var object_7 = object.limitObjectDepthToSize;
var object_8 = object.serializeKeysToEventMessage;
var object_9 = object.assign;

var string = createCommonjsModule(function (module, exports) {
var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });

/**
 * Encodes given object into url-friendly format
 *
 * @param str An object that contains serializable values
 * @param max Maximum number of characters in truncated string
 * @returns string Encoded
 */
function truncate(str, max) {
    if (max === void 0) { max = 0; }
    if (max === 0 || !is.isString(str)) {
        return str;
    }
    return str.length <= max ? str : str.substr(0, max) + "\u2026";
}
exports.truncate = truncate;
/**
 * This is basically just `trim_line` from
 * https://github.com/getsentry/sentry/blob/master/src/sentry/lang/javascript/processor.py#L67
 *
 * @param str An object that contains serializable values
 * @param max Maximum number of characters in truncated string
 * @returns string Encoded
 */
function snipLine(line, colno) {
    var newLine = line;
    var ll = newLine.length;
    if (ll <= 150) {
        return newLine;
    }
    if (colno > ll) {
        colno = ll; // tslint:disable-line:no-parameter-reassignment
    }
    var start = Math.max(colno - 60, 0);
    if (start < 5) {
        start = 0;
    }
    var end = Math.min(start + 140, ll);
    if (end > ll - 5) {
        end = ll;
    }
    if (end === ll) {
        start = Math.max(end - 140, 0);
    }
    newLine = newLine.slice(start, end);
    if (start > 0) {
        newLine = "'{snip} " + newLine;
    }
    if (end < ll) {
        newLine += ' {snip}';
    }
    return newLine;
}
exports.snipLine = snipLine;
/**
 * Join values in array
 * @param input array of values to be joined together
 * @param delimiter string to be placed in-between values
 * @returns Joined values
 */
function safeJoin(input, delimiter) {
    var e_1, _a;
    if (!Array.isArray(input)) {
        return '';
    }
    var output = [];
    try {
        for (var input_1 = __values(input), input_1_1 = input_1.next(); !input_1_1.done; input_1_1 = input_1.next()) {
            var value = input_1_1.value;
            try {
                output.push(String(value));
            }
            catch (e) {
                output.push('[value cannot be serialized]');
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (input_1_1 && !input_1_1.done && (_a = input_1.return)) _a.call(input_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return output.join(delimiter);
}
exports.safeJoin = safeJoin;
/**
 * Checks if given value is included in the target
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes#Polyfill
 * @param target source string
 * @param search string to be looked for
 * @returns An answer
 */
function includes(target, search) {
    if (search.length > target.length) {
        return false;
    }
    else {
        return target.indexOf(search) !== -1;
    }
}
exports.includes = includes;

});

unwrapExports(string);
var string_1 = string.truncate;
var string_2 = string.snipLine;
var string_3 = string.safeJoin;
var string_4 = string.includes;

// tslint:disable
/*
 * JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
/**
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safeAdd(x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
}
/**
 * Bitwise rotate a 32-bit number to the left.
 */
function bitRotateLeft(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
}
/**
 * These functions implement the four basic operations the algorithm uses.
 */
function md5cmn(q, a, b, x, s, t) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}
function md5ff(a, b, c, d, x, s, t) {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t);
}
function md5gg(a, b, c, d, x, s, t) {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
}
function md5hh(a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5ii(a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}
/**
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */
function binlMD5(x, len) {
    /** append padding */
    x[len >> 5] |= 0x80 << len % 32;
    x[(((len + 64) >>> 9) << 4) + 14] = len;
    var i;
    var olda;
    var oldb;
    var oldc;
    var oldd;
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    for (i = 0; i < x.length; i += 16) {
        olda = a;
        oldb = b;
        oldc = c;
        oldd = d;
        a = md5ff(a, b, c, d, x[i], 7, -680876936);
        d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5gg(b, c, d, a, x[i], 20, -373897302);
        a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5hh(d, a, b, c, x[i], 11, -358537222);
        c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = md5ii(a, b, c, d, x[i], 6, -198630844);
        d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = safeAdd(a, olda);
        b = safeAdd(b, oldb);
        c = safeAdd(c, oldc);
        d = safeAdd(d, oldd);
    }
    return [a, b, c, d];
}
/**
 * Convert an array of little-endian words to a string
 */
function binl2rstr(input) {
    var i;
    var output = '';
    var length32 = input.length * 32;
    for (i = 0; i < length32; i += 8) {
        output += String.fromCharCode((input[i >> 5] >>> i % 32) & 0xff);
    }
    return output;
}
/**
 * Convert a raw string to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */
function rstr2binl(input) {
    var i;
    var output = [];
    output[(input.length >> 2) - 1] = undefined;
    for (i = 0; i < output.length; i += 1) {
        output[i] = 0;
    }
    var length8 = input.length * 8;
    for (i = 0; i < length8; i += 8) {
        output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32;
    }
    return output;
}
/**
 * Calculate the MD5 of a raw string
 */
function rstrMD5(s) {
    return binl2rstr(binlMD5(rstr2binl(s), s.length * 8));
}
/**
 * Calculate the HMAC-MD5, of a key and some data (raw strings)
 */
function rstrHMACMD5(key, data) {
    var i;
    var bkey = rstr2binl(key);
    var ipad = [];
    var opad = [];
    var hash;
    ipad[15] = opad[15] = undefined;
    if (bkey.length > 16) {
        bkey = binlMD5(bkey, key.length * 8);
    }
    for (i = 0; i < 16; i += 1) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5c5c5c5c;
    }
    hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
    return binl2rstr(binlMD5(opad.concat(hash), 512 + 128));
}
/**
 * Convert a raw string to a hex string
 */
function rstr2hex(input) {
    var hexTab = '0123456789abcdef';
    var output = '';
    var x;
    var i;
    for (i = 0; i < input.length; i += 1) {
        x = input.charCodeAt(i);
        output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f);
    }
    return output;
}
/**
 * Encode a string as utf-8
 */
function str2rstrUTF8(input) {
    return unescape(encodeURIComponent(input));
}
/*
* Take string arguments and return either raw or hex encoded strings
*/
function rawMD5(s) {
    return rstrMD5(str2rstrUTF8(s));
}
function hexMD5(s) {
    return rstr2hex(rawMD5(s));
}
function rawHMACMD5(k, d) {
    return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d));
}
function hexHMACMD5(k, d) {
    return rstr2hex(rawHMACMD5(k, d));
}
function md5(string, key, raw) {
    if (!key) {
        if (!raw) {
            return hexMD5(string);
        }
        return rawMD5(string);
    }
    if (!raw) {
        return hexHMACMD5(key, string);
    }
    return rawHMACMD5(key, string);
}

// tslint:disable
/**
 * TraceKit - Cross brower stack traces
 *
 * This was originally forked from github.com/occ/TraceKit, but has since been
 * largely modified and is now maintained as part of Sentry JS SDK.
 *
 * NOTE: Last merge with upstream repository
 * Jul 11,2018 - #f03357c
 *
 * https://github.com/csnover/TraceKit
 * @license MIT
 * @namespace TraceKit
 */
var window$1 = misc_3();
var TraceKit = {
    wrap: function () { return function () { }; },
    report: false,
    collectWindowErrors: false,
    computeStackTrace: false,
    remoteFetching: false,
    linesOfContext: false,
    extendToAsynchronousCallbacks: false,
};
// var TraceKit: TraceKitInterface = {};
// var TraceKit = {};
// global reference to slice
var _slice = [].slice;
var UNKNOWN_FUNCTION = '?';
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Error_types
var ERROR_TYPES_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;
/**
 * A better form of hasOwnProperty<br/>
 * Example: `_has(MainHostObject, property) === true/false`
 *
 * @param {Object} object to check property
 * @param {string} key to check
 * @return {Boolean} true if the object has the key and it is not inherited
 */
function _has(object, key) {
    return Object.prototype.hasOwnProperty.call(object, key);
}
/**
 * A safe form of location.href<br/>
 *
 * @return {string} location.href
 */
function getLocationHref() {
    if (typeof document === 'undefined' || document.location == null)
        return '';
    return document.location.href;
}
/**
 * A safe form of location.origin<br/>
 *
 * @return {string} location.origin
 */
function getLocationOrigin() {
    if (typeof document === 'undefined' || document.location == null)
        return '';
    // Oh dear IE10...
    if (!document.location.origin) {
        return (document.location.protocol +
            '//' +
            document.location.hostname +
            (document.location.port ? ':' + document.location.port : ''));
    }
    return document.location.origin;
}
/**
 * Wrap any function in a TraceKit reporter<br/>
 * Example: `func = TraceKit.wrap(func);`
 *
 * @param {Function} func Function to be wrapped
 * @return {Function} The wrapped func
 * @memberof TraceKit
 */
TraceKit.wrap = function traceKitWrapper(func) {
    function wrapped() {
        try {
            // @ts-ignore
            return func.apply(this, arguments);
        }
        catch (e) {
            TraceKit.report(e);
            throw e;
        }
    }
    return wrapped;
};
/**
 * Cross-browser processing of unhandled exceptions
 *
 * Syntax:
 * ```js
 *   TraceKit.report.subscribe(function(stackInfo) { ... })
 *   TraceKit.report.unsubscribe(function(stackInfo) { ... })
 *   TraceKit.report(exception)
 *   try { ...code... } catch(ex) { TraceKit.report(ex); }
 * ```
 *
 * Supports:
 *   - Firefox: full stack trace with line numbers, plus column number
 *     on top frame; column number is not guaranteed
 *   - Opera: full stack trace with line and column numbers
 *   - Chrome: full stack trace with line and column numbers
 *   - Safari: line and column number for the top frame only; some frames
 *     may be missing, and column number is not guaranteed
 *   - IE: line and column number for the top frame only; some frames
 *     may be missing, and column number is not guaranteed
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
 * Handlers receive a TraceKit.StackTrace object as described in the
 * TraceKit.computeStackTrace docs.
 *
 * @memberof TraceKit
 * @namespace
 */
TraceKit.report = (function reportModuleWrapper() {
    var handlers = [], lastException = null, lastExceptionStack = null;
    /**
     * Add a crash handler.
     * @param {Function} handler
     * @memberof TraceKit.report
     */
    function subscribe(handler) {
        // NOTE: We call both handlers manually in browser/integrations/globalhandler.ts
        // So user can choose which one he wants to attach
        // installGlobalHandler();
        // installGlobalUnhandledRejectionHandler();
        handlers.push(handler);
    }
    /**
     * Remove a crash handler.
     * @param {Function} handler
     * @memberof TraceKit.report
     */
    function unsubscribe(handler) {
        for (var i = handlers.length - 1; i >= 0; --i) {
            if (handlers[i] === handler) {
                handlers.splice(i, 1);
            }
        }
        if (handlers.length === 0) {
            uninstallGlobalHandler();
            uninstallGlobalUnhandledRejectionHandler();
        }
    }
    /**
     * Dispatch stack information to all handlers.
     * @param {TraceKit.StackTrace} stack
     * @param {boolean} isWindowError Is this a top-level window error?
     * @param {Error=} error The error that's being handled (if available, null otherwise)
     * @memberof TraceKit.report
     * @throws An exception if an error occurs while calling an handler.
     */
    function notifyHandlers(stack, isWindowError, error) {
        var exception = null;
        if (isWindowError && !TraceKit.collectWindowErrors) {
            return;
        }
        for (var i in handlers) {
            if (_has(handlers, i)) {
                try {
                    handlers[i](stack, isWindowError, error);
                }
                catch (inner) {
                    exception = inner;
                }
            }
        }
        if (exception) {
            throw exception;
        }
    }
    var _oldOnerrorHandler, _onErrorHandlerInstalled;
    var _oldOnunhandledrejectionHandler, _onUnhandledRejectionHandlerInstalled;
    /**
     * Ensures all global unhandled exceptions are recorded.
     * Supported by Gecko and IE.
     * @param {string} message Error message.
     * @param {string} url URL of script that generated the exception.
     * @param {(number|string)} lineNo The line number at which the error occurred.
     * @param {(number|string)=} columnNo The column number at which the error occurred.
     * @param {Error=} errorObj The actual Error object.
     * @memberof TraceKit.report
     */
    function traceKitWindowOnError(message, url, lineNo, columnNo, errorObj) {
        var stack = null;
        // If 'errorObj' is ErrorEvent, get real Error from inside
        errorObj = is_2(errorObj) ? errorObj.error : errorObj;
        // If 'message' is ErrorEvent, get real message from inside
        message = is_2(message) ? message.message : message;
        if (lastExceptionStack) {
            TraceKit.computeStackTrace.augmentStackTraceWithInitialElement(lastExceptionStack, url, lineNo, message);
            processLastException();
        }
        else if (errorObj && is_1(errorObj)) {
            stack = TraceKit.computeStackTrace(errorObj);
            stack.mechanism = 'onerror';
            notifyHandlers(stack, true, errorObj);
        }
        else {
            var location = {
                url: url,
                line: lineNo,
                column: columnNo,
            };
            var name;
            var msg = message; // must be new var or will modify original `arguments`
            if ({}.toString.call(message) === '[object String]') {
                var groups = message.match(ERROR_TYPES_RE);
                if (groups) {
                    name = groups[1];
                    msg = groups[2];
                }
            }
            location.func = TraceKit.computeStackTrace.guessFunctionName(location.url, location.line);
            location.context = TraceKit.computeStackTrace.gatherContext(location.url, location.line);
            stack = {
                name: name,
                message: msg,
                mode: 'onerror',
                mechanism: 'onerror',
                stack: [
                    __assign({}, location, { 
                        // Firefox sometimes doesn't return url correctly and this is an old behavior
                        // that I prefer to port here as well.
                        // It can be altered only here, as previously it's using `location.url` for other things — Kamil
                        url: location.url || getLocationHref() }),
                ],
            };
            notifyHandlers(stack, true, null);
        }
        if (_oldOnerrorHandler) {
            // @ts-ignore
            return _oldOnerrorHandler.apply(this, arguments);
        }
        return false;
    }
    /**
     * Ensures all unhandled rejections are recorded.
     * @param {PromiseRejectionEvent} e event.
     * @memberof TraceKit.report
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onunhandledrejection
     * @see https://developer.mozilla.org/en-US/docs/Web/API/PromiseRejectionEvent
     */
    function traceKitWindowOnUnhandledRejection(e) {
        var err = (e && (e.detail ? e.detail.reason : e.reason)) || e;
        var stack = TraceKit.computeStackTrace(err);
        stack.mechanism = 'onunhandledrejection';
        notifyHandlers(stack, true, err);
    }
    /**
     * Install a global onerror handler
     * @memberof TraceKit.report
     */
    function installGlobalHandler() {
        if (_onErrorHandlerInstalled === true) {
            return;
        }
        _oldOnerrorHandler = window$1.onerror;
        window$1.onerror = traceKitWindowOnError;
        _onErrorHandlerInstalled = true;
    }
    /**
     * Uninstall the global onerror handler
     * @memberof TraceKit.report
     */
    function uninstallGlobalHandler() {
        if (_onErrorHandlerInstalled) {
            window$1.onerror = _oldOnerrorHandler;
            _onErrorHandlerInstalled = false;
        }
    }
    /**
     * Install a global onunhandledrejection handler
     * @memberof TraceKit.report
     */
    function installGlobalUnhandledRejectionHandler() {
        if (_onUnhandledRejectionHandlerInstalled === true) {
            return;
        }
        _oldOnunhandledrejectionHandler = window$1.onunhandledrejection;
        window$1.onunhandledrejection = traceKitWindowOnUnhandledRejection;
        _onUnhandledRejectionHandlerInstalled = true;
    }
    /**
     * Uninstall the global onunhandledrejection handler
     * @memberof TraceKit.report
     */
    function uninstallGlobalUnhandledRejectionHandler() {
        if (_onUnhandledRejectionHandlerInstalled) {
            window$1.onerror = _oldOnunhandledrejectionHandler;
            _onUnhandledRejectionHandlerInstalled = false;
        }
    }
    /**
     * Process the most recent exception
     * @memberof TraceKit.report
     */
    function processLastException() {
        var _lastExceptionStack = lastExceptionStack, _lastException = lastException;
        lastExceptionStack = null;
        lastException = null;
        notifyHandlers(_lastExceptionStack, false, _lastException);
    }
    /**
     * Reports an unhandled Error to TraceKit.
     * @param {Error} ex
     * @memberof TraceKit.report
     * @throws An exception if an incomplete stack trace is detected (old IE browsers).
     */
    function report(ex) {
        if (lastExceptionStack) {
            if (lastException === ex) {
                return; // already caught by an inner catch block, ignore
            }
            else {
                processLastException();
            }
        }
        var stack = TraceKit.computeStackTrace(ex);
        lastExceptionStack = stack;
        lastException = ex;
        // If the stack trace is incomplete, wait for 2 seconds for
        // slow slow IE to see if onerror occurs or not before reporting
        // this exception; otherwise, we will end up with an incomplete
        // stack trace
        setTimeout(function () {
            if (lastException === ex) {
                processLastException();
            }
        }, stack.incomplete ? 2000 : 0);
        throw ex; // re-throw to propagate to the top level (and cause window.onerror)
    }
    report.subscribe = subscribe;
    report.unsubscribe = unsubscribe;
    report.installGlobalHandler = installGlobalHandler;
    report.installGlobalUnhandledRejectionHandler = installGlobalUnhandledRejectionHandler;
    return report;
})();
/**
 * An object representing a single stack frame.
 * @typedef {Object} StackFrame
 * @property {string} url The JavaScript or HTML file URL.
 * @property {string} func The function name, or empty for anonymous functions (if guessing did not work).
 * @property {string[]?} args The arguments passed to the function, if known.
 * @property {number=} line The line number, if known.
 * @property {number=} column The column number, if known.
 * @property {string[]} context An array of source code lines; the middle element corresponds to the correct line#.
 * @memberof TraceKit
 */
/**
 * An object representing a JavaScript stack trace.
 * @typedef {Object} StackTrace
 * @property {string} name The name of the thrown exception.
 * @property {string} message The exception error message.
 * @property {TraceKit.StackFrame[]} stack An array of stack frames.
 * @property {string} mode 'stack', 'stacktrace', 'multiline', 'callers', 'onerror', or 'failed' -- method used to collect the stack trace.
 * @memberof TraceKit
 */
/**
 * TraceKit.computeStackTrace: cross-browser stack traces in JavaScript
 *
 * Syntax:
 *   ```js
 *   s = TraceKit.computeStackTrace.ofCaller([depth])
 *   s = TraceKit.computeStackTrace(exception) // consider using TraceKit.report instead (see below)
 *   ```
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
 * Tracing example:
 *  ```js
 *     function trace(message) {
 *         var stackInfo = TraceKit.computeStackTrace.ofCaller();
 *         var data = message + "\n";
 *         for(var i in stackInfo.stack) {
 *             var item = stackInfo.stack[i];
 *             data += (item.func || '[anonymous]') + "() in " + item.url + ":" + (item.line || '0') + "\n";
 *         }
 *         if (window.console)
 *             console.info(data);
 *         else
 *             alert(data);
 *     }
 * ```
 * @memberof TraceKit
 * @namespace
 */
TraceKit.computeStackTrace = (function computeStackTraceWrapper() {
    var debug = false, sourceCache = {};
    /**
     * Attempts to retrieve source code via XMLHttpRequest, which is used
     * to look up anonymous function names.
     * @param {string} url URL of source code.
     * @return {string} Source contents.
     * @memberof TraceKit.computeStackTrace
     */
    function loadSource(url) {
        if (!TraceKit.remoteFetching) {
            //Only attempt request if remoteFetching is on.
            return '';
        }
        try {
            var getXHR = function () {
                try {
                    return new window$1.XMLHttpRequest();
                }
                catch (e) {
                    // explicitly bubble up the exception if not found
                    return new window$1.ActiveXObject('Microsoft.XMLHTTP');
                }
            };
            var request = getXHR();
            request.open('GET', url, false);
            request.send('');
            return request.responseText;
        }
        catch (e) {
            return '';
        }
    }
    /**
     * Retrieves source code from the source code cache.
     * @param {string} url URL of source code.
     * @return {Array.<string>} Source contents.
     * @memberof TraceKit.computeStackTrace
     */
    function getSource(url) {
        if (typeof url !== 'string') {
            return [];
        }
        if (!_has(sourceCache, url)) {
            // URL needs to be able to fetched within the acceptable domain.  Otherwise,
            // cross-domain errors will be triggered.
            /*
                        Regex matches:
                        0 - Full Url
                        1 - Protocol
                        2 - Domain
                        3 - Port (Useful for internal applications)
                        4 - Path
                    */
            var source = '';
            var domain = '';
            try {
                domain = window$1.document.domain;
            }
            catch (e) { }
            var match = /(.*)\:\/\/([^:\/]+)([:\d]*)\/{0,1}([\s\S]*)/.exec(url);
            if (match && match[2] === domain) {
                source = loadSource(url);
            }
            sourceCache[url] = source ? source.split('\n') : [];
        }
        return sourceCache[url];
    }
    /**
     * Tries to use an externally loaded copy of source code to determine
     * the name of a function by looking at the name of the variable it was
     * assigned to, if any.
     * @param {string} url URL of source code.
     * @param {(string|number)} lineNo Line number in source code.
     * @return {string} The function name, if discoverable.
     * @memberof TraceKit.computeStackTrace
     */
    function guessFunctionName(url, lineNo) {
        var reFunctionArgNames = /function ([^(]*)\(([^)]*)\)/, reGuessFunction = /['"]?([0-9A-Za-z$_]+)['"]?\s*[:=]\s*(function|eval|new Function)/, line = '', maxLines = 10, source = getSource(url), m;
        if (!source.length) {
            return UNKNOWN_FUNCTION;
        }
        // Walk backwards from the first line in the function until we find the line which
        // matches the pattern above, which is the function definition
        for (var i = 0; i < maxLines; ++i) {
            line = source[lineNo - i] + line;
            if (!is_5(line)) {
                if ((m = reGuessFunction.exec(line))) {
                    return m[1];
                }
                else if ((m = reFunctionArgNames.exec(line))) {
                    return m[1];
                }
            }
        }
        return UNKNOWN_FUNCTION;
    }
    /**
     * Retrieves the surrounding lines from where an exception occurred.
     * @param {string} url URL of source code.
     * @param {(string|number)} line Line number in source code to center around for context.
     * @return {?Array.<string>} Lines of source code.
     * @memberof TraceKit.computeStackTrace
     */
    function gatherContext(url, line) {
        var source = getSource(url);
        if (!source.length) {
            return null;
        }
        var context = [], 
        // linesBefore & linesAfter are inclusive with the offending line.
        // if linesOfContext is even, there will be one extra line
        //   *before* the offending line.
        linesBefore = Math.floor(TraceKit.linesOfContext / 2), 
        // Add one extra line if linesOfContext is odd
        linesAfter = linesBefore + (TraceKit.linesOfContext % 2), start = Math.max(0, line - linesBefore - 1), end = Math.min(source.length, line + linesAfter - 1);
        line -= 1; // convert to 0-based index
        for (var i = start; i < end; ++i) {
            if (!is_5(source[i])) {
                context.push(source[i]);
            }
        }
        return context.length > 0 ? context : null;
    }
    /**
     * Escapes special characters, except for whitespace, in a string to be
     * used inside a regular expression as a string literal.
     * @param {string} text The string.
     * @return {string} The escaped string literal.
     * @memberof TraceKit.computeStackTrace
     */
    function escapeRegExp(text) {
        return text.replace(/[\-\[\]{}()*+?.,\\\^$|#]/g, '\\$&');
    }
    /**
     * Escapes special characters in a string to be used inside a regular
     * expression as a string literal. Also ensures that HTML entities will
     * be matched the same as their literal friends.
     * @param {string} body The string.
     * @return {string} The escaped string.
     * @memberof TraceKit.computeStackTrace
     */
    function escapeCodeAsRegExpForMatchingInsideHTML(body) {
        return escapeRegExp(body)
            .replace('<', '(?:<|&lt;)')
            .replace('>', '(?:>|&gt;)')
            .replace('&', '(?:&|&amp;)')
            .replace('"', '(?:"|&quot;)')
            .replace(/\s+/g, '\\s+');
    }
    /**
     * Determines where a code fragment occurs in the source code.
     * @param {RegExp} re The function definition.
     * @param {Array.<string>} urls A list of URLs to search.
     * @return {?Object.<string, (string|number)>} An object containing
     * the url, line, and column number of the defined function.
     * @memberof TraceKit.computeStackTrace
     */
    function findSourceInUrls(re, urls) {
        var source, m;
        for (var i = 0, j = urls.length; i < j; ++i) {
            if ((source = getSource(urls[i])).length) {
                source = source.join('\n');
                if ((m = re.exec(source))) {
                    return {
                        url: urls[i],
                        line: source.substring(0, m.index).split('\n').length,
                        column: m.index - source.lastIndexOf('\n', m.index) - 1,
                    };
                }
            }
        }
        return null;
    }
    /**
     * Determines at which column a code fragment occurs on a line of the
     * source code.
     * @param {string} fragment The code fragment.
     * @param {string} url The URL to search.
     * @param {(string|number)} line The line number to examine.
     * @return {?number} The column number.
     * @memberof TraceKit.computeStackTrace
     */
    function findSourceInLine(fragment, url, line) {
        var source = getSource(url), re = new RegExp('\\b' + escapeRegExp(fragment) + '\\b'), m;
        line -= 1;
        if (source && source.length > line && (m = re.exec(source[line]))) {
            return m.index;
        }
        return null;
    }
    /**
     * Determines where a function was defined within the source code.
     * @param {(Function|string)} func A function reference or serialized
     * function definition.
     * @return {?Object.<string, (string|number)>} An object containing
     * the url, line, and column number of the defined function.
     * @memberof TraceKit.computeStackTrace
     */
    function findSourceByFunctionBody(func) {
        if (is_5(window$1 && window$1.document)) {
            return;
        }
        var urls = [getLocationHref()], scripts = window$1.document.getElementsByTagName('script'), body, code = '' + func, codeRE = /^function(?:\s+([\w$]+))?\s*\(([\w\s,]*)\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/, eventRE = /^function on([\w$]+)\s*\(event\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/, re, parts, result;
        for (var i = 0; i < scripts.length; ++i) {
            var script = scripts[i];
            if (script.src) {
                urls.push(script.src);
            }
        }
        if (!(parts = codeRE.exec(code))) {
            re = new RegExp(escapeRegExp(code).replace(/\s+/g, '\\s+'));
        }
        // not sure if this is really necessary, but I don’t have a test
        // corpus large enough to confirm that and it was in the original.
        else {
            var name = parts[1] ? '\\s+' + parts[1] : '', args = parts[2].split(',').join('\\s*,\\s*');
            body = escapeRegExp(parts[3]).replace(/;$/, ';?'); // semicolon is inserted if the function ends with a comment.replace(/\s+/g, '\\s+');
            re = new RegExp('function' + name + '\\s*\\(\\s*' + args + '\\s*\\)\\s*{\\s*' + body + '\\s*}');
        }
        // look for a normal function definition
        if ((result = findSourceInUrls(re, urls))) {
            return result;
        }
        // look for an old-school event handler function
        if ((parts = eventRE.exec(code))) {
            var event = parts[1];
            body = escapeCodeAsRegExpForMatchingInsideHTML(parts[2]);
            // look for a function defined in HTML as an onXXX handler
            re = new RegExp('on' + event + '=[\\\'"]\\s*' + body + '\\s*[\\\'"]', 'i');
            if ((result = findSourceInUrls(re, urls[0]))) {
                return result;
            }
            // look for ???
            re = new RegExp(body);
            if ((result = findSourceInUrls(re, urls))) {
                return result;
            }
        }
        return null;
    }
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
     * @return {?TraceKit.StackTrace} Stack trace information.
     * @memberof TraceKit.computeStackTrace
     */
    function computeStackTraceFromStackProp(ex) {
        if (!ex.stack) {
            return null;
        }
        var chrome = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|moz-extension).*?:\/.*?|\[native code\]|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i, winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, 
        // Used to additionally parse URL/line/column from eval frames
        isEval, geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/, lines = ex.stack.split('\n'), stack = [], submatch, parts, element, reference = /^(.*) is undefined$/.exec(ex.message);
        for (var i = 0, j = lines.length; i < j; ++i) {
            if ((parts = chrome.exec(lines[i]))) {
                var isNative = parts[2] && parts[2].indexOf('native') === 0; // start of line
                isEval = parts[2] && parts[2].indexOf('eval') === 0; // start of line
                if (isEval && (submatch = chromeEval.exec(parts[2]))) {
                    // throw out eval line/column and use top-most line/column number
                    parts[2] = submatch[1]; // url
                    // NOTE: It's messing out our integration tests in Karma, let's see if we can live with it – Kamil
                    // parts[3] = submatch[2]; // line
                    // parts[4] = submatch[3]; // column
                }
                element = {
                    url: !isNative ? parts[2] : null,
                    func: parts[1] || UNKNOWN_FUNCTION,
                    args: isNative ? [parts[2]] : [],
                    line: parts[3] ? +parts[3] : null,
                    column: parts[4] ? +parts[4] : null,
                };
            }
            else if ((parts = winjs.exec(lines[i]))) {
                element = {
                    url: parts[2],
                    func: parts[1] || UNKNOWN_FUNCTION,
                    args: [],
                    line: +parts[3],
                    column: parts[4] ? +parts[4] : null,
                };
            }
            else if ((parts = gecko.exec(lines[i]))) {
                isEval = parts[3] && parts[3].indexOf(' > eval') > -1;
                if (isEval && (submatch = geckoEval.exec(parts[3]))) {
                    // throw out eval line/column and use top-most line number
                    parts[3] = submatch[1];
                    // NOTE: It's messing out our integration tests in Karma, let's see if we can live with it – Kamil
                    // parts[4] = submatch[2];
                    // parts[5] = null; // no column when eval
                }
                else if (i === 0 && !parts[5] && !is_5(ex.columnNumber)) {
                    // FireFox uses this awesome columnNumber property for its top frame
                    // Also note, Firefox's column number is 0-based and everything else expects 1-based,
                    // so adding 1
                    // NOTE: this hack doesn't work if top-most frame is eval
                    stack[0].column = ex.columnNumber + 1;
                }
                element = {
                    url: parts[3],
                    func: parts[1] || UNKNOWN_FUNCTION,
                    args: parts[2] ? parts[2].split(',') : [],
                    line: parts[4] ? +parts[4] : null,
                    column: parts[5] ? +parts[5] : null,
                };
            }
            else {
                continue;
            }
            if (!element.func && element.line) {
                element.func = guessFunctionName(element.url, element.line);
            }
            if (TraceKit.remoteFetching && element.url && element.url.substr(0, 5) === 'blob:') {
                // Special case for handling JavaScript loaded into a blob.
                // We use a synchronous AJAX request here as a blob is already in
                // memory - it's not making a network request.  This will generate a warning
                // in the browser console, but there has already been an error so that's not
                // that much of an issue.
                var xhr = new XMLHttpRequest();
                xhr.open('GET', element.url, false);
                xhr.send('');
                // If we failed to download the source, skip this patch
                if (xhr.status === 200) {
                    var source = xhr.responseText || '';
                    // We trim the source down to the last 300 characters as sourceMappingURL is always at the end of the file.
                    // Why 300? To be in line with: https://github.com/getsentry/sentry/blob/4af29e8f2350e20c28a6933354e4f42437b4ba42/src/sentry/lang/javascript/processor.py#L164-L175
                    source = source.slice(-300);
                    // Now we dig out the source map URL
                    var sourceMaps = source.match(/\/\/# sourceMappingURL=(.*)$/);
                    // If we don't find a source map comment or we find more than one, continue on to the next element.
                    if (sourceMaps) {
                        var sourceMapAddress = sourceMaps[1];
                        // Now we check to see if it's a relative URL.
                        // If it is, convert it to an absolute one.
                        if (sourceMapAddress.charAt(0) === '~') {
                            sourceMapAddress = getLocationOrigin() + sourceMapAddress.slice(1);
                        }
                        // Now we strip the '.map' off of the end of the URL and update the
                        // element so that Sentry can match the map to the blob.
                        element.url = sourceMapAddress.slice(0, -4);
                    }
                }
            }
            element.context = element.line ? gatherContext(element.url, element.line) : null;
            stack.push(element);
        }
        if (!stack.length) {
            return null;
        }
        if (stack[0] && stack[0].line && !stack[0].column && reference) {
            stack[0].column = findSourceInLine(reference[1], stack[0].url, stack[0].line);
        }
        return {
            mode: 'stack',
            name: ex.name,
            message: ex.message,
            stack: stack,
        };
    }
    /**
     * Computes stack trace information from the stacktrace property.
     * Opera 10+ uses this property.
     * @param {Error} ex
     * @return {?TraceKit.StackTrace} Stack trace information.
     * @memberof TraceKit.computeStackTrace
     */
    function computeStackTraceFromStacktraceProp(ex) {
        // Access and store the stacktrace property before doing ANYTHING
        // else to it because Opera is not very good at providing it
        // reliably in other circumstances.
        var stacktrace = ex.stacktrace;
        if (!stacktrace) {
            return;
        }
        var opera10Regex = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i, opera11Regex = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\))? in (.*):\s*$/i, lines = stacktrace.split('\n'), stack = [], parts;
        for (var line = 0; line < lines.length; line += 2) {
            var element = null;
            if ((parts = opera10Regex.exec(lines[line]))) {
                element = {
                    url: parts[2],
                    line: +parts[1],
                    column: null,
                    func: parts[3],
                    args: [],
                };
            }
            else if ((parts = opera11Regex.exec(lines[line]))) {
                element = {
                    url: parts[6],
                    line: +parts[1],
                    column: +parts[2],
                    func: parts[3] || parts[4],
                    args: parts[5] ? parts[5].split(',') : [],
                };
            }
            if (element) {
                if (!element.func && element.line) {
                    element.func = guessFunctionName(element.url, element.line);
                }
                if (element.line) {
                    try {
                        element.context = gatherContext(element.url, element.line);
                    }
                    catch (exc) { }
                }
                if (!element.context) {
                    element.context = [lines[line + 1]];
                }
                stack.push(element);
            }
        }
        if (!stack.length) {
            return null;
        }
        return {
            mode: 'stacktrace',
            name: ex.name,
            message: ex.message,
            stack: stack,
        };
    }
    /**
     * NOT TESTED.
     * Computes stack trace information from an error message that includes
     * the stack trace.
     * Opera 9 and earlier use this method if the option to show stack
     * traces is turned on in opera:config.
     * @param {Error} ex
     * @return {?TraceKit.StackTrace} Stack information.
     * @memberof TraceKit.computeStackTrace
     */
    function computeStackTraceFromOperaMultiLineMessage(ex) {
        // TODO: Clean this function up
        // Opera includes a stack trace into the exception message. An example is:
        //
        // Statement on line 3: Undefined variable: undefinedFunc
        // Backtrace:
        //   Line 3 of linked script file://localhost/Users/andreyvit/Projects/TraceKit/javascript-client/sample.js: In function zzz
        //         undefinedFunc(a);
        //   Line 7 of inline#1 script in file://localhost/Users/andreyvit/Projects/TraceKit/javascript-client/sample.html: In function yyy
        //           zzz(x, y, z);
        //   Line 3 of inline#1 script in file://localhost/Users/andreyvit/Projects/TraceKit/javascript-client/sample.html: In function xxx
        //           yyy(a, a, a);
        //   Line 1 of function script
        //     try { xxx('hi'); return false; } catch(ex) { TraceKit.report(ex); }
        //   ...
        var lines = ex.message.split('\n');
        if (lines.length < 4) {
            return null;
        }
        var lineRE1 = /^\s*Line (\d+) of linked script ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i, lineRE2 = /^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i, lineRE3 = /^\s*Line (\d+) of function script\s*$/i, stack = [], scripts = window$1 && window$1.document && window$1.document.getElementsByTagName('script'), inlineScriptBlocks = [], parts;
        for (var s in scripts) {
            if (_has(scripts, s) && !scripts[s].src) {
                inlineScriptBlocks.push(scripts[s]);
            }
        }
        for (var line = 2; line < lines.length; line += 2) {
            var item = null;
            if ((parts = lineRE1.exec(lines[line]))) {
                item = {
                    url: parts[2],
                    func: parts[3],
                    args: [],
                    line: +parts[1],
                    column: null,
                };
            }
            else if ((parts = lineRE2.exec(lines[line]))) {
                item = {
                    url: parts[3],
                    func: parts[4],
                    args: [],
                    line: +parts[1],
                    column: null,
                };
                var relativeLine = +parts[1]; // relative to the start of the <SCRIPT> block
                var script = inlineScriptBlocks[parts[2] - 1];
                if (script) {
                    var source = getSource(item.url);
                    if (source) {
                        source = source.join('\n');
                        var pos = source.indexOf(script.innerText);
                        if (pos >= 0) {
                            item.line = relativeLine + source.substring(0, pos).split('\n').length;
                        }
                    }
                }
            }
            else if ((parts = lineRE3.exec(lines[line]))) {
                var url = getLocationHref().replace(/#.*$/, '');
                var re = new RegExp(escapeCodeAsRegExpForMatchingInsideHTML(lines[line + 1]));
                var src = findSourceInUrls(re, [url]);
                item = {
                    url: url,
                    func: '',
                    args: [],
                    line: src ? src.line : parts[1],
                    column: null,
                };
            }
            if (item) {
                if (!item.func) {
                    item.func = guessFunctionName(item.url, item.line);
                }
                var context = gatherContext(item.url, item.line);
                var midline = context ? context[Math.floor(context.length / 2)] : null;
                if (context && midline.replace(/^\s*/, '') === lines[line + 1].replace(/^\s*/, '')) {
                    item.context = context;
                }
                else {
                    // if (context) alert("Context mismatch. Correct midline:\n" + lines[i+1] + "\n\nMidline:\n" + midline + "\n\nContext:\n" + context.join("\n") + "\n\nURL:\n" + item.url);
                    item.context = [lines[line + 1]];
                }
                stack.push(item);
            }
        }
        if (!stack.length) {
            return null; // could not parse multiline exception message as Opera stack trace
        }
        return {
            mode: 'multiline',
            name: ex.name,
            message: lines[0],
            stack: stack,
        };
    }
    /**
     * Adds information about the first frame to incomplete stack traces.
     * Safari and IE require this to get complete data on the first frame.
     * @param {TraceKit.StackTrace} stackInfo Stack trace information from
     * one of the compute* methods.
     * @param {string} url The URL of the script that caused an error.
     * @param {(number|string)} lineNo The line number of the script that
     * caused an error.
     * @param {string=} message The error generated by the browser, which
     * hopefully contains the name of the object that caused the error.
     * @return {boolean} Whether or not the stack information was
     * augmented.
     * @memberof TraceKit.computeStackTrace
     */
    function augmentStackTraceWithInitialElement(stackInfo, url, lineNo, message) {
        var initial = {
            url: url,
            line: lineNo,
        };
        if (initial.url && initial.line) {
            stackInfo.incomplete = false;
            if (!initial.func) {
                initial.func = guessFunctionName(initial.url, initial.line);
            }
            if (!initial.context) {
                initial.context = gatherContext(initial.url, initial.line);
            }
            var reference = / '([^']+)' /.exec(message);
            if (reference) {
                initial.column = findSourceInLine(reference[1], initial.url, initial.line);
            }
            if (stackInfo.stack.length > 0) {
                if (stackInfo.stack[0].url === initial.url) {
                    if (stackInfo.stack[0].line === initial.line) {
                        return false; // already in stack trace
                    }
                    else if (!stackInfo.stack[0].line && stackInfo.stack[0].func === initial.func) {
                        stackInfo.stack[0].line = initial.line;
                        stackInfo.stack[0].context = initial.context;
                        return false;
                    }
                }
            }
            stackInfo.stack.unshift(initial);
            stackInfo.partial = true;
            return true;
        }
        else {
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
     * @return {TraceKit.StackTrace=} Stack trace information.
     * @memberof TraceKit.computeStackTrace
     */
    function computeStackTraceByWalkingCallerChain(ex, depth) {
        var functionName = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i, stack = [], funcs = {}, recursion = false, parts, item, source;
        for (var curr = computeStackTraceByWalkingCallerChain.caller; curr && !recursion; curr = curr.caller) {
            if (curr === computeStackTrace || curr === TraceKit.report) {
                continue;
            }
            item = {
                url: null,
                func: UNKNOWN_FUNCTION,
                args: [],
                line: null,
                column: null,
            };
            if (curr.name) {
                item.func = curr.name;
            }
            else if ((parts = functionName.exec(curr.toString()))) {
                item.func = parts[1];
            }
            if (typeof item.func === 'undefined') {
                try {
                    item.func = parts.input.substring(0, parts.input.indexOf('{'));
                }
                catch (e) { }
            }
            if ((source = findSourceByFunctionBody(curr))) {
                item.url = source.url;
                item.line = source.line;
                if (item.func === UNKNOWN_FUNCTION) {
                    item.func = guessFunctionName(item.url, item.line);
                }
                var reference = / '([^']+)' /.exec(ex.message || ex.description);
                if (reference) {
                    item.column = findSourceInLine(reference[1], source.url, source.line);
                }
            }
            if (funcs['' + curr]) {
                recursion = true;
            }
            else {
                funcs['' + curr] = true;
            }
            stack.push(item);
        }
        if (depth) {
            stack.splice(0, depth);
        }
        var result = {
            mode: 'callers',
            name: ex.name,
            message: ex.message,
            stack: stack,
        };
        augmentStackTraceWithInitialElement(result, ex.sourceURL || ex.fileName, ex.line || ex.lineNumber, ex.message || ex.description);
        return result;
    }
    /**
     * Computes a stack trace for an exception.
     * @param {Error} ex
     * @param {(string|number)=} depth
     * @memberof TraceKit.computeStackTrace
     */
    function computeStackTrace(ex, depth) {
        var stack = null;
        depth = depth == null ? 0 : +depth;
        try {
            // This must be tried first because Opera 10 *destroys*
            // its stacktrace property if you try to access the stack
            // property first!!
            stack = computeStackTraceFromStacktraceProp(ex);
            if (stack) {
                return stack;
            }
        }
        catch (e) {
            if (debug) {
                throw e;
            }
        }
        try {
            stack = computeStackTraceFromStackProp(ex);
            if (stack) {
                return stack;
            }
        }
        catch (e) {
            if (debug) {
                throw e;
            }
        }
        try {
            stack = computeStackTraceFromOperaMultiLineMessage(ex);
            if (stack) {
                return stack;
            }
        }
        catch (e) {
            if (debug) {
                throw e;
            }
        }
        try {
            stack = computeStackTraceByWalkingCallerChain(ex, depth + 1);
            if (stack) {
                return stack;
            }
        }
        catch (e) {
            if (debug) {
                throw e;
            }
        }
        return {
            name: ex.name,
            message: ex.message,
            mode: 'failed',
        };
    }
    /**
     * Logs a stacktrace starting from the previous call and working down.
     * @param {(number|string)=} depth How many frames deep to trace.
     * @return {TraceKit.StackTrace} Stack trace information.
     * @memberof TraceKit.computeStackTrace
     */
    function computeStackTraceOfCaller(depth) {
        depth = (depth == null ? 0 : +depth) + 1; // "+ 1" because "ofCaller" should drop one frame
        try {
            throw new Error();
        }
        catch (ex) {
            return computeStackTrace(ex, depth + 1);
        }
    }
    computeStackTrace.augmentStackTraceWithInitialElement = augmentStackTraceWithInitialElement;
    computeStackTrace.computeStackTraceFromStackProp = computeStackTraceFromStackProp;
    computeStackTrace.guessFunctionName = guessFunctionName;
    computeStackTrace.gatherContext = gatherContext;
    computeStackTrace.ofCaller = computeStackTraceOfCaller;
    computeStackTrace.getSource = getSource;
    return computeStackTrace;
})();
/**
 * Extends support for global error handling for asynchronous browser
 * functions. Adopted from Closure Library's errorhandler.js
 * @memberof TraceKit
 */
TraceKit.extendToAsynchronousCallbacks = function () {
    var _helper = function _helper(fnName) {
        var originalFn = window$1[fnName];
        window$1[fnName] = function traceKitAsyncExtension() {
            // Make a copy of the arguments
            var args = _slice.call(arguments);
            var originalCallback = args[0];
            if (typeof originalCallback === 'function') {
                args[0] = TraceKit.wrap(originalCallback);
            }
            // IE < 9 doesn't support .call/.apply on setInterval/setTimeout, but it
            // also only supports 2 argument and doesn't care what "this" is, so we
            // can just call the original function directly.
            if (originalFn.apply) {
                return originalFn.apply(this, args);
            }
            else {
                return originalFn(args[0], args[1]);
            }
        };
    };
    _helper('setTimeout');
    _helper('setInterval');
};
TraceKit.remoteFetching = false;
TraceKit.collectWindowErrors = true;
TraceKit.linesOfContext = 11;
var subscribe = TraceKit.report.subscribe;
var installGlobalHandler = TraceKit.report.installGlobalHandler;
var installGlobalUnhandledRejectionHandler = TraceKit.report.installGlobalUnhandledRejectionHandler;
var computeStackTrace = TraceKit.computeStackTrace;

var STACKTRACE_LIMIT = 50;
/** JSDoc */
function exceptionFromStacktrace(stacktrace) {
    var frames = prepareFramesForEvent(stacktrace.stack);
    var exception = {
        stacktrace: { frames: frames },
        type: stacktrace.name,
        value: stacktrace.message,
    };
    // tslint:disable-next-line:strict-type-predicates
    if (exception.type === undefined && exception.value === '') {
        exception.value = 'Unrecoverable error caught';
    }
    return exception;
}
/** JSDoc */
function eventFromPlainObject(exception, syntheticException) {
    var exceptionKeys = Object.keys(exception).sort();
    var event = {
        extra: {
            __serialized__: object_7(exception),
        },
        fingerprint: [md5(exceptionKeys.join(''))],
        message: "Non-Error exception captured with keys: " + object_8(exceptionKeys),
    };
    if (syntheticException) {
        var stacktrace = computeStackTrace(syntheticException);
        var frames_1 = prepareFramesForEvent(stacktrace.stack);
        event.stacktrace = {
            frames: frames_1,
        };
    }
    return event;
}
/** JSDoc */
function eventFromStacktrace(stacktrace) {
    var exception = exceptionFromStacktrace(stacktrace);
    return {
        exception: {
            values: [exception],
        },
    };
}
/** JSDoc */
function prepareFramesForEvent(stack) {
    if (!stack || !stack.length) {
        return [];
    }
    var localStack = stack;
    var firstFrameFunction = localStack[0].func || '';
    if (string_4(firstFrameFunction, 'captureMessage') || string_4(firstFrameFunction, 'captureException')) {
        localStack = localStack.slice(1);
    }
    // The frame where the crash happened, should be the last entry in the array
    return localStack
        .map(function (frame) { return ({
        colno: frame.column,
        filename: frame.url || localStack[0].url,
        function: frame.func || '?',
        in_app: true,
        lineno: frame.line,
    }); })
        .slice(0, STACKTRACE_LIMIT)
        .reverse();
}

/** Base Transport class implementation */
var BaseTransport = /** @class */ (function () {
    function BaseTransport(options) {
        this.options = options;
        this.url = new core.API(this.options.dsn).getStoreEndpointWithUrlEncodedAuth();
    }
    /**
     * @inheritDoc
     */
    BaseTransport.prototype.captureEvent = function (_) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new core.SentryError('Transport Class has to implement `captureEvent` method');
            });
        });
    };
    return BaseTransport;
}());

var global$1 = misc_3();
/** `fetch` based transport */
var FetchTransport = /** @class */ (function (_super) {
    __extends(FetchTransport, _super);
    function FetchTransport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritDoc
     */
    FetchTransport.prototype.captureEvent = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var defaultOptions, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        defaultOptions = {
                            body: object_1(event),
                            method: 'POST',
                            // Despite all stars in the sky saying that Edge supports old draft syntax, aka 'never', 'always', 'origin' and 'default
                            // https://caniuse.com/#feat=referrer-policy
                            // It doesn't. And it throw exception instead of ignoring this parameter...
                            // REF: https://github.com/getsentry/raven-js/issues/1233
                            referrerPolicy: (supports_8() ? 'origin' : ''),
                        };
                        return [4 /*yield*/, global$1.fetch(this.url, defaultOptions)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, {
                                status: dist_2.fromHttpCode(response.status),
                            }];
                }
            });
        });
    };
    return FetchTransport;
}(BaseTransport));

/** `XHR` based transport */
var XHRTransport = /** @class */ (function (_super) {
    __extends(XHRTransport, _super);
    function XHRTransport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritDoc
     */
    XHRTransport.prototype.captureEvent = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var request = new XMLHttpRequest();
                        request.onreadystatechange = function () {
                            if (request.readyState !== 4) {
                                return;
                            }
                            if (request.status === 200) {
                                resolve({
                                    status: dist_2.fromHttpCode(request.status),
                                });
                            }
                            reject(request);
                        };
                        request.open('POST', _this.url);
                        request.send(object_1(event));
                    })];
            });
        });
    };
    return XHRTransport;
}(BaseTransport));

var global$2 = misc_3();
/** `sendBeacon` based transport */
var BeaconTransport = /** @class */ (function (_super) {
    __extends(BeaconTransport, _super);
    function BeaconTransport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritDoc
     */
    BeaconTransport.prototype.captureEvent = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var data, result;
            return __generator(this, function (_a) {
                data = object_1(event);
                result = global$2.navigator.sendBeacon(this.url, data);
                return [2 /*return*/, {
                        status: result ? dist_2.Success : dist_2.Failed,
                    }];
            });
        });
    };
    return BeaconTransport;
}(BaseTransport));



var index$1 = /*#__PURE__*/Object.freeze({
    BaseTransport: BaseTransport,
    FetchTransport: FetchTransport,
    XHRTransport: XHRTransport,
    BeaconTransport: BeaconTransport
});

/** The Sentry Browser SDK Backend. */
var BrowserBackend = /** @class */ (function (_super) {
    __extends(BrowserBackend, _super);
    function BrowserBackend() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritDoc
     */
    BrowserBackend.prototype.install = function () {
        // We are only called by the client if the SDK is enabled and a valid Dsn
        // has been configured. If no Dsn is present, this indicates a programming
        // error.
        var dsn = this.options.dsn;
        if (!dsn) {
            throw new core.SentryError('Invariant exception: install() must not be called when disabled');
        }
        Error.stackTraceLimit = 50;
        return true;
    };
    /**
     * @inheritDoc
     */
    BrowserBackend.prototype.eventFromException = function (exception, hint) {
        return __awaiter(this, void 0, void 0, function () {
            var event, ex, ex, name_1, message, ex, ex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(is_2(exception) && exception.error)) return [3 /*break*/, 1];
                        ex = exception;
                        exception = ex.error; // tslint:disable-line:no-parameter-reassignment
                        event = eventFromStacktrace(computeStackTrace(exception));
                        return [3 /*break*/, 7];
                    case 1:
                        if (!(is_3(exception) || is_4(exception))) return [3 /*break*/, 3];
                        ex = exception;
                        name_1 = ex.name || (is_3(ex) ? 'DOMError' : 'DOMException');
                        message = ex.message ? name_1 + ": " + ex.message : name_1;
                        return [4 /*yield*/, this.eventFromMessage(message, undefined, hint)];
                    case 2:
                        event = _a.sent();
                        return [3 /*break*/, 7];
                    case 3:
                        if (!is_1(exception)) return [3 /*break*/, 4];
                        // we have a real Error object, do nothing
                        event = eventFromStacktrace(computeStackTrace(exception));
                        return [3 /*break*/, 7];
                    case 4:
                        if (!(is_9(exception) && hint && hint.syntheticException)) return [3 /*break*/, 5];
                        ex = exception;
                        event = eventFromPlainObject(ex, hint.syntheticException);
                        return [3 /*break*/, 7];
                    case 5:
                        ex = exception;
                        return [4 /*yield*/, this.eventFromMessage(ex, undefined, hint)];
                    case 6:
                        event = _a.sent();
                        _a.label = 7;
                    case 7:
                        event = __assign({}, event, { event_id: hint && hint.event_id, exception: __assign({}, event.exception, { mechanism: {
                                    handled: true,
                                    type: 'generic',
                                } }) });
                        return [2 /*return*/, event];
                }
            });
        });
    };
    /**
     * @inheritDoc
     */
    BrowserBackend.prototype.eventFromMessage = function (message, level, hint) {
        if (level === void 0) { level = dist_1.Info; }
        return __awaiter(this, void 0, void 0, function () {
            var event, stacktrace, frames_1;
            return __generator(this, function (_a) {
                event = {
                    event_id: hint && hint.event_id,
                    fingerprint: [message],
                    level: level,
                    message: message,
                };
                if (this.options.attachStacktrace && hint && hint.syntheticException) {
                    stacktrace = computeStackTrace(hint.syntheticException);
                    frames_1 = prepareFramesForEvent(stacktrace.stack);
                    event.stacktrace = {
                        frames: frames_1,
                    };
                }
                return [2 /*return*/, event];
            });
        });
    };
    /**
     * @inheritDoc
     */
    BrowserBackend.prototype.sendEvent = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var transportOptions;
            return __generator(this, function (_a) {
                if (!this.options.dsn) {
                    logger_2.warn("Event has been skipped because no Dsn is configured.");
                    // We do nothing in case there is no DSN
                    return [2 /*return*/, { status: dist_2.Skipped, reason: "Event has been skipped because no Dsn is configured." }];
                }
                if (!this.transport) {
                    transportOptions = this.options.transportOptions
                        ? this.options.transportOptions
                        : { dsn: this.options.dsn };
                    if (this.options.transport) {
                        this.transport = new this.options.transport({ dsn: this.options.dsn });
                    }
                    else if (supports_6()) {
                        this.transport = new BeaconTransport(transportOptions);
                    }
                    else if (supports_4()) {
                        this.transport = new FetchTransport(transportOptions);
                    }
                    else {
                        this.transport = new XHRTransport(transportOptions);
                    }
                }
                return [2 /*return*/, this.transport.captureEvent(event)];
            });
        });
    };
    return BrowserBackend;
}(core.BaseBackend));

var SDK_NAME = 'sentry.javascript.browser';
var SDK_VERSION = '4.2.4';

/**
 * The Sentry Browser SDK Client.
 *
 * @see BrowserOptions for documentation on configuration options.
 * @see SentryClient for usage documentation.
 */
var BrowserClient = /** @class */ (function (_super) {
    __extends(BrowserClient, _super);
    /**
     * Creates a new Browser SDK instance.
     *
     * @param options Configuration options for this SDK.
     */
    function BrowserClient(options) {
        return _super.call(this, BrowserBackend, options) || this;
    }
    /**
     * @inheritDoc
     */
    BrowserClient.prototype.prepareEvent = function (event, scope, hint) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                event.platform = event.platform || 'javascript';
                event.sdk = __assign({}, event.sdk, { name: SDK_NAME, packages: __spread(((event.sdk && event.sdk.packages) || []), [
                        {
                            name: 'npm:@sentry/browser',
                            version: SDK_VERSION,
                        },
                    ]), version: SDK_VERSION });
                return [2 /*return*/, _super.prototype.prepareEvent.call(this, event, scope, hint)];
            });
        });
    };
    /**
     * Show a report dialog to the user to send feedback to a specific event.
     *
     * @param options Set individual options for the dialog
     */
    BrowserClient.prototype.showReportDialog = function (options) {
        if (options === void 0) { options = {}; }
        // doesn't work without a document (React Native)
        var document = misc_3().document;
        if (!document) {
            return;
        }
        var dsn = options.dsn || this.getDsn();
        if (!options.eventId) {
            throw new core.SentryError('Missing `eventId` option in showReportDialog call');
        }
        if (!dsn) {
            throw new core.SentryError('Missing `Dsn` option in showReportDialog call');
        }
        var script = document.createElement('script');
        script.async = true;
        script.src = new core.API(dsn).getReportDialogEndpoint(options);
        (document.head || document.body).appendChild(script);
    };
    return BrowserClient;
}(core.BaseClient));

var debounceDuration = 1000;
var keypressTimeout;
var lastCapturedEvent;
var ignoreOnError = 0;
/** JSDoc */
function shouldIgnoreOnError() {
    return ignoreOnError > 0;
}
/** JSDoc */
function ignoreNextOnError() {
    // onerror should trigger before setTimeout
    ignoreOnError += 1;
    setTimeout(function () {
        ignoreOnError -= 1;
    });
}
/**
 * Instruments the given function and sends an event to Sentry every time the
 * function throws an exception.
 *
 * @param fn A function to wrap.
 * @returns The wrapped function.
 */
function wrap(fn, options, before) {
    if (options === void 0) { options = {}; }
    if (!is_6(fn)) {
        return fn;
    }
    try {
        // We don't wanna wrap it twice
        if (fn.__sentry__) {
            return fn;
        }
        // If this has already been wrapped in the past, return that wrapped function
        if (fn.__sentry_wrapped__) {
            return fn.__sentry_wrapped__;
        }
    }
    catch (e) {
        // Just accessing custom props in some Selenium environments
        // can cause a "Permission denied" exception (see raven-js#495).
        // Bail on wrapping and return the function as-is (defers to window.onerror).
        return fn;
    }
    var wrapped = function () {
        var _this = this;
        if (before && is_6(before)) {
            before.apply(this, arguments);
        }
        var args = Array.prototype.slice.call(arguments);
        try {
            // Attempt to invoke user-land function
            // NOTE: If you are a Sentry user, and you are seeing this stack frame, it
            //       means Raven caught an error invoking your application code. This is
            //       expected behavior and NOT indicative of a bug with Raven.js.
            var wrappedArguments = args.map(function (arg) { return wrap(arg, options); });
            if (fn.handleEvent) {
                return fn.handleEvent.apply(this, wrappedArguments);
            }
            else {
                return fn.apply(this, wrappedArguments);
            }
        }
        catch (ex) {
            ignoreNextOnError();
            core.withScope(function (scope) { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    scope.addEventProcessor(function (event) { return __awaiter(_this, void 0, void 0, function () {
                        var processedEvent;
                        return __generator(this, function (_a) {
                            processedEvent = __assign({}, event);
                            if (options.mechanism) {
                                processedEvent.exception = processedEvent.exception || {};
                                processedEvent.exception.mechanism = options.mechanism;
                            }
                            processedEvent.extra = __assign({}, processedEvent.extra, { arguments: object_6(args, 2) });
                            return [2 /*return*/, processedEvent];
                        });
                    }); });
                    core.getCurrentHub().captureException(ex, { originalException: ex });
                    return [2 /*return*/];
                });
            }); });
            throw ex;
        }
    };
    // Accessing some objects may throw
    // ref: https://github.com/getsentry/sentry-javascript/issues/1168
    try {
        for (var property in fn) {
            if (Object.prototype.hasOwnProperty.call(fn, property)) {
                wrapped[property] = fn[property];
            }
        }
    }
    catch (_oO) { } // tslint:disable-line:no-empty
    wrapped.prototype = fn.prototype;
    fn.__sentry_wrapped__ = wrapped;
    // Signal that this function has been wrapped/filled already
    // for both debugging and to prevent it to being wrapped/filled twice
    wrapped.__sentry__ = true;
    wrapped.__sentry_original__ = fn;
    return wrapped;
}
/**
 * Wraps addEventListener to capture UI breadcrumbs
 * @param eventName the event name (e.g. "click")
 * @returns wrapped breadcrumb events handler
 */
function breadcrumbEventHandler(eventName) {
    return function (event) {
        // reset keypress timeout; e.g. triggering a 'click' after
        // a 'keypress' will reset the keypress debounce so that a new
        // set of keypresses can be recorded
        keypressTimeout = undefined;
        // It's possible this handler might trigger multiple times for the same
        // event (e.g. event propagation through node ancestors). Ignore if we've
        // already captured the event.
        if (lastCapturedEvent === event) {
            return;
        }
        lastCapturedEvent = event;
        // try/catch both:
        // - accessing event.target (see getsentry/raven-js#838, #768)
        // - `htmlTreeAsString` because it's complex, and just accessing the DOM incorrectly
        //   can throw an exception in some circumstances.
        var target;
        try {
            target = misc_5(event.target);
        }
        catch (e) {
            target = '<unknown>';
        }
        core.getCurrentHub().addBreadcrumb({
            category: "ui." + eventName,
            message: target,
        }, {
            event: event,
            name: eventName,
        });
    };
}
/**
 * Wraps addEventListener to capture keypress UI events
 * @returns wrapped keypress events handler
 */
function keypressEventHandler() {
    // TODO: if somehow user switches keypress target before
    //       debounce timeout is triggered, we will only capture
    //       a single breadcrumb from the FIRST target (acceptable?)
    return function (event) {
        var target;
        try {
            target = event.target;
        }
        catch (e) {
            // just accessing event properties can throw an exception in some rare circumstances
            // see: https://github.com/getsentry/raven-js/issues/838
            return;
        }
        var tagName = target && target.tagName;
        // only consider keypress events on actual input elements
        // this will disregard keypresses targeting body (e.g. tabbing
        // through elements, hotkeys, etc)
        if (!tagName || (tagName !== 'INPUT' && tagName !== 'TEXTAREA' && !target.isContentEditable)) {
            return;
        }
        // record first keypress in a series, but ignore subsequent
        // keypresses until debounce clears
        if (!keypressTimeout) {
            breadcrumbEventHandler('input')(event);
        }
        clearTimeout(keypressTimeout);
        keypressTimeout = setTimeout(function () {
            keypressTimeout = undefined;
        }, debounceDuration);
    };
}

/** Global handlers */
var GlobalHandlers = /** @class */ (function () {
    /** JSDoc */
    function GlobalHandlers(options) {
        /**
         * @inheritDoc
         */
        this.name = GlobalHandlers.id;
        this.options = __assign({ onerror: true, onunhandledrejection: true }, options);
    }
    /**
     * @inheritDoc
     */
    GlobalHandlers.prototype.setupOnce = function () {
        subscribe(function (stack, _, error) {
            // TODO: use stack.context to get a valuable information from TraceKit, eg.
            // [
            //   0: "  })"
            //   1: ""
            //   2: "  function foo () {"
            //   3: "    Sentry.captureException('some error')"
            //   4: "    Sentry.captureMessage('some message')"
            //   5: "    throw 'foo'"
            //   6: "  }"
            //   7: ""
            //   8: "  function bar () {"
            //   9: "    foo();"
            //   10: "  }"
            // ]
            if (shouldIgnoreOnError()) {
                return;
            }
            var self = core.getCurrentHub().getIntegration(GlobalHandlers);
            if (self) {
                core.getCurrentHub().captureEvent(self.eventFromGlobalHandler(stack), { originalException: error, data: { stack: stack } });
            }
        });
        if (this.options.onerror) {
            logger_2.log('Global Handler attached: onerror');
            installGlobalHandler();
        }
        if (this.options.onunhandledrejection) {
            logger_2.log('Global Handler attached: onunhandledrejection');
            installGlobalUnhandledRejectionHandler();
        }
    };
    /** JSDoc */
    GlobalHandlers.prototype.eventFromGlobalHandler = function (stacktrace) {
        var event = eventFromStacktrace(stacktrace);
        return __assign({}, event, { exception: __assign({}, event.exception, { mechanism: {
                    data: {
                        mode: stacktrace.mode,
                    },
                    handled: false,
                    type: stacktrace.mechanism,
                } }) });
    };
    /**
     * @inheritDoc
     */
    GlobalHandlers.id = 'GlobalHandlers';
    return GlobalHandlers;
}());

/** Wrap timer functions and event targets to catch errors and provide better meta data */
var TryCatch = /** @class */ (function () {
    function TryCatch() {
        /** JSDoc */
        this.ignoreOnError = 0;
        /**
         * @inheritDoc
         */
        this.name = TryCatch.id;
    }
    /** JSDoc */
    TryCatch.prototype.wrapTimeFunction = function (original) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var originalCallback = args[0];
            args[0] = wrap(originalCallback, {
                mechanism: {
                    data: { function: original.name || '<anonymous>' },
                    handled: true,
                    type: 'instrument',
                },
            });
            return original.apply(this, args);
        };
    };
    /** JSDoc */
    TryCatch.prototype.wrapRAF = function (original) {
        return function (callback) {
            return original(wrap(callback, {
                mechanism: {
                    data: {
                        function: 'requestAnimationFrame',
                        handler: (original && original.name) || '<anonymous>',
                    },
                    handled: true,
                    type: 'instrument',
                },
            }));
        };
    };
    /** JSDoc */
    TryCatch.prototype.wrapEventTarget = function (target) {
        var global = misc_3();
        var proto = global[target] && global[target].prototype;
        if (!proto || !proto.hasOwnProperty || !proto.hasOwnProperty('addEventListener')) {
            return;
        }
        object_4(proto, 'addEventListener', function (original) {
            return function (eventName, fn, options) {
                try {
                    fn.handleEvent = wrap(fn.handleEvent.bind(fn), {
                        mechanism: {
                            data: {
                                function: 'handleEvent',
                                handler: (fn && fn.name) || '<anonymous>',
                                target: target,
                            },
                            handled: true,
                            type: 'instrument',
                        },
                    });
                }
                catch (err) {
                    // can sometimes get 'Permission denied to access property "handle Event'
                }
                // More breadcrumb DOM capture ... done here and not in `_instrumentBreadcrumbs`
                // so that we don't have more than one wrapper function
                var before;
                var clickHandler;
                var keypressHandler;
                if (target === 'EventTarget' || target === 'Node') {
                    // NOTE: generating multiple handlers per addEventListener invocation, should
                    //       revisit and verify we can just use one (almost certainly)
                    clickHandler = breadcrumbEventHandler('click');
                    keypressHandler = keypressEventHandler();
                    before = function (event) {
                        // need to intercept every DOM event in `before` argument, in case that
                        // same wrapped method is re-used for different events (e.g. mousemove THEN click)
                        // see #724
                        if (!event) {
                            return;
                        }
                        var eventType;
                        try {
                            eventType = event.type;
                        }
                        catch (e) {
                            // just accessing event properties can throw an exception in some rare circumstances
                            // see: https://github.com/getsentry/raven-js/issues/838
                            return;
                        }
                        if (eventType === 'click') {
                            return clickHandler(event);
                        }
                        else if (eventType === 'keypress') {
                            return keypressHandler(event);
                        }
                    };
                }
                return original.call(this, eventName, wrap(fn, {
                    mechanism: {
                        data: {
                            function: 'addEventListener',
                            handler: (fn && fn.name) || '<anonymous>',
                            target: target,
                        },
                        handled: true,
                        type: 'instrument',
                    },
                }, before), options);
            };
        });
        object_4(proto, 'removeEventListener', function (original) {
            return function (eventName, fn, options) {
                var callback = fn;
                try {
                    callback = callback && (callback.__sentry_wrapped__ || callback);
                }
                catch (e) {
                    // ignore, accessing __sentry_wrapped__ will throw in some Selenium environments
                }
                return original.call(this, eventName, callback, options);
            };
        });
    };
    /**
     * Wrap timer functions and event targets to catch errors
     * and provide better metadata.
     */
    TryCatch.prototype.setupOnce = function () {
        this.ignoreOnError = this.ignoreOnError;
        var global = misc_3();
        object_4(global, 'setTimeout', this.wrapTimeFunction.bind(this));
        object_4(global, 'setInterval', this.wrapTimeFunction.bind(this));
        object_4(global, 'requestAnimationFrame', this.wrapRAF.bind(this));
        [
            'EventTarget',
            'Window',
            'Node',
            'ApplicationCache',
            'AudioTrackList',
            'ChannelMergerNode',
            'CryptoOperation',
            'EventSource',
            'FileReader',
            'HTMLUnknownElement',
            'IDBDatabase',
            'IDBRequest',
            'IDBTransaction',
            'KeyOperation',
            'MediaController',
            'MessagePort',
            'ModalWindow',
            'Notification',
            'SVGElementInstance',
            'Screen',
            'TextTrack',
            'TextTrackCue',
            'TextTrackList',
            'WebSocket',
            'WebSocketWorker',
            'Worker',
            'XMLHttpRequest',
            'XMLHttpRequestEventTarget',
            'XMLHttpRequestUpload',
        ].forEach(this.wrapEventTarget.bind(this));
    };
    /**
     * @inheritDoc
     */
    TryCatch.id = 'TryCatch';
    return TryCatch;
}());

var global$3 = misc_3();
var lastHref;
/** Default Breadcrumbs instrumentations */
var Breadcrumbs = /** @class */ (function () {
    /**
     * @inheritDoc
     */
    function Breadcrumbs(options) {
        /**
         * @inheritDoc
         */
        this.name = Breadcrumbs.id;
        this.options = __assign({ beacon: true, console: true, dom: true, fetch: true, history: true, sentry: true, xhr: true }, options);
    }
    /** JSDoc */
    Breadcrumbs.prototype.instrumentBeacon = function () {
        if (!supports_6()) {
            return;
        }
        /** JSDoc */
        function beaconReplacementFunction(originalBeaconFunction) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var url = args[0];
                var data = args[1];
                // If the browser successfully queues the request for delivery, the method returns "true" and returns "false" otherwise.
                // https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API/Using_the_Beacon_API
                var result = originalBeaconFunction.apply(this, args);
                var client = core.getCurrentHub().getClient();
                var dsn = client && client.getDsn();
                if (dsn) {
                    var filterUrl = new core.API(dsn).getStoreEndpoint();
                    // if Sentry key appears in URL, don't capture it as a request
                    // but rather as our own 'sentry' type breadcrumb
                    if (filterUrl && string_4(url, filterUrl)) {
                        addSentryBreadcrumb(data);
                        return result;
                    }
                }
                // What is wrong with you TypeScript...
                var breadcrumbData = {
                    category: 'beacon',
                    data: data,
                    type: 'http',
                };
                if (!result) {
                    breadcrumbData.level = dist_1.Error;
                }
                Breadcrumbs.addBreadcrumb(breadcrumbData, {
                    input: args,
                    result: result,
                });
                return result;
            };
        }
        object_4(global$3.navigator, 'sendBeacon', beaconReplacementFunction);
    };
    /** JSDoc */
    Breadcrumbs.prototype.instrumentConsole = function () {
        if (!('console' in global$3)) {
            return;
        }
        ['debug', 'info', 'warn', 'error', 'log'].forEach(function (level) {
            if (!(level in global$3.console)) {
                return;
            }
            object_4(global$3.console, level, function (originalConsoleLevel) {
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var breadcrumbData = {
                        category: 'console',
                        data: {
                            extra: {
                                arguments: args.slice(1),
                            },
                            logger: 'console',
                        },
                        level: dist_1.fromString(level),
                        message: string_3(args, ' '),
                    };
                    if (level === 'assert') {
                        if (args[0] === false) {
                            breadcrumbData.message = "Assertion failed: " + (string_3(args.slice(1), ' ') || 'console.assert');
                            breadcrumbData.data.extra.arguments = args.slice(1);
                        }
                    }
                    Breadcrumbs.addBreadcrumb(breadcrumbData, {
                        input: args,
                        level: level,
                    });
                    // this fails for some browsers. :(
                    if (originalConsoleLevel) {
                        Function.prototype.apply.call(originalConsoleLevel, global$3.console, args);
                    }
                };
            });
        });
    };
    /** JSDoc */
    Breadcrumbs.prototype.instrumentDOM = function () {
        if (!('document' in global$3)) {
            return;
        }
        // Capture breadcrumbs from any click that is unhandled / bubbled up all the way
        // to the document. Do this before we instrument addEventListener.
        global$3.document.addEventListener('click', breadcrumbEventHandler('click'), false);
        global$3.document.addEventListener('keypress', keypressEventHandler(), false);
    };
    /** JSDoc */
    Breadcrumbs.prototype.instrumentFetch = function () {
        if (!supports_5()) {
            return;
        }
        object_4(global$3, 'fetch', function (originalFetch) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var fetchInput = args[0];
                var method = 'GET';
                var url;
                if (typeof fetchInput === 'string') {
                    url = fetchInput;
                }
                else if ('Request' in global$3 && fetchInput instanceof Request) {
                    url = fetchInput.url;
                    if (fetchInput.method) {
                        method = fetchInput.method;
                    }
                }
                else {
                    url = String(fetchInput);
                }
                if (args[1] && args[1].method) {
                    method = args[1].method;
                }
                var client = core.getCurrentHub().getClient();
                var dsn = client && client.getDsn();
                if (dsn) {
                    var filterUrl = new core.API(dsn).getStoreEndpoint();
                    // if Sentry key appears in URL, don't capture it as a request
                    // but rather as our own 'sentry' type breadcrumb
                    if (filterUrl && string_4(url, filterUrl)) {
                        if (method === 'POST' && args[1] && args[1].body) {
                            addSentryBreadcrumb(args[1].body);
                        }
                        return originalFetch.apply(global$3, args);
                    }
                }
                var fetchData = {
                    method: method,
                    url: url,
                };
                return originalFetch
                    .apply(global$3, args)
                    .then(function (response) {
                    fetchData.status_code = response.status;
                    Breadcrumbs.addBreadcrumb({
                        category: 'fetch',
                        data: fetchData,
                        type: 'http',
                    }, {
                        input: args,
                        response: response,
                    });
                    return response;
                })
                    .catch(function (error) {
                    Breadcrumbs.addBreadcrumb({
                        category: 'fetch',
                        data: fetchData,
                        level: dist_1.Error,
                        type: 'http',
                    }, {
                        error: error,
                        input: args,
                    });
                    throw error;
                });
            };
        });
    };
    /** JSDoc */
    Breadcrumbs.prototype.instrumentHistory = function () {
        var _this = this;
        if (!supports_9()) {
            return;
        }
        var captureUrlChange = function (from, to) {
            var parsedLoc = misc_7(global$3.location.href);
            var parsedTo = misc_7(to);
            var parsedFrom = misc_7(from);
            // Initial pushState doesn't provide `from` information
            if (!parsedFrom.path) {
                parsedFrom = parsedLoc;
            }
            // because onpopstate only tells you the "new" (to) value of location.href, and
            // not the previous (from) value, we need to track the value of the current URL
            // state ourselves
            lastHref = to;
            // Use only the path component of the URL if the URL matches the current
            // document (almost all the time when using pushState)
            if (parsedLoc.protocol === parsedTo.protocol && parsedLoc.host === parsedTo.host) {
                // tslint:disable-next-line:no-parameter-reassignment
                to = parsedTo.relative;
            }
            if (parsedLoc.protocol === parsedFrom.protocol && parsedLoc.host === parsedFrom.host) {
                // tslint:disable-next-line:no-parameter-reassignment
                from = parsedFrom.relative;
            }
            Breadcrumbs.addBreadcrumb({
                category: 'navigation',
                data: {
                    from: from,
                    to: to,
                },
            });
        };
        // record navigation (URL) changes
        var oldOnPopState = global$3.onpopstate;
        global$3.onpopstate = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var currentHref = global$3.location.href;
            captureUrlChange(lastHref, currentHref);
            if (oldOnPopState) {
                return oldOnPopState.apply(_this, args);
            }
        };
        /** JSDoc */
        function historyReplacementFunction(originalHistoryFunction) {
            // note history.pushState.length is 0; intentionally not declaring
            // params to preserve 0 arity
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var url = args.length > 2 ? args[2] : undefined;
                // url argument is optional
                if (url) {
                    // coerce to string (this is what pushState does)
                    captureUrlChange(lastHref, String(url));
                }
                return originalHistoryFunction.apply(this, args);
            };
        }
        object_4(global$3.history, 'pushState', historyReplacementFunction);
        object_4(global$3.history, 'replaceState', historyReplacementFunction);
    };
    /** JSDoc */
    Breadcrumbs.prototype.instrumentXHR = function () {
        if (!('XMLHttpRequest' in global$3)) {
            return;
        }
        /** JSDoc */
        function wrapProp(prop, xhr) {
            // TODO: Fix XHR types
            if (prop in xhr && is_6(xhr[prop])) {
                object_4(xhr, prop, function (original) {
                    return wrap(original, {
                        mechanism: {
                            data: {
                                function: prop,
                                handler: (original && original.name) || '<anonymous>',
                            },
                            handled: true,
                            type: 'instrument',
                        },
                    });
                });
            }
        }
        var xhrproto = XMLHttpRequest.prototype;
        object_4(xhrproto, 'open', function (originalOpen) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var url = args[1];
                this.__sentry_xhr__ = {
                    method: args[0],
                    url: args[1],
                };
                var client = core.getCurrentHub().getClient();
                var dsn = client && client.getDsn();
                if (dsn) {
                    var filterUrl = new core.API(dsn).getStoreEndpoint();
                    // if Sentry key appears in URL, don't capture it as a request
                    // but rather as our own 'sentry' type breadcrumb
                    if (is_7(url) && (filterUrl && string_4(url, filterUrl))) {
                        this.__sentry_own_request__ = true;
                    }
                }
                return originalOpen.apply(this, args);
            };
        });
        object_4(xhrproto, 'send', function (originalSend) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var xhr = this; // tslint:disable-line:no-this-assignment
                if (xhr.__sentry_own_request__) {
                    addSentryBreadcrumb(args[0]);
                }
                /** JSDoc */
                function onreadystatechangeHandler() {
                    if (xhr.readyState === 4) {
                        if (xhr.__sentry_own_request__) {
                            return;
                        }
                        try {
                            // touching statusCode in some platforms throws
                            // an exception
                            if (xhr.__sentry_xhr__) {
                                xhr.__sentry_xhr__.status_code = xhr.status;
                            }
                        }
                        catch (e) {
                            /* do nothing */
                        }
                        Breadcrumbs.addBreadcrumb({
                            category: 'xhr',
                            data: xhr.__sentry_xhr__,
                            type: 'http',
                        }, {
                            xhr: xhr,
                        });
                    }
                }
                ['onload', 'onerror', 'onprogress'].forEach(function (prop) {
                    wrapProp(prop, xhr);
                });
                if ('onreadystatechange' in xhr && is_6(xhr.onreadystatechange)) {
                    object_4(xhr, 'onreadystatechange', function (original) {
                        return wrap(original, {
                            mechanism: {
                                data: {
                                    function: 'onreadystatechange',
                                    handler: (original && original.name) || '<anonymous>',
                                },
                                handled: true,
                                type: 'instrument',
                            },
                        }, onreadystatechangeHandler);
                    });
                }
                else {
                    // if onreadystatechange wasn't actually set by the page on this xhr, we
                    // are free to set our own and capture the breadcrumb
                    xhr.onreadystatechange = onreadystatechangeHandler;
                }
                return originalSend.apply(this, args);
            };
        });
    };
    /**
     * Helper that checks if integration is enabled on the client.
     * @param breadcrumb Breadcrumb
     * @param hint SentryBreadcrumbHint
     */
    Breadcrumbs.addBreadcrumb = function (breadcrumb, hint) {
        if (core.getCurrentHub().getIntegration(Breadcrumbs)) {
            core.getCurrentHub().addBreadcrumb(breadcrumb, hint);
        }
    };
    /**
     * Instrument browser built-ins w/ breadcrumb capturing
     *  - Console API
     *  - DOM API (click/typing)
     *  - XMLHttpRequest API
     *  - Fetch API
     *  - History API
     */
    Breadcrumbs.prototype.setupOnce = function () {
        if (this.options.console) {
            this.instrumentConsole();
        }
        if (this.options.dom) {
            this.instrumentDOM();
        }
        if (this.options.xhr) {
            this.instrumentXHR();
        }
        if (this.options.fetch) {
            this.instrumentFetch();
        }
        if (this.options.beacon) {
            this.instrumentBeacon();
        }
        if (this.options.history) {
            this.instrumentHistory();
        }
    };
    /**
     * @inheritDoc
     */
    Breadcrumbs.id = 'Breadcrumbs';
    return Breadcrumbs;
}());
/** JSDoc */
function addSentryBreadcrumb(serializedData) {
    // There's always something that can go wrong with deserialization...
    try {
        var event_1 = object_2(serializedData);
        Breadcrumbs.addBreadcrumb({
            category: 'sentry',
            event_id: event_1.event_id,
            level: event_1.level || dist_1.fromString('error'),
            message: misc_8(event_1),
        }, {
            event: event_1,
        });
    }
    catch (_oO) {
        logger_2.error('Error while adding sentry type breadcrumb');
    }
}

var DEFAULT_KEY = 'cause';
var DEFAULT_LIMIT = 5;
/** Adds SDK info to an event. */
var LinkedErrors = /** @class */ (function () {
    /**
     * @inheritDoc
     */
    function LinkedErrors(options) {
        if (options === void 0) { options = {}; }
        /**
         * @inheritDoc
         */
        this.name = LinkedErrors.id;
        this.key = options.key || DEFAULT_KEY;
        this.limit = options.limit || DEFAULT_LIMIT;
    }
    /**
     * @inheritDoc
     */
    LinkedErrors.prototype.setupOnce = function () {
        var _this = this;
        core.addGlobalEventProcessor(function (event, hint) { return __awaiter(_this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                self = core.getCurrentHub().getIntegration(LinkedErrors);
                if (self) {
                    return [2 /*return*/, self.handler(event, hint)];
                }
                return [2 /*return*/, event];
            });
        }); });
    };
    /**
     * @inheritDoc
     */
    LinkedErrors.prototype.handler = function (event, hint) {
        if (!event.exception || !event.exception.values || !hint || !(hint.originalException instanceof Error)) {
            return event;
        }
        var linkedErrors = this.walkErrorTree(hint.originalException, this.key);
        event.exception.values = __spread(linkedErrors, event.exception.values);
        return event;
    };
    /**
     * @inheritDoc
     */
    LinkedErrors.prototype.walkErrorTree = function (error, key, stack) {
        if (stack === void 0) { stack = []; }
        if (!(error[key] instanceof Error) || stack.length + 1 >= this.limit) {
            return stack;
        }
        var stacktrace = computeStackTrace(error[key]);
        var exception = exceptionFromStacktrace(stacktrace);
        return this.walkErrorTree(error[key], key, __spread([exception], stack));
    };
    /**
     * @inheritDoc
     */
    LinkedErrors.id = 'LinkedErrors';
    return LinkedErrors;
}());

/** JSDoc */
var ReportTypes;
(function (ReportTypes) {
    /** JSDoc */
    ReportTypes["Crash"] = "crash";
    /** JSDoc */
    ReportTypes["Deprecation"] = "deprecation";
    /** JSDoc */
    ReportTypes["Intervention"] = "intervention";
})(ReportTypes || (ReportTypes = {}));
/** Reporting API integration - https://w3c.github.io/reporting/ */
var ReportingObserver = /** @class */ (function () {
    /**
     * @inheritDoc
     */
    function ReportingObserver(options) {
        if (options === void 0) { options = {
            types: [ReportTypes.Crash, ReportTypes.Deprecation, ReportTypes.Intervention],
        }; }
        this.options = options;
        /**
         * @inheritDoc
         */
        this.name = ReportingObserver.id;
    }
    /**
     * @inheritDoc
     */
    ReportingObserver.prototype.setupOnce = function () {
        if (!supports_7()) {
            return;
        }
        var observer = new (misc_3().ReportingObserver)(this.handler.bind(this), {
            buffered: true,
            types: this.options.types,
        });
        observer.observe();
    };
    /**
     * @inheritDoc
     */
    ReportingObserver.prototype.handler = function (reports) {
        var e_1, _a;
        if (!core.getCurrentHub().getIntegration(ReportingObserver)) {
            return;
        }
        var _loop_1 = function (report) {
            core.withScope(function (scope) {
                scope.setExtra('url', report.url);
                var label = "ReportingObserver [" + report.type + "]";
                var details = 'No details available';
                if (report.body) {
                    // Object.keys doesn't work on ReportBody, as all properties are inheirted
                    var plainBody = {};
                    // tslint:disable-next-line:forin
                    for (var prop in report.body) {
                        plainBody[prop] = report.body[prop];
                    }
                    scope.setExtra('body', plainBody);
                    if (report.type === ReportTypes.Crash) {
                        var body = report.body;
                        // A fancy way to create a message out of crashId OR reason OR both OR fallback
                        details = [body.crashId || '', body.reason || ''].join(' ').trim() || details;
                    }
                    else {
                        var body = report.body;
                        details = body.message || details;
                    }
                }
                core.captureMessage(label + ": " + details);
            });
        };
        try {
            for (var reports_1 = __values(reports), reports_1_1 = reports_1.next(); !reports_1_1.done; reports_1_1 = reports_1.next()) {
                var report = reports_1_1.value;
                _loop_1(report);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (reports_1_1 && !reports_1_1.done && (_a = reports_1.return)) _a.call(reports_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * @inheritDoc
     */
    ReportingObserver.id = 'ReportingObserver';
    return ReportingObserver;
}());

var global$4 = misc_3();
/** UserAgent */
var UserAgent = /** @class */ (function () {
    function UserAgent() {
        /**
         * @inheritDoc
         */
        this.name = UserAgent.id;
    }
    /**
     * @inheritDoc
     */
    UserAgent.prototype.setupOnce = function () {
        var _this = this;
        core.addGlobalEventProcessor(function (event) { return __awaiter(_this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                if (core.getCurrentHub().getIntegration(UserAgent)) {
                    if (!global$4.navigator || !global$4.location) {
                        return [2 /*return*/, event];
                    }
                    request = event.request || {};
                    request.url = request.url || global$4.location.href;
                    request.headers = request.headers || {};
                    request.headers['User-Agent'] = global$4.navigator.userAgent;
                    return [2 /*return*/, __assign({}, event, { request: request })];
                }
                return [2 /*return*/, event];
            });
        }); });
    };
    /**
     * @inheritDoc
     */
    UserAgent.id = 'UserAgent';
    return UserAgent;
}());

/** JSDoc */
var Ember = /** @class */ (function () {
    /**
     * @inheritDoc
     */
    function Ember(options) {
        if (options === void 0) { options = {}; }
        /**
         * @inheritDoc
         */
        this.name = Ember.id;
        this.Ember =
            options.Ember ||
                misc_3().Ember;
    }
    /**
     * @inheritDoc
     */
    Ember.prototype.setupOnce = function () {
        var _this = this;
        if (!this.Ember) {
            return;
        }
        var oldOnError = this.Ember.onerror;
        this.Ember.onerror = function (error) {
            if (core.getCurrentHub().getIntegration(Ember)) {
                core.withScope(function (scope) {
                    _this.addIntegrationToSdkInfo(scope);
                    core.getCurrentHub().captureException(error, { originalException: error });
                });
            }
            if (typeof oldOnError === 'function') {
                oldOnError.call(_this.Ember, error);
            }
            else if (_this.Ember.testing) {
                throw error;
            }
        };
        this.Ember.RSVP.on('error', function (reason) {
            if (core.getCurrentHub().getIntegration(Ember)) {
                core.withScope(function (scope) {
                    if (reason instanceof Error) {
                        scope.setExtra('context', 'Unhandled Promise error detected');
                        _this.addIntegrationToSdkInfo(scope);
                        core.getCurrentHub().captureException(reason, { originalException: reason });
                    }
                    else {
                        scope.setExtra('reason', reason);
                        _this.addIntegrationToSdkInfo(scope);
                        core.captureMessage('Unhandled Promise error detected');
                    }
                });
            }
        });
    };
    /**
     * Appends SDK integrations
     * @param scope The scope currently used.
     */
    Ember.prototype.addIntegrationToSdkInfo = function (scope) {
        var _this = this;
        scope.addEventProcessor(function (event) { return __awaiter(_this, void 0, void 0, function () {
            var integrations;
            return __generator(this, function (_a) {
                if (event.sdk) {
                    integrations = event.sdk.integrations || [];
                    event.sdk = __assign({}, event.sdk, { integrations: __spread(integrations, ['ember']) });
                }
                return [2 /*return*/, event];
            });
        }); });
    };
    /**
     * @inheritDoc
     */
    Ember.id = 'Ember';
    return Ember;
}());

/** JSDoc */
var Vue = /** @class */ (function () {
    /**
     * @inheritDoc
     */
    function Vue(options) {
        if (options === void 0) { options = {}; }
        /**
         * @inheritDoc
         */
        this.name = Vue.id;
        this.Vue =
            options.Vue ||
                misc_3().Vue;
    }
    /** JSDoc */
    Vue.prototype.formatComponentName = function (vm) {
        if (vm.$root === vm) {
            return 'root instance';
        }
        var name = vm._isVue ? vm.$options.name || vm.$options._componentTag : vm.name;
        return ((name ? "component <" + name + ">" : 'anonymous component') +
            (vm._isVue && vm.$options.__file ? " at " + vm.$options.__file : ''));
    };
    /**
     * @inheritDoc
     */
    Vue.prototype.setupOnce = function () {
        var _this = this;
        if (!this.Vue || !this.Vue.config) {
            return;
        }
        var oldOnError = this.Vue.config.errorHandler;
        this.Vue.config.errorHandler = function (error, vm, info) {
            var metadata = {};
            if (is_9(vm)) {
                metadata.componentName = _this.formatComponentName(vm);
                metadata.propsData = vm.$options.propsData;
            }
            if (!is_5(info)) {
                metadata.lifecycleHook = info;
            }
            if (core.getCurrentHub().getIntegration(Vue)) {
                core.withScope(function (scope) {
                    Object.keys(metadata).forEach(function (key) {
                        scope.setExtra(key, metadata[key]);
                    });
                    scope.addEventProcessor(function (event) { return __awaiter(_this, void 0, void 0, function () {
                        var integrations;
                        return __generator(this, function (_a) {
                            if (event.sdk) {
                                integrations = event.sdk.integrations || [];
                                event.sdk = __assign({}, event.sdk, { integrations: __spread(integrations, ['vue']) });
                            }
                            return [2 /*return*/, event];
                        });
                    }); });
                    core.getCurrentHub().captureException(error, { originalException: error });
                });
            }
            if (typeof oldOnError === 'function') {
                oldOnError.call(_this.Vue, error, vm, info);
            }
        };
    };
    /**
     * @inheritDoc
     */
    Vue.id = 'Vue';
    return Vue;
}());



var BrowserIntegrations = /*#__PURE__*/Object.freeze({
    GlobalHandlers: GlobalHandlers,
    TryCatch: TryCatch,
    Breadcrumbs: Breadcrumbs,
    LinkedErrors: LinkedErrors,
    ReportingObserver: ReportingObserver,
    UserAgent: UserAgent,
    Ember: Ember,
    Vue: Vue
});

var defaultIntegrations = [
    // Common
    new core.Integrations.Dedupe(),
    new core.Integrations.InboundFilters(),
    new core.Integrations.FunctionToString(),
    // Native Wrappers
    new TryCatch(),
    new Breadcrumbs(),
    // Global Handlers
    new GlobalHandlers(),
    new ReportingObserver(),
    // Misc
    new LinkedErrors(),
    new UserAgent(),
];
/**
 * The Sentry Browser SDK Client.
 *
 * To use this SDK, call the {@link init} function as early as possible when
 * loading the web page. To set context information or send manual events, use
 * the provided methods.
 *
 * @example
 * import { init } from '@sentry/browser';
 *
 * init({
 *   dsn: '__DSN__',
 *   // ...
 * });
 *
 * @example
 * import { configureScope } from '@sentry/browser';
 * configureScope((scope: Scope) => {
 *   scope.setExtra({ battery: 0.7 });
 *   scope.setTag({ user_mode: 'admin' });
 *   scope.setUser({ id: '4711' });
 * });
 *
 * @example
 * import { addBreadcrumb } from '@sentry/browser';
 * addBreadcrumb({
 *   message: 'My Breadcrumb',
 *   // ...
 * });
 *
 * @example
 * import * as Sentry from '@sentry/browser';
 * Sentry.captureMessage('Hello, world!');
 * Sentry.captureException(new Error('Good bye'));
 * Sentry.captureEvent({
 *   message: 'Manual',
 *   stacktrace: [
 *     // ...
 *   ],
 * });
 *
 * @see BrowserOptions for documentation on configuration options.
 */
function init(options) {
    if (options === void 0) { options = {}; }
    if (options.defaultIntegrations === undefined) {
        options.defaultIntegrations = defaultIntegrations;
    }
    core.initAndBind(BrowserClient, options);
}
/**
 * Present the user with a report dialog.
 *
 * @param options Everything is optional, we try to fetch all info need from the global scope.
 */
function showReportDialog(options) {
    if (options === void 0) { options = {}; }
    if (!options.eventId) {
        options.eventId = core.getCurrentHub().lastEventId();
    }
    core.getCurrentHub().getClient().showReportDialog(options);
}
/**
 * This is the getter for lastEventId.
 *
 * @returns The last event id of a captured event.
 */
function lastEventId() {
    return core.getCurrentHub().lastEventId();
}
/**
 * This function is here to be API compatible with the loader
 */
function forceLoad() {
    // Noop
}
/**
 * This function is here to be API compatible with the loader
 */
function onLoad(callback) {
    callback();
}

var INTEGRATIONS = __assign({}, core.Integrations, BrowserIntegrations);

exports.addGlobalEventProcessor = core.addGlobalEventProcessor;
exports.addBreadcrumb = core.addBreadcrumb;
exports.captureException = core.captureException;
exports.captureEvent = core.captureEvent;
exports.captureMessage = core.captureMessage;
exports.configureScope = core.configureScope;
exports.withScope = core.withScope;
exports.getHubFromCarrier = core.getHubFromCarrier;
exports.getCurrentHub = core.getCurrentHub;
exports.Hub = core.Hub;
exports.Scope = core.Scope;
exports.Integrations = INTEGRATIONS;
exports.Transports = index$1;
exports.Severity = dist_1;
exports.Status = dist_2;
exports.BrowserBackend = BrowserBackend;
exports.BrowserClient = BrowserClient;
exports.defaultIntegrations = defaultIntegrations;
exports.forceLoad = forceLoad;
exports.init = init;
exports.lastEventId = lastEventId;
exports.onLoad = onLoad;
exports.showReportDialog = showReportDialog;
exports.SDK_NAME = SDK_NAME;
exports.SDK_VERSION = SDK_VERSION;
//# sourceMappingURL=index.js.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16), __webpack_require__(15)))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var object_1 = __webpack_require__(7);
var dsn_1 = __webpack_require__(5);
var SENTRY_API_VERSION = '7';
/** Helper class to provide urls to different Sentry endpoints. */
var API = /** @class */ (function () {
    /** Create a new instance of API */
    function API(dsn) {
        this.dsn = dsn;
        this.dsnObject = new dsn_1.Dsn(dsn);
    }
    /** Returns the Dsn object. */
    API.prototype.getDsn = function () {
        return this.dsnObject;
    };
    /** Returns a string with auth headers in the url to the store endpoint. */
    API.prototype.getStoreEndpoint = function () {
        return "" + this.getBaseUrl() + this.getStoreEndpointPath();
    };
    /** Returns the store endpoint with auth added in url encoded. */
    API.prototype.getStoreEndpointWithUrlEncodedAuth = function () {
        var dsn = this.dsnObject;
        var auth = {
            sentry_key: dsn.user,
            sentry_version: SENTRY_API_VERSION,
        };
        // Auth is intentionally sent as part of query string (NOT as custom HTTP header)
        // to avoid preflight CORS requests
        return this.getStoreEndpoint() + "?" + object_1.urlEncode(auth);
    };
    /** Returns the base path of the url including the port. */
    API.prototype.getBaseUrl = function () {
        var dsn = this.dsnObject;
        var protocol = dsn.protocol ? dsn.protocol + ":" : '';
        var port = dsn.port ? ":" + dsn.port : '';
        return protocol + "//" + dsn.host + port;
    };
    /** Returns only the path component for the store endpoint. */
    API.prototype.getStoreEndpointPath = function () {
        var dsn = this.dsnObject;
        return (dsn.path ? "/" + dsn.path : '') + "/api/" + dsn.projectId + "/store/";
    };
    /** Returns an object that can be used in request headers. */
    API.prototype.getRequestHeaders = function (clientName, clientVersion) {
        var dsn = this.dsnObject;
        var header = ["Sentry sentry_version=" + SENTRY_API_VERSION];
        header.push("sentry_timestamp=" + new Date().getTime());
        header.push("sentry_client=" + clientName + "/" + clientVersion);
        header.push("sentry_key=" + dsn.user);
        if (dsn.pass) {
            header.push("sentry_secret=" + dsn.pass);
        }
        return {
            'Content-Type': 'application/json',
            'X-Sentry-Auth': header.join(', '),
        };
    };
    /** Returns the url to the report dialog endpoint. */
    API.prototype.getReportDialogEndpoint = function (dialogOptions) {
        if (dialogOptions === void 0) { dialogOptions = {}; }
        var dsn = this.dsnObject;
        var endpoint = "" + this.getBaseUrl() + (dsn.path ? "/" + dsn.path : '') + "/api/embed/error-page/";
        var encodedOptions = [];
        encodedOptions.push("dsn=" + dsn.toString());
        for (var key in dialogOptions) {
            if (key === 'user') {
                if (!dialogOptions.user) {
                    continue;
                }
                if (dialogOptions.user.name) {
                    encodedOptions.push("name=" + encodeURIComponent(dialogOptions.user.name));
                }
                if (dialogOptions.user.email) {
                    encodedOptions.push("email=" + encodeURIComponent(dialogOptions.user.email));
                }
            }
            else {
                encodedOptions.push(encodeURIComponent(key) + "=" + encodeURIComponent(dialogOptions[key]));
            }
        }
        if (encodedOptions.length) {
            return endpoint + "?" + encodedOptions.join('&');
        }
        return endpoint;
    };
    return API;
}());
exports.API = API;
//# sourceMappingURL=api.js.map

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __webpack_require__(0);
var error_1 = __webpack_require__(6);
var requestbuffer_1 = __webpack_require__(11);
/**
 * This is the base implemention of a Backend.
 */
var BaseBackend = /** @class */ (function () {
    /** Creates a new browser backend instance. */
    function BaseBackend(options) {
        /** A simple buffer holding all requests. */
        this.buffer = new requestbuffer_1.RequestBuffer();
        this.options = options;
        if (!this.options.dsn) {
            logger_1.logger.warn('No DSN provided, backend will not do anything.');
        }
    }
    /**
     * @inheritDoc
     */
    BaseBackend.prototype.eventFromException = function (_exception, _hint) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new error_1.SentryError('Backend has to implement `eventFromException` method');
            });
        });
    };
    /**
     * @inheritDoc
     */
    BaseBackend.prototype.eventFromMessage = function (_message, _level, _hint) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new error_1.SentryError('Backend has to implement `eventFromMessage` method');
            });
        });
    };
    /**
     * @inheritDoc
     */
    BaseBackend.prototype.sendEvent = function (_event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new error_1.SentryError('Backend has to implement `sendEvent` method');
            });
        });
    };
    /**
     * @inheritDoc
     */
    BaseBackend.prototype.storeBreadcrumb = function (_) {
        return true;
    };
    /**
     * @inheritDoc
     */
    BaseBackend.prototype.storeScope = function (_) {
        // Noop
    };
    /**
     * @inheritDoc
     */
    BaseBackend.prototype.getBuffer = function () {
        return this.buffer;
    };
    return BaseBackend;
}());
exports.BaseBackend = BaseBackend;
//# sourceMappingURL=basebackend.js.map

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(41);
var async_1 = __webpack_require__(42);
var logger_1 = __webpack_require__(0);
var misc_1 = __webpack_require__(2);
var string_1 = __webpack_require__(13);
var dsn_1 = __webpack_require__(5);
var integration_1 = __webpack_require__(29);
/**
 * Default maximum number of breadcrumbs added to an event. Can be overwritten
 * with {@link Options.maxBreadcrumbs}.
 */
var DEFAULT_BREADCRUMBS = 30;
/**
 * Absolute maximum number of breadcrumbs added to an event. The
 * `maxBreadcrumbs` option cannot be higher than this value.
 */
var MAX_BREADCRUMBS = 100;
/**
 * By default, truncates URL values to 250 chars
 */
var MAX_URL_LENGTH = 250;
/**
 * Base implementation for all JavaScript SDK clients.
 *
 * Call the constructor with the corresponding backend constructor and options
 * specific to the client subclass. To access these options later, use
 * {@link Client.getOptions}. Also, the Backend instance is available via
 * {@link Client.getBackend}.
 *
 * If a Dsn is specified in the options, it will be parsed and stored. Use
 * {@link Client.getDsn} to retrieve the Dsn at any moment. In case the Dsn is
 * invalid, the constructor will throw a {@link SentryException}. Note that
 * without a valid Dsn, the SDK will not send any events to Sentry.
 *
 * Before sending an event via the backend, it is passed through
 * {@link BaseClient.prepareEvent} to add SDK information and scope data
 * (breadcrumbs and context). To add more custom information, override this
 * method and extend the resulting prepared event.
 *
 * To issue automatically created events (e.g. via instrumentation), use
 * {@link Client.captureEvent}. It will prepare the event and pass it through
 * the callback lifecycle. To issue auto-breadcrumbs, use
 * {@link Client.addBreadcrumb}.
 *
 * @example
 * class NodeClient extends BaseClient<NodeBackend, NodeOptions> {
 *   public constructor(options: NodeOptions) {
 *     super(NodeBackend, options);
 *   }
 *
 *   // ...
 * }
 */
var BaseClient = /** @class */ (function () {
    /**
     * Initializes this client instance.
     *
     * @param backendClass A constructor function to create the backend.
     * @param options Options for the client.
     */
    function BaseClient(backendClass, options) {
        this.backend = new backendClass(options);
        this.options = options;
        if (options.dsn) {
            this.dsn = new dsn_1.Dsn(options.dsn);
        }
        // We have to setup the integrations in the constructor since we do not want
        // that anyone needs to call client.install();
        this.integrations = integration_1.setupIntegrations(this.options);
    }
    /**
     * @inheritDoc
     */
    BaseClient.prototype.install = function () {
        if (!this.isEnabled()) {
            return (this.installed = false);
        }
        var backend = this.getBackend();
        if (!this.installed && backend.install) {
            backend.install();
        }
        return (this.installed = true);
    };
    /**
     * Internal helper function to buffer promises.
     *
     * @param promise Any promise, but in this case Promise<SentryResponse>.
     */
    BaseClient.prototype.buffer = function (promise) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getBackend()
                        .getBuffer()
                        .add(promise)];
            });
        });
    };
    /**
     * @inheritDoc
     */
    BaseClient.prototype.captureException = function (exception, hint, scope) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.buffer((function () { return __awaiter(_this, void 0, void 0, function () {
                        var event;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.getBackend().eventFromException(exception, hint)];
                                case 1:
                                    event = _a.sent();
                                    return [2 /*return*/, this.captureEvent(event, hint, scope)];
                            }
                        });
                    }); })())];
            });
        });
    };
    /**
     * @inheritDoc
     */
    BaseClient.prototype.captureMessage = function (message, level, hint, scope) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.buffer((function () { return __awaiter(_this, void 0, void 0, function () {
                        var event;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.getBackend().eventFromMessage(message, level, hint)];
                                case 1:
                                    event = _a.sent();
                                    return [2 /*return*/, this.captureEvent(event, hint, scope)];
                            }
                        });
                    }); })())];
            });
        });
    };
    /**
     * @inheritDoc
     */
    BaseClient.prototype.captureEvent = function (event, hint, scope) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                // Adding this here is technically not correct since if you call captureMessage/captureException it's already
                // buffered. But since we not really need the count and we only need to know if the buffer is full or not,
                // This is fine...
                return [2 /*return*/, this.buffer((function () { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            return [2 /*return*/, this.processEvent(event, function (finalEvent) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                    return [2 /*return*/, this.getBackend().sendEvent(finalEvent)];
                                }); }); }, hint, scope)];
                        });
                    }); })())];
            });
        });
    };
    /**
     * @inheritDoc
     */
    BaseClient.prototype.addBreadcrumb = function (breadcrumb, hint, scope) {
        var _a = this.getOptions(), beforeBreadcrumb = _a.beforeBreadcrumb, _b = _a.maxBreadcrumbs, maxBreadcrumbs = _b === void 0 ? DEFAULT_BREADCRUMBS : _b;
        if (maxBreadcrumbs <= 0) {
            return;
        }
        var timestamp = new Date().getTime() / 1000;
        var mergedBreadcrumb = __assign({ timestamp: timestamp }, breadcrumb);
        var finalBreadcrumb = beforeBreadcrumb
            ? misc_1.consoleSandbox(function () { return beforeBreadcrumb(mergedBreadcrumb, hint); })
            : mergedBreadcrumb;
        if (finalBreadcrumb === null) {
            return;
        }
        if (this.getBackend().storeBreadcrumb(finalBreadcrumb) && scope) {
            scope.addBreadcrumb(finalBreadcrumb, Math.min(maxBreadcrumbs, MAX_BREADCRUMBS));
        }
    };
    /**
     * @inheritDoc
     */
    BaseClient.prototype.getDsn = function () {
        return this.dsn;
    };
    /**
     * @inheritDoc
     */
    BaseClient.prototype.getOptions = function () {
        return this.options;
    };
    /** Returns the current backend. */
    BaseClient.prototype.getBackend = function () {
        return this.backend;
    };
    /** Determines whether this SDK is enabled and a valid Dsn is present. */
    BaseClient.prototype.isEnabled = function () {
        return this.getOptions().enabled !== false && this.dsn !== undefined;
    };
    /**
     * Adds common information to events.
     *
     * The information includes release and environment from `options`,
     * breadcrumbs and context (extra, tags and user) from the scope.
     *
     * Information that is already present in the event is never overwritten. For
     * nested objects, such as the context, keys are merged.
     *
     * @param event The original event.
     * @param hint May contain additional informartion about the original exception.
     * @param scope A scope containing event metadata.
     * @returns A new event with more information.
     */
    BaseClient.prototype.prepareEvent = function (event, scope, hint) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, environment, _b, maxBreadcrumbs, release, dist, prepared, exception, request;
            return __generator(this, function (_c) {
                _a = this.getOptions(), environment = _a.environment, _b = _a.maxBreadcrumbs, maxBreadcrumbs = _b === void 0 ? DEFAULT_BREADCRUMBS : _b, release = _a.release, dist = _a.dist;
                prepared = __assign({}, event);
                if (prepared.environment === undefined && environment !== undefined) {
                    prepared.environment = environment;
                }
                if (prepared.release === undefined && release !== undefined) {
                    prepared.release = release;
                }
                if (prepared.dist === undefined && dist !== undefined) {
                    prepared.dist = dist;
                }
                if (prepared.message) {
                    prepared.message = string_1.truncate(prepared.message, MAX_URL_LENGTH);
                }
                exception = prepared.exception && prepared.exception.values && prepared.exception.values[0];
                if (exception && exception.value) {
                    exception.value = string_1.truncate(exception.value, MAX_URL_LENGTH);
                }
                request = prepared.request;
                if (request && request.url) {
                    request.url = string_1.truncate(request.url, MAX_URL_LENGTH);
                }
                if (prepared.event_id === undefined) {
                    prepared.event_id = misc_1.uuid4();
                }
                // This should be the last thing called, since we want that
                // {@link Hub.addEventProcessor} gets the finished prepared event.
                if (scope) {
                    return [2 /*return*/, scope.applyToEvent(prepared, hint, Math.min(maxBreadcrumbs, MAX_BREADCRUMBS))];
                }
                return [2 /*return*/, prepared];
            });
        });
    };
    /**
     * Processes an event (either error or message) and sends it to Sentry.
     *
     * This also adds breadcrumbs and context information to the event. However,
     * platform specific meta data (such as the User's IP address) must be added
     * by the SDK implementor.
     *
     * The returned event status offers clues to whether the event was sent to
     * Sentry and accepted there. If the {@link Options.shouldSend} hook returns
     * `false`, the status will be {@link SendStatus.Skipped}. If the rate limit
     * was exceeded, the status will be {@link SendStatus.RateLimit}.
     *
     * @param event The event to send to Sentry.
     * @param send A function to actually send the event.
     * @param scope A scope containing event metadata.
     * @param hint May contain additional informartion about the original exception.
     * @returns A Promise that resolves with the event status.
     */
    BaseClient.prototype.processEvent = function (event, send, hint, scope) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, beforeSend, sampleRate, prepared, finalEvent, isInternalException, exception_1, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.isEnabled()) {
                            return [2 /*return*/, {
                                    status: types_1.Status.Skipped,
                                }];
                        }
                        _a = this.getOptions(), beforeSend = _a.beforeSend, sampleRate = _a.sampleRate;
                        // 1.0 === 100% events are sent
                        // 0.0 === 0% events are sent
                        if (typeof sampleRate === 'number' && Math.random() > sampleRate) {
                            return [2 /*return*/, {
                                    status: types_1.Status.Skipped,
                                }];
                        }
                        return [4 /*yield*/, this.prepareEvent(event, scope, hint)];
                    case 1:
                        prepared = _b.sent();
                        if (prepared === null) {
                            return [2 /*return*/, {
                                    status: types_1.Status.Skipped,
                                }];
                        }
                        finalEvent = prepared;
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        isInternalException = hint && hint.data && hint.data.__sentry__ === true;
                        if (!(!isInternalException && beforeSend)) return [3 /*break*/, 4];
                        return [4 /*yield*/, beforeSend(prepared, hint)];
                    case 3:
                        finalEvent = _b.sent();
                        if (typeof finalEvent === 'undefined') {
                            logger_1.logger.error('`beforeSend` method has to return `null` or a valid event');
                        }
                        _b.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        exception_1 = _b.sent();
                        async_1.forget(this.captureException(exception_1, {
                            data: {
                                __sentry__: true,
                            },
                            originalException: exception_1,
                        }));
                        return [2 /*return*/, {
                                reason: 'Event processing in beforeSend method threw an exception',
                                status: types_1.Status.Invalid,
                            }];
                    case 6:
                        if (finalEvent === null) {
                            return [2 /*return*/, {
                                    reason: 'Event dropped due to being discarded by beforeSend method',
                                    status: types_1.Status.Skipped,
                                }];
                        }
                        return [4 /*yield*/, send(finalEvent)];
                    case 7:
                        response = _b.sent();
                        response.event = finalEvent;
                        if (response.status === types_1.Status.RateLimit) {
                            // TODO: Handle rate limits and maintain a queue. For now, we require SDK
                            // implementors to override this method and handle it themselves.
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
     * @inheritDoc
     */
    BaseClient.prototype.close = function (timeout) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getBackend()
                        .getBuffer()
                        .drain(timeout)];
            });
        });
    };
    /**
     * @inheritDoc
     */
    BaseClient.prototype.getIntegrations = function () {
        return this.integrations || {};
    };
    /**
     * @inheritDoc
     */
    BaseClient.prototype.getIntegration = function (integration) {
        try {
            return this.integrations[integration.id] || null;
        }
        catch (_oO) {
            logger_1.logger.warn("Cannot retrieve integration " + integration.id + " from the current Client");
            return null;
        }
    };
    return BaseClient;
}());
exports.BaseClient = BaseClient;
//# sourceMappingURL=baseclient.js.map

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var minimal_1 = __webpack_require__(40);
exports.addBreadcrumb = minimal_1.addBreadcrumb;
exports.captureException = minimal_1.captureException;
exports.captureEvent = minimal_1.captureEvent;
exports.captureMessage = minimal_1.captureMessage;
exports.configureScope = minimal_1.configureScope;
exports.withScope = minimal_1.withScope;
var hub_1 = __webpack_require__(1);
exports.addGlobalEventProcessor = hub_1.addGlobalEventProcessor;
exports.getCurrentHub = hub_1.getCurrentHub;
exports.Hub = hub_1.Hub;
exports.getHubFromCarrier = hub_1.getHubFromCarrier;
exports.Scope = hub_1.Scope;
var api_1 = __webpack_require__(25);
exports.API = api_1.API;
var baseclient_1 = __webpack_require__(27);
exports.BaseClient = baseclient_1.BaseClient;
var basebackend_1 = __webpack_require__(26);
exports.BaseBackend = basebackend_1.BaseBackend;
var dsn_1 = __webpack_require__(5);
exports.Dsn = dsn_1.Dsn;
var error_1 = __webpack_require__(6);
exports.SentryError = error_1.SentryError;
var requestbuffer_1 = __webpack_require__(11);
exports.RequestBuffer = requestbuffer_1.RequestBuffer;
var interfaces_1 = __webpack_require__(37);
exports.LogLevel = interfaces_1.LogLevel;
var sdk_1 = __webpack_require__(38);
exports.initAndBind = sdk_1.initAndBind;
var Integrations = __webpack_require__(33);
exports.Integrations = Integrations;
//# sourceMappingURL=index.js.map

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __webpack_require__(0);
exports.installedIntegrations = [];
/** Gets integration to install */
function getIntegrationsToSetup(options) {
    var e_1, _a, e_2, _b;
    var defaultIntegrations = (options.defaultIntegrations && __spread(options.defaultIntegrations)) || [];
    var userIntegrations = options.integrations;
    var integrations = [];
    if (Array.isArray(userIntegrations)) {
        var userIntegrationsNames = userIntegrations.map(function (i) { return i.name; });
        var pickedIntegrationsNames = [];
        try {
            // Leave only unique default integrations, that were not overridden with provided user integrations
            for (var defaultIntegrations_1 = __values(defaultIntegrations), defaultIntegrations_1_1 = defaultIntegrations_1.next(); !defaultIntegrations_1_1.done; defaultIntegrations_1_1 = defaultIntegrations_1.next()) {
                var defaultIntegration = defaultIntegrations_1_1.value;
                if (userIntegrationsNames.indexOf(getIntegrationName(defaultIntegration)) === -1 &&
                    pickedIntegrationsNames.indexOf(getIntegrationName(defaultIntegration)) === -1) {
                    integrations.push(defaultIntegration);
                    pickedIntegrationsNames.push(getIntegrationName(defaultIntegration));
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (defaultIntegrations_1_1 && !defaultIntegrations_1_1.done && (_a = defaultIntegrations_1.return)) _a.call(defaultIntegrations_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            // Don't add same user integration twice
            for (var userIntegrations_1 = __values(userIntegrations), userIntegrations_1_1 = userIntegrations_1.next(); !userIntegrations_1_1.done; userIntegrations_1_1 = userIntegrations_1.next()) {
                var userIntegration = userIntegrations_1_1.value;
                if (pickedIntegrationsNames.indexOf(getIntegrationName(userIntegration)) === -1) {
                    integrations.push(userIntegration);
                    pickedIntegrationsNames.push(getIntegrationName(userIntegration));
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (userIntegrations_1_1 && !userIntegrations_1_1.done && (_b = userIntegrations_1.return)) _b.call(userIntegrations_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    else if (typeof userIntegrations === 'function') {
        integrations = userIntegrations(defaultIntegrations);
        integrations = Array.isArray(integrations) ? integrations : [integrations];
    }
    else {
        return __spread(defaultIntegrations);
    }
    return integrations;
}
exports.getIntegrationsToSetup = getIntegrationsToSetup;
/** Setup given integration */
function setupIntegration(integration, options) {
    if (exports.installedIntegrations.indexOf(getIntegrationName(integration)) !== -1) {
        return;
    }
    try {
        integration.setupOnce();
    }
    catch (_Oo) {
        /** @deprecated */
        // TODO: Remove in v5
        logger_1.logger.warn("Integration " + getIntegrationName(integration) + ": The install method is deprecated. Use \"setupOnce\".");
        // tslint:disable:deprecation
        if (integration.install) {
            integration.install(options);
        }
        // tslint:enable:deprecation
    }
    exports.installedIntegrations.push(getIntegrationName(integration));
    logger_1.logger.log("Integration installed: " + getIntegrationName(integration));
}
exports.setupIntegration = setupIntegration;
/**
 * Given a list of integration instances this installs them all. When `withDefaults` is set to `true` then all default
 * integrations are added unless they were already provided before.
 * @param integrations array of integration instances
 * @param withDefault should enable default integrations
 */
function setupIntegrations(options) {
    var integrations = {};
    getIntegrationsToSetup(options).forEach(function (integration) {
        integrations[getIntegrationName(integration)] = integration;
        setupIntegration(integration, options);
    });
    return integrations;
}
exports.setupIntegrations = setupIntegrations;
/**
 * Returns the integration static id.
 * @param integration Integration to retrieve id
 */
function getIntegrationName(integration) {
    /**
     * @depracted
     */
    // tslint:disable-next-line:no-unsafe-any
    return integration.constructor.id || integration.name;
}
//# sourceMappingURL=integration.js.map

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var hub_1 = __webpack_require__(1);
var logger_1 = __webpack_require__(0);
var misc_1 = __webpack_require__(2);
/** Deduplication filter */
var Dedupe = /** @class */ (function () {
    function Dedupe() {
        /**
         * @inheritDoc
         */
        this.name = Dedupe.id;
    }
    /**
     * @inheritDoc
     */
    Dedupe.prototype.setupOnce = function () {
        var _this = this;
        hub_1.addGlobalEventProcessor(function (currentEvent) { return __awaiter(_this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                self = hub_1.getCurrentHub().getIntegration(Dedupe);
                if (self) {
                    // Juuust in case something goes wrong
                    try {
                        if (self.shouldDropEvent(currentEvent, self.previousEvent)) {
                            return [2 /*return*/, null];
                        }
                    }
                    catch (_oO) {
                        return [2 /*return*/, (self.previousEvent = currentEvent)];
                    }
                    return [2 /*return*/, (self.previousEvent = currentEvent)];
                }
                return [2 /*return*/, currentEvent];
            });
        }); });
    };
    /** JSDoc */
    Dedupe.prototype.shouldDropEvent = function (currentEvent, previousEvent) {
        if (!previousEvent) {
            return false;
        }
        if (this.isSameMessageEvent(currentEvent, previousEvent)) {
            logger_1.logger.warn("Event dropped due to being a duplicate of previous event (same message).\nEvent: " + misc_1.getEventDescription(currentEvent));
            return true;
        }
        if (this.isSameExceptionEvent(currentEvent, previousEvent)) {
            logger_1.logger.warn("Event dropped due to being a duplicate of previous event (same exception).\nEvent: " + misc_1.getEventDescription(currentEvent));
            return true;
        }
        return false;
    };
    /** JSDoc */
    Dedupe.prototype.isSameMessageEvent = function (currentEvent, previousEvent) {
        var currentMessage = currentEvent.message;
        var previousMessage = previousEvent.message;
        // If no event has a message, they were both exceptions, so bail out
        if (!currentMessage && !previousMessage) {
            return false;
        }
        // If only one event has a stacktrace, but not the other one, they are not the same
        if ((currentMessage && !previousMessage) || (!currentMessage && previousMessage)) {
            return false;
        }
        if (currentMessage !== previousMessage) {
            return false;
        }
        if (!this.isSameFingerprint(currentEvent, previousEvent)) {
            return false;
        }
        if (!this.isSameStacktrace(currentEvent, previousEvent)) {
            return false;
        }
        return true;
    };
    /** JSDoc */
    Dedupe.prototype.getFramesFromEvent = function (event) {
        var exception = event.exception;
        if (exception) {
            try {
                // @ts-ignore
                return exception.values[0].stacktrace.frames;
            }
            catch (_oO) {
                return undefined;
            }
        }
        else if (event.stacktrace) {
            return event.stacktrace.frames;
        }
        else {
            return undefined;
        }
    };
    /** JSDoc */
    Dedupe.prototype.isSameStacktrace = function (currentEvent, previousEvent) {
        var currentFrames = this.getFramesFromEvent(currentEvent);
        var previousFrames = this.getFramesFromEvent(previousEvent);
        // If no event has a fingerprint, they are assumed to be the same
        if (!currentFrames && !previousFrames) {
            return true;
        }
        // If only one event has a stacktrace, but not the other one, they are not the same
        if ((currentFrames && !previousFrames) || (!currentFrames && previousFrames)) {
            return false;
        }
        currentFrames = currentFrames;
        previousFrames = previousFrames;
        // If number of frames differ, they are not the same
        if (previousFrames.length !== currentFrames.length) {
            return false;
        }
        // Otherwise, compare the two
        for (var i = 0; i < previousFrames.length; i++) {
            var frameA = previousFrames[i];
            var frameB = currentFrames[i];
            if (frameA.filename !== frameB.filename ||
                frameA.lineno !== frameB.lineno ||
                frameA.colno !== frameB.colno ||
                frameA.function !== frameB.function) {
                return false;
            }
        }
        return true;
    };
    /** JSDoc */
    Dedupe.prototype.getExceptionFromEvent = function (event) {
        return event.exception && event.exception.values && event.exception.values[0];
    };
    /** JSDoc */
    Dedupe.prototype.isSameExceptionEvent = function (currentEvent, previousEvent) {
        var previousException = this.getExceptionFromEvent(previousEvent);
        var currentException = this.getExceptionFromEvent(currentEvent);
        if (!previousException || !currentException) {
            return false;
        }
        if (previousException.type !== currentException.type || previousException.value !== currentException.value) {
            return false;
        }
        if (!this.isSameFingerprint(currentEvent, previousEvent)) {
            return false;
        }
        if (!this.isSameStacktrace(currentEvent, previousEvent)) {
            return false;
        }
        return true;
    };
    /** JSDoc */
    Dedupe.prototype.isSameFingerprint = function (currentEvent, previousEvent) {
        var currentFingerprint = currentEvent.fingerprint;
        var previousFingerprint = previousEvent.fingerprint;
        // If no event has a fingerprint, they are assumed to be the same
        if (!currentFingerprint && !previousFingerprint) {
            return true;
        }
        // If only one event has a fingerprint, but not the other one, they are not the same
        if ((currentFingerprint && !previousFingerprint) || (!currentFingerprint && previousFingerprint)) {
            return false;
        }
        currentFingerprint = currentFingerprint;
        previousFingerprint = previousFingerprint;
        // Otherwise, compare the two
        try {
            return !!(currentFingerprint.join('') === previousFingerprint.join(''));
        }
        catch (_oO) {
            return false;
        }
    };
    /**
     * @inheritDoc
     */
    Dedupe.id = 'Dedupe';
    return Dedupe;
}());
exports.Dedupe = Dedupe;
//# sourceMappingURL=dedupe.js.map

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var originalFunctionToString;
/** Patch toString calls to return proper name for wrapped functions */
var FunctionToString = /** @class */ (function () {
    function FunctionToString() {
        /**
         * @inheritDoc
         */
        this.name = FunctionToString.id;
    }
    /**
     * @inheritDoc
     */
    FunctionToString.prototype.setupOnce = function () {
        originalFunctionToString = Function.prototype.toString;
        Function.prototype.toString = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var context = this.__sentry__ ? this.__sentry_original__ : this;
            // tslint:disable-next-line:no-unsafe-any
            return originalFunctionToString.apply(context, args);
        };
    };
    /**
     * @inheritDoc
     */
    FunctionToString.id = 'FunctionToString';
    return FunctionToString;
}());
exports.FunctionToString = FunctionToString;
//# sourceMappingURL=functiontostring.js.map

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var hub_1 = __webpack_require__(1);
var is_1 = __webpack_require__(3);
var logger_1 = __webpack_require__(0);
var misc_1 = __webpack_require__(2);
var string_1 = __webpack_require__(13);
// "Script error." is hard coded into browsers for errors that it can't read.
// this is the result of a script being pulled in from an external domain and CORS.
var DEFAULT_IGNORE_ERRORS = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/];
/** Inbound filters configurable by the user */
var InboundFilters = /** @class */ (function () {
    function InboundFilters(options) {
        if (options === void 0) { options = {}; }
        this.options = options;
        /**
         * @inheritDoc
         */
        this.name = InboundFilters.id;
    }
    /**
     * @inheritDoc
     */
    InboundFilters.prototype.setupOnce = function () {
        var _this = this;
        hub_1.addGlobalEventProcessor(function (event) { return __awaiter(_this, void 0, void 0, function () {
            var hub, self, client, clientOptions, options;
            return __generator(this, function (_a) {
                hub = hub_1.getCurrentHub();
                if (!hub) {
                    return [2 /*return*/, event];
                }
                self = hub.getIntegration(InboundFilters);
                if (self) {
                    client = hub.getClient();
                    clientOptions = client ? client.getOptions() : {};
                    options = self.mergeOptions(clientOptions);
                    if (self.shouldDropEvent(event, options)) {
                        return [2 /*return*/, null];
                    }
                }
                return [2 /*return*/, event];
            });
        }); });
    };
    /** JSDoc */
    InboundFilters.prototype.shouldDropEvent = function (event, options) {
        if (this.isIgnoredError(event, options)) {
            logger_1.logger.warn("Event dropped due to being matched by `ignoreErrors` option.\nEvent: " + misc_1.getEventDescription(event));
            return true;
        }
        if (this.isBlacklistedUrl(event, options)) {
            logger_1.logger.warn("Event dropped due to being matched by `blacklistUrls` option.\nEvent: " + misc_1.getEventDescription(event) + ".\nUrl: " + this.getEventFilterUrl(event));
            return true;
        }
        if (!this.isWhitelistedUrl(event, options)) {
            logger_1.logger.warn("Event dropped due to not being matched by `whitelistUrls` option.\nEvent: " + misc_1.getEventDescription(event) + ".\nUrl: " + this.getEventFilterUrl(event));
            return true;
        }
        return false;
    };
    /** JSDoc */
    InboundFilters.prototype.isIgnoredError = function (event, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        if (!options.ignoreErrors || !options.ignoreErrors.length) {
            return false;
        }
        return this.getPossibleEventMessages(event).some(function (message) {
            // Not sure why TypeScript complains here...
            return options.ignoreErrors.some(function (pattern) { return _this.isMatchingPattern(message, pattern); });
        });
    };
    /** JSDoc */
    InboundFilters.prototype.isBlacklistedUrl = function (event, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        // TODO: Use Glob instead?
        if (!options.blacklistUrls || !options.blacklistUrls.length) {
            return false;
        }
        var url = this.getEventFilterUrl(event);
        return !url ? false : options.blacklistUrls.some(function (pattern) { return _this.isMatchingPattern(url, pattern); });
    };
    /** JSDoc */
    InboundFilters.prototype.isWhitelistedUrl = function (event, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        // TODO: Use Glob instead?
        if (!options.whitelistUrls || !options.whitelistUrls.length) {
            return true;
        }
        var url = this.getEventFilterUrl(event);
        return !url ? true : options.whitelistUrls.some(function (pattern) { return _this.isMatchingPattern(url, pattern); });
    };
    /** JSDoc */
    InboundFilters.prototype.mergeOptions = function (clientOptions) {
        if (clientOptions === void 0) { clientOptions = {}; }
        return {
            blacklistUrls: __spread((this.options.blacklistUrls || []), (clientOptions.blacklistUrls || [])),
            ignoreErrors: __spread((this.options.ignoreErrors || []), (clientOptions.ignoreErrors || []), DEFAULT_IGNORE_ERRORS),
            whitelistUrls: __spread((this.options.whitelistUrls || []), (clientOptions.whitelistUrls || [])),
        };
    };
    /** JSDoc */
    InboundFilters.prototype.isMatchingPattern = function (value, pattern) {
        if (is_1.isRegExp(pattern)) {
            return pattern.test(value);
        }
        else if (typeof pattern === 'string') {
            return string_1.includes(value, pattern);
        }
        else {
            return false;
        }
    };
    /** JSDoc */
    InboundFilters.prototype.getPossibleEventMessages = function (event) {
        if (event.message) {
            return [event.message];
        }
        else if (event.exception) {
            try {
                // tslint:disable-next-line:no-unsafe-any
                var _a = event.exception.values[0], type = _a.type, value = _a.value;
                return ["" + value, type + ": " + value];
            }
            catch (oO) {
                logger_1.logger.error("Cannot extract message for event " + misc_1.getEventDescription(event));
                return [];
            }
        }
        else {
            return [];
        }
    };
    /** JSDoc */
    InboundFilters.prototype.getEventFilterUrl = function (event) {
        try {
            if (event.stacktrace) {
                // tslint:disable-next-line:no-unsafe-any
                return event.stacktrace.frames[0].filename;
            }
            else if (event.exception) {
                // tslint:disable-next-line:no-unsafe-any
                return event.exception.values[0].stacktrace.frames[0].filename;
            }
            else {
                return null;
            }
        }
        catch (oO) {
            logger_1.logger.error("Cannot extract url for event " + misc_1.getEventDescription(event));
            return null;
        }
    };
    /**
     * @inheritDoc
     */
    InboundFilters.id = 'InboundFilters';
    return InboundFilters;
}());
exports.InboundFilters = InboundFilters;
//# sourceMappingURL=inboundfilters.js.map

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dedupe_1 = __webpack_require__(30);
exports.Dedupe = dedupe_1.Dedupe;
var functiontostring_1 = __webpack_require__(31);
exports.FunctionToString = functiontostring_1.FunctionToString;
var sdkinformation_1 = __webpack_require__(36);
exports.SDKInformation = sdkinformation_1.SDKInformation;
var inboundfilters_1 = __webpack_require__(32);
exports.InboundFilters = inboundfilters_1.InboundFilters;
var debug_1 = __webpack_require__(34);
exports.Debug = debug_1.Debug;
var rewriteframes_1 = __webpack_require__(35);
exports.RewriteFrames = rewriteframes_1.RewriteFrames;
//# sourceMappingURL=index.js.map

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var hub_1 = __webpack_require__(1);
/** JSDoc */
var Debug = /** @class */ (function () {
    /**
     * @inheritDoc
     */
    function Debug(options) {
        /**
         * @inheritDoc
         */
        this.name = Debug.id;
        this.options = __assign({ debugger: false, stringify: false }, options);
    }
    /**
     * @inheritDoc
     */
    Debug.prototype.setupOnce = function () {
        var _this = this;
        hub_1.addGlobalEventProcessor(function (event, hint) { return __awaiter(_this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                self = hub_1.getCurrentHub().getIntegration(Debug);
                if (self) {
                    // tslint:disable:no-console
                    // tslint:disable:no-debugger
                    if (self.options.debugger) {
                        debugger;
                    }
                    if (self.options.stringify) {
                        console.log(JSON.stringify(event, null, 2));
                        if (hint) {
                            console.log(JSON.stringify(hint, null, 2));
                        }
                    }
                    else {
                        console.log(event);
                        if (hint) {
                            console.log(hint);
                        }
                    }
                }
                return [2 /*return*/, event];
            });
        }); });
    };
    /**
     * @inheritDoc
     */
    Debug.id = 'Debug';
    return Debug;
}());
exports.Debug = Debug;
//# sourceMappingURL=debug.js.map

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var hub_1 = __webpack_require__(1);
var path_1 = __webpack_require__(43);
/** Rewrite event frames paths */
var RewriteFrames = /** @class */ (function () {
    /**
     * @inheritDoc
     */
    function RewriteFrames(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        /**
         * @inheritDoc
         */
        this.name = RewriteFrames.id;
        /**
         * @inheritDoc
         */
        this.iteratee = function (frame) { return __awaiter(_this, void 0, void 0, function () {
            var base;
            return __generator(this, function (_a) {
                if (frame.filename && frame.filename.startsWith('/')) {
                    base = this.root ? path_1.relative(this.root, frame.filename) : path_1.basename(frame.filename);
                    frame.filename = "app:///" + base;
                }
                return [2 /*return*/, frame];
            });
        }); };
        if (options.root) {
            this.root = options.root;
        }
        if (options.iteratee) {
            this.iteratee = options.iteratee;
        }
    }
    /**
     * @inheritDoc
     */
    RewriteFrames.prototype.setupOnce = function () {
        var _this = this;
        hub_1.addGlobalEventProcessor(function (event) { return __awaiter(_this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                self = hub_1.getCurrentHub().getIntegration(RewriteFrames);
                if (self) {
                    return [2 /*return*/, self.process(event)];
                }
                return [2 /*return*/, event];
            });
        }); });
    };
    /** JSDoc */
    RewriteFrames.prototype.process = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var frames, _a, _b, _i, i, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        frames = this.getFramesFromEvent(event);
                        if (!frames) return [3 /*break*/, 4];
                        _a = [];
                        for (_b in frames)
                            _a.push(_b);
                        _i = 0;
                        _e.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        i = _a[_i];
                        // tslint:disable-next-line
                        _c = frames;
                        _d = i;
                        return [4 /*yield*/, this.iteratee(frames[i])];
                    case 2:
                        // tslint:disable-next-line
                        _c[_d] = _e.sent();
                        _e.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, event];
                }
            });
        });
    };
    /** JSDoc */
    RewriteFrames.prototype.getFramesFromEvent = function (event) {
        var exception = event.exception;
        if (exception) {
            try {
                // tslint:disable-next-line:no-unsafe-any
                return exception.values[0].stacktrace.frames;
            }
            catch (_oO) {
                return undefined;
            }
        }
        else if (event.stacktrace) {
            return event.stacktrace.frames;
        }
        else {
            return undefined;
        }
    };
    /**
     * @inheritDoc
     */
    RewriteFrames.id = 'RewriteFrames';
    return RewriteFrames;
}());
exports.RewriteFrames = RewriteFrames;
//# sourceMappingURL=rewriteframes.js.map

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __webpack_require__(0);
/**
 * @deprecated
 * This file can be safely removed in the next major bump
 */
/** Adds SDK info to an event. */
var SDKInformation = /** @class */ (function () {
    function SDKInformation() {
        /**
         * @inheritDoc
         */
        this.name = 'SDKInformation';
    }
    /**
     * @inheritDoc
     */
    SDKInformation.prototype.setupOnce = function () {
        logger_1.logger.warn("SDKInformation Integration is deprecated and can be safely removed. It's functionality has been merged into the SDK's core.");
    };
    return SDKInformation;
}());
exports.SDKInformation = SDKInformation;
//# sourceMappingURL=sdkinformation.js.map

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** Console logging verbosity for the SDK. */
var LogLevel;
(function (LogLevel) {
    /** No logs will be generated. */
    LogLevel[LogLevel["None"] = 0] = "None";
    /** Only SDK internal errors will be logged. */
    LogLevel[LogLevel["Error"] = 1] = "Error";
    /** Information useful for debugging the SDK will be logged. */
    LogLevel[LogLevel["Debug"] = 2] = "Debug";
    /** All SDK actions will be logged. */
    LogLevel[LogLevel["Verbose"] = 3] = "Verbose";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
//# sourceMappingURL=interfaces.js.map

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hub_1 = __webpack_require__(1);
var logger_1 = __webpack_require__(0);
/**
 * Internal function to create a new SDK client instance. The client is
 * installed and then bound to the current scope.
 *
 * @param clientClass The client class to instanciate.
 * @param options Options to pass to the client.
 * @returns The installed and bound client instance.
 */
function initAndBind(clientClass, options) {
    if (options.debug === true) {
        logger_1.logger.enable();
    }
    if (hub_1.getCurrentHub().getClient()) {
        return;
    }
    var client = new clientClass(options);
    hub_1.getCurrentHub().bindClient(client);
    client.install();
}
exports.initAndBind = initAndBind;
//# sourceMappingURL=sdk.js.map

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __webpack_require__(0);
var misc_1 = __webpack_require__(2);
var scope_1 = __webpack_require__(12);
/**
 * API compatibility version of this hub.
 *
 * WARNING: This number should only be incresed when the global interface
 * changes a and new methods are introduced.
 */
exports.API_VERSION = 3;
/**
 * Internal class used to make sure we always have the latest internal functions
 * working in case we have a version conflict.
 */
var Hub = /** @class */ (function () {
    /**
     * Creates a new instance of the hub, will push one {@link Layer} into the
     * internal stack on creation.
     *
     * @param client bound to the hub.
     * @param scope bound to the hub.
     * @param version number, higher number means higher priority.
     */
    function Hub(client, scope, version) {
        if (scope === void 0) { scope = new scope_1.Scope(); }
        if (version === void 0) { version = exports.API_VERSION; }
        this.version = version;
        /** Is a {@link Layer}[] containing the client and scope */
        this.stack = [];
        this.stack.push({ client: client, scope: scope });
    }
    /**
     * Internal helper function to call a method on the top client if it exists.
     *
     * @param method The method to call on the client/client.
     * @param args Arguments to pass to the client/frontend.
     */
    Hub.prototype.invokeClient = function (method) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _a;
        var top = this.getStackTop();
        if (top && top.client && top.client[method]) {
            (_a = top.client)[method].apply(_a, __spread(args, [top.scope]));
        }
    };
    /**
     * Internal helper function to call an async method on the top client if it
     * exists.
     *
     * @param method The method to call on the client/client.
     * @param args Arguments to pass to the client/frontend.
     */
    Hub.prototype.invokeClientAsync = function (method) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _a;
        var top = this.getStackTop();
        if (top && top.client && top.client[method]) {
            (_a = top.client)[method].apply(_a, __spread(args, [top.scope])).catch(function (err) {
                logger_1.logger.error(err);
            });
        }
    };
    /**
     * Checks if this hub's version is older than the given version.
     *
     * @param version A version number to compare to.
     * @return True if the given version is newer; otherwise false.
     */
    Hub.prototype.isOlderThan = function (version) {
        return this.version < version;
    };
    /**
     * This binds the given client to the current scope.
     * @param client An SDK client (client) instance.
     */
    Hub.prototype.bindClient = function (client) {
        var top = this.getStackTop();
        top.client = client;
        if (top && top.scope && client) {
            top.scope.addScopeListener(function (s) {
                if (client.getBackend) {
                    try {
                        client.getBackend().storeScope(s);
                    }
                    catch (_a) {
                        // Do nothing
                    }
                }
            });
        }
    };
    /**
     * Create a new scope to store context information.
     *
     * The scope will be layered on top of the current one. It is isolated, i.e. all
     * breadcrumbs and context information added to this scope will be removed once
     * the scope ends. Be sure to always remove this scope with {@link this.popScope}
     * when the operation finishes or throws.
     *
     * @returns Scope, the new cloned scope
     */
    Hub.prototype.pushScope = function () {
        // We want to clone the content of prev scope
        var stack = this.getStack();
        var parentScope = stack.length > 0 ? stack[stack.length - 1].scope : undefined;
        var scope = scope_1.Scope.clone(parentScope);
        this.getStack().push({
            client: this.getClient(),
            scope: scope,
        });
        return scope;
    };
    /**
     * Removes a previously pushed scope from the stack.
     *
     * This restores the state before the scope was pushed. All breadcrumbs and
     * context information added since the last call to {@link this.pushScope} are
     * discarded.
     */
    Hub.prototype.popScope = function () {
        return this.getStack().pop() !== undefined;
    };
    /**
     * Creates a new scope with and executes the given operation within.
     * The scope is automatically removed once the operation
     * finishes or throws.
     *
     * This is essentially a convenience function for:
     *
     *     pushScope();
     *     callback();
     *     popScope();
     *
     * @param callback that will be enclosed into push/popScope.
     */
    Hub.prototype.withScope = function (callback) {
        var scope = this.pushScope();
        try {
            callback(scope);
        }
        finally {
            this.popScope();
        }
    };
    /** Returns the client of the top stack. */
    Hub.prototype.getClient = function () {
        return this.getStackTop().client;
    };
    /** Returns the scope of the top stack. */
    Hub.prototype.getScope = function () {
        return this.getStackTop().scope;
    };
    /** Returns the scope stack for domains or the process. */
    Hub.prototype.getStack = function () {
        return this.stack;
    };
    /** Returns the topmost scope layer in the order domain > local > process. */
    Hub.prototype.getStackTop = function () {
        return this.stack[this.stack.length - 1];
    };
    /**
     * Captures an exception event and sends it to Sentry.
     *
     * @param exception An exception-like object.
     * @param hint May contain additional information about the original exception.
     * @returns The generated eventId.
     */
    Hub.prototype.captureException = function (exception, hint) {
        var eventId = (this._lastEventId = misc_1.uuid4());
        this.invokeClientAsync('captureException', exception, __assign({}, hint, { event_id: eventId }));
        return eventId;
    };
    /**
     * Captures a message event and sends it to Sentry.
     *
     * @param message The message to send to Sentry.
     * @param level Define the level of the message.
     * @param hint May contain additional information about the original exception.
     * @returns The generated eventId.
     */
    Hub.prototype.captureMessage = function (message, level, hint) {
        var eventId = (this._lastEventId = misc_1.uuid4());
        this.invokeClientAsync('captureMessage', message, level, __assign({}, hint, { event_id: eventId }));
        return eventId;
    };
    /**
     * Captures a manually created event and sends it to Sentry.
     *
     * @param event The event to send to Sentry.
     * @param hint May contain additional information about the original exception.
     */
    Hub.prototype.captureEvent = function (event, hint) {
        var eventId = (this._lastEventId = misc_1.uuid4());
        this.invokeClientAsync('captureEvent', event, __assign({}, hint, { event_id: eventId }));
        return eventId;
    };
    /**
     * This is the getter for lastEventId.
     *
     * @returns The last event id of a captured event.
     */
    Hub.prototype.lastEventId = function () {
        return this._lastEventId;
    };
    /**
     * Records a new breadcrumb which will be attached to future events.
     *
     * Breadcrumbs will be added to subsequent events to provide more context on
     * user's actions prior to an error or crash.
     *
     * @param breadcrumb The breadcrumb to record.
     * @param hint May contain additional information about the original breadcrumb.
     */
    Hub.prototype.addBreadcrumb = function (breadcrumb, hint) {
        this.invokeClient('addBreadcrumb', breadcrumb, __assign({}, hint));
    };
    /**
     * Callback to set context information onto the scope.
     *
     * @param callback Callback function that receives Scope.
     */
    Hub.prototype.configureScope = function (callback) {
        var top = this.getStackTop();
        if (top.scope && top.client) {
            // TODO: freeze flag
            callback(top.scope);
        }
    };
    /**
     * For the duraction of the callback, this hub will be set as the global current Hub.
     * This function is useful if you want to run your own client and hook into an already initialized one
     * e.g.: Reporting issues to your own sentry when running in your component while still using the users configuration.
     */
    Hub.prototype.run = function (callback) {
        var oldHub = makeMain(this);
        try {
            callback(this);
        }
        finally {
            makeMain(oldHub);
        }
    };
    /** Returns the integration if installed on the current client. */
    Hub.prototype.getIntegration = function (integration) {
        try {
            return this.getClient().getIntegration(integration);
        }
        catch (_oO) {
            logger_1.logger.warn("Cannot retrieve integration " + integration.id + " from the current Hub");
            return null;
        }
    };
    return Hub;
}());
exports.Hub = Hub;
/** Returns the global shim registry. */
function getMainCarrier() {
    var carrier = misc_1.getGlobalObject();
    carrier.__SENTRY__ = carrier.__SENTRY__ || {
        hub: undefined,
    };
    return carrier;
}
exports.getMainCarrier = getMainCarrier;
/**
 * Replaces the current main hub with the passed one on the global object
 *
 * @returns The old replaced hub
 */
function makeMain(hub) {
    var registry = getMainCarrier();
    var oldHub = getHubFromCarrier(registry);
    setHubOnCarrier(registry, hub);
    return oldHub;
}
exports.makeMain = makeMain;
/**
 * Returns the default hub instance.
 *
 * If a hub is already registered in the global carrier but this module
 * contains a more recent version, it replaces the registered version.
 * Otherwise, the currently registered hub will be returned.
 */
function getCurrentHub() {
    // Get main carrier (global for every environment)
    var registry = getMainCarrier();
    // If there's no hub, or its an old API, assign a new one
    if (!hasHubOnCarrier(registry) || getHubFromCarrier(registry).isOlderThan(exports.API_VERSION)) {
        setHubOnCarrier(registry, new Hub());
    }
    // Prefer domains over global if they are there
    try {
        // We need to use `dynamicRequire` because `require` on it's own will be optimized by webpack.
        // We do not want this to happen, we need to try to `require` the domain node module and fail if we are in browser
        // for example so we do not have to shim it and use `getCurrentHub` universally.
        var domain = misc_1.dynamicRequire(module, 'domain');
        var activeDomain = domain.active;
        // If there no active domain, just return global hub
        if (!activeDomain) {
            return getHubFromCarrier(registry);
        }
        // If there's no hub on current domain, or its an old API, assign a new one
        if (!hasHubOnCarrier(activeDomain) || getHubFromCarrier(activeDomain).isOlderThan(exports.API_VERSION)) {
            var registryHubTopStack = getHubFromCarrier(registry).getStackTop();
            setHubOnCarrier(activeDomain, new Hub(registryHubTopStack.client, scope_1.Scope.clone(registryHubTopStack.scope)));
        }
        // Return hub that lives on a domain
        return getHubFromCarrier(activeDomain);
    }
    catch (_Oo) {
        // Return hub that lives on a global object
        return getHubFromCarrier(registry);
    }
}
exports.getCurrentHub = getCurrentHub;
/**
 * This will tell whether a carrier has a hub on it or not
 * @param carrier object
 */
function hasHubOnCarrier(carrier) {
    if (carrier && carrier.__SENTRY__ && carrier.__SENTRY__.hub) {
        return true;
    }
    else {
        return false;
    }
}
exports.hasHubOnCarrier = hasHubOnCarrier;
/**
 * This will create a new {@link Hub} and add to the passed object on
 * __SENTRY__.hub.
 * @param carrier object
 */
function getHubFromCarrier(carrier) {
    if (carrier && carrier.__SENTRY__ && carrier.__SENTRY__.hub) {
        return carrier.__SENTRY__.hub;
    }
    else {
        carrier.__SENTRY__ = {};
        carrier.__SENTRY__.hub = new Hub();
        return carrier.__SENTRY__.hub;
    }
}
exports.getHubFromCarrier = getHubFromCarrier;
/**
 * This will set passed {@link Hub} on the passed object's __SENTRY__.hub attribute
 * @param carrier object
 * @param hub Hub
 */
function setHubOnCarrier(carrier, hub) {
    if (!carrier) {
        return false;
    }
    carrier.__SENTRY__ = carrier.__SENTRY__ || {};
    carrier.__SENTRY__.hub = hub;
    return true;
}
exports.setHubOnCarrier = setHubOnCarrier;
//# sourceMappingURL=hub.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(48)(module)))

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var hub_1 = __webpack_require__(1);
/**
 * This calls a function on the current hub.
 * @param method function to call on hub.
 * @param args to pass to function.
 */
function callOnHub(method) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var hub = hub_1.getCurrentHub();
    if (hub && hub[method]) {
        // tslint:disable-next-line:no-unsafe-any
        return hub[method].apply(hub, __spread(args));
    }
    throw new Error("No hub defined or " + method + " was not found on the hub, please open a bug report.");
}
/**
 * Captures an exception event and sends it to Sentry.
 *
 * @param exception An exception-like object.
 * @returns The generated eventId.
 */
function captureException(exception) {
    var syntheticException;
    try {
        throw new Error('Sentry syntheticException');
    }
    catch (exception) {
        syntheticException = exception;
    }
    return callOnHub('captureException', exception, {
        originalException: exception,
        syntheticException: syntheticException,
    });
}
exports.captureException = captureException;
/**
 * Captures a message event and sends it to Sentry.
 *
 * @param message The message to send to Sentry.
 * @param level Define the level of the message.
 * @returns The generated eventId.
 */
function captureMessage(message, level) {
    var syntheticException;
    try {
        throw new Error(message);
    }
    catch (exception) {
        syntheticException = exception;
    }
    return callOnHub('captureMessage', message, level, {
        originalException: message,
        syntheticException: syntheticException,
    });
}
exports.captureMessage = captureMessage;
/**
 * Captures a manually created event and sends it to Sentry.
 *
 * @param event The event to send to Sentry.
 * @returns The generated eventId.
 */
function captureEvent(event) {
    return callOnHub('captureEvent', event);
}
exports.captureEvent = captureEvent;
/**
 * Records a new breadcrumb which will be attached to future events.
 *
 * Breadcrumbs will be added to subsequent events to provide more context on
 * user's actions prior to an error or crash.
 *
 * @param breadcrumb The breadcrumb to record.
 */
function addBreadcrumb(breadcrumb) {
    callOnHub('addBreadcrumb', breadcrumb);
}
exports.addBreadcrumb = addBreadcrumb;
/**
 * Callback to set context information onto the scope.
 * @param callback Callback function that receives Scope.
 */
function configureScope(callback) {
    callOnHub('configureScope', callback);
}
exports.configureScope = configureScope;
/**
 * Creates a new scope with and executes the given operation within.
 * The scope is automatically removed once the operation
 * finishes or throws.
 *
 * This is essentially a convenience function for:
 *
 *     pushScope();
 *     callback();
 *     popScope();
 *
 * @param callback that will be enclosed into push/popScope.
 */
function withScope(callback) {
    callOnHub('withScope', callback);
}
exports.withScope = withScope;
/**
 * Calls a function on the latest client. Use this with caution, it's meant as
 * in "internal" helper so we don't need to expose every possible function in
 * the shim. It is not guaranteed that the client actually implements the
 * function.
 *
 * @param method The method to call on the client/client.
 * @param args Arguments to pass to the client/fontend.
 */
function _callOnClient(method) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    callOnHub.apply(void 0, __spread(['invokeClient', method], args));
}
exports._callOnClient = _callOnClient;
//# sourceMappingURL=index.js.map

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** JSDoc */
var Severity;
(function (Severity) {
    /** JSDoc */
    Severity["Fatal"] = "fatal";
    /** JSDoc */
    Severity["Error"] = "error";
    /** JSDoc */
    Severity["Warning"] = "warning";
    /** JSDoc */
    Severity["Log"] = "log";
    /** JSDoc */
    Severity["Info"] = "info";
    /** JSDoc */
    Severity["Debug"] = "debug";
    /** JSDoc */
    Severity["Critical"] = "critical";
})(Severity = exports.Severity || (exports.Severity = {}));
// tslint:disable:no-unnecessary-qualifier no-namespace
(function (Severity) {
    /**
     * Converts a string-based level into a {@link Severity}.
     *
     * @param level string representation of Severity
     * @returns Severity
     */
    function fromString(level) {
        switch (level) {
            case 'debug':
                return Severity.Debug;
            case 'info':
                return Severity.Info;
            case 'warn':
            case 'warning':
                return Severity.Warning;
            case 'error':
                return Severity.Error;
            case 'fatal':
                return Severity.Fatal;
            case 'critical':
                return Severity.Critical;
            case 'log':
            default:
                return Severity.Log;
        }
    }
    Severity.fromString = fromString;
})(Severity = exports.Severity || (exports.Severity = {}));
/** The status of an event. */
var Status;
(function (Status) {
    /** The status could not be determined. */
    Status["Unknown"] = "unknown";
    /** The event was skipped due to configuration or callbacks. */
    Status["Skipped"] = "skipped";
    /** The event was sent to Sentry successfully. */
    Status["Success"] = "success";
    /** The client is currently rate limited and will try again later. */
    Status["RateLimit"] = "rate_limit";
    /** The event could not be processed. */
    Status["Invalid"] = "invalid";
    /** A server-side error ocurred during submission. */
    Status["Failed"] = "failed";
})(Status = exports.Status || (exports.Status = {}));
// tslint:disable:no-unnecessary-qualifier no-namespace
(function (Status) {
    /**
     * Converts a HTTP status code into a {@link Status}.
     *
     * @param code The HTTP response status code.
     * @returns The send status or {@link Status.Unknown}.
     */
    function fromHttpCode(code) {
        if (code >= 200 && code < 300) {
            return Status.Success;
        }
        if (code === 429) {
            return Status.RateLimit;
        }
        if (code >= 400 && code < 500) {
            return Status.Invalid;
        }
        if (code >= 500) {
            return Status.Failed;
        }
        return Status.Unknown;
    }
    Status.fromHttpCode = fromHttpCode;
})(Status = exports.Status || (exports.Status = {}));
//# sourceMappingURL=index.js.map

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Consumes the promise and logs the error when it rejects.
 * @param promise A promise to forget.
 */
function forget(promise) {
    promise.catch(function (e) {
        // TODO: Use a better logging mechanism
        console.error(e);
    });
}
exports.forget = forget;
/**
 * Helper to filter an array with asynchronous callbacks.
 *
 * @param array An array containing items to filter.
 * @param predicate An async predicate evaluated on every item.
 * @param thisArg Optional value passed as "this" into the callback.
 * @returns An array containing only values where the callback returned true.
 */
function filterAsync(array, predicate, thisArg) {
    return __awaiter(this, void 0, void 0, function () {
        var verdicts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all(array.map(predicate, thisArg))];
                case 1:
                    verdicts = _a.sent();
                    return [2 /*return*/, array.filter(function (_, index) { return verdicts[index]; })];
            }
        });
    });
}
exports.filterAsync = filterAsync;
//# sourceMappingURL=async.js.map

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Slightly modified (no IE8 support, ES6) and transcribed to TypeScript
// https://raw.githubusercontent.com/calvinmetcalf/rollup-plugin-node-builtins/master/src/es6/path.js
Object.defineProperty(exports, "__esModule", { value: true });
/** JSDoc */
function normalizeArray(parts, allowAboveRoot) {
    // if the path tries to go above the root, `up` ends up > 0
    var up = 0;
    for (var i = parts.length - 1; i >= 0; i--) {
        var last = parts[i];
        if (last === '.') {
            parts.splice(i, 1);
        }
        else if (last === '..') {
            parts.splice(i, 1);
            up++;
        }
        else if (up) {
            parts.splice(i, 1);
            up--;
        }
    }
    // if the path is allowed to go above the root, restore leading ..s
    if (allowAboveRoot) {
        for (; up--; up) {
            parts.unshift('..');
        }
    }
    return parts;
}
// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
/** JSDoc */
function splitPath(filename) {
    var parts = splitPathRe.exec(filename);
    return parts ? parts.slice(1) : [];
}
// path.resolve([from ...], to)
// posix version
/** JSDoc */
function resolve() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var resolvedPath = '';
    var resolvedAbsolute = false;
    for (var i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        var path = i >= 0 ? args[i] : '/';
        // Skip empty entries
        if (!path) {
            continue;
        }
        resolvedPath = path + "/" + resolvedPath;
        resolvedAbsolute = path.charAt(0) === '/';
    }
    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)
    // Normalize the path
    resolvedPath = normalizeArray(resolvedPath.split('/').filter(function (p) { return !!p; }), !resolvedAbsolute).join('/');
    return (resolvedAbsolute ? '/' : '') + resolvedPath || '.';
}
exports.resolve = resolve;
/** JSDoc */
function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
        if (arr[start] !== '') {
            break;
        }
    }
    var end = arr.length - 1;
    for (; end >= 0; end--) {
        if (arr[end] !== '') {
            break;
        }
    }
    if (start > end) {
        return [];
    }
    return arr.slice(start, end - start + 1);
}
// path.relative(from, to)
// posix version
/** JSDoc */
function relative(from, to) {
    // tslint:disable:no-parameter-reassignment
    from = resolve(from).substr(1);
    to = resolve(to).substr(1);
    var fromParts = trim(from.split('/'));
    var toParts = trim(to.split('/'));
    var length = Math.min(fromParts.length, toParts.length);
    var samePartsLength = length;
    for (var i = 0; i < length; i++) {
        if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
        }
    }
    var outputParts = [];
    for (var i = samePartsLength; i < fromParts.length; i++) {
        outputParts.push('..');
    }
    outputParts = outputParts.concat(toParts.slice(samePartsLength));
    return outputParts.join('/');
}
exports.relative = relative;
// path.normalize(path)
// posix version
/** JSDoc */
function normalize(path) {
    var isPathAbsolute = isAbsolute(path);
    var trailingSlash = path.substr(-1) === '/';
    // Normalize the path
    var normalizedPath = normalizeArray(path.split('/').filter(function (p) { return !!p; }), !isPathAbsolute).join('/');
    if (!normalizedPath && !isPathAbsolute) {
        normalizedPath = '.';
    }
    if (normalizedPath && trailingSlash) {
        normalizedPath += '/';
    }
    return (isPathAbsolute ? '/' : '') + normalizedPath;
}
exports.normalize = normalize;
// posix version
/** JSDoc */
function isAbsolute(path) {
    return path.charAt(0) === '/';
}
exports.isAbsolute = isAbsolute;
// posix version
/** JSDoc */
function join() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return normalize(args.join('/'));
}
exports.join = join;
/** JSDoc */
function dirname(path) {
    var result = splitPath(path);
    var root = result[0];
    var dir = result[1];
    if (!root && !dir) {
        // No dirname whatsoever
        return '.';
    }
    if (dir) {
        // It has a dirname, strip trailing slash
        dir = dir.substr(0, dir.length - 1);
    }
    return root + dir;
}
exports.dirname = dirname;
/** JSDoc */
function basename(path, ext) {
    var f = splitPath(path)[2];
    if (ext && f.substr(ext.length * -1) === ext) {
        f = f.substr(0, f.length - ext.length);
    }
    return f;
}
exports.basename = basename;
//# sourceMappingURL=path.js.map

/***/ }),
/* 44 */
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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jQueryExtend = __webpack_require__(21);

var _jQueryExtend2 = _interopRequireDefault(_jQueryExtend);

var _sprintf = __webpack_require__(23);

var _sprintf2 = _interopRequireDefault(_sprintf);

var _Application = __webpack_require__(8);

var _Application2 = _interopRequireDefault(_Application);

var _View = __webpack_require__(10);

var _View2 = _interopRequireDefault(_View);

var _EditView = __webpack_require__(19);

var _EditView2 = _interopRequireDefault(_EditView);

var _DateHelper = __webpack_require__(18);

var _DateHelper2 = _interopRequireDefault(_DateHelper);

var _removeDiacritics = __webpack_require__(22);

var _removeDiacritics2 = _interopRequireDefault(_removeDiacritics);

var _Router = __webpack_require__(20);

var _Router2 = _interopRequireDefault(_Router);

var _BrowserDetect = __webpack_require__(9);

var _BrowserDetect2 = _interopRequireDefault(_BrowserDetect);

var _AsyncTask = __webpack_require__(17);

var _AsyncTask2 = _interopRequireDefault(_AsyncTask);

var _FetchService = __webpack_require__(4);

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
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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

/* harmony default export */ __webpack_exports__["default"] = (ExtendableError);


/***/ }),
/* 47 */
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
/* 48 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })
/******/ ]);