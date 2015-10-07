function Dialog(template_name, model) {
	Partial.call(this);
	if(template_name){
		this.template_name = template_name;
	}
	if(model){
		this.model = model;
	}
	this.on('afterRender', this._hookDefaultsBehaviours);
}

Dialog.prototype = {
	show: function(){
		this.render();
	},
	render: function(){
		this.emit('beforeRender', this.model);
		var content = this._render(this.template_name, {model:this.model});
		$("#popup").html($('<div/>').append(content).attr('id', this.template_name)).show();
		this.emit('afterRender', this.model);
	},
	_hookDefaultsBehaviours:function(event, model){
		var self = this;
		var content_height = $('#popup .dialog-content .gutter').height() / 2;
		$("#popup").css({
			position:"fixed",
			top:"25%",
			marginTop:-content_height + "px"
		});
		$('#popup').safeClick(function(event){
			event.stopPropagation();
		});
		$('#popup .btn-cancel').safeClick(function(){
			self._cancel();
		});
		$('#popup .btn-no').safeClick(function(){
			self._no();
		});
		$('#popup .btn-save').safeClick(function(){
			self._save();
		});
		$('#popup .btn-ok').safeClick(function(){
			self._ok();
		});
	},
	_no: function(){
		this.emit("no");
		this._close();
	},
	_ok: function(){
		this.emit("ok");
		this._close();
	},
	_cancel: function(){
		this.emit("cancel");
		this._close();
	},
	_save: function(){
		if(this._canSave()) {
			this.emit("save");
			this._close();
		}
	},
	_canSave: function(){
		return true;
	},
	_close: function(){
		this.emit("close");
		$('#'+this.template_name).remove();
	}
};

Dialog.inherits(Partial);
