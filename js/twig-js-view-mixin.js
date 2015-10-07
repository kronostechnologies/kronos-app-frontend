/**
 * Events:
 * 		twigviewmixin:beforeRender -> happens whenever the content is about to be rendered on the page.
 *		twigviewmixin:afterRender -> happens whenever the content just got rendered on the page.
 */
function TwigViewMixin() {
	EventEmitter.call(this);
	this.on('twigviewmixin:beforeRender', function(model){
		console.log(model);
	});
}

TwigViewMixin.prototype = {
	draw: function(html){
		this.template = Twig.twig({
			allowInlineIncludes: true,
			data: html
		});
	},

	_inject: function(model){
		this.emit('twigviewmixin:beforeRender', model);
		this._render(model);
		this._baseAfterRender();
		this.emit('twigviewmixin:afterRender', model);
	},

	_render: function(model){
		var content = this.template.render({model:model, app: $.app});
		$("#content").html(content);
	},

	_createTableFromLists: function(listA, listB){
		var list = [];
		if (Array.isArray(listB)){
			var a = 0;
			var b = 0;
			while (a<listA.length || b<listB.length){
				if(a<listA.length && b<listB.length){
					list.push([listA[a], listB[b]]);
					a++;
					b++;
				}
				else if (a<listA.length && b>=listB.length){
					list.push([listA[a], {}]);
					a++;
				}
				else {
					list.push([{}, listB[b]]);
					b++;
				}
			}
		}
		else {
			for(var i = 0; i<listA.length;i++){
				list.push([listA[i]]);
			}
		}
		return list;
	},
	_baseAfterRender: function(){
		$('[twig-key="datepicker"]').each(function(index, element) {
			$.app.hookDateField($(element));
		});
	},
	_hook:function(model){}
};

TwigViewMixin.inherits(EventEmitter);