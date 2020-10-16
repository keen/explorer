import React, { FC, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@keen.io/ui-core';

import {
  EditorActions,
  Card,
  ButtonWrapper,
  CreatorContainer,
} from './Editor.styles';
import text from './text.json';

import { showEmailExtraction } from './utils';

import EditorNavigation from '../EditorNavigation';
import Creator from '../Creator';

import RunQuery, { runQueryLabel } from '../RunQuery';
import EditorVisualization from '../EditorVisualization';
import VisualizationPlaceholder from '../VisualizationPlaceholder';
import QueryLimitReached from '../QueryLimitReached';

import {
  extractToEmail,
  getQueryResults,
  getQueryPerformState,
  getQueryLimitReached,
  setQuerySettings,
} from '../../modules/queries';
import { clearQuery, setChartSettings } from '../../modules/app';

type Props = {
  /** Query definition */
  query: Record<string, any>;
  /** Run query event handler */
  onRunQuery: () => void;
  /** Save query event handler */
  onSaveQuery: () => void;
  /** Optional upgrade subscription url */
  upgradeSubscriptionUrl?: string;
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

  const updateQuery = useCallback((query: Record<string, any>) => {
    dispatch(setQuerySettings(query));
  }, []);

  const updateChartSettings = useCallback(
    (chartSettings: Record<string, any>) => {
      dispatch(setChartSettings(chartSettings));
    },
    []
  );

  return (
    <div id="editor">
      <EditorNavigation onSaveQuery={onSaveQuery} />
      <section>
        {isQueryLimitReached && (
          <QueryLimitReached upgradeSubscriptionUrl={upgradeSubscriptionUrl} />
        )}
        <Card>
          {queryResults && !isQueryLimitReached && (
            <EditorVisualization query={query} queryResults={queryResults} />
          )}
          {!queryResults && !isQueryLimitReached && (
            <VisualizationPlaceholder isLoading={isQueryLoading} />
          )}
        </Card>
      </section>
      <CreatorContainer>
        <Creator
          onUpdateQuery={updateQuery}
          onUpdateChartSettings={updateChartSettings}
        />
      </CreatorContainer>
      <EditorActions>
        <RunQuery isLoading={isQueryLoading} onClick={() => onRunQuery()}>
          {runQueryLabel(query)}
        </RunQuery>
        {showEmailExtraction(query) && (
          <ButtonWrapper data-testid="email-extraction">
            <Button
              variant="success"
              size="large"
              onClick={() => dispatch(extractToEmail())}
            >
              {text.extractToEmailButton}
            </Button>
          </ButtonWrapper>
        )}
        <ButtonWrapper>
          <Button
            onClick={() => dispatch(clearQuery())}
            style="outline"
            variant="success"
            size="large"
          >
            {text.clearButton}
          </Button>
        </ButtonWrapper>
      </EditorActions>
    </div>
  );
};

export default Editor;
