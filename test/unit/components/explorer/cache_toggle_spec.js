
var _ from 'lodash');

var Explorer from '../../../../lib/js/app/components/explorer/index.js');
var CacheToggle from '../../../../lib/js/app/components/explorer/cache_toggle.js');

import React from 'react';
var ReactDOM from 'react-dom');
var TestUtils from 'react-addons-test-utils');
var TestHelpers from '../../../support/TestHelpers.js');
var $R from 'rquery')(_, React, ReactDOM, TestUtils);

describe('components/explorer/cache_toggle', () => {
  beforeEach(() => {
    this.model = TestHelpers.createExplorerModel();
    this.model.metadata.user = { id: 1 };
    this.model.metadata.display_name = 'A saved query name';
    this.model.refresh_rate = 0;

    this.defaultProps = {
      model: this.model,
      user: { id: 1 }
    }

    this.renderComponent = function(props) {
      var props = _.assign({}, this.defaultProps, props);
      return TestUtils.renderIntoDocument(<CacheToggle {...props}/>);
    };
    this.component = this.renderComponent();
  });

  describe('setup', () => {
    it('is of right type', () => {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, CacheToggle));
    });
  });

  describe('enable caching checkbox', () => {
    it('allows user to enable caching if refresh_rate is 0', () => {
      var checkboxLabel = $R(this.component).find('label[for="cache"]');

      assert.equal(checkboxLabel.text(), 'Enable caching');
    })

    it('allows user to turn off caching if refresh_rate is not 0', () => {
      this.model.refresh_rate = 14400;
      this.component.forceUpdate();
      var checkboxLabel = $R(this.component).find('label[for="cache"]');

      assert.equal(checkboxLabel.text(), 'Caching enabled');
    });
  });

  describe('last updated text', () => {
    it('shows last updated time in hours and minutes when there is run information', () => {
      this.model.run_information = {
        last_run_date: new Date() - 20 * 60 * 1000,
        last_run_status: 200
      };
      this.model.refresh_rate = 14400;
      this.component.forceUpdate();

      var cacheDetails = $R(this.component).find('.cache-details');

      assert.equal(cacheDetails.text(), 'Last updated 20 minutes ago.');
    });
  });

});
