import _ from 'lodash';
import React from 'react';
import ReactSelect from './react_select.js';
import ProjectUtils from '../../utils/ProjectUtils';
import ExplorerActions from '../../actions/ExplorerActions';

const Timezone = React.createClass({

  handleTimezoneBlur: function() {
    this.setState({ active: false });
    this.refs['timezone-display'].focus();
  },

  handleTimezoneActivated: function(){
    var self = this;
    this.setState({ active: true });
    setTimeout(function(){
      self.refs['timezone'].refs['input'].focus();
      self.refs['timezone'].setState({ visible: true });
    }, 100);
  },

  handleTimezoneChange: function(name, value) {
    var timezones = ProjectUtils.getConstant('TIMEZONES');
    var timezone = timezones.filter(z => z.name === value)[0];
    this.props.handleChange('timezone', timezone ? timezone.name : value);
  },

  // React methods

  getInitialState: function(){
    return { active: false };
  },

  componentDidMount: function() {
    if (!this.props.timezone) {
      this.props.handleChange('timezone', ProjectUtils.getConstant('DEFAULT_TIMEZONE'));
    }
    this.refs['timezone'].setState({ visible: false });
  },

  render: function(){
    return (
      <div className={"timezone-toggle" + (this.state.active ? " active" : "")}>
        <div className="toggle-display">
          <button ref="timezone-display"
                  className="btn btn-link field-secondary-control"
                  title={"Selectd timezone: " + this.props.timezone}
                  type="button"
                  onClick={this.handleTimezoneActivated}>
            <span className="icon glyphicon glyphicon-globe"></span> Timezone: {this.props.timezone}
          </button>
        </div>
        <div className="toggle-options">
          <ReactSelect ref="timezone"
                       name="timezone"
                       classes="timezone form-control"
                       value={this.props.timezone}
                       items={ProjectUtils.getConstant('TIMEZONES').map((z) => z.name)}
                       handleChange={this.handleTimezoneChange}
                       handleBlur={this.handleTimezoneBlur} />
        </div>
      </div>
    );
  }

});

module.exports = Timezone;
