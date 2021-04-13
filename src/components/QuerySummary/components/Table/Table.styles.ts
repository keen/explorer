import styled from 'styled-components';

export const StyledTable = styled.table`
  margin: 0 0 10px 0;
  padding: 0;
  border-collapse: collapse;
  table-layout: fixed;
  text-align: left;
`;

export const StyledBody = styled.tbody``;

export const Label = styled.th`
  padding: 0 20px 10px 0;
`;

export const Value = styled.td`
  padding: 0 0 10px 0;
`;

export const Row = styled.tr`
  vertical-align: top;

  &:last-child {
    ${Label}, ${Value} {
      padding-bottom: 0;
    }
  }
`;
