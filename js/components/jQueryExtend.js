
export default (jQuery, app) => ({

	alternateText(value, alternate_value) {
		this.text(value && value !== '' ? value : alternate_value);

		return this;
	},

	numberText(value) {
		const text = app.formatNumber(value);
		this.text(text === '' ? '0' : text);
		return this;
	},

	moneyText(value) {
		this.text(app.formatMoney(value));

		return this;
	},

	dateText(value) {
		this.text(app.date.format(value));

		return this;
	},

	durationVal(months_duration) {
		let text;
		if(!isFinite(months_duration)) {
			text = '';
		}
		else {
			const sign = (months_duration < 0 ? '-' : '');
			const years = Math.floor(Math.abs(months_duration) / 12);
			const months = Math.abs(months_duration) - 12 * years;
			text = sign + (years === 0 ? '' : (years === 1 ? app._('YEARD').replace('%{years}', years) : app._('YEARSD').replace('%{years}', years)) + ' ') +
				(months === 0 ? '' : (months === 1 ? app._('MONTHD').replace('%{months}', months) : app._('MONTHSD').replace('%{months}', months)));
		}
		this.val(text);

		return this;
	},

	booleanText(value) {
		if(value === 'YES') {
			value = app._('YES');
		}
		else if(value === 'NO') {
			value = app._('NO');
		}
		else {
			value = '-';
		}

		this.text(value);

		return this;
	},

	dateVal(value) {
		this.val(app.date.format(value, 'input'));

		return this;
	},

	safeClick(fn) {
		this.click(function(eventObject) {
			if(!this.__clicked) {
				this.__clicked = true;

				fn.call(this, eventObject);

				const t = this;
				setTimeout(() => {
					t.__clicked = false;
				}, 500);
			}
			else if(app.debug) {
				console.debug('catched double click');
			}
		});

		return this;
	},

	numberVal(value, opts) {
		if(arguments.length > 0) {
			return jQuery(this).val(app.formatNumber(value, opts));
		}

		const val = app.parseFloat(this.val());

		if(jQuery(this).hasClass('positive') && jQuery(this).hasClass('number')) {
			if(val < 0) {
				return 0;
			}

			return val;
		}

		return val;
	},

	number(opts) {

		return jQuery(this).each(function() {
			jQuery(this).addClass('number');
			jQuery(this).val(app.formatNumber(jQuery(this).val(), opts));

			jQuery(this).blur(function() {
				jQuery(this).val(app.formatNumber(jQuery(this).val(), opts));
			});
		});
	},

	moneyVal(value, opts) {
		if(arguments.length > 0) {
			if(jQuery(this).hasClass('money')) {
				jQuery(this).data('val', app.parseFloat(value.replace('$', '')));
				return jQuery(this).val(app.formatMoney(value, opts));
			}

			return jQuery(this).val(app.formatMoney(value, opts));
		}
		else if(jQuery(this).hasClass('money')) {
			const val = jQuery(this).data('val');

			if(jQuery(this).hasClass('positive') && val < 0) {
				return 0;
			}

			return val;
		}

		return app.parseFloat(jQuery(this).val().replace('$', ''));
	},

	money(opts) {
		return jQuery(this).each(function() {
			const $t = jQuery(this);
			$t.addClass('money');

			$t.focus(function() {
				jQuery(this).val(jQuery(this).data('val'));
				return this;
			});
			jQuery(this).click(function() {
				jQuery(this).select();
			});
			jQuery(this).blur(function() {
				let val;
				const value = jQuery(this).val();
				if(opts && opts.canBeNull && (value === '' || value === null)) {
					val = '';
				}
				else {
					val = app.parseFloat(value.replace('$', ''));
					if(opts && opts.true_precision) {
						if(opts.rounded) {
							val = Math.round(val * Math.pow(10, opts.true_precision)) / Math.pow(10, opts.true_precision);
						}
						else {
							val = Math.floor(val * Math.pow(10, opts.true_precision)) / Math.pow(10, opts.true_precision);
						}
					}
				}
				jQuery(this).data('val', val);
				jQuery(this).val(app.formatMoney(val, opts));
				return this;
			});
			if($t.val() !== '') {
				$t.blur();
			}
		});
	},

	percentVal(value, opts) {
		if(arguments.length > 0) {
			return jQuery(this).val(app.formatPercent(value, opts));
		}

		const val = app.parseFloat(this.val().replace('%', ''));

		if(jQuery(this).hasClass('positive') && jQuery(this).hasClass('percent')) {
			if(val < 0) {
				return 0;
			}

			return val;
		}

		return val;
	},

	percent(opts) {
		return jQuery(this).each(function() {
			jQuery(this).addClass('percent');
			jQuery(this).val(app.formatPercent(jQuery(this).val(), opts));

			jQuery(this).blur(function() {
				jQuery(this).val(app.formatPercent(jQuery(this).val(), opts));
			});
		});
	},

	SIN() {
		return jQuery(this).each(function() {
			jQuery(this).val(app.formatSIN(jQuery(this).val()));

			jQuery(this).blur(function() {
				this.value = app.formatSIN(jQuery(this).val());
			});
		});
	},

	datepickerInput(interval) {
		return jQuery(this).each(function() {
			const $this = jQuery(this);
			let $calendar_button = $this.next('.btn.calendar');
			if($this.next('.btn.calendar').length === 0) {
				$calendar_button = $('<a href="javascript:void(0);" class="btn calendar" tabindex=-1><span class="icon"></span></a>');
			}
			$this.after($calendar_button);

			if($.browser.msie) {
				$this.before($('<div class="clear"></div>'));
			}

			if($this.width()) {
				$this.css('width', '-=' + $calendar_button.outerWidth(true))
					.attr('autocomplete', 'off');
			}

			// init datepicker
			if(typeof interval !== 'undefined') {
				const config = $.extend(
					{
						dateFormat: 'yy-mm-dd',
						onClose(value) {
							try {
								const parsed_date = $.datepicker.parseDate('yymmdd', value);
								jQuery(this).val($.datepicker.formatDate('yy-mm-dd', parsed_date));
							}
							catch(e) {
								jQuery(this).val(value);
							}
						}
					},
					interval
				);
				$this.datepicker(config);
			}
			else {
				$this.datepicker({
					dateFormat: 'yy-mm-dd',
					onClose(value) {
						try {
							const parsed_date = $.datepicker.parseDate('yymmdd', value);
							jQuery(this).val($.datepicker.formatDate('yy-mm-dd', parsed_date));
						}
						catch(e) {
							jQuery(this).val(value);
						}
					}
				});
			}

			// bind custom button attached to the input
			$calendar_button.bind('click', (e) => {
				e.preventDefault();
				if($this.datepicker('widget').is(':hidden')) {
					$this.datepicker('show');
				}
			});
		});
	},

	hint(text, width) {
		const w = Math.max(parseInt(width, 10), 200);

		return jQuery(this)
			.wrap('<span class="hinted"></span>')
			.after('<span class="hint" style="width: ' + w + 'px; right: -' + (w + 50) + 'px;">' + text + '<span class="hint-pointer sprite">&nbsp;</span></span>')
			.focus(function() {
				const t = this;
				t._focus_timeout = setTimeout(() => {
					$(t).next('.hint').fadeIn();
				}, 1000);
			})
			.blur(function() {
				if(this._focus_timeout) {
					clearTimeout(this._focus_timeout);
				}

				jQuery(this).next('.hint').fadeOut();
			})
			.keypress(function() {
				if(this._focus_timeout) {
					clearTimeout(this._focus_timeout);
				}

				jQuery(this).next('.hint').fadeOut();
			});
	},

	unhint() {
		if(jQuery(this).parent().hasClass('hinted')) {
			jQuery(this).next('.hint').remove();
			jQuery(this).unwrap();
		}
		else if(jQuery(this).parent().find('.hinted')) {
			jQuery(this).next('.hint').remove();
		}

		return this;
	},

	hintError(text, width, dont_show) {
		let blurFocusTarget;
		let $this = jQuery(this);

		if($this.combobox && $this.combobox('instance') !== undefined) {
			$this = $this.combobox('instance').input;
			$this.data('isCombobox', true);
		}

		let target = $this;

		if(target.data('blur-field')) {
			blurFocusTarget = $('#' + target.data('blur-field'));
		}
		else {
			blurFocusTarget = target;
		}
		const hintedWrapperClasses = ['hinted'];

		if($this.data('is-textbox')) {
			if($this.next().is('.hinted')) {
				target = $this.next().find('.textboxlist');
			}
			else {
				target = $this.next('.textboxlist');
			}
			target.find('.textboxlist-bit-box-deletable').blur(() => {
				target.next('.hint').fadeOut();
			})
				.focus(() => {
					target.next('.hint').fadeIn();
				})
				.change(() => {
					$(target).handleHintErrorChange();
				});
		}

		if($this.data('is-textbox') || target.hasClass('textboxlist')) {
			hintedWrapperClasses.push('contain-textbox');
			blurFocusTarget = target.find('.textboxlist-bit-editable-input');
		}
		target.unhint();
		target.addClass('save_warning');
		if(!target.data('no-hinted-span')) {
			target.wrap('<span class="' + hintedWrapperClasses.join(' ') + '"></span>');
		}

		target.after('<span class="hint">' + text + '<span class="hint-pointer sprite">&nbsp;</span></span>');

		blurFocusTarget.blur(() => {
			target.next('.hint').fadeOut();
		})
			.focus(() => {
				target.next('.hint').fadeIn();
			})
			.change(() => {
				$(target).handleHintErrorChange();
			});

		target.data('hint', target.next('.hint'));
		target.setHintErrorWidth(width);
		target.setHintErrorPosition();

		if(target.data('extra-hint-classes')) {
			target.parents('.hinted').addClass(target.data('extra-hint-classes'));
		}

		target.data('hint')
			.click(function(e) {
				e.preventDefault();
				e.stopPropagation();
				jQuery(this).fadeOut();
			});

		if(!dont_show) {
			target.data('hint').fadeIn();
		}

		return target;
	},

	handleHintErrorChange() {
		jQuery(this).unhint().removeClass('save_warning');
	},

	setHintErrorWidth(width) {
		const w = Math.max(parseInt(width, 10), 200);

		jQuery(this).next('.hint').css({
			width: w
		});

		return jQuery(this);
	},

	setHintErrorPosition() {
		const r = -(parseInt(jQuery(this).data('hint').css('width')) + 50);

		jQuery(this).data('hint').css({
			right: r
		});

		return jQuery(this);
	},

	signal(length) {
		length = parseInt(length);
		if(length <= 0) {
			length = 500;
		}

		return jQuery(this).each(function() {
			jQuery(this).addClass('signal');
			const t = this;
			setTimeout(() => {
				$(t).removeClass('signal');
			}, length);
		});
	},

	checkVal() {
		if(arguments.length > 0) {
			let checked = false;
			if(arguments[0] == 'YES' || arguments[0] === true) {
				checked = true;
			}

			this.prop('checked', checked);
			return this;
		}

		return this.val();
	},

	toggleDisabled(disabledVal, toggleClass) {
		if(toggleClass === undefined) {
			toggleClass = true;
		}

		if(disabledVal) {
			this.attr('disabled', 'disabled');
			if(toggleClass) {
				this.addClass('disabled');
			}
		}
		else {
			this.removeAttr('disabled');
			if(toggleClass) {
				this.removeClass('disabled');
			}
		}
	},

	getClasses() {
		const all_classes = [];
		jQuery(this).each(function() {
			const classes = jQuery(this).attr('class').split(' ');

			for(const k in classes) {
				let found = false;
				for(const i in all_classes) {
					if(all_classes[i] == classes[k]) {
						found = true;
					}
				}

				if(!found) {
					all_classes.push(classes[k]);
				}
			}
		});

		return all_classes;
	}
});