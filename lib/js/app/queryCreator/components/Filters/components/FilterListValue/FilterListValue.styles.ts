import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  position: relative;
`;

export const DropdownContainer = styled.div`
  width: 280px;
  padding: 14px;
  box-sizing: border-box;
`;

export const Value = styled.div`
  padding: 10px 14px;
  height: 37px;
  box-sizing: border-box;

  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  font-size: 14px;
  line-height: 17px;
  font-family: 'Lato Regular', sans-serif;
  color: ${colors.blue[500]};
`;

export const ListItem = styled.div`
  margin-top: 6px;
  margin-right: 10px;
`;

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
