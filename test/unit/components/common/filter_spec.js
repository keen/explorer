
var _ from 'lodash');
let sinon from 'sinon/pkg/sinon.js');
var ProjectUtils from '../../../../lib/js/app/utils/ProjectUtils.js');
var Filter from '../../../../lib/js/app/components/common/filter.js');
var Geo from '../../../../lib/js/app/components/common/geo.js');
var Select from '../../../../lib/js/app/components/common/select.js');
var ReactSelect from '../../../../lib/js/app/components/common/react_select.js');
import React from 'react';
var ReactDOM from 'react-dom');
var TestUtils from 'react-addons-test-utils');
var TestHelpers from '../../../support/TestHelpers');
var $R from 'rquery')(_, React, ReactDOM, TestUtils);

describe('components/common/filter', () => {
  beforeEach(() => {
    this.handleChangeStub = sinon.stub();
    this.removeFilterStub = sinon.stub();

    this.defaultProps = {
      key: 0,
      index: 0,
      filter: {
        property_name: 'name',
        operator: 'eq',
        property_value: 'value',
        coercion_type: 'String',
        isValid: true,
        errors: []
      },
      propertyType: 'String',
      eventCollection: 'click',
      propertyNames: [
        'one',
        'two'
      ],
      handleChange: this.handleChangeStub,
      removeFilter: this.removeFilterStub,
      filterOperators: ProjectUtils.getConstant('FILTER_OPERATORS')
    };

    this.renderComponent = function(props) {
      var props = _.assign({}, this.defaultProps, props);
      return TestUtils.renderIntoDocument(<Filter {...props} />);
    }

    this.component = this.renderComponent();

    // TODO: Remove
    this.getSelectOptions = function(selectClass, activeOnly) {
      activeOnly = activeOnly || false;
      var operatorSelect = TestUtils.findRenderedDOMComponentWithClass(this.component, selectClass).childNodes[0];
      var operators = _.map(operatorSelect.childNodes[0].childNodes, function(node){
        if (!activeOnly) {
          return node.value;
        } else if (activeOnly && !node.disabled) {
          return node.value;
        }
      });
      return _.compact(operators);
    };
  });

  describe('setup', () => {
    it('is of the right type', () => {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, Filter));
    });

    describe('has the right empty form fields by default', () => {
      it ('has the right number of typeaheads', () => {
        assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, ReactSelect), 1);
      });

      it ('has the right number of inputs', () => {
        assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithClass(this.component, 'property-value'), 1);
      });

      it ('has the right number of selects', () => {
        assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, Select), 2);
      });
    });
  });

  it('only shows "Boolean" coercion type when the operator is "exists"', () => {
    var props = {
      filter: {
        property_name: 'name',
        operator: 'exists',
        property_value: 'true',
        coercion_type: 'Boolean',
        isValid: true,
        errors: []
      }
    };
    this.component = this.renderComponent(props);
    var selectNode = $R(this.component).find('select').components[1];
    var options = _.map(selectNode.childNodes, function(node) {
      return node.value;
    });
    options = _.compact(options);

    assert.sameMembers(options, ['Boolean']);
  });
});
