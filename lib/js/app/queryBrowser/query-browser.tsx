import React, { FC, useState, useMemo } from 'react';
import { Icon } from '@keen.io/icons';
import { Badge } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

import { QueryItem } from './components';

import { SavedQuery } from './types';

type Props = {
  /** Saved queries collection */
  queries: SavedQuery[];
  /** Select query event handler */
  onSelectQuery: (queryName: string) => void;
  /** Delete query event handler */
  onDeleteQuery: (queryName: string) => void;
};

export const QueryBrowser: FC<Props> = ({
  queries,
  onSelectQuery,
  onDeleteQuery,
}) => {
  const [analysisFilter, setAnalysisFilter] = useState(null);
  const [cachedOnly, setCachedOnly] = useState(false);

  const filteredQueries = useMemo(
    () =>
      queries
        .filter(({ refreshRate }) => {
          if (cachedOnly) return !!refreshRate;
          return true;
        })
        .filter(({ query: { analysisType } }) => {
          if (analysisFilter) return analysisType === analysisFilter;
          return true;
        }),
    [analysisFilter, cachedOnly, queries]
  );

  return (
    <div>
      <div>
        <div>Filters</div>
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
      <div>Queries</div>
      {filteredQueries.map((query) => (
        <QueryItem
          key={query.queryName}
          settings={query}
          onEnableCacheFilter={() => setCachedOnly(true)}
          onEnableAnalysisFilter={(analysis) => setAnalysisFilter(analysis)}
          onDelete={(queryName) => onDeleteQuery(queryName)}
          onSelect={(queryName) => onSelectQuery(queryName)}
        />
      ))}
    </div>
  );
};

export default QueryBrowser;
