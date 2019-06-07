(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-redux"), require("react-select"), require("moment"), require("redux"), require("react-json-view"), require("react-dates"), require("rc-time-picker"), require("react-modal"), require("moment-timezone"), require("react-dom"), require("redux-devtools-extension"), require("redux-saga"), require("keen-analysis"), require("prop-types"), require("keen-dataviz"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-redux", "react-select", "moment", "redux", "react-json-view", "react-dates", "rc-time-picker", "react-modal", "moment-timezone", "react-dom", "redux-devtools-extension", "redux-saga", "keen-analysis", "prop-types", "keen-dataviz"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react"), require("react-redux"), require("react-select"), require("moment"), require("redux"), require("react-json-view"), require("react-dates"), require("rc-time-picker"), require("react-modal"), require("moment-timezone"), require("react-dom"), require("redux-devtools-extension"), require("redux-saga"), require("keen-analysis"), require("prop-types"), require("keen-dataviz")) : factory(root["react"], root["react-redux"], root["react-select"], root["moment"], root["redux"], root["react-json-view"], root["react-dates"], root["rc-time-picker"], root["react-modal"], root["moment-timezone"], root["react-dom"], root["redux-devtools-extension"], root["redux-saga"], root["keen-analysis"], root["prop-types"], root["keen-dataviz"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__2__, __WEBPACK_EXTERNAL_MODULE__8__, __WEBPACK_EXTERNAL_MODULE__10__, __WEBPACK_EXTERNAL_MODULE__56__, __WEBPACK_EXTERNAL_MODULE__57__, __WEBPACK_EXTERNAL_MODULE__58__, __WEBPACK_EXTERNAL_MODULE__59__, __WEBPACK_EXTERNAL_MODULE__60__, __WEBPACK_EXTERNAL_MODULE__78__, __WEBPACK_EXTERNAL_MODULE__160__, __WEBPACK_EXTERNAL_MODULE__161__, __WEBPACK_EXTERNAL_MODULE__162__, __WEBPACK_EXTERNAL_MODULE__163__, __WEBPACK_EXTERNAL_MODULE__165__, __WEBPACK_EXTERNAL_MODULE__167__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 168);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var core = __webpack_require__(13);
var hide = __webpack_require__(18);
var redefine = __webpack_require__(14);
var ctx = __webpack_require__(26);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(80)('wks');
var uid = __webpack_require__(34);
var Symbol = __webpack_require__(5).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8__;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(21);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__10__;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(4);
var IE8_DOM_DEFINE = __webpack_require__(114);
var toPrimitive = __webpack_require__(31);
var dP = Object.defineProperty;

exports.f = __webpack_require__(12) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 13 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var hide = __webpack_require__(18);
var has = __webpack_require__(17);
var SRC = __webpack_require__(34)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(13).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(29);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
var fails = __webpack_require__(3);
var defined = __webpack_require__(29);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(11);
var createDesc = __webpack_require__(33);
module.exports = __webpack_require__(12) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(50);
var defined = __webpack_require__(29);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(3);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(51);
var createDesc = __webpack_require__(33);
var toIObject = __webpack_require__(19);
var toPrimitive = __webpack_require__(31);
var has = __webpack_require__(17);
var IE8_DOM_DEFINE = __webpack_require__(114);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(12) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(1);
var core = __webpack_require__(13);
var fails = __webpack_require__(3);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(26);
var IObject = __webpack_require__(50);
var toObject = __webpack_require__(15);
var toLength = __webpack_require__(9);
var asc = __webpack_require__(261);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(27);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__(12)) {
  var LIBRARY = __webpack_require__(35);
  var global = __webpack_require__(5);
  var fails = __webpack_require__(3);
  var $export = __webpack_require__(1);
  var $typed = __webpack_require__(71);
  var $buffer = __webpack_require__(105);
  var ctx = __webpack_require__(26);
  var anInstance = __webpack_require__(46);
  var propertyDesc = __webpack_require__(33);
  var hide = __webpack_require__(18);
  var redefineAll = __webpack_require__(47);
  var toInteger = __webpack_require__(21);
  var toLength = __webpack_require__(9);
  var toIndex = __webpack_require__(140);
  var toAbsoluteIndex = __webpack_require__(37);
  var toPrimitive = __webpack_require__(31);
  var has = __webpack_require__(17);
  var classof = __webpack_require__(52);
  var isObject = __webpack_require__(6);
  var toObject = __webpack_require__(15);
  var isArrayIter = __webpack_require__(97);
  var create = __webpack_require__(38);
  var getPrototypeOf = __webpack_require__(40);
  var gOPN = __webpack_require__(39).f;
  var getIterFn = __webpack_require__(99);
  var uid = __webpack_require__(34);
  var wks = __webpack_require__(7);
  var createArrayMethod = __webpack_require__(24);
  var createArrayIncludes = __webpack_require__(61);
  var speciesConstructor = __webpack_require__(53);
  var ArrayIterators = __webpack_require__(101);
  var Iterators = __webpack_require__(43);
  var $iterDetect = __webpack_require__(64);
  var setSpecies = __webpack_require__(45);
  var arrayFill = __webpack_require__(100);
  var arrayCopyWithin = __webpack_require__(131);
  var $DP = __webpack_require__(11);
  var $GOPD = __webpack_require__(22);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(6);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(34)('meta');
var isObject = __webpack_require__(6);
var has = __webpack_require__(17);
var setDesc = __webpack_require__(11).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(3)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 34 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(116);
var enumBugKeys = __webpack_require__(83);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(21);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(4);
var dPs = __webpack_require__(117);
var enumBugKeys = __webpack_require__(83);
var IE_PROTO = __webpack_require__(82)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(79)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(85).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(116);
var hiddenKeys = __webpack_require__(83).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(17);
var toObject = __webpack_require__(15);
var IE_PROTO = __webpack_require__(82)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.



/*<replacement>*/

var pna = __webpack_require__(75);
/*</replacement>*/

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var util = __webpack_require__(55);
util.inherits = __webpack_require__(49);
/*</replacement>*/

var Readable = __webpack_require__(145);
var Writable = __webpack_require__(108);

util.inherits(Duplex, Readable);

{
  // avoid scope creep, the keys array can then be collected
  var keys = objectKeys(Writable.prototype);
  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
  }
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  pna.nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();

  pna.nextTick(cb, err);
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(11).f;
var has = __webpack_require__(17);
var TAG = __webpack_require__(7)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(7)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(18)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(5);
var dP = __webpack_require__(11);
var DESCRIPTORS = __webpack_require__(12);
var SPECIES = __webpack_require__(7)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(14);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 49 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(28);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 51 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(28);
var TAG = __webpack_require__(7)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(4);
var aFunction = __webpack_require__(27);
var SPECIES = __webpack_require__(7)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(337)
var ieee754 = __webpack_require__(338)
var isArray = __webpack_require__(144)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(25)))

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(54).Buffer))

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__56__;

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__57__;

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__58__;

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__59__;

/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__60__;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(19);
var toLength = __webpack_require__(9);
var toAbsoluteIndex = __webpack_require__(37);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 62 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
var defined = __webpack_require__(29);
var fails = __webpack_require__(3);
var spaces = __webpack_require__(87);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(7)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(4);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__(52);
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(133);
var redefine = __webpack_require__(14);
var hide = __webpack_require__(18);
var fails = __webpack_require__(3);
var defined = __webpack_require__(29);
var wks = __webpack_require__(7);
var regexpExec = __webpack_require__(102);

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(26);
var call = __webpack_require__(129);
var isArrayIter = __webpack_require__(97);
var anObject = __webpack_require__(4);
var toLength = __webpack_require__(9);
var getIterFn = __webpack_require__(99);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(5);
var $export = __webpack_require__(1);
var redefine = __webpack_require__(14);
var redefineAll = __webpack_require__(47);
var meta = __webpack_require__(32);
var forOf = __webpack_require__(68);
var anInstance = __webpack_require__(46);
var isObject = __webpack_require__(6);
var fails = __webpack_require__(3);
var $iterDetect = __webpack_require__(64);
var setToStringTag = __webpack_require__(42);
var inheritIfRequired = __webpack_require__(88);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var hide = __webpack_require__(18);
var uid = __webpack_require__(34);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(336);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 74 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (!process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = { nextTick: nextTick };
} else {
  module.exports = process
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(74)))

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(54)
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__(361);

module.exports = Function.prototype.bind || implementation;


/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__78__;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6);
var document = __webpack_require__(5).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(13);
var global = __webpack_require__(5);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(35) ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(7);


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(80)('keys');
var uid = __webpack_require__(34);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 83 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(28);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(5).document;
module.exports = document && document.documentElement;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(6);
var anObject = __webpack_require__(4);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(26)(Function.call, __webpack_require__(22).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6);
var setPrototypeOf = __webpack_require__(86).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(21);
var defined = __webpack_require__(29);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),
/* 90 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),
/* 91 */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(21);
var defined = __webpack_require__(29);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(35);
var $export = __webpack_require__(1);
var redefine = __webpack_require__(14);
var hide = __webpack_require__(18);
var Iterators = __webpack_require__(43);
var $iterCreate = __webpack_require__(128);
var setToStringTag = __webpack_require__(42);
var getPrototypeOf = __webpack_require__(40);
var ITERATOR = __webpack_require__(7)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(95);
var defined = __webpack_require__(29);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(6);
var cof = __webpack_require__(28);
var MATCH = __webpack_require__(7)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(7)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(43);
var ITERATOR = __webpack_require__(7)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(11);
var createDesc = __webpack_require__(33);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(52);
var ITERATOR = __webpack_require__(7)('iterator');
var Iterators = __webpack_require__(43);
module.exports = __webpack_require__(13).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(15);
var toAbsoluteIndex = __webpack_require__(37);
var toLength = __webpack_require__(9);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(44);
var step = __webpack_require__(132);
var Iterators = __webpack_require__(43);
var toIObject = __webpack_require__(19);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(93)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__(65);

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var at = __webpack_require__(92)(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(26);
var invoke = __webpack_require__(122);
var html = __webpack_require__(85);
var cel = __webpack_require__(79);
var global = __webpack_require__(5);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(28)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(5);
var DESCRIPTORS = __webpack_require__(12);
var LIBRARY = __webpack_require__(35);
var $typed = __webpack_require__(71);
var hide = __webpack_require__(18);
var redefineAll = __webpack_require__(47);
var fails = __webpack_require__(3);
var anInstance = __webpack_require__(46);
var toInteger = __webpack_require__(21);
var toLength = __webpack_require__(9);
var toIndex = __webpack_require__(140);
var gOPN = __webpack_require__(39).f;
var dP = __webpack_require__(11).f;
var arrayFill = __webpack_require__(100);
var setToStringTag = __webpack_require__(42);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),
/* 106 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(145);
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = __webpack_require__(108);
exports.Duplex = __webpack_require__(41);
exports.Transform = __webpack_require__(149);
exports.PassThrough = __webpack_require__(347);


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, setImmediate, global) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.



/*<replacement>*/

var pna = __webpack_require__(75);
/*</replacement>*/

module.exports = Writable;

/* <replacement> */
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;
  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = __webpack_require__(55);
util.inherits = __webpack_require__(49);
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: __webpack_require__(346)
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(146);
/*</replacement>*/

/*<replacement>*/

var Buffer = __webpack_require__(76).Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*</replacement>*/

var destroyImpl = __webpack_require__(147);

util.inherits(Writable, Stream);

function nop() {}

function WritableState(options, stream) {
  Duplex = Duplex || __webpack_require__(41);

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var writableHwm = options.writableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // if _final has been called
  this.finalCalled = false;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // has it been destroyed
  this.destroyed = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || __webpack_require__(41);

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;

    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  pna.nextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    pna.nextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = !state.objectMode && _isUint8Array(chunk);

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }
  return chunk;
}

Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);
    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    pna.nextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    pna.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
    // this can emit finish, but finish must
    // always follow error
    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    var allBuffers = true;
    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }
    buffer.allBuffers = allBuffers;

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
    state.bufferedRequestCount = 0;
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      state.bufferedRequestCount--;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;
    if (err) {
      stream.emit('error', err);
    }
    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function') {
      state.pendingcb++;
      state.finalCalled = true;
      pna.nextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    prefinish(stream, state);
    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) pna.nextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;
  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  }
  if (state.corkedRequestsFree) {
    state.corkedRequestsFree.next = corkReq;
  } else {
    state.corkedRequestsFree = corkReq;
  }
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  get: function () {
    if (this._writableState === undefined) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._writableState.destroyed = value;
  }
});

Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(74), __webpack_require__(344).setImmediate, __webpack_require__(25)))

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = __webpack_require__(358);
var foreach = __webpack_require__(360);
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

var toStr = Object.prototype.toString;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
        /* eslint-disable no-unused-vars, no-restricted-syntax */
        for (var _ in obj) { return false; }
        /* eslint-enable no-unused-vars, no-restricted-syntax */
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		Object.defineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = props.concat(Object.getOwnPropertySymbols(map));
	}
	foreach(props, function (name) {
		defineProperty(object, name, map[name], predicates[name]);
	});
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(77);

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fnToStr = Function.prototype.toString;

var constructorRegex = /^\s*class /;
var isES6ClassFn = function isES6ClassFn(value) {
	try {
		var fnStr = fnToStr.call(value);
		var singleStripped = fnStr.replace(/\/\/.*\n/g, '');
		var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, '');
		var spaceStripped = multiStripped.replace(/\n/mg, ' ').replace(/ {2}/g, ' ');
		return constructorRegex.test(spaceStripped);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionObject(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isCallable(value) {
	if (!value) { return false; }
	if (typeof value !== 'function' && typeof value !== 'object') { return false; }
	if (hasToStringTag) { return tryFunctionObject(value); }
	if (isES6ClassFn(value)) { return false; }
	var strClass = toStr.call(value);
	return strClass === fnClass || strClass === genClass;
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__(77);
var has = bind.call(Function.call, Object.prototype.hasOwnProperty);

var $assign = Object.assign;

module.exports = function assign(target, source) {
	if ($assign) {
		return $assign(target, source);
	}

	for (var key in source) {
		if (has(source, key)) {
			target[key] = source[key];
		}
	}
	return target;
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var _self = (typeof window !== 'undefined')
	? window   // if in browser
	: (
		(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
		? self // if in worker
		: {}   // if in node js
	);

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */

var Prism = (function (_self){

// Private helper vars
var lang = /\blang(?:uage)?-([\w-]+)\b/i;
var uniqueId = 0;

var _ = {
	manual: _self.Prism && _self.Prism.manual,
	disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
	util: {
		encode: function (tokens) {
			if (tokens instanceof Token) {
				return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
			} else if (Array.isArray(tokens)) {
				return tokens.map(_.util.encode);
			} else {
				return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
			}
		},

		type: function (o) {
			return Object.prototype.toString.call(o).slice(8, -1);
		},

		objId: function (obj) {
			if (!obj['__id']) {
				Object.defineProperty(obj, '__id', { value: ++uniqueId });
			}
			return obj['__id'];
		},

		// Deep clone a language definition (e.g. to extend it)
		clone: function deepClone(o, visited) {
			var clone, id, type = _.util.type(o);
			visited = visited || {};

			switch (type) {
				case 'Object':
					id = _.util.objId(o);
					if (visited[id]) {
						return visited[id];
					}
					clone = {};
					visited[id] = clone;

					for (var key in o) {
						if (o.hasOwnProperty(key)) {
							clone[key] = deepClone(o[key], visited);
						}
					}

					return clone;

				case 'Array':
					id = _.util.objId(o);
					if (visited[id]) {
						return visited[id];
					}
					clone = [];
					visited[id] = clone;

					o.forEach(function (v, i) {
						clone[i] = deepClone(v, visited);
					});

					return clone;

				default:
					return o;
			}
		}
	},

	languages: {
		extend: function (id, redef) {
			var lang = _.util.clone(_.languages[id]);

			for (var key in redef) {
				lang[key] = redef[key];
			}

			return lang;
		},

		/**
		 * Insert a token before another token in a language literal
		 * As this needs to recreate the object (we cannot actually insert before keys in object literals),
		 * we cannot just provide an object, we need an object and a key.
		 * @param inside The key (or language id) of the parent
		 * @param before The key to insert before.
		 * @param insert Object with the key/value pairs to insert
		 * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
		 */
		insertBefore: function (inside, before, insert, root) {
			root = root || _.languages;
			var grammar = root[inside];
			var ret = {};

			for (var token in grammar) {
				if (grammar.hasOwnProperty(token)) {

					if (token == before) {
						for (var newToken in insert) {
							if (insert.hasOwnProperty(newToken)) {
								ret[newToken] = insert[newToken];
							}
						}
					}

					// Do not insert token which also occur in insert. See #1525
					if (!insert.hasOwnProperty(token)) {
						ret[token] = grammar[token];
					}
				}
			}

			var old = root[inside];
			root[inside] = ret;

			// Update references in other language definitions
			_.languages.DFS(_.languages, function(key, value) {
				if (value === old && key != inside) {
					this[key] = ret;
				}
			});

			return ret;
		},

		// Traverse a language definition with Depth First Search
		DFS: function DFS(o, callback, type, visited) {
			visited = visited || {};

			var objId = _.util.objId;

			for (var i in o) {
				if (o.hasOwnProperty(i)) {
					callback.call(o, i, o[i], type || i);

					var property = o[i],
					    propertyType = _.util.type(property);

					if (propertyType === 'Object' && !visited[objId(property)]) {
						visited[objId(property)] = true;
						DFS(property, callback, null, visited);
					}
					else if (propertyType === 'Array' && !visited[objId(property)]) {
						visited[objId(property)] = true;
						DFS(property, callback, i, visited);
					}
				}
			}
		}
	},
	plugins: {},

	highlightAll: function(async, callback) {
		_.highlightAllUnder(document, async, callback);
	},

	highlightAllUnder: function(container, async, callback) {
		var env = {
			callback: callback,
			selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
		};

		_.hooks.run("before-highlightall", env);

		var elements = env.elements || container.querySelectorAll(env.selector);

		for (var i=0, element; element = elements[i++];) {
			_.highlightElement(element, async === true, env.callback);
		}
	},

	highlightElement: function(element, async, callback) {
		// Find language
		var language, grammar, parent = element;

		while (parent && !lang.test(parent.className)) {
			parent = parent.parentNode;
		}

		if (parent) {
			language = (parent.className.match(lang) || [,''])[1].toLowerCase();
			grammar = _.languages[language];
		}

		// Set language on the element, if not present
		element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

		if (element.parentNode) {
			// Set language on the parent, for styling
			parent = element.parentNode;

			if (/pre/i.test(parent.nodeName)) {
				parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
			}
		}

		var code = element.textContent;

		var env = {
			element: element,
			language: language,
			grammar: grammar,
			code: code
		};

		var insertHighlightedCode = function (highlightedCode) {
			env.highlightedCode = highlightedCode;

			_.hooks.run('before-insert', env);

			env.element.innerHTML = env.highlightedCode;

			_.hooks.run('after-highlight', env);
			_.hooks.run('complete', env);
			callback && callback.call(env.element);
		}

		_.hooks.run('before-sanity-check', env);

		if (!env.code) {
			_.hooks.run('complete', env);
			return;
		}

		_.hooks.run('before-highlight', env);

		if (!env.grammar) {
			insertHighlightedCode(_.util.encode(env.code));
			return;
		}

		if (async && _self.Worker) {
			var worker = new Worker(_.filename);

			worker.onmessage = function(evt) {
				insertHighlightedCode(evt.data);
			};

			worker.postMessage(JSON.stringify({
				language: env.language,
				code: env.code,
				immediateClose: true
			}));
		}
		else {
			insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
		}
	},

	highlight: function (text, grammar, language) {
		var env = {
			code: text,
			grammar: grammar,
			language: language
		};
		_.hooks.run('before-tokenize', env);
		env.tokens = _.tokenize(env.code, env.grammar);
		_.hooks.run('after-tokenize', env);
		return Token.stringify(_.util.encode(env.tokens), env.language);
	},

	matchGrammar: function (text, strarr, grammar, index, startPos, oneshot, target) {
		for (var token in grammar) {
			if(!grammar.hasOwnProperty(token) || !grammar[token]) {
				continue;
			}

			if (token == target) {
				return;
			}

			var patterns = grammar[token];
			patterns = (_.util.type(patterns) === "Array") ? patterns : [patterns];

			for (var j = 0; j < patterns.length; ++j) {
				var pattern = patterns[j],
					inside = pattern.inside,
					lookbehind = !!pattern.lookbehind,
					greedy = !!pattern.greedy,
					lookbehindLength = 0,
					alias = pattern.alias;

				if (greedy && !pattern.pattern.global) {
					// Without the global flag, lastIndex won't work
					var flags = pattern.pattern.toString().match(/[imuy]*$/)[0];
					pattern.pattern = RegExp(pattern.pattern.source, flags + "g");
				}

				pattern = pattern.pattern || pattern;

				// Don’t cache length as it changes during the loop
				for (var i = index, pos = startPos; i < strarr.length; pos += strarr[i].length, ++i) {

					var str = strarr[i];

					if (strarr.length > text.length) {
						// Something went terribly wrong, ABORT, ABORT!
						return;
					}

					if (str instanceof Token) {
						continue;
					}

					if (greedy && i != strarr.length - 1) {
						pattern.lastIndex = pos;
						var match = pattern.exec(text);
						if (!match) {
							break;
						}

						var from = match.index + (lookbehind ? match[1].length : 0),
						    to = match.index + match[0].length,
						    k = i,
						    p = pos;

						for (var len = strarr.length; k < len && (p < to || (!strarr[k].type && !strarr[k - 1].greedy)); ++k) {
							p += strarr[k].length;
							// Move the index i to the element in strarr that is closest to from
							if (from >= p) {
								++i;
								pos = p;
							}
						}

						// If strarr[i] is a Token, then the match starts inside another Token, which is invalid
						if (strarr[i] instanceof Token) {
							continue;
						}

						// Number of tokens to delete and replace with the new match
						delNum = k - i;
						str = text.slice(pos, p);
						match.index -= pos;
					} else {
						pattern.lastIndex = 0;

						var match = pattern.exec(str),
							delNum = 1;
					}

					if (!match) {
						if (oneshot) {
							break;
						}

						continue;
					}

					if(lookbehind) {
						lookbehindLength = match[1] ? match[1].length : 0;
					}

					var from = match.index + lookbehindLength,
					    match = match[0].slice(lookbehindLength),
					    to = from + match.length,
					    before = str.slice(0, from),
					    after = str.slice(to);

					var args = [i, delNum];

					if (before) {
						++i;
						pos += before.length;
						args.push(before);
					}

					var wrapped = new Token(token, inside? _.tokenize(match, inside) : match, alias, match, greedy);

					args.push(wrapped);

					if (after) {
						args.push(after);
					}

					Array.prototype.splice.apply(strarr, args);

					if (delNum != 1)
						_.matchGrammar(text, strarr, grammar, i, pos, true, token);

					if (oneshot)
						break;
				}
			}
		}
	},

	tokenize: function(text, grammar) {
		var strarr = [text];

		var rest = grammar.rest;

		if (rest) {
			for (var token in rest) {
				grammar[token] = rest[token];
			}

			delete grammar.rest;
		}

		_.matchGrammar(text, strarr, grammar, 0, 0, false);

		return strarr;
	},

	hooks: {
		all: {},

		add: function (name, callback) {
			var hooks = _.hooks.all;

			hooks[name] = hooks[name] || [];

			hooks[name].push(callback);
		},

		run: function (name, env) {
			var callbacks = _.hooks.all[name];

			if (!callbacks || !callbacks.length) {
				return;
			}

			for (var i=0, callback; callback = callbacks[i++];) {
				callback(env);
			}
		}
	},

	Token: Token
};

_self.Prism = _;

function Token(type, content, alias, matchedStr, greedy) {
	this.type = type;
	this.content = content;
	this.alias = alias;
	// Copy of the full string this token was created from
	this.length = (matchedStr || "").length|0;
	this.greedy = !!greedy;
}

Token.stringify = function(o, language, parent) {
	if (typeof o == 'string') {
		return o;
	}

	if (Array.isArray(o)) {
		return o.map(function(element) {
			return Token.stringify(element, language, o);
		}).join('');
	}

	var env = {
		type: o.type,
		content: Token.stringify(o.content, language, parent),
		tag: 'span',
		classes: ['token', o.type],
		attributes: {},
		language: language,
		parent: parent
	};

	if (o.alias) {
		var aliases = Array.isArray(o.alias) ? o.alias : [o.alias];
		Array.prototype.push.apply(env.classes, aliases);
	}

	_.hooks.run('wrap', env);

	var attributes = Object.keys(env.attributes).map(function(name) {
		return name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
	}).join(' ');

	return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + (attributes ? ' ' + attributes : '') + '>' + env.content + '</' + env.tag + '>';

};

if (!_self.document) {
	if (!_self.addEventListener) {
		// in Node.js
		return _;
	}

	if (!_.disableWorkerMessageHandler) {
		// In worker
		_self.addEventListener('message', function (evt) {
			var message = JSON.parse(evt.data),
				lang = message.language,
				code = message.code,
				immediateClose = message.immediateClose;

			_self.postMessage(_.highlight(code, _.languages[lang], lang));
			if (immediateClose) {
				_self.close();
			}
		}, false);
	}

	return _;
}

//Get current script and highlight
var script = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();

if (script) {
	_.filename = script.src;

	if (!_.manual && !script.hasAttribute('data-manual')) {
		if(document.readyState !== "loading") {
			if (window.requestAnimationFrame) {
				window.requestAnimationFrame(_.highlightAll);
			} else {
				window.setTimeout(_.highlightAll, 16);
			}
		}
		else {
			document.addEventListener('DOMContentLoaded', _.highlightAll);
		}
	}
}

return _;

})(_self);

if ( true && module.exports) {
	module.exports = Prism;
}

// hack for components to work correctly in node.js
if (typeof global !== 'undefined') {
	global.Prism = Prism;
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(25)))

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(12) && !__webpack_require__(3)(function () {
  return Object.defineProperty(__webpack_require__(79)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var core = __webpack_require__(13);
var LIBRARY = __webpack_require__(35);
var wksExt = __webpack_require__(81);
var defineProperty = __webpack_require__(11).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(17);
var toIObject = __webpack_require__(19);
var arrayIndexOf = __webpack_require__(61)(false);
var IE_PROTO = __webpack_require__(82)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(11);
var anObject = __webpack_require__(4);
var getKeys = __webpack_require__(36);

module.exports = __webpack_require__(12) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(19);
var gOPN = __webpack_require__(39).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(36);
var gOPS = __webpack_require__(62);
var pIE = __webpack_require__(51);
var toObject = __webpack_require__(15);
var IObject = __webpack_require__(50);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(3)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 120 */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(27);
var isObject = __webpack_require__(6);
var invoke = __webpack_require__(122);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),
/* 122 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(5).parseInt;
var $trim = __webpack_require__(63).trim;
var ws = __webpack_require__(87);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(5).parseFloat;
var $trim = __webpack_require__(63).trim;

module.exports = 1 / $parseFloat(__webpack_require__(87) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(28);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(6);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 127 */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(38);
var descriptor = __webpack_require__(33);
var setToStringTag = __webpack_require__(42);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(18)(IteratorPrototype, __webpack_require__(7)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(4);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(27);
var toObject = __webpack_require__(15);
var IObject = __webpack_require__(50);
var toLength = __webpack_require__(9);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(15);
var toAbsoluteIndex = __webpack_require__(37);
var toLength = __webpack_require__(9);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),
/* 132 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__(102);
__webpack_require__(1)({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(12) && /./g.flags != 'g') __webpack_require__(11).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(65)
});


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(35);
var global = __webpack_require__(5);
var ctx = __webpack_require__(26);
var classof = __webpack_require__(52);
var $export = __webpack_require__(1);
var isObject = __webpack_require__(6);
var aFunction = __webpack_require__(27);
var anInstance = __webpack_require__(46);
var forOf = __webpack_require__(68);
var speciesConstructor = __webpack_require__(53);
var task = __webpack_require__(104).set;
var microtask = __webpack_require__(282)();
var newPromiseCapabilityModule = __webpack_require__(136);
var perform = __webpack_require__(283);
var userAgent = __webpack_require__(69);
var promiseResolve = __webpack_require__(137);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(7)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(47)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(42)($Promise, PROMISE);
__webpack_require__(45)(PROMISE);
Wrapper = __webpack_require__(13)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(64)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(27);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(4);
var isObject = __webpack_require__(6);
var newPromiseCapability = __webpack_require__(136);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(11).f;
var create = __webpack_require__(38);
var redefineAll = __webpack_require__(47);
var ctx = __webpack_require__(26);
var anInstance = __webpack_require__(46);
var forOf = __webpack_require__(68);
var $iterDefine = __webpack_require__(93);
var step = __webpack_require__(132);
var setSpecies = __webpack_require__(45);
var DESCRIPTORS = __webpack_require__(12);
var fastKey = __webpack_require__(32).fastKey;
var validate = __webpack_require__(48);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(47);
var getWeak = __webpack_require__(32).getWeak;
var anObject = __webpack_require__(4);
var isObject = __webpack_require__(6);
var anInstance = __webpack_require__(46);
var forOf = __webpack_require__(68);
var createArrayMethod = __webpack_require__(24);
var $has = __webpack_require__(17);
var validate = __webpack_require__(48);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(21);
var toLength = __webpack_require__(9);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(39);
var gOPS = __webpack_require__(62);
var anObject = __webpack_require__(4);
var Reflect = __webpack_require__(5).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(9);
var repeat = __webpack_require__(89);
var defined = __webpack_require__(29);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(36);
var toIObject = __webpack_require__(19);
var isEnum = __webpack_require__(51).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 144 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



/*<replacement>*/

var pna = __webpack_require__(75);
/*</replacement>*/

module.exports = Readable;

/*<replacement>*/
var isArray = __webpack_require__(144);
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = __webpack_require__(106).EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(146);
/*</replacement>*/

/*<replacement>*/

var Buffer = __webpack_require__(76).Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*</replacement>*/

/*<replacement>*/
var util = __webpack_require__(55);
util.inherits = __webpack_require__(49);
/*</replacement>*/

/*<replacement>*/
var debugUtil = __webpack_require__(341);
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = __webpack_require__(342);
var destroyImpl = __webpack_require__(147);
var StringDecoder;

util.inherits(Readable, Stream);

var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn);

  // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.
  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream) {
  Duplex = Duplex || __webpack_require__(41);

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var readableHwm = options.readableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // has it been destroyed
  this.destroyed = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = __webpack_require__(148).StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || __webpack_require__(41);

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
  }
});

Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
};

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }
      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit('error', new Error('stream.push() after EOF'));
      } else {
        state.reading = false;
        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
    }
  }

  return needMoreData(state);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream.emit('data', chunk);
    stream.read(0);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

    if (state.needReadable) emitReadable(stream);
  }
  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;
  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = __webpack_require__(148).StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) pna.nextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    pna.nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) pna.nextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = { hasUnpiped: false };

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, unpipeInfo);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this, unpipeInfo);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        pna.nextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    pna.nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var _this = this;

  var state = this._readableState;
  var paused = false;

  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }

    _this.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  this._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return this;
};

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._readableState.highWaterMark;
  }
});

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    pna.nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(25), __webpack_require__(74)))

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(106).EventEmitter;


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*<replacement>*/

var pna = __webpack_require__(75);
/*</replacement>*/

// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      pna.nextTick(emitErrorNT, this, err);
    }
    return this;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      pna.nextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });

  return this;
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy
};

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



/*<replacement>*/

var Buffer = __webpack_require__(76).Buffer;
/*</replacement>*/

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.



module.exports = Transform;

var Duplex = __webpack_require__(41);

/*<replacement>*/
var util = __webpack_require__(55);
util.inherits = __webpack_require__(49);
/*</replacement>*/

util.inherits(Transform, Duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) {
    return this.emit('error', new Error('write callback called multiple times'));
  }

  ts.writechunk = null;
  ts.writecb = null;

  if (data != null) // single equals check for both `null` and `undefined`
    this.push(data);

  cb(er);

  var rs = this._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  };

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.on('prefinish', prefinish);
}

function prefinish() {
  var _this = this;

  if (typeof this._flush === 'function') {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  var _this2 = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this2.emit('close');
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  if (stream._writableState.length) throw new Error('Calling transform done when ws.length != 0');

  if (stream._transformState.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

// eslint-disable-next-line import/no-unresolved
__webpack_require__(353);


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ES = __webpack_require__(362);

var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || (Math.pow(2, 53) - 1);

// eslint-disable-next-line max-params, max-statements
var FlattenIntoArray = function FlattenIntoArray(target, source, sourceLen, start, depth) {
	var targetIndex = start;
	var sourceIndex = 0;

	/*
	var mapperFunction;
	if (arguments.length > 5) {
		mapperFunction = arguments[5];
	}
	*/

	while (sourceIndex < sourceLen) {
		var P = ES.ToString(sourceIndex);
		var exists = ES.HasProperty(source, P);
		if (exists) {
			var element = ES.Get(source, P);
			/*
			if (typeof mapperFunction !== 'undefined') {
				if (arguments.length <= 6) {
					throw new TypeError('Assertion failed: thisArg is required when mapperFunction is provided');
				}
				element = ES.Call(mapperFunction, arguments[6], [element, sourceIndex, source]);
			}
			*/
			var shouldFlatten = false;
			if (depth > 0) {
				shouldFlatten = ES.IsArray(element);
			}
			if (shouldFlatten) {
				var elementLen = ES.ToLength(ES.Get(element, 'length'));
				targetIndex = FlattenIntoArray(target, element, elementLen, targetIndex, depth - 1);
			} else {
				if (targetIndex >= MAX_SAFE_INTEGER) {
					throw new TypeError('index too large');
				}
				ES.CreateDataPropertyOrThrow(target, ES.ToString(targetIndex), element);
				targetIndex += 1;
			}
		}
		sourceIndex += 1;
	}

	return targetIndex;
};

module.exports = function flat() {
	var O = ES.ToObject(this);
	var sourceLen = ES.ToLength(ES.Get(O, 'length'));

	var depthNum = 1;
	if (arguments.length > 0 && typeof arguments[0] !== 'undefined') {
		depthNum = ES.ToInteger(arguments[0]);
	}

	var A = ES.ArraySpeciesCreate(O, 0);
	FlattenIntoArray(A, O, sourceLen, 0, depthNum);
	return A;
};


/***/ }),
/* 152 */
/***/ (function(module, exports) {

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

if (hasSymbols) {
	var symToStr = Symbol.prototype.toString;
	var symStringRegex = /^Symbol\(.*\)$/;
	var isSymbolObject = function isSymbolObject(value) {
		if (typeof value.valueOf() !== 'symbol') { return false; }
		return symStringRegex.test(symToStr.call(value));
	};
	module.exports = function isSymbol(value) {
		if (typeof value === 'symbol') { return true; }
		if (toStr.call(value) !== '[object Symbol]') { return false; }
		try {
			return isSymbolObject(value);
		} catch (e) {
			return false;
		}
	};
} else {
	module.exports = function isSymbol(value) {
		// this environment does not support Symbols.
		return false;
	};
}


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* globals
	Set,
	Map,
	WeakSet,
	WeakMap,

	Promise,

	Symbol,
	Proxy,

	Atomics,
	SharedArrayBuffer,

	ArrayBuffer,
	DataView,
	Uint8Array,
	Float32Array,
	Float64Array,
	Int8Array,
	Int16Array,
	Int32Array,
	Uint8ClampedArray,
	Uint16Array,
	Uint32Array,
*/

var undefined; // eslint-disable-line no-shadow-restricted-names

var ThrowTypeError = Object.getOwnPropertyDescriptor
	? (function () { return Object.getOwnPropertyDescriptor(arguments, 'callee').get; }())
	: function () { throw new TypeError(); };

var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var generator; // = function * () {};
var generatorFunction = generator ? getProto(generator) : undefined;
var asyncFn; // async function() {};
var asyncFunction = asyncFn ? asyncFn.constructor : undefined;
var asyncGen; // async function * () {};
var asyncGenFunction = asyncGen ? getProto(asyncGen) : undefined;
var asyncGenIterator = asyncGen ? asyncGen() : undefined;

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'$ %Array%': Array,
	'$ %ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'$ %ArrayBufferPrototype%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer.prototype,
	'$ %ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'$ %ArrayPrototype%': Array.prototype,
	'$ %ArrayProto_entries%': Array.prototype.entries,
	'$ %ArrayProto_forEach%': Array.prototype.forEach,
	'$ %ArrayProto_keys%': Array.prototype.keys,
	'$ %ArrayProto_values%': Array.prototype.values,
	'$ %AsyncFromSyncIteratorPrototype%': undefined,
	'$ %AsyncFunction%': asyncFunction,
	'$ %AsyncFunctionPrototype%': asyncFunction ? asyncFunction.prototype : undefined,
	'$ %AsyncGenerator%': asyncGen ? getProto(asyncGenIterator) : undefined,
	'$ %AsyncGeneratorFunction%': asyncGenFunction,
	'$ %AsyncGeneratorPrototype%': asyncGenFunction ? asyncGenFunction.prototype : undefined,
	'$ %AsyncIteratorPrototype%': asyncGenIterator && hasSymbols && Symbol.asyncIterator ? asyncGenIterator[Symbol.asyncIterator]() : undefined,
	'$ %Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'$ %Boolean%': Boolean,
	'$ %BooleanPrototype%': Boolean.prototype,
	'$ %DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'$ %DataViewPrototype%': typeof DataView === 'undefined' ? undefined : DataView.prototype,
	'$ %Date%': Date,
	'$ %DatePrototype%': Date.prototype,
	'$ %decodeURI%': decodeURI,
	'$ %decodeURIComponent%': decodeURIComponent,
	'$ %encodeURI%': encodeURI,
	'$ %encodeURIComponent%': encodeURIComponent,
	'$ %Error%': Error,
	'$ %ErrorPrototype%': Error.prototype,
	'$ %eval%': eval, // eslint-disable-line no-eval
	'$ %EvalError%': EvalError,
	'$ %EvalErrorPrototype%': EvalError.prototype,
	'$ %Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'$ %Float32ArrayPrototype%': typeof Float32Array === 'undefined' ? undefined : Float32Array.prototype,
	'$ %Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'$ %Float64ArrayPrototype%': typeof Float64Array === 'undefined' ? undefined : Float64Array.prototype,
	'$ %Function%': Function,
	'$ %FunctionPrototype%': Function.prototype,
	'$ %Generator%': generator ? getProto(generator()) : undefined,
	'$ %GeneratorFunction%': generatorFunction,
	'$ %GeneratorPrototype%': generatorFunction ? generatorFunction.prototype : undefined,
	'$ %Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'$ %Int8ArrayPrototype%': typeof Int8Array === 'undefined' ? undefined : Int8Array.prototype,
	'$ %Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'$ %Int16ArrayPrototype%': typeof Int16Array === 'undefined' ? undefined : Int8Array.prototype,
	'$ %Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'$ %Int32ArrayPrototype%': typeof Int32Array === 'undefined' ? undefined : Int32Array.prototype,
	'$ %isFinite%': isFinite,
	'$ %isNaN%': isNaN,
	'$ %IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'$ %JSON%': JSON,
	'$ %JSONParse%': JSON.parse,
	'$ %Map%': typeof Map === 'undefined' ? undefined : Map,
	'$ %MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'$ %MapPrototype%': typeof Map === 'undefined' ? undefined : Map.prototype,
	'$ %Math%': Math,
	'$ %Number%': Number,
	'$ %NumberPrototype%': Number.prototype,
	'$ %Object%': Object,
	'$ %ObjectPrototype%': Object.prototype,
	'$ %ObjProto_toString%': Object.prototype.toString,
	'$ %ObjProto_valueOf%': Object.prototype.valueOf,
	'$ %parseFloat%': parseFloat,
	'$ %parseInt%': parseInt,
	'$ %Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'$ %PromisePrototype%': typeof Promise === 'undefined' ? undefined : Promise.prototype,
	'$ %PromiseProto_then%': typeof Promise === 'undefined' ? undefined : Promise.prototype.then,
	'$ %Promise_all%': typeof Promise === 'undefined' ? undefined : Promise.all,
	'$ %Promise_reject%': typeof Promise === 'undefined' ? undefined : Promise.reject,
	'$ %Promise_resolve%': typeof Promise === 'undefined' ? undefined : Promise.resolve,
	'$ %Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'$ %RangeError%': RangeError,
	'$ %RangeErrorPrototype%': RangeError.prototype,
	'$ %ReferenceError%': ReferenceError,
	'$ %ReferenceErrorPrototype%': ReferenceError.prototype,
	'$ %Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'$ %RegExp%': RegExp,
	'$ %RegExpPrototype%': RegExp.prototype,
	'$ %Set%': typeof Set === 'undefined' ? undefined : Set,
	'$ %SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'$ %SetPrototype%': typeof Set === 'undefined' ? undefined : Set.prototype,
	'$ %SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'$ %SharedArrayBufferPrototype%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer.prototype,
	'$ %String%': String,
	'$ %StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'$ %StringPrototype%': String.prototype,
	'$ %Symbol%': hasSymbols ? Symbol : undefined,
	'$ %SymbolPrototype%': hasSymbols ? Symbol.prototype : undefined,
	'$ %SyntaxError%': SyntaxError,
	'$ %SyntaxErrorPrototype%': SyntaxError.prototype,
	'$ %ThrowTypeError%': ThrowTypeError,
	'$ %TypedArray%': TypedArray,
	'$ %TypedArrayPrototype%': TypedArray ? TypedArray.prototype : undefined,
	'$ %TypeError%': TypeError,
	'$ %TypeErrorPrototype%': TypeError.prototype,
	'$ %Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'$ %Uint8ArrayPrototype%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array.prototype,
	'$ %Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'$ %Uint8ClampedArrayPrototype%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray.prototype,
	'$ %Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'$ %Uint16ArrayPrototype%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array.prototype,
	'$ %Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'$ %Uint32ArrayPrototype%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array.prototype,
	'$ %URIError%': URIError,
	'$ %URIErrorPrototype%': URIError.prototype,
	'$ %WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'$ %WeakMapPrototype%': typeof WeakMap === 'undefined' ? undefined : WeakMap.prototype,
	'$ %WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,
	'$ %WeakSetPrototype%': typeof WeakSet === 'undefined' ? undefined : WeakSet.prototype
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new TypeError('"allowMissing" argument must be a boolean');
	}

	var key = '$ ' + name;
	if (!(key in INTRINSICS)) {
		throw new SyntaxError('intrinsic ' + name + ' does not exist!');
	}

	// istanbul ignore if // hopefully this is impossible to test :-)
	if (typeof INTRINSICS[key] === 'undefined' && !allowMissing) {
		throw new TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
	}
	return INTRINSICS[key];
};


/***/ }),
/* 155 */
/***/ (function(module, exports) {

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};


/***/ }),
/* 156 */
/***/ (function(module, exports) {

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };


/***/ }),
/* 157 */
/***/ (function(module, exports) {

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};


/***/ }),
/* 158 */
/***/ (function(module, exports) {

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__(151);

module.exports = function getPolyfill() {
	return Array.prototype.flat || implementation;
};


/***/ }),
/* 160 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__160__;

/***/ }),
/* 161 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__161__;

/***/ }),
/* 162 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__162__;

/***/ }),
/* 163 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__163__;

/***/ }),
/* 164 */
/***/ (function(module) {

module.exports = {"a":"6.0.3"};

/***/ }),
/* 165 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__165__;

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var parse = __webpack_require__(339);

module.exports = function (data) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (typeof data === 'string') {
    data = Buffer.from(data);
  }

  var records = options && options.objname ? {} : [];
  var parser = new parse.Parser(options);

  parser.push = function (record) {
    if (options.objname === undefined) records.push(record);else {
      records[record[0]] = record[1];
    }
  };

  var err1 = parser.__parse(data, false);

  if (err1 !== undefined) throw err1;

  var err2 = parser.__parse(undefined, true);

  if (err2 !== undefined) throw err2;
  return records;
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(54).Buffer))

/***/ }),
/* 167 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__167__;

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(169);
module.exports = __webpack_require__(390);


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(170);

__webpack_require__(313);

__webpack_require__(315);

__webpack_require__(317);

__webpack_require__(319);

__webpack_require__(321);

__webpack_require__(323);

__webpack_require__(325);

__webpack_require__(327);

__webpack_require__(329);

__webpack_require__(333);

if (global._babelPolyfill && typeof console !== "undefined" && console.warn) {
  console.warn("@babel/polyfill is loaded more than once on this page. This is probably not desirable/intended " + "and may have consequences if different versions of the polyfills are applied sequentially. " + "If you do need to load the polyfill more than once, use @babel/polyfill/noConflict " + "instead to bypass the warning.");
}

global._babelPolyfill = true;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(25)))

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(171);
__webpack_require__(173);
__webpack_require__(174);
__webpack_require__(175);
__webpack_require__(176);
__webpack_require__(177);
__webpack_require__(178);
__webpack_require__(179);
__webpack_require__(180);
__webpack_require__(181);
__webpack_require__(182);
__webpack_require__(183);
__webpack_require__(184);
__webpack_require__(185);
__webpack_require__(186);
__webpack_require__(187);
__webpack_require__(188);
__webpack_require__(189);
__webpack_require__(190);
__webpack_require__(191);
__webpack_require__(192);
__webpack_require__(193);
__webpack_require__(194);
__webpack_require__(195);
__webpack_require__(196);
__webpack_require__(197);
__webpack_require__(198);
__webpack_require__(199);
__webpack_require__(200);
__webpack_require__(201);
__webpack_require__(202);
__webpack_require__(203);
__webpack_require__(204);
__webpack_require__(205);
__webpack_require__(206);
__webpack_require__(207);
__webpack_require__(208);
__webpack_require__(209);
__webpack_require__(210);
__webpack_require__(211);
__webpack_require__(212);
__webpack_require__(213);
__webpack_require__(214);
__webpack_require__(216);
__webpack_require__(217);
__webpack_require__(218);
__webpack_require__(219);
__webpack_require__(220);
__webpack_require__(221);
__webpack_require__(222);
__webpack_require__(223);
__webpack_require__(224);
__webpack_require__(225);
__webpack_require__(226);
__webpack_require__(227);
__webpack_require__(228);
__webpack_require__(229);
__webpack_require__(230);
__webpack_require__(231);
__webpack_require__(232);
__webpack_require__(233);
__webpack_require__(234);
__webpack_require__(235);
__webpack_require__(236);
__webpack_require__(237);
__webpack_require__(238);
__webpack_require__(239);
__webpack_require__(240);
__webpack_require__(241);
__webpack_require__(242);
__webpack_require__(243);
__webpack_require__(244);
__webpack_require__(245);
__webpack_require__(246);
__webpack_require__(247);
__webpack_require__(248);
__webpack_require__(249);
__webpack_require__(251);
__webpack_require__(252);
__webpack_require__(254);
__webpack_require__(255);
__webpack_require__(256);
__webpack_require__(257);
__webpack_require__(258);
__webpack_require__(259);
__webpack_require__(260);
__webpack_require__(263);
__webpack_require__(264);
__webpack_require__(265);
__webpack_require__(266);
__webpack_require__(267);
__webpack_require__(268);
__webpack_require__(269);
__webpack_require__(270);
__webpack_require__(271);
__webpack_require__(272);
__webpack_require__(273);
__webpack_require__(274);
__webpack_require__(275);
__webpack_require__(101);
__webpack_require__(276);
__webpack_require__(133);
__webpack_require__(277);
__webpack_require__(134);
__webpack_require__(278);
__webpack_require__(279);
__webpack_require__(280);
__webpack_require__(281);
__webpack_require__(135);
__webpack_require__(284);
__webpack_require__(285);
__webpack_require__(286);
__webpack_require__(287);
__webpack_require__(288);
__webpack_require__(289);
__webpack_require__(290);
__webpack_require__(291);
__webpack_require__(292);
__webpack_require__(293);
__webpack_require__(294);
__webpack_require__(295);
__webpack_require__(296);
__webpack_require__(297);
__webpack_require__(298);
__webpack_require__(299);
__webpack_require__(300);
__webpack_require__(301);
__webpack_require__(302);
__webpack_require__(303);
__webpack_require__(304);
__webpack_require__(305);
__webpack_require__(306);
__webpack_require__(307);
__webpack_require__(308);
__webpack_require__(309);
__webpack_require__(310);
__webpack_require__(311);
__webpack_require__(312);
module.exports = __webpack_require__(13);


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(5);
var has = __webpack_require__(17);
var DESCRIPTORS = __webpack_require__(12);
var $export = __webpack_require__(1);
var redefine = __webpack_require__(14);
var META = __webpack_require__(32).KEY;
var $fails = __webpack_require__(3);
var shared = __webpack_require__(80);
var setToStringTag = __webpack_require__(42);
var uid = __webpack_require__(34);
var wks = __webpack_require__(7);
var wksExt = __webpack_require__(81);
var wksDefine = __webpack_require__(115);
var enumKeys = __webpack_require__(172);
var isArray = __webpack_require__(84);
var anObject = __webpack_require__(4);
var isObject = __webpack_require__(6);
var toIObject = __webpack_require__(19);
var toPrimitive = __webpack_require__(31);
var createDesc = __webpack_require__(33);
var _create = __webpack_require__(38);
var gOPNExt = __webpack_require__(118);
var $GOPD = __webpack_require__(22);
var $DP = __webpack_require__(11);
var $keys = __webpack_require__(36);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(39).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(51).f = $propertyIsEnumerable;
  __webpack_require__(62).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(35)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(18)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(36);
var gOPS = __webpack_require__(62);
var pIE = __webpack_require__(51);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(38) });


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(12), 'Object', { defineProperty: __webpack_require__(11).f });


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(12), 'Object', { defineProperties: __webpack_require__(117) });


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(19);
var $getOwnPropertyDescriptor = __webpack_require__(22).f;

__webpack_require__(23)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(15);
var $getPrototypeOf = __webpack_require__(40);

__webpack_require__(23)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(15);
var $keys = __webpack_require__(36);

__webpack_require__(23)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(23)('getOwnPropertyNames', function () {
  return __webpack_require__(118).f;
});


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(6);
var meta = __webpack_require__(32).onFreeze;

__webpack_require__(23)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(6);
var meta = __webpack_require__(32).onFreeze;

__webpack_require__(23)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(6);
var meta = __webpack_require__(32).onFreeze;

__webpack_require__(23)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(6);

__webpack_require__(23)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(6);

__webpack_require__(23)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(6);

__webpack_require__(23)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(1);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(119) });


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(1);
$export($export.S, 'Object', { is: __webpack_require__(120) });


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(1);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(86).set });


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(52);
var test = {};
test[__webpack_require__(7)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(14)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(1);

$export($export.P, 'Function', { bind: __webpack_require__(121) });


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(11).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(12) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(6);
var getPrototypeOf = __webpack_require__(40);
var HAS_INSTANCE = __webpack_require__(7)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(11).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
var $parseInt = __webpack_require__(123);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
var $parseFloat = __webpack_require__(124);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(5);
var has = __webpack_require__(17);
var cof = __webpack_require__(28);
var inheritIfRequired = __webpack_require__(88);
var toPrimitive = __webpack_require__(31);
var fails = __webpack_require__(3);
var gOPN = __webpack_require__(39).f;
var gOPD = __webpack_require__(22).f;
var dP = __webpack_require__(11).f;
var $trim = __webpack_require__(63).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(38)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(12) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(14)(global, NUMBER, $Number);
}


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(1);
var toInteger = __webpack_require__(21);
var aNumberValue = __webpack_require__(125);
var repeat = __webpack_require__(89);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(3)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(1);
var $fails = __webpack_require__(3);
var aNumberValue = __webpack_require__(125);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(1);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(1);
var _isFinite = __webpack_require__(5).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(1);

$export($export.S, 'Number', { isInteger: __webpack_require__(126) });


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(1);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(1);
var isInteger = __webpack_require__(126);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(1);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(1);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
var $parseFloat = __webpack_require__(124);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
var $parseInt = __webpack_require__(123);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(1);
var log1p = __webpack_require__(127);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(1);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(1);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(1);
var sign = __webpack_require__(90);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(1);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(1);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(1);
var $expm1 = __webpack_require__(91);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(1);

$export($export.S, 'Math', { fround: __webpack_require__(215) });


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(90);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(1);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(1);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(1);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(1);

$export($export.S, 'Math', { log1p: __webpack_require__(127) });


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(1);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(1);

$export($export.S, 'Math', { sign: __webpack_require__(90) });


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(1);
var expm1 = __webpack_require__(91);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(1);
var expm1 = __webpack_require__(91);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(1);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
var toAbsoluteIndex = __webpack_require__(37);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
var toIObject = __webpack_require__(19);
var toLength = __webpack_require__(9);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(63)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(92)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(93)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(1);
var $at = __webpack_require__(92)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(1);
var toLength = __webpack_require__(9);
var context = __webpack_require__(94);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(96)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(1);
var context = __webpack_require__(94);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(96)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(89)
});


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(1);
var toLength = __webpack_require__(9);
var context = __webpack_require__(94);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(96)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(16)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(16)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(16)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(16)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(16)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(16)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(16)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(16)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(16)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(16)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(16)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(16)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(16)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(1);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(1);
var toObject = __webpack_require__(15);
var toPrimitive = __webpack_require__(31);

$export($export.P + $export.F * __webpack_require__(3)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(1);
var toISOString = __webpack_require__(250);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(3);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(14)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(7)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(18)(proto, TO_PRIMITIVE, __webpack_require__(253));


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(4);
var toPrimitive = __webpack_require__(31);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(1);

$export($export.S, 'Array', { isArray: __webpack_require__(84) });


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(26);
var $export = __webpack_require__(1);
var toObject = __webpack_require__(15);
var call = __webpack_require__(129);
var isArrayIter = __webpack_require__(97);
var toLength = __webpack_require__(9);
var createProperty = __webpack_require__(98);
var getIterFn = __webpack_require__(99);

$export($export.S + $export.F * !__webpack_require__(64)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(1);
var createProperty = __webpack_require__(98);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(3)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(1);
var toIObject = __webpack_require__(19);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(50) != Object || !__webpack_require__(20)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(1);
var html = __webpack_require__(85);
var cof = __webpack_require__(28);
var toAbsoluteIndex = __webpack_require__(37);
var toLength = __webpack_require__(9);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(3)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(1);
var aFunction = __webpack_require__(27);
var toObject = __webpack_require__(15);
var fails = __webpack_require__(3);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(20)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(1);
var $forEach = __webpack_require__(24)(0);
var STRICT = __webpack_require__(20)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(262);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6);
var isArray = __webpack_require__(84);
var SPECIES = __webpack_require__(7)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(1);
var $map = __webpack_require__(24)(1);

$export($export.P + $export.F * !__webpack_require__(20)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(1);
var $filter = __webpack_require__(24)(2);

$export($export.P + $export.F * !__webpack_require__(20)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(1);
var $some = __webpack_require__(24)(3);

$export($export.P + $export.F * !__webpack_require__(20)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(1);
var $every = __webpack_require__(24)(4);

$export($export.P + $export.F * !__webpack_require__(20)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(1);
var $reduce = __webpack_require__(130);

$export($export.P + $export.F * !__webpack_require__(20)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(1);
var $reduce = __webpack_require__(130);

$export($export.P + $export.F * !__webpack_require__(20)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(1);
var $indexOf = __webpack_require__(61)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(20)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(1);
var toIObject = __webpack_require__(19);
var toInteger = __webpack_require__(21);
var toLength = __webpack_require__(9);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(20)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(1);

$export($export.P, 'Array', { copyWithin: __webpack_require__(131) });

__webpack_require__(44)('copyWithin');


/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(1);

$export($export.P, 'Array', { fill: __webpack_require__(100) });

__webpack_require__(44)('fill');


/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(1);
var $find = __webpack_require__(24)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(44)(KEY);


/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(1);
var $find = __webpack_require__(24)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(44)(KEY);


/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(45)('Array');


/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var inheritIfRequired = __webpack_require__(88);
var dP = __webpack_require__(11).f;
var gOPN = __webpack_require__(39).f;
var isRegExp = __webpack_require__(95);
var $flags = __webpack_require__(65);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(12) && (!CORRECT_NEW || __webpack_require__(3)(function () {
  re2[__webpack_require__(7)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(14)(global, 'RegExp', $RegExp);
}

__webpack_require__(45)('RegExp');


/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(134);
var anObject = __webpack_require__(4);
var $flags = __webpack_require__(65);
var DESCRIPTORS = __webpack_require__(12);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(14)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(3)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(4);
var toLength = __webpack_require__(9);
var advanceStringIndex = __webpack_require__(103);
var regExpExec = __webpack_require__(66);

// @@match logic
__webpack_require__(67)('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(4);
var toObject = __webpack_require__(15);
var toLength = __webpack_require__(9);
var toInteger = __webpack_require__(21);
var advanceStringIndex = __webpack_require__(103);
var regExpExec = __webpack_require__(66);
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__(67)('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(4);
var sameValue = __webpack_require__(120);
var regExpExec = __webpack_require__(66);

// @@search logic
__webpack_require__(67)('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[SEARCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function (regexp) {
      var res = maybeCallNative($search, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});


/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isRegExp = __webpack_require__(95);
var anObject = __webpack_require__(4);
var speciesConstructor = __webpack_require__(53);
var advanceStringIndex = __webpack_require__(103);
var toLength = __webpack_require__(9);
var callRegExpExec = __webpack_require__(66);
var regexpExec = __webpack_require__(102);
var fails = __webpack_require__(3);
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { RegExp(MAX_UINT32, 'y'); });

// @@split logic
__webpack_require__(67)('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});


/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var macrotask = __webpack_require__(104).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(28)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 283 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(138);
var validate = __webpack_require__(48);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(70)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(138);
var validate = __webpack_require__(48);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(70)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each = __webpack_require__(24)(0);
var redefine = __webpack_require__(14);
var meta = __webpack_require__(32);
var assign = __webpack_require__(119);
var weak = __webpack_require__(139);
var isObject = __webpack_require__(6);
var fails = __webpack_require__(3);
var validate = __webpack_require__(48);
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(70)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(139);
var validate = __webpack_require__(48);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(70)(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);


/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(1);
var $typed = __webpack_require__(71);
var buffer = __webpack_require__(105);
var anObject = __webpack_require__(4);
var toAbsoluteIndex = __webpack_require__(37);
var toLength = __webpack_require__(9);
var isObject = __webpack_require__(6);
var ArrayBuffer = __webpack_require__(5).ArrayBuffer;
var speciesConstructor = __webpack_require__(53);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(3)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var fin = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(fin - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < fin) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(45)(ARRAY_BUFFER);


/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
$export($export.G + $export.W + $export.F * !__webpack_require__(71).ABV, {
  DataView: __webpack_require__(105).DataView
});


/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(1);
var aFunction = __webpack_require__(27);
var anObject = __webpack_require__(4);
var rApply = (__webpack_require__(5).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(3)(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(1);
var create = __webpack_require__(38);
var aFunction = __webpack_require__(27);
var anObject = __webpack_require__(4);
var isObject = __webpack_require__(6);
var fails = __webpack_require__(3);
var bind = __webpack_require__(121);
var rConstruct = (__webpack_require__(5).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(11);
var $export = __webpack_require__(1);
var anObject = __webpack_require__(4);
var toPrimitive = __webpack_require__(31);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(3)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(1);
var gOPD = __webpack_require__(22).f;
var anObject = __webpack_require__(4);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__(1);
var anObject = __webpack_require__(4);
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__(128)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(22);
var getPrototypeOf = __webpack_require__(40);
var has = __webpack_require__(17);
var $export = __webpack_require__(1);
var isObject = __webpack_require__(6);
var anObject = __webpack_require__(4);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(22);
var $export = __webpack_require__(1);
var anObject = __webpack_require__(4);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(1);
var getProto = __webpack_require__(40);
var anObject = __webpack_require__(4);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(1);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(1);
var anObject = __webpack_require__(4);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(1);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(141) });


/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(1);
var anObject = __webpack_require__(4);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(11);
var gOPD = __webpack_require__(22);
var getPrototypeOf = __webpack_require__(40);
var has = __webpack_require__(17);
var $export = __webpack_require__(1);
var createDesc = __webpack_require__(33);
var anObject = __webpack_require__(4);
var isObject = __webpack_require__(6);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = gOPD.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      dP.f(receiver, propertyKey, existingDescriptor);
    } else dP.f(receiver, propertyKey, createDesc(0, V));
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(1);
var setProto = __webpack_require__(86);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(314);
module.exports = __webpack_require__(13).Array.includes;


/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(1);
var $includes = __webpack_require__(61)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(44)('includes');


/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(316);
module.exports = __webpack_require__(13).String.padStart;


/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(1);
var $pad = __webpack_require__(142);
var userAgent = __webpack_require__(69);

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(318);
module.exports = __webpack_require__(13).String.padEnd;


/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(1);
var $pad = __webpack_require__(142);
var userAgent = __webpack_require__(69);

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(320);
module.exports = __webpack_require__(81).f('asyncIterator');


/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(115)('asyncIterator');


/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(322);
module.exports = __webpack_require__(13).Object.getOwnPropertyDescriptors;


/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(1);
var ownKeys = __webpack_require__(141);
var toIObject = __webpack_require__(19);
var gOPD = __webpack_require__(22);
var createProperty = __webpack_require__(98);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(324);
module.exports = __webpack_require__(13).Object.values;


/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(1);
var $values = __webpack_require__(143)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(326);
module.exports = __webpack_require__(13).Object.entries;


/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(1);
var $entries = __webpack_require__(143)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(135);
__webpack_require__(328);
module.exports = __webpack_require__(13).Promise['finally'];


/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(1);
var core = __webpack_require__(13);
var global = __webpack_require__(5);
var speciesConstructor = __webpack_require__(53);
var promiseResolve = __webpack_require__(137);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(330);
__webpack_require__(331);
__webpack_require__(332);
module.exports = __webpack_require__(13);


/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(5);
var $export = __webpack_require__(1);
var userAgent = __webpack_require__(69);
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});


/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
var $task = __webpack_require__(104);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(101);
var getKeys = __webpack_require__(36);
var redefine = __webpack_require__(14);
var global = __webpack_require__(5);
var hide = __webpack_require__(18);
var Iterators = __webpack_require__(43);
var wks = __webpack_require__(7);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 333 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(335);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(73)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(72)(false);
// Module
exports.push([module.i, ".dev-body{\n  margin: 2rem auto;\n  width: 100%;\n  max-width: 1500px;\n}\n\n.dev-reload-button{\n  position: absolute;\n  left: 1rem;\n  top: 1rem;\n  color: #ccc;\n}\n\n.keen-explorer-template{\n  margin: 0 auto;\n  width: 100%;\n  max-width: 1500px;\n}\n\n.keen-explorer-template #keen-explorer-container{\n    padding: 1rem;\n  }\n\n.PresetDateRangePicker_panel {\n  padding: 0 22px 11px\n}\n\n.PresetDateRangePicker_button {\n  position: relative;\n  height: 100%;\n  text-align: center;\n  background: 0 0;\n  border: 2px solid #00a699;\n  color: #00a699;\n  padding: 4px 12px;\n  margin-right: 8px;\n  font: inherit;\n  font-weight: 700;\n  line-height: normal;\n  overflow: visible;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  cursor: pointer\n}\n\n.PresetDateRangePicker_button:active {\n  outline: 0\n}\n\n.PresetDateRangePicker_button__selected {\n  color: #fff;\n  background: #00a699\n}\n\n.SingleDatePickerInput {\n  display: inline-block;\n  background-color: #fff\n}\n\n.SingleDatePickerInput__withBorder {\n  border-radius: 2px;\n  border: 1px solid #dbdbdb\n}\n\n.SingleDatePickerInput__rtl {\n  direction: rtl\n}\n\n.SingleDatePickerInput__disabled {\n  background-color: #f2f2f2\n}\n\n.SingleDatePickerInput__block {\n  display: block\n}\n\n.SingleDatePickerInput__showClearDate {\n  padding-right: 30px\n}\n\n.SingleDatePickerInput_clearDate {\n  background: 0 0;\n  border: 0;\n  color: inherit;\n  font: inherit;\n  line-height: normal;\n  overflow: visible;\n  cursor: pointer;\n  padding: 10px;\n  margin: 0 10px 0 5px;\n  position: absolute;\n  right: 0;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n  transform: translateY(-50%)\n}\n\n.SingleDatePickerInput_clearDate__default:focus,\n.SingleDatePickerInput_clearDate__default:hover {\n  background: #dbdbdb;\n  border-radius: 50%\n}\n\n.SingleDatePickerInput_clearDate__small {\n  padding: 6px\n}\n\n.SingleDatePickerInput_clearDate__hide {\n  visibility: hidden\n}\n\n.SingleDatePickerInput_clearDate_svg {\n  fill: #82888a;\n  height: 12px;\n  width: 15px;\n  vertical-align: middle\n}\n\n.SingleDatePickerInput_clearDate_svg__small {\n  height: 9px\n}\n\n.SingleDatePickerInput_calendarIcon {\n  background: 0 0;\n  border: 0;\n  color: inherit;\n  font: inherit;\n  line-height: normal;\n  overflow: visible;\n  cursor: pointer;\n  display: inline-block;\n  vertical-align: middle;\n  padding: 10px;\n  margin: 0 5px 0 10px\n}\n\n.SingleDatePickerInput_calendarIcon_svg {\n  fill: #82888a;\n  height: 15px;\n  width: 14px;\n  vertical-align: middle\n}\n\n.SingleDatePicker {\n  position: relative;\n  display: inline-block\n}\n\n.SingleDatePicker__block {\n  display: block\n}\n\n.SingleDatePicker_picker {\n  z-index: 1;\n  background-color: #fff;\n  position: absolute\n}\n\n.SingleDatePicker_picker__rtl {\n  direction: rtl\n}\n\n.SingleDatePicker_picker__directionLeft {\n  left: 0\n}\n\n.SingleDatePicker_picker__directionRight {\n  right: 0\n}\n\n.SingleDatePicker_picker__portal {\n  background-color: rgba(0,0,0,.3);\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%\n}\n\n.SingleDatePicker_picker__fullScreenPortal {\n  background-color: #fff\n}\n\n.SingleDatePicker_closeButton {\n  background: 0 0;\n  border: 0;\n  color: inherit;\n  font: inherit;\n  line-height: normal;\n  overflow: visible;\n  cursor: pointer;\n  position: absolute;\n  top: 0;\n  right: 0;\n  padding: 15px;\n  z-index: 2\n}\n\n.SingleDatePicker_closeButton:focus,\n.SingleDatePicker_closeButton:hover {\n  color: darken(#cacccd,10%);\n  text-decoration: none\n}\n\n.SingleDatePicker_closeButton_svg {\n  height: 15px;\n  width: 15px;\n  fill: #cacccd\n}\n\n.DayPickerKeyboardShortcuts_buttonReset {\n  background: 0 0;\n  border: 0;\n  border-radius: 0;\n  color: inherit;\n  font: inherit;\n  line-height: normal;\n  overflow: visible;\n  padding: 0;\n  cursor: pointer;\n  font-size: 14px\n}\n\n.DayPickerKeyboardShortcuts_buttonReset:active {\n  outline: 0\n}\n\n.DayPickerKeyboardShortcuts_show {\n  width: 33px;\n  height: 26px;\n  position: absolute;\n  z-index: 2\n}\n\n.DayPickerKeyboardShortcuts_show::before {\n  content: \"\";\n  display: block;\n  position: absolute\n}\n\n.DayPickerKeyboardShortcuts_show__bottomRight {\n  bottom: 0;\n  right: 0\n}\n\n.DayPickerKeyboardShortcuts_show__bottomRight::before {\n  border-top: 26px solid transparent;\n  border-right: 33px solid #00a699;\n  bottom: 0;\n  right: 0\n}\n\n.DayPickerKeyboardShortcuts_show__bottomRight:hover::before {\n  border-right: 33px solid #008489\n}\n\n.DayPickerKeyboardShortcuts_show__topRight {\n  top: 0;\n  right: 0\n}\n\n.DayPickerKeyboardShortcuts_show__topRight::before {\n  border-bottom: 26px solid transparent;\n  border-right: 33px solid #00a699;\n  top: 0;\n  right: 0\n}\n\n.DayPickerKeyboardShortcuts_show__topRight:hover::before {\n  border-right: 33px solid #008489\n}\n\n.DayPickerKeyboardShortcuts_show__topLeft {\n  top: 0;\n  left: 0\n}\n\n.DayPickerKeyboardShortcuts_show__topLeft::before {\n  border-bottom: 26px solid transparent;\n  border-left: 33px solid #00a699;\n  top: 0;\n  left: 0\n}\n\n.DayPickerKeyboardShortcuts_show__topLeft:hover::before {\n  border-left: 33px solid #008489\n}\n\n.DayPickerKeyboardShortcuts_showSpan {\n  color: #fff;\n  position: absolute\n}\n\n.DayPickerKeyboardShortcuts_showSpan__bottomRight {\n  bottom: 0;\n  right: 5px\n}\n\n.DayPickerKeyboardShortcuts_showSpan__topRight {\n  top: 1px;\n  right: 5px\n}\n\n.DayPickerKeyboardShortcuts_showSpan__topLeft {\n  top: 1px;\n  left: 5px\n}\n\n.DayPickerKeyboardShortcuts_panel {\n  overflow: auto;\n  background: #fff;\n  border: 1px solid #dbdbdb;\n  border-radius: 2px;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  left: 0;\n  z-index: 2;\n  padding: 22px;\n  margin: 33px;\n  text-align: left\n}\n\n.DayPickerKeyboardShortcuts_title {\n  font-size: 16px;\n  font-weight: 700;\n  margin: 0\n}\n\n.DayPickerKeyboardShortcuts_list {\n  list-style: none;\n  padding: 0;\n  font-size: 14px\n}\n\n.DayPickerKeyboardShortcuts_close {\n  position: absolute;\n  right: 22px;\n  top: 22px;\n  z-index: 2\n}\n\n.DayPickerKeyboardShortcuts_close:active {\n  outline: 0\n}\n\n.DayPickerKeyboardShortcuts_closeSvg {\n  height: 15px;\n  width: 15px;\n  fill: #cacccd\n}\n\n.DayPickerKeyboardShortcuts_closeSvg:focus,\n.DayPickerKeyboardShortcuts_closeSvg:hover {\n  fill: #82888a\n}\n\n.CalendarDay {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  cursor: pointer;\n  font-size: 14px;\n  text-align: center\n}\n\n.CalendarDay:active {\n  outline: 0\n}\n\n.CalendarDay__defaultCursor {\n  cursor: default\n}\n\n.CalendarDay__default {\n  border: 1px solid #e4e7e7;\n  color: #484848;\n  background: #fff\n}\n\n.CalendarDay__default:hover {\n  background: #e4e7e7;\n  border: 1px solid #e4e7e7;\n  color: inherit\n}\n\n.CalendarDay__hovered_offset {\n  background: #f4f5f5;\n  border: 1px double #e4e7e7;\n  color: inherit\n}\n\n.CalendarDay__outside {\n  border: 0;\n  background: #fff;\n  color: #484848\n}\n\n.CalendarDay__outside:hover {\n  border: 0\n}\n\n.CalendarDay__blocked_minimum_nights {\n  background: #fff;\n  border: 1px solid #eceeee;\n  color: #cacccd\n}\n\n.CalendarDay__blocked_minimum_nights:active,\n.CalendarDay__blocked_minimum_nights:hover {\n  background: #fff;\n  color: #cacccd\n}\n\n.CalendarDay__highlighted_calendar {\n  background: #ffe8bc;\n  color: #484848\n}\n\n.CalendarDay__highlighted_calendar:active,\n.CalendarDay__highlighted_calendar:hover {\n  background: #ffce71;\n  color: #484848\n}\n\n.CalendarDay__selected_span {\n  background: #66e2da;\n  border: 1px double #33dacd;\n  color: #fff\n}\n\n.CalendarDay__selected_span:active,\n.CalendarDay__selected_span:hover {\n  background: #33dacd;\n  border: 1px double #33dacd;\n  color: #fff\n}\n\n.CalendarDay__last_in_range,\n.CalendarDay__last_in_range:hover {\n  border-style: solid\n}\n\n.CalendarDay__selected,\n.CalendarDay__selected:active,\n.CalendarDay__selected:hover {\n  background: #00a699;\n  border: 1px double #00a699;\n  color: #fff\n}\n\n.CalendarDay__hovered_span,\n.CalendarDay__hovered_span:hover {\n  background: #b2f1ec;\n  border: 1px double #80e8e0;\n  color: #007a87\n}\n\n.CalendarDay__hovered_span:active {\n  background: #80e8e0;\n  border: 1px double #80e8e0;\n  color: #007a87\n}\n\n.CalendarDay__blocked_calendar,\n.CalendarDay__blocked_calendar:active,\n.CalendarDay__blocked_calendar:hover {\n  background: #cacccd;\n  border: 1px solid #cacccd;\n  color: #82888a\n}\n\n.CalendarDay__blocked_out_of_range,\n.CalendarDay__blocked_out_of_range:active,\n.CalendarDay__blocked_out_of_range:hover {\n  background: #fff;\n  border: 1px solid #e4e7e7;\n  color: #cacccd\n}\n\n.CalendarMonth {\n  background: #fff;\n  text-align: center;\n  vertical-align: top;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none\n}\n\n.CalendarMonth_table {\n  border-collapse: collapse;\n  border-spacing: 0\n}\n\n.CalendarMonth_verticalSpacing {\n  border-collapse: separate\n}\n\n.CalendarMonth_caption {\n  color: #484848;\n  font-size: 18px;\n  text-align: center;\n  padding-top: 22px;\n  padding-bottom: 37px;\n  caption-side: top;\n  caption-side: initial\n}\n\n.CalendarMonth_caption__verticalScrollable {\n  padding-top: 12px;\n  padding-bottom: 7px\n}\n\n.CalendarMonthGrid {\n  background: #fff;\n  text-align: left;\n  z-index: 0\n}\n\n.CalendarMonthGrid__animating {\n  z-index: 1\n}\n\n.CalendarMonthGrid__horizontal {\n  position: absolute;\n  left: 9px\n}\n\n.CalendarMonthGrid__vertical {\n  margin: 0 auto\n}\n\n.CalendarMonthGrid__vertical_scrollable {\n  margin: 0 auto;\n  overflow-y: scroll\n}\n\n.CalendarMonthGrid_month__horizontal {\n  display: inline-block;\n  vertical-align: top;\n  min-height: 100%\n}\n\n.CalendarMonthGrid_month__hideForAnimation {\n  position: absolute;\n  z-index: -1;\n  opacity: 0;\n  pointer-events: none\n}\n\n.CalendarMonthGrid_month__hidden {\n  visibility: hidden\n}\n\n.DayPickerNavigation {\n  position: relative;\n  z-index: 2\n}\n\n.DayPickerNavigation__horizontal {\n  height: 0\n}\n\n.DayPickerNavigation__verticalDefault {\n  position: absolute;\n  width: 100%;\n  height: 52px;\n  bottom: 0;\n  left: 0\n}\n\n.DayPickerNavigation__verticalScrollableDefault {\n  position: relative\n}\n\n.DayPickerNavigation_button {\n  cursor: pointer;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  border: 0;\n  padding: 0;\n  margin: 0\n}\n\n.DayPickerNavigation_button__default {\n  border: 1px solid #e4e7e7;\n  background-color: #fff;\n  color: #757575\n}\n\n.DayPickerNavigation_button__default:focus,\n.DayPickerNavigation_button__default:hover {\n  border: 1px solid #c4c4c4\n}\n\n.DayPickerNavigation_button__default:active {\n  background: #f2f2f2\n}\n\n.DayPickerNavigation_button__disabled {\n  cursor: default;\n  border: 1px solid #f2f2f2\n}\n\n.DayPickerNavigation_button__disabled:focus,\n.DayPickerNavigation_button__disabled:hover {\n  border: 1px solid #f2f2f2\n}\n\n.DayPickerNavigation_button__disabled:active {\n  background: 0 0\n}\n\n.DayPickerNavigation_button__horizontalDefault {\n  position: absolute;\n  top: 18px;\n  line-height: .78;\n  border-radius: 3px;\n  padding: 6px 9px\n}\n\n.DayPickerNavigation_leftButton__horizontalDefault {\n  left: 22px\n}\n\n.DayPickerNavigation_rightButton__horizontalDefault {\n  right: 22px\n}\n\n.DayPickerNavigation_button__verticalDefault {\n  padding: 5px;\n  background: #fff;\n  -webkit-box-shadow: 0 0 5px 2px rgba(0,0,0,.1);\n          box-shadow: 0 0 5px 2px rgba(0,0,0,.1);\n  position: relative;\n  display: inline-block;\n  text-align: center;\n  height: 100%;\n  width: 50%\n}\n\n.DayPickerNavigation_nextButton__verticalDefault {\n  border-left: 0\n}\n\n.DayPickerNavigation_nextButton__verticalScrollableDefault {\n  width: 100%\n}\n\n.DayPickerNavigation_svg__horizontal {\n  height: 19px;\n  width: 19px;\n  fill: #82888a;\n  display: block\n}\n\n.DayPickerNavigation_svg__vertical {\n  height: 42px;\n  width: 42px;\n  fill: #484848\n}\n\n.DayPickerNavigation_svg__disabled {\n  fill: #f2f2f2\n}\n\n.DayPicker {\n  background: #fff;\n  position: relative;\n  text-align: left\n}\n\n.DayPicker__horizontal {\n  background: #fff\n}\n\n.DayPicker__verticalScrollable {\n  height: 100%\n}\n\n.DayPicker__hidden {\n  visibility: hidden\n}\n\n.DayPicker__withBorder {\n  -webkit-box-shadow: 0 2px 6px rgba(0,0,0,.05),0 0 0 1px rgba(0,0,0,.07);\n          box-shadow: 0 2px 6px rgba(0,0,0,.05),0 0 0 1px rgba(0,0,0,.07);\n  border-radius: 3px\n}\n\n.DayPicker_portal__horizontal {\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  position: absolute;\n  left: 50%;\n  top: 50%\n}\n\n.DayPicker_portal__vertical {\n  position: static;\n  position: initial\n}\n\n.DayPicker_focusRegion {\n  outline: 0\n}\n\n.DayPicker_calendarInfo__horizontal,\n.DayPicker_wrapper__horizontal {\n  display: inline-block;\n  vertical-align: top\n}\n\n.DayPicker_weekHeaders {\n  position: relative\n}\n\n.DayPicker_weekHeaders__horizontal {\n  margin-left: 9px\n}\n\n.DayPicker_weekHeader {\n  color: #757575;\n  position: absolute;\n  top: 62px;\n  z-index: 2;\n  text-align: left\n}\n\n.DayPicker_weekHeader__vertical {\n  left: 50%\n}\n\n.DayPicker_weekHeader__verticalScrollable {\n  top: 0;\n  display: table-row;\n  border-bottom: 1px solid #dbdbdb;\n  background: #fff;\n  margin-left: 0;\n  left: 0;\n  width: 100%;\n  text-align: center\n}\n\n.DayPicker_weekHeader_ul {\n  list-style: none;\n  margin: 1px 0;\n  padding-left: 0;\n  padding-right: 0;\n  font-size: 14px\n}\n\n.DayPicker_weekHeader_li {\n  display: inline-block;\n  text-align: center\n}\n\n.DayPicker_transitionContainer {\n  position: relative;\n  overflow: hidden;\n  border-radius: 3px\n}\n\n.DayPicker_transitionContainer__horizontal {\n  -webkit-transition: height .2s ease-in-out;\n  -o-transition: height .2s ease-in-out;\n  transition: height .2s ease-in-out\n}\n\n.DayPicker_transitionContainer__vertical {\n  width: 100%\n}\n\n.DayPicker_transitionContainer__verticalScrollable {\n  padding-top: 20px;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  left: 0;\n  overflow-y: scroll\n}\n\n.DateInput {\n  margin: 0;\n  padding: 0;\n  background: #fff;\n  position: relative;\n  display: inline-block;\n  width: 130px;\n  vertical-align: middle\n}\n\n.DateInput__small {\n  width: 97px\n}\n\n.DateInput__block {\n  width: 100%\n}\n\n.DateInput__disabled {\n  background: #f2f2f2;\n  color: #dbdbdb\n}\n\n.DateInput_input {\n  font-weight: 200;\n  font-size: 19px;\n  line-height: 24px;\n  color: #484848;\n  background-color: #fff;\n  width: 100%;\n  padding: 11px 11px 9px;\n  border: 0;\n  border-top: 0;\n  border-right: 0;\n  border-bottom: 2px solid transparent;\n  border-left: 0;\n  border-radius: 0\n}\n\n.DateInput_input__small {\n  font-size: 15px;\n  line-height: 18px;\n  letter-spacing: .2px;\n  padding: 7px 7px 5px\n}\n\n.DateInput_input__regular {\n  font-weight: auto\n}\n\n.DateInput_input__readOnly {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none\n}\n\n.DateInput_input__focused {\n  outline: 0;\n  background: #fff;\n  border: 0;\n  border-top: 0;\n  border-right: 0;\n  border-bottom: 2px solid #008489;\n  border-left: 0\n}\n\n.DateInput_input__disabled {\n  background: #f2f2f2;\n  font-style: italic\n}\n\n.DateInput_screenReaderMessage {\n  border: 0;\n  clip: rect(0,0,0,0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px\n}\n\n.DateInput_fang {\n  position: absolute;\n  width: 20px;\n  height: 10px;\n  left: 22px;\n  z-index: 2\n}\n\n.DateInput_fangShape {\n  fill: #fff\n}\n\n.DateInput_fangStroke {\n  stroke: #dbdbdb;\n  fill: transparent\n}\n\n.DateRangePickerInput {\n  background-color: #fff;\n  display: inline-block\n}\n\n.DateRangePickerInput__disabled {\n  background: #f2f2f2\n}\n\n.DateRangePickerInput__withBorder {\n  border-radius: 2px;\n  border: 1px solid #dbdbdb\n}\n\n.DateRangePickerInput__rtl {\n  direction: rtl\n}\n\n.DateRangePickerInput__block {\n  display: block\n}\n\n.DateRangePickerInput__showClearDates {\n  padding-right: 30px\n}\n\n.DateRangePickerInput_arrow {\n  display: inline-block;\n  vertical-align: middle;\n  color: #484848\n}\n\n.DateRangePickerInput_arrow_svg {\n  vertical-align: middle;\n  fill: #484848;\n  height: 24px;\n  width: 24px\n}\n\n.DateRangePickerInput_clearDates {\n  background: 0 0;\n  border: 0;\n  color: inherit;\n  font: inherit;\n  line-height: normal;\n  overflow: visible;\n  cursor: pointer;\n  padding: 10px;\n  margin: 0 10px 0 5px;\n  position: absolute;\n  right: 0;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n  transform: translateY(-50%)\n}\n\n.DateRangePickerInput_clearDates__small {\n  padding: 6px\n}\n\n.DateRangePickerInput_clearDates_default:focus,\n.DateRangePickerInput_clearDates_default:hover {\n  background: #dbdbdb;\n  border-radius: 50%\n}\n\n.DateRangePickerInput_clearDates__hide {\n  visibility: hidden\n}\n\n.DateRangePickerInput_clearDates_svg {\n  fill: #82888a;\n  height: 12px;\n  width: 15px;\n  vertical-align: middle\n}\n\n.DateRangePickerInput_clearDates_svg__small {\n  height: 9px\n}\n\n.DateRangePickerInput_calendarIcon {\n  background: 0 0;\n  border: 0;\n  color: inherit;\n  font: inherit;\n  line-height: normal;\n  overflow: visible;\n  cursor: pointer;\n  display: inline-block;\n  vertical-align: middle;\n  padding: 10px;\n  margin: 0 5px 0 10px\n}\n\n.DateRangePickerInput_calendarIcon_svg {\n  fill: #82888a;\n  height: 15px;\n  width: 14px;\n  vertical-align: middle\n}\n\n.DateRangePicker {\n  position: relative;\n  display: inline-block\n}\n\n.DateRangePicker__block {\n  display: block\n}\n\n.DateRangePicker_picker {\n  z-index: 1;\n  background-color: #fff;\n  position: absolute\n}\n\n.DateRangePicker_picker__rtl {\n  direction: rtl\n}\n\n.DateRangePicker_picker__directionLeft {\n  left: 0\n}\n\n.DateRangePicker_picker__directionRight {\n  right: 0\n}\n\n.DateRangePicker_picker__portal {\n  background-color: rgba(0,0,0,.3);\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%\n}\n\n.DateRangePicker_picker__fullScreenPortal {\n  background-color: #fff\n}\n\n.DateRangePicker_closeButton {\n  background: 0 0;\n  border: 0;\n  color: inherit;\n  font: inherit;\n  line-height: normal;\n  overflow: visible;\n  cursor: pointer;\n  position: absolute;\n  top: 0;\n  right: 0;\n  padding: 15px;\n  z-index: 2\n}\n\n.DateRangePicker_closeButton:focus,\n.DateRangePicker_closeButton:hover {\n  color: darken(#cacccd,10%);\n  text-decoration: none\n}\n\n.DateRangePicker_closeButton_svg {\n  height: 15px;\n  width: 15px;\n  fill: #cacccd\n}\n\n.rc-time-picker {\n  display: inline-block;\n  position: relative;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n\n.rc-time-picker * {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n\n.rc-time-picker-clear {\n  position: absolute;\n  right: 6px;\n  cursor: pointer;\n  overflow: hidden;\n  width: 20px;\n  height: 20px;\n  text-align: center;\n  line-height: 20px;\n  top: 3px;\n  margin: 0;\n}\n\n.rc-time-picker-clear-icon:after {\n  content: \"x\";\n  font-size: 12px;\n  font-style: normal;\n  color: #aaa;\n  display: inline-block;\n  line-height: 1;\n  height: 20px;\n  width: 20px;\n  -webkit-transition: color 0.3s ease;\n  -o-transition: color 0.3s ease;\n  transition: color 0.3s ease;\n}\n\n.rc-time-picker-clear-icon:hover:after {\n  color: #666;\n}\n\n.rc-time-picker-input {\n  width: 100%;\n  position: relative;\n  display: inline-block;\n  padding: 4px 7px;\n  height: 28px;\n  cursor: text;\n  font-size: 12px;\n  line-height: 1.5;\n  color: #666;\n  background-color: #fff;\n  background-image: none;\n  border: 1px solid #d9d9d9;\n  border-radius: 4px;\n  -webkit-transition: border 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), -webkit-box-shadow 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);\n  transition: border 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), -webkit-box-shadow 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);\n  -o-transition: border 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), box-shadow 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);\n  transition: border 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), box-shadow 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);\n  transition: border 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), box-shadow 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), -webkit-box-shadow 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);\n}\n\n.rc-time-picker-input[disabled] {\n  color: #ccc;\n  background: #f7f7f7;\n  cursor: not-allowed;\n}\n\n.rc-time-picker-panel {\n  z-index: 1070;\n  width: 170px;\n  position: absolute;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n\n.rc-time-picker-panel * {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n\n.rc-time-picker-panel-inner {\n  display: inline-block;\n  position: relative;\n  outline: none;\n  list-style: none;\n  font-size: 12px;\n  text-align: left;\n  background-color: #fff;\n  border-radius: 4px;\n  -webkit-box-shadow: 0 1px 5px #ccc;\n          box-shadow: 0 1px 5px #ccc;\n  background-clip: padding-box;\n  border: 1px solid #ccc;\n  line-height: 1.5;\n}\n\n.rc-time-picker-panel-narrow {\n  max-width: 113px;\n}\n\n.rc-time-picker-panel-input {\n  margin: 0;\n  padding: 0;\n  width: 100%;\n  cursor: auto;\n  line-height: 1.5;\n  outline: 0;\n  border: 1px solid transparent;\n}\n\n.rc-time-picker-panel-input-wrap {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  position: relative;\n  padding: 6px;\n  border-bottom: 1px solid #e9e9e9;\n}\n\n.rc-time-picker-panel-input-invalid {\n  border-color: red;\n}\n\n.rc-time-picker-panel-select {\n  float: left;\n  font-size: 12px;\n  border: 1px solid #e9e9e9;\n  border-width: 0 1px;\n  margin-left: -1px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  width: 56px;\n  max-height: 144px;\n  overflow-y: auto;\n  position: relative;\n}\n\n.rc-time-picker-panel-select-active {\n  overflow-y: auto;\n}\n\n.rc-time-picker-panel-select:first-child {\n  border-left: 0;\n  margin-left: 0;\n}\n\n.rc-time-picker-panel-select:last-child {\n  border-right: 0;\n}\n\n.rc-time-picker-panel-select ul {\n  list-style: none;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  width: 100%;\n}\n\n.rc-time-picker-panel-select li {\n  list-style: none;\n  margin: 0;\n  padding: 0 0 0 16px;\n  width: 100%;\n  height: 24px;\n  line-height: 24px;\n  text-align: left;\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.rc-time-picker-panel-select li:hover {\n  background: #edfaff;\n}\n\nli.rc-time-picker-panel-select-option-selected {\n  background: #f7f7f7;\n  font-weight: bold;\n}\n\nli.rc-time-picker-panel-select-option-disabled {\n  color: #ccc;\n}\n\nli.rc-time-picker-panel-select-option-disabled:hover {\n  background: transparent;\n  cursor: not-allowed;\n}\n\n.keenExplorer {\n  font-family: Montserrat, Tahoma, Arial;\n  font-size: 0.88rem;\n  font-size: 0.88rem;\n  color: #000;\n  color: #000;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.ReactModalPortal {\n  font-family: Montserrat, Tahoma, Arial;\n  font-size: 0.88rem;\n  font-size: 0.88rem;\n  color: #000;\n  color: #000;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.rc-time-picker-panel {\n  font-family: Montserrat, Tahoma, Arial;\n  font-size: 0.88rem;\n  font-size: 0.88rem;\n  color: #000;\n  color: #000;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.keenExplorer .extraction,.ReactModalPortal .extraction,.rc-time-picker-panel .extraction{\n  margin-top: 1rem;\n}\n\n.keenExplorer .extraction .first-label,.ReactModalPortal .extraction .first-label,.rc-time-picker-panel .extraction .first-label{\n    padding-top: 0;\n  }\n\n.keenExplorer .extraction .input-text,.ReactModalPortal .extraction .input-text,.rc-time-picker-panel .extraction .input-text{\n    width: 100%;\n  }\n\n.keenExplorer .percentile .input-text,.ReactModalPortal .percentile .input-text,.rc-time-picker-panel .percentile .input-text{\n    width: 100%;\n  }\n\n.keenExplorer .filters-container .list,.ReactModalPortal .filters-container .list,.rc-time-picker-panel .filters-container .list{\n    margin: 2rem 0;\n    width: 100%;\n\n  }\n\n.keenExplorer .filters-container .list .row,.ReactModalPortal .filters-container .list .row,.rc-time-picker-panel .filters-container .list .row{\n      display: -ms-flexbox;\n      display: flex;\n      width: 100%;\n      margin: 0 0 1rem;\n    }\n\n.keenExplorer .filters-container .list .row .row-part,.ReactModalPortal .filters-container .list .row .row-part,.rc-time-picker-panel .filters-container .list .row .row-part{\n        -ms-flex:1;\n            flex:1;\n        padding: 0 0.5rem;\n      }\n\n.keenExplorer .filters-container .list .row .row-part input{\n          padding: 0.55rem 0.7rem;\n          font-size: 0.88rem;\n          font-size: 0.88rem;\n          border-radius: 4px;\n          border: 1px solid #ccc;\n          width: 100%;\n        }\n\n.ReactModalPortal .filters-container .list .row .row-part input{\n          padding: 0.55rem 0.7rem;\n          font-size: 0.88rem;\n          font-size: 0.88rem;\n          border-radius: 4px;\n          border: 1px solid #ccc;\n          width: 100%;\n        }\n\n.rc-time-picker-panel .filters-container .list .row .row-part input{\n          padding: 0.55rem 0.7rem;\n          font-size: 0.88rem;\n          font-size: 0.88rem;\n          border-radius: 4px;\n          border: 1px solid #ccc;\n          width: 100%;\n        }\n\n.keenExplorer .filters-container .list .row .row-part .datetime-pickers,.ReactModalPortal .filters-container .list .row .row-part .datetime-pickers,.rc-time-picker-panel .filters-container .list .row .row-part .datetime-pickers{\n          display: -ms-flexbox;\n          display: flex;\n        }\n\n.keenExplorer .filters-container .list .row .row-part .datetime-pickers .DateInput,.ReactModalPortal .filters-container .list .row .row-part .datetime-pickers .DateInput,.rc-time-picker-panel .filters-container .list .row .row-part .datetime-pickers .DateInput{\n            width: 100%;\n          }\n\n.keenExplorer .filters-container .list .row .row-part .datetime-pickers .SingleDatePickerInput,.ReactModalPortal .filters-container .list .row .row-part .datetime-pickers .SingleDatePickerInput,.rc-time-picker-panel .filters-container .list .row .row-part .datetime-pickers .SingleDatePickerInput{\n            width: 100%;\n          }\n\n.keenExplorer .filters-container .list .row .row-part .datetime-pickers .SingleDatePicker,.ReactModalPortal .filters-container .list .row .row-part .datetime-pickers .SingleDatePicker,.rc-time-picker-panel .filters-container .list .row .row-part .datetime-pickers .SingleDatePicker{\n            -ms-flex: 1;\n                flex: 1;\n            margin-right: 0.1rem;\n          }\n\n.keenExplorer .filters-container .list .row .row-part .datetime-pickers .SingleDatePickerInput__withBorder,.ReactModalPortal .filters-container .list .row .row-part .datetime-pickers .SingleDatePickerInput__withBorder,.rc-time-picker-panel .filters-container .list .row .row-part .datetime-pickers .SingleDatePickerInput__withBorder{\n            border: 0;\n          }\n\n.keenExplorer .filters-container .list .row .row-part .datetime-pickers input.DateInput_input,.ReactModalPortal .filters-container .list .row .row-part .datetime-pickers input.DateInput_input,.rc-time-picker-panel .filters-container .list .row .row-part .datetime-pickers input.DateInput_input{\n            padding: 0.333rem;\n            text-align: center;\n            height: 2.3rem;\n          }\n\n.keenExplorer .filters-container .list .row .row-part .datetime-pickers .rc-time-picker,.ReactModalPortal .filters-container .list .row .row-part .datetime-pickers .rc-time-picker,.rc-time-picker-panel .filters-container .list .row .row-part .datetime-pickers .rc-time-picker{\n            -ms-flex: 1;\n                flex: 1;\n          }\n\n.keenExplorer .filters-container .list .row .row-part .datetime-pickers input.rc-time-picker-input,.ReactModalPortal .filters-container .list .row .row-part .datetime-pickers input.rc-time-picker-input,.rc-time-picker-panel .filters-container .list .row .row-part .datetime-pickers input.rc-time-picker-input{\n            padding: 0.3rem;\n            text-align: center;\n            height: auto;\n            line-height: auto;\n            height: 2.3rem;\n          }\n\n.keenExplorer .filters-container .list .row .row-part .within-inputs input,.ReactModalPortal .filters-container .list .row .row-part .within-inputs input,.rc-time-picker-panel .filters-container .list .row .row-part .within-inputs input{\n            margin-bottom: 0.2rem;\n          }\n\n.keenExplorer .filters-container .list .row .row-part .delete,.ReactModalPortal .filters-container .list .row .row-part .delete,.rc-time-picker-panel .filters-container .list .row .row-part .delete{\n          cursor: pointer;\n          display: -ms-flexbox;\n          display: flex;\n          -ms-flex-align: center;\n              align-items: center;\n          height: 100%;\n        }\n\n.keenExplorer .filters-container .list .row .row-part .delete i, .ReactModalPortal .filters-container .list .row .row-part .delete i, .rc-time-picker-panel .filters-container .list .row .row-part .delete i {\n            color: #ea7373;\n            font-size: 1rem;\n            padding: 0.5rem;\n          }\n\n.keenExplorer .filters-container .list .row .no-flex,.ReactModalPortal .filters-container .list .row .no-flex,.rc-time-picker-panel .filters-container .list .row .no-flex{\n        -ms-flex: 0;\n            flex: 0;\n      }\n\n.keenExplorer .filters-container .action-buttons,.ReactModalPortal .filters-container .action-buttons,.rc-time-picker-panel .filters-container .action-buttons{\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n        align-items: center;\n    -ms-flex-pack: end;\n        justify-content: flex-end;\n    margin-top: 0;\n  }\n\n.keenExplorer .filters-container .action-buttons .button-add-filter,.ReactModalPortal .filters-container .action-buttons .button-add-filter,.rc-time-picker-panel .filters-container .action-buttons .button-add-filter{\n      margin-right: 1rem;\n      cursor: pointer;\n      text-transform: uppercase;\n      padding: 1rem 2rem;\n      background: #eee;\n      border-radius: 0.3rem;\n    }\n\n.keenExplorer .filters-container .action-buttons .button-add-filter i, .ReactModalPortal .filters-container .action-buttons .button-add-filter i, .rc-time-picker-panel .filters-container .action-buttons .button-add-filter i {\n        margin-right: 1rem;\n      }\n\n.keenExplorer .filters-container .action-buttons .button-done{\n      cursor: pointer;\n      color: #fff;\n      background: #45b2e8;\n      background: #45b2e8;\n      text-transform: uppercase;\n      width: 10rem;\n      padding: 1rem;\n      text-align: center;\n      border-radius: 0.3rem;\n    }\n\n.ReactModalPortal .filters-container .action-buttons .button-done{\n      cursor: pointer;\n      color: #fff;\n      background: #45b2e8;\n      background: #45b2e8;\n      text-transform: uppercase;\n      width: 10rem;\n      padding: 1rem;\n      text-align: center;\n      border-radius: 0.3rem;\n    }\n\n.rc-time-picker-panel .filters-container .action-buttons .button-done{\n      cursor: pointer;\n      color: #fff;\n      background: #45b2e8;\n      background: #45b2e8;\n      text-transform: uppercase;\n      width: 10rem;\n      padding: 1rem;\n      text-align: center;\n      border-radius: 0.3rem;\n    }\n\n.keenExplorer .filters-container .action-buttons .button-done i,.ReactModalPortal .filters-container .action-buttons .button-done i,.rc-time-picker-panel .filters-container .action-buttons .button-done i{\n        margin-right: 1rem;\n      }\n\n@media screen and (max-width: 1000px) {\n      .keenExplorer .filters-container .list .row,.ReactModalPortal .filters-container .list .row,.rc-time-picker-panel .filters-container .list .row{\n        -ms-flex-direction: column;\n            flex-direction: column;\n      }\n        .keenExplorer .filters-container .list .row .row-part,.ReactModalPortal .filters-container .list .row .row-part,.rc-time-picker-panel .filters-container .list .row .row-part{\n          margin-bottom: 0.3rem;\n        }\n        .keenExplorer .filters-container .list .row .delete,.ReactModalPortal .filters-container .list .row .delete,.rc-time-picker-panel .filters-container .list .row .delete{\n          float: right;\n          padding-right: 1rem;\n        }\n}\n\n.keenExplorer .modal-main,.ReactModalPortal .modal-main,.rc-time-picker-panel .modal-main{\n  display:-ms-flexbox;\n  display:flex;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  height: 100%;\n  width: 100%;\n}\n\n.keenExplorer .modal-main .header,.ReactModalPortal .modal-main .header,.rc-time-picker-panel .modal-main .header{\n    -ms-flex:0;\n        flex:0;\n    border-bottom: 1px solid #eee;\n    padding-bottom: 1rem;\n  }\n\n.keenExplorer .modal-main .header .title,.ReactModalPortal .modal-main .header .title,.rc-time-picker-panel .modal-main .header .title{\n        float: left;\n      }\n\n.keenExplorer .modal-main .header .x,.ReactModalPortal .modal-main .header .x,.rc-time-picker-panel .modal-main .header .x{\n        color: #565656;\n        float: right;\n        font-weight: bold;\n        cursor: pointer;\n        padding: 1rem;\n        margin: -2rem -1rem;\n        font-size: 2rem;\n      }\n\n.keenExplorer .modal-main .container,.ReactModalPortal .modal-main .container,.rc-time-picker-panel .modal-main .container{\n    -ms-flex:1;\n        flex:1;\n    padding: 1rem 0;\n    clear: both;\n    width: 100%;\n    overflow-y: scroll;\n    white-space: pre-wrap;\n  }\n\n.keenExplorer .modal-main .button-copy,.ReactModalPortal .modal-main .button-copy,.rc-time-picker-panel .modal-main .button-copy{\n    padding: 1rem;\n    width: 10rem;\n    text-align: center;\n    cursor: pointer;\n    background: #1e93d8;\n    color: #fff;\n    border-radius: 0.5rem;\n    margin-top: 1rem;\n  }\n\n.keenExplorer .modal-main .button-copy:active,.ReactModalPortal .modal-main .button-copy:active,.rc-time-picker-panel .modal-main .button-copy:active{\n    background: #30a1e4;\n  }\n\n.keenExplorer .saved-query, .ReactModalPortal .saved-query, .rc-time-picker-panel .saved-query {\n  margin: 1rem 0;\n  border: 1px solid #e8e8e8;\n  background: #fcfcfc;\n  padding: 1rem;\n  border-radius: 0.3rem;\n}\n\n.keenExplorer .saved-query .input-name {\n    font-size: 0.88rem;\n    font-size: 0.88rem;\n    padding: 1rem;\n    border-radius: 0.3rem;\n    border: 1px solid #e8e8e8;\n    width: 100%;\n  }\n\n.ReactModalPortal .saved-query .input-name {\n    font-size: 0.88rem;\n    font-size: 0.88rem;\n    padding: 1rem;\n    border-radius: 0.3rem;\n    border: 1px solid #e8e8e8;\n    width: 100%;\n  }\n\n.rc-time-picker-panel .saved-query .input-name {\n    font-size: 0.88rem;\n    font-size: 0.88rem;\n    padding: 1rem;\n    border-radius: 0.3rem;\n    border: 1px solid #e8e8e8;\n    width: 100%;\n  }\n\n.keenExplorer .saved-query .resource-name,.ReactModalPortal .saved-query .resource-name,.rc-time-picker-panel .saved-query .resource-name{\n    padding: 1rem 0.2rem 0;\n    display: -ms-flexbox;\n    display: flex;\n    overflow: hidden;\n    font-size: 0.8rem;\n  }\n\n.keenExplorer .saved-query .resource-name .line, .ReactModalPortal .saved-query .resource-name .line, .rc-time-picker-panel .saved-query .resource-name .line {\n      -ms-flex: 1;\n          flex: 1;\n      white-space: nowrap;\n    }\n\n.keenExplorer .saved-query .resource-name .line span,.ReactModalPortal .saved-query .resource-name .line span,.rc-time-picker-panel .saved-query .resource-name .line span{\n        white-space: nowrap;\n        overflow: hidden;\n        -ms-flex: 1;\n            flex: 1;\n      }\n\n.keenExplorer .saved-query .resource-name .line i, .ReactModalPortal .saved-query .resource-name .line i, .rc-time-picker-panel .saved-query .resource-name .line i {\n        -ms-flex: 0;\n            flex: 0;\n      }\n\n.keenExplorer .saved-query .resource-name .line-label,.ReactModalPortal .saved-query .resource-name .line-label,.rc-time-picker-panel .saved-query .resource-name .line-label{\n      -ms-flex: 0;\n          flex: 0;\n      margin-right: 0.5rem;\n    }\n\n.keenExplorer .saved-query .cache, .ReactModalPortal .saved-query .cache, .rc-time-picker-panel .saved-query .cache {\n    padding: 1rem 0 0;\n    max-width: 12rem;\n  }\n\n.keenExplorer .saved-query .cache .line-checkbox,.ReactModalPortal .saved-query .cache .line-checkbox,.rc-time-picker-panel .saved-query .cache .line-checkbox{\n      display: -ms-flexbox;\n      display: flex;\n    }\n\n.keenExplorer .saved-query .cache .line-checkbox input,.ReactModalPortal .saved-query .cache .line-checkbox input,.rc-time-picker-panel .saved-query .cache .line-checkbox input{\n        margin-right: 0.5rem;\n        outline: none;\n      }\n\n.keenExplorer .saved-query .cache .line-checkbox label,.ReactModalPortal .saved-query .cache .line-checkbox label,.rc-time-picker-panel .saved-query .cache .line-checkbox label{\n        cursor: pointer;\n      }\n\n.keenExplorer .saved-query .cache .cache-toggle,.ReactModalPortal .saved-query .cache .cache-toggle,.rc-time-picker-panel .saved-query .cache .cache-toggle{\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-align: center;\n          align-items: center;\n      cursor: pointer;\n      color: #128296;\n    }\n\n.keenExplorer .saved-query .cache i, .ReactModalPortal .saved-query .cache i, .rc-time-picker-panel .saved-query .cache i {\n      font-size: 1.3rem;\n      margin-right: 0.6rem;\n    }\n\n.keenExplorer .saved-query .cache .fa-toggle-off,.ReactModalPortal .saved-query .cache .fa-toggle-off,.rc-time-picker-panel .saved-query .cache .fa-toggle-off{\n      color: #7b7b7b;\n    }\n\n.keenExplorer .saved-query .cache .cache-refresh,.ReactModalPortal .saved-query .cache .cache-refresh,.rc-time-picker-panel .saved-query .cache .cache-refresh{\n    }\n\n.keenExplorer .saved-query .button-copy,.ReactModalPortal .saved-query .button-copy,.rc-time-picker-panel .saved-query .button-copy{\n    padding: 0.7rem;\n    right: 0;\n    bottom: 0;\n    border: 0;\n    cursor: pointer;\n    display: inline;\n  }\n\n.keenExplorer .saved-query .buttons * {\n      margin-top: 1rem;\n      padding: 0.88rem calc(0.88rem*2);\n      border-radius: 0.3rem;\n      font-size: 0.88rem;\n      font-size: 0.88rem;\n      cursor: pointer;\n      text-transform: uppercase;\n      border: 0;\n      font-weight: 600;\n      font-weight: 600;\n    }\n\n.ReactModalPortal .saved-query .buttons * {\n      margin-top: 1rem;\n      padding: 0.88rem calc(0.88rem*2);\n      border-radius: 0.3rem;\n      font-size: 0.88rem;\n      font-size: 0.88rem;\n      cursor: pointer;\n      text-transform: uppercase;\n      border: 0;\n      font-weight: 600;\n      font-weight: 600;\n    }\n\n.rc-time-picker-panel .saved-query .buttons * {\n      margin-top: 1rem;\n      padding: 0.88rem calc(0.88rem*2);\n      border-radius: 0.3rem;\n      font-size: 0.88rem;\n      font-size: 0.88rem;\n      cursor: pointer;\n      text-transform: uppercase;\n      border: 0;\n      font-weight: 600;\n      font-weight: 600;\n    }\n\n.keenExplorer .saved-query .buttons .button-save{\n      color: #fff;\n      background: #45b2e8;\n      background: #45b2e8;\n    }\n\n.ReactModalPortal .saved-query .buttons .button-save{\n      color: #fff;\n      background: #45b2e8;\n      background: #45b2e8;\n    }\n\n.rc-time-picker-panel .saved-query .buttons .button-save{\n      color: #fff;\n      background: #45b2e8;\n      background: #45b2e8;\n    }\n\n.keenExplorer .saved-query .buttons .button-clone{\n      margin-left: 1rem;\n      color: #45b2e8;\n      color: #45b2e8;\n      background: transparent;\n      border: 1px solid #eee;\n    }\n\n.ReactModalPortal .saved-query .buttons .button-clone{\n      margin-left: 1rem;\n      color: #45b2e8;\n      color: #45b2e8;\n      background: transparent;\n      border: 1px solid #eee;\n    }\n\n.rc-time-picker-panel .saved-query .buttons .button-clone{\n      margin-left: 1rem;\n      color: #45b2e8;\n      color: #45b2e8;\n      background: transparent;\n      border: 1px solid #eee;\n    }\n\n.keenExplorer .saved-query .buttons .button-delete,.ReactModalPortal .saved-query .buttons .button-delete,.rc-time-picker-panel .saved-query .buttons .button-delete{\n      float: right;\n      color: #6f6c6c;\n      background: transparent;\n      border: 1px solid #eee;\n    }\n\n.keenExplorer .saved-query .button-copy:active,.ReactModalPortal .saved-query .button-copy:active,.rc-time-picker-panel .saved-query .button-copy:active{\n    background: #fff;\n  }\n\n.keenExplorer .saved-queries,.ReactModalPortal .saved-queries,.rc-time-picker-panel .saved-queries{\n  overflow: scroll;\n  min-height: 100%;\n  max-height: 44rem;\n}\n\n.keenExplorer .saved-queries .input-filter,.ReactModalPortal .saved-queries .input-filter,.rc-time-picker-panel .saved-queries .input-filter{\n    width: 100%;\n    padding: 0.6rem;\n    font-size: 0.9rem;\n    border: 1px solid #ccc;\n    margin: .5rem 0;\n    border-radius: 0.3rem;\n  }\n\n.keenExplorer .saved-queries .item,.ReactModalPortal .saved-queries .item,.rc-time-picker-panel .saved-queries .item{\n    padding: 1rem;\n    cursor: pointer;\n    overflow: auto;\n    border-bottom: 1px solid #f3f3f3;\n  }\n\n.keenExplorer .saved-queries .item .name,.ReactModalPortal .saved-queries .item .name,.rc-time-picker-panel .saved-queries .item .name{\n      margin: 0 0 0.5rem;\n    }\n\n.keenExplorer .saved-queries .item .cached,.ReactModalPortal .saved-queries .item .cached,.rc-time-picker-panel .saved-queries .item .cached{\n      float: left;\n    }\n\n.keenExplorer .saved-queries .item .cached *,.ReactModalPortal .saved-queries .item .cached *,.rc-time-picker-panel .saved-queries .item .cached *{\n        font-size: 0.6rem;\n        text-transform: uppercase;\n      }\n\n.keenExplorer .saved-queries .item .data,.ReactModalPortal .saved-queries .item .data,.rc-time-picker-panel .saved-queries .item .data{\n      float: right;\n      font-size: 0.7rem;\n    }\n\n.keenExplorer .saved-queries .active,.ReactModalPortal .saved-queries .active,.rc-time-picker-panel .saved-queries .active{\n    background: #f7f7f7;\n  }\n\n.keenExplorer .funnel .content,.ReactModalPortal .funnel .content,.rc-time-picker-panel .funnel .content{\n    padding: 0.3rem 0.5rem;\n  }\n\n.keenExplorer .funnel .input-text,.ReactModalPortal .funnel .input-text,.rc-time-picker-panel .funnel .input-text{\n    width: 100%;\n  }\n\n.keenExplorer .funnel .button,.ReactModalPortal .funnel .button,.rc-time-picker-panel .funnel .button{\n    cursor: pointer;\n  }\n\n.keenExplorer .funnel .button-delete,.ReactModalPortal .funnel .button-delete,.rc-time-picker-panel .funnel .button-delete{\n    color: #797979;\n  }\n\n.keenExplorer .funnel .button-add,.ReactModalPortal .funnel .button-add,.rc-time-picker-panel .funnel .button-add{\n    margin-top: 1rem;\n    padding: 0.7rem;\n    background: #fdfdfd;\n    border: 1px solid #e8e8e8;\n    border-radius: 5px;\n    display: inline-block;\n  }\n\n.keenExplorer .funnel .button-add i,.ReactModalPortal .funnel .button-add i,.rc-time-picker-panel .funnel .button-add i{\n      margin-right: 0.3rem;\n    }\n\n.keenExplorer .funnel .line-options,.ReactModalPortal .funnel .line-options,.rc-time-picker-panel .funnel .line-options{\n    margin: 1rem 0 0 0;\n  }\n\n.keenExplorer .funnel .line-checkbox,.ReactModalPortal .funnel .line-checkbox,.rc-time-picker-panel .funnel .line-checkbox{\n    margin: 0.5rem 0 0 0;\n  }\n\n.keenExplorer .funnel .line-checkbox input,.ReactModalPortal .funnel .line-checkbox input,.rc-time-picker-panel .funnel .line-checkbox input{\n      margin-right: 0.5rem;\n    }\n\n.keenExplorer .funnel .line-checkbox label,.ReactModalPortal .funnel .line-checkbox label,.rc-time-picker-panel .funnel .line-checkbox label{\n      cursor: pointer;\n    }\n\n.keenExplorer .funnel .step-switch-position-buttons,.ReactModalPortal .funnel .step-switch-position-buttons,.rc-time-picker-panel .funnel .step-switch-position-buttons{\n    float: left;\n    margin: -0.5rem 0.8rem 0 0;\n    color: #797979;\n  }\n\n.keenExplorer .funnel .step-switch-position-buttons .move-up,.ReactModalPortal .funnel .step-switch-position-buttons .move-up,.rc-time-picker-panel .funnel .step-switch-position-buttons .move-up{\n      margin-top: 0.1rem;\n    }\n\n.keenExplorer .funnel .step-switch-position-buttons .move-down,.ReactModalPortal .funnel .step-switch-position-buttons .move-down,.rc-time-picker-panel .funnel .step-switch-position-buttons .move-down{\n      margin-top: -0.3rem;\n    }\n\n.keenExplorer .keen-dataviz-container,.ReactModalPortal .keen-dataviz-container,.rc-time-picker-panel .keen-dataviz-container{\n  height: calc(100% - 3rem);\n  overflow: hidden;\n}\n\n.keenExplorer .keen-dataviz-metric-value,.ReactModalPortal .keen-dataviz-metric-value,.rc-time-picker-panel .keen-dataviz-metric-value{\n  font-size: 4rem !important;\n}\n\n.keenExplorer .keen-dataviz .c3 svg g text tspan, .ReactModalPortal .keen-dataviz .c3 svg g text tspan, .rc-time-picker-panel .keen-dataviz .c3 svg g text tspan {\n  font-size: 10px !important;\n}\n\n.keenExplorer .a-preview-collection,.ReactModalPortal .a-preview-collection,.rc-time-picker-panel .a-preview-collection{\n  padding: 0.5rem;\n  margin: 0 0 1rem;\n  cursor: pointer;\n  background: #fafafa;\n  border-radius: 0.3rem;\n  width: 100%;\n  float: left;\n}\n\n.keenExplorer .a-preview-collection i,.ReactModalPortal .a-preview-collection i,.rc-time-picker-panel .a-preview-collection i{\n    font-size: 0.8em;\n    margin-right: 0.2rem;\n  }\n\n.keenExplorer .preview-collection-content,.ReactModalPortal .preview-collection-content,.rc-time-picker-panel .preview-collection-content{\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n      flex-direction: row;\n}\n\n.keenExplorer .preview-collection-content .input-filter,.ReactModalPortal .preview-collection-content .input-filter,.rc-time-picker-panel .preview-collection-content .input-filter{\n    width: 100%;\n    padding: 0.6rem;\n    font-size: 0.9rem;\n    border: 1px solid #ccc;\n    margin: .5rem 0;\n    border-radius: 0.3rem;\n  }\n\n.keenExplorer .preview-collection-content .list, .ReactModalPortal .preview-collection-content .list, .rc-time-picker-panel .preview-collection-content .list {\n    height: 100%;\n    overflow-y: scroll;\n    -ms-flex: 1;\n        flex: 1;\n  }\n\n.keenExplorer .preview-collection-content .list .item,.ReactModalPortal .preview-collection-content .list .item,.rc-time-picker-panel .preview-collection-content .list .item{\n      cursor: pointer;\n      padding: 1rem;\n      overflow: auto;\n      border-bottom: 1px solid #f3f3f3;\n    }\n\n.keenExplorer .preview-collection-content .list .active,.ReactModalPortal .preview-collection-content .list .active,.rc-time-picker-panel .preview-collection-content .list .active{\n      background: #f7f7f7;\n    }\n\n.keenExplorer .preview-collection-content .content,.ReactModalPortal .preview-collection-content .content,.rc-time-picker-panel .preview-collection-content .content{\n    -ms-flex: 3;\n        flex: 3;\n    height: 100%;\n    padding: 0.5rem 0 0.5rem 1rem;\n  }\n\n.keenExplorer .preview-collection-content .content .tabs .tab,.ReactModalPortal .preview-collection-content .content .tabs .tab,.rc-time-picker-panel .preview-collection-content .content .tabs .tab{\n        -ms-flex: none;\n            flex: none;\n        padding: 1rem 1.5rem;\n      }\n\n.keenExplorer .preview-collection-content .content .tabs .tab-placeholder,.ReactModalPortal .preview-collection-content .content .tabs .tab-placeholder,.rc-time-picker-panel .preview-collection-content .content .tabs .tab-placeholder{\n        -ms-flex: 1;\n            flex: 1;\n        border-bottom: 1px solid #e8e8e8;\n      }\n\n.keenExplorer .preview-collection-content .content .tab-content,.ReactModalPortal .preview-collection-content .content .tab-content,.rc-time-picker-panel .preview-collection-content .content .tab-content{\n      height: 100%;\n      width: 100%;\n      overflow: scroll;\n      padding-bottom: 4rem;\n    }\n\n@media screen and (max-width: 900px) {\n\n  .keenExplorer .preview-collection-content,.ReactModalPortal .preview-collection-content,.rc-time-picker-panel .preview-collection-content{\n    -ms-flex-direction: column;\n        flex-direction: column;\n  }\n    .keenExplorer .preview-collection-content .list, .keenExplorer .preview-collection-content .content, .ReactModalPortal .preview-collection-content .list, .ReactModalPortal .preview-collection-content .content, .rc-time-picker-panel .preview-collection-content .list, .rc-time-picker-panel .preview-collection-content .content{\n      height: auto;\n      overflow-y: visible;\n      padding: 0;\n    }\n    .keenExplorer .preview-collection-content .content,.ReactModalPortal .preview-collection-content .content,.rc-time-picker-panel .preview-collection-content .content{\n      padding-top: 2rem;\n    }\n}\n\n.keenExplorer .preview .download-toggle-label,.ReactModalPortal .preview .download-toggle-label,.rc-time-picker-panel .preview .download-toggle-label{\n    padding: 1rem;\n    cursor: pointer;\n  }\n\n.keenExplorer .preview .download-toggle-label i,.ReactModalPortal .preview .download-toggle-label i,.rc-time-picker-panel .preview .download-toggle-label i{\n      margin-right: 0.5rem;\n    }\n\n.keenExplorer .preview .download-buttons,.ReactModalPortal .preview .download-buttons,.rc-time-picker-panel .preview .download-buttons{\n    position: absolute;\n    background: #fafafa;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n        flex-direction: column;\n    -webkit-box-shadow: 2px 3px 4px rgba(0,0,0,0.05);\n            box-shadow: 2px 3px 4px rgba(0,0,0,0.05);\n    margin-top: -2px;\n  }\n\n.keenExplorer .preview .download-buttons .button-download,.ReactModalPortal .preview .download-buttons .button-download,.rc-time-picker-panel .preview .download-buttons .button-download{\n      padding: 1rem 3rem;\n    }\n\n.keenExplorer * {\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    font-size: 0.88rem;\n    font-size: 0.88rem;\n}\n\n.ReactModalPortal * {\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    font-size: 0.88rem;\n    font-size: 0.88rem;\n}\n\n.rc-time-picker-panel * {\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    font-size: 0.88rem;\n    font-size: 0.88rem;\n}\n\n.keenExplorer button,.ReactModalPortal button,.rc-time-picker-panel button{\n    margin: 2rem 0 0;\n    padding: 1rem;\n}\n\n.keenExplorer .label-main,.ReactModalPortal .label-main,.rc-time-picker-panel .label-main{\n    padding: 1rem 0 0.3rem;\n}\n\n.keenExplorer .hide,.ReactModalPortal .hide,.rc-time-picker-panel .hide{\n    display: none;\n}\n\n.keenExplorer input:focus {\n    outline: 2px solid #00bbde;\n    outline: 2px solid #00bbde;\n}\n\n.ReactModalPortal input:focus {\n    outline: 2px solid #00bbde;\n    outline: 2px solid #00bbde;\n}\n\n.rc-time-picker-panel input:focus {\n    outline: 2px solid #00bbde;\n    outline: 2px solid #00bbde;\n}\n\n.keenExplorer .panel-main,.ReactModalPortal .panel-main,.rc-time-picker-panel .panel-main{\n    -ms-flex: 1;\n        flex: 1;\n    min-width: 26rem;\n    -webkit-box-shadow: -3px 7px 11px rgba(0,0,0,0.1);\n            box-shadow: -3px 7px 11px rgba(0,0,0,0.1);\n    border-radius: 0.3rem;\n}\n\n.keenExplorer .panel-main .panel-buttons .button-new-query,.ReactModalPortal .panel-main .panel-buttons .button-new-query,.rc-time-picker-panel .panel-main .panel-buttons .button-new-query{\n        -ms-flex: none;\n            flex: none;\n        cursor: pointer;\n      }\n\n.keenExplorer .panel-main .panel-content,.ReactModalPortal .panel-main .panel-content,.rc-time-picker-panel .panel-main .panel-content{\n      padding: 1rem;\n    }\n\n.keenExplorer .panel-main .panel-content .label-analysis-type,.ReactModalPortal .panel-main .panel-content .label-analysis-type,.rc-time-picker-panel .panel-main .panel-content .label-analysis-type{\n        padding-top: 0;\n      }\n\n.keenExplorer .result,.ReactModalPortal .result,.rc-time-picker-panel .result{\n    -ms-flex: 3;\n        flex: 3;\n    padding: 0 1.5rem;\n    overflow: hidden;\n}\n\n.keenExplorer .foldable,.ReactModalPortal .foldable,.rc-time-picker-panel .foldable{\n    margin-top: 0.5rem;\n    border: 1px solid #e8e8e8;\n    background: #fdfdfd;\n    padding: 0.5rem;\n    cursor: pointer;\n    border-radius: 5px;\n}\n\n.keenExplorer .foldableActive,.ReactModalPortal .foldableActive,.rc-time-picker-panel .foldableActive{\n      background: none;\n    }\n\n.keenExplorer .foldable .title,.ReactModalPortal .foldable .title,.rc-time-picker-panel .foldable .title{\n      padding: 0.5rem;\n    }\n\n.keenExplorer .foldable .title .icon,.ReactModalPortal .foldable .title .icon,.rc-time-picker-panel .foldable .title .icon{\n        float: right;\n      }\n\n.keenExplorer .foldable .content,.ReactModalPortal .foldable .content,.rc-time-picker-panel .foldable .content{\n      margin-top: 0.5rem;\n    }\n\n.keenExplorer .foldable .tab-content,.ReactModalPortal .foldable .tab-content,.rc-time-picker-panel .foldable .tab-content{\n      border: 0;\n    }\n\n.keenExplorer .filters,.ReactModalPortal .filters,.rc-time-picker-panel .filters{\n    display: -ms-flexbox;\n    display: flex;\n}\n\n.keenExplorer .filters .title,.ReactModalPortal .filters .title,.rc-time-picker-panel .filters .title{\n      -ms-flex: 1;\n          flex: 1;\n    }\n\n.keenExplorer .filters .count,.ReactModalPortal .filters .count,.rc-time-picker-panel .filters .count{\n      -ms-flex-item-align: center;\n          align-self: center;\n      text-align: right;\n      padding: 0 0.5rem 0 0;\n    }\n\n.keenExplorer .optional,.ReactModalPortal .optional,.rc-time-picker-panel .optional{\n    margin-left: 1em;\n    font-size: 0.7em;\n    color:#ddd;\n    color: #737373;\n}\n\n.keenExplorer .groupBy .label-main,.ReactModalPortal .groupBy .label-main,.rc-time-picker-panel .groupBy .label-main{\n      padding: 0 0 0.5rem;\n    }\n\n.keenExplorer .groupBy .btnPlus, .keenExplorer .groupBy .btnMinus, .ReactModalPortal .groupBy .btnPlus, .ReactModalPortal .groupBy .btnMinus, .rc-time-picker-panel .groupBy .btnPlus, .rc-time-picker-panel .groupBy .btnMinus{\n      margin-top: 1rem;\n      padding: 0.7rem;\n      background: #fdfdfd;\n      border: 1px solid #e8e8e8;\n      border-radius: 5px;\n      display: inline-block;\n    }\n\n.keenExplorer .groupBy .options,.ReactModalPortal .groupBy .options,.rc-time-picker-panel .groupBy .options{\n      margin-top: 1rem;\n      display:-ms-flexbox;\n      display:flex;\n    }\n\n.keenExplorer .groupBy .options .orderBy,.ReactModalPortal .groupBy .options .orderBy,.rc-time-picker-panel .groupBy .options .orderBy{\n        width: 8em;\n        padding-right: 1rem;\n      }\n\n.keenExplorer .groupBy .options .orderBy .select,.ReactModalPortal .groupBy .options .orderBy .select,.rc-time-picker-panel .groupBy .options .orderBy .select{\n          width: 100%;\n        }\n\n.keenExplorer .groupBy .options .limit,.ReactModalPortal .groupBy .options .limit,.rc-time-picker-panel .groupBy .options .limit{\n        width: 8em;\n      }\n\n.keenExplorer .groupBy .options .limit .input,.ReactModalPortal .groupBy .options .limit .input,.rc-time-picker-panel .groupBy .options .limit .input{\n          width: 100%;\n        }\n\n.keenExplorer .groupBy .additionalTargetProperty,.ReactModalPortal .groupBy .additionalTargetProperty,.rc-time-picker-panel .groupBy .additionalTargetProperty{\n      margin-top: 1rem;\n      padding-top: 1rem;\n      border-top: 1px solid #f1f1f1;\n    }\n\n.keenExplorer .lets-go,.ReactModalPortal .lets-go,.rc-time-picker-panel .lets-go{\n    display:-ms-flexbox;\n    display:flex;\n    width: 100%;\n    height: 390px;\n    -ms-flex-pack: center;\n        justify-content: center;\n    -ms-flex-align: center;\n        align-items: center;\n    color: #9b9b9b;\n    background: #fafafa;\n}\n\n.keenExplorer .tabs,.ReactModalPortal .tabs,.rc-time-picker-panel .tabs{\n  display:-ms-flexbox;\n  display:flex;\n}\n\n.keenExplorer .tabs .tab,.ReactModalPortal .tabs .tab,.rc-time-picker-panel .tabs .tab{\n    -ms-flex: 1;\n        flex: 1;\n    padding: 1rem;\n    background: #fafafa;\n    cursor: pointer;\n    border: 1px solid #e8e8e8;\n    border-radius: 5px 5px 0 0;\n  }\n\n.keenExplorer .tabs .active,.ReactModalPortal .tabs .active,.rc-time-picker-panel .tabs .active{\n    background: #fff;\n    border-bottom: 1px solid #fff;\n  }\n\n.keenExplorer .panel-buttons .active,.ReactModalPortal .panel-buttons .active,.rc-time-picker-panel .panel-buttons .active{\n    border-right: 0;\n  }\n\n.keenExplorer .tab-content,.ReactModalPortal .tab-content,.rc-time-picker-panel .tab-content{\n  padding: 1rem;\n  border: 1px solid #e8e8e8;\n  border-top: none;\n}\n\n.keenExplorer .input-number{\n  font-size: 0.88rem;\n  font-size: 0.88rem;\n  padding: 0.5rem 0.6rem;\n  border-radius: 5px;\n  border: 1px solid #ccc;\n  font-weight: 400;\n  line-height: normal;\n}\n\n.ReactModalPortal .input-number{\n  font-size: 0.88rem;\n  font-size: 0.88rem;\n  padding: 0.5rem 0.6rem;\n  border-radius: 5px;\n  border: 1px solid #ccc;\n  font-weight: 400;\n  line-height: normal;\n}\n\n.rc-time-picker-panel .input-number{\n  font-size: 0.88rem;\n  font-size: 0.88rem;\n  padding: 0.5rem 0.6rem;\n  border-radius: 5px;\n  border: 1px solid #ccc;\n  font-weight: 400;\n  line-height: normal;\n}\n\n.keenExplorer .input-text{\n  font-size: 0.88rem;\n  font-size: 0.88rem;\n  padding: 0.5rem 0.6rem;\n  border-radius: 5px;\n  border: 1px solid #ccc;\n  font-weight: 400;\n  line-height: normal;\n}\n\n.ReactModalPortal .input-text{\n  font-size: 0.88rem;\n  font-size: 0.88rem;\n  padding: 0.5rem 0.6rem;\n  border-radius: 5px;\n  border: 1px solid #ccc;\n  font-weight: 400;\n  line-height: normal;\n}\n\n.rc-time-picker-panel .input-text{\n  font-size: 0.88rem;\n  font-size: 0.88rem;\n  padding: 0.5rem 0.6rem;\n  border-radius: 5px;\n  border: 1px solid #ccc;\n  font-weight: 400;\n  line-height: normal;\n}\n\n.keenExplorer .interval .standardUnits,.ReactModalPortal .interval .standardUnits,.rc-time-picker-panel .interval .standardUnits{\n    width: 10rem;\n  }\n\n.keenExplorer .interval .line,.ReactModalPortal .interval .line,.rc-time-picker-panel .interval .line{\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n        align-items: center;\n  }\n\n.keenExplorer .interval .line .title,.ReactModalPortal .interval .line .title,.rc-time-picker-panel .interval .line .title{\n      margin-right: 1rem;\n    }\n\n.keenExplorer .interval .line .input-number,.ReactModalPortal .interval .line .input-number,.rc-time-picker-panel .interval .line .input-number{\n      width: 4rem;\n      margin-right: 0.5rem;\n    }\n\n.keenExplorer .interval .line .timeUnits,.ReactModalPortal .interval .line .timeUnits,.rc-time-picker-panel .interval .line .timeUnits{\n      width: 10rem;\n    }\n\n.keenExplorer .timeframe,.ReactModalPortal .timeframe,.rc-time-picker-panel .timeframe{\n  margin-bottom: 0.5rem;\n}\n\n.keenExplorer .timeframe .relative,.ReactModalPortal .timeframe .relative,.rc-time-picker-panel .timeframe .relative{\n    display:-ms-flexbox;\n    display:flex;\n  }\n\n.keenExplorer .timeframe .relative .relativity, .keenExplorer .timeframe .relative .input-number, .ReactModalPortal .timeframe .relative .relativity, .ReactModalPortal .timeframe .relative .input-number, .rc-time-picker-panel .timeframe .relative .relativity, .rc-time-picker-panel .timeframe .relative .input-number{\n      margin-right:0.5rem;\n    }\n\n.keenExplorer .timeframe .relative .relativity,.ReactModalPortal .timeframe .relative .relativity,.rc-time-picker-panel .timeframe .relative .relativity{\n      -ms-flex: 0;\n          flex: 0;\n      max-width:12rem;\n      min-width: 6rem;\n    }\n\n.keenExplorer .timeframe .relative .units,.ReactModalPortal .timeframe .relative .units,.rc-time-picker-panel .timeframe .relative .units{\n      -ms-flex: 0;\n          flex: 0;\n      max-width:12rem;\n      min-width: 6rem;\n    }\n\n.keenExplorer .timeframe .relative .input-number,.ReactModalPortal .timeframe .relative .input-number,.rc-time-picker-panel .timeframe .relative .input-number{\n      -ms-flex: 1;\n          flex: 1;\n      min-width: 6rem;\n    }\n\n.keenExplorer .timeframe .description,.ReactModalPortal .timeframe .description,.rc-time-picker-panel .timeframe .description{\n    margin-top: 0.5rem;\n    padding: 1rem;\n    background: #fafafa;\n  }\n\n.keenExplorer .timeframe .tabAbsolute .DateRangePickerInput_arrow,.ReactModalPortal .timeframe .tabAbsolute .DateRangePickerInput_arrow,.rc-time-picker-panel .timeframe .tabAbsolute .DateRangePickerInput_arrow{\n      display: none;\n    }\n\n.keenExplorer .timeframe .tabAbsolute .DateInput, .ReactModalPortal .timeframe .tabAbsolute .DateInput, .rc-time-picker-panel .timeframe .tabAbsolute .DateInput {\n      width: 8rem;\n      background: none;\n    }\n\n.keenExplorer .timeframe .tabAbsolute .DateInput_input {\n      padding: 0.5rem;\n      font-size: 0.88rem;\n      font-size: 0.88rem;\n      line-height: normal;\n      color:#000;\n      font-weight: normal;\n      border-radius: 5px;\n    }\n\n.ReactModalPortal .timeframe .tabAbsolute .DateInput_input {\n      padding: 0.5rem;\n      font-size: 0.88rem;\n      font-size: 0.88rem;\n      line-height: normal;\n      color:#000;\n      font-weight: normal;\n      border-radius: 5px;\n    }\n\n.rc-time-picker-panel .timeframe .tabAbsolute .DateInput_input {\n      padding: 0.5rem;\n      font-size: 0.88rem;\n      font-size: 0.88rem;\n      line-height: normal;\n      color:#000;\n      font-weight: normal;\n      border-radius: 5px;\n    }\n\n.keenExplorer .timeframe .tabAbsolute .rc-time-picker-input{\n      font-size: 0.88rem;\n      font-size: 0.88rem;\n      line-height: normal;\n      font-weight: normal;\n      color: #000;\n      height: 2.4rem;\n      width: 7rem;\n      border-radius: 5px;\n    }\n\n.ReactModalPortal .timeframe .tabAbsolute .rc-time-picker-input{\n      font-size: 0.88rem;\n      font-size: 0.88rem;\n      line-height: normal;\n      font-weight: normal;\n      color: #000;\n      height: 2.4rem;\n      width: 7rem;\n      border-radius: 5px;\n    }\n\n.rc-time-picker-panel .timeframe .tabAbsolute .rc-time-picker-input{\n      font-size: 0.88rem;\n      font-size: 0.88rem;\n      line-height: normal;\n      font-weight: normal;\n      color: #000;\n      height: 2.4rem;\n      width: 7rem;\n      border-radius: 5px;\n    }\n\n.keenExplorer .timeframe .tabAbsolute .line,.ReactModalPortal .timeframe .tabAbsolute .line,.rc-time-picker-panel .timeframe .tabAbsolute .line{\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-align: center;\n          align-items: center;\n      margin: 0.5rem;\n    }\n\n.keenExplorer .timeframe .tabAbsolute .line .title,.ReactModalPortal .timeframe .tabAbsolute .line .title,.rc-time-picker-panel .timeframe .tabAbsolute .line .title{\n        width: 4rem;\n      }\n\n.keenExplorer .timeframe .tabAbsolute .line .SingleDatePicker, .ReactModalPortal .timeframe .tabAbsolute .line .SingleDatePicker, .rc-time-picker-panel .timeframe .tabAbsolute .line .SingleDatePicker {\n        margin-right: 0.5rem;\n      }\n\n.keenExplorer .timeframe .tabAbsolute .line .SingleDatePickerInput__withBorder, .ReactModalPortal .timeframe .tabAbsolute .line .SingleDatePickerInput__withBorder, .rc-time-picker-panel .timeframe .tabAbsolute .line .SingleDatePickerInput__withBorder {\n        border-radius: 5px;\n        border: 1px solid #dbdbdb;\n      }\n\n.keenExplorer .rc-time-picker-panel .rc-time-picker-panel-inner,.ReactModalPortal .rc-time-picker-panel .rc-time-picker-panel-inner,.rc-time-picker-panel .rc-time-picker-panel .rc-time-picker-panel-inner{\n    -webkit-box-shadow: none;\n            box-shadow: none;\n    border-radius: 5px;\n  }\n\n.keenExplorer .rc-time-picker-panel .rc-time-picker-input{\n    font-size: 0.88rem;\n    font-size: 0.88rem;\n    line-height: normal;\n    font-weight: normal;\n    color: #000;\n    height: 2.4rem;\n    width: 8rem;\n    border-radius: 5px;\n  }\n\n.ReactModalPortal .rc-time-picker-panel .rc-time-picker-input{\n    font-size: 0.88rem;\n    font-size: 0.88rem;\n    line-height: normal;\n    font-weight: normal;\n    color: #000;\n    height: 2.4rem;\n    width: 8rem;\n    border-radius: 5px;\n  }\n\n.rc-time-picker-panel .rc-time-picker-panel .rc-time-picker-input{\n    font-size: 0.88rem;\n    font-size: 0.88rem;\n    line-height: normal;\n    font-weight: normal;\n    color: #000;\n    height: 2.4rem;\n    width: 8rem;\n    border-radius: 5px;\n  }\n\n.keenExplorer .rc-time-picker-panel .rc-time-picker-panel-select{\n    font-size: 0.88rem;\n    font-size: 0.88rem;\n  }\n\n.ReactModalPortal .rc-time-picker-panel .rc-time-picker-panel-select{\n    font-size: 0.88rem;\n    font-size: 0.88rem;\n  }\n\n.rc-time-picker-panel .rc-time-picker-panel .rc-time-picker-panel-select{\n    font-size: 0.88rem;\n    font-size: 0.88rem;\n  }\n\n.keenExplorer .rc-time-picker-panel .rc-time-picker-panel-select li,.ReactModalPortal .rc-time-picker-panel .rc-time-picker-panel-select li,.rc-time-picker-panel .rc-time-picker-panel .rc-time-picker-panel-select li{\n      height: 2rem;\n      line-height: 2rem;\n    }\n\n.keenExplorer .rc-time-picker-panel .rc-time-picker-panel-input{\n    font-size: 0.88rem;\n    font-size: 0.88rem;\n  }\n\n.ReactModalPortal .rc-time-picker-panel .rc-time-picker-panel-input{\n    font-size: 0.88rem;\n    font-size: 0.88rem;\n  }\n\n.rc-time-picker-panel .rc-time-picker-panel .rc-time-picker-panel-input{\n    font-size: 0.88rem;\n    font-size: 0.88rem;\n  }\n\n.keenExplorer .apiQueryUrl,.ReactModalPortal .apiQueryUrl,.rc-time-picker-panel .apiQueryUrl{\n  cursor: pointer;\n  padding: 1rem;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  width: 100%;\n  font-size: 0.8rem;\n}\n\n.keenExplorer .apiQueryUrl input,.ReactModalPortal .apiQueryUrl input,.rc-time-picker-panel .apiQueryUrl input{\n    -ms-flex: 1;\n        flex: 1;\n    margin: 0 1rem;\n  }\n\n.keenExplorer .fa-copy:active{\n  color: #00bbde;\n  color: #00bbde;\n}\n\n.ReactModalPortal .fa-copy:active{\n  color: #00bbde;\n  color: #00bbde;\n}\n\n.rc-time-picker-panel .fa-copy:active{\n  color: #00bbde;\n  color: #00bbde;\n}\n\n.keenExplorer .button-run-query{\n  font-size: 0.88rem;\n  font-size: 0.88rem;\n  text-transform: uppercase;\n  border-radius: 0.3rem;\n  background: #3ecf8e;\n  background: #3ecf8e;\n  color: #fff;\n  font-weight: 600;\n  font-weight: 600;\n  border: 0;\n  padding: 0.88rem calc(0.88rem*2);\n  padding: 0.88rem calc(0.88rem*2);\n  cursor: pointer;\n  margin: 0;\n}\n\n.ReactModalPortal .button-run-query{\n  font-size: 0.88rem;\n  font-size: 0.88rem;\n  text-transform: uppercase;\n  border-radius: 0.3rem;\n  background: #3ecf8e;\n  background: #3ecf8e;\n  color: #fff;\n  font-weight: 600;\n  font-weight: 600;\n  border: 0;\n  padding: 0.88rem calc(0.88rem*2);\n  padding: 0.88rem calc(0.88rem*2);\n  cursor: pointer;\n  margin: 0;\n}\n\n.rc-time-picker-panel .button-run-query{\n  font-size: 0.88rem;\n  font-size: 0.88rem;\n  text-transform: uppercase;\n  border-radius: 0.3rem;\n  background: #3ecf8e;\n  background: #3ecf8e;\n  color: #fff;\n  font-weight: 600;\n  font-weight: 600;\n  border: 0;\n  padding: 0.88rem calc(0.88rem*2);\n  padding: 0.88rem calc(0.88rem*2);\n  cursor: pointer;\n  margin: 0;\n}\n\n.keenExplorer .button-with-loading-spinner .loading-spinner,.ReactModalPortal .button-with-loading-spinner .loading-spinner,.rc-time-picker-panel .button-with-loading-spinner .loading-spinner{\n    display: inline-block;\n    margin: 0 0.5rem 0 -0.5rem;\n    padding: 0;\n  }\n\n.keenExplorer .button-with-loading-spinner .loading-spinner i, .ReactModalPortal .button-with-loading-spinner .loading-spinner i, .rc-time-picker-panel .button-with-loading-spinner .loading-spinner i {\n      margin: 0;\n      padding: 0;\n      font-size: 1rem;\n    }\n\n.keenExplorer .error,.ReactModalPortal .error,.rc-time-picker-panel .error{\n  padding: 1rem;\n  background: #ffe5e5;\n  margin: 1rem 0;\n}\n\n.keenExplorer .box-info,.ReactModalPortal .box-info,.rc-time-picker-panel .box-info{\n  padding: 1rem;\n  background: #f1faff;\n}\n\n.keenExplorer .tab-content .box-info,.ReactModalPortal .tab-content .box-info,.rc-time-picker-panel .tab-content .box-info{\n  margin: -1rem;\n}\n\n.keenExplorer .preview,.ReactModalPortal .preview,.rc-time-picker-panel .preview{\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n      flex-direction: row;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  background: #fafafa;\n}\n\n.keenExplorer .preview .loader,.ReactModalPortal .preview .loader,.rc-time-picker-panel .preview .loader{\n    width: 100%;\n    height: 340px;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n        align-items: center;\n    -ms-flex-pack: center;\n        justify-content: center;\n    font-size: 5rem;\n    color: #eee;\n  }\n\n.keenExplorer .preview .keen-dataviz-container, .keenExplorer .preview .react-json-view, .ReactModalPortal .preview .keen-dataviz-container, .ReactModalPortal .preview .react-json-view, .rc-time-picker-panel .preview .keen-dataviz-container, .rc-time-picker-panel .preview .react-json-view{\n    width: 100%;\n    height: 340px;\n    background: #fff;\n    overflow-y: scroll;\n  }\n\n.keenExplorer .preview .react-json-view,.ReactModalPortal .preview .react-json-view,.rc-time-picker-panel .preview .react-json-view{\n    padding: 1rem;\n  }\n\n.keenExplorer .preview .select-chart-type-container,.ReactModalPortal .preview .select-chart-type-container,.rc-time-picker-panel .preview .select-chart-type-container{\n    -ms-flex: 1;\n        flex: 1;\n    -ms-flex-order: 1;\n        order: 1;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-item-align: center;\n        align-self: center;\n    -ms-flex-direction: column;\n        flex-direction: column;\n    -ms-flex-pack: end;\n        justify-content: flex-end;\n    margin: 0.3rem;\n  }\n\n.keenExplorer .preview .select-chart-type, .ReactModalPortal .preview .select-chart-type, .rc-time-picker-panel .preview .select-chart-type {\n    -ms-flex: 1;\n        flex: 1;\n    width: 20rem;\n    -ms-flex-item-align: end;\n        align-self: flex-end;\n  }\n\n.keenExplorer .preview .chart-not-supported-note,.ReactModalPortal .preview .chart-not-supported-note,.rc-time-picker-panel .preview .chart-not-supported-note{\n    float: right;\n    text-align: right;\n    padding: 0.5rem;\n  }\n\n.keenExplorer .preview .button-download,.ReactModalPortal .preview .button-download,.rc-time-picker-panel .preview .button-download{\n    -ms-flex-order: 0;\n        order: 0;\n    background: transparent;\n    border: 0;\n    margin: 0;\n    cursor: pointer;\n    font-size: 0.8rem;\n  }\n\n.keenExplorer .preview .button-download i,.ReactModalPortal .preview .button-download i,.rc-time-picker-panel .preview .button-download i{\n      margin-right: 0.5rem;\n    }\n\n.keenExplorer .action-buttons,.ReactModalPortal .action-buttons,.rc-time-picker-panel .action-buttons{\n  margin-top: 1rem;\n}\n\n.keenExplorer .chartType,.ReactModalPortal .chartType,.rc-time-picker-panel .chartType{\n  margin-top: 1rem;\n}\n\n.keenExplorer .button-toggle{\n  margin-left: 1rem;\n  display: inline;\n  cursor: pointer;\n  border-radius: 0.3rem;\n  font-size: 0.88rem;\n  font-size: 0.88rem;\n  font-weight: 600;\n  font-weight: 600;\n  text-transform: uppercase;\n  color: #3ecf8e;\n  color: #3ecf8e;\n  color: #45b2e8;\n  color: #45b2e8;\n  background: #fcfcfc;\n  border: 1px solid #efefef;\n  border: 1px solid #efefef;\n  padding: 0.88rem calc(0.88rem*2);\n  padding: 0.88rem calc(0.88rem*2);\n}\n\n.ReactModalPortal .button-toggle{\n  margin-left: 1rem;\n  display: inline;\n  cursor: pointer;\n  border-radius: 0.3rem;\n  font-size: 0.88rem;\n  font-size: 0.88rem;\n  font-weight: 600;\n  font-weight: 600;\n  text-transform: uppercase;\n  color: #3ecf8e;\n  color: #3ecf8e;\n  color: #45b2e8;\n  color: #45b2e8;\n  background: #fcfcfc;\n  border: 1px solid #efefef;\n  border: 1px solid #efefef;\n  padding: 0.88rem calc(0.88rem*2);\n  padding: 0.88rem calc(0.88rem*2);\n}\n\n.rc-time-picker-panel .button-toggle{\n  margin-left: 1rem;\n  display: inline;\n  cursor: pointer;\n  border-radius: 0.3rem;\n  font-size: 0.88rem;\n  font-size: 0.88rem;\n  font-weight: 600;\n  font-weight: 600;\n  text-transform: uppercase;\n  color: #3ecf8e;\n  color: #3ecf8e;\n  color: #45b2e8;\n  color: #45b2e8;\n  background: #fcfcfc;\n  border: 1px solid #efefef;\n  border: 1px solid #efefef;\n  padding: 0.88rem calc(0.88rem*2);\n  padding: 0.88rem calc(0.88rem*2);\n}\n\n.keenExplorer .button-toggle i, .ReactModalPortal .button-toggle i, .rc-time-picker-panel .button-toggle i {\n    margin-left: 1rem;\n  }\n\n.keenExplorer .button-toggle-active, .ReactModalPortal .button-toggle-active, .rc-time-picker-panel .button-toggle-active {\n  background: rgb(255, 255, 255);\n}\n\n.keenExplorer .result-string,.ReactModalPortal .result-string,.rc-time-picker-panel .result-string{\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: center;\n      justify-content: center;\n  -ms-flex-align: center;\n      align-items: center;\n}\n\n.keenExplorer .CalendarDay__selected {\n  background: #00bbde;\n  background: #00bbde;\n  border: 1px double #00bbde;\n  border: 1px double #00bbde;\n}\n\n.keenExplorer .CalendarDay__selected:active {\n  background: #00bbde;\n  background: #00bbde;\n  border: 1px double #00bbde;\n  border: 1px double #00bbde;\n}\n\n.keenExplorer .CalendarDay__selected:hover {\n  background: #00bbde;\n  background: #00bbde;\n  border: 1px double #00bbde;\n  border: 1px double #00bbde;\n}\n\n.ReactModalPortal .CalendarDay__selected {\n  background: #00bbde;\n  background: #00bbde;\n  border: 1px double #00bbde;\n  border: 1px double #00bbde;\n}\n\n.ReactModalPortal .CalendarDay__selected:active {\n  background: #00bbde;\n  background: #00bbde;\n  border: 1px double #00bbde;\n  border: 1px double #00bbde;\n}\n\n.ReactModalPortal .CalendarDay__selected:hover {\n  background: #00bbde;\n  background: #00bbde;\n  border: 1px double #00bbde;\n  border: 1px double #00bbde;\n}\n\n.rc-time-picker-panel .CalendarDay__selected {\n  background: #00bbde;\n  background: #00bbde;\n  border: 1px double #00bbde;\n  border: 1px double #00bbde;\n}\n\n.rc-time-picker-panel .CalendarDay__selected:active {\n  background: #00bbde;\n  background: #00bbde;\n  border: 1px double #00bbde;\n  border: 1px double #00bbde;\n}\n\n.rc-time-picker-panel .CalendarDay__selected:hover {\n  background: #00bbde;\n  background: #00bbde;\n  border: 1px double #00bbde;\n  border: 1px double #00bbde;\n}\n\n.keenExplorer .DayPickerKeyboardShortcuts_show__bottomRight::before{\n  border-right: 33px solid #00bbde;\n  border-right: 33px solid #00bbde;\n}\n\n.ReactModalPortal .DayPickerKeyboardShortcuts_show__bottomRight::before{\n  border-right: 33px solid #00bbde;\n  border-right: 33px solid #00bbde;\n}\n\n.rc-time-picker-panel .DayPickerKeyboardShortcuts_show__bottomRight::before{\n  border-right: 33px solid #00bbde;\n  border-right: 33px solid #00bbde;\n}\n\n.keenExplorer .DateInput_input__focused{\n  border-bottom: 2px solid #00bbde;\n  border-bottom: 2px solid #00bbde;\n}\n\n.ReactModalPortal .DateInput_input__focused{\n  border-bottom: 2px solid #00bbde;\n  border-bottom: 2px solid #00bbde;\n}\n\n.rc-time-picker-panel .DateInput_input__focused{\n  border-bottom: 2px solid #00bbde;\n  border-bottom: 2px solid #00bbde;\n}\n\n.keenExplorer .loading-spinner i, .ReactModalPortal .loading-spinner i, .rc-time-picker-panel .loading-spinner i {\n      font-size: 1.5rem;\n    }\n\n.keenExplorer .fa-spin, .ReactModalPortal .fa-spin, .rc-time-picker-panel .fa-spin {\n    -webkit-animation: fa-spin 1s infinite linear;\n            animation: fa-spin 1s infinite linear;\n}\n\n.keenExplorer .react-select-option,.ReactModalPortal .react-select-option,.rc-time-picker-panel .react-select-option{\n    padding: 0.7rem 1rem;\n}\n\n.keenExplorer .react-json-view .string-value,.ReactModalPortal .react-json-view .string-value,.rc-time-picker-panel .react-json-view .string-value{\n      word-break: break-word;\n    }\n\n@media screen and (max-width: 1000px) {\n  .keenExplorer{\n    -ms-flex-direction: column;\n        flex-direction: column;\n  }\n    .keenExplorer .panel{\n      -webkit-box-shadow: none;\n              box-shadow: none;\n      min-width: none;\n    }\n      .keenExplorer .panel .panel-content{\n        padding: 0 1rem;\n      }\n    .keenExplorer .result{\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: column;\n          flex-direction: column;\n    }\n      .keenExplorer .result .preview, .keenExplorer .result .lets-go{\n        -ms-flex-order: 1;\n            order: 1;\n      }\n      .keenExplorer .result .error{\n        margin-bottom: 0;\n      }\n      .keenExplorer .result .button-run-query{\n        -ms-flex-order: 0;\n            order: 0;\n      }\n      .keenExplorer .result .button-toggle {\n        -ms-flex-order: 3;\n            order: 3;\n      }\n      .keenExplorer .result .saved-query{\n        -ms-flex-order: 3;\n            order: 3;\n      }\n      .keenExplorer .result .action-buttons{\n        margin-bottom: 1rem;\n      }\n    .filters-container .delete{\n      margin-top: 0.5rem;\n    }\n}", ""]);



/***/ }),
/* 336 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),
/* 338 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/*
CSV Parse

Please look at the [project documentation](https://csv.js.org/parse/) for additional
information.
*/
var _require = __webpack_require__(340),
    Transform = _require.Transform;

var ResizeableBuffer = __webpack_require__(352);

var cr = 13;
var nl = 10;
var space = 32;
var tab = 9;
var bom_utf8 = Buffer.from([239, 97, 191]);

var Parser =
/*#__PURE__*/
function (_Transform) {
  _inherits(Parser, _Transform);

  function Parser() {
    var _this;

    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Parser);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Parser).call(this, _objectSpread({}, {
      readableObjectMode: true
    }, opts)));
    var options = {}; // Merge with user options

    for (var opt in opts) {
      options[underscore(opt)] = opts[opt];
    } // Normalize option `bom`


    if (options.bom === undefined || options.bom === null || options.bom === false) {
      options.bom = false;
    } else if (options.bom !== true) {
      throw new Error("Invalid Option: bom must be true, got ".concat(JSON.stringify(options.bom)));
    } // Normalize option `cast`


    var fnCastField = null;

    if (options.cast === undefined || options.cast === null || options.cast === false || options.cast === '') {
      options.cast = undefined;
    } else if (typeof options.cast === 'function') {
      fnCastField = options.cast;
      options.cast = true;
    } else if (options.cast !== true) {
      throw new Error('Invalid Option: cast must be true or a function');
    } // Normalize option `cast_date`


    if (options.cast_date === undefined || options.cast_date === null || options.cast_date === false || options.cast_date === '') {
      options.cast_date = false;
    } else if (options.cast_date === true) {
      options.cast_date = function (value) {
        var date = Date.parse(value);
        return !isNaN(date) ? new Date(date) : value;
      };
    } else if (typeof options.cast_date !== 'function') {
      throw new Error('Invalid Option: cast_date must be true or a function');
    } // Normalize option `columns`


    var fnFirstLineToHeaders = null;

    if (options.columns === true) {
      // Fields in the first line are converted as-is to columns
      fnFirstLineToHeaders = undefined;
    } else if (typeof options.columns === 'function') {
      fnFirstLineToHeaders = options.columns;
      options.columns = true;
    } else if (Array.isArray(options.columns)) {
      options.columns = normalizeColumnsArray(options.columns);
    } else if (options.columns === undefined || options.columns === null || options.columns === false) {
      options.columns = false;
    } else {
      throw new Error("Invalid Option columns: expect an object or true, got ".concat(JSON.stringify(options.columns)));
    } // Normalize option `comment`


    if (options.comment === undefined || options.comment === null || options.comment === false || options.comment === '') {
      options.comment = null;
    } else {
      if (typeof options.comment === 'string') {
        options.comment = Buffer.from(options.comment);
      }

      if (!Buffer.isBuffer(options.comment)) {
        throw new Error("Invalid Option: comment must be a buffer or a string, got ".concat(JSON.stringify(options.comment)));
      }
    } // Normalize option `delimiter`


    if (options.delimiter === undefined || options.delimiter === null || options.delimiter === false) {
      options.delimiter = Buffer.from(',');
    } else if (Buffer.isBuffer(options.delimiter)) {
      if (options.delimiter.length === 0) {
        throw new Error("Invalid Option: delimiter must be a non empty buffer");
      } // Great, nothing to do

    } else if (typeof options.delimiter === 'string') {
      if (options.delimiter.length === 0) {
        throw new Error("Invalid Option: delimiter must be a non empty string");
      }

      options.delimiter = Buffer.from(options.delimiter);
    } else {
      throw new Error("Invalid Option: delimiter must be a string or a buffer, got ".concat(options.delimiter));
    } // Normalize option `escape`


    if (options.escape === undefined || options.escape === null) {
      options.escape = Buffer.from('"');
    } else if (typeof options.escape === 'string') {
      options.escape = Buffer.from(options.escape);
    }

    if (!Buffer.isBuffer(options.escape)) {
      throw new Error("Invalid Option: escape must be a buffer or a string, got ".concat(JSON.stringify(options.escape)));
    } else if (options.escape.length !== 1) {
      throw new Error("Invalid Option Length: escape must be one character, got ".concat(options.escape.length));
    } else {
      options.escape = options.escape[0];
    } // Normalize option `from`


    if (options.from === undefined || options.from === null) {
      options.from = 1;
    } else {
      if (typeof options.from === 'string' && /\d+/.test(options.from)) {
        options.from = parseInt(options.from);
      }

      if (Number.isInteger(options.from)) {
        if (options.from < 0) {
          throw new Error("Invalid Option: from must be a positive integer, got ".concat(JSON.stringify(opts.from)));
        }
      } else {
        throw new Error("Invalid Option: from must be an integer, got ".concat(JSON.stringify(options.from)));
      }
    } // Normalize option `from_line`


    if (options.from_line === undefined || options.from_line === null) {
      options.from_line = 1;
    } else {
      if (typeof options.from_line === 'string' && /\d+/.test(options.from_line)) {
        options.from_line = parseInt(options.from_line);
      }

      if (Number.isInteger(options.from_line)) {
        if (options.from_line <= 0) {
          throw new Error("Invalid Option: from_line must be a positive integer greater than 0, got ".concat(JSON.stringify(opts.from_line)));
        }
      } else {
        throw new Error("Invalid Option: from_line must be an integer, got ".concat(JSON.stringify(opts.from_line)));
      }
    } // Normalize option `info`


    if (options.info === undefined || options.info === null || options.info === false) {
      options.info = false;
    } else if (options.info !== true) {
      throw new Error("Invalid Option: info must be true, got ".concat(JSON.stringify(options.info)));
    } // Normalize option `max_record_size`


    if (options.max_record_size === undefined || options.max_record_size === null || options.max_record_size === false) {
      options.max_record_size = 0;
    } else if (Number.isInteger(options.max_record_size) && options.max_record_size >= 0) {// Great, nothing to do
    } else if (typeof options.max_record_size === 'string' && /\d+/.test(options.max_record_size)) {
      options.max_record_size = parseInt(options.max_record_size);
    } else {
      throw new Error("Invalid Option: max_record_size must be a positive integer, got ".concat(JSON.stringify(options.max_record_size)));
    } // Normalize option `objname`


    if (options.objname === undefined || options.objname === null || options.objname === false) {
      options.objname = undefined;
    } else if (Buffer.isBuffer(options.objname)) {
      if (options.objname.length === 0) {
        throw new Error("Invalid Option: objname must be a non empty buffer");
      }

      options.objname = options.objname.toString();
    } else if (typeof options.objname === 'string') {
      if (options.objname.length === 0) {
        throw new Error("Invalid Option: objname must be a non empty string");
      } // Great, nothing to do

    } else {
      throw new Error("Invalid Option: objname must be a string or a buffer, got ".concat(options.objname));
    } // Normalize option `quote`


    if (options.quote === null || options.quote === false || options.quote === '') {
      options.quote = null;
    } else {
      if (options.quote === undefined || options.quote === true) {
        options.quote = Buffer.from('"');
      } else if (typeof options.quote === 'string') {
        options.quote = Buffer.from(options.quote);
      }

      if (!Buffer.isBuffer(options.quote)) {
        throw new Error("Invalid Option: quote must be a buffer or a string, got ".concat(JSON.stringify(options.quote)));
      } else if (options.quote.length !== 1) {
        throw new Error("Invalid Option Length: quote must be one character, got ".concat(options.quote.length));
      } else {
        options.quote = options.quote[0];
      }
    } // Normalize option `raw`


    if (options.raw === undefined || options.raw === null || options.raw === false) {
      options.raw = false;
    } else if (options.raw !== true) {
      throw new Error("Invalid Option: raw must be true, got ".concat(JSON.stringify(options.raw)));
    } // Normalize option `record_delimiter`


    if (!options.record_delimiter) {
      options.record_delimiter = [];
    } else if (!Array.isArray(options.record_delimiter)) {
      options.record_delimiter = [options.record_delimiter];
    }

    options.record_delimiter = options.record_delimiter.map(function (rd) {
      if (typeof rd === 'string') {
        rd = Buffer.from(rd);
      }

      return rd;
    }); // Normalize option `relax`

    if (typeof options.relax === 'boolean') {// Great, nothing to do
    } else if (options.relax === undefined || options.relax === null) {
      options.relax = false;
    } else {
      throw new Error("Invalid Option: relax must be a boolean, got ".concat(JSON.stringify(options.relax)));
    } // Normalize option `relax_column_count`


    if (typeof options.relax_column_count === 'boolean') {// Great, nothing to do
    } else if (options.relax_column_count === undefined || options.relax_column_count === null) {
      options.relax_column_count = false;
    } else {
      throw new Error("Invalid Option: relax_column_count must be a boolean, got ".concat(JSON.stringify(options.relax_column_count)));
    } // Normalize option `skip_empty_lines`


    if (typeof options.skip_empty_lines === 'boolean') {// Great, nothing to do
    } else if (options.skip_empty_lines === undefined || options.skip_empty_lines === null) {
      options.skip_empty_lines = false;
    } else {
      throw new Error("Invalid Option: skip_empty_lines must be a boolean, got ".concat(JSON.stringify(options.skip_empty_lines)));
    } // Normalize option `skip_lines_with_empty_values`


    if (typeof options.skip_lines_with_empty_values === 'boolean') {// Great, nothing to do
    } else if (options.skip_lines_with_empty_values === undefined || options.skip_lines_with_empty_values === null) {
      options.skip_lines_with_empty_values = false;
    } else {
      throw new Error("Invalid Option: skip_lines_with_empty_values must be a boolean, got ".concat(JSON.stringify(options.skip_lines_with_empty_values)));
    } // Normalize option `skip_lines_with_error`


    if (typeof options.skip_lines_with_error === 'boolean') {// Great, nothing to do
    } else if (options.skip_lines_with_error === undefined || options.skip_lines_with_error === null) {
      options.skip_lines_with_error = false;
    } else {
      throw new Error("Invalid Option: skip_lines_with_error must be a boolean, got ".concat(JSON.stringify(options.skip_lines_with_error)));
    } // Normalize option `rtrim`


    if (options.rtrim === undefined || options.rtrim === null || options.rtrim === false) {
      options.rtrim = false;
    } else if (options.rtrim !== true) {
      throw new Error("Invalid Option: rtrim must be a boolean, got ".concat(JSON.stringify(options.rtrim)));
    } // Normalize option `ltrim`


    if (options.ltrim === undefined || options.ltrim === null || options.ltrim === false) {
      options.ltrim = false;
    } else if (options.ltrim !== true) {
      throw new Error("Invalid Option: ltrim must be a boolean, got ".concat(JSON.stringify(options.ltrim)));
    } // Normalize option `trim`


    if (options.trim === undefined || options.trim === null || options.trim === false) {
      options.trim = false;
    } else if (options.trim !== true) {
      throw new Error("Invalid Option: trim must be a boolean, got ".concat(JSON.stringify(options.trim)));
    } // Normalize options `trim`, `ltrim` and `rtrim`


    if (options.trim === true && opts.ltrim !== false) {
      options.ltrim = true;
    } else if (options.ltrim !== true) {
      options.ltrim = false;
    }

    if (options.trim === true && opts.rtrim !== false) {
      options.rtrim = true;
    } else if (options.rtrim !== true) {
      options.rtrim = false;
    } // Normalize option `to`


    if (options.to === undefined || options.to === null) {
      options.to = -1;
    } else {
      if (typeof options.to === 'string' && /\d+/.test(options.to)) {
        options.to = parseInt(options.to);
      }

      if (Number.isInteger(options.to)) {
        if (options.to <= 0) {
          throw new Error("Invalid Option: to must be a positive integer greater than 0, got ".concat(JSON.stringify(opts.to)));
        }
      } else {
        throw new Error("Invalid Option: to must be an integer, got ".concat(JSON.stringify(opts.to)));
      }
    } // Normalize option `to_line`


    if (options.to_line === undefined || options.to_line === null) {
      options.to_line = -1;
    } else {
      if (typeof options.to_line === 'string' && /\d+/.test(options.to_line)) {
        options.to_line = parseInt(options.to_line);
      }

      if (Number.isInteger(options.to_line)) {
        if (options.to_line <= 0) {
          throw new Error("Invalid Option: to_line must be a positive integer greater than 0, got ".concat(JSON.stringify(opts.to_line)));
        }
      } else {
        throw new Error("Invalid Option: to_line must be an integer, got ".concat(JSON.stringify(opts.to_line)));
      }
    }

    _this.info = {
      comment_lines: 0,
      empty_lines: 0,
      invalid_field_length: 0,
      lines: 1,
      records: 0
    };
    _this.options = options;
    _this.state = {
      castField: fnCastField,
      commenting: false,
      enabled: options.from_line === 1,
      escaping: false,
      escapeIsQuote: options.escape === options.quote,
      expectedRecordLength: options.columns === null ? 0 : options.columns.length,
      field: new ResizeableBuffer(20),
      firstLineToHeaders: fnFirstLineToHeaders,
      info: Object.assign({}, _this.info),
      previousBuf: undefined,
      quoting: false,
      stop: false,
      rawBuffer: new ResizeableBuffer(100),
      record: [],
      recordHasError: false,
      record_length: 0,
      recordDelimiterMaxLength: options.record_delimiter.length === 0 ? 2 : Math.max.apply(Math, _toConsumableArray(options.record_delimiter.map(function (v) {
        return v.length;
      }))),
      trimChars: [Buffer.from(' ')[0], Buffer.from('\t')[0]],
      wasQuoting: false,
      wasRowDelimiter: false
    };
    return _this;
  } // Implementation of `Transform._transform`


  _createClass(Parser, [{
    key: "_transform",
    value: function _transform(buf, encoding, callback) {
      if (this.state.stop === true) {
        return;
      }

      var err = this.__parse(buf, false);

      if (err !== undefined) {
        this.state.stop = true;
      }

      callback(err);
    } // Implementation of `Transform._flush`

  }, {
    key: "_flush",
    value: function _flush(callback) {
      if (this.state.stop === true) {
        return;
      }

      var err = this.__parse(undefined, true);

      callback(err);
    } // Central parser implementation

  }, {
    key: "__parse",
    value: function __parse(nextBuf, end) {
      var _this$options = this.options,
          bom = _this$options.bom,
          comment = _this$options.comment,
          escape = _this$options.escape,
          from = _this$options.from,
          from_line = _this$options.from_line,
          info = _this$options.info,
          ltrim = _this$options.ltrim,
          max_record_size = _this$options.max_record_size,
          quote = _this$options.quote,
          raw = _this$options.raw,
          relax = _this$options.relax,
          rtrim = _this$options.rtrim,
          skip_empty_lines = _this$options.skip_empty_lines,
          to = _this$options.to,
          to_line = _this$options.to_line;
      var record_delimiter = this.options.record_delimiter;
      var _this$state = this.state,
          previousBuf = _this$state.previousBuf,
          rawBuffer = _this$state.rawBuffer,
          escapeIsQuote = _this$state.escapeIsQuote,
          trimChars = _this$state.trimChars;
      var buf;

      if (previousBuf === undefined) {
        if (nextBuf === undefined) {
          // Handle empty string
          this.push(null);
          return;
        } else {
          // Handle UTF BOM
          if (bom === true && bom_utf8.compare(nextBuf, 0, 3)) {
            buf = nextBuf.slice(3);
          } else {
            buf = nextBuf;
          }
        }
      } else if (previousBuf !== undefined && nextBuf === undefined) {
        buf = previousBuf;
      } else {
        buf = Buffer.concat([previousBuf, nextBuf]);
      }

      var bufLen = buf.length;
      var pos;

      for (pos = 0; pos < bufLen; pos++) {
        // Ensure we get enough space to look ahead
        // There should be a way to move this out of the loop
        if (this.__needMoreData(pos, bufLen, end)) {
          break;
        }

        if (this.state.wasRowDelimiter === true) {
          this.info.lines++;

          if (info === true && this.state.record.length === 0 && this.state.field.length === 0 && this.state.wasQuoting === false) {
            this.state.info = Object.assign({}, this.info);
          }

          this.state.wasRowDelimiter = false;
        }

        if (to_line !== -1 && this.info.lines > to_line) {
          this.state.stop = true;
          this.push(null);
          return;
        } // Auto discovery of record_delimiter, unix, mac and windows supported


        if (this.state.quoting === false && record_delimiter.length === 0) {
          var record_delimiterCount = this.__autoDiscoverRowDelimiter(buf, pos);

          if (record_delimiterCount) {
            record_delimiter = this.options.record_delimiter;
          }
        }

        var chr = buf[pos];

        if (raw === true) {
          rawBuffer.append(chr);
        }

        if ((chr === cr || chr === nl) && this.state.wasRowDelimiter === false) {
          this.state.wasRowDelimiter = true;
        } // Previous char was a valid escape char
        // treat the current char as a regular char


        if (this.state.escaping === true) {
          this.state.escaping = false;
        } else {
          // Escape is only active inside quoted fields
          if (this.state.quoting === true && chr === escape && pos + 1 < bufLen) {
            // We are quoting, the char is an escape chr and there is a chr to escape
            if (escapeIsQuote) {
              if (buf[pos + 1] === quote) {
                this.state.escaping = true;
                continue;
              }
            } else {
              this.state.escaping = true;
              continue;
            }
          } // Not currently escaping and chr is a quote
          // TODO: need to compare bytes instead of single char


          if (this.state.commenting === false && chr === quote) {
            if (this.state.quoting === true) {
              var nextChr = buf[pos + 1];

              var isNextChrTrimable = rtrim && this.__isCharTrimable(nextChr); // const isNextChrComment = nextChr === comment


              var isNextChrComment = comment !== null && this.__compareBytes(comment, buf, pos + 1, nextChr);

              var isNextChrDelimiter = this.__isDelimiter(nextChr, buf, pos + 1);

              var isNextChrRowDelimiter = record_delimiter.length === 0 ? this.__autoDiscoverRowDelimiter(buf, pos + 1) : this.__isRecordDelimiter(nextChr, buf, pos + 1); // Escape a quote
              // Treat next char as a regular character
              // TODO: need to compare bytes instead of single char

              if (chr === escape && nextChr === quote) {
                pos++;
              } else if (!nextChr || isNextChrDelimiter || isNextChrRowDelimiter || isNextChrComment || isNextChrTrimable) {
                this.state.quoting = false;
                this.state.wasQuoting = true;
                continue;
              } else if (relax === false) {
                var err = this.__error("Invalid Closing Quote: got \"".concat(String.fromCharCode(nextChr), "\" at line ").concat(this.info.lines, " instead of delimiter, row delimiter, trimable character (if activated) or comment"));

                if (err !== undefined) return err;
              } else {
                this.state.quoting = false;
                this.state.wasQuoting = true; // continue

                this.state.field.prepend(quote);
              }
            } else {
              if (this.state.field.length !== 0) {
                // In relax mode, treat opening quote preceded by chrs as regular
                if (relax === false) {
                  var _err = this.__error("Invalid opening quote at line ".concat(this.info.lines));

                  if (_err !== undefined) return _err;
                }
              } else {
                this.state.quoting = true;
                continue;
              }
            }
          }

          if (this.state.quoting === false) {
            var recordDelimiterLength = this.__isRecordDelimiter(chr, buf, pos);

            if (recordDelimiterLength !== 0) {
              // Do not emit comments which take a full line
              var skipCommentLine = this.state.commenting && this.state.wasQuoting === false && this.state.record.length === 0 && this.state.field.length === 0;

              if (skipCommentLine) {
                this.info.comment_lines++; // Skip full comment line
              } else {
                // Skip if line is empty and skip_empty_lines activated
                if (skip_empty_lines === true && this.state.wasQuoting === false && this.state.record.length === 0 && this.state.field.length === 0) {
                  this.info.empty_lines++;
                  pos += recordDelimiterLength - 1;
                  continue;
                } // Activate records emition if above from_line


                if (this.state.enabled === false && this.info.lines + (this.state.wasRowDelimiter === true ? 1 : 0) >= from_line) {
                  this.state.enabled = true;

                  this.__resetField();

                  this.__resetRow();

                  pos += recordDelimiterLength - 1;
                  continue;
                } else {
                  var errField = this.__onField();

                  if (errField !== undefined) return errField;

                  var errRecord = this.__onRow();

                  if (errRecord !== undefined) return errRecord;
                }

                if (to !== -1 && this.info.records >= to) {
                  this.state.stop = true;
                  this.push(null);
                  return;
                }
              }

              this.state.commenting = false;
              pos += recordDelimiterLength - 1;
              continue;
            }

            if (this.state.commenting) {
              continue;
            }

            var commentCount = comment === null ? 0 : this.__compareBytes(comment, buf, pos, chr);

            if (commentCount !== 0) {
              this.state.commenting = true;
              continue;
            }

            var delimiterLength = this.__isDelimiter(chr, buf, pos);

            if (delimiterLength !== 0) {
              var _errField = this.__onField();

              if (_errField !== undefined) return _errField;
              pos += delimiterLength - 1;
              continue;
            }
          }
        }

        if (this.state.commenting === false) {
          if (max_record_size !== 0 && this.state.record_length + this.state.field.length > max_record_size) {
            var _err2 = this.__error("Max Record Size: record exceed the maximum number of tolerated bytes of ".concat(max_record_size, " on line ").concat(this.info.lines));

            if (_err2 !== undefined) return _err2;
          }
        }

        var lappend = ltrim === false || this.state.quoting === true || this.state.field.length !== 0 || !this.__isCharTrimable(chr); // rtrim in non quoting is handle in __onField

        var rappend = rtrim === false || this.state.wasQuoting === false;

        if (lappend === true && rappend === true) {
          this.state.field.append(chr);
        } else if (rtrim === true && !this.__isCharTrimable(chr)) {
          var _err3 = this.__error("Invalid Closing Quote: found non trimable byte after quote at line ".concat(this.info.lines));

          if (_err3 !== undefined) return _err3;
        }
      }

      if (end === true) {
        if (this.state.quoting === true) {
          var _err4 = this.__error("Invalid Closing Quote: quote is not closed at line ".concat(this.info.lines));

          if (_err4 !== undefined) return _err4;
        } else {
          // Skip last line if it has no characters
          if (this.state.wasQuoting === true || this.state.record.length !== 0 || this.state.field.length !== 0) {
            var _errField2 = this.__onField();

            if (_errField2 !== undefined) return _errField2;

            var _errRecord = this.__onRow();

            if (_errRecord !== undefined) return _errRecord;
          } else if (this.state.wasRowDelimiter === true) {
            this.info.empty_lines++;
          } else if (this.state.commenting === true) {
            this.info.comment_lines++;
          }
        }
      } else {
        this.state.previousBuf = buf.slice(pos);
      }

      if (this.state.wasRowDelimiter === true) {
        this.info.lines++;
        this.state.wasRowDelimiter = false;
      }
    } // Helper to test if a character is a space or a line delimiter

  }, {
    key: "__isCharTrimable",
    value: function __isCharTrimable(chr) {
      return chr === space || chr === tab || chr === cr || chr === nl;
    }
  }, {
    key: "__onRow",
    value: function __onRow() {
      var _this$options2 = this.options,
          columns = _this$options2.columns,
          info = _this$options2.info,
          from = _this$options2.from,
          relax_column_count = _this$options2.relax_column_count,
          raw = _this$options2.raw,
          skip_lines_with_empty_values = _this$options2.skip_lines_with_empty_values;
      var _this$state2 = this.state,
          enabled = _this$state2.enabled,
          record = _this$state2.record; // Convert the first line into column names

      if (columns === true) {
        return this.__firstLineToColumns(record);
      }

      var recordLength = record.length;

      if (columns === false && this.info.records === 0) {
        this.state.expectedRecordLength = recordLength;
      } else if (enabled === true) {
        if (recordLength !== this.state.expectedRecordLength) {
          if (relax_column_count === true) {
            this.info.invalid_field_length++;
          } else {
            if (columns === false) {
              var err = this.__error("Invalid Record Length: expect ".concat(this.state.expectedRecordLength, ", got ").concat(recordLength, " on line ").concat(this.info.lines));

              if (err !== undefined) return err;
            } else {
              var _err5 = this.__error("Invalid Record Length: header length is ".concat(columns.length, ", got ").concat(recordLength, " on line ").concat(this.info.lines));

              if (_err5 !== undefined) return _err5;
            }
          }
        }
      }

      if (enabled === false) {
        return this.__resetRow();
      }

      if (skip_lines_with_empty_values === true) {
        if (record.map(function (field) {
          return field.trim();
        }).join('') === '') {
          this.__resetRow();

          return;
        }
      }

      if (this.state.recordHasError === true) {
        this.__resetRow();

        this.state.recordHasError = false;
        return;
      }

      this.info.records++;

      if (from === 1 || this.info.records >= from) {
        if (columns !== false) {
          var obj = {}; // Transform record array to an object

          for (var i in record) {
            if (columns[i] === undefined || columns[i].disabled) continue;
            obj[columns[i].name] = record[i];
          }

          var objname = this.options.objname;

          if (objname === undefined) {
            if (raw === true || info === true) {
              this.push(Object.assign({
                record: obj
              }, raw === true ? {
                raw: this.state.rawBuffer.toString()
              } : {}, info === true ? {
                info: this.state.info
              } : {}));
            } else {
              this.push(obj);
            }
          } else {
            if (raw === true || info === true) {
              this.push(Object.assign({
                record: [obj[objname], obj]
              }, raw === true ? {
                raw: this.state.rawBuffer.toString()
              } : {}, info === true ? {
                info: this.state.info
              } : {}));
            } else {
              this.push([obj[objname], obj]);
            }
          }
        } else {
          if (raw === true || info === true) {
            this.push(Object.assign({
              record: record
            }, raw === true ? {
              raw: this.state.rawBuffer.toString()
            } : {}, info === true ? {
              info: this.state.info
            } : {}));
          } else {
            this.push(record);
          }
        }
      }

      this.__resetRow();
    }
  }, {
    key: "__firstLineToColumns",
    value: function __firstLineToColumns(record) {
      var firstLineToHeaders = this.state.firstLineToHeaders;

      try {
        // record = record.filter(function(field){ return field !== undefined})
        var headers = firstLineToHeaders === undefined ? record : firstLineToHeaders.call(null, record);

        if (!Array.isArray(headers)) {
          return this.__error("Invalid Header Mapping: expect an array, got ".concat(JSON.stringify(headers)));
        }

        var normalizedHeaders = normalizeColumnsArray(headers);
        this.state.expectedRecordLength = normalizedHeaders.length;
        this.options.columns = normalizedHeaders;

        this.__resetRow();

        return;
      } catch (err) {
        return err;
      }
    }
  }, {
    key: "__resetRow",
    value: function __resetRow() {
      var info = this.options.info;

      if (this.options.raw === true) {
        this.state.rawBuffer.reset();
      }

      this.state.record = [];
      this.state.record_length = 0;
    }
  }, {
    key: "__onField",
    value: function __onField() {
      var _this$options3 = this.options,
          cast = _this$options3.cast,
          rtrim = _this$options3.rtrim,
          max_record_size = _this$options3.max_record_size;
      var _this$state3 = this.state,
          enabled = _this$state3.enabled,
          wasQuoting = _this$state3.wasQuoting; // Deal with from_to options

      if (this.options.columns !== true && enabled === false) {
        return this.__resetField();
      }

      var field = this.state.field.toString();

      if (rtrim === true && wasQuoting === false) {
        field = field.trimRight();
      }

      if (cast === true) {
        var _this$__cast = this.__cast(field),
            _this$__cast2 = _slicedToArray(_this$__cast, 2),
            err = _this$__cast2[0],
            f = _this$__cast2[1];

        if (err !== undefined) return err;
        field = f;
      }

      this.state.record.push(field); // Increment record length if record size must not exceed a limit

      if (max_record_size !== 0 && typeof field === 'string') {
        this.state.record_length += field.length;
      }

      this.__resetField();
    }
  }, {
    key: "__resetField",
    value: function __resetField() {
      this.state.field.reset();
      this.state.wasQuoting = false;
    } // Return a tuple with the error and the casted value

  }, {
    key: "__cast",
    value: function __cast(field) {
      var isColumns = Array.isArray(this.options.columns); // Dont loose time calling cast if the field wont be part of the final record

      if (isColumns === true && this.options.columns.length <= this.state.record.length) {
        return [undefined, undefined];
      }

      var context = {
        column: isColumns === true ? this.options.columns[this.state.record.length].name : this.state.record.length,
        empty_lines: this.info.empty_lines,
        header: this.options.columns === true,
        index: this.state.record.length,
        invalid_field_length: this.info.invalid_field_length,
        quoting: this.state.wasQuoting,
        lines: this.info.lines,
        records: this.info.records
      };

      if (this.state.castField !== null) {
        try {
          return [undefined, this.state.castField.call(null, field, context)];
        } catch (err) {
          return [err];
        }
      }

      if (this.__isInt(field) === true) {
        return [undefined, parseInt(field)];
      } else if (this.__isFloat(field)) {
        return [undefined, parseFloat(field)];
      } else if (this.options.cast_date !== false) {
        return [undefined, this.options.cast_date.call(null, field, context)];
      }

      return [undefined, field];
    }
  }, {
    key: "__isInt",
    value: function __isInt(value) {
      return /^(\-|\+)?([1-9]+[0-9]*)$/.test(value);
    }
  }, {
    key: "__isFloat",
    value: function __isFloat(value) {
      return value - parseFloat(value) + 1 >= 0; // Borrowed from jquery
    }
  }, {
    key: "__compareBytes",
    value: function __compareBytes(sourceBuf, targetBuf, pos, firtByte) {
      if (sourceBuf[0] !== firtByte) return 0;
      var sourceLength = sourceBuf.length;

      for (var i = 1; i < sourceLength; i++) {
        if (sourceBuf[i] !== targetBuf[pos + i]) return 0;
      }

      return sourceLength;
    }
  }, {
    key: "__needMoreData",
    value: function __needMoreData(i, bufLen, end) {
      if (end) {
        return false;
      }

      var _this$options4 = this.options,
          comment = _this$options4.comment,
          delimiter = _this$options4.delimiter,
          escape = _this$options4.escape;
      var _this$state4 = this.state,
          quoting = _this$state4.quoting,
          recordDelimiterMaxLength = _this$state4.recordDelimiterMaxLength;
      var numOfCharLeft = bufLen - i - 1;
      var requiredLength = Math.max( // Skip if the remaining buffer smaller than comment
      comment ? comment.length : 0, // Skip if the remaining buffer smaller than row delimiter
      recordDelimiterMaxLength, // Skip if the remaining buffer can be row delimiter following the closing quote
      // 1 is for quote.length
      quoting ? 1 + recordDelimiterMaxLength : 0, // Skip if the remaining buffer can be delimiter
      delimiter.length, // Skip if the remaining buffer can be escape sequence
      // 1 is for escape.length
      1);
      return numOfCharLeft < requiredLength;
    }
  }, {
    key: "__isDelimiter",
    value: function __isDelimiter(chr, buf, pos) {
      var delimiter = this.options.delimiter;
      var delLength = delimiter.length;
      if (delimiter[0] !== chr) return 0;

      for (var i = 1; i < delLength; i++) {
        if (delimiter[i] !== buf[pos + i]) return 0;
      }

      return delimiter.length;
    }
  }, {
    key: "__isRecordDelimiter",
    value: function __isRecordDelimiter(chr, buf, pos) {
      var record_delimiter = this.options.record_delimiter;
      var recordDelimiterLength = record_delimiter.length;

      loop1: for (var i = 0; i < recordDelimiterLength; i++) {
        var rd = record_delimiter[i];
        var rdLength = rd.length;

        if (rd[0] !== chr) {
          continue;
        }

        for (var j = 1; j < rdLength; j++) {
          if (rd[j] !== buf[pos + j]) {
            continue loop1;
          }
        }

        return rd.length;
      }

      return 0;
    }
  }, {
    key: "__autoDiscoverRowDelimiter",
    value: function __autoDiscoverRowDelimiter(buf, pos) {
      var chr = buf[pos];

      if (chr === cr) {
        if (buf[pos + 1] === nl) {
          this.options.record_delimiter.push(Buffer.from('\r\n'));
          this.state.recordDelimiterMaxLength = 2;
          return 2;
        } else {
          this.options.record_delimiter.push(Buffer.from('\r'));
          this.state.recordDelimiterMaxLength = 1;
          return 1;
        }
      } else if (chr === nl) {
        this.options.record_delimiter.push(Buffer.from('\n'));
        this.state.recordDelimiterMaxLength = 1;
        return 1;
      }

      return 0;
    }
  }, {
    key: "__error",
    value: function __error(msg) {
      var skip_lines_with_error = this.options.skip_lines_with_error;
      var err = new Error(msg);

      if (skip_lines_with_error) {
        this.state.recordHasError = true;
        this.emit('skip', err);
        return undefined;
      } else {
        return err;
      }
    }
  }]);

  return Parser;
}(Transform);

var parse = function parse() {
  var data, options, callback;

  for (var i in arguments) {
    var argument = arguments[i];

    var type = _typeof(argument);

    if (data === undefined && (typeof argument === 'string' || Buffer.isBuffer(argument))) {
      data = argument;
    } else if (options === undefined && isObject(argument)) {
      options = argument;
    } else if (callback === undefined && type === 'function') {
      callback = argument;
    } else {
      throw new Error("Invalid argument: got ".concat(JSON.stringify(argument), " at index ").concat(i));
    }
  }

  var parser = new Parser(options);

  if (callback) {
    var records = options === undefined || options.objname === undefined ? [] : {};
    parser.on('readable', function () {
      var record;

      while (record = this.read()) {
        if (options === undefined || options.objname === undefined) {
          records.push(record);
        } else {
          records[record[0]] = record[1];
        }
      }
    });
    parser.on('error', function (err) {
      callback(err, undefined, parser.info);
    });
    parser.on('end', function () {
      callback(undefined, records, parser.info);
    });
  }

  if (data !== undefined) {
    parser.write(data);
    parser.end();
  }

  return parser;
};

parse.Parser = Parser;
module.exports = parse;

var underscore = function underscore(str) {
  return str.replace(/([A-Z])/g, function (_, match, index) {
    return '_' + match.toLowerCase();
  });
};

var isObject = function isObject(obj) {
  return _typeof(obj) === 'object' && obj !== null && !Array.isArray(obj);
};

var normalizeColumnsArray = function normalizeColumnsArray(columns) {
  // console.log('columns', columns)
  var normalizedColumns = [];

  for (var i = 0; i < columns.length; i++) {
    var column = columns[i];

    if (column === undefined || column === null || column === false) {
      normalizedColumns[i] = {
        disabled: true
      };
    } else if (typeof column === 'string') {
      normalizedColumns[i] = {
        name: column
      };
    } else if (isObject(column)) {
      if (typeof column.name !== 'string') {
        throw new Error("Invalid Option columns: property \"name\" is required at position ".concat(i, " when column is an object literal"));
      }

      normalizedColumns[i] = column;
    } else {
      throw new Error("Invalid Option columns: expect a string or an object, got ".concat(JSON.stringify(column), " at position ").concat(i));
    }
  } // console.log(normalizedColumns)


  return normalizedColumns;
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(54).Buffer))

/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = __webpack_require__(106).EventEmitter;
var inherits = __webpack_require__(49);

inherits(Stream, EE);
Stream.Readable = __webpack_require__(107);
Stream.Writable = __webpack_require__(348);
Stream.Duplex = __webpack_require__(349);
Stream.Transform = __webpack_require__(350);
Stream.PassThrough = __webpack_require__(351);

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};


/***/ }),
/* 341 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = __webpack_require__(76).Buffer;
var util = __webpack_require__(343);

function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}

module.exports = function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function push(v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function unshift(v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  return BufferList;
}();

if (util && util.inspect && util.inspect.custom) {
  module.exports.prototype[util.inspect.custom] = function () {
    var obj = util.inspect({ length: this.length });
    return this.constructor.name + ' ' + obj;
  };
}

/***/ }),
/* 343 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(345);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(25)))

/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(25), __webpack_require__(74)))

/***/ }),
/* 346 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(25)))

/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.



module.exports = PassThrough;

var Transform = __webpack_require__(149);

/*<replacement>*/
var util = __webpack_require__(55);
util.inherits = __webpack_require__(49);
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(108);


/***/ }),
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(41);


/***/ }),
/* 350 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(107).Transform


/***/ }),
/* 351 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(107).PassThrough


/***/ }),
/* 352 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ResizeableBuffer =
/*#__PURE__*/
function () {
  function ResizeableBuffer() {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

    _classCallCheck(this, ResizeableBuffer);

    this.size = size;
    this.length = 0;
    this.buf = Buffer.alloc(size);
  }

  _createClass(ResizeableBuffer, [{
    key: "prepend",
    value: function prepend(val) {
      var length = this.length++;

      if (length === this.size) {
        this.resize();
      }

      var buf = this.clone();
      this.buf[0] = val;
      buf.copy(this.buf, 1, 0, length);
    }
  }, {
    key: "append",
    value: function append(val) {
      var length = this.length++;

      if (length === this.size) {
        this.resize();
      }

      this.buf[length] = val;
    }
  }, {
    key: "clone",
    value: function clone() {
      return Buffer.from(this.buf.slice(0, this.length));
    }
  }, {
    key: "resize",
    value: function resize() {
      var length = this.length;
      this.size = this.size * 2;
      var buf = Buffer.alloc(this.size);
      this.buf.copy(buf, 0, 0, length);
      this.buf = buf;
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.buf.slice(0, this.length).toString();
    }
  }, {
    key: "reset",
    value: function reset() {
      this.length = 0;
    }
  }]);

  return ResizeableBuffer;
}();

module.exports = ResizeableBuffer;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(54).Buffer))

/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _registerCSSInterfaceWithDefaultTheme = _interopRequireDefault(__webpack_require__(354));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _registerCSSInterfaceWithDefaultTheme["default"])();

/***/ }),
/* 354 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = registerCSSInterfaceWithDefaultTheme;

var _reactWithStylesInterfaceCss = _interopRequireDefault(__webpack_require__(355));

var _registerInterfaceWithDefaultTheme = _interopRequireDefault(__webpack_require__(376));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function registerCSSInterfaceWithDefaultTheme() {
  (0, _registerInterfaceWithDefaultTheme["default"])(_reactWithStylesInterfaceCss["default"]);
}

/***/ }),
/* 355 */
/***/ (function(module, exports, __webpack_require__) {

// eslint-disable-next-line import/no-unresolved
module.exports = __webpack_require__(356).default;


/***/ }),
/* 356 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _arrayPrototype = __webpack_require__(357);

var _arrayPrototype2 = _interopRequireDefault(_arrayPrototype);

var _globalCache = __webpack_require__(372);

var _globalCache2 = _interopRequireDefault(_globalCache);

var _constants = __webpack_require__(373);

var _getClassName = __webpack_require__(374);

var _getClassName2 = _interopRequireDefault(_getClassName);

var _separateStyles2 = __webpack_require__(375);

var _separateStyles3 = _interopRequireDefault(_separateStyles2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Function required as part of the react-with-styles interface. Parses the styles provided by
 * react-with-styles to produce class names based on the style name and optionally the namespace if
 * available.
 *
 * stylesObject {Object} The styles object passed to withStyles.
 *
 * Return an object mapping style names to class names.
 */
function create(stylesObject) {
  var stylesToClasses = {};
  var styleNames = Object.keys(stylesObject);
  var sharedState = _globalCache2['default'].get(_constants.GLOBAL_CACHE_KEY) || {};
  var _sharedState$namespac = sharedState.namespace,
      namespace = _sharedState$namespac === undefined ? '' : _sharedState$namespac;

  styleNames.forEach(function (styleName) {
    var className = (0, _getClassName2['default'])(namespace, styleName);
    stylesToClasses[styleName] = className;
  });
  return stylesToClasses;
}

/**
 * Process styles to be consumed by a component.
 *
 * stylesArray {Array} Array of the following: values returned by create, plain JavaScript objects
 * representing inline styles, or arrays thereof.
 *
 * Return an object with optional className and style properties to be spread on a component.
 */
function resolve(stylesArray) {
  var flattenedStyles = (0, _arrayPrototype2['default'])(stylesArray, Infinity);

  var _separateStyles = (0, _separateStyles3['default'])(flattenedStyles),
      classNames = _separateStyles.classNames,
      hasInlineStyles = _separateStyles.hasInlineStyles,
      inlineStyles = _separateStyles.inlineStyles;

  var specificClassNames = classNames.map(function (name, index) {
    return String(name) + ' ' + String(name) + '_' + String(index + 1);
  });
  var className = specificClassNames.join(' ');

  var result = { className: className };
  if (hasInlineStyles) result.style = inlineStyles;
  return result;
}

exports['default'] = { create: create, resolve: resolve };

/***/ }),
/* 357 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__(109);
var bind = __webpack_require__(77);

var implementation = __webpack_require__(151);
var getPolyfill = __webpack_require__(159);
var polyfill = getPolyfill();
var shim = __webpack_require__(371);

var boundFlat = bind.call(Function.call, polyfill);

define(boundFlat, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundFlat;


/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// modified from https://github.com/es-shims/es5-shim
var has = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var slice = Array.prototype.slice;
var isArgs = __webpack_require__(359);
var isEnumerable = Object.prototype.propertyIsEnumerable;
var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
var dontEnums = [
	'toString',
	'toLocaleString',
	'valueOf',
	'hasOwnProperty',
	'isPrototypeOf',
	'propertyIsEnumerable',
	'constructor'
];
var equalsConstructorPrototype = function (o) {
	var ctor = o.constructor;
	return ctor && ctor.prototype === o;
};
var excludedKeys = {
	$console: true,
	$external: true,
	$frame: true,
	$frameElement: true,
	$frames: true,
	$innerHeight: true,
	$innerWidth: true,
	$outerHeight: true,
	$outerWidth: true,
	$pageXOffset: true,
	$pageYOffset: true,
	$parent: true,
	$scrollLeft: true,
	$scrollTop: true,
	$scrollX: true,
	$scrollY: true,
	$self: true,
	$webkitIndexedDB: true,
	$webkitStorageInfo: true,
	$window: true
};
var hasAutomationEqualityBug = (function () {
	/* global window */
	if (typeof window === 'undefined') { return false; }
	for (var k in window) {
		try {
			if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
				try {
					equalsConstructorPrototype(window[k]);
				} catch (e) {
					return true;
				}
			}
		} catch (e) {
			return true;
		}
	}
	return false;
}());
var equalsConstructorPrototypeIfNotBuggy = function (o) {
	/* global window */
	if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
		return equalsConstructorPrototype(o);
	}
	try {
		return equalsConstructorPrototype(o);
	} catch (e) {
		return false;
	}
};

var keysShim = function keys(object) {
	var isObject = object !== null && typeof object === 'object';
	var isFunction = toStr.call(object) === '[object Function]';
	var isArguments = isArgs(object);
	var isString = isObject && toStr.call(object) === '[object String]';
	var theKeys = [];

	if (!isObject && !isFunction && !isArguments) {
		throw new TypeError('Object.keys called on a non-object');
	}

	var skipProto = hasProtoEnumBug && isFunction;
	if (isString && object.length > 0 && !has.call(object, 0)) {
		for (var i = 0; i < object.length; ++i) {
			theKeys.push(String(i));
		}
	}

	if (isArguments && object.length > 0) {
		for (var j = 0; j < object.length; ++j) {
			theKeys.push(String(j));
		}
	} else {
		for (var name in object) {
			if (!(skipProto && name === 'prototype') && has.call(object, name)) {
				theKeys.push(String(name));
			}
		}
	}

	if (hasDontEnumBug) {
		var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

		for (var k = 0; k < dontEnums.length; ++k) {
			if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
				theKeys.push(dontEnums[k]);
			}
		}
	}
	return theKeys;
};

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			return (Object.keys(arguments) || '').length === 2;
		}(1, 2));
		if (!keysWorksWithArguments) {
			var originalKeys = Object.keys;
			Object.keys = function keys(object) {
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				} else {
					return originalKeys(object);
				}
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ }),
/* 359 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ }),
/* 360 */
/***/ (function(module, exports) {


var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};



/***/ }),
/* 361 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),
/* 362 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ES2016 = __webpack_require__(363);
var assign = __webpack_require__(112);

var ES2017 = assign(assign({}, ES2016), {
	ToIndex: function ToIndex(value) {
		if (typeof value === 'undefined') {
			return 0;
		}
		var integerIndex = this.ToInteger(value);
		if (integerIndex < 0) {
			throw new RangeError('index must be >= 0');
		}
		var index = this.ToLength(integerIndex);
		if (!this.SameValueZero(integerIndex, index)) {
			throw new RangeError('index must be >= 0 and < 2 ** 53 - 1');
		}
		return index;
	}
});

delete ES2017.EnumerableOwnNames; // replaced with EnumerableOwnProperties

module.exports = ES2017;


/***/ }),
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ES2015 = __webpack_require__(364);
var assign = __webpack_require__(112);

var ES2016 = assign(assign({}, ES2015), {
	// https://github.com/tc39/ecma262/pull/60
	SameValueNonNumber: function SameValueNonNumber(x, y) {
		if (typeof x === 'number' || typeof x !== typeof y) {
			throw new TypeError('SameValueNonNumber requires two non-number values of the same type.');
		}
		return this.SameValue(x, y);
	}
});

module.exports = ES2016;


/***/ }),
/* 364 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = __webpack_require__(110);
var toPrimitive = __webpack_require__(365);

var GetIntrinsic = __webpack_require__(154);

var $TypeError = GetIntrinsic('%TypeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');
var $Array = GetIntrinsic('%Array%');
var $String = GetIntrinsic('%String%');
var $Object = GetIntrinsic('%Object%');
var $Number = GetIntrinsic('%Number%');
var $Symbol = GetIntrinsic('%Symbol%', true);
var $RegExp = GetIntrinsic('%RegExp%');

var hasSymbols = !!$Symbol;

var $isNaN = __webpack_require__(155);
var $isFinite = __webpack_require__(156);
var MAX_SAFE_INTEGER = $Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;

var assign = __webpack_require__(112);
var sign = __webpack_require__(157);
var mod = __webpack_require__(158);
var isPrimitive = __webpack_require__(367);
var parseInteger = parseInt;
var bind = __webpack_require__(77);
var arraySlice = bind.call(Function.call, $Array.prototype.slice);
var strSlice = bind.call(Function.call, $String.prototype.slice);
var isBinary = bind.call(Function.call, $RegExp.prototype.test, /^0b[01]+$/i);
var isOctal = bind.call(Function.call, $RegExp.prototype.test, /^0o[0-7]+$/i);
var regexExec = bind.call(Function.call, $RegExp.prototype.exec);
var nonWS = ['\u0085', '\u200b', '\ufffe'].join('');
var nonWSregex = new $RegExp('[' + nonWS + ']', 'g');
var hasNonWS = bind.call(Function.call, $RegExp.prototype.test, nonWSregex);
var invalidHexLiteral = /^[-+]0x[0-9a-f]+$/i;
var isInvalidHexLiteral = bind.call(Function.call, $RegExp.prototype.test, invalidHexLiteral);
var $charCodeAt = bind.call(Function.call, $String.prototype.charCodeAt);

var toStr = bind.call(Function.call, Object.prototype.toString);

var $floor = Math.floor;
var $abs = Math.abs;

var $ObjectCreate = Object.create;
var $gOPD = $Object.getOwnPropertyDescriptor;

var $isExtensible = $Object.isExtensible;

// whitespace from: http://es5.github.io/#x15.5.4.20
// implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
var ws = [
	'\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003',
	'\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028',
	'\u2029\uFEFF'
].join('');
var trimRegex = new RegExp('(^[' + ws + ']+)|([' + ws + ']+$)', 'g');
var replace = bind.call(Function.call, $String.prototype.replace);
var trim = function (value) {
	return replace(value, trimRegex, '');
};

var ES5 = __webpack_require__(368);

var hasRegExpMatcher = __webpack_require__(370);

// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-abstract-operations
var ES6 = assign(assign({}, ES5), {

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-call-f-v-args
	Call: function Call(F, V) {
		var args = arguments.length > 2 ? arguments[2] : [];
		if (!this.IsCallable(F)) {
			throw new $TypeError(F + ' is not a function');
		}
		return F.apply(V, args);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toprimitive
	ToPrimitive: toPrimitive,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toboolean
	// ToBoolean: ES5.ToBoolean,

	// https://ecma-international.org/ecma-262/6.0/#sec-tonumber
	ToNumber: function ToNumber(argument) {
		var value = isPrimitive(argument) ? argument : toPrimitive(argument, $Number);
		if (typeof value === 'symbol') {
			throw new $TypeError('Cannot convert a Symbol value to a number');
		}
		if (typeof value === 'string') {
			if (isBinary(value)) {
				return this.ToNumber(parseInteger(strSlice(value, 2), 2));
			} else if (isOctal(value)) {
				return this.ToNumber(parseInteger(strSlice(value, 2), 8));
			} else if (hasNonWS(value) || isInvalidHexLiteral(value)) {
				return NaN;
			} else {
				var trimmed = trim(value);
				if (trimmed !== value) {
					return this.ToNumber(trimmed);
				}
			}
		}
		return $Number(value);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tointeger
	// ToInteger: ES5.ToNumber,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint32
	// ToInt32: ES5.ToInt32,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint32
	// ToUint32: ES5.ToUint32,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint16
	ToInt16: function ToInt16(argument) {
		var int16bit = this.ToUint16(argument);
		return int16bit >= 0x8000 ? int16bit - 0x10000 : int16bit;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint16
	// ToUint16: ES5.ToUint16,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint8
	ToInt8: function ToInt8(argument) {
		var int8bit = this.ToUint8(argument);
		return int8bit >= 0x80 ? int8bit - 0x100 : int8bit;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8
	ToUint8: function ToUint8(argument) {
		var number = this.ToNumber(argument);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
		var posInt = sign(number) * $floor($abs(number));
		return mod(posInt, 0x100);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8clamp
	ToUint8Clamp: function ToUint8Clamp(argument) {
		var number = this.ToNumber(argument);
		if ($isNaN(number) || number <= 0) { return 0; }
		if (number >= 0xFF) { return 0xFF; }
		var f = $floor(argument);
		if (f + 0.5 < number) { return f + 1; }
		if (number < f + 0.5) { return f; }
		if (f % 2 !== 0) { return f + 1; }
		return f;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tostring
	ToString: function ToString(argument) {
		if (typeof argument === 'symbol') {
			throw new $TypeError('Cannot convert a Symbol value to a string');
		}
		return $String(argument);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toobject
	ToObject: function ToObject(value) {
		this.RequireObjectCoercible(value);
		return $Object(value);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-topropertykey
	ToPropertyKey: function ToPropertyKey(argument) {
		var key = this.ToPrimitive(argument, $String);
		return typeof key === 'symbol' ? key : this.ToString(key);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	ToLength: function ToLength(argument) {
		var len = this.ToInteger(argument);
		if (len <= 0) { return 0; } // includes converting -0 to +0
		if (len > MAX_SAFE_INTEGER) { return MAX_SAFE_INTEGER; }
		return len;
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-canonicalnumericindexstring
	CanonicalNumericIndexString: function CanonicalNumericIndexString(argument) {
		if (toStr(argument) !== '[object String]') {
			throw new $TypeError('must be a string');
		}
		if (argument === '-0') { return -0; }
		var n = this.ToNumber(argument);
		if (this.SameValue(this.ToString(n), argument)) { return n; }
		return void 0;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-requireobjectcoercible
	RequireObjectCoercible: ES5.CheckObjectCoercible,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isarray
	IsArray: $Array.isArray || function IsArray(argument) {
		return toStr(argument) === '[object Array]';
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-iscallable
	// IsCallable: ES5.IsCallable,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isconstructor
	IsConstructor: function IsConstructor(argument) {
		return typeof argument === 'function' && !!argument.prototype; // unfortunately there's no way to truly check this without try/catch `new argument`
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isextensible-o
	IsExtensible: Object.preventExtensions
		? function IsExtensible(obj) {
			if (isPrimitive(obj)) {
				return false;
			}
			return $isExtensible(obj);
		}
		: function isExtensible(obj) { return true; }, // eslint-disable-line no-unused-vars

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isinteger
	IsInteger: function IsInteger(argument) {
		if (typeof argument !== 'number' || $isNaN(argument) || !$isFinite(argument)) {
			return false;
		}
		var abs = $abs(argument);
		return $floor(abs) === abs;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ispropertykey
	IsPropertyKey: function IsPropertyKey(argument) {
		return typeof argument === 'string' || typeof argument === 'symbol';
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-isregexp
	IsRegExp: function IsRegExp(argument) {
		if (!argument || typeof argument !== 'object') {
			return false;
		}
		if (hasSymbols) {
			var isRegExp = argument[$Symbol.match];
			if (typeof isRegExp !== 'undefined') {
				return ES5.ToBoolean(isRegExp);
			}
		}
		return hasRegExpMatcher(argument);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevalue
	// SameValue: ES5.SameValue,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero
	SameValueZero: function SameValueZero(x, y) {
		return (x === y) || ($isNaN(x) && $isNaN(y));
	},

	/**
	 * 7.3.2 GetV (V, P)
	 * 1. Assert: IsPropertyKey(P) is true.
	 * 2. Let O be ToObject(V).
	 * 3. ReturnIfAbrupt(O).
	 * 4. Return O.[[Get]](P, V).
	 */
	GetV: function GetV(V, P) {
		// 7.3.2.1
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}

		// 7.3.2.2-3
		var O = this.ToObject(V);

		// 7.3.2.4
		return O[P];
	},

	/**
	 * 7.3.9 - https://ecma-international.org/ecma-262/6.0/#sec-getmethod
	 * 1. Assert: IsPropertyKey(P) is true.
	 * 2. Let func be GetV(O, P).
	 * 3. ReturnIfAbrupt(func).
	 * 4. If func is either undefined or null, return undefined.
	 * 5. If IsCallable(func) is false, throw a TypeError exception.
	 * 6. Return func.
	 */
	GetMethod: function GetMethod(O, P) {
		// 7.3.9.1
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}

		// 7.3.9.2
		var func = this.GetV(O, P);

		// 7.3.9.4
		if (func == null) {
			return void 0;
		}

		// 7.3.9.5
		if (!this.IsCallable(func)) {
			throw new $TypeError(P + 'is not a function');
		}

		// 7.3.9.6
		return func;
	},

	/**
	 * 7.3.1 Get (O, P) - https://ecma-international.org/ecma-262/6.0/#sec-get-o-p
	 * 1. Assert: Type(O) is Object.
	 * 2. Assert: IsPropertyKey(P) is true.
	 * 3. Return O.[[Get]](P, O).
	 */
	Get: function Get(O, P) {
		// 7.3.1.1
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(O) is not Object');
		}
		// 7.3.1.2
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}
		// 7.3.1.3
		return O[P];
	},

	Type: function Type(x) {
		if (typeof x === 'symbol') {
			return 'Symbol';
		}
		return ES5.Type(x);
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-speciesconstructor
	SpeciesConstructor: function SpeciesConstructor(O, defaultConstructor) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(O) is not Object');
		}
		var C = O.constructor;
		if (typeof C === 'undefined') {
			return defaultConstructor;
		}
		if (this.Type(C) !== 'Object') {
			throw new $TypeError('O.constructor is not an Object');
		}
		var S = hasSymbols && $Symbol.species ? C[$Symbol.species] : void 0;
		if (S == null) {
			return defaultConstructor;
		}
		if (this.IsConstructor(S)) {
			return S;
		}
		throw new $TypeError('no constructor found');
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-completepropertydescriptor
	CompletePropertyDescriptor: function CompletePropertyDescriptor(Desc) {
		if (!this.IsPropertyDescriptor(Desc)) {
			throw new $TypeError('Desc must be a Property Descriptor');
		}

		if (this.IsGenericDescriptor(Desc) || this.IsDataDescriptor(Desc)) {
			if (!has(Desc, '[[Value]]')) {
				Desc['[[Value]]'] = void 0;
			}
			if (!has(Desc, '[[Writable]]')) {
				Desc['[[Writable]]'] = false;
			}
		} else {
			if (!has(Desc, '[[Get]]')) {
				Desc['[[Get]]'] = void 0;
			}
			if (!has(Desc, '[[Set]]')) {
				Desc['[[Set]]'] = void 0;
			}
		}
		if (!has(Desc, '[[Enumerable]]')) {
			Desc['[[Enumerable]]'] = false;
		}
		if (!has(Desc, '[[Configurable]]')) {
			Desc['[[Configurable]]'] = false;
		}
		return Desc;
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-set-o-p-v-throw
	Set: function Set(O, P, V, Throw) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('O must be an Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('P must be a Property Key');
		}
		if (this.Type(Throw) !== 'Boolean') {
			throw new $TypeError('Throw must be a Boolean');
		}
		if (Throw) {
			O[P] = V;
			return true;
		} else {
			try {
				O[P] = V;
			} catch (e) {
				return false;
			}
		}
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-hasownproperty
	HasOwnProperty: function HasOwnProperty(O, P) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('O must be an Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('P must be a Property Key');
		}
		return has(O, P);
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-hasproperty
	HasProperty: function HasProperty(O, P) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('O must be an Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('P must be a Property Key');
		}
		return P in O;
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-isconcatspreadable
	IsConcatSpreadable: function IsConcatSpreadable(O) {
		if (this.Type(O) !== 'Object') {
			return false;
		}
		if (hasSymbols && typeof $Symbol.isConcatSpreadable === 'symbol') {
			var spreadable = this.Get(O, Symbol.isConcatSpreadable);
			if (typeof spreadable !== 'undefined') {
				return this.ToBoolean(spreadable);
			}
		}
		return this.IsArray(O);
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-invoke
	Invoke: function Invoke(O, P) {
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('P must be a Property Key');
		}
		var argumentsList = arraySlice(arguments, 2);
		var func = this.GetV(O, P);
		return this.Call(func, O, argumentsList);
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-getiterator
	GetIterator: function GetIterator(obj, method) {
		if (!hasSymbols) {
			throw new SyntaxError('ES.GetIterator depends on native iterator support.');
		}

		var actualMethod = method;
		if (arguments.length < 2) {
			actualMethod = this.GetMethod(obj, $Symbol.iterator);
		}
		var iterator = this.Call(actualMethod, obj);
		if (this.Type(iterator) !== 'Object') {
			throw new $TypeError('iterator must return an object');
		}

		return iterator;
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-iteratornext
	IteratorNext: function IteratorNext(iterator, value) {
		var result = this.Invoke(iterator, 'next', arguments.length < 2 ? [] : [value]);
		if (this.Type(result) !== 'Object') {
			throw new $TypeError('iterator next must return an object');
		}
		return result;
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-iteratorcomplete
	IteratorComplete: function IteratorComplete(iterResult) {
		if (this.Type(iterResult) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(iterResult) is not Object');
		}
		return this.ToBoolean(this.Get(iterResult, 'done'));
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-iteratorvalue
	IteratorValue: function IteratorValue(iterResult) {
		if (this.Type(iterResult) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(iterResult) is not Object');
		}
		return this.Get(iterResult, 'value');
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-iteratorstep
	IteratorStep: function IteratorStep(iterator) {
		var result = this.IteratorNext(iterator);
		var done = this.IteratorComplete(result);
		return done === true ? false : result;
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-iteratorclose
	IteratorClose: function IteratorClose(iterator, completion) {
		if (this.Type(iterator) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(iterator) is not Object');
		}
		if (!this.IsCallable(completion)) {
			throw new $TypeError('Assertion failed: completion is not a thunk for a Completion Record');
		}
		var completionThunk = completion;

		var iteratorReturn = this.GetMethod(iterator, 'return');

		if (typeof iteratorReturn === 'undefined') {
			return completionThunk();
		}

		var completionRecord;
		try {
			var innerResult = this.Call(iteratorReturn, iterator, []);
		} catch (e) {
			// if we hit here, then "e" is the innerResult completion that needs re-throwing

			// if the completion is of type "throw", this will throw.
			completionRecord = completionThunk();
			completionThunk = null; // ensure it's not called twice.

			// if not, then return the innerResult completion
			throw e;
		}
		completionRecord = completionThunk(); // if innerResult worked, then throw if the completion does
		completionThunk = null; // ensure it's not called twice.

		if (this.Type(innerResult) !== 'Object') {
			throw new $TypeError('iterator .return must return an object');
		}

		return completionRecord;
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-createiterresultobject
	CreateIterResultObject: function CreateIterResultObject(value, done) {
		if (this.Type(done) !== 'Boolean') {
			throw new $TypeError('Assertion failed: Type(done) is not Boolean');
		}
		return {
			value: value,
			done: done
		};
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-regexpexec
	RegExpExec: function RegExpExec(R, S) {
		if (this.Type(R) !== 'Object') {
			throw new $TypeError('R must be an Object');
		}
		if (this.Type(S) !== 'String') {
			throw new $TypeError('S must be a String');
		}
		var exec = this.Get(R, 'exec');
		if (this.IsCallable(exec)) {
			var result = this.Call(exec, R, [S]);
			if (result === null || this.Type(result) === 'Object') {
				return result;
			}
			throw new $TypeError('"exec" method must return `null` or an Object');
		}
		return regexExec(R, S);
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-arrayspeciescreate
	ArraySpeciesCreate: function ArraySpeciesCreate(originalArray, length) {
		if (!this.IsInteger(length) || length < 0) {
			throw new $TypeError('Assertion failed: length must be an integer >= 0');
		}
		var len = length === 0 ? 0 : length;
		var C;
		var isArray = this.IsArray(originalArray);
		if (isArray) {
			C = this.Get(originalArray, 'constructor');
			// TODO: figure out how to make a cross-realm normal Array, a same-realm Array
			// if (this.IsConstructor(C)) {
			// 	if C is another realm's Array, C = undefined
			// 	Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Array))) === null ?
			// }
			if (this.Type(C) === 'Object' && hasSymbols && $Symbol.species) {
				C = this.Get(C, $Symbol.species);
				if (C === null) {
					C = void 0;
				}
			}
		}
		if (typeof C === 'undefined') {
			return $Array(len);
		}
		if (!this.IsConstructor(C)) {
			throw new $TypeError('C must be a constructor');
		}
		return new C(len); // this.Construct(C, len);
	},

	CreateDataProperty: function CreateDataProperty(O, P, V) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(O) is not Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}
		var oldDesc = $gOPD(O, P);
		var extensible = oldDesc || (typeof $isExtensible !== 'function' || $isExtensible(O));
		var immutable = oldDesc && (!oldDesc.writable || !oldDesc.configurable);
		if (immutable || !extensible) {
			return false;
		}
		var newDesc = {
			configurable: true,
			enumerable: true,
			value: V,
			writable: true
		};
		Object.defineProperty(O, P, newDesc);
		return true;
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-createdatapropertyorthrow
	CreateDataPropertyOrThrow: function CreateDataPropertyOrThrow(O, P, V) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(O) is not Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}
		var success = this.CreateDataProperty(O, P, V);
		if (!success) {
			throw new $TypeError('unable to create data property');
		}
		return success;
	},

	// https://www.ecma-international.org/ecma-262/6.0/#sec-objectcreate
	ObjectCreate: function ObjectCreate(proto, internalSlotsList) {
		if (proto !== null && this.Type(proto) !== 'Object') {
			throw new $TypeError('Assertion failed: proto must be null or an object');
		}
		var slots = arguments.length < 2 ? [] : internalSlotsList;
		if (slots.length > 0) {
			throw new $SyntaxError('es-abstract does not yet support internal slots');
		}

		if (proto === null && !$ObjectCreate) {
			throw new $SyntaxError('native Object.create support is required to create null objects');
		}

		return $ObjectCreate(proto);
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-advancestringindex
	AdvanceStringIndex: function AdvanceStringIndex(S, index, unicode) {
		if (this.Type(S) !== 'String') {
			throw new $TypeError('S must be a String');
		}
		if (!this.IsInteger(index) || index < 0 || index > MAX_SAFE_INTEGER) {
			throw new $TypeError('Assertion failed: length must be an integer >= 0 and <= 2**53');
		}
		if (this.Type(unicode) !== 'Boolean') {
			throw new $TypeError('Assertion failed: unicode must be a Boolean');
		}
		if (!unicode) {
			return index + 1;
		}
		var length = S.length;
		if ((index + 1) >= length) {
			return index + 1;
		}

		var first = $charCodeAt(S, index);
		if (first < 0xD800 || first > 0xDBFF) {
			return index + 1;
		}

		var second = $charCodeAt(S, index + 1);
		if (second < 0xDC00 || second > 0xDFFF) {
			return index + 1;
		}

		return index + 2;
	}
});

delete ES6.CheckObjectCoercible; // renamed in ES6 to RequireObjectCoercible

module.exports = ES6;


/***/ }),
/* 365 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';

var isPrimitive = __webpack_require__(152);
var isCallable = __webpack_require__(111);
var isDate = __webpack_require__(366);
var isSymbol = __webpack_require__(153);

var ordinaryToPrimitive = function OrdinaryToPrimitive(O, hint) {
	if (typeof O === 'undefined' || O === null) {
		throw new TypeError('Cannot call method on ' + O);
	}
	if (typeof hint !== 'string' || (hint !== 'number' && hint !== 'string')) {
		throw new TypeError('hint must be "string" or "number"');
	}
	var methodNames = hint === 'string' ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
	var method, result, i;
	for (i = 0; i < methodNames.length; ++i) {
		method = O[methodNames[i]];
		if (isCallable(method)) {
			result = method.call(O);
			if (isPrimitive(result)) {
				return result;
			}
		}
	}
	throw new TypeError('No default value');
};

var GetMethod = function GetMethod(O, P) {
	var func = O[P];
	if (func !== null && typeof func !== 'undefined') {
		if (!isCallable(func)) {
			throw new TypeError(func + ' returned for property ' + P + ' of object ' + O + ' is not a function');
		}
		return func;
	}
};

// http://www.ecma-international.org/ecma-262/6.0/#sec-toprimitive
module.exports = function ToPrimitive(input, PreferredType) {
	if (isPrimitive(input)) {
		return input;
	}
	var hint = 'default';
	if (arguments.length > 1) {
		if (PreferredType === String) {
			hint = 'string';
		} else if (PreferredType === Number) {
			hint = 'number';
		}
	}

	var exoticToPrim;
	if (hasSymbols) {
		if (Symbol.toPrimitive) {
			exoticToPrim = GetMethod(input, Symbol.toPrimitive);
		} else if (isSymbol(input)) {
			exoticToPrim = Symbol.prototype.valueOf;
		}
	}
	if (typeof exoticToPrim !== 'undefined') {
		var result = exoticToPrim.call(input, hint);
		if (isPrimitive(result)) {
			return result;
		}
		throw new TypeError('unable to convert exotic object to primitive');
	}
	if (hint === 'default' && (isDate(input) || isSymbol(input))) {
		hint = 'string';
	}
	return ordinaryToPrimitive(input, hint === 'default' ? 'number' : hint);
};


/***/ }),
/* 366 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getDay = Date.prototype.getDay;
var tryDateObject = function tryDateObject(value) {
	try {
		getDay.call(value);
		return true;
	} catch (e) {
		return false;
	}
};

var toStr = Object.prototype.toString;
var dateClass = '[object Date]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isDateObject(value) {
	if (typeof value !== 'object' || value === null) { return false; }
	return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
};


/***/ }),
/* 367 */
/***/ (function(module, exports) {

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};


/***/ }),
/* 368 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GetIntrinsic = __webpack_require__(154);

var $Object = GetIntrinsic('%Object%');
var $TypeError = GetIntrinsic('%TypeError%');
var $String = GetIntrinsic('%String%');

var $isNaN = __webpack_require__(155);
var $isFinite = __webpack_require__(156);

var sign = __webpack_require__(157);
var mod = __webpack_require__(158);

var IsCallable = __webpack_require__(111);
var toPrimitive = __webpack_require__(369);

var has = __webpack_require__(110);

// https://es5.github.io/#x9
var ES5 = {
	ToPrimitive: toPrimitive,

	ToBoolean: function ToBoolean(value) {
		return !!value;
	},
	ToNumber: function ToNumber(value) {
		return +value; // eslint-disable-line no-implicit-coercion
	},
	ToInteger: function ToInteger(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number)) { return 0; }
		if (number === 0 || !$isFinite(number)) { return number; }
		return sign(number) * Math.floor(Math.abs(number));
	},
	ToInt32: function ToInt32(x) {
		return this.ToNumber(x) >> 0;
	},
	ToUint32: function ToUint32(x) {
		return this.ToNumber(x) >>> 0;
	},
	ToUint16: function ToUint16(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
		var posInt = sign(number) * Math.floor(Math.abs(number));
		return mod(posInt, 0x10000);
	},
	ToString: function ToString(value) {
		return $String(value);
	},
	ToObject: function ToObject(value) {
		this.CheckObjectCoercible(value);
		return $Object(value);
	},
	CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
		/* jshint eqnull:true */
		if (value == null) {
			throw new $TypeError(optMessage || 'Cannot call method on ' + value);
		}
		return value;
	},
	IsCallable: IsCallable,
	SameValue: function SameValue(x, y) {
		if (x === y) { // 0 === -0, but they are not identical.
			if (x === 0) { return 1 / x === 1 / y; }
			return true;
		}
		return $isNaN(x) && $isNaN(y);
	},

	// https://www.ecma-international.org/ecma-262/5.1/#sec-8
	Type: function Type(x) {
		if (x === null) {
			return 'Null';
		}
		if (typeof x === 'undefined') {
			return 'Undefined';
		}
		if (typeof x === 'function' || typeof x === 'object') {
			return 'Object';
		}
		if (typeof x === 'number') {
			return 'Number';
		}
		if (typeof x === 'boolean') {
			return 'Boolean';
		}
		if (typeof x === 'string') {
			return 'String';
		}
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type
	IsPropertyDescriptor: function IsPropertyDescriptor(Desc) {
		if (this.Type(Desc) !== 'Object') {
			return false;
		}
		var allowed = {
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Get]]': true,
			'[[Set]]': true,
			'[[Value]]': true,
			'[[Writable]]': true
		};
		// jscs:disable
		for (var key in Desc) { // eslint-disable-line
			if (has(Desc, key) && !allowed[key]) {
				return false;
			}
		}
		// jscs:enable
		var isData = has(Desc, '[[Value]]');
		var IsAccessor = has(Desc, '[[Get]]') || has(Desc, '[[Set]]');
		if (isData && IsAccessor) {
			throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
		}
		return true;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.1
	IsAccessorDescriptor: function IsAccessorDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new $TypeError('Desc must be a Property Descriptor');
		}

		if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
			return false;
		}

		return true;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.2
	IsDataDescriptor: function IsDataDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new $TypeError('Desc must be a Property Descriptor');
		}

		if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
			return false;
		}

		return true;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.3
	IsGenericDescriptor: function IsGenericDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new $TypeError('Desc must be a Property Descriptor');
		}

		if (!this.IsAccessorDescriptor(Desc) && !this.IsDataDescriptor(Desc)) {
			return true;
		}

		return false;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.4
	FromPropertyDescriptor: function FromPropertyDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return Desc;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new $TypeError('Desc must be a Property Descriptor');
		}

		if (this.IsDataDescriptor(Desc)) {
			return {
				value: Desc['[[Value]]'],
				writable: !!Desc['[[Writable]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else if (this.IsAccessorDescriptor(Desc)) {
			return {
				get: Desc['[[Get]]'],
				set: Desc['[[Set]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else {
			throw new $TypeError('FromPropertyDescriptor must be called with a fully populated Property Descriptor');
		}
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.5
	ToPropertyDescriptor: function ToPropertyDescriptor(Obj) {
		if (this.Type(Obj) !== 'Object') {
			throw new $TypeError('ToPropertyDescriptor requires an object');
		}

		var desc = {};
		if (has(Obj, 'enumerable')) {
			desc['[[Enumerable]]'] = this.ToBoolean(Obj.enumerable);
		}
		if (has(Obj, 'configurable')) {
			desc['[[Configurable]]'] = this.ToBoolean(Obj.configurable);
		}
		if (has(Obj, 'value')) {
			desc['[[Value]]'] = Obj.value;
		}
		if (has(Obj, 'writable')) {
			desc['[[Writable]]'] = this.ToBoolean(Obj.writable);
		}
		if (has(Obj, 'get')) {
			var getter = Obj.get;
			if (typeof getter !== 'undefined' && !this.IsCallable(getter)) {
				throw new TypeError('getter must be a function');
			}
			desc['[[Get]]'] = getter;
		}
		if (has(Obj, 'set')) {
			var setter = Obj.set;
			if (typeof setter !== 'undefined' && !this.IsCallable(setter)) {
				throw new $TypeError('setter must be a function');
			}
			desc['[[Set]]'] = setter;
		}

		if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
			throw new $TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
		}
		return desc;
	}
};

module.exports = ES5;


/***/ }),
/* 369 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;

var isPrimitive = __webpack_require__(152);

var isCallable = __webpack_require__(111);

// https://es5.github.io/#x8.12
var ES5internalSlots = {
	'[[DefaultValue]]': function (O, hint) {
		var actualHint = hint || (toStr.call(O) === '[object Date]' ? String : Number);

		if (actualHint === String || actualHint === Number) {
			var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
			var value, i;
			for (i = 0; i < methods.length; ++i) {
				if (isCallable(O[methods[i]])) {
					value = O[methods[i]]();
					if (isPrimitive(value)) {
						return value;
					}
				}
			}
			throw new TypeError('No default value');
		}
		throw new TypeError('invalid [[DefaultValue]] hint supplied');
	}
};

// https://es5.github.io/#x9
module.exports = function ToPrimitive(input, PreferredType) {
	if (isPrimitive(input)) {
		return input;
	}
	return ES5internalSlots['[[DefaultValue]]'](input, PreferredType);
};


/***/ }),
/* 370 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = __webpack_require__(110);
var regexExec = RegExp.prototype.exec;
var gOPD = Object.getOwnPropertyDescriptor;

var tryRegexExecCall = function tryRegexExec(value) {
	try {
		var lastIndex = value.lastIndex;
		value.lastIndex = 0;

		regexExec.call(value);
		return true;
	} catch (e) {
		return false;
	} finally {
		value.lastIndex = lastIndex;
	}
};
var toStr = Object.prototype.toString;
var regexClass = '[object RegExp]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isRegex(value) {
	if (!value || typeof value !== 'object') {
		return false;
	}
	if (!hasToStringTag) {
		return toStr.call(value) === regexClass;
	}

	var descriptor = gOPD(value, 'lastIndex');
	var hasLastIndexDataProperty = descriptor && has(descriptor, 'value');
	if (!hasLastIndexDataProperty) {
		return false;
	}

	return tryRegexExecCall(value);
};


/***/ }),
/* 371 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__(109);
var getPolyfill = __webpack_require__(159);

module.exports = function shimFlat() {
	var polyfill = getPolyfill();
	define(
		Array.prototype,
		{ flat: polyfill },
		{ flat: function () { return Array.prototype.flat !== polyfill; } }
	);
	return polyfill;
};


/***/ }),
/* 372 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var define = __webpack_require__(109);
var isSymbol = __webpack_require__(153);

var globalKey = '__ global cache key __';
/* istanbul ignore else */
// eslint-disable-next-line no-restricted-properties
if (typeof Symbol === 'function' && isSymbol(Symbol('foo')) && typeof Symbol['for'] === 'function') {
	// eslint-disable-next-line no-restricted-properties
	globalKey = Symbol['for'](globalKey);
}

var trueThunk = function () {
	return true;
};

var ensureCache = function ensureCache() {
	if (!global[globalKey]) {
		var properties = {};
		properties[globalKey] = {};
		var predicates = {};
		predicates[globalKey] = trueThunk;
		define(global, properties, predicates);
	}
	return global[globalKey];
};

var cache = ensureCache();

var isPrimitive = function isPrimitive(val) {
	return val === null || (typeof val !== 'object' && typeof val !== 'function');
};

var getPrimitiveKey = function getPrimitiveKey(val) {
	if (isSymbol(val)) {
		return Symbol.prototype.valueOf.call(val);
	}
	return typeof val + ' | ' + String(val);
};

var requirePrimitiveKey = function requirePrimitiveKey(val) {
	if (!isPrimitive(val)) {
		throw new TypeError('key must not be an object');
	}
};

var globalCache = {
	clear: function clear() {
		delete global[globalKey];
		cache = ensureCache();
	},

	'delete': function deleteKey(key) {
		requirePrimitiveKey(key);
		delete cache[getPrimitiveKey(key)];
		return !globalCache.has(key);
	},

	get: function get(key) {
		requirePrimitiveKey(key);
		return cache[getPrimitiveKey(key)];
	},

	has: function has(key) {
		requirePrimitiveKey(key);
		return getPrimitiveKey(key) in cache;
	},

	set: function set(key, value) {
		requirePrimitiveKey(key);
		var primitiveKey = getPrimitiveKey(key);
		var props = {};
		props[primitiveKey] = value;
		var predicates = {};
		predicates[primitiveKey] = trueThunk;
		define(cache, props, predicates);
		return globalCache.has(key);
	},

	setIfMissingThenGet: function setIfMissingThenGet(key, valueThunk) {
		if (globalCache.has(key)) {
			return globalCache.get(key);
		}
		var item = valueThunk();
		globalCache.set(key, item);
		return item;
	}
};

module.exports = globalCache;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(25)))

/***/ }),
/* 373 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var GLOBAL_CACHE_KEY = 'reactWithStylesInterfaceCSS';
var MAX_SPECIFICITY = 20;

exports.GLOBAL_CACHE_KEY = GLOBAL_CACHE_KEY;
exports.MAX_SPECIFICITY = MAX_SPECIFICITY;

/***/ }),
/* 374 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = getClassName;
/**
 * Construct a class name.
 *
 * namespace {String} Used to construct unique class names.
 * styleName {String} Name identifying the specific style.
 *
 * Return the class name.
 */
function getClassName(namespace, styleName) {
  var namespaceSegment = namespace.length > 0 ? String(namespace) + '__' : '';
  return '' + namespaceSegment + String(styleName);
}

/***/ }),
/* 375 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
// This function takes an array of styles and separates them into styles that
// are handled by Aphrodite and inline styles.
function separateStyles(stylesArray) {
  var classNames = [];

  // Since determining if an Object is empty requires collecting all of its
  // keys, and we want the best performance in this code because we are in the
  // render path, we are going to do a little bookkeeping ourselves.
  var hasInlineStyles = false;
  var inlineStyles = {};

  // This is run on potentially every node in the tree when rendering, where
  // performance is critical. Normally we would prefer using `forEach`, but
  // old-fashioned for loops are faster so that's what we have chosen here.
  for (var i = 0; i < stylesArray.length; i++) {
    // eslint-disable-line no-plusplus
    var style = stylesArray[i];

    // If this  style is falsy, we just want to disregard it. This allows for
    // syntax like:
    //
    //   css(isFoo && styles.foo)
    if (style) {
      if (typeof style === 'string') {
        classNames.push(style);
      } else {
        Object.assign(inlineStyles, style);
        hasInlineStyles = true;
      }
    }
  }

  return {
    classNames: classNames,
    hasInlineStyles: hasInlineStyles,
    inlineStyles: inlineStyles
  };
}

exports['default'] = separateStyles;

/***/ }),
/* 376 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = registerInterfaceWithDefaultTheme;

var _ThemedStyleSheet = _interopRequireDefault(__webpack_require__(377));

var _DefaultTheme = _interopRequireDefault(__webpack_require__(378));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function registerInterfaceWithDefaultTheme(reactWithStylesInterface) {
  _ThemedStyleSheet["default"].registerInterface(reactWithStylesInterface);

  _ThemedStyleSheet["default"].registerTheme(_DefaultTheme["default"]);
}

/***/ }),
/* 377 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var styleInterface = void 0;
var styleTheme = void 0;

function registerTheme(theme) {
  styleTheme = theme;
}

function registerInterface(interfaceToRegister) {
  styleInterface = interfaceToRegister;
}

function create(makeFromTheme, createWithDirection) {
  var styles = createWithDirection(makeFromTheme(styleTheme));
  return function () {
    return styles;
  };
}

function createLTR(makeFromTheme) {
  return create(makeFromTheme, styleInterface.createLTR || styleInterface.create);
}

function createRTL(makeFromTheme) {
  return create(makeFromTheme, styleInterface.createRTL || styleInterface.create);
}

function get() {
  return styleTheme;
}

function resolve() {
  if (false) {}

  for (var _len = arguments.length, styles = Array(_len), _key = 0; _key < _len; _key++) {
    styles[_key] = arguments[_key];
  }

  var result = styleInterface.resolve(styles);

  if (false) {}

  return result;
}

function resolveLTR() {
  for (var _len2 = arguments.length, styles = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    styles[_key2] = arguments[_key2];
  }

  if (styleInterface.resolveLTR) {
    return styleInterface.resolveLTR(styles);
  }

  return resolve(styles);
}

function resolveRTL() {
  for (var _len3 = arguments.length, styles = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    styles[_key3] = arguments[_key3];
  }

  if (styleInterface.resolveRTL) {
    return styleInterface.resolveRTL(styles);
  }

  return resolve(styles);
}

function flush() {
  if (styleInterface.flush) {
    styleInterface.flush();
  }
}

exports['default'] = {
  registerTheme: registerTheme,
  registerInterface: registerInterface,
  create: createLTR,
  createLTR: createLTR,
  createRTL: createRTL,
  get: get,
  resolve: resolveLTR,
  resolveLTR: resolveLTR,
  resolveRTL: resolveRTL,
  flush: flush
};

/***/ }),
/* 378 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var core = {
  white: '#fff',
  gray: '#484848',
  grayLight: '#82888a',
  grayLighter: '#cacccd',
  grayLightest: '#f2f2f2',
  borderMedium: '#c4c4c4',
  border: '#dbdbdb',
  borderLight: '#e4e7e7',
  borderLighter: '#eceeee',
  borderBright: '#f4f5f5',
  primary: '#00a699',
  primaryShade_1: '#33dacd',
  primaryShade_2: '#66e2da',
  primaryShade_3: '#80e8e0',
  primaryShade_4: '#b2f1ec',
  primary_dark: '#008489',
  secondary: '#007a87',
  yellow: '#ffe8bc',
  yellow_dark: '#ffce71'
};
var _default = {
  reactDates: {
    zIndex: 0,
    border: {
      input: {
        border: 0,
        borderTop: 0,
        borderRight: 0,
        borderBottom: '2px solid transparent',
        borderLeft: 0,
        outlineFocused: 0,
        borderFocused: 0,
        borderTopFocused: 0,
        borderLeftFocused: 0,
        borderBottomFocused: "2px solid ".concat(core.primary_dark),
        borderRightFocused: 0,
        borderRadius: 0
      },
      pickerInput: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 2
      }
    },
    color: {
      core: core,
      disabled: core.grayLightest,
      background: core.white,
      backgroundDark: '#f2f2f2',
      backgroundFocused: core.white,
      border: 'rgb(219, 219, 219)',
      text: core.gray,
      textDisabled: core.border,
      textFocused: '#007a87',
      placeholderText: '#757575',
      outside: {
        backgroundColor: core.white,
        backgroundColor_active: core.white,
        backgroundColor_hover: core.white,
        color: core.gray,
        color_active: core.gray,
        color_hover: core.gray
      },
      highlighted: {
        backgroundColor: core.yellow,
        backgroundColor_active: core.yellow_dark,
        backgroundColor_hover: core.yellow_dark,
        color: core.gray,
        color_active: core.gray,
        color_hover: core.gray
      },
      minimumNights: {
        backgroundColor: core.white,
        backgroundColor_active: core.white,
        backgroundColor_hover: core.white,
        borderColor: core.borderLighter,
        color: core.grayLighter,
        color_active: core.grayLighter,
        color_hover: core.grayLighter
      },
      hoveredSpan: {
        backgroundColor: core.primaryShade_4,
        backgroundColor_active: core.primaryShade_3,
        backgroundColor_hover: core.primaryShade_4,
        borderColor: core.primaryShade_3,
        borderColor_active: core.primaryShade_3,
        borderColor_hover: core.primaryShade_3,
        color: core.secondary,
        color_active: core.secondary,
        color_hover: core.secondary
      },
      selectedSpan: {
        backgroundColor: core.primaryShade_2,
        backgroundColor_active: core.primaryShade_1,
        backgroundColor_hover: core.primaryShade_1,
        borderColor: core.primaryShade_1,
        borderColor_active: core.primary,
        borderColor_hover: core.primary,
        color: core.white,
        color_active: core.white,
        color_hover: core.white
      },
      selected: {
        backgroundColor: core.primary,
        backgroundColor_active: core.primary,
        backgroundColor_hover: core.primary,
        borderColor: core.primary,
        borderColor_active: core.primary,
        borderColor_hover: core.primary,
        color: core.white,
        color_active: core.white,
        color_hover: core.white
      },
      blocked_calendar: {
        backgroundColor: core.grayLighter,
        backgroundColor_active: core.grayLighter,
        backgroundColor_hover: core.grayLighter,
        borderColor: core.grayLighter,
        borderColor_active: core.grayLighter,
        borderColor_hover: core.grayLighter,
        color: core.grayLight,
        color_active: core.grayLight,
        color_hover: core.grayLight
      },
      blocked_out_of_range: {
        backgroundColor: core.white,
        backgroundColor_active: core.white,
        backgroundColor_hover: core.white,
        borderColor: core.borderLight,
        borderColor_active: core.borderLight,
        borderColor_hover: core.borderLight,
        color: core.grayLighter,
        color_active: core.grayLighter,
        color_hover: core.grayLighter
      }
    },
    spacing: {
      dayPickerHorizontalPadding: 9,
      captionPaddingTop: 22,
      captionPaddingBottom: 37,
      inputPadding: 0,
      displayTextPaddingVertical: undefined,
      displayTextPaddingTop: 11,
      displayTextPaddingBottom: 9,
      displayTextPaddingHorizontal: undefined,
      displayTextPaddingLeft: 11,
      displayTextPaddingRight: 11,
      displayTextPaddingVertical_small: undefined,
      displayTextPaddingTop_small: 7,
      displayTextPaddingBottom_small: 5,
      displayTextPaddingHorizontal_small: undefined,
      displayTextPaddingLeft_small: 7,
      displayTextPaddingRight_small: 7
    },
    sizing: {
      inputWidth: 130,
      inputWidth_small: 97,
      arrowWidth: 24
    },
    noScrollBarOnVerticalScrollable: false,
    font: {
      size: 14,
      captionSize: 18,
      input: {
        size: 19,
        lineHeight: '24px',
        size_small: 15,
        lineHeight_small: '18px',
        letterSpacing_small: '0.2px',
        styleDisabled: 'italic'
      }
    }
  }
};
exports["default"] = _default;

/***/ }),
/* 379 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(380);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(73)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 380 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(72)(false);
// Module
exports.push([module.i, "/*-- Chart --*/\n.c3 svg {\n  font: 10px sans-serif;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n\n.c3 path, .c3 line {\n  fill: none;\n  stroke: #000;\n}\n\n.c3 text {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n      user-select: none;\n}\n\n.c3-legend-item-tile,\n.c3-xgrid-focus,\n.c3-ygrid,\n.c3-event-rect,\n.c3-bars path {\n  shape-rendering: crispEdges;\n}\n\n.c3-chart-arc path {\n  stroke: #fff;\n}\n\n.c3-chart-arc rect {\n  stroke: white;\n  stroke-width: 1;\n}\n\n.c3-chart-arc text {\n  fill: #fff;\n  font-size: 13px;\n}\n\n/*-- Axis --*/\n/*-- Grid --*/\n.c3-grid line {\n  stroke: #aaa;\n}\n\n.c3-grid text {\n  fill: #aaa;\n}\n\n.c3-xgrid, .c3-ygrid {\n  stroke-dasharray: 3 3;\n}\n\n/*-- Text on Chart --*/\n.c3-text.c3-empty {\n  fill: #808080;\n  font-size: 2em;\n}\n\n/*-- Line --*/\n.c3-line {\n  stroke-width: 1px;\n}\n\n/*-- Point --*/\n.c3-circle._expanded_ {\n  stroke-width: 1px;\n  stroke: white;\n}\n\n.c3-selected-circle {\n  fill: white;\n  stroke-width: 2px;\n}\n\n/*-- Bar --*/\n.c3-bar {\n  stroke-width: 0;\n}\n\n.c3-bar._expanded_ {\n  fill-opacity: 1;\n  fill-opacity: 0.75;\n}\n\n/*-- Focus --*/\n.c3-target.c3-focused {\n  opacity: 1;\n}\n\n.c3-target.c3-focused path.c3-line, .c3-target.c3-focused path.c3-step {\n  stroke-width: 2px;\n}\n\n.c3-target.c3-defocused {\n  opacity: 0.3 !important;\n}\n\n/*-- Region --*/\n.c3-region {\n  fill: steelblue;\n  fill-opacity: 0.1;\n}\n\n/*-- Brush --*/\n.c3-brush .extent {\n  fill-opacity: 0.1;\n}\n\n/*-- Select - Drag --*/\n/*-- Legend --*/\n.c3-legend-item {\n  font-size: 12px;\n}\n\n.c3-legend-item-hidden {\n  opacity: 0.15;\n}\n\n.c3-legend-background {\n  opacity: 0.75;\n  fill: white;\n  stroke: lightgray;\n  stroke-width: 1;\n}\n\n/*-- Title --*/\n.c3-title {\n  font: 14px sans-serif;\n}\n\n/*-- Tooltip --*/\n.c3-tooltip-container {\n  z-index: 10;\n}\n\n.c3-tooltip {\n  border-collapse: collapse;\n  border-spacing: 0;\n  background-color: #fff;\n  empty-cells: show;\n  -webkit-box-shadow: 7px 7px 12px -9px #777777;\n  box-shadow: 7px 7px 12px -9px #777777;\n  opacity: 0.9;\n}\n\n.c3-tooltip tr {\n  border: 1px solid #CCC;\n}\n\n.c3-tooltip th {\n  background-color: #aaa;\n  font-size: 14px;\n  padding: 2px 5px;\n  text-align: left;\n  color: #FFF;\n}\n\n.c3-tooltip td {\n  font-size: 13px;\n  padding: 3px 6px;\n  background-color: #fff;\n  border-left: 1px dotted #999;\n}\n\n.c3-tooltip td > span {\n  display: inline-block;\n  width: 10px;\n  height: 10px;\n  margin-right: 6px;\n}\n\n.c3-tooltip td.value {\n  text-align: right;\n}\n\n/*-- Area --*/\n.c3-area {\n  stroke-width: 0;\n  opacity: 0.2;\n}\n\n/*-- Arc --*/\n.c3-chart-arcs-title {\n  dominant-baseline: middle;\n  font-size: 1.3em;\n}\n\n.c3-chart-arcs .c3-chart-arcs-background {\n  fill: #e0e0e0;\n  stroke: #FFF;\n}\n\n.c3-chart-arcs .c3-chart-arcs-gauge-unit {\n  fill: #000;\n  font-size: 16px;\n}\n\n.c3-chart-arcs .c3-chart-arcs-gauge-max {\n  fill: #777;\n}\n\n.c3-chart-arcs .c3-chart-arcs-gauge-min {\n  fill: #777;\n}\n\n.c3-chart-arc .c3-gauge-value {\n  fill: #000;\n  /*  font-size: 28px !important;*/\n}\n\n.c3-chart-arc.c3-target g path {\n  opacity: 1;\n}\n\n.c3-chart-arc.c3-target.c3-focused g path {\n  opacity: 1;\n}\n\n/*-- Zoom --*/\n.c3-drag-zoom.enabled {\n  pointer-events: all !important;\n  visibility: visible;\n}\n\n.c3-drag-zoom.disabled {\n  pointer-events: none !important;\n  visibility: hidden;\n}\n\n.c3-drag-zoom .extent {\n  fill-opacity: 0.1;\n}\n/* WRAPPER */\n.keen-dataviz {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  font-family: 'Gotham Rounded SSm A', 'Gotham Rounded SSm B', 'Helvetica Neue', Helvetica, Arial, sans-serif;\n  font-family: 'Gotham Rounded SSm A', 'Gotham Rounded SSm B', 'Helvetica Neue', Helvetica, Arial, sans-serif;\n  height: 100%;\n}\n.keen-dataviz .partial-interval-indicator{\n    fill: #bdbdbd;\n  }\n.keen-dataviz .axis {\n    shape-rendering: crispEdges\n  }\n.keen-dataviz-title {\n    color: #4D4D4D;\n    color: #4D4D4D;\n    padding-bottom: 0.8em;\n  }\n.keen-dataviz-stage {\n    display: block;\n  }\n.keen-dataviz-notes {\n    color: #808080;\n    color: #808080;\n    display: block;\n    font-size: 0.8em;\n  }\n.keen-dataviz-box {\n    border-radius: 4px;\n    text-align: center;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n        align-items: center;\n    -ms-flex-flow: row;\n        flex-flow: row;\n    -ms-flex-pack: center;\n        justify-content: center;\n    -ms-flex-direction: column;\n        flex-direction: column;\n    padding: 1em 0;\n    min-height: 4em;\n    height: inherit;\n  }\n.keen-dataviz-button {\n    padding: 0.5rem 1rem;\n    margin: 1rem 0;\n    border-radius: 4px;\n    background-color: #f9f9f9;\n    border-color: #d6d6d6;\n    cursor: pointer;\n    -webkit-transition: background-color 300ms ease;\n    -o-transition: background-color 300ms ease;\n    transition: background-color 300ms ease\n  }\n.keen-dataviz-button:hover {\n  background-color: #E7E7E7;\n  background-color: #E7E7E7;\n}\n.keen-dataviz .metric-comparison {\n    -ms-flex-direction: column-reverse;\n        flex-direction: column-reverse;\n    color: #1A1A1A;\n    color: #1A1A1A;\n    background: #f9f9f9;\n  }\n/* METRIC */\n.keen-dataviz-metric {\n    height: inherit;\n    color: #FFFFFF;\n    color: #FFFFFF;\n    background: rgb(0, 187, 222);\n  }\n.keen-dataviz-metric-value {\n      font-size: 4.3em;\n      font-weight: 700;\n      width: 100%;\n    }\n.keen-dataviz-metric-value-smaller {\n        font-size: 3em;\n      }\n.keen-dataviz-metric-title {\n      font-size: 2em;\n      font-weight: 200;\n      width: 100%;\n    }\n.keen-dataviz-metric-green {\n      color: #73D483;\n      color: #73D483;\n      font-size: 2em;\n    }\n.keen-dataviz-metric-red {\n      color: #FE6672;\n      color: #FE6672;\n      font-size: 2em;\n    }\n.keen-dataviz .arrow-green {\n    width: 0;\n    height: 0;\n    border-left: 8px solid transparent;\n    border-right: 8px solid transparent;\n    border-bottom: 8px solid #73D483;\n    border-bottom: 8px solid #73D483;\n    position: relative;\n    top: 0.7em;\n    left: -0.6em;\n  }\n.keen-dataviz .arrow-red {\n    width: 0;\n    height: 0;\n    border-left: 8px solid transparent;\n    border-right: 8px solid transparent;\n    border-top: 8px solid #FE6672;\n    border-top: 8px solid #FE6672;\n    position: relative;\n    top: 0.8em;\n    left: -0.6em;\n  }\n/* MESSAGE */\n.keen-dataviz-message {\n    color: #808080;\n    color: #808080;\n    font-size: 1.5em;\n    width:100%;\n  }\n/* FUNNEL */\n.keen-dataviz .text-label {\n      fill: #1A1A1A;\n      fill: #1A1A1A;\n    }\n.keen-dataviz .text-main {\n      fill: #FFFFFF;\n      fill: #FFFFFF;\n      font-size: 1.5em;\n    }\n.keen-dataviz .text-second {\n      fill: #FFFFFF;\n      fill: #FFFFFF;\n    }\n.keen-dataviz .chart-lines {\n      stroke: #E7E7E7;\n      stroke: #E7E7E7;\n    }\n/* METRIC COMBO */\n.keen-dataviz-metric-combo {\n    width: 270px;\n    height: 120px;\n    position: relative;\n  }\n.keen-dataviz-metric-combo .metric-combo-data {\n      width: 100%;\n      height: 100%;\n      padding: 0.5rem;\n      position: absolute;\n      z-index: -1;\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-wrap: wrap;\n          flex-wrap: wrap;\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n    }\n.keen-dataviz-metric-combo .c3-chart {\n      height: 120px;\n    }\n.keen-dataviz-metric-combo .c3-lines {\n      display: none;\n    }\n.keen-dataviz-metric-combo .keen-dataviz-title,\n    .keen-dataviz-metric-combo .current-count {\n      width: 100%;\n    }\n.keen-dataviz-metric-combo .current-count {\n      margin-top: auto;\n      margin-bottom: auto;\n      font-size: 2rem;\n      text-align: center;\n    }\n.keen-dataviz-metric-combo .percent-difference {\n      position: absolute;\n      top: 0.5rem;\n      right: 0.5rem;\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-align: center;\n          align-items: center;\n      font-size: 80%;\n    }\n.keen-dataviz-metric-combo .arrow-green,\n    .keen-dataviz-metric-combo .arrow-red {\n      margin-right: 0.25rem;\n      position: static;\n      border-width: 5px;\n    }\n/* TABLE */\n.keen-dataviz-table {\n    border-bottom: 1px solid #E7E7E7;\n    border-bottom: 1px solid #E7E7E7;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    overflow: scroll;\n    position: relative;\n    width: 100%;\n  }\n.keen-dataviz-table table {\n      background: #FFFFFF;\n      background: #FFFFFF;\n      border-collapse: collapse;\n      margin: 0;\n      position: relative;\n      width: 100%;\n    }\n.keen-dataviz-table table .table-pagination td {\n          background-color: #FFFFFF;\n          background-color: #FFFFFF;\n        }\n.keen-dataviz-table table .table-pagination:hover td {\n          background-color: #FFFFFF;\n          background-color: #FFFFFF;\n        }\n.keen-dataviz-table table .table-pagination a {\n          border: 1px solid #E7E7E7;\n          border: 1px solid #E7E7E7;\n          padding: 0.5em;\n          margin-right: 0.2em;\n          cursor: pointer;\n        }\n.keen-dataviz-table table .table-pagination .active{\n          background: #4D4D4D;\n          background: #4D4D4D;\n          color: #FFFFFF;\n          color: #FFFFFF;\n        }\n.keen-dataviz-table table .table-pagination .arrow{\n          font-weight:bold;\n        }\n.keen-dataviz-table th{\n    background: white;\n    position: -webkit-sticky;\n    position: sticky;\n    top: 0;\n    z-index: 10;\n    cursor: pointer;\n  }\n.keen-dataviz-table th,\n  .keen-dataviz-table td {\n    border-collapse: collapse;\n    font-size: 1em;\n    padding: 0.7em;\n    text-align: left;\n    white-space: nowrap;\n  }\n.keen-dataviz-table th {\n    border-bottom: 1px solid #E7E7E7;\n    border-bottom: 1px solid #E7E7E7;\n    color: #4D4D4D;\n    color: #4D4D4D;\n  }\n.keen-dataviz-table td {\n    background-color: #FFFFFF;\n    background-color: #FFFFFF;\n    color: #4D4D4D;\n    color: #4D4D4D;\n    -webkit-transition: background-color 0.1s, color 0.05s;\n    -o-transition: background-color 0.1s, color 0.05s;\n    transition: background-color 0.1s, color 0.05s;\n  }\n.keen-dataviz-table .table-data-row:nth-child(even) td{\n    background-color: #F3F5F6;\n  }\n.keen-dataviz-table .table-data-row:hover td{\n    background-color: #E7E7E7;\n    background-color: #E7E7E7;\n    color: #4D4D4D;\n    color: #4D4D4D;\n  }\n.keen-dataviz-table .keen-dataviz-table-fixed-header {\n    background: #FFFFFF;\n    background: #FFFFFF;\n    border-bottom: 1px solid rgba(0,0,0,.15);\n    position: absolute;\n    top: 0;\n    -webkit-transition: top .1s;\n    -o-transition: top .1s;\n    transition: top .1s;\n  }\n.keen-dataviz .keen-spinner-indicator {\n    border-radius: 100%;\n    border: 3px solid rgba(0, 0, 0, .1);\n    border-top-color: rgba(0, 0, 0, .45);\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    height: 3em;\n    width: 3em;\n    -webkit-animation:spin .7s linear infinite;\n    animation:spin .7s linear infinite;\n    -ms-animation: spin .7s linear infinite;\n    -o-animation: spin .7s linear infinite;\n  }\n@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }\n@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }\n/* C3 CUSTOMIZATIONS */\n.keen-dataviz .c3-axis-y path {\n       display: none;\n    }\n.keen-dataviz .c3-axis-y .tick line{\n      display: none;\n    }\n.keen-dataviz .tick line, .keen-dataviz path.domain{\n    stroke-opacity: 0.2;\n  }\n.keen-dataviz .c3-ygrid{\n    stroke-dasharray: none;\n    stroke-opacity: 0.1;\n  }\n.keen-dataviz .c3-ygrids :nth-child(even) {\n    display: none;\n  }\n.keen-dataviz .c3-tooltip {\n    border: 1px solid rgba(0, 0, 0, 0.1);\n    padding:  0.2em;\n    border-radius: 0.2em;\n    -webkit-box-shadow: none;\n            box-shadow: none;\n    border-collapse: separate;\n  }\n.keen-dataviz .c3-tooltip th {\n      text-align: center;\n    }\n.keen-dataviz .c3-tooltip table, .keen-dataviz .c3-tooltip th, .keen-dataviz .c3-tooltip tr, .keen-dataviz .c3-tooltip td {\n      border: none;\n      background: none;\n      font-size: 0.9em;\n    }\n.keen-dataviz .c3-tooltip-container th {\n      max-width: 50%;\n      word-wrap: break-word;\n      color: #1A1A1A;\n      color: #1A1A1A;\n      background: none;\n      font-weight: normal;\n    }\n.keen-dataviz .c3-tooltip-container td {\n      max-width: 50%;\n      word-wrap: break-word;\n    }\n.keen-dataviz-rendering{\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-pack: center;\n        justify-content: center;\n    -ms-flex-flow: row;\n        flex-flow: row;\n    -ms-flex-pack: distribute;\n        justify-content: space-around;\n  }\n.keen-dataviz-rendering .c3-chart{\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-item-align: center;\n          align-self: center;\n      -ms-flex-order: 1;\n          order: 1;\n      -ms-flex: 1;\n          flex: 1;\n    }\n.keen-dataviz-rendering .c3-chart-100-percent{\n      width: 100%;\n      -ms-flex-item-align: center;\n          align-self: center;\n    }\n.keen-dataviz-rendering-horizontal{\n      -ms-flex-wrap: wrap;\n          flex-wrap: wrap;\n    }\n/* CUSTOM LEGEND */\n.keen-c3-legend {\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  top: 0;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n.keen-c3-legend-horizontal{\n    -ms-flex-direction: row;\n        flex-direction: row;\n    -ms-flex-item-align: end;\n        align-self: flex-end;\n    display: -ms-flexbox;\n    display: flex;\n    flex-direction: row;\n    -ms-flex-pack: center;\n        justify-content: center;\n    width: 100%;\n    padding: 0.5em 0;\n  }\n.keen-c3-legend-horizontal-pagination-left{\n      -ms-flex-order: 0;\n          order: 0;\n      display: -ms-flexbox;\n      display: flex;\n      margin-right: 1.5em;\n    }\n.keen-c3-legend-horizontal-items{\n      -ms-flex-order: 1;\n          order: 1;\n      display: -ms-flexbox;\n      display: flex;\n    }\n.keen-c3-legend-horizontal-pagination-right{\n      -ms-flex-order: 2;\n          order: 2;\n      display: -ms-flexbox;\n      display: flex;\n      margin-left: 1.5em;\n    }\n.keen-c3-legend-top{\n    -ms-flex-order: 0;\n        order: 0;\n  }\n.keen-c3-legend-bottom {\n    -ms-flex-order: 2;\n        order: 2;\n  }\n.keen-c3-legend-bottom .keen-c3-legend-label-overlay{\n    top: 0;\n    margin-top: -2.7em;\n  }\n.keen-c3-legend-bottom .keen-c3-legend-label-overlay .overlay-pointer {\n      top: 2.4em;\n      -webkit-transform: rotate(180deg);\n          -ms-transform: rotate(180deg);\n              transform: rotate(180deg);\n      border-color: transparent transparent #f0f0f0 transparent;\n    }\n.keen-c3-legend-vertical{\n    -ms-flex-direction: column;\n        flex-direction: column;\n  }\n.keen-c3-legend-vertical .keen-c3-legend-pagination-icons\n    {\n      margin: 0.5em 0.1em;\n      -ms-flex-order: 2;\n          order: 2;\n    }\n.keen-c3-legend-left{\n    -ms-flex-order: 0;\n        order: 0;\n  }\n.keen-c3-legend-right{\n    -ms-flex-order: 2;\n        order: 2;\n  }\n.keen-c3-legend-items{\n    -ms-flex-order: 1;\n        order: 1;\n  }\n.keen-c3-legend-vertical-items{\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n        flex-direction: column;\n  }\n.keen-c3-legend-vertical-items .legend-item{\n      width: 8em;\n    }\n.keen-c3-legend-horizontal-items{\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n        flex-direction: row;\n  }\n.keen-c3-legend-horizontal-items .legend-item{\n      width: 6em;\n      margin: 0 0.25em;\n    }\n.keen-c3-legend .legend-item{\n    display: -ms-flexbox;\n    display: flex;\n    cursor: pointer;\n    padding: 0.2em;\n    font-size: 0.8em;\n  }\n.keen-c3-legend .legend-item > * {\n      vertical-align: middle;\n    }\n.keen-c3-legend .legend-item-color-sample{\n      display: inline-block;\n      width: 1em;\n      height: 1em;\n      margin-right: 0.5em;\n      pointer-events: none;\n      -ms-flex: none;\n          flex: none;\n    }\n.keen-c3-legend .legend-item-text{\n      pointer-events: none;\n      overflow: hidden;\n      white-space: nowrap;\n      -o-text-overflow: ellipsis;\n         text-overflow: ellipsis;\n      text-align: left;\n    }\n.keen-c3-legend-label-overlay .overlay-pointer {\n    border-color: transparent transparent #FFFFFF transparent;\n    border-color: transparent transparent #FFFFFF transparent;\n    border-style: solid;\n    border-width: 0 10px 10px 10px;\n    height: 0;\n    width: 0px;\n    position: absolute;\n    top: -10px;\n  }\n.keen-c3-legend-position-left .overlay-pointer {\n        left: 0px;\n      }\n.keen-c3-legend-position-right .overlay-pointer {\n        left: 0px;\n      }\n.keen-c3-legend-pagination-vertical {\n    margin-top: 0.5em;\n  }\n.keen-c3-legend-pagination-icons {\n    padding: 0.2em;\n  }\n.keen-c3-legend-pagination-icons i {\n      border-left: 1em solid transparent;\n      border-right: 1em solid transparent;\n      border-top: 1.5em solid #4D4D4D;\n      border-top: 1.5em solid #4D4D4D;\n      display: inline-block;\n      padding: 0em;\n      float: left;\n      cursor: pointer;\n      font-size: 0.5em;\n    }\n.keen-c3-legend-pagination-icons .right {\n      -ms-transform: rotate(-90deg);\n          transform: rotate(-90deg);\n      -webkit-transform: rotate(-90deg);\n    }\n.keen-c3-legend-pagination-icons .left {\n      -ms-transform: rotate(90deg);\n          transform: rotate(90deg);\n      -webkit-transform: rotate(90deg);\n    }\n.keen-c3-legend-pagination-icons .up {\n      -ms-transform: rotate(-180deg);\n          transform: rotate(-180deg);\n      -webkit-transform: rotate(-180deg);\n      margin-top: 0.1em;\n    }\n.keen-c3-legend-pagination-icons .down {\n      margin-right: 0.1em;\n    }\n.keen-c3-legend-label-overlay {\n    font-size: 1em;\n    background: rgba(255, 255, 255, 0.9);\n    background: rgba(255, 255, 255, 0.9);\n    -webkit-box-shadow: 0 1px 1px rgba(26, 26, 26, 0.09999999999999998);\n            box-shadow: 0 1px 1px rgba(26, 26, 26, 0.09999999999999998);\n    box-shadow: 0 1px 1px rgba(26, 26, 26, 0.09999999999999998);\n    padding: 0.6em;\n    margin-top: 1.5em;\n    position: absolute;\n    word-wrap: break-word;\n    pointer-events: none;\n    z-index: 222;\n  }\n.keen-dataviz-range .c3-area-Min {\n  display: none;\n}\n.keen-dataviz-range .c3-bars-Min {\n  display: none;\n}\n", ""]);



/***/ }),
/* 381 */
/***/ (function(module, exports) {

Prism.languages.clike = {
	'comment': [
		{
			pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
			lookbehind: true
		},
		{
			pattern: /(^|[^\\:])\/\/.*/,
			lookbehind: true,
			greedy: true
		}
	],
	'string': {
		pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'class-name': {
		pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
		lookbehind: true,
		inside: {
			punctuation: /[.\\]/
		}
	},
	'keyword': /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
	'boolean': /\b(?:true|false)\b/,
	'function': /\w+(?=\()/,
	'number': /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
	'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
	'punctuation': /[{}[\];(),.:]/
};


/***/ }),
/* 382 */
/***/ (function(module, exports) {

Prism.languages.javascript = Prism.languages.extend('clike', {
	'class-name': [
		Prism.languages.clike['class-name'],
		{
			pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
			lookbehind: true
		}
	],
	'keyword': [
		{
			pattern: /((?:^|})\s*)(?:catch|finally)\b/,
			lookbehind: true
		},
		{
			pattern: /(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
			lookbehind: true
		},
	],
	'number': /\b(?:(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+)n?|\d+n|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
	// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
	'function': /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
	'operator': /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
});

Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/

Prism.languages.insertBefore('javascript', 'keyword', {
	'regex': {
		pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})\]]))/,
		lookbehind: true,
		greedy: true
	},
	// This must be declared before keyword because we use "function" inside the look-forward
	'function-variable': {
		pattern: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
		alias: 'function'
	},
	'parameter': [
		{
			pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
			lookbehind: true,
			inside: Prism.languages.javascript
		},
		{
			pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
			inside: Prism.languages.javascript
		},
		{
			pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
			lookbehind: true,
			inside: Prism.languages.javascript
		},
		{
			pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
			lookbehind: true,
			inside: Prism.languages.javascript
		}
	],
	'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
});

Prism.languages.insertBefore('javascript', 'string', {
	'template-string': {
		pattern: /`(?:\\[\s\S]|\${[^}]+}|[^\\`])*`/,
		greedy: true,
		inside: {
			'interpolation': {
				pattern: /\${[^}]+}/,
				inside: {
					'interpolation-punctuation': {
						pattern: /^\${|}$/,
						alias: 'punctuation'
					},
					rest: Prism.languages.javascript
				}
			},
			'string': /[\s\S]+/
		}
	}
});

if (Prism.languages.markup) {
	Prism.languages.markup.tag.addInlined('script', 'javascript');
}

Prism.languages.js = Prism.languages.javascript;


/***/ }),
/* 383 */
/***/ (function(module, exports) {

(function (Prism) {

	var string = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;

	Prism.languages.css = {
		'comment': /\/\*[\s\S]*?\*\//,
		'atrule': {
			pattern: /@[\w-]+?[\s\S]*?(?:;|(?=\s*\{))/i,
			inside: {
				'rule': /@[\w-]+/
				// See rest below
			}
		},
		'url': RegExp('url\\((?:' + string.source + '|.*?)\\)', 'i'),
		'selector': RegExp('[^{}\\s](?:[^{};"\']|' + string.source + ')*?(?=\\s*\\{)'),
		'string': {
			pattern: string,
			greedy: true
		},
		'property': /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
		'important': /!important\b/i,
		'function': /[-a-z0-9]+(?=\()/i,
		'punctuation': /[(){};:,]/
	};

	Prism.languages.css['atrule'].inside.rest = Prism.languages.css;

	var markup = Prism.languages.markup;
	if (markup) {
		markup.tag.addInlined('style', 'css');

		Prism.languages.insertBefore('inside', 'attr-value', {
			'style-attr': {
				pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
				inside: {
					'attr-name': {
						pattern: /^\s*style/i,
						inside: markup.tag.inside
					},
					'punctuation': /^\s*=\s*['"]|['"]\s*$/,
					'attr-value': {
						pattern: /.+/i,
						inside: Prism.languages.css
					}
				},
				alias: 'language-css'
			}
		}, markup.tag);
	}

}(Prism));


/***/ }),
/* 384 */
/***/ (function(module, exports) {

Prism.languages.markup = {
	'comment': /<!--[\s\S]*?-->/,
	'prolog': /<\?[\s\S]+?\?>/,
	'doctype': /<!DOCTYPE[\s\S]+?>/i,
	'cdata': /<!\[CDATA\[[\s\S]*?]]>/i,
	'tag': {
		pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/i,
		greedy: true,
		inside: {
			'tag': {
				pattern: /^<\/?[^\s>\/]+/i,
				inside: {
					'punctuation': /^<\/?/,
					'namespace': /^[^\s>\/:]+:/
				}
			},
			'attr-value': {
				pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
				inside: {
					'punctuation': [
						/^=/,
						{
							pattern: /^(\s*)["']|["']$/,
							lookbehind: true
						}
					]
				}
			},
			'punctuation': /\/?>/,
			'attr-name': {
				pattern: /[^\s>\/]+/,
				inside: {
					'namespace': /^[^\s>\/:]+:/
				}
			}

		}
	},
	'entity': /&#?[\da-z]{1,8};/i
};

Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] =
	Prism.languages.markup['entity'];

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function(env) {

	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});

Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
	/**
	 * Adds an inlined language to markup.
	 *
	 * An example of an inlined language is CSS with `<style>` tags.
	 *
	 * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
	 * case insensitive.
	 * @param {string} lang The language key.
	 * @example
	 * addInlined('style', 'css');
	 */
	value: function addInlined(tagName, lang) {
		var includedCdataInside = {};
		includedCdataInside['language-' + lang] = {
			pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
			lookbehind: true,
			inside: Prism.languages[lang]
		};
		includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;

		var inside = {
			'included-cdata': {
				pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
				inside: includedCdataInside
			}
		};
		inside['language-' + lang] = {
			pattern: /[\s\S]+/,
			inside: Prism.languages[lang]
		};

		var def = {};
		def[tagName] = {
			pattern: RegExp(/(<__[\s\S]*?>)(?:<!\[CDATA\[[\s\S]*?\]\]>\s*|[\s\S])*?(?=<\/__>)/.source.replace(/__/g, tagName), 'i'),
			lookbehind: true,
			greedy: true,
			inside: inside
		};

		Prism.languages.insertBefore('markup', 'cdata', def);
	}
});

Prism.languages.xml = Prism.languages.extend('markup', {});
Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;


/***/ }),
/* 385 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(386);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(73)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 386 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(72)(false);
// Module
exports.push([module.i, "pre[class*=\"language-\"].line-numbers {\n\tposition: relative;\n\tpadding-left: 3.8em;\n\tcounter-reset: linenumber;\n}\n\npre[class*=\"language-\"].line-numbers > code {\n\tposition: relative;\n\twhite-space: inherit;\n}\n\n.line-numbers .line-numbers-rows {\n\tposition: absolute;\n\tpointer-events: none;\n\ttop: 0;\n\tfont-size: 100%;\n\tleft: -3.8em;\n\twidth: 3em; /* works for line-numbers below 1000 lines */\n\tletter-spacing: -1px;\n\tborder-right: 1px solid #999;\n\n\t-webkit-user-select: none;\n\t-moz-user-select: none;\n\t-ms-user-select: none;\n\tuser-select: none;\n\n}\n\n\t.line-numbers-rows > span {\n\t\tpointer-events: none;\n\t\tdisplay: block;\n\t\tcounter-increment: linenumber;\n\t}\n\n\t\t.line-numbers-rows > span:before {\n\t\t\tcontent: counter(linenumber);\n\t\t\tcolor: #999;\n\t\t\tdisplay: block;\n\t\t\tpadding-right: 0.8em;\n\t\t\ttext-align: right;\n\t\t}\n", ""]);



/***/ }),
/* 387 */
/***/ (function(module, exports) {

(function () {

	if (typeof self === 'undefined' || !self.Prism || !self.document) {
		return;
	}

	/**
	 * Plugin name which is used as a class name for <pre> which is activating the plugin
	 * @type {String}
	 */
	var PLUGIN_NAME = 'line-numbers';

	/**
	 * Regular expression used for determining line breaks
	 * @type {RegExp}
	 */
	var NEW_LINE_EXP = /\n(?!$)/g;

	/**
	 * Resizes line numbers spans according to height of line of code
	 * @param {Element} element <pre> element
	 */
	var _resizeElement = function (element) {
		var codeStyles = getStyles(element);
		var whiteSpace = codeStyles['white-space'];

		if (whiteSpace === 'pre-wrap' || whiteSpace === 'pre-line') {
			var codeElement = element.querySelector('code');
			var lineNumbersWrapper = element.querySelector('.line-numbers-rows');
			var lineNumberSizer = element.querySelector('.line-numbers-sizer');
			var codeLines = codeElement.textContent.split(NEW_LINE_EXP);

			if (!lineNumberSizer) {
				lineNumberSizer = document.createElement('span');
				lineNumberSizer.className = 'line-numbers-sizer';

				codeElement.appendChild(lineNumberSizer);
			}

			lineNumberSizer.style.display = 'block';

			codeLines.forEach(function (line, lineNumber) {
				lineNumberSizer.textContent = line || '\n';
				var lineSize = lineNumberSizer.getBoundingClientRect().height;
				lineNumbersWrapper.children[lineNumber].style.height = lineSize + 'px';
			});

			lineNumberSizer.textContent = '';
			lineNumberSizer.style.display = 'none';
		}
	};

	/**
	 * Returns style declarations for the element
	 * @param {Element} element
	 */
	var getStyles = function (element) {
		if (!element) {
			return null;
		}

		return window.getComputedStyle ? getComputedStyle(element) : (element.currentStyle || null);
	};

	window.addEventListener('resize', function () {
		Array.prototype.forEach.call(document.querySelectorAll('pre.' + PLUGIN_NAME), _resizeElement);
	});

	Prism.hooks.add('complete', function (env) {
		if (!env.code) {
			return;
		}

		var code = env.element;
		var pre = code.parentNode;

		// works only for <code> wrapped inside <pre> (not inline)
		if (!pre || !/pre/i.test(pre.nodeName)) {
			return;
		}

		// Abort if line numbers already exists
		if (code.querySelector('.line-numbers-rows')) {
			return;
		}

		var addLineNumbers = false;
		var lineNumbersRegex = /(?:^|\s)line-numbers(?:\s|$)/;

		for (var element = code; element; element = element.parentNode) {
			if (lineNumbersRegex.test(element.className)) {
				addLineNumbers = true;
				break;
			}
		}

		// only add line numbers if <code> or one of its ancestors has the `line-numbers` class
		if (!addLineNumbers) {
			return;
		}

		// Remove the class 'line-numbers' from the <code>
		code.className = code.className.replace(lineNumbersRegex, ' ');
		// Add the class 'line-numbers' to the <pre>
		if (!lineNumbersRegex.test(pre.className)) {
			pre.className += ' line-numbers';
		}

		var match = env.code.match(NEW_LINE_EXP);
		var linesNum = match ? match.length + 1 : 1;
		var lineNumbersWrapper;

		var lines = new Array(linesNum + 1).join('<span></span>');

		lineNumbersWrapper = document.createElement('span');
		lineNumbersWrapper.setAttribute('aria-hidden', 'true');
		lineNumbersWrapper.className = 'line-numbers-rows';
		lineNumbersWrapper.innerHTML = lines;

		if (pre.hasAttribute('data-start')) {
			pre.style.counterReset = 'linenumber ' + (parseInt(pre.getAttribute('data-start'), 10) - 1);
		}

		env.element.appendChild(lineNumbersWrapper);

		_resizeElement(pre);

		Prism.hooks.run('line-numbers', env);
	});

	Prism.hooks.add('line-numbers', function (env) {
		env.plugins = env.plugins || {};
		env.plugins.lineNumbers = true;
	});

	/**
	 * Global exports
	 */
	Prism.plugins.lineNumbers = {
		/**
		 * Get node for provided line number
		 * @param {Element} element pre element
		 * @param {Number} number line number
		 * @return {Element|undefined}
		 */
		getLine: function (element, number) {
			if (element.tagName !== 'PRE' || !element.classList.contains(PLUGIN_NAME)) {
				return;
			}

			var lineNumberRows = element.querySelector('.line-numbers-rows');
			var lineNumberStart = parseInt(element.getAttribute('data-start'), 10) || 1;
			var lineNumberEnd = lineNumberStart + (lineNumberRows.children.length - 1);

			if (number < lineNumberStart) {
				number = lineNumberStart;
			}
			if (number > lineNumberEnd) {
				number = lineNumberEnd;
			}

			var lineIndex = number - lineNumberStart;

			return lineNumberRows.children[lineIndex];
		}
	};

}());


/***/ }),
/* 388 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(389);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(73)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 389 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(72)(false);
// Module
exports.push([module.i, "/**\n * prism.js default theme for JavaScript, CSS and HTML\n * Based on dabblet (http://dabblet.com)\n * @author Lea Verou\n */\n\ncode[class*=\"language-\"],\npre[class*=\"language-\"] {\n\tcolor: black;\n\tbackground: none;\n\ttext-shadow: 0 1px white;\n\tfont-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n\tfont-size: 1em;\n\ttext-align: left;\n\twhite-space: pre;\n\tword-spacing: normal;\n\tword-break: normal;\n\tword-wrap: normal;\n\tline-height: 1.5;\n\n\t-moz-tab-size: 4;\n\t-o-tab-size: 4;\n\ttab-size: 4;\n\n\t-webkit-hyphens: none;\n\t-moz-hyphens: none;\n\t-ms-hyphens: none;\n\thyphens: none;\n}\n\npre[class*=\"language-\"]::-moz-selection, pre[class*=\"language-\"] ::-moz-selection,\ncode[class*=\"language-\"]::-moz-selection, code[class*=\"language-\"] ::-moz-selection {\n\ttext-shadow: none;\n\tbackground: #b3d4fc;\n}\n\npre[class*=\"language-\"]::selection, pre[class*=\"language-\"] ::selection,\ncode[class*=\"language-\"]::selection, code[class*=\"language-\"] ::selection {\n\ttext-shadow: none;\n\tbackground: #b3d4fc;\n}\n\n@media print {\n\tcode[class*=\"language-\"],\n\tpre[class*=\"language-\"] {\n\t\ttext-shadow: none;\n\t}\n}\n\n/* Code blocks */\npre[class*=\"language-\"] {\n\tpadding: 1em;\n\tmargin: .5em 0;\n\toverflow: auto;\n}\n\n:not(pre) > code[class*=\"language-\"],\npre[class*=\"language-\"] {\n\tbackground: #f5f2f0;\n}\n\n/* Inline code */\n:not(pre) > code[class*=\"language-\"] {\n\tpadding: .1em;\n\tborder-radius: .3em;\n\twhite-space: normal;\n}\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n\tcolor: slategray;\n}\n\n.token.punctuation {\n\tcolor: #999;\n}\n\n.namespace {\n\topacity: .7;\n}\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol,\n.token.deleted {\n\tcolor: #905;\n}\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n\tcolor: #690;\n}\n\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string {\n\tcolor: #9a6e3a;\n\tbackground: hsla(0, 0%, 100%, .5);\n}\n\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n\tcolor: #07a;\n}\n\n.token.function,\n.token.class-name {\n\tcolor: #DD4A68;\n}\n\n.token.regex,\n.token.important,\n.token.variable {\n\tcolor: #e90;\n}\n\n.token.important,\n.token.bold {\n\tfont-weight: bold;\n}\n.token.italic {\n\tfont-style: italic;\n}\n\n.token.entity {\n\tcursor: help;\n}\n", ""]);



/***/ }),
/* 390 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(0);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "react-dom"
var external_react_dom_ = __webpack_require__(160);
var external_react_dom_default = /*#__PURE__*/__webpack_require__.n(external_react_dom_);

// EXTERNAL MODULE: external "redux"
var external_redux_ = __webpack_require__(56);

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(2);

// EXTERNAL MODULE: external "redux-devtools-extension"
var external_redux_devtools_extension_ = __webpack_require__(161);

// EXTERNAL MODULE: external "redux-saga"
var external_redux_saga_ = __webpack_require__(162);
var external_redux_saga_default = /*#__PURE__*/__webpack_require__.n(external_redux_saga_);

// EXTERNAL MODULE: external "keen-analysis"
var external_keen_analysis_ = __webpack_require__(163);
var external_keen_analysis_default = /*#__PURE__*/__webpack_require__.n(external_keen_analysis_);

// EXTERNAL MODULE: ./test/demo/keen-explorer.css
var keen_explorer = __webpack_require__(334);

// CONCATENATED MODULE: ./lib/js/app/redux/reducers/collections.js
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultState = {
  items: [],
  schemas: {},
  recentEvents: [],
  fetchingSchema: false,
  fetchingRecentEvents: false
};

var collections_collections = function collections() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _objectSpread({}, defaultState);
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'CLIENT_FETCH_PROJECT_SUCCESS':
      return _objectSpread({}, state, {
        items: action.payload.events
      });

    case 'CLIENT_FETCH_SCHEMA':
      return _objectSpread({}, state, {
        fetchingSchema: true
      });

    case 'CLIENT_FETCH_SCHEMA_SUCCESS':
      return _objectSpread({}, state, {
        schemas: _objectSpread({}, state.schemas, _defineProperty({}, action.eventCollection, _objectSpread({}, action.payload.properties))),
        fetchingSchema: false
      });

    case 'CLIENT_FETCH_SCHEMA_ERROR':
      return _objectSpread({}, state, {
        fetchingSchema: false
      });

    case 'CLIENT_FETCH_RECENT_EVENTS':
      return _objectSpread({}, state, {
        fetchingRecentEvents: true
      });

    case 'CLIENT_FETCH_RECENT_EVENTS_SUCCESS':
      return _objectSpread({}, state, {
        fetchingRecentEvents: false,
        recentEvents: action.payload.result
      });

    case 'CLIENT_FETCH_RECENT_EVENTS_ERROR':
      return _objectSpread({}, state, {
        fetchingRecentEvents: true
      });

    default:
      return state;
  }
};

/* harmony default export */ var reducers_collections = (collections_collections);
// CONCATENATED MODULE: ./lib/js/app/redux/reducers/queries.js
function queries_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { queries_defineProperty(target, key, source[key]); }); } return target; }

function queries_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var queries_defaultState = {
  results: null,
  saved: [],
  isSavingQuery: false
};

var queries_queries = function queries() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : queries_objectSpread({}, queries_defaultState);
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'CLIENT_RUN_QUERY_SUCCESS':
      return queries_objectSpread({}, state, {
        results: action.payload
      });

    case 'CLIENT_SAVE_QUERY':
      return queries_objectSpread({}, state, {
        isSavingQuery: true
      });

    case 'CLIENT_SAVE_QUERY_SUCCESS':
      return queries_objectSpread({}, state, {
        isSavingQuery: false
      });

    case 'CLIENT_SAVE_QUERY_ERROR':
      return queries_objectSpread({}, state, {
        isSavingQuery: false
      });

    case 'CLIENT_FETCH_SAVED_QUERIES_SUCCESS':
      return queries_objectSpread({}, state, {
        saved: action.payload
      });

    case 'CLIENT_DELETE_QUERY_SUCCESS':
      return queries_objectSpread({}, state, {
        saved: state.saved.filter(function (item) {
          return item.query_name !== action.payload.name;
        })
      });

    case 'UPDATE_ACTIVE_SAVED_QUERY':
      return queries_objectSpread({}, state, {
        activeSavedQuery: action.payload
      });

    case 'RESET_UI':
      return queries_objectSpread({}, state, {
        results: queries_defaultState.results
      });

    case 'QUERY_RESET_RESULTS':
      return queries_objectSpread({}, state, {
        results: queries_defaultState.results
      });

    default:
      return state;
  }
};

/* harmony default export */ var reducers_queries = (queries_queries);
// EXTERNAL MODULE: external "moment"
var external_moment_ = __webpack_require__(10);
var external_moment_default = /*#__PURE__*/__webpack_require__.n(external_moment_);

// CONCATENATED MODULE: ./lib/js/app/consts.js

var PANEL_NEW_QUERY = 0;
var PANEL_BROWSE = 1;
var ANALYSIS_TYPES = [{
  type: 'average',
  targetProperty: true
}, {
  type: 'count',
  "default": true
}, {
  type: 'count_unique',
  targetProperty: true
}, {
  type: 'extraction',
  extraction: true
}, {
  type: 'funnel',
  funnel: true
}, {
  type: 'maximum',
  targetProperty: true
}, {
  type: 'median',
  targetProperty: true
}, {
  type: 'minimum',
  targetProperty: true
}, {
  type: 'percentile',
  targetProperty: true,
  percentile: true
}, {
  type: 'select_unique',
  targetProperty: true
}, {
  type: 'standard_deviation',
  targetProperty: true
}, {
  type: 'sum',
  targetProperty: true
}];
var TIME_UNITS = ['minutes', 'hours', 'days', 'weeks', 'months', 'years'];
var DEFAULT_NUMBER_OF_TIME_UNITS = 14;
var RELATIVITY_UNITS = ['this', 'previous'];
var DEFAULT_TIMEFRAME_RELATIVE_VALUE = "".concat(RELATIVITY_UNITS[0], "_").concat(DEFAULT_NUMBER_OF_TIME_UNITS, "_").concat(TIME_UNITS[2]);
var DEFAULT_TIMEFRAME_ABSOLUTE_VALUE = {
  start: "".concat(external_moment_default()().subtract(1, 'day').format('YYYY-MM-DD'), "T").concat(external_moment_default()(external_moment_default()().format('YYYY-MM-DD')).format('HH:mm'), ":00.000Z"),
  end: "".concat(external_moment_default()(external_moment_default()().format('YYYY-MM-DD')).format('YYYY-MM-DD'), "T").concat(external_moment_default()(external_moment_default()().format('YYYY-MM-DD')).format('HH:mm'), ":00.000Z")
};
var INTERVALS = ['minutely', 'hourly', 'daily', 'weekly', 'monthly', 'yearly'];
var DEFAULT_STANDARD_INTERVAL = INTERVALS[2];
var DEFAULT_CUSTOM_INTERVAL = "every_7_".concat(TIME_UNITS[2]);
var TIMEFRAME_TABS = ['relative', 'absolute'];
var TIMEZONES = [{
  label: 'UTC',
  value: 0,
  dst_value: 0
}, {
  label: 'Europe/London',
  value: 0,
  dst_value: 3600
}, {
  label: 'Africa/Casablanca',
  value: 0,
  dst_value: 0
}, {
  label: 'Africa/Nairobi',
  value: 10800,
  dst_value: 0
}, {
  label: 'Asia/Dubai',
  value: 14400,
  dst_value: 0
}, {
  label: 'America/Sao_Paulo',
  value: -10800,
  dst_value: -7200
}, {
  label: 'US/Eastern',
  value: -18000,
  dst_value: -14400
}, {
  label: 'US/Central',
  value: -21600,
  dst_value: -18000
}, {
  label: 'US/Mountain',
  value: -25200,
  dst_value: -21600
}, {
  label: 'US/Pacific',
  value: -28800,
  dst_value: -25200
}, {
  label: 'US/Alaska',
  value: -32400,
  dst_value: -28800
}, {
  label: 'US/Hawaii',
  value: -36000,
  dst_value: -32400
}, {
  label: 'Europe/Paris',
  value: 3600,
  dst_value: 7200
}, {
  label: 'Europe/Amsterdam',
  value: 3600,
  dst_value: 7200
}, {
  label: 'Europe/Stockholm',
  value: 3600,
  dst_value: 7200
}, {
  label: 'Europe/Prague',
  value: 3600,
  dst_value: 7200
}, {
  label: 'Asia/Istanbul',
  value: 7200,
  dst_value: 10800
}, {
  label: 'Europe/Istanbul',
  value: 7200,
  dst_value: 10800
}, {
  label: 'Europe/Copenhagen',
  value: 3600,
  dst_value: 7200
}, {
  label: 'Asia/Jakarta',
  value: 25200,
  dst_value: 25200
}, {
  label: 'Asia/Singapore',
  value: 28800,
  dst_value: 28800
}, {
  label: 'Australia/Perth',
  value: 28800,
  dst_value: 28800
}, {
  label: 'Asia/Tokyo',
  value: 32400,
  dst_value: 32400
}, {
  label: 'Australia/Sydney',
  value: 36000,
  dst_value: 39600
}, {
  label: 'Pacific/Auckland',
  value: 43200,
  dst_value: 46800
}];
var FILTER_OPERATORS = [{
  label: "= Equal to",
  value: 'eq',
  dataTypes: ['String', 'Number', 'Null', 'List', 'Boolean', 'Datetime']
}, {
  label: "\u2260 Not equal to",
  value: 'ne',
  dataTypes: ['String', 'Number', 'Null', 'List', 'Boolean', 'Datetime']
}, {
  label: "> Greater than",
  value: 'gt',
  dataTypes: ['Number', 'Null', 'Datetime', 'String']
}, {
  label: "\u2265 Greater than or equal to",
  value: 'gte',
  dataTypes: ['Number', 'Null', 'Datetime', 'String']
}, {
  label: "< Less than",
  value: 'lt',
  dataTypes: ['Number', 'Null', 'Datetime', 'String']
}, {
  label: "\u2264 Less than or equal to",
  value: 'lte',
  dataTypes: ['Number', 'Null', 'Datetime', 'String']
}, {
  label: "\u2203 Property exists",
  value: 'exists',
  dataTypes: ['String', 'Number', 'Boolean']
}, {
  label: "\u229A String contains",
  value: 'contains',
  dataTypes: ['String', 'Null']
}, {
  label: "\u2349 String does not contain",
  value: 'not_contains',
  dataTypes: ['String', 'Null']
}, {
  label: "\u29C7 Matches any value in a list",
  value: 'in',
  dataTypes: ['String', 'Number', 'List']
}, {
  label: "\u2690 Within a given radius (geo)",
  value: 'within',
  dataTypes: ['Geo', 'List']
}];
var DATA_TYPES = [{
  label: 'String',
  value: 'String'
}, {
  label: 'Number',
  value: 'Number'
}, {
  label: 'Null',
  value: 'Null'
}, {
  label: 'List',
  value: 'List'
}, {
  label: 'Boolean',
  value: 'Boolean'
}, {
  label: 'Datetime',
  value: 'Datetime'
}];
var TAB_TIMEFRAME_RELATIVE = 0;
var TAB_TIMEFRAME_ABSOLUTE = 1;
var TAB_EXTRACTION_PREVIEW = 0;
var TAB_EXTRACTION_BULK = 1;
var EXTRACTION_PREVIEW_EVENTS_LIMIT = 100;
var EXTRACTION_BULK_EVENTS_DEFAULT = 1000;
var EXTRACTION_BULK_EVENTS_LIMIT = 10000000;
// CONCATENATED MODULE: ./lib/js/app/redux/reducers/ui.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ui_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { ui_defineProperty(target, key, source[key]); }); } return target; }

function ui_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var defaultAnalysisType = ANALYSIS_TYPES.find(function (item) {
  return item["default"];
});
var defaultStateSavedQuery = {
  name: '',
  displayName: '',
  cache: false,
  refreshRate: 0,
  exists: false
};
var defaultStep = {
  eventCollection: undefined,
  actorProperty: undefined,
  timeframe: DEFAULT_TIMEFRAME_RELATIVE_VALUE,
  timezone: parseInt(localStorage.timezone || 0, 0),
  filters: [],
  inverted: false,
  optional: false,
  withActors: false
};
var DEFAULT_TIMEZONE = parseInt(localStorage.timezone || 0, 0);
var ui_defaultState = {
  autoload: false,
  analysisType: defaultAnalysisType.type,
  eventCollection: localStorage.eventCollection || undefined,
  showTargetProperty: false,
  targetProperty: undefined,
  filters: [],
  modalFilters: false,
  modalEmbedHTML: false,
  modalPreviewCollection: false,
  groupBy: undefined,
  orderBy: undefined,
  limit: undefined,
  latest: EXTRACTION_PREVIEW_EVENTS_LIMIT,
  email: '',
  propertyNames: [],
  interval: undefined,
  numberOfGroupByProps: 1,
  timeframe: DEFAULT_TIMEFRAME_RELATIVE_VALUE,
  timezone: DEFAULT_TIMEZONE,
  percentile: undefined,
  chartType: undefined,
  savedQuery: ui_objectSpread({}, defaultStateSavedQuery),
  error: null,
  fetching: false,
  activePanel: PANEL_NEW_QUERY,
  panelSave: false,
  extractionActiveTab: TAB_EXTRACTION_PREVIEW,
  steps: [ui_objectSpread({}, defaultStep)],
  activeStep: 0,
  stepLabels: ['']
};

var ui_queries = function queries() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ui_defaultState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'UI_UPDATE':
      return ui_objectSpread({}, state, action.payload);

    case 'UI_STEP_UPDATE':
      return ui_objectSpread({}, state, {
        steps: state.steps.map(function (item, itemIndex) {
          if (itemIndex === action.step) {
            item = ui_objectSpread({}, item, action.payload);
          }

          return item;
        })
      }, action.rootPayload);

    case 'CHANGE_EVENT_COLLECTION':
      var eventCollection = ui_defaultState.eventCollection,
          showTargetProperty = ui_defaultState.showTargetProperty,
          analysisType = ui_defaultState.analysisType,
          timeframe = ui_defaultState.timeframe,
          timeframeActiveTab = ui_defaultState.timeframeActiveTab,
          defaults = _objectWithoutProperties(ui_defaultState, ["eventCollection", "showTargetProperty", "analysisType", "timeframe", "timeframeActiveTab"]);

      return ui_objectSpread({}, state, defaults, action.payload);

    case 'CLIENT_RUN_QUERY':
      return ui_objectSpread({}, state, {
        error: null,
        fetching: true
      });

    case 'CLIENT_RUN_QUERY_ERROR':
      return ui_objectSpread({}, state, {
        error: action.payload,
        fetching: false
      });

    case 'CLIENT_RUN_QUERY_SUCCESS':
      return ui_objectSpread({}, state, {
        fetching: false
      });

    case 'UPDATE_SAVED_QUERY_UI':
      return ui_objectSpread({}, state, {
        savedQuery: ui_objectSpread({}, state.savedQuery, action.payload)
      });

    case 'CLIENT_SAVE_QUERY_SUCCESS':
      return ui_objectSpread({}, state, {
        savedQuery: ui_objectSpread({}, state.savedQuery, {
          exists: true
        })
      });

    case 'RESET_SAVED_QUERY_UI':
      return ui_objectSpread({}, state, {
        savedQuery: ui_objectSpread({}, defaultStateSavedQuery)
      });

    case 'RESET_UI':
      return ui_objectSpread({}, ui_defaultState);

    case 'ADD_FILTER':
      return ui_objectSpread({}, state, {
        filters: [].concat(_toConsumableArray(state.filters), [{
          propertyName: '',
          operator: 'eq',
          propertyType: 'String',
          propertyValue: ''
        }])
      });

    case 'DELETE_FILTER':
      return ui_objectSpread({}, state, {
        filters: state.filters.filter(function (item, index) {
          return index !== action.payload;
        })
      });

    case 'UPDATE_FILTER':
      return ui_objectSpread({}, state, {
        filters: state.filters.map(function (item, index) {
          if (action.payload.index !== index) {
            return item;
          }

          return ui_objectSpread({}, item, action.payload.item);
        })
      });

    case 'ADD_STEP_FILTER':
      return ui_objectSpread({}, state, {
        steps: state.steps.map(function (item, itemIndex) {
          if (itemIndex === action.step) {
            item.filters = [].concat(_toConsumableArray(item.filters), [{
              propertyName: '',
              operator: 'eq',
              propertyType: 'String',
              propertyValue: ''
            }]);
          }

          return item;
        })
      });

    case 'DELETE_STEP_FILTER':
      return ui_objectSpread({}, state, {
        steps: state.steps.map(function (item, itemIndex) {
          if (itemIndex === action.step) {
            item.filters = item.filters.filter(function (subitem, index) {
              return index !== action.payload.index;
            });
          }

          return item;
        })
      });

    case 'UPDATE_STEP_FILTER':
      return ui_objectSpread({}, state, {
        steps: state.steps.map(function (item, itemIndex) {
          if (itemIndex === action.step) {
            var filters = item.filters.map(function (itemFilter, index) {
              if (action.payload.index !== index) {
                return itemFilter;
              }

              return ui_objectSpread({}, itemFilter, action.payload.item);
            });
            item.filters = filters;
          }

          return item;
        })
      });

    case 'TOGGLE_PANEL_SAVE':
      return ui_objectSpread({}, state, {
        panelSave: !state.panelSave
      });

    case 'ADD_STEP':
      var prevStep = state.steps[state.steps.length - 1] || {};
      var inheritedValues = {
        timeframe: prevStep.timeframe || DEFAULT_TIMEFRAME_RELATIVE_VALUE,
        timezone: prevStep.timezone || DEFAULT_TIMEZONE,
        withActors: !!prevStep.withActors
      };
      return ui_objectSpread({}, state, {
        steps: [].concat(_toConsumableArray(state.steps), [ui_objectSpread({}, defaultStep, inheritedValues)]),
        stepLabels: [].concat(_toConsumableArray(state.stepLabels), ['']),
        activeStep: state.steps.length
      });

    case 'DELETE_STEP':
      return ui_objectSpread({}, state, {
        steps: state.steps.filter(function (item, index) {
          return index !== action.payload;
        }),
        stepLabels: state.stepLabels.filter(function (item, index) {
          return index !== action.payload;
        })
      });

    default:
      return state;
  }
};

/* harmony default export */ var reducers_ui = (ui_queries);
// CONCATENATED MODULE: ./lib/js/app/redux/index.js




/* harmony default export */ var redux = (Object(external_redux_["combineReducers"])({
  collections: reducers_collections,
  queries: reducers_queries,
  ui: reducers_ui
}));
// CONCATENATED MODULE: ./node_modules/@redux-saga/symbols/dist/redux-saga-symbols.esm.js
var createSymbol = function createSymbol(name) {
  return "@@redux-saga/" + name;
};

var CANCEL =
/*#__PURE__*/
createSymbol('CANCEL_PROMISE');
var CHANNEL_END_TYPE =
/*#__PURE__*/
createSymbol('CHANNEL_END');
var IO =
/*#__PURE__*/
createSymbol('IO');
var MATCH =
/*#__PURE__*/
createSymbol('MATCH');
var MULTICAST =
/*#__PURE__*/
createSymbol('MULTICAST');
var SAGA_ACTION =
/*#__PURE__*/
createSymbol('SAGA_ACTION');
var SELF_CANCELLATION =
/*#__PURE__*/
createSymbol('SELF_CANCELLATION');
var TASK =
/*#__PURE__*/
createSymbol('TASK');
var TASK_CANCEL =
/*#__PURE__*/
createSymbol('TASK_CANCEL');
var TERMINATE =
/*#__PURE__*/
createSymbol('TERMINATE');
var SAGA_LOCATION =
/*#__PURE__*/
createSymbol('LOCATION');



// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}
// CONCATENATED MODULE: ./node_modules/@redux-saga/is/dist/redux-saga-is.esm.js


var undef = function undef(v) {
  return v === null || v === undefined;
};
var notUndef = function notUndef(v) {
  return v !== null && v !== undefined;
};
var func = function func(f) {
  return typeof f === 'function';
};
var number = function number(n) {
  return typeof n === 'number';
};
var string = function string(s) {
  return typeof s === 'string';
};
var array = Array.isArray;
var object = function object(obj) {
  return obj && !array(obj) && typeof obj === 'object';
};
var redux_saga_is_esm_promise = function promise(p) {
  return p && func(p.then);
};
var iterator = function iterator(it) {
  return it && func(it.next) && func(it.throw);
};
var iterable = function iterable(it) {
  return it && func(Symbol) ? func(it[Symbol.iterator]) : array(it);
};
var redux_saga_is_esm_task = function task(t) {
  return t && t[TASK];
};
var observable = function observable(ob) {
  return ob && func(ob.subscribe);
};
var buffer = function buffer(buf) {
  return buf && func(buf.isEmpty) && func(buf.take) && func(buf.put);
};
var redux_saga_is_esm_pattern = function pattern(pat) {
  return pat && (string(pat) || symbol(pat) || func(pat) || array(pat) && pat.every(pattern));
};
var channel = function channel(ch) {
  return ch && func(ch.take) && func(ch.close);
};
var stringableFunc = function stringableFunc(f) {
  return func(f) && f.hasOwnProperty('toString');
};
var symbol = function symbol(sym) {
  return Boolean(sym) && typeof Symbol === 'function' && sym.constructor === Symbol && sym !== Symbol.prototype;
};
var redux_saga_is_esm_multicast = function multicast(ch) {
  return channel(ch) && ch[MULTICAST];
};
var redux_saga_is_esm_effect = function effect(eff) {
  return eff && eff[IO];
};



// CONCATENATED MODULE: ./node_modules/@redux-saga/delay-p/dist/redux-saga-delay-p.esm.js


function delayP(ms, val) {
  if (val === void 0) {
    val = true;
  }

  var timeoutId;
  var promise = new Promise(function (resolve) {
    timeoutId = setTimeout(resolve, ms, val);
  });

  promise[CANCEL] = function () {
    clearTimeout(timeoutId);
  };

  return promise;
}

/* harmony default export */ var redux_saga_delay_p_esm = (delayP);

// CONCATENATED MODULE: ./node_modules/@redux-saga/core/dist/chunk-585b854f.js





var konst = function konst(v) {
  return function () {
    return v;
  };
};
var kTrue =
/*#__PURE__*/
konst(true);
var noop = function noop() {};
var identity = function identity(v) {
  return v;
};
var hasSymbol = typeof Symbol === 'function';
var asyncIteratorSymbol = hasSymbol && Symbol.asyncIterator ? Symbol.asyncIterator : '@@asyncIterator';
function check(value, predicate, error) {
  if (!predicate(value)) {
    throw new Error(error);
  }
}
var chunk_585b854f_assignWithSymbols = function assignWithSymbols(target, source) {
  _extends(target, source);

  if (Object.getOwnPropertySymbols) {
    Object.getOwnPropertySymbols(source).forEach(function (s) {
      target[s] = source[s];
    });
  }
};
var flatMap = function flatMap(mapper, arr) {
  var _ref;

  return (_ref = []).concat.apply(_ref, arr.map(mapper));
};
function remove(array$$1, item) {
  var index = array$$1.indexOf(item);

  if (index >= 0) {
    array$$1.splice(index, 1);
  }
}
function once(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }

    called = true;
    fn();
  };
}

var kThrow = function kThrow(err) {
  throw err;
};

var kReturn = function kReturn(value) {
  return {
    value: value,
    done: true
  };
};

function makeIterator(next, thro, name) {
  if (thro === void 0) {
    thro = kThrow;
  }

  if (name === void 0) {
    name = 'iterator';
  }

  var iterator = {
    meta: {
      name: name
    },
    next: next,
    throw: thro,
    return: kReturn,
    isSagaIterator: true
  };

  if (typeof Symbol !== 'undefined') {
    iterator[Symbol.iterator] = function () {
      return iterator;
    };
  }

  return iterator;
}
function logError(error, _ref2) {
  var sagaStack = _ref2.sagaStack;

  /*eslint-disable no-console*/
  console.error(error);
  console.error(sagaStack);
}
var internalErr = function internalErr(err) {
  return new Error("\n  redux-saga: Error checking hooks detected an inconsistent state. This is likely a bug\n  in redux-saga code and not yours. Thanks for reporting this in the project's github repo.\n  Error: " + err + "\n");
};
var createSetContextWarning = function createSetContextWarning(ctx, props) {
  return (ctx ? ctx + '.' : '') + "setContext(props): argument " + props + " is not a plain object";
};
var FROZEN_ACTION_ERROR = "You can't put (a.k.a. dispatch from saga) frozen actions.\nWe have to define a special non-enumerable property on those actions for scheduling purposes.\nOtherwise you wouldn't be able to communicate properly between sagas & other subscribers (action ordering would become far less predictable).\nIf you are using redux and you care about this behaviour (frozen actions),\nthen you might want to switch to freezing actions in a middleware rather than in action creator.\nExample implementation:\n\nconst freezeActions = store => next => action => next(Object.freeze(action))\n"; // creates empty, but not-holey array

var createEmptyArray = function createEmptyArray(n) {
  return Array.apply(null, new Array(n));
};
var chunk_585b854f_wrapSagaDispatch = function wrapSagaDispatch(dispatch) {
  return function (action) {
    if (false) {}

    return dispatch(Object.defineProperty(action, SAGA_ACTION, {
      value: true
    }));
  };
};
var chunk_585b854f_shouldTerminate = function shouldTerminate(res) {
  return res === TERMINATE;
};
var chunk_585b854f_shouldCancel = function shouldCancel(res) {
  return res === TASK_CANCEL;
};
var shouldComplete = function shouldComplete(res) {
  return chunk_585b854f_shouldTerminate(res) || chunk_585b854f_shouldCancel(res);
};
function createAllStyleChildCallbacks(shape, parentCallback) {
  var keys = Object.keys(shape);
  var totalCount = keys.length;

  if (false) {}

  var completedCount = 0;
  var completed;
  var results = array(shape) ? createEmptyArray(totalCount) : {};
  var childCallbacks = {};

  function checkEnd() {
    if (completedCount === totalCount) {
      completed = true;
      parentCallback(results);
    }
  }

  keys.forEach(function (key) {
    var chCbAtKey = function chCbAtKey(res, isErr) {
      if (completed) {
        return;
      }

      if (isErr || shouldComplete(res)) {
        parentCallback.cancel();
        parentCallback(res, isErr);
      } else {
        results[key] = res;
        completedCount++;
        checkEnd();
      }
    };

    chCbAtKey.cancel = noop;
    childCallbacks[key] = chCbAtKey;
  });

  parentCallback.cancel = function () {
    if (!completed) {
      completed = true;
      keys.forEach(function (key) {
        return childCallbacks[key].cancel();
      });
    }
  };

  return childCallbacks;
}
function getMetaInfo(fn) {
  return {
    name: fn.name || 'anonymous',
    location: getLocation(fn)
  };
}
function getLocation(instrumented) {
  return instrumented[SAGA_LOCATION];
}

var BUFFER_OVERFLOW = "Channel's Buffer overflow!";
var ON_OVERFLOW_THROW = 1;
var ON_OVERFLOW_DROP = 2;
var ON_OVERFLOW_SLIDE = 3;
var ON_OVERFLOW_EXPAND = 4;
var zeroBuffer = {
  isEmpty: kTrue,
  put: noop,
  take: noop
};

function ringBuffer(limit, overflowAction) {
  if (limit === void 0) {
    limit = 10;
  }

  var arr = new Array(limit);
  var length = 0;
  var pushIndex = 0;
  var popIndex = 0;

  var push = function push(it) {
    arr[pushIndex] = it;
    pushIndex = (pushIndex + 1) % limit;
    length++;
  };

  var take = function take() {
    if (length != 0) {
      var it = arr[popIndex];
      arr[popIndex] = null;
      length--;
      popIndex = (popIndex + 1) % limit;
      return it;
    }
  };

  var flush = function flush() {
    var items = [];

    while (length) {
      items.push(take());
    }

    return items;
  };

  return {
    isEmpty: function isEmpty() {
      return length == 0;
    },
    put: function put(it) {
      if (length < limit) {
        push(it);
      } else {
        var doubledLimit;

        switch (overflowAction) {
          case ON_OVERFLOW_THROW:
            throw new Error(BUFFER_OVERFLOW);

          case ON_OVERFLOW_SLIDE:
            arr[pushIndex] = it;
            pushIndex = (pushIndex + 1) % limit;
            popIndex = pushIndex;
            break;

          case ON_OVERFLOW_EXPAND:
            doubledLimit = 2 * limit;
            arr = flush();
            length = arr.length;
            pushIndex = arr.length;
            popIndex = 0;
            arr.length = doubledLimit;
            limit = doubledLimit;
            push(it);
            break;

          default: // DROP

        }
      }
    },
    take: take,
    flush: flush
  };
}

var none = function none() {
  return zeroBuffer;
};
var fixed = function fixed(limit) {
  return ringBuffer(limit, ON_OVERFLOW_THROW);
};
var dropping = function dropping(limit) {
  return ringBuffer(limit, ON_OVERFLOW_DROP);
};
var sliding = function sliding(limit) {
  return ringBuffer(limit, ON_OVERFLOW_SLIDE);
};
var expanding = function expanding(initialSize) {
  return ringBuffer(initialSize, ON_OVERFLOW_EXPAND);
};

var buffers = /*#__PURE__*/Object.freeze({
  none: none,
  fixed: fixed,
  dropping: dropping,
  sliding: sliding,
  expanding: expanding
});

var TAKE = 'TAKE';
var PUT = 'PUT';
var ALL = 'ALL';
var RACE = 'RACE';
var CALL = 'CALL';
var CPS = 'CPS';
var FORK = 'FORK';
var JOIN = 'JOIN';
var chunk_585b854f_CANCEL = 'CANCEL';
var SELECT = 'SELECT';
var ACTION_CHANNEL = 'ACTION_CHANNEL';
var CANCELLED = 'CANCELLED';
var FLUSH = 'FLUSH';
var GET_CONTEXT = 'GET_CONTEXT';
var SET_CONTEXT = 'SET_CONTEXT';

var effectTypes = /*#__PURE__*/Object.freeze({
  TAKE: TAKE,
  PUT: PUT,
  ALL: ALL,
  RACE: RACE,
  CALL: CALL,
  CPS: CPS,
  FORK: FORK,
  JOIN: JOIN,
  CANCEL: chunk_585b854f_CANCEL,
  SELECT: SELECT,
  ACTION_CHANNEL: ACTION_CHANNEL,
  CANCELLED: CANCELLED,
  FLUSH: FLUSH,
  GET_CONTEXT: GET_CONTEXT,
  SET_CONTEXT: SET_CONTEXT
});

var TEST_HINT = '\n(HINT: if you are getting this errors in tests, consider using createMockTask from @redux-saga/testing-utils)';

var chunk_585b854f_makeEffect = function makeEffect(type, payload) {
  var _ref;

  return _ref = {}, _ref[IO] = true, _ref.combinator = false, _ref.type = type, _ref.payload = payload, _ref;
};

var chunk_585b854f_isForkEffect = function isForkEffect(eff) {
  return eff && eff[IO] && eff.type === FORK;
};

var chunk_585b854f_detach = function detach(eff) {
  if (false) {}

  return chunk_585b854f_makeEffect(FORK, _extends({}, eff.payload, {
    detached: true
  }));
};
function take(patternOrChannel, multicastPattern) {
  if (patternOrChannel === void 0) {
    patternOrChannel = '*';
  }

  if (false) {}

  if (redux_saga_is_esm_pattern(patternOrChannel)) {
    return chunk_585b854f_makeEffect(TAKE, {
      pattern: patternOrChannel
    });
  }

  if (redux_saga_is_esm_multicast(patternOrChannel) && notUndef(multicastPattern) && redux_saga_is_esm_pattern(multicastPattern)) {
    return chunk_585b854f_makeEffect(TAKE, {
      channel: patternOrChannel,
      pattern: multicastPattern
    });
  }

  if (channel(patternOrChannel)) {
    return chunk_585b854f_makeEffect(TAKE, {
      channel: patternOrChannel
    });
  }

  throw new Error("take(patternOrChannel): argument " + patternOrChannel + " is not valid channel or a valid pattern");
}
var takeMaybe = function takeMaybe() {
  var eff = take.apply(void 0, arguments);
  eff.payload.maybe = true;
  return eff;
};
function put(channel$$1, action) {
  if (false) {}

  if (undef(action)) {
    action = channel$$1; // `undefined` instead of `null` to make default parameter work

    channel$$1 = undefined;
  }

  return chunk_585b854f_makeEffect(PUT, {
    channel: channel$$1,
    action: action
  });
}
var putResolve = function putResolve() {
  var eff = put.apply(void 0, arguments);
  eff.payload.resolve = true;
  return eff;
};
function chunk_585b854f_all(effects) {
  var eff = chunk_585b854f_makeEffect(ALL, effects);
  eff.combinator = true;
  return eff;
}
function race(effects) {
  var eff = chunk_585b854f_makeEffect(RACE, effects);
  eff.combinator = true;
  return eff;
} // this match getFnCallDescriptor logic

var chunk_585b854f_validateFnDescriptor = function validateFnDescriptor(effectName, fnDescriptor) {
  check(fnDescriptor, notUndef, effectName + ": argument fn is undefined or null");

  if (func(fnDescriptor)) {
    return;
  }

  var context = null;
  var fn;

  if (array(fnDescriptor)) {
    context = fnDescriptor[0];
    fn = fnDescriptor[1];
    check(fn, notUndef, effectName + ": argument of type [context, fn] has undefined or null `fn`");
  } else if (object(fnDescriptor)) {
    context = fnDescriptor.context;
    fn = fnDescriptor.fn;
    check(fn, notUndef, effectName + ": argument of type {context, fn} has undefined or null `fn`");
  } else {
    check(fnDescriptor, func, effectName + ": argument fn is not function");
    return;
  }

  if (context && string(fn)) {
    check(context[fn], func, effectName + ": context arguments has no such method - \"" + fn + "\"");
    return;
  }

  check(fn, func, effectName + ": unpacked fn argument (from [context, fn] or {context, fn}) is not a function");
};

function getFnCallDescriptor(fnDescriptor, args) {
  var context = null;
  var fn;

  if (func(fnDescriptor)) {
    fn = fnDescriptor;
  } else {
    if (array(fnDescriptor)) {
      context = fnDescriptor[0];
      fn = fnDescriptor[1];
    } else {
      context = fnDescriptor.context;
      fn = fnDescriptor.fn;
    }

    if (context && string(fn) && func(context[fn])) {
      fn = context[fn];
    }
  }

  return {
    context: context,
    fn: fn,
    args: args
  };
}

var isNotDelayEffect = function isNotDelayEffect(fn) {
  return fn !== delay;
};

function call(fnDescriptor) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (false) {}

  return chunk_585b854f_makeEffect(CALL, getFnCallDescriptor(fnDescriptor, args));
}
function apply(context, fn, args) {
  if (args === void 0) {
    args = [];
  }

  var fnDescriptor = [context, fn];

  if (false) {}

  return chunk_585b854f_makeEffect(CALL, getFnCallDescriptor([context, fn], args));
}
function cps(fnDescriptor) {
  if (false) {}

  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  return chunk_585b854f_makeEffect(CPS, getFnCallDescriptor(fnDescriptor, args));
}
function fork(fnDescriptor) {
  if (false) {}

  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return chunk_585b854f_makeEffect(FORK, getFnCallDescriptor(fnDescriptor, args));
}
function spawn(fnDescriptor) {
  if (false) {}

  for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  return chunk_585b854f_detach(fork.apply(void 0, [fnDescriptor].concat(args)));
}
function join(taskOrTasks) {
  if (false) {}

  return chunk_585b854f_makeEffect(JOIN, taskOrTasks);
}
function cancel(taskOrTasks) {
  if (taskOrTasks === void 0) {
    taskOrTasks = SELF_CANCELLATION;
  }

  if (false) {}

  return chunk_585b854f_makeEffect(chunk_585b854f_CANCEL, taskOrTasks);
}
function chunk_585b854f_select(selector) {
  if (selector === void 0) {
    selector = identity;
  }

  for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }

  if (false) {}

  return chunk_585b854f_makeEffect(SELECT, {
    selector: selector,
    args: args
  });
}
/**
  channel(pattern, [buffer])    => creates a proxy channel for store actions
**/

function actionChannel(pattern$$1, buffer$$1) {
  if (false) {}

  return chunk_585b854f_makeEffect(ACTION_CHANNEL, {
    pattern: pattern$$1,
    buffer: buffer$$1
  });
}
function cancelled() {
  return chunk_585b854f_makeEffect(CANCELLED, {});
}
function flush(channel$$1) {
  if (false) {}

  return chunk_585b854f_makeEffect(FLUSH, channel$$1);
}
function getContext(prop) {
  if (false) {}

  return chunk_585b854f_makeEffect(GET_CONTEXT, prop);
}
function setContext(props) {
  if (false) {}

  return chunk_585b854f_makeEffect(SET_CONTEXT, props);
}
var delay =
/*#__PURE__*/
call.bind(null, redux_saga_delay_p_esm);



// CONCATENATED MODULE: ./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js







var done = function done(value) {
  return {
    done: true,
    value: value
  };
};

var qEnd = {};
function safeName(patternOrChannel) {
  if (channel(patternOrChannel)) {
    return 'channel';
  }

  if (stringableFunc(patternOrChannel)) {
    return String(patternOrChannel);
  }

  if (func(patternOrChannel)) {
    return patternOrChannel.name;
  }

  return String(patternOrChannel);
}
function fsmIterator(fsm, startState, name) {
  var stateUpdater,
      errorState,
      effect,
      nextState = startState;

  function next(arg, error) {
    if (nextState === qEnd) {
      return done(arg);
    }

    if (error && !errorState) {
      nextState = qEnd;
      throw error;
    } else {
      stateUpdater && stateUpdater(arg);
      var currentState = error ? fsm[errorState](error) : fsm[nextState]();
      nextState = currentState.nextState;
      effect = currentState.effect;
      stateUpdater = currentState.stateUpdater;
      errorState = currentState.errorState;
      return nextState === qEnd ? done(arg) : effect;
    }
  }

  return makeIterator(next, function (error) {
    return next(null, error);
  }, name);
}

function takeEvery(patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var yTake = {
    done: false,
    value: take(patternOrChannel)
  };

  var yFork = function yFork(ac) {
    return {
      done: false,
      value: fork.apply(void 0, [worker].concat(args, [ac]))
    };
  };

  var action,
      setAction = function setAction(ac) {
    return action = ac;
  };

  return fsmIterator({
    q1: function q1() {
      return {
        nextState: 'q2',
        effect: yTake,
        stateUpdater: setAction
      };
    },
    q2: function q2() {
      return {
        nextState: 'q1',
        effect: yFork(action)
      };
    }
  }, 'q1', "takeEvery(" + safeName(patternOrChannel) + ", " + worker.name + ")");
}

function takeLatest(patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var yTake = {
    done: false,
    value: take(patternOrChannel)
  };

  var yFork = function yFork(ac) {
    return {
      done: false,
      value: fork.apply(void 0, [worker].concat(args, [ac]))
    };
  };

  var yCancel = function yCancel(task) {
    return {
      done: false,
      value: cancel(task)
    };
  };

  var task, action;

  var setTask = function setTask(t) {
    return task = t;
  };

  var setAction = function setAction(ac) {
    return action = ac;
  };

  return fsmIterator({
    q1: function q1() {
      return {
        nextState: 'q2',
        effect: yTake,
        stateUpdater: setAction
      };
    },
    q2: function q2() {
      return task ? {
        nextState: 'q3',
        effect: yCancel(task)
      } : {
        nextState: 'q1',
        effect: yFork(action),
        stateUpdater: setTask
      };
    },
    q3: function q3() {
      return {
        nextState: 'q1',
        effect: yFork(action),
        stateUpdater: setTask
      };
    }
  }, 'q1', "takeLatest(" + safeName(patternOrChannel) + ", " + worker.name + ")");
}

function takeLeading(patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var yTake = {
    done: false,
    value: take(patternOrChannel)
  };

  var yCall = function yCall(ac) {
    return {
      done: false,
      value: call.apply(void 0, [worker].concat(args, [ac]))
    };
  };

  var action;

  var setAction = function setAction(ac) {
    return action = ac;
  };

  return fsmIterator({
    q1: function q1() {
      return {
        nextState: 'q2',
        effect: yTake,
        stateUpdater: setAction
      };
    },
    q2: function q2() {
      return {
        nextState: 'q1',
        effect: yCall(action)
      };
    }
  }, 'q1', "takeLeading(" + safeName(patternOrChannel) + ", " + worker.name + ")");
}

function throttle(delayLength, pattern, worker) {
  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  var action, channel$$1;
  var yActionChannel = {
    done: false,
    value: actionChannel(pattern, sliding(1))
  };

  var yTake = function yTake() {
    return {
      done: false,
      value: take(channel$$1)
    };
  };

  var yFork = function yFork(ac) {
    return {
      done: false,
      value: fork.apply(void 0, [worker].concat(args, [ac]))
    };
  };

  var yDelay = {
    done: false,
    value: delay(delayLength)
  };

  var setAction = function setAction(ac) {
    return action = ac;
  };

  var setChannel = function setChannel(ch) {
    return channel$$1 = ch;
  };

  return fsmIterator({
    q1: function q1() {
      return {
        nextState: 'q2',
        effect: yActionChannel,
        stateUpdater: setChannel
      };
    },
    q2: function q2() {
      return {
        nextState: 'q3',
        effect: yTake(),
        stateUpdater: setAction
      };
    },
    q3: function q3() {
      return {
        nextState: 'q4',
        effect: yFork(action)
      };
    },
    q4: function q4() {
      return {
        nextState: 'q2',
        effect: yDelay
      };
    }
  }, 'q1', "throttle(" + safeName(pattern) + ", " + worker.name + ")");
}

function retry(maxTries, delayLength, fn) {
  var counter = maxTries;

  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  var yCall = {
    done: false,
    value: call.apply(void 0, [fn].concat(args))
  };
  var yDelay = {
    done: false,
    value: delay(delayLength)
  };
  return fsmIterator({
    q1: function q1() {
      return {
        nextState: 'q2',
        effect: yCall,
        errorState: 'q10'
      };
    },
    q2: function q2() {
      return {
        nextState: qEnd
      };
    },
    q10: function q10(error) {
      counter -= 1;

      if (counter <= 0) {
        throw error;
      }

      return {
        nextState: 'q1',
        effect: yDelay
      };
    }
  }, 'q1', "retry(" + fn.name + ")");
}

function debounceHelper(delayLength, patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  var action, raceOutput;
  var yTake = {
    done: false,
    value: take(patternOrChannel)
  };
  var yRace = {
    done: false,
    value: race({
      action: take(patternOrChannel),
      debounce: delay(delayLength)
    })
  };

  var yFork = function yFork(ac) {
    return {
      done: false,
      value: fork.apply(void 0, [worker].concat(args, [ac]))
    };
  };

  var yNoop = function yNoop(value) {
    return {
      done: false,
      value: value
    };
  };

  var setAction = function setAction(ac) {
    return action = ac;
  };

  var setRaceOutput = function setRaceOutput(ro) {
    return raceOutput = ro;
  };

  return fsmIterator({
    q1: function q1() {
      return {
        nextState: 'q2',
        effect: yTake,
        stateUpdater: setAction
      };
    },
    q2: function q2() {
      return {
        nextState: 'q3',
        effect: yRace,
        stateUpdater: setRaceOutput
      };
    },
    q3: function q3() {
      return raceOutput.debounce ? {
        nextState: 'q1',
        effect: yFork(action)
      } : {
        nextState: 'q2',
        effect: yNoop(raceOutput.action),
        stateUpdater: setAction
      };
    }
  }, 'q1', "debounce(" + safeName(patternOrChannel) + ", " + worker.name + ")");
}

var redux_saga_effects_esm_validateTakeEffect = function validateTakeEffect(fn, patternOrChannel, worker) {
  check(patternOrChannel, notUndef, fn.name + " requires a pattern or channel");
  check(worker, notUndef, fn.name + " requires a saga parameter");
};

function takeEvery$1(patternOrChannel, worker) {
  if (false) {}

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return fork.apply(void 0, [takeEvery, patternOrChannel, worker].concat(args));
}
function takeLatest$1(patternOrChannel, worker) {
  if (false) {}

  for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }

  return fork.apply(void 0, [takeLatest, patternOrChannel, worker].concat(args));
}
function takeLeading$1(patternOrChannel, worker) {
  if (false) {}

  for (var _len3 = arguments.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
    args[_key3 - 2] = arguments[_key3];
  }

  return fork.apply(void 0, [takeLeading, patternOrChannel, worker].concat(args));
}
function throttle$1(ms, pattern, worker) {
  if (false) {}

  for (var _len4 = arguments.length, args = new Array(_len4 > 3 ? _len4 - 3 : 0), _key4 = 3; _key4 < _len4; _key4++) {
    args[_key4 - 3] = arguments[_key4];
  }

  return fork.apply(void 0, [throttle, ms, pattern, worker].concat(args));
}
function retry$1(maxTries, delayLength, worker) {
  for (var _len5 = arguments.length, args = new Array(_len5 > 3 ? _len5 - 3 : 0), _key5 = 3; _key5 < _len5; _key5++) {
    args[_key5 - 3] = arguments[_key5];
  }

  return call.apply(void 0, [retry, maxTries, delayLength, worker].concat(args));
}
function debounce(delayLength, pattern, worker) {
  for (var _len6 = arguments.length, args = new Array(_len6 > 3 ? _len6 - 3 : 0), _key6 = 3; _key6 < _len6; _key6++) {
    args[_key6 - 3] = arguments[_key6];
  }

  return fork.apply(void 0, [debounceHelper, delayLength, pattern, worker].concat(args));
}



// CONCATENATED MODULE: ./node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.esm.js


// CONCATENATED MODULE: ./lib/js/app/redux/sagas/index.js
var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(fetchProject),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(sagas_fetchSchema),
    _marked3 =
/*#__PURE__*/
regeneratorRuntime.mark(sagas_fetchRecentEvents),
    _marked4 =
/*#__PURE__*/
regeneratorRuntime.mark(query),
    _marked5 =
/*#__PURE__*/
regeneratorRuntime.mark(saveQuery),
    _marked6 =
/*#__PURE__*/
regeneratorRuntime.mark(deleteQuery),
    _marked7 =
/*#__PURE__*/
regeneratorRuntime.mark(fetchSavedQueries),
    _marked8 =
/*#__PURE__*/
regeneratorRuntime.mark(watchFetchProject),
    _marked9 =
/*#__PURE__*/
regeneratorRuntime.mark(rootSaga);




function fetchProject() {
  var url, responseBody;
  return regeneratorRuntime.wrap(function fetchProject$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          url = app_client.url('/3.0/projects/{projectId}', {
            api_key: app_client.config.masterKey
          });
          _context.next = 4;
          return fetch(url).then(function (response) {
            return response.json();
          });

        case 4:
          responseBody = _context.sent;
          _context.next = 7;
          return put({
            type: 'CLIENT_FETCH_PROJECT_SUCCESS',
            payload: responseBody
          });

        case 7:
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          _context.next = 13;
          return put({
            type: 'CLIENT_FETCH_PROJECT_ERROR',
            payload: _context.t0
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[0, 9]]);
}

function sagas_fetchSchema(_ref) {
  var payload, url, responseBody;
  return regeneratorRuntime.wrap(function fetchSchema$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          payload = _ref.payload;
          _context2.prev = 1;
          url = app_client.url("/3.0/projects/{projectId}/events/".concat(payload.eventCollection), {
            api_key: app_client.config.masterKey
          });
          _context2.next = 5;
          return fetch(url).then(function (response) {
            return response.json();
          });

        case 5:
          responseBody = _context2.sent;
          _context2.next = 8;
          return put({
            type: 'CLIENT_FETCH_SCHEMA_SUCCESS',
            eventCollection: payload.eventCollection,
            payload: responseBody
          });

        case 8:
          _context2.next = 14;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](1);
          _context2.next = 14;
          return put({
            type: 'CLIENT_FETCH_SCHEMA_ERROR',
            payload: _context2.t0
          });

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, null, [[1, 10]]);
}

function sagas_fetchRecentEvents(_ref2) {
  var payload, responseBody;
  return regeneratorRuntime.wrap(function fetchRecentEvents$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          payload = _ref2.payload;
          _context3.prev = 1;
          _context3.next = 4;
          return app_client.query({
            analysisType: 'extraction',
            eventCollection: payload.eventCollection,
            latest: 10
          });

        case 4:
          responseBody = _context3.sent;
          _context3.next = 7;
          return put({
            type: 'CLIENT_FETCH_RECENT_EVENTS_SUCCESS',
            eventCollection: payload.eventCollection,
            payload: responseBody
          });

        case 7:
          _context3.next = 13;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](1);
          _context3.next = 13;
          return put({
            type: 'CLIENT_FETCH_RECENT_EVENTS_ERROR',
            payload: _context3.t0
          });

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, null, [[1, 9]]);
}

function query(_ref3) {
  var payload, responseBody;
  return regeneratorRuntime.wrap(function query$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          payload = _ref3.payload;
          _context4.prev = 1;
          _context4.next = 4;
          return app_client.query(payload);

        case 4:
          responseBody = _context4.sent;
          _context4.next = 7;
          return put({
            type: 'CLIENT_RUN_QUERY_SUCCESS',
            payload: responseBody
          });

        case 7:
          _context4.next = 13;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](1);
          _context4.next = 13;
          return put({
            type: 'CLIENT_RUN_QUERY_ERROR',
            payload: _context4.t0
          });

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, null, [[1, 9]]);
}

function saveQuery(_ref4) {
  var payload, name, body, responseBody;
  return regeneratorRuntime.wrap(function saveQuery$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          payload = _ref4.payload;
          _context5.prev = 1;
          name = payload.name, body = payload.body;
          _context5.next = 5;
          return app_client.put(app_client.url('queries', 'saved', name)).auth(app_client.masterKey()).send(body);

        case 5:
          responseBody = _context5.sent;
          _context5.next = 8;
          return put({
            type: 'CLIENT_SAVE_QUERY_SUCCESS',
            payload: responseBody
          });

        case 8:
          _context5.next = 14;
          break;

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](1);
          _context5.next = 14;
          return put({
            type: 'CLIENT_SAVE_QUERY_ERROR',
            payload: _context5.t0
          });

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5, null, [[1, 10]]);
}

function deleteQuery(_ref5) {
  var payload, name;
  return regeneratorRuntime.wrap(function deleteQuery$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          payload = _ref5.payload;
          _context6.prev = 1;
          name = payload.name;
          _context6.next = 5;
          return app_client.del(app_client.url('queries', 'saved', name)).auth(app_client.masterKey()).send();

        case 5:
          _context6.next = 7;
          return put({
            type: 'RESET_SAVED_QUERY_UI'
          });

        case 7:
          _context6.next = 9;
          return put({
            type: 'CLIENT_DELETE_QUERY_SUCCESS',
            payload: payload
          });

        case 9:
          _context6.next = 15;
          break;

        case 11:
          _context6.prev = 11;
          _context6.t0 = _context6["catch"](1);
          _context6.next = 15;
          return put({
            type: 'CLIENT_RUN_QUERY_ERROR',
            payload: _context6.t0
          });

        case 15:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6, null, [[1, 11]]);
}

function fetchSavedQueries() {
  var responseBody;
  return regeneratorRuntime.wrap(function fetchSavedQueries$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return app_client.get(app_client.url('queries', 'saved')).auth(app_client.masterKey()).send();

        case 3:
          responseBody = _context7.sent;
          _context7.next = 6;
          return put({
            type: 'CLIENT_FETCH_SAVED_QUERIES_SUCCESS',
            payload: responseBody
          });

        case 6:
          _context7.next = 12;
          break;

        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          _context7.next = 12;
          return put({
            type: 'CLIENT_SAVE_QUERY_ERROR',
            payload: _context7.t0
          });

        case 12:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked7, null, [[0, 8]]);
}

function watchFetchProject() {
  return regeneratorRuntime.wrap(function watchFetchProject$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return takeLatest$1('CLIENT_FETCH_PROJECT', fetchProject);

        case 2:
          _context8.next = 4;
          return takeLatest$1('CLIENT_FETCH_SCHEMA', sagas_fetchSchema);

        case 4:
          _context8.next = 6;
          return takeLatest$1('CHANGE_EVENT_COLLECTION', sagas_fetchSchema);

        case 6:
          _context8.next = 8;
          return takeLatest$1('CLIENT_FETCH_RECENT_EVENTS', sagas_fetchRecentEvents);

        case 8:
          _context8.next = 10;
          return takeLatest$1('CLIENT_RUN_QUERY', query);

        case 10:
          _context8.next = 12;
          return takeLatest$1('CLIENT_SAVE_QUERY', saveQuery);

        case 12:
          _context8.next = 14;
          return takeLatest$1('CLIENT_DELETE_QUERY', deleteQuery);

        case 14:
          _context8.next = 16;
          return takeLatest$1(['CLIENT_FETCH_SAVED_QUERIES', 'CLIENT_SAVE_QUERY_SUCCESS', 'CLIENT_DELETE_SAVED_QUERY_SUCCESS'], fetchSavedQueries);

        case 16:
        case "end":
          return _context8.stop();
      }
    }
  }, _marked8);
}
function rootSaga() {
  return regeneratorRuntime.wrap(function rootSaga$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return chunk_585b854f_all([watchFetchProject()]);

        case 2:
        case "end":
          return _context9.stop();
      }
    }
  }, _marked9);
}
// EXTERNAL MODULE: ./package.json
var package_0 = __webpack_require__(164);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(165);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// EXTERNAL MODULE: external "react-select"
var external_react_select_ = __webpack_require__(8);
var external_react_select_default = /*#__PURE__*/__webpack_require__.n(external_react_select_);

// EXTERNAL MODULE: external "react-modal"
var external_react_modal_ = __webpack_require__(60);
var external_react_modal_default = /*#__PURE__*/__webpack_require__.n(external_react_modal_);

// EXTERNAL MODULE: ./node_modules/csv-parse/lib/es5/sync.js
var sync = __webpack_require__(166);
var sync_default = /*#__PURE__*/__webpack_require__.n(sync);

// CONCATENATED MODULE: ./lib/js/app/utils/style.js
function style_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { style_defineProperty(target, key, source[key]); }); } return target; }

function style_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getThemeForSelect = function getThemeForSelect(theme) {
  return style_objectSpread({}, theme, {
    colors: style_objectSpread({}, theme.colors, {
      primary25: '#f4f6f7',
      primary: '#00bbde'
    })
  });
};
// CONCATENATED MODULE: ./lib/js/app/components/explorer/shared/Option.js
function Option_extends() { Option_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Option_extends.apply(this, arguments); }

function Option_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = Option_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function Option_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }



var Option_Option = function Option(props) {
  // Fix https://github.com/JedWatson/react-select/issues/3128#issuecomment-439207355
  var _props$innerProps = props.innerProps,
      onMouseMove = _props$innerProps.onMouseMove,
      onMouseOver = _props$innerProps.onMouseOver,
      newInnerProps = Option_objectWithoutProperties(_props$innerProps, ["onMouseMove", "onMouseOver"]);

  return external_react_default.a.createElement("div", Option_extends({
    className: "react-select-option",
    selected: props.isFocused,
    style: {}
  }, newInnerProps), props.children);
};

/* harmony default export */ var shared_Option = (Option_Option);
// CONCATENATED MODULE: ./lib/js/app/components/explorer/shared/ReactSelect.js
function ReactSelect_extends() { ReactSelect_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return ReactSelect_extends.apply(this, arguments); }





var ReactSelect_ReactSelect = function ReactSelect(props) {
  if (props.options.length > 200) {
    return external_react_default.a.createElement(external_react_select_default.a, ReactSelect_extends({
      components: {
        Option: shared_Option
      },
      filterOption: Object(external_react_select_["createFilter"])({
        ignoreAccents: false
      })
    }, props));
  }

  return external_react_default.a.createElement(external_react_select_default.a, props);
};

/* harmony default export */ var shared_ReactSelect = (ReactSelect_ReactSelect);
// CONCATENATED MODULE: ./lib/js/app/redux/actionCreators/ui.js
var ui_updateUI = function updateUI(payload) {
  return {
    type: 'UI_UPDATE',
    payload: payload
  };
};
var ui_updateStepUI = function updateStepUI(_ref) {
  var step = _ref.step,
      payload = _ref.payload,
      _ref$rootPayload = _ref.rootPayload,
      rootPayload = _ref$rootPayload === void 0 ? {} : _ref$rootPayload;
  return {
    type: 'UI_STEP_UPDATE',
    step: step,
    payload: payload,
    rootPayload: rootPayload
  };
};
var ui_changeEventCollection = function changeEventCollection(payload) {
  return {
    type: 'CHANGE_EVENT_COLLECTION',
    payload: payload
  };
};
var updateSavedQueryUI = function updateSavedQueryUI(payload) {
  return {
    type: 'UPDATE_SAVED_QUERY_UI',
    payload: payload
  };
};
var resetSavedQueryUI = function resetSavedQueryUI(payload) {
  return {
    type: 'RESET_SAVED_QUERY_UI',
    payload: payload
  };
};
var ui_resetUI = function resetUI() {
  return {
    type: 'RESET_UI'
  };
};
var ui_addFilter = function addFilter() {
  return {
    type: 'ADD_FILTER'
  };
};
var ui_deleteFilter = function deleteFilter(payload) {
  return {
    type: 'DELETE_FILTER',
    payload: payload
  };
};
var ui_updateFilter = function updateFilter(payload) {
  return {
    type: 'UPDATE_FILTER',
    payload: payload
  };
};
var ui_addStepFilter = function addStepFilter(_ref2) {
  var step = _ref2.step,
      payload = _ref2.payload;
  return {
    type: 'ADD_STEP_FILTER',
    step: step,
    payload: payload
  };
};
var ui_deleteStepFilter = function deleteStepFilter(_ref3) {
  var step = _ref3.step,
      payload = _ref3.payload;
  return {
    type: 'DELETE_STEP_FILTER',
    step: step,
    payload: payload
  };
};
var ui_updateStepFilter = function updateStepFilter(_ref4) {
  var step = _ref4.step,
      payload = _ref4.payload;
  return {
    type: 'UPDATE_STEP_FILTER',
    step: step,
    payload: payload
  };
};
var ui_togglePanelSave = function togglePanelSave() {
  return {
    type: 'TOGGLE_PANEL_SAVE'
  };
};
var ui_addStep = function addStep() {
  return {
    type: 'ADD_STEP'
  };
};
var ui_deleteStep = function deleteStep(payload) {
  return {
    type: 'DELETE_STEP',
    payload: payload
  };
};
// CONCATENATED MODULE: ./lib/js/app/components/explorer/SelectTargetProperty.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var mapStateToProps = function mapStateToProps(state
/*, ownProps*/
) {
  return {
    schemas: state.collections.schemas,
    eventCollection: state.ui.eventCollection
  };
};

var mapDispatchToProps = {
  updateUI: ui_updateUI
};

var SelectTargetProperty_SelectTargetProperty =
/*#__PURE__*/
function (_Component) {
  _inherits(SelectTargetProperty, _Component);

  function SelectTargetProperty() {
    _classCallCheck(this, SelectTargetProperty);

    return _possibleConstructorReturn(this, _getPrototypeOf(SelectTargetProperty).apply(this, arguments));
  }

  _createClass(SelectTargetProperty, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          schemas = _this$props.schemas,
          eventCollection = _this$props.eventCollection,
          updateUI = _this$props.updateUI;
      var schema = schemas[eventCollection] || {};
      return external_react_default.a.createElement(external_react_["Fragment"], null, external_react_default.a.createElement("div", {
        className: "label-main"
      }, "Target property"), external_react_default.a.createElement(shared_ReactSelect, {
        value: this.props.value,
        options: Object.keys(schema).map(function (item) {
          return {
            label: item,
            value: item
          };
        }),
        onChange: function onChange(value) {
          updateUI({
            targetProperty: value.value
          });
        },
        theme: getThemeForSelect
      }));
    }
  }]);

  return SelectTargetProperty;
}(external_react_["Component"]);

/* harmony default export */ var explorer_SelectTargetProperty = (Object(external_react_redux_["connect"])(mapStateToProps, mapDispatchToProps)(SelectTargetProperty_SelectTargetProperty));
// CONCATENATED MODULE: ./lib/js/app/redux/actionCreators/client.js
var client_fetchProject = function fetchProject() {
  return {
    type: 'CLIENT_FETCH_PROJECT'
  };
};
var client_query = function query(payload) {
  return {
    type: 'CLIENT_RUN_QUERY',
    payload: payload
  };
};
var client_fetchSchema = function fetchSchema(payload) {
  return {
    type: 'CLIENT_FETCH_SCHEMA',
    payload: payload
  };
};
var client_fetchRecentEvents = function fetchRecentEvents(payload) {
  return {
    type: 'CLIENT_FETCH_RECENT_EVENTS',
    payload: payload
  };
};
var client_saveQuery = function saveQuery(payload) {
  return {
    type: 'CLIENT_SAVE_QUERY',
    payload: payload
  };
};
var client_deleteQuery = function deleteQuery(payload) {
  return {
    type: 'CLIENT_DELETE_QUERY',
    payload: payload
  };
};
var client_fetchSavedQueries = function fetchSavedQueries() {
  return {
    type: 'CLIENT_FETCH_SAVED_QUERIES'
  };
};
// CONCATENATED MODULE: ./lib/js/app/components/explorer/EventCollection.js
function EventCollection_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { EventCollection_typeof = function _typeof(obj) { return typeof obj; }; } else { EventCollection_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return EventCollection_typeof(obj); }

function EventCollection_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function EventCollection_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function EventCollection_createClass(Constructor, protoProps, staticProps) { if (protoProps) EventCollection_defineProperties(Constructor.prototype, protoProps); if (staticProps) EventCollection_defineProperties(Constructor, staticProps); return Constructor; }

function EventCollection_possibleConstructorReturn(self, call) { if (call && (EventCollection_typeof(call) === "object" || typeof call === "function")) { return call; } return EventCollection_assertThisInitialized(self); }

function EventCollection_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function EventCollection_getPrototypeOf(o) { EventCollection_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return EventCollection_getPrototypeOf(o); }

function EventCollection_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) EventCollection_setPrototypeOf(subClass, superClass); }

function EventCollection_setPrototypeOf(o, p) { EventCollection_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return EventCollection_setPrototypeOf(o, p); }








var EventCollection_mapStateToProps = function mapStateToProps(state) {
  return {
    collections: state.collections,
    eventCollection: state.ui.eventCollection,
    steps: state.ui.steps,
    schemas: state.collections.schemas
  };
};

var EventCollection_mapDispatchToProps = {
  fetchSchema: client_fetchSchema,
  changeEventCollection: ui_changeEventCollection,
  updateUI: ui_updateUI,
  updateStepUI: ui_updateStepUI
};

var EventCollection_EventCollection =
/*#__PURE__*/
function (_Component) {
  EventCollection_inherits(EventCollection, _Component);

  function EventCollection() {
    EventCollection_classCallCheck(this, EventCollection);

    return EventCollection_possibleConstructorReturn(this, EventCollection_getPrototypeOf(EventCollection).apply(this, arguments));
  }

  EventCollection_createClass(EventCollection, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          funnel = _this$props.funnel,
          step = _this$props.step,
          collections = _this$props.collections,
          steps = _this$props.steps,
          fetchSchema = _this$props.fetchSchema,
          changeEventCollection = _this$props.changeEventCollection,
          updateUI = _this$props.updateUI,
          updateStepUI = _this$props.updateStepUI;
      var _this$props2 = this.props,
          eventCollection = _this$props2.eventCollection,
          saveStateToLocalStorage = _this$props2.saveStateToLocalStorage;

      if (funnel) {
        eventCollection = steps[step].eventCollection;
      }

      return external_react_default.a.createElement("div", {
        className: "event-collection"
      }, external_react_default.a.createElement("div", {
        className: "label-main"
      }, "Event collection"), external_react_default.a.createElement(external_react_select_default.a, {
        value: {
          label: eventCollection,
          value: eventCollection
        },
        options: collections.items.map(function (item) {
          return {
            label: item.name,
            value: item.url
          };
        }),
        onChange: function onChange(e) {
          if (saveStateToLocalStorage && localStorage) {
            localStorage.setItem('eventCollection', e.label);
          }

          if (funnel) {
            // funnel step
            fetchSchema({
              eventCollection: e.label,
              step: step,
              funnel: funnel
            });
            updateStepUI({
              step: step,
              payload: {
                eventCollection: e.label,
                actorProperty: undefined,
                filters: []
              }
            });
            return;
          }

          changeEventCollection({
            eventCollection: e.label
          });
        },
        theme: getThemeForSelect
      }));
    }
  }]);

  return EventCollection;
}(external_react_["Component"]);

/* harmony default export */ var explorer_EventCollection = (Object(external_react_redux_["connect"])(EventCollection_mapStateToProps, EventCollection_mapDispatchToProps)(EventCollection_EventCollection));
// EXTERNAL MODULE: external "react-json-view"
var external_react_json_view_ = __webpack_require__(57);
var external_react_json_view_default = /*#__PURE__*/__webpack_require__.n(external_react_json_view_);

// CONCATENATED MODULE: ./lib/js/app/components/explorer/shared/FilteredList.js
function FilteredList_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { FilteredList_typeof = function _typeof(obj) { return typeof obj; }; } else { FilteredList_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return FilteredList_typeof(obj); }

function FilteredList_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function FilteredList_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function FilteredList_createClass(Constructor, protoProps, staticProps) { if (protoProps) FilteredList_defineProperties(Constructor.prototype, protoProps); if (staticProps) FilteredList_defineProperties(Constructor, staticProps); return Constructor; }

function FilteredList_possibleConstructorReturn(self, call) { if (call && (FilteredList_typeof(call) === "object" || typeof call === "function")) { return call; } return FilteredList_assertThisInitialized(self); }

function FilteredList_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function FilteredList_getPrototypeOf(o) { FilteredList_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return FilteredList_getPrototypeOf(o); }

function FilteredList_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) FilteredList_setPrototypeOf(subClass, superClass); }

function FilteredList_setPrototypeOf(o, p) { FilteredList_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return FilteredList_setPrototypeOf(o, p); }



var FilteredList_FilteredList =
/*#__PURE__*/
function (_Component) {
  FilteredList_inherits(FilteredList, _Component);

  function FilteredList(props) {
    var _this;

    FilteredList_classCallCheck(this, FilteredList);

    _this = FilteredList_possibleConstructorReturn(this, FilteredList_getPrototypeOf(FilteredList).call(this, props));
    _this.state = {
      filter: ''
    };
    return _this;
  }

  FilteredList_createClass(FilteredList, [{
    key: "updateFilter",
    value: function updateFilter(e) {
      this.setState({
        filter: e.target.value
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          items = _this$props.items,
          activeItem = _this$props.activeItem;
      var filter = this.state.filter;
      return external_react_default.a.createElement("div", {
        className: "filtered-list"
      }, external_react_default.a.createElement("input", {
        className: "input-filter",
        placeholder: "Search...",
        type: "text",
        value: filter,
        onChange: function onChange(e) {
          return _this2.updateFilter(e);
        }
      }), items.filter(function (item) {
        return item.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      }).map(function (_ref) {
        var name = _ref.name;
        return external_react_default.a.createElement("div", {
          key: name,
          className: "item ".concat(activeItem === name && 'active'),
          onClick: function onClick() {
            _this2.props.onClick(name);
          }
        }, name);
      }));
    }
  }]);

  return FilteredList;
}(external_react_["Component"]);

/* harmony default export */ var shared_FilteredList = (FilteredList_FilteredList);
// CONCATENATED MODULE: ./lib/js/app/components/explorer/shared/LoadingSpinner.js
function LoadingSpinner_extends() { LoadingSpinner_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return LoadingSpinner_extends.apply(this, arguments); }



var LoadingSpinner_LoadingSpinner = function LoadingSpinner(props) {
  return external_react_default.a.createElement("div", LoadingSpinner_extends({
    className: "loading-spinner"
  }, props), external_react_default.a.createElement("i", {
    className: "fas fa-cog fa-spin"
  }));
};

/* harmony default export */ var shared_LoadingSpinner = (LoadingSpinner_LoadingSpinner);
// CONCATENATED MODULE: ./lib/js/app/components/explorer/PreviewCollection.js
function PreviewCollection_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { PreviewCollection_typeof = function _typeof(obj) { return typeof obj; }; } else { PreviewCollection_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return PreviewCollection_typeof(obj); }

function PreviewCollection_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function PreviewCollection_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function PreviewCollection_createClass(Constructor, protoProps, staticProps) { if (protoProps) PreviewCollection_defineProperties(Constructor.prototype, protoProps); if (staticProps) PreviewCollection_defineProperties(Constructor, staticProps); return Constructor; }

function PreviewCollection_possibleConstructorReturn(self, call) { if (call && (PreviewCollection_typeof(call) === "object" || typeof call === "function")) { return call; } return PreviewCollection_assertThisInitialized(self); }

function PreviewCollection_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function PreviewCollection_getPrototypeOf(o) { PreviewCollection_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return PreviewCollection_getPrototypeOf(o); }

function PreviewCollection_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) PreviewCollection_setPrototypeOf(subClass, superClass); }

function PreviewCollection_setPrototypeOf(o, p) { PreviewCollection_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return PreviewCollection_setPrototypeOf(o, p); }









var PreviewCollection_mapStateToProps = function mapStateToProps(state) {
  return {
    collectionItems: state.collections.items,
    schemas: state.collections.schemas,
    recentEvents: state.collections.recentEvents,
    eventCollection: state.ui.eventCollection,
    fetchingSchema: state.collections.fetchingSchema,
    fetchingRecentEvents: state.collections.fetchingRecentEvents
  };
};

var PreviewCollection_mapDispatchToProps = {
  updateUI: ui_updateUI,
  fetchSchema: client_fetchSchema,
  fetchRecentEvents: client_fetchRecentEvents
};
var TAB_EVENTS = 0;
var TAB_SCHEMA = 1;

var PreviewCollection_PreviewCollection =
/*#__PURE__*/
function (_Component) {
  PreviewCollection_inherits(PreviewCollection, _Component);

  function PreviewCollection(props) {
    var _this;

    PreviewCollection_classCallCheck(this, PreviewCollection);

    _this = PreviewCollection_possibleConstructorReturn(this, PreviewCollection_getPrototypeOf(PreviewCollection).call(this, props));
    _this.state = {
      activeTab: TAB_SCHEMA
    };
    return _this;
  }

  PreviewCollection_createClass(PreviewCollection, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var eventCollection = this.props.eventCollection;

      if (eventCollection) {
        client_fetchSchema({
          eventCollection: eventCollection
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          eventCollection = _this$props.eventCollection,
          collectionItems = _this$props.collectionItems,
          schemas = _this$props.schemas,
          recentEvents = _this$props.recentEvents,
          fetchingSchema = _this$props.fetchingSchema,
          fetchingRecentEvents = _this$props.fetchingRecentEvents,
          fetchSchema = _this$props.fetchSchema,
          updateUI = _this$props.updateUI,
          fetchRecentEvents = _this$props.fetchRecentEvents;
      var activeTab = this.state.activeTab;
      var isFetching = fetchingSchema || fetchingRecentEvents;
      var currentSchema = schemas[eventCollection] || {};
      return external_react_default.a.createElement("div", {
        className: "preview-collection-content"
      }, external_react_default.a.createElement("div", {
        className: "list"
      }, external_react_default.a.createElement(shared_FilteredList, {
        items: collectionItems,
        activeItem: eventCollection,
        onClick: function onClick(name) {
          updateUI({
            eventCollection: name
          });
          fetchSchema({
            eventCollection: name
          });
        }
      })), external_react_default.a.createElement("div", {
        className: "content"
      }, external_react_default.a.createElement("div", {
        className: "tabs"
      }, external_react_default.a.createElement("div", {
        className: "tab ".concat(activeTab === TAB_SCHEMA ? 'active' : ''),
        onClick: function onClick() {
          _this2.setState({
            activeTab: TAB_SCHEMA
          });
        }
      }, "Schema"), external_react_default.a.createElement("div", {
        className: "tab ".concat(activeTab === TAB_EVENTS ? 'active' : ''),
        onClick: function onClick() {
          _this2.setState({
            activeTab: TAB_EVENTS
          }, function () {
            fetchRecentEvents({
              eventCollection: eventCollection
            });
          });
        }
      }, "Recent Events"), external_react_default.a.createElement("div", {
        className: "tab-placeholder"
      })), external_react_default.a.createElement("div", {
        className: "tab-content"
      }, isFetching && external_react_default.a.createElement(shared_LoadingSpinner, null), !isFetching && activeTab === TAB_SCHEMA && external_react_default.a.createElement(external_react_json_view_default.a, {
        src: currentSchema,
        style: {
          'fontFamily': 'inherit'
        },
        collapsed: false,
        displayDataTypes: false,
        sortKeys: true
      }), !isFetching && activeTab === TAB_EVENTS && external_react_default.a.createElement(external_react_json_view_default.a, {
        src: recentEvents,
        style: {
          'fontFamily': 'inherit'
        },
        collapsed: false,
        displayDataTypes: false,
        sortKeys: true
      }))));
    }
  }]);

  return PreviewCollection;
}(external_react_["Component"]);

/* harmony default export */ var explorer_PreviewCollection = (Object(external_react_redux_["connect"])(PreviewCollection_mapStateToProps, PreviewCollection_mapDispatchToProps)(PreviewCollection_PreviewCollection));
// EXTERNAL MODULE: ./node_modules/react-dates/initialize.js
var initialize = __webpack_require__(150);

// EXTERNAL MODULE: external "react-dates"
var external_react_dates_ = __webpack_require__(58);

// EXTERNAL MODULE: external "rc-time-picker"
var external_rc_time_picker_ = __webpack_require__(59);
var external_rc_time_picker_default = /*#__PURE__*/__webpack_require__.n(external_rc_time_picker_);

// CONCATENATED MODULE: ./lib/js/app/components/explorer/Timeframe.js
function Timeframe_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Timeframe_typeof = function _typeof(obj) { return typeof obj; }; } else { Timeframe_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Timeframe_typeof(obj); }

function Timeframe_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { Timeframe_defineProperty(target, key, source[key]); }); } return target; }

function Timeframe_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Timeframe_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Timeframe_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Timeframe_createClass(Constructor, protoProps, staticProps) { if (protoProps) Timeframe_defineProperties(Constructor.prototype, protoProps); if (staticProps) Timeframe_defineProperties(Constructor, staticProps); return Constructor; }

function Timeframe_possibleConstructorReturn(self, call) { if (call && (Timeframe_typeof(call) === "object" || typeof call === "function")) { return call; } return Timeframe_assertThisInitialized(self); }

function Timeframe_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Timeframe_getPrototypeOf(o) { Timeframe_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Timeframe_getPrototypeOf(o); }

function Timeframe_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Timeframe_setPrototypeOf(subClass, superClass); }

function Timeframe_setPrototypeOf(o, p) { Timeframe_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Timeframe_setPrototypeOf(o, p); }











var Timeframe_mapStateToProps = function mapStateToProps(state) {
  return {
    timeframe: state.ui.timeframe,
    timezone: state.ui.timezone,
    steps: state.ui.steps
  };
};

var Timeframe_mapDispatchToProps = {
  updateUI: ui_updateUI,
  updateStepUI: ui_updateStepUI
};


var Timeframe_Timeframe =
/*#__PURE__*/
function (_Component) {
  Timeframe_inherits(Timeframe, _Component);

  function Timeframe(props) {
    var _this;

    Timeframe_classCallCheck(this, Timeframe);

    _this = Timeframe_possibleConstructorReturn(this, Timeframe_getPrototypeOf(Timeframe).call(this, props));
    _this.state = {};
    return _this;
  }

  Timeframe_createClass(Timeframe, [{
    key: "convertDateToString",
    value: function convertDateToString(valueSelected) {
      var value = valueSelected || external_moment_default()(external_moment_default()().format('YYYY-MM-DD'));
      var valueConverted = "".concat(value.format('YYYY-MM-DD'), "T").concat(value.format('HH:mm'), ":00.000Z");
      return valueConverted;
    }
  }, {
    key: "renderRelative",
    value: function renderRelative() {
      var _this$props$timeframe = this.props.timeframe,
          timeframe = _this$props$timeframe === void 0 ? DEFAULT_TIMEFRAME_RELATIVE_VALUE : _this$props$timeframe;
      var _this$props = this.props,
          steps = _this$props.steps,
          funnel = _this$props.funnel,
          step = _this$props.step,
          updateUI = _this$props.updateUI,
          updateStepUI = _this$props.updateStepUI; // if (typeof timeframe === 'object') return;

      if (funnel) {
        timeframe = steps[step].timeframe;
      }

      var splits = timeframe.split('_');
      var timeframeUnits = splits[2];
      var defaultRelativity;
      var defaultUnit;

      if (splits.length === 1) {
        // support for timeframes like today
        if (timeframe === 'today') {
          defaultRelativity = 'this';
          defaultUnit = 1;
          timeframeUnits = 'days';
        }

        if (timeframe === 'yesterday' || timeframe === 'previous_day') {
          defaultRelativity = 'previous';
          defaultUnit = 1;
          timeframeUnits = 'days';
        }

        if (timeframe === 'previous_minute') {
          defaultRelativity = 'previous';
          defaultUnit = 1;
          timeframeUnits = 'minutes';
        }

        if (timeframe === 'previous_hour') {
          defaultRelativity = 'previous';
          defaultUnit = 1;
          timeframeUnits = 'hours';
        }

        if (timeframe === 'previous_week') {
          defaultRelativity = 'previous';
          defaultUnit = 1;
          timeframeUnits = 'weeks';
        }

        if (timeframe === 'previous_month') {
          defaultRelativity = 'previous';
          defaultUnit = 1;
          timeframeUnits = 'months';
        }

        if (timeframe === 'previous_year') {
          defaultRelativity = 'previous';
          defaultUnit = 1;
          timeframeUnits = 'years';
        }
      }

      if (splits.length === 2) {
        // support for timeframes like this_day, this_month
        defaultUnit = 1;
        timeframeUnits = "".concat(timeframeUnits, "s");
      }

      var relativity = defaultRelativity || splits[0];
      var numberOfUnits = defaultUnit || splits[1];
      var units = timeframeUnits;
      var description = "The last\n      ".concat(numberOfUnits, "\n      ").concat(units, "\n      ").concat(relativity === 'this' ? 'including' : 'excluding', "\n      the current day");

      var update = function update(payload) {
        if (funnel) {
          updateStepUI({
            step: step,
            payload: payload
          });
          return;
        }

        updateUI(payload);
      };

      return external_react_default.a.createElement(external_react_["Fragment"], null, external_react_default.a.createElement("div", {
        className: "relative"
      }, external_react_default.a.createElement(external_react_select_default.a, {
        value: {
          label: relativity,
          value: relativity
        },
        options: RELATIVITY_UNITS.map(function (item) {
          return {
            label: item,
            value: item
          };
        }),
        onChange: function onChange(selectedRelativity) {
          update({
            timeframe: "".concat(selectedRelativity.value, "_").concat(numberOfUnits, "_").concat(units)
          });
        },
        className: "relativity",
        theme: getThemeForSelect
      }), external_react_default.a.createElement("input", {
        type: "number",
        value: numberOfUnits,
        onChange: function onChange(e) {
          update({
            timeframe: "".concat(relativity, "_").concat(e.target.value, "_").concat(units)
          });
        },
        placeholder: "Eg. 1",
        className: "input-number"
      }), external_react_default.a.createElement(external_react_select_default.a, {
        value: {
          label: units,
          value: units
        },
        options: TIME_UNITS.map(function (item) {
          return {
            label: item,
            value: item
          };
        }),
        onChange: function onChange(selectedTimeUnits) {
          update({
            timeframe: "".concat(relativity, "_").concat(numberOfUnits, "_").concat(selectedTimeUnits.value)
          });
        },
        className: "units",
        theme: getThemeForSelect
      })), external_react_default.a.createElement("div", {
        className: "description"
      }, description));
    }
  }, {
    key: "renderAbsolute",
    value: function renderAbsolute() {
      var _this2 = this;

      var _this$props$timeframe2 = this.props.timeframe,
          timeframe = _this$props$timeframe2 === void 0 ? DEFAULT_TIMEFRAME_ABSOLUTE_VALUE : _this$props$timeframe2;
      var _this$props2 = this.props,
          funnel = _this$props2.funnel,
          step = _this$props2.step,
          steps = _this$props2.steps,
          updateUI = _this$props2.updateUI,
          updateStepUI = _this$props2.updateStepUI;
      var _this$state = this.state,
          startDateFocused = _this$state.startDateFocused,
          endDateFocused = _this$state.endDateFocused;

      var falseFunc = function falseFunc() {
        return false;
      }; // https://github.com/airbnb/react-dates/issues/239


      if (funnel) {
        timeframe = steps[step].timeframe;
      }

      var startDate = external_moment_default.a.utc(timeframe.start);
      var endDate = external_moment_default.a.utc(timeframe.end);

      var update = function update(value) {
        var payload = {
          timeframe: Timeframe_objectSpread({}, timeframe, value)
        };

        if (funnel) {
          updateStepUI({
            step: step,
            payload: payload
          });
          return;
        }

        updateUI(payload);
      };

      return external_react_default.a.createElement("div", {
        className: "tabAbsolute"
      }, external_react_default.a.createElement("div", {
        className: "line"
      }, external_react_default.a.createElement("div", {
        className: "title"
      }, "Start"), external_react_default.a.createElement(external_react_dates_["SingleDatePicker"], {
        date: startDate,
        onDateChange: function onDateChange(valueSelected) {
          if (!valueSelected) return;

          var valueConverted = _this2.convertDateToString(valueSelected);

          update(Timeframe_objectSpread({}, timeframe, {
            start: valueConverted
          }));
        },
        focused: startDateFocused,
        onFocusChange: function onFocusChange(_ref) {
          var focused = _ref.focused;
          return _this2.setState({
            startDateFocused: focused
          });
        },
        isOutsideRange: falseFunc,
        id: "your_unique_id",
        numberOfMonths: 1,
        displayFormat: 'YYYY-MM-DD'
      }), external_react_default.a.createElement(external_rc_time_picker_default.a, {
        use12Hours: true,
        showSecond: false,
        minuteStep: 15,
        value: startDate,
        onChange: function onChange(valueSelected) {
          var valueConverted = _this2.convertDateToString(valueSelected);

          update(Timeframe_objectSpread({}, timeframe, {
            start: valueConverted
          }));
        }
      })), external_react_default.a.createElement("div", {
        className: "line"
      }, external_react_default.a.createElement("div", {
        className: "title"
      }, "End"), external_react_default.a.createElement(external_react_dates_["SingleDatePicker"], {
        date: endDate,
        onDateChange: function onDateChange(valueSelected) {
          if (!valueSelected) return;

          var valueConverted = _this2.convertDateToString(valueSelected);

          update(Timeframe_objectSpread({}, timeframe, {
            end: valueConverted
          }));
        },
        focused: endDateFocused,
        onFocusChange: function onFocusChange(_ref2) {
          var focused = _ref2.focused;
          return _this2.setState({
            endDateFocused: focused
          });
        },
        isOutsideRange: falseFunc,
        id: "your_unique_id2",
        numberOfMonths: 1,
        displayFormat: 'YYYY-MM-DD'
      }), external_react_default.a.createElement(external_rc_time_picker_default.a, {
        use12Hours: true,
        showSecond: false,
        minuteStep: 15,
        value: endDate,
        onChange: function onChange(valueSelected) {
          var valueConverted = _this2.convertDateToString(valueSelected);

          update(Timeframe_objectSpread({}, timeframe, {
            end: valueConverted
          }));
        }
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          funnel = _this$props3.funnel,
          step = _this$props3.step,
          steps = _this$props3.steps,
          updateUI = _this$props3.updateUI,
          updateStepUI = _this$props3.updateStepUI;
      var _this$props4 = this.props,
          timeframe = _this$props4.timeframe,
          timezone = _this$props4.timezone;

      if (funnel) {
        timeframe = steps[step].timeframe;
        timezone = steps[step].timezone;
      }

      var timeframeActiveTab;

      if (typeof timeframe === 'string') {
        timeframeActiveTab = TAB_TIMEFRAME_RELATIVE;
      }

      if (Timeframe_typeof(timeframe) === 'object') {
        timeframeActiveTab = TAB_TIMEFRAME_ABSOLUTE;
      }

      var timezoneOption = TIMEZONES.find(function (item) {
        return item.value === timezone;
      }) || {
        label: 'UTC',
        value: 0
      };
      return external_react_default.a.createElement(external_react_["Fragment"], null, external_react_default.a.createElement("div", {
        className: "timeframe"
      }, external_react_default.a.createElement("div", {
        className: "label-main"
      }, "Timeframe"), external_react_default.a.createElement("div", {
        className: "tabs"
      }, external_react_default.a.createElement("div", {
        className: "tab ".concat(timeframeActiveTab === TAB_TIMEFRAME_RELATIVE ? 'active' : ''),
        onClick: function onClick() {
          if (funnel) {
            updateStepUI({
              step: step,
              payload: {
                timeframe: DEFAULT_TIMEFRAME_RELATIVE_VALUE
              }
            });
            return;
          }

          updateUI({
            timeframe: DEFAULT_TIMEFRAME_RELATIVE_VALUE
          });
        }
      }, "Relative"), external_react_default.a.createElement("div", {
        className: "tab ".concat(timeframeActiveTab === TAB_TIMEFRAME_ABSOLUTE ? 'active' : ''),
        onClick: function onClick() {
          if (funnel) {
            updateStepUI({
              step: step,
              payload: {
                timeframe: Timeframe_objectSpread({}, DEFAULT_TIMEFRAME_ABSOLUTE_VALUE)
              }
            });
            return;
          }

          updateUI({
            timeframe: Timeframe_objectSpread({}, DEFAULT_TIMEFRAME_ABSOLUTE_VALUE)
          });
        }
      }, "Absolute")), external_react_default.a.createElement("div", {
        className: "tab-content"
      }, timeframeActiveTab === TAB_TIMEFRAME_RELATIVE && this.renderRelative(), timeframeActiveTab === TAB_TIMEFRAME_ABSOLUTE && this.renderAbsolute())), external_react_default.a.createElement(external_react_select_default.a, {
        value: {
          label: "Timezone: ".concat(timezoneOption.label),
          value: timezoneOption.value
        },
        options: TIMEZONES,
        onChange: function onChange(e) {
          localStorage.setItem('timezone', e.value);
          updateUI({
            timezone: e.value
          });

          if (funnel) {
            updateStepUI({
              step: step,
              payload: {
                timezone: e.value
              }
            });
          }
        },
        theme: getThemeForSelect
      }));
    }
  }]);

  return Timeframe;
}(external_react_["Component"]);

/* harmony default export */ var explorer_Timeframe = (Object(external_react_redux_["connect"])(Timeframe_mapStateToProps, Timeframe_mapDispatchToProps)(Timeframe_Timeframe));
// CONCATENATED MODULE: ./lib/js/app/components/explorer/Extraction.js
function Extraction_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Extraction_typeof = function _typeof(obj) { return typeof obj; }; } else { Extraction_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Extraction_typeof(obj); }

function Extraction_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Extraction_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Extraction_createClass(Constructor, protoProps, staticProps) { if (protoProps) Extraction_defineProperties(Constructor.prototype, protoProps); if (staticProps) Extraction_defineProperties(Constructor, staticProps); return Constructor; }

function Extraction_possibleConstructorReturn(self, call) { if (call && (Extraction_typeof(call) === "object" || typeof call === "function")) { return call; } return Extraction_assertThisInitialized(self); }

function Extraction_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Extraction_getPrototypeOf(o) { Extraction_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Extraction_getPrototypeOf(o); }

function Extraction_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Extraction_setPrototypeOf(subClass, superClass); }

function Extraction_setPrototypeOf(o, p) { Extraction_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Extraction_setPrototypeOf(o, p); }







var Extraction_mapStateToProps = function mapStateToProps(state) {
  return {
    extractionFields: state.ui.extractionFields,
    extractionActiveTab: state.ui.extractionActiveTab,
    latest: state.ui.latest,
    email: state.ui.email,
    propertyNames: state.ui.propertyNames,
    schemas: state.collections.schemas,
    eventCollection: state.ui.eventCollection
  };
};

var Extraction_mapDispatchToProps = {
  updateUI: ui_updateUI
};


var Extraction_Extraction =
/*#__PURE__*/
function (_Component) {
  Extraction_inherits(Extraction, _Component);

  function Extraction() {
    Extraction_classCallCheck(this, Extraction);

    return Extraction_possibleConstructorReturn(this, Extraction_getPrototypeOf(Extraction).apply(this, arguments));
  }

  Extraction_createClass(Extraction, [{
    key: "renderBulkPanel",
    value: function renderBulkPanel() {
      var _this$props = this.props,
          email = _this$props.email,
          latest = _this$props.latest,
          updateUI = _this$props.updateUI;
      return external_react_default.a.createElement("div", {
        className: "bulk-panel"
      }, external_react_default.a.createElement("div", {
        className: "label-main first-label"
      }, "Recipient email address (required)"), external_react_default.a.createElement("input", {
        type: "text",
        className: "input-text",
        placeholder: "your@email.com",
        value: email,
        onChange: function onChange(e) {
          updateUI({
            email: e.target.value
          });
        }
      }), external_react_default.a.createElement("div", {
        className: "label-main"
      }, "Limit number of events to extract"), external_react_default.a.createElement("input", {
        type: "number",
        className: "input-text",
        value: latest,
        onChange: function onChange(e) {
          var value = e.target.value;

          if (value > EXTRACTION_BULK_EVENTS_LIMIT) {
            value = EXTRACTION_BULK_EVENTS_LIMIT;
          }

          updateUI({
            latest: value
          });
        }
      }), external_react_default.a.createElement("div", {
        className: "label-main"
      }, "Results are limited to 10 million events"));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          schemas = _this$props2.schemas,
          eventCollection = _this$props2.eventCollection,
          extractionActiveTab = _this$props2.extractionActiveTab,
          propertyNames = _this$props2.propertyNames,
          updateUI = _this$props2.updateUI;
      var valuesFromState = propertyNames.map(function (item) {
        return {
          value: item,
          label: item
        };
      });
      var schema = schemas[eventCollection] || {};
      return external_react_default.a.createElement("div", {
        className: "extraction"
      }, external_react_default.a.createElement("div", {
        className: "tabs"
      }, external_react_default.a.createElement("div", {
        className: "tab ".concat(extractionActiveTab === TAB_EXTRACTION_PREVIEW ? 'active' : ''),
        onClick: function onClick() {
          return updateUI({
            extractionActiveTab: TAB_EXTRACTION_PREVIEW,
            latest: EXTRACTION_PREVIEW_EVENTS_LIMIT
          });
        }
      }, "Preview 100 events"), external_react_default.a.createElement("div", {
        className: "tab ".concat(extractionActiveTab === TAB_EXTRACTION_BULK ? 'active' : ''),
        onClick: function onClick() {
          return updateUI({
            extractionActiveTab: TAB_EXTRACTION_BULK,
            latest: EXTRACTION_BULK_EVENTS_DEFAULT
          });
        }
      }, "Bulk CSV extraction")), external_react_default.a.createElement("div", {
        className: "tab-content"
      }, extractionActiveTab === TAB_EXTRACTION_BULK && this.renderBulkPanel(), external_react_default.a.createElement(shared_ReactSelect, {
        value: valuesFromState,
        options: Object.keys(schema).map(function (item) {
          return {
            label: item,
            value: item
          };
        }),
        onChange: function onChange(selectedValues) {
          updateUI({
            propertyNames: selectedValues.map(function (item) {
              return item.value;
            })
          });
        },
        placeholder: "Filter properties...",
        isMulti: true,
        className: "standardUnits",
        theme: getThemeForSelect
      })));
    }
  }]);

  return Extraction;
}(external_react_["Component"]);

/* harmony default export */ var explorer_Extraction = (Object(external_react_redux_["connect"])(Extraction_mapStateToProps, Extraction_mapDispatchToProps)(Extraction_Extraction));
// CONCATENATED MODULE: ./lib/js/app/components/explorer/Percentile.js
function Percentile_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Percentile_typeof = function _typeof(obj) { return typeof obj; }; } else { Percentile_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Percentile_typeof(obj); }

function Percentile_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Percentile_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Percentile_createClass(Constructor, protoProps, staticProps) { if (protoProps) Percentile_defineProperties(Constructor.prototype, protoProps); if (staticProps) Percentile_defineProperties(Constructor, staticProps); return Constructor; }

function Percentile_possibleConstructorReturn(self, call) { if (call && (Percentile_typeof(call) === "object" || typeof call === "function")) { return call; } return Percentile_assertThisInitialized(self); }

function Percentile_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Percentile_getPrototypeOf(o) { Percentile_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Percentile_getPrototypeOf(o); }

function Percentile_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Percentile_setPrototypeOf(subClass, superClass); }

function Percentile_setPrototypeOf(o, p) { Percentile_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Percentile_setPrototypeOf(o, p); }





var Percentile_mapStateToProps = function mapStateToProps(state) {
  return {
    percentile: state.ui.percentile
  };
};

var Percentile_mapDispatchToProps = {
  updateUI: ui_updateUI
};

var Percentile_Percentile =
/*#__PURE__*/
function (_Component) {
  Percentile_inherits(Percentile, _Component);

  function Percentile() {
    Percentile_classCallCheck(this, Percentile);

    return Percentile_possibleConstructorReturn(this, Percentile_getPrototypeOf(Percentile).apply(this, arguments));
  }

  Percentile_createClass(Percentile, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          _this$props$percentil = _this$props.percentile,
          percentile = _this$props$percentil === void 0 ? '' : _this$props$percentil,
          updateUI = _this$props.updateUI;
      return external_react_default.a.createElement("div", {
        className: "percentile"
      }, external_react_default.a.createElement("div", {
        className: "label-main"
      }, "Percentile value"), external_react_default.a.createElement("input", {
        type: "number",
        className: "input-text",
        value: percentile,
        placeholder: "Ex. 33",
        onChange: function onChange(e) {
          var value = e.target.value;

          if (value > 100) {
            value = 100;
          }

          updateUI({
            percentile: value
          });
        }
      }));
    }
  }]);

  return Percentile;
}(external_react_["Component"]);

/* harmony default export */ var explorer_Percentile = (Object(external_react_redux_["connect"])(Percentile_mapStateToProps, Percentile_mapDispatchToProps)(Percentile_Percentile));
// CONCATENATED MODULE: ./lib/js/app/utils/filter.js
function filter_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { filter_typeof = function _typeof(obj) { return typeof obj; }; } else { filter_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return filter_typeof(obj); }


var filter_getPropertyType = function getPropertyType(_ref) {
  var schema = _ref.schema,
      filter = _ref.filter;
  var propertyName = filter.propertyName,
      operator = filter.operator;
  var propertyValue = filter.propertyValue,
      propertyType = filter.propertyType;
  var types = {
    'string': 'String',
    'num': 'Number',
    'datetime': 'Datetime',
    'list': 'List',
    'null': 'Null',
    'bool': 'Boolean'
  };

  if (propertyType) {
    return propertyType;
  }

  var typeFromSchema = schema && schema[propertyName] || {};
  propertyType = types[typeFromSchema];

  if (operator === 'exists') {
    propertyType = 'Boolean';
  }

  return propertyType;

  if (!propertyValue) {
    propertyType = 'Null';
    propertyValue = 'Null';
  }

  if (operator === 'contains' || operator === 'not_contains') {
    propertyType = 'String';
  }

  if (operator === 'exists' && ['true', 'false'].includes(propertyValue.toString().toLowerCase())) {
    propertyType = 'Boolean';
    propertyValue = propertyValue.toString().toLowerCase();
  }

  if (operator === 'in') {
    propertyType = 'List';
  }

  if (operator === 'within') {
    propertyType = 'List';
  }

  console.log(filter_typeof(propertyValue), propertyValue);

  if (typeof propertyValue === 'string') {
    var coercedDate = new Date(propertyValue);

    if (coercedDate !== null && coercedDate.toString() !== 'Invalid Date') {
      propertyValue = external_moment_default()(propertyValue);
      propertyType = 'Datetime';
    }
  }

  if (typeof propertyValue === 'number') {
    propertyType = 'Number';
  }

  console.log(propertyName, propertyType, operator, propertyValue);
  return propertyType;
};
var filter_getPropertyValue = function getPropertyValue(_ref2) {
  var propertyType = _ref2.propertyType,
      filter = _ref2.filter;
  var propertyName = filter.propertyName,
      operator = filter.operator;
  var propertyValue = filter.propertyValue;

  if (propertyType === 'Datetime') {
    var coercedDate = new Date(propertyValue);

    if (coercedDate !== null && coercedDate.toString() !== 'Invalid Date') {
      propertyValue = external_moment_default()(propertyValue);
    }
  }

  if (typeof propertyValue !== 'undefined') {
    if (['true', 'false'].includes(propertyValue.toString().toLowerCase())) {
      propertyValue = propertyValue.toString().toLowerCase();
    }
  }

  return propertyValue;
};
// CONCATENATED MODULE: ./lib/js/app/components/explorer/Filters.js
function Filters_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Filters_typeof = function _typeof(obj) { return typeof obj; }; } else { Filters_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Filters_typeof(obj); }

function Filters_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { Filters_defineProperty(target, key, source[key]); }); } return target; }

function Filters_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Filters_toConsumableArray(arr) { return Filters_arrayWithoutHoles(arr) || Filters_iterableToArray(arr) || Filters_nonIterableSpread(); }

function Filters_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function Filters_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function Filters_arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function Filters_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Filters_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Filters_createClass(Constructor, protoProps, staticProps) { if (protoProps) Filters_defineProperties(Constructor.prototype, protoProps); if (staticProps) Filters_defineProperties(Constructor, staticProps); return Constructor; }

function Filters_possibleConstructorReturn(self, call) { if (call && (Filters_typeof(call) === "object" || typeof call === "function")) { return call; } return Filters_assertThisInitialized(self); }

function Filters_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Filters_getPrototypeOf(o) { Filters_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Filters_getPrototypeOf(o); }

function Filters_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Filters_setPrototypeOf(subClass, superClass); }

function Filters_setPrototypeOf(o, p) { Filters_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Filters_setPrototypeOf(o, p); }















var Filters_mapStateToProps = function mapStateToProps(state) {
  return {
    schemas: state.collections.schemas,
    eventCollection: state.ui.eventCollection,
    filters: state.ui.filters,
    steps: state.ui.steps
  };
};

var Filters_mapDispatchToProps = {
  fetchSchema: client_fetchSchema,
  updateUI: ui_updateUI,
  updateStepUI: ui_updateStepUI,
  addFilter: ui_addFilter,
  deleteFilter: ui_deleteFilter,
  updateFilter: ui_updateFilter,
  addStepFilter: ui_addStepFilter,
  deleteStepFilter: ui_deleteStepFilter,
  updateStepFilter: ui_updateStepFilter
};

var schemaPropConvert = function schemaPropConvert(prop) {
  var schemaProps = {
    num: 'Number',
    string: 'String',
    bool: 'Boolean',
    datetime: 'Datetime',
    "null": 'String',
    list: 'List',
    geo: 'List',
    array: 'List'
  };
  return schemaProps[prop];
};

var Filters_Filters =
/*#__PURE__*/
function (_Component) {
  Filters_inherits(Filters, _Component);

  function Filters(props) {
    var _this;

    Filters_classCallCheck(this, Filters);

    _this = Filters_possibleConstructorReturn(this, Filters_getPrototypeOf(Filters).call(this, props));
    _this.state = {
      save: false
    };
    return _this;
  }

  Filters_createClass(Filters, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        oldFilters: Filters_toConsumableArray(this.props.filters),
        save: false
      });
    }
    /*
    componentWillUnmount() {
      console.log('will un moubt');
       const { oldFilters, save } = this.state;
      const { filters, funnel, step } = this.props;
      console.log(save);
       let validFilters = filters.filter(filter => !!filter.propertyName);
       if (JSON.stringify(oldFilters) !== JSON.stringify(validFilters) && !save) {
        console.log('return to original');
        validFilters = [...oldFilters];
        console.log('got here', validFilters);
      }
       if (funnel) {
        updateStepUI({
          step,
          payload: {
            filters: [...validFilters],
          },
          rootPayload: {
          },
        });
        return;
      }
      updateUI({
        filters: [...validFilters],
      });
    }
    */

  }, {
    key: "done",
    value: function done() {
      var onCloseModal = this.props.onCloseModal;
      this.setState({
        save: true
      }, function () {
        onCloseModal();
      });
    }
  }, {
    key: "convertDateToString",
    value: function convertDateToString(valueSelected) {
      var value = valueSelected || external_moment_default()(external_moment_default()().format('YYYY-MM-DD'));
      var valueConverted = "".concat(value.format('YYYY-MM-DD'), "T").concat(value.format('HH:mm'), ":00.000Z");
      return valueConverted;
    }
  }, {
    key: "renderFilterValue",
    value: function renderFilterValue(_ref) {
      var _this2 = this;

      var item = _ref.item,
          step = _ref.step,
          operator = _ref.operator,
          propertyType = _ref.propertyType,
          propertyValue = _ref.propertyValue,
          _onChange = _ref.onChange;
      var startDateFocused = this.state.startDateFocused;
      var BooleanOptions = ['true', 'false'].map(function (item) {
        return {
          label: item,
          value: item
        };
      });

      if (operator === 'exists' || propertyType === 'Boolean') {
        return external_react_default.a.createElement(external_react_select_default.a, {
          value: {
            label: propertyValue,
            value: propertyValue
          },
          options: BooleanOptions,
          onChange: function onChange(_ref2) {
            var value = _ref2.value;

            _onChange(value);
          },
          theme: getThemeForSelect
        });
      }

      var falseFunc = function falseFunc() {
        return false;
      }; // https://github.com/airbnb/react-dates/issues/239


      var startDate = external_moment_default.a.utc(propertyValue || DEFAULT_TIMEFRAME_ABSOLUTE_VALUE);

      if (propertyType === 'Datetime') {
        return external_react_default.a.createElement("div", {
          className: "datetime-pickers"
        }, external_react_default.a.createElement(external_react_dates_["SingleDatePicker"], {
          date: startDate,
          onDateChange: function onDateChange(valueSelected) {
            var valueConverted = _this2.convertDateToString(valueSelected);

            _onChange(valueConverted);
          },
          focused: startDateFocused,
          onFocusChange: function onFocusChange(_ref3) {
            var focused = _ref3.focused;
            return _this2.setState({
              startDateFocused: focused
            });
          },
          isOutsideRange: falseFunc,
          id: "your_unique_id",
          numberOfMonths: 1,
          displayFormat: 'YYYY-MM-DD'
        }), external_react_default.a.createElement(external_rc_time_picker_default.a, {
          use12Hours: true,
          showSecond: false,
          minuteStep: 15,
          value: startDate,
          onChange: function onChange(valueSelected) {
            var valueConverted = _this2.convertDateToString(valueSelected);

            _onChange(valueConverted);
          }
        }));
      }

      if (operator === 'within') {
        var newPropertyValue = {
          coordinates: [undefined, undefined],
          maxDistanceMiles: undefined
        };

        if (propertyValue) {
          newPropertyValue = Filters_objectSpread({}, propertyValue);
        }

        var _long = newPropertyValue.coordinates[0] || '';

        var lat = newPropertyValue.coordinates[1] || '';
        var radius = newPropertyValue.maxDistanceMiles || '';
        return external_react_default.a.createElement("div", {
          className: "within-inputs"
        }, external_react_default.a.createElement("input", {
          placeholder: "Longitude",
          type: "text",
          onChange: function onChange(e) {
            _onChange({
              coordinates: [e.target.value, lat],
              maxDistanceMiles: radius
            });
          },
          value: _long
        }), external_react_default.a.createElement("input", {
          placeholder: "Latitude",
          type: "text",
          onChange: function onChange(e) {
            _onChange({
              coordinates: [_long, e.target.value],
              maxDistanceMiles: radius
            });
          },
          value: lat
        }), external_react_default.a.createElement("input", {
          placeholder: "Radius [in miles]",
          type: "text",
          onChange: function onChange(e) {
            _onChange({
              coordinates: [_long, lat],
              maxDistanceMiles: e.target.value
            });
          },
          value: radius
        }));
      }

      var placeholder;

      if (operator === 'in') {
        placeholder = 'Eve, "Tom Cruize", Teresa';

        if (propertyType === 'Number') {
          placeholder = '1, 2, 3, 4';
        }

        ;
      }

      return external_react_default.a.createElement("input", {
        placeholder: placeholder,
        type: "text",
        onChange: function onChange(e) {
          _onChange(e.target.value);
        },
        value: propertyValue
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          funnel = _this$props.funnel,
          step = _this$props.step,
          steps = _this$props.steps,
          addFilter = _this$props.addFilter,
          deleteFilter = _this$props.deleteFilter,
          updateFilter = _this$props.updateFilter,
          addStepFilter = _this$props.addStepFilter,
          deleteStepFilter = _this$props.deleteStepFilter,
          updateStepFilter = _this$props.updateStepFilter;
      var _this$props2 = this.props,
          filters = _this$props2.filters,
          schemas = _this$props2.schemas,
          eventCollection = _this$props2.eventCollection;
      var schema = schemas[eventCollection] || {};

      if (funnel) {
        filters = steps[step].filters || [];
        schema = schemas[steps[step].eventCollection] || {};
        eventCollection = steps[step].eventCollection;
      }

      if (!Object.keys(schema).length) {
        return external_react_default.a.createElement("div", {
          className: "box-info"
        }, "Choose an event collection first");
      }

      filters = filters.map(function (filter) {
        var propertyType = filter_getPropertyType({
          schema: schema,
          filter: filter
        });
        var propertyValue = filter_getPropertyValue({
          propertyType: propertyType,
          filter: filter
        });
        return Filters_objectSpread({}, filter, {
          propertyType: propertyType,
          propertyValue: propertyValue
        });
      });
      var schemaProps = Object.keys(schema).map(function (colItem) {
        return {
          label: colItem,
          value: colItem
        };
      });
      return external_react_default.a.createElement("div", null, external_react_default.a.createElement("div", {
        className: "list"
      }, filters.map(function (item, index) {
        var propertyName = item.propertyName,
            propertyType = item.propertyType,
            propertyValue = item.propertyValue,
            operator = item.operator;
        var dataType = propertyType || schemaPropConvert(schema[propertyName]);
        var filterOperators = FILTER_OPERATORS.filter(function (item) {
          return item.dataTypes.includes(dataType);
        });
        return external_react_default.a.createElement("div", {
          className: "row",
          key: index
        }, external_react_default.a.createElement("div", {
          className: "row-part"
        }, external_react_default.a.createElement(shared_ReactSelect, {
          value: {
            label: propertyName,
            value: propertyName
          },
          options: schemaProps,
          onChange: function onChange(e) {
            if (funnel) {
              updateStepFilter({
                step: step,
                payload: {
                  index: index,
                  item: Filters_objectSpread({}, item, {
                    propertyName: e.value,
                    propertyType: schemaPropConvert(schema[e.value])
                  })
                }
              });
              return;
            }

            updateFilter({
              index: index,
              item: Filters_objectSpread({}, item, {
                propertyName: e.value,
                propertyType: schemaPropConvert(schema[e.value])
              })
            });
          },
          theme: getThemeForSelect
        })), external_react_default.a.createElement("div", {
          className: "row-part"
        }, external_react_default.a.createElement(external_react_select_default.a, {
          value: {
            label: propertyType,
            value: propertyType
          },
          options: DATA_TYPES,
          onChange: function onChange(e) {
            if (funnel) {
              updateStepFilter({
                step: step,
                payload: {
                  index: index,
                  item: Filters_objectSpread({}, item, {
                    propertyType: e.value,
                    propertyValue: undefined,
                    operator: undefined
                  })
                }
              });
              return;
            }

            updateFilter({
              index: index,
              item: Filters_objectSpread({}, item, {
                propertyType: e.value,
                propertyValue: undefined,
                operator: undefined
              })
            });
          },
          theme: getThemeForSelect
        })), external_react_default.a.createElement("div", {
          className: "row-part"
        }, external_react_default.a.createElement(external_react_select_default.a, {
          value: {
            label: operator,
            value: operator
          },
          options: filterOperators,
          onChange: function onChange(e) {
            var newPropertyValue = propertyValue;

            if (e.value === 'exists') {
              newPropertyValue = 'true';
            }

            if (funnel) {
              updateStepFilter({
                step: step,
                payload: {
                  index: index,
                  item: Filters_objectSpread({}, item, {
                    operator: e.value,
                    propertyValue: newPropertyValue
                  })
                }
              });
              return;
            }

            updateFilter({
              index: index,
              item: Filters_objectSpread({}, item, {
                operator: e.value,
                propertyValue: newPropertyValue
              })
            });
          },
          theme: getThemeForSelect
        })), external_react_default.a.createElement("div", {
          className: "row-part"
        }, _this3.renderFilterValue({
          item: item,
          step: step,
          operator: operator,
          propertyType: propertyType,
          propertyValue: propertyValue,
          onChange: function onChange(value) {
            if (funnel) {
              updateStepFilter({
                step: step,
                payload: {
                  index: index,
                  item: Filters_objectSpread({}, item, {
                    propertyValue: value
                  })
                }
              });
              return;
            }

            updateFilter({
              index: index,
              item: Filters_objectSpread({}, item, {
                propertyValue: value
              })
            });
          }
        })), external_react_default.a.createElement("div", {
          className: "row-part no-flex"
        }, external_react_default.a.createElement("a", {
          className: "delete",
          onClick: function onClick() {
            if (funnel) {
              deleteStepFilter({
                step: step,
                payload: {
                  index: index
                }
              });
              return;
            }

            deleteFilter(index);
          }
        }, external_react_default.a.createElement("i", {
          className: "fas fa-times"
        }))));
      })), external_react_default.a.createElement("div", {
        className: "action-buttons"
      }, external_react_default.a.createElement("div", {
        className: "button-add-filter",
        onClick: function onClick() {
          if (funnel) {
            addStepFilter({
              step: step
            });
            return;
          }

          addFilter();
        }
      }, external_react_default.a.createElement("i", {
        className: "fas fa-plus"
      }), " Add filter"), external_react_default.a.createElement("div", {
        className: "button button-done",
        onClick: function onClick() {
          return _this3.done();
        }
      }, external_react_default.a.createElement("i", {
        className: "fas fa-check-circle"
      }), "Done")));
    }
  }]);

  return Filters;
}(external_react_["Component"]);

/* harmony default export */ var explorer_Filters = (Object(external_react_redux_["connect"])(Filters_mapStateToProps, Filters_mapDispatchToProps)(Filters_Filters));
// CONCATENATED MODULE: ./lib/js/app/components/explorer/GroupBy.js
function GroupBy_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { GroupBy_typeof = function _typeof(obj) { return typeof obj; }; } else { GroupBy_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return GroupBy_typeof(obj); }

function GroupBy_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function GroupBy_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function GroupBy_createClass(Constructor, protoProps, staticProps) { if (protoProps) GroupBy_defineProperties(Constructor.prototype, protoProps); if (staticProps) GroupBy_defineProperties(Constructor, staticProps); return Constructor; }

function GroupBy_possibleConstructorReturn(self, call) { if (call && (GroupBy_typeof(call) === "object" || typeof call === "function")) { return call; } return GroupBy_assertThisInitialized(self); }

function GroupBy_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function GroupBy_getPrototypeOf(o) { GroupBy_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return GroupBy_getPrototypeOf(o); }

function GroupBy_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) GroupBy_setPrototypeOf(subClass, superClass); }

function GroupBy_setPrototypeOf(o, p) { GroupBy_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return GroupBy_setPrototypeOf(o, p); }







var GroupBy_mapStateToProps = function mapStateToProps(state) {
  return {
    ui: state.ui,
    schemas: state.collections.schemas,
    eventCollection: state.ui.eventCollection
  };
};

var GroupBy_mapDispatchToProps = {
  updateUI: ui_updateUI
};

var GroupBy_GroupBy =
/*#__PURE__*/
function (_Component) {
  GroupBy_inherits(GroupBy, _Component);

  function GroupBy() {
    GroupBy_classCallCheck(this, GroupBy);

    return GroupBy_possibleConstructorReturn(this, GroupBy_getPrototypeOf(GroupBy).apply(this, arguments));
  }

  GroupBy_createClass(GroupBy, [{
    key: "getCurrentSchema",
    value: function getCurrentSchema() {
      var _this$props = this.props,
          schemas = _this$props.schemas,
          eventCollection = _this$props.eventCollection;
      var schema = schemas[eventCollection] || {};
      return Object.keys(schema);
    }
  }, {
    key: "renderSelects",
    value: function renderSelects() {
      var _this$props2 = this.props,
          ui = _this$props2.ui,
          updateUI = _this$props2.updateUI;
      var groupBy = ui.groupBy,
          orderBy = ui.orderBy,
          limit = ui.limit,
          numberOfGroupByProps = ui.numberOfGroupByProps;
      var groupByValue = groupBy ? groupBy[0] : '';
      var groupByValue2 = groupByValue ? groupBy[1] : '';
      var elementsToRender = [];
      elementsToRender.push(external_react_default.a.createElement("div", {
        key: "groupBy1"
      }, external_react_default.a.createElement("div", {
        className: "label-main"
      }, "Target property"), external_react_default.a.createElement(shared_ReactSelect, {
        value: groupByValue && {
          label: groupByValue,
          value: groupByValue
        },
        options: this.getCurrentSchema().map(function (item) {
          return {
            label: item,
            value: item
          };
        }),
        onChange: function onChange(value) {
          updateUI({
            groupBy: [value.value]
          });
        },
        theme: getThemeForSelect
      }), external_react_default.a.createElement("div", {
        className: "options"
      }, external_react_default.a.createElement("div", {
        className: "orderBy"
      }, external_react_default.a.createElement("div", {
        className: "label-main"
      }, "Order", external_react_default.a.createElement("span", {
        className: "optional"
      }, "Optional")), external_react_default.a.createElement(shared_ReactSelect, {
        value: orderBy && {
          label: orderBy.direction,
          value: orderBy.direction
        },
        options: ['ASC', 'DESC'].map(function (item) {
          return {
            label: item,
            value: item
          };
        }),
        onChange: function onChange(value) {
          updateUI({
            orderBy: {
              property_name: 'result',
              direction: value.value
            }
          });
        },
        className: "select",
        theme: getThemeForSelect
      })), external_react_default.a.createElement("div", {
        className: "limit"
      }, external_react_default.a.createElement("div", {
        className: "label-main"
      }, "Limit", external_react_default.a.createElement("span", {
        className: "optional"
      }, "Optional")), external_react_default.a.createElement("input", {
        type: "number",
        value: limit ? limit : '',
        onChange: function onChange(e) {
          updateUI({
            limit: parseInt(e.target.value)
          });
        },
        placeholder: "Eg. 10",
        className: "input-number input"
      })))));

      if (numberOfGroupByProps === 2) {
        elementsToRender.push(external_react_default.a.createElement("div", {
          key: "groupBy2",
          className: "additionalTargetProperty"
        }, external_react_default.a.createElement("div", {
          className: "label-main"
        }, "Second target property"), external_react_default.a.createElement(shared_ReactSelect, {
          value: groupByValue2 && {
            label: groupByValue2,
            value: groupByValue2
          },
          options: this.getCurrentSchema().map(function (item) {
            return {
              label: item,
              value: item
            };
          }),
          onChange: function onChange(value) {
            updateUI({
              groupBy: [groupBy[0], value.value]
            });
          },
          className: "standardUnits",
          theme: getThemeForSelect
        })));
      }

      return elementsToRender;
    }
  }, {
    key: "renderButton",
    value: function renderButton() {
      var _this$props3 = this.props,
          ui = _this$props3.ui,
          updateUI = _this$props3.updateUI;
      var groupBy = ui.groupBy,
          numberOfGroupByProps = ui.numberOfGroupByProps;

      if (numberOfGroupByProps === 1) {
        return external_react_default.a.createElement("div", {
          role: "button",
          tabIndex: "0",
          className: "btnPlus",
          onClick: function onClick() {
            updateUI({
              numberOfGroupByProps: 2
            });
          }
        }, external_react_default.a.createElement("i", {
          className: "fas fa-plus"
        }));
      }

      return external_react_default.a.createElement("div", {
        role: "button",
        tabIndex: "0",
        className: "btnMinus",
        onClick: function onClick() {
          updateUI({
            groupBy: groupBy ? [groupBy[0]] : null,
            numberOfGroupByProps: 1
          });
        }
      }, external_react_default.a.createElement("i", {
        className: "fas fa-minus"
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var ui = this.props.ui;
      var eventCollection = ui.eventCollection;
      return external_react_default.a.createElement("div", {
        className: "groupBy"
      }, external_react_default.a.createElement("div", {
        className: "tab-content"
      }, external_react_default.a.createElement("div", {
        className: "tab"
      }, !eventCollection && external_react_default.a.createElement("div", {
        className: "box-info"
      }, "Choose an event collection first"), eventCollection && external_react_default.a.createElement("div", null, this.renderSelects(), this.renderButton()))));
    }
  }]);

  return GroupBy;
}(external_react_["Component"]);

/* harmony default export */ var explorer_GroupBy = (Object(external_react_redux_["connect"])(GroupBy_mapStateToProps, GroupBy_mapDispatchToProps)(GroupBy_GroupBy));
// CONCATENATED MODULE: ./lib/js/app/components/explorer/Interval.js
function Interval_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Interval_typeof = function _typeof(obj) { return typeof obj; }; } else { Interval_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Interval_typeof(obj); }

function Interval_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Interval_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Interval_createClass(Constructor, protoProps, staticProps) { if (protoProps) Interval_defineProperties(Constructor.prototype, protoProps); if (staticProps) Interval_defineProperties(Constructor, staticProps); return Constructor; }

function Interval_possibleConstructorReturn(self, call) { if (call && (Interval_typeof(call) === "object" || typeof call === "function")) { return call; } return Interval_assertThisInitialized(self); }

function Interval_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Interval_getPrototypeOf(o) { Interval_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Interval_getPrototypeOf(o); }

function Interval_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Interval_setPrototypeOf(subClass, superClass); }

function Interval_setPrototypeOf(o, p) { Interval_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Interval_setPrototypeOf(o, p); }







var Interval_mapStateToProps = function mapStateToProps(state) {
  return {
    interval: state.ui.interval
  };
};

var Interval_mapDispatchToProps = {
  updateUI: ui_updateUI
};


var Interval_Interval =
/*#__PURE__*/
function (_Component) {
  Interval_inherits(Interval, _Component);

  function Interval() {
    Interval_classCallCheck(this, Interval);

    return Interval_possibleConstructorReturn(this, Interval_getPrototypeOf(Interval).apply(this, arguments));
  }

  Interval_createClass(Interval, [{
    key: "renderStandard",
    value: function renderStandard() {
      var _this$props = this.props,
          interval = _this$props.interval,
          updateUI = _this$props.updateUI;
      return external_react_default.a.createElement("div", {
        className: "tab"
      }, external_react_default.a.createElement(external_react_select_default.a, {
        value: {
          label: interval,
          value: interval
        },
        options: INTERVALS.map(function (item) {
          return {
            label: item,
            value: item
          };
        }),
        onChange: function onChange(selectedInterval) {
          updateUI({
            interval: selectedInterval.value
          });
        },
        className: "standardUnits",
        theme: getThemeForSelect
      }));
    }
  }, {
    key: "renderCustom",
    value: function renderCustom() {
      var _this$props2 = this.props,
          _this$props2$interval = _this$props2.interval,
          interval = _this$props2$interval === void 0 ? DEFAULT_CUSTOM_INTERVAL : _this$props2$interval,
          updateUI = _this$props2.updateUI;
      var numberOfUnits = interval.split('_')[1];
      var selectedCustomInterval = interval.split('_')[2];
      return external_react_default.a.createElement("div", {
        className: "tab line"
      }, external_react_default.a.createElement("div", {
        className: "title"
      }, "Every"), external_react_default.a.createElement("input", {
        type: "number",
        value: numberOfUnits,
        onChange: function onChange(e) {
          updateUI({
            interval: "every_".concat(e.target.value, "_").concat(selectedCustomInterval)
          });
        },
        placeholder: "",
        className: "input-number"
      }), external_react_default.a.createElement(external_react_select_default.a, {
        value: {
          label: selectedCustomInterval,
          value: selectedCustomInterval
        },
        options: TIME_UNITS.map(function (item) {
          return {
            label: item,
            value: item
          };
        }),
        onChange: function onChange(selectedCustomInterval) {
          updateUI({
            interval: "every_".concat(numberOfUnits, "_").concat(selectedCustomInterval.value)
          });
        },
        className: "timeUnits",
        theme: getThemeForSelect
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          _this$props3$interval = _this$props3.interval,
          interval = _this$props3$interval === void 0 ? '' : _this$props3$interval,
          updateUI = _this$props3.updateUI;
      var isStandard = true;

      if (interval) {
        isStandard = interval.indexOf('_') === -1;
      }

      return external_react_default.a.createElement("div", {
        className: "interval"
      }, external_react_default.a.createElement("div", {
        className: "tabs"
      }, external_react_default.a.createElement("div", {
        className: "tab ".concat(isStandard && 'active'),
        onClick: function onClick() {
          return updateUI({
            interval: DEFAULT_STANDARD_INTERVAL
          });
        }
      }, "Standard"), external_react_default.a.createElement("div", {
        className: "tab ".concat(!isStandard && 'active'),
        onClick: function onClick() {
          return updateUI({
            interval: DEFAULT_CUSTOM_INTERVAL
          });
        }
      }, "Custom")), external_react_default.a.createElement("div", {
        className: "tab-content"
      }, isStandard && this.renderStandard(), !isStandard && this.renderCustom()));
    }
  }]);

  return Interval;
}(external_react_["Component"]);

/* harmony default export */ var explorer_Interval = (Object(external_react_redux_["connect"])(Interval_mapStateToProps, Interval_mapDispatchToProps)(Interval_Interval));
// CONCATENATED MODULE: ./lib/js/app/utils/text.js
var copyToClipboard = function copyToClipboard(str) {
  var el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};
var slugify = function slugify(name) {
  return name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/ /g, '-');
};
// CONCATENATED MODULE: ./lib/js/app/components/explorer/APIQueryURL.js
function APIQueryURL_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { APIQueryURL_typeof = function _typeof(obj) { return typeof obj; }; } else { APIQueryURL_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return APIQueryURL_typeof(obj); }

function APIQueryURL_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function APIQueryURL_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function APIQueryURL_createClass(Constructor, protoProps, staticProps) { if (protoProps) APIQueryURL_defineProperties(Constructor.prototype, protoProps); if (staticProps) APIQueryURL_defineProperties(Constructor, staticProps); return Constructor; }

function APIQueryURL_possibleConstructorReturn(self, call) { if (call && (APIQueryURL_typeof(call) === "object" || typeof call === "function")) { return call; } return APIQueryURL_assertThisInitialized(self); }

function APIQueryURL_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function APIQueryURL_getPrototypeOf(o) { APIQueryURL_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return APIQueryURL_getPrototypeOf(o); }

function APIQueryURL_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) APIQueryURL_setPrototypeOf(subClass, superClass); }

function APIQueryURL_setPrototypeOf(o, p) { APIQueryURL_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return APIQueryURL_setPrototypeOf(o, p); }






var APIQueryURL_mapStateToProps = function mapStateToProps(state) {
  return {
    analysisType: state.ui.analysisType
  };
};

var APIQueryURL_mapDispatchToProps = {};

var APIQueryURL_APIQueryURL =
/*#__PURE__*/
function (_Component) {
  APIQueryURL_inherits(APIQueryURL, _Component);

  function APIQueryURL() {
    APIQueryURL_classCallCheck(this, APIQueryURL);

    return APIQueryURL_possibleConstructorReturn(this, APIQueryURL_getPrototypeOf(APIQueryURL).apply(this, arguments));
  }

  APIQueryURL_createClass(APIQueryURL, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          analysisType = _this$props.analysisType,
          queryParams = _this$props.queryParams,
          client = _this$props.client;
      var urlParams = Object.keys(queryParams).map(function (k) {
        var queryParamValue = queryParams[k];
        if (!queryParamValue) return null;
        if (Array.isArray(queryParamValue) && !queryParamValue.length) return null;

        if (k === 'timezone') {
          var timezoneOption = TIMEZONES.find(function (item) {
            return item.label === queryParamValue;
          }) || {
            label: 'UTC',
            value: 0
          };
          queryParamValue = timezoneOption.value;
        }

        if (Array.isArray(queryParamValue)) {
          queryParamValue = queryParamValue.map(function (value) {
            if (APIQueryURL_typeof(value) === 'object' && value !== null) {
              var underscoredObject = {};
              Object.keys(value).forEach(function (objkey) {
                var underscoredK = objkey.replace(/(?:^|\.?)([A-Z])/g, function (x, y) {
                  return "_".concat(y.toLowerCase());
                }).replace(/^_/, '');
                underscoredObject[underscoredK] = value[objkey];
              });
              return underscoredObject;
            }

            return value;
          });
        }

        queryParamValue = JSON.stringify(queryParamValue);
        var underscoredK = k.replace(/(?:^|\.?)([A-Z])/g, function (x, y) {
          return "_".concat(y.toLowerCase());
        }).replace(/^_/, '');
        return "".concat(encodeURIComponent(underscoredK), "=").concat(encodeURIComponent(queryParamValue));
      }).filter(function (item) {
        return !!item;
      }).join('&').replace(/%22true%22/gi, 'true').replace(/%22false%22/gi, 'false');
      var queryURL = "".concat(client.config.protocol, "://").concat(client.config.host, "/3.0/projects/").concat(client.config.projectId, "/queries/").concat(analysisType, "?api_key=").concat(client.config.masterKey, "&").concat(urlParams);
      return external_react_default.a.createElement("div", {
        className: "apiQueryUrl",
        onClick: function onClick() {
          return copyToClipboard(queryURL);
        }
      }, external_react_default.a.createElement("span", null, "API Query URL"), external_react_default.a.createElement("input", {
        type: "text",
        defaultValue: queryURL
      }), external_react_default.a.createElement("i", {
        className: "fas fa-copy"
      }));
    }
  }]);

  return APIQueryURL;
}(external_react_["Component"]);

/* harmony default export */ var explorer_APIQueryURL = (Object(external_react_redux_["connect"])(APIQueryURL_mapStateToProps, APIQueryURL_mapDispatchToProps)(APIQueryURL_APIQueryURL));
// CONCATENATED MODULE: ./lib/js/app/components/explorer/FoldableStep.js
function FoldableStep_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { FoldableStep_typeof = function _typeof(obj) { return typeof obj; }; } else { FoldableStep_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return FoldableStep_typeof(obj); }

function FoldableStep_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function FoldableStep_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function FoldableStep_createClass(Constructor, protoProps, staticProps) { if (protoProps) FoldableStep_defineProperties(Constructor.prototype, protoProps); if (staticProps) FoldableStep_defineProperties(Constructor, staticProps); return Constructor; }

function FoldableStep_possibleConstructorReturn(self, call) { if (call && (FoldableStep_typeof(call) === "object" || typeof call === "function")) { return call; } return FoldableStep_assertThisInitialized(self); }

function FoldableStep_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function FoldableStep_getPrototypeOf(o) { FoldableStep_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return FoldableStep_getPrototypeOf(o); }

function FoldableStep_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) FoldableStep_setPrototypeOf(subClass, superClass); }

function FoldableStep_setPrototypeOf(o, p) { FoldableStep_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return FoldableStep_setPrototypeOf(o, p); }



var FoldableStep_Foldable =
/*#__PURE__*/
function (_Component) {
  FoldableStep_inherits(Foldable, _Component);

  function Foldable(props) {
    var _this;

    FoldableStep_classCallCheck(this, Foldable);

    _this = FoldableStep_possibleConstructorReturn(this, FoldableStep_getPrototypeOf(Foldable).call(this, props));
    _this.state = {
      active: _this.props.defaultActive
    };
    return _this;
  }

  FoldableStep_createClass(Foldable, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (!prevProps.defaultActive && this.props.defaultActive) {
        this.setState({
          active: this.props.defaultActive
        });
      }

      if (prevProps.defaultActive && !this.props.defaultActive) {
        this.setState({
          active: this.props.defaultActive
        });
      }
    }
  }, {
    key: "onChange",
    value: function onChange() {
      var _this$props = this.props,
          onClose = _this$props.onClose,
          onChange = _this$props.onChange,
          onDelete = _this$props.onDelete;
      var active = this.state.active;

      if (onChange) {
        onChange(active);
      }

      if (onClose && !active) {
        onClose();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          title = _this$props2.title,
          onDelete = _this$props2.onDelete;
      var active = this.state.active;
      return external_react_default.a.createElement("div", {
        className: "foldable ".concat(active && 'foldableActive')
      }, external_react_default.a.createElement("div", {
        className: "title",
        onClick: function onClick() {
          _this2.setState({
            active: !active
          }, function () {
            return _this2.onChange();
          });
        }
      }, external_react_default.a.createElement("div", {
        className: "step-switch-position-buttons"
      }, external_react_default.a.createElement("div", {
        onClick: function onClick(e) {
          e.stopPropagation();

          _this2.props.onClickUp();
        },
        className: "move-up"
      }, external_react_default.a.createElement("i", {
        className: "fas fa-angle-up"
      })), external_react_default.a.createElement("div", {
        onClick: function onClick(e) {
          e.stopPropagation();

          _this2.props.onClickDown();
        },
        className: "move-down"
      }, external_react_default.a.createElement("i", {
        className: "fas fa-angle-down"
      }))), external_react_default.a.createElement("span", null, title), external_react_default.a.createElement("div", {
        className: "icon"
      }, external_react_default.a.createElement("div", {
        onClick: function onClick(e) {
          e.stopPropagation();
          onDelete();
        },
        className: "button button-delete"
      }, external_react_default.a.createElement("i", {
        className: "fas fa-times"
      })))), active && external_react_default.a.createElement("div", {
        className: "content"
      }, this.props.children));
    }
  }]);

  return Foldable;
}(external_react_["Component"]);


// CONCATENATED MODULE: ./lib/js/app/components/explorer/Step.js
function Step_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Step_typeof = function _typeof(obj) { return typeof obj; }; } else { Step_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Step_typeof(obj); }

function Step_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Step_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Step_createClass(Constructor, protoProps, staticProps) { if (protoProps) Step_defineProperties(Constructor.prototype, protoProps); if (staticProps) Step_defineProperties(Constructor, staticProps); return Constructor; }

function Step_possibleConstructorReturn(self, call) { if (call && (Step_typeof(call) === "object" || typeof call === "function")) { return call; } return Step_assertThisInitialized(self); }

function Step_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Step_getPrototypeOf(o) { Step_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Step_getPrototypeOf(o); }

function Step_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Step_setPrototypeOf(subClass, superClass); }

function Step_setPrototypeOf(o, p) { Step_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Step_setPrototypeOf(o, p); }

function Step_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var Step_mapStateToProps = function mapStateToProps(state) {
  return Step_defineProperty({
    activeStep: state.ui.activeStep,
    stepLabels: state.ui.stepLabels,
    steps: state.ui.steps
  }, "stepLabels", state.ui.stepLabels);
};

var Step_mapDispatchToProps = {
  updateUI: ui_updateUI,
  updateStepUI: ui_updateStepUI,
  deleteStep: ui_deleteStep
};

var Step_Step =
/*#__PURE__*/
function (_Component) {
  Step_inherits(Step, _Component);

  function Step() {
    Step_classCallCheck(this, Step);

    return Step_possibleConstructorReturn(this, Step_getPrototypeOf(Step).apply(this, arguments));
  }

  Step_createClass(Step, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          updateUI = _this$props.updateUI,
          updateStepUI = _this$props.updateStepUI,
          deleteStep = _this$props.deleteStep,
          index = _this$props.index,
          children = _this$props.children,
          activeStep = _this$props.activeStep,
          stepLabels = _this$props.stepLabels,
          steps = _this$props.steps;
      var currentStep = steps[index];
      var labelValue = stepLabels && stepLabels[index] || currentStep.eventCollection;

      var swapArrayElements = function swapArrayElements(arr, indexA, indexB) {
        var temp = arr[indexA];
        arr[indexA] = arr[indexB];
        arr[indexB] = temp;
        return arr;
      };

      return external_react_default.a.createElement("div", {
        className: "step ".concat(index === activeStep ? 'active-step' : '')
      }, external_react_default.a.createElement(FoldableStep_Foldable, {
        title: "Step ".concat(index + 1),
        defaultActive: index === activeStep,
        onChange: function onChange(active) {
          updateUI({
            activeStep: active ? index : undefined
          });
        },
        onClose: function onClose() {
          updateUI({
            activeStep: undefined
          });
        },
        onDelete: function onDelete() {
          deleteStep(index);
        },
        onClickDown: function onClickDown() {
          if (index === steps.length - 1) return;
          var swappedSteps = swapArrayElements(steps, index, index + 1);
          var swappedStepLabels = swapArrayElements(stepLabels, index, index + 1);
          updateUI({
            steps: swappedSteps,
            stepLabels: swappedStepLabels,
            activeStep: activeStep + 1
          });
        },
        onClickUp: function onClickUp() {
          if (index === 0) return;
          var swappedSteps = swapArrayElements(steps, index, index - 1);
          var swappedStepLabels = swapArrayElements(stepLabels, index, index - 1);
          updateUI({
            steps: swappedSteps,
            stepLabels: swappedStepLabels,
            activeStep: activeStep - 1
          });
        }
      }, children, external_react_default.a.createElement("div", {
        className: "label first-label"
      }, "Label"), external_react_default.a.createElement("input", {
        className: "input-text",
        placeholder: "Eg. Customers this month",
        type: "text",
        value: labelValue,
        onChange: function onChange(e) {
          updateUI({
            stepLabels: stepLabels.map(function (item, itemIndex) {
              if (itemIndex === index) {
                return e.target.value;
              }

              return item;
            })
          });
        }
      }), external_react_default.a.createElement("div", {
        className: "line-options"
      }, external_react_default.a.createElement("div", {
        className: "line-checkbox"
      }, external_react_default.a.createElement("input", {
        type: "checkbox",
        id: "step".concat(index, "_optional_step"),
        checked: currentStep.optional,
        onChange: function onChange(e) {
          var optional = e.target.checked;
          updateStepUI({
            step: index,
            payload: {
              optional: optional
            }
          });
        }
      }), external_react_default.a.createElement("label", {
        htmlFor: "step".concat(index, "_optional_step")
      }, "Optional Step")), external_react_default.a.createElement("div", {
        className: "line-checkbox"
      }, external_react_default.a.createElement("input", {
        type: "checkbox",
        id: "step".concat(index, "_inverted_step"),
        checked: currentStep.inverted,
        onChange: function onChange(e) {
          var inverted = e.target.checked;
          updateStepUI({
            step: index,
            payload: {
              inverted: inverted
            }
          });
        }
      }), external_react_default.a.createElement("label", {
        htmlFor: "step".concat(index, "_inverted_step")
      }, "Inverted Step")), external_react_default.a.createElement("div", {
        className: "line-checkbox"
      }, external_react_default.a.createElement("input", {
        type: "checkbox",
        id: "step".concat(index, "_with_actors_step"),
        checked: currentStep.withActors,
        onChange: function onChange(e) {
          var withActors = e.target.checked;
          updateStepUI({
            step: index,
            payload: {
              withActors: withActors
            }
          });
        }
      }), external_react_default.a.createElement("label", {
        htmlFor: "step".concat(index, "_with_actors_step")
      }, "With Actors")))));
    }
  }]);

  return Step;
}(external_react_["Component"]);

/* harmony default export */ var explorer_Step = (Object(external_react_redux_["connect"])(Step_mapStateToProps, Step_mapDispatchToProps)(Step_Step));
// CONCATENATED MODULE: ./lib/js/app/components/explorer/ActorProperty.js
function ActorProperty_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { ActorProperty_typeof = function _typeof(obj) { return typeof obj; }; } else { ActorProperty_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return ActorProperty_typeof(obj); }

function ActorProperty_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ActorProperty_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ActorProperty_createClass(Constructor, protoProps, staticProps) { if (protoProps) ActorProperty_defineProperties(Constructor.prototype, protoProps); if (staticProps) ActorProperty_defineProperties(Constructor, staticProps); return Constructor; }

function ActorProperty_possibleConstructorReturn(self, call) { if (call && (ActorProperty_typeof(call) === "object" || typeof call === "function")) { return call; } return ActorProperty_assertThisInitialized(self); }

function ActorProperty_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function ActorProperty_getPrototypeOf(o) { ActorProperty_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return ActorProperty_getPrototypeOf(o); }

function ActorProperty_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) ActorProperty_setPrototypeOf(subClass, superClass); }

function ActorProperty_setPrototypeOf(o, p) { ActorProperty_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return ActorProperty_setPrototypeOf(o, p); }







var ActorProperty_mapStateToProps = function mapStateToProps(state
/*, ownProps*/
) {
  return {
    schemas: state.collections.schemas,
    steps: state.ui.steps
  };
};

var ActorProperty_mapDispatchToProps = {
  updateStepUI: ui_updateStepUI
};

var ActorProperty_ActorProperty =
/*#__PURE__*/
function (_Component) {
  ActorProperty_inherits(ActorProperty, _Component);

  function ActorProperty() {
    ActorProperty_classCallCheck(this, ActorProperty);

    return ActorProperty_possibleConstructorReturn(this, ActorProperty_getPrototypeOf(ActorProperty).apply(this, arguments));
  }

  ActorProperty_createClass(ActorProperty, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          step = _this$props.step,
          steps = _this$props.steps,
          schemas = _this$props.schemas,
          updateStepUI = _this$props.updateStepUI;
      var actorProperty = this.props.steps[step].actorProperty;
      var eventCollection = steps[step].eventCollection;
      var schema = schemas[eventCollection] || {};
      return external_react_default.a.createElement(external_react_["Fragment"], null, external_react_default.a.createElement("div", {
        className: "label-main"
      }, "Actor property"), external_react_default.a.createElement(shared_ReactSelect, {
        value: {
          label: actorProperty,
          value: actorProperty
        },
        options: Object.keys(schema).map(function (item) {
          return {
            label: item,
            value: item
          };
        }),
        onChange: function onChange(selectedItem) {
          updateStepUI({
            step: step,
            payload: {
              actorProperty: selectedItem.value
            }
          });
        },
        theme: getThemeForSelect
      }));
    }
  }]);

  return ActorProperty;
}(external_react_["Component"]);

/* harmony default export */ var explorer_ActorProperty = (Object(external_react_redux_["connect"])(ActorProperty_mapStateToProps, ActorProperty_mapDispatchToProps)(ActorProperty_ActorProperty));
// CONCATENATED MODULE: ./lib/js/app/components/explorer/SavedQuery.js
function SavedQuery_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { SavedQuery_typeof = function _typeof(obj) { return typeof obj; }; } else { SavedQuery_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return SavedQuery_typeof(obj); }

function SavedQuery_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function SavedQuery_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function SavedQuery_createClass(Constructor, protoProps, staticProps) { if (protoProps) SavedQuery_defineProperties(Constructor.prototype, protoProps); if (staticProps) SavedQuery_defineProperties(Constructor, staticProps); return Constructor; }

function SavedQuery_possibleConstructorReturn(self, call) { if (call && (SavedQuery_typeof(call) === "object" || typeof call === "function")) { return call; } return SavedQuery_assertThisInitialized(self); }

function SavedQuery_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function SavedQuery_getPrototypeOf(o) { SavedQuery_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return SavedQuery_getPrototypeOf(o); }

function SavedQuery_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) SavedQuery_setPrototypeOf(subClass, superClass); }

function SavedQuery_setPrototypeOf(o, p) { SavedQuery_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return SavedQuery_setPrototypeOf(o, p); }










var SavedQuery_mapStateToProps = function mapStateToProps(state) {
  return {
    isSavingQuery: state.queries.isSavingQuery,
    results: state.queries.results,
    analysisType: state.ui.analysisType,
    chartType: state.ui.chartType,
    uiSavedQuery: state.ui.savedQuery,
    uiStepLabels: state.ui.stepLabels
  };
};

var SavedQuery_mapDispatchToProps = {
  updateSavedQueryUI: updateSavedQueryUI,
  resetSavedQueryUI: resetSavedQueryUI,
  saveQuery: client_saveQuery,
  deleteQuery: client_deleteQuery
};

var SavedQuery_SavedQuery =
/*#__PURE__*/
function (_Component) {
  SavedQuery_inherits(SavedQuery, _Component);

  function SavedQuery(props) {
    var _this;

    SavedQuery_classCallCheck(this, SavedQuery);

    _this = SavedQuery_possibleConstructorReturn(this, SavedQuery_getPrototypeOf(SavedQuery).call(this, props));
    _this.state = {
      error: null
    };
    return _this;
  }

  SavedQuery_createClass(SavedQuery, [{
    key: "save",
    value: function save() {
      this.setState({
        error: null
      });
      var _this$props = this.props,
          chartType = _this$props.chartType,
          queryParams = _this$props.queryParams,
          uiSavedQuery = _this$props.uiSavedQuery,
          uiStepLabels = _this$props.uiStepLabels,
          analysisType = _this$props.analysisType;
      var displayName = uiSavedQuery.displayName,
          name = uiSavedQuery.name,
          refreshRate = uiSavedQuery.refreshRate;

      if (!displayName) {
        this.setState({
          error: 'Name is required'
        });
        return;
      }

      var stepLabels;

      if (analysisType === 'funnel') {
        if (uiStepLabels && uiStepLabels.length && uiStepLabels[0]) {
          stepLabels = uiStepLabels;
        }

        queryParams.eventCollection = undefined;
        queryParams.filters = undefined;
        queryParams.timeframe = undefined;
        queryParams.timezone = undefined;
      }

      this.props.saveQuery({
        name: name,
        body: {
          query: queryParams,
          metadata: {
            displayName: displayName,
            visualization: {
              chartType: chartType,
              stepLabels: stepLabels
            }
          },
          refreshRate: refreshRate * 60 * 60
        }
      });
    }
  }, {
    key: "delete",
    value: function _delete() {
      this.setState({
        error: null
      });
      var uiSavedQuery = this.props.uiSavedQuery;
      var name = uiSavedQuery.name;
      this.props.deleteQuery({
        name: name
      });
    }
  }, {
    key: "clone",
    value: function clone() {
      this.setState({
        error: null
      });
      this.props.resetSavedQueryUI();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          uiSavedQuery = _this$props2.uiSavedQuery,
          isSavingQuery = _this$props2.isSavingQuery;
      var error = this.state.error;
      var name = uiSavedQuery.name,
          displayName = uiSavedQuery.displayName,
          cache = uiSavedQuery.cache,
          refreshRate = uiSavedQuery.refreshRate,
          exists = uiSavedQuery.exists;
      var refreshRates = [];

      for (var i = 4; i < 49; i++) {
        refreshRates.push(i);
      }

      return external_react_default.a.createElement("div", {
        className: "saved-query"
      }, external_react_default.a.createElement("div", null, external_react_default.a.createElement("input", {
        className: "input-name",
        placeholder: "Give your query a name...",
        type: "text",
        value: displayName,
        onChange: function onChange(e) {
          _this2.props.updateSavedQueryUI({
            name: slugify(e.target.value),
            displayName: e.target.value,
            exists: false
          });
        }
      }), name && external_react_default.a.createElement("div", {
        className: "resource-name"
      }, external_react_default.a.createElement("div", {
        className: "line line-label"
      }, "Saved query resource name:"), external_react_default.a.createElement("div", {
        className: "line"
      }, external_react_default.a.createElement("span", {
        className: "name"
      }, name), external_react_default.a.createElement("a", {
        className: "button-copy",
        onClick: function onClick() {
          return copyToClipboard(name);
        }
      }, external_react_default.a.createElement("i", {
        className: "fas fa-copy"
      }))))), external_react_default.a.createElement("div", {
        className: "cache"
      }, external_react_default.a.createElement("div", {
        className: "line-checkbox"
      }, external_react_default.a.createElement("input", {
        type: "checkbox",
        id: "cacheInput",
        checked: cache,
        onChange: function onChange(e) {
          _this2.props.updateSavedQueryUI({
            cache: !cache,
            refreshRate: !cache ? 4 : 0
          });
        }
      }), external_react_default.a.createElement("label", {
        htmlFor: "cacheInput"
      }, "Cache")), cache && external_react_default.a.createElement("div", {
        className: "cache-refresh"
      }, external_react_default.a.createElement("div", {
        className: "label-main"
      }, "Refresh interval [hours]"), external_react_default.a.createElement(external_react_select_default.a, {
        value: refreshRate && {
          label: refreshRate,
          value: refreshRate
        },
        options: refreshRates.map(function (item) {
          return {
            label: item,
            value: item
          };
        }),
        onChange: function onChange(value) {
          _this2.props.updateSavedQueryUI({
            refreshRate: value.value
          });
        },
        theme: getThemeForSelect
      }))), error && external_react_default.a.createElement("div", {
        className: "error"
      }, error), external_react_default.a.createElement("div", {
        className: "buttons"
      }, !exists && external_react_default.a.createElement("button", {
        className: "button-save button-with-loading-spinner",
        onClick: function onClick() {
          return _this2.save();
        }
      }, isSavingQuery && external_react_default.a.createElement(shared_LoadingSpinner, null), "Save"), exists && external_react_default.a.createElement("button", {
        className: "button-save button-with-loading-spinner",
        onClick: function onClick() {
          return _this2.save();
        }
      }, isSavingQuery && external_react_default.a.createElement(shared_LoadingSpinner, null), "Update"), exists && external_react_default.a.createElement("button", {
        className: "button button-clone",
        onClick: function onClick() {
          return _this2.clone();
        }
      }, "Clone"), exists && external_react_default.a.createElement("button", {
        className: "button button-delete",
        onClick: function onClick() {
          return _this2["delete"]();
        }
      }, "Delete")));
    }
  }]);

  return SavedQuery;
}(external_react_["Component"]);

/* harmony default export */ var explorer_SavedQuery = (Object(external_react_redux_["connect"])(SavedQuery_mapStateToProps, SavedQuery_mapDispatchToProps)(SavedQuery_SavedQuery));
// EXTERNAL MODULE: external "moment-timezone"
var external_moment_timezone_ = __webpack_require__(78);
var external_moment_timezone_default = /*#__PURE__*/__webpack_require__.n(external_moment_timezone_);

// CONCATENATED MODULE: ./lib/js/app/redux/actionCreators/queries.js
var updateSavedQueries = function updateSavedQueries(result) {
  return {
    type: 'UPDATE_SAVED_QUERIES',
    payload: result
  };
};
var queries_resetResults = function resetResults() {
  return {
    type: 'QUERY_RESET_RESULTS'
  };
};
// CONCATENATED MODULE: ./lib/js/app/components/explorer/SavedQueryBrowser.js
function SavedQueryBrowser_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { SavedQueryBrowser_typeof = function _typeof(obj) { return typeof obj; }; } else { SavedQueryBrowser_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return SavedQueryBrowser_typeof(obj); }

function SavedQueryBrowser_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { SavedQueryBrowser_defineProperty(target, key, source[key]); }); } return target; }

function SavedQueryBrowser_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function SavedQueryBrowser_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function SavedQueryBrowser_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function SavedQueryBrowser_createClass(Constructor, protoProps, staticProps) { if (protoProps) SavedQueryBrowser_defineProperties(Constructor.prototype, protoProps); if (staticProps) SavedQueryBrowser_defineProperties(Constructor, staticProps); return Constructor; }

function SavedQueryBrowser_possibleConstructorReturn(self, call) { if (call && (SavedQueryBrowser_typeof(call) === "object" || typeof call === "function")) { return call; } return SavedQueryBrowser_assertThisInitialized(self); }

function SavedQueryBrowser_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function SavedQueryBrowser_getPrototypeOf(o) { SavedQueryBrowser_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return SavedQueryBrowser_getPrototypeOf(o); }

function SavedQueryBrowser_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) SavedQueryBrowser_setPrototypeOf(subClass, superClass); }

function SavedQueryBrowser_setPrototypeOf(o, p) { SavedQueryBrowser_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return SavedQueryBrowser_setPrototypeOf(o, p); }









var SavedQueryBrowser_mapStateToProps = function mapStateToProps(state) {
  return {
    savedQueries: state.queries.saved,
    savedQuery: state.ui.savedQuery,
    timezone: state.ui.timezone,
    schemas: state.collections.schemas
  };
};

var SavedQueryBrowser_mapDispatchToProps = {
  updateSavedQueries: updateSavedQueries,
  updateUI: ui_updateUI,
  fetchSavedQueries: client_fetchSavedQueries,
  resetResults: queries_resetResults
};

var SavedQueryBrowser_SavedQueryBrowser =
/*#__PURE__*/
function (_Component) {
  SavedQueryBrowser_inherits(SavedQueryBrowser, _Component);

  function SavedQueryBrowser(props) {
    var _this;

    SavedQueryBrowser_classCallCheck(this, SavedQueryBrowser);

    _this = SavedQueryBrowser_possibleConstructorReturn(this, SavedQueryBrowser_getPrototypeOf(SavedQueryBrowser).call(this, props));
    _this.state = {
      error: null,
      filter: ''
    };
    return _this;
  }

  SavedQueryBrowser_createClass(SavedQueryBrowser, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.fetchSavedQueries();
    }
  }, {
    key: "getName",
    value: function getName(item) {
      if (item.metadata && item.metadata.display_name) {
        return item.metadata.display_name;
      }

      return item.query_name;
    }
  }, {
    key: "updateFilter",
    value: function updateFilter(e) {
      this.setState({
        filter: e.target.value
      });
    }
  }, {
    key: "getTypeAndValue",
    value: function getTypeAndValue(_ref) {
      var filter = _ref.filter,
          eventCollection = _ref.eventCollection;
      var propertyName = filter.property_name,
          operator = filter.operator,
          propertyValue = filter.property_value;
      var schemas = this.props.schemas && Object.keys(this.props.schemas).length;
      var schema = schemas && schemas[eventCollection];
      var propertyType = filter_getPropertyType({
        schema: schema,
        filter: filter
      });
      return {
        propertyValue: propertyValue,
        propertyType: propertyType
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          savedQueries = _this$props.savedQueries,
          savedQuery = _this$props.savedQuery,
          timezone = _this$props.timezone,
          updateUI = _this$props.updateUI,
          resetResults = _this$props.resetResults;

      var translateDeprecatedCharts = function translateDeprecatedCharts(chartType) {
        var map = {
          areachart: 'area',
          barchart: 'horizontal-bar',
          columnchart: 'bar',
          linechart: 'line',
          piechart: 'pie'
        };
        return map[chartType] || chartType || 'JSON';
      };

      var activeSavedQuery = savedQuery && savedQuery.name;
      var filter = this.state.filter;
      var error = this.state.error;
      return external_react_default.a.createElement("div", {
        className: "saved-queries"
      }, error && external_react_default.a.createElement("div", {
        className: "error"
      }, error), external_react_default.a.createElement("input", {
        className: "input-filter",
        placeholder: "Search...",
        type: "text",
        value: filter,
        onChange: function onChange(e) {
          return _this2.updateFilter(e);
        }
      }), savedQueries.filter(function (item) {
        return _this2.getName(item).toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      }).map(function (item, index) {
        return external_react_default.a.createElement("div", {
          key: item.query_name,
          className: "item ".concat(activeSavedQuery === item.query_name && 'active'),
          onClick: function onClick() {
            var query = item.query,
                metadata = item.metadata;
            var stepLabels = [''];

            if (query.analysis_type === 'funnel') {
              stepLabels = metadata.visualization.step_labels || [''];
            }

            var chartType = translateDeprecatedCharts(metadata.visualization.chart_type);
            resetResults();

            if (query.analysis_type === 'multi_analysis') {
              updateUI({
                error: {
                  body: 'Multi-Analysis is not supported by the Explorer'
                }
              });
              return;
            }

            updateUI({
              panelSave: true,
              autoload: true,
              analysisType: query.analysis_type,
              eventCollection: query.event_collection,
              timezone: query.timezone,
              targetProperty: query.target_property,
              timeframe: query.timeframe,
              groupBy: query.group_by,
              orderBy: query.order_by && query.order_by.direction && {
                property_name: 'result',
                direction: query.order_by.direction
              },
              interval: query.interval,
              filters: (query.filters || []).map(function (item) {
                return SavedQueryBrowser_objectSpread({
                  propertyName: item.property_name,
                  operator: item.operator
                }, _this2.getTypeAndValue({
                  filter: item,
                  eventCollection: query.event_collection
                }));
              }),
              chartType: chartType,
              savedQuery: {
                name: item.query_name,
                displayName: metadata.display_name,
                exists: true,
                cache: !!item.refresh_rate,
                refreshRate: item.refresh_rate / 60 / 60
              },
              steps: (query.steps || []).map(function (item) {
                return {
                  actorProperty: item.actor_property,
                  eventCollection: item.event_collection,
                  filters: (item.filters || []).map(function (filteritem) {
                    return SavedQueryBrowser_objectSpread({
                      propertyName: filteritem.property_name,
                      operator: filteritem.operator
                    }, _this2.getTypeAndValue({
                      filter: filteritem,
                      eventCollection: query.event_collection
                    }));
                  }),
                  inverted: item.inverted,
                  optional: item.optional,
                  timeframe: item.timeframe,
                  timezone: item.timezone,
                  withActors: item.with_actors
                };
              }),
              stepLabels: stepLabels
            });
          }
        }, external_react_default.a.createElement("div", {
          className: "name"
        }, _this2.getName(item)), external_react_default.a.createElement("div", {
          className: "cached"
        }, !!item.refresh_rate && external_react_default.a.createElement("span", null, "Cached")), external_react_default.a.createElement("div", {
          className: "data"
        }, external_moment_timezone_default()(item.last_modified_date).format('MMMM Do YYYY, h:mm:ss a')));
      }));
    }
  }]);

  return SavedQueryBrowser;
}(external_react_["Component"]);

/* harmony default export */ var explorer_SavedQueryBrowser = (Object(external_react_redux_["connect"])(SavedQueryBrowser_mapStateToProps, SavedQueryBrowser_mapDispatchToProps)(SavedQueryBrowser_SavedQueryBrowser));
// EXTERNAL MODULE: external "keen-dataviz"
var external_keen_dataviz_ = __webpack_require__(167);
var external_keen_dataviz_default = /*#__PURE__*/__webpack_require__.n(external_keen_dataviz_);

// EXTERNAL MODULE: ./node_modules/keen-dataviz/dist/keen-dataviz.css
var keen_dataviz = __webpack_require__(379);

// CONCATENATED MODULE: ./lib/js/app/utils/csv.js
var exportToCsv = function exportToCsv(data, filename) {
  var csvContent = '';
  data.forEach(function (row, i) {
    row.forEach(function (cell, j) {
      csvContent += String(cell).replace(/,/g, '');

      if (row.length > j + 1) {
        csvContent += ',';
      }
    });

    if (data.length > i + 1) {
      csvContent += '\n';
    }
  });
  var filenameWithExt = filename;

  if (!filename.includes('.csv')) {
    filenameWithExt = "".concat(filename, ".csv");
  }

  var htmlElement = document.createElement('a');
  htmlElement.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURI(csvContent));
  htmlElement.setAttribute('download', filenameWithExt);
  document.body.appendChild(htmlElement);
  htmlElement.click();
};
// CONCATENATED MODULE: ./lib/js/app/utils/json.js
var exportToJson = function exportToJson(data, filename) {
  var htmlElement = document.createElement('a');
  htmlElement.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURI(JSON.stringify(data)));
  var filenameWithExt = filename;

  if (!filename.includes('.json')) {
    filenameWithExt = "".concat(filename, ".json");
  }

  htmlElement.setAttribute('download', filenameWithExt);
  document.body.appendChild(htmlElement);
  htmlElement.click();
};
// CONCATENATED MODULE: ./lib/js/app/components/explorer/Dataviz.js
function Dataviz_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Dataviz_typeof = function _typeof(obj) { return typeof obj; }; } else { Dataviz_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Dataviz_typeof(obj); }

function Dataviz_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Dataviz_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Dataviz_createClass(Constructor, protoProps, staticProps) { if (protoProps) Dataviz_defineProperties(Constructor.prototype, protoProps); if (staticProps) Dataviz_defineProperties(Constructor, staticProps); return Constructor; }

function Dataviz_possibleConstructorReturn(self, call) { if (call && (Dataviz_typeof(call) === "object" || typeof call === "function")) { return call; } return Dataviz_assertThisInitialized(self); }

function Dataviz_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Dataviz_getPrototypeOf(o) { Dataviz_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Dataviz_getPrototypeOf(o); }

function Dataviz_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Dataviz_setPrototypeOf(subClass, superClass); }

function Dataviz_setPrototypeOf(o, p) { Dataviz_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Dataviz_setPrototypeOf(o, p); }










var Dataviz_mapStateToProps = function mapStateToProps(state) {
  return {
    results: state.queries.results,
    type: state.ui.chartType,
    queryName: state.ui.savedQuery.name,
    modalEmbedHTML: state.ui.modalEmbedHTML,
    modalFilters: state.ui.modalFilters,
    analysisType: state.ui.analysisType,
    stepLabels: state.ui.stepLabels,
    timezone: state.ui.timezone
  };
};

var Dataviz_mapDispatchToProps = {};

var Dataviz_DatavizComponent =
/*#__PURE__*/
function (_Component) {
  Dataviz_inherits(DatavizComponent, _Component);

  function DatavizComponent(props) {
    var _this;

    Dataviz_classCallCheck(this, DatavizComponent);

    _this = Dataviz_possibleConstructorReturn(this, Dataviz_getPrototypeOf(DatavizComponent).call(this, props));
    _this.state = {
      showDownloadButtons: false
    };
    _this.downloadToggleRef = external_react_default.a.createRef();
    return _this;
  }

  Dataviz_createClass(DatavizComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.generateChart();
      this.handleClick = this.handleClick.bind(this);
      document.addEventListener('click', this.handleClick, false);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.handleClick, false);
    }
  }, {
    key: "handleClick",
    value: function handleClick(e) {
      if (!this.downloadToggleRef.current.contains(e.target)) {
        this.setState({
          showDownloadButtons: false
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.queryName !== this.props.queryName) {
        return;
      }

      var _this$props = this.props,
          results = _this$props.results,
          type = _this$props.type,
          analysisType = _this$props.analysisType,
          stepLabels = _this$props.stepLabels,
          timezone = _this$props.timezone;

      if (prevProps.analysisType !== analysisType || prevProps.stepLabels.toString() !== stepLabels.toString() || prevProps.type !== type || prevProps.timezone !== timezone || JSON.stringify(prevProps.results) !== JSON.stringify(results)) {
        console.log('regenerate chart');
        this.generateChart();
      }
    }
  }, {
    key: "getData",
    value: function getData() {
      return this.dataviz && this.dataviz.dataset && this.dataviz.dataset.matrix;
    }
  }, {
    key: "generateChart",
    value: function generateChart() {
      var _this$props2 = this.props,
          results = _this$props2.results,
          type = _this$props2.type,
          analysisType = _this$props2.analysisType,
          stepLabels = _this$props2.stepLabels,
          timezone = _this$props2.timezone;

      if (results) {
        if (typeof results.result === 'string') {
          return;
        }

        var labels;
        var funnel;

        if (analysisType === 'funnel') {
          var metadata = results.metadata;

          if (metadata) {
            var visualization = metadata.visualization;

            if (visualization) {
              var _stepLabels = visualization.stepLabels;
              labels = _stepLabels;
            }
          }

          if (stepLabels && stepLabels.length && stepLabels[0]) {
            labels = stepLabels;
          }

          funnel = {
            percents: {
              show: true
            }
          };
        }

        var timezoneByValue = TIMEZONES.find(function (item) {
          return item.value === timezone;
        });
        var timezoneString = timezoneByValue && timezoneByValue.label || 'UTC';

        if (this.dataviz) {
          this.dataviz.destroy();
        }

        if (type && results.metadata && results.metadata.visualization && !results.metadata.visualization.chart_type) {
          results.metadata.visualization.chart_type = type;
        }

        this.dataviz = new external_keen_dataviz_default.a({
          container: '#keen-dataviz-container',
          type: type,
          // title: 'New Customers per Week',
          title: false,
          labels: labels,
          // funnel step labels
          showLoadingSpinner: true,
          results: results,
          funnel: funnel,
          onrendered: function onrendered() {},
          table: {
            mapDates: function mapDates(value) {
              return external_moment_timezone_default.a.tz(value, 'UTC').clone().tz(timezoneString).toString();
            }
          },
          sortGroups: 'desc',
          legend: {
            label: {
              textMaxLength: 30
            }
          }
        });
      }
    }
  }, {
    key: "exportToPNG",
    value: function exportToPNG() {
      return this.dataviz && this.dataviz.exportImage({
        bgcolor: 'white'
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          results = _this$props3.results,
          modalEmbedHTML = _this$props3.modalEmbedHTML,
          modalFilters = _this$props3.modalFilters;
      var showDownloadButtons = this.state.showDownloadButtons;
      var filename = this.props.queryName || 'untitled-query';
      var resultIsString = typeof results.result === 'string';
      return external_react_default.a.createElement(external_react_["Fragment"], null, !resultIsString && external_react_default.a.createElement("div", {
        className: "keen-dataviz-container ".concat(modalEmbedHTML || modalFilters ? 'hide' : ''),
        id: "keen-dataviz-container"
      }), resultIsString && external_react_default.a.createElement("div", {
        className: "keen-dataviz-container ".concat(modalEmbedHTML || modalFilters ? 'hide' : '', " result-string")
      }, external_react_default.a.createElement("div", null, results.result)), external_react_default.a.createElement("div", {
        className: "download-toggle",
        ref: this.downloadToggleRef
      }, external_react_default.a.createElement("div", {
        className: "download-toggle-label",
        onClick: function onClick() {
          _this2.setState({
            showDownloadButtons: !showDownloadButtons
          });
        }
      }, external_react_default.a.createElement("i", {
        className: "fas fa-download"
      }), "Download"), showDownloadButtons && external_react_default.a.createElement("div", {
        className: "download-buttons"
      }, external_react_default.a.createElement("button", {
        className: "button-download button-download-csv",
        onClick: function onClick() {
          return exportToCsv(_this2.getData(), filename);
        }
      }, "CSV"), external_react_default.a.createElement("button", {
        className: "button-download button-download-json",
        onClick: function onClick() {
          return exportToJson(results, filename);
        }
      }, "JSON"), external_react_default.a.createElement("button", {
        className: "button-download button-download-png",
        onClick: function onClick() {
          return _this2.exportToPNG();
        }
      }, "PNG"))));
    }
  }]);

  return DatavizComponent;
}(external_react_["Component"]);

/* harmony default export */ var Dataviz = (Object(external_react_redux_["connect"])(Dataviz_mapStateToProps, Dataviz_mapDispatchToProps)(Dataviz_DatavizComponent));
// CONCATENATED MODULE: ./lib/js/app/components/explorer/JsonView.js
function JsonView_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { JsonView_typeof = function _typeof(obj) { return typeof obj; }; } else { JsonView_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return JsonView_typeof(obj); }

function JsonView_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function JsonView_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function JsonView_createClass(Constructor, protoProps, staticProps) { if (protoProps) JsonView_defineProperties(Constructor.prototype, protoProps); if (staticProps) JsonView_defineProperties(Constructor, staticProps); return Constructor; }

function JsonView_possibleConstructorReturn(self, call) { if (call && (JsonView_typeof(call) === "object" || typeof call === "function")) { return call; } return JsonView_assertThisInitialized(self); }

function JsonView_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function JsonView_getPrototypeOf(o) { JsonView_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return JsonView_getPrototypeOf(o); }

function JsonView_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) JsonView_setPrototypeOf(subClass, superClass); }

function JsonView_setPrototypeOf(o, p) { JsonView_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return JsonView_setPrototypeOf(o, p); }





var JsonView_mapStateToProps = function mapStateToProps(state) {
  return {
    results: state.queries.results
  };
};

var JsonView_mapDispatchToProps = {};

var JsonView_JsonView =
/*#__PURE__*/
function (_Component) {
  JsonView_inherits(JsonView, _Component);

  function JsonView() {
    JsonView_classCallCheck(this, JsonView);

    return JsonView_possibleConstructorReturn(this, JsonView_getPrototypeOf(JsonView).apply(this, arguments));
  }

  JsonView_createClass(JsonView, [{
    key: "render",
    value: function render() {
      return external_react_default.a.createElement(external_react_json_view_default.a, {
        src: this.props.results,
        style: {
          'fontFamily': 'inherit'
        },
        collapsed: true,
        displayDataTypes: false,
        sortKeys: true
      });
    }
  }]);

  return JsonView;
}(external_react_["Component"]);

/* harmony default export */ var explorer_JsonView = (Object(external_react_redux_["connect"])(JsonView_mapStateToProps, JsonView_mapDispatchToProps)(JsonView_JsonView));
// CONCATENATED MODULE: ./lib/js/app/components/explorer/Foldable.js
function Foldable_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Foldable_typeof = function _typeof(obj) { return typeof obj; }; } else { Foldable_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Foldable_typeof(obj); }

function Foldable_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Foldable_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Foldable_createClass(Constructor, protoProps, staticProps) { if (protoProps) Foldable_defineProperties(Constructor.prototype, protoProps); if (staticProps) Foldable_defineProperties(Constructor, staticProps); return Constructor; }

function Foldable_possibleConstructorReturn(self, call) { if (call && (Foldable_typeof(call) === "object" || typeof call === "function")) { return call; } return Foldable_assertThisInitialized(self); }

function Foldable_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Foldable_getPrototypeOf(o) { Foldable_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Foldable_getPrototypeOf(o); }

function Foldable_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Foldable_setPrototypeOf(subClass, superClass); }

function Foldable_setPrototypeOf(o, p) { Foldable_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Foldable_setPrototypeOf(o, p); }



var Foldable_Foldable =
/*#__PURE__*/
function (_Component) {
  Foldable_inherits(Foldable, _Component);

  function Foldable(props) {
    var _this;

    Foldable_classCallCheck(this, Foldable);

    _this = Foldable_possibleConstructorReturn(this, Foldable_getPrototypeOf(Foldable).call(this, props));
    _this.state = {
      active: _this.props.defaultActive
    };
    return _this;
  }

  Foldable_createClass(Foldable, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (!prevProps.defaultActive && this.props.defaultActive) {
        this.setState({
          active: this.props.defaultActive
        });
      }
    }
  }, {
    key: "onChange",
    value: function onChange() {
      var _this$props = this.props,
          onOpen = _this$props.onOpen,
          onClose = _this$props.onClose,
          onChange = _this$props.onChange;
      var active = this.state.active;

      if (onChange) {
        onChange(active);
      }

      if (onOpen && active) {
        onOpen();
      }

      if (onClose && !active) {
        onClose();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var title = this.props.title;
      var active = this.state.active;
      return external_react_default.a.createElement("div", {
        className: "foldable ".concat(active && 'foldableActive')
      }, external_react_default.a.createElement("div", {
        className: "title",
        onClick: function onClick() {
          _this2.setState({
            active: !active
          }, function () {
            return _this2.onChange();
          });
        }
      }, external_react_default.a.createElement("span", null, title), external_react_default.a.createElement("div", {
        className: "icon"
      }, active ? '-' : '+')), active && external_react_default.a.createElement("div", {
        className: "content"
      }, this.props.children));
    }
  }]);

  return Foldable;
}(external_react_["Component"]);


// EXTERNAL MODULE: ./node_modules/prismjs/components/prism-core.js
var prism_core = __webpack_require__(113);
var prism_core_default = /*#__PURE__*/__webpack_require__.n(prism_core);

// EXTERNAL MODULE: ./node_modules/prismjs/components/prism-clike.js
var prism_clike = __webpack_require__(381);

// EXTERNAL MODULE: ./node_modules/prismjs/components/prism-javascript.js
var prism_javascript = __webpack_require__(382);

// EXTERNAL MODULE: ./node_modules/prismjs/components/prism-css.js
var prism_css = __webpack_require__(383);

// EXTERNAL MODULE: ./node_modules/prismjs/components/prism-markup.js
var prism_markup = __webpack_require__(384);

// EXTERNAL MODULE: ./node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css
var prism_line_numbers = __webpack_require__(385);

// EXTERNAL MODULE: ./node_modules/prismjs/plugins/line-numbers/prism-line-numbers.js
var line_numbers_prism_line_numbers = __webpack_require__(387);

// EXTERNAL MODULE: ./node_modules/prismjs/themes/prism.css
var prism = __webpack_require__(388);

// CONCATENATED MODULE: ./lib/js/app/components/explorer/EmbedHTML.js
function EmbedHTML_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { EmbedHTML_typeof = function _typeof(obj) { return typeof obj; }; } else { EmbedHTML_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return EmbedHTML_typeof(obj); }

function EmbedHTML_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function EmbedHTML_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function EmbedHTML_createClass(Constructor, protoProps, staticProps) { if (protoProps) EmbedHTML_defineProperties(Constructor.prototype, protoProps); if (staticProps) EmbedHTML_defineProperties(Constructor, staticProps); return Constructor; }

function EmbedHTML_possibleConstructorReturn(self, call) { if (call && (EmbedHTML_typeof(call) === "object" || typeof call === "function")) { return call; } return EmbedHTML_assertThisInitialized(self); }

function EmbedHTML_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function EmbedHTML_getPrototypeOf(o) { EmbedHTML_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return EmbedHTML_getPrototypeOf(o); }

function EmbedHTML_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) EmbedHTML_setPrototypeOf(subClass, superClass); }

function EmbedHTML_setPrototypeOf(o, p) { EmbedHTML_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return EmbedHTML_setPrototypeOf(o, p); }













var EmbedHTML_mapStateToProps = function mapStateToProps(state) {
  return {
    ui: state.ui
  };
};

var EmbedHTML_mapDispatchToProps = {};

var EmbedHTML_EmbedHTML =
/*#__PURE__*/
function (_Component) {
  EmbedHTML_inherits(EmbedHTML, _Component);

  function EmbedHTML() {
    EmbedHTML_classCallCheck(this, EmbedHTML);

    return EmbedHTML_possibleConstructorReturn(this, EmbedHTML_getPrototypeOf(EmbedHTML).apply(this, arguments));
  }

  EmbedHTML_createClass(EmbedHTML, [{
    key: "renderIfDefined",
    value: function renderIfDefined(_ref) {
      var key = _ref.key,
          value = _ref.value;
      var savedQuery = this.props.ui.savedQuery;
      var propValue = this.props.ui[key];

      if (propValue) {
        if (key === 'filters' && !propValue.length) {
          return '';
        }

        return "            ".concat(key, ": ").concat(value, ",\n");
      }

      if (savedQuery && savedQuery.name && savedQuery.exists) {
        return "            ".concat(key, ": '").concat(savedQuery.name, "',\n");
      }

      return '';
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          projectId = _this$props.projectId,
          readKey = _this$props.readKey;
      var _this$props$ui = this.props.ui,
          analysisType = _this$props$ui.analysisType,
          eventCollection = _this$props$ui.eventCollection,
          targetProperty = _this$props$ui.targetProperty,
          timeframe = _this$props$ui.timeframe,
          timezone = _this$props$ui.timezone,
          filters = _this$props$ui.filters,
          interval = _this$props$ui.interval,
          groupBy = _this$props$ui.groupBy,
          orderBy = _this$props$ui.orderBy,
          limit = _this$props$ui.limit,
          savedQuery = _this$props$ui.savedQuery,
          propertyNames = _this$props$ui.propertyNames,
          latest = _this$props$ui.latest,
          percentile = _this$props$ui.percentile;
      var params = [];
      params.push(this.renderIfDefined({
        key: 'analysisType',
        value: "'".concat(analysisType, "'")
      }));
      params.push(this.renderIfDefined({
        key: 'eventCollection',
        value: "'".concat(eventCollection, "'")
      }));
      params.push(this.renderIfDefined({
        key: 'targetProperty',
        value: "'".concat(targetProperty, "'")
      }));
      params.push(this.renderIfDefined({
        key: 'timeframe',
        value: "".concat(JSON.stringify(timeframe))
      }));
      params.push(this.renderIfDefined({
        key: 'interval',
        value: "'".concat(interval, "'")
      }));
      params.push(this.renderIfDefined({
        key: 'groupBy',
        value: "".concat(JSON.stringify(groupBy))
      }));
      params.push(this.renderIfDefined({
        key: 'limit',
        value: "'".concat(limit, "'")
      }));
      params.push(this.renderIfDefined({
        key: 'orderBy',
        value: "".concat(JSON.stringify(orderBy))
      }));
      params.push(this.renderIfDefined({
        key: 'filters',
        value: "".concat(JSON.stringify(filters))
      }));
      params.push(this.renderIfDefined({
        key: 'timezone',
        value: "".concat(timezone)
      }));
      params.push(this.renderIfDefined({
        key: 'percentile',
        value: "".concat(JSON.stringify(percentile))
      }));

      if (analysisType === 'extraction') {
        params.push(this.renderIfDefined({
          key: 'propertyNames',
          value: "".concat(JSON.stringify(propertyNames))
        }));
        params.push(this.renderIfDefined({
          key: 'latest',
          value: "".concat(JSON.stringify(latest))
        }));
      }

      if (savedQuery && savedQuery.name && savedQuery.exists) {
        params.length = 0;
      }

      params.push(this.renderIfDefined({
        key: 'savedQueryName'
      }));
      var code = "<html>\n    <head>\n      <meta charset=\"utf-8\">\n      <script crossorigin src=\"https://cdn.jsdelivr.net/npm/keen-analysis@3\"></script>\n      <link href=\"https://cdn.jsdelivr.net/npm/keen-dataviz@3/dist/keen-dataviz.min.css\" rel=\"stylesheet\" />\n      <script crossorigin src=\"https://cdn.jsdelivr.net/npm/keen-dataviz@3/dist/keen-dataviz.min.js\"></script>\n    </head>\n    <body>\n      <div id=\"demo_container\"></div>\n      <style>\n        #demo_container{\n          min-height: 300px;\n        }\n      </style>\n  \n      <script>\n        const chart = new KeenDataviz({\n          container: '#demo_container', // querySelector\n          title: false\n        });\n  \n        // Use keen-analysis.js to run a query\n        const client = new KeenAnalysis({\n          projectId: '".concat(projectId, "',\n          readKey: '").concat(readKey, "'\n        });\n  \n        client\n          .query({\n").concat(params.join(''), "          })\n          .then(function(results){\n            chart\n              .render(results);\n          })\n          .catch(function(error){\n            chart\n              .message(error.message);\n          });\n      </script>\n    </body>\n  </html>");
      var prismedHtml = prism_core_default.a.highlight(code, prism_core_default.a.languages.javascript, 'javascript');
      return external_react_default.a.createElement(external_react_["Fragment"], null, external_react_default.a.createElement("div", {
        className: "container",
        dangerouslySetInnerHTML: {
          __html: prismedHtml
        }
      }), external_react_default.a.createElement("div", {
        className: "button-copy",
        onClick: function onClick() {
          return copyToClipboard(code);
        }
      }, "Copy ", external_react_default.a.createElement("i", {
        className: "fas fa-copy"
      })));
    }
  }]);

  return EmbedHTML;
}(external_react_["Component"]);

/* harmony default export */ var explorer_EmbedHTML = (Object(external_react_redux_["connect"])(EmbedHTML_mapStateToProps, EmbedHTML_mapDispatchToProps)(EmbedHTML_EmbedHTML));
// CONCATENATED MODULE: ./lib/js/app/utils/chartTypes.js
var getQueryDataType = function getQueryDataType(query) {
  var isInterval = typeof query.interval === 'string';
  var isGroupBy = typeof query.groupBy === 'string' || query.groupBy instanceof Array && query.groupBy.length === 1;
  var is2xGroupBy = query.groupBy instanceof Array && query.groupBy.length === 2;
  var dataType;

  if (query.analysisType === 'funnel') {
    dataType = 'cat-ordinal';
  } else if (query.analysisType === 'extraction') {
    dataType = 'extraction';
  } else if (query.analysisType === 'select_unique') {
    dataType = 'nominal';
  } // metric
  else if (!isGroupBy && !isInterval && !is2xGroupBy) {
      dataType = 'singular';
    } // groupBy, no interval
    else if (isGroupBy && !isInterval) {
        dataType = 'categorical';
      } // interval, no groupBy
      else if (isInterval && !isGroupBy && !is2xGroupBy) {
          dataType = 'chronological';
        } // interval, groupBy
        else if (isInterval && (isGroupBy || is2xGroupBy)) {
            dataType = 'cat-chronological';
          } // 2x groupBy
          // TODO: research possible dataType options
          else if (!isInterval && is2xGroupBy) {
              dataType = 'categorical';
            }

  if (query.analysisType === 'extraction') {
    dataType = 'extraction';
  }

  if (query.analysisType === 'funnel') {
    dataType = 'funnel';
  }

  return dataType;
};
var getChartTypeOptions = function getChartTypeOptions(query) {
  var dataTypes = {
    'singular': ['metric'],
    'categorical': ['bar', 'horizontal-bar', 'pie', 'donut', 'table'],
    'cat-interval': ['area', 'bar', 'horizontal-bar', 'line', 'spline', 'area-spline', 'step', 'area-step', 'table'],
    'cat-ordinal': ['area', 'bar', 'horizontal-bar', 'line', 'spline', 'area-spline', 'step', 'area-step', 'table'],
    'chronological': ['area', 'bar', 'line', 'spline', 'area-spline', 'step', 'area-step', 'table'],
    'cat-chronological': ['area', 'bar', 'horizontal-bar', 'line', 'spline', 'area-spline', 'step', 'area-step', 'table'],
    'nominal': ['table'],
    'extraction': ['table'],
    'funnel': ['horizontal-bar', 'funnel', 'horizontal-funnel', 'funnel-3d', 'horizontal-funnel-3d', 'table']
  };
  var queryDataType = getQueryDataType(query);
  return dataTypes[queryDataType].concat(['JSON']);
};
var responseSupportsChartType = function responseSupportsChartType(query, chartType) {
  return getChartTypeOptions(query).includes(chartType);
};
var isTableChartType = function isTableChartType(chartType) {
  return chartType == 'table';
};
// CONCATENATED MODULE: ./lib/js/app/utils/base64.js
function b64EncodeUnicode(str) {
  // first we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}
function b64DecodeUnicode(str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}
// CONCATENATED MODULE: ./lib/js/app/components/app.js
function app_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { app_typeof = function _typeof(obj) { return typeof obj; }; } else { app_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return app_typeof(obj); }

function app_toConsumableArray(arr) { return app_arrayWithoutHoles(arr) || app_iterableToArray(arr) || app_nonIterableSpread(); }

function app_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function app_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function app_arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function app_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { app_defineProperty(target, key, source[key]); }); } return target; }

function app_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function app_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function app_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function app_createClass(Constructor, protoProps, staticProps) { if (protoProps) app_defineProperties(Constructor.prototype, protoProps); if (staticProps) app_defineProperties(Constructor, staticProps); return Constructor; }

function app_possibleConstructorReturn(self, call) { if (call && (app_typeof(call) === "object" || typeof call === "function")) { return call; } return app_assertThisInitialized(self); }

function app_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function app_getPrototypeOf(o) { app_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return app_getPrototypeOf(o); }

function app_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) app_setPrototypeOf(subClass, superClass); }

function app_setPrototypeOf(o, p) { app_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return app_setPrototypeOf(o, p); }





























 // import { getPropertyType } from '../utils/filter';





var app_mapStateToProps = function mapStateToProps(state) {
  return {
    collections: state.collections,
    queries: state.queries,
    ui: state.ui,
    steps: state.ui.steps
  };
};

var app_mapDispatchToProps = {
  fetchProject: client_fetchProject,
  fetchSchema: client_fetchSchema,
  query: client_query,
  updateUI: ui_updateUI,
  updateStepUI: ui_updateStepUI,
  resetUI: ui_resetUI,
  togglePanelSave: ui_togglePanelSave,
  changeEventCollection: ui_changeEventCollection,
  addStep: ui_addStep
};
var defaultFeatures = {
  save: true
};

var app_App =
/*#__PURE__*/
function (_Component) {
  app_inherits(App, _Component);

  function App(props) {
    var _this;

    app_classCallCheck(this, App);

    _this = app_possibleConstructorReturn(this, app_getPrototypeOf(App).call(this, props));

    var features = app_objectSpread({}, defaultFeatures, props.features || {});

    _this.state = {
      features: features
    };
    return _this;
  }

  app_createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.fetchProject();
      external_react_modal_default.a.setAppElement(this.props.container);
      var url = new URL(window.location.href);
      var searchParams = new URLSearchParams(url.search);

      if (searchParams) {
        var UIencodedState = searchParams.get('state');

        if (UIencodedState) {
          var preloadState = JSON.parse(b64DecodeUnicode(UIencodedState));

          if (preloadState.analysisType !== 'extraction') {
            // don't autoload extractions
            preloadState.autoload = true;
          }

          this.props.updateUI(preloadState);
        }
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          ui = _this$props.ui,
          fetchSchema = _this$props.fetchSchema;
      var UIencodedState = b64EncodeUnicode(JSON.stringify(ui));
      var url = new URL(window.location.href);
      var query_string = url.search;
      var search_params = new URLSearchParams(query_string);
      var UIencodedStateOld = search_params.get('state');

      if (UIencodedState !== UIencodedStateOld) {
        search_params.set('state', UIencodedState);
        url.search = search_params.toString();
        history.pushState({}, '', url.toString());
      }

      var _this$props$ui = this.props.ui,
          autoload = _this$props$ui.autoload,
          savedQuery = _this$props$ui.savedQuery,
          analysisType = _this$props$ui.analysisType,
          steps = _this$props$ui.steps;
      var eventCollection = this.props.ui.eventCollection;

      if (analysisType === 'funnel') {
        eventCollection = steps[0].eventCollection;
      }

      if (prevProps.collections.items.length !== this.props.collections.items.length && !Object.keys(this.props.collections.schemas).length) {
        fetchSchema({
          eventCollection: eventCollection
        });
      }

      if (autoload) {
        ui.autoload = false;
        ui_updateUI({
          autoload: false
        });
        fetchSchema({
          eventCollection: eventCollection
        });
        var savedQueryName = savedQuery && savedQuery.name;
        this.runQuery({
          savedQueryName: savedQueryName
        });
      }
    }
  }, {
    key: "getQueryParams",
    value: function getQueryParams() {
      var _this$props$ui2 = this.props.ui,
          analysisType = _this$props$ui2.analysisType,
          eventCollection = _this$props$ui2.eventCollection,
          targetProperty = _this$props$ui2.targetProperty,
          timeframe = _this$props$ui2.timeframe,
          timezone = _this$props$ui2.timezone,
          filters = _this$props$ui2.filters,
          interval = _this$props$ui2.interval,
          groupBy = _this$props$ui2.groupBy,
          orderBy = _this$props$ui2.orderBy,
          limit = _this$props$ui2.limit,
          latest = _this$props$ui2.latest,
          propertyNames = _this$props$ui2.propertyNames,
          email = _this$props$ui2.email,
          extractionActiveTab = _this$props$ui2.extractionActiveTab,
          percentile = _this$props$ui2.percentile,
          steps = _this$props$ui2.steps;

      var queryParams = app_objectSpread({
        analysisType: analysisType,
        eventCollection: eventCollection,
        timeframe: timeframe,
        timezone: timezone
      }, {
        interval: interval,
        targetProperty: targetProperty,
        filters: filters,
        groupBy: groupBy,
        orderBy: orderBy,
        limit: limit,
        percentile: percentile
      });

      if (analysisType === 'extraction') {
        queryParams = app_objectSpread({}, queryParams, {
          latest: latest,
          propertyNames: propertyNames
        });

        if (extractionActiveTab === TAB_EXTRACTION_BULK) {
          queryParams.email = email;
        }
      }

      if (analysisType === 'funnel') {
        queryParams = app_objectSpread({}, queryParams, {
          steps: steps
        });
      }

      return queryParams;
    }
  }, {
    key: "runQuery",
    value: function runQuery(payload) {
      var _this2 = this;

      var params = app_objectSpread({}, this.convertFilterValuesToJsonValues(this.getQueryParams()));

      if (params.analysisType === 'funnel') {
        var updatedSteps = params.steps.map(function (step) {
          return app_objectSpread({}, step, _this2.convertFilterValuesToJsonValues(step));
        });
        params = app_objectSpread({}, params, {
          steps: app_toConsumableArray(updatedSteps),
          filters: undefined
        });
      }

      this.props.query(app_objectSpread({}, payload, params));
    }
  }, {
    key: "convertFilterValuesToJsonValues",
    value: function convertFilterValuesToJsonValues(params) {
      var schema = this.props.collections && Object.keys(this.props.collections.schemas).length && this.props.collections.schemas[params.eventCollection];
      var filters = params.filters.map(function (_ref) {
        var propertyName = _ref.propertyName,
            propertyType = _ref.propertyType,
            operator = _ref.operator,
            propertyValue = _ref.propertyValue;
        var value;

        if (!propertyType) {
          console.log('no prop type in filter', params);
          /*
          propertyType = getPropertyType({
            schema,
            filter: { propertyName, propertyType, operator, propertyValue },
          });
          */
        }

        if (propertyType === 'String' || propertyType === 'Datetime' || operator === 'contains' || operator === 'not_contains') {
          value = propertyValue;
        }

        if (propertyType === 'Boolean' || operator === 'exists') {
          value = propertyValue === 'true';
        } else if (operator === 'in') {
          value = sync_default()(propertyValue, {
            quote: '"',
            ltrim: true,
            rtrim: true,
            delimiter: ','
          })[0];

          if (propertyType === 'Number') {
            value = value.map(function (val) {
              return val.replace(/['"]+/g, '');
            }); // backwards compatible '1', '2'...
          }
        } else if (propertyType === 'Number') {
          value = parseFloat(propertyValue);
        } else if (propertyType === 'List') {
          value = propertyValue;

          if (operator === 'within') {
            var _long = parseFloat(propertyValue.coordinates[0] || 0);

            var lat = parseFloat(propertyValue.coordinates[1] || 0);
            var radius = parseFloat(propertyValue.maxDistanceMiles || 0);
            value = {
              coordinates: [_long, lat],
              maxDistanceMiles: radius
            };
          }
        }

        if (operator === 'Null') {
          value = null;
        }

        return {
          propertyName: propertyName,
          propertyType: propertyType,
          operator: operator,
          propertyValue: value
        };
      });
      return app_objectSpread({}, params, {
        filters: app_toConsumableArray(filters)
      });
    }
  }, {
    key: "renderFiltersFoldable",
    value: function renderFiltersFoldable() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          step = _ref2.step,
          funnel = _ref2.funnel;

      var updateUI = this.props.updateUI;
      var _this$props$ui3 = this.props.ui,
          modalFilters = _this$props$ui3.modalFilters,
          steps = _this$props$ui3.steps;
      var _this$props$ui4 = this.props.ui,
          filters = _this$props$ui4.filters,
          eventCollection = _this$props$ui4.eventCollection;

      if (funnel) {
        filters = steps[step].filters;
        eventCollection = steps[step].eventCollection;
      }

      var _onCloseModal = function onCloseModal() {
        updateUI({
          modalFilters: false
        });
      };

      return external_react_default.a.createElement(external_react_["Fragment"], null, external_react_default.a.createElement("div", {
        onClick: function onClick() {
          if (!eventCollection) {
            return;
          }

          updateUI({
            modalFilters: true
          });
        },
        className: "filters foldable"
      }, external_react_default.a.createElement("div", {
        className: "title"
      }, "Filters"), !!filters.length && external_react_default.a.createElement("div", {
        className: "count"
      }, filters.length)), external_react_default.a.createElement(external_react_modal_default.a, {
        isOpen: modalFilters,
        onRequestClose: function onRequestClose() {
          return _onCloseModal();
        },
        contentLabel: "",
        style: {
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.3)'
          }
        }
      }, external_react_default.a.createElement("div", {
        className: "filters-container modal-main"
      }, external_react_default.a.createElement("div", {
        className: "header"
      }, external_react_default.a.createElement("div", {
        className: "title"
      }, "Filters")), external_react_default.a.createElement(explorer_Filters, {
        funnel: funnel,
        step: step,
        onCloseModal: function onCloseModal() {
          return _onCloseModal();
        }
      }))));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          queries = _this$props2.queries,
          updateUI = _this$props2.updateUI,
          resetUI = _this$props2.resetUI,
          togglePanelSave = _this$props2.togglePanelSave,
          addStep = _this$props2.addStep,
          previewCollection = _this$props2.previewCollection,
          saveStateToLocalStorage = _this$props2.saveStateToLocalStorage;
      var features = this.state.features;
      var _this$props$ui5 = this.props.ui,
          activePanel = _this$props$ui5.activePanel,
          analysisType = _this$props$ui5.analysisType,
          eventCollection = _this$props$ui5.eventCollection,
          showTargetProperty = _this$props$ui5.showTargetProperty,
          targetProperty = _this$props$ui5.targetProperty,
          interval = _this$props$ui5.interval,
          groupBy = _this$props$ui5.groupBy,
          chartType = _this$props$ui5.chartType,
          modalEmbedHTML = _this$props$ui5.modalEmbedHTML,
          modalPreviewCollection = _this$props$ui5.modalPreviewCollection,
          error = _this$props$ui5.error,
          fetching = _this$props$ui5.fetching,
          panelSave = _this$props$ui5.panelSave,
          extractionActiveTab = _this$props$ui5.extractionActiveTab,
          steps = _this$props$ui5.steps;
      var selectedAnalysisType = {
        label: analysisType,
        value: analysisType
      };
      var selectedTargetProperty = {
        label: targetProperty,
        value: targetProperty
      };
      var queryParams = this.getQueryParams();
      var chartTypes = getChartTypeOptions(queryParams);
      var hasResults = queries && queries.results;
      var chartTypeSelected = chartTypes.length && {
        label: chartTypes[0],
        value: chartTypes[0]
      };

      if (chartType) {
        chartTypeSelected = {
          label: chartType,
          value: chartType
        };
      }

      var _this$props$keenAnaly = this.props.keenAnalysis.config,
          readKey = _this$props$keenAnaly.readKey,
          projectId = _this$props$keenAnaly.projectId;
      return external_react_default.a.createElement("div", {
        className: "keenExplorer"
      }, external_react_default.a.createElement("div", {
        className: "panel-main"
      }, external_react_default.a.createElement("div", {
        className: "panel-buttons tabs"
      }, external_react_default.a.createElement("div", {
        className: "tab button button-new-query",
        onClick: function onClick() {
          resetUI();
        }
      }, external_react_default.a.createElement("i", {
        className: "fa fa-plus"
      })), external_react_default.a.createElement("div", {
        className: "tab button ".concat(activePanel === PANEL_NEW_QUERY ? 'active' : ''),
        onClick: function onClick() {
          return updateUI({
            activePanel: PANEL_NEW_QUERY
          });
        }
      }, "Query"), external_react_default.a.createElement("div", {
        className: "tab button ".concat(activePanel === PANEL_BROWSE ? 'active' : ''),
        onClick: function onClick() {
          return updateUI({
            activePanel: PANEL_BROWSE
          });
        }
      }, "Browse")), external_react_default.a.createElement("div", {
        className: "panel-content ".concat(activePanel !== PANEL_NEW_QUERY ? 'hide' : '')
      }, external_react_default.a.createElement("div", {
        className: "label-main label-analysis-type"
      }, "Analysis type"), external_react_default.a.createElement(external_react_select_default.a, {
        value: selectedAnalysisType,
        options: ANALYSIS_TYPES.map(function (item) {
          return {
            label: item.type,
            value: item.type
          };
        }),
        onChange: function onChange(e) {
          updateUI({
            analysisType: e.value,
            showTargetProperty: !!ANALYSIS_TYPES.find(function (item) {
              return item.type === e.label;
            }).targetProperty
          });
        },
        theme: getThemeForSelect
      }), analysisType !== 'funnel' && external_react_default.a.createElement(explorer_EventCollection, {
        saveStateToLocalStorage: saveStateToLocalStorage.eventCollection
      }), previewCollection && external_react_default.a.createElement(external_react_["Fragment"], null, external_react_default.a.createElement("div", {
        className: "a-preview-collection",
        onClick: function onClick() {
          updateUI({
            modalPreviewCollection: true
          });
        }
      }, external_react_default.a.createElement("i", {
        className: "fas fa-search"
      }), " Preview Collections"), external_react_default.a.createElement(external_react_modal_default.a, {
        isOpen: modalPreviewCollection,
        onRequestClose: function onRequestClose() {
          updateUI({
            modalPreviewCollection: false
          });
        },
        style: {
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.3)'
          }
        }
      }, external_react_default.a.createElement("div", {
        className: "modal"
      }, external_react_default.a.createElement("div", {
        className: "header"
      }, external_react_default.a.createElement("div", {
        className: "title"
      }, "Preview Collections"), external_react_default.a.createElement("div", {
        className: "x",
        onClick: function onClick() {
          updateUI({
            modalPreviewCollection: false
          });
        }
      }, "x")), external_react_default.a.createElement(explorer_PreviewCollection, null)))), showTargetProperty && eventCollection && external_react_default.a.createElement(explorer_SelectTargetProperty, {
        value: selectedTargetProperty,
        eventCollection: eventCollection
      }), analysisType === 'extraction' && eventCollection && external_react_default.a.createElement(explorer_Extraction, null), analysisType === 'percentile' && eventCollection && external_react_default.a.createElement(explorer_Percentile, null), analysisType === 'funnel' && steps && external_react_default.a.createElement("div", {
        className: "funnel"
      }, steps.map(function (step, index) {
        return external_react_default.a.createElement(explorer_Step, {
          key: index,
          index: index,
          className: ""
        }, external_react_default.a.createElement(explorer_EventCollection, {
          funnel: true,
          step: index
        }), external_react_default.a.createElement(explorer_ActorProperty, {
          step: index
        }), external_react_default.a.createElement(explorer_Timeframe, {
          funnel: true,
          step: index
        }), _this3.renderFiltersFoldable({
          funnel: true,
          step: index
        }));
      }), external_react_default.a.createElement("div", {
        onClick: function onClick() {
          return addStep();
        },
        className: "button button-add"
      }, external_react_default.a.createElement("i", {
        className: "fas fa-plus"
      }), " Add a step")), analysisType !== 'funnel' && external_react_default.a.createElement(external_react_["Fragment"], null, external_react_default.a.createElement(explorer_Timeframe, null), this.renderFiltersFoldable()), analysisType !== 'extraction' && analysisType !== 'funnel' && external_react_default.a.createElement(external_react_["Fragment"], null, external_react_default.a.createElement(Foldable_Foldable, {
        title: "Group By - Order By",
        defaultActive: !!groupBy,
        onClose: function onClose() {
          updateUI({
            groupBy: undefined,
            orderBy: undefined,
            limit: undefined,
            numberOfGroupByProps: 1
          });
        }
      }, external_react_default.a.createElement(explorer_GroupBy, null)), external_react_default.a.createElement(Foldable_Foldable, {
        title: "Interval",
        defaultActive: !!interval,
        onOpen: function onOpen() {
          updateUI({
            interval: DEFAULT_STANDARD_INTERVAL
          });
        },
        onClose: function onClose() {
          updateUI({
            interval: undefined
          });
        }
      }, external_react_default.a.createElement(explorer_Interval, null)), external_react_default.a.createElement(explorer_APIQueryURL, {
        queryParams: queryParams,
        client: app_client
      }))), external_react_default.a.createElement("div", {
        className: "panel-content ".concat(activePanel !== PANEL_BROWSE ? 'hide' : '')
      }, external_react_default.a.createElement(explorer_SavedQueryBrowser, {
        client: app_client
      }))), external_react_default.a.createElement("div", {
        className: "result"
      }, !hasResults && external_react_default.a.createElement("div", {
        className: "lets-go"
      }, "Let's go exploring!"), hasResults && external_react_default.a.createElement("div", {
        className: "preview"
      }, chartType === 'JSON' && external_react_default.a.createElement(explorer_JsonView, null), chartType !== 'JSON' && external_react_default.a.createElement(external_react_["Fragment"], null, external_react_default.a.createElement(Dataviz, null), external_react_default.a.createElement("button", {
        className: "button-download button-embed-html",
        onClick: function onClick() {
          updateUI({
            modalEmbedHTML: true
          });
        }
      }, external_react_default.a.createElement("i", {
        className: "fas fa-code"
      }), " Embed HTML"), external_react_default.a.createElement(external_react_modal_default.a, {
        isOpen: modalEmbedHTML,
        onRequestClose: function onRequestClose() {
          updateUI({
            modalEmbedHTML: false
          });
        },
        style: {
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.3)'
          }
        }
      }, external_react_default.a.createElement("div", {
        className: "modal"
      }, external_react_default.a.createElement("div", {
        className: "header"
      }, external_react_default.a.createElement("div", {
        className: "title"
      }, "Embed HTML"), external_react_default.a.createElement("div", {
        className: "x",
        onClick: function onClick() {
          updateUI({
            modalEmbedHTML: false
          });
        }
      }, "x")), external_react_default.a.createElement(explorer_EmbedHTML, {
        projectId: projectId,
        readKey: readKey
      })))), external_react_default.a.createElement("div", {
        className: "select-chart-type-container"
      }, external_react_default.a.createElement(external_react_select_default.a, {
        className: "select-chart-type",
        value: chartTypeSelected,
        options: chartTypes.map(function (item) {
          return {
            label: item,
            value: item
          };
        }),
        onChange: function onChange(e) {
          updateUI({
            chartType: e.value
          });
        },
        theme: getThemeForSelect
      }), chartTypeSelected && chartTypeSelected.value.indexOf('funnel') > -1 && external_react_default.a.createElement("div", {
        className: "chart-not-supported-note"
      }, "Note: this chart type isn't supported in the dashboard builder yet."))), error && external_react_default.a.createElement("div", {
        className: "error"
      }, error.body), external_react_default.a.createElement("div", {
        className: "action-buttons"
      }, external_react_default.a.createElement("button", {
        className: "button-run-query button-with-loading-spinner",
        onClick: function onClick() {
          return _this3.runQuery();
        }
      }, fetching && external_react_default.a.createElement(shared_LoadingSpinner, null), !(analysisType === 'extraction' && extractionActiveTab === TAB_EXTRACTION_BULK) && external_react_default.a.createElement(external_react_["Fragment"], null, "Run Query"), analysisType === 'extraction' && extractionActiveTab === TAB_EXTRACTION_BULK && external_react_default.a.createElement(external_react_["Fragment"], null, "Extract to Email")), features.save && analysisType !== 'extraction' && external_react_default.a.createElement("div", {
        className: "button-toggle ".concat(panelSave ? 'button-toggle-active' : ''),
        onClick: function onClick() {
          return togglePanelSave();
        }
      }, "Save Query"), features.save && panelSave && external_react_default.a.createElement(explorer_SavedQuery, {
        client: app_client,
        queryParams: queryParams
      }))));
    }
  }]);

  return App;
}(external_react_["Component"]);

app_App.propTypes = {
  todoText: external_prop_types_default.a.string //increment: PropTypes.func.isRequired

};
/* harmony default export */ var app = (Object(external_react_redux_["connect"])(app_mapStateToProps, app_mapDispatchToProps)(app_App));
// CONCATENATED MODULE: ./lib/js/app/app.js
function app_app_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { app_app_defineProperty(target, key, source[key]); }); } return target; }

function app_app_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function app_app_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }













var sagaMiddleware = external_redux_saga_default()();
var composeEnhancers = Object(external_redux_devtools_extension_["composeWithDevTools"])({// Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
var store = Object(external_redux_["createStore"])(redux,
/* preloadedState, */
composeEnhancers(Object(external_redux_["applyMiddleware"])(sagaMiddleware) // other store enhancers if any
));
sagaMiddleware.run(rootSaga);
var defaultConfig = {
  previewCollection: true,
  saveStateToLocalStorage: {
    eventCollection: true
  }
};
var app_client;
var app_KeenExplorer = function KeenExplorer(props) {
  app_app_classCallCheck(this, KeenExplorer);

  var keenAnalysis = props.keenAnalysis;
  app_client = keenAnalysis.instance || new external_keen_analysis_default.a(keenAnalysis.config);
  external_react_dom_default.a.render(external_react_default.a.createElement(external_react_redux_["Provider"], {
    store: store
  }, external_react_default.a.createElement(app, app_app_objectSpread({}, defaultConfig, props))), document.querySelector(props.container));
};
app_KeenExplorer.version = package_0["a" /* version */];
/* harmony default export */ var app_app = (app_KeenExplorer);
// CONCATENATED MODULE: ./lib/js/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keenGlobals", function() { return keenGlobals; });
/* concated harmony reexport KeenExplorer */__webpack_require__.d(__webpack_exports__, "KeenExplorer", function() { return app_KeenExplorer; });
// only for DEV mode
var keenGlobals = undefined;

if (typeof webpackKeenGlobals !== 'undefined') {
  keenGlobals = webpackKeenGlobals;
}



/* harmony default export */ var js = __webpack_exports__["default"] = (app_app);

/***/ })
/******/ ]);
});
//# sourceMappingURL=keen-explorer.umd.js.map