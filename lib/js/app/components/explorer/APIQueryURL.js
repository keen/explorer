import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { TIMEZONES } from '../../consts';
import { copyToClipboard } from '../../utils/text';

const mapStateToProps = state => ({
  analysisType: state.ui.analysisType,
});

const mapDispatchToProps = {
};

class APIQueryURL extends Component {
  render() {
    const {
      analysisType,
      queryParams,
      client,
    } = this.props;

    const urlParams = Object.keys(queryParams).map((k) => {
      let queryParamValue = queryParams[k];
      if (!queryParamValue) return null;
      if (Array.isArray(queryParamValue) && !queryParamValue.length) return null;

      if (k === 'timezone') {
        const timezoneOption = TIMEZONES.find(item => item.label === queryParamValue) || {
          label: 'UTC',
          value: 0,
        };
        queryParamValue = timezoneOption.value;
      }

      if (Array.isArray(queryParamValue)) {
        queryParamValue = queryParamValue.map((value) => {
          if ((typeof value === 'object') && (value !== null)) {
            const underscoredObject = {};
            Object.keys(value).forEach((objkey) => {
              const underscoredK = objkey.replace(/(?:^|\.?)([A-Z])/g, (x, y) => `_${y.toLowerCase()}`).replace(/^_/, '');
              underscoredObject[underscoredK] = value[objkey];
            });
            return underscoredObject;
          }
          return value;
        });
      }

      queryParamValue = JSON.stringify(queryParamValue);

      const underscoredK = k.replace(/(?:^|\.?)([A-Z])/g, (x, y) => `_${y.toLowerCase()}`).replace(/^_/, '');
      return `${encodeURIComponent(underscoredK)}=${encodeURIComponent(queryParamValue)}`;
    })
      .filter(item => !!item)
      .join('&')
      .replace(/%22true%22/gi, 'true')
      .replace(/%22false%22/gi, 'false');

    const queryURL = `${client.config.protocol}://${client.config.host}/3.0/projects/${client.config.projectId}/queries/${analysisType}?api_key=${client.config.masterKey}&${urlParams}`;

    return (
      <div
        className='apiQueryUrl'
        onClick={() => copyToClipboard(queryURL)}
        role='presentation'
      >
        <span>API Query URL</span>
        <input type='text' defaultValue={queryURL} />
        <i className='fas fa-copy' />
      </div>
    );
  }
}

APIQueryURL.propTypes = {
  queryParams: PropTypes.shape({ }).isRequired,
  analysisType: PropTypes.string.isRequired,
  client: PropTypes.shape({ }).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(APIQueryURL);
