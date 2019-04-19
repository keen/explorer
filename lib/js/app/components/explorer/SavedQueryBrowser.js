import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  updateSavedQueryUI,
  resetSavedQueryUI,
  updateSavedQueryBrowserUI,
} from '../../redux/actionCreators/ui';

const mapStateToProps = state => ({
  uiSavedQueryBrowser: state.ui.savedQueryBrowser,
  uiSavedQuery: state.ui.savedQuery,
});

const mapDispatchToProps = {
  updateSavedQueryBrowserUI,
  updateSavedQueryUI,
  resetSavedQueryUI,
};

class SavedQueryBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  componentDidMount() {
    const {
      client,
      uiSavedQuery,
      updateSavedQueryBrowserUI,
    } = this.props;

    client
  .get(client.url('queries', 'saved'))
  .auth(client.masterKey())
  .send()
  .then(res => {
    updateSavedQueryBrowserUI({
      items: res
    });
  })
  .catch(error => {
    this.setState({error: error.message});
  });
  }


  render() {
    const {
      uiSavedQueryBrowser,
    } = this.props;

    const { error } = this.state;

    const {
      items,
    } = uiSavedQueryBrowser;

    return (
      <div className='saved-query'>
      { error && <div className='error'>{error}</div>}
      { items && items.forEach(item => <div>{item.query_name}</div>)}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SavedQueryBrowser);
