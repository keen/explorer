export type SavedQuery = {
  name: string;
  displayName: string;
  cached: boolean;
  isCloned: boolean;
  tags: string[];
  refreshRate: number;
  exists: boolean;
  isQueryEditable: boolean;
  isQueryLoading: boolean;
};

export type ReducerState = SavedQuery;
