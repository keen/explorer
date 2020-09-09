import styled from 'styled-components';
import { transparentize } from 'polished';
import {
  space,
  layout,
  flexbox,
  LayoutProps,
  FlexDirectionProps,
  SpaceProps,
} from 'styled-system';
import { colors } from '@keen.io/colors';

import { BACKGROUND_MAIN } from '../../constants';

export const ScrollableContainer = styled.div<LayoutProps>`
  ${layout}
  overflow-y: scroll;
  overflox-x: hidden;
`;

export const ScrollOverflow = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: ${BACKGROUND_MAIN};
  box-shadow: ${transparentize(0.5, colors.gray[500])} -4px 0px 8px;
`;

export const Container = styled.div<FlexDirectionProps>`
  display: flex;
  background: ${transparentize(0.9, colors.blue[100])};
  ${flexbox}
`;

export const Socket = styled.div<SpaceProps & LayoutProps>`
  position: relative;
  ${layout}
  ${space}
`;

export const Card = styled.div`
  background: ${colors.white[500]};
  box-shadow: 0 2px 4px 0 ${transparentize(0.85, colors.black[500])};
`;
