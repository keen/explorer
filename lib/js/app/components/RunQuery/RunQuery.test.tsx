import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import RunQuery from './RunQuery';

test('calls "onClick" handler', () => {
  const mockFn = jest.fn();
  const { container } = render(
    <RunQuery onClick={mockFn} isLoading={false} />
  );

  const button = container.querySelector('button');
  fireEvent.click(button);

  expect(mockFn).toHaveBeenCalled();
});

test('render "children" nodes', () => {
  render(
    <RunQuery onClick={jest.fn()} isLoading={false}>
      <span>Run Query</span>
    </RunQuery>
  );

  expect(screen.getByText('Run Query')).toBeInTheDocument();
});
