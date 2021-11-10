import styled, { css } from 'styled-components';
import { colors } from '@keen.io/colors';

export const Container = styled.tr<{
  isActive: boolean;
}>`
  width: 100%;
  display: grid;
  grid-template-columns: 45% 35% 20%;
  margin-bottom: 7px;

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
    `};

  transition: all 0.2s linear;
`;

export const Tag = styled.span`
  display: inline-block;
  margin: 0 5px 5px 0;
`;

export const QueryNameWrapper = styled.td`
  display: flex;
  padding: 20px 10px 20px 20px;
  align-items: center;
`;

export const IconWrapper = styled.span`
  flex-shrink: 0;
  margin-right: 10px;
  display: flex;
`;

export const Labels = styled.td`
  display: flex;
  flex-wrap: wrap;
  padding: 20px 10px 20px 10px;
`;

export const UpdateDate = styled.td`
  display: flex;
  align-items: center;
  padding: 20px 20px 20px 10px;
`;
