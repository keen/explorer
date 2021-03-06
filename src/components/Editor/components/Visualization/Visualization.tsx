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
    chartSettings: Record<string, any>;
    widgetSettings: Record<string, any>;
  }) => void;
};

const Visualization: FC<Props> = ({
  widgetType,
  chartSettings,
  widgetSettings,
  query,
  queryResults,
  onChangeVisualization,
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

  return (
    <Container>
      <PickerContainer data-testid="widget-picker">
        <WidgetPicker
          widgets={widgets}
          currentWidget={widgetType}
          chartSettings={chartSettings}
          widgetSettings={widgetSettings}
          disabledWidgetOptions={getSimpleOptionsWidgets(query)}
          onUpdateSettings={(widgetType, chartSettings, widgetSettings) => {
            onChangeVisualization({
              widgetType,
              chartSettings,
              widgetSettings,
            });
          }}
        />
      </PickerContainer>
      {widgets.includes(widgetType) && (
        <QueryVisualization
          widgetType={widgetType}
          chartSettings={chartSettings}
          widgetSettings={widgetSettings}
          queryResults={queryResults}
        />
      )}
    </Container>
  );
};

export default Visualization;
