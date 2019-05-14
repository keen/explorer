import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

import { updateUI } from '../../redux/actionCreators/ui';

const mapStateToProps = state => (
  {
    extractionFields: state.ui.extractionFields,
    extractionActiveTab: state.ui.extractionActiveTab,
    latest: state.ui.latest,
    email: state.ui.email,
    propertyNames: state.ui.propertyNames,
    schema: state.collections.schema,
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
} from '../consts';

class Extraction extends Component {

  renderCustom() {
    const { interval = '__days', updateUI } = this.props;
    const numberOfUnits = interval.split('_')[1];
    const selectedCustomInterval = interval.split('_')[2];

    return (
      <div className='tab line'>
        <div className='title'>Every</div>
        <input
          type='number'
          value={numberOfUnits}
          onChange={
            (e) => {
              updateUI({
                interval: `every_${e.target.value}_${selectedCustomInterval}`,
              });
            }
          }
          placeholder=''
          className='inputNumber'
        />
        <Select
          value={{
            label: selectedCustomInterval,
            value: selectedCustomInterval,
          }}
          options={TIME_UNITS.map(item => ({ label: item, value: item }))}
          onChange={(selectedCustomInterval) => {
            updateUI({
              interval: `every_${numberOfUnits}_${selectedCustomInterval.value}`,
            });
          }}
          className='timeUnits'
          />
    </div>
    );
  }

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
      extractionActiveTab,
      propertyNames,
      updateUI,
      schema,
    } = this.props;

    const valuesFromState = propertyNames.map(item => {
      return {
        value: item,
        label: item,
      }
    });

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

          <Select
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
