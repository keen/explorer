import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Settings = styled.div`
  padding: 25px 55px 25px 25px;
  width: 320px;
`;

export const TagManager = styled.div`
  margin-top: 10px;
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
`;

export const UpgradeAnchor = styled.a`
  font-family: 'Lato Bold', sans-serif;
  color: ${colors.red[500]};
  text-decoration: none;
`;
