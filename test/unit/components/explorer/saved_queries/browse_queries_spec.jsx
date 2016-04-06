/** @jsx React.DOM */
var sinon = require('sinon');
var assert = require('chai').assert;
var _ = require('lodash');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var BrowseQueries = require('../../../../../client/js/app/components/explorer/saved_queries/browse_queries.jsx');
var ExplorerUtils = require('../../../../../client/js/app/utils/ExplorerUtils');
var ExplorerActions = require('../../../../../client/js/app/actions/ExplorerActions');
var TestHelpers = require('../../../../support/TestHelpers');
var $R = require('rquery')(_, React, ReactDOM, TestUtils);

describe('components/explorer/saved_queries/browse_queries', function() {
  beforeEach(function() {
    var defaultProps = {
      listItems: [
        {
          id: 1,
          query_name: 'logins-over-last-30-days',
          created_at: '2015-06-07 11:15:37.000000',
          metadata: {
            display_name: 'Logins over last 30 days'
          }
        },
        {
          id: 2,
          query_name: 'activation-rate',
          created_at: '2015-06-07 11:15:37.000000',
          metadata: {
            display_name: 'Activation rate'
          }
        },
        {
          id: 2,
          query_name: 'QUERY-RATES-THIS-WEEK',
          created_at: '2015-06-07 11:15:37.000000',
          metadata: {
            display_name: 'QUERY RATES THIS WEEK'
          }
        }
      ],
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
      assert.equal(this.component.refs.list.childNodes.length, 3);
    });

    it("uses placeholder text for queries that do not have metadata or display_name", function() {
      this.component = this.renderComponent({
        listItems: [
          {
            id: 1,
            query_name: 'logins-over-last-30-days',
            created_at: '2015-06-07 11:15:37.000000',
            metadata: {
              display_name: null,
              visualization: {
                chart_type: null
              }
            }
          }
        ]
      });
      console.log($R(this.component).find('h5')[0]);
      assert.equal($R(this.component).find('h5')[0].textContent, 'Query not named');
    });
  });

  describe('Interactions', function () {
    describe('click callback', function () {
      it('should call the callback if a list element is clicked', function () {
        var stub = sinon.stub();
        this.component = this.renderComponent({ clickCallback: stub });
        var firstListItem = this.component.refs.list.childNodes[0];
        TestUtils.Simulate.click(firstListItem);
        assert.isTrue(stub.calledOnce);
      });
    });
  });
});
