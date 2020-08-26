import React, { FC, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@keen.io/ui-core';

import {
  EditorActions,
  Card,
  ClearButton,
  CreatorContainer,
} from './Editor.styles';

import EditorNavigation from '../EditorNavigation';
import Creator from '../Creator';
import text from './text.json';

import RunQuery, { runQueryLabel } from '../RunQuery';
import QueryVisualization from '../QueryVisualization';
import VisualizationPlaceholder from '../VisualizationPlaceholder';
import QueryLimitReached from '../QueryLimitReached';

import {
  getQueryResults,
  getQueryPerformState,
  getQueryLimitReached,
  setQuerySettings,
} from '../../modules/queries';
import { clearQuery } from '../../modules/app';

type Props = {
  /** Query definition */
  query: Record<string, any>;
  /** Optional upgrade subscription url */
  upgradeSubscriptionUrl?: string;
  /** Run query event handler */
  onRunQuery: () => void;
  /** Save query event handler */
  onSaveQuery: () => void;
};

const Editor: FC<Props> = ({
  query,
  upgradeSubscriptionUrl,
  onRunQuery,
  onSaveQuery,
}) => {
  const dispatch = useDispatch();

  const queryResults = useSelector(getQueryResults);
  const isQueryLoading = useSelector(getQueryPerformState);
  const isQueryLimitReached = useSelector(getQueryLimitReached);

  const udateQuery = useCallback((query: Record<string, any>) => {
    dispatch(setQuerySettings(query));
  }, []);

  return (
    <div id="editor">
      <EditorNavigation onSaveQuery={onSaveQuery} />
      <section>
        {isQueryLimitReached && (
          <QueryLimitReached upgradeSubscriptionUrl={upgradeSubscriptionUrl} />
        )}
        <Card>
          {queryResults && !isQueryLimitReached && (
            <QueryVisualization query={query} queryResults={queryResults} />
          )}
          {!queryResults && !isQueryLimitReached && (
            <VisualizationPlaceholder isLoading={isQueryLoading} />
          )}
        </Card>
      </section>
      <CreatorContainer>
        <Creator onUpdateQuery={udateQuery} />
      </CreatorContainer>
      <section>
        <EditorActions>
          <RunQuery isLoading={isQueryLoading} onClick={() => onRunQuery()}>
            {runQueryLabel(query)}
          </RunQuery>
          <ClearButton>
            <Button
              onClick={() => dispatch(clearQuery())}
              style="outline"
              variant="success"
              size="large"
            >
              {text.clearButton}
            </Button>
          </ClearButton>
        </EditorActions>
      </section>
    </div>
  );
};

export default Editor;
