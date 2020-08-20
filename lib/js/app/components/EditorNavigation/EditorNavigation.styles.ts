import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  display: flex;
  align-items: center;
  background: ${transparentize(0.9, colors.blue[100])};
  padding: 10px 20px;
`;

export const QueryMeta = styled.div`
  margin-left: 10px;
`;

export const QueryName = styled.div`
  font-size: 20px;
  line-height: 24px;
  font-family: 'Gangster Grotesk Bold', sans-serif;
  color: ${colors.blue[500]};
`;

export const MenuItem = styled.div``;

export const Menu = styled.div`
  display: flex;
  margin-left: auto;

  ${MenuItem} + ${MenuItem} {
    margin-left: 15px;
  }
`;
