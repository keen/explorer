import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Container = styled.div<{
  isActive?: boolean;
}>`
  position: relative;
  display: flex;
  font-family: Lato Regular, sans-serif;
  font-size: 14px;
  color: ${colors.blue[500]};

  padding-right: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  box-sizing: border-box;

  cursor: pointer;
  transition: background 0.2s linear;

  &:hover {
    background: ${transparentize(0.8, colors.green[100])};
  }

  ${(props) =>
    props.isActive &&
    css`
      background: ${transparentize(0.8, colors.green[100])};
    `}
`;

export const Type = styled.div`
  padding-left: 5px;
  margin-left: auto;
  flex-shrink: 0;
  color: ${transparentize(0.5, colors.black[500])};
`;

export const Name = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Path = styled.div<{
  isBold: boolean;
}>`
  font-size: 14px;
  font-family: Lato Regular, sans-serif;
  line-height: 17px;
  color: ${colors.white[500]};

  ${(props) =>
    props.isBold &&
    css`
      font-family: Lato Bold, sans-serif;
    `}
`;
