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
import { useTranslation } from 'react-i18next';
import { ActionButton, Tooltip } from '@keen.io/ui-core';
import { useSearch } from '@keen.io/react-hooks';

import { SearchContext } from '../../contexts';

import { createTree } from '../../utils';

import Title from '../Title';
import TooltipContent from '../TooltipContent';
import { OrderByProperty } from './components';
import {
  Section,
  SortableContainer,
  OrderByContainer,
  TooltipMotion,
} from './OrderBy.styles';

import { mutateArray } from '../../utils';
import { filterSchema, createListFromSchema } from './utils';
import { setOrderBy, getGroupBy, getOrderBy } from '../../modules/query';
import { getCollectionSchema } from '../../modules/events';

import { TOOLTIP_MOTION } from '../../constants';
import { DRAG_ANIMATION_TIME, DRAG_DELAY } from './constants';

import { AppState, OrderBy as OrderBySettings } from '../../types';
import { OrderDirection } from './types';

type Props = {
  /** Collection name */
  collection: string;
};

const OrderBy: FC<Props> = ({ collection }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
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

  const orderBy = useSelector((state: AppState) => getOrderBy(state));
  const orderByRef = useRef(orderBy);

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

  const showOrderOptions = useMemo(
    () => groups.filter((group) => group).length,
    [groups]
  );

  useEffect(() => {
    orderByRef.current = orderBy;
  }, [orderBy]);

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
        if (orderByRef.current) {
          const updatedGroups = mutateArray(
            orderByRef.current,
            evt.oldIndex,
            evt.newIndex
          );
          dispatch(setOrderBy(updatedGroups));
          setDragMode(false);

          if (dragGhost) dragGhost.parentNode.removeChild(dragGhost);
        }
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

  const isActionButtonDisabled = () =>
    !showOrderOptions ||
    !Object.keys(filteredSchema).length ||
    (orderBy && orderBy.some((item) => !item.propertyName));

  return (
    <>
      <Title isDisabled={!showOrderOptions}>
        {t('query_creator_order_by.title')}
      </Title>
      <Section
        data-testid="order-by-wrapper"
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
                    orderDirection={direction}
                    isEditAllowed={!isDragged}
                    properties={
                      propertiesTree
                        ? propertiesTree
                        : createTree(filteredSchema)
                    }
                    onSelectDirection={(value: OrderDirection) => {
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
                    onBlur={() => {
                      if (!propertyName) removeOrderBy(id);
                    }}
                    onRemove={() => {
                      clearSearchHandler();
                      removeOrderBy(id);
                    }}
                  />
                </OrderByContainer>
              ))}
            <ActionButton
              className="add-button"
              isDisabled={isActionButtonDisabled()}
              action="create"
              onClick={() => {
                const currentSettings = orderBy || [];
                dispatch(
                  setOrderBy([
                    ...currentSettings,
                    { id: uuid(), propertyName: '', direction: 'DESC' },
                  ])
                );
              }}
            />
          </SortableContainer>
        </SearchContext.Provider>
        {!showOrderOptions && (
          <AnimatePresence>
            {hint && (
              <TooltipMotion {...TOOLTIP_MOTION} data-testid="orderby-hint">
                <Tooltip hasArrow={false} mode="dark">
                  <TooltipContent>
                    {collection ? (
                      <span>
                        {t('query_creator_order_by.define')}{' '}
                        <strong>{t('query_creator_order_by.group_by')}</strong>{' '}
                        {t('query_creator_order_by.order_result')}
                      </span>
                    ) : (
                      <span>
                        {t('query_creator_order_by.select')}{' '}
                        <strong>
                          {t('query_creator_order_by.event_stream')}
                        </strong>{' '}
                        {t('query_creator_order_by.tooltip')}
                      </span>
                    )}
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

export default OrderBy;
