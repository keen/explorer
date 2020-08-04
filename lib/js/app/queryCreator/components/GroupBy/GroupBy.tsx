import React, { FC, useEffect, useRef, useReducer } from 'react';
import { ReactSortable } from 'react-sortablejs';
import Sortable from 'sortablejs';
import { useSelector, useDispatch } from 'react-redux';
import shallowEqual from 'shallowequal';

import { Select, ActionButton } from '@keen.io/ui-core';

import {
  Section,
  Options,
  GroupSettings,
  GroupsContainer,
  StyledButton,
  StyledActionButton,
} from './GroupBy.styles';

import Title from '../Title';
import AddGroupBy from '../AddGroupBy';
import InputGroup, { Group } from '../InputGroup';
import { InputGroupWrapper, Group as GroupWrapper, RemoveButton, SearchInput} from '../InputGroupWrapper';
import { Select as GroupSelect } from '../InputGroupWrapper';

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

const options = [
  { label: 'DESC', value: 'desc' },
  { label: 'ASC', value: 'asc' }
]

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

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const sortable = new Sortable( sortableRef.current, {
      animation: DRAG_ANIMATION_TIME,
      delay: DRAG_DELAY,
      filter: '.js-button',
      onMove: evt => !evt.related.className.includes('js-button'),
      onEnd: evt => {
        const updatedGroups = mutateArray(stateRef.current, evt.oldIndex, evt.newIndex);
        groupDispatcher(setGroups(updatedGroups));
      },
      // onUpdate: (updatedGroups) => groupDispatcher(setGroups(updatedGroups)),
    });
    
  }, [state])

  return (
    <div>
      <Title isDisabled={!eventCollection}>Group by</Title>
      <Section>
        <div ref={sortableRef} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', margin: '50px'}}>
        {state.map(({ property, id, chosen }) => (
            <GroupSettings key={id}>
              <InputGroupWrapper isActive={chosen} isDragged={chosen}>
                <GroupWrapper>
                  <SearchInput
                    isDragged={chosen}
                    onChange={(property) =>
                      groupDispatcher(selectGroupProperty(id, property))
                    }
                    property={property}
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
                    property={property}
                    propertiesSchema={schemaList}
                    propertiesTree={schemaTree}
                  />
                </GroupWrapper>
                <GroupWrapper>
                  {/* <RemoveButton onClick={() => groupDispatcher(removeGroup(id))} /> */}
                  <StyledActionButton action="remove" onClick={() => groupDispatcher(removeGroup(id))} />
                </GroupWrapper>
              </InputGroupWrapper>
              {/* <InputGroup
                isDragged={chosen}
                onRemove={() => groupDispatcher(removeGroup(id))}
                onChange={(property) =>
                  groupDispatcher(selectGroupProperty(id, property))
                }
                property={property}
                propertiesSchema={schemaList}
                propertiesTree={schemaTree}
              >
                <Group>
                  <GroupSelect
                    inputId="order"
                    placeholder=""
                    onChange={({ value }: { value: string }) => {
                      console.log(value);
                    }}
                    value={null}
                    options={options}
                  />
                </Group>
                <Group>
                  <Select
                    inputId="order"
                    placeholder=""
                    onChange={({ value }: { label: string; value: string }) => {
                      console.log(value);
                    }}
                    value={null}
                    variant="solid"
                    options={options}
                  />
                </Group>
              </InputGroup> */}
            </GroupSettings>
          ))}
          {/* <button>add</button> */}
        </ReactSortable>

        {/* <Options>
          <AddGroupBy
            properties={schemaList}
            propertiesTree={schemaTree}
            onAddGroup={(property) => groupDispatcher(addGroup(property))}
          />
        </Options> */}
        {/* <StyledButton onClick={() => groupDispatcher(addGroup(''))} items={state.length}>+</StyledButton> */}
        <ActionButton action="create" onClick={() => groupDispatcher(addGroup(''))} />
      </Section>
    </div>
  );
};

export default GroupBy;
