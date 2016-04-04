'use strict';

// Benchmark comparing performance of event emit for single listener.
// $ npm i eventemitter2 event-emitter
// $ npm start

import EM from 'event-emitter';
import EM2 from 'eventemitter2';
import EM_native from 'events';
import EM_current from '../src/index.js';

const now = Date.now;
const count = 100000;
const testResponse = () => 'Some data';
const runTest = (instance) => {
  let i = count;
  let time = now();

  while (i--) {
  	instance.emit('foo');
  }

  return now() - time;
}

const current = (() => new EM_current().on('foo', testResponse))();
const ee = (() => EM().on('foo', testResponse))();
const ee2 = (() => new EM2().on('foo', testResponse))();
const native = (() => new EM_native().on('foo', testResponse))();

let result = [];

result.push({
  title: 'EventEmitter',
  time: runTest(ee)
});
result.push({
  title: 'EventEmitter2',
  time: runTest(ee2)
});
result.push({
  title: 'Node.js native',
  time: runTest(native)
});
result.push({
  title: 'Current',
  time: runTest(current)
});

// Output.
result
  .sort((a, b) => a.time - b.time)
  .forEach((item) => console.log(`${item.title}: ${item.time}`));
