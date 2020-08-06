import React from 'react';

const SearchContext = React.createContext<{
  expandTree: boolean;
  searchPropertiesPhrase: boolean;
}>({
  expandTree: false,
  searchPropertiesPhrase: false,
});

export default SearchContext;
