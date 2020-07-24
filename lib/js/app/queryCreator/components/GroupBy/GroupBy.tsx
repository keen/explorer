import React, { FC, useEffect, useRef, useMemo, useReducer } from 'react';
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

import {
  addGroup,
  setGroups,
  removeGroup,
  resetGroups,
  selectGroupProperty,
} from './actions';
import { groupByReducer } from './reducer';

import { convertGroups, serializeGroups } from './utils';
import { createTree } from '../../utils/createTree';
import { createCollection } from '../../utils/createCollection';

import {
  getEventCollection,
  getGroupBy,
  setGroupBy,
} from '../../modules/query';
import { getCollectionSchema } from '../../modules/events';

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
  const collectionSchema = useSelector((state: AppState) =>
    getCollectionSchema(state, collection)
  );

  const { propertiesCollection, propertiesTree } = useMemo(() => {
    if (collectionSchema) {
      return {
        propertiesCollection: createCollection(collectionSchema),
        propertiesTree: createTree(collectionSchema),
      };
    }

    return {
      propertiesTree: {},
      propertiesCollection: [],
    };
  }, [collectionSchema]);

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
          animation={100}
          delay={250}
          list={state}
          tag={GroupsContainer}
          setList={(updatedGroups) => groupDispatcher(setGroups(updatedGroups))}
        >
          {state.map(({ property, id, chosen }) => (
            <GroupSettings key={id}>
              <Property
                isDragged={chosen}
                onRemove={() => groupDispatcher(removeGroup(id))}
                onChange={(property) =>
                  groupDispatcher(selectGroupProperty(id, property))
                }
                property={property}
                propertiesSchema={propertiesCollection}
                propertiesTree={propertiesTree}
              />
            </GroupSettings>
          ))}
        </ReactSortable>
        <Options>
          <AddGroupBy
            properties={propertiesCollection}
            propertiesTree={propertiesTree}
            onAddGroup={(property) => groupDispatcher(addGroup(property))}
          />
        </Options>
      </Section>
    </div>
  );
};

export default GroupBy;
