const test = require('ava');
const plugin = require('../index');
const { transform } = require('@babel/core');

function transformCode(input) {
  const { code } = transform(input, {
    plugins: [plugin]
  });
  return code;
}

function transformCodeWithOptions(input, options) {
  const { code } = transform(input, {
    plugins: [[plugin, options]]
  });
  return code;
}

test('does not run when DEBUG_SHOW_SOURCE is not set', t => {
  process.env.DEBUG_SHOW_SOURCE = undefined;
  const code = `
import debug from 'debug';
const log = debug('a');

log('hello');
log('bye');

`;

  t.snapshot(transformCode(code));
});

test('runs when DEBUG_SHOW_SOURCE is set to true', t => {
  process.env.DEBUG_SHOW_SOURCE = 'true';

  const code = `
import debug from 'debug';
const log = debug('a');

log('hello');
log('bye');

`;

  t.snapshot(transformCode(code));
});

test('runs when DEBUG_SHOW_SOURCE is not set, but option is set', t => {
  process.env.DEBUG_SHOW_SOURCE = undefined;

  const code = `
import debug from 'debug';
const log = debug('a');

log('hello');
log('bye');

`;

  t.snapshot(transformCodeWithOptions(code, { showSource: true }));
});

test('does not run when DEBUG_SHOW_SOURCE is true, but option false', t => {
  process.env.DEBUG_SHOW_SOURCE = 'true';

  const code = `
import debug from 'debug';
const log = debug('a');

log('hello');
log('bye');

`;

  t.snapshot(transformCodeWithOptions(code, { showSource: false }));
});
