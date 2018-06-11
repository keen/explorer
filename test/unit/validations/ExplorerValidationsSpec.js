import _ from 'lodash';
import TestHelpers from '../../support/TestHelpers';
import RunValidations from '../../../lib/js/app/utils/RunValidations';
import ExplorerValidations from '../../../lib/js/app/validations/ExplorerValidations';

describe('validations/ExplorerValidations', () => {

  describe('explorer query validations', () => {

    describe('refresh_rate validations', () => {
      it('has an error message', () => {
        const errorMessage = ExplorerValidations.refresh_rate.msg;
        expect(errorMessage).toEqual('Refresh rate must be between 4 and 24 hours.');
      });

      it('returns true when refresh rate is between 4 and 24 hours or 0', () => {
        expect(ExplorerValidations.refresh_rate.validate({
          refresh_rate: 0
        })).toBe(true);
        expect(ExplorerValidations.refresh_rate.validate({
          refresh_rate: 1440
        })).toBe(true);
        expect(ExplorerValidations.refresh_rate.validate({
          refresh_rate: 2000
        })).toBe(true);
      });

      it('returns false when refresh_rate is out of range', () => {
        expect(ExplorerValidations.refresh_rate.validate({
          refresh_rate: 1000
        })).toBe(false);
        expect(ExplorerValidations.refresh_rate.validate({
          refresh_rate: 90000
        })).toBe(false);
      });
    });

    describe('query name', () => {
      it('has an error message', () => {
        const errorMessage = ExplorerValidations.query_name.msg;
        expect(errorMessage).toEqual('You must give your saved query a name.');
      });

      it('returns true even when the value is not valid when saving is false', () => {
        const explorer = TestHelpers.createExplorerModel();
        explorer.saving = false;
        explorer.query_name = '';
        RunValidations.run({ query_name: ExplorerValidations.query_name }, explorer);
        expect(explorer.errors).toHaveLength(0);
      });

      it('returns false when the value is not valid when saving is true', () => {
        const explorer = TestHelpers.createExplorerModel();
        explorer.saving = true;
        explorer.query_name = '';
        RunValidations.run({ query_name: ExplorerValidations.query_name }, explorer)
        expect(explorer.errors).toHaveLength(1);
      });

      it('returns true when name is present', () => {
        expect(ExplorerValidations.query_name.validate({ saving: true, query_name: 'a satisfactory value' })).toBe(true);
      });

      it('returns false when name is an empty string', () => {
        expect(ExplorerValidations.query_name.validate({ saving: true, query_name: '' })).toBe(false);
      });

      it('returns false when name is a null', () => {
        expect(ExplorerValidations.query_name.validate({ saving: true, query_name: null })).toBe(false);
      });

      it('returns false when name is a undefined', () => {
        expect(ExplorerValidations.query_name.validate({ saving: true, query_name: undefined })).toBe(false);
      });
    });

    describe('analysis_type', () => {
      it('has an error message', () => {
        const errorMessage = ExplorerValidations.analysis_type.msg;
        expect(errorMessage).toEqual('Choose an Analysis Type.');
      });

      it('returns true when analysis_type is present', () => {
        expect(ExplorerValidations.analysis_type.validate({ query: { analysis_type: 'value' } })).toBe(true);
      });

      it('returns false when analysis_type is falsy', () => {
        expect(ExplorerValidations.analysis_type.validate({ query: { analysis_type: '' } })).toBe(false);
      });
    });

    describe('event_collection', () => {
      it('shouldRun is false when the analysis_type is funnel', () => {
        expect(ExplorerValidations.event_collection.shouldRun({ query: { analysis_type: 'funnel' } })).toBe(false);
      });
      it('shouldRun is true when the analysis_type is not', () => {
        expect(ExplorerValidations.event_collection.shouldRun({ query: { analysis_type: 'count' } })).toBe(true);
      });
    });

    describe('percentile_value', () => {
      it('has an error message', () => {
        const errorMessage = ExplorerValidations.percentile_value.msg;
        expect(errorMessage).toEqual('Choose a Percentile Value.');
      });

      it('returns true when a percentile value is present', () => {
        expect(ExplorerValidations.percentile_value.validate({ query: { percentile: 50 } })).toBe(true);
      });

      it('returns false when there is no percentile value', () => {
        expect(ExplorerValidations.percentile_value.validate({ query: { percentile: null } })).toBe(false);
      });
    });

    describe('filters', () => {
      describe('when query has invalid filters', () => {
        it('has an error message', () => {
          const errorMessage = ExplorerValidations.filters.msg;
          expect(errorMessage).toEqual('One of your filters is invalid.');
        });
      });

      describe('when query has valid filters', () => {
        it('returns true', () => {
          const filters = [
            {
              property_name: 'click',
              operator: 'eq',
              coercion_type: 'String',
              property_value: 'test string'
            }
          ];
          expect(ExplorerValidations.filters.validate({ query: { filters: filters } })).toBe(true);
        });
      });

      describe('when the query has an invalid filter', () => {
        it('returns false', () => {
          const filters = [
            {
              property_name: 'click',
              operator: 'eq',
              coercion_type: 'Number',
              property_value: 'yoyoyo'
            }
          ];
          expect(ExplorerValidations.filters.validate({ query: { filters: filters } })).toBe(false);
        });
      });

      describe('when query has no filters', () => {
        it('returns true', () => {
          expect(ExplorerValidations.filters.validate({ query: { filters: [] } })).toBe(true);
        });
      });
    });
  });

  describe('email extraction field validations', () => {

    describe('email', () => {
      it("returns true when email has @ and .", () => {
        expect(ExplorerValidations.email.validate({ query: { email: "keen@example.com" } })).toBe(true);
      });

      it('returns false when email is missing @ or .', () => {
        expect(ExplorerValidations.email.validate({ query: { email: "keen@examplecom" } })).toBe(false);
        expect(ExplorerValidations.email.validate({ query: { email: "keen!example.com" } })).toBe(false);
        expect(ExplorerValidations.email.validate({ query: { email: "keen#example.com" } })).toBe(false);
        expect(ExplorerValidations.email.validate({ query: { email: "keen$example.com" } })).toBe(false);
      });
    });

    describe('latest', () => {
      describe('evaluates strings correctly', () => {
        it('should return true for 10', () => {
          expect(ExplorerValidations.latest.validate({ query: { latest: '10' } })).toBe(true);
        });

        it('should return false for 10.1', () => {
          expect(ExplorerValidations.latest.validate({ query: { latest: '10.1' } })).toBe(false);
        });

        it('should return false for 10.00', () => {
          expect(ExplorerValidations.latest.validate({ query: { latest: '10.00' } })).toBe(false);
        });
      });
    });
  });

  describe('Nested validations', () => {

    it('should set validation properties on filters', () => {
      const model = TestHelpers.createExplorerModel();
      model.query.event_collection = '';
      model.query.analysis_type = 'count';

      const filter1 = TestHelpers.createFilter();
      filter1.property_name = '';
      filter1.property_value = '';
      model.query.filters.push(filter1);

      const filter2 = TestHelpers.createFilter();
      filter2.property_name = 'name';
      filter2.operator = '';
      filter2.property_value = 'value';
      model.query.filters.push(filter2);

      RunValidations.run(ExplorerValidations, model);

      expect(model.isValid).toBe(false);
      expect(model.errors).toHaveLength(2);

      expect(model.query.filters[0].isValid).toBe(false);
      expect(model.query.filters[0].errors).toHaveLength(1);

      expect(model.query.filters[1].isValid).toBe(false);
      expect(model.query.filters[1].errors).toHaveLength(1);
    });

    it('should set validation properties on steps and their filters', () => {
      const model = TestHelpers.createExplorerModel();
      model.query.event_collection = 'some collection';
      model.query.analysis_type = 'funnel';

      const step1 = TestHelpers.createStep();
      step1.event_collection = 'colletion';
      step1.actor_property = 'property';

      const filter1 = TestHelpers.createFilter();
      filter1.property_name = '';
      filter1.property_value = 'count';
      step1.filters.push(filter1)

      const filter2 = TestHelpers.createFilter();
      filter2.property_name = 'name';
      filter2.property_value = 'value';
      step1.filters.push(filter2);

      model.query.steps.push(step1);

      const step2 = TestHelpers.createStep();
      step2.event_collection = 'colletion';
      step2.actor_property = '';

      const filter3 = TestHelpers.createFilter();
      filter3.property_name = '';
      filter3.property_value = '';
      step2.filters.push(filter3)

      const filter4 = TestHelpers.createFilter();
      filter4.property_name = 'name';
      filter4.property_value = 'value';
      step2.filters.push(filter4);

      model.query.steps.push(step2);

      RunValidations.run(ExplorerValidations, model);

      const steps = model.query.steps;
      expect(model.isValid).toBe(false);
      expect(steps[0].isValid).toBe(false);
      expect(steps[1].isValid).toBe(false);
      expect(steps[0].filters[0].isValid).toBe(false);
      expect(steps[0].filters[1].isValid).toBe(true);
      expect(steps[1].filters[0].isValid).toBe(false);
      expect(steps[1].filters[1].isValid).toBe(true);

      expect(model.errors).toHaveLength(1);
      expect(steps[0].errors).toHaveLength(1);
      expect(steps[1].errors).toHaveLength(2);
      expect(steps[0].filters[0].errors).toHaveLength(1);
      expect(steps[0].filters[1].errors).toHaveLength(0);
      expect(steps[1].filters[0].errors).toHaveLength(1);
      expect(steps[1].filters[1].errors).toHaveLength(0);
    });

  });
});
