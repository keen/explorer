export const getQueryDataType = (queryParams) => {
  let query = queryParams;
  if (query) {
    if (query.analysis_type) {
      // underscore format to camel
      query = {
        ...queryParams,
        groupBy: queryParams.group_by,
        analysisType: queryParams.analysis_type,
      };
    }
    const isInterval = typeof query.interval === 'string';
    const isGroupBy =
      typeof query.groupBy === 'string' ||
      (query.groupBy instanceof Array && query.groupBy.length === 1);
    const is2xGroupBy =
      query.groupBy instanceof Array && query.groupBy.length === 2;
    let dataType;

    if (query.analysisType === 'funnel') {
      dataType = 'catOrdinal';
    } else if (query.analysisType === 'extraction') {
      dataType = 'extraction';
    } else if (query.analysisType === 'select_unique') {
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
    else if (isInterval && !isGroupBy && !is2xGroupBy) {
      dataType = 'chronological';
    }

    // interval, groupBy
    else if (isInterval && (isGroupBy || is2xGroupBy)) {
      dataType = 'catChronological';
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
  }
};

export const getChartTypeOptions = (query) => {
  if (query) {
    const dataTypes = {
      singular: ['metric'],
      categorical: ['bar', 'pie', 'donut', 'table'],
      catInterval: ['area', 'bar', 'line', 'table'],
      catOrdinal: ['area', 'bar', 'line', 'table'],
      chronological: ['area', 'bar', 'line', 'table'],
      catChronological: ['area', 'bar', 'line', 'spline', 'table'],
      nominal: ['table'],
      extraction: ['table'],
      funnel: ['funnel', 'table'],
    };
    const queryDataType = getQueryDataType(query);
    return dataTypes[queryDataType].concat(['JSON']);
  }
};

export const getChartType = (payload) => {
  const { query } = payload;

  if (query) {
    if (
      payload &&
      payload.metadata &&
      payload.metadata.visualization &&
      payload.metadata.visualization.chart_type
    ) {
      return payload.metadata.visualization.chart_type;
    }

    const chartTypes = getChartTypeOptions(query);
    if (chartTypes.length) {
      return chartTypes[0];
    }

    return 'JSON';
  }
};

export const responseSupportsChartType = (query, chartType) => {
  return getChartTypeOptions(query).includes(chartType);
};

export const isTableChartType = (chartType) => {
  return chartType == 'table';
};
