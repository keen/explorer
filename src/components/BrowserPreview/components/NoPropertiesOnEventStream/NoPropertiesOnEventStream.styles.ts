import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Wrapper = styled.div`
  padding: 20px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 360px;
  padding: 17px;
  background: ${colors.white[400]};
  text-align: center;
`;

export const TitleContainer = styled.div`
  margin-bottom: 15px;
`;
