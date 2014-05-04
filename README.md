# promise-trace

  a small utility for tracing promises

## convenience

  since this is mostly meant for debugging and quick hackery, `require('promise-trace').mix(Promise.prototype)` might come in handy for you.

## API
## promise.tap(onFulfilled, onRejected)

  returns a promise that resolves to `promise`, after `promise.then(onFulfilled, onRejected)` resolves.

## promise.tapDone(onFulfilled, onRejected)

  returns promise itself and calls `promise.done(onFulfilled, onRejected)`

## promise.trace(message, timeout)

  logs the state transitions of the promise.

  example:

```javascript
Promise.resolve('a').trace('first')

Promise.resolve(undefined).then(function() { throw new Error('fail') }).trace('second')

new Promise(function(resolve, reject) { setTimeout(function() { resolve('b') }, 500) }).trace('third', 100)
```

```
awaiting first #1
awaiting second #1
awaiting third #1
resolved first #1 at Object.<anonymous> (/home/nathan/code/promise-tap/trace.js:5:22): a
failed second #1 at Object.<anonymous> (/home/nathan/code/promise-tap/trace.js:7:73): [Error: fail]
still awaiting third #1 after 100ms
resolved third #1 at Object.<anonymous> (/home/nathan/code/promise-tap/trace.js:9:89): b
```

### wrap(promise)

  returns a fresh traceable promise, resolved to the passed one.
  literally `mix(promise.then())`.

### mix(promise)

  makes your promise a traceable one and returns it.
