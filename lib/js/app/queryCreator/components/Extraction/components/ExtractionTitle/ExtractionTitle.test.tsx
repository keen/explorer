import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import ExtractionTitle from './ExtractionTitle';
import text from './text.json';

test('renders message about extracting all properties', () => {
  const { getByText } = render(
    <ExtractionTitle
      isFullExtraction
      isDisabled={false}
      onClearProperties={jest.fn()}
    />
  );

  expect(getByText(text.fullExtraction)).toBeInTheDocument();
});

test('allows user to clear all extraction properties', () => {
  const mockFn = jest.fn();
  const { getByText } = render(
    <ExtractionTitle
      isFullExtraction={false}
      isDisabled={false}
      onClearProperties={mockFn}
    />
  );

  const element = getByText(text.clearProperties);
  fireEvent.click(element);

  expect(mockFn).toHaveBeenCalled();
});
