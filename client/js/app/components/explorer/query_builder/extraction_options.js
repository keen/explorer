const React = require('react');
const ExplorerUtils = require('../../../utils/ExplorerUtils');
const Input = require('../../common/input.js');
const ReactMultiSelect = require('../../common/react_multi_select.js');
const LatestField = require('./latest_field.js');
const ExplorerActions = require('../../../actions/ExplorerActions');

class ExtractionOptions extends React.Component {

  _getExtractionKeys() {
    if (typeof this.props.projectSchema === "undefined") {
      return false;
    }
    const schema = this.props.projectSchema[this.props.model.query.event_collection];
    if (typeof schema === "undefined") {
      return false;
    }

    return schema.sortedProperties;
  }

  render(){
    let emailField;
    let latestField;
    let extractionPropertiesFilter;

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

    if (this._getExtractionKeys()) {
      extractionPropertiesFilter = <ReactMultiSelect
            name="filter-properties"
            model={this.props.model}
            label="Filter extraction properties"
            handleChange={ExplorerActions.changeExtractionFields}
            items={this._getExtractionKeys()}
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
}

module.exports = ExtractionOptions;
