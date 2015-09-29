/** @jsx React.DOM */
var sinon = require('sinon');
var assert = require('chai').assert;
var _ = require('lodash');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var BrowseQueries = require('../../../../../client/js/app/components/explorer/saved_queries/browse_queries.js');
var ExplorerUtils = require('../../../../../client/js/app/utils/ExplorerUtils');
var ExplorerActions = require('../../../../../client/js/app/actions/ExplorerActions');
var TestHelpers = require('../../../../support/TestHelpers')

describe('components/explorer/saved_queries/browse_queries', function() {
  beforeEach(function() {
    var defaultProps = {
      listItems: [
        {
          id: 1,
          query_name: 'logins-over-last-30-days',
          created_at: '2015-06-07 11:15:37.000000',
          metadata: {
            display_name: 'Logins over last 30 days',
            user: {
              id: 1,
              email: 'eric@keen.io'
            }
          }
        },
        {
          id: 2,
          query_name: 'activation-rate',
          created_at: '2015-06-07 11:15:37.000000',
          metadata: {
            display_name: 'Activation rate',
            user: {
              id: 1,
              email: 'john@keen.io'
            }
          }
        },
        {
          id: 2,
          query_name: 'QUERY-RATES-THIS-WEEK',
          created_at: '2015-06-07 11:15:37.000000',
          metadata: {
            display_name: 'QUERY RATES THIS WEEK',
            user: {
              id: 1,
              email: 'michelle@keen.io'
            }
          }
        }
      ],
      user: { id: 1 },
      removeCallback: null,
      clickCallback: null,
      selectedIndex: null,
      notice: null,
      emptyContent: null
    };
    this.renderComponent = function(props) {
      var props = _.assign({}, defaultProps, props);
      return TestUtils.renderIntoDocument(<BrowseQueries {...props} />);
    };
    this.component = this.renderComponent();
  });

  describe('setup', function() {
    it('is of the right type', function() {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, BrowseQueries));
    });

    it("creates a list item for each listItem prop", function() {
      assert.equal(this.component.refs.list.getDOMNode().childNodes.length, 3);
    });
  });

  describe('Interactions', function () {
    describe('click callback', function () {
      it('should call the callback if a list element is clicked', function () {
        var stub = sinon.stub();
        this.component = this.renderComponent({ clickCallback: stub });
        var firstListItem = this.component.refs.list.getDOMNode().childNodes[0];
        TestUtils.Simulate.click(firstListItem);
        assert.isTrue(stub.calledOnce);
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

    describe('Everyone vs Mine filter', function () {
      beforeEach(function(){
        this.component = this.renderComponent({ 
          listItems: [
            {
              id: 1,
              query_name: 'First',
              created_at: '2015-06-07 11:15:37.000000',
              metadata: {
                display_name: 'First',
                user: {
                  id: 1,
                  email: 'eric@keen.io'
                }
              }
            },
            {
              id: 2,
              query_name: 'Second',
              created_at: '2015-06-07 11:15:37.000000',
              metadata: {
                display_name: 'Second',
                user: {
                  id: 2,
                  email: 'john@keen.io'
                }
              }
            }
          ], 
          user: { id: 1 },
          removeCallback: sinon.stub()
        });
      });
      it('should only show yours queries if "mine" is selected', function () {
        TestUtils.Simulate.change(this.component.refs['user-filter'].getDOMNode());
        var itemsText = _.map(this.component.refs.list.getDOMNode().childNodes, function(listItem) {
          return $(listItem).find('h5').text();
        }, this);
        assert.sameMembers(itemsText, ['First']);
      });
      it('should show all queries if "all" is selected', function () {
        TestUtils.Simulate.change(this.component.refs['all-filter'].getDOMNode());
        var itemsText = _.map(this.component.refs.list.getDOMNode().childNodes, function(listItem) {
          return $(listItem).find('h5').text();
        }, this);
        assert.sameMembers(itemsText, ['First', 'Second']);
      });
    });
  });
});
