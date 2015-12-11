/** @jsx React.DOM */
var assert = require('chai').assert;
var _ = require('lodash');
var sinon = require('sinon');
var ProjectUtils = require('../../../../client/js/app/utils/ProjectUtils.js');
var Filter = require('../../../../client/js/app/components/common/filter.js');
var Geo = require('../../../../client/js/app/components/common/geo.js');
var Select = require('../../../../client/js/app/components/common/select.js');
var ReactSelect = require('../../../../client/js/app/components/common/react_select.js');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var TestHelpers = require('../../../support/TestHelpers');
var $R = require('rquery')(_, React, ReactDOM, TestUtils);

describe('components/common/filter', function() {
  beforeEach(function() {
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

  describe('setup', function() {
    it('is of the right type', function() {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, Filter));
    });

    describe('has the right empty form fields by default', function(){
      it ('has the right number of typeaheads', function(){
        assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, ReactSelect), 1);
      });

      it ('has the right number of inputs', function(){
        assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithClass(this.component, 'property-value'), 1);
      });

      it ('has the right number of selects', function(){
        assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, Select), 2);
      });
    });
  });

  it('only shows "Boolean" coercion type when the operator is "exists"', function () {
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
