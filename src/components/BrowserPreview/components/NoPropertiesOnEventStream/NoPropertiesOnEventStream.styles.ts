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
`;

export const Title = styled.h2`
  font-size: 20px;
  line-height: 24px;
  font-family: 'Lato Regular', sans-serif;
  color: ${colors.gray[500]};
`;

export const Message = styled.p`
  font-family: 'Lato Regular', sans-serif;
  font-size: 16px;
  line-height: 26px;
  margin: 0;
  color: ${colors.red[500]};
`;
