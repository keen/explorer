/** @jsx React.DOM */
var sinon = require('sinon');
var assert = require('chai').assert;
var _ = require('lodash');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var AddFavoriteModal = require('../../../../../client/js/app/components/explorer/favorites/add_favorite_modal.js');
var ExplorerUtils = require('../../../../../client/js/app/utils/ExplorerUtils');
var ExplorerActions = require('../../../../../client/js/app/actions/ExplorerActions');
var TestHelpers = require('../../../../support/TestHelpers')

describe('components/explorer/favorites/add_favorite_modal', function() {

  beforeEach(function() {
    this.callback = sinon.stub();
    this.component = TestUtils.renderIntoDocument(<AddFavoriteModal onSaveCallback={this.callback} />);
  });

  describe('setup', function() {
    it('is of the right type', function() {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, AddFavoriteModal));
    });
  });
});