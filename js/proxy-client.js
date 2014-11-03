(function($){
  $.fn.ajaxProxy = function(options){
    var self = this;
    if(this.get(0).tagName !== 'IFRAME'){
      throw 'You can only apply ajaxProxy on an iframe';
    }
    var opts = $.extend( {}, $.fn.ajaxProxy.defaults, options);
    var ajaxReference = {};
    var origin = this.attr('src').match(/^https?\:\/\/([^\/?#]+)/i)[0];
    var uid = (opts.uid ? opts.uid : 0);
    var httpRegEx = /^https?:\/\//i;
    var getOrPostRegEx = /^get|post$/i;

    window.addEventListener('message', function(e){
      var data = JSON.parse(e.data);
      if(e.origin != origin || !ajaxReference[data.uid]){
        if(opts.log){
          if(e.origin != origin){
            console.log('Received message from wrong origin : ' + e.origin != origin);
          }
          else{
            console.log('Received message for an already processed ajax query. Uid is "' + data.uid + '".');
          }
        }
        return;
      }
      if(opts.log){
        console.log('Received message for uid "' + data.uid + '"');
      }

      var complete = ajaxReference[data.uid].complete;
      var userType = ajaxReference[data.uid].userType;

      if(data.message === 'timeout' || data.message === 'error'){
        if(opts.log){
          console.log('The request has timedout or was in error.');
        }
        complete(data.code, data.message, data.response, data.allResponseHeaders);
      }

      var code = data.code;
      var message = data.message;
      var responses = {
        text: data.response
      };
      try{
        if(userType === 'html' || /text\/html/i.test(data.contentType)){
          responses.html = data.response;
        }
        else if (userType === 'json' || (userType !== 'text' && /\/json/i.test(data.contentType))){
          try{
            responses.json = $.parseJSON(data.response);
          }
          catch(e){
            code = 500;
            message = 'parseerror';
          }
        }
        else if (userType === 'xml' || (userType !== 'text' && /\/xml/i.test(data.contentType))){
          var doc = new ActiveXObject('Microsoft.XMLDOM');
          doc.async = false;
          try{
            doc.loadXML(data.response);
          }
          catch(e){
            doc = undefined;
          }
          if(!doc || !doc.documentElement || doc.getElementsByTagName('parsererror').length){
            code = 500;
            message = 'parseerror';
            throw 'Invalid XML: ' + data.response;
          }
          responses.xml = doc;
        }
      }
      catch(parseMessage){
        throw parseMessage;
      }
      finally{
        if(opts.log){
          console.log('The request has been completed.');
        }
        complete(code, message, responses, data.allResponseHeaders);
        delete ajaxReference[data.uid];
      }
    }, false);

    $.ajaxTransport('* text html xml json', function(options, userOptions, jqXHR){
      if(opts.log){
        console.log('Transporting.');
      }
      // Only continue if the request is: asynchronous, uses GET or POST method, has HTTP or HTTPS protocol
      if(!options.async || !getOrPostRegEx.test(options.type) || !httpRegEx.test(options.url)){
        return;
      }

      uid += 1;
      if(opts.log){
        console.log('UID reserved is "'+uid+'".');
      }
      return {
        send: function(headers, complete){
          if(opts.log){
            console.log('Sending ajax requesting via proxy. Uid is "'+uid+'".');
          }
          var postData = '';
          var timeout = null;
          var userType = (userOptions.dataType || '').toLowerCase();
          ajaxReference[uid] = {complete: complete, userType: userType};

          if(userOptions.data){
            postData = ($.type(userOptions.data) === 'string') ? userOptions.data : $.param(userOptions.data);
          }
          if (/^\d+$/.test(userOptions.timeout)) {
            timeout = userOptions.timeout;
          }
          self.get(0).contentWindow.postMessage(JSON.stringify({uid: uid, action: 'send', type: options.type, url: options.url, timeout: timeout, data: postData}), self.attr('src'));

          // Retry loop
          if(opts.retryCount){
            var cpt = 0;
            (function loop(){
              setTimeout(function(){
                if(cpt === opts.retryCount){
                  console.warn('AJAX query could not be processed by proxy after `'+cpt+'` tries... aborting !');
                  delete ajaxReference[uid];
                  self.get(0).contentWindow.postMessage(JSON.stringify({uid: uid, action: 'abort'}), self.attr('src'));
                }
                // If the ajaxReference still exist after 1 second, it means it was not processed properly by the iframe.
                else if(ajaxReference[uid]){
                  self.get(0).contentWindow.postMessage(JSON.stringify({uid: uid, action: 'send', type: options.type, url: options.url, timeout: timeout, data: postData}), self.attr('src'));
                  loop();
                }
              }, 1000);
            })();
          }
        },
        abort: function(){
          if(opts.log){
            console.log('The request was aborted by jquery. Uid is '+uid+'".');
          }
          self.get(0).contentWindow.postMessage(JSON.stringify({uid: uid, action: 'abort'}), self.attr('src'));
          delete ajaxReference[uid]
        }
      };
    });
  }
  $.fn.ajaxProxy.defaults = {
    uid: 0,
    retryCount: 5,
    log: false
  };
}(jQuery));