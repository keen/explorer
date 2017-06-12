var assert = require('chai').assert;
var expect = require('chai').expect;
var moment = require('moment');
let sinon = require('sinon/pkg/sinon.js');
var TimeframeUtils = require('../../../client/js/app/utils/TimeframeUtils');

describe('utils/TimeframeUtils', function () {

  describe('getTimeframe', function () {
    it('should call the right timeframe builder for absolute timeframes', function () {
      var time = {
        start: new Date(moment().subtract(1, 'days').startOf('day').format()),
        end: new Date(moment().startOf('day').format())
      };
      var stub = sinon.stub(TimeframeUtils.timeframeBuilders, 'absolute');

      TimeframeUtils.getTimeframe(time, 'US/Hawaii');
      assert.isTrue(stub.calledOnce);
      TimeframeUtils.timeframeBuilders.absolute.restore();
    });
    it('should call the right timeframe builder for relative timeframes', function () {
      var time = {
        relativity: 'this',
        amount: '1',
        sub_timeframe: 'days'
      };
      var stub = sinon.stub(TimeframeUtils.timeframeBuilders, 'relative');

      TimeframeUtils.getTimeframe(time);
      assert.isTrue(stub.calledOnce);
      TimeframeUtils.timeframeBuilders.relative.restore();
    });
  });

  describe('timeframeBuilders', function () {
    describe('absolute', function () {
      it('should properly build a timeframe object', function () {
        var time = {
          start: new Date(moment().subtract(1, 'days').startOf('day').format()),
          end: new Date(moment().startOf('day').format())
        };
        var timeframe = TimeframeUtils.getTimeframe(time, 'US/Hawaii');

        var expectedFormat = 'YYYY-MM-DDTHH:mm:ss.SSS';
        var expectedStart = moment(new Date(time.start)).format(expectedFormat);
        var expectedEnd = moment(new Date(time.end)).format(expectedFormat);

        assert.deepEqual(timeframe, {
          start: expectedStart,
          end: expectedEnd
        });
      });
    });
    describe('relative', function () {
      var time = {
        relativity: 'this',
        amount: '1',
        sub_timeframe: 'days'
      };

      var timeframe = TimeframeUtils.getTimeframe(time);
      assert.deepEqual(timeframe, 'this_1_days');
    });
  });

  describe('unpackTimeframeParam', function () {
    it('properly unpacks an absolute timeframe', function () {
      var timeframe = {
        start: moment(new Date("June 7, 2015 1:00 PM")).format('YYYY-MM-DDTHH:mm:ss.SSS')+"-10:00",
        end: moment(new Date("June 8, 2015 2:00 PM")).format('YYYY-MM-DDTHH:mm:ss.SSS')+"-10:00"
      };

      console.log(timeframe.start);

      assert.deepEqual(
        TimeframeUtils.unpackTimeframeParam(timeframe, 'US/Hawaii'),
        {
          timezone: 'US/Hawaii',
          time: {
            start: "2015-06-07T13:00:00.000",
            end: "2015-06-08T14:00:00.000"
          }
        }
      );
    });
    it('properly unpacks a relative timeframe', function () {
      var unpacked = TimeframeUtils.unpackTimeframeParam('this_8_days', 'Europe/London');

      assert.deepEqual(unpacked, {
        time: {
          relativity: 'this',
          amount: '8',
          sub_timeframe: 'days'
        },
        timezone: 'Europe/London'
      });
    });
  });

  describe('timeframeType', function() {
    it('recognizes relative timeframes', function() {
      var relative_timeframe = {
        relativity: 'this',
        amount: '8',
        sub_timeframe: 'days'
      }

      assert.equal(TimeframeUtils.timeframeType(relative_timeframe), 'relative');
    });

    it('recognizes absolute timeframes', function() {
      var absolute_timeframe = {
        start: moment().subtract(2, 'days').format(),
        end: moment().subtract(1, 'days').format()
      }

      assert.equal(TimeframeUtils.timeframeType(absolute_timeframe), 'absolute');
    });

    describe('invalid timeframes', function() {
      it('throws error for invalid time object', function() {
        expect(TimeframeUtils.timeframeType.bind(window, {bee: 'boop'})).to.throw("Invalid timeframe type: invalid time value.");
      });

      it('throws errors for non-object time objects', function() {
        expect(TimeframeUtils.timeframeType.bind(window, 'this_3_days')).to.throw("Invalid timeframe type: not a plain object.");
      })
    });
  });

  describe('getTimeParameters', function () {
    it('returns whatever getTimeframe responds with', function () {
      var expectedResult = {cool: 'dude'};

      var stub = sinon.stub(TimeframeUtils, 'getTimeframe').returns(expectedResult);
      sinon.stub(TimeframeUtils, 'timeframeType').returns('absolute');

      assert.deepPropertyVal(TimeframeUtils.getTimeParameters({}, 'US/Hawaii'), 'timeframe', expectedResult);

      TimeframeUtils.getTimeframe.restore();
      TimeframeUtils.timeframeType.restore();
    });

    it('returns the same timezone if the timeframeType is relative', function () {
      var stub = sinon.stub(TimeframeUtils, 'timeframeType').returns('relative');

      assert.deepPropertyVal(TimeframeUtils.getTimeParameters({
        relativity: 'this',
        amount: 1,
        sub_timeframe: 'days'
      }, 'US/Hawaii'), 'timezone', 'US/Hawaii');

      TimeframeUtils.timeframeType.restore();
    });

    it('returns null timeframe with default timezone if passed undefined values', function () {
      assert.deepEqual(TimeframeUtils.getTimeParameters(), {
        timeframe: null,
        timezone: 'UTC'
      });
    });
  });

});
