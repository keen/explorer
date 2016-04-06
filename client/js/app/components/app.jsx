var React = require('react');
var Loader = require('./common/loader.jsx');
var ProjectStore = require('../stores/ProjectStore');
var AppStateStore = require('../stores/AppStateStore');
var Explorer = require('./explorer/index.jsx');

function getProjectState() {
  return {
    project: ProjectStore.getProject(),
    app: AppStateStore.getState()
  };
}

var App = React.createClass({

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
                  persistence={this.props.persistence} />
      </div>
    );
  },

  _onChange: function() {
    this.setState(getProjectState());
  }

});

module.exports = App;
