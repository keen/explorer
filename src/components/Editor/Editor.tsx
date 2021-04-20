import React, { FC, useContext, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import WidgetCustomization, {
  SerializedSettings,
  useCustomizationSections,
  serializeInputSettings,
  serializeOutputSettings,
} from '@keen.io/widget-customization';
import { WidgetSettings } from '@keen.io/widgets';
import { Query } from '@keen.io/query';
import { Button } from '@keen.io/ui-core';

import {
  EditorActions,
  Card,
  NavBar,
  ActionButton,
  SectionContainer,
  CustomizationContainer,
  QueryContainer,
} from './Editor.styles';

import { Creator, SectionTabs, Visualization } from './components';
import { showEmailExtraction } from './utils';

import { AppContext } from '../../contexts';

import { editorSagaActions, EditorSection } from '../../modules/editor';
import {
  extractToEmail,
  getQueryResults,
  getQueryPerformState,
  getQueryLimitReached,
  setQuerySettings,
} from '../../modules/queries';
import {
  getVisualization,
  setVisualization,
  clearQuery,
  updateWidgetSettings,
  updateVisualizationType,
  updateChartSettings as updateSettings,
} from '../../modules/app';

import EditorNavigation from '../EditorNavigation';
import RunQuery, { runQueryLabel } from '../RunQuery';
import VisualizationPlaceholder from '../VisualizationPlaceholder';
import QueryLimitReached from '../QueryLimitReached';

type Props = {
  /** Query definition */
  query: Query;
  /** Run query event handler */
  onRunQuery: () => void;
  /** Save query event handler */
  onSaveQuery: () => void;
  /** Saved query name */
  savedQueryName?: string;
  /** Optional upgrade subscription url */
  upgradeSubscriptionUrl?: string;
};

const Editor: FC<Props> = ({
  query,
  savedQueryName,
  upgradeSubscriptionUrl,
  onRunQuery,
  onSaveQuery,
}) => {
  const { modalContainer } = useContext(AppContext);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const queryResults = useSelector(getQueryResults);
  const isQueryLoading = useSelector(getQueryPerformState);
  const isQueryLimitReached = useSelector(getQueryLimitReached);
  const { chartSettings, widgetSettings, type: widgetType } = useSelector(
    getVisualization
  );

  const customizationSections = useCustomizationSections(
    !!queryResults,
    query,
    widgetType
  );

  const [editorSection, setEditorSection] = useState(EditorSection.QUERY);
  const [
    widgetCustomization,
    setCustomizationSettings,
  ] = useState<SerializedSettings>(() =>
    serializeInputSettings(widgetType, chartSettings, widgetSettings)
  );

  const updateQuery = useCallback((query: Record<string, any>) => {
    dispatch(setQuerySettings(query));
  }, []);

  const updateChartSettings = useCallback(
    (chartSettings: Record<string, any>) => {
      dispatch(updateSettings(chartSettings));
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
            <Visualization
              query={query}
              queryResults={queryResults}
              widgetType={widgetType}
              chartSettings={chartSettings}
              widgetSettings={widgetSettings}
              onChangeVisualization={(settings) => {
                const chart = serializeOutputSettings(
                  settings.widgetType,
                  widgetCustomization.chart
                );
                dispatch(
                  setVisualization(
                    settings.widgetType,
                    {
                      ...settings.chartSettings,
                      ...chart,
                    },
                    {
                      ...settings.widgetSettings,
                      ...(widgetCustomization.widget as WidgetSettings),
                    }
                  )
                );
                dispatch(updateVisualizationType(settings.widgetType));
              }}
            />
          )}
          {!queryResults && !isQueryLimitReached && (
            <VisualizationPlaceholder isLoading={isQueryLoading} />
          )}
        </Card>
      </section>
      <NavBar>
        <SectionTabs
          activeSection={editorSection}
          onChangeSection={(activeSection) => {
            setEditorSection(activeSection);
            dispatch(editorSagaActions.changeEditorSection(activeSection));
          }}
        />
      </NavBar>
      {editorSection === EditorSection.SETTINGS && (
        <SectionContainer>
          <CustomizationContainer>
            <WidgetCustomization
              customizationSections={customizationSections}
              chartSettings={widgetCustomization.chart}
              widgetSettings={widgetCustomization.widget}
              savedQueryName={savedQueryName}
              onUpdateWidgetSettings={(widgetSettings) => {
                dispatch(updateWidgetSettings(widgetSettings));

                setCustomizationSettings((state) => ({
                  ...state,
                  widget: widgetSettings,
                }));
              }}
              onUpdateChartSettings={(chartSettings) => {
                const chart = serializeOutputSettings(
                  widgetType,
                  chartSettings
                );
                updateChartSettings(chart);

                setCustomizationSettings((state) => ({
                  ...state,
                  chart: chartSettings,
                }));
              }}
              modalContainer={modalContainer}
            />
          </CustomizationContainer>
        </SectionContainer>
      )}
      {editorSection === EditorSection.QUERY && (
        <QueryContainer>
          <Creator
            onUpdateQuery={updateQuery}
            onUpdateChartSettings={updateChartSettings}
          />
        </QueryContainer>
      )}
      <EditorActions>
        <RunQuery isLoading={isQueryLoading} onClick={() => onRunQuery()}>
          {t(runQueryLabel(query))}
        </RunQuery>
        {showEmailExtraction(query) && (
          <ActionButton data-testid="email-extraction">
            <Button
              variant="success"
              size="large"
              onClick={() => dispatch(extractToEmail())}
            >
              {t('editor.extract_to_email_button')}
            </Button>
          </ActionButton>
        )}
        <ActionButton>
          <Button
            onClick={() => dispatch(clearQuery())}
            style="outline"
            variant="success"
            size="large"
          >
            {t('editor.clear_query_button')}
          </Button>
        </ActionButton>
      </EditorActions>
    </div>
  );
};

export default Editor;
