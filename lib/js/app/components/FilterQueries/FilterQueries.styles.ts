import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  position: relative;
`;

export const DropdownContent = styled.div`
  padding: 10px 0;
  width: 200px;
  box-sizing: border-box;
`;

export const TagsContainer = styled.div`
  max-height: 280px;
  overflow-y: auto;
`;

export const ClearFilters = styled.div`
  padding: 10px 14px;
  border-top: solid 1px ${colors.gray[300]};
  color: ${colors.blue[200]};
  font-size: 14px;
  font-family: 'Lato Bold', sans-serif;
  cursor: pointer;
`;

export const EmptySearch = styled.div`
  padding: 10px 14px;
  color: ${transparentize(0.2, colors.black[100])};
  font-size: 12px;
  font-family: 'Lato Regular', sans-serif;
  text-align: center;
`;
