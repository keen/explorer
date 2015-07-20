/** @jsx React.DOM */
var sinon = require('sinon');
var assert = require('chai').assert;
var _ = require('lodash');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var BrowseFavorites = require('../../../../../client/js/app/components/explorer/favorites/browse_favorites.js');
var ExplorerUtils = require('../../../../../client/js/app/utils/ExplorerUtils');
var ExplorerActions = require('../../../../../client/js/app/actions/ExplorerActions');
var TestHelpers = require('../../../../support/TestHelpers')

describe('components/explorer/favorites/browse_favorites', function() {
  beforeEach(function() {
    var props = {
      listItems: [
        {
          id: 1,
          name: 'Logins over last 30 days',
          created_at: '2015-06-07 11:15:37.000000',
          user: {
            id: 1,
            email: 'eric@keen.io'
          }
        },
        {
          id: 2,
          name: 'Activation rate',
          created_at: '2015-06-07 11:15:37.000000',
          user: {
            id: 1,
            email: 'john@keen.io'
          }
        },
        {
          id: 2,
          name: 'QUERY RATES THIS WEEK',
          created_at: '2015-06-07 11:15:37.000000',
          user: {
            id: 1,
            email: 'michelle@keen.io'
          }
        }
      ],
      user: { id: 1 },
      removeCallback: null,
      clickCallback: null,
      selectedIndex: null,
      favListNotice: null,
      emptyContent: null
    };
    this.component = TestUtils.renderIntoDocument(<BrowseFavorites {...props} />);
  });

  describe('setup', function() {
    it('is of the right type', function() {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, BrowseFavorites));
    });

    it("creates a list item for each listItem prop", function() {
      assert.equal(this.component.refs.list.getDOMNode().childNodes.length, 3);
    });
  });

  describe('Interactions', function () {
    describe('click callback', function () {
      it('should call the callback if the element clicked does NOT have the remove role', function () {
        var stub = sinon.stub();
        this.component.setProps({ clickCallback: stub });
        var firstListItem = this.component.refs.list.getDOMNode().childNodes[0];
        TestUtils.Simulate.click(firstListItem);
        assert.isTrue(stub.calledOnce);
      });
      it('should NOT call the callback if the element clicked has the remove role', function () {
        var stub = sinon.stub();
        this.component.setProps({ removeCallback: sinon.stub(), clickCallback: stub });
        var firstListItemRemove = this.component.refs.list.getDOMNode().childNodes[0].childNodes[0];
        TestUtils.Simulate.click(firstListItemRemove);
        assert.isFalse(stub.calledOnce);
      });
    });
    describe('remove callback', function () {
      it('should call the callback if the element clicked has the remove role', function () {
        var stub = sinon.stub();
        this.component.setProps({ removeCallback: stub });
        var firstListItemRemove = this.component.refs.list.getDOMNode().childNodes[0].childNodes[0];
        TestUtils.Simulate.click(firstListItemRemove);
        assert.isTrue(stub.calledOnce);
      });
      it('should NOT call the callback if the element clicked does NOT have the remove role', function () {
        var stub = sinon.stub();
        this.component.setProps({ removeCallback: stub, clickCallback: sinon.stub()  });
        var firstListItem = this.component.refs.list.getDOMNode().childNodes[0];
        TestUtils.Simulate.click(firstListItem);
        assert.isFalse(stub.calledOnce);
      });
    });
    describe('searching', function () {
      it('should search case insensitively', function () {
        var searchbox = this.component.refs.searchbox.getDOMNode();
        searchbox.value = 'rate';
        TestUtils.Simulate.change(searchbox);
        var itemsText = _.map(this.component.refs.list.getDOMNode().childNodes, function(listItem) {
          return $(listItem).find('h5').text();
        }, this);
        assert.sameMembers(itemsText, ['QUERY RATES THIS WEEK', 'Activation rate']);
      });
    });
    describe('Remove button presence', function () {
      beforeEach(function(){
        this.component.setProps({ 
          listItems: [
            {
              id: 1,
              name: 'Logins over last 30 days',
              created_at: '2015-06-07 11:15:37.000000',
              user: {
                id: 1,
                email: 'eric@keen.io'
              }
            },
            {
              id: 2,
              name: 'Activation rate',
              created_at: '2015-06-07 11:15:37.000000',
              user: {
                id: 2,
                email: 'john@keen.io'
              }
            }
          ], 
          user: { id: 1 },
          removeCallback: sinon.stub()
        });
      });
      it('should show if the favorite if your own', function () {
        assert.lengthOf($(this.component.refs.list.getDOMNode().childNodes[0]).find('.remove-btn'), 1);
      });
      it('should NOT show if the favorite is NOT yours', function () {
        assert.lengthOf($(this.component.refs.list.getDOMNode().childNodes[1]).find('.remove-btn'), 0);
      });
    });
    describe('Everyone vs Mine filter', function () {
      beforeEach(function(){
        this.component.setProps({ 
          listItems: [
            {
              id: 1,
              name: 'First',
              created_at: '2015-06-07 11:15:37.000000',
              user: {
                id: 1,
                email: 'eric@keen.io'
              }
            },
            {
              id: 2,
              name: 'Second',
              created_at: '2015-06-07 11:15:37.000000',
              user: {
                id: 2,
                email: 'john@keen.io'
              }
            }
          ], 
          user: { id: 1 },
          removeCallback: sinon.stub()
        });
      });
      it('should only show yours favs if "mine" is selected', function () {
        TestUtils.Simulate.change(this.component.refs['user-filter'].getDOMNode());
        var itemsText = _.map(this.component.refs.list.getDOMNode().childNodes, function(listItem) {
          return $(listItem).find('h5').text();
        }, this);
        assert.sameMembers(itemsText, ['First']);
      });
      it('should show all favs if "all" is selected', function () {
        TestUtils.Simulate.change(this.component.refs['all-filter'].getDOMNode());
        var itemsText = _.map(this.component.refs.list.getDOMNode().childNodes, function(listItem) {
          return $(listItem).find('h5').text();
        }, this);
        assert.sameMembers(itemsText, ['First', 'Second']);
      });
    });
  });
});