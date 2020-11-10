/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  FC,
  useEffect,
  useRef,
  useCallback,
  useReducer,
  useState,
} from 'react';
import Sortable from 'sortablejs';
import { useSelector, useDispatch } from 'react-redux';
import shallowEqual from 'shallowequal';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';

import { ActionButton, Tooltip } from '@keen.io/ui-core';
import { useSearch } from '@keen.io/react-hooks';

import TooltipContent from '../TooltipContent';
import {
  Section,
  GroupSettings,
  SortableContainer,
  TooltipMotion,
} from './GroupBy.styles';

import SearchableProperty from '../SearchableProperty';
import Title from '../Title';

import {
  addGroup,
  setGroups,
  removeGroup,
  resetGroups,
  selectGroupProperty,
} from './actions';
import { groupByReducer } from './reducer';

import { SearchContext } from '../../contexts';

import { mutateArray, createTree } from '../../utils';
import { convertGroups, serializeGroups } from './utils';

import {
  getEventCollection,
  getGroupBy,
  setGroupBy,
} from '../../modules/query';
import { getCollectionSchema } from '../../modules/events';

import { TOOLTIP_MOTION } from '../../constants';
import { DRAG_DELAY, DRAG_ANIMATION_TIME } from './constants';

import { AppState } from '../../types';

type Props = {
  /** Collection name */
  collection: string;
};

const GroupBy: FC<Props> = ({ collection }) => {
  const { t } = useTranslation();
  const [propertiesTree, setPropertiesTree] = useState(null);
  const [searchPropertiesPhrase, setSearchPhrase] = useState(null);
  const [expandTree, setTreeExpand] = useState(false);
  const [hint, showHint] = useState(false);

  const dispatch = useDispatch();
  const groups: string[] = useSelector((state: AppState) => {
    const groupBy = getGroupBy(state);
    if (groupBy) {
      if (Array.isArray(groupBy)) return groupBy;
      if (typeof groupBy === 'string') return [groupBy];
    }
    return [];
  }, shallowEqual);
  const groupsRef = useRef(groups);

  const eventCollection = useSelector(getEventCollection);
  const {
    tree: schemaTree,
    list: schemaList,
  } = useSelector((state: AppState) => getCollectionSchema(state, collection));

  const [state, groupDispatcher] = useReducer(
    groupByReducer,
    convertGroups(groups)
  );
  const stateRef = useRef(state);

  const { searchHandler } = useSearch<{
    path: string;
    type: string;
  }>(
    schemaList,
    (searchResult, phrase) => {
      if (phrase) {
        const searchTree = {};
        searchResult.forEach(({ path, type }) => {
          searchTree[path] = type;
        });
        setSearchPhrase(phrase);
        setPropertiesTree(createTree(searchTree));
        setTreeExpand(true);
      } else {
        setTreeExpand(false);
        setPropertiesTree(null);
      }
    },
    {
      keys: ['path', 'type'],
      threshold: 0.4,
    }
  );

  const clearSearchHandler = useCallback(() => {
    setPropertiesTree(null);
    setSearchPhrase(null);
  }, []);

  useEffect(() => {
    return () => dispatch(setGroupBy(undefined));
  }, []);

  useEffect(() => {
    const localGroups = serializeGroups(state);
    if (
      !shallowEqual(groups, groupsRef.current) &&
      !shallowEqual(groups, localGroups)
    ) {
      if (groups) {
        groupDispatcher(setGroups(convertGroups(groups)));
      } else {
        groupDispatcher(resetGroups());
      }
    }
    groupsRef.current = groups;
  }, [groups]);

  useEffect(() => {
    if (!shallowEqual(state, stateRef.current)) {
      stateRef.current = state;
      const groups = serializeGroups(state);
      const updatedGroups = groups.length ? groups : undefined;
      dispatch(setGroupBy(updatedGroups));
    }
  }, [state]);

  const sortableRef = useRef(null);
  const [isDragged, setDragMode] = useState(false);

  useEffect(() => {
    let dragGhost;
    new Sortable(sortableRef.current, {
      animation: DRAG_ANIMATION_TIME,
      delay: DRAG_DELAY,
      filter: '.add-button',
      onStart: () => {
        setDragMode(true);
        setTreeExpand(false);
      },
      onMove: (evt) => !evt.related.className.includes('add-button'),
      onEnd: (evt) => {
        const updatedGroups = mutateArray(
          stateRef.current,
          evt.oldIndex,
          evt.newIndex
        );
        groupDispatcher(setGroups(updatedGroups));
        setDragMode(false);

        if (dragGhost) dragGhost.parentNode.removeChild(dragGhost);
      },
      setData: (dataTransfer, dragEl) => {
        dragGhost = dragEl.cloneNode(true);
        const styles = {
          width: dragEl.offsetWidth,
          transform: 'translateX(-100%)',
          position: 'absolute',
        };
        Object.assign(dragGhost.style, styles);

        const tree = dragGhost.querySelector('[data-testid="properties-tree"]');
        if (tree) tree.remove();

        document.body.appendChild(dragGhost);
        dataTransfer.setDragImage(dragGhost, 10, 10);
      },
    });
  }, []);

  return (
    <>
      <Title isDisabled={!eventCollection}>
        {t('query_creator_group_by.title')}
      </Title>
      <Section
        data-testid="group-by-wrapper"
        onMouseEnter={() => !eventCollection && showHint(true)}
        onMouseLeave={() => !eventCollection && showHint(false)}
      >
        <SearchContext.Provider value={{ expandTree, searchPropertiesPhrase }}>
          <SortableContainer ref={sortableRef}>
            {state.map(({ property, id }) => (
              <GroupSettings key={id} data-testid="groupBy-settings-item">
                <SearchableProperty
                  isEditAllowed={!isDragged}
                  properties={propertiesTree ? propertiesTree : schemaTree}
                  property={property}
                  onSearchProperties={searchHandler}
                  onSelectProperty={(property) => {
                    clearSearchHandler();
                    groupDispatcher(selectGroupProperty(id, property));
                  }}
                  onRemove={() => {
                    clearSearchHandler();
                    groupDispatcher(removeGroup(id));
                  }}
                  onBlur={() => {
                    if (!property) groupDispatcher(removeGroup(id));
                  }}
                />
              </GroupSettings>
            ))}
            <ActionButton
              className="add-button"
              isDisabled={!eventCollection}
              action="create"
              onClick={() => groupDispatcher(addGroup(''))}
            />
          </SortableContainer>
        </SearchContext.Provider>
        {!eventCollection && (
          <AnimatePresence>
            {hint && (
              <TooltipMotion {...TOOLTIP_MOTION} data-testid="group-by-hint">
                <Tooltip hasArrow={false} mode="dark">
                  <TooltipContent>
                    {t('query_creator_group_by.select')}{' '}
                    <strong>{t('query_creator_group_by.event_stream')}</strong>{' '}
                    {t('query_creator_group_by.tooltip')}
                  </TooltipContent>
                </Tooltip>
              </TooltipMotion>
            )}
          </AnimatePresence>
        )}
      </Section>
    </>
  );
};

export default GroupBy;
