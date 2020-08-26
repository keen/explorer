import React, {
  FC,
  useMemo,
  useRef,
  useEffect,
  useCallback,
  useState,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import shallowEqual from 'shallowequal';
import { v4 as uuid } from 'uuid';
import Sortable from 'sortablejs';
import { AnimatePresence } from 'framer-motion';
import { ActionButton, Tooltip } from '@keen.io/ui-core';

import { useSearch } from '../../hooks';
import { SearchContext } from '../../contexts';

import { createTree } from '../../utils/createTree';

import Title from '../Title';
import { OrderByProperty } from './components';
import {
  Section,
  SortableContainer,
  OrderByContainer,
  TooltipContent,
  TooltipMotion,
} from './OrderBy.styles';

import {
  serializeOrderBy,
  mutateArray,
  filterSchema,
  createListFromSchema,
} from './utils';
import { setOrderBy, getGroupBy, getOrderBy } from '../../modules/query';
import { getCollectionSchema } from '../../modules/events';

import { DRAG_ANIMATION_TIME, DRAG_DELAY } from './constants';

import { AppState, OrderBy as OrderBySettings } from '../../types';
import { Direction } from './types';

import text from './text.json';

type Props = {
  /** Collection name */
  collection: string;
};

const tooltipMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const OrderBy: FC<Props> = ({ collection }) => {
  const dispatch = useDispatch();
  const groups: string[] = useSelector((state: AppState) => {
    const groupBy = getGroupBy(state);
    if (groupBy) {
      if (Array.isArray(groupBy)) return groupBy;
      if (typeof groupBy === 'string') return [groupBy];
    }
    return [];
  }, shallowEqual);

  const { schema } = useSelector((state: AppState) =>
    getCollectionSchema(state, collection)
  );

  const orderBy = useSelector((state: AppState) => {
    const orderSettings = getOrderBy(state);
    return serializeOrderBy(orderSettings);
  });

  const orderRef = useRef(orderBy);
  const sortableRef = useRef(null);

  const [propertiesTree, setPropertiesTree] = useState(null);
  const [searchPropertiesPhrase, setSearchPhrase] = useState(null);
  const [expandTree, setTreeExpand] = useState(false);
  const [isDragged, setDragMode] = useState(false);
  const [hint, showHint] = useState(false);

  const filteredSchema = filterSchema(schema, groups, orderBy);

  const { searchHandler } = useSearch<{
    path: string;
    type: string;
  }>(
    createListFromSchema(filteredSchema),
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

  const updateOrderBy = useCallback(
    (orderSettings: OrderBySettings, id: string) => {
      const orderBySettings = orderBy.map((order) => {
        if (order.id === id) return orderSettings;
        return order;
      });
      dispatch(setOrderBy(orderBySettings));
    },
    [orderBy]
  );

  const removeOrderBy = useCallback(
    (id: string) => {
      let orderBySettings = orderBy.filter((order) => order.id !== id);
      if (orderBySettings.length === 0) orderBySettings = undefined;
      dispatch(setOrderBy(orderBySettings));
    },
    [orderBy]
  );

  const clearOrderBy = useCallback(
    (groups: string[]) => {
      let orderBySettings = orderBy.filter(
        (item) =>
          groups.includes(item.propertyName) || item.propertyName === 'result'
      );
      if (groups.length === 0) orderBySettings = undefined;
      if (!shallowEqual(orderBy, orderBySettings)) {
        dispatch(setOrderBy(orderBySettings));
      }
    },
    [orderBy]
  );

  useEffect(() => {
    if (orderBy?.length) clearOrderBy(groups);
  }, [groups, orderBy]);

  useEffect(() => {
    if (!shallowEqual(orderBy, orderRef.current)) {
      dispatch(setOrderBy(orderBy));
    }
    orderRef.current = orderBy;
  }, [orderBy]);

  const showOrderOptions = useMemo(
    () => groups.filter((group) => group).length,
    [groups]
  );

  useEffect(() => {
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
          orderRef.current,
          evt.oldIndex,
          evt.newIndex
        );
        dispatch(setOrderBy(updatedGroups));
        setDragMode(false);
      },
    });
  }, []);

  return (
    <>
      <Title isDisabled={!showOrderOptions}>{text.title}</Title>
      <Section
        onMouseEnter={() => !showOrderOptions && showHint(true)}
        onMouseLeave={() => !showOrderOptions && showHint(false)}
      >
        <SearchContext.Provider value={{ expandTree, searchPropertiesPhrase }}>
          <SortableContainer ref={sortableRef}>
            {orderBy &&
              orderBy.map(({ propertyName, direction, id }) => (
                <OrderByContainer key={id}>
                  <OrderByProperty
                    property={propertyName}
                    direction={direction}
                    isEditAllowed={!isDragged}
                    properties={
                      propertiesTree
                        ? propertiesTree
                        : createTree(filteredSchema)
                    }
                    onSelectDirection={(value: Direction) => {
                      const orderSettings = {
                        id,
                        propertyName,
                        direction: value,
                      };
                      updateOrderBy(orderSettings as OrderBySettings, id);
                    }}
                    onSelectProperty={(value: string) => {
                      clearSearchHandler();
                      const orderSettings = {
                        id,
                        propertyName: value,
                        direction,
                      };
                      updateOrderBy(orderSettings as OrderBySettings, id);
                    }}
                    onSearchProperties={searchHandler}
                    onRemove={() => {
                      clearSearchHandler();
                      removeOrderBy(id);
                    }}
                  />
                </OrderByContainer>
              ))}
            <ActionButton
              className="add-button"
              isDisabled={
                !showOrderOptions || !Object.keys(filteredSchema).length
              }
              action="create"
              onClick={() => {
                const currentSettings = orderBy || [];
                dispatch(
                  setOrderBy([
                    ...currentSettings,
                    { id: uuid(), propertyName: '', direction: 'ASC' },
                  ])
                );
              }}
            />
          </SortableContainer>
        </SearchContext.Provider>
        {!showOrderOptions && (
          <AnimatePresence>
            {hint && (
              <TooltipMotion {...tooltipMotion} data-testid="orderby-hint">
                <Tooltip hasArrow={false} mode="dark">
                  <TooltipContent>{text.orderByHint}</TooltipContent>
                </Tooltip>
              </TooltipMotion>
            )}
          </AnimatePresence>
        )}
      </Section>
    </>
  );
};

export default OrderBy;
