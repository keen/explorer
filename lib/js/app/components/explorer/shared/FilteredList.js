import React, { Component } from 'react';

class FilteredList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
    };
  }

  updateFilter(e) {
    this.setState({
      filter: e.target.value,
    });
  }

  render() {
    const {
      items,
      activeItem,
    } = this.props;

    const { filter } = this.state;

    return (
      <div className='filtered-list'>
        <input
          className='input-filter'
          placeholder='Search...'
          type='text'
          value={filter}
          onChange={(e) => this.updateFilter(e)}
        />
          {
            items
              .filter(item => item.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0)
              .map(({name}) => {
              return <div
              key={name}
              className={
                `item ${activeItem === name && 'active'}`
              }
              onClick={() => {
                this.props.onClick(name);
              }}>
                { name }
              </div>;
            })
          }
      </div>
    );
  }
}

export default FilteredList;
