import React, { FC, useState, useRef, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Input, Label, Badge, Dropdown, DropdownList } from '@keen.io/ui-core';
import { useSearch } from '@keen.io/react-hooks';

import {
  DropdownContainer,
  DropdownListContainer,
  TagsContainer,
  Tag,
} from './QueryTagManager.styles';

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
  const { t } = useTranslation();
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
                label: `${phrase} ${t('query_tag_manager.new_tag')}`,
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
      if (!tagsRef.current?.length) return;
      switch (e.keyCode) {
        case KEYBOARD_KEYS.ENTER:
          const { value } = tagsRef.current[indexRef.current];
          if (value && !tags.includes(value)) {
            onAddTag(value);
          }

          inputRef.current.value = '';
          setDropdownVisibility(false);
          setTagsHint(null);
          break;
        case KEYBOARD_KEYS.UP:
          if (indexRef.current > 0) {
            setIndex(indexRef.current - 1);
          }
          break;
        case KEYBOARD_KEYS.DOWN:
          if (indexRef.current < tagsRef.current.length - 1) {
            setIndex(indexRef.current + 1);
          }
          break;
      }
    },
    [tags]
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
  }, [dropdownVisible, tags]);

  return (
    <div>
      <Label htmlFor="queryLabels" variant="secondary">
        {t('query_tag_manager.tags')}
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
            placeholder={t('query_tag_manager.input_placeholder')}
            onChange={searchHandler}
          />
          <Dropdown isOpen={dropdownVisible}>
            <DropdownListContainer>
              <DropdownList
                setActiveItem={(_item, idx) => selectionIndex === idx}
                items={tagsHints}
                onClick={(_e, { value }) => {
                  if (value && !tags.includes(value)) {
                    onAddTag(value);
                  }
                  inputRef.current.value = '';
                  setDropdownVisibility(false);
                  setTagsHint(null);
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
