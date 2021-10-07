import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const ModalBody = styled.div`
  padding: 20px 25px;
  width: 600px;
`;

export const FooterButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const TabDescription = styled.div`
  margin: 20px 0 10px 0;
`;

export const TabsContainer = styled.div`
  background: linear-gradient(
    0deg,
    ${colors.white[300]} 0%,
    ${colors.white[300]} 1px,
    ${colors.white[500]} 1px,
    ${colors.white[500]} 100%
  );
`;
