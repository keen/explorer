/** @jsx React.DOM */
var assert = require('chai').assert;
var _ = require('lodash');
var moment = require('moment');
var sinon = require('sinon');
var FilterValueFields = require('../../../../client/js/app/components/common/filter_value_fields.js');
var Geo = require('../../../../client/js/app/components/common/geo.js');
var Datepicker = require('../../../../client/js/app/components/common/datepicker.js');
var Select = require('../../../../client/js/app/components/common/select.js');
var ProjectUtils = require('../../../../client/js/app/utils/ProjectUtils');
var ExplorerActions = require('../../../../client/js/app/actions/ExplorerActions');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var TestHelpers = require('../../../support/TestHelpers');

var datetimeFormat = 'll h:mm A';

describe('components/common/filter_value_fields', function() {

  beforeEach(function() {
    this.project = TestHelpers.createProject();
    this.model = TestHelpers.createExplorerModel();;
    this.model.event_collection = 'click';
    this.filter = {
      property_name: 'propOne',
      operator: 'eq',
      property_value: 'abc',
      coercion_type: 'String'
    };
    this.index = 0;

    this.component = TestUtils.renderIntoDocument(<FilterValueFields model={this.model}
                                                                     filter={this.filter}
                                                                     project={this.project}
                                                                     index={this.index} />);
    this.updateFilterStub = sinon.stub(ExplorerActions, 'updateFilter');
  });

  afterEach(function(){
    ExplorerActions.updateFilter.restore();
  });

  describe('setup', function() {
    it('is of the right type', function() {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, FilterValueFields));
    });

    describe('Datetime', function() {
      beforeEach(function(){
        this.filter.coercion_type = 'Datetime';
        this.filter.property_value = 'May 15, 2015 10:00 AM';
        this.component.setProps({ filter: this.filter });
      });

      it('has a Datetime component', function(){
        assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, Datepicker), 1);
      });

      describe('Setting values datetime values', function () {
        it('properly sets the property_value from the date picker', function () {
          this.component.refs['date-value-input'].refs.datepicker.getDOMNode().value = 'Jan 1, 2015';
          TestUtils.Simulate.blur(this.component.refs['date-value-input'].refs.datepicker.getDOMNode());
          assert.strictEqual(
            moment(this.updateFilterStub.getCall(0).args[2].property_value).format(datetimeFormat),
            "Jan 1, 2015 10:00 AM"
          );
        });
        it('properly sets the properly_value from the time picker', function () {
          var inputNode = this.component.refs['time-value-input'].refs.timepicker.refs.input.getDOMNode();
          TestUtils.Simulate.focus(inputNode);
          inputNode.value = '03:47 PM';
          TestUtils.Simulate.blur(inputNode);
          assert.strictEqual(
            moment(this.updateFilterStub.getCall(0).args[2].property_value).format(datetimeFormat),
            "May 15, 2015 3:47 PM"
          );  
        });
      });
    });

    describe('Boolean', function() {
      beforeEach(function(){
        this.component.props.filter.coercion_type = 'Boolean';
        this.component.forceUpdate();
      });

      it('has a Select component', function(){
        assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, Select), 2);
      });

      it('has no input tags', function(){
        assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithTag(this.component, 'input'), 0);
      });
    });

    describe('Null', function () {
      beforeEach(function () {
        this.component.props.filter.coercion_type = 'Null';
        this.component.forceUpdate();
        assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithTag(this.component, 'input'), 1);
      });

      it('has a readonly input', function () {
        var input = TestUtils.scryRenderedDOMComponentsWithTag(this.component, 'input')[0];
        assert.isTrue(input.props.readOnly);
      });

      it('the input value has a placeholder of \'null\'', function () {
        var input = TestUtils.scryRenderedDOMComponentsWithTag(this.component, 'input')[0];
        assert.equal(input.props.placeholder, 'Null');
      });
    });

    describe('Geo', function () {
      beforeEach(function () {
        this.component.props.filter = { 
          property_name: 'geoProp',
          coercion_type: 'Geo',
          operator: 'within',
          property_value: {
            coordinates: [],
            max_distance_miles: null
          }
        };
        sinon.stub(ProjectUtils, 'getPropertyType');
        this.component.forceUpdate();
      });

      afterEach(function () {
        ProjectUtils.getPropertyType.restore();
      });

      it('has a Geo component', function(){
        assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, Geo), 1);
      });

      it('has 3 inputs for geo-location query data', function(){
        assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithTag(this.component, 'input'), 3);
      });
    });

    describe('not Boolean or Datetime or Null', function() {
      beforeEach(function(){
        this.component.props.filter.coercion_type = 'String';
        this.component.forceUpdate();
      });

      it('does not have a Datetime component', function(){
        assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, Datepicker), 0);
      });

      it('has one input', function(){
        assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithTag(this.component, 'input'), 1);
      });

      it('has one select', function(){
        assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, Select), 1);
      });
    });

    describe('available coercion types', function () {
      describe('when property type is not geo', function () {
        it('has all the coercion types', function () {
          var defaultCoercionOptions = ['String', 'Number', 'Null', 'List', 'Boolean', 'Datetime']

          this.component.props.filter.property_name = 'stringProp';
          this.component.forceUpdate();

          var coercionTypeSelect = TestUtils.scryRenderedDOMComponentsWithTag(this.component, 'select')[0].getDOMNode();
          var coercionOptions = _.map(coercionTypeSelect.childNodes, function(node){
            return node.value;
          });
          coercionOptions = _.compact(coercionOptions);

          assert.sameMembers(defaultCoercionOptions, coercionOptions);
        });
      });
    });
    describe('available property value options when Boolean', function () {
      it('is true or false', function () {
        this.component.props.filter = { operator: 'exists', coercion_type: 'Boolean' };
        this.component.forceUpdate()
        var boolPropValueSelect = this.component.refs['boolean-value-set'].getDOMNode().childNodes[0].childNodes[0];

        var boolPropValueSelectOptions = _.map(boolPropValueSelect.childNodes, function(node){
          return node.value;
        });
        propertyValueOptions = _.compact(boolPropValueSelectOptions);

        assert.sameMembers(propertyValueOptions, ['true', 'false']);
      });
    });
  });
});