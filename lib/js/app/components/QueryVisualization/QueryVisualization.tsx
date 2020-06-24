import React, { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Label, Select } from '@keen.io/ui-core';

import { Settings } from './QueryVisualization.styles';
import text from './text.json';

import DataViz from '../DataViz';
import JSONView from '../JSONView';

import { getVisualizationType, setVisualizationType } from '../../modules/app';
import { getQueryResults } from '../../modules/queries';
import { getVisualizations } from './utils/getVisualizations';

type Props = {
  /** Query definition */
  query: Object;
};

const QueryVisualization: FC<Props> = ({ query }) => {
  const dispatch = useDispatch();
  const visualizations = getVisualizations(query);
  const options = useMemo(
    () =>
      visualizations.map((widgetType: string) => ({
        label: widgetType,
        value: widgetType,
      })),
    [visualizations]
  );

  const queryResults = useSelector(getQueryResults);

  const [defaultVisualization] = visualizations;
  const visualization =
    useSelector(getVisualizationType) || defaultVisualization;

  return (
    <div>
      {queryResults && visualization === 'json' && (
        <JSONView analysisResults={queryResults} />
      )}
      {queryResults && visualization !== 'json' && (
        <DataViz analysisResults={queryResults} visualization={visualization} />
      )}
      <Settings>
        <div data-testid="visualization-select">
          <Label htmlFor="visualization-type">{text.visualizationLabel}</Label>
          <Select
            inputId="visualization-type"
            placeholder={text.visualizationPlaceholder}
            onChange={({ value }: { label: string; value: string }) =>
              dispatch(setVisualizationType(value))
            }
            value={
              visualization
                ? { label: visualization, value: visualization }
                : null
            }
            variant="solid"
            options={options}
          />
        </div>
      </Settings>
    </div>
  );
};

export default QueryVisualization;
