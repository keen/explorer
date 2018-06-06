import _ from 'lodash';
import KeenAnalysis from 'keen-analysis';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import TestHelpers from '../../../support/TestHelpers';
import EventBrowser from '../../../../lib/js/app/components/common/event_browser.js';
import Loader from '../../../../lib/js/app/components/common/loader.js';
import ExplorerActions from '../../../../lib/js/app/actions/ExplorerActions';
import ExplorerUtils from '../../../../lib/js/app/utils/ExplorerUtils';
import ProjectUtils from '../../../../lib/js/app/utils/ProjectUtils';
import FormatUtils from '../../../../lib/js/app/utils/FormatUtils';
import ProjectActions from '../../../../lib/js/app/actions/ProjectActions';
import rquery from 'rquery';
const $R = rquery(_, React, ReactDOM, TestUtils);

describe('components/common/event_browser', () => {
  let runQueryStub;
  let fetchCollectionSchemaStub;
  let project;
  let renderComponent;
  let client;
  let component;
  let currentEventCollection = 'click';

  beforeAll(() => {
    runQueryStub = jest.spyOn(ExplorerUtils, 'runQuery').mockImplementation(() => {});
    fetchCollectionSchemaStub = jest.spyOn(ProjectActions, 'fetchCollectionSchema');
  });

  afterAll(() => {
    runQueryStub.mockRestore();
    fetchCollectionSchemaStub.mockRestore();
  });

  beforeEach(() => {
    runQueryStub.mockClear();

    project = TestHelpers.createProject();
    project.loading = true;
    project.client = client = new KeenAnalysis(TestHelpers.createClient());
    project.client.resources({
      'events': '{protocol}://{host}/3.0/projects/{projectId}/events'
    });
    // Ensure there are already some recent events
    project.schema.click.recentEvents = [{ name: 'first recent event' }];

    renderComponent = (props = {}) => {
      const defaultProps = {
        currentEventCollection,
        project
      };
      return TestUtils.renderIntoDocument(<EventBrowser {..._.assign({}, defaultProps, props)} />);
    };
    component = renderComponent();
  });

  describe('setup', () => {
    it('is of the right type', () => {
      expect(TestUtils.isCompositeComponentWithType(component, EventBrowser)).toBe(true);
    });

    it('has a single a Loader component', () => {
      expect(TestUtils.scryRenderedComponentsWithType(component, Loader).length).toBe(1);
    });
  });

  describe('handling content when event collections exist', () => {
    it('shows UI to browse event collections when they exist', () => {
      expect($R(component).find('.event-browser').components.length).toBe(1);
    });

    it('does not show UI alert when no event collections exist', () => {
      expect($R(component).find('.no-collections-alert').components.length).toBe(0);
    });
  });

  describe('handling content when event collections do not exist', () => {
    beforeEach(() => {
      project.eventCollections = [];
      component = TestUtils.renderIntoDocument(<EventBrowser client={client} currentEventCollection={currentEventCollection} project={project} />);
    });

    it('does not show UI to browse event collections when they exist', () => {
      expect($R(component).find('.event-browser').components.length).toBe(0);
    });

    it('shows UI alert when no event collections exist', () => {
      expect($R(component).find('.no-collections-alert').components.length).toBe(1);
    });
  });

  describe('handling the active event collection', () => {
    it('does not try to access recent events when activeEventCollection is a string that does not match a collection', () => {
      component = renderComponent({ currentEventCollection: 'some string that does not match an event collection' });
      expect(component.getRecentEvents()).toBe("");
    });
    it('properly returns the recent events when activeEventCollection is a string that matches a collection', () => {
      component = renderComponent({ currentEventCollection: 'click' });
      expect(component.getRecentEvents()).toBe(FormatUtils.prettyPrintJSON([{ name: 'first recent event' }]));
    });
  });
});
