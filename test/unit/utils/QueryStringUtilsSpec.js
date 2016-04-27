var assert = require('chai').assert;
var sinon = require('sinon');
var QueryStringUtils = require('../../../client/js/app/utils/QueryStringUtils');

describe('utils/QueryStringUtils', function() {
  
  describe('getQueryAttributes', function() {
    
    it('should properly parse funnel step filters', function () {
      sinon.stub(QueryStringUtils, 'getSearchString').returns('query[steps][0][filters][0][property_value][0]=testing');
      assert.sameMembers(QueryStringUtils.getQueryAttributes().query.steps[0].filters[0].property_value, ['testing']);
      QueryStringUtils.getSearchString.restore();
    });

  });

});
