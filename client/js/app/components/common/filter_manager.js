/**
 * @jsx React.DOM
 */

var _ = require('lodash');
var React = require('react');
var Filter = require('./filter.js');
var Modal = require('./modal.js');

var ExplorerActions = require('../../actions/ExplorerActions');

var FilterManager = React.createClass({

  buildFilterNodes: function() {
    var filterNodes = this.props.model.query.filters.map(_.bind(function(filter, index) {
      return(
        <Filter filter={filter}
                project={this.props.project}
                removeFilter={this.removeFilter}
                key={index}
                index={index}
                model={this.props.model} />
      );
    }, this));

    return (
      <div>
        {filterNodes}
        <div className="filter-buttons">
          <a href="#" className="add-filter btn btn-primary" onClick={this.addFilter}>
            <span className="icon glyphicon-plus glyphicon"></span>
            Add another filter
          </a>
        </div>
      </div>
    )
  },

  noFiltersMarkup: function() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="no-filters-msg callout">
            <p>Please select an Event Collection before making a filter.</p>
          </div>
        </div>
      </div>
    );
  },

  addFilter: function(event) {
    event.preventDefault();
    ExplorerActions.addFilter(this.props.model.id);
  },

  removeFilter: function(event) {
    event.preventDefault();
    var index = parseInt(event.currentTarget.dataset.index);
    ExplorerActions.removeFilter(this.props.model.id, index);
  },

  // React methods

  componentWillMount: function() {
    // Create a default filter if there are no filters already on this model
    if (!this.props.model.query.filters.length) {
      ExplorerActions.addFilter(this.props.model.id);
    }
  },

  render: function() {
    var filterContent = this.props.model.query.event_collection ? this.buildFilterNodes() : this.noFiltersMarkup()

    return (
      <Modal ref="modal"
             title="Filters"
             size="large"
             onClose={this.modalClosed}
             modalClasses="filters-modal"
             footerBtns={[ { text: 'Done' } ]}>
        <div className="filters">
          {filterContent}
        </div>
      </Modal>
    );
  }
});

module.exports = FilterManager;
