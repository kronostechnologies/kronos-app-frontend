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

	var BaseApplication = __webpack_require__(1);
	var View = __webpack_require__(2);
	var EditView = __webpack_require__(3);

	module.exports = {
		BaseApplication: BaseApplication,
		View: View,
		EditView: EditView
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

	var EventEmitter = function () {
		function EventEmitter() {
			_classCallCheck(this, EventEmitter);
		}

		_createClass(EventEmitter, [{
			key: '_JQInit',
			value: function _JQInit() {
				this._JQ = jQuery(this);
			}
		}, {
			key: 'emit',
			value: function emit(evt, data) {
				if (!this._JQ) {
					this._JQInit();
				}
				this._JQ.trigger(evt, data);
			}
		}, {
			key: 'once',
			value: function once(evt, handler) {
				if (!this._JQ) {
					this._JQInit();
				}
				this._JQ.one(evt, handler);
			}
		}, {
			key: 'on',
			value: function on(evt, handler) {
				if (!this._JQ) {
					this._JQInit();
				}
				this._JQ.bind(evt, handler);
			}
		}, {
			key: 'off',
			value: function off(evt, handler) {
				if (!this._JQ) {
					this._JQInit();
				}
				this._JQ.unbind(evt, handler);
			}
		}]);

		return EventEmitter;
	}();

	var BaseApplication = function () {
		function BaseApplication() {
			_classCallCheck(this, BaseApplication);

			// Debugging and error handling
			this.view_fetching = false; // Indiacte that the app is currently waiting on an ajax query that is fetching a view.
			this.debug = false;
			this.sendErrors = false;
			this.sendErrorsOnUnload = false;
			this.silent = false;
			this.trace_retirement = false;
			this._errors = [];
			this.ajaxQueryLoading = false;
			this.pingInterval = false; // If this is defined in a child object; a timer will be fired every "pingInterval"ms with a ping command via get.
			this.messages = false;

			// Application configurations
			this.JS_PATH = '/';
			this.IMG_PATH = '/';
			this.VIRTUALPATH = '/';
			this.SESSION_KEY = false;

			// Hash management
			this._is_observing_hash = false;
			this._hash_changed_while_not_observing = true;
			this.hash = false;
			this._resume_hash = '';
			this._history = [];

			// User related informations
			this.userName = '';
			this.cpanelUserName = '';
			this.userVersion = 0;
			this.menus = false;
			this.views = false;
			this.default_view = '';
			this.default_goal_death = '';
			this.default_goal_disability = '';
			this.fna_expiration = 365;

			// View
			this.currentView = false;
			this._view_cache = {};
			this._loadingDelay = 3000;
			this._loadingTimeout = 0;
			this._view_objects = {};

			// Languages
			this._messages = {};

			// Validations
			this.emailRegex = /^[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~]+(?:\.[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/;
			this.currencyRegex = /^[0-9.,\s]+$/;
			this.percentageRegex = /^[0-9.,]+$/;

			// List of all ongoing ajax requests. Allow abort on view change.
			this._ongoing_xhrs = [];
			this.eventEmitter = new EventEmitter();
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

				this.sprintf = this._sprintfWrapper.init;

				Date.prototype.getDayOfYear = function () {
					var onejan = new Date(this.getFullYear(), 0, 1);
					return Math.ceil((this - onejan) / 86400000);
				};

				Date.prototype.getDaysInYear = function () {
					var firstdate = new Date(this.getFullYear(), 0, 1);
					var lastdate = new Date(this.getFullYear(), 11, 31);
					return Math.ceil((lastdate - firstdate) / 86400000 + 1);
				};

				// Extends jquery
				jQuery.fn.extend({
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
				});

				String.prototype.htmlEntity = function () {
					return $.app.htmlEntity(this.toString());
				};

				String.prototype.nl2br = function () {
					return this.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br />$2');
				};

				$('#hook_confidentiality_policy,#hook_usage_policy').safeClick(function () {
					$.app.showMessage($(this).text(), $.app._('AVAILABLE_SOON'));
				});

				$.ajaxSetup({
					beforeSend: function beforeSend(xhr) {
						if (!this.crossDomain) {
							var headers = $.app.getXSRFHeaders();
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
		}]);

		return BaseApplication;
	}();

	exports.default = BaseApplication;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseApplication = __webpack_require__(1);

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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _BaseApplication = __webpack_require__(1);

	var _BaseApplication2 = _interopRequireDefault(_BaseApplication);

	var _View2 = __webpack_require__(2);

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
				if ($.app.debug) console.debug('soft modified');
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
				var t = this;
				if (typeof callback !== 'function') {
					callback = function callback() {};
				}
				$.app.showModalDialog(t.getSaveChangeDialogHtml(), 'normal', function () {
					$('#hook_do_save_changes').safeClick(function () {
						$.app.hideModalDialog('normal', function () {
							var saved = t.save(false, function () {
								callback('save');
								t.resume();
							}, false, true);

							if (!saved) {
								t.stop();
								callback('cancel');
							}
						});
					});

					$('#hook_do_not_save_changes').safeClick(function () {
						$.app.hideModalDialog('normal', function () {
							window.onbeforeunload = function (e) {
								return $.app._beforeUnload(e);
							};

							if (!t._canClose()) {
								t._onCancelClose();

								t.stop();
								callback('cancel');
							} else {
								t._modified = false; // We don't care about changes.
								t.resume();
								callback('resume');
							}
						});
					});

					$('#hook_cancel_save_changes').safeClick(function () {
						$.app.hideModalDialog('normal', function () {
							t.stop();
							callback('cancel');
						});
					});
				});
			}
		}, {
			key: 'save',
			value: function save(hash, success_callback, error_callback, stay) {
				if (!this.validate()) {
					this._onValidateFail();
					return false;
				}

				if (!this._can_save) {
					return this._saveRedirect(hash, stay);
				}

				if (!this._canSave()) {
					this._onCancelSave();
					return false;
				}

				if (this._wasClosing) {
					if (!this._canClose()) {
						this._onCancelClose();

						return false;
					}
				}

				if (typeof hash === 'function') {
					stay = error_callback;
					if (typeof success_callback === 'function') {
						error_callback = success_callback;
					}
					success_callback = hash;
					hash = false;
				}

				if (this._wasClosing) {
					hash = $.app.getResumeHash();
				}

				if (!this._modified && !this._soft_modified) {
					if (typeof success_callback === 'function') {
						success_callback({}, false);
						success_callback = null;
					}

					this._saveRedirect(hash, stay);

					return true;
				}

				this._onSaveStart();

				$('input[type=submit],input[type=button]').prop('disabled', true);

				var t = this;

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
						if (!data) data = {};

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

							return;
						}

						if (data.status === 'error') {
							if ($.app.debug) {
								console.debug('Save failed with error : ' + data.message);
							}

							if (typeof error_callback === 'function') {
								error_callback(data);
								error_callback = null;
							} else {
								$.app.showError($.app._('SAVE_ERROR_OCCURED'));
							}

							return;
						}

						t._modified = false;

						t._afterSave();
						if (typeof success_callback === 'function') {
							success_callback(data, true);
							success_callback = null;
						}

						t._saveRedirect(hash, stay);
					},
					error: function error(jqXHR, status, _error) {
						t._saveErrorHandler(jqXHR, status, _error, error_callback);
					}
				});

				return true;
			}

			// _saveSomething methods : save helper functions

		}, {
			key: '_saveRedirect',
			value: function _saveRedirect(hash, stay) {
				if (stay) return;

				this._onClose();
				if (typeof hash === 'string') $.app.goTo(hash);else $.app.goBack();
			}
		}, {
			key: '_saveErrorHandler',
			value: function _saveErrorHandler(jqXHR, status, error, error_callback) {
				$.app.hideOverlay();
				$('input[type=submit]').prop('disabled', false);

				if (!$.app.validateXHR(jqXHR)) {
					return;
				}

				if (typeof error_callback === 'function') {
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
				return true;
			}
		}, {
			key: '_onValidateFail',
			value: function _onValidateFail() {}
		}, {
			key: '_onSaveStart',
			value: function _onSaveStart() {}
		}, {
			key: '_canSave',
			value: function _canSave() {
				if ($.app.debug) {
					$.app._throw('View does not implement _canSave function');
				}
				return true;
			}
		}, {
			key: '_onCancelSave',
			value: function _onCancelSave() {}
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

				$('form input[name],select[name],textarea[name]').each(function (index, element) {
					var value = $(element).val();

					if (element.type === 'radio' || element.type === 'checkbox') {
						if (element.checked) {
							if (value === 'on') {
								model[element.name] = 'YES';
							} else {
								model[element.name] = value;
							}
						}
					} else if ($(element).hasClass('money')) {
						model[element.name] = $(element).moneyVal();
					} else if ($(element).hasClass('percent')) {
						model[element.name] = $.app.parseFloat(value.replace('%', ''));
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
				if ((typeof model === 'undefined' ? 'undefined' : _typeof(model)) === 'object') {
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