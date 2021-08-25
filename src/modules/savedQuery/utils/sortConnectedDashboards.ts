import { ConnectedDashboard } from '../types';

export const sortConnectedDashboards = (
  connectedDashboards: ConnectedDashboard[]
) => {
  const untitledDashboards = [];
  const titledDashboards = [];

  connectedDashboards.forEach((dashboard) => {
    if (dashboard.title) {
      return titledDashboards.push(dashboard);
    }
    untitledDashboards.push(dashboard);
  });

  titledDashboards.sort((a, b) => a.title.localeCompare(b.title));

  return [...titledDashboards, ...untitledDashboards];
};
