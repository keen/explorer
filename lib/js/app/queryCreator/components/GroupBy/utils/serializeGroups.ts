import { Group } from '../types';

export const serializeGroups = (groups: Group[]) =>
  groups.map(({ property }) => property);
