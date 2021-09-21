/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { render as rtlRender } from '@testing-library/react';

import Analyses from './Analyses';

const render = (overProps: any = {}) => {
  const props = {
    analyses: {
      'total signups': { analysis_type: 'count', target_property: null },
      'unique users': {
        analysis_type: 'count_unique',
        target_property: 'user.id',
      },
    },
    ...overProps,
  };

  const wrapper = rtlRender(<Analyses {...props} />);

  return {
    wrapper,
    props,
  };
};

test('renders Analyses info', () => {
  const {
    wrapper: { getByText },
  } = render();

  expect(getByText('Count')).toBeInTheDocument();
  expect(getByText(/count unique/i)).toBeInTheDocument();
  expect(getByText(/user.id/i)).toBeInTheDocument();
});
