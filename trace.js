'use strict';
var Promise = require('promise')
require('./').mix(Promise.prototype)

Promise.resolve('a').trace('first')

Promise.resolve(undefined).then(function() { throw new Error('fail') }).trace('second')

new Promise(function(resolve, reject) { setTimeout(function() { resolve('b') }, 500) }).trace('third', 100)
