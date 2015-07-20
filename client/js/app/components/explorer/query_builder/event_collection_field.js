/**
 * @jsx React.DOM
 */

var React = require('react');
var _ = require('lodash');

// Components
var ReactSelect = require('../../common/react_select.js');

var EventCollectionField = React.createClass({

  // React methods

  render: function() {
    return (
      <div className="field-component">
        <label htmlFor="event_collection">Event Collection</label>
        <ReactSelect ref="select"
                     name="event_collection"
                     inputClasses="event-collection form-control"
                     id="event_collection"
                     items={this.props.options}
                     handleChange={this.props.handleChange}
                     value={this.props.value}
                     title="Event Collection"
                     sort={true} />
        <button className="btn btn-link field-secondary-control" title="Browse event collections" type="button" onClick={this.props.onBrowseEvents}>
          <span className="icon glyphicon glyphicon-search"></span> Preview collections
        </button>
      </div>
    );
  }

});

module.exports = EventCollectionField;
