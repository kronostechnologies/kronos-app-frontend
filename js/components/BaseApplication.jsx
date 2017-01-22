// @flow

declare var jQuery: Object;
declare var $: Object;
declare var Raven: Object;


class EventEmitter {

	_JQInit() {
		this._JQ = jQuery(this);
	}

	emit(evt, data) {
		if (!this._JQ) {
			this._JQInit();
		}
		this._JQ.trigger(evt, data);
	}

	once(evt, handler) {
		if (!this._JQ) {
			this._JQInit();
		}
		this._JQ.one(evt, handler);
	}

	on(evt, handler) {
		if (!this._JQ) {
			this._JQInit();
		}
		this._JQ.bind(evt, handler);
	}

	off(evt, handler) {
		if (!this._JQ) {
			this._JQInit();
		}
		this._JQ.unbind(evt, handler);
	}

}


export default class BaseApplication {

	constructor() {
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
	init() {
		const self = this;
		// Debug functions catcher
		if (!window.console || !window.console.firebug) {
			if (!window.console) {
				window.console = {
					log() {
					},
					debug() {
					}
				};
			} else if (!window.console.debug) {
				window.console.debug = function (info) {
					window.console.log(info);
				};
			}
		}

		$(document).ajaxStart(() => {
			self.ajaxQueryLoading = true;
		});
		$(document).ajaxStop(() => {
			self.ajaxQueryLoading = false;
		});

		// if the ping interval is defined, we had the ping query interval to the document.
		if (this.pingInterval) {
			// Ping interval
			setInterval(() => {
				if (!self.ajaxQueryLoading) {
					self.get('CPanel/View', 'ping', '', () => {
						console.debug('session is still alive');
					}, false, () => {
						console.debug('got an error while doing a ping ?');
					});
				}
			},
				this.pingInterval);
		}

		this._iPad = (navigator.userAgent.match(/iPad/) === 'iPad');
		this._iPod = (navigator.userAgent.match(/iPod/) === 'iPod');
		this._iPhone = (navigator.userAgent.match(/iPhone/) === 'iPhone');
		this._blackberry = (navigator.userAgent.match('/BlackBerry/') === 'BlackBerry' && $.browser.webkit);
		this._palm_pre = (navigator.userAgent.match('/webOS/') === 'webOS' && $.browser.webkit);
		this._mobile = (this._iPad || this._iPod || this._iPhone || this._blackberry || this._palm_pre);
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
			const onejan = new Date(this.getFullYear(), 0, 1);
			return Math.ceil((this - onejan) / 86400000);
		};

		Date.prototype.getDaysInYear = function () {
			const firstdate = new Date(this.getFullYear(), 0, 1);
			const lastdate = new Date(this.getFullYear(), 11, 31);
			return Math.ceil((lastdate - firstdate) / 86400000 + 1);
		};

		// Extends jquery
		jQuery.fn.extend({
			alternateText(value, alternate_value) {
				this.text(value && value !== '' ? value : alternate_value);

				return this;
			},

			numberText(value) {
				const text = self.formatNumber(value);
				this.text(text === '' ? '0' : text);

				return this;
			},

			moneyText(value) {
				this.text(self.formatMoney(value));

				return this;
			},

			dateText(value) {
				this.text(self.date.format(value));

				return this;
			},

			durationVal(months_duration) {
				let text;
				if (!isFinite(months_duration)) {
					text = '';
				} else {
					const sign = (months_duration < 0 ? '-' : '');
					const years = Math.floor(Math.abs(months_duration) / 12);
					const months = Math.abs(months_duration) - 12 * years;
					text = sign + (years === 0 ? '' : (years === 1 ? $.app._('YEARD').replace('%{years}', years) : $.app._('YEARSD').replace('%{years}', years)) + ' ') +
						(months === 0 ? '' : (months === 1 ? $.app._('MONTHD').replace('%{months}', months) : $.app._('MONTHSD').replace('%{months}', months)));
				}
				this.val(text);

				return this;
			},

			booleanText(value) {
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

			dateVal(value) {
				this.val(self.date.format(value, 'input'));

				return this;
			},

			safeClick(fn) {
				this.click(function (eventObject) {
					if (!this.__clicked) {
						this.__clicked = true;

						fn.call(this, eventObject);

						const t = this;
						setTimeout(() => {
							t.__clicked = false;
						}, 500);
					} else if ($.app.debug) {
						console.debug('catched double click');
					}
				});

				return this;
			},

			numberVal(value, opts) {
				if (arguments.length > 0) {
					return $(this).val(self.formatNumber(value, opts));
				}

				const val = $.app.parseFloat(this.val());

				if ($(this).hasClass('positive') && $(this).hasClass('number')) {
					if (val < 0) {
						return 0;
					}

					return val;
				}

				return val;
			},

			number(opts) {
				return $(this).each(function () {
					$(this).addClass('number');
					$(this).val($.app.formatNumber($(this).val(), opts));

					$(this).blur(function () {
						$(this).val($.app.formatNumber($(this).val(), opts));
					});
				});
			},

			moneyVal(value, opts) {
				if (arguments.length > 0) {
					if ($(this).hasClass('money')) {
						$(this).data('val', $.app.parseFloat(value.replace('$', '')));
						return $(this).val(self.formatMoney(value, opts));
					}

					return $(this).val(self.formatMoney(value, opts));
				} else if ($(this).hasClass('money')) {
					const val = $(this).data('val');

					if ($(this).hasClass('positive') && val < 0) {
						return 0;
					}

					return val;
				}

				return $.app.parseFloat($(this).val().replace('$', ''));
			},

			money(opts) {
				return $(this).each(function () {
					const $t = $(this);
					$t.addClass('money');

					$t.focus(function () {
						$(this).val($(this).data('val'));
						return this;
					});
					$(this).click(function () {
						$(this).select();
					});
					$(this).blur(function () {
						let val;
						const value = $(this).val();
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

			percentVal(value, opts) {
				if (arguments.length > 0) {
					return $(this).val(self.formatPercent(value, opts));
				}

				const val = $.app.parseFloat(this.val().replace('%', ''));

				if ($(this).hasClass('positive') && $(this).hasClass('percent')) {
					if (val < 0) {
						return 0;
					}

					return val;
				}

				return val;
			},

			percent(opts) {
				return $(this).each(function () {
					$(this).addClass('percent');
					$(this).val($.app.formatPercent($(this).val(), opts));

					$(this).blur(function () {
						$(this).val($.app.formatPercent($(this).val(), opts));
					});
				});
			},

			SIN() {
				return $(this).each(function () {
					$(this).val($.app.formatSIN($(this).val()));

					$(this).blur(function () {
						this.value = $.app.formatSIN($(this).val());
					});
				});
			},

			datepickerInput(interval) {
				return $(this).each(function () {
					const $this = $(this);
					let $calendar_button = $this.next('.btn.calendar');
					if ($this.next('.btn.calendar').length === 0) {
						$calendar_button = $('<a href="javascript:void(0);" class="btn calendar" tabindex=-1><span class="icon"></span></a>');
					}
					$this.after($calendar_button);

					if ($.browser.msie) {
						$this.before($('<div class="clear"></div>'));
					}

					if ($this.width()) {
						$this.css('width', '-=' + $calendar_button.outerWidth(true))
							.attr('autocomplete', 'off');
					}

					// init datepicker
					if (typeof interval !== 'undefined') {
						const config = $.extend(
							{
								dateFormat: 'yy-mm-dd',
								onClose(value) {
									try {
										const parsed_date = $.datepicker.parseDate('yymmdd', value);
										$(this).val($.datepicker.formatDate('yy-mm-dd', parsed_date));
									} catch (e) {
										$(this).val(value);
									}
								}
							},
							interval
						);
						$this.datepicker(config);
					} else {
						$this.datepicker({
							dateFormat: 'yy-mm-dd',
							onClose(value) {
								try {
									const parsed_date = $.datepicker.parseDate('yymmdd', value);
									$(this).val($.datepicker.formatDate('yy-mm-dd', parsed_date));
								} catch (e) {
									$(this).val(value);
								}
							}
						});
					}

					// bind custom button attached to the input
					$calendar_button.bind('click', (e) => {
						e.preventDefault();
						if ($this.datepicker('widget').is(':hidden')) {
							$this.datepicker('show');
						}
					});
				});
			},

			hint(text, width) {
				const w = Math.max(parseInt(width, 10), 200);

				return $(this)
					.wrap('<span class="hinted"></span>')
					.after('<span class="hint" style="width: ' + w + 'px; right: -' + (w + 50) + 'px;">' + text + '<span class="hint-pointer sprite">&nbsp;</span></span>')
					.focus(function () {
						const t = this;
						t._focus_timeout = setTimeout(() => {
							$(t).next('.hint').fadeIn();
						}, 1000);
					})
					.blur(function () {
						if (this._focus_timeout) {
							clearTimeout(this._focus_timeout);
						}

						$(this).next('.hint').fadeOut();
					})
					.keypress(function () {
						if (this._focus_timeout) {
							clearTimeout(this._focus_timeout);
						}

						$(this).next('.hint').fadeOut();
					});
			},

			unhint() {
				if ($(this).parent().hasClass('hinted')) {
					$(this).next('.hint').remove();
					$(this).unwrap();
				} else if ($(this).parent().find('.hinted')) {
					$(this).next('.hint').remove();
				}

				return this;
			},

			hintError(text, width, dont_show) {
				let blurFocusTarget;
				let $this = $(this);

				if ($this.combobox && $this.combobox('instance') !== undefined) {
					$this = $this.combobox('instance').input;
					$this.data('isCombobox', true);
				}

				let target = $this;

				if (target.data('blur-field')) {
					blurFocusTarget = $('#' + target.data('blur-field'));
				} else {
					blurFocusTarget = target;
				}
				const hintedWrapperClasses = ['hinted'];

				if ($this.data('is-textbox')) {
					if ($this.next().is('.hinted')) {
						target = $this.next().find('.textboxlist');
					} else {
						target = $this.next('.textboxlist');
					}
					target.find('.textboxlist-bit-box-deletable').blur(() => {
						target.next('.hint').fadeOut();
					})
						.focus(() => {
							target.next('.hint').fadeIn();
						})
						.change(() => {
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

				blurFocusTarget.blur(() => {
					target.next('.hint').fadeOut();
				})
					.focus(() => {
						target.next('.hint').fadeIn();
					})
					.change(() => {
						$(target).handleHintErrorChange();
					});

				target.data('hint', target.next('.hint'));
				target.setHintErrorWidth(width);
				target.setHintErrorPosition();

				if (target.data('extra-hint-classes')) {
					target.parents('.hinted').addClass(target.data('extra-hint-classes'));
				}

				target.data('hint')
					.click(function (e) {
						e.preventDefault();
						e.stopPropagation();
						$(this).fadeOut();
					});

				if (!dont_show) {
					target.data('hint').fadeIn();
				}

				return target;
			},

			handleHintErrorChange() {
				$(this).unhint().removeClass('save_warning');
			},

			setHintErrorWidth(width) {
				const w = Math.max(parseInt(width, 10), 200);

				$(this).next('.hint').css({
					width: w
				});

				return $(this);
			},

			setHintErrorPosition() {
				const r = -(parseInt($(this).data('hint').css('width')) + 50);

				$(this).data('hint').css({
					right: r
				});

				return $(this);
			},

			signal(length) {
				length = parseInt(length);
				if (length <= 0) {
					length = 500;
				}

				return $(this).each(function () {
					$(this).addClass('signal');
					const t = this;
					setTimeout(() => {
						$(t).removeClass('signal');
					}, length);
				});
			},

			checkVal() {
				if (arguments.length > 0) {
					let checked = false;
					if (arguments[0] == 'YES' || arguments[0] === true) {
						checked = true;
					}

					this.prop('checked', checked);
					return this;
				}

				return this.val();
			},

			toggleDisabled(disabledVal, toggleClass) {
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

			getClasses() {
				const all_classes = [];
				$(this).each(function () {
					const classes = $(this).attr('class').split(' ');

					for (const k in classes) {
						let found = false;
						for (const i in all_classes) {
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
			beforeSend(xhr) {
				if (!this.crossDomain) {
					const headers = $.app.getXSRFHeaders();
					$.each(headers, (key, value) => {
						xhr.setRequestHeader(key, value);
					});
				}
			}
		});

		this._init();
	}

	_init() {
	}

	/**
	 * Configure how the application is built and how it works
	 */
	configure(config) {
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

		if (typeof config.user !== 'object') {
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
				transaction: config.kronos_transaction_id,
			});
		}

		this._configure(config);
		this.setUserConfig(config.user);

		// Find default view
		for (const k in this.views) {
			const view = this.views[k];
			if (view.default === '1') {
				this.default_view = k;
			}
		}
	}

	_configure() {
	}

	getApplicationVersion() {
		return this._application_version;
	}
}

