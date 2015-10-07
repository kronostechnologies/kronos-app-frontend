var EventEmitter = function() {
	this.events = {};
	this.once_events = {};
};
EventEmitter.prototype = {
	on: function(event, fct) {
		this.events[event] = this.events[event] || [];
		this.events[event].push(fct);
	},
	unregister: function(event, fct) {
		if(event in this.events === false) {
			return;
		}
		this.events[event].splice(this.events[event].indexOf(fct), 1);
	},
	emit: function(event) {
		if(event in this.events) {
			for(var i = 0; i < this.events[event].length; i++) {
				this.events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
			}
		}

		if(event in this.once_events) {
			for(var j = 0; j < this.once_events[event].length; j++) {
				this.once_events[event][j].apply(this, Array.prototype.slice.call(arguments, 1));
			}
			this.once_events[event] = [];
		}
	},
	once: function(event, fct){
		this.once_events[event] = this.once_events[event] || [];
		this.once_events[event].push(fct);
	}
};