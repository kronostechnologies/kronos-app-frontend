/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Autocompleter = __webpack_require__(1);

	var _Autocompleter2 = _interopRequireDefault(_Autocompleter);

	var _sprintf = __webpack_require__(2);

	var _sprintf2 = _interopRequireDefault(_sprintf);

	var _DateHelper = __webpack_require__(3);

	var _DateHelper2 = _interopRequireDefault(_DateHelper);

	var _jQueryExtend = __webpack_require__(4);

	var _jQueryExtend2 = _interopRequireDefault(_jQueryExtend);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.BaseApplication = __webpack_require__(5);
	window.View = __webpack_require__(7);
	window.EditView = __webpack_require__(8);


	// App initialization
	var app = new BaseApplication();
	app.lang = "fr";
	app.autocompleter = _Autocompleter2.default;
	app.sprintf = _sprintf2.default;
	app.date = new _DateHelper2.default();

	// jQuery extension
	jQuery.extend({ app: app });
	jQuery.fn.extend(_jQueryExtend2.default);

	// Date extension // TODO: remove if possible
	Date.prototype.getDayOfYear = function () {
		var onejan = new Date(this.getFullYear(), 0, 1);
		return Math.ceil((this - onejan) / 86400000);
	};

	Date.prototype.getDaysInYear = function () {
		var firstdate = new Date(this.getFullYear(), 0, 1);
		var lastdate = new Date(this.getFullYear(), 11, 31);
		return Math.ceil((lastdate - firstdate) / 86400000 + 1);
	};

	// Date extension // TODO: remove if possible
	String.prototype.htmlEntity = function () {
		return $.app.htmlEntity(this.toString());
	};

	String.prototype.nl2br = function () {
		return this.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br />$2');
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Autocompleter = function () {
		function Autocompleter(selector, view, command, callback, config) {
			_classCallCheck(this, Autocompleter);

			var self = this;
			this.view = view;
			this.callback = callback;
			this._filters = [];

			if (command.constructor === Object) {
				this.command = command.command;
				this.handler = command.handler;
				this.action = command.action;
			} else {
				this.command = command;
			}

			if (config.width) {
				this.width = config.width;
			} else {
				this.width = 300;
			}

			if (typeof config.matchContains == 'boolean') {
				this.matchContains = config.matchContains;
			} else {
				this.matchContains = false;
			}

			if (config.listSize) {
				this.listSize = parseInt(config.listSize, 10);
			} else {
				this.listSize = 10;
			}

			if (config.minChars) {
				this.minChars = parseInt(config.minChars, 10);
			} else {
				this.minChars = 2;
			}

			if (typeof config.showAll == 'boolean') {
				this.showAll = config.showAll;
			} else {
				this.showAll = false;
			}

			if (typeof config.showDescription == 'boolean') {
				this.showDescription = config.showDescription;
			} else {
				this.showDescription = false;
			}

			if (typeof config.highlight == 'boolean') {
				this._doHighlight = config.highlight;
			} else {
				this._doHighlight = false;
			}

			if (typeof config.customHighlight == 'function') {
				this._customHighlight = config.customHighLight;
			} else {
				this._customHighlight = false;
			}

			if (typeof config.itemFormat == 'function') {
				this._customItemFormat = config.itemFormat;
			} else {
				this._customItemFormat = false;
			}

			if (typeof config.descriptionFormat == 'function') {
				this._customDescriptionFormat = config.descriptionFormat;
			} else {
				this._customDescriptionFormat = false;
			}

			if (typeof config.parse == 'function') {
				this.parse = config.parse;
			}

			if (typeof config.query_string_param_name == 'string' && $.trim(config.query_string_param_name) !== '') {
				this.queryStringParamName = config.query_string_param_name;
			}

			if (config.params) {
				this.params = config.params;
			} else {
				this.params = {};
			}

			if (typeof config.selectorIsDomRef == 'boolean') {
				this.selectorIsDomRef = config.selectorIsDomRef;
			} else {
				this.selectorIsDomRef = false;
			}

			if (!this.selectorIsDomRef) {
				this.$selector = $(selector);
			} else {
				this.$selector = selector;
			}

			this.$selector.autocomplete('index.php', this._getAutocompleteOptions()).bind('result', function (event, data, label) {
				self._result(event, data, label);
			});
		}

		_createClass(Autocompleter, [{
			key: '_getAutocompleteOptions',
			value: function _getAutocompleteOptions() {
				var self = this;
				var options = {};

				options.width = this.width;
				options.position = 'fixed';
				options.max = this.listSize;
				options.matchContains = this.matchContains;
				options.minChars = this.minChars;
				options.selectFirst = false;
				options.scrollHeight = 450;
				options.queryStringParamName = this.queryStringParamName;
				options.formatItem = function (data, position, length, term) {
					return self._formatItem(data, position, length, term);
				};
				options.highlight = function (label, term) {
					return self._highlight(label, term);
				};
				options.extraParams = self._extraParams();
				if (this.parse) {
					options.parse = this.parse;
				}

				return options;
			}
		}, {
			key: '_formatItem',
			value: function _formatItem(data, position, length, term) {
				if (this._filtered(data[2])) {
					return false;
				} // Was asked not to show this one

				var label = void 0;
				if (typeof this._customItemFormat == 'function') {
					label = this._customItemFormat(data, position, length, term);
				} else {
					label = data[2];
				}

				if (this.showDescription) {
					if (typeof this._customDescriptionFormat == 'function') {
						label += this._customDescriptionFormat(data, position, length, term);
					} else {
						label += '<br /><span class="description">' + data[3] + '</span>';
					}
				}
				return label;
			}
		}, {
			key: '_filtered',
			value: function _filtered(value) {
				for (var i = 0; i < this._filters.length; i++) {
					if (this._filters[i] == value) {
						return true;
					}
				}

				return false;
			}
		}, {
			key: '_highlight',
			value: function _highlight(label, term) {
				if (this._doHighlight) {
					if (typeof this.custom_highlight == 'function') {
						return this.custom_highlight(label, term);
					} else {
						return label.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<span class=\"ac_match\">$1</span>");
					}
				} else {
					return label;
				}
			}
		}, {
			key: '_extraParams',
			value: function _extraParams() {
				var params = {};
				if (this.matchContains) {
					params.contains = 'true';
				}

				if (this.params) {
					if (typeof this.params == 'function') {
						var url_params = this.params();
						if ((typeof url_params === 'undefined' ? 'undefined' : _typeof(url_params)) == 'object') {
							$.each(url_params, function (key, param) {
								params[key] = param;
							});
						} else {
							params.param = this.params;
						}
					} else if (_typeof(this.params) == 'object') {
						$.each(this.params, function (key, param) {
							params[key] = param;
						});
					} else {
						params.param = this.params;
					}
				}

				params.view = this.view;
				params.cmd = this.command;
				params.k = $.app.SESSION_KEY;

				if (this.handler !== '') {
					params.handler = this.handler;
				}

				if (this.action !== '') {
					params.action = this.action;
				}

				return params;
			}
		}, {
			key: '_result',
			value: function _result(event, data, label) {
				if (typeof this.callback == 'function') {
					this.callback(data);
				}
			}
		}, {
			key: 'filterValue',
			value: function filterValue(value, filter) {
				var found = false;

				for (var i = 0; i < this._filters.length; i++) {
					if (value == this._filters[i]) {
						if (filter || typeof filter == 'undefined') {
							found = true;
						} else {
							delete this._filters[i];

							for (var j = i + 1; j < this._filters.length; j++) {
								this._filters[j - 1] = this._filters[j];
							}
							this._filters.pop();

							return true;
						}
					}
				}

				if ((filter || typeof filter == 'undefined') && !found) {
					this._filters.push(value);
					return true;
				}

				return false;
			}
		}]);

		return Autocompleter;
	}();

	exports.default = Autocompleter;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

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

		for (var _i = 0; _i < matches.length; _i++) {
			var substitution = void 0;
			if (matches[_i].code == '%') {
				substitution = '%';
			} else if (matches[_i].code == 'b') {
				matches[_i].argument = String(Math.abs(parseInt(matches[_i].argument, 10)).toString(2));
				substitution = convert(matches[_i], true);
			} else if (matches[_i].code == 'c') {
				matches[_i].argument = String(String.fromCharCode(parseInt(Math.abs(parseInt(matches[_i].argument, 10)))));
				substitution = convert(matches[_i], true);
			} else if (matches[_i].code == 'd') {
				matches[_i].argument = String(Math.abs(parseInt(matches[_i].argument, 10)));
				substitution = convert(matches[_i]);
			} else if (matches[_i].code == 'f') {
				matches[_i].argument = String(Math.abs(parseFloat(matches[_i].argument, 10)).toFixed(matches[_i].precision ? matches[_i].precision : 6));
				substitution = convert(matches[_i]);
			} else if (matches[_i].code == 'o') {
				matches[_i].argument = String(Math.abs(parseInt(matches[_i].argument, 10)).toString(8));
				substitution = convert(matches[_i]);
			} else if (matches[_i].code == 's') {
				matches[_i].argument = matches[_i].argument.substring(0, matches[_i].precision ? matches[_i].precision : matches[_i].argument.length);
				substitution = convert(matches[_i], true);
			} else if (matches[_i].code == 'x') {
				matches[_i].argument = String(Math.abs(parseInt(matches[_i].argument, 10)).toString(16));
				substitution = convert(matches[_i]);
			} else if (matches[_i].code == 'X') {
				matches[_i].argument = String(Math.abs(parseInt(matches[_i].argument, 10)).toString(16));
				substitution = convert(matches[_i]).toUpperCase();
			} else {
				substitution = matches[_i].match;
			}

			newString += strings[_i];
			newString += substitution;
		}

		newString += strings[i];
		return newString;
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DateHelper = function () {
		function DateHelper() {
			_classCallCheck(this, DateHelper);

			this._date_regex = new RegExp(/^([1-9]{1}\d{3})-{0,1}([0]{1}[1-9]{1}|[1]{1}[0-2]{1})-{0,1}([0-2]{1}[1-9]{1}|[1-2]{1}[0]{1}|[3]{1}[0-1]{1})(| (\d{2}):(\d{2}):(\d{2})(|\.\d+))$/);
		}

		_createClass(DateHelper, [{
			key: 'isDate',
			value: function isDate(date) {
				var m = this._date_regex.exec(date);

				return m != null;
			}
		}, {
			key: 'parse',
			value: function parse(date) {
				if (date === null) return false;

				if ((typeof date === 'undefined' ? 'undefined' : _typeof(date)) == 'object') {
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
					if ($.app.debug) console.debug('Could not parse date "' + date + '"');

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
			key: 'format',
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
					return $.app.lang === "en" ? moment(date).format('MMMM D') : moment(date).format('D MMMM');
				} else if (_format == 'longabbrmonth') {
					return moment(date).format('ll');
				} else if (_format == 'time') {
					var timeformat = 'LT';

					if ($.isPlainObject($.app.config) && typeof $.app.config.time_format === "string") {
						timeformat = $.app.config.time_format === "24h" ? "HH:mm" : "hh:mm A";
					}
					return moment(date).format(timeformat);
				} else if (_format == 'dashboard') {
					return $.app.lang === "en" ? moment(date).format('dddd, MMMM D') : moment(date).format('dddd, D MMMM');
				}
				if ($.app.debug) {
					console.debug('Unknown date format "' + _format + '"');
				}
				return '';
			}
		}, {
			key: 'getMonthName',
			value: function getMonthName(month) {

				if (typeof month == 'undefined' && arguments.length === 0) {
					month = moment().month();
				}

				var returnValue = moment.months(month);

				if ($.isArray(returnValue)) $.app._throw('Unknown month "' + month + '"');else return returnValue;
			}
		}, {
			key: 'getAge',
			value: function getAge(date, now) {
				date = this.parse(date);
				now = this.parse(now) || new Date();

				return parseInt(moment(now).diff(date, 'years'));
			}

			/**
	   * get a fake birthdate for this age
	   */

		}, {
			key: 'getFakeBirthdate',
			value: function getFakeBirthdate(age) {
				age = parseInt(age);
				if (!age) return '';

				return moment().subtract(age, 'years').startOf('year').format('YYYY-MM-DD');
			}
		}, {
			key: 'getInsuranceAge',
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
			key: 'getYear',
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

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	// jQuery.fn.extend(jQueryExtend);
	var jQueryExtend = exports.jQueryExtend = {
		alternateText: function alternateText(value, alternate_value) {
			this.text(value && value !== '' ? value : alternate_value);

			return this;
		},
		numberText: function numberText(value) {
			var text = self.formatNumber(value);
			this.text(text === '' ? '0' : text);

			return this;
		},
		moneyText: function moneyText(value) {
			this.text(self.formatMoney(value));

			return this;
		},
		dateText: function dateText(value) {
			this.text(self.date.format(value));

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
				text = sign + (years === 0 ? '' : (years === 1 ? $.app._('YEARD').replace('%{years}', years) : $.app._('YEARSD').replace('%{years}', years)) + ' ') + (months === 0 ? '' : months === 1 ? $.app._('MONTHD').replace('%{months}', months) : $.app._('MONTHSD').replace('%{months}', months));
			}
			this.val(text);

			return this;
		},
		booleanText: function booleanText(value) {
			if (value === 'YES') {
				value = $.app._('YES');
			} else if (value === 'NO') {
				value = $.app._('NO');
			} else {
				value = '-';
			}

			this.text(value);

			return this;
		},
		dateVal: function dateVal(value) {
			this.val(self.date.format(value, 'input'));

			return this;
		},
		safeClick: function safeClick(fn) {
			this.click(function (eventObject) {
				var _this = this;

				if (!this.__clicked) {
					(function () {
						_this.__clicked = true;

						fn.call(_this, eventObject);

						var t = _this;
						setTimeout(function () {
							t.__clicked = false;
						}, 500);
					})();
				} else if ($.app.debug) {
					console.debug('catched double click');
				}
			});

			return this;
		},
		numberVal: function numberVal(value, opts) {
			if (arguments.length > 0) {
				return $(this).val(self.formatNumber(value, opts));
			}

			var val = $.app.parseFloat(this.val());

			if ($(this).hasClass('positive') && $(this).hasClass('number')) {
				if (val < 0) {
					return 0;
				}

				return val;
			}

			return val;
		},
		number: function number(opts) {
			return $(this).each(function () {
				$(this).addClass('number');
				$(this).val($.app.formatNumber($(this).val(), opts));

				$(this).blur(function () {
					$(this).val($.app.formatNumber($(this).val(), opts));
				});
			});
		},
		moneyVal: function moneyVal(value, opts) {
			if (arguments.length > 0) {
				if ($(this).hasClass('money')) {
					$(this).data('val', $.app.parseFloat(value.replace('$', '')));
					return $(this).val(self.formatMoney(value, opts));
				}

				return $(this).val(self.formatMoney(value, opts));
			} else if ($(this).hasClass('money')) {
				var val = $(this).data('val');

				if ($(this).hasClass('positive') && val < 0) {
					return 0;
				}

				return val;
			}

			return $.app.parseFloat($(this).val().replace('$', ''));
		},
		money: function money(opts) {
			return $(this).each(function () {
				var $t = $(this);
				$t.addClass('money');

				$t.focus(function () {
					$(this).val($(this).data('val'));
					return this;
				});
				$(this).click(function () {
					$(this).select();
				});
				$(this).blur(function () {
					var val = void 0;
					var value = $(this).val();
					if (opts && opts.canBeNull && (value === '' || value === null)) {
						val = '';
					} else {
						val = $.app.parseFloat(value.replace('$', ''));
						if (opts && opts.true_precision) {
							if (opts.rounded) {
								val = Math.round(val * Math.pow(10, opts.true_precision)) / Math.pow(10, opts.true_precision);
							} else {
								val = Math.floor(val * Math.pow(10, opts.true_precision)) / Math.pow(10, opts.true_precision);
							}
						}
					}
					$(this).data('val', val);
					$(this).val($.app.formatMoney(val, opts));
					return this;
				});
				if ($t.val() !== '') {
					$t.blur();
				}
			});
		},
		percentVal: function percentVal(value, opts) {
			if (arguments.length > 0) {
				return $(this).val(self.formatPercent(value, opts));
			}

			var val = $.app.parseFloat(this.val().replace('%', ''));

			if ($(this).hasClass('positive') && $(this).hasClass('percent')) {
				if (val < 0) {
					return 0;
				}

				return val;
			}

			return val;
		},
		percent: function percent(opts) {
			return $(this).each(function () {
				$(this).addClass('percent');
				$(this).val($.app.formatPercent($(this).val(), opts));

				$(this).blur(function () {
					$(this).val($.app.formatPercent($(this).val(), opts));
				});
			});
		},
		SIN: function SIN() {
			return $(this).each(function () {
				$(this).val($.app.formatSIN($(this).val()));

				$(this).blur(function () {
					this.value = $.app.formatSIN($(this).val());
				});
			});
		},
		datepickerInput: function datepickerInput(interval) {
			return $(this).each(function () {
				var $this = $(this);
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
								$(this).val($.datepicker.formatDate('yy-mm-dd', parsed_date));
							} catch (e) {
								$(this).val(value);
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
								$(this).val($.datepicker.formatDate('yy-mm-dd', parsed_date));
							} catch (e) {
								$(this).val(value);
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

			return $(this).wrap('<span class="hinted"></span>').after('<span class="hint" style="width: ' + w + 'px; right: -' + (w + 50) + 'px;">' + text + '<span class="hint-pointer sprite">&nbsp;</span></span>').focus(function () {
				var t = this;
				t._focus_timeout = setTimeout(function () {
					$(t).next('.hint').fadeIn();
				}, 1000);
			}).blur(function () {
				if (this._focus_timeout) {
					clearTimeout(this._focus_timeout);
				}

				$(this).next('.hint').fadeOut();
			}).keypress(function () {
				if (this._focus_timeout) {
					clearTimeout(this._focus_timeout);
				}

				$(this).next('.hint').fadeOut();
			});
		},
		unhint: function unhint() {
			if ($(this).parent().hasClass('hinted')) {
				$(this).next('.hint').remove();
				$(this).unwrap();
			} else if ($(this).parent().find('.hinted')) {
				$(this).next('.hint').remove();
			}

			return this;
		},
		hintError: function hintError(text, width, dont_show) {
			var blurFocusTarget = void 0;
			var $this = $(this);

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
				$(this).fadeOut();
			});

			if (!dont_show) {
				target.data('hint').fadeIn();
			}

			return target;
		},
		handleHintErrorChange: function handleHintErrorChange() {
			$(this).unhint().removeClass('save_warning');
		},
		setHintErrorWidth: function setHintErrorWidth(width) {
			var w = Math.max(parseInt(width, 10), 200);

			$(this).next('.hint').css({
				width: w
			});

			return $(this);
		},
		setHintErrorPosition: function setHintErrorPosition() {
			var r = -(parseInt($(this).data('hint').css('width')) + 50);

			$(this).data('hint').css({
				right: r
			});

			return $(this);
		},
		signal: function signal(length) {
			length = parseInt(length);
			if (length <= 0) {
				length = 500;
			}

			return $(this).each(function () {
				$(this).addClass('signal');
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
			$(this).each(function () {
				var classes = $(this).attr('class').split(' ');

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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var BaseApplication = function (_EventEmitter) {
		_inherits(BaseApplication, _EventEmitter);

		function BaseApplication() {
			_classCallCheck(this, BaseApplication);

			// Debugging and error handling
			var _this = _possibleConstructorReturn(this, (BaseApplication.__proto__ || Object.getPrototypeOf(BaseApplication)).call(this));

			_this.view_fetching = false; // Indiacte that the app is currently waiting on an ajax query that is fetching a view.
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
			_this._is_observing_hash = false;
			_this._hash_changed_while_not_observing = true;
			_this.hash = false;
			_this._resume_hash = '';
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
			return _this;
		}

		/**
	  * Initialize application
	  */


		_createClass(BaseApplication, [{
			key: 'init',
			value: function init() {
				var self = this;

				// Debug functions catcher
				if (!window.console || !window.console.firebug) {
					if (!window.console) {
						window.console = {
							log: function log() {},
							debug: function debug() {}
						};
					} else if (!window.console.debug) {
						window.console.debug = function (info) {
							window.console.log(info);
						};
					}
				}

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

				this._iPad = navigator.userAgent.match(/iPad/) === 'iPad';
				this._iPod = navigator.userAgent.match(/iPod/) === 'iPod';
				this._iPhone = navigator.userAgent.match(/iPhone/) === 'iPhone';
				this._blackberry = navigator.userAgent.match('/BlackBerry/') === 'BlackBerry' && $.browser.webkit;
				this._palm_pre = navigator.userAgent.match('/webOS/') === 'webOS' && $.browser.webkit;
				this._mobile = this._iPad || this._iPod || this._iPhone || this._blackberry || this._palm_pre;
				this._webkit = $.browser.webkit;
				this._opera = $.browser.opera;
				this._msie = $.browser.msie;
				this._mozilla = $.browser.mozilla;

				// Error catching function
				window.onerror = function (description, page, line) {
					// Support jsmonitor.io
					if (typeof window.UEInfo !== 'undefined') {
						window.errors.push(arguments);
						window.UEInfo.run();
					}

					return self._onError(description, page, line);
				};

				// Page change, tab closing and window closing catching function
				window.onbeforeunload = function () {
					return self._beforeUnload();
				};

				if (!window.name.match(/^GUID-/)) {
					window.name = 'GUID-' + $.app.generateGUID();
				}

				$('#hook_confidentiality_policy,#hook_usage_policy').safeClick(function () {
					$.app.showMessage($(this).text(), $.app._('AVAILABLE_SOON'));
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

				this._init();
			}
		}, {
			key: '_init',
			value: function _init() {}

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
					Raven.config('https://' + config.sentry.key + '@app.getsentry.com/' + config.sentry.project, { release: config.application_version }).install();

					Raven.setTagsContext({
						version: config.application_version
					});

					Raven.setUserContext({
						email: config.user.email,
						id: config.user.id,
						name: config.user.name
					});

					Raven.setExtraContext({
						transaction: config.kronos_transaction_id
					});
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

				if (this._checkGears()) {
					this._initGears();
				}
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
				$.app.showModalDialog('<h2>' + $.app._('NAVIGATION_ERROR') + '</h2>\
											<p>\
												<strong>' + $.app._('INVALID_PAGE_REQUEST') + '</strong>\
												<br />\
											</p>\
											<p class="submit">\
												<input type="submit" id="hook_create_error_close" value="' + $.app._('OK') + '" />\
											</p>', 'fast', function () {
					$('#hook_create_error_close').safeClick(function () {
						$.app.hideModalDialog('fast');

						// stop looking at the location for now ...
						$.app._stopObservation();

						// ... revert page change ...
						$.app.hash = $.app.stepBack();
						$.app._history.push($.app.hash);

						// ... and then start to observe again
						$.app._observe();
					});
				});
			}

			/**
	   *	Show a modal dialog telling the user something bad happened. He can try again or go back to where he was before.
	   */

		}, {
			key: '_showFatalError',
			value: function _showFatalError(error) {
				var t = this;

				this.showModalDialog('<h2>' + $.app._('ERROR') + '</h2>\
							<p>\
								<strong>' + $.app._('FATAL_ERROR_OCCURED') + '</strong>\
								<br />\
								' + $.app._('CONTACT_SUPPORT_PERSIST') + '\
							</p>\
							<p class="submit">\
								' + $.app._('FATAL_ERROR__YOU_CAN') + ' <a href="javascript:$.app._hideFatalError(\'reload\');">' + $.app._('FATAL_ERROR__RELOAD_PAGE') + '</a> ' + $.app._('OR') + ' <a href="javascript:$.app._hideFatalError(\'stepback\');">' + $.app._('FATAL_ERROR__GO_BACK') + '</a>\
							</p>', 'fast', function () {
					t._errors.push({ description: error, page: '$.app.js', line: 0 });
				});
			}

			/**
	   *	Close the modal dialog then reload or back, depending on what the use chose.
	   */

		}, {
			key: '_hideFatalError',
			value: function _hideFatalError(action) {
				this.hideModalDialog('fast', function () {
					$.app.hideOverlay();

					$('#fatal_error').remove();

					if (action == 'reload') {
						location.reload();
					} else if (action == 'stepback') {
						$.app.forceStepBack();
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
				var view;
				var object;

				if (!this.view_fetching && this.hash !== location.hash) {
					//Store the new hash before the loop starts again

					if (this.debug) {
						console.debug('Hash changed');
					}

					this.hash = location.hash;

					// Get the requested view
					if (!this.hash || this.hash == '#') {
						this.goTo(this.default_view);
						return false;
					} else {
						var splits = this.hash.substring(1).split('&');

						view = splits.shift();

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
					}

					var fetch = true;
					if (this.currentView && view == this.currentView) {
						// Are we staying in the same view ?
						object = this._getViewObject(this.currentView);

						if (object) {
							if (object.onHashChange(this.hash)) {
								// Did the the view handled the hash change ?
								fetch = false;
							}
						}
					}
					// If we where in a view and we're not resuming navigation (see Test form for more detail) we can ask to view to close;
					if (fetch && this.currentView && !this._resume_hash) {
						object = this._getViewObject(this.currentView);

						// No object to manage the view, why bother ?
						if (object) {
							if (!object.close(this.hash)) {
								// Can we continue ?
								if (this.debug) {
									console.debug('View coulnd\'t close');
								}

								// Temporarily stop the hash observation loop so we can ...
								this._stopObservation();

								// ... keep where the user wanted to go and stay where we were ...
								this._resume_hash = this.hash;
								this.hash = this.stepBack();

								// ... and then start to observe again
								this._observe();

								return; // We don't want to anything else until the hash changes again or the view tells us to resume
							} else {
								this._onViewClose(object);

								if (this.debug) {
									console.debug('Closed view');
								}
							}
						}
					}

					// We don't need that information anymore. It can block us from getting away from the current view if we don't
					this._resume_hash = false;

					// We don't keep page reloads in history
					if (this._force_clear) {
						this.addHistory(this.hash);
						this._force_clear = false;
					} else if (!this._detectStepBack(this.hash)) {
						this.addHistory(this.hash);
					}

					if (fetch) {
						if (this.debug) {
							console.debug('View : ' + view);
						}

						// Just to be sure we leave nothing behind
						this.hideModalDialogNow();

						// Highlight the right menu
						this._selectViewMenu(view);

						// It's time to change the view
						this._fetchView(view);
					}
				}
			}
		}, {
			key: '_onViewClose',
			value: function _onViewClose(viewObject) {}
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
				$.app._stopObservation();
				this.goTo(hash);
				$.app._hash_changed_while_not_observing = false;
				$.app.hash = hash;
				$.app._observe();
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
	   * Resume user navigation, or not. If view could not close, we stored the hash into _resume_hash to be able to resume when the time comes
	   */

		}, {
			key: 'resume',
			value: function resume(stay) {
				if (this._resume_hash) {
					if (!stay && typeof stay != 'undefined') {
						this._onViewClose(this._getViewObject(this.currentView));

						// We're going where the user wanted to before the view cancelled it
						this.currentView = false;

						var hash = this._resume_hash; // Using temporary variable to be sure hash observation loop does not mess with this
						this._resume_hash = false;

						location.hash = hash;

						if (this.debug) {
							console.debug('View closed, resuming');
						}
					} else {
						this._resume_hash = false;

						this.addHistory(location.hash);

						if (this.debug) {
							console.debug('View cancelled closing');
						}
					}
				}
			}
		}, {
			key: 'getResumeHash',
			value: function getResumeHash() {
				return this._resume_hash;
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
			key: '_onBeforeFetchView',
			value: function _onBeforeFetchView(current_view) {}
		}, {
			key: '_onFetchView',
			value: function _onFetchView(current_view) {}
		}, {
			key: '_onLoadView',
			value: function _onLoadView(current_view, data, hiddenParams) {}

			/**
	   * Fetch view html and model from server
	   */

		}, {
			key: '_fetchView',
			value: function _fetchView(view, hiddenParams) {
				this.currentView = view;

				// TODO : Branch here to lookup data from gears instead doing a ajax query.

				var t = this;

				t._hideLoading();
				t.abortOngoingXHR();

				var cached = this._isViewCached(view);
				if (cached && this.debug) {
					console.debug('View "' + view + '" is in cache (' + this.lang + ')');
				}

				this.view_fetching = true;
				t._onBeforeFetchView(t.currentView);
				t._onFetchView(this._getViewObject(t.currentView));

				// Ask the requested view to transmute hash to query parameters
				var params = this._getViewParameters(location.hash);

				for (var k in params.params) {
					params[k] = params.params[k];
				}
				delete params.params;

				if (hiddenParams && $.isPlainObject(hiddenParams)) {
					for (k in hiddenParams) {
						params[k] = hiddenParams[k];
					}
				}

				params.k = t.SESSION_KEY;
				params.view = t.currentView;
				params.cmd = 'view';
				params.cached = cached;
				params.version = this.getApplicationVersion();
				params.uv = t.userVersion;

				if (this.replaced_session_key) {
					params.rk = this.replaced_session_key;
					this.replaced_session_key = false;
				}

				var param_string = $.param(params);

				$.ajax({
					url: 'index.php?' + param_string,
					type: 'POST',
					data: {
						context: $.app.getContext()
					},
					dataType: 'json',
					headers: $.app.getXSRFHeaders(),
					success: function success(response) {
						t.view_fetching = false;
						t._hideLoading();
						if (response.status == 'error') {
							var info = response.data;
							if (info.code == 600) {
								// VIEW_CMD_ERROR;
								// Hopefuly this won't happen
								t._showFatalError('An error occured server side while fetching view data "' + view + '" (600)');
							} else if (info.code == 601 || info.code == 602) {
								// VIEW_ACL_ERROR or MODEL_ACL_ERROR
								t._showNavigationError();
							} else {
								// Unknown error
								t._showFatalError('An unknown error was sent from server while fetching view data "' + view + '" (' + info.error + ')');
							}

							return false;
						}
						t._onLoadView(t._getViewObject(t.currentView), response.data, hiddenParams);
						t._loadView(response.data, hiddenParams);
					},
					error: function error(jqXHR, status, _error) {
						t.view_fetching = false;
						t._hideLoading();
						if (!$.app.validateXHR(jqXHR)) {
							return false;
						}

						if (this.debug) {
							console.debug('AJAX query error');
							console.debug(status);
							console.debug(_error);
						}

						t._showFatalError('An error occured while fetching view data "' + view + '" (' + status + ')');
					}
				});

				// If we don't receive an awnser after 1.5 second, a loading overlay will appear
				this._loadingTimeout = setTimeout(function () {
					t._showLoading();
				}, this._loadingDelay);
			}

			/**
	   *	Standard entry point for view data (html and model).
	   */

		}, {
			key: '_loadView',
			value: function _loadView(data, hiddenParams) {
				var t = this,
				    fullParams;

				try {

					// Application version changed server side, we have to reload the application.
					if (this.getApplicationVersion() != data.version) {
						location.reload();
					}

					if (data.data) {
						//backward compatibility.
						data = data.data;
					}

					if (data.user && t.userVersion != data.user.version) {
						t.clearViewCache();
						t.setUserConfig(data.user);
					}

					this._initView();
					var object = this._getViewObject(this.currentView);
					if (!object) {
						throw this._throw('View object not found : ' + this.currentView, true);
					}

					object._validateable = data.validateable || false;

					//* BASED on kronos-lib/Kronos/Common/View.php -> function getContent *//

					if (data.html) {
						if (this.debug) {
							console.debug('Using recieved html');
						}
						this._loadContent(data.html);

						// We store the html and json we received
						this._setViewCache(this.currentView, data.html, false);
					} else if (this._isViewCached(this.currentView)) {
						if (this.debug) {
							console.debug('Using cached html');
						}

						// Get no html/params but the sent version is the same as the one we have, we can use it.
						this._loadContent(this._getViewCachedHTML(this.currentView));
					} else {
						throw this._throw('View not cached and not recieved from html...', true);
					}

					if (data.params) {
						fullParams = $.extend({}, data.params, hiddenParams);
					} else {
						fullParams = $.extend({}, hiddenParams);
					}
					this._loadParams(fullParams);

					this._hookView();

					// NOTE : No offline support is required here. Everything is managed by {TODO: insert offline fetch method name}
					this._loadModel(data.model);
					this._checkAnchor();
					this._checkOnLoadScroll();

					$('input').each(function (index, element) {
						if (!$(element).attr('maxlength')) {
							$(element).attr('maxlength', 255);
						}
					});
				} catch (error) {
					this._stopObservation();
					this._showFatalError(error);

					throw error;
				}
			}
		}, {
			key: '_checkAnchor',
			value: function _checkAnchor() {
				var params = this._getViewParameters(this.hash);
				if (params.params['anchor']) {
					var anchor_name = params.params.anchor;
					var view = this._getViewObject(this.currentView);
					var $element = $('[anchor=' + anchor_name + ']');
					if ($element.length === 0) {
						if (this.debug) {
							console.warn('GET parameter "anchor" found but there is no element associated with it!');
						}
						return false;
					}
					if ($.isFunction(view.onScrollToAnchor)) {
						view.onScrollToAnchor($element, anchor_name);
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
			key: '_initView',
			value: function _initView() {
				if (!this.currentView) {
					throw this._throw('No view to initialize', true);
				}

				var object = this._getViewObject(this.currentView);
				window.view = object;
				if (object) {
					object.init(location.hash);
				}
			}

			/**
	   *	Ask the view to draw the content if it can or we do it.
	   *
	   *	NOTE : If you want to support view redrawing, implement 'draw'.
	   */

		}, {
			key: '_loadContent',
			value: function _loadContent(html) {
				var object = this._getViewObject(this.currentView);

				if (object && typeof object.draw == 'function') {
					object.draw(html);
				} else {
					$('#content').html(html);
				}

				scrollTo(0, 0);
			}

			/**
	   *	Load the passed params in the view
	   */

		}, {
			key: '_loadParams',
			value: function _loadParams(params) {
				if (!this.currentView) {
					throw this._throw('No view to load parameters from.', true);
				}

				var object = this._getViewObject(this.currentView);
				if (object) {
					object.load(params);
				}
			}

			/**
	   * Hook the view object to the current content
	   */

		}, {
			key: '_hookView',
			value: function _hookView() {
				if (!this.currentView) {
					throw this._throw('No view to hook', true);
				}

				var object = this._getViewObject(this.currentView);

				if (object) {
					if (typeof object._preHook == 'function') {
						object._preHook();
					}
					object.hook();

					this._onViewHook(object);
				}
			}
		}, {
			key: '_onViewHook',
			value: function _onViewHook(viewObject) {}
		}, {
			key: 'recursiveCleanFloats',
			value: function recursiveCleanFloats(model) {
				if ($.isArray(model)) {
					for (var i = 0; i < model.length; i++) {
						model[i] = $.app.recursiveCleanFloats(model[i]);
					}
				} else if ((typeof model === 'undefined' ? 'undefined' : _typeof(model)) == 'object') {
					for (var k in model) {
						model[k] = $.app.recursiveCleanFloats(model[k]);
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
		}, {
			key: '_loadModel',
			value: function _loadModel(model) {
				var object = this._getViewObject(this.currentView);

				if (object) {
					model = $.app.recursiveCleanFloats(model);

					if (this.debug) {
						console.debug(model);
					}

					this.emit('preInject');
					object.inject(model);
					this.emit('postInject');
					if (typeof object._postInject == 'function') {
						object._postInject();
					}
					this._onViewInject(object, model);
				} else if (this.debug) {
					console.debug('No view object, cannot inject model');
				}

				if ($('.page-title').length) {
					window.document.title = $('.page-title').text();
				}
			}
		}, {
			key: '_onViewInject',
			value: function _onViewInject(viewObject, model) {}

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
	   * Ask the view object to transmute the hash to query parameters.
	   */

		}, {
			key: '_getViewParameters',
			value: function _getViewParameters(hash) {
				var object = this._getViewObject(this.currentView);
				if (object) {
					return object.parseHash(hash);
				} else {
					// No objects ? We can't determine anything...
					return {};
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
				if (!zIndex) zIndex = 500;
				if (!id) id = 'overlay';

				if (this.debug) console.debug('Show overlay');

				if ($('#' + id).length > 0) // Loading is already shown
					return;

				$('body').append('<div id="' + id + '"></div>');

				if (!color) color = 'transparent';

				if (!opacity) opacity = '0';

				$('#' + id).css({
					height: $(document).height(),
					left: 0,
					position: 'absolute',
					top: 0,
					width: this._iPad ? $('body').width() : '100%',
					zIndex: zIndex,
					backgroundColor: color,
					opacity: opacity
				}).fadeIn();
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
				if (hash === undefined) {
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
				if (this._history && this._history.length > 0 && $.isPlainObject(this._history[this._history.length - 1].context)) return this._history[this._history.length - 1].context;else return {};
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
	   * Check if Google Gears is installed
	   */

		}, {
			key: '_checkGears',
			value: function _checkGears() {
				if (!window.google || !google.gears) {
					if (this.debug) console.debug('Google Gears is not installed');

					return false;
				} else {
					if (this.debug) console.debug('Google Gears is installed');

					return true;
				}
			}

			/**
	   * Initialize Google Gears
	   */

		}, {
			key: '_initGears',
			value: function _initGears() {
				if (!this._checkGears()) return false;
				return true;
			}

			/**
	   * Add a view object and make sure it implements required fonction (debug only)
	   */

		}, {
			key: 'registerView',
			value: function registerView(view, object) {

				if (this.debug && this._view_objects[view]) {
					console.debug('View ' + view + ' is already registered');
				}

				if (this.debug) console.debug('Registered view "' + view + '"');

				this._view_objects[view] = object;
			}

			/**
	   * Tries to get the request view object
	   */

		}, {
			key: '_getViewObject',
			value: function _getViewObject(view) {
				return this._view_objects[view];
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
	   */

		}, {
			key: 'showModalDialog',
			value: function showModalDialog(content, speed, callback, width) {
				if ($.app.debug) console.debug('Show modal dialog');

				this.showOverlay('#000', 0.4);

				$('body').append($('<div></div>').addClass('modal').attr('id', 'modal_dialog').css({
					'display': 'none',
					'top': $.app._scrollTop() + 'px'
				}).append($('<div></div>').addClass('modal-2').append($('<div></div>').addClass('sprite modal-3').append(content))));

				if (width) {
					$('#modal_dialog .modal-2').css('width', width);
				}

				if ($.app.isIE7()) $('div.modal p.submit').prepend('<span style="width: 1px; display: inline-block;">&nbsp;</span>');
				$('#modal_dialog').slideDown(speed, callback);
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
				if ($.app.debug) console.debug('Hide modal dialog');

				$('#modal_dialog').fadeOut(speed, function () {
					$.app.hideOverlay();
					if (use_detach) {
						$('#modal_dialog').detach();
					} else {
						$('#modal_dialog').remove();
					}
					if (typeof callback == 'function') callback();
				});
			}

			/**
	   * Hide the modal dialog now. Mainly used to be sure no dialog is left behind
	   */

		}, {
			key: 'hideModalDialogNow',
			value: function hideModalDialogNow() {
				if ($.app.debug) console.debug('Hide modal dialog now!');

				$('#modal_dialog').remove();
			}
		}, {
			key: 'getShowErrorHTML',
			value: function getShowErrorHTML(message) {
				return '<div class="modal-dialog"><h2>' + $.app._('ERROR') + '</h2>\
							<p>\
								<strong>' + (message ? $.app._(message) : $.app._('FATAL_ERROR_OCCURED')) + '</strong>\
								<br />\
								' + $.app._('ERROR_TRY_AGAIN') + '\
								<br />\
								' + $.app._('CONTACT_SUPPORT_PERSIST') + '\
							</p>\
							<p class="submit">\
								<input type="submit" id="hook_create_error_close" value="' + $.app._('OK') + '" />\
							</p></div>';
			}
		}, {
			key: 'showError',
			value: function showError(message, onHideCallback) {
				$.app.showModalDialog($.app.getShowErrorHTML(message), 'fast', function () {
					$('#hook_create_error_close').safeClick(function () {
						$.app.hideModalDialog('fast');
						if (onHideCallback) {
							onHideCallback();
						}
					});
				});
			}
		}, {
			key: 'getShowSessionExpiredError',
			value: function getShowSessionExpiredError() {
				return '<div class="modal-dialog"><h2>' + $.app._('INVALID_CREDENTIAL_ERROR_TITLE') + '</h2>\
					<p>\
						<strong>' + $.app._('INVALID_CREDENTIAL_ERROR_BODY') + '</strong>\
						<br />\
					</p>\
					<p class="submit">\
						<input type="submit" id="hook_session_expired_error_close" value="' + $.app._('OK') + '" />\
					</p>\
				</div>';
			}
		}, {
			key: 'showSessionExpiredError',
			value: function showSessionExpiredError(location) {
				var self = this;
				location = location || self.VIRTUALPATH || '/?logout';
				$.app.showModalDialog($.app.getShowSessionExpiredError(), 'fast', function () {
					$('#hook_session_expired_error_close').safeClick(function () {
						document.location = location;
					});
				});
			}
		}, {
			key: 'getShowXHRNetworkError',
			value: function getShowXHRNetworkError() {
				return '<div class="modal-dialog"><h2>' + $.app._('XHR_NETWORK_ERROR_TITLE') + '</h2>\
					<p>\
						<strong>' + $.app._('XHR_NETWORK_ERROR_BODY') + '</strong>\
						<br />\
					</p>\
					<p class="submit">\
						<input type="submit" id="hook_xhr_network_error_close" value="' + $.app._('OK') + '" />\
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
					});
				});
			}
		}, {
			key: 'getShowConfirmationHTML',
			value: function getShowConfirmationHTML(title, message) {
				return '<div class="modal-dialog"><h2>' + title + '</h2>\
								<p>' + message + '</p>\
							<p class="submit">\
								<input type="button" id="hook_confirmation_yes" value="' + $.app._('YES') + '" />\
								<input type="button" id="hook_confirmation_no" value="' + $.app._('NO') + '" />\
							</p></div>';
			}
		}, {
			key: 'showConfirmation',
			value: function showConfirmation(title, message, yesCallback, noCallback) {
				$.app.showModalDialog($.app.getShowConfirmationHTML(title, message), 'fast', function () {

					$('#hook_confirmation_yes').safeClick(function () {
						if (yesCallback) {
							yesCallback();
						}
						$.app.hideModalDialog('fast');
					});

					$('#hook_confirmation_no').safeClick(function () {
						if (noCallback) {
							noCallback();
						}
						$.app.hideModalDialog('fast');
					});
				});
			}
		}, {
			key: 'showMessage',
			value: function showMessage(title, message, content) {
				if (title === '') this._throw('Missing title', true);
				if (message === '') this._throw('Missing message', true);

				$.app.showModalDialog('<h2>' + title + '</h2>\
							<p>\
								<strong>' + message + '</strong>\
							</p>\
							' + (content ? '<p>' + content + '</p>' : '') + '\
							<p class="submit">\
								<input type="submit" id="hook_show_message_close" value="' + $.app._('OK') + '" />\
							</p>', 'fast', function () {
					$('#hook_show_message_close').safeClick(function () {
						$.app.hideModalDialog('fast');
					});
				});
			}
		}, {
			key: 'showQuestionCommentDialog',
			value: function showQuestionCommentDialog(comment_type) {

				var t = this;

				var content = '<h2>' + $.app._('QUESTION_COMMENT_SUGGESTION') + '</h2>\
			<div class="header_line"></div>\
			<div id="hook_question_comment_form">\
			<dl class="form left_form">\
			<dt><label style="width:100px">' + $.app._('COMMENT_TYPE') + '</label></dt>\
			<dd><select id="hook_question_comment_type">\
			<option value="QUESTION">' + $.app._('QUESTION') + '</option>\
			<option value="COMMENT">' + $.app._('COMMENT') + '</option>\
			<option value="SUGGESTION">' + $.app._('SUGGESTION') + '</option>\
			</select></dd>\
			<dt><label style="width:100px">' + $.app._('COMMENT_FROM') + '</label></dt>\
			<dd><input type="text" id="hook_question_comment_from" style="width:350px" disabled="disabled" /></dd>\
			<dt><label style="width:100px">' + $.app._('COMMENT_SUBJECT') + '</label></dt>\
			<dd><input type="text" id="hook_question_comment_subject" style="width:350px" /></dd>\
			<div id="hook_question_comment_attachement_div">\
			<dt><label style="width:100px">' + $.app._('ATTACHMENT') + '</label></dt>\
			<dd><div id="file_upload"></div></dd>\
			<dd><ul style="margin-left:115px;" id="uploaded_files_names"></ul><dd>\
			<br />\
			</div>\
			<dd><textarea id="hook_question_comment_textarea" style="width:500px;height:150px"></textarea></dd>\
			</dl>\
			<p class="submit">\
			<input type="submit" id="hook_send_question_comment" value="' + $.app._('OK') + '" /> <a href="javascript:void(0);" id="hook_cancel_question_comment">' + $.app._('CANCEL') + '</a>\
			</p>\
			</div>\
			<div id="hook_question_comment_sent" style="display:none"><p>' + $.app._('THANK_YOU_FOR_YOUR_COMMENTS') + '</p></div>';

				var i = 0;

				$.app.showModalDialog(content, 'normal', function () {

					if (comment_type) $('#hook_question_comment_type').val(comment_type);

					$('#hook_question_comment_from').val($.app.userEmail);

					$('#hook_send_question_comment').safeClick(function () {

						var type = $('#hook_question_comment_type').val();
						var subject = $('#hook_question_comment_subject').val();
						var from = $('#hook_question_comment_from').val();
						var message = $('#hook_question_comment_textarea').val();

						if (!subject) {
							$('#hook_question_comment_subject').hintError($.app._('FIELD_REQUIRED')).focus();
							return false;
						}

						if (!message) {
							$('#hook_question_comment_textarea').hintError($.app._('FIELD_REQUIRED')).focus();
							return false;
						}

						var postString = '&type=' + encodeURIComponent(type) + '&subject=' + encodeURIComponent(subject) + '&from=' + encodeURIComponent(from) + '&message=' + encodeURIComponent(message) + '&tmp_dir=' + encodeURIComponent(t.tmp_dir);

						$.ajax({
							url: 'index.php?k=' + t.SESSION_KEY + '&sendComment',
							type: 'POST',
							data: postString,
							dataType: 'json',
							headers: $.app.getXSRFHeaders(),
							success: function success(data) {

								if (data.status && data.status == 'error') {
									$.app.showError();
									$.app.hideModalDialog('fast');
									return false;
								}

								setTimeout(function () {
									$.app.hideModalDialog('fast');
								}, 2000);

								removeQCSAjaxFolder(t.tmp_dir);
								return true;
							},
							error: function error(jqXHR, status, _error2) {
								if (!$.app.validateXHR(jqXHR)) {
									$.app.hideModalDialog('fast');
									return false;
								}

								$.app.showError();
								$.app.hideModalDialog('fast');
								return false;
							}
						});

						$('#hook_question_comment_form').fadeOut(function () {
							$("#hook_question_comment_sent").show();
						});
					});

					$('#hook_cancel_question_comment').safeClick(function () {
						t.tmp_dir = '';
						$.app.hideModalDialog('fast');
					});

					$('#hook_question_comment_subject').focus();
				}, 550);

				this.QCS_uploader = [];
				function generateQCSAjaxUploader() {
					return $('#file_upload').ajaxUploader({
						url: 'index.php?k=' + t.SESSION_KEY + '&uploadFile&tmp_dir=' + t.tmp_dir,
						autoUpload: true,
						progressBarConfig: {
							barImage: 'img/progressbg_orange.gif'
						},
						success: function success(data, status) {
							if (data.ajax_filename) {
								var element_number = i++;
								var filename = data.ajax_filename;
								t.tmp_dir = data.tmp_dir;
								$('#uploaded_files_names').append('<li id="ajax_file_' + element_number + '" style="list-style:none;">' + filename + '&nbsp&nbsp<span class="ico icon-cross" id="ajax_file_remove_' + element_number + '" style="position: absolute; margin-bottom:10px;"></span></li>');
								$('#ajax_file_remove_' + element_number).on('click', function () {
									removeQCSAjaxFile(t.tmp_dir, filename, element_number);
								});
								t.QCS_uploader.push(generateQCSAjaxUploader());
							} else if (data.error) {
								console.debug(data.error);
								$.app.showMessage($.app._('ERROR'), $.app._('UPLOAD_FILE_ERROR_OCCURED'));
							}
						},
						error: function error(jqXHR, status, _error3) {
							console.debug('Error uploading attachment.');
							$.app.showMessage($.app._('ERROR'), $.app._('UPLOAD_FILE_ERROR_OCCURED'));
						}
					});
				}

				this.QCS_uploader.push(generateQCSAjaxUploader());

				function removeQCSAjaxFile(folder, filename, div_number) {

					var postString = '&file=' + encodeURIComponent(filename) + '&fld=' + encodeURIComponent(folder);

					$.ajax({
						url: 'index.php?k=' + t.SESSION_KEY + '&removeQCSAjaxFile',
						type: 'POST',
						data: postString,
						dataType: 'json',
						headers: $.app.getXSRFHeaders(),
						success: function success(data) {
							$('#ajax_file_' + div_number).remove();
							$('#ajax_file_remove_' + div_number).remove();
							return true;
						},
						error: function error(jqXHR, status, _error4) {
							if (!$.app.validateXHR(jqXHR)) {
								return false;
							}
							console.debug('Error deleting attachment.');
						}
					});
				}

				function removeQCSAjaxFolder(folder) {

					t.tmp_dir = '';
					$.ajax({
						url: 'index.php?k=' + t.SESSION_KEY + '&removeQCSAjaxFolder',
						type: 'POST',
						data: '&fld=' + encodeURIComponent(folder),
						dataType: 'json',
						headers: $.app.getXSRFHeaders(),
						success: function success(data) {
							return true;
						},
						error: function error(jqXHR, status, _error5) {
							if (!$.app.validateXHR(jqXHR)) {
								return false;
							}
						}
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
					rounded = $.app.parseFloat(value).toFixed(0);
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
					formatted += $.app._('PHONE_EXTENSION') + extension;
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

				if (!jqXHR || typeof jqXHR === 'undefined') {
					return true;
				}

				if (jqXHR.statusText === 'abort') {
					return false;
				}

				if (jqXHR.status === 0) {
					// $.app._beforeUnload calling $.app.abortOngoingXHR() may be trigerred after the request completion so we delay the check.
					setTimeout(function () {

						if (jqXHR.statusText === 'abort') {
							return false;
						}

						// Probably due tu a CORS error caused by a redirection to Siteminder sso login page.
						// Could also be caused by a sever network or dns error.
						self.showXHRNetworkErrorError(jqXHR.responseJSON ? jqXHR.responseJSON.view : false);
					});

					return false;
				}

				if (jqXHR.status == 401) {
					self.showSessionExpiredError(jqXHR.responseJSON ? jqXHR.responseJSON.view : false);
					return false;
				}

				return true;
			}
		}, {
			key: 'getXHRRequest',
			value: function getXHRRequest(url, successCallback, loading, errorCallback, button, skipOverlayHandling) {
				var t = this;

				var xhrRequest = $.ajax({
					url: url,
					type: 'GET',
					dataType: 'json',

					success: function success(response) {
						if (!skipOverlayHandling) {
							t.hideOverlay();
							t._hideLoading();
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
								$.app.showError(data.message);
							} else {
								$.app.showError();
							}
						} else if (typeof successCallback == 'function') {
							successCallback(data);
						}
					},
					error: function error(jqXHR, status, _error6) {
						if (!skipOverlayHandling) {
							t.hideOverlay();
							t._hideLoading();
						}

						if (button) {
							$(button).prop('disabled', false);
						}

						if (!$.app.validateXHR(jqXHR)) {
							return false;
						}

						if (this.debug) {
							console.debug('AJAX query error');
							console.debug(status);
							console.debug(_error6);
						}

						if (typeof errorCallback == 'function') errorCallback();else $.app.showError();
					}
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
				$.each(this._ongoing_xhrs, function (index, xhr) {
					if (xhr !== undefined) {
						xhr.abort();
					}
				});
				this._ongoing_xhrs = [];
			}
		}, {
			key: 'get',
			value: function get(view, cmd, paramsString, callback, loading, errorCallback, button, skipOverlayHandling) {

				if (!loading && !skipOverlayHandling) {
					this.showOverlay();
				}

				if (button) $(button).prop('disabled', true);

				var self = this;

				if (paramsString.length > 0) {
					if (paramsString[0] != '&') {
						paramsString = '&' + paramsString;
					}
				}

				// Le bloc ci-dessous devrait/pourrait être remplacer par un call à getXHRRequest //
				var xhrRequest = $.ajax({
					url: 'index.php?k=' + self.SESSION_KEY + '&view=' + view + '&cmd=' + cmd + paramsString,
					type: 'GET',
					dataType: 'json',
					headers: self.getXSRFHeaders(),
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
								$.app.showError(data.message);
							} else {
								$.app.showError();
							}
						} else if (typeof callback == 'function') {
							callback(data);
						}
					},
					error: function error(jqXHR, status, _error7) {

						if (!skipOverlayHandling) {
							self.hideOverlay();
							self._hideLoading();
						}

						if (button) {
							$(button).prop('disabled', false);
						}

						if (!$.app.validateXHR(jqXHR)) {
							return false;
						}

						if (this.debug) {
							console.debug('AJAX query error');
							console.debug(status);
							console.debug(_error7);
						}

						if (typeof errorCallback == 'function') errorCallback();else $.app.showError();
					}
				});

				self.registerXHR(xhrRequest);
				xhrRequest.done(function (data, textStatus, jqXHR) {
					self.unregisterXHR(jqXHR);
				}).fail(function (jqXHR) {
					self.unregisterXHR(jqXHR);
				});

				if (loading) {
					// If we don't receive an awnser after 1.5 second, a loading overlay will appear
					this._loadingTimeout = setTimeout(function () {
						self._showLoading();
					}, this._loadingDelay);
				}

				return xhrRequest;
			}
		}, {
			key: 'post',
			value: function post(view, cmd, paramsString, postString, callback, loading, errorCallback, button) {
				var self = this;

				if (button) $(button).prop('disabled', true);

				if (paramsString.length > 0) {
					if (paramsString[0] != '&') {
						paramsString = '&' + paramsString;
					}
				}

				var xhrRequest = $.ajax({
					url: 'index.php?k=' + self.SESSION_KEY + '&view=' + view + '&cmd=' + cmd + paramsString,
					type: 'POST',
					data: postString,
					dataType: 'json',
					headers: self.getXSRFHeaders(),
					success: function success(response) {
						if (loading) {
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
								$.app.showError(data.message);
							} else {
								$.app.showError();
							}
						} else if (typeof callback == 'function') {
							callback(data);
						}
					},
					error: function error(jqXHR, status, _error8) {
						self.hideOverlay();
						self._hideLoading();

						if (button) {
							$(button).prop('disabled', false);
						}

						if (!$.app.validateXHR(jqXHR)) {
							return false;
						}

						if (this.debug) {
							console.debug('AJAX query error');
							console.debug(status);
							console.debug(_error8);
						}

						if (typeof errorCallback == 'function') errorCallback();else $.app.showError();
					},
					ajaxStop: function ajaxStop() {
						self.ajaxQueryLoading = false;
					}
				});

				self.registerXHR(xhrRequest);
				xhrRequest.done(function (data, textStatus, jqXHR) {
					self.unregisterXHR(jqXHR);
				}).fail(function (jqXHR) {
					self.unregisterXHR(jqXHR);
				});

				if (loading) {
					// If we don't receive an awnser after 1.5 second, a loading overlay will appear
					this._loadingTimeout = setTimeout(function () {
						self._showLoading();
					}, this._loadingDelay);
				}

				return xhrRequest;
			}
		}, {
			key: 'datepicker',
			value: function datepicker(selector, options) {
				return $(selector).bind('change', function () {
					this.value = $.app.date.format(this.value, 'input');
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
				return navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/Pre/i) || navigator.userAgent.match(/Android/i);
			}

			/**
	   * Download a file using an iframe
	   */

		}, {
			key: 'downloadFile',
			value: function downloadFile(url) {
				var t = this;

				if (!t._iPad) {
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
					var content = '<h2>' + $.app._('DOWNLOAD_FILE_DIALOG_TITLE') + '</h2>\
				<div class="header_line"></div>\
				<a id="hook_download_file" href="javascript:void(0);">' + t._('DOWNLOAD_FILE') + '</a>\
				<br /><br />';

					$.app.showModalDialog(content, 'normal', function () {
						$('#hook_download_file').click(function () {
							window.open(url, '_blank');
							$.app.hideModalDialog('fast');
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

		return BaseApplication;
	}(_events2.default);

	exports.default = BaseApplication;

/***/ },
/* 6 */
/***/ function(module, exports) {

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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseApplication = __webpack_require__(5);

	var _BaseApplication2 = _interopRequireDefault(_BaseApplication);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var View = function () {
		function View() {
			_classCallCheck(this, View);

			this._view = '';
			this._id = false;
			this._uri_params = {};
			this._redrawn = false;
		}

		_createClass(View, [{
			key: 'changed',
			value: function changed(element) {}
		}, {
			key: 'parseHash',
			value: function parseHash(hash) {
				var uri = $.app.parseHash(hash);

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

				this._controls = {};

				this._init(hash);
			}
		}, {
			key: '_init',
			value: function _init() {
				if ($.app.debug) {
					$.app._throw('View does not implement _init function');
				}
			}
		}, {
			key: 'load',
			value: function load(params) {
				$.app.performUnmounts();
				this._load(params);
			}
		}, {
			key: '_load',
			value: function _load(params) {
				this.params = params;
			}
		}, {
			key: 'draw',
			value: function draw(html) {
				$.app.performUnmounts();
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

						if ($.app.debug) {
							console.debug('Redrawing content');
						}

						this._onDraw(true);

						return;
					}
				}

				this._redrawn = false;

				if ($.app.debug) {
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
				var t = this;
				if (!t._redrawn) {
					if ($.app.debug) {
						console.debug('Hooking view');
					}

					this._hook(hash);

					t.updateReturnToParentView();
				}
			}
		}, {
			key: '_hook',
			value: function _hook(hash) {
				if ($.app.debug) {
					$.app._throw('View does not implement _hook function');
				}
			}
		}, {
			key: 'inject',
			value: function inject(model) {
				if ($.app.debug) {
					console.debug('Injecting model');
				}

				this._inject(model);
			}
		}, {
			key: '_inject',
			value: function _inject(model) {
				if ($.app.debug) {
					$.app._throw('View does not implement _inject function');
				}
			}
		}, {
			key: 'close',
			value: function close(callback) {
				var canClose = this._canClose();

				if (!canClose) {
					this._onCancelClose();
				} else {
					this._onClose();
				}
				if (typeof callback === 'function') {
					callback();
				}

				return canClose;
			}
		}, {
			key: '_canClose',
			value: function _canClose() {
				return true;
			}
		}, {
			key: '_onCancelClose',
			value: function _onCancelClose() {
				if ($.app.debug) {
					$.app._throw('View does not implement _onCancelClose function');
				}
			}
		}, {
			key: '_onClose',
			value: function _onClose() {}
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
				var t = this;
				if (t._uri_params.parent_view === undefined) {
					return false;
				}
				if (t._uri_params.parent_view === '') {
					return t._uri_params.parent_view;
				}

				var views = t._uri_params.parent_view.split('|');
				return decodeURIComponent(views.pop());
			}
		}, {
			key: 'updateReturnToParentView',
			value: function updateReturnToParentView() {
				var t = this;
				var parent_view = t.getParentView();
				if (parent_view) {
					var translate_key = 'BACK_TO_' + parent_view.toUpperCase().split('/').splice(0, 2).join('_');
					var label = $.app._(translate_key);
					$('.hook_back_to_parent_view').text(label);
				}
			}
		}]);

		return View;
	}();

	exports.default = View;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _BaseApplication = __webpack_require__(5);

	var _BaseApplication2 = _interopRequireDefault(_BaseApplication);

	var _View2 = __webpack_require__(7);

	var _View3 = _interopRequireDefault(_View2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var EditView = function (_View) {
		_inherits(EditView, _View);

		function EditView() {
			_classCallCheck(this, EditView);

			var _this = _possibleConstructorReturn(this, (EditView.__proto__ || Object.getPrototypeOf(EditView)).call(this));

			_this._can_save = true;
			_this._modified = false;
			_this._soft_modified = false;
			_this._wasClosing = false;
			_this._validateSteps = [];
			return _this;
		}

		_createClass(EditView, [{
			key: 'init',
			value: function init(hash) {
				_get(EditView.prototype.__proto__ || Object.getPrototypeOf(EditView.prototype), 'init', this).call(this, hash);
				this._wasClosing = false;
			}
		}, {
			key: 'changed',
			value: function changed(element) {
				if ($.app.debug) {
					console.debug('changed');
				}
				if (!this._modified) {
					this._modified = true;
				}
			}
		}, {
			key: 'softModified',
			value: function softModified() {
				if ($.app.debug) {
					console.debug('soft modified');
				}
				if (!this._soft_modified) {
					this._soft_modified = true;
				}
			}
		}, {
			key: 'hook',
			value: function hook(hash) {
				var _this2 = this;

				if (!this._redrawn) {
					(function () {
						if ($.app.debug) {
							console.debug('Hooking view');
						}

						var t = _this2;

						$('#content form').on('change', ':input[name]:not(.no-form-change)', function () {
							t.changed(this);
						});
						$('#content form').on('keypress', ':input[type=text]:not(.no-form-change),:input[type=password]:not(.no-form-change)', function () {
							t.changed(this);
						});
						$('.number:not(.positive)').number();
						$('.number.positive').number({ positive: true });

						_this2._hook(hash);

						t.updateReturnToParentView();

						// Prevent IE to prompt that a change occured when clicking on a link with href=javascript:
						if (navigator.appName === 'Microsoft Internet Explorer') {
							$(window).data('beforeunload', window.onbeforeunload);
							$(document).on('mouseenter', 'a[href^="javascript:"]', function () {
								window.onbeforeunload = null;
							}).on('mouseleave', 'a[href^="javascript:"]', function () {
								window.onbeforeunload = $(window).data('beforeunload');
							});
						}

						window.onbeforeunload = function (e) {
							$.app._beforeUnload(e);
							if (t._modified) {
								return $.app._('SAVE_CHANGES_MESSAGE');
							}
						};
					})();
				}
			}
		}, {
			key: 'inject',
			value: function inject(model) {
				if ($.app.debug) {
					console.debug('Injecting model');
				}

				this._soft_modified = false;

				this._inject(model);

				this._modified = false;
			}
		}, {
			key: 'close',
			value: function close(callback) {
				$('#edit_form').off('**');
				if (this._modified && this._can_save) {
					this._wasClosing = true;

					this.showSaveDialog(callback);

					return false;
				}

				return _View3.default.prototype.close.call(this, callback);
			}
		}, {
			key: 'getSaveChangeDialogHtml',
			value: function getSaveChangeDialogHtml() {
				return '<div class="modal-dialog">' + '<h2>' + $.app._('SAVE_CHANGES_TITLE') + '</h2>' + '<p>' + $.app._('SAVE_CHANGES_MESSAGE') + '</p>' + '<p class="submit">' + '<a href="javascript:void(0);" id="hook_cancel_save_changes">' + $.app._('CANCEL') + '</a>' + '<input type="submit" id="hook_do_not_save_changes" value="' + $.app._('NO') + '" />' + '<input type="submit" id="hook_do_save_changes" value="' + $.app._('YES') + '" />' + '</p>' + '</div>';
			}
		}, {
			key: 'showSaveDialog',
			value: function showSaveDialog(callback) {
				var self = this;
				if (typeof callback !== 'function') {
					callback = function callback() {};
				}
				$.app.showModalDialog(self.getSaveChangeDialogHtml(), 'normal', function () {
					$('#hook_do_save_changes').safeClick(function () {
						$.app.hideModalDialog('normal', function () {
							self.save(false, function () {
								callback('save');
								self.resume();
							}, false, true, function () {
								self.stop();
								callback('cancel');
							});
						});
					});

					$('#hook_do_not_save_changes').safeClick(function () {
						$.app.hideModalDialog('normal', function () {
							window.onbeforeunload = function (e) {
								return $.app._beforeUnload(e);
							};

							if (!self._canClose()) {
								self._onCancelClose();

								self.stop();
								callback('cancel');
							} else {
								self._modified = false; // We don't care about changes.
								self.resume();
								callback('resume');
							}
						});
					});

					$('#hook_cancel_save_changes').safeClick(function () {
						$.app.hideModalDialog('normal', function () {
							self.stop();
							callback('cancel');
						});
					});
				});
			}

			/**
	   * Save the form
	   * @param hash Goto Hash after save
	   * @param success_callback (data: {}, saved: int) => void
	   *  Called after saving or when there is nothing to save.
	   *  data: Actual saved data
	   *  saved: true is the form was saved.  false if it was not modified or has nothing to save
	   * @param error_callback Called on error
	   * @param stay After save, stay on same page
	   * @param cancel_callback Called when save aborted due to validation
	   */

		}, {
			key: 'save',
			value: function save(hash, success_callback, error_callback, stay, cancel_callback) {

				var self = this;

				// Shift parameters
				if (typeof hash == 'function') {
					if (typeof stay == 'function') {
						cancel_callback = stay;
					}
					stay = error_callback;
					if (typeof success_callback == 'function') {
						error_callback = success_callback;
					}
					success_callback = hash;
					hash = false;
				}

				// Form is closing.
				if (this._wasClosing) {

					// Abort operation if form is not allowed to close
					if (!this._canClose()) {
						this._onCancelClose();
						return;
					}

					// Should always redirect to close target after save.
					hash = $.app.getResumeHash();
				}

				// When form is not allowed to save or not modified. Just redirect to hash
				if (!this._can_save || !this._modified && !this._soft_modified) {
					if (typeof success_callback == 'function') {
						success_callback({}, false);
					}
					this._saveRedirect(hash, stay);
					return;
				}

				// Validate form and save if valid
				Promise.resolve(this.validate()).then(function (result) {
					if (!result) {
						if (typeof cancel_callback == 'function') {
							cancel_callback();
						}

						return;
					}

					self._doSave(hash, success_callback, error_callback, stay);
				});
			}

			/**
	   * Actual saving method after all validations
	   */

		}, {
			key: '_doSave',
			value: function _doSave(hash, success_callback, error_callback, stay, cancel_callback) {
				var self = this;

				this._onSaveStart();

				$('input[type=submit],input[type=button]').prop('disabled', true);

				$.app.showOverlay();

				var params = this._onSave();

				window.onbeforeunload = function (e) {
					return $.app._beforeUnload(e);
				};

				$.ajax({
					url: 'index.php?k=' + $.app.SESSION_KEY + '&view=' + this._view + '&cmd=save&id=' + this._id + params,
					type: 'POST',
					data: this._saveBuildPost(),
					dataType: 'json',
					headers: $.app.getXSRFHeaders(),
					success: function success(data) {

						if (!data) {
							data = {};
						}

						$.app.hideOverlay();
						$('input[type=submit],input[type=button]').prop('disabled', false);

						var validationErrors = data.validation_errors;
						if (validationErrors === undefined) {
							validationErrors = data.data ? data.data.validation_errors : validationErrors;
						}
						if (validationErrors && validationErrors.length) {
							$.each(validationErrors, function (i, err) {
								$('#' + err.field).hintError(err.message);
							});

							if (typeof cancel_callback == 'function') {
								cancel_callback();
							}
							return;
						}

						if (data.status == 'error') {
							if ($.app.debug) {
								console.debug('Save failed with error : ' + data.message);
							}

							if (typeof error_callback == 'function') {
								error_callback(data);
								error_callback = null;
							} else {
								$.app.showError($.app._('SAVE_ERROR_OCCURED'));
							}

							return;
						}

						self._modified = false;

						self._afterSave();
						if (typeof success_callback == 'function') {
							success_callback(data, true);
							success_callback = null;
						}

						self._saveRedirect(hash, stay);
					},
					error: function error(jqXHR, status, _error) {
						self._saveErrorHandler(jqXHR, status, _error, error_callback);
					}
				});
			}
		}, {
			key: '_saveRedirect',
			value: function _saveRedirect(hash, stay) {
				if (stay) {
					return;
				}

				this._onClose();

				if (typeof hash === 'string') {
					$.app.goTo(hash);
				} else {
					$.app.goBack();
				}
			}
		}, {
			key: '_saveErrorHandler',
			value: function _saveErrorHandler(jqXHR, status, error, error_callback) {

				$.app.hideOverlay();
				$('input[type=submit]').prop('disabled', false);

				if (!$.app.validateXHR(jqXHR)) {
					return false;
				}

				if (typeof error_callback == 'function') {
					error_callback(false);
					error_callback = null;
				} else {
					$.app.showError($.app._('SAVE_ERROR_OCCURED'));
				}
			}
		}, {
			key: '_saveBuildPost',
			value: function _saveBuildPost() {
				return '&model=' + encodeURIComponent($.toJSON(this.createModel()));
			}
		}, {
			key: 'validate',
			value: function validate() {
				// Return false as soon as a step return false. Do validation one step at a time.
				return this._validateSteps.reduce(function (previousStepPromise, stepFunction) {
					return previousStepPromise.then(function (previousStepResult) {
						if (!previousStepResult) {
							// Form is invalid
							return false;
						}

						// Run next step of validation
						return stepFunction();
					});
				}, Promise.resolve(true));
			}

			/**
	   * Add a validation step
	   * fn should be a function returning promise for a boolean or a boolean indicating validation success.
	   */

		}, {
			key: 'addValidateStep',
			value: function addValidateStep(fn) {
				this._validateSteps.push(fn);
			}
		}, {
			key: '_onSaveStart',
			value: function _onSaveStart() {}
		}, {
			key: '_onSave',
			value: function _onSave() {
				return '';
			}
		}, {
			key: '_afterSave',
			value: function _afterSave() {}
		}, {
			key: '_onClose',
			value: function _onClose() {}
		}, {
			key: 'createModel',
			value: function createModel() {
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
						model[element.name] = $.app.parseFloat(value.replace("%", ""));
					} else if ($(element).hasClass('number')) {
						model[element.name] = $.app.parseFloat(value);
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
			key: '_getRedirectionView',
			value: function _getRedirectionView(module, id) {
				return (module || '') + '/View/' + (id || '');
			}
		}, {
			key: 'alternateCreateModel',
			value: function alternateCreateModel(model) {
				var alternateModel = {};

				var replaceBracket = function replaceBracket(t) {
					return t.replace(']', '');
				};

				var reduceFunc = function reduceFunc(previous, current) {
					var n = {};
					n[current] = previous;
					return n;
				};

				for (var key in model) {
					if (model.hasOwnProperty(key)) {
						var path = key.split('[').map(replaceBracket);
						var element = path.reduceRight(reduceFunc, model[key]);
						$.extend(true, alternateModel, element);
					}
				}

				return alternateModel;
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
		}, {
			key: 'cancel',
			value: function cancel(hash) {
				this._modified = false;
				$('input[type=submit],input[type=button]').prop('disabled', false);
				$.app.goBack(hash);
			}
		}, {
			key: 'cancelTo',
			value: function cancelTo(hash) {
				this._modified = false;
				$('input[type=submit],input[type=button]').prop('disabled', false);
				hash = hash || '';
				$.app.navigateBackTo(hash);
			}
		}, {
			key: 'resume',
			value: function resume() {
				$.app.resume(false);
			}
		}, {
			key: 'stop',
			value: function stop() {
				$.app.resume(true);
			}
		}]);

		return EditView;
	}(_View3.default);

	exports.default = EditView;

/***/ }
/******/ ]);