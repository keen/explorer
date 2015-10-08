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
  });
});
