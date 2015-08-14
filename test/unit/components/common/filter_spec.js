/** @jsx React.DOM */
var assert = require('chai').assert;
var expect = require('chai').expect;
var _ = require('lodash');
var sinon = require('sinon');
var Filter = require('../../../../client/js/app/components/common/filter.js');
var Geo = require('../../../../client/js/app/components/common/geo.js');
var Select = require('../../../../client/js/app/components/common/select.js');
var ReactSelect = require('../../../../client/js/app/components/common/react_select.js');
var ExplorerActions = require('../../../../client/js/app/actions/ExplorerActions');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var TestHelpers = require('../../../support/TestHelpers');

describe('components/common/filter', function() {
  before(function () {
    this.updateFilterStub = sinon.stub(ExplorerActions, 'updateFilter');
  });

  after(function () {
    ExplorerActions.updateFilter.restore();
  });

  beforeEach(function() {
    this.updateFilterStub.reset();
    this.project = TestHelpers.createProject();
    this.model = TestHelpers.createExplorerModel();
    this.model.query.event_collection = 'click';

    this.filter = {
      property_name: 'name',
      operator: 'eq',
      property_value: 'value',
      coercion_type: 'String'
    };
    this.index = 0;
    this.removeFilter = sinon.stub();

    this.component = TestUtils.renderIntoDocument(<Filter filter={this.filter}
                                                         model={this.model}
                                                         project={this.project}
                                                         removeFilter={this.removeFilter}
                                                         index={this.index} />);

    this.getSelectOptions = function(selectClass, activeOnly) {
      activeOnly = activeOnly || false;
      var operatorSelect = TestUtils.findRenderedDOMComponentWithClass(this.component, selectClass).getDOMNode().childNodes[0];
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

  describe('field change reactions', function(){

    describe('property_name', function () {

      describe('is set', function () {

        describe('not to a geoProp', function () {
          it('all the available coercion types are in the select component', function(){
            var typeList = ['String', 'Number', 'Datetime', 'Boolean', 'List', 'Null'];
            this.filter.property_name = 'stringProp';
            this.component.forceUpdate();
            assert.sameMembers(this.getSelectOptions('coercion-type'), typeList);
          })

          it('does not have a Geo component', function() {
            var otherPropertyTypes = ['stringProp', 'numProp', 'nullProp', 'boolProp', 'datetimeProp', 'listProp'];

            // FIXME: What horrific way to test is this?
            _.each(otherPropertyTypes, _.bind(function(propertyType){
              this.filter.property_name = propertyType;
              this.component.forceUpdate();

              assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, Geo), 0);
            },this));
          });
        });
      });
    });

    describe('operators', function(){

      describe('field_value_type', function () {

        describe('when operator is already \'exists\'', function () {
          beforeEach(function () {
            this.filter.property_name = 'stringProp';
            this.filter.operator = 'exists';
            this.component.forceUpdate();
          });

          it('the boolean select component has only true & false options', function () {
            var booleanOptions = ['true', 'false'];
            assert.sameMembers(this.getSelectOptions('property-value', true), booleanOptions);
          });

          describe('change from Boolean type', function () {
            beforeEach(function () {
              this.filter.coercion_type = 'Boolean';
              this.component.forceUpdate();
            });

            it('changes operator type to anything apart from \'exists\'', function () {
              var coercionSelect = TestUtils.findRenderedDOMComponentWithClass(this.component, 'coercion-type').getDOMNode().childNodes[0];
              coercionSelect.value = 'String';
              TestUtils.Simulate.change(coercionSelect);

              var operatorSelect = TestUtils.findRenderedDOMComponentWithClass(this.component, 'operator').getDOMNode().childNodes[0];

              assert.notEqual(operatorSelect.value, '');
            });
          });
        });

        describe('when the operator is \'exists\'', function () {
          beforeEach(function () {
            this.filter.property_name = 'stringProp';
            this.filter.operator = 'exists';
            this.component.forceUpdate();
          });

          it('\'Boolean\' is the only coercion type available', function () {
            var coercionTypeSelect = TestUtils.scryRenderedDOMComponentsWithTag(this.component, 'select')[1].getDOMNode();
            var coercionTypeSelectOptions = _.map(coercionTypeSelect.childNodes, function(node){
              return node.value;
            });
            coercionOptions = _.compact(coercionTypeSelectOptions);

            assert.sameMembers(coercionOptions, ['Boolean']);
          });
        });
      });
    });
  });

  describe('updating the filter form', function () {
    describe('property_name', function () {
      it('sets the property name on the model', function () {
        var propertyNameInput = TestUtils.findRenderedDOMComponentWithClass(this.component, 'property-name').getDOMNode();
        propertyNameInput.value = 'stringProp';
        TestUtils.Simulate.change(propertyNameInput);

        assert.deepPropertyVal(this.updateFilterStub.getCall(0).args[2], 'property_name', 'stringProp');
      });
    });

    describe('operator', function () {
      it('sets the operator on the model', function () {
        this.filter.property_name = 'stringProp';
        this.filter.coercion_type = 'String';
        this.component.forceUpdate();

        var operatorSelect = TestUtils.findRenderedDOMComponentWithClass(this.component, 'operator').getDOMNode().childNodes[0].childNodes[0];
        operatorSelect.value = 'eq';
        TestUtils.Simulate.change(operatorSelect);

        assert.deepPropertyVal(this.updateFilterStub.getCall(0).args[2], 'operator', 'eq');
      });
    });
  });
});