import styled from 'styled-components';

export const Container = styled.div`
  min-height: 340px;
  max-height: 400px;
  flex-grow: 1;
  overflow-y: scroll;

  .json-inspector,
  .json-inspector__selection {
    font-family: 'Lato Regular', sans-serif;
  }

  .json-inspector__leaf {
    padding-left: 10px;
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

  .json-inspector__search {
    min-width: 300px;
    margin: 0 10px 10px 0;
    padding: 2px;
  }

  .json-inspector__key {
    color: #505050;
  }

  .json-inspector__value_helper,
  .json-inspector__value_null,
  .json-inspector__not-found {
    color: #b0b0b0;
  }

  .json-inspector__value_string {
    color: #798953;
  }

  .json-inspector__value_boolean {
    color: #75b5aa;
  }

  .json-inspector__value_number {
    color: #d28445;
  }

  .json-inspector__hl {
    background: #ff0;
    box-shadow: 0 -1px 0 2px #ff0;
    border-radius: 2px;
  }

  .json-inspector__show-original {
    display: inline-block;
    padding: 0 6px;

    color: #666;
    cursor: pointer;
  }

  .json-inspector__show-original:hover {
    color: #111;
  }

  .json-inspector__show-original:before {
    content: '⥂';
  }

  .json-inspector__show-original:hover:after {
    content: ' expand';
  }
`;
