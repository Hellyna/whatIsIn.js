(function scope() {
  /**
  * Creates a number of spaces based on the parameters.
  * @author Hellyna NG [hellyna@hellyna.com]
  * @function tabMaker
  * @param {number} tabLength - Number of spaces in each tab.
  * @param {number} tabLevel - Number of tabs to generate.
  * @return {string} - String of generated spaces.
  */
  function tabMaker(tabLength, tabLevel) {
    if (tabLength <= 0 || tabLevel <= 0) {
      return '';
    }
    var i,
        tab = '',
        ret = '';

    for (i = 0; i < tabLength; ++i) {
      tab += ' ';
    }

    for (i = 0; i < tabLevel; ++i) {
      ret += tab;
    }
    return ret;
  }

  /**
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
  function whatIsIn(o, tabLength, tabLevel) {
    var i,
        _tabLength =
          typeof tabLength === 'number' && tabLength > 0 ? tabLength : 2,
        _tabLevel = typeof tabLevel === 'number' && tabLevel > 0 ? tabLevel : 0,
        tab = tabMaker(_tabLength, _tabLevel + 1),
        closeTab = tabMaker(_tabLength, _tabLevel),
        nextTabLevel = _tabLevel + 1,
        typeOfO;
    if (o instanceof Array) {
      return o.reduce(
        function reduceCb(
          previousValue,
          currentValue
        ) {
          return previousValue +
            tab + whatIsIn(currentValue, _tabLength, nextTabLevel);
        },
        '[\n' // Prepend
      ) + closeTab + (_tabLevel <= 0 ? '];\n' : '],\n'); // Append
    }
    typeOfO = typeof o;
    if (typeOfO === 'string') {
      return '"' + o + (_tabLevel <= 0 ? '";\n' : '",\n');
    }
    if (typeOfO === 'function') {
      return o.toString().split(/(\n|\r\n|\r)/).reduce(
        function reduceCb(previousValue, currentValue, index) {
          return previousValue + (index <= 0 ? '' : tab) + currentValue;
        },
        ''
      ) + (_tabLevel <= 0 ? ';\n' : ',\n');
    }
    if (typeOfO === 'number' || typeOfO === 'boolean') {
      return o + (_tabLevel <= 0 ? ';\n' : ',\n');
    }
    if (o.constructor.name !== 'Object') {
      return o.constructor.name +
        '("' + o.toString() + (_tabLevel <= 0 ? '");\n' : '"),\n');
    }
    if (typeof o === 'object') {
      return Object.getOwnPropertyNames(o).reduce(
        function reduceCb(
          previousValue,
          currentValue
        ) {
          var k = currentValue;
          return previousValue +
            tab + '"' + k + '": ' + whatIsIn(o[k], _tabLength, nextTabLevel);
        },
        '{\n' // Prepend
      ) + closeTab + (_tabLevel <= 0 ? '};\n' : '},\n'); // Append
    }
  };

  var _this = this;
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = whatIsIn;
    }
    exports.whatIsIn = whatIsIn;
  } else {
    _this.whatIsIn;
  }
})();
