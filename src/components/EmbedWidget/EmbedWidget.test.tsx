import React from 'react';
import { render } from '@testing-library/react';

import EmbedWidget from './EmbedWidget';

test('renders code snippet', () => {
  const code = '<script>() => {}</script>';
  const { container } = render(<EmbedWidget>{code}</EmbedWidget>);

  expect(container).toMatchSnapshot();
});
