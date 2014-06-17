//jQuery plugin to handle oneToMany tables
(function($){

	//public methods
	var methods = {
		init: function(options){
			return this.each(function(){
				var t = this;
				var $this = $(this);
				var data = {
					i: 0,
					clone_row: $this.find('.mto-row:first').detach()
				};

				//Bind add/delete events
				data.clone_row.find('.delete, .js-delete').click(function(e){
					e.preventDefault();
					methods.delete_row.apply(t, [$(this).parents('.mto-row')]);
				});

				if(options && options.methods){
					$.extend(methods, options.methods);
				}

				$this.find('.add, .js-add').data({
					methods: methods,
					$plugin: $this
				}).bind('click', {t: t}, methods.handle_add_click);

				$this.data('manyToOneSelector', data);
			});
		},

		//Creates a new row from data.
		inject : function(new_data){
			var $new_row = methods.add_row.call(this);
			for(var i = 0; i < new_data.length; i++){
				var $form_elem = $new_row.find(new_data[i].selector);
				if($form_elem.length === 0 && $.app.debug){
					console.error('No input found for selector "'+ new_data[i].selector +'" in $.fn.manyToOneSelector.inject');
				}
				if(typeof new_data[i].before === 'function'){
					new_data[i].before($new_row);
				}
				$form_elem.val(new_data[i].val);
				if(typeof new_data[i].after === 'function'){
					new_data[i].after($new_row);
				}
			}
			return $new_row;
		},

		add_row : function(){
			var $this = $(this);
			//Create new row, update counters and append it
			var data = $this.data('manyToOneSelector');
			var $new_row = data.clone_row.clone(true);
			var new_index = data['i'];
			data['i'] += 1;
			$this.data('manyToOneSelector', data);

			$new_row.attr('data-i', new_index);

			//update attributes
			var attr = ['name', 'id', 'for', 'value', 'data-id'];
			$new_row.find('[' + attr.join('], [') + ']').each(function(){
				for(var i = 0; i < attr.length; i++){
					var $elem = $(this);
					if($elem.attr(attr[i])){
						$elem.attr(attr[i], $elem.attr(attr[i]).replace('__PH__', new_index));
					}
				}
			});
			$this.find('.mto-container').append($new_row);

			//Update altrow (odd classes)
			methods.update_altrow.call(this);

			//do not put focus on first text field here cuz it may cause strange things in a new form.
			//Return row so caller can change it.
			return $new_row;
		},

		delete_row: function($row){
			//if theres only one row, clear it's data. else, delete it.
			if($row.siblings('.mto-row').length === 0){
				$row.find('input').each(function(i, input){
					var $input = $(input);
					if(typeof $input.data('textboxlist_ref') != 'undefined'){
						$input.data('textboxlist_ref').removeList();
					}
				});
				$row.find('input, textarea').not('.no-clear').val('').trigger('change');
				$row.find('select:not(.no-clear)').find('option:first').attr('selected', 'selected').trigger('change');
				$row.find('input:tabbable,select:tabbable,textarea:tabbable').not('.mto-nofocus').first().focus();
			}
			else{
				// This allow us ot trigger the bit event bitRemove properly.
				$row.find('input').each(function(i, input){
					var $input = $(input);
					if(typeof $input.data('textboxlist_ref') != 'undefined'){
						$input.data('textboxlist_ref').removeList();
					}
				});
				if ($row.next().length) $row.next().find('input:tabbable,select:tabbable,textarea:tabbable').not('.mto-nofocus').first().focus();
				else if ($row.prev().length) $row.prev().find('input:tabbable,select:tabbable,textarea:tabbable').not('.mto-nofocus').first().focus();
				$row.remove();
				methods.update_altrow.call(this);
				methods.ensure_radio_checked.call(this);
			}
		},

		/**
		 * Removes ALL row from this MTO.
		 */
		delete_all_row: function(){
			methods.each_row.call(this, function(i, row){
				$(row).remove();
			});
		},

		update_altrow : function(){
			var odd = false;
			$(this).find('.mto-row').each(function(){
				if(odd) $(this).addClass('odd');
				else $(this).removeClass('odd');
				odd = !odd;
			});
		},

		ensure_radio_checked: function(){
			var $radios = $(this).find('input[type=radio]');
			if(!$radios.length) return;
			if($radios.filter(':checked').length) return
			$radios.first().prop('checked', true).trigger('click');
		},

		handle_add_click: function(e){
			var t = e.data.t;
			e.preventDefault();
			var $row = methods.add_row.apply(t);
			$row.find('input:tabbable,select:tabbable,textarea:tabbable').not('.mto-nofocus').first().focus();
		},

		each_row: function(fn){
			return $(this).find('.mto-row').each(fn);
		},

		map_row: function(fn){
			return $(this).find('.mto-row').map(fn);
		},
		
		last_row: function(){
			return $(this).find('.mto-row').last();
		},
		
		is_empty: function($row){
			var is_empty = true;
			$(this).find('.mto-row').each(function(index, element){
				$row = $(element);
				$row.find('input, textarea').not('.no-clear').each(function(index, element){
					var $element = $(element);
					if($element.val() != ''){
						is_empty = false;
						return false;
					}
				});
				if(is_empty){
					$row.find('select:not(.no-clear)').each(function(index, element){
						if(element.selectedIndex != 0){
							is_empty = false;
							return false;
						}
					});
				}
				
				return is_empty;
			});
			
			return is_empty;
		}
	};


	$.fn.manyToOneSelector = function( method ) {
		if ( methods[method] ) {
			if(this.length > 1){
				throw '$.manyToOneSelector functions may only be called with one dom node (except for init)';
			}
	    return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
	  } else if ( typeof method === 'object' || ! method ) {
	    return methods.init.apply( this, arguments );
	  } else {
	    $.error( 'Method ' +  method + ' does not exist on jQuery.manyToOneSelector' );
	  }
	};
})(jQuery)
