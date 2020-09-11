import styled, { css } from 'styled-components';
import { space, layout, LayoutProps, SpaceProps } from 'styled-system';

import { BACKGROUND_MAIN } from '../../constants';

export const Header = styled.th<
  SpaceProps & LayoutProps & { sortable?: boolean }
>`
  text-align: left;
  white-space: nowrap;
  padding-bottom: 10px;

  position: sticky;
  background: ${BACKGROUND_MAIN};
  top: 0;

  ${space}
  ${layout}
  ${(props) =>
    props.sortable &&
    css`
      cursor: pointer;
    `}
`;

export const QueriesTable = styled.table`
  width: 100%;
  border-spacing: 0 7px;
  border-collapse: separate;
  table-layout: fixed;
`;
