(function($) {
	// Public methods, don't forget that they can be used on mutliple list at the same time

	var methods = {
		init : function(options) {
			var i = 0;
			return this.each(function() {
				var $this = $(this);
				var list = { };

				$.extend(true, list, $.fn.list.defaults, options);

				/*
				 * Bind element in the event of a locale change.
				 * Add class that will be triggered
				 */

				if(!list.ignoreLocaleEvent){
					$this.addClass('localeBound');
					$this.bind('setLocaleEvent', function(e, eventName, eventValue){
						if($.app.debug)
							console.log('Locale event triggered element : ', this);
						$this.find('.pagination .prev').text($.app._('PREVIOUS'));
						$this.find('.pagination .next').text($.app._('NEXT'));
					});
				}

				if(i !== 0) {
					list.name += '.'+i;
				}
				i++;

				if(!list.name) throw 'jQuery.list requires a name to be specified';
				if(!$.isArray(list.headers)) throw 'jQuery.list requires headers to be specified, must be an array';
				if(list.headers.length < 1) throw 'jQuery.list headers must contain at least one item, header can be a string or an object { field : string, label : string, sortable : boolean (default : false), escape : boolean (default : true), format : forgetrmatting function }';
				if(!$.isFunction(list.source)) throw 'jQuery.list requires a source callback';

				if(list.group && !$.isPlainObject(list.group)) throw 'jQuery.list group option must be an object { field : "field_name", groupClass : "css-class", reset : boolean}';

				list.selector = $this;

				if(list.nbPages === 0)
					list.nbPages = 1;

				if(list.page >= list.nbPages) // Pages are indexed from 0, so must be lower than nbPages
					list.page = list.nbPages - 1;

				// Making sure some options were not changed because they might break the list behavior
				list.pagingOptions.pages.current_page = list.page;
				list.pagingOptions.pages.items_per_page = 0;
				list.pagingOptions.pages.link_to = 'javascript:void(0);';
				if(!list.pagingOptions.pages.callback) {
					list.pagingOptions.pages.callback = function(page_index, page_container) {
						list.setPage(page_index, list.nbPages);
					};
					list.pagingOptions.pages.callback(0, false);
				}

				var state = $.app.getContextValue('list.'+list.name);

				//todo : hanle state?
				if($.isPlainObject(state)) {
					list.page = state.page;
					list.pagingOptions.pages.current_page = state.page;
					list.sort = state.sort;
					list.asc = state.asc;

					for(var k in state) {
						if(k.substr(0, list.subContextPrefix.length+1) == list.subContextPrefix+'.') {
							list.subContext[k.substr(list.subContextPrefix.length+1)] = state[k];
						}
					}
				}

				list.buildTable($this);

				if(list.pagination && typeof list.updatePagination[list.pagination] != "undefined") {
					list.updatePagination[list.pagination].call(list);
					$this.trigger('setLocaleEvent');
				}

				list.draw();

				$this.data('list', list);
			});
		},

		options : function() {
			var args = arguments;
			
			if(arguments.length === 0 || (arguments.length == 1 && typeof arguments[0] == 'string')) {
				var opts = [];
				this.each(function() {
					var list = $(this).data('list');
					if(list) {
						opts.push({selector : this, options : list.getOptions.apply(list, args)});
					}
				});

				if(opts.length == 1) {
					return opts[0].options;
				}
				else {
					return opts;
				}
			}
			else {
				return this.each(function() {
					var list = $(this).data('list');
					if(list) list.setOptions.apply(list, args);
				});
			}
		},

		update : function(type, params) {
			//page, nbPages, sort, asc, data
			return this.each(function() {
				var list = $(this).data('list');
				if(list) list.update[type].call(list, params);
			});
		},

		fetch : function() {
			return this.each(function() {
				var list = $(this).data('list');

				if(list) list.fetchData();
			});
		},

		data : function(data) {
			if(arguments.length === 0) {
				var datas = [];

				this.each(function() {
					var list = $(this).data('list');

					if(list) {
						datas.push({selector : this, 'data' : list.data});
					}
				});

				if(datas.length == 1) {
					return datas[0].data;
				}
				else {
					return datas;
				}
			}
			else {
				return this.each(function() {
					var list = $(this).data('list');

					if(list) list.setData(data);
				});
			}
		},

		sort : function(header, asc, update) {
			if(arguments.length === 0) {
				var sorts = [];

				this.each(function() {
					var list = $(this).data('list');

					if(list) {
						sorts.push({selector : this, 'sort' : {'field' : list.sort, 'asc' : list.asc}});
					}
				});

				if(sorts.length == 1) {
					return sorts[0].sort;
				}
				else {
					return sorts;
				}
			}
			else {
				return this.each(function() {
					var list = $(this).data('list');

					if(list) list.sortHeader(header, asc, update);
				});
			}
		},

		page : function(page, update) {
			if(arguments.length === 0) {
				var pages = [];

				this.each(function() {
					var list = $(this).data('list');

					if(list) {
						pages.push({selector : this, 'page' : {'page' : list.page, 'nbPages' : list.nbPages}});
					}
				});

				if(pages.length == 1) {
					return pages[0].page;
				}
				else {
					return pages;
				}
			}
			else {
				return this.each(function() {
					var list = $(this).data('list');

					if(list) list.setPage(page, list.nbPages, update);
				});
			}
		},

		setContextValue : function(key, value, update) {
			return this.each(function() {
				var list = $(this).data('list');

				if(list) list.setContextValue(key, value, update);
			});
		},

		getContextValue : function(key) {
			var contexts = [];

			this.each(function() {
				var list = $(this).data('list');
				if(list) {
					contexts.push({selector : this, 'context' : list.getContextValue(key)});
				}
			});

			if(contexts.length == 1) {

				return contexts[0].context;
			}
			else {
				return contexts;
			}
		},

		updateOddClasses : function(){
			return this.each(function(){
				var $this = $(this),
					list = $this.data('list'),
					$all_rows = $this.find('tbody tr');
				if(!list.data || !$.isArray(list.data) || list.data.length === 0) return;

				if(list.group && list.group.groupClass){
					$all_rows = $all_rows.not('.' + list.group.groupClass);
				}
				$all_rows.each(function(i, elem){
					var $this = $(this);
					if(list.oddClass) $this.removeClass(list.oddClass);
					if(list.evenClass) $this.removeClass(list.evenClass);
					if(i % 2 !== 0 && list.oddClass) $this.addClass(list.oddClass);
					else if(i % 2 === 0 && list.evenClass) $this.addClass(list.evenClass);
				});
			});
		}

	};

	$.fn.list = function(method) {
//		if(this.length != 1) throw 'jQuery.list selector must match only one element';
		if(!$.app) throw 'jQuery.list cannot be used outside kronos-libs framework';

		if( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		}
		else if( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		}
		else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.list' );
		}
	};

	$.fn.list.defaults = {
		headerClass : '',
		evenClass : '',
		oddClass : '',
		tableClass : '',

		data : false,

		group : false,

		pagination : false, //pagination : false|pages|more
		pagingOptions: {
			//Pages pagingType specific options
			pages: {
				callback : false, // function(page_index, paging_container). If none is given, setPage is used
				current_page : 0, // DO NOT CHANGE, will be overwriten by init function
				num_pages : 0, // Not a supported option, but we need to know what it was given since it does not
				items_per_page : 1, // DO NOT CHANGE, will be overwriten by init function
				link_to : 'javascript:void(0);', // DO NOT CHANGE, will be overwriten by init function
				num_display_entries : 11, // Number of elements to show in the pagination (odd numbers have are usually more aesthetic
				next_text : function() {return $.app._('NEXT');},
				next_show_always : true, // False if you want it hidden on last page
				prev_text : function() {return $.app._('PREVIOUS');},
				prev_show_always : true, // False if you want it hidden on first page
				num_edge_entries : 1, // Number of entries at begining and end to always show
				ellipse_text : '...', // Filler text when there is a gap between two pagination entries
				autoHidePagination : false
			},
			//More pagingType specific options
			more: {
				text: $.app._('SHOW_MORE'), //Shown text
				click: null //Click event handler
			}
		},

		page : 0,
		nbPages : 1, //Unused for the more paging type
		hasMore : false, //Unused for the page paging type. True if the dataset has more results
		sort : false,
		asc : true,
		sortSafeClick : true,
		subContext : {},
		subContextPrefix : 'sub',
		ignoreLocaleEvent : false,
		buildTable : function() {
			var i;
			var html = '<table' + ((this.tableClass) ? ' class="' + this.tableClass + '"' : '') + '>';
			html += '<thead><tr>';

			for(i = 0; i < this.headers.length; i++) {
				html += '<th id="'+this.name+'_header_'+i+'" />';
			}

			html += '</tr></thead><tbody></tbody></table><div id = "'+this.name+'_pagination" class="pagination-wrapper"></div>';

			this.selector.html(html);

			if(this.tableClass) {
				this.selector.find('table').addClass(this.tableClass);
			}

			if(this.headerClass)
				this.selector.find('thead tr').addClass(this.headerClass);

			var doSort = function() {
				t.setPage(0, t.nbPages, false);
				t.sortHeader($(this).data('sortField'));
			};

			var t = this;
			for(i = 0; i < this.headers.length; i++) {
				if($.isPlainObject(this.headers[i]) && this.headers[i].sortable) {
					if(!this.headers[i].sortField){
						this.headers[i].sortField = this.headers[i].name;
					}
					var $tmp_header = $('#'+this.name+'_header_'+i);
					$tmp_header.data('sortField', this.headers[i].sortField);
					$tmp_header.addClass('sortable');

					if(this.sortSafeClick) {
						$tmp_header.safeClick(doSort);
					}
					else {
						$tmp_header.click(doSort);
					}
				}
			}

			this.updateHeader();
		},

		updateHeader : function() {
			var currentHeader;
			for(var i = 0; i < this.headers.length; i++) {
				currentHeader = $('#'+this.name+'_header_'+i);

				if($.isPlainObject(this.headers[i])) {
					var content = this.headers[i].label;

					if(this.headers[i].sortable === true){
						var lastSpace = content.lastIndexOf(' '),
							before = content.substring(0, lastSpace),
							after = '<span class="nowrap">' + content.substring(lastSpace) + '<span class="sort-arrow"></span></span>';

						content = before + after;
					}

					if(this.sort == this.headers[i].sortField){
						currentHeader.addClass('sorted');
						if(this.asc) {
							currentHeader.addClass('asc');
						}
						else {
							currentHeader.removeClass('asc');
						}
					}
					else {
						if(currentHeader.hasClass('sorted')) currentHeader.removeClass('sorted');
					}

					if(this.headers[i].headerClasses){
						currentHeader.addClass(this.headers[i].headerClasses);
					}

					if(this.headers[i].nbsp) content = content.replace(' ', '&nbsp;');

					currentHeader.html(content);
				}
				else {
					currentHeader.text(this.headers[i]);
				}
			}
		},

		sortHeader : function(header, asc, update) {
			for(var i = 0; i < this.headers.length; i++) {
				if(this.headers[i].sortField == header) {
					if(typeof asc == 'undefined')
						this.asc = (this.sort == this.headers[i].sortField ? !this.asc : true);
					else
						this.asc = asc;

					this.sort = header;

					this.updateContext();

					this.updateHeader();

					if(update || typeof update == 'undefined')
						this.fetchData();

					return false;
				}
			}

			// Header was not found, we assume the data callback will handle it
			if(typeof asc == 'undefined')
				this.asc = (this.sort == header ? !this.asc : true);
			else
				this.asc = asc;
			this.sort = header;

			this.updateHeader();

			if(update || typeof update == 'undefined')
				this.fetchData();

		},

		fetchData : function() {
			var t = this;
			//Clear data if page is 0 to avoid appending twice the same data
			if(this.page === 0 && this.pagination == 'more') this.clear();
			this.source(this, this.page, this.sort, this.asc, this.subContext);
		},

		setData : function(data) {
			this.data = data;

			this.draw();
		},

		draw : function(append) {
			if(!append) this.clear();

			if(!this.data || !$.isArray(this.data) || this.data.length === 0) {
				this.selector.find('tbody').append(this.noData());
			}
			else {
				var t = this;
				var previous_group = null;
				var odd = false;
				var tbody = this.selector.find('tbody');
				var actual_rows_length = tbody.find('tr').length;

				var doClick = function(e) {
					var $this = $(this);
					t.click($this.data('index'), $this.data('record'), e);
				};

				for(var i = 0; i < this.data.length; i++) {
					var current_i = actual_rows_length + i;
					if(this.group) {
						if($.isPlainObject(this.group)) {
							var group_value;
							if(this.group.dotSeperatedKey === true){
								group_value = $.app.getByKey(this.data[i], this.group.field);
							}
							else{
								group_value = this.data[i][this.group.field];
							}

							if(group_value != previous_group) {
								tbody.append(this.drawGroup(group_value, this.data[i], this.group.field));
								previous_group = group_value;

								if(this.group.reset || typeof this.group.reset == 'undefined')
									odd = false;
							}
						}
					}

					tbody.append(this.drawRow(this.data[i], current_i, odd));
					this.attachRowClick(i);

					odd = !odd;

					if($.isFunction(this.click)) {
						$('#'+this.name+'_row_'+current_i).data('index', current_i).data('record', this.data[i]).safeClick(doClick);
					}
				}
			}
		},

		clear : function() {
			this.selector.find('tbody tr').remove();
		},

		drawGroup : function(group, row, field) {
			var html = (this.group.format) ? this.group.format(group, row, field) : group;
			if(this.group.escape !== false){
				html = html.htmlEntity();
			}

			var $td = $('<td></td>', {
				colspan: $.app.parseInt(this.headers.length)
			}).html(html);

			var $tr = $('<tr></tr>', {
				'class' : $.app.htmlEntity(this.group.groupClass)
			}).append($td);

			return $tr;
		},

		drawRow : function (record, index, odd) {
			var tr = $('<tr></tr>').attr('id', this.name+'_row_'+index);

			if(this.rowClass)
				tr.addClass($.app.htmlEntity(this.rowClass));

			if(odd && this.oddClass)
				tr.addClass($.app.htmlEntity(this.oddClass));
			else if(!odd && this.evenClass)
				tr.addClass($.app.htmlEntity(this.evenClass));

			for(var i = 0; i < this.headers.length; i++) {
				if(!($.isPlainObject(record) && $.isPlainObject(this.headers[i]))){
					tr.append($('<td></td>'));
					continue;
				}

				// Extract value from key format
				var value;
				if(this.headers[i].dotSeperatedKey === true)
					value = $.app.getByKey(record, this.headers[i].name);
				else
					value = record[this.headers[i].name];

//				if(!value){
//					tr.append($('<td></td>'));
//					continue;
//				}

				var formatted_value;
				if(this.headers[i].format && $.isFunction(this.headers[i].format)) {
					formatted_value = this.headers[i].format(value, record, this, index);
				}
				else {
					formatted_value = value;
				}

				var td = $('<td></td>').attr('id', this.name+'_row_'+index+'_'+i).data('index', index).data('i', i);
				
				if(this.headers[i].cellClasses) {
					td.addClass(this.headers[i].cellClasses);
				}

				if(this.headers[i].escape !== false) {
					td.html($.app.htmlEntity(formatted_value));
				}
				else if((typeof formatted_value) == 'string') {
					td.html(formatted_value);
				}
				else {
					td.append(formatted_value);
				}

				if(this.headers[i].hook && $.isFunction(this.headers[i].hook)) {
					this.headers[i].hook(td, value, record);
				}

				tr.append(td);
			}
			
			return tr;
		},

		attachRowClick : function(index) {
			var t = this;
			
			var doClick = function(e) {
				var list_click = $(this).data('list_click');
				if(list_click && $.isFunction(list_click.click)) {
					list_click.click.call(this, list_click.value, list_click.record, e);
				}
			};

			for(var i = 0; i < this.headers.length; i++) {
				if($.isFunction(this.headers[i].click)) {
					var value;
					if($.isPlainObject(this.headers[i])) {
						value = this.data[index][this.headers[i].name];
					}
					else {
						value = this.data[index][i];
					}
					
					var $row = $('#'+this.name+'_row_'+index+'_'+i).data('list_click', {
							click: this.headers[i].click,
							value : value,
							record : this.data[index]
						}).safeClick(doClick);
				}
			}
		},

		noData : function() {
			return '<tr class="non-clickable-row'+(this.evenClass ? ' ' + $.app.htmlEntity(this.evenClass) : '')+'"><td colspan='+this.headers.length+'">'+$.app._('NO_RESULTS')+'</td></tr>';
		},

		click : function(row, record, e) {
			if($.app.debug) {
				console.debug('you can specify a click option to handle row clicks. Default : click(row, record) { }');
				console.debug(arguments);
			}
		},

		updatePagination : {
			pages : function(){
				if($.isFunction(this.pagingOptions.pages.next_text))
					this.pagingOptions.pages.next_text = this.pagingOptions.pages.next_text.call(this);
				if($.isFunction(this.pagingOptions.pages.prev_text))
					this.pagingOptions.pages.prev_text = this.pagingOptions.pages.prev_text.call(this);

				if(this.nbPages != this.pagingOptions.pages.num_pages) {
					this.pagingOptions.pages.current_page = this.page;
					this.pagingOptions.pages.num_pages = this.nbPages;

					if(this.nbPages == 1 && this.pagingOptions.pages.autoHidePagination)
						$('#'+this.name+'_pagination').empty();
					else {
						$('#'+this.name+'_pagination').pagination(this.nbPages, this.pagingOptions.pages);
					}
				}
				else if(this.page != $('#'+this.name+'_pagination').data('current_page')) {
	//				var page = new Array();
	//				page.push(this.page);

					$('#'+this.name+'_pagination').trigger('setPage', [this.page]);
				}
			},

			more : function(){
				var $paging = $('#'+this.name+'_pagination').empty().show();
				if(this.hasMore){
					var $link = $('<a href="javascript:void(0);">'+ $.app._('SHOW_MORE') +'</a>');
					var t = this;
					$link.one('click', function(){
						t.page++;
						t.fetchData();
					});
					$paging.addClass('show-more');
					$paging.append($link);
				}
				else{
					$paging.hide();
					//TODO : HIDE SHOW MORE
				}
			}

		},

		setPage : function(page, nbPages, update) {
			if(this.page == page && this.nbPages == nbPages) return false;

			this.page = page;

			if(typeof nbPages != 'undefined')
				this.nbPages = nbPages;

			if(this.nbPages < 1)
				this.nbPages = 1;

			if(this.page >= this.nbPages)
				this.page = this.nbPages - 1;

			this.updateContext();

			if(this.pagination) {
				this.updatePagination.pages.call(this);
			}

			if(update || typeof update == 'undefined')
				this.fetchData();
		},

		update : function(type, params){
			var p;
			var required_params;
			if(type == 'pages'){
				required_params = ['page', 'nbPages', 'sort', 'asc', 'data'];
				for(p in required_params){
					if(typeof required_params[p] == 'undefined'){
						throw new p() + ' is a required param for update.more (jQuery.list)';
					}
				}
				this.setPage(params['page'], params['nbPages'], false);
				this.sortHeader(params['sort'], params['asc'], false);
				this.setData(params['data']);
			}
			else if(type == 'more'){
				required_params = ['page', 'hasMore', 'sort', 'asc', 'data'];
				for(p in required_params){
					if(typeof required_params[p] == 'undefined'){
						throw new p() + ' is a required param for update.pages (jQuery.list)';
					}
				}
				this.page = params['page'];
				this.sortHeader(params['sort'], params['asc'], false);
				this.data = params['data'];
				this.hasMore = params['hasMore'];
				this.updateContext();
				this.updatePagination.more.call(this);
				this.draw(true);

			}
		},

		setContextValue : function(key, value, update) {
			this.subContext[key] = value;

			this.updateContext();

			if(update || typeof update == 'undefined')
				this.fetchData();
		},

		getContextValue : function(key) {
			return this.subContext[key];
		},

		getContext : function() {
			var context = {
				page : this.page,
				sort : this.sort,
				asc : this.asc
			};

			if(this.paging == 'pages'){
				$.extend(context, this._extraContextPages());
			}
			else if(this.paging == 'more'){
				$.extend(context, this._extraContextMore());
			}

			for(var k in this.subContext) {
				context[this.subContextPrefix+'.'+k] = this.subContext[k];
			}

			return context;
		},

		_extraContextPages : function(){
			return {nbPages : this.nbPages};
		},

		_extaContextMore : function(){
			return {hasMore : this.hasMore};
		},


		setOptions : function() {
			var options;
			if(arguments.length == 1) {
				if(!$.isPlainObject(arguments[0])) {
					throw 'jQuery.list internal setOptions need an object if only one argument is given';
				}

				options = arguments[0];
			}
			else if(arguments.length == 2) {
				options = {};
				options[arguments[0]] = arguments[1];
			}
			else {
				throw 'jQuery.list internal setOptions support only plain object or key/value arguments';
			}


			var header_changed = false; // Will redraw the pagination
			var page_changed = false; // Will redraw the pagination
			var sort_changed = false; // Will redraw the header
			var data_changed = false; // WIll redraw the table
			var hasMore_changed = false; //Redraw the paging for "more"

			for(var k in options) {
				this[k] = options[k];

				if(k == 'headers') header_changed = true;
				else if(k == 'sort') sort_changed = true;
				else if(k == 'asc') sort_changed = true;
				else if(k == 'page') page_changed = true;
				else if(k == 'nbPages') page_changed = true;
				else if(k == 'data') data_changed = true;
				else if(k == 'hasMore') hasMore_changed = true;
			}

			this.updateContext();

			if(header_changed) this.buildTable();
			if(page_changed && this.pagination == 'pages') this.updatePagination.pages.call(this);
			if(hasMore_changed) this.updatePagination.more.call(this);
			if(sort_changed) this.updateHeader();
			if(data_changed) this.draw();
		},

		updateContext : function() {
			$.app.setContextValue('list.'+this.name, this.getContext());
		}
	};
})(jQuery);
