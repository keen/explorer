import React, { FC, useMemo, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Label, Select, Button } from '@keen.io/ui-core';
import { parseQuery } from '@keen.io/parser';
import { colors } from '@keen.io/colors';

import { Settings } from './QueryVisualization.styles';
import text from './text.json';

import DataViz from '../DataViz';
import JSONView from '../JSONView';

import { getVisualizationType, setVisualizationType } from '../../modules/app';
import { getSavedQueryName } from '../../modules/savedQuery';

import {
  getVisualizations,
  sortVisualizations,
  exportToSvg,
  exportToCsv,
  exportToJson,
} from './utils';

import { DEFAULT_FILENAME } from './constants';

type Props = {
  /** Query definition */
  query: Object;
  /** Analysis results */
  queryResults: Object;
};

const QueryVisualization: FC<Props> = ({ queryResults, query }) => {
  const dispatch = useDispatch();
  const queryName = useSelector(getSavedQueryName);
  const datavizContainerRef = useRef<HTMLDivElement>(null);

  const visualizations = useMemo(
    () => getVisualizations(query).sort(sortVisualizations),
    [query]
  );
  const options = useMemo(
    () =>
      visualizations.map((widgetType: string) => ({
        label: widgetType,
        value: widgetType,
      })),
    [visualizations]
  );

  const extractToImage = useCallback(() => {
    try {
      exportToSvg({
        quality: 1,
        backgroundColor: colors.white[500],
        node: datavizContainerRef.current,
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  const exportFilename = queryName || DEFAULT_FILENAME;
  const [defaultVisualization] = visualizations;
  const visualization = useSelector(getVisualizationType);

  const widgetType =
    visualization && visualizations.includes(visualization)
      ? visualization
      : defaultVisualization;

  const showDataviz = widgetType !== 'json';

  return (
    <div>
      {showDataviz ? (
        <DataViz
          analysisResults={queryResults}
          visualization={widgetType}
          ref={datavizContainerRef}
        />
      ) : (
        <JSONView analysisResults={queryResults} />
      )}
      <Settings>
        {showDataviz && (
          <Button onClick={() => extractToImage()}>
            {text.exportImageLabel}
          </Button>
        )}

        <Button onClick={() => exportToJson(queryResults, exportFilename)}>
          {text.exportJSONLabel}
        </Button>

        <Button
          onClick={() => {
            const { results } = parseQuery(queryResults as any);
            exportToCsv(results, exportFilename);
          }}
        >
          {text.exportCSVLabel}
        </Button>

        <div data-testid="visualization-select">
          <Label htmlFor="visualization-type">{text.visualizationLabel}</Label>
          <Select
            inputId="visualization-type"
            placeholder={text.visualizationPlaceholder}
            onChange={({ value }: { label: string; value: string }) =>
              dispatch(setVisualizationType(value))
            }
            value={widgetType ? { label: widgetType, value: widgetType } : null}
            variant="solid"
            options={options}
          />
        </div>
      </Settings>
    </div>
  );
};

export default QueryVisualization;
