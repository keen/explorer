/** @jsx React.DOM */
var React = require('react/addons');
var _ = require('lodash');
var $R = require('rquery')(_, React);
var assert = require('chai').assert;
var sinon = require('sinon');

var EventBrowser = require('../../../../client/js/app/components/common/event_browser.js');
var ExplorerUtils = require('../../../../client/js/app/utils/ExplorerUtils');
var Loader = require('../../../../client/js/app/components/common/loader.js');
var ProjectUtils = require('../../../../client/js/app/utils/ProjectUtils');
var ProjectActions = require('../../../../client/js/app/actions/ProjectActions');
var TestHelpers = require('../../../support/TestHelpers');
var TestUtils = React.addons.TestUtils;

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
    this.component = TestUtils.renderIntoDocument(
        <EventBrowser
        client={this.client}
        currentEventCollection={this.currentEventCollection}
        project={this.project}
        />);
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
      sinon.stub(window, 'confirm').returns(true);
      var xhrOpenSpy = sinon.spy(XMLHttpRequest.prototype, 'open');
      var xhrSendStub = sinon.stub(XMLHttpRequest.prototype, 'send');
      var eventCollection = "click";
      var propertyName = "stringProp";
      var expectedURL = this.client.config.protocol +
        "://" + this.client.config.host +
        "/projects/" + this.client.config.projectId +
        "/events/" + eventCollection +
        "/properties/" + propertyName +
        "?api_key=" + this.client.config.masterKey;

      var deleteIcon = $R(this.component).find(".delete-icon").at(0)
        .components[0]
        .getDOMNode();
      TestUtils.Simulate.click(deleteIcon);

      assert.isTrue(xhrOpenSpy.calledWith('DELETE', expectedURL, true));
    });
  });
});
