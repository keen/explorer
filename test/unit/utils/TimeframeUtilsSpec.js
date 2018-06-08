import moment from 'moment';
import TimeframeUtils from '../../../lib/js/app/utils/TimeframeUtils';

describe('utils/TimeframeUtils', () => {

  describe('getTimeframe', () => {
    it('should call the right timeframe builder for absolute timeframes', () => {
      const time = {
        start: new Date(moment().subtract(1, 'days').startOf('day').format()),
        end: new Date(moment().startOf('day').format())
      };
      const stub = jest.spyOn(TimeframeUtils.timeframeBuilders, 'absolute');

      TimeframeUtils.getTimeframe(time, 'US/Hawaii');
      expect(stub).toHaveBeenCalledTimes(1);
      stub.mockRestore();
    });
    it('should call the right timeframe builder for relative timeframes', () => {
      const time = {
        relativity: 'this',
        amount: '1',
        sub_timeframe: 'days'
      };
      const stub = jest.spyOn(TimeframeUtils.timeframeBuilders, 'relative');

      TimeframeUtils.getTimeframe(time);
      expect(stub).toHaveBeenCalledTimes(1);
      stub.mockRestore();
    });
  });

  describe('timeframeBuilders', () => {
    describe('absolute', () => {
      it('should properly build a timeframe object', () => {
        const time = {
          start: new Date(moment().subtract(1, 'days').startOf('day').format()),
          end: new Date(moment().startOf('day').format())
        };
        const timeframe = TimeframeUtils.getTimeframe(time, 'US/Hawaii');

        const expectedFormat = 'YYYY-MM-DDTHH:mm:ss.SSS';
        const expectedStart = moment(new Date(time.start)).format(expectedFormat);
        const expectedEnd = moment(new Date(time.end)).format(expectedFormat);

        expect(timeframe).toEqual({
          start: expectedStart,
          end: expectedEnd
        });
      });
    });
    describe('relative', () => {
      const time = {
        relativity: 'this',
        amount: '1',
        sub_timeframe: 'days'
      };

      const timeframe = TimeframeUtils.getTimeframe(time);
      expect(timeframe).toEqual('this_1_days');
    });
  });

  describe('unpackTimeframeParam', () => {
    it('properly unpacks an absolute timeframe', () => {
      const timeframe = {
        start: moment(new Date("June 7, 2015 1:00 PM")).format('YYYY-MM-DDTHH:mm:ss.SSS')+"-10:00",
        end: moment(new Date("June 8, 2015 2:00 PM")).format('YYYY-MM-DDTHH:mm:ss.SSS')+"-10:00"
      };

      console.log(timeframe.start);

      expect(TimeframeUtils.unpackTimeframeParam(timeframe, 'US/Hawaii')).toEqual(
        {
          timezone: 'US/Hawaii',
          time: {
            start: "2015-06-07T13:00:00.000",
            end: "2015-06-08T14:00:00.000"
          }
        }
      );
    });
    it('properly unpacks a relative timeframe', () => {
      const unpacked = TimeframeUtils.unpackTimeframeParam('this_8_days', 'Europe/London');

      expect(unpacked).toEqual({
        time: {
          relativity: 'this',
          amount: '8',
          sub_timeframe: 'days'
        },
        timezone: 'Europe/London'
      });
    });
  });

  describe('timeframeType', () => {
    it('recognizes relative timeframes', () => {
      const relative_timeframe = {
        relativity: 'this',
        amount: '8',
        sub_timeframe: 'days'
      }

      expect(TimeframeUtils.timeframeType(relative_timeframe)).toEqual('relative');
    });

    it('recognizes absolute timeframes', () => {
      const absolute_timeframe = {
        start: moment().subtract(2, 'days').format(),
        end: moment().subtract(1, 'days').format()
      }

      expect(TimeframeUtils.timeframeType(absolute_timeframe)).toEqual('absolute');
    });

    describe('invalid timeframes', () => {
      it('throws error for invalid time object', () => {
        expect(TimeframeUtils.timeframeType.bind(window, {bee: 'boop'})).toThrow("Invalid timeframe type: invalid time value.");
      });

      it('throws errors for non-object time objects', () => {
        expect(TimeframeUtils.timeframeType.bind(window, 'this_3_days')).toThrow("Invalid timeframe type: not a plain object.");
      })
    });
  });

  describe('getTimeParameters', () => {
    it('returns whatever getTimeframe responds with', () => {
      const expectedResult = {cool: 'dude'};

      const stubGetTimeframe = jest.spyOn(TimeframeUtils, 'getTimeframe').mockReturnValue(expectedResult);
      const stubTimeframeType = jest.spyOn(TimeframeUtils, 'timeframeType').mockReturnValue('absolute');

      expect(TimeframeUtils.getTimeParameters({}, 'US/Hawaii').timeframe).toEqual(expectedResult);

      stubGetTimeframe.mockRestore();
      stubTimeframeType.mockRestore();
    });

    it('returns the same timezone if the timeframeType is relative', () => {
      const stub = jest.spyOn(TimeframeUtils, 'timeframeType').mockReturnValue('relative');

      expect(TimeframeUtils.getTimeParameters({
        relativity: 'this',
        amount: 1,
        sub_timeframe: 'days'
      }, 'US/Hawaii').timezone).toEqual('US/Hawaii');

      stub.mockRestore();
    });

    it('returns null timeframe with default timezone if passed undefined values', () => {
      expect(TimeframeUtils.getTimeParameters()).toEqual({
        timeframe: null,
        timezone: 'UTC'
      });
    });
  });

});
