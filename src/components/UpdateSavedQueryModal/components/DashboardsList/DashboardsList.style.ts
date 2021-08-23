import styled from 'styled-components';
import { BodyText } from '@keen.io/typography';

export const List = styled.ul`
  margin: 10px 0 20px 0;
  padding: 0;
  list-style-position: inside;
`;

export const ListItem = styled.li`
  margin-bottom: 5px;

  ${BodyText} {
    display: inline-block;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Anchor = styled.a`
  cursor: pointer;
`;
