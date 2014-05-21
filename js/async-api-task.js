function AsyncTask(options) {
	var self = this;

	this.options = $.extend({}, this.defaults, options);

	this.options.pollDelay = Math.max(this.options.pollDelay, 100);

	this._ajaxTimeoutId = 0;
	
	this.retryCount = 0;
	this._reset();

	this._onWebSocketUpdate = function(statusUpdate) {
		self._update(statusUpdate);
	};

	this._onAjaxUpdate = function(statusUpdate, httpStatus, xhr) {
		self._ajaxTimeoutId = 0;
		self._update(statusUpdate);
		if(self.isPending() || self.isProcessing()) { // 201 Created, the task is completed
			self._pollServer();
		}
	};
	this._onAjaxError = function(xhr) {
		self._ajaxTimeoutId = 0;
		self.inError = true;
		self._notifyError(xhr.status, xhr.responseText);
	};
	this._ajaxUpdate = function() {
		$.ajax(self.queueUrl, {
			contentType : 'application/json',
			error : self._onAjaxError,
			success : self._onAjaxUpdate
		});
	};
}

AsyncTask.prototype = {
	defaults : {
		url : '',
		update : false,
		error : false,
		success : false,
		cancel : false,
		pollDelay : 500,
		websocket : false
	},
	
	_reset : function() {
		this.lastStatus = {
			status : 'pending',
			percentage : 0,
			current : 0,
			steps : 0
		};

		this.started = false;
		this.inError = false;
		this.cancelled = false;
		this.queueUrl = false;
		this.result = false;
	},
	
	getStatus : function() {
		return this.lastStatus.status;
	},
	
	isCompleted : function() {
		return this.lastStatus.status == 'completed';
	},
	
	isPending : function() {
		return this.lastStatus.status == 'pending';
	},
	
	isProcessing : function() {
		return this.lastStatus.status == 'processing';
	},
	
	isCancelled : function() {
		return this.cancelled;
	},
	
	isInError : function() {
		return this.inError; // Not so sure about this...
	},
	
	getPercentage : function() {
		return this.lastStatus.percentage;
	},
	
	getCurrentStep : function() {
		return this.lastStatus.current;
	},
	
	getSteps : function() {
		return this.lastStatus.steps;
	},
	
	getResult : function() {
		return this.result;
	},
	
	cancel : function() {
		if(this.isPending() || this.isProcessing()) {
			if(this.options.websocket) {
				this.sendWebSocketCancel();
			}
			else {
				this._ajaxCancel();
			}
			
			return true;
		}
		else {
			return false;
		}
	},
	
	_ajaxCancel : function() {
		clearTimeout(this._ajaxTimeoutId);
		this._ajaxTimeoutId = 0;
		this.cancelled = true;
		
		var self = this;
		$.ajax(this.queueUrl, {
			type : 'DELETE',
			error : this._onAjaxError,
			success : function(data) {
				if($.isFunction(self.options.cancel)) {
					self.options.cancel.call({}, this);
				}
			}
		});
	},
	
	retry : function() {
		if(this.isCompleted() || this.isInError()) {
			this.retryCount++;
			this._reset();
			this.start();
			
			return true;
		}
		else {
			return false;
		}
	},
	
	getRetryCount : function() {
		return this.retryCount;
	},
	
	start : function() {
		if(!this.started) {
			this.started = true;
			
			var self = this;
			$.ajax(this.options.url, {
				error : this._onAjaxError,
				headers : {
					'Accept' : 'poll' // TODO  : support websocket
				},
				success : function(response, status, xhr) {
					if(xhr.status == 202) {
						// TODO : get the X-WebSocket-Channel header if we have a websocket opened

						self.queueUrl = response.data.location;

						self._pollServer();
					}
					else {
						self._notifyError(xhr.status, xhr.responseText);
					}
				}
			});
			
			return true;
		}
		else {
			return false;
		}
	},
	
	_pollServer : function() {
		this._ajaxTimeoutId = setTimeout(this._ajaxUpdate, this.options.pollDelay);
	},
	
	_update : function(statusUpdate) {
		if(this.isPending() || this.isProcessing()) {
			if(this._statusChanged(statusUpdate)) {
				this.lastStatus = statusUpdate;

				switch(statusUpdate.status) {
					case 'pending':
					case 'processing':
						if($.isFunction(this.options.update)) {
							this.options.update.call({}, this, statusUpdate.status, statusUpdate.data.percentage, statusUpdate.data.current, statusUpdate.data.steps);
						}
						break;
					case 'completed':
						if($.isFunction(this.options.success)) {
							this.options.success.call({}, this, statusUpdate.data.location, statusUpdate.data.expires);
						}
						this._close();
						break;
					case 'cancelled':
						this.cancelled = true;
						if($.isFunction(this.options.cancel)) {
							this.options.cancel.call({}, this);
						}
						this._close();
						break;
					case 'error':
						this.inError = true;
						this._notifyError(500, '');
						break;
					default:
						console.debug('Unknown task status : '.statusUpdate.status);
						break;
				}
			}
		}
	},
	
	_statusChanged : function(newStatus) {
		return (this.lastStatus.status != newStatus.status || this.lastStatus.data.percentage != newStatus.data.percentage || this.lastStatus.data.current != newStatus.data.current);
	},
	
	_close : function() {
		if(this.websocket) {
			// stop listening
		}
	},
	
	_notifyError : function(code, text) {
		if($.isFunction(this.options.error)) {
			this.options.error.call({}, this, code, text);
		}
	}
};