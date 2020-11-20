import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  padding: 25px;
  width: 320px;
`;

export const FooterContent = styled.div`
  display: flex;
`;

export const EmailContainer = styled.div`
  margin: 25px 0 5px 0;
`;

export const MaximumLimit = styled.span`
  opacity: 0.6;
`;

export const FileSettings = styled.div`
  display: flex;
  align-items: center;
`;

export const ContentTypeContainer = styled.div`
  margin-right: 15px;
`;

export const CompressionLabel = styled.span`
  margin-left: 5px;
  font-family: 'Lato Bold', sans-serif;
  color: ${colors.black[100]};
`;

export const Cancel = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
