// @flow
import {EventEmitter} from 'events';

declare var $:jQuery;

export default class View extends EventEmitter{

	constructor(app: Application) {
		super();
		this.app = app;
		this._view = '';
		this._id = false;
		this._uri_params = {};
		this._redrawn = false;
		this._loadSteps = [(params) => this._load(params)];

		this.on('hook', ()=>{
			$('input').each(function (index, element) {
				if (!$(element).attr('maxlength')) {
					$(element).attr('maxlength', 255);
				}
			});
		})
	}

	changed(element) {
	}

	parseHash(hash) {
		const uri = this.app.parseHash(hash);

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
	}

	load(params) {
		this.app.performUnmounts();
		this.params = params;

		return Promise.all(this._loadSteps.map((step) => step(params)))
			.then(() => {
				this.emit('load', params);
			});
	}

	_load(params) {
	}

	addLoadStep(step: (params: {}) => Promise){
		this._loadSteps.push(step);
	}

	draw(html) {
		this.app.performUnmounts();
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
		const self = this;
		if (!self._redrawn) {
			if (self.app.debug) {
				console.debug('Hooking view');
			}

			self.updateReturnToParentView();
			return Promise.resolve(this._hook(hash))
				.then(()=>{
					self.emit('hook', hash);
				});
		}
		else {
			return Promise.resolve();
		}
	}

	_hook(hash) {
		if (this.app.debug) {
			this.app._throw('View does not implement _hook function');
		}
		return Promise.resolve();
	}

	inject(model) {
		if (this.app.debug) {
			console.debug('Injecting model');
		}

		return this._inject(model);
	}

	_inject(model: {}) {
		if (this.app.debug) {
			this.app._throw('View does not implement _inject function');
		}
		return Promise.resolve();
	}

	close(callback) {
		return Promise.resolve(this._canClose())
			.then((canClose)=>{
				if (!canClose) {
					return Promise.resolve(this._onCancelClose())
						.then(() => ({cancel: true}));
				}

				this.emit('close');
				return { ok: true };
			})
			.then((closeState)=>{
				if (typeof callback === 'function') {
					callback(closeState);
				}

				return closeState;
			});
	}

	_canClose() {
		return true;
	}

	_onCancelClose() {
		if (this.app.debug) {
			this.app._throw('View does not implement _onCancelClose function');
		}
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
		const self = this;
		if (self._uri_params.parent_view === undefined) {
			return false;
		}
		if (self._uri_params.parent_view === '') {
			return self._uri_params.parent_view;
		}

		const views = self._uri_params.parent_view.split('|');
		return decodeURIComponent(views.pop());
	}

	updateReturnToParentView() {
		const self = this;
		const parent_view = self.getParentView();
		if (parent_view) {
			const translate_key = 'BACK_TO_' + parent_view.toUpperCase().split('/').splice(0, 2).join('_');
			const label = self.app._(translate_key);
			$('.hook_back_to_parent_view').text(label);
		}
	}
}
