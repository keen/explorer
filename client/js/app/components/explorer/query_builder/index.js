/**
 * @jsx React.DOM
 */

var _ = require('lodash');
var React = require('react/addons');

// Components
var FieldsToggle = require('../../common/fields_toggle.js');
var EventCollectionField = require('./event_collection_field.js');
var AnalysisTypeField = require('./analysis_type_field.js');
var TargetPropertyField = require('./target_property_field.js');
var PercentileField = require('./percentile_field.js');
var GroupByField = require('./group_by_field.js');
var ExtractionOptions = require('./extraction_options.js');
var FunnelBuilder = require('./funnels/funnel_builder.js');
var Timeframe = require('../../common/timeframe.js');
var Interval = require('../../common/interval.js');
var Input = require('../../common/input.js');
var ApiUrl = require('./api_url.js');
var ExplorerStore = require('../../../stores/ExplorerStore');
var ExplorerUtils = require('../../../utils/ExplorerUtils');
var ProjectUtils = require('../../../utils/ProjectUtils');
var ExplorerActions = require('../../../actions/ExplorerActions');
var runValidations = require('../../../utils/ValidationUtils').runValidations;
var ExplorerValidations = require('../../../validations/ExplorerValidations');
var FilterValidations = require('../../../validations/FilterValidations');

function validFilters(filters) {
  return _.filter(filters, function(filter) {
    return runValidations(FilterValidations.filter, filter).isValid;
  });
}

var QueryBuilder = React.createClass({

  // Event callbacks
  
  handleSelectionWithEvent: function(event) {
    this.handleChange(event.target.name, event.target.value);
  },

  handleChange: function(update, value) {
    var newModel = _.cloneDeep(this.props.model);

    if(_.isPlainObject(update)) {
      for(key in update) {
        newModel.query[key] = update[key];
      }
    } else {
      newModel.query[update] = value;
    }

    ExplorerActions.update(this.props.model.id, newModel);
  },

  // Convenience Methods

  getEventPropertyNames: function()  {
    return ProjectUtils.getEventCollectionPropertyNames(this.props.project, this.props.model.query.event_collection);
  },

  updateGroupBy: function(updates) {
    ExplorerActions.update(this.props.model.id, {
      query: _.assign(_.cloneDeep(this.props.model.query), updates)
    });
  },

  handleRevertChanges: function(event) {
    event.preventDefault();
    ExplorerActions.revertActiveChanges();
  },

  shouldShowRevertButton: function() {
    return ExplorerUtils.isPersisted(this.props.model) && this.props.model.originalModel && this.props.model.originalModel.query && !_.isEqual(this.props.model.query, this.props.model.originalModel.query);
  },

  // Fields Builders
  
  buildEventCollectionField: function() {
    if (this.props.model.query.analysis_type !== 'funnel') {
      return (
        <EventCollectionField ref="event-collection-field"
                              value={this.props.model.query.event_collection}
                              options={this.props.project.eventCollections}
                              handleChange={this.handleChange}
                              onBrowseEvents={this.props.onBrowseEvents} />
      );
    }
  },

  buildExtractionOptions: function() {
    if (this.props.model.query.analysis_type === 'extraction') {
      return (
        <ExtractionOptions latest={this.props.model.query.latest}
                           email={this.props.model.query.email}
                           isEmail={ExplorerUtils.isEmailExtraction(this.props.model)}
                           handleChange={this.handleSelectionWithEvent}
                           setExtractionType={this.props.setExtractionType} />
      );
    }
  },

  buildGroupByField: function() {
    if (['extraction', 'funnel'].indexOf(this.props.model.query.analysis_type) === -1) {
      return (
        <GroupByField ref="group-by-field"
                      value={this.props.model.query.group_by}
                      updateGroupBy={this.updateGroupBy}
                      options={this.getEventPropertyNames()}
                      handleChange={this.handleChange} />
      );
    }
  },

  buildTargetPropertyField: function() {
    if (['count', 'extraction', 'funnel'].indexOf(this.props.model.query.analysis_type) === -1) {
      return (
        <TargetPropertyField ref="target-property-field"
                             value={this.props.model.query.target_property}
                             options={this.getEventPropertyNames()}
                             handleChange={this.handleChange} />
      );
    }
  },

  buildPercentileField: function() {
    if (this.props.model.query.analysis_type === 'percentile') {
      return (
        <PercentileField ref="percentile-field"
                         value={this.props.model.query.percentile}
                         onChange={this.handleSelectionWithEvent} />
      );
    }
  },

  buildIntervalField: function() {
    if (['extraction', 'funnel'].indexOf(this.props.model.query.analysis_type) === -1) {
      return (
        <Interval interval={this.props.model.query.interval} 
                  handleChange={this.handleChange} />
      );
    }
  },

  buildFilters: function() {
    if (this.props.model.query.analysis_type !== 'funnel') {
      return (
        <div className="field-component">
          <FieldsToggle ref="filters-fields-toggle"
                        name="Filters"
                        model={this.props.model}
                        toggleCallback={this.props.handleFiltersToggle}
                        fieldsCount={validFilters(this.props.model.query.filters).length} />
        </div>
      );
    }
  },

  buildGlobalTimeframePicker: function() {
    if (this.props.model.query.analysis_type !== 'funnel') {
      return (
        <div>
          <Timeframe ref="timeframe"
                     time={this.props.model.query.time}
                     timezone={this.props.model.query.timezone}  
                     handleChange={this.handleChange}/>
          <hr className="fieldset-divider" />
        </div>
      );
    }
  },

  buildFunnelBuilder: function() {
    if (this.props.model.query.analysis_type === 'funnel') {
      return <FunnelBuilder model={this.props.model} />;
    }
  },

  buildClearButton: function() {
    if (!this.shouldShowRevertButton()) {
      return (
        <button type="reset" role="clear-query"
          className="btn btn-default btn-block"
          id="clear-explorer-query"
          onClick={this.props.handleClearQuery}>
            Clear
        </button>
      );
    } else {
      return (
        <button
          className="btn btn-default btn-block"
          onClick={this.handleRevertChanges}
          role="revert-query">
            Revert to original
        </button>
      );
    }
  },

  // React methods

  render: function() {
    var apiQueryUrl;
    var queryValidation = runValidations(ExplorerValidations.explorer, this.props.model);
    if(queryValidation.isValid) {
      apiQueryUrl = ExplorerUtils.getApiQueryUrl(this.props.client, this.props.model);
    }

    return (
      <section className="query-pane-section query-builder">
        <form className="form query-builder-form" onSubmit={this.props.handleQuerySubmit}>
          {this.buildEventCollectionField()}
          <AnalysisTypeField ref="analysis-type-field"
                             value={this.props.model.query.analysis_type}
                             options={ProjectUtils.getConstant('ANALYSIS_TYPES')}
                             handleChange={this.handleChange} />
          {this.buildFunnelBuilder()}
          {this.buildExtractionOptions()}
          {this.buildTargetPropertyField()}
          {this.buildPercentileField()}
          {this.buildGlobalTimeframePicker()}
          {this.buildGroupByField()}
          {this.buildFilters()}
          {this.buildIntervalField()}
          <div className="button-set-clear-toggle">
            {this.buildClearButton()}
          </div>
          <ApiUrl url={apiQueryUrl}
                  validation={queryValidation} />
        </form>
      </section>
    );
  }
});

module.exports = QueryBuilder;
