import React from 'react';
import { render } from '@testing-library/react';

import StyledTable from './index';

test('should render <StyledTable/>', () => {
  const { container } = render(
    <StyledTable.Table>
      <StyledTable.Body>
        <StyledTable.Row>
          <StyledTable.Label>Label</StyledTable.Label>
          <StyledTable.Value>Value</StyledTable.Value>
        </StyledTable.Row>
      </StyledTable.Body>
    </StyledTable.Table>
  );

  expect(container).toMatchSnapshot();
});
