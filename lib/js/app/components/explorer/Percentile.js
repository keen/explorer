import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateUI } from '../../redux/actionCreators/ui';

const mapStateToProps = state => (
  {
    percentile: state.ui.percentile,
  }
);

const mapDispatchToProps = {
  updateUI,
};

class Percentile extends Component {
  render() {
    const {
      percentile = '',
      updateUI,
    } = this.props;

    return (
      <div className='percentile'>
        <div className='label-main'>
          Percentile value
        </div>
        <input
          type='number'
          className='input-text'
          value={percentile}
          placeholder='Ex. 33'
          onChange={(e) => {
            let value = e.target.value;
            if (value > 100) {
              value = 100;
            }
            updateUI({
              percentile: value,
            });
          }}
        />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Percentile);
