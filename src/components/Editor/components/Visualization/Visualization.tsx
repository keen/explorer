import React, { FC, useEffect, useMemo } from 'react';
import {
  getAvailableWidgets,
  getSimpleOptionsWidgets,
  WidgetPicker,
  PickerWidgets,
} from '@keen.io/widget-picker';

import { Container, PickerContainer } from './Visualization.styles';
import { getDefaultSettings } from './utils';

import QueryVisualization from '../../../QueryVisualization';
import { ChartSettings } from '../../../../types';

type Props = {
  /** Widget type */
  widgetType: PickerWidgets;
  /** Chart settings */
  chartSettings: Record<string, any>;
  /** Widget settings */
  widgetSettings: Record<string, any>;
  /** Query definition */
  query: Record<string, any>;
  /** Analysis results */
  queryResults: Record<string, any>;
  onChangeVisualization: (settings: {
    widgetType: PickerWidgets;
    chartSettings: ChartSettings;
    widgetSettings: Record<string, any>;
  }) => void;
  /** Determines if chart is in edit mode */
  inEditMode?: boolean;
};

const Visualization: FC<Props> = ({
  widgetType,
  chartSettings,
  widgetSettings,
  query,
  queryResults,
  onChangeVisualization,
  inEditMode,
}) => {
  const widgets = useMemo(() => getAvailableWidgets(query), [queryResults]);

  useEffect(() => {
    if (!widgets.includes(widgetType)) {
      const [defaultWidget] = widgets;
      const { chartSettings, widgetSettings } = getDefaultSettings(
        defaultWidget
      );
      onChangeVisualization({
        widgetType: defaultWidget,
        chartSettings,
        widgetSettings,
      });
    }
  }, [widgets, widgetType]);

  const onUpdateSettings = (widgetType, chartSettings, widgetSettings) => {
    onChangeVisualization({
      widgetType,
      chartSettings,
      widgetSettings,
    });
  };

  return (
    <Container>
      <PickerContainer data-testid="widget-picker">
        <WidgetPicker
          widgets={widgets}
          currentWidget={widgetType}
          chartSettings={chartSettings}
          widgetSettings={widgetSettings}
          disabledWidgetOptions={getSimpleOptionsWidgets(query)}
          onUpdateSettings={onUpdateSettings}
        />
      </PickerContainer>
      {widgets.includes(widgetType) && (
        <QueryVisualization
          widgetType={widgetType}
          inEditMode={inEditMode}
          chartSettings={chartSettings}
          widgetSettings={widgetSettings}
          queryResults={queryResults}
        />
      )}
    </Container>
  );
};

export default Visualization;
