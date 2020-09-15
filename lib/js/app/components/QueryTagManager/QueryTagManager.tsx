import React, { FC, useState, useRef, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Input, Label, Badge, Dropdown, DropdownList } from '@keen.io/ui-core';
import { useSearch } from '@keen.io/react-hooks';

import {
  DropdownContainer,
  DropdownListContainer,
  TagsContainer,
  Tag,
} from './QueryTagManager.styles';
import text from './text.json';

import { getTagsPool } from '../../modules/project';

import { KEYBOARD_KEYS } from '../../constants';

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
  const [selectionIndex, setIndex] = useState<number>(null);

  const [dropdownVisible, setDropdownVisibility] = useState(false);
  const [tagsHints, setTagsHint] = useState(null);

  const indexRef = useRef(selectionIndex);
  const tagsRef = useRef(tagsHints);

  indexRef.current = selectionIndex;
  tagsRef.current = tagsHints;

  const { searchHandler } = useSearch(
    tagsPool,
    (searchResults, phrase) => {
      setTagsHint(
        searchResults.length
          ? searchResults.map((tag: string) => ({
              label: tag,
              value: tag,
            }))
          : [
              {
                label: `${phrase} ${text.newTag}`,
                value: phrase,
              },
            ]
      );
      setIndex(0);
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

  const keyboardHandler = useCallback(
    (e: KeyboardEvent) => {
      switch (e.keyCode) {
        case KEYBOARD_KEYS.ENTER:
          const { value } = tagsHints[indexRef.current];
          if (!tags.includes(value)) {
            onAddTag(value);
          }

          inputRef.current.value = '';
          setDropdownVisibility(false);
          break;
        case KEYBOARD_KEYS.UP:
          if (indexRef.current > 0) {
            setIndex(indexRef.current - 1);
          }
          break;
        case KEYBOARD_KEYS.DOWN:
          if (indexRef.current < tagsHints.length - 1) {
            setIndex(indexRef.current + 1);
          }
          break;
      }
    },
    [tagsHints, tags]
  );

  useEffect(() => {
    document.addEventListener('click', outsideClick);
    return () => document.removeEventListener('click', outsideClick);
  }, [containerRef]);

  useEffect(() => {
    document.addEventListener('keydown', keyboardHandler);

    return () => {
      document.removeEventListener('keydown', keyboardHandler);
    };
  }, [dropdownVisible, tags, tagsHints]);

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
            autoComplete="off"
            placeholder={text.inputPlaceholder}
            onChange={searchHandler}
          />
          <Dropdown isOpen={dropdownVisible}>
            <DropdownListContainer>
              <DropdownList
                setActiveItem={(_item, idx) => selectionIndex === idx}
                items={tagsHints}
                onClick={(_e, { value }) => {
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
