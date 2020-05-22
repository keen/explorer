import React from 'react';

const AppContext = React.createContext<{
  keenAnalysis: any;
}>({
  keenAnalysis: null,
});

export default AppContext;
