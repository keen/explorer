/** @jsx React.DOM */
var assert = require('chai').assert;
var expect = require('chai').expect;
var sinon = require('sinon');
var _ = require('lodash');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var ExtractionOptions = require('../../../../../client/js/app/components/explorer/query_builder/extraction_options.js');
var TestHelpers = require('../../../../../test/support/TestHelpers');
var $R = require('rquery')(_, React);

describe('components/explorer/query_builder/extraction_options', function() {
  beforeEach(function() {
    this.model = TestHelpers.createExplorerModel();
    this.defaultProps = {
      handleSelectionWithEvent: function(){},
      model: this.model
    };
    this.renderComponent = function(props) {
      var props = _.assign({}, this.defaultProps, props);
      return TestUtils.renderIntoDocument(<ExtractionOptions {...props} />);
    };
    this.component = this.renderComponent();
  });

  describe('analysis type is set to extraction and email is an empty string', function () {
    it('shows the email field', function() {
      this.model.query.event_collection = 'click';
      this.model.query.analysis_type = 'extraction';
      this.model.query.email = '';
      this.component.forceUpdate();
      assert.lengthOf($R(this.component).find('input[name="email"]').components, 1);
    });
    it('shows the email field', function() {
      this.model.query.event_collection = 'click';
      this.model.query.analysis_type = 'extraction';
      this.model.query.email = '';
      this.component.forceUpdate();
      assert.lengthOf($R(this.component).find('input[name="latest"]').components, 1);
    });
  });

  describe('analysis type is not extraction', function () {
    it('does not shows the email field', function() {
      this.model.query.event_collection = 'click';
      this.model.query.analysis_type = 'count';
      this.component.forceUpdate();
      assert.lengthOf($R(this.component).find('input[name="email"]').components, 0);
    });
    it('does not shows the email field', function() {
      this.model.query.event_collection = 'click';
      this.model.query.analysis_type = 'count';
      this.component.forceUpdate();
      assert.lengthOf($R(this.component).find('input[name="latest"]').components, 0);
    });
  });

});