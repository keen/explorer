/**
 * @jsx React.DOM
 */

var React = require('react');
var ExplorerUtils = require('../../../utils/ExplorerUtils');
var Input = require('../../common/input.js');

var ExtractionOptions = React.createClass({

  handleSelectionWithEvent: function(event) {
    this.props.handleChange(event.target.name, event.target.value);
  },

  render: function(){
    var emailField,
        limitField;

    if (ExplorerUtils.isEmailExtraction(this.props.model)) {
      emailField = (
        <Input type="text"
               name="email"
               label="Recipient email address"
               placeholder="your@email.com"
               required="true"
               value={this.props.model.query.email}
               onChange={this.handleSelectionWithEvent} />
      );
      limitField = (
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
          {limitField}
        </div>
      </div>
    );
  }

});

module.exports = ExtractionOptions;
