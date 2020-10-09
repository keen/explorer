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

import BrowserNavigation from '../BrowserNavigation';
import BrowserPreview from '../BrowserPreview';
import CreateFirstQuery from '../CreateFirstQuery';
import QueriesList from '../QueriesList';
import QueriesPlaceholder from '../QueriesPlaceholder';

import { getSavedQueries, getSavedQueriesLoaded } from '../../modules/queries';
import { getBrowserScreenDimension, createNewQuery } from '../../modules/app';
import { getSavedQuery } from '../../modules/savedQuery';

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

  const browserDimension = useSelector(getBrowserScreenDimension);
  const savedQuery = useSelector(getSavedQuery);
  const savedQueries = useSelector(getSavedQueries);
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
  }, [listContainer, savedQueries, browserDimension]);

  const isEmptyProject = isSavedQueriesLoaded && savedQueries.length === 0;

  return (
    <>
      <BrowserNavigation attractNewQueryButton={isEmptyProject} />
      <Container flexDirection={{ xs: 'column', md: 'row' }}>
        <Socket
          width={SOCKET_CONTAINER_WIDTH}
          marginRight={{ xs: 0, md: '-1px' }}
        >
          {!isSavedQueriesLoaded || isEmptyProject ? (
            <QueriesPlaceholder />
          ) : (
            <>
              <ScrollableContainer
                ref={listContainer}
                onScroll={scrollHandler}
                maxHeight={browserDimension.height - LIST_SCROLL_OFFSET}
              >
                <QueriesList
                  savedQueries={savedQueries}
                  activeQuery={savedQuery.name}
                  onSelectQuery={onSelectQuery}
                />
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
