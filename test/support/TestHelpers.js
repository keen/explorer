var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var _ = require('lodash');
var ProjectUtils = require('../../client/js/app/utils/ProjectUtils');
var FormatUtils = require('../../client/js/app/utils/FormatUtils');
var sinon = require('sinon');

module.exports = {

	createClient: function() {
		return {
		  readKey: function() {
		  	return 'readKey'
		  },
		  config: {
		    projectId: 'projectId',
		    protocol: 'https',
		    host: 'api.keen.io/3.0',
		    masterKey: 'masterKey'
		  },
		  run: function(){}
		}
	},

	fakeEvent: function(){
		return { 
			preventDefault: function(){}
		}
	},

	createExplorerModel: function() {
		return {
			id: 'some_id',
			active: false,
			error: null,
			result: null,
			loading: false,
			saving: false,
			isValid: true,
			timeframe_type: 'relative',
			name: '',
			query: {
			  event_collection: null,
			  analysis_type: null,
			  target_property: null,
			  percentile: null,
			  group_by: null,
			  interval: null,
			  timezone: ProjectUtils.getConstant('DEFAULT_TIMEZONE'),
			  filters: null,
			  email: null,
			  latest: null,
			  filters: [],
			  time: {
			  	relativity: 'this',
			  	amount: 1,
			  	sub_timeframe: 'weeks'
			  }
			},
			visualization: {
			  chart_type: null
			}
		};
	},

	buildProjectSchema: function() {
		return [
		  {
		    name: 'click',
		    properties: {
		      'stringProp': 'string',
		      'datetimeProp': 'datetime',
		      'numProp': 'num',
		      'nullProp': 'null',
		      'boolProp': 'bool',
		      'listProp': 'list',
		      'geoProp': 'geo'
		    },
		    url: 'https://api.keen.io/3.0/projects/projectId/'
		  }
		];
	},

	createProject: function() {
		var schema = this.buildProjectSchema();
		return {
			loading: false,
			eventCollections: FormatUtils.sortItems(_.map(schema, "name")),
			projectSchema: schema
		};
	},

		createDataviz: function() {
			return {
	      chartType: function(){ return this; },
	      data: 		 function(){ return this; },
	      config: 	 function(){ return this; },
	      destroy: 	 function(){ return this; },
	      prepare: 	 function(){ return this; },
	      el: 			 function(){ return this; },
	      height: 	 function(){ return this; },
	      width: 	   function(){ return this; },
	      render: 	 function(){ return this; },
	      dataType:  function(){ return this; },
	      title:  	 function(){ return this; }
	    };
		},

	createFilters: function() {
		var standardFilter = {
		  property_name: 'propOne',
		  operator: 'eq',
		  property_value: 'abc',
		  coercion_type: 'String',
		};

		var geoFilter = {
		  property_name: 'keen.location.coordinates',
		  operator: 'within',
		  property_value: {
		  	coordinates: [123.123, -123.123],
		  	max_distance_miles: 5
		  },
		  coercion_type: 'Geo'
		};

		var listFilter = {
		  property_name: 'propOne',
		  operator: 'in',
		  property_value: ["one", "two"],
		  coercion_type: 'List',
		};

		return {
		  standard: standardFilter,
		  geo: geoFilter,
		  list: listFilter
		};
	},

};