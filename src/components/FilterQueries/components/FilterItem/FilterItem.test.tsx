import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import FilterItem from './FilterItem';

test('calls "onChange" event handler', () => {
  const mockFn = jest.fn();
  const { getByText } = render(
    <FilterItem label="label" id="id" onChange={mockFn} />
  );

  const element = getByText('label');
  fireEvent.click(element);

  expect(mockFn).toHaveBeenCalledWith(true);
});
