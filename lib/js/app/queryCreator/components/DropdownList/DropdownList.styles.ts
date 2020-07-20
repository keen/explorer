import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const ListContainer = styled.ul`
  list-style: none;
  margin: 0;
  padding: 10px 0;
`;

export const ListItem = styled.li`
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${colors.blue[500]};

  cursor: pointer;
  transition: background 0.2s linear;

  &:hover {
    background: ${colors.gray[400]};
  }
`;
