var React = require('react');
var Input = require('../../common/input.jsx');
var ExplorerUtils = require('../../../utils/ExplorerUtils');

var LatestField = React.createClass({

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

module.exports = LatestField;
