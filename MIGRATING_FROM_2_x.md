# Migration notes for 2.x to 3.x

- Removed AsyncTask
- Removed showQuestionCommentDialog()
- Removed getXHRRequest()
- Removed jquery.ajaxUploader
- Removed the _sendErrors mecanism and application._errors collection (warning the _errors collection is used directly).  js.sendErrors and js.sendErrorsOnUnload backend options not used anymore.
