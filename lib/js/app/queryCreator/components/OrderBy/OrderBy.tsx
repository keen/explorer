import React, { FC, useMemo, useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import shallowEqual from 'shallowequal';
import { Button, Select, Label } from '@keen.io/ui-core';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import { serializeOrderBy } from './utils/serializeOrderBy';
import text from './text.json';

import { setOrderBy, getGroupBy, getOrderBy } from '../../modules/query';

import {
  ORDER_OPTIONS,
  DIRECTION_OPTIONS,
  DIRECTION_LABELS,
  DEFAULT_ORDER_SETTINGS,
} from './constants';

import { AppState, OrderBy as OrderBySettings } from '../../types';

type Props = {};

const OrderBy: FC<Props> = () => {
  const dispatch = useDispatch();
  const groups: string[] = useSelector((state: AppState) => {
    const groupBy = getGroupBy(state);
    if (groupBy) {
      if (Array.isArray(groupBy)) return groupBy;
      if (typeof groupBy === 'string') return [groupBy];
    }
    return [];
  }, shallowEqual);

  const orderBy = useSelector((state: AppState) => {
    const orderSettings = getOrderBy(state);
    return serializeOrderBy(orderSettings);
  });

  const options = useMemo(() => {
    return [
      ...ORDER_OPTIONS,
      ...groups.map((groupProperty) => ({
        label: groupProperty,
        value: groupProperty,
      })),
    ];
  }, [groups]);

  const orderRef = useRef(orderBy);

  const updateOrderBy = useCallback(
    (orderSettings: OrderBySettings, index: number) => {
      const orderBySettings = orderBy.map((order, idx) => {
        if (idx === index) return orderSettings;
        return order;
      });
      dispatch(setOrderBy(orderBySettings));
    },
    [orderBy]
  );

  const removeOrderBy = useCallback(
    (index: number) => {
      let orderBySettings = orderBy.filter((_order, idx) => index !== idx);
      if (orderBySettings.length === 0) orderBySettings = undefined;
      dispatch(setOrderBy(orderBySettings));
    },
    [orderBy]
  );

  useEffect(() => {
    if (!shallowEqual(orderBy, orderRef.current)) {
      dispatch(setOrderBy(orderBy));
    }
    orderRef.current = orderBy;
  }, [orderBy]);

  const showOrderOptions = groups.length;

  return (
    <>
      {showOrderOptions ? (
        <div>
          <Button
            variant="secondary"
            style="outline"
            onClick={() => {
              const currentSettings = orderBy || [];
              dispatch(
                setOrderBy([...currentSettings, DEFAULT_ORDER_SETTINGS])
              );
            }}
          >
            Add order settings
          </Button>
          {orderBy &&
            orderBy.map(({ propertyName, direction }, idx) => (
              <div key={idx}>
                <div
                  data-testid={`orderby-remove-${idx}`}
                  onClick={() => removeOrderBy(idx)}
                >
                  <Icon type="close" fill={colors.blue['500']} />
                </div>
                <Label htmlFor={`${idx}-order-property`}>
                  {text.propetyLabel}
                </Label>
                <Select
                  inputId={`${idx}-order-property`}
                  variant="solid"
                  options={options}
                  onChange={({ value }: { value: string }) => {
                    const orderSettings = { propertyName: value, direction };
                    updateOrderBy(orderSettings as OrderBySettings, idx);
                  }}
                  placeholder={text.propetyPlaceholder}
                  value={
                    propertyName
                      ? { label: propertyName, value: propertyName }
                      : null
                  }
                />
                <Label htmlFor={`${idx}-order-direction`}>
                  {text.directionLabel}
                </Label>
                <Select
                  inputId={`${idx}-order-direction`}
                  variant="solid"
                  options={DIRECTION_OPTIONS}
                  onChange={({ value }: { value: string }) => {
                    const orderSettings = { propertyName, direction: value };
                    updateOrderBy(orderSettings as OrderBySettings, idx);
                  }}
                  placeholder={text.directionPlaceholder}
                  value={
                    direction
                      ? { label: DIRECTION_LABELS[direction], value: direction }
                      : null
                  }
                />
              </div>
            ))}
        </div>
      ) : (
        text.specifyGroupBy
      )}
    </>
  );
};

export default OrderBy;
