import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Container = styled.div<{
  isActive?: boolean;
}>`
  display: flex;
  font-family: Lato Regular, sans-serif;
  font-size: 14px;
  color: ${colors.blue[500]};

  cursor: pointer;
  transition: background 0.2s linear;

  &:hover {
    background: ${transparentize(0.8, colors.green[100])};
  }

  ${(props) =>
    props.isActive &&
    css`
      background: ${transparentize(0.8, colors.green[100])};
    `}
`;

export const Type = styled.div`
  margin-left: auto;
  color: ${transparentize(0.5, colors.black[500])};
`;
