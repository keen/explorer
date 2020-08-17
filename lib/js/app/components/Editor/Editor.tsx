import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Button } from '@keen.io/ui-core';

import { EditorActions, CreatorContainer } from './Editor.styles';

import EditorNavigation from '../EditorNavigation';

import Creator from '../Creator';

import RunQuery, { runQueryLabel } from '../RunQuery';
import QueryVisualization from '../QueryVisualization';
import VisualizationPlaceholder from '../VisualizationPlaceholder';
import QueryLimitReached from '../QueryLimitReached';

import {
  getQueryResults,
  getQueryPerformState,
  getError,
  getQueryLimitReached
} from '../../modules/queries';
import { setViewMode } from '../../modules/app';

type Props = {
  /** Query definition */
  query: Record<string, any>;
  /** Optional upgrade subscription url */
  upgradeSubscriptionUrl?: string;
  /** Query update handler */
  onUpdateQuery: (query: Record<string, any>) => void;
  /** Run query event handler */
  onRunQuery: () => void;
};

const Editor: FC<Props> = ({ query, upgradeSubscriptionUrl, onRunQuery, onUpdateQuery }) => {
  const dispatch = useDispatch();
  const queryResults = useSelector(getQueryResults);
  const runQueryError = useSelector(getError);
  const isQueryLoading = useSelector(getQueryPerformState);
  const isQueryLimitReached = useSelector(getQueryLimitReached); console.log({isQueryLimitReached});

  return (
    <div id="editor">
      <EditorNavigation query={query} />
      <Button
        onClick={() => {
          dispatch(setViewMode('browser'));
        }}
      >
        Back to list
      </Button>
      <section>{ isQueryLimitReached ? <QueryLimitReached upgradeSubscriptionUrl={upgradeSubscriptionUrl} /> : queryResults ? (
          <QueryVisualization query={query} queryResults={queryResults} />
        ) : (
          <VisualizationPlaceholder isLoading={isQueryLoading} />
        )}
        {runQueryError && <Alert type="error">{runQueryError.body}</Alert>}
      </section>
      <CreatorContainer>
        <Creator onUpdateQuery={onUpdateQuery} />
      </CreatorContainer>
      <section>
        <EditorActions>
          <RunQuery isLoading={isQueryLoading} onClick={() => onRunQuery()}>
            {runQueryLabel(query)}
          </RunQuery>
        </EditorActions>
      </section>
    </div>
  );
};

export default Editor;
