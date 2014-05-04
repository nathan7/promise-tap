'use strict';
exports = module.exports = wrap

exports.wrap = wrap
function wrap(prom) {
  return mix(prom.then())
}

var counts = {}

exports.mix = mix
function mix(prom) {
  prom.tap = function(a, b) {
    var self = this
    return this.then(a, b).then(f, f)
    function f() { return self }
  }

  prom.tapDone = function(a, b) {
    this.done(a, b)
    return this
  }

  prom.trace = function(str, timeout) {
    var n = 1 + (counts[str] || (counts[str] = 0))
      , e = new Error()
      , source = e.stack.split('\n')[2].trim()
      , message = str + ' #' + n
      , done = false

    console.log('awaiting ' + message)

    var timer
    if (timeout)
      timer = setTimeout(function() {
        timer = null
        if (!done) console.log('still awaiting ' + message + ' after ' + timeout + 'ms')
      }, timeout)

    return this.tapDone
    ( function(value) {
        done = true
        if (timer) clearTimeout(timer)
        console.log('resolved', message, source + ':', value)
      }
    , function(err) {
        done = true
        if (timer) clearTimeout(timer)
        console.error('rejected', message, source + ':', err)
      }
    )
  }

  return prom
}
