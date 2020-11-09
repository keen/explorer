import styled from 'styled-components';
import { layout, color, LayoutProps, ColorProps } from 'styled-system';
import { colors } from '@keen.io/colors';

export const TooltipContent = styled.div<LayoutProps & ColorProps>`
  font-family: 'Lato Regular', sans-serif;
  font-size: 14px;
  line-height: 17px;
  white-space: nowrap;

  color: ${colors.white[500]};

  ${layout}
  ${color}
`;
