import React, { FC, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from '@keen.io/ui-core';

import {
  EditorActions,
  Card,
  ButtonWrapper,
  CreatorContainer,
} from './Editor.styles';

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
import { clearQuery } from '../../modules/app';

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
  const { t } = useTranslation();

  const queryResults = useSelector(getQueryResults);
  const isQueryLoading = useSelector(getQueryPerformState);
  const isQueryLimitReached = useSelector(getQueryLimitReached);

  const updateQuery = useCallback((query: Record<string, any>) => {
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
            <EditorVisualization query={query} queryResults={queryResults} />
          )}
          {!queryResults && !isQueryLimitReached && (
            <VisualizationPlaceholder isLoading={isQueryLoading} />
          )}
        </Card>
      </section>
      <CreatorContainer>
        <Creator onUpdateQuery={updateQuery} />
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
              {t('editor.extract_to_email_button')}
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
            {t('editor.clear_query_button')}
          </Button>
        </ButtonWrapper>
      </EditorActions>
    </div>
  );
};

export default Editor;
