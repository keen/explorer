import { Analysis } from '../../types';

export type CreatorFields = 'analysis' | 'eventCollection' | 'targetProperty';

type FieldRule = ('*' | Analysis)[];

export type QueryCreatorConfig = Record<CreatorFields, FieldRule>;
