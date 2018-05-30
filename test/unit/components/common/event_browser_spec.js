let sinon from 'sinon/pkg/sinon.js');

var _ from 'lodash');
var KeenAnalysis from 'keen-analysis');
import React from 'react';
var ReactDOM from 'react-dom');
var TestUtils from 'react-addons-test-utils');
var TestHelpers from '../../../support/TestHelpers');
var EventBrowser from '../../../../lib/js/app/components/common/event_browser.js');
var Loader from '../../../../lib/js/app/components/common/loader.js');
var ExplorerActions from '../../../../lib/js/app/actions/ExplorerActions');
var ExplorerUtils from '../../../../lib/js/app/utils/ExplorerUtils');
var ProjectUtils from '../../../../lib/js/app/utils/ProjectUtils');
var FormatUtils from '../../../../lib/js/app/utils/FormatUtils');
var ProjectActions from '../../../../lib/js/app/actions/ProjectActions');
var $R from 'rquery')(_, React, ReactDOM, TestUtils);

describe('components/common/event_browser', () => {

  before(() => {
    this.runQueryStub = sinon.stub(ExplorerUtils, 'runQuery');
    sinon.stub(ProjectActions, 'fetchCollectionSchema');
  });

  after(() => {
    ExplorerUtils.runQuery.restore();
    ProjectActions.fetchCollectionSchema.restore();
  });

  beforeEach(() => {
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

  describe('setup', () => {
    it('is of the right type', () => {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, EventBrowser));
    });

    it('has a single a Loader component', () => {
      assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, Loader), 1);
    });
  });

  describe('handling content when event collections exist', () => {
    it('shows UI to browse event collections when they exist', () => {
      assert.lengthOf($R(this.component).find('.event-browser').components, 1);
    });

    it('does not show UI alert when no event collections exist', () => {
      assert.lengthOf($R(this.component).find('.no-collections-alert').components, 0);
    });
  });

  describe('handling content when event collections do not exist', () => {
    beforeEach(() => {
      this.project.eventCollections = [];
      this.component = TestUtils.renderIntoDocument(<EventBrowser client={this.client} currentEventCollection={this.currentEventCollection} project={this.project} />);
    });

    it('does not show UI to browse event collections when they exist', () => {
      assert.lengthOf($R(this.component).find('.event-browser').components, 0);
    });

    it('shows UI alert when no event collections exist', () => {
      assert.lengthOf($R(this.component).find('.no-collections-alert').components, 1);
    });
  });

  describe('handling the active event collection', () => {
    it('does not try to access recent events when activeEventCollection is a string that does not match a collection', () => {
      this.component = this.renderComponent({ currentEventCollection: 'some string that does not match an event collection' });
      assert.strictEqual(this.component.getRecentEvents(), "");
    });
    it('properly returns the recent events when activeEventCollection is a string that matches a collection', () => {
      this.component = this.renderComponent({ currentEventCollection: 'click' });
      assert.strictEqual(this.component.getRecentEvents(), FormatUtils.prettyPrintJSON([{ name: 'first recent event' }]));
    });
  });
});
