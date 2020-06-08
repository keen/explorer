import React, { FC, useEffect, useRef, useMemo, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import shallowEqual from 'shallowequal';
import { Button, Label, Select } from '@keen.io/ui-core';

import {
  addGroup,
  setGroups,
  removeGroup,
  resetGroups,
  selectGroupProperty,
} from './actions';
import { groupByReducer } from './reducer';

import { getGroupBy, setGroupBy } from '../../modules/query';
import { getCollectionSchema } from '../../modules/events';

import text from './text.json';

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

  const collectionSchema = useSelector((state: AppState) =>
    getCollectionSchema(state, collection)
  );

  const options = useMemo(() => {
    if (collectionSchema) {
      return Object.keys(collectionSchema).map((propertyName) => ({
        label: propertyName,
        value: propertyName,
      }));
    }

    return [];
  }, [collectionSchema]);

  const [state, groupDispatcher] = useReducer(groupByReducer, groups);
  const stateRef = useRef(state);

  useEffect(() => {
    if (collection) groupDispatcher(resetGroups());
  }, [collection]);

  useEffect(() => {
    const localGroups = state.filter((v) => v !== null);
    if (
      !shallowEqual(groups, groupsRef.current) &&
      !shallowEqual(groups, localGroups)
    ) {
      groupDispatcher(setGroups(groups));
    }
    groupsRef.current = groups;
  }, [groups]);

  useEffect(() => {
    if (!shallowEqual(state, stateRef.current)) {
      stateRef.current = state;
      const groups = state.filter((v) => v !== null);
      const updatedGroups = groups.length ? groups : undefined;
      dispatch(setGroupBy(updatedGroups));
    }
  }, [state]);

  return (
    <>
      <Label>{text.groupBy}</Label>
      {state.map((property, idx) => (
        <div key={idx}>
          <Label>Group {idx + 1}</Label>
          <Button
            variant="danger"
            style="outline"
            onClick={() => groupDispatcher(removeGroup(idx))}
          >
            Remove
          </Button>
          <Select
            variant="solid"
            placeholder={text.placeholder}
            options={options}
            onChange={({ value }: { value: string }) =>
              groupDispatcher(selectGroupProperty(idx, value))
            }
            value={property ? { label: property, value: property } : null}
          />
        </div>
      ))}
      <Button
        variant="secondary"
        style="outline"
        onClick={() => groupDispatcher(addGroup())}
      >
        Add Group
      </Button>
    </>
  );
};

export default GroupBy;
