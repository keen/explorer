/** @jsx React.DOM */

var sinon = require('sinon');
var assert = require('chai').assert;
var _ = require('lodash');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var CSVExtractionInput = require('../../../../client/js/app/components/explorer/csv_extraction.js');
var AppDispatcher = require('../../../../client/js/app/dispatcher/AppDispatcher');
var ExplorerStore = require('../../../../client/js/app/stores/ExplorerStore');
var ExplorerUtils = require('../../../../client/js/app/utils/ExplorerUtils');
var Input = require('../../../../client/js/app/components/common/input.js');
var TestHelpers = require('../../../support/TestHelpers');

describe('components/explorer/query_builder/csv_extraction', function() {
  before(function () {
    this.dispatchStub = sinon.stub(AppDispatcher, 'dispatch');
  });

  after(function () {
    AppDispatcher.dispatch.restore();
  });

  beforeEach(function() {
    this.dispatchStub.reset();
    this.client = TestHelpers.createClient();
    
    this.explorer = TestHelpers.createExplorerModel();
    this.explorer.id = 'some_id';
    this.explorer.query.event_collection = 'clicks';
    this.explorer.query.analysis_type = 'extraction';

    this.component = TestUtils.renderIntoDocument(<CSVExtractionInput client={this.client} model={this.explorer} />);
    this.component.refs['modal'].setState({ open: true });
  });

  describe('setup', function() {
    it('is of the right type', function() {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, CSVExtractionInput));
    });

    it('has two Input child components', function() {
      assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, Input), 2);
    });
  });

  describe('setting model attributes in response to field changes', function() {
    it('latest gets set properly on the model', function() {
      this.emailInput = this.component.refs.latest.getDOMNode().childNodes[1];
      this.emailInput.value = '1000';
      TestUtils.Simulate.change(this.emailInput);
      assert.strictEqual(this.dispatchStub.getCall(0).args[0].actionType, 'EXPLORER_UPDATE');
      assert.strictEqual(this.dispatchStub.getCall(0).args[0].id, this.explorer.id);
      assert.deepPropertyVal(this.dispatchStub.getCall(0).args[0].updates, 'query.latest', '1000');
    });

    it('email gets set properly on the model', function() {
      this.emailInput = this.component.refs.email.getDOMNode().childNodes[1];
      this.emailInput.value = 'contact@keen.io';
      TestUtils.Simulate.change(this.emailInput);
      assert.strictEqual(this.dispatchStub.getCall(0).args[0].actionType, 'EXPLORER_UPDATE');
      assert.strictEqual(this.dispatchStub.getCall(0).args[0].id, this.explorer.id);
      assert.deepPropertyVal(this.dispatchStub.getCall(0).args[0].updates, 'query.email', 'contact@keen.io');
    });
  });

  describe('messages', function(){
    before(function () {
      this.getStub = sinon.stub(ExplorerStore, 'get');
    });
    after(function () {
      ExplorerStore.get.restore();
    });

    it('shows an error message if latest validation fails', function(){
      this.explorer.query.email = 'contact@keen.io';
      this.explorer.query.latest = 'abc';
      this.getStub.returns(this.explorer);
      TestUtils.Simulate.click(this.component.refs['modal'].refs['modal-submit'].getDOMNode());
      assert.equal(TestUtils.findRenderedDOMComponentWithClass(this.component, 'alert-danger').getDOMNode().textContent, 'Latest must be a number.');
    });
    it('shows an error message if email validation fails', function(){
      this.explorer.query.email = 'not_a_valid_email';
      this.explorer.query.latest = '100';
      this.getStub.returns(this.explorer);
      TestUtils.Simulate.click(this.component.refs['modal'].refs['modal-submit'].getDOMNode());
      assert.equal(TestUtils.findRenderedDOMComponentWithClass(this.component, 'alert-danger').getDOMNode().textContent, 'A valid email address is required.');
    });
    it('shows a success message after running properly', function(){
      this.component.extractionComplete({ success: true });  
      assert.equal(
        TestUtils.findRenderedDOMComponentWithClass(this.component, 'alert-success').getDOMNode().textContent,
        "Great, we're now building your extraction. You should receive an email shortly."
      );
    });
    it('shows a success message after running properly', function(){
      this.component.setState({ loading: true });
      assert.equal(
        TestUtils.findRenderedDOMComponentWithClass(this.component, 'alert-info').getDOMNode().textContent,
        "Requesting email extraction..."
      );
    });
  });

  describe('running extractions', function () {
    before(function () {
      this.runStub = sinon.stub(ExplorerUtils, 'runQuery');
    });
    after(function () {
      ExplorerUtils.runQuery.restore();  
    });

    it('should call runEmailExtraction with the right parameters, including timeframes', function () {
      var model = TestHelpers.createExplorerModel();
      model.timeframe_type = 'relative';
      model.query = {
        email: 'peeps@keen.io',
        latest: '1000',
        event_collection: 'signups',
        analysis_type: 'extraction',
        time: {
          relativity: 'this',
          amount: '1',
          sub_timeframe: 'days'
        }
      };
      sinon.stub(ExplorerStore, 'get').returns(model);
      this.component.setProps({ model: model });
      this.component.sendEmailExtraction();
      assert.deepEqual(this.runStub.getCall(0).args[0].query, {
        event_collection: 'signups',
        analysis_type: 'extraction',
        email: 'peeps@keen.io',
        latest: '1000',
        timeframe: 'this_1_days'
      });
      ExplorerStore.get.restore();
    });
  });
});
