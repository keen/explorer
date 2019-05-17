import React, { Component } from 'react';

export default class Foldable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.defaultActive,
    };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.defaultActive && this.props.defaultActive) {
      this.setState({
        active: this.props.defaultActive,
      });
    }

    if (prevProps.defaultActive && !this.props.defaultActive) {
      this.setState({
        active: this.props.defaultActive,
      });
    }
  }

  onChange() {
    const { onClose, onChange, onDelete } = this.props;
    const { active } = this.state;
    if (onChange) {
      onChange(active);
    }
    if (onClose && !active) {
      onClose();
    }
  }

  render() {
    const { title, onDelete } = this.props;
    const { active } = this.state;

    return (
      <div
        className={
          `foldable ${active && 'foldableActive'}`
        }>
        <div
          className='title'
          onClick={ () => {
             this.setState({ active: !active },
             () => this.onChange() );
           } }
         >
           <span>{ title }</span>
           <div className='icon'>
           <div
             onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className='button button-delete'>
             <i className='fas fa-times' />
           </div>
           </div>
         </div>
         { active &&
           <div className='content'>
            {this.props.children}
           </div>
        }
      </div>
    )
  }
}
