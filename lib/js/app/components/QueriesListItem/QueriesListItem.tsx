import React, { FC } from 'react';

type Props = {
  /** Saved query name */
  queryName: string;
  /** Click event handler */
  onClick: (e: React.MouseEvent<HTMLTableRowElement>) => void;
};

const QueriesListItem: FC<Props> = ({ queryName, onClick }) => (
  <tr onClick={onClick}>
    <td>{queryName}</td>
    <td>2</td>
    <td>3</td>
  </tr>
);

export default QueriesListItem;
