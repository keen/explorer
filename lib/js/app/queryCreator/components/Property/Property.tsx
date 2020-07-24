import React, { FC, useState, useEffect } from 'react';

import { Container, Edit, Remove, Content } from './Property.styles';

import Label from '../Label';
import PropertiesTree from '../PropertiesTree';

import { createTree } from '../../utils/createTree';
import { useSearch } from '../../hooks';

type Props = {
  /** Property name */
  property: string;
  /** Remove event handler */
  onRemove: () => void;
  /** Change property event handler */
  onChange: (property: string) => void;
  /** Dragged indicator */
  isDragged: boolean;
  /** Properties schema collection */
  propertiesSchema: { propertyPath: string; propertyType: string }[];
  /** Collection properties schema in tree structure */
  propertiesTree: Record<string, string[] | Object>;
};

const Property: FC<Props> = ({
  isDragged,
  property,
  propertiesSchema,
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
    propertiesSchema,
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
  }, [editMode, propertiesSchema]);

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

export default Property;
