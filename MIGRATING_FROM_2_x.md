# Migration notes for 2.x to 3.x

- New function loadLangFile() to load lang file if needed.
- `_showOverlay()` and `_hideOverlay()` meaning has changed. They only perform dom manipulations.  showOverlay and hideOverlay should be called.
- Removed AsyncTask
- Removed showQuestionCommentDialog()
- Removed getXHRRequest()
- Removed jquery.ajaxUploader
- Removed the _sendErrors mecanism and application._errors collection (warning the _errors collection is used directly).  js.sendErrors and js.sendErrorsOnUnload backend options not used anymore.
- Removed JS_PATH, IMG_PATH
- Removed silent js config

## Functions that are now async

- configure()
- _configure()
- setUserConfig()
- _setUserConfig()
- setLocale()
- _buildHeader()
