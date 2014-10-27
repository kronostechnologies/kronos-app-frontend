ajaxReference = {};
/**
 * data: {uid: 1, timeout: 1, type: 'POST'|'GET', url:http://url.com, data:param=a&param2=b, action: 'send'|'abort'}
 */
function sendAjax(data, source, origin){
  if(window.XDomainRequest){
    var xdr = new XDomainRequest();
    xdr.onload = function(){
      var allResponseHeaders = 'Content-Length: ' + xdr.responseText.length + '\r\nContent-Type: ' + xdr.contentType;
      source.postMessage(JSON.stringify({uid: data.uid, code: '200', message: 'success', response: xdr.responseText, allResponseHeaders: allResponseHeaders, contentType: xdr.contentType}), origin);
    };
    xdr.ontimeout = function(){
      source.postMessage(JSON.stringify({uid: data.uid, code: '500', message: 'timeout', response: '', allResponseHeaders: null, contentType: null}), origin);
    };
    xdr.timeout = data.timeout;
    xdr.onprogress = function(){};
    xdr.onerror = function(){
      source.postMessage(JSON.stringify({uid: data.uid, code: '500', message: 'error', response: xdr.responseText, allResponseHeaders: null, contentType: null}), origin);
    };

    xdr.open(data.type, data.url);
    xdr.send(data.data);
    ajaxReference[data.uid] = xdr;
  }
  else if(window.XMLHttpRequest){
    var xhr = new XMLHttpRequest();
    xhr.onload = function (e) {
      if(xhr.readyState === 4){
        source.postMessage(JSON.stringify({uid: data.uid, code: xhr.status, message: xhr.statusText, 'response': xhr.responseText, 'allResponseHeaders': xhr.getAllResponseHeaders()}), origin);
      }
    };
    xhr.ontimeout = function(e){
      source.postMessage(JSON.stringify({uid: data.uid, code: '500', message: 'timeout', response: '', allResponseHeaders: null, contentType: null}), origin);
    };
    xhr.timeout = data.timeout;
    xhr.onerror = function(e){
      source.postMessage(JSON.stringify({uid: data.uid, code: '500', message: 'error', response: xhr.statusText, allResponseHeaders: null, contentType: null}), origin);
    };
    xhr.open(data.type, data.url);
    xhr.send(data.data);
    ajaxReference[data.uid] = xhr;
  }
  else{
    throw 'No way to find ajax request.'
  }
};
function abortAjax(data){
  if(!ajaxReference[data.uid]){
    return;
  }
  ajaxReference[data.uid].abort();
  delete ajaxReference[data.uid];
};

window.addEventListener('message', function(e){
  var data = JSON.parse(e.data);
  outerPageOrigin = e.origin;
  if(data.action === 'send'){
    sendAjax(data, e.source, e.origin);
  }
  else if(data.action === 'abort'){
    abortAjax(data);
  }
}, false);

