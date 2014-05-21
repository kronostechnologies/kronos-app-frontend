function AsyncTask(options) {
	var self = this;

	this.options = $.extend({}, this.defaults, options);

	this.options.pollDelay = Math.max(this.options.pollDelay, 100);

	this.retryCount = 0;
	this._reset();

	this._onWebSocketUpdate = function(statusUpdate) {
		self._update(statusUpdate);
	};

	this._onAjaxUpdate = function(statusUpdate, httpStatus, xhr) {
		self._ajaxTimeoutId = 0;
		self._update(statusUpdate);
		if(xhr.status != 201) { // 201 Created
			self._pollServer();
		}
	};
	this._onAjaxError = function(xhr, status, error) {
		self._ajaxTimeoutId = 0;
		self.inError = true;
		self._notifyError(xhr.statusCode(), xhr.responseText);
	};
	this._ajaxUpdate = function() {
		$.ajax(self.queueUrl, {
			contentType : 'application/json',
			error : self._onAjaxError,
			success : self._onAjaxUpdate
		});
	}
	this._ajaxTimeoutId = 0;

	this._start();
}

AsyncTask.prototype = {
	defaults : {
		url : '',
		update : false,
		error : false,
		success : false,
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
		if(this.options.websocket) {
			this.sendWebSocketCancel();
		}
		else {
			this._ajaxCancel();
		}
	},
	
	_ajaxCancel : function() {
		clearTimeout(this._ajaxTimeoutId);
		this._ajaxTimeoutId = 0;
		this.cancelled = true;
		
		$.ajax(this.queueUrl, {
			type : 'DELETE',
			error : function() {
				console.debug('could not cancel task');
			},
			success : function(data) {
				console.debug('cancelled');
				console.debug(data);
			}
		});
	},
	
	retry : function() {
		if(this.isCompleted() || this.isInError()) {
			this.retryCount++;
			this._reset();
			this._start();
			
			return true;
		}
		else {
			return false;
		}
	},
	
	getRetryCount : function() {
		return this.retryCount;
	},
	
	_start : function() {
		var self = this;
		
		$.ajax(this.options.url, {
			error : this._onAjaxError,
			headers : {
				'Accept' : 'poll'
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
	},
	
	_pollServer : function() {
		this._ajaxTimeoutId = setTimeout(this._ajaxUpdate, this.options.pollDelay);
	},
	
	_update : function(statusUpdate) {
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
					this._close();
					break;
				default:
					console.debug('Unknown task status : '.statusUpdate.status);
					break;
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
		else {
			
		}
	},
	
	_notifyError : function(code, text) {
		if($.isFunction(this.options.error)) {
			this.options.error.call({}, this, code, text);
		}
	}
}