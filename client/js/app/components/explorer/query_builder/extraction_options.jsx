var React = require('react');
var ExplorerUtils = require('../../../utils/ExplorerUtils');
var Input = require('../../common/input.jsx');
var LatestField = require('./latest_field.jsx');

var ExtractionOptions = React.createClass({

  render: function(){
    var emailField,
        latestField;

    if (this.props.isEmail) {
      emailField = (
        <Input type="text"
               name="email"
               label="Recipient email address"
               placeholder="your@email.com"
               required="true"
               value={this.props.email}
               onChange={this.props.handleChange} />
      );
      latestField = (
        <LatestField latest={this.props.latest} handleChange={this.props.handleChange} />
      );
    }

    return (
      <div className="field-component">
        <div className="extraction-options">
          <label>
            <input type="radio" name="extraction_type" value="immediate" onChange={this.props.setExtractionType} checked={!this.props.isEmail}/> Preview latest {ExplorerUtils.EXRACTION_EVENT_LIMIT} events now
          </label>
          <label>
            <input type="radio" name="extraction_type" value="email" onChange={this.props.setExtractionType} checked={this.props.isEmail}/> Bulk CSV extraction by email
          </label>
          {emailField}
          {latestField}
        </div>
      </div>
    );
  }

});

module.exports = ExtractionOptions;
