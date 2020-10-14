import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Navigation = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

export const NavigationItem = styled.div`
  margin-right: 20px;

  &:last-child {
    margin-right: 0;
  }
`;

export const Link = styled.a`
  text-decoration: none;
  font-family: 'Lato Bold', sans-serif;
  font-size: 14px;
  line-height: 17px;
  color: ${colors.blue[500]};
  cursor: pointer;

  &:hover {
    color: ${colors.blue[200]};
  }

  transition: color 0.2s linear;
`;

export const CodeWrapper = styled.div`
  max-height: 350px;
  min-width: 350px;
  width: 75vw;
  max-width: 1180px;
  margin: 10px;
  overflow: scroll;
`;
