import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import rquery from 'rquery';

const $R = rquery(_, React, ReactDOM, TestUtils);

import TestHelpers from '../../../../../../test/support/TestHelpers';
import ExplorerActions from '../../../../../../lib/js/app/actions/ExplorerActions.js';
import FunnelStep from '../../../../../../lib/js/app/components/explorer/query_builder/funnels/funnel_step.js';
import FunnelBuilder from '../../../../../../lib/js/app/components/explorer/query_builder/funnels/funnel_builder.js';

function getProps(props = {}) {
  const defaults = {
    modelId: 'abc123',
    steps: [],
    onBrowseEvents: jest.fn(),
    eventCollections: [],
    stepNotices: [],
    getEventPropertyNames: jest.fn().mockReturnValue([]),
    getPropertyType: jest.fn().mockReturnValue('String')
  };
  return _.assign({}, defaults, props);
}

describe('components/explorer/query_builder/funnels/funnel_builder', () => {
  let component;

  it('should render as many FunnelStep child components as there are steps', () => {
    component = TestHelpers.renderComponent(FunnelBuilder, getProps({
      steps: [
        TestHelpers.createStep(),
        TestHelpers.createStep(),
        TestHelpers.createStep()
      ]
    }));
    expect(TestUtils.scryRenderedComponentsWithType(component, FunnelStep)).toHaveLength(3);
  });

  it('should call ExplorerActions.addStep when the add step link is clicked', () => {
    component = TestHelpers.renderComponent(FunnelBuilder, getProps({
      steps: [ TestHelpers.createStep() ]
    }));
    const stub = jest.spyOn(ExplorerActions, 'addStep').mockImplementation(()=>{});
    TestUtils.Simulate.click($R(component).find('.add-step').components[0]);
    expect(stub).toHaveBeenCalled();
    stub.mockRestore();
  });

  it('should toggle a step active if it is inactive and the header is clicked', () => {
    component = TestHelpers.renderComponent(FunnelBuilder, getProps({
      steps: [ TestHelpers.createStep() ]
    }));
    const stub = jest.spyOn(ExplorerActions, 'setStepActive').mockImplementation(()=>{});
    TestUtils.Simulate.click($R(component).find('li .step-header').components[0]);
    expect(stub).toHaveBeenCalled();
    stub.mockRestore();
  });

  it('should toggle a step inactive if it is active and the header is clicked', () => {
    component = TestHelpers.renderComponent(FunnelBuilder, getProps({
      steps: [ _.assign(TestHelpers.createStep(), { active: true }) ]
    }));
    const stub = jest.spyOn(ExplorerActions, 'updateStep').mockImplementation(()=>{});
    TestUtils.Simulate.click($R(component).find('li .step-header').components[0]);
    expect(stub).toHaveBeenCalledWith('abc123', 0, { active: false });
    stub.mockRestore();
  });

});
