import React, { FC, useContext, useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import WidgetCustomization, {
  SerializedSettings,
  useCustomizationSections,
  serializeInputSettings,
  serializeOutputSettings,
  MENU_ITEMS_ENUM,
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

import { editorActions, EditorSection } from '../../modules/editor';

import {
  queriesActions,
  getQueryResults,
  getQueryPerformState,
  getQueryLimitReached,
} from '../../modules/queries';

import EditorNavigation from '../EditorNavigation';
import RunQuery from '../RunQuery';
import ConfirmExtraction from '../ConfirmExtraction';
import VisualizationPlaceholder from '../VisualizationPlaceholder';
import QueryLimitReached from '../QueryLimitReached';
import { useApplyWidgetTheming } from '../../hooks';
import { appActions, appSelectors } from '../../modules/app';
import {
  getActiveEditorTab,
  getActiveSettingsSection,
} from '../../modules/editor/selectors';

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
    appSelectors.getVisualization
  );

  const customizationSections = useCustomizationSections(
    !!queryResults,
    query,
    widgetType,
    {
      card: true,
    }
  );

  const activeTab = useSelector(getActiveEditorTab);
  const activeSettingsSection = useSelector(getActiveSettingsSection);

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

  const updateQuery = useCallback((query: Query) => {
    dispatch(queriesActions.setQuerySettings({ settings: query }));
  }, []);

  const updateChartSettings = useCallback(
    (chartSettings: Record<string, any>) => {
      dispatch(appActions.updateChartSettings({ chartSettings }));
    },
    []
  );

  const onChangeVisualization = (settings) => {
    const chart = serializeOutputSettings(
      settings.widgetType,
      widgetCustomization.chart
    );
    dispatch(
      appActions.setVisualization({
        type: settings.widgetType,
        chartSettings: {
          ...settings.chartSettings,
          ...chart,
        },
        widgetSettings: {
          ...settings.widgetSettings,
          ...(widgetCustomization.widget as WidgetSettings),
        },
      })
    );
    dispatch(appActions.updateVisualizationType(settings.widgetType));
  };

  const onUpdateWidgetSettings = (widgetSettings) => {
    dispatch(appActions.updateWidgetSettings({ widgetSettings }));

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

  useEffect(() => {
    return () => {
      dispatch(editorActions.setActiveEditorTab(EditorSection.QUERY));
      dispatch(editorActions.setActiveSettingsSection(MENU_ITEMS_ENUM.TITLES));
    };
  }, []);

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
                  activeSettingsSection === MENU_ITEMS_ENUM.FORMATTING &&
                  activeTab === EditorSection.SETTINGS
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
            activeSection={activeTab}
            onChangeSection={(activeSection) => {
              dispatch(
                editorActions.setActiveSettingsSection(MENU_ITEMS_ENUM.TITLES)
              );
              dispatch(editorActions.setActiveEditorTab(activeSection));
            }}
          />
        </NavBar>
        {activeTab === EditorSection.SETTINGS && (
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
                activeMenuItem={activeSettingsSection}
                onMenuItemChange={(menuItem) =>
                  dispatch(editorActions.setActiveSettingsSection(menuItem))
                }
                modalContainer={modalContainer}
                analysisResult={queryResults?.result}
              />
            </CustomizationContainer>
          </SectionContainer>
        )}
        {activeTab === EditorSection.QUERY && (
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
                {t('editor.run_query_button')}
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
              onClick={() => dispatch(appActions.clearQuery())}
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
