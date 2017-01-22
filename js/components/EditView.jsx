// @flow

import BaseApplication from './BaseApplication.jsx';
import View from './View.jsx';

declare var $: {
	app: BaseApplication;
};

export default class EditView extends View {

	constructor() {
		super();
		this._can_save = true;
		this._modified = false;
		this._soft_modified = false;
		this._wasClosing = false;
	}

	init(hash) {
		super.init(hash);
		this._wasClosing = false;
	}

	changed(element) {
		if ($.app.debug) {
			console.debug('changed');
		}
		if (!this._modified) {
			this._modified = true;
		}
	}

	softModified() {
		if ($.app.debug) console.debug('soft modified');
		if (!this._soft_modified) {
			this._soft_modified = true;
		}
	}

	hook(hash) {
		if (!this._redrawn) {
			if ($.app.debug) {
				console.debug('Hooking view');
			}

			const t = this;

			$('#content form').on('change', ':input[name]:not(.no-form-change)', function () {
				t.changed(this);
			});
			$('#content form').on('keypress', ':input[type=text]:not(.no-form-change),:input[type=password]:not(.no-form-change)', function () {
				t.changed(this);
			});
			$('.number:not(.positive)').number();
			$('.number.positive').number({ positive: true });

			this._hook(hash);

			t.updateReturnToParentView();

			// Prevent IE to prompt that a change occured when clicking on a link with href=javascript:
			if (navigator.appName === 'Microsoft Internet Explorer') {
				$(window).data('beforeunload', window.onbeforeunload);
				$(document).on('mouseenter', 'a[href^="javascript:"]', () => {
					window.onbeforeunload = null;
				})
					.on('mouseleave', 'a[href^="javascript:"]', () => {
						window.onbeforeunload = $(window).data('beforeunload');
					});
			}

			window.onbeforeunload = function (e) {
				$.app._beforeUnload(e);
				if (t._modified) {
					return $.app._('SAVE_CHANGES_MESSAGE');
				}
			};
		}
	}

	inject(model) {
		if ($.app.debug) {
			console.debug('Injecting model');
		}

		this._soft_modified = false;

		this._inject(model);

		this._modified = false;
	}

	close(callback) {
		$('#edit_form').off('**');
		if (this._modified && this._can_save) {
			this._wasClosing = true;

			this.showSaveDialog(callback);

			return false;
		}

		return View.prototype.close.call(this, callback);
	}

	getSaveChangeDialogHtml() {
		return '<div class="modal-dialog">' +
			'<h2>' + $.app._('SAVE_CHANGES_TITLE') + '</h2>' +
			'<p>' + $.app._('SAVE_CHANGES_MESSAGE') + '</p>' +
			'<p class="submit">' +
			'<a href="javascript:void(0);" id="hook_cancel_save_changes">' + $.app._('CANCEL') + '</a>' +
			'<input type="submit" id="hook_do_not_save_changes" value="' + $.app._('NO') + '" />' +
			'<input type="submit" id="hook_do_save_changes" value="' + $.app._('YES') + '" />' +
			'</p>' +
			'</div>';
	}

	showSaveDialog(callback) {
		const t = this;
		if (typeof callback !== 'function') {
			callback = () => {};
		}
		$.app.showModalDialog(t.getSaveChangeDialogHtml(), 'normal', () => {
			$('#hook_do_save_changes').safeClick(() => {
				$.app.hideModalDialog('normal', () => {
					const saved = t.save(false,
						() => {
							callback('save');
							t.resume();
						}, false, true);

					if (!saved) {
						t.stop();
						callback('cancel');
					}
				});
			});

			$('#hook_do_not_save_changes').safeClick(() => {
				$.app.hideModalDialog('normal', () => {
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

			$('#hook_cancel_save_changes').safeClick(() => {
				$.app.hideModalDialog('normal', () => {
					t.stop();
					callback('cancel');
				});
			});
		});
	}

	save(hash, success_callback, error_callback, stay) {
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

		const t = this;

		$.app.showOverlay();

		const params = this._onSave();

		window.onbeforeunload = function (e) {
			return $.app._beforeUnload(e);
		};

		$.ajax({
			url: 'index.php?k=' + $.app.SESSION_KEY + '&view=' + this._view + '&cmd=save&id=' + this._id + params,
			type: 'POST',
			data: this._saveBuildPost(),
			dataType: 'json',
			headers: $.app.getXSRFHeaders(),
			success(data) {
				if (!data) data = {};

				$.app.hideOverlay();
				$('input[type=submit],input[type=button]').prop('disabled', false);

				let validationErrors = data.validation_errors;
				if (validationErrors === undefined) {
					validationErrors = (data.data) ? data.data.validation_errors : validationErrors;
				}
				if (validationErrors && validationErrors.length) {
					$.each(validationErrors, (i, err) => {
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
			error(jqXHR, status, error) {
				t._saveErrorHandler(jqXHR, status, error, error_callback);
			}
		});

		return true;
	}

// _saveSomething methods : save helper functions
	_saveRedirect(hash, stay) {
		if (stay) return;

		this._onClose();
		if (typeof hash === 'string') $.app.goTo(hash);
		else $.app.goBack();
	}

	_saveErrorHandler(jqXHR, status, error, error_callback): void {
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

	_saveBuildPost() {
		return '&model=' + encodeURIComponent($.toJSON(this.createModel()));
	}

	validate() {
		return true;
	}

	_onValidateFail() {
	}

	_onSaveStart() {
	}

	_canSave() {
		if ($.app.debug) {
			$.app._throw('View does not implement _canSave function');
		}
		return true;
	}

	_onCancelSave() {
	}

	_onSave() {
		return '';
	}

	_afterSave() {
	}

	_onClose() {
	}

	createModel() {
		let model = {};

		$('form input[name],select[name],textarea[name]')
			.each((index, element) => {
				const value = $(element).val();

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

	_onCreateModel(model) {
		return model;
	}

	_getRedirectionView(module, id) {
		return (module || '') + '/View/' + (id || '');
	}

	alternateCreateModel(model) {
		const alternateModel = {};

		const replaceBracket = function (t) {
			return t.replace(']', '');
		};

		const reduceFunc = function (previous, current) {
			const n = {};
			n[current] = previous;
			return n;
		};

		for (const key in model) {
			if (model.hasOwnProperty(key)) {
				const path = key.split('[').map(replaceBracket);
				const element = path.reduceRight(reduceFunc, model[key]);
				$.extend(true, alternateModel, element);
			}
		}

		return alternateModel;
	}

	_removeNullValue(model) {
		if (typeof model === 'object') {
			for (const index in model) {
				model[index] = this._removeNullValue(model[index]);
			}
		} else if (!model) {
			model = '';
		}

		return model;
	}

	cancel(hash) {
		this._modified = false;
		$('input[type=submit],input[type=button]').prop('disabled', false);
		$.app.goBack(hash);
	}

	cancelTo(hash) {
		this._modified = false;
		$('input[type=submit],input[type=button]').prop('disabled', false);
		hash = hash || '';
		$.app.navigateBackTo(hash);
	}

	resume() {
		$.app.resume(false);
	}

	stop() {
		$.app.resume(true);
	}

}
