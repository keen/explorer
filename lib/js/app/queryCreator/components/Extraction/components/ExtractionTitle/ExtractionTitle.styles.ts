import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const MessageContainer = styled.div`
  margin: 0 0 3px 10px;
  line-height: 17px;
`;

export const FullExtraction = styled.div`
  font-size: 13px;
  font-family: 'Lato Regular', sans-serif;
  color: ${transparentize(0.3, colors.black[100])};
`;

export const FilteredExtraction = styled.div`
  font-family: 'Lato Regular', sans-serif;
  font-size: 14px;
  color: ${transparentize(0.3, colors.black[100])};
`;

export const ClearProperties = styled.span`
  font-family: 'Lato Bold', sans-serif;
  color: ${colors.blue[100]};
  cursor: pointer;
`;
