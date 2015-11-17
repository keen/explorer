var assert = require('chai').assert;
var expect = require('chai').expect;
var sinon = require('sinon');
var TimeframeUtils = require('../../../client/js/app/utils/TimeframeUtils');

describe('utils/TimeframeUtils', function () {
  describe('getTimeframe', function () {
    it('should call the right timeframe builder for absolute timeframes', function () {
      var explorer = {
        query: {
          timezone: 'US/Hawaii',
          time: {
            start: new Date(moment().subtract(1, 'days').startOf('day').format()),
            end: new Date(moment().startOf('day').format())
          }
        }
      };
      var stub = sinon.stub(ExplorerUtils.timeframeBuilders, 'absolute_timeframe');
      ExplorerUtils.getTimeframe(explorer);
      assert.isTrue(stub.calledOnce);
      ExplorerUtils.timeframeBuilders.absolute_timeframe.restore();
    });
    it('should call the right timeframe builder for relative timeframes', function () {
      var explorer = {
        query: {
          time: {
            relativity: 'this',
            amount: '1',
            sub_timeframe: 'days'
          }
        }
      };
      var stub = sinon.stub(ExplorerUtils.timeframeBuilders, 'relative_timeframe');
      ExplorerUtils.getTimeframe(explorer);
      assert.isTrue(stub.calledOnce);
      ExplorerUtils.timeframeBuilders.relative_timeframe.restore();
    });
  });

  describe('timeframeBuilders', function () {
    describe('absolute_timeframe', function () {
      it('should properly build a timeframe object', function () {
        var explorer = {
          query: {
            timezone: 'US/Hawaii',
            time: {
              start: new Date(moment().subtract(1, 'days').startOf('day').format()),
              end: new Date(moment().startOf('day').format())
            }
          }
        };
        var timeframe = ExplorerUtils.getTimeframe(explorer);
        var expectedFormat = 'YYYY-MM-DDTHH:mm:ss.SSS';
        var expectedTimezone = '-10:00'
        var expectedStart = moment(new Date(explorer.query.time.start)).format(expectedFormat) + expectedTimezone;
        var expectedEnd = moment(new Date(explorer.query.time.end)).format(expectedFormat) + expectedTimezone;
        
        assert.deepEqual(timeframe, {
          start: expectedStart,
          end: expectedEnd
        });
      });
    });
    describe('relative_timeframe', function () {
      var explorer = {
        query: {
          time: {
            relativity: 'this',
            amount: '1',
            sub_timeframe: 'days'
          }
        }
      };
      var timeframe = ExplorerUtils.getTimeframe(explorer);
      assert.deepEqual(timeframe, 'this_1_days');
    });
  });

  describe('unpackTimeframeParam', function () {
    it('properly unpacks an absolute timeframe', function () {
      var query = {
        timeframe: {
          start: moment(new Date("June 7, 2015 1:00 PM")).format('YYYY-MM-DDTHH:mm:ss.SSS')+"-10:00",
          end: moment(new Date("June 8, 2015 2:00 PM")).format('YYYY-MM-DDTHH:mm:ss.SSS')+"-10:00"
        }
      };
      assert.deepEqual(ExplorerUtils.unpackTimeframeParam(query), {
        timezone: 'US/Hawaii',
        time: {
          start: ExplorerUtils.convertDateToUTC(new Date(moment(new Date("June 7, 2015 1:00 PM")).format('YYYY-MM-DDTHH:mm:ss.SSS'))),
          end: ExplorerUtils.convertDateToUTC(new Date(moment(new Date("June 8, 2015 2:00 PM")).format('YYYY-MM-DDTHH:mm:ss.SSS')))
        }
      });
    });
    it('properly unpacks a relative timeframe', function () {
      var query = { timeframe: 'this_8_days', timezone: 'Europe/London' };
      var unpacked = ExplorerUtils.unpackTimeframeParam(query);
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

      assert.equal(ExplorerUtils.timeframeType(relative_timeframe), 'relative');
    });

    it('recognizes absolute timeframes', function() {
      var absolute_timeframe = {
        start: moment().subtract(2, 'days').format(),
        end: moment().subtract(1, 'days').format()
      }

      assert.equal(ExplorerUtils.timeframeType(absolute_timeframe), 'absolute');
    });

    describe('invalid timeframes', function() {
      it('throws error for invalid time object', function() {
        expect(ExplorerUtils.timeframeType.bind(window, {bee: 'boop'})).to.throw("Invalid time value");
      });

      it('throws errors for non-object time objects', function() {
        expect(ExplorerUtils.timeframeType.bind(window, 'this_3_days')).to.throw("Invalid time value");
      })
    });
  });

  describe('getTimeParameters', function () {
    it('returns whatever getTimeframe responds with', function () {
      var expectedResult = {cool: 'dude'};

      var stub = sinon.stub(TimeframeUtils, 'getTimeframe').returns(expectedResult);

      assert.deepEqual(ExplorerUtils.getTimeParameters({}, 'US/Hawaii'), 'timeframe', expectedResult);

      TimeframeUtils.getTimeframe.restore();
    });

    it('returns the same timezone if the timeframeType is relative', function () {
      var stub = sinon.stub(TimeframeUtils, 'timeframeType').returns('relative');

      assert.deepEqual(ExplorerUtils.getTimeParameters({
        relativity: 'this',
        amount: 1,
        sub_timeframe: 'days'
      }, 'US/Hawaii'), 'timezone', 'US/Hawaii');

      TimeframeUtils.timeframeType.restore();
    });

    it('returns a null timezone for absolute timeframe', function () {
      var stub = sinon.stub(TimeframeUtils, 'timeframeType').returns('absolute');

      assert.deepEqual(ExplorerUtils.getTimeParameters({
        relativity: 'this',
        amount: 1,
        sub_timeframe: 'days'
      }, 'US/Hawaii'), 'timezone', null);

      TimeframeUtils.timeframeType.restore();
    });
  });

});
