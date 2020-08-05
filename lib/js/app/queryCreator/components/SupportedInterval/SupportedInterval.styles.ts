import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  padding: 15px 9px 9px 9px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export const IntervalButton = styled.div<{
  isActive: boolean;
}>`
  flex: 1 0 35%;
  text-align: center;
  padding: 10px;
  font-size: 14px;
  border-radius: 4px;
  color: ${colors.blue[500]};
  text-transform: capitalize;
  margin: 5px;
  cursor: pointer;
  ${(props) =>
    props.isActive
      ? css`
          background: ${transparentize(0.3, colors.green[100])};
          font-family: Lato Bold, sans-serif;
        `
      : css`
          background: ${colors.white[400]};
          font-family: Lato Medium, sans-serif;
        `}

  &:hover {
    background: ${transparentize(0.3, colors.green[100])};
  }
`;
