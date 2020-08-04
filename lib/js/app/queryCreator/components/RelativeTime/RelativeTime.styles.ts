import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const RelativityContainer = styled.div`
  margin-top: 15px;
  display: inline-flex;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
`;

export const CheckboxLabel = styled.div`
  margin-left: 5px;
`;

export const UnitsContainer = styled.div`
  position: relative;
  flex-basis: 50%;
`;

export const TimeLabel = styled.div`
  font-size: 14px;
  line-height: 17px;
  font-family: Lato Regular, sans-serif;
  color: ${colors.blue[500]};
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

export const TimeValue = styled.div`
  position: relative;
  flex-basis: 50%;
  margin-right: 5px;
`;
