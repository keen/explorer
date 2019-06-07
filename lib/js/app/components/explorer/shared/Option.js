import React from 'react';

const Option = (props) => {
  // Fix https://github.com/JedWatson/react-select/issues/3128#issuecomment-439207355
  const { onMouseMove, onMouseOver, ...newInnerProps } = props.innerProps;

  return (
    <div
      className='react-select-option'
      selected={props.isFocused}
      style={{ }}
      {...newInnerProps}
    >
      {props.children}
    </div>
  );
}

export default Option;