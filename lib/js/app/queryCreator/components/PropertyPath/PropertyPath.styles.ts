import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Wrapper = styled.span`
  margin: 0 3px;
  display: flex;
  align-items: center;
`;

export const Container = styled.span`
  display: flex;
  align-items: center;

  font-size: 14px;
  line-height: 17px;
  font-family: 'Lato Regular', sans-serif;
  color: ${colors.blue[500]};
`;
