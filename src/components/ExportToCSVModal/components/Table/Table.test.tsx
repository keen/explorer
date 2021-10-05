import React from 'react';
import { render as rtlRender } from '@testing-library/react';

import Table from './Table';

const data = [
  ['author_book', 'value', 'percentage value'],
  ['Edwidge Danticat | Love, Anger, Madness', 97, '11.6%'],
  ['George R. R. Martin | Game of Thrones', 730, '87.6%'],
  ['Stephen King | The Shining', 6, '0.7%'],
];

test('renders table', () => {
  const { getByText } = rtlRender(<Table data={data} />);

  const headerColumn = getByText('author_book');
  const lastRowElement = getByText('Stephen King | The Shining');

  expect(headerColumn).toBeInTheDocument();
  expect(lastRowElement).toBeInTheDocument();
});

test('limits table rows', () => {
  const { queryByText } = rtlRender(<Table data={data} rowLimit={2} />);

  const lastRowElement = queryByText('Stephen King | The Shining');

  expect(lastRowElement).not.toBeInTheDocument();
});

test('limits table columns', () => {
  const { queryByText } = rtlRender(<Table data={data} columnLimit={2} />);

  const lastColumnHeader = queryByText('percentage value');

  expect(lastColumnHeader).not.toBeInTheDocument();
});

test('displays message about total columns number', () => {
  const { queryByText } = rtlRender(<Table data={data} columnLimit={1} />);

  const limitedColumnsInfo = queryByText(
    'table.showing_number_columns_of_total'
  );

  expect(limitedColumnsInfo).toBeInTheDocument();
});

test('displays message about total rows number', () => {
  const { queryByText } = rtlRender(<Table data={data} rowLimit={2} />);

  const limitedRowsInfo = queryByText('table.showing_number_rows_of_total');

  expect(limitedRowsInfo).toBeInTheDocument();
});
