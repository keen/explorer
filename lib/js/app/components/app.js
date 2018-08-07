import React from 'react';
import Loader from './common/loader.js';
import ProjectStore from '../stores/ProjectStore';
import AppStateStore from '../stores/AppStateStore';
import Explorer from './explorer/index.js';

function getProjectState() {
  return {
    project: ProjectStore.getProject(),
    app: AppStateStore.getState()
  };
}

const App = React.createClass({

	componentDidMount: function() {
    ProjectStore.addChangeListener(this._onChange);
    AppStateStore.addChangeListener(this._onChange);
	},

  componentWillUnmount: function() {
    ProjectStore.removeChangeListener(this._onChange);
    AppStateStore.addChangeListener(this._onChange);
  },

	getInitialState: function() {
		return getProjectState();
	},

  render: function () {
    return (
      <div id="keen-explorer">
        <Loader visible={this.state.project.loading || !this.state.app.ready} additionalClasses="app-loader" />
        <Explorer project={this.state.project}
                  client={this.props.client}
                  persistence={this.props.persistence}
                  config={this.props.config}/>
      </div>
    );
  },

  _onChange: function() {
    this.setState(getProjectState());
  }

});

export default App;
