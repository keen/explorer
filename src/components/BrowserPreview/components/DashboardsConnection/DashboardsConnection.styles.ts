import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Wrapper = styled.div`
  padding: 20px;
  border-top: solid 1px ${colors.gray[300]};
`;

export const Container = styled.div`
  display: flex;
  gap: 20px;
`;

export const TitleContainer = styled.div`
  min-width: 100px;
`;
