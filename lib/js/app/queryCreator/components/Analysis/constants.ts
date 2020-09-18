import { AnalysisItem } from './types';

export const ANALYSIS_GROUPS: AnalysisItem[][] = [
  [
    {
      label: 'Average',
      value: 'average',
      description:
        'Average value for a numeric target property.<br/><br/>Non-numeric values will be ignored.',
      index: 0,
    },
    {
      label: 'Count',
      value: 'count',
      description: 'Total number of events in a given stream.',
      index: 1,
    },
    {
      label: 'Count Unique',
      value: 'count_unique',
      description:
        'Number of events with unique values for the target property in a given stream.',
      index: 2,
    },
  ],
  [
    {
      label: 'Extraction',
      value: 'extraction',
      description:
        'Return events in the given stream with values for selected properties.<br/><br/>Results can be shown in a table or sent to an email.',
      index: 3,
    },
    {
      label: 'Funnel',
      value: 'funnel',
      description:
        'Return the number of unique actors that meet the criteria defined in each step.<br/><br/>"Actors" could mean users, devices, or any other identifiers.',
      index: 4,
    },
  ],
  [
    {
      label: 'Maximum',
      value: 'maximum',
      description:
        'Maximum of all numeric values for a target property.<br/><br/>Non-numeric values will be ignored.',
      index: 5,
    },
    {
      label: 'Median',
      value: 'median',
      description:
        'Median of all numeric values for a target property.<br/><br/>Non-numeric values will be ignored.',
      index: 6,
    },
    {
      label: 'Minimum',
      value: 'minimum',
      description:
        'Minimum of all numeric values for a target property.<br/><br/>Non-numeric values will be ignored.',
      index: 7,
    },
  ],
  [
    {
      label: 'Percentile',
      value: 'percentile',
      description:
        'Numeric value of a target property for a specified percentile.<br/><br/>Non-numeric values will be ignored.',
      index: 8,
    },
    {
      label: 'Select unique',
      value: 'select_unique',
      description: 'List of unique values found for a target property.',
      index: 9,
    },
    {
      label: 'Standard deviation',
      value: 'standard_deviation',
      description:
        'Standard deviation of all numeric values for a target property.<br/><br/>Non-numeric values will be ignored.',
      index: 10,
    },
    {
      label: 'Sum',
      value: 'sum',
      description:
        'Sum of all numeric values for a given property.<br/><br/>Non-numeric values will be ignored.',
      index: 11,
    },
  ],
];
