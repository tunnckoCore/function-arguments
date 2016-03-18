/*!
 * function-arguments <https://github.com/tunnckoCore/function-arguments>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

/**
 * > Get function arguments names.
 *
 * **Example**
 *
 * ```js
 * var fnArgs = require('function-arguments')
 *
 * console.log(fnArgs(function (a, b, c) {})) // => [ 'a', 'b', 'c' ]
 * console.log(fnArgs(function named (a , b, c) {})) // => [ 'a', 'b', 'c' ]
 *
 * console.log(fnArgs(a => {})) // => [ 'a' ]
 * console.log(fnArgs((a, b) => {})) // => [ 'a', 'b' ]
 *
 * console.log(fnArgs(function * (a ,b, c) {})) // => [ 'a', 'b', 'c' ]
 * console.log(fnArgs(function * named (a ,b, c) {})) // => [ 'a', 'b', 'c' ]
 * ```
 *
 * @param  {Function} `fn` Function from which to get arguments names.
 * @param  {Number} `max` How many characters to cut from `fn`s toString.
 * @return {Array}
 * @api public
 */

module.exports = function functionArguments (fn, max) {
  if (typeof fn !== 'function') {
    throw new TypeError('function-arguments expect a function')
  }
  var fnToStr = Function.prototype.toString
  var fnStr = fnToStr.call(fn)
  var arrow = fnStr.indexOf('=>')

  if (fnStr[0] !== '(' && arrow) {
    fnStr = 'function (' + fnStr.slice(0, arrow) + ')' + fnStr.slice(arrow)
  }

  var match = fnStr.slice(0, Number(max) || 100).match(/.*\(([^\)]*)\)/)

  /* istanbul ignore next */
  if (!match) {
    return []
  }

  return require('arr-map')(match[1].split(','), function (param) {
    return param.trim()
  })
}
