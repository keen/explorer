import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Badge = styled.span`
  padding: 3px;
  font-size: 12px;
  line-height: 14px;
  font-family: 'Lato Bold', sans-serif;

  border-radius: 2px;
  background: ${colors.blue[100]};
  color: ${colors.white[500]};
`;
