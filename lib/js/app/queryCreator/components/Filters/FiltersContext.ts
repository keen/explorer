import React from 'react';

const FiltersContext = React.createContext<{
  expandTree: boolean;
  searchPropertiesPhrase: boolean;
}>({
  expandTree: false,
  searchPropertiesPhrase: false,
});

export default FiltersContext;
