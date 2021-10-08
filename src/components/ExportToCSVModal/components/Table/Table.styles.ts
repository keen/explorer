import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const StyledTable = styled.table`
  border-collapse: collapse;

  td,
  th {
    border: 1px solid ${colors.gray[400]};
    text-align: left;
    padding: 10px;
    font-weight: normal;
  }
`;

export const TableInfo = styled.div`
  margin-top: 5px;
`;

export const RightShadow = styled.div`
  height: 100%;
  width: 10px;
  background: transparent;
  position: absolute;
  top: 0;
  left: -10px;
  box-shadow: 0 4px 8px ${colors.gray['500']};
`;

export const LeftShadow = styled.div`
  height: 100%;
  width: 10px;
  background: transparent;
  position: absolute;
  top: 0;
  right: -10px;
  box-shadow: 0 -4px 8px ${colors.gray['500']};
`;

export const Container = styled.div`
  position: relative;
  overflow: hidden;
`;

export const TableScroll = styled.div`
  overflow: scroll;
`;
