/**
 * @jsx React.DOM
 */

var _ = require('lodash');
var React = require('react');
var Filter = require('./filter.js');
var Modal = require('./modal.js');
var ExplorerActions = require('../../actions/ExplorerActions');
var ProjectUtils = require('../../utils/ProjectUtils');

function coerceGeoValue(value) {
  var trailingDecimals = value.match(/\.+$/);
  if (value === '-' || (trailingDecimals && trailingDecimals.length)) {
    return value;
  } else {
    return parseFloat(value) || 0;
  }
}

var FilterManager = React.createClass({

  buildFilterNodes: function() {
    var filterNodes = this.props.filters.map(function(filter, index) {
      return(
        <Filter key={index}
                index={index}
                filter={filter}
                project={this.props.project}
                propertyType={this.getPropertyType(filter.property_name)}
                eventCollection={this.props.eventCollection}
                eventPropertyNames={ProjectUtils.getEventCollectionPropertyNames(this.props.project, this.props.eventCollection)}
                updateFilter={this.updateFilter}
                removeFilter={this.removeFilter}
                handleChange={this.handleChange}
                filterOperators={ProjectUtils.getConstant('FILTER_OPERATORS')} />
      );
    }.bind(this));

    return (
      <div>
        {filterNodes}
        <div className="filter-buttons">
          <a href="#" className="add-filter btn btn-primary" onClick={this.addFilter}>
            <i className="icon glyphicon glyphicon-plus margin-right-tiny"></i>
            Add another filter
          </a>
        </div>
      </div>
    )
  },

  noFiltersMarkup: function() {
    return (
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          <div className="no-filters-msg callout">
            <p className="lead">
              <i className="icon glyphicon glyphicon-info-sign margin-right-tiny"></i>
              Please select an Event Collection before making a filter.
            </p>
          </div>
        </div>
      </div>
    );
  },

  addFilter: function(event) {
    event.preventDefault();
    ExplorerActions.addFilter(this.props.modelId);
  },

  removeFilter: function(event) {
    event.preventDefault();
    var index = parseInt(event.currentTarget.dataset.index);
    ExplorerActions.removeFilter(this.props.modelId, index);
  },

  handleChange: function(index, name, selection) {
    var updates = {};
    updates[name] = selection;
    ExplorerActions.updateFilter(this.props.modelId, index, updates);
  },

  getPropertyType: function (property_name) {
    return ProjectUtils.getPropertyType(
      this.props.project,
      this.props.eventCollection,
      property_name
    );
  },

  updateFilter: function(index, name, value) {
    var updates = _.cloneDeep(this.props.filters[index]);
    
    if (!_.isNull(name.match('coordinates'))) {
      updates.property_value.coordinates[parseInt(name.substr(name.length - 1))] = coerceGeoValue(value);
    } else if (updates.coercion_type === 'Geo') {
      updates.property_value[name] = coerceGeoValue(value);
    } else {
      updates[name] = value;
    }

    ExplorerActions.updateFilter(this.props.modelId, index, updates);
  },

  // React methods

  componentWillMount: function() {
    // Create a default filter if there are no filters already on this model
    if (!this.props.filters.length) {
      ExplorerActions.addFilter(this.props.modelId);
    }
  },

  render: function() {
    var filterContent = this.props.eventCollection ? this.buildFilterNodes() : this.noFiltersMarkup()

    return (
      <Modal ref="modal"
             title="Filters"
             size="large"
             onClose={this.modalClosed}
             modalClasses="filters-modal"
             footerBtns={[
              { 
                text: 'Done',
                classes: 'btn-success',
                iconName: 'ok-circle'
              }
            ]}>
        <div className="filters">
          {filterContent}
        </div>
      </Modal>
    );
  }
});

module.exports = FilterManager;
