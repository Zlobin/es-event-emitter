'use strict';

// Benchmark comparing performance of event emit for single listener.
// $ npm i eventemitter2 event-emitter
// $ npm start

import EM from 'event-emitter';
import EM2 from 'eventemitter2';
import EM_native from 'events';
import EM_current from '../dist/index.min.js';

import Benchmark from 'benchmark';

const response = () => 'response';

const em = EM().on('foo', response);
const em2 = new EM2().on('foo', response);
const current = new EM_current().on('foo', response);
const native = new EM_native().on('foo', response);

const suite = new Benchmark.Suite;

suite
  .add('es-event-emitter', () => current.emit('foo'))
  .add('event-emitter', () => em.emit('foo'))
  .add('EventEmitter2', () => em2.emit('foo'))
  .add('Node.js native', () => native.emit('foo'))
  .on('cycle', event => console.log(String(event.target)))
  .on('complete', function() {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  .run({
    async: true
  });

// Custom benchmark.
const runTest = (instance) => {
  const time = process.hrtime();
  let diff, i = 1000000;

  while (i--) {
  	instance.emit('foo');
  }

  diff = process.hrtime(time);

  return diff[0] * 1e9 + diff[1];
};

[
  {
    title: 'event-emitter',
    time: runTest(em)
  },
  {
    title: 'EventEmitter2',
    time: runTest(em2)
  },
  {
    title: 'Node.js native',
    time: runTest(native)
  },
  {
    title: 'es-event-emitter',
    time: runTest(current)
  }
]
  .sort((a, b) => a.time - b.time)
  .forEach(item =>
    console.log(`${item.title} 100,000: ${item.time} nanoseconds`)
  );
