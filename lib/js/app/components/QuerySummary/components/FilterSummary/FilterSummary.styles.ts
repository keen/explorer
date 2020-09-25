import styled from 'styled-components';
import { colors } from '@keen.io/colors';
import { transparentize } from 'polished';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  font-family: 'Lato Regular', sans-serif;
  font-size: 14px;
  line-height: 17px;

  color: ${colors.black[100]};

  & + & {
    margin-top: 5px;
  }
`;

export const Operator = styled.div`
  padding-left: 5px;
  color: ${transparentize(0.5, colors.black[100])};
`;

export const Value = styled.div`
  padding-left: 5px;
`;
