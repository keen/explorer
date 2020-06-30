import { DataTypes } from './types';

export const DEFAULT_VISUALIZATIONS = ['json'];

export const DEFAULT_FILENAME = 'untitled-query';

export const DATA_TYPES: Record<DataTypes, string[]> = {
  singular: ['metric'],
  categorical: ['bar', 'pie', 'donut', 'table'],
  categoricalInterval: ['area', 'bar', 'line', 'table'],
  categoricalOrdinal: ['area', 'bar', 'line', 'table'],
  chronological: ['area', 'bar', 'line', 'table'],
  categoricalChronological: ['area', 'bar', 'line', 'table'],
  nominal: ['table'],
  extraction: ['table'],
  funnel: ['funnel', 'table'],
};
