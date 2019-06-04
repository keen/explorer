import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactJson from 'react-json-view';

import {
  updateUI,
} from '../../redux/actionCreators/ui';

import {
  fetchSchema,
} from '../../redux/actionCreators/client';

const mapStateToProps = state => ({
  collectionItems: state.collections.items,
  schemas: state.collections.schemas,

  eventCollection: state.ui.eventCollection,
});

const mapDispatchToProps = {
  updateUI,
  fetchSchema,
};

class PreviewCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
    };
  }

  componentDidMount() {
  //  this.props.fetchSchema();
  }

  updateFilter(e) {
    this.setState({
      filter: e.target.value,
    });
  }

  render() {
    const {
      eventCollection,
      collectionItems,
      schemas,

      fetchSchema,
      updateUI,
    } = this.props;

    const { filter } = this.state;

    const currentSchema = schemas[eventCollection] || {};

    return (
      <div className='preview-collection-content'>
        <div className='list'>
        <input
          className='input-filter'
          placeholder='Filter...'
          type='text'
          value={filter}
          onChange={(e) => this.updateFilter(e)}
        />
          {
            collectionItems
              .filter(item => item.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0)
              .map(({name}) => {
              return <div
              key={name}
              className={
                `item ${eventCollection === name && 'active'}`
              }
              onClick={() => {
                updateUI({
                  eventCollection: name,
                });
                fetchSchema({
                  eventCollection: name,
                });
              }}>
                { name }
              </div>;
            })
          }
        </div>
        <div className='content'>
        <ReactJson
        src={currentSchema}
        style={{
          'fontFamily': 'inherit',
        }}
        collapsed={false}
        displayDataTypes={false} />
        </div>

      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PreviewCollection);
