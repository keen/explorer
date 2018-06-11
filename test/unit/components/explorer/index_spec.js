import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import KeenAnalysis from 'keen-analysis';

import TestHelpers from '../../../support/TestHelpers.js';
import Explorer from '../../../../lib/js/app/components/explorer/index.js';
import Visualization from '../../../../lib/js/app/components/explorer/visualization/index.js';
import QueryBuilder from '../../../../lib/js/app/components/explorer/query_builder/index.js';
import QueryPaneTabs from '../../../../lib/js/app/components/explorer/query_pane_tabs.js';
import BrowseQueries from '../../../../lib/js/app/components/explorer/saved_queries/browse_queries.js';
import Notice from '../../../../lib/js/app/components/common/notice.js';
import EventBrowser from '../../../../lib/js/app/components/common/event_browser.js';
import CacheToggle from '../../../../lib/js/app/components/explorer/cache_toggle.js';
import Persistence from '../../../../lib/js/app/modules/persistence/persistence.js';
import ExplorerStore from '../../../../lib/js/app/stores/ExplorerStore';
import NoticeStore from '../../../../lib/js/app/stores/NoticeStore';
import AppStateStore from '../../../../lib/js/app/stores/AppStateStore';
import ExplorerActions from '../../../../lib/js/app/actions/ExplorerActions';
import NoticeActions from '../../../../lib/js/app/actions/NoticeActions';
import ExplorerUtils from '../../../../lib/js/app/utils/ExplorerUtils';
import Modal from '../../../../lib/js/app/components/common/modal.js';

describe('components/explorer/index', () => {
  let ExplorerStoreSpy;
  let NoticeStoreSpy;
  let AppStateStoreSpy;
  let project;
  let config;
  let explorer;
  let component;
  let client;
  let persistence;

  beforeAll(() => {
    ExplorerStoreSpy = jest.spyOn(ExplorerStore, 'addChangeListener').mockImplementation(()=>{});
    NoticeStoreSpy = jest.spyOn(NoticeStore, 'addChangeListener').mockImplementation(()=>{});
    AppStateStoreSpy = jest.spyOn(AppStateStore, 'addChangeListener').mockImplementation(()=>{});
  });

  afterAll(() => {
    ExplorerStoreSpy.mockRestore();
    NoticeStoreSpy.mockRestore();
    AppStateStoreSpy.mockRestore();
  });

  beforeEach(() => {
    ExplorerStore.clearAll();
    ExplorerActions.create({ id: '1', query_name: 'A persisted query', metadata: { display_name: 'some name' } });
    ExplorerActions.setActive('1');

    project = TestHelpers.createProject();
    project.client = client = new KeenAnalysis(TestHelpers.createClient());
    project.client.resources({
      'events': '{protocol}://{host}/3.0/projects/{projectId}/events'
    });

    config = { persistence: null };
    explorer = ExplorerStore.get('1');
    component = TestUtils.renderIntoDocument(<Explorer client={client} project={project} persistence={null} />);
  });

  describe('setup', () => {

    it('is of the right type', () => {
      expect(TestUtils.isCompositeComponentWithType(component, Explorer)).toBe(true);
    });

    it('has a single Visualization child component', () => {
      expect(TestUtils.findRenderedComponentWithType(component, Visualization)).not.toBe(null);
    });

    it('has a single QueryBuilder child component', () => {
      expect(TestUtils.findRenderedComponentWithType(component, QueryBuilder)).not.toBe(null);
    });

    it('has a single EventBrowser child component', () => {
      expect(TestUtils.findRenderedComponentWithType(component, EventBrowser)).not.toBe(null);
    });

    it('has the right number of Modal child components', () => {
      expect(TestUtils.scryRenderedComponentsWithType(component, Modal)).toHaveLength(2);
    });

    describe('persistence', () => {

      describe('with persistence', () => {
        beforeEach(() => {
          persistence = { get: jest.fn() };
          component = TestUtils.renderIntoDocument(<Explorer persistence={persistence} client={client} project={project} config={config} />);
        });

        it('has the QueryPaneTabs if persistence has been passed in', () => {
          expect(TestUtils.scryRenderedComponentsWithType(component, QueryPaneTabs)).toHaveLength(1);
        });

        it('has the QueryBuilder component if persistence has not been passed in', () => {
          expect(TestUtils.scryRenderedComponentsWithType(component, QueryBuilder)).toHaveLength(1);
        });

        it('can show BrowseQueries if persistence has been passed in', () => {
          TestUtils.Simulate.click(component.refs['query-pane-tabs'].refs['browse-tab']);
          expect(TestUtils.scryRenderedComponentsWithType(component, BrowseQueries)).toHaveLength(1);
        });

        it('has the right number of Modal child components', () => {
          expect(TestUtils.scryRenderedComponentsWithType(component, Modal)).toHaveLength(2);
        });

        describe('New query button', () => {
          it('has the "create new query" button if the currently active explorer is persisted', () => {
            explorer.id = 'abc-123';
            component.forceUpdate();
            expect(component.refs['query-pane-tabs'].refs['new-query']).not.toBe(undefined);
          });

          it('does not have the "create new query" button if the currently active explorer is persisted', () => {
            explorer.id = 'TEMP-';
            component.forceUpdate();
            expect(component.refs['query-pane-tabs'].refs['new-query']).toBe(undefined);
          });
        });

        it('has the cache toggle if the analysis_type is not extraction', () => {
          explorer.query.analysis_type = 'count';
          component.forceUpdate();
          expect(TestUtils.scryRenderedComponentsWithType(component, CacheToggle)).toHaveLength(1);
        });

        it('does not have the cache toggle if the analysis_type is extraction', () => {
          explorer.query.analysis_type = 'extraction';
          component.forceUpdate();
          expect(TestUtils.scryRenderedComponentsWithType(component, CacheToggle)).toHaveLength(0);
        });
      });

      describe('without persistence', () => {
        beforeEach(() => {
          component = TestUtils.renderIntoDocument(<Explorer persistence={null} client={client} project={project} config={config} />);
        });

        it('does not have the QueryPaneTabs if persistence has not been passed in', () => {
          expect(TestUtils.scryRenderedComponentsWithType(component, QueryPaneTabs)).toHaveLength(0);
        });

        it('does not have the BrowseQueries if persistence has not been passed in', () => {
          expect(TestUtils.scryRenderedComponentsWithType(component, BrowseQueries)).toHaveLength(0);
        });
      });

    });
  });

  describe('basic interaction', () => {

    describe('tabbing between panes', () => {
      it('properly tabs from the query builder to browsing favorites', () => {
        const props = _.assign({}, component.props, { persistence: {} });
        component = TestHelpers.renderComponent(Explorer, props);

        TestUtils.Simulate.click(component.refs['query-pane-tabs'].refs['browse-tab']);

        expect(TestUtils.scryRenderedComponentsWithType(component, BrowseQueries)).toHaveLength(1);
        expect(TestUtils.scryRenderedComponentsWithType(component, QueryBuilder)).toHaveLength(0);
      });

      it('properly tabs from the query builder to browsing favorites', () => {
        const props = _.assign({}, component.props, { persistence: {} });
        component.setState({ activeQueryPane: 'browse' });
        component = TestHelpers.renderComponent(Explorer, props);

        TestUtils.Simulate.click(component.refs['query-pane-tabs'].refs['build-tab']);

        expect(TestUtils.scryRenderedComponentsWithType(component, QueryBuilder)).toHaveLength(1);
        expect(TestUtils.scryRenderedComponentsWithType(component, BrowseQueries)).toHaveLength(0);
      });
    });

    it('can launch the filter modal', () => {
      const filtersFieldsToggleNode = component.refs['query-builder'].refs['filters-fields-toggle'].refs['toggle-label'];
      TestUtils.Simulate.click(filtersFieldsToggleNode);
      expect(ReactDOM.findDOMNode(component.refs['filter-manager'].refs.modal).className).toContain('block');
    });

  });

  describe('Persisting', () => {

    beforeEach(() => {
      persistence = {
        create: () => {}
      };
      component = TestUtils.renderIntoDocument(<Explorer client={client}
                                                              config={{}}
                                                              project={project}
                                                              persistence={persistence} />);
    });

    describe('saveQueryClick', () => {
      it('should call ExplorerActions.save', () => {
        const saveStub = jest.spyOn(ExplorerActions, 'save').mockImplementation(()=>{});
        explorer.id = 'TEMP-ABC';
        component.forceUpdate();
        component.saveQueryClick(TestHelpers.fakeEvent());
        expect(saveStub).toHaveBeenCalledTimes(1);
        saveStub.mockRestore();
      });
    });

    describe('removeSavedQueryClicked', () => {
      it('should call the destroy ExplorerAction with the right arguments', () => {
        explorer.id = 'ABC';
        const destroyStub = jest.spyOn(ExplorerActions, 'destroy').mockImplementation(()=>{});
        const confirmStub = jest.spyOn(window, 'confirm').mockImplementation(()=>{}).mockReturnValue(true);
        component.removeSavedQueryClicked();
        expect(destroyStub).toBeCalledWith(persistence, 'ABC');
        destroyStub.mockRestore();
        confirmStub.mockRestore();
      });
    });

  });

  describe('component functions', () => {

    describe('saved queries', () => {

      beforeEach(() => {
        explorer.query.analysis_type = 'count';
        ExplorerStore.emit('CHANGE');
        persistence = {};
        component = TestUtils.renderIntoDocument(<Explorer persistence={persistence} client={client} project={project} config={config} />);
      });

      describe('clicking a saved query', () => {
        it('should not load the saved query and show a notice if there is already a query in-flight', () => {
          const setActiveStub = jest.spyOn(ExplorerActions, 'setActive').mockImplementation(()=>{});
          const execStub = jest.spyOn(ExplorerActions, 'exec').mockImplementation(()=>{});
          const noticeCreateStub = jest.spyOn(NoticeActions, 'create').mockImplementation(()=>{});

          const newExplorer = _.cloneDeep(component.state.activeExplorer);
          newExplorer.loading = true;
          component.setState({
            activeExplorer: newExplorer
          });
          const fakeEvent = TestHelpers.fakeEvent();
          component.savedQueryClicked(fakeEvent);

          expect(setActiveStub).not.toHaveBeenCalled();
          expect(execStub).not.toHaveBeenCalled();
          expect(noticeCreateStub.mock.calls[0][0]).toEqual({
            icon: 'info-sign',
            type: 'warning',
            text: "There is already a query in progress. Wait for it to finish loading before selecting a query."
          });

          setActiveStub.mockRestore();
          execStub.mockRestore();
          noticeCreateStub.mockRestore();
        });
      });

    });

    describe('cloneQueryClick', () => {
      beforeEach(() => {
        ExplorerStore.clearAll();
        ExplorerActions.create(_.assign({}, TestHelpers.createExplorerModel(), { id: 'abc', metadata: { display_name: 'abc' } }));
        ExplorerActions.setActive('abc');
        ExplorerActions.create(_.assign({}, TestHelpers.createExplorerModel(), { id: 'def', metadata: { display_name: 'def' } }));
        ExplorerActions.create(_.assign({}, TestHelpers.createExplorerModel(), { id: 'ghi', metadata: { display_name: 'ghi' } }));

        let props = _.assign({}, component.props, { persistence: {} });
        component = TestHelpers.renderComponent(Explorer, props);
      });

      it('should add a new explorer in the store', () => {
        component.cloneQueryClick(TestHelpers.fakeEvent());
        expect(_.keys(ExplorerStore.getAll())).toHaveLength(4);
      });

      it('should set the newly created explorer as active', () => {
        const stub = jest.spyOn(ExplorerActions, 'setActive');
        component.cloneQueryClick(TestHelpers.fakeEvent());
        const keys = _.keys(ExplorerStore.getAll());
        const lastExplorer = ExplorerStore.getAll()[keys[keys.length-1]];
        expect(stub).toHaveBeenCalledWith(lastExplorer.id);
        stub.mockRestore();
      });

      it('should change the text on the query builder tab to "Create a new query"', () => {
        expect(component.refs['query-pane-tabs'].refs['build-tab'].textContent).toEqual('Edit query');
        component.cloneQueryClick(TestHelpers.fakeEvent());
        component._onChange();
        expect(component.refs['query-pane-tabs'].refs['build-tab'].textContent).toEqual('Create a new query');
      });

      it('should update component state to show the build tab', () => {
        component.setState({ activeQueryPane: 'browse' });
        component.cloneQueryClick(TestHelpers.fakeEvent());
        expect(component.state.activeQueryPane).toEqual('build');
      });

      it('should call clone method passing current or active explorer', () => {
    	  const cloneStub = jest.spyOn(ExplorerActions, 'clone');
    	  component.cloneQueryClick(TestHelpers.fakeEvent());
    	  expect(cloneStub).toHaveBeenCalledWith('abc');
      });
    });

    describe('createNewQuery', () => {
      beforeEach(() => {
        ExplorerStore.clearAll();
        ExplorerActions.create(_.assign({}, TestHelpers.createExplorerModel(), { id: 'abc', metadata: { display_name: 'abc' } }));
        ExplorerActions.setActive('abc');
        ExplorerActions.create(_.assign({}, TestHelpers.createExplorerModel(), { id: 'def', metadata: { display_name: 'def' } }));
        ExplorerActions.create(_.assign({}, TestHelpers.createExplorerModel(), { id: 'ghi', metadata: { display_name: 'ghi' } }));

        let props = _.assign({}, component.props, { persistence: {} });
        component = TestHelpers.renderComponent(Explorer, props);
      });
      it('should add a new explorer in the store', () => {
        component.createNewQuery(TestHelpers.fakeEvent());
        expect(_.keys(ExplorerStore.getAll())).toHaveLength(4);
      });
      it('should set the newly created explorer as active', () => {
        const stub = jest.spyOn(ExplorerActions, 'setActive');
        component.createNewQuery(TestHelpers.fakeEvent());
        const keys = _.keys(ExplorerStore.getAll());
        const lastExplorer = ExplorerStore.getAll()[keys[keys.length-1]];
        expect(stub).toBeCalledWith(lastExplorer.id);
        stub.mockRestore();
      });
      it('should change the text on the query builder tab to "Create a new query"', () => {
        expect(component.refs['query-pane-tabs'].refs['build-tab'].textContent).toEqual('Edit query');
        component.createNewQuery(TestHelpers.fakeEvent());
        component._onChange();
        expect(component.refs['query-pane-tabs'].refs['build-tab'].textContent).toEqual('Create a new query');
      });
      it('should update component state to show the build tab', () => {
        component.setState({ activeQueryPane: 'browse' });
        component.createNewQuery(TestHelpers.fakeEvent());
        expect(component.state.activeQueryPane).toEqual('build');
      });
    });

  });

});
