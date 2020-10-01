/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import 'jest-styled-components';
import { render as rtlRender } from '@testing-library/react';

import QuerySummary from './QuerySummary';

const render = (overProps: any = {}) => {
  const props = {
    querySettings: {
      query: {
        analysis_type: 'sum',
        event_collection: 'purchases',
        target_property: 'item.price',
        timezone: 'UTC',
        filters: [
          {
            operator: 'gt',
            property_value: '100',
            property_name: 'item.quantity',
          },
        ],
      },
    },
    ...overProps,
  };

  const wrapper = rtlRender(<QuerySummary {...props} />);

  return {
    wrapper,
    props,
  };
};

test('should render query summary', () => {
  const {
    wrapper: { container },
  } = render();

  expect(container).toMatchSnapshot();
});

test('should render query summary for funnels', () => {
  const querySettings = {
    query: {
      analysis_type: 'funnel',
      steps: [
        {
          with_actors: false,
          actor_property: 'user.id',
          filters: [],
          timeframe: 'this_14_days',
          timezone: 'UTC',
          event_collection: 'signups',
          optional: false,
          inverted: false,
        },
        {
          with_actors: false,
          actor_property: 'user.id',
          filters: [],
          timeframe: 'this_14_days',
          timezone: 'UTC',
          event_collection: 'purchases',
          optional: false,
          inverted: false,
        },
      ],
    },
  };
  const {
    wrapper: { container },
  } = render({ querySettings });
  expect(container).toMatchSnapshot();
});
