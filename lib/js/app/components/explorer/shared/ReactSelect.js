
import React from 'react';
import Select, { createFilter } from 'react-select';
import Option from './Option';

const ReactSelect = (props) => {
  if (props.options.length > 200) {
    return (
      <Select
        components={{
          Option,
        }}
        filterOption={createFilter({ ignoreAccents: false })} 
        {...props}
      />
    );
  }

  return (
    <Select
      {...props}
    />
  )
}

export default ReactSelect;