var React = require('react');
var ExplorerUtils = require('../../../utils/ExplorerUtils');
var Input = require('../../common/input.js');
var LatestField = require('./latest_field.js');

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
          <br />

          {emailField}
          {latestField}
          {extractionPropertiesFilter}
        </div>
      </div>
    );
  }

});

var ReactMultiSelect = require('../../common/react_multi_select.js');
var ExplorerActions = require('../../../actions/ExplorerActions');

var ExtractionPropertiesFilter = React.createClass({

  _getKeys: function() {
    var keys = _.keys(this.props.result);
    var keyList = _.map(keys, function(key) {
      return key;
    });

    return keyList;
  },

  render: function() {
    return (<ReactMultiSelect
      name="filter-properties"
      label="Filter extraction properties"
      handleChange={ExplorerActions.changeExtractionFields}
      items={this._getKeys()}
    />);
  }

});


module.exports = ExtractionOptions;
