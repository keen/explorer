/**
 * @jsx React.DOM
 */

var React = require('react');
var Input = require('../../common/input.js');
var ExplorerUtils = require('../../../utils/ExplorerUtils');

var LimitField = React.createClass({

  render: function() {
    return (
      <div>
        <Input type="text"
               name="limit"
               label="Limit number of events to extract"
               value={this.props.model.query.latest}
               placeholder="Eg: 1000"
               onChange={this.props.handleChange} />
        <p className="no-padding no-margin subdued">
          <span className="icon glyphicon glyphicon-info-sign margin-right-tiny"></span>
          <span>{'Email extractions are limited to 10 million events.'}</span>
        </p>
      </div>
    );
  }

});

module.exports = LimitField;
