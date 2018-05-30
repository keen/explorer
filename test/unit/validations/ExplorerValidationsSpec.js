
var _ from 'lodash');
let sinon from 'sinon/pkg/sinon.js');
var moment from 'moment');
var TestHelpers from '../../support/TestHelpers');
var RunValidations from '../../../lib/js/app/utils/RunValidations');
var ExplorerValidations from '../../../lib/js/app/validations/ExplorerValidations');

describe('validations/ExplorerValidations', () => {

  describe('explorer query validations', () => {

    describe('refresh_rate validations', () => {
      it('has an error message', () => {
        var errorMessage = ExplorerValidations.refresh_rate.msg;
        assert.equal(errorMessage, 'Refresh rate must be between 4 and 24 hours.');
      });

      it('returns true when refresh rate is between 4 and 24 hours or 0', () => {
        assert.isTrue(ExplorerValidations.refresh_rate.validate({
          refresh_rate: 0
        }));
        assert.isTrue(ExplorerValidations.refresh_rate.validate({
          refresh_rate: 1440
        }));
        assert.isTrue(ExplorerValidations.refresh_rate.validate({
          refresh_rate: 2000
        }));
      });

      it('returns false when refresh_rate is out of range', () => {
        assert.isFalse(ExplorerValidations.refresh_rate.validate({
          refresh_rate: 1000
        }));
        assert.isFalse(ExplorerValidations.refresh_rate.validate({
          refresh_rate: 90000
        }));
      });
    });

    describe('query name', () => {
      it('has an error message', () => {
        var errorMessage = ExplorerValidations.query_name.msg;
        assert.equal(errorMessage, 'You must give your saved query a name.');
      });

      it('returns true even when the value is not valid when saving is false', () => {
        var explorer = TestHelpers.createExplorerModel();
        explorer.saving = false;
        explorer.query_name = '';
        RunValidations.run({ query_name: ExplorerValidations.query_name }, explorer);
        assert.strictEqual(explorer.errors.length, 0);
      });

      it('returns false when the value is not valid when saving is true', () => {
        var explorer = TestHelpers.createExplorerModel();
        explorer.saving = true;
        explorer.query_name = '';
        RunValidations.run({ query_name: ExplorerValidations.query_name }, explorer)
        assert.strictEqual(explorer.errors.length, 1);
      });

      it('returns true when name is present', () => {
        assert.isTrue(ExplorerValidations.query_name.validate({ saving: true, query_name: 'a satisfactory value' }));
      });

      it('returns false when name is an empty string', () => {
        assert.isFalse(ExplorerValidations.query_name.validate({ saving: true, query_name: '' }));
      });

      it('returns false when name is a null', () => {
        assert.isFalse(ExplorerValidations.query_name.validate({ saving: true, query_name: null }));
      });

      it('returns false when name is a undefined', () => {
        assert.isFalse(ExplorerValidations.query_name.validate({ saving: true, query_name: undefined }));
      });
    });

    describe('analysis_type', () => {
      it('has an error message', () => {
        var errorMessage = ExplorerValidations.analysis_type.msg;
        assert.equal(errorMessage, 'Choose an Analysis Type.');
      });

      it('returns true when analysis_type is present', () => {
        assert.isTrue(ExplorerValidations.analysis_type.validate({ query: { analysis_type: 'value' } }));
      });

      it('returns false when analysis_type is falsy', () => {
        assert.isFalse(ExplorerValidations.analysis_type.validate({ query: { analysis_type: '' } }));
      });
    });

    describe('event_collection', () => {
      it('shouldRun is false when the analysis_type is funnel', () => {
        assert.isFalse(ExplorerValidations.event_collection.shouldRun({ query: { analysis_type: 'funnel' } }));
      });
      it('shouldRun is true when the analysis_type is not', () => {
        assert.isTrue(ExplorerValidations.event_collection.shouldRun({ query: { analysis_type: 'count' } }));
      });
    });

    describe('percentile_value', () => {
      it('has an error message', () => {
        var errorMessage = ExplorerValidations.percentile_value.msg;
        assert.equal(errorMessage, 'Choose a Percentile Value.');
      });

      it('returns true when a percentile value is present', () => {
        assert.isTrue(ExplorerValidations.percentile_value.validate({ query: { percentile: 50 } }));
      });

      it('returns false when there is no percentile value', () => {
        assert.isFalse(ExplorerValidations.percentile_value.validate({ query: { percentile: null } }));
      });
    });

    describe('filters', () => {
      describe('when query has invalid filters', () => {
        it('has an error message', () => {
          var errorMessage = ExplorerValidations.filters.msg;
          assert.equal(errorMessage, 'One of your filters is invalid.');
        });
      });

      describe('when query has valid filters', () => {
        it('returns true', () => {
          var filters = [
            {
              property_name: 'click',
              operator: 'eq',
              coercion_type: 'String',
              property_value: 'test string'
            }
          ];
          assert.isTrue(ExplorerValidations.filters.validate({ query: { filters: filters } }));
        });
      });

      describe('when the query has an invalid filter', () => {
        it('returns false', () => {
          var filters = [
            {
              property_name: 'click',
              operator: 'eq',
              coercion_type: 'Number',
              property_value: 'yoyoyo'
            }
          ];
          assert.isFalse(ExplorerValidations.filters.validate({ query: { filters: filters } }));
        });
      });

      describe('when query has no filters', () => {
        it('returns true', () => {
          assert.isTrue(ExplorerValidations.filters.validate({ query: { filters: [] } }));
        });
      });
    });
  });

  describe('email extraction field validations', () => {

    describe('email', () => {
      it("returns true when email has @ and .", () => {
        assert.isTrue(ExplorerValidations.email.validate({ query: { email: "keen@example.com" } }));
      });

      it('returns false when email is missing @ or .', () => {
        assert.isFalse(ExplorerValidations.email.validate({ query: { email: "keen@examplecom" } }));
        assert.isFalse(ExplorerValidations.email.validate({ query: { email: "keen!example.com" } }));
        assert.isFalse(ExplorerValidations.email.validate({ query: { email: "keen#example.com" } }));
        assert.isFalse(ExplorerValidations.email.validate({ query: { email: "keen$example.com" } }));
      });
    });

    describe('latest', () => {
      describe('evaluates strings correctly', () => {
        it('should return true for 10', () => {
          assert.isTrue(ExplorerValidations.latest.validate({ query: { latest: '10' } }));
        });

        it('should return false for 10.1', () => {
          assert.isFalse(ExplorerValidations.latest.validate({ query: { latest: '10.1' } }));
        });

        it('should return false for 10.00', () => {
          assert.isFalse(ExplorerValidations.latest.validate({ query: { latest: '10.00' } }));
        });
      });
    });
  });

  describe('Nested validations', () => {

    it('should set validation properties on filters', () => {
      var model = TestHelpers.createExplorerModel();
      model.query.event_collection = '';
      model.query.analysis_type = 'count';

      var filter1 = TestHelpers.createFilter();
      filter1.property_name = '';
      filter1.property_value = '';
      model.query.filters.push(filter1);

      var filter2 = TestHelpers.createFilter();
      filter2.property_name = 'name';
      filter2.operator = '';
      filter2.property_value = 'value';
      model.query.filters.push(filter2);

      RunValidations.run(ExplorerValidations, model);

      assert.isFalse(model.isValid);
      assert.strictEqual(model.errors.length, 2, 'Root model');

      assert.isFalse(model.query.filters[0].isValid);
      assert.strictEqual(model.query.filters[0].errors.length, 1);

      assert.isFalse(model.query.filters[1].isValid);
      assert.strictEqual(model.query.filters[1].errors.length, 1);
    });

    it('should set validation properties on steps and their filters', () => {
      var model = TestHelpers.createExplorerModel();
      model.query.event_collection = 'some collection';
      model.query.analysis_type = 'funnel';

      var step1 = TestHelpers.createStep();
      step1.event_collection = 'colletion';
      step1.actor_property = 'property';

      var filter1 = TestHelpers.createFilter();
      filter1.property_name = '';
      filter1.property_value = 'count';
      step1.filters.push(filter1)

      var filter2 = TestHelpers.createFilter();
      filter2.property_name = 'name';
      filter2.property_value = 'value';
      step1.filters.push(filter2);

      model.query.steps.push(step1);

      var step2 = TestHelpers.createStep();
      step2.event_collection = 'colletion';
      step2.actor_property = '';

      var filter3 = TestHelpers.createFilter();
      filter3.property_name = '';
      filter3.property_value = '';
      step2.filters.push(filter3)

      var filter4 = TestHelpers.createFilter();
      filter4.property_name = 'name';
      filter4.property_value = 'value';
      step2.filters.push(filter4);

      model.query.steps.push(step2);

      RunValidations.run(ExplorerValidations, model);

      var steps = model.query.steps;
      assert.isFalse(model.isValid, 'root model');
      assert.isFalse(steps[0].isValid, 'first step');
      assert.isFalse(steps[1].isValid, 'second setp');
      assert.isFalse(steps[0].filters[0].isValid, 'first filter of first step');
      assert.isTrue(steps[0].filters[1].isValid, 'second filter of first step');
      assert.isFalse(steps[1].filters[0].isValid, 'first filter of second step');
      assert.isTrue(steps[1].filters[1].isValid, 'second filter of secon step');

      assert.strictEqual(model.errors.length, 1);
      assert.strictEqual(steps[0].errors.length, 1);
      assert.strictEqual(steps[1].errors.length, 2);
      assert.strictEqual(steps[0].filters[0].errors.length, 1);
      assert.strictEqual(steps[0].filters[1].errors.length, 0);
      assert.strictEqual(steps[1].filters[0].errors.length, 1);
      assert.strictEqual(steps[1].filters[1].errors.length, 0);
    });

  });
});
