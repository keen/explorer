import React, { FC, useMemo } from 'react';
import { Button } from '@keen.io/ui-core';
import { useSelector, useDispatch } from 'react-redux';
import camelCase from 'camelcase-keys';

import { Container, Socket } from './Browser.styles';

import QueryVisualization from '../QueryVisualization';
import QuerySummary from '../QuerySummary';
import RunQuery from '../RunQuery';

import QueryBrowser from '../../queryBrowser';

import {
  getSavedQueries,
  getQueryPerformState,
  deleteQuery,
} from '../../modules/queries';
import { getSavedQuery } from '../../modules/savedQuery';

import { AppState } from '../../modules/types';

type Props = {
  query: Record<string, any>;
  onEditQuery: (queryName: string) => void;
  onSelectQuery: (queryName: string, settings: Record<string, any>) => void;
  onRunQuery: () => void;
  queryResults?: Record<string, any>;
};

const Browser: FC<Props> = ({
  query,
  queryResults,
  onEditQuery,
  onRunQuery,
  onSelectQuery,
}) => {
  const dispatch = useDispatch();
  const isQueryLoading = useSelector(getQueryPerformState);
  const savedQuery = useSelector(getSavedQuery);
  const savedQueries = useSelector((state: AppState) =>
    camelCase(getSavedQueries(state), { deep: true })
  );

  const currentQuery = useMemo(() => {
    return savedQueries.find(({ queryName }) => {
      return queryName === savedQuery.name;
    });
  }, [savedQuery]);

  return (
    <Container>
      <Socket>
        <QueryBrowser
          activeQuery={currentQuery && currentQuery.queryName}
          onSelectQuery={onSelectQuery}
          onDeleteQuery={(queryName) => dispatch(deleteQuery(queryName))}
          queries={savedQueries}
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

        {savedQuery.displayName}
        {currentQuery && <QuerySummary querySettings={currentQuery} />}
      </Socket>
    </Container>
  );
};

export default Browser;
