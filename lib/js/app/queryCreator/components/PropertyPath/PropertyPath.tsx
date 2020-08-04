import React, { FC } from 'react';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import { Container, Wrapper } from './PropertyPath.styles';

type Props = {
  /** Property path */
  path: string[];
};

const PropertyPath: FC<Props> = ({ path }) => {
  const pathLength = path.length;
  return (
    <Container>
      {path.map((slice, idx) => {
        if (idx + 1 < pathLength) {
          return [
            <span key={`${slice}-${idx}`}>{slice}</span>,
            <Wrapper key={`${slice}-${idx}-wrapper`}>
              <Icon
                type="caret-right"
                width={10}
                height={10}
                fill={colors.blue[100]}
              />
            </Wrapper>,
          ];
        }

        return <span key={`${slice}-${idx}`}>{slice}</span>;
      })}
    </Container>
  );
};

export default PropertyPath;
