export type SavedQuery = {
  name: string;
  displayName: string;
  cached: boolean;
  isCloned: boolean;
  tags: string[];
  refreshRate: number;
  exists: boolean;
};

export type ReducerState = SavedQuery;
