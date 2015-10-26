/**
 * @jsx React.DOM
 */

var React = require('react');
var ExplorerUtils = require('../../../utils/ExplorerUtils');
var Input = require('../../common/input.js');
var LatestField = require('./latest_field.js');

var ExtractionOptions = React.createClass({

  render: function(){
    var emailField,
        latestField;

    if (ExplorerUtils.isEmailExtraction(this.props.model)) {
      emailField = (
        <Input type="text"
               name="email"
               label="Recipient email address"
               placeholder="your@email.com"
               required="true"
               value={this.props.model.query.email}
               onChange={this.props.handleChange} />
      );
      latestField = (
        <LatestField model={this.props.model} handleChange={this.props.handleChange} />
      );
    }

    return (
      <div className="field-component">
        <div className="extraction-options">
          <label>
            <input type="radio" name="extraction_type" value="immediate" onChange={this.props.setExtractionType} checked={!ExplorerUtils.isEmailExtraction(this.props.model)}/> Preview lastest {ExplorerUtils.EXRACTION_EVENT_LIMIT} events now
          </label>
          <label>
            <input type="radio" name="extraction_type" value="email" onChange={this.props.setExtractionType} checked={ExplorerUtils.isEmailExtraction(this.props.model)}/> Bulk CSV extraction by email
          </label>
          {emailField}
          {latestField}
        </div>
      </div>
    );
  }

});

module.exports = ExtractionOptions;
