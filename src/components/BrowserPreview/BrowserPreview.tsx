import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  Card,
  HeaderContainer,
  QueryTitle,
  VisualizationWrapper,
} from './BrowserPreview.styles';

import AutorunQuery from '../AutorunQuery';
import BrowserQueryMenu from '../BrowserQueryMenu';
import Heading from '../Heading';
import QueryVisualization from '../QueryVisualization';
import QuerySummary from '../QuerySummary';
import QueryLimitReached from '../QueryLimitReached';
import VisualizationPlaceholder from '../VisualizationPlaceholder';

import {
  deleteQuery,
  getQueryResults,
  getQueryLimitReached,
  getQueryPerformState,
  SavedQueryListItem,
} from '../../modules/queries';
import {
  setQueryAutorun,
  getQueryAutorun,
  getVisualization,
} from '../../modules/app';

type Props = {
  /** Current active query */
  currentQuery?: SavedQueryListItem;
  /** Run selected query event handler */
  onRunQuery: () => void;
  /** Edit query event handler */
  onEditQuery: (queryName: string) => void;
};

const BrowserPreview: FC<Props> = ({
  currentQuery,
  onEditQuery,
  onRunQuery,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const queryResults = useSelector(getQueryResults);
  const isQueryLoading = useSelector(getQueryPerformState);
  const isQueryLimitReached = useSelector(getQueryLimitReached);
  const autorunQuery = useSelector(getQueryAutorun);
  const { chartSettings } = useSelector(getVisualization);

  return (
    <>
      <HeaderContainer>
        <Heading>{t('browser_preview.title')}</Heading>
        <AutorunQuery
          autorun={autorunQuery}
          label={t('browser_preview.autorun_query_label')}
          tooltipMessage={t('browser_preview.autorun_query_tooltip')}
          onToggle={(autorun) => dispatch(setQueryAutorun(autorun))}
        />
      </HeaderContainer>
      <Card>
        {isQueryLimitReached ? (
          <QueryLimitReached />
        ) : (
          <>
            {currentQuery && (
              <QueryTitle title={currentQuery.displayName}>
                {currentQuery.displayName}
              </QueryTitle>
            )}
            {currentQuery && queryResults ? (
              <VisualizationWrapper
                widgetType={currentQuery.visualization.type}
              >
                <QueryVisualization
                  widgetType={currentQuery.visualization.type}
                  widgetSettings={currentQuery.visualization.widgetSettings}
                  chartSettings={currentQuery.visualization.chartSettings}
                  queryResults={queryResults}
                />
              </VisualizationWrapper>
            ) : (
              <VisualizationPlaceholder
                isLoading={isQueryLoading}
                onRunQuery={onRunQuery}
              />
            )}
          </>
        )}
        {currentQuery && (
          <>
            <BrowserQueryMenu
              onRemoveQuery={() => dispatch(deleteQuery(currentQuery.name))}
              onEditQuery={() => onEditQuery(currentQuery.name)}
            />
            <QuerySummary
              querySettings={currentQuery}
              chartSettings={chartSettings}
            />
          </>
        )}
      </Card>
    </>
  );
};

export default BrowserPreview;
