import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

import { fetchSchema, query } from '../../redux/actionCreators/client';
import { updateUI } from '../../redux/actionCreators/ui';

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    collections: state.collections,
    ui: state.ui
  }
};

const mapDispatchToProps = { fetchSchema, updateUI };

class SelectTargetProperty extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: props.ui.targetProperty
    };
  }
  fetchSchema(){
    if (this.props.eventCollection) {
      this.setState({ value: null });
      this.props.updateUI({ targetProperty: null });
      this.props.fetchSchema({ collection: this.props.eventCollection });
    }
  }
  render(){
    return (
      <Fragment>
        <div className='label'>Target property</div>
        <Select
          value={{
            label: this.props.ui.targetProperty,
            value: this.props.ui.targetProperty
          }}
          options={
            Object.keys(this.props.collections.schema).map(item => ({ label: item, value: item }) )
          }
          onChange={
            (value) => {
              // this.setState({ value });
              this.props.updateUI({ targetProperty: value.value });
            }
          }
        />
      </Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectTargetProperty);
