// @flow

// import jQuery from 'jquery';

// TODO: Enlever les dépendance à $.app
// var $ = jQuery;
declare var $;

export default class View {

	constructor() {
		this._view = '';
		this._id = false;
		this._uri_params = {};
		this._redrawn = false;
	}

	changed(element) {

	}

	parseHash(hash) {
		const uri = $.app.parseHash(hash);

		let pos = uri.view.indexOf('/');
		if (pos > 0) {
			const next = uri.view.indexOf('/', pos + 1);
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

	onHashChange(hash) {
		const uri = this.parseHash(hash);

		return this._onHashChange(hash, uri);
	}

	_onHashChange(hash, uri) {
		// Hash changed but we stay in the same view object

		return false; // Return true here if you want to handle the change and prevent the application from fetching data from the server
	}

	onScrollToAnchor($element, anchor_name) {
		$element.focus();
		const element_offset = $element.offset();
		window.scrollTo(element_offset.left, element_offset.top);
	}

	init(hash) {
		const uri = this.parseHash(hash);

		this._uri = uri;
		this._view = uri.view;
		this._id = uri.id;
		this._uri_params = uri.params;

		this._controls = {};

		this._init(hash);
	}

	_init() {
		if ($.app.debug) {
			$.app._throw('View does not implement _init function');
		}
	}

	load(params) {
		$.app.performUnmounts();
		return Promise.resolve(this._load(params));
	}

	_load(params) {
		this.params = params;
	}

	draw(html) {
		$.app.performUnmounts();
		this._onBeforeDraw();

		if (this._canRedraw()) {
			let selectors = this._getRedrawingSelectors();

			let can_redraw = true;

			for (let i = 0; can_redraw && i < selectors.length; i++) {
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

		const r = $('#content').html(html);
		this._onDraw();
	}

	_canRedraw() {
		return false;
	}

	_getRedrawingSelectors() {
		return [];
	}

	/**
	 * You can override this function to do anything before the view is drawn (or redrawn)
	 */
	_onBeforeDraw() {
	}

	/**
	 * You can override this function to know when the view is done drawing
	 */
	_onDraw(redrawn) {
	}

	hook(hash) {
		const t = this;
		if (!t._redrawn) {
			if ($.app.debug) {
				console.debug('Hooking view');
			}

			this._hook(hash);

			t.updateReturnToParentView();
		}
	}

	_hook(hash) {
		if ($.app.debug) {
			$.app._throw('View does not implement _hook function');
		}
	}

	inject(model) {
		if ($.app.debug) {
			console.debug('Injecting model');
		}

		this._inject(model);
	}

	_inject(model: {}) {
		if ($.app.debug) {
			$.app._throw('View does not implement _inject function');
		}
	}

	close(callback) {
		const canClose = this._canClose();

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

	_canClose() {
		return true;
	}

	_onCancelClose() {
		if ($.app.debug) {
			$.app._throw('View does not implement _onCancelClose function');
		}
	}

	_onClose() {
	}

	pushParentView(view_name) {
		//* Utilisée dans FNA et BO. *//

		const t = this;
		let ret = '';
		if (t._uri_params.parent_view) {
			ret += t._uri_params.parent_view + '|';
		}
		ret += encodeURIComponent(view_name);
		return ret;
	}

	popParentView(include_id) {
		if (typeof include_id === 'undefined') {
			include_id = true;
		}

		if (this._uri_params.parent_view === undefined) {
			return false;
		}

		const views = this._uri_params.parent_view.split('|');
		const parent_view = decodeURIComponent(views.pop());
		if (views.length === 0) {
			this._uri_params.parent_view = undefined;
		} else {
			this._uri_params.parent_view = views.join('|');
		}
		let url = '';

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

	getParentView() {
		const t = this;
		if (t._uri_params.parent_view === undefined) {
			return false;
		}
		if (t._uri_params.parent_view === '') {
			return t._uri_params.parent_view;
		}

		const views = t._uri_params.parent_view.split('|');
		return decodeURIComponent(views.pop());
	}

	updateReturnToParentView() {
		const t = this;
		const parent_view = t.getParentView();
		if (parent_view) {
			const translate_key = 'BACK_TO_' + parent_view.toUpperCase().split('/').splice(0, 2).join('_');
			const label = $.app._(translate_key);
			$('.hook_back_to_parent_view').text(label);
		}
	}
}
