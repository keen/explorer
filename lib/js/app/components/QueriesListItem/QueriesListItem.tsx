import React, { FC } from 'react';
import { Badge } from '@keen.io/ui-core';

type Props = {
  /** Saved query name */
  queryName: string;
  /** Query tags */
  tags: string[];
  /** Click event handler */
  onClick: (e: React.MouseEvent<HTMLTableRowElement>) => void;
};

const QueriesListItem: FC<Props> = ({ queryName, tags, onClick }) => (
  <tr onClick={onClick}>
    <td>{queryName}</td>
    <td>
      {' '}
      {tags.map((tag) => (
        <span key={tag}>
          <Badge variant="purple">{tag}</Badge>
        </span>
      ))}
    </td>
    <td>3</td>
  </tr>
);

export default QueriesListItem;
