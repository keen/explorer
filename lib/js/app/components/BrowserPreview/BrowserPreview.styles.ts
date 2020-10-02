import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Card = styled.div`
  background: ${colors.white[500]};
  box-shadow: 0 2px 4px 0 ${transparentize(0.85, colors.black[500])};
`;

export const HeaderContainer = styled.div`
  margin: 7px 0 20px 0;
`;

export const QueryTitle = styled.div`
  padding: 20px;

  font-family: 'Gangster Grotesk Bold', sans-serif;
  font-size: 20px;
  line-height: 24px;
  color: ${colors.blue[500]};
`;
