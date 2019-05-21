export const getQueryDataType = (query) => {
  const isInterval = typeof query.interval === 'string';
  const isGroupBy = typeof query.groupBy === 'string' || (query.groupBy instanceof Array && query.groupBy.length === 1);
  const is2xGroupBy = query.groupBy instanceof Array && query.groupBy.length === 2;
  let dataType;

  if (query.analysisType === 'funnel') {
    dataType = 'cat-ordinal';
  }
  else if (query.analysisType === 'extraction') {
    dataType = 'extraction';
  }
  else if (query.analysisType === 'select_unique') {
    dataType = 'nominal';
  }

  // metric
  else if (!isGroupBy && !isInterval && !is2xGroupBy) {
    dataType = 'singular';
  }

  // groupBy, no interval
  else if (isGroupBy && !isInterval) {
    dataType = 'categorical';
  }

  // interval, no groupBy
  else if (isInterval && (!isGroupBy && !is2xGroupBy)) {
    dataType = 'chronological';
  }

  // interval, groupBy
  else if (isInterval && (isGroupBy || is2xGroupBy)) {
    dataType = 'cat-chronological';
  }

  // 2x groupBy
  // TODO: research possible dataType options
  else if (!isInterval && is2xGroupBy) {
    dataType = 'categorical';
  }

  if (query.analysisType === 'extraction') {
    dataType = 'extraction';
  }

  if (query.analysisType === 'funnel') {
    dataType = 'funnel';
  }

  return dataType;
};

export const getChartTypeOptions = (query) => {
  const dataTypes = {
    'singular':           ['metric'],
    'categorical':        ['pie', 'bar', 'horizontal-bar', 'donut', 'table'],
    'cat-interval':       ['area', 'bar', 'horizontal-bar', 'line', 'spline', 'area-spline', 'step', 'area-step', 'table'],
    'cat-ordinal':        ['area', 'bar', 'horizontal-bar', 'line', 'spline', 'area-spline', 'step', 'area-step', 'table'],
    'chronological':      ['area', 'bar', 'line', 'spline', 'area-spline', 'step', 'area-step', 'table'],
    'cat-chronological':  ['area', 'bar', 'horizontal-bar', 'line', 'spline', 'area-spline', 'step', 'area-step', 'table'],
    'nominal':            ['table'],
    'extraction':         ['table'],
    'funnel':             ['horizontal-bar', 'funnel', 'horizontal-funnel', 'funnel-3d', 'horizontal-funnel-3d', 'table'],
  };
  const queryDataType = getQueryDataType(query);
  return dataTypes[queryDataType].concat(['JSON']);
};

export const responseSupportsChartType = (query, chartType) => {
  return getChartTypeOptions(query).includes(chartType);
};

export const isTableChartType = (chartType) => {
  return chartType == 'table';
}
