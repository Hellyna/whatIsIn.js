assert = require 'assert'
whatIsIn = require '../lib/whatIsIn'

describe 'whatIsIn', ->
  it 'should inspect string properly', ->
    assert.equal (whatIsIn 'foo'), "'foo';\n"

  it 'should inspect number properly', ->
    assert.equal (whatIsIn 42), '42;\n'

  it 'should inspect boolean properly', ->
    assert.equal (whatIsIn false), 'false;\n'

  it 'should inspect Date properly', ->
    now = new Date()
    assert.equal (whatIsIn now),
      "Date('#{now.toString()}');\n"

  it 'should inspect RegExp properly', ->
    regex = /^One does not simply walk into Mordor.$/
    assert.equal (whatIsIn regex),
      "RegExp('#{regex.toString()}');\n"

  it 'should inspect Array properly', ->
    expectedRet = '[\n' +
      '  1,\n' +
      "  '2',\n" +
      "  RegExp('/^One does not simply walk into Mordor\\.$/'),\n" +
      '  {\n' +
      "    'foo': 'foo',\n" +
      "    'bar': RegExp('/^bar$/'),\n" +
      '  },\n' +
      '];\n'
      assert.equal (whatIsIn [
        1
        '2'
        /^One does not simply walk into Mordor\.$/
        foo: 'foo'
        bar: /^bar$/
      ]),
      expectedRet

  it 'should inspect plain Object properly', ->
    expectedRet = '{\n' +
      "  'foo': 'foo',\n" +
      "  'bar': 'bar',\n" +
      "};\n"
    ret = whatIsIn
      foo: 'foo'
      bar: 'bar'

    assert.equal ret, expectedRet

