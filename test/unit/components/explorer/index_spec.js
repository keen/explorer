
var _ from 'lodash');
import React from 'react';
var ReactDOM from 'react-dom');
var TestUtils from 'react-addons-test-utils');
var TestHelpers from '../../../support/TestHelpers.js');
let sinon from 'sinon/pkg/sinon.js');
var KeenAnalysis from 'keen-analysis');
var Explorer from '../../../../lib/js/app/components/explorer/index.js');
var Visualization from '../../../../lib/js/app/components/explorer/visualization/index.js');
var QueryBuilder from '../../../../lib/js/app/components/explorer/query_builder/index.js');
var QueryPaneTabs from '../../../../lib/js/app/components/explorer/query_pane_tabs.js');
var BrowseQueries from '../../../../lib/js/app/components/explorer/saved_queries/browse_queries.js');
var Notice from '../../../../lib/js/app/components/common/notice.js');
var EventBrowser from '../../../../lib/js/app/components/common/event_browser.js');
var CacheToggle from '../../../../lib/js/app/components/explorer/cache_toggle.js');
var Persistence from '../../../../lib/js/app/modules/persistence/persistence.js');
var ExplorerStore from '../../../../lib/js/app/stores/ExplorerStore');
var NoticeStore from '../../../../lib/js/app/stores/NoticeStore');
var AppStateStore from '../../../../lib/js/app/stores/AppStateStore');
var ExplorerActions from '../../../../lib/js/app/actions/ExplorerActions');
var RunValidations from '../../../../lib/js/app/utils/RunValidations');
var NoticeActions from '../../../../lib/js/app/actions/NoticeActions');
var ExplorerUtils from '../../../../lib/js/app/utils/ExplorerUtils');
var Modal from '../../../../lib/js/app/components/common/modal.js');

describe('components/explorer/index', () => {

  before(() => {
    sinon.stub(ExplorerStore, 'addChangeListener');
    sinon.stub(NoticeStore, 'addChangeListener');
    sinon.stub(AppStateStore, 'addChangeListener');
  });

  after(() => {
    ExplorerStore.addChangeListener.restore();
    NoticeStore.addChangeListener.restore();
    AppStateStore.addChangeListener.restore();
  });

  beforeEach(() => {
    ExplorerStore.clearAll();
    ExplorerActions.create({ id: '1', query_name: 'A persisted query', metadata: { display_name: 'some name' } });
    ExplorerActions.setActive('1');

    this.project = TestHelpers.createProject();
    this.project.client = this.client = new KeenAnalysis(TestHelpers.createClient());
    this.project.client.resources({
      'events': '{protocol}://{host}/3.0/projects/{projectId}/events'
    });

    this.config = { persistence: null };
    this.explorer = ExplorerStore.get('1');
    this.component = TestUtils.renderIntoDocument(<Explorer client={this.client} project={this.project} persistence={null} />);
  });

  describe('setup', () => {

    it('is of the right type', () => {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, Explorer));
    });

    it('has a single Visualization child component', () => {
      assert.isNotNull(TestUtils.findRenderedComponentWithType(this.component, Visualization));
    });

    it('has a single QueryBuilder child component', () => {
      assert.isNotNull(TestUtils.findRenderedComponentWithType(this.component, QueryBuilder));
    });

    it('has a single EventBrowser child component', () => {
      assert.isNotNull(TestUtils.findRenderedComponentWithType(this.component, EventBrowser));
    });

    it('has the right number of Modal child components', () => {
      assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, Modal), 2);
    });

    describe('persistence', () => {

      describe('with persistence', () => {
        beforeEach(() => {
          this.persistence = { get: sinon.stub() };
          this.component = TestUtils.renderIntoDocument(<Explorer persistence={this.persistence} client={this.client} project={this.project} config={this.config} />);
        });

        it('has the QueryPaneTabs if persistence has been passed in', () => {
          assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, QueryPaneTabs), 1);
        });

        it('has the QueryBuilder component if persistence has not been passed in', () => {
          assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, QueryBuilder), 1);
        });

        it('can show BrowseQueries if persistence has been passed in', () => {
          TestUtils.Simulate.click(this.component.refs['query-pane-tabs'].refs['browse-tab']);
          assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, BrowseQueries), 1);
        });

        it('has the right number of Modal child components', () => {
          assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, Modal), 2);
        });

        describe('New query button', () => {
          it('has the "create new query" button if the currently active explorer is persisted', () => {
            this.explorer.id = 'abc-123';
            this.component.forceUpdate();
            assert.isDefined(this.component.refs['query-pane-tabs'].refs['new-query']);
          });

          it('does not have the "create new query" button if the currently active explorer is persisted', () => {
            this.explorer.id = 'TEMP-';
            this.component.forceUpdate();
            assert.isUndefined(this.component.refs['query-pane-tabs'].refs['new-query']);
          });
        });

        it('has the cache toggle if the analysis_type is not extraction', () => {
          this.explorer.query.analysis_type = 'count';
          this.component.forceUpdate();
          assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, CacheToggle), 1);
        });

        it('does not have the cache toggle if the analysis_type is extraction', () => {
          this.explorer.query.analysis_type = 'extraction';
          this.component.forceUpdate();
          assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, CacheToggle), 0);
        });
      });

      describe('without persistence', () => {
        beforeEach(() => {
          this.component = TestUtils.renderIntoDocument(<Explorer persistence={null} client={this.client} project={this.project} config={this.config} />);
        });

        it('does not have the QueryPaneTabs if persistence has not been passed in', () => {
          assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, QueryPaneTabs), 0);
        });

        it('does not have the BrowseQueries if persistence has not been passed in', () => {
          assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, BrowseQueries), 0);
        });
      });

    });
  });

  describe('basic interaction', () => {

    describe('tabbing between panes', () => {
      it('properly tabs from the query builder to browsing favorites', () => {
        var props = _.assign({}, this.component.props, { persistence: {} });
        this.component = TestHelpers.renderComponent(Explorer, props);

        TestUtils.Simulate.click(this.component.refs['query-pane-tabs'].refs['browse-tab']);

        assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, BrowseQueries), 1);
        assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, QueryBuilder), 0);
      });

      it('properly tabs from the query builder to browsing favorites', () => {
        var props = _.assign({}, this.component.props, { persistence: {} });
        this.component.setState({ activeQueryPane: 'browse' });
        this.component = TestHelpers.renderComponent(Explorer, props);

        TestUtils.Simulate.click(this.component.refs['query-pane-tabs'].refs['build-tab']);

        assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, QueryBuilder), 1);
        assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, BrowseQueries), 0);
      });
    });

    it('can launch the filter modal', () => {
      var filtersFieldsToggleNode = this.component.refs['query-builder'].refs['filters-fields-toggle'].refs['toggle-label'];
      TestUtils.Simulate.click(filtersFieldsToggleNode);
      assert.match(ReactDOM.findDOMNode(this.component.refs['filter-manager'].refs.modal).className, /block/);
    });

  });

  describe('Persisting', () => {

    beforeEach(() => {
      this.persistence = {
        create: () => {}
      };
      this.component = TestUtils.renderIntoDocument(<Explorer client={this.client}
                                                              config={{}}
                                                              project={this.project}
                                                              persistence={this.persistence} />);
    });

    describe('saveQueryClick', () => {
      it('should call ExplorerActions.save', () => {
        var saveStub = sinon.stub(ExplorerActions, 'save');
        sinon.stub(RunValidations, 'run').returns([]);

        this.explorer.id = 'TEMP-ABC';
        this.component.forceUpdate();

        this.component.saveQueryClick(TestHelpers.fakeEvent());

        assert.isTrue(saveStub.calledOnce);

        RunValidations.run.restore();
        ExplorerActions.save.restore();
      });
    });

    describe('removeSavedQueryClicked', () => {
      it('should call the destroy ExplorerAction with the right arguments', () => {
        this.explorer.id = 'ABC';
        var destroyStub = sinon.stub(ExplorerActions, 'destroy');
        sinon.stub(window, 'confirm').returns(true);
        this.component.removeSavedQueryClicked();
        assert.isTrue(destroyStub.calledWith(this.persistence, 'ABC'));
        ExplorerActions.destroy.restore();
        window.confirm.restore();
      });
    });

  });

  describe('component functions', () => {

    describe('saved queries', () => {

      beforeEach(() => {
        this.explorer.query.analysis_type = 'count';
        ExplorerStore.emit('CHANGE');
        this.persistence = {};
        this.component = TestUtils.renderIntoDocument(<Explorer persistence={this.persistence} client={this.client} project={this.project} config={this.config} />);
      });

      describe('clicking a saved query', () => {
        it('should not load the saved query and show a notice if there is already a query in-flight', () => {
          var setActiveStub = sinon.stub(ExplorerActions, 'setActive');
          var execStub = sinon.stub(ExplorerActions, 'exec');
          var noticeCreateStub = sinon.stub(NoticeActions, 'create');

          var newExplorer = _.cloneDeep(this.component.state.activeExplorer);
          newExplorer.loading = true;
          this.component.setState({
            activeExplorer: newExplorer
          });
          var fakeEvent = TestHelpers.fakeEvent();
          this.component.savedQueryClicked(fakeEvent);

          assert.isFalse(setActiveStub.called);
          assert.isFalse(execStub.called);
          assert.isTrue(noticeCreateStub.calledWith({
            icon: 'info-sign',
            type: 'warning',
            text: "There is already a query in progress. Wait for it to finish loading before selecting a query."
          }));

          ExplorerActions.setActive.restore();
          ExplorerActions.exec.restore();
          NoticeActions.create.restore();
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

        var props = _.assign({}, this.component.props, { persistence: {} });
        this.component = TestHelpers.renderComponent(Explorer, props);
      });

      it('should add a new explorer in the store', () => {
        this.component.cloneQueryClick(TestHelpers.fakeEvent());
        assert.strictEqual(_.keys(ExplorerStore.getAll()).length, 4);
      });

      it('should set the newly created explorer as active', () => {
        var stub = sinon.stub(ExplorerActions, 'setActive');
        this.component.cloneQueryClick(TestHelpers.fakeEvent());
        var keys = _.keys(ExplorerStore.getAll());
        var lastExplorer = ExplorerStore.getAll()[keys[keys.length-1]];
        assert.isTrue(stub.calledWith(lastExplorer.id));
        ExplorerActions.setActive.restore();
      });

      it('should change the text on the query builder tab to "Create a new query"', () => {
        assert.strictEqual(this.component.refs['query-pane-tabs'].refs['build-tab'].textContent, 'Edit query');
        this.component.cloneQueryClick(TestHelpers.fakeEvent());
        this.component._onChange();
        assert.strictEqual(this.component.refs['query-pane-tabs'].refs['build-tab'].textContent, 'Create a new query');
      });

      it('should update component state to show the build tab', () => {
        this.component.setState({ activeQueryPane: 'browse' });
        this.component.cloneQueryClick(TestHelpers.fakeEvent());
        assert.strictEqual(this.component.state.activeQueryPane, 'build');
      });

      it('should call clone method passing current or active explorer', () => {
    	  var cloneStub = sinon.stub(ExplorerActions, 'clone');
    	  this.component.cloneQueryClick(TestHelpers.fakeEvent());
    	  assert.isTrue(cloneStub.calledWith('abc'));
      });
    });

    describe('createNewQuery', () => {
      beforeEach(() => {
        ExplorerStore.clearAll();
        ExplorerActions.create(_.assign({}, TestHelpers.createExplorerModel(), { id: 'abc', metadata: { display_name: 'abc' } }));
        ExplorerActions.setActive('abc');
        ExplorerActions.create(_.assign({}, TestHelpers.createExplorerModel(), { id: 'def', metadata: { display_name: 'def' } }));
        ExplorerActions.create(_.assign({}, TestHelpers.createExplorerModel(), { id: 'ghi', metadata: { display_name: 'ghi' } }));

        var props = _.assign({}, this.component.props, { persistence: {} });
        this.component = TestHelpers.renderComponent(Explorer, props);
      });
      it('should add a new explorer in the store', () => {
        this.component.createNewQuery(TestHelpers.fakeEvent());
        assert.strictEqual(_.keys(ExplorerStore.getAll()).length, 4);
      });
      it('should set the newly created explorer as active', () => {
        var stub = sinon.stub(ExplorerActions, 'setActive');
        this.component.createNewQuery(TestHelpers.fakeEvent());
        var keys = _.keys(ExplorerStore.getAll());
        var lastExplorer = ExplorerStore.getAll()[keys[keys.length-1]];
        assert.isTrue(stub.calledWith(lastExplorer.id));
        ExplorerActions.setActive.restore();
      });
      it('should change the text on the query builder tab to "Create a new query"', () => {
        assert.strictEqual(this.component.refs['query-pane-tabs'].refs['build-tab'].textContent, 'Edit query');
        this.component.createNewQuery(TestHelpers.fakeEvent());
        this.component._onChange();
        assert.strictEqual(this.component.refs['query-pane-tabs'].refs['build-tab'].textContent, 'Create a new query');
      });
      it('should update component state to show the build tab', () => {
        this.component.setState({ activeQueryPane: 'browse' });
        this.component.createNewQuery(TestHelpers.fakeEvent());
        assert.strictEqual(this.component.state.activeQueryPane, 'build');
      });
    });

  });

});
