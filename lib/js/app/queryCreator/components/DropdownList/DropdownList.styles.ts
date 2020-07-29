import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const ListContainer = styled.ul`
  list-style: none;
  margin: 0;
  padding: 10px 0;
`;

export const ListItem = styled.li<{
  isActive: boolean;
}>`
  padding: 9px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 14px;
  font-family: 'Lato', sans-serif;
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
