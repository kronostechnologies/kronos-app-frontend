// @flow

import View from './View';
import SaveDialog from './SaveDialog';
import FetchService, { FetchAbortError, FetchResponseDataError } from './FetchService';
import type { ValidateStepCallback, ValidateResponse } from './types';

declare var $: jQuery;

export default class EditView extends View {
    constructor(app: Application) {
        super(app);
        const self = this;
        this._can_save = true;
        this._modified = false;
        this._soft_modified = false;
        this._validateSteps = [];
        this._isUnloadRebound = false;

        this.on('hook', () => {
            const $contentForm = $('#content form');

            $contentForm.on('change', ':input[name]:not(.no-form-change)', function () {
                self.changed(this);
            });

            $contentForm.on('keypress',
                ':input[type=text]:not(.no-form-change),:input[type=password]:not(.no-form-change)',
                function () {
                    self.changed(this);
                });
            $('.number:not(.positive)').number();
            $('.number.positive').number({ positive: true });

            this._initOnBeforeUnloadEvents();
        });

        this.on('close', () => {
            $('#edit_form').off('**'); // FNA specific
            this._restoreOnBeforeUnloadEvents();
        });

        this.on('saveInit', (saveResponse) => {
            this._restoreOnBeforeUnloadEvents();
        });

        this.on('saveStart', () => {
            $('input[type=submit],input[type=button]').prop('disabled', true);

            this.app.showOverlay();
        });

        this.on('save', (saveResponse) => {
            if (saveResponse.cancel) {
                this._initOnBeforeUnloadEvents();
            }
        });

        this.on('saveEnd', () => {
            this.app.hideOverlay();
            $('input[type=submit],input[type=button]').prop('disabled', false);
        });
    }

    changed(element) {
        if (!this._modified) {
            this._modified = true;
        }
    }

    softModified() {
        if (!this._soft_modified) {
            this._soft_modified = true;
        }
    }

    _initOnBeforeUnloadEvents() {
        if (!this._isUnloadRebound) {
            this._onBeforeUnloadBackup = window.onbeforeunload;

            const onBeforeUnload = (event) => {
                if (typeof this._onBeforeUnloadBackup !== 'undefined') {
                    this._onBeforeUnloadBackup(event);
                }
                if (this._modified) {
                    return this.app._('SAVE_CHANGES_MESSAGE');
                }
            };

            // Prevent IE to prompt that a change occured when clicking on a link with href=javascript:
            if (navigator.appName === 'Microsoft Internet Explorer') {
                $(document)
                    .on('mouseenter', 'a[href^="javascript:"]', () => {
                        window.onbeforeunload = null;
                    })
                    .on('mouseleave', 'a[href^="javascript:"]', () => {
                        window.onbeforeunload = onBeforeUnload;
                    });
            }

            window.onbeforeunload = onBeforeUnload;
            this._isUnloadRebound = true;
        } else {
            console.log('_initOnBeforeUnloadEvents already rebound onbeforeunload. Skipped. See stack trace below.');
            console.trace();
        }
    }

    _restoreOnBeforeUnloadEvents() {
        if (this._isUnloadRebound) {
            window.onbeforeunload = this._onBeforeUnloadBackup;
            this._isUnloadRebound = false;
        }
    }

    inject(model) {
        if (this.app.debug) {
            console.debug('Injecting model');
        }

        this._soft_modified = false;

        this._inject(model);

        this._modified = false;
    }

    close() {
        if (this._closed) {
            // Already closed
            return Promise.resolve({ ok: true });
        }

        if (this._modified && this._can_save) {
            return this.showSaveDialog()
                .then((saveDialogResponse) => {
                    if (saveDialogResponse.cancel) {
                        return Promise.resolve({ cancel: true });
                    }

                    return super.close();
                });
        }

        return super.close();
    }

    getSaveChangeDialogHtml() {
        return '<div class="modal-dialog">'
            + `<h2>${this.app._('SAVE_CHANGES_TITLE')}</h2>`
            + `<p>${this.app._('SAVE_CHANGES_MESSAGE')}</p>`
            + '<p class="submit">'
            + `<a href="javascript:void(0);" id="hook_cancel_save_changes">${this.app._('CANCEL')}</a>`
            + `<input type="submit" id="hook_do_not_save_changes" value="${this.app._('NO')}" />`
            + `<input type="submit" id="hook_do_save_changes" value="${this.app._('YES')}" />`
            + '</p>'
            + '</div>';
    }

    showSaveDialog(callback) {
        const dialog = new SaveDialog(this);
        return dialog.show()
            .then((response) => {
                if (typeof callback === 'function') {
                    callback(response);
                }
                return response;
            });
    }

    save() {
        const self = this;

        this.emit('saveInit');

        // When form is not allowed to save or not modified. Do nothing
        if (!this._can_save || (!this._modified && !this._soft_modified)) {
            return Promise.resolve({ ok: true });
        }
        return Promise.resolve(this.validate())
            .then((validateResponse) => {
                if (!EditView.isValidateResponseValid(validateResponse)) {
                    // Cancelled because of validations
                    return Promise.resolve({ cancel: true, validateResponse });
                }

                this.emit('saveStart');

                // Perform save XHR
                const params = `&id=${encodeURIComponent(this._id)}${this._onSave()}`;
                const url = this.app.getViewUrl(this._view, 'save', params);

                const fetchOptions = this._saveBuildPost();
                return this.app.fetchJson(url, fetchOptions)
                    .then((data) => {
                        if (!data) {
                            data = {};
                        }

                        if (!this.handleServerSideValidationErrors(data)) {
                            return Promise.resolve({ cancel: true });
                        }

                        if (data.status === 'error') {
                            throw new FetchResponseDataError(data);
                        }

                        this._modified = false;

                        return Promise.resolve({ ok: true, saved: true, data });
                    })
                    .finally(() => {
                        this.emit('saveEnd');
                    })
                    .then((saveResponse) => {
                        this.emit('save', saveResponse);
                        return saveResponse;
                    });
            });
    }

    handleServerSideValidationErrors(data) {
        let validationErrors = data.validation_errors;
        if (validationErrors === undefined) {
            validationErrors = (data.data) ? data.data.validation_errors : validationErrors;
        }
        if (validationErrors && validationErrors.length) {
            $.each(validationErrors, (i, err) => {
                $(`#${err.field}`).hintError(err.message);
            });

            false;
        }

        return true;
    }

    showSaveErrorMessage() {
        this.app.showError(this.app._('SAVE_ERROR_OCCURED'));
    }

    _saveBuildPost(fetchOptions: {}) {
        if (!fetchOptions) {
            fetchOptions = {};
        }

        const postString = `&model=${encodeURIComponent(JSON.stringify(this.createModel()))}`;
        fetchOptions = FetchService.addPostOptions(postString);
        return fetchOptions;
    }

    validate(): Promise<ValidateResponse> {
        // Return false as soon as a step return false. Do validation one step at a time.
        return this._validateSteps.reduce((
            previousStepPromise,
            stepFunction,
        ) => previousStepPromise.then((previousStepResult) => {
            if (!EditView.isValidateResponseValid(previousStepResult)) {
                // Form is invalid
                return previousStepResult;
            }

            // Run next step of validation
            return stepFunction();
        }), Promise.resolve({ ok: true }));
    }

    static isValidateResponseValid(validateResponse) {
        if (typeof validateResponse === 'undefined') {
            return false;
        }

        if (typeof validateResponse === 'boolean') {
            return validateResponse;
        }

        return !!validateResponse.ok;
    }

    /**
     * Add a validation step
     * fn should be a function returning promise for a boolean or a boolean indicating validation success.
     */
    addValidateStep(callback: ValidateStepCallback) {
        this._validateSteps.push(callback);
    }

    _onSave() {
        return '';
    }

    createModel() {
        const self = this;
        let model = {};

        $('form input[name],select[name],textarea[name]')
            .each((index, element) => {
                const value = $(element).val();

                if (element.type == 'radio' || element.type == 'checkbox') {
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
                    model[element.name] = self.app.parseFloat(value.replace('%', ''));
                } else if ($(element).hasClass('number')) {
                    model[element.name] = self.app.parseFloat(value);
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
}
