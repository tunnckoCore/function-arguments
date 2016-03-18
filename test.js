/*!
 * function-arguments <https://github.com/tunnckoCore/function-arguments>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var test = require('assertit')
var fnArgs = require('./index')

test('should throw if not a function is passed', function (done) {
  function fixture () {
    fnArgs(123)
  }

  test.throws(fixture, TypeError)
  test.throws(fixture, /expect a function/)
  done()
})

test('should return empty array if not arguments', function (done) {
  test.deepEqual(fnArgs(function () {}), [])
  done()
})

test('should work when using comments', function (done) {
  test.deepEqual(fnArgs(function /* something */ (
    // go,
    go,
    /* wrong, */
    here
    // (when, using, comments) {}
  ) {}), ['go', 'here'])
  done()
})

test('should get array with arguments names from regular function', function () {
  test.deepEqual(fnArgs(function (a, b, c) {}), ['a', 'b', 'c'])
  test.deepEqual(fnArgs(function named (a, b, c) {}), ['a', 'b', 'c'])

  // those works on modern enviroment
  test.deepEqual(fnArgs(a => {}), ['a']) // eslint-disable-line arrow-parens
  test.deepEqual(fnArgs((a, b) => {}), ['a', 'b'])
  test.deepEqual(fnArgs(function * (a, b, c) {}), ['a', 'b', 'c'])
  test.deepEqual(fnArgs(function * named (a, b, c) {}), ['a', 'b', 'c'])
})

