import styled from 'styled-components';

export const PropertySettings = styled.div`
  margin-right: 10px;
  margin-bottom: 10px;

  &[draggable='true'] {
    cursor: grabbing;
  }

  &[draggable='false'] {
    cursor: grab;
  }

  &:last-child {
    margin-right: 0;
  }
`;

export const Heading = styled.div`
  display: flex;
  align-items: center;
`;

export const SortableContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
