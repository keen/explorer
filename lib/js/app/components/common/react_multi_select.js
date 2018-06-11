import React from 'react';

class ReactMultiSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      id: 'react-multi-select',
      focusedIndex: 0
    }
  }

  interceptEvent(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  // Private Event Handler Methods
  _toggleOpenClose(event) {
    this.interceptEvent(event);

    if(this.state.open) {
      return this.setState({ open: false });
    }
    else {
      this.setState({ open: true })
    }
  }

  _isSelected(itemVal) {
    return this.props.items.filter((item) => {
      if (item.value === itemVal && item.selected) return true;
      return false;
    }).length > 0;
  }

  _handleOptionChange(event) {
    this.interceptEvent(event);
    this.props.handleChange(this.props.name, event.target.text, !this._isSelected(event.target.text));
  }

  _renderOption(option, i) {
    let className = 'react-select-box-option';
    if (i === this.state.focusedIndex) {
      className += ' react-select-box-option-focused'
    }
    if (option.selected) {
      className += ' react-select-box-option-selected'
    }

    return (<a
      id={`${this.state.id}-${i}`}
      className={className}
      href='#'
      onClick={this._handleOptionChange.bind(this)}
      title={option.label}
      key={`${i}_${option.label}`}
    >{option.label}</a>
    )
  }

  // Private HTML Element methods
  _renderOptionMenu() {
    let className = 'react-select-box-options';
    if (!this.state.open) {
      className += ' react-select-box-hidden';
    }

    const options = this.props.items.map((item, i) => {
      return this._renderOption({ value: item.value, selected: item.selected, label: item.value }, i);
    });

    return (<div className={className} ref='menu'>
      {options}
    </div>)
  }

  render() {
    const selectedItems = this.props.items.filter(i => i.selected);
    const label = selectedItems.length > 0 ? selectedItems.map(i => i.value).join(', ') : this.props.label;

    return (<div className='react-select-box-container react-select-box-multi'>
      <button id={this.state.id} onClick={this._toggleOpenClose.bind(this)} className='react-select-box'>
        <div className='react-select-box-label'>{label}</div>
      </button>

      {this._renderOptionMenu()}
    </div>);
  }
}

export default ReactMultiSelect;
