(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Dataset = require('./dataset');
var extend = require('./utils/extend');
module.exports = function(data){
  if (!arguments.length) return this.dataset.data();
  if (data instanceof Dataset) {
    this.dataset = data;
    return this;
  }
  else {
    return parseResponse.call(this, data);
  }
};
function parseResponse(response){
  var dataset,
      indexBy,
      parser,
      parserArgs = [],
      query,
      type;
  indexBy = this.indexBy() ? this.indexBy() : 'timestamp.start';
  query = (typeof response.query !== 'undefined') ? response.query : {};
  query = extend({
    analysis_type: null,
    event_collection: null,
    filters: [],
    group_by: null,
    interval: null,
    timeframe: null,
    timezone: null
  }, query);
  if (query.analysis_type === 'funnel') {
    parser = 'funnel';
  }
  else if (query.analysis_type === 'extraction'){
    parser = 'extraction';
  }
  else if (query.analysis_type === 'select_unique') {
    if (!query.group_by && !query.interval) {
      parser = 'list';
    }
  }
  else if (query.analysis_type) {
    if (!query.group_by && !query.interval) {
      parser = 'metric';
    }
    else if (query.group_by && !query.interval) {
      if (query.group_by instanceof Array && query.group_by.length > 1) {
        parser = 'double-grouped-metric';
        parserArgs.push(query.group_by);
      }
      else {
        parser = 'grouped-metric';
      }
    }
    else if (query.interval && !query.group_by) {
      parser = 'interval';
      parserArgs.push(indexBy);
    }
    else if (query.group_by && query.interval) {
      if (query.group_by instanceof Array && query.group_by.length > 1) {
        parser = 'double-grouped-interval';
        parserArgs.push(query.group_by);
        parserArgs.push(indexBy);
      }
      else {
        parser = 'grouped-interval';
        parserArgs.push(indexBy);
      }
    }
  }
  if (!parser) {
    if (typeof response.result === 'number'){
      parser = 'metric';
    }
    if (response.result instanceof Array && response.result.length > 0){
      if (response.result[0].timeframe && (typeof response.result[0].value == 'number' || response.result[0].value == null)) {
        parser = 'interval';
        parserArgs.push(indexBy)
      }
      if (typeof response.result[0].result == 'number'){
        parser = 'grouped-metric';
      }
      if (response.result[0].value instanceof Array){
        parser = 'grouped-interval';
        parserArgs.push(indexBy)
      }
      if (typeof response.result[0] == 'number' && typeof response.steps !== 'undefined'){
        parser = 'funnel';
      }
      if ((typeof response.result[0] == 'string' || typeof response.result[0] == 'number') && typeof response.steps === 'undefined'){
        parser = 'list';
      }
      if (!parser) {
        parser = 'extraction';
      }
    }
  }
  if (!this.title()) {
    this.title(getDefaultTitle(query));
  }
  if (!this.type()) {
    switch (parser) {
      case 'metric':
        type = 'metric';
        break;
      case 'interval':
        type = 'area';
        break;
      case 'grouped-metric':
      case 'double-grouped-metric':
        type = 'bar';
        break;
      case 'grouped-interval':
      case 'double-grouped-interval':
        type = 'line';
        break;
      case 'funnel':
        type = 'horizontal-bar';
        break;
      case 'list':
      case 'extraction':
      default:
        type = 'table';
    }
    this.type(type);
  }
  dataset = Dataset.parser.apply(this, [parser].concat(parserArgs))(response);
  if (parser.indexOf('interval') > -1) {
    dataset.updateColumn(0, function(value, i){
      return new Date(value);
    });
  }
  this.dataset = dataset;
  return this;
}
function getDefaultTitle(query){
  var analysis = query.analysis_type ? query.analysis_type.replace('_', ' ') : '',
      title;
  title = analysis.replace( /\b./g, function(a){
    return a.toUpperCase();
  });
  if (query.event_collection) {
    title += ' - ' + query.event_collection;
  }
  return title;
}
},{"./dataset":2,"./utils/extend":17}],2:[function(require,module,exports){
(function (global){
/*
  Dataset SDK
*/
(function(root){
  var append = require('./modifiers/append'),
      del = require('./modifiers/delete'),
      filter = require('./modifiers/filter'),
      insert = require('./modifiers/insert'),
      select = require('./modifiers/select'),
      sort   = require('./modifiers/sort'),
      update = require('./modifiers/update');
  var analyses = require('./utils/analyses'),
      extend = require('../utils/extend'),
      parsers = require('./utils/parsers');
  function Dataset(){
    if (this instanceof Dataset === false) {
      return new Dataset();
    }
    this.matrix = [
      ['Index']
    ];
    this.meta = {
      type: undefined
    };
  }
  Dataset.prototype.data = function(arr){
    if (!arguments.length) return this.matrix;
    this.matrix = (arr instanceof Array ? arr : null);
    return this;
  };
  Dataset.prototype.set = function(coords, value){
    if (arguments.length < 2 || coords.length < 2) {
      throw Error('Incorrect arguments provided for #set method');
    }
    var colIndex = 'number' === typeof coords[0] ? coords[0] : this.matrix[0].indexOf(coords[0]),
        rowIndex = 'number' === typeof coords[1] ? coords[1] : select.selectColumn.call(this, 0).indexOf(coords[1]);
    var colResult = select.selectColumn.call(this, coords[0]),
        rowResult = select.selectRow.call(this, coords[1]);
    if (colResult.length < 1) {
      append.appendColumn.call(this, coords[0]);
      colIndex = this.matrix[0].length - 1;
    }
    if (rowResult.length < 1) {
      append.appendRow.call(this, coords[1]);
      rowIndex = this.matrix.length - 1;
    }
    this.matrix[ rowIndex ][ colIndex ] = value;
    return this;
  };
  Dataset.prototype.type = function(str){
    if (!arguments.length) return this.meta['type'];
    this.meta['type'] = (str ? String(str) : undefined);
    return this;
  };
  extend(Dataset.prototype, append);
  extend(Dataset.prototype, del);
  extend(Dataset.prototype, filter);
  extend(Dataset.prototype, insert);
  extend(Dataset.prototype, select);
  extend(Dataset.prototype, sort);
  extend(Dataset.prototype, update);
  extend(Dataset.prototype, analyses);
  Dataset.parser = parsers(Dataset);
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Dataset;
  }
  if (typeof define !== 'undefined' && define.amd) {
    define('keen-dataset', [], function(){
      return Dataset;
    });
  }
  if (root.Keen) {
    root.Keen.Dataset = Dataset;
  }
  root.Dataset = Dataset;
  if (typeof global !== 'undefined') {
    if (global.Keen) {
      global.Keen.Dataset = Dataset;
    }
    global.Dataset = Dataset;
  }
}(this));
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../utils/extend":17,"./modifiers/append":3,"./modifiers/delete":4,"./modifiers/filter":5,"./modifiers/insert":6,"./modifiers/select":7,"./modifiers/sort":8,"./modifiers/update":9,"./utils/analyses":10,"./utils/parsers":13}],3:[function(require,module,exports){
var createNullList = require('../utils/create-null-list'),
    each = require('../../utils/each');
module.exports = {
  'appendColumn': appendColumn,
  'appendRow': appendRow
};
function appendColumn(str, input){
  var self = this,
      args = Array.prototype.slice.call(arguments, 2),
      label = (str !== undefined) ? str : null;
  if (typeof input === 'function') {
    self.matrix[0].push(label);
    each(self.matrix, function(row, i){
      var cell;
      if (i > 0) {
        cell = input.call(self, row, i);
        if (typeof cell === 'undefined') {
          cell = null;
        }
        self.matrix[i].push(cell);
      }
    });
  }
  else if (!input || input instanceof Array) {
    input = input || [];
    if (input.length <= self.matrix.length - 1) {
      input = input.concat( createNullList(self.matrix.length - 1 - input.length) );
    }
    else {
      each(input, function(value, i){
        if (self.matrix.length -1 < input.length) {
          appendRow.call(self, String( self.matrix.length ));
        }
      });
    }
    self.matrix[0].push(label);
    each(input, function(value, i){
      self.matrix[i+1][self.matrix[0].length-1] = value;
    });
  }
  return self;
}
function appendRow(str, input){
  var self = this,
      args = Array.prototype.slice.call(arguments, 2),
      label = (str !== undefined) ? str : null,
      newRow = [];
  newRow.push(label);
  if (typeof input === 'function') {
    each(self.matrix[0], function(label, i){
      var col, cell;
      if (i > 0) {
        col = self.selectColumn(i);
        cell = input.call(self, col, i);
        if (typeof cell === 'undefined') {
          cell = null;
        }
        newRow.push(cell);
      }
    });
    self.matrix.push(newRow);
  }
  else if (!input || input instanceof Array) {
    input = input || [];
    if (input.length <= self.matrix[0].length - 1) {
      input = input.concat( createNullList( self.matrix[0].length - 1 - input.length ) );
    }
    else {
      each(input, function(value, i){
        if (self.matrix[0].length -1 < input.length) {
          appendColumn.call(self, String( self.matrix[0].length ));
        }
      });
    }
    self.matrix.push( newRow.concat(input) );
  }
  return self;
}
},{"../../utils/each":16,"../utils/create-null-list":11}],4:[function(require,module,exports){
var each = require('../../utils/each');
module.exports = {
  'deleteColumn': deleteColumn,
  'deleteRow': deleteRow
};
function deleteColumn(q){
  var self = this,
      index = (typeof q === 'number') ? q : this.matrix[0].indexOf(q);
  if (index > -1) {
    each(self.matrix, function(row, i){
      self.matrix[i].splice(index, 1);
    });
  }
  return self;
}
function deleteRow(q){
  var index = (typeof q === 'number') ? q : this.selectColumn(0).indexOf(q);
  if (index > -1) {
    this.matrix.splice(index, 1);
  }
  return this;
}
},{"../../utils/each":16}],5:[function(require,module,exports){
var each = require('../../utils/each');
module.exports = {
  'filterColumns': filterColumns,
  'filterRows': filterRows
};
function filterColumns(fn){
  var self = this,
      clone = new Array();
  each(self.matrix, function(row, i){
    clone.push([]);
  });
  each(self.matrix[0], function(col, i){
    var selectedColumn = self.selectColumn(i);
    if (i == 0 || fn.call(self, selectedColumn, i)) {
      each(selectedColumn, function(cell, ri){
        clone[ri].push(cell);
      });
    }
  });
  self.data(clone);
  return self;
}
function filterRows(fn){
  var self = this,
      clone = [];
  each(self.matrix, function(row, i){
    if (i == 0 || fn.call(self, row, i)) {
      clone.push(row);
    }
  });
  self.data(clone);
  return self;
}
},{"../../utils/each":16}],6:[function(require,module,exports){
var each = require('../../utils/each');
var createNullList = require('../utils/create-null-list');
var append = require('./append');
var appendRow = append.appendRow,
    appendColumn = append.appendColumn;
module.exports = {
  'insertColumn': insertColumn,
  'insertRow': insertRow
};
function insertColumn(index, str, input){
  var self = this, label;
  label = (str !== undefined) ? str : null;
  if (typeof input === 'function') {
    self.matrix[0].splice(index, 0, label);
    each(self.matrix, function(row, i){
      var cell;
      if (i > 0) {
        cell = input.call(self, row, i);
        if (typeof cell === 'undefined') {
          cell = null;
        }
        self.matrix[i].splice(index, 0, cell);
      }
    });
  }
  else if (!input || input instanceof Array) {
    input = input || [];
    if (input.length <= self.matrix.length - 1) {
      input = input.concat( createNullList(self.matrix.length - 1 - input.length) );
    }
    else {
      each(input, function(value, i){
        if (self.matrix.length -1 < input.length) {
          appendRow.call(self, String( self.matrix.length ));
        }
      });
    }
    self.matrix[0].splice(index, 0, label);
    each(input, function(value, i){
      self.matrix[i+1].splice(index, 0, value);
    });
  }
  return self;
}
function insertRow(index, str, input){
  var self = this, label, newRow = [];
  label = (str !== undefined) ? str : null;
  newRow.push(label);
  if (typeof input === 'function') {
    each(self.matrix[0], function(label, i){
      var col, cell;
      if (i > 0) {
        col = self.selectColumn(i);
        cell = input.call(self, col, i);
        if (typeof cell === 'undefined') {
          cell = null;
        }
        newRow.push(cell);
      }
    });
    self.matrix.splice(index, 0, newRow);
  }
  else if (!input || input instanceof Array) {
    input = input || [];
    if (input.length <= self.matrix[0].length - 1) {
      input = input.concat( createNullList( self.matrix[0].length - 1 - input.length ) );
    }
    else {
      each(input, function(value, i){
        if (self.matrix[0].length -1 < input.length) {
          appendColumn.call(self, String( self.matrix[0].length ));
        }
      });
    }
    self.matrix.splice(index, 0, newRow.concat(input) );
  }
  return self;
}
},{"../../utils/each":16,"../utils/create-null-list":11,"./append":3}],7:[function(require,module,exports){
var each = require('../../utils/each');
module.exports = {
  'selectColumn': selectColumn,
  'selectRow': selectRow
};
function selectColumn(q){
  var result = new Array(),
      index = (typeof q === 'number') ? q : this.matrix[0].indexOf(q);
  if (index > -1 && 'undefined' !== typeof this.matrix[0][index]) {
    each(this.matrix, function(row, i){
      result.push(row[index]);
    });
  }
  return result;
}
function selectRow(q){
  var result = new Array(),
      index = (typeof q === 'number') ? q : this.selectColumn(0).indexOf(q);
  if (index > -1 && 'undefined' !== typeof this.matrix[index]) {
    result = this.matrix[index];
  }
  return  result;
}
},{"../../utils/each":16}],8:[function(require,module,exports){
var each = require('../../utils/each');
module.exports = {
  'sortColumns': sortColumns,
  'sortRows': sortRows
};
function sortColumns(str, comp){
  var self = this,
      head = this.matrix[0].slice(1),
      cols = [],
      clone = [],
      fn = comp || this.getColumnLabel;
  each(head, function(cell, i){
    cols.push(self.selectColumn(i+1).slice(0));
  });
  cols.sort(function(a,b){
    var op = fn.call(self, a) > fn.call(self, b);
    if (op) {
      return (str === 'asc' ? 1 : -1);
    } else if (!op) {
      return (str === 'asc' ? -1 : 1);
    } else {
      return 0;
    }
  });
  each(cols, function(col, i){
    self
      .deleteColumn(i+1)
      .insertColumn(i+1, col[0], col.slice(1));
  });
  return self;
}
function sortRows(str, comp){
  var self = this,
      head = this.matrix.slice(0,1),
      body = this.matrix.slice(1),
      fn = comp || this.getRowIndex;
  body.sort(function(a, b){
    var op = fn.call(self, a) > fn.call(self, b);
    if (op) {
      return (str === 'asc' ? 1 : -1);
    } else if (!op) {
      return (str === 'asc' ? -1 : 1);
    } else {
      return 0;
    }
  });
  self.data(head.concat(body));
  return self;
}
},{"../../utils/each":16}],9:[function(require,module,exports){
var each = require('../../utils/each');
var createNullList = require('../utils/create-null-list');
var append = require('./append');
var appendRow = append.appendRow,
    appendColumn = append.appendColumn;
module.exports = {
  'updateColumn': updateColumn,
  'updateRow': updateRow
};
function updateColumn(q, input){
  var self = this,
      index = (typeof q === 'number') ? q : this.matrix[0].indexOf(q);
  if (index > -1) {
    if (typeof input === 'function') {
      each(self.data(), function(row, i){
        var cell;
        if (i > 0) {
          cell = input.call(self, row[index], i, row);
          if (typeof cell !== 'undefined') {
            self.matrix[i][index] = cell;
          }
        }
      });
    } else if (!input || input instanceof Array) {
      input = input || [];
      if (input.length <= self.data().length - 1) {
        input = input.concat( createNullList(self.data().length - 1 - input.length) );
      }
      else {
        each(input, function(value, i){
          if (self.matrix.length -1 < input.length) {
            appendRow.call(self, String( self.matrix.length ));
          }
        });
      }
      each(input, function(value, i){
        self.matrix[i+1][index] = value;
      });
    }
  }
  return self;
}
function updateRow(q, input){
  var self = this,
      index = (typeof q === 'number') ? q : this.selectColumn(0).indexOf(q);
  if (index > -1) {
    if (typeof input === 'function') {
      each(self.data()[index], function(value, i){
        var col = self.selectColumn(i),
        cell = input.call(self, value, i, col);
        if (typeof cell !== 'undefined') {
          self.matrix[index][i] = cell;
        }
      });
    } else if (!input || input instanceof Array) {
      input = input || [];
      if (input.length <= self.matrix[0].length - 1) {
        input = input.concat( createNullList( self.matrix[0].length - 1 - input.length ) );
      }
      else {
        each(input, function(value, i){
          if (self.matrix[0].length -1 < input.length) {
            appendColumn.call(self, String( self.matrix[0].length ));
          }
        });
      }
      each(input, function(value, i){
        self.matrix[index][i+1] = value;
      });
    }
  }
  return self;
}
},{"../../utils/each":16,"../utils/create-null-list":11,"./append":3}],10:[function(require,module,exports){
var each = require('../../utils/each'),
    extend = require('../../utils/extend');
var helpers = {};
var methods = {
  'average': average,
  'maximum': maximum,
  'minimum': minimum,
  'sum': sum
};
function average(arr, start, end){
  var set = arr.slice(start||0, (end ? end+1 : arr.length)),
      sum = 0,
      avg = null;
  each(set, function(val, i){
    if (typeof val === 'number' && !isNaN(parseFloat(val))) {
      sum += parseFloat(val);
    }
  });
  return sum / set.length;
}
function maximum(arr, start, end){
  var set = arr.slice(start||0, (end ? end+1 : arr.length)),
      nums = [];
  each(set, function(val, i){
    if (typeof val === 'number' && !isNaN(parseFloat(val))) {
      nums.push(parseFloat(val));
    }
  });
  return Math.max.apply(Math, nums);
}
function minimum(arr, start, end){
  var set = arr.slice(start||0, (end ? end+1 : arr.length)),
      nums = [];
  each(set, function(val, i){
    if (typeof val === 'number' && !isNaN(parseFloat(val))) {
      nums.push(parseFloat(val));
    }
  });
  return Math.min.apply(Math, nums);
}
function sum(arr, start, end){
  var set = arr.slice(start||0, (end ? end+1 : arr.length)),
      sum = 0;
  each(set, function(val, i){
    if (typeof val === 'number' && !isNaN(parseFloat(val))) {
      sum += parseFloat(val);
    }
  });
  return sum;
}
each(methods, function(method, name){
  var capitalized = name.charAt(0).toUpperCase() + name.slice(1);
  helpers['getColumn' + capitalized] = helpers['getRow' + capitalized] = function(arr){
    return this[name](arr, 1);
  };
});
helpers['getColumnLabel'] = helpers['getRowIndex'] = function(arr){
  return arr[0];
};
extend(methods, helpers);
module.exports = methods;
},{"../../utils/each":16,"../../utils/extend":17}],11:[function(require,module,exports){
module.exports = function(len){
  var list = new Array();
  for (i = 0; i < len; i++) {
    list.push(null);
  }
  return list;
};
},{}],12:[function(require,module,exports){
module.exports = flatten;
function flatten(ob){
  var toReturn = {};
  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue;
    if ((typeof ob[i]) == 'object' && ob[i] !== null) {
      var flatObject = flatten(ob[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;
        toReturn[i + '.' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};
},{}],13:[function(require,module,exports){
var Dataset; /* injected */
var each = require('../../utils/each'),
    flatten = require('../utils/flatten');
var parsers = {
  'metric':                   parseMetric,
  'interval':                 parseInterval,
  'grouped-metric':           parseGroupedMetric,
  'grouped-interval':         parseGroupedInterval,
  'double-grouped-metric':    parseDoubleGroupedMetric,
  'double-grouped-interval':  parseDoubleGroupedInterval,
  'funnel':                   parseFunnel,
  'list':                     parseList,
  'extraction':               parseExtraction
};
module.exports = initialize;
function initialize(lib){
  Dataset = lib;
  return function(name){
    var options = Array.prototype.slice.call(arguments, 1);
    if (!parsers[name]) {
      throw 'Requested parser does not exist';
    }
    else {
      return parsers[name].apply(this, options);
    }
  };
}
function parseMetric(){
  return function(res){
    return new Dataset()
      .set(['Value', 'Result'], res.result)
      .type('metric');
  }
}
function parseInterval(){
  var options = Array.prototype.slice.call(arguments);
  return function(res){
    var dataset = new Dataset()
      .type('interval');
    each(res.result, function(record, i){
      var index = options[0] && options[0] === 'timeframe.end' ? record.timeframe.end : record.timeframe.start;
      dataset.set(['Result', index], record.value);
    });
    return dataset;
  }
}
function parseGroupedMetric(){
  return function(res){
    var dataset = new Dataset()
      .type('grouped-metric');
    each(res.result, function(record, i){
      var label;
      each(record, function(value, key){
        if (key !== 'result') {
          label = key;
        }
      });
      dataset.set(['Result', String(record[label])], record.result);
    });
    return dataset;
  }
}
function parseGroupedInterval(){
  var options = Array.prototype.slice.call(arguments);
  return function(res){
    var dataset = new Dataset()
      .type('grouped-interval');
    each(res.result, function(record, i){
      var index = options[0] && options[0] === 'timeframe.end' ? record.timeframe.end : record.timeframe.start;
      if (record.value.length) {
        each(record.value, function(group, j){
          var label;
          each(group, function(value, key){
            if (key !== 'result') {
              label = key;
            }
          });
          dataset.set([ group[label] || '', index ], group.result);
        });
      }
      else {
        dataset.appendRow(index);
      }
    });
    return dataset;
  }
}
function parseDoubleGroupedMetric(){
  var options = Array.prototype.slice.call(arguments);
  if (!options[0]) throw 'Requested parser requires a sequential list (array) of properties to target as a second argument';
  return function(res){
    var dataset = new Dataset()
      .type('double-grouped-metric');
    each(res.result, function(record, i){
      dataset.set([ 'Result', record[options[0][0]] + ' ' + record[options[0][1]] ], record.result);
    });
    return dataset;
  }
}
function parseDoubleGroupedInterval(){
  var options = Array.prototype.slice.call(arguments);
  if (!options[0]) throw 'Requested parser requires a sequential list (array) of properties to target as a second argument';
  return function(res){
    var dataset = new Dataset()
      .type('double-grouped-interval');
    each(res.result, function(record, i){
      var index = options[1] && options[1] === 'timeframe.end' ? record.timeframe.end : record.timeframe.start;
      each(record['value'], function(value, j){
        var label = String(value[options[0][0]]) + ' ' + String(value[options[0][1]]);
        dataset.set([ label, index ], value.result);
      });
    });
    return dataset;
  }
}
function parseFunnel(){
  return function(res){
    var dataset = new Dataset()
      .type('funnel');
    each(res.result, function(value, i){
      dataset.set( [ 'Step Value', res.steps[i].event_collection ], value );
    });
    return dataset;
  }
}
function parseList(){
  return function(res){
    var dataset = new Dataset()
      .type('list');
    each(res.result, function(value, i){
      dataset.set( [ 'Value', i+1 ], value );
    });
    return dataset;
  }
}
function parseExtraction(){
  return function(res){
    var dataset = new Dataset()
      .type('extraction');
    each(res.result, function(record, i){
      each(flatten(record), function(value, key){
        dataset.set([key, i+1], value);
      });
    });
    dataset.deleteColumn(0);
    return dataset;
  }
}
},{"../../utils/each":16,"../utils/flatten":12}],14:[function(require,module,exports){
(function (global){
(function(root){
  var Dataset = require('./dataset'),
      data = require('./data');
  var libraries = {
    'default': require('./libraries/default')()
  };
  /* var applyColorMapping = require('./utils/apply-color-mapping'),
      applyLabelMapping = require('./utils/apply-label-mapping'),
      applyLabels = require('./utils/apply-labels'),
      applySortGroups = require('./utils/apply-sort-groups');, */
  var each = require('./utils/each'),
      extend = require('./utils/extend');
  function Dataviz(){
    if (this instanceof Dataviz === false) {
      return new Dataviz();
    }
    this.dataset = new Dataset();
    this.view = {
      _prepared: false,
      _rendered: false,
      _artifacts: { /* state bin */ },
      chartOptions: {},
      colors: [ /*
        teal       red        yellow     purple     orange     mint       blue       green      lavender  */
        '#00bbde', '#fe6672', '#eeb058', '#8a8ad6', '#ff855c', '#00cfbb', '#5a9eed', '#73d483', '#c879bb',
        '#0099b6', '#d74d58', '#cb9141', '#6b6bb6', '#d86945', '#00aa99', '#4281c9', '#57b566', '#ac5c9e',
        '#27cceb', '#ff818b', '#f6bf71', '#9b9be1', '#ff9b79', '#26dfcd', '#73aff4', '#87e096', '#d88bcb'
      ],
      colorMapping: {},
      el: undefined,
      height: undefined,
      indexBy: 'timeframe.start',
      labels: [],
      labelMapping: {},
      library: 'default',
      notes: undefined,
      sortGroups: undefined,
      sortIntervals: undefined,
      stacked: false,
      theme: 'keen-dataviz',
      title: undefined,
      type: undefined,
      width: undefined
    };
    Dataviz.visuals.push(this);
  };
  Dataviz.prototype.attributes = function(obj){
    if (!arguments.length) return this.view;
    var view = this.view;
    each(obj, function(prop, key){
      if (key === 'chartType') {
        key = 'type';
      }
      view[key] = prop;
    });
    return this;
  };
  Dataviz.prototype.call = function(fn){
    fn.call(this);
    return this;
  };
  Dataviz.prototype.chartOptions = function(obj){
    var self = this;
    if (!arguments.length) return this.view.chartOptions;
    if (obj === null) {
      this.view.chartOptions = {};
    }
    else if (typeof obj === 'object') {
      each(obj, function(value, key){
        self.view.chartOptions[key] = (value ? value : null);
      });
    }
    return this;
  };
  Dataviz.prototype.colors = function(arr){
    if (!arguments.length) return this.view.colors;
    this.view.colors = (arr instanceof Array ? arr : []);
    return this;
  };
  Dataviz.prototype.colorMapping = function(obj){
    var self = this;
    if (!arguments.length) return this.view.colorMapping;
    if (obj === null) {
      this.view.colorMapping = {};
    }
    else if (typeof obj === 'object') {
      each(obj, function(value, key){
        self.view.colorMapping[key] = (value ? value : null);
      });
    }
    return this;
  };
  Dataviz.prototype.data = data;
  Dataviz.prototype.destroy = function(){
    var library = this.library(),
        type = this.type(),
        element = this.el();
    if (library && type && Dataviz.libraries[library][type].destroy) {
      Dataviz.libraries[library][type].destroy.apply(this, arguments);
    }
    if (element) {
      element.innerHTML = '';
    }
    this.view._prepared = false;
    this.view._rendered = false;
    this.view._artifacts = {};
    return this;
  };
  Dataviz.prototype.el = function(target){
    var self = this;
    if (!arguments.length) return this.view.el;
    domReady(function(){
      if (target && target !== null) {
        if (target.nodeName) {
          self.view.el = target;
        }
        else if (document.querySelector) {
          self.view.el = document.querySelector(target);
        }
      }
      else {
        self.view.el = undefined;
      }
    });
    return this;
  };
  Dataviz.prototype.height = function(num){
    if (!arguments.length) return this.view['height'];
    this.view['height'] = (!isNaN(parseInt(num)) ? parseInt(num) : null);
    return this;
  };
  Dataviz.prototype.indexBy = function(str){
    if (!arguments.length) return this.view.indexBy;
    this.view.indexBy = (str ? String(str) : 'timeframe.start');
    return this;
  };
  Dataviz.prototype.labels = function(arr){
    if (!arguments.length) {
        return this.view.labels;
    }
    else {
      this.view.labels = (arr instanceof Array ? arr : []);
      return this;
    }
  };
  Dataviz.prototype.labelMapping = function(obj){
    var self = this;
    if (!arguments.length) return this.view.labelMapping;
    if (obj === null) {
      this.view.labelMapping = {};
    }
    else if (typeof obj === 'object') {
      each(obj, function(value, key){
        self.view.labelMapping[key] = (value ? value : null);
      });
    }
    return this;
  };
  Dataviz.prototype.library = function(str){
    if (!arguments.length) return this.view['library'];
    this.view['library'] = (str ? String(str) : null);
    return this;
  };
  Dataviz.prototype.message = function(){
    var loader;
    if (this.view._rendered) {
      this.destroy();
    }
    if (this.el()) {
      this.el().innerHTML = '';
      message = Dataviz.libraries['default'].message;
      if (message.render) {
        message.render.apply(this, arguments);
      }
    }
    return this;
  };
  Dataviz.prototype.notes = function(str){
    if (!arguments.length) return this.view['notes'];
    this.view['notes'] = (str ? String(str) : null);
    return this;
  };
  Dataviz.prototype.prepare = function(){
    var self = this, loader;
    if (!this.el()) {
      throw 'A DOM element is required. Check out the .el() method.';
      return;
    }
    domReady(function(){
      if (self.view._rendered) {
        self.destroy();
      }
      if (self.el()) {
        self.el().innerHTML = '';
        loader = Dataviz.libraries['default'].spinner;
        if (loader.render) {
          loader.render.apply(self, arguments);
        }
        self.view._prepared = true;
      }
    });
    return this;
  };
  Dataviz.prototype.render = function(){
    var self = this,
        loader = Dataviz.libraries['default'].spinner,
        library = this.library(),
        type = this.type(),
        element = this.el();
    if (!this.el()) {
      throw 'A DOM element is required. Check out the .el() method.';
      return;
    }
    domReady(function(){
      if (self.view._prepared && loader.destroy) {
        loader.destroy.apply(self, arguments);
      }
      self.el().innerHTML = '';
      if (library && type && element && Dataviz.libraries[library][type].render) {
        buildDomWrapper(self.el(), {
          notes: self.notes(),
          theme: self.theme(),
          title: self['title']()
        });
        Dataviz.libraries[library][type].render.apply(self, arguments);
        self.view._rendered = true;
      }
    });
    return this;
  };
  function buildDomWrapper(el, options){
    var html = '';
    html += '<div class="' + options.theme + '">';
    if (options['title']) {
      html += '<div class="' + options.theme + '-title">' + options['title'] + '</div>';
    }
    html += '<div class="' + options.theme + '-stage"><div class="' + options.theme + '-rendering"></div></div>';
    if (options.notes) {
      html += '<div class="' + options.theme + '-notes">' + options.notes + '</div>';
    }
    html += '</div>';
    el.innerHTML = html;
  }
  Dataviz.prototype.sortGroups = function(str){
    if (!arguments.length) return this.view.sortGroups;
    this.view.sortGroups = (str ? String(str) : null);
    return this;
  };
  Dataviz.prototype.sortIntervals = function(str){
    if (!arguments.length) return this.view.sortInterval;
    this.view.sortIntervals = (str ? String(str) : null);
    if (this.view.sortIntervals) {
      this.dataset.sortRows(this.view.sortIntervals);
    }
    return this;
  };
  Dataviz.prototype.stacked = function(bool){
    if (!arguments.length) return this.view['stacked'];
    this.view['stacked'] = bool ? true : false;
    return this;
  };
  Dataviz.prototype.theme = function(str){
    if (!arguments.length) return this.view.theme;
    this.view.theme = (str ? String(str) : null);
    return this;
  };
  Dataviz.prototype.title = function(str){
    if (!arguments.length) return this.view['title'];
    this.view['title'] = (str ? String(str) : null);
    return this;
  };
  Dataviz.prototype.type = function(str){
    if (!arguments.length) return this.view['type'];
    this.view['type'] = (str ? String(str) : null);
    return this;
  };
  Dataviz.prototype.update = function(){
    var library = this.library(),
        type = this.type(),
        element = this.el();
    if (library && type && element && Dataviz.libraries[library][type].update) {
      Dataviz.libraries[library][type].update.apply(this, arguments);
    }
    return;
  };
  Dataviz.prototype.width = function(num){
    if (!arguments.length) return this.view['width'];
    this.view['width'] = (!isNaN(parseInt(num)) ? parseInt(num) : null);
    return this;
  };
  Dataviz.prototype.chartType = Dataviz.prototype.type;
  Dataviz.prototype.error = Dataviz.prototype.message;
  Dataviz.prototype.parseRawData = Dataviz.prototype.data;
  Dataviz.prototype.parseRequest = function(){
    return this;
  };
  Dataviz.prototype.initialize = function(){
    return this;
  };
  extend(Dataviz, {
    libraries: libraries,
    visuals: []
  });
  Dataviz.register = function(name, actions){
    Dataviz.libraries[name] = Dataviz.libraries[name] || {};
    each(actions, function(method, key){
      Dataviz.libraries[name][key] = method;
    });
  };
  Dataviz.find = function(target){
    if (!arguments.length) return Dataviz.visuals;
    var el = target.nodeName ? target : document.querySelector(target),
        match = null;
    each(Dataviz.visuals, function(visual){
      if (el == visual.el()){
        match = visual;
        return false;
      }
    });
    return match;
  };
  function domReady(fn){
    if ('undefined' !== typeof document
      || 'undefined' === typeof window) {
        fn();
        return;
    }
    if(document.readyState == null && document.addEventListener){
      document.addEventListener('DOMContentLoaded', function DOMContentLoaded(){
        document.removeEventListener('DOMContentLoaded', DOMContentLoaded, false);
        document.readyState = 'complete';
      }, false);
      document.readyState = 'loading';
    }
    testDom(fn);
  }
  function testDom(fn){
    if (/in/.test(document.readyState)) {
      setTimeout(function(){
        testDom(fn);
      }, 9);
    }
    else {
      fn();
    }
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Dataviz;
  }
  if (typeof define !== 'undefined' && define.amd) {
    define('keen-dataviz', [], function(){
      return Dataviz;
    });
  }
  if (root.Keen) {
    root.Keen.Dataviz = Dataviz;
  }
  root.Dataviz = Dataviz;
  if (typeof global !== 'undefined') {
    if (global.Keen) {
      global.Keen.Dataviz = Dataviz;
    }
    global.Dataviz = Dataviz;
  }
}(this));
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./data":1,"./dataset":2,"./libraries/default":15,"./utils/each":16,"./utils/extend":17}],15:[function(require,module,exports){
var Spinner = require('spin.js');
var each = require('../utils/each'),
    extend = require('../utils/extend'),
    prettyNumber = require('../utils/pretty-number');
var types = {};
function initialize(){
  defineC3();
  defineMessage();
  defineMetric();
  defineSpinner();
  defineTable();
  return types;
}
function defineC3(){
  var c3Types = [
    'area', 'area-spline', 'area-step',
    'bar', 'donut', 'gauge', 'line',
    'pie', 'step', 'spline',
    'horizontal-area',
    'horizontal-area-spline',
    'horizontal-area-step',
    'horizontal-bar',
    'horizontal-line',
    'horizontal-step',
    'horizontal-spline'
  ];
  each(c3Types, function(type, index) {
    types[type] = {
      render: function(){
        var self = this;
        var options = extend({
          axis: {},
          bindto: this.el().querySelector('.' + this.theme() + '-rendering'),
          data: {
            columns: [],
            type: type.replace('horizontal-', ''),
            colors: this.colorMapping()
          },
          color: {
            pattern: this.colors()
          },
          size: {
            height: this.height() ? this.height() - this.el().offsetHeight : 400,
            width: this.width()
          }
        }, this.chartOptions());
        if (type === 'gauge') {
          options.data.columns = [[
            this.title() || this.data()[1][0],
            this.data()[1][1]
          ]];
        }
        else if (type === 'pie' || type === 'donut') {
          options.data.columns = this.data().slice(1);
        }
        else {
          if (type.indexOf('horizontal-') > -1) {
            options.axis.rotated = true;
          }
          if (!isNaN(new Date(this.data()[1][0]).getTime())) {
            options.axis.x = {
              type: 'timeseries'
            };
            options.axis.x.tick = options.axis.x.tick || {
              format: getDateFormatDefault(this.data()[1][0], this.data()[2][0])
            };
            options.data.columns[0] = [];
            each(this.dataset.selectColumn(0), function(cell, i){
              if (i > 0) {
                cell = new Date(cell);
              }
              options.data.columns[0][i] = cell;
            });
            options.data.columns[0][0] = 'x';
            options.data.x = 'x';
            if (this.stacked() && this.data()[0].length > 2) {
              options.data.groups = [ this.dataset.selectRow(0).slice(1) ];
            }
          }
          else {
            options.axis.x = {
              type: 'category',
              categories: this.dataset.selectColumn(0).slice(1)
            };
            if (this.stacked() && this.data()[0].length > 2) {
              options.data.groups = [ this.dataset.selectRow(0).slice(1) ];
            }
          }
          each(this.data()[0], function(cell, i){
            if (i > 0) {
              options.data.columns.push(self.dataset.selectColumn(i));
            }
          });
        }
        this.view._artifacts['c3'] = c3.generate(options);
      },
      update: function(){
        this.render();
      },
      destroy: function(){
        if (this.view._artifacts['c3']) {
          this.view._artifacts['c3'].destroy();
          this.view._artifacts['c3'] = null;
        }
      }
    };
  });
}
function getDateFormatDefault(a, b){
  var d = Math.abs(new Date(a).getTime() - new Date(b).getTime());
  var months = [
    'Jan', 'Feb', 'Mar',
    'Apr', 'May', 'June',
    'July', 'Aug', 'Sept',
    'Oct', 'Nov', 'Dec'
  ];
  if (d >= 2419200000) {
    return function(ms){
      var date = new Date(ms);
      return months[date.getMonth()] + ' ' + date.getFullYear();
    };
  }
  else if (d >= 86400000) {
    return function(ms){
      var date = new Date(ms);
      return months[date.getMonth()] + ' ' + date.getDate();
    };
  }
  else if (d >= 3600000) {
    return '%I:%M %p';
  }
  else {
    return '%I:%M:%S %p';
  }
}
function defineMessage(){
  types['message'] = {
    render: function(text){
      var outer = document.createElement('div'),
          inner = document.createElement('div'),
          msg = document.createElement('span'),
          height = this.height() || 140;
      outer.className = this.theme();
      inner.className = this.theme() + '-message';
      inner.style.height = String(height + 'px');
      inner.style.paddingTop = (height / 2 - 12) + 'px';
      inner.style.width = String(this.width() + 'px');
      msg.innerHTML = text || '';
      inner.appendChild(msg);
      outer.appendChild(inner);
      this.el().innerHTML = '';
      this.el().appendChild(outer);
    },
    update: function(){
      this.render();
    },
    destroy: function(){
    }
  };
}
function defineMetric(){
  types['metric'] = {
    render: function(){
      var theme = this.theme(),
          title = this.title(),
          value = this.data()[1][1] || '-',
          height = this.height() || 140,
          width = this.width(),
          opts = this.chartOptions(),
          html = '',
          prefix = '',
          suffix = '',
          formattedNum,
          valueEl;
      formattedNum = value;
      if ( (typeof opts['prettyNumber'] === 'undefined' || opts['prettyNumber'] === true)
        && !isNaN(parseInt(value)) ) {
          formattedNum = prettyNumber(value);
      }
      if (opts['prefix']) {
        prefix = '<span class="' + theme + '-metric-prefix">' + opts['prefix'] + '</span>';
      }
      if (opts['suffix']) {
        suffix = '<span class="' + theme + '-metric-suffix">' + opts['suffix'] + '</span>';
      }
      html += '<div class="' + theme + '">';
      html +=   '<div class="' + theme + '-metric" style="width: ' + (width ? width + 'px' : 'auto') + ';" title="' + value + '">';
      html +=     '<span class="' + theme + '-metric-value">' + prefix + formattedNum + suffix + '</span>';
      if (title) {
        html +=   '<span class="' + theme + '-metric-title">' + title + '</span>';
      }
      html +=   '</div>';
      html += '</div>';
      this.el().innerHTML = html;
      valueEl = this.el().querySelector('.' + theme + '-metric-value');
      valueEl.style.paddingTop = ((height - this.el().offsetHeight) / 2) + 'px';
      this.el().querySelector('.' + theme + '-metric').style.height = height + 'px';
    },
    update: function(){
      this.render();
    },
    destroy: function(){
    }
  };
}
function defineSpinner(){
  var defaults = {
    height: 140,         
    lines: 10,           
    length: 8,           
    width: 3,            
    radius: 10,          
    corners: 1,          
    rotate: 0,           
    direction: 1,        
    color: '#4D4D4D',    
    speed: 1.67,         
    trail: 60,           
    shadow: false,       
    hwaccel: false,      
    className: 'spinner',
    zIndex: 2e9,         
    top: '50%',          
    left: '50%'          
  };
  types['spinner'] = {
    render: function(){
      var height = this.height() || defaults.height,
          outer = document.createElement('div'),
          spinner = document.createElement('div');
      outer.className = this.theme();
      spinner.className = this.theme() + '-spinner';
      spinner.style.height = String(height + 'px');
      spinner.style.position = 'relative';
      spinner.style.width = String(this.width() + 'px');
      outer.appendChild(spinner);
      this.el().innerHTML = '';
      this.el().appendChild(outer);
      this.view._artifacts['spinner'] = new Spinner(defaults).spin(spinner);
    },
    update: function(){
      this.render();
    },
    destroy: function(){
      if (this.view._artifacts['spinner']) {
        this.view._artifacts['spinner'].stop();
        this.view._artifacts['spinner'] = null;
      }
    }
  };
}
function defineTable(){
  var defaults = {
    height: undefined,
    width: undefined,
    stickyHeader: true,
    stickyFooter: false
  };
  types['table'] = {
    render: function(){
      var dataset = this.data(),
          el = this.el(),
          height = (this.height() || defaults.height) - this.el().offsetHeight,
          theme = this.theme(),
          width = this.width() || defaults.width;
      var html = '',
          colAligns = new Array(dataset[0].length),
          colWidths = new Array(dataset[0].length),
          fixedHeader;
      each(dataset, function(row){
        each(row, function(cell, i){
          if (!colWidths[i]) {
            colWidths[i] = 0;
          }
          colAligns[i] = (typeof cell === 'number') ? 'right' : 'left';
          colWidths[i] = (String(cell).length > colWidths[i]) ? String(cell).length : colWidths[i];
        });
      });
      html += '<div class="' + theme + '-table" style="height: '+(height ? height+'px' : 'auto')+'; width: '+(width ? width+'px' : 'auto')+';">';
      html +=   '<table class="' + theme + '-table-dataset">';
      html +=     '<thead>';
      html +=       '<tr>';
      for (var i = 0; i < dataset[0].length; i++) {
        html +=       '<th style="width: '+ (10 * colWidths[i]) +'px; text-align: ' + colAligns[i] + ';">' + dataset[0][i] + '</th>';
      }
      html +=       '</tr>';
      html +=     '</thead>';
      html +=     '<tbody>';
      for (var i = 0; i < dataset.length; i++) {
        if (i > 0) {
          html +=   '<tr>';
          for (var j = 0; j < dataset[i].length; j++) {
            html +=   '<td style="min-width: '+ (10 * colWidths[j]) +'px; text-align: ' + colAligns[j] + ';">' + dataset[i][j] + '</td>';
          }
          html +=   '</tr>';
        }
      }
      html +=     '</tbody>';
      html +=   '</table>';
      html +=   '<table class="' + theme + '-table-fixed-header">';
      html +=     '<thead>';
      html +=       '<tr>';
      for (var i = 0; i < dataset[0].length; i++) {
        html +=       '<th style="min-width: '+ (10 * colWidths[i]) +'px; text-align: ' + colAligns[i] + ';">' + dataset[0][i] + '</th>';
      }
      html +=       '</tr>';
      html +=     '</thead>';
      html +=   '</table>';
      html += '</div>';
      el.querySelector('.' + theme + '-rendering').innerHTML = html;
      fixedHeader = el.querySelector('.' + theme + '-table-fixed-header');
      el.querySelector('.' + theme + '-table').onscroll = function(e){
        fixedHeader.style.top = e.target.scrollTop + 'px';
      };
    },
    update: function(){
      this.render();
    },
    destroy: function(){
      this.el().querySelector('.' + theme + '-table').onscroll = undefined;
    }
  };
}
module.exports = initialize;
},{"../utils/each":16,"../utils/extend":17,"../utils/pretty-number":18,"spin.js":19}],16:[function(require,module,exports){
module.exports = each;
function each(o, cb, s){
  var n;
  if (!o){
    return 0;
  }
  s = !s ? o : s;
  if (o instanceof Array){
    for (n=0; n<o.length; n++) {
      if (cb.call(s, o[n], n, o) === false){
        return 0;
      }
    }
  } else {
    for (n in o){
      if (o.hasOwnProperty(n)) {
        if (cb.call(s, o[n], n, o) === false){
          return 0;
        }
      }
    }
  }
  return 1;
}
},{}],17:[function(require,module,exports){
module.exports = extend;
function extend(target){
  for (var i = 1; i < arguments.length; i++) {
    for (var prop in arguments[i]){
      target[prop] = arguments[i][prop];
    }
  }
  return target;
}
},{}],18:[function(require,module,exports){
module.exports = prettyNumber;
function prettyNumber(input) {
  var input = Number(input),
      sciNo = input.toPrecision(3),
      prefix = '',
      suffixes = ['', 'k', 'M', 'B', 'T'];
  if (Number(sciNo) == input && String(input).length <= 4) {
    return String(input);
  }
  if (input >= 1 || input <= -1) {
    if (input < 0){
      input = -input;
      prefix = '-';
    }
    return prefix + recurse(input, 0);
  }
  else {
    return input.toPrecision(3);
  }
  function recurse(input, iteration) {
    var input = String(input);
    var split = input.split('.');
    if (split.length > 1) {
      input = split[0];
      var rhs = split[1];
      if (input.length == 2 && rhs.length > 0) {
        if (rhs.length > 0) {
          input = input + '.' + rhs.charAt(0);
        }
        else {
          input += '0';
        }
      }
      else if (input.length == 1 && rhs.length > 0) {
        input = input + '.' + rhs.charAt(0);
        if (rhs.length > 1) {
          input += rhs.charAt(1);
        }
        else {
          input += '0';
        }
      }
    }
    var numNumerals = input.length;
    if (input.split('.').length > 1) {
      numNumerals--;
    }
    if (numNumerals <= 3) {
      return String(input) + suffixes[iteration];
    }
    else {
      return recurse(Number(input) / 1000, iteration + 1);
    }
  }
}
},{}],19:[function(require,module,exports){
/**
 * Copyright (c) 2011-2014 Felix Gnass
 * Licensed under the MIT license
 * http://spin.js.org/
 *
 * Example:
    var opts = {
      lines: 12            
    , length: 7            
    , width: 5             
    , radius: 10           
    , scale: 1.0           
    , corners: 1           
    , color: '#000'        
    , opacity: 1/4         
    , rotate: 0            
    , direction: 1         
    , speed: 1             
    , trail: 100           
    , fps: 20              
    , zIndex: 2e9          
    , className: 'spinner' 
    , top: '50%'           
    , left: '50%'          
    , shadow: false        
    , hwaccel: false       
    , position: 'absolute' 
    }
    var target = document.getElementById('foo')
    var spinner = new Spinner(opts).spin(target)
 */
;(function (root, factory) {
  /* CommonJS */
  if (typeof module == 'object' && module.exports) module.exports = factory()
  /* AMD module */
  else if (typeof define == 'function' && define.amd) define(factory)
  /* Browser global */
  else root.Spinner = factory()
}(this, function () {
  "use strict"
  var prefixes = ['webkit', 'Moz', 'ms', 'O'] /* Vendor prefixes */
    , animations = {} /* Animation rules keyed by their name */
    , useCssAnimations /* Whether to use CSS animations or setTimeout */
    , sheet /* A stylesheet to hold the @keyframe or VML rules. */
  /**
   * Utility function to create elements. If no tag name is given,
   * a DIV is created. Optionally properties can be passed.
   */
  function createEl (tag, prop) {
    var el = document.createElement(tag || 'div')
      , n
    for (n in prop) el[n] = prop[n]
    return el
  }
  /**
   * Appends children and returns the parent.
   */
  function ins (parent /* child1, child2, ...*/) {
    for (var i = 1, n = arguments.length; i < n; i++) {
      parent.appendChild(arguments[i])
    }
    return parent
  }
  /**
   * Creates an opacity keyframe animation rule and returns its name.
   * Since most mobile Webkits have timing issues with animation-delay,
   * we create separate rules for each line/segment.
   */
  function addAnimation (alpha, trail, i, lines) {
    var name = ['opacity', trail, ~~(alpha * 100), i, lines].join('-')
      , start = 0.01 + i/lines * 100
      , z = Math.max(1 - (1-alpha) / trail * (100-start), alpha)
      , prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase()
      , pre = prefix && '-' + prefix + '-' || ''
    if (!animations[name]) {
      sheet.insertRule(
        '@' + pre + 'keyframes ' + name + '{' +
        '0%{opacity:' + z + '}' +
        start + '%{opacity:' + alpha + '}' +
        (start+0.01) + '%{opacity:1}' +
        (start+trail) % 100 + '%{opacity:' + alpha + '}' +
        '100%{opacity:' + z + '}' +
        '}', sheet.cssRules.length)
      animations[name] = 1
    }
    return name
  }
  /**
   * Tries various vendor prefixes and returns the first supported property.
   */
  function vendor (el, prop) {
    var s = el.style
      , pp
      , i
    prop = prop.charAt(0).toUpperCase() + prop.slice(1)
    if (s[prop] !== undefined) return prop
    for (i = 0; i < prefixes.length; i++) {
      pp = prefixes[i]+prop
      if (s[pp] !== undefined) return pp
    }
  }
  /**
   * Sets multiple style properties at once.
   */
  function css (el, prop) {
    for (var n in prop) {
      el.style[vendor(el, n) || n] = prop[n]
    }
    return el
  }
  /**
   * Fills in default values.
   */
  function merge (obj) {
    for (var i = 1; i < arguments.length; i++) {
      var def = arguments[i]
      for (var n in def) {
        if (obj[n] === undefined) obj[n] = def[n]
      }
    }
    return obj
  }
  /**
   * Returns the line color from the given string or array.
   */
  function getColor (color, idx) {
    return typeof color == 'string' ? color : color[idx % color.length]
  }
  var defaults = {
    lines: 12            
  , length: 7            
  , width: 5             
  , radius: 10           
  , scale: 1.0           
  , corners: 1           
  , color: '#000'        
  , opacity: 1/4         
  , rotate: 0            
  , direction: 1         
  , speed: 1             
  , trail: 100           
  , fps: 20              
  , zIndex: 2e9          
  , className: 'spinner' 
  , top: '50%'           
  , left: '50%'          
  , shadow: false        
  , hwaccel: false       
  , position: 'absolute' 
  }
  /** The constructor */
  function Spinner (o) {
    this.opts = merge(o || {}, Spinner.defaults, defaults)
  }
  Spinner.defaults = {}
  merge(Spinner.prototype, {
    /**
     * Adds the spinner to the given target element. If this instance is already
     * spinning, it is automatically removed from its previous target b calling
     * stop() internally.
     */
    spin: function (target) {
      this.stop()
      var self = this
        , o = self.opts
        , el = self.el = createEl(null, {className: o.className})
      css(el, {
        position: o.position
      , width: 0
      , zIndex: o.zIndex
      , left: o.left
      , top: o.top
      })
      if (target) {
        target.insertBefore(el, target.firstChild || null)
      }
      el.setAttribute('role', 'progressbar')
      self.lines(el, self.opts)
      if (!useCssAnimations) {
        var i = 0
          , start = (o.lines - 1) * (1 - o.direction) / 2
          , alpha
          , fps = o.fps
          , f = fps / o.speed
          , ostep = (1 - o.opacity) / (f * o.trail / 100)
          , astep = f / o.lines
        ;(function anim () {
          i++
          for (var j = 0; j < o.lines; j++) {
            alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity)
            self.opacity(el, j * o.direction + start, alpha, o)
          }
          self.timeout = self.el && setTimeout(anim, ~~(1000 / fps))
        })()
      }
      return self
    }
    /**
     * Stops and removes the Spinner.
     */
  , stop: function () {
      var el = this.el
      if (el) {
        clearTimeout(this.timeout)
        if (el.parentNode) el.parentNode.removeChild(el)
        this.el = undefined
      }
      return this
    }
    /**
     * Internal method that draws the individual lines. Will be overwritten
     * in VML fallback mode below.
     */
  , lines: function (el, o) {
      var i = 0
        , start = (o.lines - 1) * (1 - o.direction) / 2
        , seg
      function fill (color, shadow) {
        return css(createEl(), {
          position: 'absolute'
        , width: o.scale * (o.length + o.width) + 'px'
        , height: o.scale * o.width + 'px'
        , background: color
        , boxShadow: shadow
        , transformOrigin: 'left'
        , transform: 'rotate(' + ~~(360/o.lines*i + o.rotate) + 'deg) translate(' + o.scale*o.radius + 'px' + ',0)'
        , borderRadius: (o.corners * o.scale * o.width >> 1) + 'px'
        })
      }
      for (; i < o.lines; i++) {
        seg = css(createEl(), {
          position: 'absolute'
        , top: 1 + ~(o.scale * o.width / 2) + 'px'
        , transform: o.hwaccel ? 'translate3d(0,0,0)' : ''
        , opacity: o.opacity
        , animation: useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + ' ' + 1 / o.speed + 's linear infinite'
        })
        if (o.shadow) ins(seg, css(fill('#000', '0 0 4px #000'), {top: '2px'}))
        ins(el, ins(seg, fill(getColor(o.color, i), '0 0 1px rgba(0,0,0,.1)')))
      }
      return el
    }
    /**
     * Internal method that adjusts the opacity of a single line.
     * Will be overwritten in VML fallback mode below.
     */
  , opacity: function (el, i, val) {
      if (i < el.childNodes.length) el.childNodes[i].style.opacity = val
    }
  })
  function initVML () {
    /* Utility function to create a VML tag */
    function vml (tag, attr) {
      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr)
    }
    sheet.addRule('.spin-vml', 'behavior:url(#default#VML)')
    Spinner.prototype.lines = function (el, o) {
      var r = o.scale * (o.length + o.width)
        , s = o.scale * 2 * r
      function grp () {
        return css(
          vml('group', {
            coordsize: s + ' ' + s
          , coordorigin: -r + ' ' + -r
          })
        , { width: s, height: s }
        )
      }
      var margin = -(o.width + o.length) * o.scale * 2 + 'px'
        , g = css(grp(), {position: 'absolute', top: margin, left: margin})
        , i
      function seg (i, dx, filter) {
        ins(
          g
        , ins(
            css(grp(), {rotation: 360 / o.lines * i + 'deg', left: ~~dx})
          , ins(
              css(
                vml('roundrect', {arcsize: o.corners})
              , { width: r
                , height: o.scale * o.width
                , left: o.scale * o.radius
                , top: -o.scale * o.width >> 1
                , filter: filter
                }
              )
            , vml('fill', {color: getColor(o.color, i), opacity: o.opacity})
            , vml('stroke', {opacity: 0})
            )
          )
        )
      }
      if (o.shadow)
        for (i = 1; i <= o.lines; i++) {
          seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)')
        }
      for (i = 1; i <= o.lines; i++) seg(i)
      return ins(el, g)
    }
    Spinner.prototype.opacity = function (el, i, val, o) {
      var c = el.firstChild
      o = o.shadow && o.lines || 0
      if (c && i + o < c.childNodes.length) {
        c = c.childNodes[i + o]; c = c && c.firstChild; c = c && c.firstChild
        if (c) c.opacity = val
      }
    }
  }
  if (typeof document !== 'undefined') {
    sheet = (function () {
      var el = createEl('style', {type : 'text/css'})
      ins(document.getElementsByTagName('head')[0], el)
      return el.sheet || el.styleSheet
    }())
    var probe = css(createEl('group'), {behavior: 'url(#default#VML)'})
    if (!vendor(probe, 'transform') && probe.adj) initVML()
    else useCssAnimations = vendor(probe, 'animation')
  }
  return Spinner
}));
},{}]},{},[14]);
