
// jQuery.fn.extend(jQueryExtend);
export var jQueryExtend = {

	alternateText(value, alternate_value) {
		this.text(value && value !== '' ? value : alternate_value);

		return this;
	},

	numberText(value) {
		const text = self.formatNumber(value);
		this.text(text === '' ? '0' : text);

		return this;
	},

	moneyText(value) {
		this.text(self.formatMoney(value));

		return this;
	},

	dateText(value) {
		this.text(self.date.format(value));

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
			text = sign + (years === 0 ? '' : (years === 1 ? $.app._('YEARD').replace('%{years}', years) : $.app._('YEARSD').replace('%{years}', years)) + ' ') +
				(months === 0 ? '' : (months === 1 ? $.app._('MONTHD').replace('%{months}', months) : $.app._('MONTHSD').replace('%{months}', months)));
		}
		this.val(text);

		return this;
	},

	booleanText(value) {
		if(value === 'YES') {
			value = $.app._('YES');
		}
		else if(value === 'NO') {
			value = $.app._('NO');
		}
		else {
			value = '-';
		}

		this.text(value);

		return this;
	},

	dateVal(value) {
		this.val(self.date.format(value, 'input'));

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
			else if($.app.debug) {
				console.debug('catched double click');
			}
		});

		return this;
	},

	numberVal(value, opts) {
		if(arguments.length > 0) {
			return $(this).val(self.formatNumber(value, opts));
		}

		const val = $.app.parseFloat(this.val());

		if($(this).hasClass('positive') && $(this).hasClass('number')) {
			if(val < 0) {
				return 0;
			}

			return val;
		}

		return val;
	},

	number(opts) {
		return $(this).each(function() {
			$(this).addClass('number');
			$(this).val($.app.formatNumber($(this).val(), opts));

			$(this).blur(function() {
				$(this).val($.app.formatNumber($(this).val(), opts));
			});
		});
	},

	moneyVal(value, opts) {
		if(arguments.length > 0) {
			if($(this).hasClass('money')) {
				$(this).data('val', $.app.parseFloat(value.replace('$', '')));
				return $(this).val(self.formatMoney(value, opts));
			}

			return $(this).val(self.formatMoney(value, opts));
		}
		else if($(this).hasClass('money')) {
			const val = $(this).data('val');

			if($(this).hasClass('positive') && val < 0) {
				return 0;
			}

			return val;
		}

		return $.app.parseFloat($(this).val().replace('$', ''));
	},

	money(opts) {
		return $(this).each(function() {
			const $t = $(this);
			$t.addClass('money');

			$t.focus(function() {
				$(this).val($(this).data('val'));
				return this;
			});
			$(this).click(function() {
				$(this).select();
			});
			$(this).blur(function() {
				let val;
				const value = $(this).val();
				if(opts && opts.canBeNull && (value === '' || value === null)) {
					val = '';
				}
				else {
					val = $.app.parseFloat(value.replace('$', ''));
					if(opts && opts.true_precision) {
						if(opts.rounded) {
							val = Math.round(val * Math.pow(10, opts.true_precision)) / Math.pow(10, opts.true_precision);
						}
						else {
							val = Math.floor(val * Math.pow(10, opts.true_precision)) / Math.pow(10, opts.true_precision);
						}
					}
				}
				$(this).data('val', val);
				$(this).val($.app.formatMoney(val, opts));
				return this;
			});
			if($t.val() !== '') {
				$t.blur();
			}
		});
	},

	percentVal(value, opts) {
		if(arguments.length > 0) {
			return $(this).val(self.formatPercent(value, opts));
		}

		const val = $.app.parseFloat(this.val().replace('%', ''));

		if($(this).hasClass('positive') && $(this).hasClass('percent')) {
			if(val < 0) {
				return 0;
			}

			return val;
		}

		return val;
	},

	percent(opts) {
		return $(this).each(function() {
			$(this).addClass('percent');
			$(this).val($.app.formatPercent($(this).val(), opts));

			$(this).blur(function() {
				$(this).val($.app.formatPercent($(this).val(), opts));
			});
		});
	},

	SIN() {
		return $(this).each(function() {
			$(this).val($.app.formatSIN($(this).val()));

			$(this).blur(function() {
				this.value = $.app.formatSIN($(this).val());
			});
		});
	},

	datepickerInput(interval) {
		return $(this).each(function() {
			const $this = $(this);
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
								$(this).val($.datepicker.formatDate('yy-mm-dd', parsed_date));
							}
							catch(e) {
								$(this).val(value);
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
							$(this).val($.datepicker.formatDate('yy-mm-dd', parsed_date));
						}
						catch(e) {
							$(this).val(value);
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

		return $(this)
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

				$(this).next('.hint').fadeOut();
			})
			.keypress(function() {
				if(this._focus_timeout) {
					clearTimeout(this._focus_timeout);
				}

				$(this).next('.hint').fadeOut();
			});
	},

	unhint() {
		if($(this).parent().hasClass('hinted')) {
			$(this).next('.hint').remove();
			$(this).unwrap();
		}
		else if($(this).parent().find('.hinted')) {
			$(this).next('.hint').remove();
		}

		return this;
	},

	hintError(text, width, dont_show) {
		let blurFocusTarget;
		let $this = $(this);

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
				$(this).fadeOut();
			});

		if(!dont_show) {
			target.data('hint').fadeIn();
		}

		return target;
	},

	handleHintErrorChange() {
		$(this).unhint().removeClass('save_warning');
	},

	setHintErrorWidth(width) {
		const w = Math.max(parseInt(width, 10), 200);

		$(this).next('.hint').css({
			width: w
		});

		return $(this);
	},

	setHintErrorPosition() {
		const r = -(parseInt($(this).data('hint').css('width')) + 50);

		$(this).data('hint').css({
			right: r
		});

		return $(this);
	},

	signal(length) {
		length = parseInt(length);
		if(length <= 0) {
			length = 500;
		}

		return $(this).each(function() {
			$(this).addClass('signal');
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
		$(this).each(function() {
			const classes = $(this).attr('class').split(' ');

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
};