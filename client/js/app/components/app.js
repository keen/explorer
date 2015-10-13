var React = require('react');
var Loader = require('./common/loader.js');
var ProjectUtils = require('../utils/ProjectUtils');
var ProjectStore = require('../stores/ProjectStore');
var Explorer = require('./explorer/index.js');

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
