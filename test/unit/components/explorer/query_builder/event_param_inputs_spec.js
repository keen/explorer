/** @jsx React.DOM */
var sinon = require('sinon');
var assert = require('chai').assert;
var _ = require('lodash');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var EventParamInputs = require('../../../../../client/js/app/components/explorer/query_builder/event_param_inputs.js');
var Input = require('../../../../../client/js/app/components/common/select.js');
var ReactSelect = require('../../../../../client/js/app/components/common/react_select.js');
var ExplorerActions = require('../../../../../client/js/app/actions/ExplorerActions');
var TestHelpers = require('../../../../support/TestHelpers.js');

describe('components/explorer/query_builder/event_params_input', function() {

  beforeEach(function() {
    this.model = TestHelpers.createExplorerModel();
    this.project = TestHelpers.createProject();
    this.component = TestUtils.renderIntoDocument(<EventParamInputs project={this.project} model={this.model} />);
  });

  describe('setup', function() {
    // it('is of the right type', function() {
    //   assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, EventParamInputs));
    // });
    // it('has the right number of ReactSelect child components', function(){
    //   assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, ReactSelect), 3);
    // });
    // it('has the right number of ReactSelect child components when the analysis type is extraction', function(){
    //   this.model.query.analysis_type = 'extraction';
    //   this.component.forceUpdate();
    //   assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, ReactSelect), 2);
    // });
  });

  // describe('event_collection', function () {
  //   it('has the project events as dropdown options', function () {
  //     this.model.query.event_collection = 'click';
  //     this.model.query.analysis_type = 'count';
  //     this.component.forceUpdate();

  //     var eventCollectionNode = TestUtils.findRenderedDOMComponentWithClass(this.component, 'event-collection').getDOMNode();
  //     TestUtils.Simulate.focus(eventCollectionNode);
  //     var eventCollectionOptions = _.map(eventCollectionNode.parentNode.childNodes[1].childNodes[1].childNodes, function(node){
  //       return node.textContent;
  //     });
  //     eventCollectionOptions = _.compact(eventCollectionOptions);
  //     assert.sameMembers(eventCollectionOptions, this.project.eventCollections);
  //   });
  // });

  // describe('field change reactions', function() {
    
  //   describe('analysis-type', function () {
  //     describe('set to count', function () {
  //       it('does not show the target_property field', function() {
  //         this.model.query.event_collection = 'click';
  //         this.model.query.analysis_type = 'count';
  //         this.component.forceUpdate();
  //         assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithClass(this.component, 'target-property'), 0);
  //       });
  //     });
  //     describe('set to anything but count', function () {
  //       it('shows the target_property field', function() {
  //         this.model.query.event_collection = 'click';
  //         this.model.query.analysis_type = 'sum';
  //         this.component.forceUpdate();
  //         assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithClass(this.component, 'target-property'), 1);
  //       });
  //     });
  //     describe('analysis type is set to percentile', function () {
  //       it('shows the percentile input field', function() {
  //         this.model.query.event_collection = 'click';
  //         this.model.query.analysis_type = 'percentile';
  //         this.component.forceUpdate();
  //         assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithClass(this.component, 'percentile'), 1);
  //       });
  //     });
  //   });

  //   describe('group_by', function () {
      
  //     describe('when event_collection is set', function () {
  //       it('there are group_by options', function () {
  //         this.model.query.event_collection = 'click';
  //         this.model.query.analysis_type = 'count';
  //         this.component.forceUpdate();

  //         var groupByNode = TestUtils.findRenderedDOMComponentWithClass(this.component, 'group-by').getDOMNode();
  //         TestUtils.Simulate.focus(groupByNode);
  //         var groupByOptions = _.map(groupByNode.parentNode.childNodes[1].childNodes[1].childNodes, function(node){
  //           return node.textContent;
  //         });
  //         groupByOptions = _.compact(groupByOptions);

  //         assert.sameMembers(groupByOptions, Object.keys(TestHelpers.buildProjectSchema()[0].properties));
  //       });
  //     });

  //   });

  // });

  // describe('field change bindings', function() {
  //   before(function () {
  //     this.stub = sinon.stub(ExplorerActions, 'update');
  //   });
  //   after(function () {
  //     ExplorerActions.update.restore();
  //   });

  //   beforeEach(function () {
  //     this.stub.reset();
  //   });

  //   describe('event_collection', function () {
  //     it('tries to update the attribute when the field changes', function() {
  //       this.component.refs.event_collection.refs.input.getDOMNode().value = 'clicks';
  //       this.component.refs.event_collection.handleChange();

  //       assert.strictEqual(this.stub.getCall(0).args[0], this.model.id);
  //       assert.deepPropertyVal(this.stub.getCall(0).args[1], 'query.event_collection', 'clicks');
  //     });
  //   });
  //   describe('analysis_type', function () {
  //     it('tries to update the attribute when the field changes', function() {
  //       this.component.refs.analysis_type.refs.input.getDOMNode().value = 'count';
  //       this.component.refs.analysis_type.handleChange();

  //       assert.strictEqual(this.stub.getCall(0).args[0], this.model.id);
  //       assert.deepPropertyVal(this.stub.getCall(0).args[1], 'query.analysis_type', 'count');
  //     });
  //   });
  //   describe('target_property', function () {
  //     it('tries to update the attribute when the field changes', function() {
  //       this.model.query.event_collection = 'clicks';
  //       this.model.query.analysis_type = 'sum';
  //       this.component.forceUpdate();

  //       this.component.refs.target_property.refs.input.getDOMNode().value = 'target';
  //       this.component.refs.target_property.handleChange();

  //       assert.strictEqual(this.stub.getCall(0).args[0], this.model.id);
  //       assert.deepPropertyVal(this.stub.getCall(0).args[1], 'query.target_property', 'target');
  //     });
  //   });
  //   describe('percentile', function () {
  //     it('tries to update the attribute when the field changes', function() {
  //       this.model.query.event_collection = 'clicks';
  //       this.model.query.analysis_type = 'percentile';
  //       this.component.forceUpdate();

  //       this.component.refs.percentile.refs.input.getDOMNode().value = '10';
  //       TestUtils.Simulate.change(this.component.refs.percentile.refs.input.getDOMNode(), { target: {
  //         name: 'percentile',
  //         value: '10'
  //       }});

  //       assert.strictEqual(this.stub.getCall(0).args[0], this.model.id);
  //       assert.deepPropertyVal(this.stub.getCall(0).args[1], 'query.percentile', '10');
  //     });
  //   });
  //   describe('group_by', function () {
  //     it('tries to update the attribute when the field changes', function() {
  //       this.model.query.event_collection = 'clicks';
  //       this.model.query.analysis_type = 'percentile';  
  //       this.model.query.group_by = 'group_by_property';
  //       this.component.forceUpdate();

  //       this.component.refs['group-by-select'].refs.input.getDOMNode().value = 'new_group_by_property';
  //       TestUtils.Simulate.change(this.component.refs['group-by-select'].refs.input.getDOMNode());

  //       assert.strictEqual(this.stub.getCall(0).args[0], this.model.id);
  //       assert.deepPropertyVal(this.stub.getCall(0).args[1], 'query.group_by', 'new_group_by_property');
  //     });
  //   });
  // });
});