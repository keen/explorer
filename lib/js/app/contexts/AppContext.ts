import React from 'react';

const AppContext = React.createContext<{
  keenAnalysis: any;
  modalContainer: string;
}>({
  keenAnalysis: null,
  modalContainer: null,
});

export default AppContext;
