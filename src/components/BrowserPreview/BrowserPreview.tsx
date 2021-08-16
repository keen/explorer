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
  queriesActions,
  getQueryResults,
  getQueryLimitReached,
  getQueryPerformState,
  SavedQueryListItem,
} from '../../modules/queries';
import {
  // setQueryAutorun,
  getQueryAutorun,
  getVisualization,
} from '../../modules/app';
import NoPropertiesOnEventStream from './components/NoPropertiesOnEventStream/NoPropertiesOnEventStream';
import {
  getSavedQueryIsEditable,
  getSavedQueryLoading,
} from '../../modules/savedQuery/selectors';
import { useApplyWidgetTheming } from '../../hooks/useApplyWidgetTheming';

import { getNotExistingEventStreams } from '../../modules/schemas/selectors';
import { getMissingEventStreams } from './utils';
import { appSlice } from '../../modules/app/reducer';

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
  const { chartSettings, widgetSettings } = useSelector(getVisualization);

  const isSavedQueryLoading = useSelector(getSavedQueryLoading);
  const isSavedQueryEditable = useSelector(getSavedQueryIsEditable);
  const notExistingEventStreams = useSelector(getNotExistingEventStreams);
  let savedQueryMissingStreams = [];

  if (!isSavedQueryEditable) {
    savedQueryMissingStreams = getMissingEventStreams(
      currentQuery,
      notExistingEventStreams
    );
  }

  const { themedChartSettings, themedWidgetSettings } = useApplyWidgetTheming({
    chartSettings,
    widgetSettings,
    dependencies: [currentQuery],
    composeCondition: !!currentQuery,
  });

  return (
    <>
      <HeaderContainer>
        <Heading>{t('browser_preview.title')}</Heading>
        <AutorunQuery
          autorun={autorunQuery}
          label={t('browser_preview.autorun_query_label')}
          tooltipMessage={t('browser_preview.autorun_query_tooltip')}
          onToggle={(autorun) =>
            dispatch(appSlice.actions.setQueryAutorun({ autorun }))
          }
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
            {!isSavedQueryEditable && !isSavedQueryLoading ? (
              <NoPropertiesOnEventStream
                missingEventStreams={savedQueryMissingStreams}
              />
            ) : (
              <>
                {currentQuery && queryResults ? (
                  <VisualizationWrapper
                    widgetType={currentQuery.visualization.type}
                  >
                    <QueryVisualization
                      widgetType={currentQuery.visualization.type}
                      widgetSettings={themedWidgetSettings}
                      chartSettings={themedChartSettings}
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
          </>
        )}
        {currentQuery && (
          <>
            <BrowserQueryMenu
              onRemoveQuery={() =>
                dispatch(queriesActions.deleteQuery(currentQuery.name))
              }
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
