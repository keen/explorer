import React, { FC, useState, useRef, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Input,
  Label,
  Badge,
  Dropdown,
  DropdownList,
  useSearch,
} from '@keen.io/ui-core';

import {
  DropdownContainer,
  DropdownListContainer,
  TagsContainer,
  Tag,
} from './QueryTagManager.styles';
import text from './text.json';

import { getTagsPool } from '../../modules/project';

type Props = {
  /** Collection of query tags */
  tags: string[];
  /** Add tag event handler */
  onAddTag: (tag: string) => void;
  /** Remove tag event handler */
  onRemoveTag: (tag: string) => void;
};

const QueryTagManager: FC<Props> = ({ tags, onAddTag, onRemoveTag }) => {
  const tagsPool = useSelector(getTagsPool);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const [dropdownVisible, setDropdownVisibility] = useState(false);
  const [tagsHints, setTagsHint] = useState(null);

  const { searchHandler, searchPhrase } = useSearch(
    tagsPool,
    (searchResults, phrase) => {
      setTagsHint(searchResults.length ? searchResults : null);
      setDropdownVisibility(!!phrase);
    },
    {
      threshold: 0.1,
    }
  );

  const outsideClick = useCallback(
    (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setDropdownVisibility(false);
      }
    },
    [containerRef]
  );

  useEffect(() => {
    document.addEventListener('click', outsideClick);
    return () => document.removeEventListener('click', outsideClick);
  }, [containerRef]);

  return (
    <div>
      <Label htmlFor="queryLabels" variant="secondary">
        {text.labels}
      </Label>
      <div ref={containerRef}>
        <DropdownContainer>
          <Input
            data-testid="query-labels-input"
            ref={inputRef}
            type="text"
            variant="solid"
            id="queryLabels"
            placeholder={text.inputPlaceholder}
            onChange={searchHandler}
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.charCode === 13) {
                e.preventDefault();
                const value = e.currentTarget.value;
                if (value && !tags.includes(value)) {
                  setDropdownVisibility(false);
                  onAddTag(value);
                }
                e.currentTarget.value = '';
              }
            }}
          />
          <Dropdown isOpen={dropdownVisible}>
            <DropdownListContainer>
              <DropdownList
                items={
                  tagsHints && tagsHints.length
                    ? tagsHints.map((tag: string) => ({
                        label: tag,
                        value: tag,
                      }))
                    : [
                        {
                          label: `${searchPhrase} ${text.newTag}`,
                          value: searchPhrase,
                        },
                      ]
                }
                onClick={(e, { value }) => {
                  if (!tags.includes(value)) {
                    onAddTag(value);
                  }

                  inputRef.current.value = '';
                  setDropdownVisibility(false);
                }}
              />
            </DropdownListContainer>
          </Dropdown>
        </DropdownContainer>
        <TagsContainer>
          {tags.map((tag) => (
            <Tag key={tag}>
              <Badge
                onRemove={() => onRemoveTag(tag)}
                removable
                variant="purple"
              >
                {tag}
              </Badge>
            </Tag>
          ))}
        </TagsContainer>
      </div>
    </div>
  );
};

export default QueryTagManager;
