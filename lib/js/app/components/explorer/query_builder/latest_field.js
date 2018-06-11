import React from 'react';
import Input from '../../common/input.js';
import ExplorerUtils from '../../../utils/ExplorerUtils';

const LatestField = React.createClass({

  render: function() {
    return (
      <div className="form-group">
        <Input type="text"
               name="latest"
               label="Limit number of events to extract"
               value={this.props.latest}
               placeholder="Eg: 1000"
               onChange={this.props.handleChange} />
        <small className="text-muted">
          <span className="icon glyphicon glyphicon-info-sign"></span>
          <span>{'Results are limited to 10 million events'}</span>
        </small>
      </div>
    );
  }

});

export default LatestField;
