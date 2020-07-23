import React, { FC, useState, useEffect } from 'react';

import { Container, Edit, Remove, Content } from './GroupByItem.styles';

import Label from '../Label';
import PropertiesTree from '../PropertiesTree';

import { createTree } from '../../utils/createTree';
import { useSearch } from '../../hooks';

type Props = {
  /** Remove event handler */
  onRemove: () => void;
  /** Change property event handler */
  onChange: (property: string) => void;
  /** Group property */
  property: string;
  /** Dragged indicator */
  isDragged: boolean;
  /** Collection properties */
  properties: { propertyPath: string; propertyType: string }[];
  /** Collection tree properties */
  propertiesTree: Record<string, string[] | Object>;
};

const GroupByItem: FC<Props> = ({
  isDragged,
  property,
  properties,
  propertiesTree,
  onChange,
  onRemove,
}) => {
  const [editMode, setEditMode] = useState(false);
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
  }, [editMode, properties]);

  return (
    <Container
      style={{
        cursor: editMode ? 'default' : isDragged ? 'grabbing' : 'grab',
      }}
    >
      <Label>
        <Content>
          <Edit
            onClick={() => !isDragged && setEditMode(!editMode)}
            style={{
              cursor: isDragged ? 'grabbing' : 'text',
            }}
          >
            {editMode ? (
              <input
                type="text"
                autoFocus
                defaultValue={property}
                onChange={searchHandler}
              />
            ) : (
              property
            )}
          </Edit>
          <Remove onClick={onRemove}>X</Remove>
        </Content>
        {editMode && (
          <div>
            <PropertiesTree
              properties={searchTree}
              onClick={(e, property) => {
                e.stopPropagation();
                setEditMode(false);
                onChange(property);
              }}
            />
          </div>
        )}
      </Label>
    </Container>
  );
};

export default GroupByItem;
