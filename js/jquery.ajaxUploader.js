(function($) {
	var defaultCallbacks = {
		onStart: function(options){
			var progressBarElementId = 'jUploadPG' + options.id;
			var progressBarNode = $('<span id="' + progressBarElementId + '" style="display:none"></span>');
			$(options.uploader).empty().append(progressBarNode);
			progressBarNode.progressBar(options.config.progressBarConfig);
			return progressBarNode;
		},

		onProgress: function(options){
			options.node.progressBar(options.percentage);
		},

		onEnd: function(options){
			options.node
				.progressBar(100)
				.slideToggle('slow', function(){
					$(this).progressBar(0);
				});
		}
	};

	$.extend({
		ajaxUploader: new function() {
			this.defaults = {
				uploadFileName : 'upload_file',
				uploadButtonLabel : 'Upload',
				dataType : 'json',
				autoUpload : false,
				progressBarConfig : {},
				validateFileName : function(){return true;},
				passedInput: false,
				callbacks: defaultCallbacks
			};

			this.construct = function(config) {

				var argconfig = config;



				return this.each(function(child) {
					var uploader = this;
					var config = {};

					if(uploader.config != null){
						if(argconfig != null){
							uploader.config = $.extend(true, uploader.config, argconfig);
						}
					}
					else {
						config = $.extend(true, {}, $.ajaxUploader.defaults, argconfig);
					}
					/*
					if(config.callbacks){
						$.each(config.callbacks, function(i, e){
							$.extend($.ajaxUploader, e);
						})
					}*/

					if(!config.passedInput){
						var uploadButtonId = config.uploadFileName + '_button';

						var html = '<input id="' + config.uploadFileName + '" name="' + config.uploadFileName + '" type="file" size="45" class="input">';

						if(!config.autoUpload){
							html += '<a id="' + uploadButtonId + '" href="javascript:void(0);">' + config.uploadButtonLabel + '</a>';
						}

						$(uploader).html(html);

						if(!config.autoUpload){
							$('#' + uploadButtonId).click(function(){
								ajaxFileUpload(config);
							});
						}
						else {
							$('#' + config.uploadFileName).change(function(){
								ajaxFileUpload(config);
							});
						}
					}
					else{
						config.uploadFileName = config.passedInput.attr('id');
						config.passedInput.change(function(){
							ajaxFileUpload(config);
						});
					}



					function createUploadIframe(id, uri){
							//create frame
							var frameId = 'jUploadFrame' + id;
							if($.browser.msie && $.browser.version < 9.0) {
								var io = document.createElement('<iframe id="' + frameId + '" name="' + frameId + '" />');
								if(typeof uri== 'boolean'){
									io.src = 'javascript:false';
								}
								else if(typeof uri== 'string'){
									io.src = uri;
								}
							}
							else {
								var io = document.createElement('iframe');
								io.id = frameId;
								io.name = frameId;
							}
							io.style.position = 'absolute';
							io.style.top = '-1000px';
							io.style.left = '-1000px';
								document.body.appendChild(io);
								return io
					}

					function createUploadForm(id, fileElementId){
						//create form
						var formId = 'jUploadForm' + id;
						var fileId = 'jUploadFile' + id;
						var apcInputId = 'jApcProgress' + id;
						var form = $('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>');
						$('<input id="' + apcInputId + '" name="APC_UPLOAD_PROGRESS" value="' + id + '"></input>').appendTo(form);
							var oldElement = $('#' + fileElementId);
						var newElement = $(oldElement).clone();
						$(oldElement).attr('id', fileId);
						$(oldElement).before(newElement);
						$(oldElement).appendTo(form);


						//set attributes
						$(form).css('position', 'absolute');
						$(form).css('top', '-1200px');
						$(form).css('left', '-1200px');
						$(form).appendTo('body');
						return form;
					}

					function ajaxFileUpload(s) {
						// TODO introduce global settings, allowing the client to modify them for all requests, not only timeout
						s = jQuery.extend({}, jQuery.ajaxSettings, s);

						if(!s.validateFileName($('#' + s.uploadFileName).val())){
							return false;
						}

						var id = (new Date()).getTime()+ "" + Math.round(Math.random() * 10000);
						var form = createUploadForm(id, s.uploadFileName);
						var io = createUploadIframe(id, s.secureuri);
						var frameId = 'jUploadFrame' + id;
						var formId = 'jUploadForm' + id;

						var progressBarNode = config.callbacks.onStart({
							config: config,
							uploader: uploader,
							id: id
						});

						// Watch for a new set of requests
						if ( s.global && ! jQuery.active++ )
						{
							jQuery.event.trigger( "ajaxStart");
						}
						var requestDone = false;

						// Create the request object
						var xml = {}	
						if ( s.global ){
							jQuery.event.trigger("ajaxSend", [xml, s]);
						}
						
						// Wait for a response to come back
						var uploadCallback = function(isTimeout) {
						var io = document.getElementById(frameId);
						try {								
								if(io.contentWindow){
									 xml.responseText = io.contentWindow.document.body?io.contentWindow.document.body.innerHTML:null;
									 xml.responseXML = io.contentWindow.document.XMLDocument?io.contentWindow.document.XMLDocument:io.contentWindow.document;
								}
								else if(io.contentDocument) {
									xml.responseText = io.contentDocument.document.body?io.contentDocument.document.body.innerHTML:null;
									xml.responseXML = io.contentDocument.document.XMLDocument?io.contentDocument.document.XMLDocument:io.contentDocument.document;
								}								
							}
							catch(e){
								$.ajaxUploader.catchError(e);
							}

							if ( xml || isTimeout == "timeout") {
								requestDone = true;
								var status;
								try {
									status = isTimeout != "timeout" ? "success" : "error";
									// Make sure that the request was successful or notmodified
									if ( status != "error" ) {
										// process the data (runs the xml through httpData regardless of callback)
										var data = uploadHttpData( xml, s.dataType );

										// If a local callback was specified, fire it and pass it the data
										//Close progressBar
										$.ajaxUploader.stopMonitorAjaxUpload();
										config.callbacks.onEnd({
											node: progressBarNode
										});

										if ( s.success )
											s.success( data, status );

											// Fire the global callback
										if( s.global )
											jQuery.event.trigger( "ajaxSuccess", [xml, s] );
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
								if( s.global )
									jQuery.event.trigger( "ajaxComplete", [xml, s] );

								// Handle the global AJAX counter
								if ( s.global && ! --jQuery.active )
									jQuery.event.trigger( "ajaxStop" );

								// Process result
								if ( s.complete )
									s.complete(xml, status);

								jQuery(io).unbind();


								setTimeout(function(){
									try {
										$(io).remove();
										$(form).remove();
									}
									catch(e) {
										$.ajaxUploader.catchError(e);
									}
								}, 100);

								xml = null
							}
						}

						// Timeout checker
						if ( s.timeout > 0 ) {
							setTimeout(function(){
								// Check to see if the request is still happening
								if( !requestDone ) uploadCallback( "timeout" );
							}, s.timeout);
						}

						progressBarNode.show();
						$.ajaxUploader.monitorAjaxUpload(id, progressBarNode, config);



						try {
						   // var io = $('#' + frameId);
							var form = $('#' + formId);
							$(form).attr('action', s.url);
							$(form).attr('method', 'POST');
							$(form).attr('target', frameId);
							if(form.encoding)
							{
								form.encoding = 'multipart/form-data';
							}
							else
							{
								form.enctype = 'multipart/form-data';
							}
							$(form).submit();

						}
						catch(e) {
							$.ajaxUploader.catchError(e);
						}

						if(window.attachEvent){
							document.getElementById(frameId).attachEvent('onload', uploadCallback);
						}
						else{
							document.getElementById(frameId).addEventListener('load', uploadCallback, false);
						}

						return {abort: function () {}};

					}

					function uploadHttpData( r, type ) {
						var data = !type;
						data = type == "xml" || data ? r.responseXML : r.responseText;
						// If the type is "script", eval it in global context
						if ( type == "script" )
							jQuery.globalEval( data );
						// Get the JavaScript object, if JSON is used.
						if ( type == "json" )
							data = jQuery.secureEvalJSON(data);
						// evaluate scripts within html
						if ( type == "html" )
							jQuery("<div>").html(data).evalScripts();
							//alert($('param', data).each(function(){alert($(this).attr('value'));}));
						return data;
					}



				});
			 }; // End construct

			 this.monitorAjaxUpload = function (progress_key, progressbar_control, config) {
				var t = this;
				var done = false;
				
				$.get("index.php?k=" + $.app.SESSION_KEY + "&apcStat&apcUID=" + progress_key, function(data) {
					if (!data)
						return;

					var response = $.secureEvalJSON(data);
					if (!response)
						return;
					
					var percentage = Math.floor(100 * parseInt(response['current']) / parseInt(response['total']));

					config.callbacks.onProgress({
						percentage: percentage,
						node: progressbar_control
					});
					
					if(response.done){
						t.stopMonitorAjaxUpload();
					}
				});

				t.lastAjaxMonitorTimeout = setTimeout(function(){
					$.ajaxUploader.monitorAjaxUpload(progress_key, progressbar_control, config);
				}, 500);
				
			}

			this.stopMonitorAjaxUpload = function(){
				var t = this;
				if(t.lastAjaxMonitorTimeout){
					clearTimeout(t.lastAjaxMonitorTimeout);
					t.lastAjaxMonitorTimeout = false;
				}
			}
			
			this.catchError = function(e){
				console.debug(e.message + ' || stack : ' + e.stack);
			}
		}
	});

	$.fn.extend({
        ajaxUploader: $.ajaxUploader.construct
    });


})(jQuery);

