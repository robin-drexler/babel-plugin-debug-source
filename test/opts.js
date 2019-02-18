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

test('runs when no option is set', t => {
  const code = `
import debug from 'debug';
const log = debug('a');

log('hello');
log('bye');

`;

  t.snapshot(transformCode(code));
});

test('runs when showSource option is set to true', t => {
  const code = `
import debug from 'debug';
const log = debug('a');

log('hello');
log('bye');

`;

  t.snapshot(transformCodeWithOptions(code, { showSource: true }));
});

test('does not run when showSource option is set to false', t => {
  const code = `
import debug from 'debug';
const log = debug('a');

log('hello');
log('bye');

`;

  t.snapshot(transformCodeWithOptions(code, { showSource: false }));
});
