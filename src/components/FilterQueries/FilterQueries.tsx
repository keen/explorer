import React, { FC, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Filters } from '@keen.io/ui-core';
import { Container } from './FilterQueries.styles';

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
  const onlyCachedQueries = t('browser_filters.show_only_cached_queries');
  const specialTagsPool = [onlyCachedQueries];

  const labels = {
    searchLabel: t('browser_filters.search_label'),
    searchInputPlaceholder: t('browser_filters.search_tags_input_placeholder'),
    clearFilters: t('browser_filters.clear'),
    noFiltersFound: t('browser_filters.empty_search_message'),
  };

  const onUpdateTags = (filters: string[]) => {
    const selectedTags = filters.filter(
      (filter) => !specialTagsPool.includes(filter)
    );
    onUpdateTagsFilters(selectedTags);
    if (filters.includes(onlyCachedQueries)) {
      return onUpdateCacheFilter(true);
    }
    onUpdateCacheFilter(false);
  };

  const activeFilters = useMemo(() => {
    return [
      ...tagsFilters,
      ...(showOnlyCachedQueries ? [onlyCachedQueries] : []),
    ];
  }, [showOnlyCachedQueries, tagsFilters]);

  return (
    <Container ref={containerRef} data-testid="filter-queries">
      <Filters
        filters={tagsPool}
        activeFilters={activeFilters}
        specialFilters={specialTagsPool}
        onUpdateFilters={(filters) => onUpdateTags(filters)}
        onClearFilters={onClearFilters}
        isOpen={isOpen}
        setOpen={(isOpen) => setOpen(isOpen)}
        labels={labels}
      >
        <Button
          variant="blank"
          isActive={isOpen}
          onClick={() => setOpen(!isOpen)}
        >
          {t('browser_filters.title')}
          {activeFilters && activeFilters.length
            ? ` (${activeFilters.length})`
            : null}
        </Button>
      </Filters>
    </Container>
  );
};

export default FilterQueries;
