
let sinon from 'sinon/pkg/sinon.js');
var QueryStringUtils from '../../../lib/js/app/utils/QueryStringUtils');

describe('utils/QueryStringUtils', () => {
  
  describe('getQueryAttributes', () => {
    
    it('should properly parse funnel step filters', () => {
      sinon.stub(QueryStringUtils, 'getSearchString').returns('query[steps][0][filters][0][property_value][0]=testing');
      assert.sameMembers(QueryStringUtils.getQueryAttributes().query.steps[0].filters[0].property_value, ['testing']);
      QueryStringUtils.getSearchString.restore();
    });

  });

});
