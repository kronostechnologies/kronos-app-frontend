# Migration notes for 2.x to 3.x

- New function bootstrap() to start the app (may still changes...)
- New function loadLangFile() to load lang file if needed.
- Removed AsyncTask
- Removed showQuestionCommentDialog()
- Removed getXHRRequest()
- Removed jquery.ajaxUploader
- Removed the _sendErrors mecanism and application._errors collection (warning the _errors collection is used directly).  js.sendErrors and js.sendErrorsOnUnload backend options not used anymore.

## Functions that are now async

- configure()
- _configure()
- setUserConfig()
- _setUserConfig()
- setLocale()
- _buildHeader()
