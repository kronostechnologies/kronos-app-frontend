// @flow

export default class Autocompleter {


	constructor(selector, view, command, callback, config) {
		const self = this;
		this.view = view;
		this.callback = callback;
		this._filters = [];

		if(command.constructor === Object) {
			this.command = command.command;
			this.handler = command.handler;
			this.action = command.action;
		}
		else {
			this.command = command;
		}

		if(config.width) {
			this.width = config.width;
		}
		else {
			this.width = 300;
		}

		if(typeof config.matchContains == 'boolean') {
			this.matchContains = config.matchContains;
		}
		else {
			this.matchContains = false;
		}

		if(config.listSize) {
			this.listSize = parseInt(config.listSize, 10);
		}
		else {
			this.listSize = 10;
		}

		if(config.minChars) {
			this.minChars = parseInt(config.minChars, 10);
		}
		else {
			this.minChars = 2;
		}

		if(typeof config.showAll == 'boolean') {
			this.showAll = config.showAll;
		}
		else {
			this.showAll = false;
		}

		if(typeof config.showDescription == 'boolean') {
			this.showDescription = config.showDescription;
		}
		else {
			this.showDescription = false;
		}

		if(typeof config.highlight == 'boolean') {
			this._doHighlight = config.highlight;
		}
		else {
			this._doHighlight = false;
		}

		if(typeof config.customHighlight == 'function') {
			this._customHighlight = config.customHighLight;
		}
		else {
			this._customHighlight = false;
		}

		if(typeof config.itemFormat == 'function') {
			this._customItemFormat = config.itemFormat;
		}
		else {
			this._customItemFormat = false;
		}

		if(typeof config.descriptionFormat == 'function') {
			this._customDescriptionFormat = config.descriptionFormat;
		}
		else {
			this._customDescriptionFormat = false;
		}

		if(typeof config.parse == 'function') {
			this.parse = config.parse;
		}

		if(typeof config.query_string_param_name == 'string' && $.trim(config.query_string_param_name) !== '') {
			this.queryStringParamName = config.query_string_param_name;
		}

		if(config.params) {
			this.params = config.params;
		}
		else {
			this.params = {};
		}


		if(typeof config.selectorIsDomRef == 'boolean') {
			this.selectorIsDomRef = config.selectorIsDomRef;
		}
		else {
			this.selectorIsDomRef = false;
		}

		if(!this.selectorIsDomRef) {
			this.$selector = $(selector);
		}
		else {
			this.$selector = selector;
		}

		this.$selector.autocomplete('index.php', this._getAutocompleteOptions())
			.bind('result', function(event, data, label) {
				self._result(event, data, label);
			});
	}

	_getAutocompleteOptions() {
		const self = this;
		let options = {};

		options.width = this.width;
		options.position = 'fixed';
		options.max = this.listSize;
		options.matchContains = this.matchContains;
		options.minChars = this.minChars;
		options.selectFirst = false;
		options.scrollHeight = 450;
		options.queryStringParamName = this.queryStringParamName;
		options.formatItem = function(data, position, length, term) {
			return self._formatItem(data, position, length, term);
		};
		options.highlight = function(label, term) {
			return self._highlight(label, term);
		};
		options.extraParams = self._extraParams();
		if(this.parse) {
			options.parse = this.parse;
		}

		return options;
	}

	_formatItem(data, position, length, term) {
		if(this._filtered(data[2])) {
			return false;
		} // Was asked not to show this one

		let label;
		if(typeof this._customItemFormat == 'function') {
			label = this._customItemFormat(data, position, length, term);
		}
		else {
			label = data[2];
		}

		if(this.showDescription) {
			if(typeof this._customDescriptionFormat == 'function') {
				label += this._customDescriptionFormat(data, position, length, term);
			}
			else {
				label += '<br /><span class="description">' + data[3] + '</span>';
			}
		}
		return label;
	}

	_filtered(value) {
		for(let i = 0; i < this._filters.length; i++) {
			if(this._filters[i] == value) {
				return true;
			}
		}

		return false;
	}

	_highlight(label, term) {
		if(this._doHighlight) {
			if(typeof this.custom_highlight == 'function') {
				return this.custom_highlight(label, term);
			}
			else {
				return label.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<span class=\"ac_match\">$1</span>");
			}
		}
		else {
			return label;
		}
	}

	_extraParams() {
		let params = {};
		if(this.matchContains) {
			params.contains = 'true';
		}

		if(this.params) {
			if(typeof this.params == 'function') {
				let url_params = this.params();
				if(typeof url_params == 'object') {
					$.each(url_params, function(key, param) {
						params[key] = param;
					});
				}
				else {
					params.param = this.params;
				}
			}
			else if(typeof this.params == 'object') {
				$.each(this.params, function(key, param) {
					params[key] = param;
				});
			}
			else {
				params.param = this.params;
			}
		}

		params.view = this.view;
		params.cmd = this.command;
		params.k = $.app.SESSION_KEY;

		if(this.handler !== '') {
			params.handler = this.handler;
		}

		if(this.action !== '') {
			params.action = this.action;
		}

		return params;
	}

	_result(event, data, label) {
		if(typeof this.callback == 'function') {
			this.callback(data);
		}
	}

	filterValue(value, filter) {
		var found = false;

		for(var i = 0; i < this._filters.length; i++) {
			if(value == this._filters[i]) {
				if(filter || typeof filter == 'undefined') {
					found = true;
				}
				else {
					delete(this._filters[i]);

					for(var j = i + 1; j < this._filters.length; j++) {
						this._filters[j - 1] = this._filters[j];
					}
					this._filters.pop();

					return true;
				}
			}
		}

		if((filter || typeof filter == 'undefined') && !found) {
			this._filters.push(value);
			return true;
		}

		return false;
	}
}