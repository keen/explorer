// @ts-nocheck
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import { getThemeForSelect } from '../../utils/style';

import LoadingSpinner from './shared/LoadingSpinner';
import InfoIcon from './shared/InfoIcon';

import { copyToClipboard, slugify } from '../../utils/text';

import { convertFilterValuesToJsonValues } from '../../utils/filter';

import {
  updateSavedQueryUI,
  resetSavedQueryUI,
} from '../../redux/actionCreators/ui';

import { saveQuery, deleteQuery } from '../../redux/actionCreators/client';

const mapStateToProps = (state) => ({
  isSavingQuery: state.queries.isSavingQuery,
  results: state.queries.results,
  analysisType: state.ui.analysisType,
  chartType: state.ui.chartType,
  uiSavedQuery: state.ui.savedQuery,
  uiStepLabels: state.ui.stepLabels,
  isLimited: state.queries.isLimited,
});

const mapDispatchToProps = {
  updateSavedQueryUI,
  resetSavedQueryUI,
  saveQuery,
  deleteQuery,
};

class SavedQuery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      tooltip: false,
    };
  }

  save() {
    this.setState({ error: null });
    const {
      chartType,
      queryParams,
      uiSavedQuery,
      uiStepLabels,
      analysisType,
    } = this.props;

    const { displayName, name, refreshRate, cache } = uiSavedQuery;

    if (!displayName) {
      this.setState({ error: 'Name is required' });
      return;
    }

    if (analysisType === 'extraction' && queryParams.propertyNames) {
      delete queryParams.propertyNames;
    }

    let stepLabels;
    if (analysisType === 'funnel') {
      if (uiStepLabels && uiStepLabels.length && uiStepLabels[0]) {
        stepLabels = uiStepLabels;
      }
      queryParams.eventCollection = undefined;
      queryParams.filters = undefined;
      queryParams.timeframe = undefined;
      queryParams.timezone = undefined;
    }

    if (!isNaN(queryParams.percentile)) {
      queryParams.percentile = parseInt(queryParams.percentile);
    }

    this.props.saveQuery({
      name,
      body: {
        query: convertFilterValuesToJsonValues(queryParams),
        metadata: {
          displayName,
          visualization: {
            chartType,
            stepLabels,
          },
        },
        refreshRate: refreshRate * 60 * 60,
      },
    });
  }

  delete() {
    if (confirm('Delete this query?')) {
      this.setState({ error: null });

      const { uiSavedQuery } = this.props;

      const { name } = uiSavedQuery;

      this.props.deleteQuery({
        name,
      });
    }
  }

  clone() {
    this.setState({ error: null });
    this.props.resetSavedQueryUI();
  }

  tooltip(value) {
    this.setState({ tooltip: value });
  }

  render() {
    const { uiSavedQuery, isSavingQuery, isLimited } = this.props;

    const { error, tooltip } = this.state;

    const { name, displayName, cache, refreshRate, exists } = uiSavedQuery;

    const refreshRates = [];
    for (let i = 4; i < 49; i++) {
      refreshRates.push(i);
    }

    return (
      <div className="saved-query">
        <div>
          <input
            className="input-name"
            placeholder="Give your query a name..."
            type="text"
            value={displayName}
            onChange={(e) => {
              this.props.updateSavedQueryUI({
                name: slugify(e.target.value),
                displayName: e.target.value,
                exists: false,
              });
            }}
          />
          {name && (
            <div className="resource-name">
              <div className="line line-label">Saved query resource name:</div>
              <div className="line">
                <span className="name">{name}</span>

                <a
                  className="button-copy"
                  onClick={() => copyToClipboard(name)}
                >
                  <i className="fas fa-copy"></i>
                </a>
              </div>
            </div>
          )}
        </div>
        <div className="cache">
          <div className="line-checkbox">
            <div>
              <input
                type="checkbox"
                id="cacheInput"
                disabled={isLimited && !cache}
                checked={cache}
                onChange={(e) => {
                  this.props.updateSavedQueryUI({
                    cache: !cache,
                    refreshRate: !cache ? 4 : 0,
                  });
                }}
              />
              <label
                htmlFor="cacheInput"
                style={{ color: isLimited && !cache && '#DCDCDC' }}
              >
                Cache
              </label>
            </div>
            {isLimited && (
              <div className="cache-limit">
                <span>Cached queries limit</span>
                <div
                  onMouseOver={() => this.tooltip(true)}
                  onFocus={() => 0}
                  onMouseLeave={() => this.tooltip(false)}
                >
                  <InfoIcon width="15px" height="15px" fill="#27566D" />
                  {tooltip && (
                    <div className="tooltip">
                      <p>
                        You have reached the limit of cached queries for your
                        organization (5 cached queries).
                      </p>
                      <p>
                        Disable caching for other queries or contact us to
                        extend the plan at <b>team@keen.io</b>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {cache && (
            <div className="cache-refresh">
              <div className="label-main">Refresh interval [hours]</div>
              <Select
                value={
                  refreshRate && {
                    label: refreshRate,
                    value: refreshRate,
                  }
                }
                options={refreshRates.map((item) => ({
                  label: item,
                  value: item,
                }))}
                onChange={(value) => {
                  this.props.updateSavedQueryUI({
                    refreshRate: value.value,
                  });
                }}
                theme={getThemeForSelect}
              />
            </div>
          )}
        </div>
        {error && <div className="error">{error}</div>}
        <div className="buttons">
          {!exists && (
            <button
              className="button-save button-with-loading-spinner"
              onClick={() => this.save()}
              data-tracker="saveQuery"
            >
              {isSavingQuery && <LoadingSpinner />}
              Save
            </button>
          )}
          {exists && (
            <button
              className="button-save button-with-loading-spinner"
              onClick={() => this.save()}
              data-tracker="saveQuery"
            >
              {isSavingQuery && <LoadingSpinner />}
              Update
            </button>
          )}
          {exists && (
            <button
              className="button button-clone"
              onClick={() => this.clone()}
            >
              Clone
            </button>
          )}
          {exists && (
            <button
              className="button button-delete"
              onClick={() => this.delete()}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedQuery);
