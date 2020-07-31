import React, { FC, useMemo } from 'react';

import { DATA_TYPES } from '../../constants';

type Props = {};

const PropertyType: FC<Props> = () => {

  const dataTypes = useMemo(() => Object.keys(DATA_TYPES).map((item) => ({
    label: DATA_TYPES[item],
    value: DATA_TYPES[item],
  })), [])

  return (
    <div>
        property type

        
    </div>
  );

};

export default PropertyType;
