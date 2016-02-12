(function($) {
	var defaultCallbacks = {
		onStart: function(options) {
			var progressBarElementId = 'jUploadPG' + options.id;
			var progressBarNode = $('<span id="' + progressBarElementId + '" style="display:none"></span>');
			$(options.uploader).empty().append(progressBarNode);
			progressBarNode.progressBar(options.config.progressBarConfig);
			return progressBarNode;
		},

		onProgress: function(options) {
			options.node.progressBar(options.percentage);
		},

		onEnd: function(options) {
			options.node
				.progressBar(100)
				.slideToggle('slow', function() {
					$(this).progressBar(0);
				});
		}
	};

	$.extend({
		ajaxUploader: new function() {
			this.defaults = {
				uploadFileName: 'upload_file',
				uploadButtonLabel: 'Upload',
				dataType: 'json',
				autoUpload: false,
				progressBarConfig: {},
				validateFileName: function() { return true; },
				passedInput: false,
				callbacks: defaultCallbacks,
				data: {} // Additional data appended to the post request request
			};

			this.construct = function(config) {
				var argconfig = config;

				return this.each(function() {
					var uploader = this;
					var config = {};

					if(uploader.config != null) {
						if(argconfig != null) {
							uploader.config = $.extend(true, uploader.config, argconfig);
						}
					}
					else {
						config = $.extend(true, {}, $.ajaxUploader.defaults, argconfig);
					}

					if(!config.passedInput) {
						var uploadButtonId = config.uploadFileName + '_button';
						var html = '<input id="' + config.uploadFileName + '" name="' + config.uploadFileName + '" type="file" size="45" class="input">';

						if(!config.autoUpload) {
							html += '<a id="' + uploadButtonId + '" href="javascript:void(0);">' + config.uploadButtonLabel + '</a>';
						}

						$(uploader).html(html);

						if(!config.autoUpload) {
							$('#' + uploadButtonId).click(function() {
								ajaxFileUpload(config);
							});
						}
						else {
							$('#' + config.uploadFileName).change(function() {
								ajaxFileUpload(config);
							});
						}
					}
					else {
						config.uploadFileName = config.passedInput.attr('id');
						config.passedInput.change(function() {
							ajaxFileUpload(config);
						});
					}


					function createUploadIframe(id) {
						//create frame
						var frameId = 'jUploadFrame' + id;
						var io = document.createElement('iframe');
						io.id = frameId;
						io.name = frameId;
						io.style.position = 'absolute';
						io.style.top = '-1000px';
						io.style.left = '-1000px';
						document.body.appendChild(io);
						return io;
					}

					function createUploadForm(id, fileElementId) {
						//create form
						var formId = 'jUploadForm' + id;
						var fileId = 'jUploadFile' + id;
						var apcInputId = 'jApcProgress' + id;
						var form = $('<form action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>');
						$('<input id="' + apcInputId + '" name="APC_UPLOAD_PROGRESS" value="' + id + '">').appendTo(form);

						if(typeof config.data == 'object') {
							for(var key in config.data) {
								if(config.data.hasOwnProperty(key)) {
									$('<input>').attr('name', key).val(config.data[key]).appendTo(form);
								}
							}
						}

						var oldElement = $('#' + fileElementId);
						var newElement = $(oldElement).clone();
						$(oldElement).attr('id', fileId);
						$(oldElement).before(newElement);
						$(oldElement).appendTo(form);

						// Set attributes
						$(form).css('position', 'absolute');
						$(form).css('top', '-1200px');
						$(form).css('left', '-1200px');
						$(form).appendTo('body');
						return form;
					}

					function ajaxFileUpload(s) {
						// TODO introduce global settings, allowing the client to modify them for all requests, not only timeout
						s = jQuery.extend({}, jQuery.ajaxSettings, s);

						if(!s.validateFileName($('#' + s.uploadFileName).val())) {
							return false;
						}

						var id = (new Date()).getTime() + "" + Math.round(Math.random() * 10000);
						var form = createUploadForm(id, s.uploadFileName);
						var io = createUploadIframe(id);
						var frameId = 'jUploadFrame' + id;
						var formId = 'jUploadForm' + id;

						var progressBarNode = config.callbacks.onStart({
							config: config,
							uploader: uploader,
							id: id
						});

						// Watch for a new set of requests
						if(s.global && !jQuery.active++) {
							jQuery.event.trigger("ajaxStart");
						}
						var requestDone = false;

						// Create the request object
						var xml = {};
						if(s.global) {
							jQuery.event.trigger("ajaxSend", [xml, s]);
						}

						// Wait for a response to come back
						var uploadCallback = function(isTimeout) {
							var io = document.getElementById(frameId);
							try {
								var doc = null;
								if(io.contentWindow) {
									doc = io.contentWindow.document
								}
								else if(io.contentDocument) {
									doc = io.contentDocument.document;
								}

								if(doc) {
									xml.responseText = doc.body ? doc.body.innerText : null;
									xml.responseHTML = doc.body ? doc.body.innerHTML : null;
									xml.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
								}
							}
							catch(e) {
								$.ajaxUploader.catchError(e);
							}

							if(xml || isTimeout == 'timeout') {
								requestDone = true;
								var status = (isTimeout !== 'timeout') ? 'success' : 'error';
								try {
									// Make sure that the request was successful or not modified
									if(status !== 'error') {
										// process the data (runs the xml through httpData regardless of callback)
										var data = uploadHttpData(xml, s.dataType);

										// If a local callback was specified, fire it and pass it the data
										//Close progressBar
										$.ajaxUploader.stopMonitorAjaxUpload();
										config.callbacks.onEnd({
											node: progressBarNode
										});

										if(s.success) {
											s.success(data, status);
										}

										// Fire the global callback
										if(s.global)
											jQuery.event.trigger("ajaxSuccess", [xml, s]);
									}
									else {
										$.ajaxUploader.catchError(e);
									}
								}
								catch(e) {
									$.ajaxUploader.stopMonitorAjaxUpload();
									progressBarNode.hide().progressBar(0);

									status = "error";
									$.ajaxUploader.catchError(e);
								}

								// The request was completed
								if(s.global)
									jQuery.event.trigger("ajaxComplete", [xml, s]);

								// Handle the global AJAX counter
								if(s.global && !--jQuery.active)
									jQuery.event.trigger("ajaxStop");

								// Process result
								if(s.complete)
									s.complete(xml, status);

								jQuery(io).unbind();


								setTimeout(function() {
									try {
										$(io).remove();
										$(form).remove();
									}
									catch(e) {
										$.ajaxUploader.catchError(e);
									}
								}, 100);

								xml = null;
							}
						};

						// Timeout checker
						if(s.timeout > 0) {
							setTimeout(function() {
								// Check to see if the request is still happening
								if(!requestDone) uploadCallback("timeout");
							}, s.timeout);
						}

						progressBarNode.show();
						$.ajaxUploader.monitorAjaxUpload(id, progressBarNode, config);

						try {
							var $form = $('#' + formId);
							$form.attr('action', s.url);
							$form.attr('method', 'post');
							$form.attr('target', frameId);
							$form.attr('enctype', 'multipart/form-data');
							$form.submit();
						}
						catch(e) {
							$.ajaxUploader.catchError(e);
						}

						if(window.attachEvent) { // MSIE9
							document.getElementById(frameId).attachEvent('onload', uploadCallback);
						}
						else {
							document.getElementById(frameId).addEventListener('load', uploadCallback, false);
						}

						return {
							abort: function() {}
						};

					}

					function uploadHttpData(r, type) {
						var data = false;

						switch(type) {
							case 'script':
								// If the type is "script", eval it in global context
								jQuery.globalEval(r.responseHTML);
								break;
							case 'json':
								// Get the JavaScript object, if JSON is used.
								data = jQuery.secureEvalJSON(r.responseText);
								break;
							case 'html':
								// evaluate scripts within HTML
								jQuery("<div>").html(r.responseHTML).evalScripts();
								break;
							default: // xml or typeless
								data = r.responseXML;
						}

						return data;
					}
				});
			};

			this.monitorAjaxUpload = function(progress_key, progressbar_control, config) {
				var self = this;

				$.get("index.php?k=" + $.app.SESSION_KEY + "&apcStat&apcUID=" + progress_key, function(data) {
					if(data){
						var response = $.secureEvalJSON(data);

						if(response) {
							var percentage = Math.floor(100 * parseInt(response['current']) / parseInt(response['total']));

							config.callbacks.onProgress({
								percentage: percentage,
								node: progressbar_control
							});

							if(response.done) {
								self.stopMonitorAjaxUpload();
							}
						}
					}
				});

				self.lastAjaxMonitorTimeout = setTimeout(function() {
					$.ajaxUploader.monitorAjaxUpload(progress_key, progressbar_control, config);
				}, 500);

			};

			this.stopMonitorAjaxUpload = function() {
				var self = this;
				if(self.lastAjaxMonitorTimeout) {
					clearTimeout(self.lastAjaxMonitorTimeout);
					self.lastAjaxMonitorTimeout = false;
				}
			};

			this.catchError = function(e) {
				console.debug(e.message + ' || stack : ' + e.stack);
			};
		}
	});

	$.fn.extend({
		ajaxUploader: $.ajaxUploader.construct
	});

})(jQuery);

