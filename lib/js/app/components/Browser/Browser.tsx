import React, {
  FC,
  useMemo,
  useEffect,
  useCallback,
  useState,
  useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Container,
  Socket,
  ScrollOverflow,
  ScrollableContainer,
  PreviewPlaceholder,
} from './Browser.styles';

import SearchQueries from '../SearchQueries';
import BrowserNavigation from '../BrowserNavigation';
import BrowserPreview from '../BrowserPreview';
import CreateFirstQuery from '../CreateFirstQuery';
import QueriesList, { QueriesSortSettings } from '../QueriesList';
import QueriesPlaceholder from '../QueriesPlaceholder';

import { getSavedQueries, getSavedQueriesLoaded } from '../../modules/queries';
import { getBrowserScreenDimension, createNewQuery } from '../../modules/app';
import { getSavedQuery } from '../../modules/savedQuery';

import {
  LIST_SCROLL_OFFSET,
  DEFAULT_PROPERTY,
  DEFAULT_DIRECTION,
  SOCKET_CONTAINER_WIDTH,
} from './constants';

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
  const [searchPhrase, setSearchPhrase] = useState(null);
  const [sortSettings, setSortSettings] = useState<QueriesSortSettings>({
    property: DEFAULT_PROPERTY,
    direction: DEFAULT_DIRECTION,
  });

  const browserDimension = useSelector(getBrowserScreenDimension);
  const savedQuery = useSelector(getSavedQuery);

  const savedQueries = useSelector(getSavedQueries);
  const filteredQueries = useMemo(() => {
    let queries = savedQueries;
    if (searchPhrase) {
      queries = savedQueries.filter(({ displayName }) =>
        displayName.toLowerCase().includes(searchPhrase)
      );
    }

    const { property, direction } = sortSettings;
    if (property && direction) {
      queries = queries.sort((firstQuery, secondQuery) => {
        const firstProperty = firstQuery[property];
        const secondProperty = secondQuery[property];

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
  }, [searchPhrase, savedQueries, sortSettings]);

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
          <SearchQueries onSearch={(phrase) => setSearchPhrase(phrase)} />
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
                  onSortQueries={(settings) => setSortSettings(settings)}
                />
                {isEmptySearch && <QueriesPlaceholder isEmptySearch />}
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
          onClick={() => dispatch(createNewQuery())}
        />
      </Container>
    </>
  );
};

export default Browser;
