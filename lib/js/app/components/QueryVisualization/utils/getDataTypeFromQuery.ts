import { DataTypes } from '../types';

export const getDataTypeFromQuery = (queryParams: any): DataTypes => {
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
    let dataType: DataTypes;

    if (query.analysisType === 'funnel') {
      dataType = 'categoricalOrdinal';
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
      dataType = 'categoricalChronological';
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
