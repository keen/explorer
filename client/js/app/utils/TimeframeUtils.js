var _ = require('lodash');
var ProjectUtils = require('./ProjectUtils');
var FormatUtils = require('./FormatUtils');

module.exports = {

  convertDateToUTC: function(date) {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
  },

  /**
   * Takes a time object and returns a string representing the timeframe type (absolute or relative)
   * @param  {Object} time The time object
   * @return {String} The type of timeframe, 'absolute' or 'relative'
   */
   timeframeType: function(time) {
      if (_.isUndefined(time)) {
        return null;
      } else if (!_.isPlainObject(time)) {
        throw new Error('Invalid timeframe type: not a plain object.');
      } else if (_.has(time, 'start') || _.has(time, 'end')) {
        return 'absolute';
      } else if (_.has(time, 'relativity') && _.has(time, 'amount') && _.has(time, 'sub_timeframe')) {
        return 'relative';
      } else {
        throw new Error('Invalid timeframe type: invalid time value.');
      }
   },

  getTimezoneOffset: function(timezone) {
    var zone = _.find(ProjectUtils.getConstant('TIMEZONES'), { value: timezone });
    return zone ? zone.offset : '+00:00';
  },

  timeframeBuilders: {

    absolute: function(time) {
      if (time && time.start && time.end) {
        return {
          start: FormatUtils.formatISOTimeNoTimezone(time.start),
          end: FormatUtils.formatISOTimeNoTimezone(time.end)
        };
      }
    },

    relative: function(time) {
      if (time && time.relativity && time.amount && time.sub_timeframe) {
        return [time.relativity, time.amount, time.sub_timeframe].join('_');
      }
    }

  },

  getTimeframe: function(time) {
    var timeframeBuilder = module.exports.timeframeBuilders[module.exports.timeframeType(time)];
    if (typeof(timeframeBuilder) === 'undefined') return "";
    return timeframeBuilder(time);
  },

  getTimeParameters: function(timeframe, timezone) {
    return {
      timeframe: timeframe ? module.exports.getTimeframe(timeframe) : null,
      timezone: timezone || ProjectUtils.getConstant('DEFAULT_TIMEZONE')
    };
  },

  /**
   * Takes a URL encoded timerame string or object and returns a time object that looks how the Explorer store wants
   * it to
   * @param  {String} timeframe
   * @return {Object}
   * Return structure:
   * {
   *  time: {an Object, either containing a deconstructed absolute or relative timeframe}
   * }
   */
  unpackTimeframeParam: function(timeframe, timezone) {
    if (typeof timeframe === 'object') {
      return module.exports.unpackAbsoluteTimeframe(timeframe, timezone);
    } else if (typeof timeframe === 'string') {
      return module.exports.unpackRelativeTimeframe(timeframe, timezone);
    }
  },

  unpackAbsoluteTimeframe: function (timeframe, timezone) {
    var formattedValue = {
      time: {},
      timezone: null
    };

    if (!timezone || ProjectUtils.getConstant('TIMEZONES').indexOf(timezone) === -1) {
      formattedValue.timezone = 'UTC';
    } else {
      formattedValue.timezone = timezone;
    }

    var startVal = timeframe.start ? timeframe.start.substring(0, 19) : "";
    formattedValue.time.start = FormatUtils.formatISOTimeNoTimezone(new Date(startVal));

    var endVal = timeframe.end ? timeframe.end.substring(0, 19) : "";
    formattedValue.time.end = FormatUtils.formatISOTimeNoTimezone(new Date(endVal));

    return formattedValue;
  },

  unpackRelativeTimeframe: function (timeframe, timezone) {
    var split = timeframe.split('_');
    return {
      time: {
        relativity: split[0],
        amount: split[1],
        sub_timeframe: split[2]
      },
      timezone: timezone
    };
  }

}
