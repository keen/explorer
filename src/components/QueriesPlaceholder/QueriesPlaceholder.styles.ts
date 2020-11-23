import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Placeholder = styled.div<{
  opacityAmount: number;
}>`
  height: 54px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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

export const SearchMessage = styled.span`
  font-family: 'Lato Regular', sans-serif;
  font-size: 16px;
  color: ${colors.blue[500]};
`;
