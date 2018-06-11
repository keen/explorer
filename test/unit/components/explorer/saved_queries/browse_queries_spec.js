import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import rquery from 'rquery';

import BrowseQueries from '../../../../../lib/js/app/components/explorer/saved_queries/browse_queries.js';
import ExplorerUtils from '../../../../../lib/js/app/utils/ExplorerUtils';
import ExplorerActions from '../../../../../lib/js/app/actions/ExplorerActions';
import TestHelpers from '../../../../../test/support/TestHelpers';

const $R = rquery(_, React, ReactDOM, TestUtils);

describe('components/explorer/saved_queries/browse_queries', () => {
  let renderComponent;
  let component;

  beforeEach(() => {
    const defaultProps = {
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
    renderComponent = function(props) {
      let propsExt = _.assign({}, defaultProps, props);
      return TestUtils.renderIntoDocument(<BrowseQueries {...propsExt} />);
    };
    component = renderComponent();
  });

  describe('setup', () => {
    it('is of the right type', () => {
      expect(TestUtils.isCompositeComponentWithType(component, BrowseQueries)).toBe(true);
    });

    it("creates a list item for each listItem prop", () => {
      expect(component.refs.list.childNodes).toHaveLength(3);
    });

    it("should use metadata.display_name as the default query name displayed in the browse tab", () => {
      component = renderComponent({
        listItems: [
          {
            id: 1,
            query_name: 'test-query-name',
            created_at: '2015-06-07 11:15:37.000000',
            metadata: {
              display_name: 'Test Display Name',
              visualization: {
                chart_type: null
              }
            }
          }
        ]
      });
      expect($R(component).find('h5')[0].textContent).toEqual('Test Display Name');
    });

    it("should use query_name as query name displayed in the browse tab when there's no metadata.display_name", () => {
      component = renderComponent({
        listItems: [
          {
            id: 1,
            query_name: 'test-query-name',
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
      expect($R(component).find('h5')[0].textContent).toEqual('test-query-name');
    });

    it("should use placeholder text for queries that do not have a query_name or metadata.display_name", () => {
      component = renderComponent({
        listItems: [
          {
            id: 1,
            query_name: null,
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
      expect($R(component).find('h5')[0].textContent).toEqual('Query not named');
    });
  });

  describe('Interactions', () => {
    describe('click callback', () => {
      it('should call the callback if a list element is clicked', () => {
        const stub = jest.fn();
        component = renderComponent({ clickCallback: stub });
        const firstListItem = component.refs.list.childNodes[0];
        TestUtils.Simulate.click(firstListItem);
        expect(stub).toBeCalled();
      });
    });
  });
});
