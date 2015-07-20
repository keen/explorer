/** @jsx React.DOM */
var sinon = require('sinon');
var assert = require('chai').assert;
var _ = require('lodash');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var TestHelpers = require('../../../support/TestHelpers');
var EventBrowser = require('../../../../client/js/app/components/common/event_browser.js');
var Loader = require('../../../../client/js/app/components/common/loader.js');
var ExplorerActions = require('../../../../client/js/app/actions/ExplorerActions');
var ExplorerUtils = require('../../../../client/js/app/utils/ExplorerUtils');
var ProjectUtils = require('../../../../client/js/app/utils/ProjectUtils');
var FormatUtils = require('../../../../client/js/app/utils/FormatUtils');

describe('components/common/event_browser', function() {

  before(function(){
    this.runQueryStub = sinon.stub(ExplorerUtils, 'runQuery');
  });

  after(function(){
    ExplorerUtils.runQuery.restore();
  });

  beforeEach(function() {
    this.runQueryStub.reset();
    this.project = TestHelpers.createProject();
    this.project.loading = true;
    this.model = TestHelpers.createExplorerModel();
    this.client = TestHelpers.createClient();
    this.component = TestUtils.renderIntoDocument(<EventBrowser client={this.client} model={this.model} project={this.project} />);
  });

  describe('setup', function() {
    it('is of the right type', function() {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, EventBrowser));
    });

    it('has a single a Loader component', function(){
      assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, Loader), 1);
    });

    it('calls initializeModels immediately if the project is not loading', function(){
      this.project.loading = false;
      this.component = TestUtils.renderIntoDocument(<EventBrowser model={this.model} client={this.client} project={this.project} />);
      assert.lengthOf(this.component.state.models, 1);
    });
  });

  describe('component functions', function() {

    describe('initializeModels', function(){

      beforeEach(function(){
        this.project.loading = false;
        this.project.eventCollections = [
          'event_collection_1',
          'event_collection_2'
        ];
        this.model = TestHelpers.createExplorerModel();
        this.model.query.event_collection = null;
        this.component = TestUtils.renderIntoDocument(<EventBrowser model={this.model} client={this.client} project={this.project} />);
      });

      it('creates an model in state for every project event', function(){
        assert.lengthOf(this.component.state.models, 2);
        assert.strictEqual(this.component.state.models[0].name, 'event_collection_1');
        assert.strictEqual(this.component.state.models[1].name, 'event_collection_2');
      });

      it('marks the first model as active', function(){
        assert.isTrue(this.component.state.models[0].active);
      });

      it('shows the loader if a model starts loading', function(){
        this.component.refs.loader.props.visible = false;
        this.component.refs.loader.forceUpdate();
        this.component.getActiveModel().loading = true;
        this.component.setState({
          activeView: 'recentEvents'
        });
        this.component.forceUpdate();
        assert.isTrue(this.component.refs.loader.props.visible);
      });

    });

    describe('markModelActive', function(){

      beforeEach(function(){
        this.project.loading = false;
        this.project.eventCollections = [
        'event_collection_1',
        'event_collection_2'
        ];
        this.component = TestUtils.renderIntoDocument(<EventBrowser model={this.model} client={this.client} project={this.project} />);
      });

      it('calls runQuery with the model if there is no result yet', function(){
        this.runQueryStub.reset();
        this.component.markModelActive('event_collection_2');
        assert.isTrue(this.runQueryStub.calledOnce);
      });

      it('does not call runQuery with the model if there is already a result', function(){
        this.runQueryStub.reset();
        this.component.state.models[0].result = 50;
        this.component.markModelActive('event_collection_1');
        assert.isFalse(this.runQueryStub.calledOnce);
      });

      it('sets the event collections active attr to true', function(){
        this.component.markModelActive('event_collection_1');
        assert.isTrue(this.component.state.models[0].active);
        assert.isFalse(this.component.state.models[1].active);
      });

      it('sets all other event collections active attr to false', function(){
        this.component.markModelActive('event_collection_1');
        this.component.markModelActive('event_collection_2');
        assert.isFalse(this.component.state.models[0].active);
        assert.isTrue(this.component.state.models[1].active);
      });

      it('sets the activeEventCollection attr of state to the right one', function(){
        this.component.markModelActive('event_collection_1');
        assert.equal(this.component.getActiveModel(), this.component.state.models[0]);
      });

    });

  });
});