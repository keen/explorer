
var _ from 'lodash');
var moment from 'moment');
let sinon from 'sinon/pkg/sinon.js');
var FilterValueFields from '../../../../lib/js/app/components/common/filter_value_fields.js');
var Geo from '../../../../lib/js/app/components/common/geo.js');
var Datepicker from '../../../../lib/js/app/components/common/datepicker.js');
var ProjectUtils from '../../../../lib/js/app/utils/ProjectUtils.js');
var Select from '../../../../lib/js/app/components/common/select.js');
import React from 'react';
var ReactDOM from 'react-dom');
var TestUtils from 'react-addons-test-utils');
var TestHelpers from '../../../support/TestHelpers');

var datetimeFormat = 'll h:mm A';

describe('components/common/filter_value_fields', () => {

  beforeEach(() => {
    this.project = TestHelpers.createProject();
    this.model = TestHelpers.createExplorerModel();;
    this.model.event_collection = 'click';
    this.handleChangeStub = sinon.stub();
    this.operators = ProjectUtils.getConstant('FILTER_OPERATORS');
    this.filter = {
      property_name: 'propOne',
      operator: 'eq',
      property_value: 'abc',
      coercion_type: 'String'
    };
    this.index = 0;

    this.component = TestUtils.renderIntoDocument(<FilterValueFields filter={this.filter}
                                                                     filterOperators={this.operators}
                                                                     handleChange={this.handleChangeStub} />);
  });

  describe('setup', () => {
    it('is of the right type', () => {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, FilterValueFields));
    });

    describe('Datetime', () => {
      beforeEach(() => {
        this.filter.coercion_type = 'Datetime';
        this.filter.property_value = 'May 15, 2015 10:00 AM';
        var props = _.assign({}, this.component.props, {filter: this.filter});
        this.component = TestHelpers.renderComponent(FilterValueFields, props);
      });

      it('has a Datetime component', () => {
        assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, Datepicker), 1);
      });

      describe('Setting values datetime values', () => {
        it('properly sets the property_value from the date picker', () => {
          this.component.refs['date-value-input'].refs.datepicker.value = 'Jan 1, 2015';
          TestUtils.Simulate.blur(this.component.refs['date-value-input'].refs.datepicker);
          assert.strictEqual(
            moment(this.handleChangeStub.getCall(0).args[1]).format(datetimeFormat),
            "Jan 1, 2015 10:00 AM"
          );
        });
        it('properly sets the properly_value from the time picker', () => {
          var inputNode = this.component.refs['time-value-input'].refs.timepicker.refs.input;
          TestUtils.Simulate.focus(inputNode);
          inputNode.value = '03:47 PM';
          TestUtils.Simulate.blur(inputNode);
          assert.strictEqual(
            moment(this.handleChangeStub.getCall(0).args[1]).format(datetimeFormat),
            "May 15, 2015 3:47 PM"
          );
        });
      });
    });

    describe('Boolean', () => {
      beforeEach(() => {
        var props = _.assign({}, this.component.props, { filter: { coercion_type: 'Boolean' } });
        this.component = TestHelpers.renderComponent(FilterValueFields, props);
      });

      it('has a Select component', () => {
        assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, Select), 2);
      });

      it('has no input tags', () => {
        assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithTag(this.component, 'input'), 0);
      });
    });

    describe('Null', () => {
      beforeEach(() => {
        var props = _.assign({}, this.component.props, { filter: { coercion_type: 'Null' } });
        this.component = TestHelpers.renderComponent(FilterValueFields, props);
      });

      it('has one input', () => {
        assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithTag(this.component, 'input'), 1);
      });

      it('has a readonly input', () => {
        var input = TestUtils.scryRenderedDOMComponentsWithTag(this.component, 'input')[0];
        assert.isTrue(input.readOnly);
      });

      it('the input value has a placeholder of \'null\'', () => {
        var input = TestUtils.scryRenderedDOMComponentsWithTag(this.component, 'input')[0];
        assert.equal(input.placeholder, 'Null');
      });
    });

    describe('Geo', () => {
      beforeEach(() => {
        var props = _.assign({}, this.component.props, { filter: {
          property_name: 'geoProp',
          coercion_type: 'Geo',
          operator: 'within',
          property_value: {
            coordinates: [],
            max_distance_miles: null
          }
        }});
        this.component = TestHelpers.renderComponent(FilterValueFields, props);
        sinon.stub(ProjectUtils, 'getPropertyType');
      });

      afterEach(() => {
        ProjectUtils.getPropertyType.restore();
      });

      it('has a Geo component', () => {
        assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, Geo), 1);
      });

      it('has 3 inputs for geo-location query data', () => {
        assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithTag(this.component, 'input'), 3);
      });
    });

    describe('not Boolean or Datetime or Null', () => {
      beforeEach(() => {
        var props = _.assign({}, this.component.props, {
          filter: { coercion_type: 'String' }
        });
        this.component = TestHelpers.renderComponent(FilterValueFields, props);
      });

      it('does not have a Datetime component', () => {
        assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, Datepicker), 0);
      });

      it('has one input', () => {
        assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithTag(this.component, 'input'), 1);
      });

      it('has one select', () => {
        assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, Select), 1);
      });
    });

    describe('available coercion types', () => {
      describe('when property type is not geo', () => {
        it('has all the coercion types', () => {
          var defaultCoercionOptions = ['String', 'Number', 'Null', 'List', 'Boolean', 'Datetime']

          var props = _.assign({}, this.component.props, {
            filter: { operator: 'eq' }
          });
          this.component = TestHelpers.renderComponent(FilterValueFields, props);

          var coercionTypeSelect = TestUtils.scryRenderedDOMComponentsWithTag(this.component, 'select')[0];
          var coercionOptions = _.map(coercionTypeSelect.childNodes, function(node){
            return node.value;
          });
          coercionOptions = _.compact(coercionOptions);

          assert.sameMembers(defaultCoercionOptions, coercionOptions);
        });
      });
    });
    describe('available property value options when Boolean', () => {
      it('is true or false', () => {
        const props = _.assign({}, this.component.props, {
          filter: { operator: 'exists', coercion_type: 'Boolean' }
        });
        this.component = TestHelpers.renderComponent(FilterValueFields, props);

        const boolPropValueSelect = ReactDOM.findDOMNode(this.component.refs['boolean-value-set']).childNodes[0].childNodes[0];

        const boolPropValueSelectOptions = _.map(boolPropValueSelect.childNodes, function(node){
          return node.value;
        });
        const propertyValueOptions = _.compact(boolPropValueSelectOptions);

        assert.sameMembers(propertyValueOptions, ['true', 'false']);
      });
    });
  });
});
