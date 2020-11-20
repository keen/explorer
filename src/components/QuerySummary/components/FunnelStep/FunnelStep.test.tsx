/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import FunnelStep from './FunnelStep';

const render = (overProps: any = {}) => {
  const props = {
    index: 0,
    step: {
      with_actors: false,
      actor_property: 'item.price',
      filters: [],
      timeframe: 'this_14_days',
      timezone: -25200,
      event_collection: 'purchases',
      optional: false,
      inverted: false,
    },
    ...overProps,
  };

  const wrapper = rtlRender(<FunnelStep {...props} />);

  return {
    wrapper,
    props,
  };
};

test('should render only header with title', () => {
  const {
    wrapper: { getByText, queryByText },
    props,
  } = render();

  const header = getByText(props.step.event_collection);
  const timeframe = queryByText(props.step.timeframe);
  expect(header).toBeInTheDocument();
  expect(timeframe).toBeNull();
});

test('should render step details by clicking on header', () => {
  const {
    wrapper: { getByText, queryByText },
    props,
  } = render();

  const header = getByText(props.step.event_collection);
  fireEvent.click(header);

  const timeframe = queryByText(props.step.timeframe);
  expect(timeframe).toBeInTheDocument();
});
