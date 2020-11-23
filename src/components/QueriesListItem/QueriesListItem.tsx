import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@keen.io/ui-core';

import {
  Container,
  QueryName,
  UpdateDate,
  Labels,
  Tag,
} from './QueryListItem.styles';

import DropIndicator from '../DropIndicator';
import { convertMilisecondsToMinutes } from '../../modules/savedQuery';

import { TAGS_LIMIT } from './constants';

type Props = {
  /** Saved query name */
  queryName: string;
  /** Last query update date */
  updateDate: string;
  /** Cache refresh rate */
  refreshRate: number;
  /** Query tags */
  tags: string[];
  /** Query selection active indicator */
  isActive: boolean;
  /** Click event handler */
  onClick: (e: React.MouseEvent<HTMLTableRowElement>) => void;
};

const QueriesListItem: FC<Props> = ({
  queryName,
  refreshRate,
  updateDate,
  isActive,
  tags,
  onClick,
}) => {
  const { t } = useTranslation();
  const [labelsOpen, toogleLabels] = useState(false);
  const queryTags =
    tags.length > TAGS_LIMIT && !labelsOpen ? tags.slice(0, TAGS_LIMIT) : tags;

  return (
    <Container
      onClick={onClick}
      isActive={isActive}
      data-testid="saved-query-item"
    >
      <QueryName data-testid="saved-query-name">{queryName}</QueryName>
      <Labels>
        {' '}
        {refreshRate !== 0 && (
          <Tag>
            <Badge variant="green">
              <span data-testid="cache-badge">
                {t('queries_list_item.cached_label')}
              </span>{' '}
              {`(${convertMilisecondsToMinutes(refreshRate)}${t(
                'queries_list_item.cache_units'
              )})`}
            </Badge>
          </Tag>
        )}
        {queryTags.map((tag) => (
          <Tag key={tag}>
            <Badge variant="purple">{tag}</Badge>
          </Tag>
        ))}
        {tags.length > TAGS_LIMIT && (
          <DropIndicator
            onClick={(e) => {
              e.stopPropagation();
              toogleLabels(!labelsOpen);
            }}
            isActive={labelsOpen}
          />
        )}
      </Labels>
      <UpdateDate data-testid="saved-query-date">{updateDate}</UpdateDate>
    </Container>
  );
};

export default QueriesListItem;
