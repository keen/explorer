import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import { ActionButton, Tooltip } from '@keen.io/ui-core';

import Title from '../Title';

import FiltersComponent from './FiltersComponent';
import TooltipContent from '../TooltipContent';
import { ActionContainer, Wrapper, TooltipMotion } from './Filters.styles';

import { getSchemas, getSchemaLoading } from '../../modules/events';

import { TOOLTIP_MOTION } from '../../constants';
import { AppState, Filter } from '../../types';

type Props = {
  /** Collection */
  collection: string;
  /** Filters */
  filters: Filter[];
  /** onReset handler */
  onReset?: () => void;
  /** onRemove handler */
  onRemove: (id: string) => void;
  /** onChange handler */
  onChange: (id: string, filter: Filter) => void;
  /** Add button onClick handler */
  onClick: (id: string) => void;
};

const Filters: FC<Props> = ({
  collection,
  filters,
  onReset,
  onRemove,
  onChange,
  onClick,
}) => {
  const { t } = useTranslation();
  const isSchemaExist = useSelector((state: AppState) => {
    const schemas = getSchemas(state);
    return schemas[collection];
  });
  const isSchemaLoading = useSelector((state: AppState) =>
    getSchemaLoading(state, collection)
  );
  const [hint, showHint] = useState(false);

  return (
    <>
      <Title isDisabled={!collection}>
        {t('query_creator_filters.filters')}
      </Title>
      <Wrapper
        onMouseEnter={() => !collection && showHint(true)}
        onMouseLeave={() => !collection && showHint(false)}
      >
        {isSchemaExist && !isSchemaLoading && (
          <FiltersComponent
            collection={collection}
            filters={filters}
            onReset={onReset && onReset}
            onRemove={(id) => onRemove(id)}
            onChange={(id, filter) => onChange(id, filter)}
          />
        )}
        <ActionContainer hasSpacing={!!filters.length}>
          <ActionButton
            action="create"
            isDisabled={!collection}
            onClick={() => {
              const filterId = uuid();
              onClick(filterId);
            }}
          />
        </ActionContainer>
        {!collection && (
          <AnimatePresence>
            {hint && (
              <TooltipMotion
                {...TOOLTIP_MOTION}
                data-testid="target-property-hint"
              >
                <Tooltip hasArrow={false} mode="dark">
                  <TooltipContent>
                    {t('query_creator_filters.select')}{' '}
                    <strong>{t('query_creator_filters.event_stream')}</strong>{' '}
                    {t('query_creator_filters.tooltip')}
                  </TooltipContent>
                </Tooltip>
              </TooltipMotion>
            )}
          </AnimatePresence>
        )}
      </Wrapper>
    </>
  );
};

export default Filters;
