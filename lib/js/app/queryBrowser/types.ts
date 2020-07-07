export type Metadata = {
  displayName?: string;
};

export type SavedQuery = {
  refreshRate: number;
  userLastModifiedDate: string;
  lastModifiedDate: string;
  queryName: string;
  metadata?: Metadata;
  query: {
    analysisType: string;
  };
};
