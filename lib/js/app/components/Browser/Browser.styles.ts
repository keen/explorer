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
  overflow-y: auto;
  position: relative;
`;

export const ScrollOverflow = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: ${BACKGROUND_MAIN};
  box-shadow: ${transparentize(0.85, colors.black[500])} 0px -2px 6px;
`;

export const Container = styled.div<FlexDirectionProps>`
  display: flex;
  background: ${transparentize(0.9, colors.blue[100])};
  position: relative;
  ${flexbox}
`;

export const Socket = styled.div<SpaceProps & LayoutProps>`
  position: relative;
  ${layout}
  ${space}
`;

export const PreviewPlaceholder = styled.div`
  width: 100%;
  height: 500px;
  background: linear-gradient(
    180deg,
    rgba(205, 207, 211, 0.2) 0%,
    rgba(205, 207, 211, 0) 100%
  );
`;
