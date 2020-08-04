import React, { FC, useState, useEffect } from 'react';

import PropertiesTree from '../PropertiesTree';

import { createTree } from '../../utils/createTree';
import { useSearch } from '../../hooks';

type Props = {
  /** Add property event handler */
  onAddProperty: (property: string) => void;
  /** Disabled indicator */
  isDisabled: boolean;
  /** Collection properties */
  properties: { path: string; type: string }[];
  /** Collection tree properties */
  propertiesTree: Record<string, string[] | Record<string, any>>;
};

const AddProperty: FC<Props> = ({
  onAddProperty,
  properties,
  propertiesTree,
}) => {
  const [showProperties, setPropertiesVisibility] = useState(false);
  const [searchTree, setSearchTree] = useState(propertiesTree);

  const { searchHandler } = useSearch<{
    path: string;
    type: string;
  }>(
    properties,
    (searchResult) => {
      const searchTree = {};
      searchResult.forEach(({ path, type }) => {
        searchTree[path] = type;
      });
      setSearchTree(createTree(searchTree));
    },
    {
      keys: ['path', 'type'],
      threshold: 0.4,
    }
  );

  useEffect(() => {
    setSearchTree(propertiesTree);
  }, [showProperties, properties]);

  return (
    <div>
      <div onClick={() => setPropertiesVisibility(true)}>Add</div>
      {showProperties && (
        <div>
          <input type="text" onChange={searchHandler} />
          <PropertiesTree
            properties={searchTree}
            onClick={(e, property) => {
              e.stopPropagation();
              setPropertiesVisibility(false);
              onAddProperty(property);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AddProperty;
