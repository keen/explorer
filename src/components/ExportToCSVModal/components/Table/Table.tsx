import React, { FC, useRef } from 'react';
import { transparentize } from 'polished';
import { useTranslation, Trans } from 'react-i18next';
import { BodyText } from '@keen.io/typography';
import { colors } from '@keen.io/colors';
import { useScrollOverflowHandler } from '@keen.io/react-hooks';

import {
  StyledTable,
  TableInfo,
  RightShadow,
  LeftShadow,
  TableScroll,
  Container,
} from './Table.styles';

type Props = {
  /** Data to export */
  data: (string | number)[][];
  /** Row limit */
  rowLimit?: number;
  /** Column limit */
  columnLimit?: number;
};

const Table: FC<Props> = ({ data, rowLimit, columnLimit }) => {
  const { t } = useTranslation();

  const headerColumns = data[0].slice(0, columnLimit);
  const bodyRows = data.slice(1, rowLimit && rowLimit + 1);
  const containerRef = useRef(null);

  const totalColumns = data[0].length;
  const totalRows = data.length - 1;

  const {
    overflowRight,
    overflowLeft,
    scrollHandler,
  } = useScrollOverflowHandler(containerRef);

  const hasLimitedData = totalRows > rowLimit || totalColumns > columnLimit;

  const limitDescription = () => {
    if (totalRows > rowLimit && totalColumns > columnLimit)
      return t('table.showing_number_columns_and_rows_of_total', {
        columnsNumber: columnLimit,
        columnsTotalNumber: totalColumns,
        rowsNumber: rowLimit,
        rowsTotalNumber: totalRows,
      });
    if (totalRows > rowLimit)
      return t('table.showing_number_rows_of_total', {
        number: rowLimit,
        totalNumber: totalRows,
      });
    if (totalColumns > columnLimit)
      return t('table.showing_number_columns_of_total', {
        number: columnLimit,
        totalNumber: totalColumns,
      });
  };

  return (
    <>
      <Container>
        <TableScroll onScroll={scrollHandler} ref={containerRef}>
          <StyledTable>
            <thead>
              <tr>
                {headerColumns.map((headerColumn, index) => (
                  <th key={index}>
                    <BodyText variant="body2" color={colors.black[500]}>
                      {headerColumn}
                    </BodyText>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, index) => (
                <tr key={index + 1}>
                  {row.slice(0, columnLimit).map((column, index) => (
                    <td key={index}>
                      <BodyText variant="body2" color={colors.black[500]}>
                        {column}
                      </BodyText>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </TableScroll>
        {overflowLeft && <RightShadow />}
        {overflowRight && <LeftShadow />}
      </Container>
      {hasLimitedData && (
        <TableInfo data-testid="limited-data-info">
          <BodyText
            variant="body3"
            fontWeight={'normal'}
            color={transparentize(0.5, colors.black[100])}
          >
            <Trans i18nKey={limitDescription()} />
          </BodyText>
        </TableInfo>
      )}
    </>
  );
};

export default Table;
