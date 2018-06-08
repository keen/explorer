import React from 'react';
import _ from 'lodash';

// Components
import Input from '../../common/input.js';

const PercentileField = React.createClass({

  // React methods

  render: function() {
    return (
      <div className="field-component">
        <Input ref="input"
               label="Percentile Value"
               classes="percentile"
               name="percentile"
               required="true"
               placeholder="Ex: 50"
               onChange={this.props.onChange}
               value={this.props.value || ""} />
      </div>
    );
  }

});

module.exports = PercentileField;
