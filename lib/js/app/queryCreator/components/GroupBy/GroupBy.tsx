import React, { FC, useEffect, useRef, useReducer } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { useSelector, useDispatch } from 'react-redux';
import shallowEqual from 'shallowequal';

import {
  Section,
  Options,
  GroupSettings,
  GroupsContainer,
} from './GroupBy.styles';

import Title from '../Title';
import Property from '../Property';
import AddGroupBy from '../AddGroupBy';
import InputGroup from '../InputGroup';

import {
  addGroup,
  setGroups,
  removeGroup,
  resetGroups,
  selectGroupProperty,
} from './actions';
import { groupByReducer } from './reducer';

import { convertGroups, serializeGroups } from './utils';

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

  return (
    <div>
      <Title isDisabled={!eventCollection}>Group by</Title>
      <Section>
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
              <InputGroup
                isDragged={chosen}
                onRemove={() => groupDispatcher(removeGroup(id))}
                onChange={(property) =>
                  groupDispatcher(selectGroupProperty(id, property))
                }
                property={property}
                propertiesSchema={schemaList}
                propertiesTree={schemaTree}
              />
            </GroupSettings>
          ))}
        </ReactSortable>
        <Options>
          <AddGroupBy
            properties={schemaList}
            propertiesTree={schemaTree}
            onAddGroup={(property) => groupDispatcher(addGroup(property))}
          />
        </Options>
      </Section>
    </div>
  );
};

export default GroupBy;
