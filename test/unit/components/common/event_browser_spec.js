/** @jsx React.DOM */
var sinon = require('sinon');
var assert = require('chai').assert;
var _ = require('lodash');
var KeenAnalysis = require('keen-analysis');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
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
    this.project.client = this.client = new KeenAnalysis(TestHelpers.createClient());
    this.project.client.resources({
      'events': '{protocol}://{host}/3.0/projects/{projectId}/events'
    });
    // Ensure there are already some recent events
    this.project.schema.click.recentEvents = [{ name: 'first recent event' }];

    this.renderComponent = function(props) {
      var props = props || {};
      var defaultProps = {
        currentEventCollection: 'click',
        project: this.project
      };
      return TestUtils.renderIntoDocument(<EventBrowser {..._.assign({}, defaultProps, props)} />);
    };
    this.component = this.renderComponent();
  });

  describe('setup', function() {
    it('is of the right type', function() {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, EventBrowser));
    });

    it('has a single a Loader component', function(){
      assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, Loader), 1);
    });
  });

  describe('handling the active event collection', function () {
    it('does not try to access recent events when activeEventCollection is a string that does not match a collection', function () {
      this.component = this.renderComponent({ currentEventCollection: 'some string that does not match an event collection' });
      assert.strictEqual(this.component.getRecentEvents(), "");
    });
    it('properly returns the recent events when activeEventCollection is a string that matches a collection', function () {
      this.component = this.renderComponent({ currentEventCollection: 'click' });
      assert.strictEqual(this.component.getRecentEvents(), FormatUtils.prettyPrintJSON([{ name: 'first recent event' }]));
    });
  });
});
