/**
 * @jsx React.DOM
 */

var _ = require('lodash');
var React = require('react');
var Filter = require('./filter.js');
var Modal = require('./modal.js');
var ProjectUtils = require('../../utils/ProjectUtils');

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
                handleChange={this.props.handleChange}
                removeFilter={this.props.removeFilter}
                filterOperators={ProjectUtils.getConstant('FILTER_OPERATORS')} />
      );
    }.bind(this));

    return (
      <div>
        {filterNodes}
        <div className="filter-buttons">
          <a href="#" className="add-filter btn btn-primary" onClick={this.props.addFilter}>
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

  getPropertyType: function (property_name) {
    return ProjectUtils.getPropertyType(
      this.props.project,
      this.props.eventCollection,
      property_name
    );
  },

  render: function() {
    var filterContent = this.props.eventCollection ? this.buildFilterNodes() : this.noFiltersMarkup();

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
