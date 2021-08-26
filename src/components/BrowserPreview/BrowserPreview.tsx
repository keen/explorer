import React, { FC, useContext } from 'react';
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
import { NoPropertiesOnEventStream, DashboardsConnection } from './components';

import {
  queriesActions,
  getQueryResults,
  getQueryLimitReached,
  getQueryPerformState,
  SavedQueryListItem,
} from '../../modules/queries';
import { appActions, appSelectors } from '../../modules/app';
import {
  getSavedQueryIsEditable,
  getSavedQueryLoading,
} from '../../modules/savedQuery/selectors';
import { useApplyWidgetTheming } from '../../hooks';

import { getNotExistingEventStreams } from '../../modules/schemas/selectors';
import { getMissingEventStreams } from './utils';
import { AppContext } from '../../contexts';

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
  const autorunQuery = useSelector(appSelectors.getQueryAutorun);
  const { chartSettings, widgetSettings } = useSelector(
    appSelectors.getVisualization
  );

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

  const { enableDashboardsConnection } = useContext(AppContext);

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
            dispatch(appActions.setQueryAutorun({ autorun }))
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
            {enableDashboardsConnection && <DashboardsConnection />}
          </>
        )}
      </Card>
    </>
  );
};

export default BrowserPreview;
