import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import WidgetCustomization, {
  MENU_ITEMS_ENUM,
  SerializedSettings,
  serializeInputSettings,
  serializeOutputSettings,
  useCustomizationSections,
} from '@keen.io/widget-customization';
import { WidgetSettings } from '@keen.io/widgets';
import { Query } from '@keen.io/query';
import { Button } from '@keen.io/ui-core';

import {
  ActionButton,
  Card,
  Container,
  CustomizationContainer,
  EditorActions,
  NavBar,
  SectionContainer,
} from './Editor.styles';

import { Creator, SectionTabs, Visualization } from './components';
import { isExtraction } from './utils';

import { AppContext } from '../../contexts';

import { editorSagaActions, EditorSection } from '../../modules/editor';

import {
  getQueryLimitReached,
  getQueryPerformState,
  getQueryResults,
  queriesActions,
} from '../../modules/queries';
import {
  clearQuery,
  getVisualization,
  setVisualization,
  updateChartSettings as updateSettings,
  updateVisualizationType,
  updateWidgetSettings,
} from '../../modules/app';

import EditorNavigation from '../EditorNavigation';
import RunQuery from '../RunQuery';
import ConfirmExtraction from '../ConfirmExtraction';
import VisualizationPlaceholder from '../VisualizationPlaceholder';
import QueryLimitReached from '../QueryLimitReached';
import { useApplyWidgetTheming } from '../../hooks';

type Props = {
  /** Query definition */
  query: Query;
  /** Run query event handler */
  onRunQuery: () => void;
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
}) => {
  const { modalContainer, chartEventsPubSub } = useContext(AppContext);

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
  const [activeMenuItem, setActiveMenuItem] = useState(null);

  const { themedChartSettings, themedWidgetSettings } = useApplyWidgetTheming({
    chartSettings,
    widgetSettings,
    dependencies: [widgetType, chartSettings, widgetSettings],
  });

  const [
    widgetCustomization,
    setCustomizationSettings,
  ] = useState<SerializedSettings>(() =>
    serializeInputSettings(
      widgetType,
      themedChartSettings,
      themedWidgetSettings
    )
  );

  useEffect(() => {
    const widgetSettings = serializeInputSettings(
      widgetType,
      themedChartSettings,
      themedWidgetSettings
    );
    setCustomizationSettings(widgetSettings);
  }, [widgetType]);

  const updateQuery = useCallback((query: Query) => {
    dispatch(queriesActions.setQuerySettings({ settings: query }));
  }, []);

  const updateChartSettings = useCallback(
    (chartSettings: Record<string, any>) => {
      dispatch(updateSettings(chartSettings));
    },
    []
  );

  const onChangeVisualization = (settings) => {
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
  };

  const onUpdateWidgetSettings = (widgetSettings) => {
    dispatch(updateWidgetSettings(widgetSettings));

    setCustomizationSettings((state) => ({
      ...state,
      widget: widgetSettings,
    }));
  };

  const onUpdateChartSettings = (chartSettings) => {
    const chart = serializeOutputSettings(widgetType, chartSettings);
    updateChartSettings(chart);

    setCustomizationSettings((state) => ({
      ...state,
      chart: chartSettings,
    }));
  };

  return (
    <>
      <Container id="editor" data-testid="editor">
        <EditorNavigation />
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
                inEditMode={
                  activeMenuItem === MENU_ITEMS_ENUM.FORMATTING &&
                  editorSection === EditorSection.SETTINGS
                }
                queryResults={queryResults}
                widgetType={widgetType}
                chartSettings={themedChartSettings}
                widgetSettings={themedWidgetSettings}
                onChangeVisualization={onChangeVisualization}
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
                pubSub={chartEventsPubSub}
                customizationSections={customizationSections}
                chartSettings={widgetCustomization.chart}
                widgetSettings={widgetCustomization.widget}
                savedQueryName={savedQueryName}
                onUpdateWidgetSettings={onUpdateWidgetSettings}
                onUpdateChartSettings={onUpdateChartSettings}
                onMenuItemChange={(menuItem) => setActiveMenuItem(menuItem)}
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
