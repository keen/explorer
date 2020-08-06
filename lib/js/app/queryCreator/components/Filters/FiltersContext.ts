import React from 'react';

const FiltersContext = React.createContext<{
  schema: Record<string, string>;
}>({
  schema: {},
});

export default FiltersContext;
