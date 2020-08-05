import React from 'react';

const FiltersContext = React.createContext<{
  expandTree: boolean;
  searchPropertiesPhrase: boolean;
  schema: Record<string, string>;
}>({
  expandTree: false,
  searchPropertiesPhrase: false,
  schema: {},
});

export default FiltersContext;
