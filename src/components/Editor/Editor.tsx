import React, { FC, useContext, useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import deepMerge from 'deepmerge';

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
  Container,
} from './Editor.styles';

import { Creator, SectionTabs, Visualization } from './components';
import { isExtraction } from './utils';

import { AppContext } from '../../contexts';

import { editorSagaActions, EditorSection } from '../../modules/editor';

import {
  queriesActions,
  getQueryResults,
  getQueryPerformState,
  getQueryLimitReached,
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
import RunQuery from '../RunQuery';
import ConfirmExtraction from '../ConfirmExtraction';
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
  const { modalContainer, datavizSettings } = useContext(AppContext);
  const theme = datavizSettings.theme;

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
    widgetType,
    {
      card: true,
    }
  );

  const [editorSection, setEditorSection] = useState(EditorSection.QUERY);

  const composeChartSettings = useMemo(() => {
    if ('theme' in chartSettings) {
      return {
        ...chartSettings,
        theme: deepMerge(theme, chartSettings.theme, {
          arrayMerge: (_target, source) => source,
        }),
      };
    }
    return {
      theme,
      ...chartSettings,
    };
  }, [widgetType, chartSettings]);

  const [
    widgetCustomization,
    setCustomizationSettings,
  ] = useState<SerializedSettings>(() =>
    serializeInputSettings(widgetType, composeChartSettings, widgetSettings)
  );

  const updateQuery = useCallback((query: Query) => {
    dispatch(queriesActions.setQuerySettings({ settings: query }));
  }, []);

  const updateChartSettings = useCallback(
    (chartSettings: Record<string, any>) => {
      dispatch(updateSettings(chartSettings));
    },
    []
  );

  return (
    <>
      <Container id="editor" data-testid="editor">
        <EditorNavigation onSaveQuery={onSaveQuery} />
        <section>
          {isQueryLimitReached && (
            <QueryLimitReached
              upgradeSubscriptionUrl={upgradeSubscriptionUrl}
            />
          )}
          <Card>
            {queryResults && !isQueryLimitReached && (
              <Visualization
                query={query}
                queryResults={queryResults}
                widgetType={widgetType}
                chartSettings={chartSettings}
                widgetSettings={widgetSettings}
                theme={composeChartSettings.theme}
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
                widgetType={widgetType}
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
          <SectionContainer>
            <Creator
              onUpdateQuery={updateQuery}
              onUpdateChartSettings={updateChartSettings}
            />
          </SectionContainer>
        )}
        <EditorActions>
          {isExtraction(query) ? (
            <>
              <RunQuery
                isLoading={isQueryLoading}
                onClick={() => dispatch(queriesActions.runExtraction(query))}
              >
                {t('editor.preview_events_button')}
              </RunQuery>
              <ActionButton data-testid="email-extraction">
                <Button
                  variant="success"
                  size="large"
                  onClick={() => dispatch(queriesActions.extractToEmail())}
                >
                  {t('editor.extract_to_email_button')}
                </Button>
              </ActionButton>
            </>
          ) : (
            <RunQuery isLoading={isQueryLoading} onClick={() => onRunQuery()}>
              {t('editor.run_query_button')}
            </RunQuery>
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
      </Container>
      <ConfirmExtraction />
    </>
  );
};

export default Editor;
