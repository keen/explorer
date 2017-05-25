var React = require('react');

class ReactMultiSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      id: 'react-multi-select',
      focusedIndex: 0,
      selected: []
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

  _handleOptionChange(event) {
    this.interceptEvent(event);
    var selectedItem = event.target.text;
    var selectedIndex = this.state.selected.indexOf(selectedItem);
    var selected = this.state.selected;

    if (selectedIndex > -1) {
      selected.splice(selectedIndex, 1);
    }
    else {
      selected.push(selectedItem);
    }

    this.setState({ selected: selected });
  }

  _renderOption(option, i) {
    var className = 'react-select-box-option';
    if (i === this.state.focusedIndex) {
      className += ' react-select-box-option-focused'
    }
    if (this.state.selected.indexOf(option.value) > -1) {
      className += ' react-select-box-option-selected'
    }

    return (<a
      id={`${this.state.id}-${i}`}
      className={className}
      href='#'
      onClick={this._handleOptionChange.bind(this)}
    >{option.label}</a>
    )
  }

  // Private HTML Element methods
  _renderOptionMenu() {
    var className = 'react-select-box-options';
    if (!this.state.open) {
      className += ' react-select-box-hidden';
    }

    var options = React.Children.map(this.props.items, function(item, i) {
      return this._renderOption({ value: item, label: item }, i);
    }.bind(this));

    return (<div className={className} ref='menu'>
      {options}
    </div>)
  }

  render() {
    var label = this.state.selected.length > 0 ? this.state.selected.join(', ') : 'Select a field';

    return (<div className='react-select-box-multi react-select-box-container'>
      <div>
        <button id={this.state.id} onClick={this._toggleOpenClose.bind(this)} className='react-select-box' />
        <div className='react-select-box-label'>{label}</div>
      </div>
      {this._renderOptionMenu()}
    </div>);
  }
}

module.exports = ReactMultiSelect;
