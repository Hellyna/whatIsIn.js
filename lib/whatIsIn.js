
/*
 * Creates a number of spaces based on the parameters.
 * @author Hellyna NG [hellyna@hellyna.com]
 * @function tabMaker
 * @param {number} tabLength - Number of spaces in each tab.
 * @param {number} tabLevel - Number of tabs to generate.
 * @return {string} - String of generated spaces.
 */
var exports, tabMaker, whatIsIn, _this,
  __hasProp = {}.hasOwnProperty;

tabMaker = function(tabLength, tabLevel) {
  var i, ret, tab, _i, _j, _ref, _ref1;
  if (tabLength <= 0 || tabLevel <= 0) {
    return '';
  }
  tab = '';
  for (i = _i = 0, _ref = tabLength - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
    tab += ' ';
  }
  ret = '';
  for (i = _j = 0, _ref1 = tabLevel - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
    ret += tab;
  }
  return ret;
};


/*
 * Deep inspect and get a representation of own properties in a string.
 *
 * Note that circular dependencies are not detectable at this moment.
 * @author Hellyna NG [hellyna@hellyna.com]
 * @license MIT
 * @function whatIsIn
 * @param {*} o - Any object to be inspected.
 * @param {number} [tabLength=2] - Number of spaces in a tab
 * @param {number} [tabLevel=0] - Base tab level.
 * @return {string} - A representation of o's own properties.
 *
 */

whatIsIn = function(o, tabLength, tabLevel) {
  var closeTab, each, i, k, nextTabLevel, result, tab, typeOfO, v, _i, _j, _len, _len1, _ref, _tabLength, _tabLevel;
  _tabLength = typeof tabLength === 'number' && tabLength > 0 ? tabLength : 2;
  _tabLevel = typeof tabLevel === 'number' && tabLevel > 0 ? tabLevel : 0;
  tab = tabMaker(_tabLength, _tabLevel + 1);
  closeTab = tabMaker(_tabLength, _tabLevel);
  nextTabLevel = _tabLevel + 1;
  if (o instanceof Array) {
    result = '[\n';
    for (_i = 0, _len = o.length; _i < _len; _i++) {
      each = o[_i];
      result += tab + (whatIsIn(each, _tabLength, nextTabLevel));
    }
    result += closeTab + (_tabLevel <= 0 ? '];\n' : '],\n');
    return result;
  }
  typeOfO = typeof o;
  if (typeOfO === 'string') {
    return "'" + o + (_tabLevel <= 0 ? "';\n" : "',\n");
  }
  if (typeOfO === 'function') {
    result = '';
    _ref = o.toString().split(/(\n|\r\n|\r)/);
    for (i = _j = 0, _len1 = _ref.length; _j < _len1; i = ++_j) {
      each = _ref[i];
      result += (i < 0 ? '' : tab) + each;
    }
    result += _tabLevel <= 0 ? ';\n' : ',\n';
    return result;
  }
  if (typeOfO === 'number' || typeOfO === 'boolean') {
    return o + (_tabLevel <= 0 ? ';\n' : ',\n');
  }
  if (o.constructor.name !== 'Object') {
    return o.constructor.name + "('" + o.toString() + (_tabLevel <= 0 ? "');\n" : "'),\n");
  }
  if (typeOfO === 'object') {
    result = '{\n';
    for (k in o) {
      if (!__hasProp.call(o, k)) continue;
      v = o[k];
      result += tab + ("'" + k + "': ") + whatIsIn(v, _tabLength, nextTabLevel);
    }
    result += closeTab + (_tabLevel <= 0 ? '};\n' : '},\n');
    return result;
  }
};

_this = this;

if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = whatIsIn;
  }
  exports.whatIsIn = whatIsIn;
} else {
  _this.whatIsIn;
}
