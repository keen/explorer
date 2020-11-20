import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import DropIndicator from './DropIndicator';

test('calls "onClick" handler', () => {
  const mockFn = jest.fn();
  const { getByTestId } = render(<DropIndicator onClick={mockFn} />);

  const element = getByTestId('drop-indicator');
  fireEvent.click(element);

  expect(mockFn).toHaveBeenCalled();
});
