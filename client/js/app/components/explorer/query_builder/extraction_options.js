var React = require('react');
var ExplorerUtils = require('../../../utils/ExplorerUtils');
var Input = require('../../common/input.js');
var LatestField = require('./latest_field.js');
var ExtractionPropertiesFilter = require('./extraction_properties_filter');

var ExtractionOptions = React.createClass({

  render: function(){
    var emailField,
        latestField,
        extractionPropertiesFilter;

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

    if (this.props.model.response) {
      extractionPropertiesFilter = <ExtractionPropertiesFilter
        result={this.props.model.response.result[0]}
        model={this.props.model}
      />
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
          {extractionPropertiesFilter}
        </div>
      </div>
    );
  }

});

module.exports = ExtractionOptions;
