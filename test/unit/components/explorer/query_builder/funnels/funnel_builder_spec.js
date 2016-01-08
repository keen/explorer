var _ = require('lodash');
var assert = require('chai').assert;
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var sinon = require('sinon');
var $R = require('rquery')(_, React, ReactDOM, TestUtils);
var TestHelpers = require('../../../../../support/TestHelpers');
var ExplorerActions = require('../../../../../../client/js/app/actions/ExplorerActions.js');
var FunnelStep = require('../../../../../../client/js/app/components/explorer/query_builder/funnels/funnel_step.js');
var FunnelBuilder = require('../../../../../../client/js/app/components/explorer/query_builder/funnels/funnel_builder.js');

function getProps(props) {
  var props = props || {};
  var defaults = {
    modelId: 'abc123',
    steps: [],
    onBrowseEvents: sinon.stub(),
    eventCollections: [],
    stepNotices: [],
    getEventPropertyNames: sinon.stub().returns([]),
    getPropertyType: sinon.stub().returns('String')
  };
  return _.assign({}, defaults, props);
}

describe('components/explorer/query_builder/funnels/funnel_builder', function() {

  it('should render as many FunnelStep child components as there are steps', function () {
    this.component = TestHelpers.renderComponent(FunnelBuilder, getProps({
      steps: [ 
        TestHelpers.createStep(),
        TestHelpers.createStep(),
        TestHelpers.createStep()
      ]
    }));
    assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, FunnelStep), 3);
  });

  it('should call ExplorerActions.addStep when the add step link is clicked', function () {
    this.component = TestHelpers.renderComponent(FunnelBuilder, getProps({
      steps: [ TestHelpers.createStep() ]
    }));
    var stub = sinon.stub(ExplorerActions, 'addStep');
    TestUtils.Simulate.click($R(this.component).find('.add-step').components[0]);
    assert.isTrue(stub.calledOnce);
    ExplorerActions.addStep.restore();
  });

  it('should toggle a step active if it is inactive and the header is clicked', function () {
    this.component = TestHelpers.renderComponent(FunnelBuilder, getProps({
      steps: [ TestHelpers.createStep() ]
    }));
    var stub = sinon.stub(ExplorerActions, 'setStepActive');
    TestUtils.Simulate.click($R(this.component).find('li .step-header').components[0]);
    assert.isTrue(stub.calledOnce);
    ExplorerActions.setStepActive.restore();
  });

  it('should toggle a step inactive if it is active and the header is clicked', function () {
    this.component = TestHelpers.renderComponent(FunnelBuilder, getProps({
      steps: [ _.assign(TestHelpers.createStep(), { active: true }) ]
    }));
    var stub = sinon.stub(ExplorerActions, 'updateStep');
    TestUtils.Simulate.click($R(this.component).find('li .step-header').components[0]);
    assert.isTrue(stub.calledWith('abc123', 0, { active: false }));
    ExplorerActions.updateStep.restore();
  });

});
