import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Container = styled.label`
  display: flex;
  padding: 7px 14px;
`;

export const Label = styled.span`
  font-family: 'Lato Regular', sans-serif;
  font-size: 14px;
  color: ${colors.black[100]};
  margin-left: 4px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
