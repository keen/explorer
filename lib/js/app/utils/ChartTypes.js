export const getQueryDataType = (query) => {
  const isInterval = typeof query.interval === "string";
  const isGroupBy = typeof query.group_by === "string" || (query.group_by instanceof Array && query.group_by.length === 1);
  const is2xGroupBy = query.group_by instanceof Array && query.group_by.length === 2;
  let dataType;

  if (query.analysis_type === "funnel") {
    dataType = 'cat-ordinal';
  }
  else if (query.analysis_type === "extraction") {
    dataType = 'extraction';
  }
  else if (query.analysis_type === "select_unique") {
    dataType = 'nominal';
  }

  // metric
  else if (!isGroupBy && !isInterval && !is2xGroupBy) {
    dataType = 'singular';
  }

  // group_by, no interval
  else if (isGroupBy && !isInterval) {
    dataType = 'categorical';
  }

  // interval, no group_by
  else if (isInterval && (!isGroupBy && !is2xGroupBy)) {
    dataType = 'chronological';
  }

  // interval, group_by
  else if (isInterval && (isGroupBy || is2xGroupBy)) {
    dataType = 'cat-chronological';
  }

  // 2x group_by
  // TODO: research possible dataType options
  else if (!isInterval && is2xGroupBy) {
    dataType = 'categorical';
  }

  if (query.analysisType === 'extraction') {
    dataType = 'extraction';
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
