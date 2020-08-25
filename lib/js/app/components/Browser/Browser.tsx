import React, { FC, useMemo } from 'react';
import { Button } from '@keen.io/ui-core';
import { useSelector } from 'react-redux';

import { Container, Socket } from './Browser.styles';

import BrowserNavigation from '../BrowserNavigation';
import QueriesList from '../QueriesList';

import QueryVisualization from '../QueryVisualization';
import QuerySummary from '../QuerySummary';
import RunQuery from '../RunQuery';
import VisualizationPlaceholder from '../VisualizationPlaceholder';

import { getSavedQueries, getQueryPerformState } from '../../modules/queries';
import { getSavedQuery } from '../../modules/savedQuery';

type Props = {
  query: Record<string, any>;
  /** Edit query event handler */
  onEditQuery: (queryName: string) => void;
  /** Select query event handler */
  onSelectQuery: (queryName: string, settings: Record<string, any>) => void;
  /** Run selected query event handler */
  onRunQuery: () => void;
  queryResults?: Record<string, any>;
};

/**
<QueryBrowser
  activeQuery={currentQuery && currentQuery.name}
  onSelectQuery={onSelectQuery}
  onDeleteQuery={(queryName) => dispatch(deleteQuery(queryName))}
  queries={savedQueries}
/>

*/

const Browser: FC<Props> = ({
  query,
  queryResults,
  onEditQuery,
  onRunQuery,
  onSelectQuery,
}) => {
  const isQueryLoading = useSelector(getQueryPerformState);
  const savedQuery = useSelector(getSavedQuery);
  const savedQueries = useSelector(getSavedQueries);

  const currentQuery = useMemo(() => {
    return savedQueries.find(({ name }) => {
      return name === savedQuery.name;
    });
  }, [savedQuery]);

  return (
    <div>
      <BrowserNavigation />
      <Container>
        <Socket>
          <QueriesList
            savedQueries={savedQueries}
            onSelectQuery={onSelectQuery}
          />
        </Socket>
        <Socket>
          <Button onClick={() => onEditQuery(savedQuery.name)}>Edit</Button>
          <RunQuery isLoading={isQueryLoading} onClick={onRunQuery}>
            Run Query
          </RunQuery>
          {queryResults && (
            <QueryVisualization query={query} queryResults={queryResults} />
          )}
          {!queryResults && currentQuery && (
            <VisualizationPlaceholder isLoading={isQueryLoading} />
          )}
          {savedQuery.displayName}
          {currentQuery && <QuerySummary querySettings={currentQuery} />}
        </Socket>
      </Container>
    </div>
  );
};

export default Browser;
