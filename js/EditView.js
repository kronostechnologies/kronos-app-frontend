// @flow

import View from './View';

declare var $: jQuery;

export default class EditView extends View {

	constructor(app: Application) {
		super(app);
		const self = this;
		this._can_save = true;
		this._modified = false;
		this._soft_modified = false;
		this._wasClosing = false;
		this._validateSteps = [];


		this.on('hook', ()=>{
			let $contentForm = $('#content form');

			$contentForm.on('change', ':input[name]:not(.no-form-change)', function() {
				self.changed(this);
			});

			$contentForm.on('keypress', ':input[type=text]:not(.no-form-change),:input[type=password]:not(.no-form-change)', function() {
				self.changed(this);
			});
			$('.number:not(.positive)').number();
			$('.number.positive').number({positive: true});

			this._initOnBeforeUnloadEvents();
		});
	}

	init(hash) {
		super.init(hash);
		this._wasClosing = false;
	}

	changed(element) {
		if(this.app.debug) {
			console.debug('changed');
		}
		if(!this._modified) {
			this._modified = true;
		}
	}

	softModified() {
		if(this.app.debug) {
			console.debug('soft modified');
		}
		if(!this._soft_modified) {
			this._soft_modified = true;
		}
	}

	_initOnBeforeUnloadEvents() {
		const self = this;
		// Prevent IE to prompt that a change occured when clicking on a link with href=javascript:
		if(navigator.appName === 'Microsoft Internet Explorer') {
			$(window).data('beforeunload', window.onbeforeunload);
			$(document)
				.on('mouseenter', 'a[href^="javascript:"]', () => {
					window.onbeforeunload = null;
				})
				.on('mouseleave', 'a[href^="javascript:"]', () => {
					window.onbeforeunload = $(window).data('beforeunload');
				});
		}

		window.onbeforeunload = function(e) {
			self.app._beforeUnload(e);
			if(self._modified) {
				return self.app._('SAVE_CHANGES_MESSAGE');
			}
		};
	}

	inject(model) {
		if(this.app.debug) {
			console.debug('Injecting model');
		}

		this._soft_modified = false;

		this._inject(model);

		this._modified = false;
	}

	close(callback) {
		$('#edit_form').off('**');
		if(this._modified && this._can_save) {
			this._wasClosing = true;
			this.showSaveDialog(callback);
			return false;
		}

		return super.close(callback);
	}

	getSaveChangeDialogHtml() {
		return '<div class="modal-dialog">' +
			'<h2>' + this.app._('SAVE_CHANGES_TITLE') + '</h2>' +
			'<p>' + this.app._('SAVE_CHANGES_MESSAGE') + '</p>' +
			'<p class="submit">' +
			'<a href="javascript:void(0);" id="hook_cancel_save_changes">' + this.app._('CANCEL') + '</a>' +
			'<input type="submit" id="hook_do_not_save_changes" value="' + this.app._('NO') + '" />' +
			'<input type="submit" id="hook_do_save_changes" value="' + this.app._('YES') + '" />' +
			'</p>' +
			'</div>';
	}

	showSaveDialog(callback) {
		const self = this;
		if(typeof callback !== 'function') {
			callback = () => {
			};
		}
		self.app.showModalDialog(self.getSaveChangeDialogHtml(), 'normal', () => {
			$('#hook_do_save_changes').safeClick(() => {
				self.app.hideModalDialog('normal', () => {
					self.save(false,
						() => {
							callback('save');
							self.resume();
						}, false, true,
						() => {
							self.stop();
							callback('cancel');
						});
				});
			});

			$('#hook_do_not_save_changes').safeClick(() => {
				self.app.hideModalDialog('normal', () => {
					window.onbeforeunload = function(e) {
						return self.app._beforeUnload(e);
					};

					if(!self._canClose()) {
						self._onCancelClose();

						self.stop();
						callback('cancel');
					}
					else {
						self._modified = false; // We don't care about changes.
						self.resume();
						callback('resume');
					}
				});
			});

			$('#hook_cancel_save_changes').safeClick(() => {
				self.app.hideModalDialog('normal', () => {
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
	save(hash, success_callback, error_callback, stay, cancel_callback) {

		var self = this;

		// Shift parameters
		if(typeof hash == 'function') {
			if(typeof stay == 'function') {
				cancel_callback = stay;
			}
			stay = error_callback;
			if(typeof success_callback == 'function') {
				error_callback = success_callback;
			}
			success_callback = hash;
			hash = false;
		}

		// Form is closing.
		if(this._wasClosing) {

			// Abort operation if form is not allowed to close
			if(!this._canClose()) {
				this._onCancelClose();
				return;
			}

			// Should always redirect to close target after save.
			hash = this.app.getResumeHash();
		}

		// When form is not allowed to save or not modified. Just redirect to hash
		if(!this._can_save || (!this._modified && !this._soft_modified)) {
			if(typeof success_callback == 'function') {
				success_callback({}, false);
			}
			this._saveRedirect(hash, stay);
			return;
		}

		// Validate form and save if valid
		Promise.resolve(this.validate())
			.then(function(result) {
				if(!result) {
					if(typeof cancel_callback == 'function') {
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
	_doSave(hash, success_callback, error_callback, stay, cancel_callback) {
		const self = this;

		this._onSaveStart();

		$('input[type=submit],input[type=button]').prop('disabled', true);

		self.app.showOverlay();

		let params = this._onSave();

		window.onbeforeunload = function(e) {
			return self.app._beforeUnload(e);
		};

		$.ajax({
			url: 'index.php?k=' + self.app.SESSION_KEY + '&view=' + this._view + '&cmd=save&id=' + this._id + params,
			type: 'POST',
			data: this._saveBuildPost(),
			dataType: 'json',
			headers: self.app.getXSRFHeaders(),
			success: function(data) {

				if(!data) {
					data = {};
				}

				self.app.hideOverlay();
				$('input[type=submit],input[type=button]').prop('disabled', false);

				var validationErrors = data.validation_errors;
				if(validationErrors === undefined) {
					validationErrors = (data.data) ? data.data.validation_errors : validationErrors;
				}
				if(validationErrors && validationErrors.length) {
					$.each(validationErrors, function(i, err) {
						$('#' + err.field).hintError(err.message);
					});

					if(typeof cancel_callback == 'function') {
						cancel_callback();
					}
					return;
				}

				if(data.status == 'error') {
					if(self.app.debug) {
						console.debug('Save failed with error : ' + data.message);
					}

					if(typeof error_callback == 'function') {
						error_callback(data);
						error_callback = null;
					}
					else {
						self.app.showError(self.app._('SAVE_ERROR_OCCURED'));
					}

					return;
				}

				self._modified = false;

				self._afterSave();
				if(typeof success_callback == 'function') {
					success_callback(data, true);
					success_callback = null;
				}

				self._saveRedirect(hash, stay);
			},
			error: function(jqXHR, status, error) {
				self._saveErrorHandler(jqXHR, status, error, error_callback);
			}
		});
	}

	_saveRedirect(hash, stay) {
		if(stay) {
			return;
		}

		this._onClose();

		if(typeof hash === 'string') {
			this.app.goTo(hash);
		}
		else {
			this.app.goBack();
		}
	}

	_saveErrorHandler(jqXHR, status, error, error_callback) {

		this.app.hideOverlay();
		$('input[type=submit]').prop('disabled', false);

		this.validateXHR(jqXHR).then((isValidXHR)=> {
			if(!isValidXHR){
				return;
			}
			if(typeof error_callback == 'function') {
				error_callback(false);
				error_callback = null;
			}
			else {
				this.app.showError(this.app._('SAVE_ERROR_OCCURED'));
			}
		});
	}

	_saveBuildPost() {
		return '&model=' + encodeURIComponent($.toJSON(this.createModel()));
	}

	validate() {
		// Return false as soon as a step return false. Do validation one step at a time.
		return this._validateSteps.reduce(function(previousStepPromise, stepFunction) {
			return previousStepPromise.then(function(previousStepResult) {
				if(!previousStepResult) {
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
	addValidateStep(fn: () => Promise<bool>) {
		this._validateSteps.push(fn);
	}

	_onSaveStart() {
	}

	_onSave() {
		return '';
	}

	_afterSave() {
	}


	createModel() {
		const self = this;
		let model = {};

		$("form input[name],select[name],textarea[name]")
			.each(function(index, element) {
				let value = $(element).val();

				if(element.type == "radio" || element.type == "checkbox") {
					if(element.checked) {
						if(value == 'on') {
							model[element.name] = 'YES';
						}
						else {
							model[element.name] = value;
						}
					}
				}
				else if($(element).hasClass('money')) {
					model[element.name] = $(element).moneyVal();
				}
				else if($(element).hasClass('percent')) {
					model[element.name] = self.app.parseFloat(value.replace("%", ""));
				}
				else if($(element).hasClass('number')) {
					model[element.name] = self.app.parseFloat(value);
				}
				else {
					model[element.name] = value;
				}
			});

		if(this._onCreateModel) {
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
		var alternateModel = {};

		var replaceBracket = function(t) {
			return t.replace(']', '');
		};

		var reduceFunc = function(previous, current) {
			var n = {};
			n[current] = previous;
			return n;
		};

		for(var key in model) {
			if(model.hasOwnProperty(key)) {
				var path = key.split('[').map(replaceBracket);
				var element = path.reduceRight(reduceFunc, model[key]);
				$.extend(true, alternateModel, element);
			}
		}

		return alternateModel;
	}

	_removeNullValue(model) {
		if(typeof model == "object") {
			for(let index in model) {
				model[index] = this._removeNullValue(model[index]);
			}
		}
		else if(!model) {
			model = '';
		}

		return model;
	}

	cancel(hash) {
		this._modified = false;
		$('input[type=submit],input[type=button]').prop('disabled', false);
		this.app.goBack(hash);
	}

	cancelTo(hash) {
		this._modified = false;
		$('input[type=submit],input[type=button]').prop('disabled', false);
		hash = hash || '';
		this.app.navigateBackTo(hash);
	}

	resume() {
		this.app.resume(false);
	}

	stop() {
		this.app.resume(true);
	}
}