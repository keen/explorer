import React from 'react';
import ExplorerUtils from '../../../utils/ExplorerUtils';
import Input from '../../common/input.js';
import ReactMultiSelect from '../../common/react_multi_select.js';
import LatestField from './latest_field.js';

class ExtractionOptions extends React.Component {

  _getExtractionKeys() {
    if (typeof this.props.projectSchema === "undefined") {
      return false;
    }

    const schema = this.props.projectSchema[this.props.event_collection];
    if (typeof schema === "undefined") {
      return false;
    }

    if (!schema.sortedProperties || !schema.sortedProperties.length) {
      return false;
    }

    return schema.sortedProperties.map((property) => {
      return {
        value: property,
        selected: this.props.property_names && this.props.property_names.indexOf(property) > -1
      }
    });
  }

  _handlePropertyNamesChange(name, propertyName, shouldBeSelected) {
    let newPropertyNames = this.props.property_names.slice(0);
    if (shouldBeSelected) {
      newPropertyNames.push(propertyName);
    } else {
      newPropertyNames = newPropertyNames.filter((name) => {
        return name !== propertyName;
      });
    }
    this.props.handleChange(name, newPropertyNames);
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
               onChange={this.props.handleChangeWithEvent} />
      );
      latestField = (
        <LatestField latest={this.props.latest} handleChange={this.props.handleChangeWithEvent} />
      );
    }

    if (this._getExtractionKeys()) {
      extractionPropertiesFilter = <ReactMultiSelect
            name="property_names"
            label="Filter extraction properties"
            handleChange={this._handlePropertyNamesChange.bind(this)}
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

export default ExtractionOptions;
