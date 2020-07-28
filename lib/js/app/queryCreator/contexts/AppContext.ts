import React from 'react';

const AppContext = React.createContext<{
  modalContainer: string;
}>({
  modalContainer: null,
});

export default AppContext;
