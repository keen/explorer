/** @jsx React.DOM */
var assert = require('chai').assert;
var _ = require('lodash');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var TestHelpers = require('../../../support/TestHelpers.js');
var sinon = require('sinon');
var KeenAnalysis = require('keen-analysis');
var Explorer = require('../../../../client/js/app/components/explorer/index.js');
var Visualization = require('../../../../client/js/app/components/explorer/visualization/index.js');
var QueryBuilder = require('../../../../client/js/app/components/explorer/query_builder/index.js');
var QueryPaneTabs = require('../../../../client/js/app/components/explorer/query_pane_tabs.js');
var BrowseQueries = require('../../../../client/js/app/components/explorer/saved_queries/browse_queries.js');
var Notice = require('../../../../client/js/app/components/common/notice.js');
var EventBrowser = require('../../../../client/js/app/components/common/event_browser.js');
var CacheToggle = require('../../../../client/js/app/components/explorer/cache_toggle.js');
var Persistence = require('../../../../client/js/app/modules/persistence/persistence.js');
var ExplorerStore = require('../../../../client/js/app/stores/ExplorerStore');
var NoticeStore = require('../../../../client/js/app/stores/NoticeStore');
var AppStateStore = require('../../../../client/js/app/stores/AppStateStore');
var ExplorerActions = require('../../../../client/js/app/actions/ExplorerActions');
var RunValidations = require('../../../../client/js/app/utils/RunValidations');
var NoticeActions = require('../../../../client/js/app/actions/NoticeActions');
var ExplorerUtils = require('../../../../client/js/app/utils/ExplorerUtils');
var Modal = require('../../../../client/js/app/components/common/modal.js');

describe('components/explorer/index', function() {

  before(function() {
    sinon.stub(ExplorerStore, 'addChangeListener');
    sinon.stub(NoticeStore, 'addChangeListener');
    sinon.stub(AppStateStore, 'addChangeListener');
  });

  after(function() {
    ExplorerStore.addChangeListener.restore();
    NoticeStore.addChangeListener.restore();
    AppStateStore.addChangeListener.restore();
  });

  beforeEach(function() {
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

  describe('setup', function() {

    it('is of the right type', function() {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, Explorer));
    });

    it('has a single Visualization child component', function(){
      assert.isNotNull(TestUtils.findRenderedComponentWithType(this.component, Visualization));
    });

    it('has a single QueryBuilder child component', function(){
      assert.isNotNull(TestUtils.findRenderedComponentWithType(this.component, QueryBuilder));
    });

    it('has a single EventBrowser child component', function(){
      assert.isNotNull(TestUtils.findRenderedComponentWithType(this.component, EventBrowser));
    });

    it('has the right number of Modal child components', function(){
      assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, Modal), 2);
    });

    describe('persistence', function(){

      describe('with persistence', function(){
        beforeEach(function(){
          this.persistence = { get: sinon.stub() };
          this.component = TestUtils.renderIntoDocument(<Explorer persistence={this.persistence} client={this.client} project={this.project} config={this.config} />);
        });

        it('has the QueryPaneTabs if persistence has been passed in', function(){
          assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, QueryPaneTabs), 1);
        });

        it('has the QueryBuilder component if persistence has not been passed in', function(){
          assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, QueryBuilder), 1);
        });

        it('can show BrowseQueries if persistence has been passed in', function(){
          TestUtils.Simulate.click(this.component.refs['query-pane-tabs'].refs['browse-tab']);
          assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, BrowseQueries), 1);
        });

        it('has the right number of Modal child components', function(){
          assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, Modal), 2);
        });

        describe('New query button', function () {
          it('has the "create new query" button if the currently active explorer is persisted', function(){
            this.explorer.id = 'abc-123';
            this.component.forceUpdate();
            assert.isDefined(this.component.refs['query-pane-tabs'].refs['new-query']);
          });

          it('does not have the "create new query" button if the currently active explorer is persisted', function(){
            this.explorer.id = 'TEMP-';
            this.component.forceUpdate();
            assert.isUndefined(this.component.refs['query-pane-tabs'].refs['new-query']);
          });
        });

        it('has the cache toggle if the analysis_type is not extraction', function(){
          this.explorer.query.analysis_type = 'count';
          this.component.forceUpdate();
          assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, CacheToggle), 1);
        });

        it('does not have the cache toggle if the analysis_type is extraction', function(){
          this.explorer.query.analysis_type = 'extraction';
          this.component.forceUpdate();
          assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, CacheToggle), 0);
        });
      });

      describe('without persistence', function(){
        beforeEach(function(){
          this.component = TestUtils.renderIntoDocument(<Explorer persistence={null} client={this.client} project={this.project} config={this.config} />);
        });

        it('does not have the QueryPaneTabs if persistence has not been passed in', function(){
          assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, QueryPaneTabs), 0);
        });

        it('does not have the BrowseQueries if persistence has not been passed in', function(){
          assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, BrowseQueries), 0);
        });
      });

    });
  });

  describe('basic interaction', function() {

    describe('tabbing between panes', function () {
      it('properly tabs from the query builder to browsing favorites', function () {
        var props = _.assign({}, this.component.props, { persistence: {} });
        this.component = TestHelpers.renderComponent(Explorer, props);

        TestUtils.Simulate.click(this.component.refs['query-pane-tabs'].refs['browse-tab']);

        assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, BrowseQueries), 1);
        assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, QueryBuilder), 0);
      });

      it('properly tabs from the query builder to browsing favorites', function () {
        var props = _.assign({}, this.component.props, { persistence: {} });
        this.component.setState({ activeQueryPane: 'browse' });
        this.component = TestHelpers.renderComponent(Explorer, props);

        TestUtils.Simulate.click(this.component.refs['query-pane-tabs'].refs['build-tab']);

        assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, QueryBuilder), 1);
        assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, BrowseQueries), 0);
      });
    });

    it('can launch the filter modal', function() {
      var filtersFieldsToggleNode = this.component.refs['query-builder'].refs['filters-fields-toggle'].refs['toggle-label'];
      TestUtils.Simulate.click(filtersFieldsToggleNode);
      assert.match(ReactDOM.findDOMNode(this.component.refs['filter-manager'].refs.modal).className, /block/);
    });

  });

  describe('Persisting', function () {

    beforeEach(function () {
      this.persistence = {
        create: function(){}
      };
      this.component = TestUtils.renderIntoDocument(<Explorer client={this.client}
                                                              config={{}}
                                                              project={this.project}
                                                              persistence={this.persistence} />);
    });

    describe('saveQueryClick', function () {
      it('should call ExplorerActions.save', function () {
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

    describe('removeSavedQueryClicked', function () {
      it('should call the destroy ExplorerAction with the right arguments', function () {
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

  describe('component functions', function () {

    describe('saved queries', function () {

      beforeEach(function () {
        this.explorer.query.analysis_type = 'count';
        ExplorerStore.emit('CHANGE');
        this.persistence = {};
        this.component = TestUtils.renderIntoDocument(<Explorer persistence={this.persistence} client={this.client} project={this.project} config={this.config} />);
      });

      describe('clicking a saved query', function () {
        it('should not load the saved query and show a notice if there is already a query in-flight', function () {
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
      
    describe('cloneQueryClick', function () {
      beforeEach(function() {
        ExplorerStore.clearAll();
        ExplorerActions.create(_.assign({}, TestHelpers.createExplorerModel(), { id: 'abc', metadata: { display_name: 'abc' } }));
        ExplorerActions.setActive('abc');
        ExplorerActions.create(_.assign({}, TestHelpers.createExplorerModel(), { id: 'def', metadata: { display_name: 'def' } }));
        ExplorerActions.create(_.assign({}, TestHelpers.createExplorerModel(), { id: 'ghi', metadata: { display_name: 'ghi' } }));

        var props = _.assign({}, this.component.props, { persistence: {} });
        this.component = TestHelpers.renderComponent(Explorer, props);
      });

      it('should add a new explorer in the store', function () {
        this.component.cloneQueryClick(TestHelpers.fakeEvent());
        assert.strictEqual(_.keys(ExplorerStore.getAll()).length, 4);
      });

      it('should set the newly created explorer as active', function () {
        var stub = sinon.stub(ExplorerActions, 'setActive');
        this.component.cloneQueryClick(TestHelpers.fakeEvent());
        var keys = _.keys(ExplorerStore.getAll());
        var lastExplorer = ExplorerStore.getAll()[keys[keys.length-1]];
        assert.isTrue(stub.calledWith(lastExplorer.id));
        ExplorerActions.setActive.restore();
      });

      it('should change the text on the query builder tab to "Create a new query"', function () {
        assert.strictEqual(this.component.refs['query-pane-tabs'].refs['build-tab'].textContent, 'Edit query');
        this.component.cloneQueryClick(TestHelpers.fakeEvent());
        this.component._onChange();
        assert.strictEqual(this.component.refs['query-pane-tabs'].refs['build-tab'].textContent, 'Create a new query');
      });

      it('should update component state to show the build tab', function () {
        this.component.setState({ activeQueryPane: 'browse' });
        this.component.cloneQueryClick(TestHelpers.fakeEvent());
        assert.strictEqual(this.component.state.activeQueryPane, 'build');
      });

      it('should call clone method passing current or active explorer', function() {
    	  var cloneStub = sinon.stub(ExplorerActions, 'clone');
    	  this.component.cloneQueryClick(TestHelpers.fakeEvent());
    	  assert.isTrue(cloneStub.calledWith('abc'));
      });
    });

    describe('createNewQuery', function () {
      beforeEach(function() {
        ExplorerStore.clearAll();
        ExplorerActions.create(_.assign({}, TestHelpers.createExplorerModel(), { id: 'abc', metadata: { display_name: 'abc' } }));
        ExplorerActions.setActive('abc');
        ExplorerActions.create(_.assign({}, TestHelpers.createExplorerModel(), { id: 'def', metadata: { display_name: 'def' } }));
        ExplorerActions.create(_.assign({}, TestHelpers.createExplorerModel(), { id: 'ghi', metadata: { display_name: 'ghi' } }));

        var props = _.assign({}, this.component.props, { persistence: {} });
        this.component = TestHelpers.renderComponent(Explorer, props);
      });
      it('should add a new explorer in the store', function () {
        this.component.createNewQuery(TestHelpers.fakeEvent());
        assert.strictEqual(_.keys(ExplorerStore.getAll()).length, 4);
      });
      it('should set the newly created explorer as active', function () {
        var stub = sinon.stub(ExplorerActions, 'setActive');
        this.component.createNewQuery(TestHelpers.fakeEvent());
        var keys = _.keys(ExplorerStore.getAll());
        var lastExplorer = ExplorerStore.getAll()[keys[keys.length-1]];
        assert.isTrue(stub.calledWith(lastExplorer.id));
        ExplorerActions.setActive.restore();
      });
      it('should change the text on the query builder tab to "Create a new query"', function () {
        assert.strictEqual(this.component.refs['query-pane-tabs'].refs['build-tab'].textContent, 'Edit query');
        this.component.createNewQuery(TestHelpers.fakeEvent());
        this.component._onChange();
        assert.strictEqual(this.component.refs['query-pane-tabs'].refs['build-tab'].textContent, 'Create a new query');
      });
      it('should update component state to show the build tab', function () {
        this.component.setState({ activeQueryPane: 'browse' });
        this.component.createNewQuery(TestHelpers.fakeEvent());
        assert.strictEqual(this.component.state.activeQueryPane, 'build');
      });
    });

  });

});
