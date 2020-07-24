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
  propertiesSchema: { path: string; type: string }[];
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
    path: string;
    type: string;
  }>(
    propertiesSchema,
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
          <Remove data-testid="remove-property" onClick={onRemove}>
            X
          </Remove>
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
