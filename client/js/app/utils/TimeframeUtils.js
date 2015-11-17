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
      var badTimeTypeError = new Error('Invalid time value');

      if(_.isUndefined(time)) {
        return "";
      } else if(!_.isPlainObject(time)) {
        throw badTimeTypeError;
      } else if(_.has(time, 'start') && _.has(time, 'end')) {
        return 'absolute';
      } else if(_.has(time, 'relativity') && _.has(time, 'amount') && _.has(time, 'sub_timeframe')) {
        return 'relative'
      } else {
        throw badTimeTypeError;
      }
   },

  getTimezoneOffset: function(timezone) {
    var zone = _.find(ProjectUtils.getConstant('TIMEZONES'), { value: timezone });
    return zone ? zone.offset : '+00:00';
  },

  timeframeBuilders: {

    absolute_timeframe: function(time, timezone) {
      if (time && time.start && time.end) {
        var offset = module.exports.getTimezoneOffset(timezone)
        return {
          start: FormatUtils.formatISOTimeNoTimezone(time.start) + offset,
          end: FormatUtils.formatISOTimeNoTimezone(time.end) + offset
        };
      }
    },

    relative_timeframe: function(time) {
      if (time && time.relativity && time.amount && time.sub_timeframe) {
        return [time.relativity, time.amount, time.sub_timeframe].join('_');
      }
    }

  },

  getTimeframe: function(time, timezone) {
    var timeframeType = module.exports.timeframeType(time);
    var timeframeBuilder = module.exports.timeframeBuilders[timeframeType + '_timeframe'];

    if(typeof(timeframeBuilder) === 'undefined') {
      return "";
    } else {
      return timeframeBuilder(time, timezone);
    }
  },

  getTimeParameters: function(time, timezone) {
    return {
      timeframe: module.exports.getTimeframe(time, timezone),
      timezone: module.exports.timeframeType(time) === 'absolute' ? null : timezone
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
    var timeFormat = 'h:mm A';
    var dateFormat = 'MMM D, YYYY';

    if (typeof timeframe === 'object') {
      var offset = timeframe.start.substring(timeframe.start.length, timeframe.start.length-6);

      timeframe.start = timeframe.start.substring(0, timeframe.start.length-6);
      timeframe.end = timeframe.end.substring(0, timeframe.end.length-6);

      var zone = _.find(ProjectUtils.getConstant('TIMEZONES'), { offset: offset });
      if (zone) {
        timezone = zone.value;
      } else if (!zone && !timezone) {
        throw new Error("A timezone was not part of the datestring for the timeframe with a start of: " + timeframe.start + ". There also was no timezone parameter found in the query. You must provide one or the other.");
      }
      return {
        time: {
          start: module.exports.convertDateToUTC(new Date(timeframe.start)),
          end: module.exports.convertDateToUTC(new Date(timeframe.end))
        },
        timezone: timezone
      };
    } else if (typeof timeframe === 'string') {
      var split = timeframe.split('_');
      return {
        time: {
          relativity: split[0],
          amount: split[1],
          sub_timeframe: split[2]
        },
        timezone: query.timezone
      };
    }
  },

}
