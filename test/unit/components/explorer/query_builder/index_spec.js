/** @jsx React.DOM */
var assert = require('chai').assert;
var _ = require('lodash');
var KeenAnalysis = require('keen-analysis');
var sinon = require('sinon');
var QueryBuilder = require('../../../../../client/js/app/components/explorer/query_builder/index.js');
var GroupByField = require('../../../../../client/js/app/components/explorer/query_builder/group_by_field.js');
var SelectField = require('../../../../../client/js/app/components/explorer/query_builder/select_field.js');
var Timeframe = require('../../../../../client/js/app/components/common/timeframe.js')
var Interval = require('../../../../../client/js/app/components/common/interval.js')
var ExplorerActions = require('../../../../../client/js/app/actions/ExplorerActions');
var Input = require('../../../../../client/js/app/components/common/select.js');
var ExtractionOptions = require('../../../../../client/js/app/components/explorer/query_builder/extraction_options.js');
var ReactSelect = require('../../../../../client/js/app/components/common/react_select.js');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var TestHelpers = require('../../../../support/TestHelpers');

var $R = require('rquery')(_, React, ReactDOM, TestUtils);

describe('components/explorer/query_builder/index', function() {
  beforeEach(function() {
    this.model = TestHelpers.createExplorerModel();
    this.model.id = 10;
    this.model.active = true;
    this.client = new KeenAnalysis(TestHelpers.createClient());
    this.project = TestHelpers.createProject();

    this.renderComponent = function(props) {
      var defaults = {
        project: this.project,
        model: this.model,
        client: this.client,
        getEventPropertyNames: function() {}
      };
      var props = _.assign({}, defaults, props);
      return TestUtils.renderIntoDocument(<QueryBuilder {...props} />);
    }

    this.component = this.renderComponent();
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
      var props = _.assign({}, this.component.props, { model: this.model });
      this.component = TestHelpers.renderComponent(QueryBuilder, props);

      assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, Interval), 0);
    });

    it('has the right number of ReactSelect child components', function(){
      assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, ReactSelect), 4);
    });

    it('has the right number of ReactSelect child components when the analysis type is extraction', function(){
      this.model.query.analysis_type = 'extraction';
      this.component.forceUpdate();
      assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, ReactSelect), 3);
    });

    it('has the clear button button', function () {
      assert.lengthOf($R(this.component).find('[role="clear-query"]').components, 1);
    });

    describe('button event bindings', function () {
      it('calls clearQuery when the clear query button is clicked', function () {
        var stub = sinon.stub();
        this.component = this.renderComponent({ handleClearQuery: stub });
        TestUtils.Simulate.click($R(this.component).find('[role="clear-query"]').components[0]);
        assert.isTrue(stub.calledOnce);
      });
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
      describe('analysis type is set to extraction', function () {
        it('shows the extraction options component', function() {
          this.model.query.event_collection = 'click';
          this.model.query.analysis_type = 'extraction';
          this.component.forceUpdate();
          assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, ExtractionOptions), 1);
        });
      });
      describe('analysis type is not extraction', function () {
        it('does not show the extraction options component', function() {
          this.model.query.event_collection = 'click';
          this.model.query.analysis_type = 'count';
          this.component.forceUpdate();
          assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, ExtractionOptions), 0);
        });
      });
    });

    describe('group_by', function () {

      describe('when event_collection is set', function () {

        it('there are group_by options', function () {
          var expectedOptions = ['one', 'two', 'three'];
          var props = _.extend({},
              this.component.props,
              { getEventPropertyNames: function() { return expectedOptions } }
          );
          this.model.query.event_collection = 'click';
          this.model.query.analysis_type = 'count';
          this.model.query.group_by = ['one'];
          this.component = TestHelpers.renderComponent(QueryBuilder, props);

          var groupByNode = $R(this.component).find('input[name="group_by.0"]').components[0];
          TestUtils.Simulate.focus(groupByNode);

          var groupByOptions = _.map(groupByNode.parentNode.childNodes[1].childNodes[1].childNodes, function(node){
            return node.textContent;
          });
          groupByOptions = _.compact(groupByOptions);

          assert.sameMembers(groupByOptions, expectedOptions);
        });

        it('when event_collection is set group_by has the options returned getEventPropertyNames', function () {
          var model = TestHelpers.createExplorerModel();
          model.query.event_collection = 'click';
          model.query.analysis_type = 'count';
          model.query.group_by = 'one';

          this.component = this.renderComponent({
            model: model,
            getEventPropertyNames: function(val) {
              if (val) return ['one', 'two'];
            }
          });

          var groupByComponent = TestUtils.findRenderedComponentWithType(this.component, GroupByField);
          assert.sameMembers(groupByComponent.props.options, ['one', 'two']);
        });

      });
    });

    describe('form submission', function () {
      it('calls handleQuerySubmit prop function when the form is submitted', function () {
        var submitStub = sinon.stub();
        this.component = this.renderComponent({ handleQuerySubmit: submitStub });
        var formSubmitNode = TestUtils.findRenderedDOMComponentWithTag(this.component, 'form');
        TestUtils.Simulate.submit(formSubmitNode);
        assert.isTrue(submitStub.calledOnce);
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
        var node = $R(this.component).find('input[name="event_collection"]').components[0];
        node.value = 'clicks';
        TestUtils.Simulate.change(node);

        assert.strictEqual(this.stub.getCall(0).args[0], this.model.id);
        assert.deepPropertyVal(this.stub.getCall(0).args[1], 'query.event_collection', 'clicks');
      });
    });
    describe('analysis_type', function () {
      it('tries to update the attribute when the field changes', function() {
        var node = $R(this.component).find('input[name="analysis_type"]').components[0];
        node.value = 'count';
        TestUtils.Simulate.change(node);

        assert.strictEqual(this.stub.getCall(0).args[0], this.model.id);
        assert.deepPropertyVal(this.stub.getCall(0).args[1], 'query.analysis_type', 'count');
      });
    });
    describe('target_property', function () {
      it('tries to update the attribute when the field changes', function() {
        this.model.query.event_collection = 'clicks';
        this.model.query.analysis_type = 'sum';
        this.component.forceUpdate();

        var node = $R(this.component).find('input[name="target_property"]').components[0];
        node.value = 'target';
        TestUtils.Simulate.change(node);

        assert.strictEqual(this.stub.getCall(0).args[0], this.model.id);
        assert.deepPropertyVal(this.stub.getCall(0).args[1], 'query.target_property', 'target');
      });
    });
    describe('percentile', function () {
      it('tries to update the attribute when the field changes', function() {
        this.model.query.event_collection = 'clicks';
        this.model.query.analysis_type = 'percentile';
        this.component.forceUpdate();

        var node = $R(this.component).find('input[name="percentile"]').components[0];
        node.value = '10';
        TestUtils.Simulate.change(node);

        assert.strictEqual(this.stub.getCall(0).args[0], this.model.id);
        assert.deepPropertyVal(this.stub.getCall(0).args[1], 'query.percentile', '10');
      });
    });
    describe('group_by', function () {
      it('tries to update the attribute when the field changes', function() {
        this.model.query.event_collection = 'clicks';
        this.model.query.analysis_type = 'percentile';
        this.model.query.group_by = ['old_group_by_value'];
        this.component.forceUpdate();

        var node = $R(this.component).find('input[name="group_by.0"]').components[0];
        node.value = 'new_group_by_value';
        TestUtils.Simulate.change(node);

        assert.strictEqual(this.stub.getCall(0).args[0], this.model.id);
        assert.sameMembers(this.stub.getCall(0).args[1].query.group_by, ['new_group_by_value']);
      });
    });
  });

  describe('event_collection', function () {
    it('has the project events as dropdown options', function () {
      var project = TestHelpers.createProject();
      project.eventCollections = ['one', 'two'];
      this.component = this.renderComponent({ project: project });

      var eventCollectionComponent = TestUtils.scryRenderedComponentsWithType(this.component, SelectField)[1];
      assert.sameMembers(eventCollectionComponent.props.options, ['one', 'two']);
    });
  });

  describe('helper functions', function () {
    describe('shouldShowRevertButton', function () {
      it('should return true if the model and its original are different', function () {
        var model = TestHelpers.createExplorerModel();
        model.id = 'abc-123';
        model.query.event_collection = 'clicks';
        model.query.analysis_type = 'count';
        model.originalModel = _.cloneDeep(model);
        model.query.event_collection = 'not clicks';
        this.component = this.renderComponent({ model: model });
        assert.isTrue(this.component.shouldShowRevertButton());
      });
      it('should return false if the model and its original are the same', function () {
        var model = TestHelpers.createExplorerModel();
        model.id = 'abc-123';
        model.query.event_collection = 'clicks';
        model.query.analysis_type = 'count';
        model.originalModel = _.cloneDeep(model);
        this.component = this.renderComponent({ model: model });
        assert.isFalse(this.component.shouldShowRevertButton());
      });
    });
  });

});
