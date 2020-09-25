import styled from 'styled-components';
import { colors } from '@keen.io/colors';
// import { Card as BaseCard } from '@keen.io/ui-core';

// export const Card = styled(BaseCard)`
//   height: auto;
// `;

export const Wrapper = styled.div`
  padding: 20px;
`;

export const StyledTable = styled.table`
  border-collapse: collapse;
  table-layout: fixed;
  text-align: left;
`;

export const StyledBody = styled.tbody``;

export const Row = styled.tr`
  vertical-align: top;
`;

export const Label = styled.th`
  padding: 0 20px 10px 0;

  font-family: 'Lato Bold', sans-serif;
  font-size: 14px;
  line-height: 17px;
  color: ${colors.black[100]};
`;

export const Value = styled.td`
  padding: 0 0 10px 0;

  font-family: 'Lato Regular', sans-serif;
  font-size: 14px;
  line-height: 17px;
  color: ${colors.black[100]};
`;
