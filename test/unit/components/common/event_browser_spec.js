/** @jsx React.DOM */
var React = require('react/addons');
var _ = require('lodash');
var $R = require('rquery')(_, React);
var assert = require('chai').assert;
var sinon = require('sinon');

var EventBrowser = require('../../../../client/js/app/components/common/event_browser.js');
var ExplorerUtils = require('../../../../client/js/app/utils/ExplorerUtils');
var Loader = require('../../../../client/js/app/components/common/loader.js');
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

    beforeEach(function() {
      sinon.stub(window, 'confirm').returns(true);
      this.xhr = sinon.useFakeXMLHttpRequest();
      var requests = this.requests = [];
      this.xhr.onCreate = function (xhr) {
        requests.push(xhr);
      };
    });

    afterEach(function() {
      window.confirm.restore();
      this.xhr.restore();
    });

    it("calls endpoint to delete schema property", function() {
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
      var request = this.requests[0];

      assert.equal(request.method, "DELETE");
      assert.equal(request.url, expectedURL);
    });

    it("renders notice when there's an error", function() {
      var deleteIcon = $R(this.component).find(".delete-icon").at(0)
        .components[0]
        .getDOMNode();
      TestUtils.Simulate.click(deleteIcon);
      var request = this.requests[0];
      var errorMessage = {error: "Error", message: "This is an error"};
      request.respond(500, {"Content-Type": "application/json"}, JSON.stringify(errorMessage));

      this.component.forceUpdate();
      var notice = $R(this.component).find(".notice-component");

      assert.include(notice.text(), errorMessage.message);
    });
  });
});
