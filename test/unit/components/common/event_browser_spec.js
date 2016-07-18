/** @jsx React.DOM */
var sinon = require('sinon');
var assert = require('chai').assert;
var _ = require('lodash');
var KeenAnalysis = require('keen-analysis');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var TestHelpers = require('../../../support/TestHelpers');
var EventBrowser = require('../../../../client/js/app/components/common/event_browser.js');
var Loader = require('../../../../client/js/app/components/common/loader.js');
var ExplorerActions = require('../../../../client/js/app/actions/ExplorerActions');
var ExplorerUtils = require('../../../../client/js/app/utils/ExplorerUtils');
var ProjectUtils = require('../../../../client/js/app/utils/ProjectUtils');
var FormatUtils = require('../../../../client/js/app/utils/FormatUtils');
var ProjectActions = require('../../../../client/js/app/actions/ProjectActions');
var $R = require('rquery')(_, React, ReactDOM, TestUtils);

describe('components/common/event_browser', function() {

  before(function(){
    this.runQueryStub = sinon.stub(ExplorerUtils, 'runQuery');
    sinon.stub(ProjectActions, 'fetchCollectionSchema');
  });

  after(function(){
    ExplorerUtils.runQuery.restore();
    ProjectActions.fetchCollectionSchema.restore();
  });

  beforeEach(function() {
    this.runQueryStub.reset();
    this.currentEventCollection = 'click';

    this.project = TestHelpers.createProject();
    this.project.loading = true;
    this.project.client = this.client = new KeenAnalysis(TestHelpers.createClient());
    this.project.client.resources({
      'events': '{protocol}://{host}/3.0/projects/{projectId}/events'
    });
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

  describe('handling content when event collections exist', function() {
    it('shows UI to browse event collections when they exist', function() {
      assert.lengthOf($R(this.component).find('.event-browser').components, 1);
    });

    it('does not show UI alert when no event collections exist', function() {
      assert.lengthOf($R(this.component).find('.no-collections-alert').components, 0);
    });
  });

  describe('handling content when event collections do not exist', function() {
    beforeEach(function(){
      this.project.eventCollections = [];
      this.component = TestUtils.renderIntoDocument(<EventBrowser client={this.client} currentEventCollection={this.currentEventCollection} project={this.project} />);
    });
    
    it('does not show UI to browse event collections when they exist', function() {
      assert.lengthOf($R(this.component).find('.event-browser').components, 0);
    });

    it('shows UI alert when no event collections exist', function() {
      assert.lengthOf($R(this.component).find('.no-collections-alert').components, 1);
    });
  });
});
