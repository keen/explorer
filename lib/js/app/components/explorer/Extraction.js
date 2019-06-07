import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactSelect from './shared/ReactSelect';
import { getThemeForSelect } from '../../utils/style';
import { updateUI } from '../../redux/actionCreators/ui';

const mapStateToProps = state => (
  {
    extractionFields: state.ui.extractionFields,
    extractionActiveTab: state.ui.extractionActiveTab,
    latest: state.ui.latest,
    email: state.ui.email,
    propertyNames: state.ui.propertyNames,
    schemas: state.collections.schemas,
    eventCollection: state.ui.eventCollection,
  }
);

const mapDispatchToProps = {
  updateUI,
};

import {
  TAB_EXTRACTION_PREVIEW,
  TAB_EXTRACTION_BULK,
  EXTRACTION_PREVIEW_EVENTS_LIMIT,
  EXTRACTION_BULK_EVENTS_DEFAULT,
  EXTRACTION_BULK_EVENTS_LIMIT,
} from '../../consts';

class Extraction extends Component {
  renderBulkPanel() {
    const {
      email,
      latest,
      updateUI,
    } = this.props;
    return (
      <div className='bulk-panel'>
        <div className='label first-label'>
          Recipient email address (required)
        </div>
        <input
          type='text'
          className='input-text'
          placeholder='your@email.com'
          value={email}
          onChange={(e) => {
            updateUI({
              email: e.target.value,
            });
          }}
        />
        <div className='label'>
          Limit number of events to extract
        </div>
        <input
          type='number'
          className='input-text'
          value={latest}
          onChange={(e) => {
            let value = e.target.value;
            if (value > EXTRACTION_BULK_EVENTS_LIMIT) {
              value = EXTRACTION_BULK_EVENTS_LIMIT;
            }
            updateUI({
              latest: value,
            });
          }}
        />
        <div className='label'>
          Results are limited to 10 million events
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
      updateUI,
    } = this.props;

    const valuesFromState = propertyNames.map(item => {
      return {
        value: item,
        label: item,
      }
    });

    const schema = schemas[eventCollection] || {};

    return (
      <div className='extraction'>
          <div className='tabs'>
            <div className={`tab ${extractionActiveTab === TAB_EXTRACTION_PREVIEW ? 'active' : '' }`}
              onClick={() => updateUI({
                extractionActiveTab: TAB_EXTRACTION_PREVIEW,
                latest: EXTRACTION_PREVIEW_EVENTS_LIMIT,
              })}>Preview 100 events</div>
            <div className={`tab ${extractionActiveTab === TAB_EXTRACTION_BULK ? 'active' : '' }`}
              onClick={() => updateUI({
                extractionActiveTab: TAB_EXTRACTION_BULK,
                latest: EXTRACTION_BULK_EVENTS_DEFAULT,
              })}>Bulk CSV extraction</div>
          </div>
          <div className='tab-content'>

          {
            extractionActiveTab === TAB_EXTRACTION_BULK && this.renderBulkPanel()
          }

          <ReactSelect
            value={valuesFromState}
            options={Object.keys(schema).map(item => ({ label: item, value: item }))}
            onChange={(selectedValues) => {
              updateUI({
                propertyNames: selectedValues.map(item => item.value),
              });
            }}
            placeholder='Filter properties...'
            isMulti={true}
            className='standardUnits'
            theme={getThemeForSelect}
          />
          </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Extraction);
