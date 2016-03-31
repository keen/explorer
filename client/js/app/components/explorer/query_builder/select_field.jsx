var React = require('react');
var _ = require('lodash');

// Components
var ReactSelect = require('../../common/react_select.jsx');

var SelectField = React.createClass({

  getDefaultProps: function() {
    return {
      sort: false,
      inputClasses: []
    }
  },

  buildBrowseEventsLink: function() {
    if (this.props.onBrowseEvents) {
      return (
        <button className="btn btn-link field-secondary-control" title="Browse event collections" type="button" onClick={this.props.onBrowseEvents} id="browse-event-collections">
          <span className="icon glyphicon glyphicon-search"></span> Preview collections
        </button>
      );
    }
  },

  // React methods

  render: function() {
    var requiredNote = (this.props.requiredLabel) ? <small>(required)</small> : null;

    return (
      <div className="field-component">
        <label htmlFor={this.props.name}>{this.props.label} {requiredNote}</label>
        <ReactSelect ref="select"
                     name={this.props.name}
                     inputClasses={this.props.inputClasses.join(' ') + ' form-control'}
                     items={this.props.options}
                     handleChange={this.props.handleChange}
                     value={this.props.value}
                     sort={this.props.sort} />
        {this.buildBrowseEventsLink()}
      </div>
    );
  }

});

module.exports = SelectField;
