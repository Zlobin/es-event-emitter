import EventEmitter from '../src/index.js';
import expect from 'expect';

describe('EventEmitter', function() {
  let EM = new EventEmitter();

  describe('1: Constructor', function() {
    EM.on('foo', () => 'some response');

    it('1.1: _events property should be private', () =>
      expect(EM._events).toEqual(void 0)
    );

    it('1.2: _callbacks property should be private', () =>
      expect(EM._callbacks).toEqual(void 0)
    );

    it('1.3: _maxListeners property should be private', () =>
      expect(EM._maxListeners).toEqual(void 0)
    );

    it('1.4: on method should be public', () =>
      expect(EM.on).toBeA('function')
    );

    it('1.5: once method should be public', () =>
      expect(EM.once).toBeA('function')
    );

    it('1.6: off method should be public', () =>
      expect(EM.off).toBeA('function')
    );

    it('1.7: emit method should be public', () =>
      expect(EM.emit).toBeA('function')
    );
  });

  describe('2: on(), emit()', function() {
    let foo = 2;

    EM.on('bar', () => foo++);

    it('2.1: Initial "foo" should be equal 2', function() {
      expect(foo).toEqual(2);
    });

    it('2.2: After triggering event "bar", "foo" should be equal 3, and 4 after second emit', function() {
      EM.emit('bar');
      expect(foo).toEqual(3);
      EM.emit('bar');
      expect(foo).toEqual(4);
    });
  });

  describe('3: once()', function() {
    let foo = 2;

    EM.once('foo', () => foo++);

    it('3.1: After the first triggering event "bar", "foo" should be equal 3', () => {
      EM.emit('foo');
      expect(foo).toEqual(3);
    });

    it('3.3: After the second, third triggering event "bar", "foo" should be equal 3 as well', () => {
      EM
        .emit('foo')
        .emit('foo');
      expect(foo).toEqual(3);
    });
  });

  describe('4: off()', function() {
    let foo = 1;

    EM
      .on('baz', () => foo++)
      .off('baz')
      .emit('baz');

    it('4.1: event "bar" should not be triggered', () => {
      expect(foo).toEqual(1);
    });
  });

  describe('5: listenersNumber()', function() {
    it('5.1: Initial "foo" should be equal 2', () => {
      expect(EM.listenersNumber('bar1')).toEqual(null);
    });

    it('5.2: After triggering event "bar", "foo" should be equal 3', () => {
      EM
        .on('bar1', () => 'some response 1')
        .on('bar1', () => 'some response 2')
        .on('bar1', () => 'some response 3')
        .on('bar1', () => 'some response 4');
      expect(EM.listenersNumber('bar1')).toEqual(4);
    });
  });
});
