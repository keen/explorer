import { AnalysisItem } from './types';

export const ANALYSIS_GROUPS: AnalysisItem[][] = [
  [
    {
      label: 'Average',
      value: 'average',
      description:
        'Calculate the average value for a numeric target property.<br/><br/>Non-numeric values will be ignored.',
      index: 0,
    },
    {
      label: 'Count',
      value: 'count',
      description: 'Return the total number of events in a given stream.',
      index: 1,
    },
    {
      label: 'Count Unique',
      value: 'count_unique',
      description:
        'Return the number of events with unique values for the target property in a given stream.',
      index: 2,
    },
  ],
  [
    {
      label: 'Extraction',
      value: 'extraction',
      description:
        'Return events in the given stream with values for selected or all properties.<br/><br/>Results can be shown in a table or sent to an email.',
      index: 3,
    },
    {
      label: 'Funnel',
      value: 'funnel',
      description:
        'Return the number of unique actors that successfully (or not) make it through a series of steps.<br/><br/>"Actors" could mean users, devices, or any other identifiers.',
      index: 4,
    },
  ],
  [
    {
      label: 'Maximum',
      value: 'maximum',
      description:
        'Return the maximum of all numeric values for a target property.<br/><br/>Non-numeric values will be ignored.',
      index: 5,
    },
    {
      label: 'Median',
      value: 'median',
      description:
        'Calculate the median of all numeric values for a target property.<br/><br/>Non-numeric values will be ignored.',
      index: 6,
    },
    {
      label: 'Minimum',
      value: 'minimum',
      description:
        'Return the minimum of all numeric values for a target property.<br/><br/>Non-numeric values will be ignored.',
      index: 7,
    },
  ],
  [
    {
      label: 'Percentile',
      value: 'percentile',
      description:
        'Return a numeric value of a target property for a specified percentile.<br/><br/>Non-numeric values will be ignored.',
      index: 8,
    },
    {
      label: 'Select unique',
      value: 'select_unique',
      description:
        'Return a list of unique values found for a target property.',
      index: 9,
    },
    {
      label: 'Standard deviation',
      value: 'standard_deviation',
      description:
        'Calculate a standard deviation of all numeric values for a target property.<br/><br/>Non-numeric values will be ignored.',
      index: 10,
    },
    {
      label: 'Sum',
      value: 'sum',
      description:
        'Calculate the sum of all numeric values for a given property.<br/><br/>Non-numeric values will be ignored.',
      index: 11,
    },
  ],
];
