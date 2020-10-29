import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  min-height: 340px;
  max-height: 400px;
  flex-grow: 1;
  overflow-y: scroll;

  .json-inspector,
  .json-inspector__selection {
    font-family: 'Lato Regular', sans-serif;
    font-size: 14px;
    line-height: 1.65;
  }

  .json-inspector__leaf {
    padding-left: 15px;
  }

  .json-inspector__line {
    display: block;
    position: relative;

    cursor: default;
  }

  .json-inspector__leaf_composite > .json-inspector__line {
    cursor: pointer;
  }

  .json-inspector__radio,
  .json-inspector__flatpath {
    display: none;
  }

  .json-inspector__value {
    margin-left: 5px;
  }

  .json-inspector__key {
    color: ${colors.black[500]};
  }

  .json-inspector__value_helper,
  .json-inspector__not-found {
    color: ${transparentize(0.7, colors.black[500])};
  }

  .json-inspector__value_null {
    color: ${colors.red[500]};
  }

  .json-inspector__value_string {
    color: ${colors.green[500]};
  }

  .json-inspector__value_boolean {
    color: ${colors.blue[500]};
  }

  .json-inspector__value_number {
    color: ${colors.purple[500]};
  }

  .json-inspector__leaf_composite {
    position: relative;
  }

  .json-inspector__leaf_composite {
    &:before {
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' opacity='1' viewBox='0 0 30 30'%3E%3Cpolygon fill='rgba(79,91,95,0.7)' points='9.45351896 0 24.453519 15 9.45351896 30 5.55 26.096481 16.6465765 15 5.55 3.90351896'%3E%3C/polygon%3E%3C/svg%3E");
      color: ${colors.black[100]};
      display: inline-block;
      position: absolute;
      left: 0;
      z-index: 1;
    }
  }

  .json-inspector__leaf_composite {
    &.json-inspector__leaf_expanded {
      &:before {
        content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' opacity='1' viewBox='0 0 30 30'%3E%3Cpolygon fill='rgba(79,91,95,0.7)' points='9.45351896 0 24.453519 15 9.45351896 30 5.55 26.096481 16.6465765 15 5.55 3.90351896'%3E%3C/polygon%3E%3C/svg%3E");
        transform: rotate(90deg);
      }
    }
  }
`;
