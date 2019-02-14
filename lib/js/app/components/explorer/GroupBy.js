import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

import { fetchSchema, query } from '../../redux/actionCreators/client';
import { updateUI } from '../../redux/actionCreators/ui';

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    collections: state.collections
  }
};

const mapDispatchToProps = { fetchSchema, updateUI };

class GroupBy extends Component {
  constructor(props){
    super(props);

    this.state = {
      selectedGroupBy: []
    };
  }

  componentDidMount(){
    this.onChange();
  }

  onChange(){
    const {
      selectedGroupBy
    } = this.state;

    if (selectedGroupBy.length) {
      const groupBy = [selectedGroupBy[0].value]
      this.props.onChange(groupBy);
    }
  }

  render(){
    const { activeTab } = this.state;
    const { schemaProperties } = this.props;

    return (
      <div className='groupBy'>
          <div className='tabContent'>
          <div className='tab'>
            <Select
              value={this.state.selectedGroupBy[0]}
              options={Object.keys(this.props.collections.schema).map(item => ({ label: item, value: item }) )}
              onChange={ (selectedGroupBy) => {
                this.setState({ selectedGroupBy: [selectedGroupBy] }, () => {
                  this.onChange();
                })
              }}
              className='standardUnits'
            />

          </div>
          </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupBy);
