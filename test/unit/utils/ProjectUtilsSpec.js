var assert = require('chai').assert;
var sinon = require('sinon');
var TestHelpers = require('../../support/TestHelpers');
var ProjectActions = require('../../../client/js/app/actions/ProjectActions');
var ProjectUtils = require('../../../client/js/app/utils/ProjectUtils');

describe('utils/ProjectUtils', function() {

  it('exists', function(){
    assert.isDefined(ProjectUtils);
  });

  describe('getConstant', function() {
    it('should return the a project constant', function(){
      var expectedAnalyisTypes = [
        'sum',
        'count',
        'count_unique',
        'minimum',
        'maximum',
        'average',
        'select_unique',
        'extraction',
        'percentile',
        'median',
        'funnel'
      ];
      assert.sameMembers(ProjectUtils.getConstant('ANALYSIS_TYPES'), expectedAnalyisTypes);
    });
  });

  describe('constants', function () {
    describe('filter operators', function () {
      describe('eq', function () {
        xit('should return the right coercion types', function () {
          
        });
      });
    });
  });

  describe('getPropertyType', function () {
    before(function () {
      this.project = { schema: TestHelpers.buildProjectSchema() };
    });

    it('should return the right type of property if it exists ', function () {
      assert.strictEqual(ProjectUtils.getPropertyType(this.project, 'click', 'numProp'), 'num');
      assert.strictEqual(ProjectUtils.getPropertyType(this.project, 'click', 'geoProp'), 'geo');
      assert.strictEqual(ProjectUtils.getPropertyType(this.project, 'click', 'listProp'), 'list');
    });
    
  });

});