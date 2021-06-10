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

export const ScrollableContainer = styled.div`
  position: relative;
`;

export const ScrollOverflow = styled.div`
  width: 100%;
  height: 1px;
  background: ${BACKGROUND_MAIN};
  box-shadow: ${transparentize(0.85, colors.black[500])} 0px 2px 6px;
`;

export const Container = styled.div<FlexDirectionProps>`
  display: flex;
  background: ${BACKGROUND_MAIN};
  position: relative;
  ${flexbox};
`;

export const Socket = styled.div<SpaceProps & LayoutProps>`
  position: relative;
  min-width: 0;
  ${layout};
  ${space};
`;

export const FiltersContainer = styled.div`
  margin-left: 50px;
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
