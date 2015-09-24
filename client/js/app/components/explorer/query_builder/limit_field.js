/**
 * @jsx React.DOM
 */

var React = require('react');
var Input = require('../../common/input.js');
var ExplorerUtils = require('../../../utils/ExplorerUtils');

var LimitField = React.createClass({

  render: function() {
    return (
      <div className="form-group">
        <Input type="text"
               name="limit"
               label="Limit number of events to extract"
               value={this.props.model.query.latest}
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

module.exports = LimitField;
