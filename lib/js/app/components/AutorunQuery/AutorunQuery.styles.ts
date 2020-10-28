import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Label = styled.div`
  font-size: 14px;
  font-family: Lato Regular, sans-serif;
  line-height: 17px;
  color: ${colors.black[100]};
  margin-right: 10px;
`;
