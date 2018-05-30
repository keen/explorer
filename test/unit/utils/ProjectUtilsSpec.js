
let sinon from 'sinon/pkg/sinon.js');
var TestHelpers from '../../support/TestHelpers');
var ProjectActions from '../../../lib/js/app/actions/ProjectActions');
var ProjectUtils from '../../../lib/js/app/utils/ProjectUtils');

describe('utils/ProjectUtils', () => {

  it('exists', () => {
    assert.isDefined(ProjectUtils);
  });

  describe('getConstant', () => {
    it('should return the a project constant', () => {
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

  describe('constants', () => {
    describe('filter operators', () => {
      describe('eq', () => {
        xit('should return the right coercion types', () => {
          
        });
      });
    });
  });

  describe('getPropertyType', () => {
    before(() => {
      this.project = { schema: TestHelpers.buildProjectSchema() };
    });

    it('should return the right type of property if it exists ', () => {
      assert.strictEqual(ProjectUtils.getPropertyType(this.project, 'click', 'numProp'), 'num');
      assert.strictEqual(ProjectUtils.getPropertyType(this.project, 'click', 'geoProp'), 'geo');
      assert.strictEqual(ProjectUtils.getPropertyType(this.project, 'click', 'listProp'), 'list');
    });
    
  });

});