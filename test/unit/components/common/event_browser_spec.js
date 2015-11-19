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
    this.currentEventCollection = 'click';
    this.client = TestHelpers.createClient();
    this.component = TestUtils.renderIntoDocument(<EventBrowser client={this.client} currentEventCollection={this.currentEventCollection} project={this.project} />);
  });

  describe('setup', function() {
    it('is of the right type', function() {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, EventBrowser));
    });

    it('has a single a Loader component', function(){
      assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, Loader), 1);
    });
  });

  describe("delete schema property", function() {
    it("calls endpoint to delete schema property", function() {
      var eventCollection = ""; // what
      var propertyName = ""; // seriously i don't know

      var expectedURL = this.client.config.protocol +
        "://" + this.client.config.host +
        "/projects/" + this.client.config.projectId +
        "/events/" + eventCollection +
        "/properties/" + propertyName;

      var expectedURL = this.client.;

      assert.isTrue(this.xhrOpenSpy.calledWith('DELETE', expectedURL, true));
    });

    it("prompts user for confirmation before endpoint is called");
  });
});
