/** @jsx React.DOM */
var assert = require('chai').assert;
var expect = require('chai').expect;
var sinon = require('sinon');
var _ = require('lodash');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var BuilderButtons = require('../../../../../client/js/app/components/explorer/query_builder/builder_buttons.js');
var TestHelpers = require('../../../../support/TestHelpers');


describe('components/common/run_model', function() {

  beforeEach(function() {
    this.model = TestHelpers.createExplorerModel();
    this.clearStub = sinon.stub();
    this.handleSubmitStub = sinon.stub();
    this.component = TestUtils.renderIntoDocument(<BuilderButtons clearmodel={this.clearStub} model={this.model} handleQuerySubmit={this.handleSubmitStub} />);
  });

  describe('setup', function() {
    it('is of the right type', function() {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, BuilderButtons));
    });

    it('has two buttons', function(){
      assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithTag(this.component, 'button'), 2);
    });
  });

  describe('Button text', function(){

    it('returns \'Run model\' when model is not loading', function() {
      this.component.props.model.loading = false;
      this.component.forceUpdate();

      var buttonText = TestUtils.findRenderedDOMComponentWithClass(this.component, 'run-query').getDOMNode().textContent;
      assert.equal(buttonText, 'Run Query');
    });

    it('returns \'Running...\' when model is loading', function() {
      this.component.props.model.loading = true;
      this.component.forceUpdate();

      var buttonText = TestUtils.findRenderedDOMComponentWithClass(this.component, 'run-query').getDOMNode().textContent;
      assert.equal(buttonText, 'Running...');
    });

    describe('extractions', function() {
      beforeEach(function(){
        this.component.props.model.query.analysis_type = 'extraction';
      });

      it('returns \'Run Extraction\' when no email is present in the model', function(){
        this.component.props.model.loading = false;
        this.component.forceUpdate();

        var buttonText = TestUtils.findRenderedDOMComponentWithClass(this.component, 'run-query').getDOMNode().textContent;
        assert.equal(buttonText, 'Run Extraction');
      });

      it('returns \'Running...\' when extraction is loading', function() {
        this.component.props.model.loading = true;
        this.component.forceUpdate();

        var buttonText = TestUtils.findRenderedDOMComponentWithClass(this.component, 'run-query').getDOMNode().textContent;
        assert.equal(buttonText, 'Running...');
      });
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
        this.component.setProps({ model: model });
        assert.isTrue(this.component.shouldShowRevertButton());
      });
      it('should return false if the model and its original are the same', function () {
        var model = TestHelpers.createExplorerModel();
        model.id = 'abc-123';
        model.query.event_collection = 'clicks';
        model.query.analysis_type = 'count';
        model.originalModel = _.cloneDeep(model);
        this.component.setProps({ model: model });
        assert.isFalse(this.component.shouldShowRevertButton());
      });
    });
  });

});