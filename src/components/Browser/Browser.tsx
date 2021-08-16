import React, {
  FC,
  useMemo,
  useEffect,
  useCallback,
  useState,
  useRef,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import SearchQueries from '../SearchQueries';
import FilterQueries from '../FilterQueries';
import BrowserNavigation from '../BrowserNavigation';
import BrowserPreview from '../BrowserPreview';
import CreateFirstQuery from '../CreateFirstQuery';
import QueriesList from '../QueriesList';
import QueriesPlaceholder from '../QueriesPlaceholder';

import { getSavedQueries, getSavedQueriesLoaded } from '../../modules/queries';
import {
  appActions,
  getBrowserScreenDimension,
  getQueriesFilters,
  getQueriesSortSettings,
} from '../../modules/app';
import { savedQuerySelectors } from '../../modules/savedQuery';

import {
  Container,
  Socket,
  ScrollOverflow,
  ScrollableContainer,
  FiltersContainer,
  PreviewPlaceholder,
} from './Browser.styles';

import { LIST_SCROLL_OFFSET, SOCKET_CONTAINER_WIDTH } from './constants';

type Props = {
  /** Edit query event handler */
  onEditQuery: (queryName: string) => void;
  /** Select query event handler */
  onSelectQuery: (queryName: string, settings: Record<string, any>) => void;
  /** Run selected query event handler */
  onRunQuery: () => void;
};

const Browser: FC<Props> = ({ onEditQuery, onRunQuery, onSelectQuery }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [searchPhrase, setSearchPhrase] = useState(null);

  const browserDimension = useSelector(getBrowserScreenDimension);
  const savedQuery = useSelector(savedQuerySelectors.getSavedQuery);
  const savedQueries = useSelector(getSavedQueries);
  const queriesFilters = useSelector(getQueriesFilters);
  const sortSettings = useSelector(getQueriesSortSettings);

  const filteredQueries = useMemo(() => {
    let queries = savedQueries;
    if (searchPhrase) {
      queries = savedQueries.filter(({ displayName }) =>
        displayName.toLowerCase().includes(searchPhrase)
      );
    }

    if (queriesFilters.showOnlyCachedQueries) {
      queries = queries.filter(({ cached }) => cached);
    }

    if (queriesFilters.tags.length) {
      queries = queries.filter(({ tags }) =>
        tags.some((tag) => queriesFilters.tags.includes(tag))
      );
    }

    const { property, direction } = sortSettings;
    if (property && direction) {
      queries = [...queries].sort((firstQuery, secondQuery) => {
        const firstProperty = firstQuery[property].toLowerCase();
        const secondProperty = secondQuery[property].toLowerCase();

        if (firstProperty < secondProperty) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (firstProperty > secondProperty) {
          return direction === 'ascending' ? 1 : -1;
        }

        return 0;
      });
    }

    return queries;
  }, [searchPhrase, queriesFilters, sortSettings, savedQueries]);

  const isSavedQueriesLoaded = useSelector(getSavedQueriesLoaded);

  const [maxScroll, setMaxScroll] = useState(0);
  const [scrollOverflow, setScrollOverflow] = useState(false);
  const listContainer = useRef(null);

  const currentQuery = useMemo(() => {
    return savedQueries.find(({ name }) => {
      return name === savedQuery.name;
    });
  }, [savedQuery]);

  const calculateMaxScroll = useCallback(() => {
    const { scrollHeight, offsetHeight } = listContainer.current;
    const scroll = scrollHeight - offsetHeight;

    setMaxScroll(scroll);
    return scroll;
  }, [listContainer]);

  const scrollHandler = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const offset = e.currentTarget.scrollTop;
      const hasOverflow = offset < maxScroll;

      if (hasOverflow !== scrollOverflow) {
        setScrollOverflow(hasOverflow);
      }
    },
    [scrollOverflow, maxScroll]
  );

  useEffect(() => {
    if (listContainer.current) {
      const scroll = calculateMaxScroll();
      const { offsetHeight, scrollHeight, scrollTop } = listContainer.current;
      const hasOverflow = offsetHeight < scrollHeight && scrollTop < scroll;
      setScrollOverflow(hasOverflow);
    }
  }, [listContainer, searchPhrase, savedQueries, browserDimension]);

  const isEmptyProject = isSavedQueriesLoaded && savedQueries.length === 0;
  const isEmptySearch = isSavedQueriesLoaded && filteredQueries.length === 0;

  return (
    <>
      <BrowserNavigation attractNewQueryButton={isEmptyProject}>
        {isSavedQueriesLoaded && !isEmptyProject && (
          <>
            <SearchQueries
              onSearch={(phrase) => setSearchPhrase(phrase)}
              placeholder={t('browser_search.search_query_input_placeholder')}
            />
            <FiltersContainer>
              <FilterQueries
                tagsFilters={queriesFilters.tags}
                showOnlyCachedQueries={queriesFilters.showOnlyCachedQueries}
                onClearFilters={() =>
                  dispatch(
                    appActions.setQueriesFilters({
                      filters: {
                        showOnlyCachedQueries: false,
                        tags: [],
                      },
                    })
                  )
                }
                onUpdateTagsFilters={(tags) =>
                  dispatch(appActions.setQueriesFilters({ filters: { tags } }))
                }
                onUpdateCacheFilter={(isActive) =>
                  dispatch(
                    appActions.setQueriesFilters({
                      filters: { showOnlyCachedQueries: isActive },
                    })
                  )
                }
              />
            </FiltersContainer>
          </>
        )}
      </BrowserNavigation>
      <Container flexDirection={{ xs: 'column', md: 'row' }}>
        <Socket
          marginRight={{ xs: 0, md: '-1px' }}
          width={SOCKET_CONTAINER_WIDTH}
        >
          {!isSavedQueriesLoaded || isEmptyProject ? (
            <QueriesPlaceholder />
          ) : (
            <>
              <ScrollableContainer ref={listContainer} onScroll={scrollHandler}>
                <QueriesList
                  maxHeight={browserDimension.height - LIST_SCROLL_OFFSET}
                  savedQueries={filteredQueries}
                  sortSettings={sortSettings}
                  activeQuery={savedQuery.name}
                  onSelectQuery={onSelectQuery}
                  onSortQueries={(settings) =>
                    dispatch(
                      appActions.setQueriesSortSettings({
                        sortSettings: settings,
                      })
                    )
                  }
                />
                {isEmptySearch && (
                  <QueriesPlaceholder
                    emptySearchMessage={t(
                      'browser_search.empty_search_message'
                    )}
                  />
                )}
              </ScrollableContainer>
              {scrollOverflow && <ScrollOverflow />}
            </>
          )}
        </Socket>
        <Socket
          marginLeft={{ xs: 0, md: 15 }}
          marginRight={{ xs: 0, md: 15 }}
          width={SOCKET_CONTAINER_WIDTH}
        >
          {!isSavedQueriesLoaded || isEmptyProject ? (
            <PreviewPlaceholder />
          ) : (
            <BrowserPreview
              currentQuery={currentQuery}
              onEditQuery={onEditQuery}
              onRunQuery={onRunQuery}
            />
          )}
        </Socket>
        <CreateFirstQuery
          isVisible={isEmptyProject}
          onClick={() => dispatch(appActions.createNewQuery())}
        />
      </Container>
    </>
  );
};

export default Browser;
