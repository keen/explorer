import React, { FC, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Button } from '@keen.io/ui-core';

import { EditorActions } from './Editor.styles';

import Creator from '../Creator';
import ShareQuery from '../ShareQuery';
import RunQuery, { runQueryLabel } from '../RunQuery';
import QueryVisualization from '../QueryVisualization';
import VisualizationPlaceholder from '../VisualizationPlaceholder';
import APIQueryURL from '../explorer/APIQueryURL';

import {
  getQueryResults,
  getQueryPerformState,
  getError,
} from '../../modules/queries';
import { setViewMode } from '../../modules/app';

import { AppContext } from '../../contexts';

type Props = {
  /** Query definition */
  query: Object;
  /** Query update handler */
  onUpdateQuery: (query: Object) => void;
  /** Share query event handler */
  onShareQuery: () => void;
  /** Run query event handler */
  onRunQuery: () => void;
};

const Editor: FC<Props> = ({
  query,
  onRunQuery,
  onShareQuery,
  onUpdateQuery,
}) => {
  const dispatch = useDispatch();
  const queryResults = useSelector(getQueryResults);
  const runQueryError = useSelector(getError);
  const isQueryLoading = useSelector(getQueryPerformState);

  const { keenAnalysis } = useContext(AppContext);

  return (
    <div>
      <Button
        onClick={() => {
          dispatch(setViewMode('browser'));
        }}
      >
        Back to list
      </Button>
      <Creator onUpdateQuery={onUpdateQuery} />
      <APIQueryURL queryParams={query} client={keenAnalysis} />
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
          <ShareQuery onShareQuery={onShareQuery} />
        </EditorActions>
      </section>
    </div>
  );
};

export default Editor;
