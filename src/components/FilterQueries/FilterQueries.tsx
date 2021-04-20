import React, {
  FC,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { transparentize } from 'polished';
import { Button, Dropdown } from '@keen.io/ui-core';
import { BodyText } from '@keen.io/typography';
import { colors } from '@keen.io/colors';

import { FilterItem, SearchTags } from './components';
import {
  Container,
  TagsContainer,
  DropdownContent,
  EmptySearch,
  ClearFilters,
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
  const [searchMode, setSearchMode] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');

  const tagsPool = useSelector(getTagsPool);

  const filteredTags = useMemo(() => {
    if (searchPhrase) {
      const phrase = searchPhrase.toLowerCase();
      return tagsPool.filter((tag) => tag.toLowerCase().includes(phrase));
    }
    return tagsPool;
  }, [searchPhrase, tagsPool]);

  const outsideClick = useCallback(
    (e) => {
      if (
        isOpen &&
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        setOpen(false);
        setSearchPhrase('');
        setSearchMode(false);
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

  const isEmptySearch = searchPhrase && !filteredTags.length;
  const filtersCount = tagsFilters.length + (showOnlyCachedQueries ? 1 : 0);

  return (
    <Container ref={containerRef}>
      <Button
        variant="blank"
        isActive={isOpen}
        onClick={() => setOpen(!isOpen)}
      >
        {t('browser_filters.title')}
        {filtersCount ? ` (${filtersCount})` : null}
      </Button>
      <Dropdown isOpen={isOpen} fullWidth={false}>
        <DropdownContent>
          <FilterItem
            id="cached"
            label={t('browser_filters.show_only_cached_queries')}
            isActive={showOnlyCachedQueries}
            onChange={(isActive) => onUpdateCacheFilter(isActive)}
          />
          <SearchTags
            isActive={searchMode}
            searchPhrase={searchPhrase}
            inputPlaceholder={t(
              'browser_filters.search_tags_input_placeholder'
            )}
            searchLabel={t('browser_filters.search_label')}
            onChangePhrase={(phrase) => setSearchPhrase(phrase)}
            onClearPhrase={() => {
              setSearchPhrase('');
              setSearchMode(false);
            }}
            onActiveSearch={() => setSearchMode(true)}
          />
          <TagsContainer>
            {filteredTags.map((tag) => (
              <FilterItem
                key={tag}
                id={tag}
                isActive={tagsFilters.includes(tag)}
                label={tag}
                onChange={(isActive) => updateTags(isActive, tag)}
              />
            ))}
          </TagsContainer>
          {isEmptySearch && (
            <EmptySearch>
              <BodyText
                variant="body3"
                color={transparentize(0.2, colors.black[100])}
                fontWeight={400}
              >
                {t('browser_filters.empty_search_message')}
              </BodyText>
            </EmptySearch>
          )}
        </DropdownContent>
        <ClearFilters onClick={onClearFilters}>
          <BodyText variant="body2" color={colors.blue[200]} fontWeight="bold">
            {t('browser_filters.clear')}
          </BodyText>
        </ClearFilters>
      </Dropdown>
    </Container>
  );
};

export default FilterQueries;
