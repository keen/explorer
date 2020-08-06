/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useRef, useReducer, useState } from 'react';
import Sortable from 'sortablejs';
import { useSelector, useDispatch } from 'react-redux';
import shallowEqual from 'shallowequal';

import { ActionButton } from '@keen.io/ui-core';

import {
  Section,
  GroupSettings,
} from './GroupBy.styles';

import Title from '../Title';
import { InputGroup, Group, Input } from '../InputGroup';

import {
  addGroup,
  setGroups,
  removeGroup,
  resetGroups,
  selectGroupProperty,
} from './actions';
import { groupByReducer } from './reducer';

import { convertGroups, serializeGroups, mutateArray } from './utils';

import {
  getEventCollection,
  getGroupBy,
  setGroupBy,
} from '../../modules/query';
import { getCollectionSchema } from '../../modules/events';

import { DRAG_DELAY, DRAG_ANIMATION_TIME } from './constants';

import { AppState } from '../../types';

type Props = {
  /** Collection name */
  collection: string;
};

const GroupBy: FC<Props> = ({ collection }) => {
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
    const sortable = new Sortable( sortableRef.current, {
      animation: DRAG_ANIMATION_TIME,
      delay: DRAG_DELAY,
      filter: '.js-button',
      onStart: () => setDragMode(true),
      onMove: evt => !evt.related.className.includes('add-button'),
      onEnd: evt => {
        const updatedGroups = mutateArray(stateRef.current, evt.oldIndex, evt.newIndex);
        groupDispatcher(setGroups(updatedGroups));
        setDragMode(false);
        dragGhost.parentNode.removeChild(dragGhost);
      },
      setData: (dataTransfer, dragEl) => {
        dragGhost = dragEl.cloneNode(true);
        const tree = dragGhost.querySelector('[data-testid="properties-tree"]');
        if (tree) tree.remove();
        document.body.appendChild(dragGhost);
        dataTransfer.setDragImage(dragGhost, 0, 0);
      },
    });

  }, [state])

  return (
    <div>
      <Title isDisabled={!eventCollection}>Group by</Title>
      <Section>
        <div ref={sortableRef} style={{ display: 'flex', flexWrap: 'wrap'}}>
        {state.map(({ property, id }) => (
            <GroupSettings key={id}>
              <InputGroup>
                <Group>
                  <Input
                    isEditDisabled={isDragged}
                    property={property}
                    properties={schemaTree}
                    propertiesSchema={schemaList}
                    propertiesTree={schemaTree}
                  />
                </GroupWrapper>
                <GroupWrapper>
                  <StyledActionButton action="remove" onClick={() => groupDispatcher(removeGroup(id))} />
                </GroupWrapper>
              </InputGroupWrapper>
            </GroupSettings>
          ))}
          <button className="js-button" onClick={() => groupDispatcher(addGroup(''))}>Add</button>
          {/* <ActionButton className="js-button" action="create" onClick={() => groupDispatcher(addGroup(''))} /> */}
        </div>

        <ReactSortable
          animation={DRAG_ANIMATION_TIME}
          delay={DRAG_DELAY}
          list={state}
          tag={GroupsContainer}
          setList={(updatedGroups) => groupDispatcher(setGroups(updatedGroups))}
        >
          {state.map(({ property, id, chosen }) => (
            <GroupSettings key={id}>
              {/* <Property
                isDragged={chosen}
                onRemove={() => groupDispatcher(removeGroup(id))}
                onChange={(property) =>
                  groupDispatcher(selectGroupProperty(id, property))
                }
                property={property}
                propertiesSchema={schemaList}
                propertiesTree={schemaTree}
              /> */}
              <InputGroupWrapper isActive={chosen} isDragged={chosen}>
                <GroupWrapper>
                  <SearchInput
                    isDragged={chosen}
                    onChange={(property) =>
                      groupDispatcher(selectGroupProperty(id, property))
                    }
                  />
                </Group>
                <Group>
                  <ActionButton action="remove" onClick={() => groupDispatcher(removeGroup(id))} background="transparent" borderRadius="0 4px 4px 0" />
                </Group>
              </InputGroup>
            </GroupSettings>
          ))}
          <ActionButton className="add-button" isDisabled={!eventCollection} action="create" onClick={() => groupDispatcher(addGroup(''))} />
        </div>
      </Section>
    </div>
  );
};

export default GroupBy;
