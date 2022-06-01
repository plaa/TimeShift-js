/*!
 * TimeShift.js
 *
 * Copyright 2013 Mobile Wellness Solutions MWS Ltd, Sampo Juustila
 * Released under the MIT license
 */

(function() {

	var root = this;
	var OriginalDate = root.Date;

	var TimeShift;
	if (typeof exports !== 'undefined') {
		TimeShift = exports;
	} else {
		TimeShift = root.TimeShift = {};
	}
	
	
	var currentTime = undefined;
	var timezoneOffset = new OriginalDate().getTimezoneOffset();
	
	function currentDate() {
		var time = TimeShift.getTime();
		if (typeof time === 'function') {
			time = time();
		}
		if (time !== undefined) {
			return new OriginalDate(time);
		} else {
			return new OriginalDate();
		}
	}
	

	function realLocalToUtc(realLocal) {
		return new OriginalDate(realLocal.getTime() - realLocal.getTimezoneOffset()*60*1000 + timezoneOffset*60*1000);
	}
	function utcToLocal(utc) {
		return new OriginalDate(utc.getTime() - timezoneOffset*60*1000);
	}
	function localToUtc(local) {
		return new OriginalDate(local.getTime() + timezoneOffset*60*1000);
	}
	function twoDigit(n) {
		if (n < 10) {
			return "0" + n;
		} else {
			return "" + n;
		}
	}
	function timezoneName() {
		var zone = "GMT";
		var offset = Math.abs(timezoneOffset);
		if (timezoneOffset < 0) {
			zone = zone + "+";
		} else if (timezoneOffset > 0) {
			zone = zone + "-";
		} else {
			return zone;
		}
		return zone + twoDigit(Math.floor(offset/60)) + twoDigit(offset%60);
	}

	
	/**
	 * Return the current time zone offset in minutes.  A value of -60 corresponds to GMT+1,
	 * +60 to GTM-1.  Default value is from new Date().getTimezoneOffset().
	 */
	TimeShift.getTimezoneOffset = function() {
		return timezoneOffset;
	}
	
	/**
	 * Set the time zone offset in minutes.  -60 corresponds to GMT+1, +60 to GTM-1.
	 * Changing this will affect the results also for previously created Date instances.
	 */
	TimeShift.setTimezoneOffset = function(offset) {
		timezoneOffset = offset;
	}
	
	/**
	 * Return the currently overridden time value set by `TimeShift.setTime`, or undefined if
	 * not overridden.
	 */
	TimeShift.getTime = function() {
		return currentTime;
	}

	/**
	 * Set the current time in milliseconds after Jan 1 1970 in UTC time, or a callback
	 * which returns the same.  Setting this to undefined will reset to the real current time.
	 */
	TimeShift.setTime = function(time) {
		currentTime = time;
	}
	
	/**
	 * Access to the original Date constructor.
	 */
	TimeShift.OriginalDate = OriginalDate;

	
	/**
	 * Mock implementation of Date.
	 */
	TimeShift.Date = function() {

		// Detect whether we're being called with 'new'
		// From http://stackoverflow.com/questions/367768/how-to-detect-if-a-function-is-called-as-constructor
		var isConstructor = false;
		if (this instanceof TimeShift.Date && !this.__previouslyConstructedByTimeShift) {
			isConstructor = true;
			this.__previouslyConstructedByTimeShift = true;
		}
		if (!isConstructor) {
			return (new TimeShift.Date()).toString();
		}

		switch (arguments.length) {
		case 0:
			this.utc = currentDate();
			break;
		case 1:
			this.utc = new OriginalDate(arguments[0]);
			break;
		case 2:
			this.utc = realLocalToUtc(new OriginalDate(arguments[0], arguments[1]));
			break;
		case 3:
			this.utc = realLocalToUtc(new OriginalDate(arguments[0], arguments[1], arguments[2]));
			break;
		case 4:
			this.utc = realLocalToUtc(new OriginalDate(arguments[0], arguments[1], arguments[2], arguments[3]));
			break;
		case 5:
			this.utc = realLocalToUtc(new OriginalDate(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]));
			break;
		case 6:
			this.utc = realLocalToUtc(new OriginalDate(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]));
			break;
		default:
			this.utc = realLocalToUtc(new OriginalDate(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]));
			break;
		}
	}
	
	TimeShift.Date.prototype.getDate = function() { return utcToLocal(this.utc).getUTCDate(); }
	TimeShift.Date.prototype.getDay = function() { return utcToLocal(this.utc).getUTCDay(); }
	TimeShift.Date.prototype.getFullYear = function() { return utcToLocal(this.utc).getUTCFullYear(); }
	TimeShift.Date.prototype.getHours = function() { return utcToLocal(this.utc).getUTCHours(); }
	TimeShift.Date.prototype.getMilliseconds = function() { return utcToLocal(this.utc).getUTCMilliseconds(); }
	TimeShift.Date.prototype.getMinutes = function() { return utcToLocal(this.utc).getUTCMinutes(); }
	TimeShift.Date.prototype.getMonth = function() { return utcToLocal(this.utc).getUTCMonth(); }
	TimeShift.Date.prototype.getSeconds = function() { return utcToLocal(this.utc).getUTCSeconds(); }
	
	TimeShift.Date.prototype.getUTCDate = function() { return this.utc.getUTCDate(); }
	TimeShift.Date.prototype.getUTCDay = function() { return this.utc.getUTCDay(); }
	TimeShift.Date.prototype.getUTCFullYear = function() { return this.utc.getUTCFullYear(); }
	TimeShift.Date.prototype.getUTCHours = function() { return this.utc.getUTCHours(); }
	TimeShift.Date.prototype.getUTCMilliseconds = function() { return this.utc.getUTCMilliseconds(); }
	TimeShift.Date.prototype.getUTCMinutes = function() { return this.utc.getUTCMinutes(); }
	TimeShift.Date.prototype.getUTCMonth = function() { return this.utc.getUTCMonth(); }
	TimeShift.Date.prototype.getUTCSeconds = function() { return this.utc.getUTCSeconds(); }
	
	TimeShift.Date.prototype.setDate = function() { var d = utcToLocal(this.utc); d.setUTCDate.apply(d, Array.prototype.slice.call(arguments, 0)); this.utc = localToUtc(d); return this.utc.getTime(); }
	TimeShift.Date.prototype.setFullYear = function() { var d = utcToLocal(this.utc); d.setUTCFullYear.apply(d, Array.prototype.slice.call(arguments, 0)); this.utc = localToUtc(d); return this.utc.getTime(); }
	TimeShift.Date.prototype.setHours = function() { var d = utcToLocal(this.utc); d.setUTCHours.apply(d, Array.prototype.slice.call(arguments, 0)); this.utc = localToUtc(d); return this.utc.getTime(); }
	TimeShift.Date.prototype.setMilliseconds = function() { var d = utcToLocal(this.utc); d.setUTCMilliseconds.apply(d, Array.prototype.slice.call(arguments, 0)); this.utc = localToUtc(d); return this.utc.getTime(); }
	TimeShift.Date.prototype.setMinutes = function() { var d = utcToLocal(this.utc); d.setUTCMinutes.apply(d, Array.prototype.slice.call(arguments, 0)); this.utc = localToUtc(d); return this.utc.getTime(); }
	TimeShift.Date.prototype.setMonth = function() { var d = utcToLocal(this.utc); d.setUTCMonth.apply(d, Array.prototype.slice.call(arguments, 0)); this.utc = localToUtc(d); return this.utc.getTime(); }
	TimeShift.Date.prototype.setSeconds = function() { var d = utcToLocal(this.utc); d.setUTCSeconds.apply(d, Array.prototype.slice.call(arguments, 0)); this.utc = localToUtc(d); return this.utc.getTime(); }
	
	TimeShift.Date.prototype.setUTCDate = function() { this.utc.setUTCDate.apply(this.utc, Array.prototype.slice.call(arguments, 0)); return this.utc.getTime(); }
	TimeShift.Date.prototype.setUTCFullYear = function() { this.utc.setUTCFullYear.apply(this.utc, Array.prototype.slice.call(arguments, 0)); return this.utc.getTime(); }
	TimeShift.Date.prototype.setUTCHours = function() { this.utc.setUTCHours.apply(this.utc, Array.prototype.slice.call(arguments, 0)); return this.utc.getTime(); }
	TimeShift.Date.prototype.setUTCMilliseconds = function() { this.utc.setUTCMilliseconds.apply(this.utc, Array.prototype.slice.call(arguments, 0)); return this.utc.getTime(); }
	TimeShift.Date.prototype.setUTCMinutes = function() { this.utc.setUTCMinutes.apply(this.utc, Array.prototype.slice.call(arguments, 0)); return this.utc.getTime(); }
	TimeShift.Date.prototype.setUTCMonth = function() { this.utc.setUTCMonth.apply(this.utc, Array.prototype.slice.call(arguments, 0)); return this.utc.getTime(); }
	TimeShift.Date.prototype.setUTCSeconds = function() { this.utc.setUTCSeconds.apply(this.utc, Array.prototype.slice.call(arguments, 0)); return this.utc.getTime(); }
	

	TimeShift.Date.prototype.getYear = function() { return this.getFullYear() - 1900; }
	TimeShift.Date.prototype.setYear = function(v) { return this.setFullYear(v + 1900); }
	
	TimeShift.Date.prototype.getTime = function() { return this.utc.getTime(); }
	TimeShift.Date.prototype.setTime = function(v) { return this.utc.setTime(v); }
	
	TimeShift.Date.prototype.getTimezoneOffset = function() { return timezoneOffset; }
	
	TimeShift.Date.prototype.toDateString = function() { return utcToLocal(this.utc).toDateString(); }  // Wrong
	TimeShift.Date.prototype.toLocaleDateString = function() { return utcToLocal(this.utc).toLocaleDateString(); }  // Wrong
	
	TimeShift.Date.prototype.toISOString = function() { return this.utc.toISOString(); }
	TimeShift.Date.prototype.toGMTString = function() { return this.utc.toGMTString(); }
	TimeShift.Date.prototype.toUTCString = function() { return this.utc.toUTCString(); }

	TimeShift.Date.prototype.toString = function() {
		var wkdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var d = utcToLocal(this.utc);
		// Mon Mar 05 2012 06:07:08 GMT+0500
		return wkdays[d.getUTCDay()] + " " + months[d.getUTCMonth()] + " " + twoDigit(d.getUTCDate()) + " " + d.getUTCFullYear() +
			" " + twoDigit(d.getUTCHours()) + ":" + twoDigit(d.getUTCMinutes()) + ":" + twoDigit(d.getUTCSeconds()) + " " + timezoneName();
	}
	TimeShift.Date.prototype.toLocaleString = function() { return this.toString(); }  // Wrong
	TimeShift.Date.prototype.toLocaleTimeString = function() { return this.toString(); }  // Wrong
	TimeShift.Date.prototype.toTimeString = function() { return this.toString(); }  // Wrong

	TimeShift.Date.prototype.toJSON = function() { return this.utc.toJSON(); }
	TimeShift.Date.prototype.valueOf = function() { return this.utc.getTime(); }


	TimeShift.Date.now = function() { return currentDate().getTime(); }
	TimeShift.Date.parse = OriginalDate.parse;  // Wrong
	TimeShift.Date.UTC = OriginalDate.UTC;

	
	/**
	 * Helper method that describes a Date object contents.
	 */
	TimeShift.Date.prototype.desc = function() {
		return "utc=" + this.utc.toUTCString() + "   local=" + utcToLocal(this.utc).toUTCString() + "   offset=" + timezoneOffset;
	}

}).call(typeof global !== 'undefined' ? global : this);
