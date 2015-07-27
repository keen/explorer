/** @jsx React.DOM */
var assert = require('chai').assert;
var _ = require('lodash');
var sinon = require('sinon');
var QueryBuilder = require('../../../../../client/js/app/components/explorer/query_builder/index.js');
var RunQuery = require('../../../../../client/js/app/components/common/run_query.js');
var Timeframe = require('../../../../../client/js/app/components/common/timeframe.js')
var Interval = require('../../../../../client/js/app/components/common/interval.js')
var ProjectUtils = require('../../../../../client/js/app/utils/ProjectUtils');;
var ExplorerActions = require('../../../../../client/js/app/actions/ExplorerActions');
var Input = require('../../../../../client/js/app/components/common/select.js');
var ReactSelect = require('../../../../../client/js/app/components/common/react_select.js');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var TestHelpers = require('../../../../support/TestHelpers');

describe('components/explorer/query_builder/index', function() {
  beforeEach(function() {
    this.model = TestHelpers.createExplorerModel();
    this.model.id = 10;
    this.model.active = true;
    this.client = TestHelpers.createClient();
    this.project = TestHelpers.createProject();
    this.component = TestUtils.renderIntoDocument(<QueryBuilder project={this.project} model={this.model} client={this.client} />);
  });

  describe('setup', function() {
    it('is of the right type', function() {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, QueryBuilder));
    });

    it('has a single Timeframe child component', function(){
      assert.isNotNull(TestUtils.findRenderedComponentWithType(this.component, Timeframe));
    });

    it('has one Interval component', function(){
      assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, Interval), 1);
    });

    it('has zero Interval components if the analysis_type is extraction', function(){
      this.model.query.analysis_type = 'extraction';
      this.component.setProps({
        model: this.model
      });
      assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, Interval), 0);
    });    

    it('has a single RunQuery child component', function(){
      assert.isNotNull(TestUtils.findRenderedComponentWithType(this.component, RunQuery));
    });

    it('has the right number of ReactSelect child components', function(){
      assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, ReactSelect), 4);
    });

    it('has the right number of ReactSelect child components when the analysis type is extraction', function(){
      this.model.query.analysis_type = 'extraction';
      this.component.forceUpdate();
      assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, ReactSelect), 3);
    });
  });

  describe('field change reactions', function () {
    describe('analysis-type', function () {
      describe('set to count', function () {
        it('does not show the target_property field', function() {
          this.model.query.event_collection = 'click';
          this.model.query.analysis_type = 'count';
          this.component.forceUpdate();
          assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithClass(this.component, 'target-property'), 0);
        });
      });
      describe('set to anything but count', function () {
        it('shows the target_property field', function() {
          this.model.query.event_collection = 'click';
          this.model.query.analysis_type = 'sum';
          this.component.forceUpdate();
          assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithClass(this.component, 'target-property'), 1);
        });
      });
      describe('analysis type is set to percentile', function () {
        it('shows the percentile input field', function() {
          this.model.query.event_collection = 'click';
          this.model.query.analysis_type = 'percentile';
          this.component.forceUpdate();
          assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithClass(this.component, 'percentile'), 1);
        });
      });
    });

    describe('group_by', function () {
      describe('when event_collection is set', function () {
        it('there are group_by options', function () {
          var expectedOptions = ['one', 'two', 'three'];
          sinon.stub(ProjectUtils, 'getEventCollectionPropertyNames').returns(expectedOptions);
          this.model.query.event_collection = 'click';
          this.model.query.analysis_type = 'count';
          this.model.query.group_by = 'one';
          this.component.forceUpdate();

          var groupByNode = TestUtils.findRenderedDOMComponentWithClass(this.component, 'group-by').getDOMNode();
          TestUtils.Simulate.focus(groupByNode);
          var groupByOptions = _.map(groupByNode.parentNode.childNodes[1].childNodes[1].childNodes, function(node){
            return node.textContent;
          });
          groupByOptions = _.compact(groupByOptions);

          assert.sameMembers(groupByOptions, expectedOptions);
          ProjectUtils.getEventCollectionPropertyNames.restore();
        });
      });
    });

    describe('form submission', function () {
      it('executes the query when the form is submitted', function () {
        var execStub = sinon.stub(ExplorerActions, 'exec');
        var formSubmitNode = TestUtils.findRenderedDOMComponentWithTag(this.component, 'form').getDOMNode();
        TestUtils.Simulate.submit(formSubmitNode);
        assert.isTrue(execStub.calledWith(this.client, 10));
        ExplorerActions.exec.restore();
      });
    });
  });

  describe('field change bindings', function() {
    before(function () {
      this.stub = sinon.stub(ExplorerActions, 'update');
    });
    after(function () {
      ExplorerActions.update.restore();
    });

    beforeEach(function () {
      this.stub.reset();
    });

    describe('event_collection', function () {
      it('tries to update the attribute when the field changes', function() {
        this.component.refs['event-collection-field'].refs.select.refs.input.getDOMNode().value = 'clicks';
        TestUtils.Simulate.change(this.component.refs['event-collection-field'].refs.select.refs.input.getDOMNode());

        assert.strictEqual(this.stub.getCall(0).args[0], this.model.id);
        assert.deepPropertyVal(this.stub.getCall(0).args[1], 'query.event_collection', 'clicks');
      });
    });
    describe('analysis_type', function () {
      it('tries to update the attribute when the field changes', function() {
        this.component.refs['analysis-type-field'].refs.select.refs.input.getDOMNode().value = 'count';
        TestUtils.Simulate.change(this.component.refs['analysis-type-field'].refs.select.refs.input.getDOMNode());

        assert.strictEqual(this.stub.getCall(0).args[0], this.model.id);
        assert.deepPropertyVal(this.stub.getCall(0).args[1], 'query.analysis_type', 'count');
      });
    });
    describe('target_property', function () {
      it('tries to update the attribute when the field changes', function() {
        this.model.query.event_collection = 'clicks';
        this.model.query.analysis_type = 'sum';
        this.component.forceUpdate();

        this.component.refs['target-property-field'].refs.select.refs.input.getDOMNode().value = 'target';
        TestUtils.Simulate.change(this.component.refs['target-property-field'].refs.select.refs.input.getDOMNode());

        assert.strictEqual(this.stub.getCall(0).args[0], this.model.id);
        assert.deepPropertyVal(this.stub.getCall(0).args[1], 'query.target_property', 'target');
      });
    });
    describe('percentile', function () {
      it('tries to update the attribute when the field changes', function() {
        this.model.query.event_collection = 'clicks';
        this.model.query.analysis_type = 'percentile';
        this.component.forceUpdate();

        this.component.refs['percentile-field'].refs.input.refs.input.getDOMNode().value = '10';
        TestUtils.Simulate.change(this.component.refs['percentile-field'].refs.input.refs.input.getDOMNode());

        assert.strictEqual(this.stub.getCall(0).args[0], this.model.id);
        assert.deepPropertyVal(this.stub.getCall(0).args[1], 'query.percentile', '10');
      });
    });
    describe('group_by', function () {
      it('tries to update the attribute when the field changes', function() {
        this.model.query.event_collection = 'clicks';
        this.model.query.analysis_type = 'percentile';  
        this.model.query.group_by = 'group_by_property';
        this.component.forceUpdate();

        this.component.refs['group-by-field'].refs.select.refs.input.getDOMNode().value = 'new_group_by_property';
        TestUtils.Simulate.change(this.component.refs['group-by-field'].refs.select.refs.input.getDOMNode());

        assert.strictEqual(this.stub.getCall(0).args[0], this.model.id);
        assert.deepPropertyVal(this.stub.getCall(0).args[1], 'query.group_by', 'new_group_by_property');
      });
    });
  });

  describe('run query button click', function () {
    it('should call exec with the right arguments', function () {
      var execStub = sinon.stub(ExplorerActions, 'exec');
      var formSubmitNode = TestUtils.findRenderedDOMComponentWithClass(this.component, 'run-query').getDOMNode();
      TestUtils.Simulate.click(formSubmitNode);
      assert.isTrue(execStub.calledWith(this.client, 10));
      ExplorerActions.exec.restore();
    });
  });

  describe('event_collection', function () {
    it('has the project events as dropdown options', function () {
      this.model.query.event_collection = 'click';
      this.model.query.analysis_type = 'count';
      this.component.forceUpdate();

      var node = this.component.refs['event-collection-field'].refs.select.refs.input.getDOMNode();
      TestUtils.Simulate.focus(node);
      var optionsInSelect = _.map(node.parentNode.childNodes[1].childNodes[1].childNodes, function(node){
        return node.textContent;
      });
      optionsInSelect = _.compact(optionsInSelect);
      assert.sameMembers(optionsInSelect, this.project.eventCollections);
    });
  });


});