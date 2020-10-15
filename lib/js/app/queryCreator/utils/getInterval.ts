import { TIME_UNITS } from '../constants';

type Units = typeof TIME_UNITS[keyof typeof TIME_UNITS];

export const getInterval = (units: Units) =>
  Object.keys(TIME_UNITS).find((key) => TIME_UNITS[key] === units);
