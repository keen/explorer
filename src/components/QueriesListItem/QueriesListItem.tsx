import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { transparentize } from 'polished';
import { Badge } from '@keen.io/ui-core';
import { BodyText } from '@keen.io/typography';
import { getVisualizationIcon } from '@keen.io/widget-picker';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';
import { convertSecondsToHours } from '@keen.io/time-utils';

import {
  Container,
  QueryNameWrapper,
  IconWrapper,
  UpdateDate,
  Labels,
  Tag,
} from './QueryListItem.styles';

import DropIndicator from '../DropIndicator';

import { TAGS_LIMIT } from './constants';
import { Visualization } from '../../modules/queries/types';

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
  /** Query visualization */
  visualization: Visualization;
};

const QueriesListItem: FC<Props> = ({
  queryName,
  refreshRate,
  updateDate,
  isActive,
  tags,
  onClick,
  visualization,
}) => {
  const { t } = useTranslation();
  const [labelsOpen, toogleLabels] = useState(false);
  const isTagsLimitReached = tags.length > TAGS_LIMIT;
  const queryTags =
    isTagsLimitReached && !labelsOpen ? tags.slice(0, TAGS_LIMIT) : tags;

  const { type, chartSettings } = visualization;

  const visualizationIcon = useMemo(
    () => getVisualizationIcon({ type, chartSettings }),
    []
  );

  return (
    <Container
      onClick={onClick}
      isActive={isActive}
      data-testid="saved-query-item"
    >
      <QueryNameWrapper data-testid="saved-query-name" title={queryName}>
        <IconWrapper>
          <Icon
            type={visualizationIcon}
            width={16}
            height={16}
            fill={colors.blue[500]}
            opacity={0.5}
          />
        </IconWrapper>
        <BodyText enableTextEllipsis color={colors.blue[500]} variant="body2">
          {queryName}
        </BodyText>
      </QueryNameWrapper>
      <Labels>
        {' '}
        {refreshRate !== 0 && (
          <Tag>
            <Badge variant="green" truncate>
              <span data-testid="cache-badge">
                {t('queries_list_item.cached_label')}
              </span>{' '}
              {`(${convertSecondsToHours(refreshRate)}${t(
                'queries_list_item.cache_units'
              )})`}
            </Badge>
          </Tag>
        )}
        {queryTags.map((tag) => (
          <Tag key={tag}>
            <Badge variant="purple" truncate>
              {tag}
            </Badge>
          </Tag>
        ))}
        {isTagsLimitReached && (
          <DropIndicator
            onClick={(e) => {
              e.stopPropagation();
              toogleLabels(!labelsOpen);
            }}
            isActive={labelsOpen}
          />
        )}
      </Labels>
      <UpdateDate data-testid="saved-query-date">
        <BodyText
          variant="body3"
          fontWeight={400}
          color={transparentize(0.5, colors.black[500])}
        >
          {updateDate}
        </BodyText>
      </UpdateDate>
    </Container>
  );
};

export default QueriesListItem;
