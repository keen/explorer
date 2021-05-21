import styled, { css } from 'styled-components';
import { space, layout, LayoutProps, SpaceProps } from 'styled-system';

import { BACKGROUND_MAIN } from '../../constants';

export const Header = styled.th<SpaceProps & { sortable?: boolean }>`
  text-align: left;
  white-space: nowrap;
  padding-bottom: 10px;
  margin-bottom: 10px;

  position: sticky;
  background: ${BACKGROUND_MAIN};
  top: 0;

  ${space};
  ${(props) =>
    props.sortable &&
    css`
      cursor: pointer;
    `};
`;

export const QueriesTable = styled.table`
  width: 100%;
  border-spacing: 0 7px;
  border-collapse: separate;
  table-layout: fixed;
`;

export const QueriesTableHeader = styled.thead`
  display: block;
`;

export const QueriesTableBody = styled.tbody<LayoutProps>`
  ${layout};
  display: block;
  width: 100%;
  overflow-y: auto;
`;

export const QueriesTableHeaderRow = styled.tr`
  display: grid;
  grid-template-columns: 45% 35% 20%;
`;
