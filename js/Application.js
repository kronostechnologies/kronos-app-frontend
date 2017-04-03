// @flow

import EventEmitter from 'events';
import Raven from 'raven-js';
import BrowserDetect from "./BrowserDetect";
import FetchService, {FetchAbortError, FetchResponseDataError} from './FetchService';

declare var $: jQuery;
declare var window: Object;
declare var document: Object;

declare type FetchOptions = {
	successCallback: (data)=> void; // Deprecated. Use Promise.then()
	errorCallback: (error) => void; // Deprecated. Use Promise.catch()
	showLoading: boolean;
	showOverlay: boolean;
	buttonSelector: string; // jQuery selector for button to be disabled
	skipOverlayHandling: boolean;
}

export default class Application extends EventEmitter{

	constructor(router: Router, dependencies: {} = {}) {
		super();
		this.router = router;

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

		this.unmounts = [];


		this.browser = dependencies.browserDetect || new BrowserDetect(navigator.userAgent);

		this.fetchService = new FetchService(this);

		this.detectedExpiredSessionTimeout=false;
		this.detectedExpiredSessionGoTo=false;
		this.detectedNetworkErrorTimeout=false;
		this.detectedNetworkErrorGoTo=false;

		this.ravenEnabled = false;
	}

	/**
	 * Initialize application
	 */
	init() {
		const self = this;

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




		// Error catching function
		window.onerror = function (description, page, line) {
			// Support jsmonitor.io
			if (typeof window.UEInfo !== 'undefined') {
				window.errors.push(arguments);
				window.UEInfo.run();
			}

			return self._onError(description, page, line);
		};

		window.addEventListener("unhandledrejection", (event) => {
			let error = event.reason;

			if(error instanceof FetchAbortError){
				event.preventDefault();
				return;
			}

			console.warn("WARNING: Unhandled promise rejection. Shame on you! Reason: " + event.reason);

			if(this.ravenEnabled){
				Raven.captureException(event.reason);
			}
		});

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
			beforeSend(xhr) {
				if (!this.crossDomain) {
					const headers = self.getXSRFHeaders();
					$.each(headers, (key, value) => {
						xhr.setRequestHeader(key, value);
					});
				}
			}
		});
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
			Raven.config('https://' + config.sentry.key + '@app.getsentry.com/' + config.sentry.project, { release: config.application_version });

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

			Raven.install();

			this.ravenEnabled = true;
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

	/**
	 * Get current XSRF cookie value
	 * @returns {*}
	 */
	getXSRFToken(){
		if(this._xsrf_cookie_name){
			var cookie_value = $.cookie(this._xsrf_cookie_name);
			if(typeof cookie_value != 'undefined'){
				return cookie_value;
			}
			else {
				return false;
			}
		}
		else {
			return false;
		}
	}

	/**
	 * Get XSRF headers to append to ajax requests
	 * @returns {{}}
	 */
	getXSRFHeaders() {
		var self = this;
		var headers = {};
		var xsrf_token = self.getXSRFToken();
		if(self._xsrf_header_name){
			headers[self._xsrf_header_name] = xsrf_token;
		}
		return headers;
	}

	/**
	 * Get XSRF data to append to a post request (ex: in ajaxUploader)
	 * @returns {{}}
	 */
	getXSRFData() {
		var self = this;
		var data = {};
		var xsrf_token = self.getXSRFToken();
		if(self._xsrf_cookie_name){
			data[self._xsrf_cookie_name] = xsrf_token;
		}
		return data;
	}

	setUserConfig(user_config){
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

	_setUserConfig() { }

	setLocale(locale){
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

		moment.locale(this.lang);

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
	}

	/**
	 * Get a translation
	 */
	_(message_id){

		if(!this._messages[this.lang]){
			return message_id;
		}

		var msg = this._messages[this.lang][message_id];

		return (msg ? msg : message_id);
	}

	/**
	 * Start building the application
	 */
	start() {
		this.hook();

		var self = this;
		window.onhashchange = function() {
			if(self._is_observing_hash) {
				self._checkHash();
			}
			else {
				self._hash_changed_while_not_observing = true;
			}
		};

		this._observe();
	}

	hook(){
		var t = this;

		if(typeof this._hook == 'function'){
			this._hook();
		}

		//Init Zendesk
		$('.hook_question_comments').click(function(){
			t.showQuestionCommentDialog();
		});
	}

	loadMessages(lang, messages) {
		this._messages[lang] = messages;
	}

	/**
	 * This function is triggered just before the browser change or close the page.
	 */
	_beforeUnload(e) {
		if(this.sendErrors || this.sendErrorsOnUnload) {
			this._sendErrors();
		}

		this.abortOngoingXHR();

		return; // Simply quit page. Return false or true for standard confirmation page, or return a question to the user for a custom dialog. IE does not support null. Simply return nothing.
	}

	/**
	 * Create a json error from given error message.
	 * Added to support sending fatal errors.
	 */
	_throw(message, fatal) {
		return $.toJSON({message:message, type:(fatal ? 'fatal' : 'error')});
	}


	/**
	 * Error handling function
	 *
	 * @param description Error description
	 * @param page JavaScript file in which the error occured
	 * @param line Line number where the error occured
	 */
	_onError(description, page, line) {
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
	}

	/**
	 * Send catched errors to the server
	 *
	 * TODO : Offline mode
	 */
	_sendErrors() {
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
	}

	_showNavigationError() {
		const self = this;
		self.showModalDialog('<h2>'+self._('NAVIGATION_ERROR')+'</h2>\
										<p>\
											<strong>'+self._('INVALID_PAGE_REQUEST')+'</strong>\
											<br />\
										</p>\
										<p class="submit">\
											<input type="submit" id="hook_create_error_close" value="'+self._('OK')+'" />\
										</p>', 'fast', function() {
			$('#hook_create_error_close').safeClick(function() {
				self.hideModalDialog('fast');

				// stop looking at the location for now ...
				self._stopObservation();

				// ... revert page change ...
				self.hash = self.stepBack();
				self._history.push(self.hash);

				// ... and then start to observe again
				self._observe();
			});
		});
	}

	/**
	 *	Show a modal dialog telling the user something bad happened. He can try again or go back to where he was before.
	 */
	_showFatalError(error) {
		var self = this;

		this.showModalDialog('<h2>'+self._('ERROR')+'</h2>\
						<p>\
							<strong>'+self._('FATAL_ERROR_OCCURED')+'</strong>\
							<br />\
					init	</p>\
						<p class="submit">\
							'+self._('FATAL_ERROR__YOU_CAN')+' <a id="fatal-error-reload" href="javascript:void(0);">'+self._('FATAL_ERROR__RELOAD_PAGE')+'</a> '+self._('OR')+' <a id="fatal-error-stepback" href="javascript:void(0);">'+self._('FATAL_ERROR__GO_BACK')+'</a>\
						</p>', 'fast', function() {

			$('#fatal-error-reload').click(()=>{
				self._hideFatalError('reload');
			});
			$('#fatal-error-stepback').click(()=>{
				self._hideFatalError('stepback');
			});
			self._errors.push({description:error, page:'Application.js', line:0});
		});
	}

	/**
	 *	Close the modal dialog then reload or back, depending on what the use chose.
	 */
	_hideFatalError(action) {
		const self = this;
		this.hideModalDialog('fast', function() {
			self.hideOverlay();

			$('#fatal_error').remove();

			if(action == 'reload') {
				location.reload();
			}
			else if(action == 'stepback') {
				self.forceStepBack();
			}
		});
	}

	/**
	 * Start the hash observation loop
	 */
	_observe() {
		if(this.debug) {
			console.debug('Observing hash from now on');
		}

		this._is_observing_hash = true;

		if(this._hash_changed_while_not_observing) {
			this._hash_changed_while_not_observing = false;

			this._checkHash();
		}
	}

	/**
	 * Stop the hash observation loop
	 */
	_stopObservation() {
		if(this.debug) {
			console.debug('Stopped hash observation');
		}

		this._is_observing_hash = false;
	}

	/**
	 * Get location hash and check if it changed
	 */
	_checkHash() {
		const self = this;
		let view;

		if(this.view_fetching || this.hash === location.hash) {
			return;
		}

		//Store the new hash before the loop starts again
		if(this.debug) {
			console.debug('Hash changed');
		}

		this.hash = location.hash;

		// Get the requested view
		if(!this.hash || this.hash == '#') {
			this.goTo(this.default_view);
			return false;
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

		const initialState = {
			fetch: true,
			cancel: false
		};

		let fetchViewPromise = Promise.resolve(initialState);

		if(self.currentView){
			fetchViewPromise = fetchViewPromise
				.then((state) => {
					return self._getViewObject(self.currentView)
						.then((viewObject)=> {

							// Are we staying in the same view ?
							// Did the the view handled the hash change ?
							if(view === self.currentView && viewObject.onHashChange(self.hash)) {
								state.fetch = false;
								return state;
							}

							// If we where in a view and we're not resuming navigation (see Test form for more detail) we can ask to view to close;
							if(self.currentView && !self._resume_hash) {

								if(!viewObject.close(self.hash)) { // Can we continue ?
									// Cannot close current view abort view change
									if(self.debug) {
										console.debug('View coulnd\'t close');
									}

									// Temporarily stop the hash observation loop so we can ...
									self._stopObservation();

									// ... keep where the user wanted to go and stay where we were ...
									self._resume_hash = self.hash;
									self.hash = self.stepBack();

									// ... and then start to observe again
									self._observe();

									state.cancel = true;
									return state;

								}
								else {
									// Close current view
									self.emit('viewClose', viewObject);
									return state;
								}
							}
						})
						.catch(() => state); // Forward state
				});
		}

		fetchViewPromise.then((state) => {
			if(state.cancel){
				return false;
			}

			// We don't need that information anymore. It can block us from getting away from the current view if we don't
			self._resume_hash = false;

			// We don't keep page reloads in history
			if(self._force_clear){
				self.addHistory(self.hash);
				self._force_clear = false;
			}
			else if(!self._detectStepBack(self.hash)) {
				self.addHistory(self.hash);
			}

			if(state.fetch){
				if(self.debug) {
					console.debug('View : '+view);
				}

				// Just to be sure we leave nothing behind
				self.hideModalDialogNow();

				// Highlight the right menu
				self._selectViewMenu(view);

				// It's time to change the view
				self._fetchView(view);
			}
		});

	}

	goTo(hash, force_clear) {
		if(this.debug) {
			console.debug('Go To "'+hash+'"');
		}

		if(force_clear) {
			this._force_clear = true;
		}

		location.hash = hash;
	}

	goToNoTriggerHashChange(hash){
		this._stopObservation();
		this.goTo(hash);
		this._hash_changed_while_not_observing = false;
		this.hash = hash;
		this._observe();
	}

	navigateBackTo(hash) {
		this._history.pop();
		this.replace(hash);
	}

	replace(hash) {
		if (!hash) {
			hash = '';
		}

		if(hash.charAt(0) != '#'){
			hash = '#' + hash;
		}

		if (this.isOpera()) {
			location.replace(location.protocol + '//' + location.hostname + location.pathname + hash);
			return;
		}
		location.replace(hash);
	}

	forceGoTo(hash, force_clear) {
		this._stopObservation();

		if(this.debug) {
			console.debug('Force Go To "'+hash+'"');
		}

		if(force_clear) {
			this._force_clear = true;
		}

		location.hash = hash;
		location.reload();
	}

	/**
	 * Resume user navigation, or not. If view could not close, we stored the hash into _resume_hash to be able to resume when the time comes
	 */
	resume(stay) {
		var self = this;
		if(this._resume_hash) {
			if(!stay && typeof stay != 'undefined') {

				// Trigger viewClose eventually
				this._getViewObject(this.currentView)
					.then((viewObject) => {
						self.emit('viewClose', viewObject);
					})
					.catch(() => {});


				// We're going where the user wanted to before the view cancelled it
				this.currentView = false;

				var hash = this._resume_hash; // Using temporary variable to be sure hash observation loop does not mess with this
				this._resume_hash = false;

				location.hash = hash;

				if(this.debug) {
					console.debug('View closed, resuming');
				}
			}
			else {
				this._resume_hash = false;

				this.addHistory(location.hash);

				if(this.debug) {
					console.debug('View cancelled closing');
				}
			}
		}
	}

	getResumeHash() {
		return this._resume_hash;
	}

	/**
	 * Utility function to parse the location hash.
	 * Hash should look like this :
	 * <view>&<param>=<value>&<param2>=<value2>&...
	 * values must be urlencoded
	 */
	parseHash(hash) {
		var infos = {
			view : '',
			params : {}
		};

		var splits = hash.split('&');
		infos.view = splits.shift().substr(1);
		for(var i = 0; i < splits.length; i++) {
			var info = splits[i].split('=');
			var param = info.shift();

			infos.params[param] = decodeURIComponent(info.join('=')); // Just in case there was a '=' in the value
		}

		return infos;
	}

	reload(hiddenParams, force) {
		if(force){
			this._setViewCache(this.currentView, false, false);
		}
		this._fetchView(this.currentView, hiddenParams);
	}

	_onFetchView(viewObject){	}
	_onLoadView(viewObject, data, hiddenParams) { }

	/**
	 * Fetch view html and model from server
	 */
	_fetchView(view, hiddenParams) {
		this.currentView = view;

		var self = this;

		this._getViewObject(this.currentView).then((viewObject) => {

			self._hideLoading();
			self.abortOngoingXHR();

			var cached = this._isViewCached(view);
			if(cached && this.debug) {
				console.debug('View "'+view+'" is in cache (' + this.lang + ')');
			}

			this.view_fetching = true;
			self._onFetchView(viewObject);

			// Ask the requested view to transmute hash to query parameters
			var params = viewObject.parseHash(location.hash);

			for(var k in params.params) {
				params[k] = params.params[k];
			}
			delete(params.params);

			if(hiddenParams && $.isPlainObject(hiddenParams)) {
				for(k in hiddenParams) {
					params[k] = hiddenParams[k];
				}
			}

			params.k  = self.SESSION_KEY;
			params.view  = self.currentView;
			params.cmd = 'view';
			params.cached = cached;
			params.version = this.getApplicationVersion();
			params.uv = self.userVersion;

			if(this.replaced_session_key) {
				params.rk = this.replaced_session_key;
				this.replaced_session_key = false;
			}

			var param_string = $.param(params);

			$.ajax({
				url:'index.php?'+param_string,
				type : 'POST',
				data: {
					context : self.getContext()
				},
				dataType:'json',
				headers: self.getXSRFHeaders(),
				success: function(response) {
					self.view_fetching = false;
					self._hideLoading();

					/* Manage redirect responses from view calls. */
					if (response.redirect) {
						self.goTo(response.view);
						return false;
					}

					if(response.status == 'error') {
						var info = response.data;
						if(info.code == 600) { // VIEW_CMD_ERROR;
							// Hopefuly this won't happen
							self._showFatalError('An error occured server side while fetching view data "'+view+'" (600)');
						}
						else if(info.code == 601 || info.code == 602) { // VIEW_ACL_ERROR or MODEL_ACL_ERROR
							self._showNavigationError();
						}
						else { // Unknown error
							self._showFatalError('An unknown error was sent from server while fetching view data "'+view+'" ('+info.error+')');
						}

						return false;
					}

					self._onLoadView(viewObject, response.data, hiddenParams);
					self._loadView(response.data, hiddenParams);
				},
				error: function(jqXHR, status, error) {
					self.view_fetching = false;
					self._hideLoading();

					self.validateXHR(jqXHR).then((isValidXHR)=>{
						if(!isValidXHR){
							return;
						}
						if(this.debug) {
							console.debug('AJAX query error');
							console.debug(status);
							console.debug(error);
						}

						self._showFatalError('An error occured while fetching view data "'+view+'" ('+status+')');
					});
				}
			});

			// If we don't receive an awnser after 1.5 second, a loading overlay will appear
			this._loadingTimeout = setTimeout(function() {
				self._showLoading();
			}, this._loadingDelay);

		});
	}

	/**
	 *	Standard entry point for view data (html and model).
	 */
	_loadView(data, hiddenParams) {
		const self = this;

		if (data.data) { //backward compatibility.
			data = data.data;
		}

		let fullParams;
		if (data.params) {
			fullParams = $.extend({}, data.params, hiddenParams);
		}
		else {
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

		return this._getViewObject(this.currentView)
			.then((viewObject) =>
				self._initViewObject(viewObject, data)
				.then(() => Promise.resolve(viewObject.load(fullParams)))
				.then(() => Promise.resolve(self._loadContentData(viewObject, data)))
				.then(() => Promise.resolve(self._hookView(viewObject)))
				.then(() => Promise.resolve(self._loadModel(viewObject, data.model)))
				.then(() => Promise.resolve(self._checkAnchor(viewObject)))
				.then(() => Promise.resolve(self._checkOnLoadScroll()))
			)
			.catch((error) => {
				this._stopObservation();
				this._showFatalError(error);
				return Promise.reject(error);
			});
	}

	_initViewObject(viewObject: View, data: {}): Promise {
		window.view = viewObject;
		viewObject._validateable = (data.validateable || false);
		return Promise.resolve(viewObject.init(location.hash));
	}

	_loadContentData(viewObject: View, data: {}) {
		//* BASED on kronos-lib/Kronos/Common/View.php -> function getContent *//
		if (data.html) {
			return Promise.resolve(this._loadContent(viewObject, data.html))
				.then(()=>{
					// We store the html and json we received
					this._setViewCache(this.currentView, data.html, false);
				});
		}
		else if (this._isViewCached(this.currentView)) {
			// Get no html/params but the sent version is the same as the one we have, we can use it.
			return Promise.resolve(this._loadContent(viewObject, this._getViewCachedHTML(this.currentView)));
		}
		else {
			return Promise.reject(new Error('View not cached and not recieved from html...'));
		}
	}

	/**
	 *	Ask the view to draw the content if it can or we do it.
	 *
	 *	NOTE : If you want to support view redrawing, implement 'draw'.
	 */
	_loadContent(viewObject, html) {

		if(typeof viewObject !== 'undefined' && typeof viewObject.draw == 'function') {
			viewObject.draw(html);
		}
		else {
			$('#content').html(html);
		}

		scrollTo(0, 0);
	}

	/**
	 * Hook the view object to the current content
	 */
	_hookView(viewObject: View) {
		const self = this;
		if(typeof viewObject._preHook == 'function'){
			viewObject._preHook();
		}

		return Promise.resolve(viewObject.hook()).then(() => {
			return self._onViewHook(viewObject);
		});
	}

	_onViewHook(viewObject) { }

	_loadModel(viewObject: View, model) {
		model = this.recursiveCleanFloats(model);

		if(this.debug) {
			console.debug(model);
		}

		this.emit('preInject');
		viewObject.inject(model);
		this.emit('postInject');
		if(typeof viewObject._postInject == 'function'){
			viewObject._postInject();
		}

		this._onViewInject(viewObject, model);

		if ($('.page-title').length) {
			window.document.title = ($('.page-title').text());
		}
	}

	_onViewInject(viewObject: View, model) { }

	_checkAnchor(viewObject: View){
		var params = viewObject.parseHash(this.hash);
		if(params.params['anchor']){
			var anchor_name = params.params.anchor;
			var $element = $('[anchor='+anchor_name+']');
			if($element.length === 0){
				if(this.debug) {
					console.warn('GET parameter "anchor" found but there is no element associated with it!');
				}
				return false;
			}
			if(typeof viewObject.onScrollToAnchor === 'function'){
				viewObject.onScrollToAnchor($element, anchor_name);
			}
			else{
				if(this.debug) {
					console.warn('GET parameter "anchor" found but there is no `onScrollToAnchor` function on your view!');
				}
			}
		}
	}

	_checkOnLoadScroll() {
		var scroll = this.getOnLoadScroll();
		if(scroll && this.isNumber(scroll.X) && this.isNumber(scroll.Y)) {
			window.scrollTo(scroll.X, scroll.Y);
			this.clearOnLoadScroll();
		}
	}

	setOnLoadScroll(X, Y) {
		this._onLoadScroll = {
			X: this.parseInt(X),
			Y: this.parseInt(Y)
		};
	}

	getOnLoadScroll() {
		return this._onLoadScroll;
	}

	clearOnLoadScroll() {
		delete this._onLoadScroll;
	}


	recursiveCleanFloats(model) {
		var self = this;
		if($.isArray(model)) {
			for(var i = 0; i < model.length; i++) {
				model[i] = self.recursiveCleanFloats(model[i]);
			}
		}
		else if(typeof model == 'object') {
			for(var k in model) {
				model[k] = self.recursiveCleanFloats(model[k]);
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
	}


	/**
	 * Clear all cached view html and params
	 */
	clearViewCache() {
		if(this.debug) {
			console.log('Clearing view cache');
		}

		delete(this._view_cache);
		this._view_cache = [];
	}

	/**
	 * Get the currently store view html version.
	 */
	_isViewCached(view) {
		// No HTML no cache.
		if(this._view_cache[view] && this._view_cache[view].html) {
			return true;
		}

		return false;
	}

	/**
	 * Get the currently sotre view html
	 */
	_getViewCachedHTML(view) {
		if(this._view_cache[view] && this._view_cache[view].html) {
			return this._view_cache[view].html;
		}
		else {
			throw this._throw('View was supposed to be cached...', true);
		}
	}

	/**
	 * Get the currently sotre view params
	 * Does not throw and error if no params are found - they're optionnal
	 */
	_getViewCachedParams(view){
		return this._view_cache[view].params;
	}

	/**
	 * Store given view html, json params and its version number.
	 */
	_setViewCache(view, html, params) {
		delete(this._view_cache[view]);

		this._view_cache[view] = {
			html: html,
			params: params ? params : null
		};

		if(this.debug) {
			console.debug('Cached version of view "'+view+'"');
		}
	}

	/**
	 * Show a loading animation and put a cover over the whole page.
	 */
	_showLoading() {
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
	}

	/**
	 * Happens whenever the _hideLoading function is beginning.
	 * This function is meant to be overriden by a child class.
	 */
	beforeHideLoading(){}

	/**
	 * Hide the loading animation and covers
	 */
	_hideLoading() {
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
	}

	/**
	 * Happens whenever the _hideLoading function is finished.
	 * This function is meant to be overriden by a child class.
	 */
	afterHideLoading(){}

	/**
	 * Put a cover over the whole page to prevent user manipulation while something important is going on.
	 *
	 * @param color CSS color for the cover
	 * @param opacity Cover opacity, between 0 and 1, in increment of 0.2 (i.e 0.8)
	 */
	showOverlay(color, opacity, id, zIndex) {
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
	}

	/**
	 * Remove the whole page cover
	 */
	hideOverlay(id) {
		if(this.debug)
			console.debug('Hide overlay');

		if(!id) id = 'overlay';

		$('#'+id).remove();
	}

	/**
	 * Add an hash to the history list
	 */
	addHistory(hash) {
		if(!this._history[this._history.length -1] || this._history[this._history.length -1].hash != hash)
			this._history.push({hash: hash, context : {}});
	}

	/**
	 * Tries to detect if the browser navigation buttons where used
	 */
	_detectStepBack(hash) {
		if(this._history[this._history.length - 2] && this._history[this._history.length - 2].hash == hash) {
			this._history.pop();

			return true;
		}

		return false;
	}

	/**
	 * Go back to previous hash
	 */
	stepBack(redirect) {
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
	}

	/**
	 * Force the page to reload;
	 */
	forceReload() {
		location.reload();
	}

	/**
	 * Go back to the previous page and force it to reload
	 */
	forceStepBack() {
		//* Cette fonction a été modifiée dans bo-application.js *//
		//* Elle n'a pas été modifiée ici pour ne pas influencer d'autres applications. *//
		//* Avec la certitude qu'elle est utilisée seulement dans le BO, elle pourrait être effacée d'ici. *//

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
	}

	/**
	 * Go back 2 record in history
	 * @param string hash
	 */
	goBack(hash) {
		if(hash === undefined){
			hash = '';
		}

		if(this._history.length >= 2){
			this._history.pop(); // Pop current page.
			hash = this._history.pop().hash; // Previous page;
		}

		if(this.debug)
			console.debug('Go back to "'+hash+'"');

		location.hash = hash;
	}

	forceGoBack() {
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
	}

	setContextValue(key, value) {
		if(this._history.length > 0) {
			if(!$.isPlainObject(this._history[this._history.length - 1].context)) {
				this._history[this._history.length - 1].context = {};
			}
			this._history[this._history.length - 1].context[key] = value;
		}
	}

	getContextValue(key) {
		if(this._history.length > 0 && $.isPlainObject(this._history[this._history.length - 1].context))
			return this._history[this._history.length - 1].context[key];
		else
			return false;
	}

	getContext() {
		if(this._history && this._history.length > 0 && $.isPlainObject(this._history[this._history.length - 1].context))
			return this._history[this._history.length - 1].context;
		else
			return {};
	}

	/**
	 * Output the current browsing history to the console
	 */
	_debugHistory() {
		for(var i = 0; i < this._history.length; i++) {
			console.debug(i + ' : ' + this._history[i].hash);
			console.debug(this._history[i].state);
		}
	}

	_arrayPop(array, index) {
		if(array.length && index > 0 && index < array.length) {
			for(var i = index; i < array.length -1; i++) {
				array[i] = array[i+1];
			}

			array.pop();
		}

		return array;
	}


	/**
	 * Tries to get the request view object
	 */
	_getViewObject(viewName: string): Promise<Class<View>> {
		const self = this;
		if(this._view_objects[viewName]){
			return Promise.resolve(this._view_objects[viewName]);
		}

		return this.router.getClass(viewName)
			.then((viewClass) => {
				const viewObject = new viewClass(self);
				self._view_objects[viewName] = viewObject;
				return viewObject;
			})
			.catch((err)=>{
				console.log(err);
				return Promise.reject(err);
			});
	}

	_scrollTop() {
		var win = window.pageYOffset ? window.pageYOffset : 0;
		var doc = document.documentElement ? document.documentElement.scrollTop : 0;
		var body = document.body ? document.body.scrollTop : 0;

		var value = win ? win : 0;
		value = (doc && (!value || (value > doc))) ? doc : value;
		value = (body && (!value || (value > body))) ? body : value;

		return value;
	}

	/**
	 * Show a modal dialog at the top of the page
	 *
	 * @param content HTML to put inside de dialog
	 * @param speed Dialog animation speed
	 * @param callback Function to call once the animation is done
	 */
	showModalDialog(content, speed, callback, width) {
		var self = this;
		if(this.debug)
			console.debug('Show modal dialog');

		this.showOverlay('#000', 0.4);

		$('body').append(
			$('<div></div>')
				.addClass('modal')
				.attr('id', 'modal_dialog')
				.css({
					'display': 'none',
					'top': self._scrollTop() + 'px'
				})
				.append(
					$('<div></div>')
						.addClass('modal-2')
						.append(
							$('<div></div>')
								.addClass('sprite modal-3')
								.append(content)
						)
				)
		);

		if(width) {
			$('#modal_dialog .modal-2').css('width', width);
		}

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
	hideModalDialog(speed, callback, use_detach) {
		const self = this;
		if(this.debug)
			console.debug('Hide modal dialog');

		$('#modal_dialog').fadeOut(speed, function() {
			self.hideOverlay();
			if(use_detach){
				$('#modal_dialog').detach();
			}
			else{
				$('#modal_dialog').remove();
			}
			if(typeof callback == 'function') callback();
		});
	}

	/**
	 * Hide the modal dialog now. Mainly used to be sure no dialog is left behind
	 */
	hideModalDialogNow() {
		if(this.debug)
			console.debug('Hide modal dialog now!');

		$('#modal_dialog').remove();
	}

	getShowErrorHTML(message) {
		const self = this;
		return '<div class="modal-dialog"><h2>'+self._('ERROR')+'</h2>\
						<p>\
							<strong>'+(message ? self._(message) : self._('FATAL_ERROR_OCCURED'))+'</strong>\
							<br />\
							'+self._('ERROR_TRY_AGAIN')+'\
							<br />\
							'+self._('CONTACT_SUPPORT_PERSIST')+'\
						</p>\
						<p class="submit">\
							<input type="submit" id="hook_create_error_close" value="'+self._('OK')+'" />\
						</p></div>';
	}


	showError(message, onHideCallback) {
		const self = this;
		self.showModalDialog(self.getShowErrorHTML(message), 'fast', function() {
			$('#hook_create_error_close').safeClick(function() {
				self.hideModalDialog('fast');
				if (onHideCallback) { onHideCallback(); }
			});
		});
	}

	/**
	 * Called when expired session is detected by an XHR.  Will eventually show the error message.
	 * @param goTo
	 */
	detectedExpiredSession(goTo){
		if(!this.detectedExpiredSessionTimeout){
			this.detectedExpiredSessionGoTo = goTo;
			this.detectedExpiredSessionTimeout = setTimeout(()=>{
				this.showSessionExpiredError(this.detectedExpiredSessionGoTo);
			}, 100);
		}
	}

	clearDetectedExpiredSession(){
		this.detectedExpiredSessionGoTo = false;
		if(this.detectedExpiredSessionTimeout){
			clearTimeout(this.detectedExpiredSessionTimeout);
			this.detectedExpiredSessionTimeout = false;
		}
	}

	/**
	 * Called when network error is detected by an XHR.  Will eventually show the error message.
	 * @param goTo
	 */
	detectedNetworkError(goTo){
		if(!this.detectedNetworkErrorTimeout){
			this.detectedNetworkErrorGoTo = goTo;
			this.detectedNetworkErrorTimeout = setTimeout(()=>{
				this.showXHRNetworkErrorError(this.detectedNetworkErrorGoTo);
			}, 100);
		}
	}

	clearDetectedNetworkError(){
		this.detectedNetworkErrorGoTo = false;
		if(this.detectedNetworkErrorTimeout){
			clearTimeout(this.detectedNetworkErrorTimeout);
			this.detectedNetworkErrorTimeout = false;
		}
	}

	getShowSessionExpiredError() {
		const self = this;
		return '<div class="modal-dialog"><h2>'+self._('INVALID_CREDENTIAL_ERROR_TITLE')+'</h2>\
				<p>\
					<strong>'+self._('INVALID_CREDENTIAL_ERROR_BODY')+'</strong>\
					<br />\
				</p>\
				<p class="submit">\
					<input type="submit" id="hook_session_expired_error_close" value="'+self._('OK')+'" />\
				</p>\
			</div>';
	}

	showSessionExpiredError(location) {
		const self = this;
		location = location || self.VIRTUALPATH || '/?logout';
		self.showModalDialog(self.getShowSessionExpiredError(), 'fast', function() {
			$('#hook_session_expired_error_close').safeClick(function() {
				document.location = location;
				self.clearDetectedExpiredSession();
			});
		});
	}

	getShowXHRNetworkError() {
		const self = this;
		return '<div class="modal-dialog"><h2>'+self._('XHR_NETWORK_ERROR_TITLE')+'</h2>\
				<p>\
					<strong>'+self._('XHR_NETWORK_ERROR_BODY')+'</strong>\
					<br />\
				</p>\
				<p class="submit">\
					<input type="submit" id="hook_xhr_network_error_close" value="'+self._('OK')+'" />\
				</p>\
			</div>';
	}

	showXHRNetworkErrorError(location) {
		var self = this;
		location = location || self.VIRTUALPATH || '/?logout';
		self.showModalDialog(self.getShowXHRNetworkError(), 'fast', function() {
			$('#hook_xhr_network_error_close').safeClick(function() {
				document.location = location;
				self.clearDetectedNetworkError();
			});
		});
	}

	getShowConfirmationHTML(title, message) {
		const self = this;
		return '<div class="modal-dialog"><h2>'+title+'</h2>\
							<p>'+message+'</p>\
						<p class="submit">\
							<input type="button" id="hook_confirmation_yes" value="'+self._('YES')+'" />\
							<input type="button" id="hook_confirmation_no" value="'+self._('NO')+'" />\
						</p></div>';
	}

	showConfirmation(title, message, yesCallback, noCallback) {
		const self = this;
		self.showModalDialog(self.getShowConfirmationHTML(title, message), 'fast', function() {

			$('#hook_confirmation_yes').safeClick(function() {
				if (yesCallback) { yesCallback(); }
				self.hideModalDialog('fast');
			});

			$('#hook_confirmation_no').safeClick(function() {
				if (noCallback) { noCallback(); }
				self.hideModalDialog('fast');
			});
		});
	}

	showMessage(title, message, content) {
		const self = this;
		if(title === '')
			this._throw('Missing title', true);
		if(message === '')
			this._throw('Missing message', true);

		self.showModalDialog('<h2>'+title+'</h2>\
						<p>\
							<strong>'+message+'</strong>\
						</p>\
						'+(content ? '<p>'+content+'</p>' : '')+'\
						<p class="submit">\
							<input type="submit" id="hook_show_message_close" value="'+self._('OK')+'" />\
						</p>', 'fast', function() {
			$('#hook_show_message_close').safeClick(function() {
				self.hideModalDialog('fast');
			});
		});
	}

	showQuestionCommentDialog(comment_type){

		var self = this;

		var content = '<h2>'+self._('QUESTION_COMMENT_SUGGESTION')+'</h2>\
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
		<input type="submit" id="hook_send_question_comment" value="'+self._('OK')+'" /> <a href="javascript:void(0);" id="hook_cancel_question_comment">'+self._('CANCEL')+'</a>\
		</p>\
		</div>\
		<div id="hook_question_comment_sent" style="display:none"><p>' + self._('THANK_YOU_FOR_YOUR_COMMENTS') + '</p></div>';

		var i = 0;

		self.showModalDialog(content, 'normal', function(){

			if(comment_type) $('#hook_question_comment_type').val(comment_type);

			$('#hook_question_comment_from').val(self.userEmail);

			$('#hook_send_question_comment').safeClick(function() {

				var type = $('#hook_question_comment_type').val();
				var subject = $('#hook_question_comment_subject').val();
				var from = $('#hook_question_comment_from').val();
				var message = $('#hook_question_comment_textarea').val();

				if(!subject){
					$('#hook_question_comment_subject').hintError(self._('FIELD_REQUIRED')).focus();
					return false;
				}

				if(!message){
					$('#hook_question_comment_textarea').hintError(self._('FIELD_REQUIRED')).focus();
					return false;
				}

				var postString = '&type=' + encodeURIComponent(type) +
					'&subject=' + encodeURIComponent(subject) +
					'&from=' + encodeURIComponent(from) +
					'&message=' + encodeURIComponent(message) +
					'&tmp_dir=' + encodeURIComponent(self.tmp_dir);

				$.ajax({
					url:'index.php?k=' + self.SESSION_KEY + '&sendComment' ,
					type: 'POST',
					data: postString,
					dataType:'json',
					headers: self.getXSRFHeaders(),
					success: function(data) {

						if(data.status && data.status == 'error') {
							self.showError();
							self.hideModalDialog('fast');
							return false;
						}

						setTimeout(function(){
							self.hideModalDialog('fast');
						}, 2000);

						removeQCSAjaxFolder(self.tmp_dir);
						return true;

					},
					error: function(jqXHR, status, error) {
						self.hideModalDialog('fast');
						self.validateXHR(jqXHR).then((isValidXHR)=>{
							if(!isValidXHR){
								return;
							}
							self.showError();
						});
					}
				});

				$('#hook_question_comment_form').fadeOut(function(){
					$("#hook_question_comment_sent").show();
				});

			});

			$('#hook_cancel_question_comment').safeClick(function() {
				self.tmp_dir = '';
				self.hideModalDialog('fast');

			});

			$('#hook_question_comment_subject').focus();
		}, 550);

		this.QCS_uploader = [];
		function generateQCSAjaxUploader(){
			return $('#file_upload').ajaxUploader({
				url:'index.php?k=' + self.SESSION_KEY + '&uploadFile&tmp_dir=' + self.tmp_dir,
				autoUpload : true,
				progressBarConfig: {
					barImage: 'img/progressbg_orange.gif'
				},
				success: function (data, status){
					if(data.ajax_filename){
						var element_number = i++;
						var filename = data.ajax_filename;
						self.tmp_dir = data.tmp_dir;
						$('#uploaded_files_names').append('<li id="ajax_file_'+ element_number + '" style="list-style:none;">' + filename + '&nbsp&nbsp<span class="ico icon-cross" id="ajax_file_remove_' + element_number + '" style="position: absolute; margin-bottom:10px;"></span></li>');
						$('#ajax_file_remove_'+ element_number).on('click', function(){
							removeQCSAjaxFile(self.tmp_dir, filename, element_number);
						});
						self.QCS_uploader.push(generateQCSAjaxUploader());
					}
					else if(data.error){
						console.debug(data.error);
						self.showMessage(self._('ERROR'), self._('UPLOAD_FILE_ERROR_OCCURED'));
					}
				},
				error: function (jqXHR, status, error){
					console.debug('Error uploading attachment.');
					self.showMessage(self._('ERROR'), self._('UPLOAD_FILE_ERROR_OCCURED'));
				}
			});
		}

		this.QCS_uploader.push(generateQCSAjaxUploader());

		function removeQCSAjaxFile(folder, filename, div_number){

			var postString = '&file=' + encodeURIComponent(filename) +
				'&fld=' + encodeURIComponent(folder);

			$.ajax({
				url:'index.php?k=' + self.SESSION_KEY + '&removeQCSAjaxFile',
				type: 'POST',
				data: postString,
				dataType:'json',
				headers: self.getXSRFHeaders(),
				success: function(data) {
					$('#ajax_file_'+ div_number).remove();
					$('#ajax_file_remove_'+ div_number).remove();
					return true;
				},
				error: function (jqXHR, status, error){
					self.validateXHR(jqXHR).then((isValidXHR)=> {
						if(!isValidXHR){
							return;
						}
						console.log(error);
					});

				}
			});
		}

		function removeQCSAjaxFolder(folder){

			self.tmp_dir = '';
			$.ajax({
				url:'index.php?k=' + self.SESSION_KEY + '&removeQCSAjaxFolder',
				type: 'POST',
				data: '&fld=' + encodeURIComponent(folder),
				dataType:'json',
				headers: self.getXSRFHeaders(),
				success: function(data) {
					return true;
				},
				error: function (jqXHR, status, error){
					self.validateXHR(jqXHR).then((isValidXHR)=> {
						if(!isValidXHR){
							return;
						}
						console.log(error);
					});
				}
			});
		}
	}



	requestUnmount(callback) {
		this.unmounts.push(callback);
	}

	performUnmounts() {
		this.unmounts.forEach(function(callback) {
			callback();
		});
		this.unmounts = [];
	}

	htmlEntity(value){
		if(value || this.isNumber(value))
			return $('<div></div>').text(value).html();
		else
			return '';
	}

	sleep(milliseconds) {
		var d = new Date();
		var n;
		do {
			n = new Date();
		} while(n - d < milliseconds);
	}

	generateGUID() {
		// Taken from http://stackoverflow.com/questions/864942/in-javascript-how-can-i-uniquely-identify-one-browser-window-from-another-which

		//------------------
		var S4 = function () {
			return(
				Math.floor(
					Math.random() * 0x10000 /* 65536 */
				).toString(16)
			);
		};
		//------------------

		return (
			S4() + S4() + "-" +
			S4() + "-" +
			S4() + "-" +
			S4() + "-" +
			S4() + S4() + S4()
		);
	}

	isNumber(value) {
		return typeof value === 'number' && isFinite(value);
	}

	/**
	 * Support localized numeric representation.
	 * Replace NaN by 0
	 */
	parseFloat(value){
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
	}

	/**
	 * Same as parseInt(value, 10) but replace NaN by 0
	 */
	parseInt(value) {
		value = parseInt(value, 10);
		if(isNaN(value)) value = 0;
		return value;
	}

	/**
	 * Format number according to locale and add money symbol
	 */
	formatMoney(value, opts) {
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
	}

	/**
	 * Format percent according to locale
	 */
	formatPercent(value, opts) {
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
	}

	/**
	 * Format and localize a number
	 * opts:
	 * 	precision : Default precisions of the number
	 *  facultative_decimals :  Hide decimals if value = 0;
	 *
	 */
	formatNumber(value, opts) {

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
			rounded = this.parseFloat(value).toFixed(0);
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
	}

	formatSIN(sin) {
		var old_sin = sin;

		//Remove whitespace
		old_sin = old_sin.replace(new RegExp("[^\\d]", 'g'), '');

		var new_sin = old_sin.substr(0, 3) + ' ' + old_sin.substr(3,3) + ' ' + old_sin.substr(6,3);
		return $.trim(new_sin);
	}

	isSINValid(sin) {

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
	}

	/**
	 * Format field value objects provided by model (id, value_fr, value_en)
	 */
	formatFieldValue(fieldValue) {
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
	}

	parsePhone(phone) {
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
			formatted += this._('PHONE_EXTENSION')+extension;
		}

		return formatted;
	}

	formatPostalCode(code) {
		if(/^[a-zA-Z]\d[a-zA-Z]\d[a-zA-Z]\d$/.test(code)) {
			return (code.substr(0,3)+' '+code.substr(3)).toUpperCase();
		}
		else
			return code;
	}

	pad(number, length) {

		var str = '' + number;
		while (str.length < length) {
			str = '0' + str;
		}

		return str;

	}

	interpolate(message, context) {
		var match;

		if(context !== null && typeof context === 'object') {
			while(match = /{([a-z0-9._]+)}/gi.exec(message)) {
				message = message.replace(match[0], context[match[1]] || '');
			}
		}

		return message;
	}

	/**
	 * Used to detect login redirection during ajax errors.
	 *
	 */
	validateXHR(jqXHR): Promise{
		const self = this;
		return new Promise((resolve)=>{
			if(!jqXHR || typeof jqXHR === 'undefined') {
				resolve(false);
				return;
			}

			if(jqXHR.statusText === 'abort') {
				resolve(false);
				return;
			}

			if(jqXHR.status === 0) {
				// self._beforeUnload calling self.abortOngoingXHR() may be trigerred after the request completion so we delay the check.
				setTimeout(function() {

					// Probably due tu a CORS error caused by a redirection to Siteminder sso login page.
					// Could also be caused by a sever network or dns error.
					self.showXHRNetworkErrorError(jqXHR.responseJSON ? jqXHR.responseJSON.view : false);

					resolve(false);
				});

				return;
			}

			if(jqXHR.status == 401) {
				self.showSessionExpiredError(jqXHR.responseJSON ? jqXHR.responseJSON.view : false);
				resolve(false);
				return;
			}

			resolve(true);

		});
	}

	getXHRRequest(url, successCallback, loading, errorCallback, button, skipOverlayHandling) {
		var self = this;

		var xhrRequest = $.ajax({
			url: url,
			type : 'GET',
			dataType:'json',

			success: function(response) {
				if(!skipOverlayHandling){
					self.hideOverlay();
					self._hideLoading();
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
						self.showError(data.message);
					}
					else {
						self.showError();
					}
				}
				else if(typeof successCallback == 'function') {
					successCallback(data);
				}
			},
			error: function(jqXHR, status, error) {
				if(!skipOverlayHandling) {
					self.hideOverlay();
					self._hideLoading();
				}

				if(button) {
					$(button).prop('disabled', false);
				}

				self.validateXHR(jqXHR).then((isValidXHR)=> {
					if(!isValidXHR){
						return;
					}
					if(this.debug) {
						console.debug('AJAX query error');
						console.debug(status);
						console.debug(error);
					}

					if(typeof errorCallback == 'function') {
						errorCallback();
					}
					else {
						self.showError();
					}
				});
			}
		});

		return xhrRequest;
	}

	registerXHR(xhr) {
		this._ongoing_xhrs.push(xhr);
	}

	unregisterXHR(xhr) {
		var index = this._ongoing_xhrs.indexOf(xhr);
		if(index >= 0) {
			this._ongoing_xhrs.splice(index, 1);
		}
	}

	abortOngoingXHR() {
		this.fetchService.abortOngoingFetchPromises();

		$.each(this._ongoing_xhrs, function(index, xhr) {
			if(xhr !== undefined) {
				xhr.abort();
			}
		});
		this._ongoing_xhrs = [];
	}

	getViewUrl(view, cmd, paramsString){
		if(paramsString.length > 0) {
			if(paramsString[0] !== '&') {
				paramsString = '&'+paramsString;
			}
		}

		return 'index.php?k=' + encodeURIComponent(this.SESSION_KEY) + '&view=' + encodeURIComponent(view) + '&cmd=' + encodeURIComponent(cmd) + paramsString;
	}

	fetch(url , options: FetchOptions) {

		let showLoading = (options.showLoading === true);
		let showOverlay = (options.showOverlay===true && ! showLoading);
		if(showOverlay) {
			this.showOverlay();
		}

		let $button = options.button ? $(button) : false;
		if($button) {
			$button.prop('disabled', true);
		}

		if(showLoading) {
			// If we don't receive an awnser after 1.5 second, a loading overlay will appear
			this._loadingTimeout = setTimeout(function() {
				this._showLoading();
			}, this._loadingDelay);
		}

		return this.fetchService.fetch(url, options)
			.finally(() => {
				if(showLoading){
					this._hideLoading();
				}
				if(showOverlay){
					this.hideOverlay();
				}
				if($button) {
					$button.prop('disabled', false);
				}
			});
	}

	get(view, cmd, paramsString, successCallback, showLoading, errorCallback, buttonSelector, skipOverlayHandling): Promise {
		let options = {
			buttonSelector,
			showLoading,
			showOverlay: (!showLoading && !skipOverlayHandling)
		};
		return this.fetch(this.getViewUrl(view, cmd, paramsString), options)
			.then(FetchService.parseJSON)
			.then(FetchService.handleApplicationResponseData)
			.then((data) => {
				if(typeof successCallback === 'function'){
					successCallback(data);
				}
				return data;
			})
			.catch((error) => {
				this.handleFetchError(error, errorCallback);
				throw error;
			});
	}

	post(view, cmd, paramsString, body, successCallback, showLoading, errorCallback, buttonSelector, skipOverlayHandling): Promise {
		let options = {
			method: 'POST',
			body,
			buttonSelector,
			showLoading,
			showOverlay: (!showLoading && !skipOverlayHandling)
		};
		return this.fetch(this.getViewUrl(view, cmd, paramsString), options)
			.then(FetchService.parseJSON)
			.then(FetchService.handleApplicationResponseData)
			.then((data) => {
				if(typeof successCallback === 'function'){
					successCallback(data);
				}
				return data;
			})
			.catch((error) => {
				this.handleFetchError(error, errorCallback);
				throw error;
			});
	}

	handleFetchError(error, errorCallback) {
		let errorMessage;
		let data;
		if(typeof error === 'object'){
			if(error instanceof FetchAbortError){
				return;
			}

			if(error instanceof FetchResponseDataError){
				console.log(error);
				if(error.data){
					data = error.data;
					errorMessage = data.message;
				}
			}
		}

		console.log(errorMessage);

		if(typeof errorCallback === 'function') {
			errorCallback(data);
		}
		else {
			this.showError(errorMessage);
		}
	}

	datepicker(selector, options) {
		var self = this;
		return $(selector).bind('change', function() {
			this.value = self.date.format(this.value, 'input');
		}).datepicker(options);
	}

	_formatAddress(line1, line2, city, state, country, postalCode) {
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
	}

	formatAddress(line1, line2, city, state, country, postalCode) {
		return this._formatAddress(line1, line2, city, state, country, postalCode);
	}

	formatGMapAddress(line1, line2, city, state, country, postalCode){

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
	}

	isMobile() {
		return navigator.userAgent.match(/iPhone/i) !== null || navigator.userAgent.match(/iPod/i) !== null || navigator.userAgent.match(/Pre/i) !== null || navigator.userAgent.match(/Android/i) !== null;
	}

	/**
	 * Download a file using an iframe
	 */
	downloadFile(url){
		var self = this;

		if(!self._iPad){
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
			var content = '<h2>'+self._('DOWNLOAD_FILE_DIALOG_TITLE')+'</h2>\
			<div class="header_line"></div>\
			<a id="hook_download_file" href="javascript:void(0);">' + self._('DOWNLOAD_FILE') + '</a>\
			<br /><br />';

			self.showModalDialog(content, 'normal', function() {
				$('#hook_download_file').click(function(){
					window.open(url, '_blank');
					self.hideModalDialog('fast');
				});
			});
		}

	}

	getIEVersion() {
		var rv = null;
		if (navigator.appName == 'Microsoft Internet Explorer') {
			var ua = navigator.userAgent;
			var re  = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
			if (re.exec(ua) != null) { rv = parseFloat( RegExp.$1 ); }
		}

		return rv;
	}

	isIE7() {

		var ieVersion = this.getIEVersion();
		ieVersion = (ieVersion !== null) ? ieVersion : 999; // for compatibility //

		return (ieVersion < 8);
	}

	isIE9() {

		var ieVersion = this.getIEVersion();
		return ((ieVersion >=9) && (ieVersion < 10));
	}

	isOpera() {
		return navigator.appName == 'Opera';
	}

	checkStoredSession() {
		var self = this;
		if(this.canUseSessionStorage()) {
			var xsrf_token = self.getXSRFToken();
			if(!xsrf_token || ! self._xsrf_cookie_name){
				throw this._throw('Cannot check stored session without XSRF Token');
			}

			if(window.opener) {
				if(sessionStorage.getItem('window-name') != window.name) {
					if(this.debug) {
						console.debug('Opened from another tab, clearing cloned stored session');
					}

					sessionStorage.clear();
					sessionStorage.setItem(self._xsrf_cookie_name, xsrf_token);
				}
			}

			var stored_token = sessionStorage.getItem(self._xsrf_cookie_name);
			if(!stored_token || stored_token != xsrf_token) {
				if(this.debug) {
					console.log('Session cookie changed, clearing stored session');
				}

				sessionStorage.clear();
				sessionStorage.setItem(self._xsrf_cookie_name, xsrf_token);
			}

			if(!sessionStorage.getItem('window-name')) {
				sessionStorage.setItem('window-name', window.name);
			}

			var session_key = sessionStorage.getItem('SESSION_KEY');

			if(session_key) {
				this.replaced_session_key = this.SESSION_KEY;
				this.SESSION_KEY = session_key;

				if(this.debug) {
					console.log('Replaced given session key "' + this.replaced_session_key + '" for stored session key "' + this.SESSION_KEY + '"');
				}
			}
			else {
				sessionStorage.setItem('SESSION_KEY', this.SESSION_KEY);
			}
		}
	}

	canUseSessionStorage () {
		try {
			return (!!sessionStorage.getItem) && (!!$.cookie);
		} catch(e){
			return false;
		}
	}

	forceElementRedraw($targetElement) {
		// So ugly... fix pour IE9. //
		$targetElement.hide().show();
	}

	// Access an object using dot notation
	getByKey(obj, key){
		var nav = obj;
		var tokens = key.split('.');
		for(var i = 0; i < tokens.length; i++){
			if(typeof nav != "object") return undefined;
			nav = nav[tokens[i]];
		}
		return nav;
	}
}
