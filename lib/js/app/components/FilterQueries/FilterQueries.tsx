import React, { FC, useState, useEffect, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Dropdown } from '@keen.io/ui-core';

import { FilterItem } from './components';
import {
  Container,
  TagsContainer,
  DropdownContent,
} from './FilterQueries.styles';

import { getTagsPool } from '../../modules/project';

type Props = {
  /** Active tags filters */
  tagsFilters: string[];
  /** Cache queries filters indicator */
  showOnlyCachedQueries: boolean;
  /** Update cache filter event handler */
  onUpdateCacheFilter: (isActive: boolean) => void;
  /** Update tags filters event handler */
  onUpdateTagsFilters: (tags: string[]) => void;
  /** Clear filters event handler */
  onClearFilters: () => void;
};

const FilterQueries: FC<Props> = ({
  tagsFilters,
  showOnlyCachedQueries,
  onUpdateCacheFilter,
  onUpdateTagsFilters,
  onClearFilters,
}) => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const tagsPool = useSelector(getTagsPool);

  const outsideClick = useCallback(
    (e) => {
      if (
        isOpen &&
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    },
    [isOpen, containerRef]
  );

  const updateTags = useCallback(
    (isActive: boolean, tag: string) => {
      const updatedTags = isActive
        ? [...tagsFilters, tag]
        : tagsFilters.filter((t) => t !== tag);
      onUpdateTagsFilters(updatedTags);
    },
    [tagsFilters, onUpdateTagsFilters]
  );

  useEffect(() => {
    document.addEventListener('click', outsideClick);
    return () => document.removeEventListener('click', outsideClick);
  }, [isOpen, containerRef]);

  return (
    <Container ref={containerRef}>
      <Button variant="blank" onClick={() => setOpen(!isOpen)}>
        {t('browser_filters.title')} (
        {tagsFilters.length + (showOnlyCachedQueries ? 1 : 0)})
      </Button>
      <Dropdown isOpen={isOpen} fullWidth={false}>
        <DropdownContent>
          <FilterItem
            id="cached"
            label={t('browser_filters.show_only_cached_queries')}
            isActive={showOnlyCachedQueries}
            onChange={(isActive) => onUpdateCacheFilter(isActive)}
          />
          <TagsContainer>
            {tagsPool.map((tag) => (
              <FilterItem
                key={tag}
                id={tag}
                isActive={tagsFilters.includes(tag)}
                label={tag}
                onChange={(isActive) => updateTags(isActive, tag)}
              />
            ))}
          </TagsContainer>
          <div onClick={onClearFilters}>{t('browser_filters.clear')}</div>
        </DropdownContent>
      </Dropdown>
    </Container>
  );
};

export default FilterQueries;
