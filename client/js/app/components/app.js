var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Loader = require('./common/loader.js');
var ProjectUtils = require('../utils/ProjectUtils');
var ProjectStore = require('../stores/ProjectStore');

function getProjectState() {
  return {
    project: ProjectStore.getProject()
  };
}

var App = React.createClass({

	componentDidMount: function() {
    ProjectStore.addChangeListener(this._onChange);
    if (this.state.project) {
      ProjectUtils.fetchProjectSchema(this.state.project);
    }
	},

  componentWillUnmount: function() {
    ProjectStore.removeChangeListener(this._onChange);
  },

	getInitialState: function() {
		return getProjectState();
	},

  render: function () {
    return (
    	<div id="keen-explorer">
    		<Loader visible={this.state.project.loading} additionalClasses="app-loader" />
        <RouteHandler project={this.state.project}
                      config={this.props.config}
                      client={this.props.config.client}
                      persistence={this.props.config.persistence} />
      </div>
    );
  },

  _onChange: function() {
    this.setState(getProjectState());
  }

});

module.exports = App;
