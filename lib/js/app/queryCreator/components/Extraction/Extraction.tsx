import React,{ FC } from 'react';
import { useDispatch } from 'react-redux';

import PropertyNames from '../PropertyNames';

import { setPropertyNames } from '../../modules/query';

type Props = {
  /** Events collection identifer */
  collection: string;
};

const Extraction: FC<Props> = ({
  collection,
}) => {
  const dispatch = useDispatch();

  return (
    <div>
      extraction
      <PropertyNames collection={collection} onSelect={(properties) => dispatch(setPropertyNames(properties))} />
    </div>
  );
};

export default Extraction;
