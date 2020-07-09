import React, { FC, useMemo } from 'react';
import { Button } from '@keen.io/ui-core';
import { useSelector, useDispatch } from 'react-redux';
import camelCase from 'camelcase-keys';

import { Container, Socket } from './Browser.styles';

import QueryVisualization from '../QueryVisualization';
import QuerySummary from '../QuerySummary';

import QueryBrowser from '../../queryBrowser';

import { getSavedQueries, deleteQuery } from '../../modules/queries';
import { getSavedQuery } from '../../modules/savedQuery';

import { AppState } from '../../modules/types';

type Props = {
  query: Object;
  onEditQuery: (queryName: string) => void;
  onSelectQuery: (queryName: string, settings: Object) => void;
  onRunQuery: () => void;
  queryResults?: Object;
};

const Browser: FC<Props> = ({
  query,
  queryResults,
  onEditQuery,
  onRunQuery,
  onSelectQuery,
}) => {
  const dispatch = useDispatch();
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
        <Button onClick={onRunQuery}>Run Query</Button>
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
