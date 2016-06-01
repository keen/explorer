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
// var ProjectActions = require('../../../../client/js/app/actions/ProjectActions');
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
    this.currentEventCollection = 'click';

    this.project = TestHelpers.createProject();
    this.project.loading = true;
    this.project.client = this.client = new KeenAnalysis(TestHelpers.createClient());
    this.project.client.resources({
      'events': '{protocol}://{host}/3.0/projects/{projectId}/events'
    });
    // ProjectActions.create({ client: this.client });

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
});
