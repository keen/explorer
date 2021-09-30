import React, { FC } from 'react';
import { transparentize } from 'polished';
import { useTranslation } from 'react-i18next';
import { BodyText } from '@keen.io/typography';
import { colors } from '@keen.io/colors';

import { StyledTable, TableInfo } from './Table.styles';

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

  const totalColumns = data[0].length;
  const totalRows = data.length - 1;

  return (
    <div>
      <BodyText variant="body2" color={colors.black[500]}>
        <StyledTable>
          <thead>
            <tr>
              {headerColumns.map((headerColumn, index) => (
                <th key={index}>{headerColumn}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bodyRows.map((row, index) => (
              <tr key={index + 1}>
                {row.slice(0, columnLimit).map((column, index) => (
                  <td key={index}>{column}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </BodyText>
      <TableInfo>
        <BodyText
          variant="body3"
          fontWeight={'normal'}
          color={transparentize(0.5, colors.black[100])}
        >
          {totalRows > rowLimit &&
            t('table.rows_number', { number: totalRows })}
          {totalRows > rowLimit && totalColumns > columnLimit && ' x '}
          {totalColumns > columnLimit &&
            t('table.columns_number', { number: totalColumns })}
        </BodyText>
      </TableInfo>
    </div>
  );
};

export default Table;
