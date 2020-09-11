import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Placeholder = styled.div<{
  opacityAmount: number;
}>`
  height: 54px;
  width: 100%;
  background: ${(props) =>
    transparentize(props.opacityAmount, colors.gray[500])};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  ${Placeholder} + ${Placeholder} {
    margin-top: 7px;
  }
`;
