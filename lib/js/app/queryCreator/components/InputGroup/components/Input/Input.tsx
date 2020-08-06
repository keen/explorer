import React, {
  FC,
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';

import Dropdown from '../../../Dropdown';
import EmptySearch from '../../../EmptySearch';
import Property from '../../../Property';
import PropertiesTree from '../../../PropertiesTree';

import { Container, DropdownContent } from './Input.styles';

import { createTree } from '../../../../utils/createTree';
import { useSearch } from '../../../../hooks';

import text from './text.json';

type Props = {
  /** Property */
  property?: string;
  /** Select property event handler */
  onSelectProperty: (property: string) => void;
  /** Properties tree */
  properties: Record<string, string[] | Record<string, any>>;
  /** Properties schema */
  propertiesSchema: { path: string; type: string }[];
  /** Disable edit mode */
  isEditDisabled?: boolean;
};

const Input: FC<Props> = ({
  property,
  properties,
  propertiesSchema,
  isEditDisabled,
  onSelectProperty,
}) => {
  const containerRef = useRef(null);
  const expandTrigger = useRef(null);
  
  const [editMode, setEditMode] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState(null);
  const [expandTree, setTreeExpand] = useState(false);
  const [propertiesTree, setPropertiesTree] = useState(properties);

  const isEmptySearch =
  searchPhrase && propertiesTree && !Object.keys(propertiesTree).length;

  const outsideClick = useCallback(
    (e) => {
      if (
        editMode &&
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        setEditMode(false);
      }
    },
    [editMode, containerRef]
  );

  useEffect(() => {
    document.addEventListener('click', outsideClick);
    return () => document.removeEventListener('click', outsideClick);
  }, [editMode, containerRef]);

  useEffect(() => {
    if (isEditDisabled) {
      setEditMode(false);
      setTreeExpand(false);
    }
  }, [isEditDisabled]);

  const { searchHandler } = useSearch<{
    path: string;
    type: string;
  }>(
    propertiesSchema,
    (searchResult, phrase) => {
      if (expandTrigger.current) clearTimeout(expandTrigger.current);
      if (phrase) {
        const searchTree = {};
        searchResult.forEach(({ path, type }) => {
          searchTree[path] = type;
        });
        setSearchPhrase(phrase);
        setPropertiesTree(createTree(searchTree));

        expandTrigger.current = setTimeout(() => {
          setTreeExpand(true);
        }, 500);
      } else {
        setTreeExpand(false);
        setPropertiesTree(null);
      }
    },
    {
      keys: ['path', 'type'],
      threshold: 0.4,
    }
  );

  return (
    <Container
      ref={containerRef}
      onClick={() => !editMode && setEditMode(true)}
    >
      <Property
        property={property}
        editMode={editMode}
        placeholder={text.placeholder}
        searchPlaceholder={text.searchPlaceholder}
        onEditInputChange={searchHandler}
      />
      <Dropdown isOpen={editMode} fullWidth={false}>
        <DropdownContent>
          {isEmptySearch ? (
            <EmptySearch message={text.emptySearchResults} />
          ) : (
            <PropertiesTree
              expanded={expandTree}
              activeProperty={property}
              properties={propertiesTree || properties}
              onClick={(_e, property) => {
                onSelectProperty(property);
                setEditMode(false);
              }}
            />
          )}
        </DropdownContent>
      </Dropdown>
    </Container>
  );
};

export default Input;
