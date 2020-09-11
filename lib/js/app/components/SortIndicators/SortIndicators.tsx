import React from 'react';
import { transparentize } from 'polished';
import { SortMode } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';
import { Icon } from '@keen.io/icons';

import { DownArrow, Container } from './SortIndicators.styles';

type Props = {
  /** Sort direction */
  sortDirection?: SortMode;
};

const INACTIVE_COLOR = transparentize(0.7, colors.black[100]);

export const SortIndicators = ({ sortDirection }: Props) => (
  <Container data-testid="sort-indicators">
    <Icon
      type="arrow-up"
      fill={sortDirection === 'ascending' ? colors.black[100] : INACTIVE_COLOR}
      width={10}
    />
    <DownArrow>
      <Icon
        type="arrow-down"
        fill={
          sortDirection === 'descending' ? colors.black[100] : INACTIVE_COLOR
        }
        width={10}
      />
    </DownArrow>
  </Container>
);

export default SortIndicators;
