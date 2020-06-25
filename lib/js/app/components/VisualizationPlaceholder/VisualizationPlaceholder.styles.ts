import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 320px;
  background: ${colors.gray[300]};
`;

export const Text = styled.div`
  margin-top: 10px;
`;
