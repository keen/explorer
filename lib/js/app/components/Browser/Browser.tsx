import React, { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Card, Socket } from './Browser.styles';

import BrowserNavigation from '../BrowserNavigation';
import BrowserQueryMenu from '../BrowserQueryMenu';
import QueriesList from '../QueriesList';

import QueryVisualization from '../QueryVisualization';
import QuerySummary from '../QuerySummary';
import VisualizationPlaceholder from '../VisualizationPlaceholder';

import {
  getSavedQueries,
  getQueryPerformState,
  deleteQuery,
} from '../../modules/queries';
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
          <div>Preview</div>
          <Card>
            {queryResults && (
              <QueryVisualization query={query} queryResults={queryResults} />
            )}
            {!queryResults && currentQuery && (
              <VisualizationPlaceholder
                isLoading={isQueryLoading}
                onRunQuery={onRunQuery}
              />
            )}
            {currentQuery && (
              <>
                <div>
                  <BrowserQueryMenu
                    onRemoveQuery={() =>
                      dispatch(deleteQuery(currentQuery.name))
                    }
                    onEditQuery={() => onEditQuery(currentQuery.name)}
                  />
                  <h4>{currentQuery.displayName}</h4>
                </div>
                <QuerySummary querySettings={currentQuery} />
              </>
            )}
          </Card>
        </Socket>
      </Container>
    </div>
  );
};

export default Browser;
