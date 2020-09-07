import { v4 as uuid } from 'uuid';

import { Filter, FunnelStep } from '../types';

export const serializeFunnelSteps = (steps: FunnelStep[]) => {
  const stepsFilters: {
    id: string;
    filters: Filter[];
    eventCollection: string;
  }[] = [];
  const transformedSteps: FunnelStep[] = [];

  steps.forEach(({ filters, eventCollection, ...rest }) => {
    const id = uuid();

    transformedSteps.push({
      id,
      filters: [],
      eventCollection,
      ...rest,
    });

    if (filters && filters.length) {
      stepsFilters.push({
        id,
        filters,
        eventCollection,
      });
    }
  });

  return {
    transformedSteps,
    stepsFilters,
  };
};
