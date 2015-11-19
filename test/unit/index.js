/** @jsx React.DOM */

// **********************
// Dependencies
// **********************
require('keen-js');
require('jquery-browserify');

// ***********************
// App
// ***********************
require('./app_spec.js');

// ***********************
// Utils
// ***********************
require('./utils/ProjectUtilsSpec.js');
require('./utils/FormatUtilsSpec.js');
require('./utils/ExplorerUtilsSpec.js');
require('./utils/FilterUtilsSpec.js');
require('./utils/ValidationUtilsSpec.js');
require('./utils/FunnelUtilsSpec.js');
require('./utils/TimeframeUtilsSpec.js');

// ***********************
// Validations
// ***********************
require('./validations/ExplorerValidationsSpec.js');
require('./validations/FilterValidationsSpec.js');

// ***********************
// Actions
// ***********************
require('./actions/ExplorerActionsSpec.js');
require('./actions/ProjectActionsSpec.js');

// ***********************
// Stores
// ***********************
require('./stores/ExplorerStoreSpec.js');
require('./stores/ProjectStoreSpec.js');
require('./stores/NoticeStoreSpec.js');

// ***********************
// Persistence
// ***********************
require('./modules/persistence/persistence_spec.js');
require('./modules/persistence/KeenSavedQueriesSpec.js');

// ***********************
// Components
// ***********************

// Explorer
require('./components/explorer/cache_toggle_spec.js');
require('./components/explorer/index_spec.js');
require('./components/explorer/query_actions_spec.js');
require('./components/explorer/query_builder/extraction_options_spec.js');
require('./components/explorer/query_builder/index_spec.js');
require('./components/explorer/saved_queries/browse_queries_spec.js');
require('./components/explorer/visualization/chart_spec.js');
require('./components/explorer/visualization/index_spec.js');

// Common
require('./components/common/absolute_picker_spec.js');
require('./components/common/datepicker_spec.js');
require('./components/common/event_browser_spec.js');
require('./components/common/fields_toggle_spec.js');
require('./components/common/filter_manager_spec.js')
require('./components/common/filter_spec.js');
require('./components/common/filter_value_fields_spec.js');
require('./components/common/geo_spec.js');
require('./components/common/modal_spec.js');
require('./components/common/notice_spec.js');
require('./components/common/react_select_spec.js')
require('./components/common/relative_picker_spec.js');
require('./components/common/timeframe_spec.js');
require('./components/common/timezone_spec.js');

require('./components/common/datepicker_spec.js');
require('./components/common/relative_picker_spec.js');
require('./components/common/absolute_picker_spec.js');
require('./components/common/modal_spec.js');
require('./components/common/fields_toggle_spec.js');
require('./components/common/event_browser_spec.js');
require('./components/common/notice_spec.js');
