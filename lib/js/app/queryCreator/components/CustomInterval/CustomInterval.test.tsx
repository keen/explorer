import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import selectEvent from 'react-select-event';

import CustomInterval from './CustomInterval';
import text from './text.json';

test('allows user to select interval units', async () => {
  const mockFn = jest.fn();
  const interval = 'years';

  const {
    getByLabelText
  } = render(<CustomInterval interval="every_14_weeks" onChange={mockFn} />);
  await selectEvent.select(getByLabelText(text.unitLabel), interval);

  expect(mockFn).toHaveBeenCalledWith('every_14_years');
});

test('allows user to select interval value', async () => {
  const mockFn = jest.fn();

  const {container } = render(<CustomInterval interval="every_14_weeks" onChange={mockFn} />);
  const input = container.querySelector('input[type="number"]');
  fireEvent.change(input, { target: { value: 80 } });
  
  expect(mockFn).toHaveBeenCalledWith('every_80_weeks');
});
