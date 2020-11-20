import styled, { css } from 'styled-components';
import { layout, color, LayoutProps, ColorProps } from 'styled-system';
import { colors } from '@keen.io/colors';

export const TooltipContent = styled.div<
  LayoutProps & ColorProps & { enableWrap?: boolean }
>`
  font-family: 'Lato Regular', sans-serif;
  font-size: 14px;
  line-height: 17px;

  white-space: nowrap;
  color: ${colors.white[500]};

  ${(props) =>
    props.enableWrap &&
    css`
      white-space: normal;
    `}

  ${layout}
  ${color}
`;
