
# EventEmitter in JavaScript

## Synopsis

EventEmitter is an implementation of the Event-based architecture in JavaScript.

The code is written using the ES2015 approaches, including creation of private property through WeakMap that allows you to not to check for clearing memory, and let it do to the garbage collector.

The module contains the most basic and necessary things: subscription to an event, unsubscribing from the events, running event only once, setting the maximum number of listeners.

The focus is on code readability, speed of execution, getting rid of all the excess.

You can use this library in browser either at the server as within the node.js.

## Benchmark

```javascript
const EM = new EventEmitter();

EM
  .on('foo', () => 'response')
  .emit('foo');
```

```
// Custom:
es-event-emitter 100,000: 20735386 nanoseconds
Node.js native 100,000: 42366560 nanoseconds
EventEmitter2 100,000: 91709148 nanoseconds
event-emitter 100,000: 209422302 nanoseconds

// Via benchmark library:
es-event-emitter x 27,858,069 ops/sec ±0.73% (75 runs sampled)
event-emitter x 5,302,901 ops/sec ±0.56% (81 runs sampled)
EventEmitter2 x 19,481,149 ops/sec ±0.99% (75 runs sampled)
Node.js native x 18,608,764 ops/sec ±1.18% (80 runs sampled)
Fastest is es-event-emitter
```

## Dependencies

There are no dependencies. You need only npm installed and just run `npm install` to grab the development dependencies.

## Examples


Creating an instance.
```javascript
const EM = new EventEmitter();
```

An usual example.
```javascript
EM.on('foo', () => {
  // some code...
});

EM.emit('foo');
```

It will be triggered only once and then callbacks will be removed.
```javascript
EM.once('foo', () => {
  // some code...
});

EM.emit('foo');
// Nothing happend.
EM.emit('foo');
```

Callback with parameters.
```javascript
EM.once('foo', (bar, baz) => {
  // some code...
});

EM.emit('foo', 'var 1 for bar', 'var 2 for baz');
```

Callback's call can be ordered by "weight" parameter.
```javascript
EM.on('foo', () =>
  console.log('3')
, null, 1);

EM.on('foo', () =>
  console.log('1')
, null, 3);

EM.on('foo', () =>
  console.log('2')
, null, 2);

EM.emit('foo');
// 3
// 2
// 1
```

You can use chaining.
```javascript
EM.on('foo', () => {
  // some code...
});

EM
  .emit('foo')
  .emit('foo')
  .off('foo');
```

// You can set maxNumberOfListeners as a parameter when creating new instance.
```javascript
const EM = new EventEmitter(1);

EM.on('foo', () => {
  // some code...
});
// Note: it will show notification in console.
EM.on('foo', () => {
  // some other code...
});
```

## Testing

Tests are performed using mocha and expect library `npm test`.

## Building the documentation

You can use JSDoc comments found within the source code.

## Minifying

You can grab minified versions of EventEmitter from /dist path after running `gulp build`.

## Todo

1. Add event's namespace:

```javascript
EM.on('foo.*', () => {
  // some code...
});
```

2. Add events through comma:

```javascript
EM.on('foo,bar,baz', () => {
  // some code...
});
```

3. Add method "onAny" for listening each event:

```javascript
EM.onAny(() => {
  // some code...
});
```
