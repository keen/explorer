import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Container = styled.tr<{
  isActive: boolean;
}>`
  background: ${colors.white[500]};
  cursor: pointer;

  &:hover {
    box-shadow: 0 2px 4px 1px rgba(39, 86, 109, 0.3);
  }

  ${(props) =>
    props.isActive &&
    css`
      box-shadow: 0 2px 4px 1px rgba(39, 86, 109, 0.3);
      & > td:last-of-type {
        border-right: solid 6px ${colors.blue[500]};
      }
    `}

  transition: all .2s linear;
`;

export const Tag = styled.span`
  display: inline-block;
  margin: 0 5px 5px 0;
`;

export const QueryName = styled.td`
  padding: 20px 10px 20px 20px;
  max-width: 240px;

  font-size: 14px;
  line-height: 17px;
  font-family: 'Lato Regular', sans-serif;
  color: ${colors.blue[500]};
`;

export const Labels = styled.td`
  padding: 20px 10px 20px 10px;
`;

export const UpdateDate = styled.td`
  padding: 0 20px 0 10px;
  font-size: 12px;
  line-height: 15px;
  font-family: 'Lato Regular', sans-serif;
  color: ${transparentize(0.5, colors.black[500])};
`;
