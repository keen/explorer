import React from 'react';
import { render } from '@testing-library/react';
import selectEvent from 'react-select-event';

import SupportedInterval from './SupportedInterval';
import text from './text.json';

test('allows user to select interval', async () => {
  const mockFn = jest.fn();
  const interval = 'monthly';

  const { getByLabelText } = render(
    <SupportedInterval interval={undefined} onChange={mockFn} />
  );
  await selectEvent.select(getByLabelText(text.label), interval);

  expect(mockFn).toHaveBeenCalledWith(interval);
});
