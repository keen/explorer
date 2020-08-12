import React, { FC, useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Button } from '@keen.io/ui-core';

import { EditorActions, CreatorContainer } from './Editor.styles';

import EditorNavigation from '../EditorNavigation';

import Creator from '../Creator';

import RunQuery, { runQueryLabel } from '../RunQuery';
import QueryVisualization from '../QueryVisualization';
import VisualizationPlaceholder from '../VisualizationPlaceholder';
import QueryLimitReached from '../QueryLimitReached';

import {
  getQueryResults,
  getQueryPerformState,
  getError,
  getQueryLimitReached
} from '../../modules/queries';
import { setViewMode } from '../../modules/app';

type Props = {
  /** Query definition */
  query: Record<string, any>;
  /** Query update handler */
  onUpdateQuery: (query: Record<string, any>) => void;
  /** Run query event handler */
  onRunQuery: () => void;
};

const isElementInViewport = (elementRef) => {
  if (!elementRef.current) return;

  const { top } = elementRef.current.getBoundingClientRect();
  return top >= 0 && top < window.innerHeight;
};

const Editor: FC<Props> = ({ query, onRunQuery, onUpdateQuery }) => {
  const dispatch = useDispatch();
  const queryResults = useSelector(getQueryResults);
  const runQueryError = useSelector(getError);
  const isQueryLoading = useSelector(getQueryPerformState);
  const isQueryLimitReached = useSelector(getQueryLimitReached);

  const editorRef = useRef<HTMLDivElement>(null);

  const [scrollToRef, setScrollToRef] = useState(false);

  useEffect(() => {
    if (scrollToRef && editorRef.current && !isElementInViewport(editorRef.current)) {
      setScrollToRef(false);
      editorRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [scrollToRef, queryResults]);

  return (
    <div ref={editorRef}>
      <EditorNavigation query={query} />
      <Button
        onClick={() => {
          dispatch(setViewMode('browser'));
        }}
      >
        Back to list
      </Button>
      <section>{ isQueryLimitReached ? <QueryLimitReached /> : queryResults ? (
          <QueryVisualization query={query} queryResults={queryResults} />
        ) : (
          <VisualizationPlaceholder isLoading={isQueryLoading} />
        )}
        {runQueryError && <Alert type="error">{runQueryError.body}</Alert>}
      </section>
      <CreatorContainer>
        <Creator onUpdateQuery={onUpdateQuery} />
      </CreatorContainer>
      <section>
        <EditorActions>
          <RunQuery isLoading={isQueryLoading} onClick={() => {
            onRunQuery();
            setScrollToRef(true);
          }
          }>
            {runQueryLabel(query)}
          </RunQuery>
        </EditorActions>
      </section>
    </div>
  );
};

export default Editor;
