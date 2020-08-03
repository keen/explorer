import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const PropertyItem = styled.div`
  height: 100%;
`;

export const Container = styled.div<{
  isActive: boolean;
}>`
  display: flex;
  background: ${transparentize(0.85, colors.blue[100])};
  border-radius: 4px;
  border: solid 1px ${transparentize(0.85, colors.blue[100])};
  box-sizing: border-box;
  height: 37px;

  transition: border-color 0.2s linear;

  &:hover {
    border: 1px solid rgba(39, 86, 109, 0.5);
  }

  ${(props) =>
    props.isActive &&
    css`
      box-shadow: 0 0 3px 1px rgba(29, 39, 41, 0.15);
    `}

  ${PropertyItem} + ${PropertyItem} {
    border-left: solid 1px red;
  }
`;
