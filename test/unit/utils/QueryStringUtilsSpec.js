import QueryStringUtils from '../../../lib/js/app/utils/QueryStringUtils';

describe('utils/QueryStringUtils', () => {

  describe('getQueryAttributes', () => {

    it('should properly parse funnel step filters', () => {
      const spy = jest.spyOn(QueryStringUtils, 'getSearchString').mockReturnValue('query[steps][0][filters][0][property_value][0]=testing');
      expect(QueryStringUtils.getQueryAttributes().query.steps[0].filters[0].property_value).toEqual(['testing']);
      spy.mockRestore();
    });

  });

});
