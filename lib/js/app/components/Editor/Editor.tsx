import React, { FC } from 'react';
import { useSelector } from 'react-redux';

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
  getQueryLimitReached,
} from '../../modules/queries';

type Props = {
  /** Query definition */
  query: Record<string, any>;
  /** Optional upgrade subscription url */
  upgradeSubscriptionUrl?: string;
  /** Query update handler */
  onUpdateQuery: (query: Record<string, any>) => void;
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
  onUpdateQuery,
}) => {
  const queryResults = useSelector(getQueryResults);
  const isQueryLoading = useSelector(getQueryPerformState);
  const isQueryLimitReached = useSelector(getQueryLimitReached);

  return (
    <div id="editor">
      <EditorNavigation onSaveQuery={onSaveQuery} />
      <section>
        {isQueryLimitReached ? (
          <QueryLimitReached upgradeSubscriptionUrl={upgradeSubscriptionUrl} />
        ) : queryResults ? (
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
          <RunQuery isLoading={isQueryLoading} onClick={() => onRunQuery()}>
            {runQueryLabel(query)}
          </RunQuery>
        </EditorActions>
      </section>
    </div>
  );
};

export default Editor;
