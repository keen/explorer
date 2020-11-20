import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import SaveQuery from './SaveQuery';

test('calls "onSave" handler', () => {
  const mockFn = jest.fn();
  const { container } = render(
    <SaveQuery onSave={mockFn} isSaving={false} isExist={false} />
  );

  const button = container.querySelector('button');
  fireEvent.click(button);

  expect(mockFn).toHaveBeenCalled();
});

test('shows button with "Update" label', () => {
  const mockFn = jest.fn();
  render(<SaveQuery onSave={mockFn} isSaving={false} isExist={true} />);

  expect(screen.getByText('Update')).toBeInTheDocument();
});

test('shows button with "Save" label', () => {
  const mockFn = jest.fn();
  render(<SaveQuery onSave={mockFn} isSaving={false} isExist={false} />);

  expect(screen.getByText('Save')).toBeInTheDocument();
});
