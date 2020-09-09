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
  Card,
  Socket,
  ScrollOverflow,
  ScrollableContainer,
} from './Browser.styles';

import BrowserNavigation from '../BrowserNavigation';
import BrowserQueryMenu from '../BrowserQueryMenu';
import QueriesList from '../QueriesList';
import Heading from '../Heading';

import QueryVisualization from '../QueryVisualization';
import QuerySummary from '../QuerySummary';
import VisualizationPlaceholder from '../VisualizationPlaceholder';

import {
  getSavedQueries,
  getQueryPerformState,
  deleteQuery,
} from '../../modules/queries';
import { getBrowserScreenDimension } from '../../modules/app';
import { getSavedQuery } from '../../modules/savedQuery';

import { LIST_SCROLL_OFFSET } from './constants';

type Props = {
  query: Record<string, any>;
  /** Edit query event handler */
  onEditQuery: (queryName: string) => void;
  /** Select query event handler */
  onSelectQuery: (queryName: string, settings: Record<string, any>) => void;
  /** Run selected query event handler */
  onRunQuery: () => void;
  queryResults?: Record<string, any>;
};

const Browser: FC<Props> = ({
  query,
  queryResults,
  onEditQuery,
  onRunQuery,
  onSelectQuery,
}) => {
  const dispatch = useDispatch();
  const browserDimension = useSelector(getBrowserScreenDimension);
  const isQueryLoading = useSelector(getQueryPerformState);
  const savedQuery = useSelector(getSavedQuery);
  const savedQueries = useSelector(getSavedQueries);

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
    const scroll = calculateMaxScroll();
    if (listContainer.current) {
      const { offsetHeight, scrollHeight, scrollTop } = listContainer.current;
      const hasOverflow = offsetHeight < scrollHeight && scrollTop < scroll;
      setScrollOverflow(hasOverflow);
    }
  }, [savedQueries, browserDimension]);

  return (
    <>
      <BrowserNavigation />
      <Container flexDirection={{ xs: 'column', md: 'row' }}>
        <Socket
          width={{ xs: '100%', md: '50%' }}
          marginRight={{ xs: 0, md: '-1px' }}
        >
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
        </Socket>
        <Socket
          marginLeft={{ xs: 0, md: 15 }}
          width={{ xs: '100%', md: '50%' }}
        >
          <Heading>Preview</Heading>
          <Card>
            {queryResults && (
              <QueryVisualization query={query} queryResults={queryResults} />
            )}
            {!queryResults && currentQuery && (
              <VisualizationPlaceholder
                isLoading={isQueryLoading}
                onRunQuery={onRunQuery}
              />
            )}
            {currentQuery && (
              <>
                <div>
                  <BrowserQueryMenu
                    onRemoveQuery={() =>
                      dispatch(deleteQuery(currentQuery.name))
                    }
                    onEditQuery={() => onEditQuery(currentQuery.name)}
                  />
                  <h4>{currentQuery.displayName}</h4>
                </div>
                <QuerySummary querySettings={currentQuery} />
              </>
            )}
          </Card>
        </Socket>
      </Container>
    </>
  );
};

export default Browser;
