/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { render as rtlRender } from '@testing-library/react';

import FunnelSteps from './FunnelSteps';

const render = (overProps: any = {}) => {
  const props = {
    steps: [
      {
        with_actors: false,
        actor_property: 'item.price',
        filters: [],
        timeframe: 'this_14_days',
        timezone: -25200,
        event_collection: 'purchases',
        optional: false,
        inverted: false,
      },
      {
        with_actors: false,
        actor_property: 'item.amount',
        filters: [],
        timeframe: 'this_14_days',
        timezone: -25200,
        event_collection: 'purchases',
        optional: false,
        inverted: false,
      },
    ],
    ...overProps,
  };

  const wrapper = rtlRender(<FunnelSteps {...props} />);

  return {
    wrapper,
    props,
  };
};

test('should render correct number of steps', () => {
  const {
    wrapper: { queryAllByText },
    props,
  } = render();

  const steps = queryAllByText('purchases');
  expect(steps.length).toEqual(props.steps.length);
});
