import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@keen.io/ui-core';

import { EditorActions, CreatorContainer } from './Editor.styles';

import EditorNavigation from '../EditorNavigation';

import Creator from '../Creator';

import RunQuery, { runQueryLabel } from '../RunQuery';
import QueryVisualization from '../QueryVisualization';
import VisualizationPlaceholder from '../VisualizationPlaceholder';

import { getQueryResults, getQueryPerformState } from '../../modules/queries';
import { setViewMode } from '../../modules/app';

type Props = {
  /** Query definition */
  query: Record<string, any>;
  /** Query update handler */
  onUpdateQuery: (query: Record<string, any>) => void;
  /** Run query event handler */
  onRunQuery: () => void;
  /** Save query event handler */
  onSaveQuery: () => void;
};

const Editor: FC<Props> = ({
  query,
  onRunQuery,
  onSaveQuery,
  onUpdateQuery,
}) => {
  const dispatch = useDispatch();
  const queryResults = useSelector(getQueryResults);
  const isQueryLoading = useSelector(getQueryPerformState);

  return (
    <div>
      <EditorNavigation onSaveQuery={onSaveQuery} />
      <Button
        onClick={() => {
          dispatch(setViewMode('browser'));
        }}
      >
        Back to list
      </Button>
      <section>
        {queryResults ? (
          <QueryVisualization query={query} queryResults={queryResults} />
        ) : (
          <VisualizationPlaceholder isLoading={isQueryLoading} />
        )}
      </section>
      <CreatorContainer>
        <Creator onUpdateQuery={onUpdateQuery} />
      </CreatorContainer>
      <section>
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
