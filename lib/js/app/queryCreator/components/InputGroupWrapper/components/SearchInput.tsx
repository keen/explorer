import React, { FC, useState, useEffect, useCallback } from 'react';

import { createTree } from '../../../utils/createTree';
import { useSearch } from '../../../hooks';

import { StyledInput, SearchIcon, Content, Wrapper, TreeWrapper } from './SearchInput.styles';
import PropertiesTree from '../../PropertiesTree';

type Props = {
  /** Property name */
  property: string;
  /** Change property event handler */
  onChange: (property: string) => void;
  /** Dragged indicator */
  isDragged: boolean;
  /** Properties schema collection */
  propertiesSchema: { path: string; type: string }[];
  /** Collection properties schema in tree structure */
  propertiesTree: Record<string, string[] | Record<string, any>>;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
};

const SearchInput: FC<Props> = ({
  isDragged,
  property,
  propertiesSchema,
  propertiesTree,
  editMode,
  onChange,
  setEditMode,
}) => {
  // const [editMode, setEditMode] = useState(true);
  const [searchTree, setSearchTree] = useState(propertiesTree);
  const [propertyWidth, setPropertyWidth] = useState(0);

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

  const propertyRef = useCallback(node => {
    if (node !== null) {
      const { width } = node.getBoundingClientRect();
      setPropertyWidth(width);
    }
  }, []);

  return (
    <Wrapper>
      <Content
        onClick={() => !isDragged && setEditMode(!editMode)}
        isDragged={isDragged}
      >
        {editMode ? (
            <>
              {/* <SearchIcon>
                <Icon
                  type="search"
                  fill={transparentize(0.3, colors.blue[500])}
                  width={15}
                  height={15}
                />
              </SearchIcon> */}
              <StyledInput
                type="text"
                autoFocus
                data-testid="dropable-container-input"
                placeholder={property}
                onChange={searchHandler}
                inputWidth={propertyWidth}
              />
            </>
          ) : (
            <div ref={propertyRef}>
              {property}
            </div>
          )}
      </Content>
      {editMode && (
        <TreeWrapper>
          <PropertiesTree
            properties={searchTree}
            onClick={(e, property) => {
              e.stopPropagation();
              setEditMode(false);
              onChange(property);
            }}
          />
        </TreeWrapper>
      )}
    </Wrapper>
  );
}

export default SearchInput;
