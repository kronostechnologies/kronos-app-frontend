function Partial() {
	EventEmitter.call(this);
}

Partial.prototype = {
	init: function(){
		this.data = {};
	},
	append : function($node, data){
		var model = this._getModel(data);
		this.emit('beforeRender', model);
		$node.append(this._render(this.template_name, model));
		this.emit('afterRender', model);
	},
	render : function(data){
		return this._render(this.template_name, data);
	},
	_render : function(template_name, model){
			model.app = $.app;
			if(!TwigTemplates[template_name]){
				console.warn('The template "' + template_name + '" does not exist.');
				return '';
			}
			return TwigTemplates[template_name].render(model);
	},
	_getModel : function(data){
		return {model: data, app: $.app};
	}
};

Partial.inherits(EventEmitter);
