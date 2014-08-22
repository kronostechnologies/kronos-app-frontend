var app = {
	// Debugging and error handling
	view_fetching : false, // Indiacte that the app is currently waiting on an ajax query that is fetching a view.
	debug : false,
	sendErrors : false,
	sendErrorsOnUnload : false,
	silent : false,
	trace_retirement : false,
	_errors : [],
	ajaxQueryLoading: false,
	pingInterval: false, // If this is defined in a child object, a timer will be fired every "pingInterval"ms with a ping command via get.
	messages : false,

	// Application configurations
	JS_PATH: '/',
	IMG_PATH: '/',
	VIRTUALPATH: '/',
	SESSION_KEY: false,

	// Hash management
	hash : false,
	_resume_hash : '',
	_observerInterval : 0,
	_history : [],

	// User related informations
	userName: '',
	cpanelUserName: '',
	userVersion: 0,
	menus : false,
	views : false,
	default_view : '',
	default_goal_death : '',
	default_goal_disability : '',
	fna_expiration : 365,

	// View
	currentView : false,
	_view_cache : {},
	_loadingDelay : 3000,
	_loadingTimeout : 0,
	_view_objects : {},

	// Languages
	_messages : {},

	// Validations
	emailRegex : new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.(?:[a-zA-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)$"),

	// Google Visualization API
	_visualization_ready : false,

	/**
	 * Initialize application
	 */
	init : function() {
		var t = this;
		// Debug functions catcher
		if (!window.console || !window.console.firebug) {
			if(!window.console) {
				window.console = {
					log : function() {},
					debug : function() {}
				};
			}
			else if(!window.console.debug) {
				window.console.debug = function(info) {
					window.console.log(info);
				};
			}
		}
		
		$(document).ajaxStart(function(){t.ajaxQueryLoading = true;});
		$(document).ajaxStop(function(){t.ajaxQueryLoading = false;});
		
		// if the ping interval is defined, we had the ping query interval to the document.
		if(this.pingInterval){
			// Ping interval
			setInterval(function(){
							if(!t.ajaxQueryLoading){
								t.get('CPanel/View', 'ping', '', function() {
									console.debug('session is still alive');
								}, false, function() {
									console.debug('got an error while doing a ping ?');
								});
							}
						},
						this.pingInterval

			);
		}

		this._iPad = (navigator.userAgent.match(/iPad/) == 'iPad');
		this._iPod = (navigator.userAgent.match(/iPod/) == 'iPod');
		this._iPhone = (navigator.userAgent.match(/iPhone/) == 'iPhone');
		this._blackberry = (navigator.userAgent.match('/BlackBerry/') == 'BlackBerry' && $.browser.webkit);
		this._palm_pre = (navigator.userAgent.match('/webOS/') == 'webOS' && $.browser.webkit);
		this._mobile = (this._iPad || this._iPod || this._iPhone || this._blackberry || this._palm_pre);
		this._webkit = $.browser.webkit;
		this._opera = $.browser.opera;
		this._msie = $.browser.msie;
		this._mozilla = $.browser.mozilla;

		// Error catching function
		window.onerror = function(description, page, line) {
			return t._onError(description, page, line);
		};

		// Page change, tab closing and window closing catching function
		window.onbeforeunload = function(event) {
			return t._beforeUnload();
		};

		this.sprintf = this._sprintfWrapper.init;

		Date.prototype.getDayOfYear = function() {
			var onejan = new Date(this.getFullYear(),0,1);
			return Math.ceil((this - onejan) / 86400000);
		};

		Date.prototype.getDaysInYear = function() {
			var firstdate = new Date(this.getFullYear(),0,1);
			var lastdate = new Date(this.getFullYear(),11,31);
			return Math.ceil((lastdate - firstdate) / 86400000 + 1);
		};



		//Add custom header and handling to all ajax call to catch logout.
		$('<div></div>')
			.ajaxSend(function(e, xhr, settings, exception) {
				if(xhr && typeof xhr != "undefined" && typeof xhr.setRequestHeader == 'function' ) {
					xhr.setRequestHeader('X-Kronos-Ajax', 1);
				}
			})
			.ajaxError(function(e, xhr, settings, exception) {
				if(!$.app.validateXHR(xhr)){
					return false;
				}
			});

		//Extends jquery
		jQuery.fn.extend({
			alternateText : function(value, alternate_value){
				this.text(value && value !== "" ? value:alternate_value);

				return this;
			},

			numberText : function(value) {
				var text  = t.formatNumber(value);
				this.text(text === '' ? '0' : text);

				return this;
			},

			moneyText : function(value){
				this.text(t.formatMoney(value));

				return this;
			},

			dateText : function(value){
				this.text(t.date.format(value));

				return this;
			},
			
			durationVal : function(months_duration){
				var text;
				if (!isFinite(months_duration)) {
					text = "";
				}
				else {
					var sign = (months_duration < 0 ? '-' : '');
					var years = Math.floor(Math.abs(months_duration)/12);
					var months = Math.abs(months_duration) - 12*years;
					text = sign + (years === 0 ? '' : (years == 1 ? $.app._("YEARD").replace('%{years}', years) : $.app._("YEARSD").replace('%{years}', years)) + ' ') +
							(months === 0 ? '' : (months == 1 ? $.app._("MONTHD").replace('%{months}', months) : $.app._("MONTHSD").replace('%{months}', months)));
				}
				this.val(text);
				
				return this;
			},

			booleanText : function(value){
				if(value=="YES"){
					value = $.app._("YES");
				}
				else if(value=="NO"){
					value = $.app._("NO");
				}
				else {
					value = '-';
				}

				this.text(value);

				return this;
			},

			dateVal : function(value){
				this.val(t.date.format(value, 'input'));

				return this;
			},

			safeClick : function(fn) {
				this.click(function(eventObject) {
					if(!this.__clicked) {
						this.__clicked = true;

						fn.call(this, eventObject);

						var t = this;
						setTimeout(function() {
							t.__clicked = false;
						}, 500);
					}
					else if($.app.debug) {
						console.debug('catched double click');
					}
				});

				return this;
			},

			numberVal : function(value, opts){
				if(arguments.length > 0) {
					return $(this).val(t.formatNumber(value, opts));
				}
				else {
					var val = $.app.parseFloat(this.val());

					if($(this).hasClass('positive') && $(this).hasClass('number')) {
						if(val < 0) {
							return 0;
						}
						else {
							return val;
						}
					}
					else {
						return val;
					}
				}
			},

			number : function(opts){
				return $(this).each(function () {
					$(this).addClass('number');
					$(this).val($.app.formatNumber($(this).val(), opts));

					$(this).blur(function() {
						$(this).val($.app.formatNumber($(this).val(), opts));
					});
				});
			},

			moneyVal : function(value, opts){
				if(arguments.length > 0) {
					if ($(this).hasClass('money')) {
						$(this).data('val', $.app.parseFloat(value.replace("$", "")));
						return $(this).val(t.formatMoney(value, opts));
					}
					else {
						return $(this).val(t.formatMoney(value, opts));
					}
				}
				else {
					if ($(this).hasClass('money')) {
						var val = $(this).data('val');

						if($(this).hasClass('positive') && val < 0) {
							return 0;
						}
						else {
							return val;
						}
					}
					else {
						return $.app.parseFloat($(this).val().replace("$", ""));
					}
				}
			},

			money : function(opts){
				return $(this).each(function () {
					var $t = $(this);
					$t.addClass('money');

					$t.focus(function() {
						console.debug($(this).data('val'));
						$(this).val($(this).data('val'));
						console.debug($(this).val());
						return this;
					});
					$(this).click(function() {
						$(this).select();
					});
					$(this).blur(function() {
						var val;
						var value = $(this).val();
						if (opts && opts.canBeNull && (value === '' || value === null)){
							val = '';
						}
						else {
							val = $.app.parseFloat(value.replace("$", ""));
							if (opts && opts.true_precision) {
								if (opts.rounded) {
									val = Math.round(val * Math.pow(10, opts.true_precision))/Math.pow(10, opts.true_precision);
								}
								else {
									val = Math.floor(val * Math.pow(10, opts.true_precision))/Math.pow(10, opts.true_precision);
								}
							}
						}
						$(this).data('val', val);
						$(this).val($.app.formatMoney(val, opts));
						return this;
					});
					if($t.val() !== '') {
						$t.blur();
					}
				});
			},

			percentVal : function(value, opts){
				if(arguments.length > 0) {
					return $(this).val(t.formatPercent(value, opts));
				}
				else {
					var val = $.app.parseFloat(this.val().replace("%", ""));

					if($(this).hasClass('positive') && $(this).hasClass('percent')) {
						if(val < 0) {
							return 0;
						}
						else {
							return val;
						}
					}
					else {
						return val;
					}
				}
			},

			percent : function(opts){
				return $(this).each(function () {
					$(this).addClass('percent');
					$(this).val($.app.formatPercent($(this).val(), opts));

					$(this).blur(function() {
						$(this).val($.app.formatPercent($(this).val(), opts));
					});
				});
			},

			SIN : function(){
				return $(this).each(function () {
					$(this).val($.app.formatSIN($(this).val()));

					$(this).blur(function() {
						$(this).val($.app.formatSIN($(this).val()));
					});
				});
			},

			datepickerInput: function(interval){
				return $(this).each(function(){
					var $this = $(this);
					var $calendar_button = $this.next('.btn.calendar');
					if($this.next('.btn.calendar').length === 0){
						$calendar_button = $('<a href="javascript:void(0);" class="btn calendar" tabindex=-1><span class="icon"></span></a>');
					}
					$this.after($calendar_button);

					if($.browser.msie){
						$this.before($('<div class="clear"></div>'));
					}

					if($this.width()){
						$this.css('width', '-=' + $calendar_button.outerWidth(true))
							.attr('autocomplete', 'off');
					}

					//init datepicker
					if(typeof interval != 'undefined') {
						var config = $.extend(
							{
								dateFormat: 'yy-mm-dd', 
								onClose: function(value){
									try{
										var parsed_date = $.datepicker.parseDate('yymmdd', value);
										$(this).val($.datepicker.formatDate('yy-mm-dd', parsed_date));
									}
									catch(e){
										$(this).val(value);
									}
								}
							}, 
							interval
						);
						$this.datepicker(config);
					}
					else {
						$this.datepicker({
							dateFormat: 'yy-mm-dd',
							onClose: function(value){
								try{
									var parsed_date = $.datepicker.parseDate('yymmdd', value);
									$(this).val($.datepicker.formatDate('yy-mm-dd', parsed_date));
								}
								catch(e){
									$(this).val(value);
								}
							}
						});
					}

					// bind custom button attached to the input
					$calendar_button.bind('click', function(e){
						e.preventDefault();
						if ($this.datepicker('widget').is(':hidden')) {
							$this.datepicker("show");
						}
					});
				});
			},

			hint : function(text, width) {
				var w = Math.max(parseInt(width,10), 200);

				return $(this).wrap('<span class="hinted"></span>').after('<span class="hint" style="width: '+w+'px; right: -'+(w+50)+'px;">'+text+'<span class="hint-pointer sprite">&nbsp;</span></span>').focus(function() {
					var t = this;
					t._focus_timeout = setTimeout(function() {$(t).next('.hint').fadeIn();}, 1000);
				}).blur(function() {
					if(this._focus_timeout) {
						clearTimeout(this._focus_timeout);
					}

					$(this).next('.hint').fadeOut();
				}).keypress(function() {
					if(this._focus_timeout) {
						clearTimeout(this._focus_timeout);
					}

					$(this).next('.hint').fadeOut();
				});
			},

			unhint : function() {
				if($(this).parent().hasClass('hinted')) {
					$(this).next('.hint').remove();
					$(this).unwrap();
				}
				else if($(this).parent().find('.hinted')){
					$(this).next('.hint').remove();
				}

				return this;
			},

			hintError : function(text, width, dont_show) {
				var blurFocusTarget;
				var target = $(this);
				var t = this;
				if(target.data('blur-field')){
					blurFocusTarget = $('#'+target.data('blur-field'));
				}
				else{
					blurFocusTarget = target;
				}
				var hintedWrapperClasses = new Array('hinted');

				if($(this).data('is-textbox')) {
					if($(this).next().is('.hinted')){
						target = $(this).next().find('.textboxlist');
					}
					else {
						target = $(this).next('.textboxlist');
					}
				}

				if($(this).data('is-textbox') || target.hasClass('textboxlist'))
				{
					hintedWrapperClasses.push('contain-textbox');
					blurFocusTarget = target.find('.textboxlist-bit-editable-input');
				}
				target.unhint();
				target.addClass('save_warning');
				if(!target.data('no-hinted-span')){
					target.wrap('<span class="'+hintedWrapperClasses.join(' ')+'"></span>');
				}
				
				target.after('<span class="hint">'+text+'<span class="hint-pointer sprite">&nbsp;</span></span>');

				blurFocusTarget.blur(function(e) {
					target.next('.hint').fadeOut();
				})
				.focus(function(e) {
					target.next('.hint').fadeIn();
				}).change(function(){
					console.log($(target));
					t.handleHintErrorChange.apply(target);
				});

				target.data('hint', target.next('.hint'));
				target.setHintErrorWidth(width);
				target.setHintErrorPosition();

				if(target.data('extra-hint-classes')){
					target.parents('.hinted').addClass(target.data('extra-hint-classes'));
				}

				target.data('hint')
					.click(function(e){
						e.preventDefault();
						e.stopPropagation();
						$(this).fadeOut();
					});

				if(!dont_show){
					target.data('hint').fadeIn();
				}
				
				return target;
			},

			handleHintErrorChange : function(){
				$(this).unhint().removeClass('save_warning');
			},

			setHintErrorWidth : function(width){
				var w = Math.max(parseInt(width,10), 200);

				$(this).next('.hint').css({
					width: w
				});

				return $(this);
			},

			setHintErrorPosition : function(){
				var r = -(parseInt($(this).data('hint').css('width')) + 50);

				$(this).data('hint').css({
					right: r
				});

				return $(this);
			},

			tooltip : function(text, width) {
				var w = Math.max(parseInt(width,10), 200);

				return $(this).wrap('<span class="hinted"></span>').after('<span class="hint" style="width: '+w+'px; right: -'+(w+50)+'px;">'+text+'<span class="hint-pointer sprite">&nbsp;</span></span>').mouseenter(function() {
					$(this).next('.hint').fadeIn();
				}).mouseleave(function() {
					$(this).next('.hint').fadeOut();
				});
			},

			signal : function(length) {
				length = parseInt(length);
				if(length <= 0) {
					length = 500;
				}

				return $(this).each(function () {
					$(this).addClass('signal');
					var t = this;
					setTimeout(function() {
						$(t).removeClass('signal');
					}, length);
				});
			},

			checkVal : function() {
				if(arguments.length > 0) {
					var checked = false;
					if(arguments[0] == 'YES' || arguments[0] === true) {
						checked = true;
					}

					this.prop('checked', checked);
					return this;
				}
				else {
					return this.val();
				}
			},

			getClasses : function() {
				var all_classes = [];
				$(this).each(function() {
					var classes = $(this).attr('class').split(' ');

					for(var k in classes) {
						var found = false;
						for(var i in all_classes) {
							if(all_classes[i] == classes[k]) {
								found = true;
							}
						}

						if(!found) {
							all_classes.push(classes[k]);
						}
					}
				});

				return all_classes;
			}
		});

		$.extend({
			/**
			 *	Fetch geocoding informations from google map api
			 *
			 *	Callback will receive four paramaters :
			 *	status : Geocoding request status
			 *	code : Geocoding request code
			 *	latitude : Address latitude coordinate
			 *	longitude : Address longitude coordinate
			 */
			geocoding : function(address, callback) {
				if($.app.geolocation) {
					var geocoder = new google.maps.Geocoder();

					geocoder.geocode({address:address, language: $.app.lang}, function(results, status) {
						if(status == 'OK') {
							if(results.length > 1) {
								var pop = 0;
								for(var i = 0; i < results.length; i++) {
									if(results[i].geometry.location_type == 'APPROXIMATE' || results[i].geometry.location_type == 'GEOMETRIC_CENTER') {
										results[i] = false;
										pop++;
									}
								}

								for(i = 0; i < pop; i++) {
									for(var j = 0; j < results.length - 1; j++) {
										if(results[j] === false) {
											results[j] = results[j+1];
											results[j+1] = false;
										}
									}
									results.pop();
								}

								if(results.length > 1) {
									callback('ERROR', 'MULTIPLE', 0, 0, results);
								}
								else if(results.length === 0) {
									callback('ERROR', 'ZERO_RESULTS', 0, 0, results);
								}
								else {
									callback('SUCCESS', status, results[0].geometry.location.lat(), results[0].geometry.location.lng(), results);
								}
							}
							else if(results[0].geometry.location_type == 'APPROXIMATE' || results[0].geometry.location_type == 'GEOMETRIC_CENTER') {
								callback('ERROR', 'INACCURATE', 0, 0, results);
							}
							else {
								callback('SUCCESS', status, results[0].geometry.location.lat(), results[0].geometry.location.lng(), results);
							}
						}
						else if(status == 'ZERO_RESULTS') {
							callback('ERROR', status, 0, 0, results);
						}
						else {
							callback('TOPROCESS', status, 0, 0, results);
						}
					});
				}
				else {
					callback('TOPROCESS', 'ZERO_RESULTS', 0, 0, false);
				}
			}
		});

		String.prototype.htmlEntity = function () {
			return $.app.htmlEntity(this.toString());
		};

		String.prototype.nl2br = function() {
			return this.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br />$2');
		};

		$('#hook_confidentiality_policy,#hook_usage_policy').safeClick(function(){
			$.app.showMessage($(this).text(), $.app._('AVAILABLE_SOON'));
		});

		this._init();
	},

	_init : function() { },

	/**
	 * Configure how the application is built and how it works
	 */
	configure : function(config) {
		// Error configs
		if(config['debug'])	{
			this.debug = true;
		}
		
		if(config['sendError'])	{	
			this.sendErrors = true;
		}
		
		if(config['sendErrorsOnUnload']) {
			this.sendErrorsOnUnload = true;
		}
		
		if(config['silent']) {
			this.silent = true;
		}
		
		if(config['trace_retirement']) {
			this.trace_retirement = true;
		}
		
		if(config['jqueryui'] && config['jqueryui']['startingday']) {
			this.startingDay = config['jqueryui']['startingday'];
		}

		// Application configurations
		this.JS_PATH = config.JS_PATH;
		this.IMG_PATH = config.IMG_PATH;
		this.VIRTUALPATH = config.VIRTUALPATH;
		this.SESSION_KEY = config.SESSION_KEY;

		if(!config['application_version']) {
			throw this._throw('Applicaiton version not defined in configuration', true);
		}
		this._application_version = config.application_version;

		if(typeof config['user'] != 'object') {
			throw "No user info in application configuration";
		}

		this._configure(config);
		this.setUserConfig(config['user']);

		//Init geolocation
		if(config['geolocation']) {
			this.geolocation = {};
//			this.geolocation.key = config['geolocation']['key'];
			this.geolocation.url = 'http://maps.google.com/maps/api/geocode/json?';
		}
		else {
			this.geolocation = false;
		}


		//Find default view
		for(var k in this.views) {
			var view = this.views[k];
			if(view['default'] == '1') {
				this.default_view = k;
			}
		}

		
	},

	_configure : function() { },

	getApplicationVersion : function() {
		return this._application_version;
	},

	setUserConfig : function(user_config){
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
	},

	_setUserConfig : function() { },

	setLocale : function(locale){
		if(this.locale == locale){
			return;
		}

		this.locale = locale;
		if(locale.indexOf('fr') != -1){
			this.lang = 'fr';
		}
		else {
			this.lang = 'en';
		}

		//Load language file
		if(!this._messages[this.lang]){
			$.ajax({
				url: this.JS_PATH + this.lang + '.js',
				  data: false,
				  dataType: 'script',
				  async:false,
				  cache:true
				});
		}

		//Update datepicker locale
		var defaults = $.extend($.datepicker.regional[this.lang], {dateFormat:'yy-mm-dd', changeMonth: true, changeYear: true, gotoCurrent : true, yearRange: '-90:+10'});
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
	},

	/**
	 * Get a translation
	 */
	_ : function(message_id){

		if(!this._messages[this.lang]){
			return message_id;
		}

		var msg = this._messages[this.lang][message_id];

		return (msg ? msg : message_id);
	},

	/**
	 * Start building the application
	 */
	start : function() {
		this.hook();

		this._observe();

		if(this._checkGears()) {
			this._initGears();
		}
	},

	hook : function(){
		var t = this;

		if(typeof this._hook == 'function'){
			this._hook();
		}

		//Init Zendesk
		$('.hook_question_comments').click(function(){
			t.showQuestionCommentDialog();
		});
	},

	loadMessages : function(lang, messages) {
		this._messages[lang] = messages;
	},

	/**
	 * This function is triggered just before the browser change or close the page.
	 */
	_beforeUnload : function(e) {
		if(this.sendErrors || this.sendErrorsOnUnload) {
			this._sendErrors();
		}

		return; // Simply quit page. Return false or true for standard confirmation page, or return a question to the user for a custom dialog. IE does not support null. Simply return nothing.
	},

	/**
	 * Create a json error from given error message.
	 * Added to support sending fatal errors.
	 */
	_throw : function(message, fatal) {
		return $.toJSON({message:message, type:(fatal ? 'fatal' : 'error')});
	},

	/**
	 * Error handling function
	 *
	 * @param description Error description
	 * @param page JavaScript file in which the error occured
	 * @param line Line number where the error occured
	 */
	_onError : function(description, page, line) {
		if(this.debug) {
			console.debug(description + ' (' + page + ':' + line + ')');
		}
		
		try {
			var error = $.secureEvalJSON(description.replace('uncaught exception: ', ''));

			if(error.type == 'fatal') {
				this._showFatalError(error.message);
			}

			description = error.message;
			error = null;
		}
		catch(e) {
			// That was not JSON ... but we don't care
		}

		if(this.sendErrors) {
			this._errors.push({description:description, page:page, line:line});

			if(this._errors.length > 10) {
				this._sendErrors();
			}
		}

		return this.silent;
	},

	/**
	 * Send catched errors to the server
	 *
	 * TODO : Offline mode
	 */
	_sendErrors : function() {
		var t = this;
		if(this._errors.length > 0) {
			var errors = [];
			for(var i = 0; i < this._errors.length; i++) {
				for(var k in this._errors[i]) {
					errors.push('error['+i+']['+k+']='+encodeURIComponent(this._errors[i][k]));
				}
			}

			$.ajax({async: false, url: 'index.php?k=' + t.SESSION_KEY + '&action=error&'+errors.join('&')}); // TODO: Real error receiving method

			delete(this._errors);
			this._errors = [];
		}
	},

	/**
	 *	Show a modal dialog telling the user something bad happened. He can try again or go back to where he was before.
	 */
	_showFatalError : function(error) {
		var t = this;

		this.showModalDialog('<h2>'+$.app._('ERROR')+'</h2>\
						<p>\
							<strong>'+$.app._('FATAL_ERROR_OCCURED')+'</strong>\
							<br />\
							'+$.app._('CONTACT_SUPPORT_PERSIST')+'\
						</p>\
						<p class="submit">\
							'+$.app._('FATAL_ERROR__YOU_CAN')+' <a href="javascript:$.app._hideFatalError(\'reload\');">'+$.app._('FATAL_ERROR__RELOAD_PAGE')+'</a> '+$.app._('OR')+' <a href="javascript:$.app._hideFatalError(\'stepback\');">'+$.app._('FATAL_ERROR__GO_BACK')+'</a>\
						</p>', 'fast', function() {
			t._errors.push({description:error, page:'$.app.js', line:0});
		});
	},

	/**
	 *	Close the modal dialog then reload or back, depending on what the use chose.
	 */
	_hideFatalError : function(action) {
		this.hideModalDialog('fast', function() {
			$.app.hideOverlay();

			$('#fatal_error').remove();

			if(action == 'reload') {
				location.reload();
			}
			else if(action == 'stepback') {
				$.app.forceStepBack();
			}
		});
	},

	/**
	 * Start the hash observation loop
	 */
	_observe : function() {
		if(this.debug) {
			console.debug('Observing hash from now on');
		}

		var t = this;
		this._observerInterval = setInterval(function() {
			t._checkHash();
		}, 250);

		this._checkHash();
	},

	/**
	 * Stop the hash observation loop
	 */
	_stopObservation : function() {
		if(this._observerInterval) {
			if(this.debug) {
				console.debug('Stopped hash observation');
			}

			clearInterval(this._observerInterval);
			this._observerInterval = 0;
		}
	},

	/**
	 * Get location hash and check if it changed
	 */
	_checkHash : function() {
		var view;
		var object;
		
		if(!this.view_fetching && this.hash !== location.hash){
			//Store the new hash before the loop starts again

			if(this.debug) {
				console.debug('Hash changed');
			}

			this.hash = location.hash;

			// Get the requested view
			if(!this.hash || this.hash == '#') {
				view = this.default_view;
			}
			else {
				var splits = this.hash.substring(1).split('&');

				view = splits.shift();

				var pos = view.indexOf('/');
				if(pos > 0) {
					var next = view.indexOf('/', pos+1);
					if(next > 0) {
						pos = next;

						view = view.substring(0, pos);
					}
				}

				splits = null;

				if(view === '' || view === null) {
					view = this.default_view;
				}
			}

			var fetch = true;
			if(this.currentView && view == this.currentView) { // Are we staying in the same view ?
				object = this._getViewObject(this.currentView);

				if(object) {
					if(object.onHashChange(this.hash)) { // Did the the view handled the hash change ?
						fetch = false;
					}
				}
			}
			// If we where in a view and we're not resuming navigation (see Test form for more detail) we can ask to view to close;
			if(fetch && this.currentView && !this._resume_hash) {
				object = this._getViewObject(this.currentView);

				// No object to manage the view, why bother ?
				if(object) {
					if(!object.close(this.hash)) { // Can we continue ?
						if(this.debug) {
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
					}
					else if(this.debug) {
						console.debug('Closed view');
					}
				}
			}

			// We don't need that information anymore. It can block us from getting away from the current view if we don't
			this._resume_hash = false;

			// We don't keep page reloads in history
			if(this._force_clear){
				this.addHistory(this.hash);
				this._force_clear = false;
			}
			else if(!this._detectStepBack(this.hash)) {
				this.addHistory(this.hash);
			}

			if(fetch) {
				if(this.debug) {
					console.debug('View : '+view);
				}

				// Just to be sure we leave nothing behind
				this.hideModalDialogNow();

				// Highlight the right menu
				this._selectViewMenu(view);

				// It's time to change the view
				this._fetchView(view);
			}
		}
	},

	goTo :  function(hash, force_clear) {
		if(this.debug) {
			console.debug('Go To "'+hash+'"');
		}

		if(force_clear) {
			this._force_clear = true;
		}
		
		location.hash = hash;
	},
	
	navigateBackTo : function(hash) {
		if (this._history.length > 1 && this._history[this._history.length - 2].hash == hash) {
			history.back();
		}
		else {
			this._history.pop();
			this.replace(hash);
		}
	},
	
	replace : function(hash) {
		if (!hash) {
			hash = '';
		}
		if (this.isOpera()) {
			location.replace(location.protocol + '//' + location.hostname + location.pathname + hash);
			return;
		}
		location.replace(hash);
	},

	forceGoTo : function(hash, force_clear) {
		this._stopObservation();

		if(this.debug) {
			console.debug('Force Go To "'+hash+'"');
		}

		if(force_clear) {
			this._force_clear = true;
		}

		location.hash = hash;
		location.reload();
	},

	/**
	 * Resume user navigation, or not. If view could not close, we stored the hash into _resume_hash to be able to resume when the time comes
	 */
	resume : function(stay) {
		if(this._resume_hash) {
			if(!stay && typeof stay != 'undefined') {
				// We're going where the user wanted to before the view cancelled it
				this.currentView = false;

				var hash = this._resume_hash; // Using temporary variable to be sure hash observation loop does not mess with this
				this._resume_hash = false;

				location.hash = hash;

				if(this.debug) {
					console.debug('View closed, resuming');
				}
			}
			else if(this.debug) {
				this._resume_hash = false;

				this.addHistory(location.hash);

				console.debug('View cancelled closing');
			}
		}
	},

	getResumeHash : function() {
		return this._resume_hash;
	},

	/**
	 * Utility function to parse the location hash.
	 * Hash should look like this :
	 * <view>&<param>=<value>&<param2>=<value2>&...
	 */
	parseHash : function(hash) {
		var infos = {
			view : '',
			params : {}
		};

		var splits = hash.split('&');
		infos.view = splits.shift().substr(1);


		for(var i = 0; i < splits.length; i++) {
			var info = splits[i].split('=');
			var param = info.shift();

			infos.params[param] = info.join('='); // Just in case there was a '=' in the value
		}

		return infos;
	},

	reload : function(hiddenParams) {
		this._fetchView(this.currentView, hiddenParams);
	},
	_onFetchView : function(current_view){	},
	_onLoadView : function(current_view) { },

	/**
	 * Fetch view html and model from server
	 *
	 * TODO : Offline mode
	 */
	_fetchView : function(view, hiddenParams) {
		this.currentView = view;

		// TODO : Branch here to lookup data from gears instead doing a ajax query.

		var t = this;

		var cached = this._isViewCached(view);
		if(cached && this.debug) {
			console.debug('View "'+view+'" is in cache (' + this.lang + ')');
		}

		// Ask the requested view to transmute hash to query parameters
		var params = this._getViewParameters(location.hash);

		for(var k in params.params) {
			params[k] = params.params[k];
		}
		delete(params.params);

		if(hiddenParams && $.isPlainObject(hiddenParams)) {
			for(k in hiddenParams) {
				params[k] = hiddenParams[k];
			}
		}

		params.k  = t.SESSION_KEY;
		params.view  = view;
		params.cmd = 'view';
		params.cached = cached;
		params.version = this.getApplicationVersion();
		params.uv = t.userVersion;

		var param_string = $.param(params);

		this.view_fetching = true;
		t._onFetchView(this._getViewObject(t.currentView));
		$.ajax({
			url:'index.php?'+param_string,
			type : 'POST',
			data: {
				context : $.app.getContext()
			},
			dataType:'json',
			success: function(response) {
				t.view_fetching = false;
				t._hideLoading();

				if(response.status == 'error') {
					var info = response.data;
					if(info.code == 600) { // VIEW_CMD_ERROR;
						// Hopefuly this won't happen
						t._showFatalError('An error occured server side while fetching view data "'+view+'" (600)');
					}
					else if(info.code == 601 || info.code == 602) { // VIEW_ACL_ERROR or MODEL_ACL_ERROR
						$.app.showModalDialog('<h2>'+$.app._('NAVIGATION_ERROR')+'</h2>\
										<p>\
											<strong>'+$.app._('INVALID_PAGE_REQUEST')+'</strong>\
											<br />\
										</p>\
										<p class="submit">\
											<input type="submit" id="hook_create_error_close" value="'+$.app._('OK')+'" />\
										</p>', 'fast', function() {
							$('#hook_create_error_close').safeClick(function() {
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
					else { // Unknown error
						t._showFatalError('An unknwon error was sent from server while fetching view data "'+view+'" ('+info.error+')');
					}

					return false;
				}
				t._onLoadView(t._getViewObject(t.currentView));
				t._loadView(response.data);
			},
			error: function(xhr, status, error) {
				t.view_fetching = false;
				t._hideLoading();

				if(!$.app.validateXHR(xhr)){
					return false;
				}

				if(this.debug) {
					console.debug('AJAX query error');
					console.debug(status);
					console.debug(error);
				}

				// Hopefuly this won't happen
				t._showFatalError('An error occured while fetching view data "'+view+'" ('+status+')');
			}
		});

		// If we don't receive an awnser after 1.5 second, a loading overlay will appear
		this._loadingTimeout = setTimeout(function() {
			t._showLoading();
		}, this._loadingDelay);
	},

	/**
	 *	Standard entry point for view data (html and model).
	 */
	_loadView : function(data) {
		console.debug(data);
		var t = this;

		// Application version changed server side, we have to reload the application.
		if(this.getApplicationVersion() != data.version) {
			location.reload();
		}
		
		if(data.data){ //backward compatibility.
			data = data.data;
		}

		if(data.user && t.userVersion != data.user.version){
			t.clearViewCache();
			t.setUserConfig(data.user);
		}

		this._initView();
		this._getViewObject(this.currentView)._validateable = data.validateable;

		if(data.html) {
			if(this.debug) {
				console.debug('Using recieved html');
			}

			this._loadContent(data.html);
			this._loadParams(data.params);

			// We store the html and json we received
			this._setViewCache(this.currentView, data.html, data.params);

		}
		else if(this._isViewCached(this.currentView)) {
			if(this.debug) {
				console.debug('Using cached html');
			}

			// Get no html/params but the sent version is the same as the one we have, we can use it.
			this._loadContent(this._getViewCachedHTML(this.currentView));
			this._loadParams(this._getViewCachedParams(this.currentView));
		}
		else {
			throw this._throw('View not cached and not recieved from html...', true);
		}

		this._hookView();

		// NOTE : No offline support is required here. Everything is managed by {TODO: insert offline fetch method name}
		this._loadModel(data.model);
		this._checkAnchor();
	
		$('input').each(function(index, element) {
			if (!$(element).attr('maxlength')) {
				$(element).attr('maxlength', 255); 
			}
		});
	},
	
	_checkAnchor: function(){
		var params = this._getViewParameters(this.hash);
		if(params.params['anchor']){
			var anchor_name = params.params.anchor;
			var view = this._getViewObject(this.currentView);
			var $element = $('[anchor='+anchor_name+']');
			if($element.length === 0){
				if(this.debug) {
					console.warn('GET parameter "anchor" found but there is no element associated with it!');
				}
				return false;
			}
			if($.isFunction(view.onScrollToAnchor)){
				view.onScrollToAnchor($element, anchor_name);
			}
			else{
				if(this.debug) {
					console.warn('GET parameter "anchor" found but there is no `onScrollToAnchor` function on your view!');
				}
			}
		}
	},

	_initView : function() {
		if(!this.currentView) {
			throw this._throw('No view to initialize', true);
		}

		var object = this._getViewObject(this.currentView);

		if(object) {
			object.init(location.hash);
		}
	},

	/**
	 *	Ask the view to draw the content if it can or we do it.
	 *
	 *	NOTE : If you want to support view redrawing, implement 'draw'.
	 */
	_loadContent : function(html) {
		var object = this._getViewObject(this.currentView);

		if(object && typeof object.draw == 'function') {
			object.draw(html);
		}
		else {
			$('#content').html(html);
		}

		scrollTo(0, 0);
	},

	/**
	 *	Load the passed params in the view
	 */
	_loadParams : function(params) {
		if(!this.currentView) {
			throw this._throw('No view to load parameters from.', true);
		}
		
		var object = this._getViewObject(this.currentView);
		if (object) {
			object.load(params);
		}
	},

	/**
	 * Hook the view object to the current content
	 */
	_hookView : function() {
		if(!this.currentView) {
			throw this._throw('No view to hook', true);
		}

		var object = this._getViewObject(this.currentView);

		if(object) {
			if(typeof object._preHook == 'function'){ object._preHook(); }
			object.hook();
		}
	},

	recursiveCleanFloats : function(model) {
		if($.isArray(model)) {
			for(var i = 0; i < model.length; i++) {
				model[i] = $.app.recursiveCleanFloats(model[i]);
			}
		}
		else if(typeof model == 'object') {
			for(var k in model) {
				model[k] = $.app.recursiveCleanFloats(model[k]);
			}
		}
		else {
			//Try not to catch fields not expected to be float like SIN, Date and addresses.
			if(typeof model == "string" && model.match(/^\d+\.\d+$/i)) {
				var p = parseFloat(model);
				if(!isNaN(p)) {
					model = p;
				}
			}
		}

		return model;
	},

	_loadModel : function(model) {
		var object = this._getViewObject(this.currentView);

		if(object) {
			model = $.app.recursiveCleanFloats(model);

			if(this.debug) {
				console.debug(model);
			}

			object.inject(model);
			if(typeof object._postInject == 'function'){ object._postInject(); }
		}
		else if(this.debug) {
			console.debug('No view object, cannot inject model');
		}
		
		if ($('.page-title').length) {
			window.document.title = ($('.page-title').text());
		}
	},

	/**
	 * Clear all cached view html and params
	 */
	clearViewCache : function() {
		if(this.debug) {
			console.log('Clearing view cache');
		}
		
		delete(this._view_cache);
		this._view_cache = [];
	},

	/**
	 * Get the currently store view html version.
	 */
	_isViewCached : function(view) {
		// No HTML no cache.
		if(this._view_cache[view] && this._view_cache[view].html) {
			return true;
		}

		return false;
	},

	/**
	 * Get the currently sotre view html
	 */
	_getViewCachedHTML: function(view) {
		if(this._view_cache[view] && this._view_cache[view].html) {
			return this._view_cache[view].html;
		}
		else {
			throw this._throw('View was supposed to be cached...', true);
		}
	},

	/**
	 * Get the currently sotre view params
	 * Does not throw and error if no params are found - they're optionnal
	 */
	_getViewCachedParams: function(view){
		return this._view_cache[view].params;
	},

	/**
	 * Store given view html, json params and its version number.
	 */
	_setViewCache: function(view, html, params) {
		delete(this._view_cache[view]);

		this._view_cache[view] = {
			html: html,
			params: params ? params : null
		};

		if(this.debug) {
			console.debug('Cached version of view "'+view+'"');
		}
	},

	/**
	 * Ask the view object to transmute the hash to query parameters.
	 */
	_getViewParameters : function(hash) {
		var object = this._getViewObject(this.currentView);
		if(object) {
			return object.parseHash(hash);
		}
		else {
			// No objects ? We can't determine anything...
			return {};
		}
	},

	/**
	 * Show a loading animation and put a cover over the whole page.
	 */
	_showLoading : function() {
		if(this._loadingTimeout) {
			clearTimeout(this._loadingTimeout);
			this._loadingTimeout = 0;

			if(this.debug){
				console.debug('Show loading overlay');
			}

			if($('#loading-overlay').length > 0) {
				// Loading is already shown
				return;
			}

			// Whole page cover
			this.showOverlay();

			// Add required html
			$('body').append('<img id="loading-overlay-image" src="'+this.IMG_PATH+'ajax-loader-big.gif" /><div id="loading-overlay"></div>');

			// Calculate the content height (gray zone)
			var main_height = $('#main').height()+parseInt($('#main').css('padding-top'), 10)+parseInt($('#main').css('padding-bottom'), 10);

			$('#loading-overlay-image').css({
				top:				$('#main').offset().top,
				paddingTop:			parseInt(main_height / 2, 10)+'px',
				position:			'absolute',
				left:				Math.floor($('#main').width() / 2),
				zIndex:				89
			});

			$('#loading-overlay').css({
				height:				main_height,
				left:				0,
				position:			'absolute',
				top:				$('#main').offset().top,
				width:				'100%',
				zIndex:				90,
				backgroundColor:	'#000',
				opacity:			0.4
			}).fadeIn();
		}
	},

	/**
	 * Happens whenever the _hideLoading function is beginning.
	 * This function is meant to be overriden by a child class.
	 */
	beforeHideLoading : function(){},

	/**
	 * Hide the loading animation and covers
	 */
	_hideLoading : function() {
		this.beforeHideLoading();
		clearTimeout(this._loadingTimeout);
		this._loadingTimeout = 0;

		if(this.debug) {
			console.debug('Hide loading overlay');
		}

		$('#loading-overlay').remove();
		$('#loading-overlay-image').remove();

		this.hideOverlay();
		this.afterHideLoading();
	},
	
	/**
	 * Happens whenever the _hideLoading function is finished.
	 * This function is meant to be overriden by a child class.
	 */
	afterHideLoading : function(){},

	/**
	 * Put a cover over the whole page to prevent user manipulation while something important is going on.
	 *
	 * @param color CSS color for the cover
	 * @param opacity Cover opacity, between 0 and 1, in increment of 0.2 (i.e 0.8)
	 */
	showOverlay : function(color, opacity, id, zIndex) {
		if(!zIndex) zIndex = 500;
		if(!id) id = 'overlay';

		if(this.debug)
			console.debug('Show overlay');

		if($('#'+id).length > 0) // Loading is already shown
				return;

		$('body').append('<div id="'+id+'"></div>');

		if(!color)
			color = 'transparent';

		if(!opacity)
			opacity = '0';

		$('#'+id).css({
			height:				$(document).height(),
			left:				0,
			position:			'absolute',
			top:				0,
			width:				(this._iPad ? $('body').width() : '100%'),
			zIndex:				zIndex,
			backgroundColor:	color,
			opacity:			opacity
		}).fadeIn();
	},

	/**
	 * Remove the whole page cover
	 */
	hideOverlay : function(id) {
		if(this.debug)
			console.debug('Hide overlay');

		if(!id) id = 'overlay';

		$('#'+id).remove();
	},

	/**
	 * Add an hash to the history list
	 */
	addHistory : function(hash) {
		if(!this._history[this._history.length -1] || this._history[this._history.length -1].hash != hash)
			this._history.push({hash: hash, context : {}});
	},

	/**
	 * Tries to detect if the browser navigation buttons where used
	 */
	_detectStepBack : function(hash) {
		if(this._history[this._history.length - 2] && this._history[this._history.length - 2].hash == hash) {
			this._history.pop();

			return true;
		}

		return false;
	},

	/**
	 * Go back to previous hash
	 */
	stepBack : function(redirect) {
		var hash;
		
		do{	
			if(this._history.length === 0){
				hash = '';
				break;
			}

			hash = this._history.pop().hash;

			if(typeof hash == 'undefined'){
				hash = '';
				break;
			}
		}while(hash == location.hash);
				
		if(this.debug)
			console.debug('Step back to : '+hash);

		if(redirect || typeof redirect == 'undefined')
			location.hash = hash;

		return hash;
	},

	/**
	 * Force the page to reload;
	 */
	forceReload : function() {
		location.reload();
	},

	/**
	 * Go back to the previous page and force it to reload
	 */
	forceStepBack : function() {
		this._stopObservation();

		if(this.debug)
			this._debugHistory();
	
		var hash = this.stepBack(false);

		if(hash !== '') {
			location.hash = hash;
			location.reload();
		}
		else {
			history.back();
			location.reload();
		}
	},

	goBack : function() {
		var hash;
		if(this._history.length < 2)
			hash = '';
		else {
			this._history.pop(); // Pop current page;
			hash = this._history.pop().hash; // Previous page;
		}

		if(this.debug)
			console.debug('Go back to "'+hash+'"');

		location.hash = hash;
	},

	forceGoBack : function() {
		var hash;
		this._stopObservation();

		if(this._history.length < 2)
			hash = '';
		else {
			this._history.pop(); // Pop current page;
			hash = this._history.pop().hash; // Previous page;
		}

		if(this.debug)
			console.debug('Force go back to "'+hash+'"');

		location.hash = hash;
		location.reload();
	},

	setContextValue : function(key, value) {
		if(this._history.length > 0) {
			if(!$.isPlainObject(this._history[this._history.length - 1].context)) {
				this._history[this._history.length - 1].context = {};
			}
			this._history[this._history.length - 1].context[key] = value;
		}
	},

	getContextValue : function(key) {
		if(this._history.length > 0 && $.isPlainObject(this._history[this._history.length - 1].context))
			return this._history[this._history.length - 1].context[key];
		else
			return false;
	},

	getContext : function() {
		if(this._history && this._history.length > 0 && $.isPlainObject(this._history[this._history.length - 1].context))
			return this._history[this._history.length - 1].context;
		else
			return {};
	},

	/**
	 * Output the current browsing history to the console
	 */
	_debugHistory : function() {
		for(var i = 0; i < this._history.length; i++) {
			console.debug(i + ' : ' + this._history[i].hash);
			console.debug(this._history[i].state);
		}
	},

	_arrayPop : function(array, index) {
		if(array.length && index > 0 && index < array.length) {
			for(var i = index; i < array.length -1; i++) {
				array[i] = array[i+1];
			}

			array.pop();
		}

		return array;
	},

	/**
	 * Check if Google Gears is installed
	 */
	_checkGears : function() {
		if (!window.google || !google.gears) {
			if(this.debug)
				console.debug('Google Gears is not installed');

			return false;
		}
		else {
			if(this.debug)
				console.debug('Google Gears is installed');

			return true;
		}
	},

	/**
	 * Initialize Google Gears
	 */
	_initGears : function() {
		if(!this._checkGears()) return false;

//		this._gearLocalServer = google.gears.factory.create("beta.localserver");
//		this._gearStore = this._gearLocalServer.createManagedStore('abf_test');

//		this._gearStore.
		return true;
	},



	/**
	 * Add a view object and make sure it implements required fonction (debug only)
	 */
	registerView : function(view, object) {
//		if(this.debug) {
//			if(typeof object != 'object')
//				throw this._throw('registerView requires an "object", '+(typeof object)+' given');
//
//			if(typeof object.init != 'function')
//				throw this._throw('View "'+view+'" does not implement "init" function');
//
//			if(typeof object.getQueryParameters != 'function')
//				throw this._throw('View "'+view+'" does not implement "getQueryParameters" function');
//
//			if(typeof object.hook != 'function')
//				throw this._throw('View "'+view+'" does not implement "hook" function');
//
//			if(typeof object.close != 'function')
//				throw this._throw('View "'+view+'" does not implement "close" function');
//		}

		if(this.debug && this._view_objects[view]) {
			console.debug('View '+view+' is already registered');
		}

		if(this.debug)
			console.debug('Registered view "'+view+'"');

		this._view_objects[view] = object;
	},

	/**
	 * Tries to get the request view object
	 */
	_getViewObject : function(view) {
		return this._view_objects[view];
	},

	_scrollTop : function() {
		var win = window.pageYOffset ? window.pageYOffset : 0;
		var doc = document.documentElement ? document.documentElement.scrollTop : 0;
		var body = document.body ? document.body.scrollTop : 0;

		var value = win ? win : 0;
		value = (doc && (!value || (value > doc))) ? doc : value;
		value = (body && (!value || (value > body))) ? body : value;

		return value;
	},

	/**
	 * Show a modal dialog at the top of the page
	 *
	 * @param content HTML to put inside de dialog
	 * @param speed Dialog animation speed
	 * @param callback Function to call once the animation is done
	 */
	showModalDialog : function(content, speed, callback, width) {
		if($.app.debug)
			console.debug('Show modal dialog');

		this.showOverlay('#000', 0.4);

		$('body').append('\
			<div id="modal_dialog" class="modal" style="display: none; top : '+$.app._scrollTop()+'px">\
				<div class="modal-2" '+(width ? 'style="width: '+width+'px;"': '')+'>\
					<div class="sprite modal-3">\
						'+content+'\
					</div>\
				</div>\
			</div>');

		if($.app.isIE7()) $('div.modal p.submit').prepend('<span style="width: 1px; display: inline-block;">&nbsp;</span>');
		$('#modal_dialog').slideDown(speed, callback);
	},

	/**
	 * Hide the modal dialog.
	 *
	 * @param speed Dialog animation speed
	 * @param callback Function to call once the animation is done
	 * @param use_detach True if the dialog should be detached,
	 *  false if it should be removed (default)
	 */
	hideModalDialog : function(speed, callback, use_detach) {
		if($.app.debug)
			console.debug('Hide modal dialog');

		$('#modal_dialog').fadeOut(speed, function() {
			$.app.hideOverlay();
			if(use_detach){
				$('#modal_dialog').detach();
			}
			else{
				$('#modal_dialog').remove();
			}
			if(typeof callback == 'function') callback();
		});
	},

	/**
	 * Hide the modal dialog now. Mainly used to be sure no dialog is left behind
	 */
	hideModalDialogNow : function() {
		if($.app.debug)
			console.debug('Hide modal dialog now!');

		$('#modal_dialog').remove();
	},

	showError : function(message) {
		$.app.showModalDialog('<h2>'+$.app._('ERROR')+'</h2>\
						<p>\
							<strong>'+(message ? $.app._(message) : $.app._('FATAL_ERROR_OCCURED'))+'</strong>\
							<br />\
							'+$.app._('ERROR_TRY_AGAIN')+'\
							<br />\
							<br />\
							'+$.app._('CONTACT_SUPPORT_PERSIST')+'\
						</p>\
						<p class="submit">\
							<input type="submit" id="hook_create_error_close" value="'+$.app._('OK')+'" />\
						</p>', 'fast', function() {
			$('#hook_create_error_close').safeClick(function() {
				$.app.hideModalDialog('fast');
			});
		});
	},

	showMessage : function(title, message, content) {
		if(title === '')
			this._throw('Missing title', true);
		if(message === '')
			this._throw('Missing message', true);

		$.app.showModalDialog('<h2>'+title+'</h2>\
						<p>\
							<strong>'+message+'</strong>\
						</p>\
						'+(content ? '<p>'+content+'</p>' : '')+'\
						<p class="submit">\
							<input type="submit" id="hook_show_message_close" value="'+$.app._('OK')+'" />\
						</p>', 'fast', function() {
			$('#hook_show_message_close').safeClick(function() {
				$.app.hideModalDialog('fast');
			});
		});
	},

	showQuestionCommentDialog : function(comment_type){

		var t = this;

		var content = '<h2>'+$.app._('QUESTION_COMMENT_SUGGESTION')+'</h2>\
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
		<br />\
		<dd><textarea id="hook_question_comment_textarea" style="width:500px;height:150px"></textarea></dd>\
		</dl>\
		<p class="submit">\
		<input type="submit" id="hook_send_question_comment" value="'+$.app._('OK')+'" /> <a href="javascript:void(0);" id="hook_cancel_question_comment">'+$.app._('CANCEL')+'</a>\
		</p>\
		</div>\
		<div id="hook_question_comment_sent" style="display:none"><p>' + $.app._('THANK_YOU_FOR_YOUR_COMMENTS') + '</p></div>';

		$.app.showModalDialog(content, 'normal', function(){

			if(comment_type) $('#hook_question_comment_type').val(comment_type);

			$('#hook_question_comment_from').val($.app.userEmail);

			$('#hook_send_question_comment').safeClick(function() {

				var dlg = this;

				var type = $('#hook_question_comment_type').val();
				var subject = $('#hook_question_comment_subject').val();
				var from = $('#hook_question_comment_from').val();
				var message = $('#hook_question_comment_textarea').val();

				if(!subject){
					$('#hook_question_comment_subject').hintError($.app._('FIELD_REQUIRED')).focus();
					return false;
				}

				if(!message){
					$('#hook_question_comment_textarea').hintError($.app._('FIELD_REQUIRED')).focus();
					return false;
				}

				var postString = '&type=' + encodeURIComponent(type) +
								 '&subject=' + encodeURIComponent(subject) +
								 '&from=' + encodeURIComponent(from) +
								 '&message=' + encodeURIComponent(message);

				$.ajax({
					url:'index.php?k=' + t.SESSION_KEY + '&sendComment' ,
					type: 'POST',
					data: postString,
					dataType:'json',
					success: function(data) {

						if(data.status && data.status == 'error') {
							$.app.showError();
							$.app.hideModalDialog('fast');
							return false;
						}



						setTimeout(function(){
							$.app.hideModalDialog('fast');
							}, 2000);

						return true;

					},
					error: function(xhr, status, error) {
						if(!$.app.validateXHR(xhr)){
							$.app.hideModalDialog('fast');
							return false;
						}

						$.app.showError();
						$.app.hideModalDialog('fast');
						return false;
					}
				});

				$('#hook_question_comment_form').fadeOut(function(){
					$("#hook_question_comment_sent").show();
				});

			});

			$('#hook_cancel_question_comment').safeClick(function() {
				$.app.hideModalDialog('fast');

			});

			$('#hook_question_comment_subject').focus();
		}, 550);
	},

	htmlEntity : function (value){
		if(value)
			return $('<div></div>').text(value).html();
		else
			return '';
	},

	sleep : function(milliseconds) {
		var d = new Date();
		var n;
		do {
			n = new Date();
		} while(n - d < milliseconds);
	},
	
	isNumber : function(value) {
		return typeof value === 'number' && isFinite(value);
	},
	
	/**
	 * Support localized numeric representation.
	 * Replace NaN by 0
	 */
	parseFloat : function(value){
		if(typeof value == 'number'){
			return value;
		}

		value = value+';';
		value = value.replace(/[^\d\-.,]/g, '');


		if(this.lang == 'fr') {
			if(value.indexOf(',') != -1){
				value = value.replace(/\./g, '');
				value = value.replace(/\,/g, '.');
			}
		}

		value = value.replace(/\,/g, '');
		var val = parseFloat(value);
		if(isNaN(val)) val = 0;
		return val;
	},

	/**
	 * Same as parseInt(value, 10) but replace NaN by 0
	 */
	parseInt : function(value) {
		value = parseInt(value, 10);
		if(isNaN(value)) value = 0;
		return value;
	},

	/**
	 * Format number according to locale and add money symbol
	 */
	formatMoney: function(value, opts) {
		if (opts && opts.canBeNull && (value === '' || value === null)){
			return '';
		}
		
		var currency_pos;
		if(this.lang == 'fr'){
			currency_pos = 'right';
		}
		else {
			currency_pos = 'left';
		}

		var result = this.formatNumber(value, opts);
		if(!result) result = '0';
		if(currency_pos == 'left'){
			if(opts && opts.nbsp)
				return '$' + result;
			else
				return '$' + result;
		}
		else {
			if(opts && opts.nbsp)
				return result + '&nbsp;$';
			else
				return result + ' $';
		}
	},

	/**
	 * Format percent according to locale
	 */
	formatPercent: function(value, opts) {
		var separator;
		
		if (opts && opts.canBeNull && !value){
			return '';
		}
		
		if(this.lang == 'fr'){
			if (opts && opts.nbsp) 
				separator = '&nbsp';
			else
				separator=' ';
		}
		else {
			separator = '';
		}

		var result = this.formatNumber(value, opts);
		if(!result) result = '0';
		return result + separator+'%';
	},

	/**
	 * Format and localize a number
	 * opts:
	 * 	precision : Default precisions of the number
	 *  facultative_decimals :  Hide decimals if value = 0;
	 *
	 */
	formatNumber: function(value, opts) {

		if(arguments.length === 0) return '';
		else if(!value && value !== 0) return '';

		var default_options={precision: 2, facultative_decimals:true, positive:false, nbsp:false, rounded:true};
		if(this.lang == 'fr'){
			default_options = $.extend({decimal_separator:',', thousand_separator: ' '}, default_options);
		}
		else {
			default_options = $.extend({decimal_separator:'.', thousand_separator: ','}, default_options);
		}

		var options = $.extend(default_options, opts);

		value = value+'';


		var neg = false;
		if(value.charAt(0) == '-') {
			if(options.positive) {
				value = '0';
			}
			else {
				neg = true;
				value = value.substr(1);
			}
		}

		value = value.replace(/[^\d\-.,]/g, '');

		if(options.decimal_separator == ','){
			if(value.indexOf(options.decimal_separator) != -1){
				value = value.replace(/\./g, '');
				value = value.replace(/,/g, '.');
			}
		}

		if(value === ''){
			value = '0';
		}

		value = value.replace(/,/g, '');
		value = parseFloat(value) + '';

		if(value == Number.NaN)
			value = '';

		var rounded;
		var tmp;
		if(options.precision===0){
			rounded = $.app.parseFloat(value).toFixed(0);
			tmp = rounded;
		}
		else {
			if (options.rounded){
				rounded = (Math.round(value * Math.pow(10, options.precision)) / Math.pow(10, options.precision)).toFixed(options.precision);
			} else {
				rounded = (Math.floor(value * Math.pow(10, options.precision)) / Math.pow(10, options.precision)).toFixed(options.precision);
			}
			tmp = rounded.substr(0, rounded.indexOf('.'));
		}

		var integer = '';
		var pos = tmp.length;

		if(pos > 3) {
			do {
				pos = pos - 3;

				var size = 3;
				if(pos < 0) {
					size = 3 + pos;
					pos = 0;
				}

				if(integer !== '')
				integer = tmp.substr(pos, size) + options.thousand_separator + integer;
				else
				integer = tmp.substr(pos, size);

			} while(pos > 0);
		}
		else {
			integer = tmp;
		}
		
		var result;
		if(options.precision===0 || (options.facultative_decimals && parseInt(rounded.substr(rounded.indexOf('.')+1)) === 0 )){
			result = integer;
		}
		else {
			integer += options.decimal_separator;
			result = integer + rounded.substr(rounded.indexOf('.')+1);
		}
		
		if(options.end_space) {
		 result += ' ';
		}

		if(options.nbsp) {
			result = result.replace(/ /g, '&nbsp;');
		}

		if(neg)
			return '-'+result;
		else
			return result;
	},

	formatSIN : function(sin) {
		var old_sin = sin;

		//Remove whitespace
		old_sin = old_sin.replace(new RegExp("[^\\d]", 'g'), '');

		var new_sin = old_sin.substr(0, 3) + ' ' + old_sin.substr(3,3) + ' ' + old_sin.substr(6,3);
		return $.trim(new_sin);
	},

	isSINValid : function(sin) {

		if(sin === '')
			return true;
		
		if(sin == '*** *** ***')
			return true;

		sin = sin.replace(new RegExp("[^\\d]", 'g'), '');

		if(sin.length != 9)
			return false;

		var total = parseInt(sin.charAt(0)) + parseInt(sin.charAt(2)) + parseInt(sin.charAt(4)) + parseInt(sin.charAt(6));

		for(var i = 1; i <= 7; i += 2) {
			var tmp = parseInt(sin.charAt(i))*2;
			if(tmp >= 10)
				tmp = tmp - 9;

			total += tmp;
		}

		total += parseInt(sin.charAt(8));
		if((total%10) !== 0)
			return false;
		else {
			return true;
		}
	},

	/**
	 * Format field value objects provided by model (id, value_fr, value_en)
	 */
	formatFieldValue : function(fieldValue) {
		var t = this;


		if(!fieldValue) return '';

		if(typeof fieldValue == 'object'){
			var val = fieldValue['value_' + t.lang];

			if(typeof val == 'undefined'){
				return '';
			}

			return val;
		}
		else {
			return fieldValue;
		}
	},

	parsePhone : function(phone) {
		var extension;
		if(/(,|ext|poste|#)/.test(phone)) {
			var coma =  phone.indexOf(',');
			var ext =  phone.indexOf('ext');
			var poste =  phone.indexOf('poste');
			var square =  phone.indexOf('#');

			var pos = Math.max(coma, ext, poste, square);
			if(pos != -1) {
				extension = phone.substr(pos).replace(/[^\d]/g, '');
				phone = phone.substr(0, pos);
			}
		}
		else {
			extension = '';
		}

		phone = phone.replace(/[^\d]/g, '');

		var formatted;
		if(phone[0] == '1' && phone.length >= 11) {
			formatted = '1 '+phone.substr(1,3)+' '+phone.substr(4, 3)+'-'+phone.substr(7,4);

			if(phone.length > 11)
				extension = phone.substr(11);
		}
		else if(phone.length >= 10) {
			formatted = phone.substr(0,3)+' '+phone.substr(3, 3)+'-'+phone.substr(6,4);

			if(phone.length > 10)
				extension = phone.substr(10);
		}
		else if(phone.length == 7) {
			formatted = phone.substr(0, 3)+'-'+phone.substr(3);
		}
		else {
			formatted = phone;
		}

		if(extension) {
			formatted += $.app._('PHONE_EXTENSION')+extension;
		}

		return formatted;
	},

	formatPostalCode : function(code) {
		if(/^[a-zA-Z]\d[a-zA-Z]\d[a-zA-Z]\d$/.test(code)) {
			return (code.substr(0,3)+' '+code.substr(3)).toUpperCase();
		}
		else
			return code;
	},

	pad : function pad(number, length) {

	    var str = '' + number;
	    while (str.length < length) {
	        str = '0' + str;
	    }

	    return str;

	},

	/**
	 * Used to detect login redirection during ajax errors.
	 *
	 */
	validateXHR : function(xhr){
		if(!xhr || typeof xhr == "undefined" || typeof xhr.getResponseHeader != 'function'){
			return true;
		}

		var redirect_to = xhr.getResponseHeader('X-Kronos-Ajax-Goto');
		if(redirect_to){
			document.location = redirect_to;
			return false;
		}

		return true;
	},

	getXHRRequest : function(url, successCallback, loading, errorCallback, button, skipOverlayHandling) {
		var t = this;

		var xhrRequest = $.ajax({
			url: url,
			type : 'GET',
			dataType:'json',

			success: function(response) {
				if(!skipOverlayHandling){
					t.hideOverlay();
					t._hideLoading();
				}

				if(button)
					$(button).prop('disabled', false);

				var data;
				if(typeof response.data != 'undefined'){
					data = response.data;
				}
				else {
					data = response;
				}

				if(response.status && response.status == 'error') {
					if(typeof errorCallback == 'function'){
						errorCallback(data );
					}
					else if(typeof data.message != 'undefined'){
						$.app.showError(data.message);
					}
					else {
						$.app.showError();
					}
				}
				else if(typeof successCallback == 'function') {
					successCallback(data);
				}
			},
			error: function(xhr, status, error) {
				if(!skipOverlayHandling) {
					t.hideOverlay();
					t._hideLoading();
				}

				console.debug(xhr);
				if(status == 'abort' || !$.app.validateXHR(xhr)){
					return false;
				}
				
				if(button)
					$(button).prop('disabled', false);

				if(this.debug) {
					console.debug('AJAX query error');
					console.debug(status);
					console.debug(error);
				}

				if(typeof errorCallback == 'function')
					errorCallback();
				else
					$.app.showError();
			}
		});

		return xhrRequest;
	},

	get : function(view, cmd, paramsString, callback, loading, errorCallback, button, skipOverlayHandling) {
		if(!loading && !skipOverlayHandling) {
			this.showOverlay();
		}

		if(button)
			$(button).prop('disabled', true);

		var t = this;

		if(paramsString.length > 0) {
			if(paramsString[0] != '&') {
				paramsString = '&'+paramsString;
			}
		}

		// Le bloc ci-dessous devrait/pourrait être remplacer par un call à getXHRRequest //
		var xhrRequest = $.ajax({
			url:'index.php?k=' + t.SESSION_KEY + '&view=' + view + '&cmd=' + cmd + paramsString ,
			type : 'GET',
			dataType:'json',
			
			success: function(response) {
				if(!skipOverlayHandling){
					t.hideOverlay();
					t._hideLoading();
				}

				if(button)
					$(button).prop('disabled', false);
				
				var data;
				if(typeof response.data != 'undefined'){
					data = response.data;
				}
				else {
					data = response;
				}
				
				if(response.status && response.status == 'error') {
					if(typeof errorCallback == 'function'){
						errorCallback(data );
					}
					else if(typeof data.message != 'undefined'){
						$.app.showError(data.message);
					}
					else {
						$.app.showError();
					}
				}
				else if(typeof callback == 'function') {
					callback(data);
				}
			},
			error: function(xhr, status, error) {
				if(!skipOverlayHandling) {
					t.hideOverlay();
					t._hideLoading();
				}

				console.debug(xhr);
				if(status == 'abort' || !$.app.validateXHR(xhr)){
					return false;
				}
				
				if(button)
					$(button).prop('disabled', false);

				if(this.debug) {
					console.debug('AJAX query error');
					console.debug(status);
					console.debug(error);
				}

				if(typeof errorCallback == 'function')
					errorCallback();
				else
					$.app.showError();
			}
		});

		if(loading) {
			// If we don't receive an awnser after 1.5 second, a loading overlay will appear
			this._loadingTimeout = setTimeout(function() {
				t._showLoading();
			}, this._loadingDelay);
		}
		
		return xhrRequest;
	},

	post : function(view, cmd, paramsString, postString, callback, loading, errorCallback, button) {
		var t = this;
		
		if(button)
			$(button).prop('disabled', true);

		if(paramsString.length > 0) {
			if(paramsString[0] != '&') {
				paramsString = '&'+paramsString;
			}
		}
		
		var xhrRequest = $.ajax({
			url:'index.php?k=' + t.SESSION_KEY + '&view=' + view + '&cmd=' + cmd + paramsString ,
			type: 'POST',
			data: postString,
			dataType:'json',
			success: function(response) {
				if(loading) {
					t.hideOverlay();
					t._hideLoading();
				}

				if(button)
					$(button).prop('disabled', false);
				
				var data;
				if(typeof response.data != 'undefined'){
					data = response.data;
				}
				else {
					data = response;
				}

				if(response.status && response.status == 'error') {
					if(typeof errorCallback == 'function'){
						errorCallback(data);
					}
					else if(typeof data.message != 'undefined'){
						$.app.showError(data.message);
					}
					else {
						$.app.showError();
					}
				}
				else if(typeof callback == 'function') {
					callback(data);
				}
			},
			error: function(xhr, status, error) {
				t.hideOverlay();
				t._hideLoading();

				if(status == 'abort' || !$.app.validateXHR(xhr)){
					return false;
				}

				if(button)
					$(button).prop('disabled', false);

				if(this.debug) {
					console.debug('AJAX query error');
					console.debug(status);
					console.debug(error);
				}

				if(typeof errorCallback == 'function')
					errorCallback();
				else
					$.app.showError();
			},
			ajaxStop: function(){
				t.ajaxQueryLoading = false;
			}
		});

		if(loading) {
			// If we don't receive an awnser after 1.5 second, a loading overlay will appear
			this._loadingTimeout = setTimeout(function() {
				t._showLoading();
			}, this._loadingDelay);
		}
		
		return xhrRequest;
	},

	date : {
		_date_regex : new RegExp(/^(\d{4})-{0,1}(\d{2})-{0,1}(\d{2})(| (\d{2}):(\d{2}):(\d{2}))$/),

		isDate : function(date) {
			var m = this._date_regex.exec(date);

			return m != null;
		},

		parse : function(date) {
			if(date === null)
				return false;

			if(typeof date == 'object'){
				if(typeof date.date != "undefined"){
					//Got data from model
					date = date.date;
				}
				else {
					//Probably got a Date object
					return date;
				}
			}

			var m = this._date_regex.exec(date);

			if(m == null) {
				if($.app.debug)
					console.debug('Could not parse date "'+date+'"');

				return false;
			}
			else {
				var obj = new Date();
				
				obj.setDate(1);
				obj.setYear(m[1]);
				obj.setMonth(parseInt(m[2], 10) -1);
				obj.setDate(m[3]);
				if(m[4]){
					obj.setHours(m[5]);
					obj.setMinutes(m[6]);
					obj.setSeconds(m[7]);
				}
				else {
					obj.setHours('0');
					obj.setMinutes('0');
					obj.setSeconds('0');
				}

				return obj;
			}
		},

    format: function(date, format) {

			if(typeof format == 'undefined'){
				format = 'long';
			}

			date = this.parse(date);

			if(!date){
				return '';
			}

			if(format == 'input'){
				return date.getFullYear() + '-' + $.app.pad(date.getMonth()+1, 2) + '-' + $.app.pad(date.getDate(), 2);
			}
			else if(format == 'long'){
				return ($.app.lang === "en" ? this.getMonthName(date.getMonth()) +' ' + date.getDate() + ', ': date.getDate() +' '+this.getMonthName(date.getMonth()) +' ') + date.getFullYear();
			}
			else if(format == 'longtime'){
				return ($.app.lang === "en" ? this.getMonthName(date.getMonth()) + ' ' + date.getDate() + ', ': date.getDate() +' '+this.getMonthName(date.getMonth())+' ') + date.getFullYear()+' '+$.app._('AT')+' '+date.getHours()+':' + $.app.pad(date.getMinutes(), 2);
			}
			else if(format == 'short') {
				return $.app.lang === "en" ? this.getMonthName(date.getMonth()) + ' ' + date.getDate() : date.getDate() +' '+this.getMonthName(date.getMonth());
			}
			else if(format == 'longabbrmonth'){
				var month = date.getMonth(),
					monthName,
					rData = $.datepicker.regional[$.app.lang];

				monthName = (rData) ? rData.monthNamesShort[month] : this.getMonthName(month).substring(0, 3);

				return ($.app.lang === "en" ? monthName + '. ' + date.getDate() + ', ' : date.getDate() +' '+monthName+'. ') + date.getFullYear();
			}

			if($.app.debug)
				console.debug('Unknown date format "' + format + '"');
			return '';
		},

		getMonthName: function(month) {
			if(typeof month == 'undefined' && arguments.length === 0) {
				month = (new Date()).getMonth();
			}

			switch (month) {
				case 0:
					return $.app._('JANUARY');
				case 1:
					return $.app._('FEBRUARY');
				case 2:
					return $.app._('MARCH');
				case 3:
					return $.app._('APRIL');
				case 4:
					return $.app._('MAY');
				case 5:
					return $.app._('JUNE');
				case 6:
					return $.app._('JULY');
				case 7:
					return $.app._('AUGUST');
				case 8:
					return $.app._('SEPTEMBER');
				case 9:
					return $.app._('OCTOBER');
				case 10:
					return $.app._('NOVEMBER');
				case 11:
					return $.app._('DECEMBER');
				default:
					$.app._throw('Unknown month "'+month+'"');
					break;
			}
		},

		getAge : function(date) {
			date = this.parse(date);

			if(date) {
				var now = new Date();

				var age = now.getFullYear() - date.getFullYear();

				if((now.getMonth() < date.getMonth()) || (now.getMonth() == date.getMonth() && now.getDate() < date.getDate()))
					age--;

				date = null;

				return age;
			}
			else
				return 0;
		},

		/**
		 * get a fake birthdate for this age
		 */
		getFakeBirthdate : function(age) {
			age = parseInt(age);
			if(!age) return '';

			var now = new Date();
			return (now.getFullYear() - age) + '-01-01';
		},

		getInsuranceAge : function(date) {
			var date_obj = this.parse(date);

			if(date_obj) {
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
					age ++;
				}
				date_obj = null;
				lastBirthday = null;
				now = null;
				nextBirthday = null;

				return age;
			}
			else
				return 0;
		},

		getYear : function(date) {
			date = this.parse(date);
			if(date)
				return date.getFullYear();
			else
				return 0;
		}
	},

	datepicker : function(selector, options) {
		return $(selector).bind('change', function() {
			this.value = $.app.date.format(this.value, 'input');
		}).datepicker(options);
	},

	_formatAddress : function(line1, line2, city, state, country, postalCode) {
		var address = '';

		var f=true;
		if(line1 !== '' && line1 !== false){
			f=false;
			address+= this.htmlEntity(line1);
		}

		if(line2 !== '' && line2 !== false){
			if(!f) address += ', ';
			f=false;
			address+= this.htmlEntity(line2);
		}

		if(city !== '' && city !== false){
			if(!f) address += ', ';
			f=false;
			address+= this.htmlEntity(city);
		}

		//TODO: Check with locallization
		if(state !== '' && state !="QC"){
			if(!f) address += ', ';
			f=false;
			address+= this.htmlEntity(state);
		}

		if(postalCode !== '' && postalCode !== false){
			if(!f) address += ', ';
			f=false;
			address+= this.htmlEntity(postalCode);
		}

		//TODO: Check with locallization
		if(country !== '' && country !== false && country != 'Canada'){
			if(!f) address += ', ';
			f=false;
			address+= this.htmlEntity(country);
		}

		return address;
	},

	formatAddress : function(line1, line2, city, state, country, postalCode) {
		return this._formatAddress(line1, line2, city, state, country, postalCode);
	},

	formatGMapAddress : function(line1, line2, city, state, country, postalCode){

		line1 = $.trim(line1);
		line2 = $.trim(line2);
		city = $.trim(city);
		country = $.trim(country);
		postalCode = $.trim(postalCode);

		line1 = line1.replace(/\bboul\./i, 'Boulevard');
		line1 = line1.replace(/,\s?\b(bur|bureau|app|appartement|appartment|local|office|porte|door)\b\.?\s*\d*/i, '');

		return 	(line1 ? line1 + ", " : '') +
			(line2 ? line2 + ", " : '') +
			(city ? city + ', ' : '') +
			(state ? state + ', ' : '') +
			(postalCode ? postalCode + ', ' : '') +
			country;
	},

	isMobile : function() {
		return navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/Pre/i) || navigator.userAgent.match(/Android/i);
	},

	/**
	*  Javascript sprintf (http://www.webtoolkit.info/)
	**/
	_sprintfWrapper : {

		init : function () {
			if (typeof arguments == "undefined") {return null;}
			if (arguments.length < 1) {return null;}
			if (typeof arguments[0] != "string") {return null;}
			if (typeof RegExp == "undefined") {return null;}

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
				if (match[9]) {convCount += 1;}

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

			if (matches.length === 0) {return string;}
			if ((arguments.length - 1) < convCount) {return null;}

			var code = null;
			match = null;
			var i = null;

			for (i=0; i<matches.length; i++) {
				var substitution;
				if (matches[i].code == '%') {
					substitution = '%';
				}
				else if (matches[i].code == 'b') {
					matches[i].argument = String(Math.abs(parseInt(matches[i].argument, 10)).toString(2));
					substitution = $.app._sprintfWrapper.convert(matches[i], true);
				}
				else if (matches[i].code == 'c') {
					matches[i].argument = String(String.fromCharCode(parseInt(Math.abs(parseInt(matches[i].argument, 10)))));
					substitution = $.app._sprintfWrapper.convert(matches[i], true);
				}
				else if (matches[i].code == 'd') {
					matches[i].argument = String(Math.abs(parseInt(matches[i].argument, 10)));
					substitution = $.app._sprintfWrapper.convert(matches[i]);
				}
				else if (matches[i].code == 'f') {
					matches[i].argument = String(Math.abs(parseFloat(matches[i].argument, 10)).toFixed(matches[i].precision ? matches[i].precision : 6));
					substitution = $.app._sprintfWrapper.convert(matches[i]);
				}
				else if (matches[i].code == 'o') {
					matches[i].argument = String(Math.abs(parseInt(matches[i].argument, 10)).toString(8));
					substitution = $.app._sprintfWrapper.convert(matches[i]);
				}
				else if (matches[i].code == 's') {
					matches[i].argument = matches[i].argument.substring(0, matches[i].precision ? matches[i].precision : matches[i].argument.length);
					substitution = $.app._sprintfWrapper.convert(matches[i], true);
				}
				else if (matches[i].code == 'x') {
					matches[i].argument = String(Math.abs(parseInt(matches[i].argument, 10)).toString(16));
					substitution = $.app._sprintfWrapper.convert(matches[i]);
				}
				else if (matches[i].code == 'X') {
					matches[i].argument = String(Math.abs(parseInt(matches[i].argument, 10)).toString(16));
					substitution = $.app._sprintfWrapper.convert(matches[i]).toUpperCase();
				}
				else {
					substitution = matches[i].match;
				}

				newString += strings[i];
				newString += substitution;

			}
			
			newString += strings[i];
			return newString;
		},

		convert : function(match, nosign){
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
	},

	/**
	 * Download a file using an iframe
	 */
	downloadFile : function(url){
		var t = this;
		
		if(!t._iPad){
			var frameId =  'download_iframe';
			var io = document.getElementById(frameId);
			if(!io){
				io = document.createElement('iframe');
				io.id = frameId;
				io.name = frameId;
				io.style.position = 'absolute';
				io.style.top = '-1000px';
				io.style.left = '-1000px';
				document.body.appendChild(io);
			}

			io.src = url;
		}
		else {
			var content = '<h2>'+$.app._('DOWNLOAD_FILE_DIALOG_TITLE')+'</h2>\
			<div class="header_line"></div>\
			<a id="hook_download_file" href="javascript:void(0);">' + t._('DOWNLOAD_FILE') + '</a>\
			<br /><br />';

			$.app.showModalDialog(content, 'normal', function() {
				$('#hook_download_file').click(function(){
					window.open(url, '_blank');
					$.app.hideModalDialog('fast');
				});
			});
		}

	},

	sprintf : function() { },

	isIE7 : function() {
		var rv = 999;
		if (navigator.appName == 'Microsoft Internet Explorer') {
			var ua = navigator.userAgent;
			var re  = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
			if (re.exec(ua) != null)
				rv = parseFloat( RegExp.$1 );
		}

		return (rv < 8);
	},
	
	isOpera : function() {
		return navigator.appName == 'Opera';
	},

	autocompleter : function(selector, view, command, callback, config) {
		var autocompleter = {
			selector : false,
			selectorIsDomRef: false,
			view : '',
			command : '',
			callback : false,

			width : 300,

			matchContains : false,
			listSize : 10,
			minChars : 2,

			showAll : false,
			showDescription : false,

			_doHighlight : false,
			_customHighlight : false,
			_customItemFormat : false,
			_customDescriptionFormat : false,

			_filters : [],

			_init : function(selector, view, command, callback, config) {
				this.selector = selector;
				this.view = view;
				this.command = command;
				this.callback = callback;

				if(config.width)
					this.width = config.width;

				if(typeof config.matchContains == 'boolean')
					this.matchContains = config.matchContains;

				if(config.listSize)
					this.listSize = parseInt(config.listSize, 10);

				if(config.minChars)
					this.minChars = parseInt(config.minChars, 10);

				if(typeof config.showAll == 'boolean')
					this.showAll = config.showAll;

				if(typeof config.showDescription == 'boolean')
					this.showDescription = config.showDescription;

				if(typeof config.highlight == 'boolean')
					this._doHighlight = config.highlight;

				if(typeof config.customHighlight == 'function')
					this._customHighlight = config.customHighLight;

				if(typeof config.itemFormat == 'function')
					this._customItemFormat = config.itemFormat;

				if(typeof config.descriptionFormat == 'function')
					this._customDescriptionFormat = config.descriptionFormat;

				if(typeof config.parse == 'function')
					this.parse = config.parse;

				if(typeof config.selectorIsDomRef == 'boolean')
					this.selectorIsDomRef = config.selectorIsDomRef;

				if(typeof config.query_string_param_name == 'string' && $.trim(config.query_string_param_name) !== '')
					this.queryStringParamName = config.query_string_param_name;

				if(config.params)
					this.params = config.params;

			},

			_build : function() {
				var t = this;

				var options = {};

				options.width = this.width;
				options.position = 'fixed';
				options.max = this.listSize;
				options.matchContains = this.matchContains;
				options.minChars = this.minChars;
				options.selectFirst = false;
				options.scrollHeight = 450;
				options.queryStringParamName = this.queryStringParamName;
				options.formatItem = function(data, position, length, term) {return t._formatItem(data, position, length, term);};
				options.highlight = function(label, term) {return t._highlight(label, term);};
				options.extraParams = function() {return t._extraParams();};
				if(this.parse){options.parse = this.parse;}


				return options;
			},

			_formatItem : function(data, position, length, term) {
				if(this._filtered(data[2]))
					return false; // Was asked not to show this one

				var label;
				if(typeof this._customItemFormat == 'function')
					label = this._customItemFormat(data, position, length, term);
				else
					label = data[2];

				if(this.showDescription) {
					if(typeof this._customDescriptionFormat == 'function')
						label += this._customDescriptionFormat(data, position, length, term);
					else
						label += '<br /><span class="description">'+data[3]+'</span>';
				}
				return label;
			},

			_filtered : function(value) {
				for(var i = 0; i < this._filters.length; i++) {
					if(this._filters[i] == value)
						return true;
				}

				return false;
			},

			_highlight : function(label, term) {
				if(this._doHighlight) {
					if(typeof this.custom_highlight == 'function')
						return this.custom_highlight(label, term);
					else
						return label.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<span class=\"ac_match\">$1</span>");
				}
				else {
					return label;
				}
			},

			_extraParams : function() {
				var params = {};
				if(this.matchContains)
					params.contains = 'true';

				if(this.params) {
					if(typeof this.params == 'function') {
						var url_params = this.params();
						if(typeof url_params == 'object') {
							$.each(url_params, function(key, param) {
								params[key] = param;
							});
						}
						else {
							params.param = this.params;
						}
					}
					else if(typeof this.params == 'object') {
						$.each(this.params, function(key, param) {
							params[key] = param;
						});
					}
					else
						params.param = this.params;
				}

				params.view = this.view;
				params.cmd = this.command;
				params.k = $.app.SESSION_KEY;

				return params;
			},

			_result : function(event, data, label) {
				if(typeof this.callback == 'function') {
					this.callback(data);
				}
			},

			filterValue : function(value, filter) {
				var found = false;

				for(var i = 0; i < this._filters.length; i++) {
					if(value == this._filters[i]) {
						if(filter || typeof filter == 'undefined')
							found = true;
						else {
							delete(this._filters[i]);

							for(var j = i+1; j < this._filters.length; j++) {
								this._filters[j-1] = this._filters[j];
							}
							this._filters.pop();

							return true;
						}
					}
				}

				if((filter || typeof filter == 'undefined') && !found) {
					this._filters.push(value);
					return true;
				}

				return false;
			}
		};

		autocompleter._init(selector, view, command, callback, config);

		var options = autocompleter._build();
		var mySelector = false;
		if(!options.selectorIsDomRef){
			mySelector = $(selector);
		}
		else {
			mySelector = selector;
		}

		mySelector.autocomplete('index.php', options).bind('result', function(event, data, label) {autocompleter._result(event, data, label);});

		return autocompleter;
	},

	visualizationReady : function() {
		if(this.debug) console.debug('Google Visualization API ready');

		this._visualization_ready = true;
	},

	isVisualizationReady : function() {
		if(!this._visualization_ready) {
			if(google && google.visualization) {
				this._visualization_ready = true;
			}
		}

		return this._visualization_ready;
	},

	// Access an object using dot notation
	getByKey : function(obj, key){
		var nav = obj;
		var tokens = key.split('.');
		for(var i = 0; i < tokens.length; i++){
			if(typeof nav != "object") return undefined;
			nav = nav[tokens[i]];
		}
		return nav;
	}
};

$.extend({app:app});

Function.prototype.inherits = function(parent){
	if(this.prototype) {
		this.own_prototype = this.prototype;

		delete(this.prototype);
	}

	if ( parent.constructor == Function ) {
		this.prototype = {};
		this.prototype = new parent();
		this.prototype.constructor = this;
		this.prototype.parent = parent.prototype;
	}
	else {
		this.prototype = parent;
		this.prototype.constructor = this;
		this.prototype.parent = parent;
	}

	if(this.own_prototype) {
		this.extend(this.own_prototype);

		delete(this.own_prototype);
	}

	return this;
};

Function.prototype.extend = function(object) {
	for(var k in object) {
		this.prototype[k] = object[k];
	}
};

if (!Array.prototype.reduce)
{
	Array.prototype.reduce = function(fun) {
		var len = this.length;
		if (typeof fun != "function")
			throw new TypeError();

		// no value to return if no initial value and an empty array
		if (len === 0 && arguments.length == 1)
			throw new TypeError();

		var i = 0;
		var rv;
		if (arguments.length >= 2)
		{
			rv = arguments[1];
		}
		else
		{
			do
			{
				if (i in this)
				{
					rv = this[i++];
					break;
				}

				// if array contains no values, no initial value to return
				if (++i >= len)
					throw new TypeError();
			}
			while (true);
		}

		for (; i < len; i++)
		{
			if (i in this)
				rv = fun.call(null, rv, this[i], i, this);
		}

		return rv;
	};
}

Function.prototype.method = function(name, func) {
  if (!this.prototype[name]) {
	  this.prototype[name] = func;
	  return this;
  }
};

Array.method('sum', function()
{
	return this.reduce( function(a, b){return a + b;}, 0 );
});

Array.prototype.extend = function(a)
{
	var t = this;
	return a.map(function(e,i) {return t.hasOwnProperty(i) ? t[i] : e;});
};

// Add ECMA262-5 Array methods if not supported natively
//
if (!('indexOf' in Array.prototype)) {
    Array.prototype.indexOf= function(find, i /*opt*/) {
        if (i===undefined) i= 0;
        if (i<0) i+= this.length;
        if (i<0) i= 0;
        for (var n= this.length; i<n; i++)
            if (i in this && this[i]===find)
                return i;
        return -1;
    };
}

if (!('lastIndexOf' in Array.prototype)) {
    Array.prototype.lastIndexOf= function(find, i /*opt*/) {
        if (i===undefined) i= this.length-1;
        if (i<0) i+= this.length;
        if (i>this.length-1) i= this.length-1;
        for (i++; i-->0;) /* i++ because from-argument is sadly inclusive */
            if (i in this && this[i]===find)
                return i;
        return -1;
    };
}
if (!('forEach' in Array.prototype)) {
    Array.prototype.forEach= function(action, that /*opt*/) {
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this)
                action.call(that, this[i], i, this);
    };
}
if (!('map' in Array.prototype)) {
    Array.prototype.map= function(mapper, that /*opt*/) {
        var other= new Array(this.length);
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this)
                other[i]= mapper.call(that, this[i], i, this);
        return other;
    };
}
if (!('filter' in Array.prototype)) {
    Array.prototype.filter= function(filter, that /*opt*/) {
        var other= [], v;
        for (var i=0, n= this.length; i<n; i++)
            if (i in this && filter.call(that, v= this[i], i, this))
                other.push(v);
        return other;
    };
}
if (!('every' in Array.prototype)) {
    Array.prototype.every= function(tester, that /*opt*/) {
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this && !tester.call(that, this[i], i, this))
                return false;
        return true;
    };
}
if (!('some' in Array.prototype)) {
    Array.prototype.some= function(tester, that /*opt*/) {
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this && tester.call(that, this[i], i, this))
                return true;
        return false;
    };
}

$.range = function(a,b) {
	var r = [];
	var i = 0;
	if (a <= b) {
		for (i = a; i <= b; i ++) {
			r.push(i);
		}
	}
	if (a > b) {
		for (i = b; i > a; i --) {
			r.push(i);
		}
	}
	return r;
};

$.zeros = function(a) {
	return $.range(1,a).map(function() {return 0;});
};

/**
* Base class for Views
*/
function View() {
	this._view = '';
	this._id = false;
	this._uri_params = {};

	this._controls = {};

	this._redrawn = false;
}

View.prototype = {
	parseHash : function(hash) {
		var uri = $.app.parseHash(hash);

		var pos = uri.view.indexOf('/');
		if(pos > 0) {
			var next = uri.view.indexOf('/', pos+1);
			if(next > 0) {
				pos = next;

				uri.id = uri.view.substr(pos+1);
				uri.view = uri.view.substr(0, pos);
			}
		}
		else {
			uri.id = false;
		}

		return uri;
	},

	onHashChange : function(hash) {
		var uri = this.parseHash(hash);

		return this._onHashChange(hash, uri);
	},

	_onHashChange : function(hash, uri) {
		// Hash changed but we stay in the same view object

		return false; // Return true here if you want to handle the change and prevent the application from fetching data from the server
	},
	
	onScrollToAnchor: function($element, anchor_name){
		$element.focus();
		var element_offset = $element.offset();
		window.scrollTo(element_offset.left, element_offset.top);
	},

	init : function(hash) {
		var uri = this.parseHash(hash);

		this._uri = uri;
		this._view = uri.view;
		this._id = uri.id;
		this._uri_params = uri.params;

		this._controls = {};

		this._init(hash);
	},

	_init : function() {
		if($.app.debug)
			$.app._throw('View does not implement _init function');
	},

	load : function(params) {
		this._load(params);
	},

	_load : function(params) {
		this.params = params;
	},

	draw : function(html) {
		this._onBeforeDraw();

		if(this._canRedraw()) {
			var selectors = this._getRedrawingSelectors();

			var can_redraw = true;

			for(var i = 0; can_redraw && i < selectors.length; i++) {
				if(!$(selectors[i]).length) {
					can_redraw = false;
				}
			}

			selectors = null;

			if(can_redraw) {
				this._redrawn = true;

				if($.app.debug)
					console.debug('Redrawing content');

				this._onDraw(true);

				return;
			}
		}

		this._redrawn = false;


		if($.app.debug)
			console.debug('Drawing view');

		$('#content').html(html);

		this._onDraw();
	},

	_canRedraw : function() {
		return false;
	},

	_getRedrawingSelectors : function() {
		return [];
	},

	/**
	* You can override this function to do anything before the view is drawn (or redrawn)
	*/
	_onBeforeDraw : function() { },

	/**
	* You can override this function to know when the view is done drawing
	*/
	_onDraw : function(redrawn) { },

	hook : function(hash) {
		var t = this;
		if(!t._redrawn) {
			if($.app.debug)
				console.debug('Hooking view');

			this._hook(hash);

			t.updateReturnToParentView();
		}
	},

	_hook : function(hash) {
		if($.app.debug)
			$.app._throw('View does not implement _hook function');
	},

	inject : function(model) {
		if($.app.debug)
			console.debug('Injecting model');

		this._inject(model);
	},

	_inject : function(model) {
		if($.app.debug)
			$.app._throw('View does not implement _inject function');
	},

	close : function(hash) {
		var canClose = this._canClose(hash);

		if(!canClose) {
			this._onCancelClose();
		}

		return canClose;
	},

	_canClose : function() {
		return true;
	},

	_onCancelClose : function() {
		if($.app.debug)
			$.app._throw('View does not implement _onCancelClose function');
	},

	pushParentView : function(view_name) {
		var t = this;
		var ret = '';
		if(t._uri_params.parent_view){
			ret += t._uri_params.parent_view + '|';
		}
		ret += view_name;
		return ret;
	},

	popParentView : function(include_id){
		if(typeof include_id == "undefined")
			include_id = true;
		
		var t = this;
		if(!t._uri_params.parent_view){
			return false;
		}

		var views = t._uri_params.parent_view.split('|');
		var parent_view = views.pop();
		var url = '';
		
		if (include_id)
			url = '#' + parent_view + '/'+t._id;
		else
			url = '#' + parent_view;
		
		if(views.length>0){
			url += '&parent_view=' + views.join('|');
		}

		return url;
	},

	getCurrentView: function() {
		var fullView = this._view;

		if (this._id !== undefined) {
			fullView += '/' + this._id;
		}

		return fullView;
	},

	getParentView: function(){
		var t = this;
		if(!t._uri_params.parent_view){
			return false;
		}

		var views = t._uri_params.parent_view.split('|');
		return views.pop();
	},

	getReturnURL : function(defaultReturn) {
		var parentView = this.popParentView(false);
		return parentView ? parentView : defaultReturn;
	},

	getParentViewParam: function(viewInfo) {
		var parentViewValue = (viewInfo === undefined) ? this.pushParentView(this.getCurrentView()) : this.pushParentView(viewInfo);
		return '&parent_view=' + parentViewValue;
	},

	updateReturnToParentView : function(){
		var t = this;
		var parent_view = t.getParentView();
		if(parent_view){
			var translate_key = 'BACK_TO_' + parent_view.toUpperCase().split('/').splice(0,2).join('_');
			var label = $.app._(translate_key);
			$('.hook_back_to_parent_view').text(label);
		}
	}
};

/**
* Base class for views with form
*/
function EditView() {
	this._can_save = true;
	this._modified = false;
	this._soft_modified = false;
	this._wasClosing = false;
	this.validation_rules = {};
	this.validation_conditions = {};
}

EditView.prototype = {
	init : function(hash) {
		this._wasClosing = false;

		View.prototype.init.call(this, hash);
	},

	changed : function() {
		if($.app.debug) console.debug('changed');
		if(!this._modified)
			this._modified = true;
	},

	softModified : function() {
		if($.app.debug) console.debug('soft modified');
		if(!this._soft_modified)
			this._soft_modified = true;
	},

	hook : function(hash) {
		if(!this._redrawn) {
			if($.app.debug)
				console.debug('Hooking view');

			var t = this;

			$('#content form').delegate(':input[name]:not(.no-form-change)', 'change', function(){t.changed();});
			$('#content form').delegate(':input[type=text]:not(.no-form-change)', 'keypress', function(){t.changed();});
			$(".number:not(.positive)").number();
			$(".number.positive").number({positive:true});

			this._hook(hash);

			t.updateReturnToParentView();

			// Prevent IE to prompt that a change occured when clicking on a link with href=javascript:
			if (navigator.appName == 'Microsoft Internet Explorer') {
				$(window).data('beforeunload',window.onbeforeunload);  
				$(document).on('mouseenter', 'a[href^="javascript:"]', function(){window.onbeforeunload=null;})
				           .on('mouseleave', 'a[href^="javascript:"]', function(){window.onbeforeunload=$(window).data('beforeunload');});
			}

			window.onbeforeunload = function(e) {
				if(t._modified)
					return $.app._('SAVE_CHANGES_MESSAGE');
				else
					return;
			};
		}
	},

	inject : function(model) {
		if($.app.debug)
			console.debug('Injecting model');

		this._soft_modified = false;

		this._inject(model);

		this._modified = false;
	},

	close : function(hash) {
		$("#edit_form").off('**');
		if(this._modified && this._can_save) {
			this._wasClosing = true;

			this.showSaveDialog();
			
			return false;
		}
		else {
			var canClose = this._canClose(hash);

			if(!canClose) {
				this._onCancelClose();
			}
			else {
				this._onClose();
			}

			return canClose;
		}
	},

	showSaveDialog : function() {
		var t = this;

		$.app.showModalDialog('<h2>'+$.app._('SAVE_CHANGES_TITLE')+'</h2><p>'+$.app._('SAVE_CHANGES_MESSAGE')+'</p><p class="submit"><input type="submit" id="hook_do_save_changes" value="'+$.app._('YES')+'" /> <input type="submit" id="hook_do_not_save_changes" value="'+$.app._('NO')+'" /> <a href="javascript:void(0);" id="hook_cancel_save_changes">'+$.app._('CANCEL')+'</a></p>', 'normal', function() {
			$('#hook_do_save_changes').safeClick(function() {
				t.hideSaveDialog('save');
			});

			$('#hook_do_not_save_changes').safeClick(function() {
				t.hideSaveDialog('resume');
			});

			$('#hook_cancel_save_changes').safeClick(function() {
				t.hideSaveDialog();
			});
		});
	},

	hideSaveDialog: function(action) {
		var t = this;

		$.app.hideModalDialog('normal', function() {
			if(action == 'save') {
				var saved = t.save(function() {
					t.resume();
				});

				if(!saved)
					t.stop();
			}
			else if(action == 'resume') {
				
				window.onbeforeunload = function (e) { return; };
				
				if(!t._canClose()) {
					t._onCancelClose();

					t.stop();
				}
				else
					t.resume();
			}
			else
				t.stop();
		});
	},

	save : function(hash, success_callback, error_callback, stay) {
		if(!this._can_save) return this._saveRedirect(hash, stay);

		if(!this._canSave()){
			this._onCancelSave();
			return false;
		}

		if(this._wasClosing) {
			if(!this._canClose()) {
				this._onCancelClose();

				return false;
			}
		}

		if(typeof hash == 'function') {
			if(typeof success_callback == 'function'){
				error_callback = success_callback;
			}
			success_callback = hash;
			hash = false;
		}

		if(this._wasClosing) {
			hash = $.app.getResumeHash();
		}

		if(!this._modified && !this._soft_modified) {

			if(typeof success_callback == 'function') {
				success_callback({}, false);
				success_callback = null;
			}

			this._saveRedirect(hash, stay);

			return true;
		}

		$('input[type=submit],input[type=button]').prop('disabled', true);

		var t = this;

		$.app.showOverlay();

		var params = this._onSave();
		
		window.onbeforeunload = function (e) { return; };

		$.ajax({
			url:'index.php?k=' + $.app.SESSION_KEY + '&view=' + this._view + '&cmd=save&id=' + this._id+params,
			type: 'POST',
			data: this._saveBuildPost(),
			dataType:'json',
			success: function(data) {
				if(!data) data = {};
				if(data.data){ 
					// backward compatibility with communicable.
					data = data.data; 
				} 
				$.app.hideOverlay();
				$('input[type=submit],input[type=button]').prop('disabled', false);
				
				if(data.validation_errors && data.validation_errors.length){
					$.each(data.validation_errors, function(i, err){
						$('#' + err.field).hintError(err.message);
					});
					
					return;
				}

				if(data.status == 'error') {
					if($.app.debug) {
						console.debug('Save failed with error : '+data.message);
					}

					if(typeof error_callback == 'function') {
						error_callback(data);
						error_callback = null;
					}
					else {
						$.app.showError($.app._('SAVE_ERROR_OCCURED'));
					}

					return;
				}

				t._modified = false;

				t._afterSave();

				if(typeof success_callback == 'function') {
					success_callback(data, true);
					success_callback = null;
				}

				t._saveRedirect(hash, stay);
			},
			error: function(xhr, status, error) {
				t._saveErrorHandler(xhr, status, error, error_callback);
			}
		});

		return true;
	},

	// _saveSomething methods : save helper functions
	_saveRedirect: function(hash, stay){
		if(stay) return;

		this._onClose();
		if(typeof hash == 'string') $.app.goTo(hash);
		else $.app.goBack();
	},

	_saveErrorHandler: function(xhr, status, error, error_callback){
		if(!$.app.validateXHR(xhr)){
			return false;
		}

		if($.app.debug)
			console.debug('error...');

		if(typeof error_callback == 'function') {
			error_callback(false);
			error_callback = null;
		}

		$.app.hideOverlay();
		$('input[type=submit]').prop('disabled', false);

		$.app.showError($.app._('SAVE_ERROR_OCCURED'));
	},

	_saveBuildPost: function(){
		return '&model=' + encodeURIComponent($.toJSON(this.createModel()));
	},

	_canSave : function() {
		if($.app.debug)
			$.app._throw('View does not implement _canSave function');

		return true;
	},

	_onCancelSave : function() { },

	_onSave : function() {
		return '';
	},

	_afterSave : function() { },

	_onClose : function() {	},

	createModel : function() {
		var model= {};

		$("form input[name],select[name],textarea[name]")
			.each(function(index, element){
				var value = element.value;

				if(element.type == "radio" || element.type == "checkbox"){
					if(element.checked){
						if(value == 'on')
							model[element.name] = 'YES';
						else
							model[element.name] = value;
					}
				}
				else if($(element).hasClass('money')){
					model[element.name] = $(element).moneyVal();
				}
				else if($(element).hasClass('percent')){
					model[element.name] = $.app.parseFloat(value.replace("%",""));
				}
				else if($(element).hasClass('number')){
					model[element.name]= $.app.parseFloat(value);
				}
				else {
					model[element.name]= value;
				}
		});

		if(this._onCreateModel){
			model = this._onCreateModel(model);
		}

		model = this._removeNullValue(model);

		return model;
	},

	_onCreateModel : function(model) {
		return model;
	},
	
	alternateCreateModel: function(model) {
		var alternateModel = {};
	 
		var replaceBracket = function(t) {
			return t.replace(']', '');
		};
	
		var reduceFunc = function(previous, current) {
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
	},

	_removeNullValue : function(model){
		if(typeof model =="object"){
			for(var index in model){
				model[index] = this._removeNullValue(model[index]);
			}
		}
		else if(!model){
			model = '';
		}

		return model;
	},

	cancel : function(hash) {

		$('input[type=submit],input[type=button]').prop('disabled', true);
		
		this._modified = false;

		if(typeof hash == 'undefined') {
			hash = $.app.navigateBackTo("");
		}

		$('input[type=submit],input[type=button]').prop('disabled', false);
		
		if (hash) {
			$.app.navigateBackTo(hash);
		}
		else {
			history.back();
		}
	},

	resume : function() {
		$.app.resume(false);
	},

	stop : function() {
		$.app.resume(true);
	}
};

EditView.inherits(View);
$.app.lang = "fr";
