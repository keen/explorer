export type ConnectedDashboard = {
  id: string;
  title?: string;
};

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
  connectedDashboards?: ConnectedDashboard[];
  isConnectedDashboardsLoading: boolean;
  isConnectedDashboardsError: boolean;
};

export type ReducerState = SavedQuery;
