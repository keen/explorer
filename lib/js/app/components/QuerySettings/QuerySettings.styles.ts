import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Settings = styled.div`
  padding: 25px 55px 25px 25px;
  width: 320px;
`;

export const FooterContent = styled.div`
  display: flex;
  align-items: center;
`;

export const ErrorNotification = styled.div`
  margin-bottom: 20px;
`;

export const Cancel = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const NewQueryNotice = styled.div`
  margin-bottom: 20px;
  color: ${colors.black[100]};
  font-size: 14px;
  line-height: 17px;
  font-family: 'Lato Regular', sans-serif;
`;
