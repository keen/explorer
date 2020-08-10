import React from 'react';

const SearchContext = React.createContext<{
  expandTree: boolean;
  searchPropertiesPhrase: string;
}>({
  expandTree: false,
  searchPropertiesPhrase: null,
});

export default SearchContext;
