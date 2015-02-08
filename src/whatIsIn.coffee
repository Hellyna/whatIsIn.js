###
# Creates a number of spaces based on the parameters.
# @author Hellyna NG [hellyna@hellyna.com]
# @function tabMaker
# @param {number} tabLength - Number of spaces in each tab.
# @param {number} tabLevel - Number of tabs to generate.
# @return {string} - String of generated spaces.
###
tabMaker = (tabLength, tabLevel)->
  if tabLength <= 0 or tabLevel <= 0 then return ''
  tab = ''
  tab += ' ' for i in [0..tabLength-1]
  ret = ''
  ret += tab for i in [0..tabLevel-1]
  return ret

###
# Deep inspect and get a representation of own properties in a string.
#
# Note that circular dependencies are not detectable at this moment.
# @author Hellyna NG [hellyna@hellyna.com]
# @license MIT
# @function whatIsIn
# @param {*} o - Any object to be inspected.
# @param {number} [tabLength=2] - Number of spaces in a tab
# @param {number} [tabLevel=0] - Base tab level.
# @return {string} - A representation of o's own properties.
#
###
whatIsIn = (o, tabLength, tabLevel)->
  _tabLength =
    if typeof tabLength is 'number' and tabLength > 0 then tabLength else 2

  _tabLevel =
    if typeof tabLevel is 'number' and tabLevel > 0 then tabLevel else 0

  tab = tabMaker _tabLength, (_tabLevel + 1)
  closeTab = tabMaker _tabLength, _tabLevel
  nextTabLevel = _tabLevel + 1

  if o instanceof Array
    result = '[\n'
    for each in o
      result += tab + (whatIsIn each, _tabLength, nextTabLevel)

    result += closeTab + if _tabLevel <= 0 then '];\n' else '],\n'
    return result

  typeOfO = typeof o

  if typeOfO is 'string'
    return "'" + o + if _tabLevel <= 0 then "';\n" else "',\n"

  if typeOfO is 'function'
    result = ''
    for each, i in o.toString().split /(\n|\r\n|\r)/
      result += (if i < 0 then '' else tab) + each

    result += if _tabLevel <= 0 then ';\n' else ',\n'
    return result

  if typeOfO is 'number' or typeOfO is 'boolean'
    return o + if _tabLevel <= 0 then ';\n' else ',\n'

  if o.constructor.name isnt 'Object'
    return o.constructor.name +
      "('" + o.toString() + if _tabLevel <= 0 then "');\n" else "'),\n"

  if typeOfO is 'object'
    result = '{\n'
    for own k, v of o
      result += tab + "'#{k}': " + whatIsIn v, _tabLength, nextTabLevel

    result += closeTab + if _tabLevel <= 0 then '};\n' else '},\n'
    return result

_this = @
if typeof exports isnt 'undefined'
  if typeof module isnt 'undefined' and module.exports
    exports = module.exports = whatIsIn

  exports.whatIsIn = whatIsIn
else
  _this.whatIsIn
