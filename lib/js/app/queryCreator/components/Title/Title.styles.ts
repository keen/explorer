import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Container = styled.div<{
  isDisabled?: boolean;
  hasError?: boolean;
}>`
  margin-bottom: 3px;
  color: ${colors.black[100]};
  font-family: 'Lato Bold', sans-serif;
  font-size: 14px;
  line-height: 17px;
  cursor: pointer;

  ${(props) =>
    props.isDisabled &&
    css`
      cursor: not-allowed;
      color: ${transparentize(0.5, colors.black[100])};
    `}

  ${(props) =>
    props.hasError &&
    css`
      color: ${colors.red[500]};
    `}
`;
