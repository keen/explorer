import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import rquery from 'rquery';

import Explorer from '../../../../lib/js/app/components/explorer/index.js';
import CacheToggle from '../../../../lib/js/app/components/explorer/cache_toggle.js';
import TestHelpers from '../../../support/TestHelpers.js';

const $R = rquery(_, React, ReactDOM, TestUtils);

describe('components/explorer/cache_toggle', () => {
  let model;
  let defaultProps;
  let renderComponent;
  let component;
  beforeEach(() => {
    model = TestHelpers.createExplorerModel();
    model.metadata.user = { id: 1 };
    model.metadata.display_name = 'A saved query name';
    model.refresh_rate = 0;

    defaultProps = {
      model: model,
      user: { id: 1 }
    }

    renderComponent = function(props) {
      var props = _.assign({}, defaultProps, props);
      return TestUtils.renderIntoDocument(<CacheToggle {...props}/>);
    };
    component = renderComponent();
  });

  describe('setup', () => {
    it('is of right type', () => {
      expect(TestUtils.isCompositeComponentWithType(component, CacheToggle)).toBe(true);
    });
  });

  describe('enable caching checkbox', () => {
    it('allows user to enable caching if refresh_rate is 0', () => {
      const checkboxLabel = $R(component).find('label[for="cache"]');

      expect(checkboxLabel.text()).toEqual('Enable caching');
    })

    it('allows user to turn off caching if refresh_rate is not 0', () => {
      model.refresh_rate = 14400;
      component.forceUpdate();
      const checkboxLabel = $R(component).find('label[for="cache"]');

      expect(checkboxLabel.text()).toEqual('Caching enabled');
    });
  });

  describe('last updated text', () => {
    it('shows last updated time in hours and minutes when there is run information', () => {
      model.run_information = {
        last_run_date: new Date() - 20 * 60 * 1000,
        last_run_status: 200
      };
      model.refresh_rate = 14400;
      component.forceUpdate();

      const cacheDetails = $R(component).find('.cache-details');

      expect(cacheDetails.text()).toEqual('Last updated 20 minutes ago.');
    });
  });

});
