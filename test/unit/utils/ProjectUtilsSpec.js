import TestHelpers from '../../support/TestHelpers';
import ProjectActions from '../../../lib/js/app/actions/ProjectActions';
import ProjectUtils from '../../../lib/js/app/utils/ProjectUtils';

describe('utils/ProjectUtils', () => {

  it('exists', () => {
    expect(ProjectUtils).not.toBe(undefined);
  });

  describe('getConstant', () => {
    it('should return the a project constant', () => {
      const expectedAnalyisTypes = [
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
      expect(ProjectUtils.getConstant('ANALYSIS_TYPES')).toEqual(expectedAnalyisTypes);
    });
  });

  describe('getPropertyType', () => {
    let project;
    beforeAll(() => {
      project = { schema: TestHelpers.buildProjectSchema() };
    });

    it('should return the right type of property if it exists ', () => {
      expect(ProjectUtils.getPropertyType(project, 'click', 'numProp')).toEqual('num');
      expect(ProjectUtils.getPropertyType(project, 'click', 'geoProp')).toEqual('geo');
      expect(ProjectUtils.getPropertyType(project, 'click', 'listProp')).toEqual('list');
    });

  });

});
