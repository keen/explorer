import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const PreviewCollections = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;

  font-size: 12px;
  font-family: 'Lato Regular', sans-serif;
  color: ${colors.blue['300']};
  cursor: pointer;
`;

export const PreviewLabel = styled.span`
  margin-left: 5px;
`;
