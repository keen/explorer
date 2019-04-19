import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import {
  copyToClipboard,
  slugify,
} from '../../utils/text';

import {
  updateSavedQueryUI,
  resetSavedQueryUI,
} from '../../redux/actionCreators/ui';

const mapStateToProps = state => ({
  results: state.queries.results,
  chartType: state.ui.chartType,
  uiSavedQuery: state.ui.savedQuery,
});

const mapDispatchToProps = {
  updateSavedQueryUI,
  resetSavedQueryUI,
};

class SavedQuery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  save() {
    this.setState({ error: null });
    const {
      client,
      chartType,
      queryParams,
      uiSavedQuery,
    } = this.props;

    const {
      displayName,
      name,
      refreshRate,
    } = uiSavedQuery;

    if (!displayName) {
      this.setState({ error: 'Name is required' });
      return;
    }

    client
    .put(client.url('queries', 'saved', name))
    .auth(client.masterKey())
    .send({
      query: queryParams,
      metadata: {
        displayName,
        visualization: {
          chartType,
        },
      },
      refreshRate: refreshRate * 60 * 60,
    })
    /*
      .put({
        url: client.url('queries', 'saved', name),
        api_key: client.config.masterKey,
        params: {
          query: queryParams,
          metadata: {
            displayName,
            visualization: {
              chartType,
            },
          },
          refreshRate: refreshRate * 60 * 60,
        },
      })
      */
      .then((res) => {
        this.props.updateSavedQueryUI({
          exists: true,
        });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }
  delete() {
    this.setState({ error: null });

    const {
      client,
      uiSavedQuery,
    } = this.props;

    const {
      name,
    } = uiSavedQuery;

    client
      .del(client.url('queries', 'saved', name))
      .auth(client.masterKey())
      .send()
      .then(res => {
        this.props.resetSavedQueryUI();
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  }

  clone() {
    this.setState({ error: null });
    this.props.resetSavedQueryUI();
  }

  render() {
    const {
      uiSavedQuery,
    } = this.props;

    const {
      error,
    } = this.state;

    const {
      name,
      displayName,
      cache,
      refreshRate,
      exists,
    } = uiSavedQuery;

    const refreshRates = [];
    for (let i = 4; i < 25; i++) {
      refreshRates.push(i);
    }

    return (
      <div className='saved-query'>
        <div>
          <input
            type='text'
            value={displayName}
            onChange={(e) => {
              this.props.updateSavedQueryUI({
                name: slugify(e.target.value),
                displayName: e.target.value,
                exists: false,
              });
            }}
            className=''
          />
          <input
            type='text'
            value={name}
          />
          <a
            className='button-copy'
            onClick={() => copyToClipboard(name)}
          >
            <i className="fas fa-copy"></i>
          </a>
        </div>
        <div>
          <input
            type='checkbox'
            id='inputCheckbox'
            onChange={(e) => {
              this.props.updateSavedQueryUI({
                cache: e.target.checked,
                refreshRate: e.target.checked ? 4 : 0,
              });
            }}
            value='1'
            checked={cache}
          />
          <label htmlFor='inputCheckbox'>Cache</label>
          <a href='https://keen.io/docs/api/#cached-queries' target='_blank'>
            <i className='fas fa-question-circle' />
          </a>

          { cache &&
          <div>
            Refresh interval [hours]
            <Select
              value={refreshRate && {
                label: refreshRate,
                value: refreshRate,
              }}
              options={refreshRates.map(item => ({ label: item, value: item }))}
              onChange={(value) => {
                this.props.updateSavedQueryUI({
                  refreshRate: value.value,
                });
              }}
              className=''
            />
          </div>
          }

        </div>
        { error &&
          <div className='error'>{ error }</div>}
        {
          !exists &&
          <button
            className='button-run-query'
            onClick={() => this.save()}
          >
            Save
          </button>
        }
        {
          exists &&
          <button
            className='button-run-query'
            onClick={() => this.save()}
          >
            Update
          </button>
        }
        {
          exists &&
          <button
            className='button-run-query'
            onClick={() => this.clone()}
          >
            Clone
          </button>
        }
        {
          exists &&
          <button
            className='button-run-query'
            onClick={() => this.delete()}
          >
            Delete
          </button>
        }
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SavedQuery);
