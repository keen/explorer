/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';

const AppContext = React.createContext<{
  modalContainer: string;
  onUpdateChartSettings: (chartSettings: Record<string, any>) => void;
}>({
  modalContainer: null,
  onUpdateChartSettings: () => {},
});

export default AppContext;
