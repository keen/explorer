var assert = require('chai').assert;
var expect = require('chai').expect;
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

  describe('getEventCollectionProperties', function(){
    before(function () {
      this.project = { schema: TestHelpers.buildProjectSchema() };
    });

    it('should return an array of properties for a collection which exists', function () {
      var properties = {
        'stringProp': 'string',
        'datetimeProp': 'datetime',
        'numProp': 'num',
        'nullProp': 'null',
        'boolProp': 'bool',
        'listProp': 'list',
        'geoProp': 'geo'
      };
      assert.deepEqual(ProjectUtils.getEventCollectionProperties(this.project, 'click'), properties);
    });

    it('should return an empty object if the collection does not exist', function () {
      assert.deepEqual(ProjectUtils.getEventCollectionProperties(this.project, 'wrong-prop-friend'), {});
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