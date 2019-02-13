const test = require('ava');
const plugin = require('../index');
const { transform } = require('@babel/core');

function transformCode(input) {
  const { code } = transform(input, {
    plugins: [plugin]
  });
  return code;
}

test('supports simple import', t => {
  const code = `
import debug from 'debug';
const log = debug('a');

log('hello');
log('bye');

`;

  t.snapshot(transformCode(code));
});

test('supports import with invocation without assigning to variable', t => {
  const code = `
import debug from 'debug';

debug('a')('hello');
debug('b')('hello');
`;

  t.snapshot(transformCode(code));
});

test('supports require with immediate factory call', t => {
  const code = `
const log = require('debug')('a');
log('a');
log('b');
`;

  t.snapshot(transformCode(code));
});

test('supports require with delayed factory call', t => {
  const code = `
const debug = require('debug');
const log = debug('a');
log('a');
log('b');
`;

  t.snapshot(transformCode(code));
});

test('supports mixture of require styles', t => {
  const code = `
const debug = require('debug');
const log = debug('a');
const ilog = require('debug')('b')

somethingElse();
log('a');
ilog('c')
log('b');
`;

  t.snapshot(transformCode(code));
});

// edge case, that could be supported in the future
test.skip('supports re-assigning imported module', t => {
  const code = `
import debug from 'debug';
const d = debug;
d('a')('hello');
d('b')('hello');
`;

  t.snapshot(transformCode(code));
});
