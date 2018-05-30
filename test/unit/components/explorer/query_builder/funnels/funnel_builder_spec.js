var _ from 'lodash');

import React from 'react';
var ReactDOM from 'react-dom');
var TestUtils from 'react-addons-test-utils');
let sinon from 'sinon/pkg/sinon.js');
var $R from 'rquery')(_, React, ReactDOM, TestUtils);
var TestHelpers from '../../../../../support/TestHelpers');
var ExplorerActions from '../../../../../../lib/js/app/actions/ExplorerActions.js');
var FunnelStep from '../../../../../../lib/js/app/components/explorer/query_builder/funnels/funnel_step.js');
var FunnelBuilder from '../../../../../../lib/js/app/components/explorer/query_builder/funnels/funnel_builder.js');

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

describe('components/explorer/query_builder/funnels/funnel_builder', () => {

  it('should render as many FunnelStep child components as there are steps', () => {
    this.component = TestHelpers.renderComponent(FunnelBuilder, getProps({
      steps: [
        TestHelpers.createStep(),
        TestHelpers.createStep(),
        TestHelpers.createStep()
      ]
    }));
    assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, FunnelStep), 3);
  });

  it('should call ExplorerActions.addStep when the add step link is clicked', () => {
    this.component = TestHelpers.renderComponent(FunnelBuilder, getProps({
      steps: [ TestHelpers.createStep() ]
    }));
    var stub = sinon.stub(ExplorerActions, 'addStep');
    TestUtils.Simulate.click($R(this.component).find('.add-step').components[0]);
    assert.isTrue(stub.calledOnce);
    ExplorerActions.addStep.restore();
  });

  it('should toggle a step active if it is inactive and the header is clicked', () => {
    this.component = TestHelpers.renderComponent(FunnelBuilder, getProps({
      steps: [ TestHelpers.createStep() ]
    }));
    var stub = sinon.stub(ExplorerActions, 'setStepActive');
    TestUtils.Simulate.click($R(this.component).find('li .step-header').components[0]);
    assert.isTrue(stub.calledOnce);
    ExplorerActions.setStepActive.restore();
  });

  it('should toggle a step inactive if it is active and the header is clicked', () => {
    this.component = TestHelpers.renderComponent(FunnelBuilder, getProps({
      steps: [ _.assign(TestHelpers.createStep(), { active: true }) ]
    }));
    var stub = sinon.stub(ExplorerActions, 'updateStep');
    TestUtils.Simulate.click($R(this.component).find('li .step-header').components[0]);
    assert.isTrue(stub.calledWith('abc123', 0, { active: false }));
    ExplorerActions.updateStep.restore();
  });

});
