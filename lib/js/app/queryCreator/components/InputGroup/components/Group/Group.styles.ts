import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;

  margin-right: 1px;

  background-color: ${transparentize(0.85, colors.blue['100'])};

  &:first-child {
    border-radius: 4px 0 0 4px;
  }

  &:last-child {
    margin-right: 0;
    border-radius: 0 4px 4px 0;
  }
`;
