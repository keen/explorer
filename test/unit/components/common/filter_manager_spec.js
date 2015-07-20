/** @jsx React.DOM */
var sinon = require('sinon');
var assert = require('chai').assert;
var _ = require('lodash');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var TestHelpers = require('../../../support/TestHelpers.js');
var FilterManager = require('../../../../client/js/app/components/common/filter_manager.js');
var ExplorerActions = require('../../../../client/js/app/actions/ExplorerActions');

describe('components/common/filter_manager', function() {

  before(function () {
    this.addFilterStub = sinon.stub(ExplorerActions, 'addFilter');
  });

  after(function () {
    ExplorerActions.addFilter.restore();
  });

  beforeEach(function() {
    this.client = TestHelpers.createClient();
    this.project = TestHelpers.createProject();
    this.project.loading = true;
    this.model = TestHelpers.createExplorerModel();
    this.component = TestUtils.renderIntoDocument(<FilterManager client={this.client} project={this.project} model={this.model} />);
  });

  describe('setup', function(){
    it('should have tried to create a default empty filter', function () {
      assert.isTrue(this.addFilterStub.calledOnce);
    });
    it('has an empty filters message by default', function(){
      var message = 'Please select an Event Collection before making a filter.';
      assert.equal(message, TestUtils.findRenderedDOMComponentWithClass(this.component, 'no-filters-msg').getDOMNode().textContent);
    });
  });
  describe('field change reactions', function () {
    describe('event_collection', function () {
      beforeEach(function(){
        this.model.query.event_collection = 'click';
        this.component.forceUpdate();
      });

      it("no longer shows the 'Please select an event collection' message", function() {
        assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithClass(this.component, 'no-filters-msg'), 0);
      });
      it("has an add filter button", function() {
        assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithClass(this.component, 'add-filter'), 1);
      });
    });
  });
});