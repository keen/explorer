import React, { FC, useState, useMemo, useCallback } from 'react';
import { Icon } from '@keen.io/icons';
import { Badge, Input } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

import { QueryItem } from './components';

import { SavedQuery } from './types';

type Props = {
  /** Saved queries collection */
  queries: SavedQuery[];
  /** Select query event handler */
  onSelectQuery: (queryName: string, settings: Object) => void;
  /** Delete query event handler */
  onDeleteQuery: (queryName: string) => void;
  /** Active query name */
  activeQuery?: string;
  maxListHeight?: number;
};

export const QueryBrowser: FC<Props> = ({
  queries,
  activeQuery,
  onSelectQuery,
  onDeleteQuery,
  maxListHeight = 400,
}) => {
  const [search, setSearch] = useState(null);
  const [analysisFilter, setAnalysisFilter] = useState(null);
  const [cachedOnly, setCachedOnly] = useState(false);

  const queriesFilter = useCallback(
    ({ refreshRate, queryName, query: { analysisType } }) => {
      if (cachedOnly && !!refreshRate) return false;
      if (analysisFilter && analysisFilter !== analysisType) return false;
      if (search) return queryName.includes(search);
      return true;
    },
    [search, analysisFilter, cachedOnly]
  );

  const filteredQueries = useMemo(() => queries.filter(queriesFilter), [
    analysisFilter,
    cachedOnly,
    search,
    queries,
  ]);

  return (
    <div>
      <div>
        <h3>Filters</h3>
        <div>
          {analysisFilter && (
            <Badge type="light">
              {analysisFilter}
              <span onClick={() => setAnalysisFilter(false)}>
                <Icon type="close" fill={colors.blue['500']} />
              </span>
            </Badge>
          )}
          {cachedOnly && (
            <Badge type="success">
              cached
              <span onClick={() => setCachedOnly(false)}>
                <Icon type="close" fill={colors.white['500']} />
              </span>
            </Badge>
          )}
        </div>
      </div>
      <Input
        variant="solid"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <h3>Your saved queries</h3>
      <div style={{ height: maxListHeight, overflowY: 'scroll' }}>
        {filteredQueries.map((query) => (
          <QueryItem
            key={query.queryName}
            isActive={query.queryName === activeQuery}
            settings={query}
            onEnableCacheFilter={() => setCachedOnly(true)}
            onEnableAnalysisFilter={(analysis) => setAnalysisFilter(analysis)}
            onDelete={(queryName) => onDeleteQuery(queryName)}
            onSelect={(queryName) => onSelectQuery(queryName, query)}
          />
        ))}
      </div>
    </div>
  );
};

export default QueryBrowser;
