// @ts-nocheck
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactSelect from './shared/ReactSelect';
import { getThemeForSelect } from '../../utils/style';
import { updateUI } from '../../redux/actionCreators/ui';
import {
  TAB_EXTRACTION_PREVIEW,
  TAB_EXTRACTION_BULK,
  EXTRACTION_PREVIEW_EVENTS_DEFAULT,
  EXTRACTION_PREVIEW_EVENTS_LIMIT,
  EXTRACTION_BULK_EVENTS_DEFAULT,
  EXTRACTION_BULK_EVENTS_LIMIT,
} from '../../consts';

const mapStateToProps = (state) => ({
  extractionFields: state.ui.extractionFields,
  extractionActiveTab: state.ui.extractionActiveTab,
  latest: state.ui.latest,
  email: state.ui.email,
  contentEncoding: state.ui.contentEncoding,
  propertyNames: state.ui.propertyNames,
  schemas: state.collections.schemas,
  eventCollection: state.ui.eventCollection,
});

const mapDispatchToProps = {
  updateUI,
};

class Extraction extends Component {
  componentDidMount() {
    let { latest } = this.props;
    const {
      extractionActiveTab,

      // dispatchers
      updateUI,
    } = this.props;
    let max = EXTRACTION_PREVIEW_EVENTS_LIMIT;
    if (extractionActiveTab === TAB_EXTRACTION_BULK) {
      max = EXTRACTION_BULK_EVENTS_LIMIT;
    }
    if (latest > max) {
      latest = max;
    }
    updateUI({
      latest,
    });
  }

  renderBulkPanel() {
    const { email, contentEncoding, updateUI } = this.props;
    return (
      <div className="bulk-panel">
        <div className="label-main first-label">
          Recipient email address (required)
        </div>
        <input
          type="text"
          className="input-text"
          placeholder="your@email.com"
          value={email}
          name="email"
          onChange={(e) => {
            updateUI({
              email: e.target.value,
            });
          }}
        />
        <div className="line-checkbox line-label">
          <input
            type="checkbox"
            className="input-checkbox"
            value="gzip"
            id="content_encoding"
            name="content_encoding"
            checked={!!contentEncoding}
            onChange={(e) => {
              if (e.target.checked) {
                updateUI({
                  contentEncoding: e.target.value,
                });
                return;
              }
              updateUI({
                contentEncoding: undefined,
              });
            }}
          />
          <label htmlFor="content_encoding">GZIP</label>
        </div>
      </div>
    );
  }

  render() {
    const {
      schemas,
      eventCollection,
      extractionActiveTab,
      propertyNames,
      latest,

      // dispatchers
      updateUI,
    } = this.props;

    const valuesFromState = propertyNames.map((item) => ({
      value: item,
      label: item,
    }));

    const schema = schemas[eventCollection] || {};
    const schemaProps = Object.keys(schema);
    const sortedSchemaProps = schemaProps
      .sort((a, b) => {
        if (a.toLowerCase() < b.toLowerCase()) {
          return -1;
        }
        if (a.toLowerCase() > b.toLowerCase()) {
          return 1;
        }
        return 0;
      })
      .map((item) => ({ label: item, value: item }));

    return (
      <div className="extraction">
        <div className="tabs">
          <div
            className={`tab ${
              extractionActiveTab === TAB_EXTRACTION_PREVIEW ? 'active' : ''
            }`}
            onClick={() =>
              updateUI({
                extractionActiveTab: TAB_EXTRACTION_PREVIEW,
                latest: EXTRACTION_PREVIEW_EVENTS_DEFAULT,
              })
            }
          >
            Preview events
          </div>
          <div
            className={`tab ${
              extractionActiveTab === TAB_EXTRACTION_BULK ? 'active' : ''
            }`}
            onClick={() =>
              updateUI({
                extractionActiveTab: TAB_EXTRACTION_BULK,
                latest: EXTRACTION_BULK_EVENTS_DEFAULT,
              })
            }
          >
            Bulk CSV extraction
          </div>
        </div>
        <div className="tab-content">
          {extractionActiveTab === TAB_EXTRACTION_BULK &&
            this.renderBulkPanel()}

          <div className="label-main first-label">Properties to extract</div>
          <ReactSelect
            value={valuesFromState}
            options={sortedSchemaProps}
            onChange={(selectedValues) => {
              if (!selectedValues) {
                updateUI({
                  propertyNames: [],
                });
                return;
              }
              updateUI({
                propertyNames: selectedValues.map((item) => item.value),
              });
            }}
            placeholder="Filter properties..."
            isMulti={true}
            className="standardUnits"
            theme={getThemeForSelect}
          />

          <div className="label-main">Limit number of events to extract</div>
          <input
            type="number"
            className="input-text"
            value={latest}
            onChange={(e) => {
              let { value } = e.target;
              let max = EXTRACTION_PREVIEW_EVENTS_LIMIT;
              if (extractionActiveTab === TAB_EXTRACTION_BULK) {
                max = EXTRACTION_BULK_EVENTS_LIMIT;
              }
              if (value > max) {
                value = max;
              }
              updateUI({
                latest: value,
              });
            }}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Extraction);
