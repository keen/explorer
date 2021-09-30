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
