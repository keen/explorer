import React, { FC, useCallback } from 'react';
import moment from 'moment';

import {
  QueriesTable,
  Header,
  QueriesTableBody,
  QueriesTableHeader,
  QueriesTableHeaderRow,
} from './QueriesList.styles';

import QueriesListItem from '../QueriesListItem';
import SortIndicators from '../SortIndicators';
import Heading from '../Heading';

import { SavedQueryListItem } from '../../modules/queries';
import text from './text.json';

import { QueriesSortSettings, SortProperty } from './types';

type Props = {
  /** Saved queries list */
  savedQueries: SavedQueryListItem[];
  /** Active query unique name */
  activeQuery: string;
  /** Queries sort settings */
  sortSettings: QueriesSortSettings;
  /** Max height for overflow handling */
  maxHeight?: number;
  /** Select query event handler */
  onSelectQuery: (queryName: string, settings: Record<string, any>) => void;
  /** Update sort settings event handler */
  onSortQueries: (settings: QueriesSortSettings) => void;
};

const QueriesList: FC<Props> = ({
  savedQueries,
  activeQuery,
  sortSettings,
  maxHeight,
  onSortQueries,
  onSelectQuery,
}) => {
  const sortHandler = useCallback(
    (property: SortProperty) => {
      if (property !== sortSettings.property) {
        onSortQueries({ property, direction: 'ascending' });
      } else {
        const sortDirection =
          sortSettings.direction === 'ascending' ? 'descending' : 'ascending';
        onSortQueries({ property, direction: sortDirection });
      }
    },
    [sortSettings]
  );

  return (
    <QueriesTable>
      <QueriesTableHeader>
        <QueriesTableHeaderRow>
          <Header
            paddingLeft={20}
            sortable
            onClick={() => sortHandler('name')}
            data-testid="table-header-name"
          >
            <Heading>{text.name}</Heading>
            <SortIndicators
              sortDirection={
                sortSettings.property === 'name' ? sortSettings.direction : null
              }
            />
          </Header>
          <Header paddingLeft={10}>
            <Heading>{text.labels}</Heading>
          </Header>
          <Header
            paddingLeft={10}
            paddingRight={20}
            sortable
            onClick={() => sortHandler('lastModifiedDate')}
            data-testid="table-header-date"
          >
            <Heading>{text.updated}</Heading>
            <SortIndicators
              sortDirection={
                sortSettings.property === 'lastModifiedDate'
                  ? sortSettings.direction
                  : null
              }
            />
          </Header>
        </QueriesTableHeaderRow>
      </QueriesTableHeader>
      <QueriesTableBody maxHeight={maxHeight}>
        {savedQueries.map(
          ({
            name,
            displayName,
            lastModifiedDate,
            refreshRate,
            tags,
            query,
          }) => (
            <QueriesListItem
              key={name}
              queryName={displayName}
              tags={tags}
              isActive={activeQuery === name}
              refreshRate={refreshRate}
              updateDate={moment(lastModifiedDate).format('YYYY/MM/DD')}
              onClick={() => onSelectQuery(name, query)}
            />
          )
        )}
      </QueriesTableBody>
    </QueriesTable>
  );
};

export default QueriesList;
