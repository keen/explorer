import React, { FC, useCallback } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

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
import { QueriesSortSettings, SortProperty } from '../../modules/app';

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
  const { t } = useTranslation();
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
            onClick={() => sortHandler('displayName')}
            data-testid="table-header-name"
          >
            <Heading>{t('queries_list.name')}</Heading>
            <SortIndicators
              sortDirection={
                sortSettings.property === 'displayName'
                  ? sortSettings.direction
                  : null
              }
            />
          </Header>
          <Header paddingLeft={10}>
            <Heading>{t('queries_list.labels')}</Heading>
          </Header>
          <Header
            paddingLeft={10}
            paddingRight={20}
            sortable
            onClick={() => sortHandler('lastModifiedDate')}
            data-testid="table-header-date"
          >
            <Heading>{t('queries_list.updated')}</Heading>
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
            visualization,
          }) => (
            <QueriesListItem
              key={name}
              queryName={displayName}
              tags={tags}
              isActive={activeQuery === name}
              refreshRate={refreshRate}
              updateDate={dayjs(lastModifiedDate).format('YYYY/MM/DD')}
              onClick={() => onSelectQuery(name, query)}
              visualization={visualization}
            />
          )
        )}
      </QueriesTableBody>
    </QueriesTable>
  );
};

export default QueriesList;
