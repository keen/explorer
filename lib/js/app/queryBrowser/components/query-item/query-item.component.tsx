import React, { FC } from 'react';
import { Icon } from '@keen.io/icons';
import { Badge } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

import { getQueryName } from './utils/getQueryName';

import { SavedQuery } from '../../types';

type Props = {
  /** Query settings */
  settings: SavedQuery;
  /** Select event handler */
  onSelect: (name: string) => void;
  /** Delete event handler */
  onDelete: (name: string) => void;
  onEnableCacheFilter: () => void;
  onEnableAnalysisFilter: (analysisType: string) => void;
};

const QueryItem: FC<Props> = ({
  settings,
  onSelect,
  onDelete,
  onEnableAnalysisFilter,
  onEnableCacheFilter,
}) => {
  const {
    queryName,
    refreshRate,
    query: { analysisType },
  } = settings;

  return (
    <div role="presentation">
      <div onClick={() => onSelect(queryName)}>{getQueryName(settings)}</div>
      <div>
        <span onClick={() => onEnableAnalysisFilter(analysisType)}>
          <Badge type="light">{analysisType}</Badge>
        </span>
        {!!refreshRate && (
          <span onClick={onEnableCacheFilter}>
            <Badge type="success">cached</Badge>
          </span>
        )}
      </div>
      <div onClick={() => onDelete(queryName)}>
        <Icon type="close" fill={colors.blue['500']} />
      </div>
    </div>
  );
};

export default QueryItem;
