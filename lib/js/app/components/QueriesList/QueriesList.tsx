import React, { FC } from 'react';

import { QueriesTable, Header } from './QueriesList.styles';

import QueriesListItem from '../QueriesListItem';

import { SavedQueryListItem } from '../../modules/queries';
import text from './text.json';

type Props = {
  /** Saved queries list */
  savedQueries: SavedQueryListItem[];
  /** Select query event handler */
  onSelectQuery: (queryName: string, settings: Record<string, any>) => void;
};

const QueriesList: FC<Props> = ({ savedQueries, onSelectQuery }) => {
  return (
    <QueriesTable>
      <tr>
        <Header>{text.name}</Header>
        <Header>{text.labels}</Header>
        <Header>{text.updated}</Header>
      </tr>
      <tbody>
        {savedQueries.map(({ name, displayName, tags, query }) => (
          <QueriesListItem
            key={name}
            queryName={displayName}
            tags={tags}
            onClick={() => onSelectQuery(name, query)}
          />
        ))}
      </tbody>
    </QueriesTable>
  );
};

export default QueriesList;
