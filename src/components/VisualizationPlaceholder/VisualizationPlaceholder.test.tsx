import React from 'react';
import { render } from '@testing-library/react';

import VisualizationPlaceholder from './VisualizationPlaceholder';

test('render placeholder with loading indicator', () => {
  const { queryByText } = render(<VisualizationPlaceholder isLoading />);
  const loadingPlaceholder = queryByText(
    'visualization_placeholder.loading_message'
  );
  const placeholder = queryByText('visualization_placeholder.message');

  expect(loadingPlaceholder).toBeInTheDocument();
  expect(placeholder).toBeNull();
});

test('render visualization placeholder', () => {
  const { queryByText } = render(
    <VisualizationPlaceholder isLoading={false} />
  );
  const loadingPlaceholder = queryByText(
    'visualization_placeholder.loading_message'
  );
  const placeholder = queryByText('visualization_placeholder.message');

  expect(loadingPlaceholder).toBeNull();
  expect(placeholder).toBeInTheDocument();
});
