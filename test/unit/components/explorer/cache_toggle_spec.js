/** @jsx React.DOM */
var assert = require('chai').assert;
var _ = require('lodash');

var Explorer = require('../../../../client/js/app/components/explorer/index.js');
var CacheToggle = require('../../../../client/js/app/components/explorer/cache_toggle.js');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var TestHelpers = require('../../../support/TestHelpers.js');
var $R = require('rquery')(_, React, ReactDOM, TestUtils);

describe('components/explorer/cache_toggle', function() {
  beforeEach(function() {
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

  describe('setup', function() {
    it('is of right type', function() {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, CacheToggle));
    });
  });

  describe('enable caching checkbox', function() {
    it('allows user to enable caching if refresh_rate is 0', function() {
      var checkboxLabel = $R(this.component).find('label[for="cache"]');

      assert.equal(checkboxLabel.text(), 'Enable caching');
    })

    it('allows user to turn off caching if refresh_rate is not 0', function() {
      this.model.refresh_rate = 14400;
      this.component.forceUpdate();
      var checkboxLabel = $R(this.component).find('label[for="cache"]');

      assert.equal(checkboxLabel.text(), 'Caching enabled');
    });
  });

  describe('last updated text', function() {
    it('shows last updated time in hours and minutes when there is run information', function() {
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
