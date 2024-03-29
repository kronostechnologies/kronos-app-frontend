// @flow
import Application from './Application';

// import $ from 'jquery';

declare var $;
declare var moment;

export default class DateHelper {
    constructor(app: Application) {
        this.app = app;
        this._date_regex = new RegExp(
            /^([1-9]{1}\d{3})-{0,1}([0]{1}[1-9]{1}|[1]{1}[0-2]{1})-{0,1}([0-2]{1}[1-9]{1}|[1-2]{1}[0]{1}|[3]{1}[0-1]{1})(| (\d{2}):(\d{2}):(\d{2})(|\.\d+))$/,
        );
    }

    isDate(date) {
        const m = this._date_regex.exec(date);

        return m != null;
    }

    parse(date) {
        if (date === null) {
            return false;
        }

        if (typeof date === 'object') {
            if (typeof date.date !== 'undefined') {
                // Got data from model
                date = date.date;
            } else {
                // Probably got a Date object
                return date;
            }
        }

        const m = this._date_regex.exec(date);

        if (m == null) {
            if (this.app.debug) {
                console.debug(`Could not parse date "${date}"`);
            }

            return false;
        }

        const obj = new Date();

        obj.setDate(1);
        obj.setYear(m[1]);
        obj.setMonth(parseInt(m[2], 10) - 1);
        obj.setDate(m[3]);
        if (m[4]) {
            obj.setHours(m[5]);
            obj.setMinutes(m[6]);
            obj.setSeconds(m[7]);
        } else {
            obj.setHours('0');
            obj.setMinutes('0');
            obj.setSeconds('0');
        }

        return obj;
    }

    format(date, format) {
        date = moment(date);

        if (!date.isValid()) {
            if (this.app.debug) {
                console.debug('Invalid date string');
            }
            return '';
        }

        if (typeof format === 'undefined') {
            format = 'long';
        }

        if (format === 'input') {
            return date.format('YYYY-MM-DD');
        }
        if (format === 'long') {
            return date.format('LL');
        }
        if (format === 'longtime') {
            return date.format('LLL');
        }
        if (format === 'short') {
            return this.app.lang === 'en' ? date.format('MMMM D') : date.format('D MMMM');
        }
        if (format === 'longabbrmonth') {
            return date.format('ll');
        }
        if (format === 'time') {
            let timeformat = 'LT';

            if ($.isPlainObject(this.app.config) && typeof this.app.config.time_format === 'string') {
                timeformat = this.app.config.time_format === '24h' ? 'HH:mm' : 'hh:mm A';
            }
            return date.format(timeformat);
        }
        if (format === 'dashboard') {
            return this.app.lang === 'en' ? date.format('dddd, MMMM D') : date.format('dddd, D MMMM');
        }
        if (this.app.debug) {
            console.debug(`Unknown date format "${format}"`);
        }
        return '';
    }

    getMonthName(month) {
        if (typeof month === 'undefined' && arguments.length === 0) {
            month = moment().month();
        }

        const returnValue = moment.months(month);

        if ($.isArray(returnValue)) {
            console.warn(`Unknown month "${month}"`);
        } else {
            return returnValue;
        }
    }

    getAge(date, now) {
        date = this.parse(date);
        now = this.parse(now) || new Date();
        if (date === false || date === '') {
            return '';
        }

        return parseInt(moment(now).diff(date, 'years'));
    }

    /**
     * get a fake birthdate for this age
     */
    getFakeBirthdate(age) {
        age = parseInt(age);
        if (!age) {
            return '';
        }

        return moment().subtract(age, 'years').startOf('year').format('YYYY-MM-DD');
    }

    getInsuranceAge(date) {
        let date_obj = this.parse(date);

        if (date_obj) {
            let age = this.getAge(date);
            let lastBirthday = new Date();
            let now = new Date();
            let nextBirthday = new Date();

            lastBirthday.setMonth(date_obj.getMonth());
            lastBirthday.setDate(date_obj.getDate());

            nextBirthday.setMonth(date_obj.getMonth());
            nextBirthday.setDate(date_obj.getDate());

            if (now < lastBirthday) {
                lastBirthday.setFullYear(lastBirthday.getFullYear() - 1);
            }

            nextBirthday.setFullYear(lastBirthday.getFullYear() + 1);

            if (Math.abs(now - nextBirthday) < Math.abs(now - lastBirthday)) {
                age++;
            }
            date_obj = null;
            lastBirthday = null;
            now = null;
            nextBirthday = null;

            return age;
        }
        return 0;
    }

    getYear(date) {
        date = this.parse(date);

        if (date) {
            return moment(date).year();
        }
        return 0;
    }
}
