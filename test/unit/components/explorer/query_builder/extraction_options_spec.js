/** @jsx React.DOM */
var assert = require('chai').assert;
var _ = require('lodash');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var ExtractionOptions = require('../../../../../client/js/app/components/explorer/query_builder/extraction_options.js');
var TestHelpers = require('../../../../../test/support/TestHelpers');
var $R = require('rquery')(_, React);

describe('components/explorer/query_builder/extraction_options', function() {
  beforeEach(function() {
    var model = TestHelpers.createExplorerModel();
    this.defaultProps = {
      handleSelectionWithEvent: function(){},
      latest: model.query.latest,
      email: model.query.email,
      isEmail: false,
    };
    this.renderComponent = function(props) {
      var props = _.assign({}, this.defaultProps, props);
      return TestUtils.renderIntoDocument(<ExtractionOptions {...props} />);
    };
    this.component = this.renderComponent();
  });

  describe('an email extraction', function () {
    it('shows the email field', function() {
      this.component.setProps({
        isEmail: true
      });
      assert.lengthOf($R(this.component).find('input[name="email"]').components, 1);
    });
    it('shows the latest field', function() {
      this.component.setProps({
        isEmail: true
      });
      assert.lengthOf($R(this.component).find('LatestField').components, 1);
    });
  });
});