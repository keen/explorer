import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Button } from '@keen.io/ui-core';

import { EditorActions, CreatorContainer } from './Editor.styles';

import EditorNavigation from '../EditorNavigation';

import Creator from '../Creator';

import RunQuery, { runQueryLabel } from '../RunQuery';
import QueryVisualization from '../QueryVisualization';
import VisualizationPlaceholder from '../VisualizationPlaceholder';

import {
  getQueryResults,
  getQueryPerformState,
  getError,
} from '../../modules/queries';
import { setViewMode } from '../../modules/app';

type Props = {
  /** Query definition */
  query: Object;
  /** Query update handler */
  onUpdateQuery: (query: Object) => void;
  /** Run query event handler */
  onRunQuery: () => void;
};

const Editor: FC<Props> = ({ query, onRunQuery, onUpdateQuery }) => {
  const dispatch = useDispatch();
  const queryResults = useSelector(getQueryResults);
  const runQueryError = useSelector(getError);
  const isQueryLoading = useSelector(getQueryPerformState);

  return (
    <div>
      <EditorNavigation query={query} />
      <Button
        onClick={() => {
          dispatch(setViewMode('browser'));
        }}
      >
        Back to list
      </Button>
      <CreatorContainer>
        <Creator onUpdateQuery={onUpdateQuery} />
      </CreatorContainer>
      <section>
        {queryResults ? (
          <QueryVisualization query={query} queryResults={queryResults} />
        ) : (
          <VisualizationPlaceholder isLoading={isQueryLoading} />
        )}
        {runQueryError && <Alert type="error">{runQueryError.body}</Alert>}
        <EditorActions>
          <RunQuery isLoading={isQueryLoading} onClick={onRunQuery}>
            {runQueryLabel(query)}
          </RunQuery>
        </EditorActions>
      </section>
    </div>
  );
};

export default Editor;
