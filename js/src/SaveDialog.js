import type EditView from './EditView';

export default class SaveDialog {
    constructor(view: EditView) {
        this.view = view;
        this.app = view.app;
    }

    show() {
        return this.app.showModalDialog(this.getHtml(), 'normal')
            .then(($wrapper) => this.hookCommands($wrapper));
    }

    hookCommands($wrapper) {
        return Promise.race([
            this.hookDialogButton($wrapper, '#hook_do_save_changes').then(() => this.doSave()),
            this.hookDialogButton($wrapper, '#hook_do_not_save_changes').then(() => this.doNotSave()),
            this.hookDialogButton($wrapper, '#hook_cancel_save_changes').then(() => this.doCancel()),
        ]);
    }

    hookDialogButton($wrapper, selector) {
        return new Promise((resolve) => {
            $wrapper.find(selector).safeClick(resolve);
        })
            .then(() => this.app.hideModalDialog('normal'));
    }

    doSave() {
        return this.view.save();
    }

    doNotSave() {
        return Promise.resolve({ ok: true });
    }

    doCancel() {
        return Promise.resolve({ cancel: true });
    }

    getHtml() {
        return this.view.getSaveChangeDialogHtml();
    }
}
