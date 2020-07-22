import React from 'react';
import { render as rtlRender, screen } from '@testing-library/react';
import selectEvent from 'react-select-event';

import Timezone from './Timezone';
import text from './text.json';

const render = (overProps: any = {}) => {
  const props = {
    timezone: 'UTC',
    onChange: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<Timezone {...props} />);

  return {
    props,
    wrapper,
  };
};

test('allows user to select timezone', async () => {
  const storeState = {
    query: {
      timezone: undefined,
    },
  };

  const {
    props,
    wrapper: { getByLabelText },
  } = render(storeState);
  await selectEvent.select(getByLabelText(text.label), 'Europe/London');

  expect(props.onChange).toHaveBeenCalledWith('Europe/London');
});
