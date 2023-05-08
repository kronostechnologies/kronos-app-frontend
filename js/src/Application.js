// @flow

import EventEmitter from 'events';
import * as Sentry from '@sentry/browser';
import numbro from 'numbro';
import numbroLanguages from 'numbro/dist/languages.min';
import BrowserDetect from './BrowserDetect';
import FetchService, { FetchAbortError, FetchResponseDataError } from './FetchService';

Object.values(numbroLanguages).forEach((l) => numbro.registerLanguage(l));

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

export default class Application extends EventEmitter {
    constructor(router: Router, dependencies: {} = {}) {
        super();
        this.router = router;

        // Debugging and error handling
        this.debug = false;
        this.trace_retirement = false;
        this.ajaxQueryLoading = false;
        this.pingInterval = false; // If this is defined in a child object; a timer will be fired every "pingInterval"ms with a ping command via get.
        this.messages = false;

        // Application configurations
        this.VIRTUALPATH = '/';
        this.SESSION_KEY = false;

        // Hash management
        this.isOpeningView = false;
        this.isOpeningViewCancelled = false;
        this._is_observing_hash = false;
        this._hash_changed_while_not_observing = true;
        this.hash = false;
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
        this.emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.currencyRegex = /^[0-9.,\s]+$/;
        this.percentageRegex = /^[0-9.,]+$/;

        // List of all ongoing ajax requests. Allow abort on view change.
        this._ongoing_xhrs = [];

        this.unmounts = [];

        this.browser = dependencies.browserDetect || new BrowserDetect(navigator.userAgent);

        this.fetchService = new FetchService(this);

        this.detectedExpiredSessionTimeout = false;
        this.detectedExpiredSessionGoTo = false;
        this.detectedNetworkErrorTimeout = false;
        this.detectedNetworkErrorGoTo = false;

        this.sentryEnabled = false;
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

        // Detect native support for unhandledrejection
        const onunhandledrejection = this.onunhandledrejection.bind(this);
        if (typeof PromiseRejectionEvent !== 'undefined') {
            window.addEventListener('unhandledrejection', onunhandledrejection);
        } else {
            // This seems to work in firefox
            window.onunhandledrejection = onunhandledrejection;
        }

        // Page change, tab closing and window closing catching function
        window.onbeforeunload = function () {
            return self._beforeUnload();
        };

        if (!window.name.match(/^GUID-/)) {
            window.name = `GUID-${self.generateGUID()}`;
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
            },
        });
    }

    onunhandledrejection(event) {
        const error = event.reason;
        if (this.isFetchAbortError(error) || this.isErrorAlreadyHandled(error)) {
            // preventDefault() does not exists in firefox for some reason.
            if (typeof event.preventDefault === 'function') {
                event.preventDefault();
            }

            return;
        }

        const reason = event.reason;
        this.logError('Unhandled promise rejection', event.reason);
    }

    logError(error_title, error) {
        console.warn(`${error_title}:`, (error && (error.stack || error)));
        if (this.sentryEnabled) {
            Sentry.captureException(error);
        }
    }

    /**
     * Configure how the application is built and how it works
     */
    async configure(config) {
        // Error configs
        if (config.debug) {
            this.debug = true;
        }

        if (config.trace_retirement) {
            this.trace_retirement = true;
        }

        if (config.jqueryui && config.jqueryui.startingday) {
            this.startingDay = config.jqueryui.startingday;
        }

        // Application configurations
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

        if (typeof config.user !== 'object') {
            throw 'No user info in application configuration';
        }

        if (config && config.sentry) {
            Sentry.init({
                dsn: config.sentry.dsn,
                release: `${config.sentry.projectName}@${config.application_version}`,
                beforeSend: this.sentry_beforeSend.bind(this),
                sendDefaultPii: true,
                environment: config.sentry.environment
            });

            Sentry.configureScope((scope) => {
                scope.setTag('version', config.application_version);
                scope.setUser({
                    email: config.user.email,
                    id: config.user.uuid || config.user.id,
                    name: config.user.name,
                });
                scope.setExtra('transaction', config.kronos_transaction_id);
            });

            this.sentryEnabled = true;
        }

        await this._configure(config);
        await this.setUserConfig(config.user);

        // Find default view
        for (const k in this.views) {
            const view = this.views[k];
            if (view.default === '1' || view.default === true) {
                this.default_view = k;
            }
        }
    }

    _configure() {
    }

    getApplicationVersion() {
        return this._application_version;
    }

    getViewApiPath() {
        return 'index.php';
    }

    /**
     * Get current XSRF cookie value
     * @returns {*}
     */
    getXSRFToken() {
        if (this._xsrf_cookie_name) {
            const cookie_value = $.cookie(this._xsrf_cookie_name);
            if (typeof cookie_value !== 'undefined') {
                return cookie_value;
            }

            return false;
        }

        return false;
    }

    /**
     * Get XSRF headers to append to ajax requests
     * @returns {{}}
     */
    getXSRFHeaders() {
        const self = this;
        const headers = {};
        const xsrf_token = self.getXSRFToken();
        if (self._xsrf_header_name) {
            headers[self._xsrf_header_name] = xsrf_token;
        }
        return headers;
    }

    /**
     * Get XSRF data to append to a post request
     * @returns {{}}
     */
    getXSRFData() {
        const self = this;
        const data = {};
        const xsrf_token = self.getXSRFToken();
        if (self._xsrf_cookie_name) {
            data[self._xsrf_cookie_name] = xsrf_token;
        }
        return data;
    }

    async setUserConfig(user_config) {
        this.userVersion = user_config.version;
        this.userName = user_config.name;
        this.userEmail = user_config.email;
        this.userType = user_config.type;
        this.menus = user_config.menus;
        this.views = user_config.views;
        this.userIsAssumed = user_config.assumed;
        this.userIsCpanelAssumed = user_config.cpanel_assumed;
        this.cpanelUserName = user_config.cpanel_user_name;

        await this.setLocale(user_config.locale);
        await this._setUserConfig(user_config);

        this._buildHeader();
    }

    async _setUserConfig() {
    }

    async _buildHeader() {
    }

    async setLocale(locale) {
    }

    async setLocale(locale) {
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

        // Load language file
        if (!this._messages[this.lang]) {
            await this.loadLangFile(this.lang);
        }

        // Update datepicker locale
        const defaults = $.extend($.datepicker.regional[this.lang], {
            dateFormat: 'yy-mm-dd', changeMonth: true, changeYear: true, gotoCurrent: true, yearRange: '-90:+10',
        });
        if (this.startingDay) {
            defaults.firstDay = this.startingDay;
        }
        $.datepicker.setDefaults(defaults);

        /*
         * Triggering every element seems expensive,
         * we could add a class to every element that will need
         * to be updated ?
         */
        $('.localeBound').trigger('setLocaleEvent');

        this._setLocale(locale);
    }

    async loadLangFile(lang) {
        // Implement to load language file async
    }

    /**
     * Get a translation
     */
    _(message_id) {
        if (!this._messages[this.lang]) {
            return message_id;
        }

        const msg = this._messages[this.lang][message_id];

        return (msg || message_id);
    }

    /**
     * Start building the application
     */
    start() {
        this.hook();

        const self = this;
        window.onhashchange = function () {
            if (self._is_observing_hash) {
                self._checkHash();
            } else {
                self._hash_changed_while_not_observing = true;
            }
        };

        this._observe();
    }

    hook() {
        if (typeof this._hook === 'function') {
            this._hook();
        }
    }

    loadMessages(lang, messages) {
        this._messages[lang] = messages;
    }

    /**
     * This function is triggered just before the browser change or close the page.
     */
    _beforeUnload(e) {
        this.abortOngoingXHR();

        // Simply quit page. Return false or true for standard confirmation page, or return a question to the user for a custom dialog. IE does not support null. Simply return nothing.
    }

    /**
     * Create a json error from given error message.
     * Added to support sending fatal errors.
     */
    _throw(message, fatal) {
        return JSON.stringify({ message, type: (fatal ? 'fatal' : 'error') });
    }

    /**
     * Error handling function
     *
     * @param description Error description
     * @param page JavaScript file in which the error occured
     * @param line Line number where the error occured
     */
    _onError(description, page, line) {
        if (this.debug) {
            console.debug(`${description} (${page}:${line})`);
        }

        try {
            let error = JSON.parse(description.replace('uncaught exception: ', ''));
            if (error.type == 'fatal') {
                this._showFatalError(error.message);
            }

            description = error.message;
            error = null;
        } catch (e) {
            // That was not JSON ... but we don't care
        }

        return false;
    }

    _showNavigationError() {
        const self = this;
        self.showModalDialog(`<h2>${self._('NAVIGATION_ERROR')}</h2>\
                                        <p>\
                                            <strong>${self._('INVALID_PAGE_REQUEST')}</strong>\
                                            <br />\
                                        </p>\
                                        <p class="submit">\
                                            <input type="submit" id="hook_create_error_close" value="${self._('OK')}" />\
                                        </p>`, 'fast', () => {
            $('#hook_create_error_close').safeClick(() => {
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
     *    Show a modal dialog telling the user something bad happened. He can try again or go back to where he was before.
     */
    _showFatalError(error, traceId) {
        const self = this;

        this.showModalDialog(`<h2>${self._('ERROR')}</h2>\
                        <p>\
                            <strong>${self._('FATAL_ERROR_OCCURED')}</strong>\
                            <br />${
    +(traceId ? `<span style="color:#aaa; font-size: 10px;">Trace ID: ${traceId}</span>` : '')}\
                        </p>\
                        <p class="submit">\
                            ${self._('FATAL_ERROR__YOU_CAN')} <a id="fatal-error-reload" href="javascript:void(0);">${self._(
    'FATAL_ERROR__RELOAD_PAGE',
)}</a> ${self._('OR')} <a id="fatal-error-stepback" href="javascript:void(0);">${self._(
    'FATAL_ERROR__GO_BACK',
)}</a>\
                        </p>`, 'fast', () => {
            $('#fatal-error-reload').click(() => {
                self._hideFatalError('reload');
            });
            $('#fatal-error-stepback').click(() => {
                self._hideFatalError('stepback');
            });
        });
    }

    /**
     *    Close the modal dialog then reload or back, depending on what the use chose.
     */
    _hideFatalError(action) {
        const self = this;
        this.hideModalDialog('fast', () => {
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
    _observe() {
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
    _stopObservation() {
        if (this.debug) {
            console.debug('Stopped hash observation');
        }

        this._is_observing_hash = false;
    }

    /**
     * Get location hash and check if it changed
     */
    _checkHash() {
        if (this.hash === location.hash) {
            return;
        }
        if (this.isOpeningView) {
            this.isOpeningViewCancelled = true;
            return false;
        }

        // Store the new hash before the loop starts again
        if (this.debug) {
            console.debug('Hash changed');
        }

        this.hash = location.hash;

        // Get the requested view
        if (!this.hash || this.hash === '#') {
            this.goTo(this.default_view);
            return false;
        }

        let splits = this.hash.substring(1).split('&');
        let view = splits.shift();

        let pos = view.indexOf('/');
        if (pos > 0) {
            const next = view.indexOf('/', pos + 1);
            if (next > 0) {
                pos = next;

                view = view.substring(0, pos);
            }
        }

        splits = null;

        if (view === '' || view === null) {
            view = this.default_view;
        }

        const initialState = {
            fetch: true,
            cancel: false,
        };

        let fetchViewPromise = Promise.resolve(initialState);
        if (this.currentView) {
            fetchViewPromise = fetchViewPromise
                .then((state) => this._getViewObject(this.currentView)
                    .then((viewObject) => {
                        // Are we staying in the same view ?
                        // Did the the view handled the hash change ?
                        if (view === this.currentView && viewObject.onHashChange(this.hash)) {
                            state.fetch = false;
                            return state;
                        }

                        // If we where in a view ask to view to close;
                        if (this.currentView) {
                            return viewObject.close().then((closeResponse) => {
                                if (closeResponse.cancel) {
                                    // Cannot close current view abort view change
                                    if (this.debug) {
                                        console.debug('View coulnd\'t close');
                                    }

                                    // Temporarily stop the hash observation loop so we can ...
                                    this._stopObservation();
                                    // ... keep where the user wanted to go and stay where we were ...
                                    this.hash = this.stepBack();
                                    // ... and then start to observe again
                                    this._observe();

                                    state.cancel = true;
                                    return state;
                                }

                                // Close current view
                                this.emit('viewClose', viewObject);
                                return state;
                            });
                        }

                        return state;
                    })
                    .catch(() => state), // Forward state
                );
        }

        fetchViewPromise.then((state) => {
            if (state.cancel) {
                return false;
            }

            // We don't keep page reloads in history
            if (this._force_clear) {
                this.addHistory(this.hash);
                this._force_clear = false;
            } else if (!this._detectStepBack(this.hash)) {
                this.addHistory(this.hash);
            }

            if (state.fetch) {
                this.isOpeningView = true;
                this.isOpeningViewCancelled = false;

                // Just to be sure we leave nothing behind
                this.hideModalDialogNow();

                // Highlight the right menu
                this._selectViewMenu(view);

                // It's time to change the view
                this._fetchView(view);
            }
        });
    }

    goTo(hash, force_clear) {
        if (this.debug) {
            console.debug(`Go To "${hash}"`);
        }

        if (force_clear) {
            this._force_clear = true;
        }

        location.hash = hash;
    }

    goToNoTriggerHashChange(hash) {
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

        if (hash.charAt(0) != '#') {
            hash = `#${hash}`;
        }

        if (this.isOpera()) {
            location.replace(`${location.protocol}//${location.hostname}${location.pathname}${hash}`);
            return;
        }
        location.replace(hash);
    }

    forceGoTo(hash, force_clear) {
        this._stopObservation();

        if (this.debug) {
            console.debug(`Force Go To "${hash}"`);
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
    parseHash(hash) {
        const infos = {
            view: '',
            params: {},
        };

        const splits = hash.split('&');
        infos.view = splits.shift().substr(1);
        for (let i = 0; i < splits.length; i++) {
            const info = splits[i].split('=');
            const param = info.shift();

            infos.params[param] = decodeURIComponent(info.join('=')); // Just in case there was a '=' in the value
        }

        return infos;
    }

    reload(hiddenParams, force) {
        if (force) {
            this._setViewCache(this.currentView, false, false);
        }
        this._fetchView(this.currentView, hiddenParams);
    }

    _onFetchView(viewObject) {
    }

    _onLoadView(viewObject, data, hiddenParams) {
    }

    /**
     * Fetch view html and model from server
     */
    _fetchView(view, hiddenParams) {
        this.currentView = view;

        const self = this;

        this._getViewObject(this.currentView).then((viewObject) => {
            this.hideLoading();
            this.abortOngoingXHR();

            const cached = this._isViewCached(view);
            if (cached && this.debug) {
                console.debug(`View "${view}" is in cache (${this.lang})`);
            }

            this._onFetchView(viewObject);

            // Ask the requested view to transmute hash to query parameters
            const params = viewObject.parseHash(this.hash);

            for (var k in params.params) {
                params[k] = params.params[k];
            }
            delete (params.params);

            if (hiddenParams && $.isPlainObject(hiddenParams)) {
                for (k in hiddenParams) {
                    params[k] = hiddenParams[k];
                }
            }

            params.k = this.SESSION_KEY;
            params.view = this.currentView;
            params.cmd = 'view';
            params.cached = cached;
            params.version = this.getApplicationVersion();
            params.uv = this.userVersion;

            if (this.replaced_session_key) {
                params.rk = this.replaced_session_key;
                this.replaced_session_key = false;
            }

            const param_string = $.param(params);

            $.ajax({
                url: `${this.getViewApiPath()}?${param_string}`,
                type: 'POST',
                data: {
                    context: this.getContext(),
                },
                dataType: 'json',
                headers: this.getXSRFHeaders(),
                success(response, textStatus, jqXHR) {
                    self.hideLoading();

                    if (self.isOpeningViewCancelled) {
                        self.isOpeningView = false;
                        setTimeout(() => self._checkHash(), 10);
                        return false;
                    }

                    /* Manage redirect responses from view calls. */
                    if (response.redirect) {
                        self.isOpeningView = false;
                        self.goTo(response.view);
                        return false;
                    }

                    if (response.status == 'error') {
                        const traceId = Application.getTraceIdFromJQueryXHR(jqXHR);

                        const info = response.data;
                        if (info.code == 600) { // VIEW_CMD_ERROR;
                            // Hopefuly this won't happen
                            self._showFatalError(`An error occured server side while fetching view data "${view}" (600)`,
                                traceId);
                        } else if (info.code == 601 || info.code == 602) { // VIEW_ACL_ERROR or MODEL_ACL_ERROR
                            self._showNavigationError();
                        } else { // Unknown error
                            self._showFatalError(`An unknown error was sent from server while fetching view data "${view}" (${info.error})`,
                                traceId);
                        }

                        return false;
                    }

                    self._onLoadView(viewObject, response.data, hiddenParams);
                    self._loadView(response.data, hiddenParams);
                },
                error(jqXHR, status, error) {
                    self.isOpeningView = false;
                    self.hideLoading();

                    self.validateXHR(jqXHR).then((isValidXHR) => {
                        if (!isValidXHR) {
                            return;
                        }
                        if (this.debug) {
                            console.debug('AJAX query error');
                            console.debug(status);
                            console.debug(error);
                        }

                        const traceId = Application.getTraceIdFromJQueryXHR(jqXHR);
                        self._showFatalError(`An error occured while fetching view data "${view}" (${status})`,
                            traceId);
                    });
                },
            });

            // If we don't receive an awnser after 1.5 second, a loading overlay will appear
            this.showLoadingAfterTimeout();
        });
    }

    /**
     *    Standard entry point for view data (html and model).
     */
    _loadView(data, hiddenParams) {
        const self = this;

        if (data.data) { // backward compatibility.
            data = data.data;
        }

        let fullParams;
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

        return this._getViewObject(this.currentView)
            .then((viewObject) => self._initViewObject(viewObject, data)
                .then(() => Promise.resolve(viewObject.load(fullParams)))
                .then(() => Promise.resolve(self._loadContentData(viewObject, data)))
                .then(() => Promise.resolve(self._hookView(viewObject)))
                .then(() => Promise.resolve(self._loadModel(viewObject, data.model)))
                .then(() => Promise.resolve(self._checkAnchor(viewObject)))
                .then(() => Promise.resolve(self._checkOnLoadScroll()))
                .then(() => Promise.resolve(self.isOpeningView = false)))
            .catch((error) => {
                this.isOpeningView = false;
                this._stopObservation();
                this._showFatalError(error);
                return Promise.reject(error);
            });
    }

    _initViewObject(viewObject: View, data: {}): Promise {
        window.view = viewObject;
        viewObject._validateable = (data.validateable || false);
        return Promise.resolve(viewObject.init(this.hash));
    }

    _loadContentData(viewObject: View, data: {}) {
        //* BASED on kronos-lib/Kronos/Common/View.php -> function getContent *//
        if (data.html) {
            return Promise.resolve(this._loadContent(viewObject, data.html))
                .then(() => {
                    // We store the html and json we received
                    this._setViewCache(this.currentView, data.html, false);
                });
        }
        if (this._isViewCached(this.currentView)) {
            // Get no html/params but the sent version is the same as the one we have, we can use it.
            return Promise.resolve(this._loadContent(viewObject, this._getViewCachedHTML(this.currentView)));
        }

        return Promise.reject(new Error('View not cached and not recieved from html...'));
    }

    /**
     *    Ask the view to draw the content if it can or we do it.
     *
     *    NOTE : If you want to support view redrawing, implement 'draw'.
     */
    _loadContent(viewObject, html) {
        if (typeof viewObject !== 'undefined' && typeof viewObject.draw === 'function') {
            viewObject.draw(html);
        } else {
            $('#content').html(html);
        }

        scrollTo(0, 0);
    }

    /**
     * Hook the view object to the current content
     */
    _hookView(viewObject: View) {
        const self = this;
        if (typeof viewObject._preHook === 'function') {
            viewObject._preHook();
        }

        return Promise.resolve(viewObject.hook(this.hash)).then(() => self._onViewHook(viewObject));
    }

    _onViewHook(viewObject) {
    }

    _loadModel(viewObject: View, model) {
        model = this.recursiveCleanFloats(model);

        if (this.debug) {
            console.debug(model);
        }

        this.emit('preInject');
        viewObject.inject(model);
        this.emit('postInject');
        if (typeof viewObject._postInject === 'function') {
            viewObject._postInject();
        }

        this._onViewInject(viewObject, model);

        if ($('.page-title').length) {
            window.document.title = ($('.page-title').text());
        }
    }

    _onViewInject(viewObject: View, model) {
    }

    _checkAnchor(viewObject: View) {
        const params = viewObject.parseHash(this.hash);
        if (params.params.anchor) {
            const anchor_name = params.params.anchor;
            const $element = $(`[anchor=${anchor_name}]`);
            if ($element.length === 0) {
                if (this.debug) {
                    console.warn('GET parameter "anchor" found but there is no element associated with it!');
                }
                return false;
            }
            if (typeof viewObject.onScrollToAnchor === 'function') {
                viewObject.onScrollToAnchor($element, anchor_name);
            } else if (this.debug) {
                console.warn('GET parameter "anchor" found but there is no `onScrollToAnchor` function on your view!');
            }
        }
    }

    _checkOnLoadScroll() {
        const scroll = this.getOnLoadScroll();
        if (scroll && this.isNumber(scroll.X) && this.isNumber(scroll.Y)) {
            window.scrollTo(scroll.X, scroll.Y);
            this.clearOnLoadScroll();
        }
    }

    setOnLoadScroll(X, Y) {
        this._onLoadScroll = {
            X: this.parseInt(X),
            Y: this.parseInt(Y),
        };
    }

    getOnLoadScroll() {
        return this._onLoadScroll;
    }

    clearOnLoadScroll() {
        delete this._onLoadScroll;
    }

    recursiveCleanFloats(model) {
        const self = this;
        if ($.isArray(model)) {
            for (let i = 0; i < model.length; i++) {
                model[i] = self.recursiveCleanFloats(model[i]);
            }
        } else if (typeof model === 'object') {
            for (const k in model) {
                model[k] = self.recursiveCleanFloats(model[k]);
            }
        } else {
            // Try not to catch fields not expected to be float like SIN, Date and addresses.
            if (typeof model === 'string' && model.match(/^\d+\.\d+$/i)) {
                const p = parseFloat(model);
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
    clearViewCache() {
        if (this.debug) {
            console.log('Clearing view cache');
        }

        delete (this._view_cache);
        this._view_cache = [];
    }

    /**
     * Get the currently store view html version.
     */
    _isViewCached(view) {
        // No HTML no cache.
        if (this._view_cache[view] && this._view_cache[view].html) {
            return true;
        }

        return false;
    }

    /**
     * Get the currently sotre view html
     */
    _getViewCachedHTML(view) {
        if (this._view_cache[view] && this._view_cache[view].html) {
            return this._view_cache[view].html;
        }

        throw this._throw('View was supposed to be cached...', true);
    }

    /**
     * Get the currently sotre view params
     * Does not throw and error if no params are found - they're optionnal
     */
    _getViewCachedParams(view) {
        return this._view_cache[view].params;
    }

    /**
     * Store given view html, json params and its version number.
     */
    _setViewCache(view, html, params) {
        delete (this._view_cache[view]);

        this._view_cache[view] = {
            html,
            params: params || null,
        };

        if (this.debug) {
            console.debug(`Cached version of view "${view}"`);
        }
    }

    /**
     * Show a loading animation and put a cover over the whole page.
     */
    showLoadingAfterTimeout() {
        this._loadingTimeout = setTimeout(() => {
            if (this._loadingTimeout) {
                clearTimeout(this._loadingTimeout);
                this._loadingTimeout = 0;

                this._showLoading();
            }
        }, this._loadingDelay);
    }

    /**
     * Dom manipulations to show the loading animation.
     */
    _showLoading() {
        // Must be implemented in superclass.
    }

    /**
     * Happens whenever the _hideLoading function is beginning.
     * This function is meant to be overriden by a child class.
     */
    beforeHideLoading() {
    }

    /**
     * Hide the loading animation and covers
     */
    hideLoading() {
        this.beforeHideLoading();
        clearTimeout(this._loadingTimeout);
        this._loadingTimeout = 0;

        this._hideLoading();
        this.afterHideLoading();
    }

    /**
     * Do dom manipulations to hide loading.
     */
    _hideLoading() {
        // Must be implemented in superclass.
    }

    /**
     * Happens whenever the hideLoading function is finished.
     * This function is meant to be overriden by a child class.
     */
    afterHideLoading() {
    }

    /**
     * Put a cover over the whole page to prevent user manipulation while something important is going on.
     *
     * @param color CSS color for the cover
     * @param opacity Cover opacity, between 0 and 1, in increment of 0.2 (i.e 0.8)
     */
    showOverlay(color, opacity, id, zIndex) {
        if (this.debug) {
            console.debug('Show overlay');
        }

        if (!id) {
            id = 'overlay';
        }

        if ($(`#${id}`).length > 0) {
            // Loading is already shown
            return;
        }

        $('body').append(`<div id="${id}"></div>`);

        if (!color) {
            color = 'transparent';
        }

        if (!opacity) {
            opacity = '0';
        }

        $(`#${id}`)
            .addClass('dialog-overlay')
            .css({
                backgroundColor: color,
                opacity,
                zIndex,
            }).show();
    }

    /**
     * Remove the whole page cover
     */
    hideOverlay(id) {
        if (this.debug) {
            console.debug('Hide overlay');
        }

        if (!id) {
            id = 'overlay';
        }

        $(`#${id}`).remove();
    }

    /**
     * Add an hash to the history list
     */
    addHistory(hash) {
        if (!this._history[this._history.length - 1] || this._history[this._history.length - 1].hash
            != hash) {
            this._history.push({ hash, context: {} });
        }
    }

    /**
     * Tries to detect if the browser navigation buttons where used
     */
    _detectStepBack(hash) {
        if (this._history[this._history.length - 2] && this._history[this._history.length - 2].hash == hash) {
            this._history.pop();

            return true;
        }

        return false;
    }

    /**
     * Go back to previous hash
     */
    stepBack(redirect) {
        let hash;

        do {
            if (this._history.length === 0) {
                hash = '';
                break;
            }

            hash = this._history.pop().hash;

            if (typeof hash === 'undefined') {
                hash = '';
                break;
            }
        } while (hash == location.hash);

        if (this.debug) {
            console.debug(`Step back to : ${hash}`);
        }

        if (redirect || typeof redirect === 'undefined') {
            location.hash = hash;
        }

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

        if (this.debug) {
            this._debugHistory();
        }

        const hash = this.stepBack(false);

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
    goBack(hash) {
        if (typeof hash === 'undefined') {
            hash = '';
        }

        if (this._history.length >= 2) {
            this._history.pop(); // Pop current page.
            hash = this._history.pop().hash; // Previous page;
        }

        if (this.debug) {
            console.debug(`Go back to "${hash}"`);
        }

        location.hash = hash;
    }

    forceGoBack() {
        let hash;
        this._stopObservation();

        if (this._history.length < 2) {
            hash = '';
        } else {
            this._history.pop(); // Pop current page;
            hash = this._history.pop().hash; // Previous page;
        }

        if (this.debug) {
            console.debug(`Force go back to "${hash}"`);
        }

        location.hash = hash;
        location.reload();
    }

    setContextValue(key, value) {
        if (this._history.length > 0) {
            if (!$.isPlainObject(this._history[this._history.length - 1].context)) {
                this._history[this._history.length - 1].context = {};
            }
            this._history[this._history.length - 1].context[key] = value;
        }
    }

    getContextValue(key) {
        if (this._history.length > 0 && $.isPlainObject(this._history[this._history.length
        - 1].context)) {
            return this._history[this._history.length - 1].context[key];
        }
        return false;
    }

    getContext() {
        if (!this._history.length) {
            return {};
        }

        const lastItem = this._history[this._history.length - 1];
        const context = lastItem.context || {};
        return context;
    }

    /**
     * Output the current browsing history to the console
     */
    _debugHistory() {
        for (let i = 0; i < this._history.length; i++) {
            console.debug(`${i} : ${this._history[i].hash}`);
            console.debug(this._history[i].state);
        }
    }

    _arrayPop(array, index) {
        if (array.length && index > 0 && index < array.length) {
            for (let i = index; i < array.length - 1; i++) {
                array[i] = array[i + 1];
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
        if (this._view_objects[viewName]) {
            return Promise.resolve(this._view_objects[viewName]);
        }

        return this.router.getClass(viewName)
            .then((viewClass) => {
                const viewObject = new viewClass(self);
                self._view_objects[viewName] = viewObject;
                return viewObject;
            })
            .catch((err) => {
                console.log(err);
                return Promise.reject(err);
            });
    }

    _scrollTop() {
        const win = window.pageYOffset ? window.pageYOffset : 0;
        const doc = document.documentElement ? document.documentElement.scrollTop : 0;
        const body = document.body ? document.body.scrollTop : 0;

        let value = win || 0;
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
     * @return Promise for modal root element
     */
    showModalDialog(content, speed, callback, width): Promise<jQuery> {
        const self = this;
        this.showOverlay('rgba(0, 0, 0, 0.4)', 1, 'overlay');

        const $modalDialog = $('<div></div>')
            .attr('id', 'modal_dialog')
            .css({ display: 'none' })
            .append(content);

        if (width) {
            $modalDialog.css('width', width);
        }

        $('body').addClass('no-scroll').append($modalDialog);

        return new Promise((resolve) => {
            $modalDialog.show(0, resolve);
        })
            .then(() => {
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
    hideModalDialog(speed, callback, use_detach) {
        const $modalDialog = $('#modal_dialog');
        return new Promise((resolve) => {
            $modalDialog.fadeOut(speed, resolve);
        })
            .then(() => {
                this.hideOverlay();

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
    hideModalDialogNow() {
        if (this.debug) {
            console.debug('Hide modal dialog now!');
        }

        $('#modal_dialog').remove();
    }

    getShowErrorHTML(message) {
        const self = this;
        return `<div class="modal-dialog"><h2>${self._('ERROR')}</h2>\
                        <p>\
                            <strong>${message ? self._(message) : self._('FATAL_ERROR_OCCURED')}</strong>\
                            <br />\
                            ${self._('ERROR_TRY_AGAIN')}\
                            <br />\
                            ${self._('CONTACT_SUPPORT_PERSIST')}\
                        </p>\
                        <p class="submit">\
                            <input type="submit" id="hook_create_error_close" value="${self._('OK')}" />\
                        </p></div>`;
    }

    showError(message, onHideCallback): Promise {
        const self = this;

        let resolveDialog;
        const dialogPromise = new Promise((resolve) => {
            resolveDialog = resolve;
        });

        self.showModalDialog(self.getShowErrorHTML(message), 'fast')
            .then(($dialog) => {
                $dialog.find('#hook_create_error_close').safeClick(() => {
                    this.hideModalDialog('fast').then(resolveDialog);
                });
            });

        return dialogPromise.then(() => {
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
    detectedExpiredSession(goTo) {
        if (!this.detectedExpiredSessionTimeout) {
            this.detectedExpiredSessionGoTo = goTo;
            this.detectedExpiredSessionTimeout = setTimeout(() => {
                this.showSessionExpiredError(this.detectedExpiredSessionGoTo);
            }, 100);
        }
    }

    clearDetectedExpiredSession() {
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
    detectedNetworkError(goTo) {
        if (!this.detectedNetworkErrorTimeout) {
            this.detectedNetworkErrorGoTo = goTo;
            this.detectedNetworkErrorTimeout = setTimeout(() => {
                this.showXHRNetworkErrorError(this.detectedNetworkErrorGoTo);
            }, 100);
        }
    }

    clearDetectedNetworkError() {
        this.detectedNetworkErrorGoTo = false;
        if (this.detectedNetworkErrorTimeout) {
            clearTimeout(this.detectedNetworkErrorTimeout);
            this.detectedNetworkErrorTimeout = false;
        }
    }

    getShowSessionExpiredError() {
        const self = this;
        return `<div class="modal-dialog"><h2>${self._('INVALID_CREDENTIAL_ERROR_TITLE')}</h2>\
                <p>\
                    <strong>${self._('INVALID_CREDENTIAL_ERROR_BODY')}</strong>\
                    <br />\
                </p>\
                <p class="submit">\
                    <input type="submit" id="hook_session_expired_error_close" value="${self._('OK')}" />\
                </p>\
            </div>`;
    }

    showSessionExpiredError(location) {
        const self = this;
        location = location || self.VIRTUALPATH || '/?logout';
        self.showModalDialog(self.getShowSessionExpiredError(), 'fast', () => {
            $('#hook_session_expired_error_close').safeClick(() => {
                document.location = location;
                self.clearDetectedExpiredSession();
            });
        });
    }

    getShowXHRNetworkError() {
        const self = this;
        return `<div class="modal-dialog"><h2>${self._('XHR_NETWORK_ERROR_TITLE')}</h2>\
                <p>\
                    <strong>${self._('XHR_NETWORK_ERROR_BODY')}</strong>\
                    <br />\
                </p>\
                <p class="submit">\
                    <input type="submit" id="hook_xhr_network_error_close" value="${self._('OK')}" />\
                </p>\
            </div>`;
    }

    showXHRNetworkErrorError(location) {
        const self = this;
        location = location || self.VIRTUALPATH || '/?logout';
        self.showModalDialog(self.getShowXHRNetworkError(), 'fast', () => {
            $('#hook_xhr_network_error_close').safeClick(() => {
                document.location = location;
                self.clearDetectedNetworkError();
            });
        });
    }

    getShowConfirmationHTML(title, message) {
        const self = this;
        return `<div class="modal-dialog"><h2>${title}</h2>\
                            <p>${message}</p>\
                        <p class="submit">\
                            <input type="button" id="hook_confirmation_yes" value="${self._('YES')}" />\
                            <input type="button" id="hook_confirmation_no" value="${self._('NO')}" />\
                        </p></div>`;
    }

    showConfirmation(title, message, yesCallback, noCallback) {
        const self = this;
        self.showModalDialog(self.getShowConfirmationHTML(title, message), 'fast', () => {
            $('#hook_confirmation_yes').safeClick(() => {
                if (yesCallback) {
                    yesCallback();
                }
                self.hideModalDialog('fast');
            });

            $('#hook_confirmation_no').safeClick(() => {
                if (noCallback) {
                    noCallback();
                }
                self.hideModalDialog('fast');
            });
        });
    }

    showMessage(title, message, content) {
        const self = this;

        self.showModalDialog(`<h2>${title}</h2>\
                        <p>\
                            <strong>${message}</strong>\
                        </p>\
                        ${content ? `<p>${content}</p>` : ''}\
                        <p class="submit">\
                            <input type="submit" id="hook_show_message_close" value="${self._('OK')}" />\
                        </p>`, 'fast', () => {
            $('#hook_show_message_close').safeClick(() => {
                self.hideModalDialog('fast');
            });
        });
    }

    requestUnmount(callback) {
        this.unmounts.push(callback);
    }

    performUnmounts() {
        this.unmounts.forEach((callback) => {
            callback();
        });
        this.unmounts = [];
    }

    htmlEntity(value) {
        if (value || this.isNumber(value)) {
            return $('<div></div>').text(value).html();
        }
        return '';
    }

    sleep(milliseconds) {
        const d = new Date();
        let n;
        do {
            n = new Date();
        } while (n - d < milliseconds);
    }

    generateGUID() {
        // Taken from http://stackoverflow.com/questions/864942/in-javascript-how-can-i-uniquely-identify-one-browser-window-from-another-which

        //------------------
        const S4 = function () {
            return (
                Math.floor(
                    Math.random() * 0x10000, /* 65536 */
                ).toString(16)
            );
        };
        //------------------

        return (
            `${S4() + S4()}-${
                S4()}-${
                S4()}-${
                S4()}-${
                S4()}${S4()}${S4()}`
        );
    }

    isNumber(value) {
        return typeof value === 'number' && isFinite(value);
    }

    /**
     * Support localized numeric representation.
     * Replace NaN by 0
     */
    parseFloat(value) {
        if (typeof value === 'number') {
            return value;
        }

        value = `${value};`;
        value = value.replace(/[^\d\-.,]/g, '');

        if (this.lang == 'fr') {
            if (value.indexOf(',') != -1) {
                value = value.replace(/\./g, '');
                value = value.replace(/\,/g, '.');
            }
        }

        value = value.replace(/\,/g, '');
        let val = parseFloat(value);
        if (isNaN(val)) {
            val = 0;
        }
        return val;
    }

    /**
     * Same as parseInt(value, 10) but replace NaN by 0
     */
    parseInt(value) {
        value = parseInt(value, 10);
        if (isNaN(value)) {
            value = 0;
        }
        return value;
    }

    /**
     * Format number according to locale and add money symbol
     */
    formatMoney(value, opts) {
        if (opts && opts.canBeNull && (value === '' || value === null)) {
            return '';
        }

        let currency_pos;
        if (this.lang == 'fr') {
            currency_pos = 'right';
        } else {
            currency_pos = 'left';
        }

        let result = this.formatNumber(value, opts);
        if (!result) {
            result = '0';
        }
        if (currency_pos == 'left') {
            if (opts && opts.nbsp) {
                return `$${result}`;
            }
            return `$${result}`;
        }

        if (opts && opts.nbsp) {
            return `${result}&nbsp;$`;
        }
        return `${result} $`;
    }

    unformatNumber(value, locale) {
        numbro.setLanguage(locale);
        const unformattedValue = numbro.unformat(value);
        if (typeof unformattedValue !== 'number') {
            return 0;
        }
        return unformattedValue;
    }

    /**
     * Formats a float value to a format easily understandable for processing.
     */
    formatMoneyForInput(value, precision) {
        precision = precision || 2;
        const unformattedValue = this.unformatNumber(value, this.locale.replace('_', '-'));
        return unformattedValue.toFixed(precision);
    }

    /**
     * Format percent according to locale
     */
    formatPercent(value, opts) {
        let separator;

        if (opts && opts.canBeNull && !value) {
            return '';
        }

        if (this.lang == 'fr') {
            if (opts && opts.nbsp) {
                separator = '&nbsp';
            } else {
                separator = ' ';
            }
        } else {
            separator = '';
        }

        let result = this.formatNumber(value, opts);
        if (!result) {
            result = '0';
        }
        return `${result + separator}%`;
    }

    /**
     * Format and localize a number
     * opts:
     *  minimumFractionDigits : The minimum number of digits after the decimal separator
     *  maximumFractionDigits : The maximum number of digits after the decimal separator
     *    precision (deprecated) : Default precisions of the number
     *  facultative_decimals (deprecated) :  Hide decimals if value = 0;
     */
    formatNumber(value, opts) {
        if (arguments.length === 0) {
            return '';
        }

        let number = parseFloat(value);
        if (isNaN(number)) {
            return '';
        }

        const options = this.normalizeNumberFormatOptions(opts);

        if (options.positive && number < 0) {
            number = 0;
        }

        return number.toLocaleString(
            this.locale.replace('_', '-'),
            options,
        );
    }

    normalizeNumberFormatOptions(opts) {
        const options = {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
            ...opts,
        };
        if (Number.isInteger(options.precision)) {
            options.maximumFractionDigits = options.precision;
        }
        if (options.facultative_decimals === false && options.minimumFractionDigits <= 0) {
            options.minimumFractionDigits = options.maximumFractionDigits;
        }
        return options;
    }

    /**
     * Format field value objects provided by model (id, value_fr, value_en)
     */
    formatFieldValue(fieldValue) {
        const t = this;

        if (!fieldValue) {
            return '';
        }

        if (typeof fieldValue === 'object') {
            const val = fieldValue[`value_${t.lang}`];

            if (typeof val === 'undefined') {
                return '';
            }

            return val;
        }

        return fieldValue;
    }

    parsePhone(phone) {
        let extension;
        if (/(,|ext|poste|#)/.test(phone)) {
            const coma = phone.indexOf(',');
            const ext = phone.indexOf('ext');
            const poste = phone.indexOf('poste');
            const square = phone.indexOf('#');

            const pos = Math.max(coma, ext, poste, square);
            if (pos != -1) {
                extension = phone.substr(pos).replace(/[^\d]/g, '');
                phone = phone.substr(0, pos);
            }
        } else {
            extension = '';
        }

        phone = phone.replace(/[^\d]/g, '');

        let formatted;
        if (phone[0] == '1' && phone.length >= 11) {
            formatted = `1 ${phone.substr(1, 3)} ${phone.substr(4, 3)}-${phone.substr(7, 4)}`;

            if (phone.length > 11) {
                extension = phone.substr(11);
            }
        } else if (phone.length >= 10) {
            formatted = `${phone.substr(0, 3)} ${phone.substr(3, 3)}-${phone.substr(6, 4)}`;

            if (phone.length > 10) {
                extension = phone.substr(10);
            }
        } else if (phone.length == 7) {
            formatted = `${phone.substr(0, 3)}-${phone.substr(3)}`;
        } else {
            formatted = phone;
        }

        if (extension) {
            formatted += this._('PHONE_EXTENSION') + extension;
        }

        return formatted;
    }

    formatPostalCode(code) {
        if (/^[a-zA-Z]\d[a-zA-Z]\d[a-zA-Z]\d$/.test(code)) {
            return (`${code.substr(0, 3)} ${code.substr(3)}`).toUpperCase();
        }
        return code;
    }

    pad(number, length) {
        let str = `${number}`;
        while (str.length < length) {
            str = `0${str}`;
        }

        return str;
    }

    interpolate(message, context) {
        let match;

        if (context !== null && typeof context === 'object') {
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
    validateXHR(jqXHR): Promise {
        const self = this;
        return new Promise((resolve) => {
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
                setTimeout(() => {
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

    registerXHR(xhr) {
        this._ongoing_xhrs.push(xhr);
    }

    unregisterXHR(xhr) {
        const index = this._ongoing_xhrs.indexOf(xhr);
        if (index >= 0) {
            this._ongoing_xhrs.splice(index, 1);
        }
    }

    abortOngoingXHR() {
        this.fetchService.abortOngoingFetchPromises();

        $.each(this._ongoing_xhrs, (index, xhr) => {
            if (typeof xhr !== 'undefined') {
                xhr.abort();
            }
        });
        this._ongoing_xhrs = [];
    }

    getViewUrl(view, cmd, paramsString) {
        if (paramsString.length > 0) {
            if (paramsString[0] !== '&') {
                paramsString = `&${paramsString}`;
            }
        }

        return `${this.getViewApiPath()}?k=${encodeURIComponent(this.SESSION_KEY)}&view=${encodeURIComponent(view)}&cmd=${encodeURIComponent(
            cmd,
        )}${paramsString}`;
    }

    fetch(url, options: FetchOptions): Promise {
        if (!options) {
            options = {};
        }

        const showLoading = (options.showLoading === true);
        const showOverlay = (options.showOverlay === true && !showLoading);
        if (showOverlay) {
            this.showOverlay();
        }

        const $button = options.button ? $(button) : false;
        if ($button) {
            $button.prop('disabled', true);
        }

        if (showLoading) {
            // If we don't receive an awnser after 1.5 second, a loading overlay will appear
            this.showLoadingAfterTimeout();
        }

        return this.fetchService.fetch(url, options)
            .finally(() => {
                if (showLoading) {
                    this.hideLoading();
                }
                if (showOverlay) {
                    this.hideOverlay();
                }
                if ($button) {
                    $button.prop('disabled', false);
                }
            });
    }

    fetchJson(url: string, options: FetchOptions): Promise {
        return this.fetch(url, options)
            .then(FetchService.parseJSON)
            .then(FetchService.handleApplicationResponseData);
    }

    get(view, cmd, paramsString, successCallback, showLoading, errorCallback, buttonSelector, skipOverlayHandling) {
        const options = {
            buttonSelector,
            showLoading,
            showOverlay: (!showLoading && !skipOverlayHandling),
        };
        return this.fetch(this.getViewUrl(view, cmd, paramsString), options)
            .then(FetchService.parseJSON)
            .then(FetchService.handleApplicationResponseData)
            .then((data) => {
                if (typeof successCallback === 'function') {
                    successCallback(data);
                }
                return data;
            })
            .catch((error) => this.handleFetchError(error, errorCallback));
    }

    post(
        view,
        cmd,
        paramsString,
        postString,
        successCallback,
        showLoading,
        errorCallback,
        buttonSelector,
        skipOverlayHandling,
    ) {
        let options = {
            buttonSelector,
            showLoading,
            showOverlay: (!showLoading && !skipOverlayHandling),
        };
        options = FetchService.addPostOptions(postString, options);
        return this.fetch(this.getViewUrl(view, cmd, paramsString), options)
            .then(FetchService.parseJSON)
            .then(FetchService.handleApplicationResponseData)
            .then((data) => {
                if (typeof successCallback === 'function') {
                    successCallback(data);
                }
                return data;
            })
            .catch((error) => this.handleFetchError(error, errorCallback));
    }

    handleFetchError(error, errorCallback) {
        let errorMessage;
        let data;

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

        if (this.isErrorObject(error)) {
            // Special flag to avoid logging error twice
            error.handledByApplication = true;
        }

        throw error;
    }

    isFetchAbortError(error) {
        return FetchService.isFetchAbortError(error);
    }

    isFetchResponseDataError(error) {
        return this.isErrorObject(error) && error instanceof FetchResponseDataError;
    }

    isErrorAlreadyHandled(error) {
        if (this.isErrorObject(error)) {
            return error.handledByApplication === true;
        }
        return false;
    }

    isErrorObject(error) {
        return typeof error === 'object';
    }

    datepicker(selector, options) {
        const self = this;
        return $(selector).bind('change', function () {
            this.value = self.date.format(this.value, 'input');
        }).datepicker(options);
    }

    _formatAddress(line1, line2, city, state, country, postalCode) {
        let address = '';

        let f = true;
        if (line1 !== '' && line1 !== false) {
            f = false;
            address += this.htmlEntity(line1);
        }

        if (line2 !== '' && line2 !== false) {
            if (!f) {
                address += ', ';
            }
            f = false;
            address += this.htmlEntity(line2);
        }

        if (city !== '' && city !== false) {
            if (!f) {
                address += ', ';
            }
            f = false;
            address += this.htmlEntity(city);
        }

        // TODO: Check with locallization
        if (state !== '' && state != 'QC') {
            if (!f) {
                address += ', ';
            }
            f = false;
            address += this.htmlEntity(state);
        }

        if (postalCode !== '' && postalCode !== false) {
            if (!f) {
                address += ', ';
            }
            f = false;
            address += this.htmlEntity(postalCode);
        }

        // TODO: Check with locallization
        if (country !== '' && country !== false && country != 'Canada') {
            if (!f) {
                address += ', ';
            }
            f = false;
            address += this.htmlEntity(country);
        }

        return address;
    }

    formatAddress(line1, line2, city, state, country, postalCode) {
        return this._formatAddress(line1, line2, city, state, country, postalCode);
    }

    formatGMapAddress(line1, line2, city, state, country, postalCode) {
        line1 = $.trim(line1);
        line2 = $.trim(line2);
        city = $.trim(city);
        country = $.trim(country);
        postalCode = $.trim(postalCode);

        line1 = line1.replace(/\bboul\./i, 'Boulevard');
        line1 = line1.replace(/,\s?\b(bur|bureau|app|appartement|appartment|local|office|porte|door)\b\.?\s*\d*/i, '');

        return (line1 ? `${line1}, ` : '')
            + (line2 ? `${line2}, ` : '')
            + (city ? `${city}, ` : '')
            + (state ? `${state}, ` : '')
            + (postalCode ? `${postalCode}, ` : '')
            + country;
    }

    isMobile() {
        return navigator.userAgent.match(/iPhone/i) !== null || navigator.userAgent.match(/iPod/i) !== null
            || navigator.userAgent.match(/Pre/i) !== null || navigator.userAgent.match(/Android/i) !== null;
    }

    /**
     * Download a file using an iframe
     */
    downloadFile(url) {
        const self = this;

        if (!self._iPad) {
            const frameId = 'download_iframe';
            let io = document.getElementById(frameId);
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
            const content = `<h2>${self._('DOWNLOAD_FILE_DIALOG_TITLE')}</h2>\
            <div class="header_line"></div>\
            <a id="hook_download_file" href="javascript:void(0);">${self._('DOWNLOAD_FILE')}</a>\
            <br /><br />`;

            self.showModalDialog(content, 'normal', () => {
                $('#hook_download_file').click(() => {
                    window.open(url, '_blank');
                    self.hideModalDialog('fast');
                });
            });
        }
    }

    getIEVersion() {
        let rv = null;
        if (navigator.appName == 'Microsoft Internet Explorer') {
            const ua = navigator.userAgent;
            const re = new RegExp('MSIE ([0-9]{1,}[.0-9]{0,})');
            if (re.exec(ua) != null) {
                rv = parseFloat(RegExp.$1);
            }
        }

        return rv;
    }

    isIE7() {
        let ieVersion = this.getIEVersion();
        ieVersion = (ieVersion !== null) ? ieVersion : 999; // for compatibility //

        return (ieVersion < 8);
    }

    isIE9() {
        const ieVersion = this.getIEVersion();
        return ((ieVersion >= 9) && (ieVersion < 10));
    }

    isOpera() {
        return navigator.appName == 'Opera';
    }

    checkStoredSession() {
        const self = this;
        if (this.canUseSessionStorage()) {
            const xsrf_token = self.getXSRFToken();
            if (!xsrf_token || !self._xsrf_cookie_name) {
                throw this._throw('Cannot check stored session without XSRF Token');
            }

            if (sessionStorage.getItem('window-name') != window.name) {
                if (this.debug) {
                    console.debug('Opened from another tab, clearing cloned stored session');
                }

                sessionStorage.clear();
                sessionStorage.setItem(self._xsrf_cookie_name, xsrf_token);
            }

            const stored_token = sessionStorage.getItem(self._xsrf_cookie_name);
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

            const session_key = sessionStorage.getItem('SESSION_KEY');

            if (session_key) {
                this.replaced_session_key = this.SESSION_KEY;
                this.SESSION_KEY = session_key;

                if (this.debug) {
                    console.log(`Replaced given session key "${this.replaced_session_key}" for stored session key "${this.SESSION_KEY}"`);
                }
            } else {
                sessionStorage.setItem('SESSION_KEY', this.SESSION_KEY);
            }
        }
    }

    canUseSessionStorage() {
        try {
            return (!!sessionStorage.getItem) && (!!$.cookie);
        } catch (e) {
            return false;
        }
    }

    forceElementRedraw($targetElement) {
        // So ugly... fix pour IE9. //
        $targetElement.hide().show();
    }

    // Access an object using dot notation
    getByKey(obj, key) {
        let nav = obj;
        const tokens = key.split('.');
        for (let i = 0; i < tokens.length; i++) {
            if (typeof nav !== 'object') {
                return undefined;
            }
            nav = nav[tokens[i]];
        }
        return nav;
    }

    sentry_beforeSend(event, hint) {
        if (hint && typeof hint.originalException === 'object') {
            if (hint.originalException instanceof FetchAbortError) {
                // Don't trigger an error for that but keep a trace.
                Sentry.addBreadcrumb({
                    message: 'FetchAbortError',
                    level: 'warning',
                });
                return null;
            }
            if (hint.originalException instanceof FetchResponseDataError) {
                // Don't trigger an error for that but keep a trace.
                Sentry.addBreadcrumb({
                    message: 'FetchResponseDataError',
                    level: 'warning',
                });
                return null;
            }
            // Ignore benign error: https://github.com/WICG/resize-observer/issues/38
            if (hint.originalException.message === 'ResizeObserver loop limit exceeded') {
                // Don't trigger an error for that but keep a trace.
                Sentry.addBreadcrumb({
                    message: 'ResizeObserver loop limit exceeded',
                    level: 'warning',
                });
                return null;
            }
        }

        return event;
    }

    static getTraceIdFromJQueryXHR(jqXHR) {
        if (jqXHR && jqXHR.getResponseHeader) {
            return jqXHR.getResponseHeader('x-kronos-transactionid') || null;
        }
        return null;
    }
}
