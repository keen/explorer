import React, { FC, useState, useEffect } from 'react';

import PropertiesTree from '../PropertiesTree';

import { createTree } from '../../utils/createTree';
import { useSearch } from '../../hooks';

type Props = {
  /** Add group by settings event handler */
  onAddGroup: (property: string) => void;
  /** Collection properties */
  properties: { propertyPath: string; propertyType: string }[];
  /** Collection tree properties */
  propertiesTree: Record<string, string[] | Object>;
};

const AddGroupBy: FC<Props> = ({ onAddGroup, properties, propertiesTree }) => {
  const [showProperties, setPropertiesVisibility] = useState(false);
  const [searchTree, setSearchTree] = useState(propertiesTree);

  const { searchHandler } = useSearch<{
    propertyPath: string;
    propertyType: string;
  }>(
    properties,
    (searchResult) => {
      const searchTree = {};
      searchResult.forEach(({ propertyPath, propertyType }) => {
        searchTree[propertyPath] = propertyType;
      });
      setSearchTree(createTree(searchTree));
    },
    {
      keys: ['propertyPath', 'propertyType'],
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
              onAddGroup(property);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AddGroupBy;
