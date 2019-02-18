# babel-plugin-debug-source

Adds file path and loc information for [`debug`](https://www.npmjs.com/package/debug) calls.
Makes it easier to find the origin of the debug messages.

In:

```js
const debug = require('debug')('my-app');
debug('hello');
```

Out:

```js
const debug = require('debug')('my-app');
debug('hello', '/Users/your/project/path/source.js:2:0');
```

## Installation

```
npm install -D babel-plugin-debug-source
```

## Usage

.babelrc

```js
{
  plugins: ['debug-source'];
}
```

### Options

`showSource`: whether the plugin should run and add the source to `debug` calls.

.babelrc

```js
{
  plugins: [['debug-source', { showSource: true }]];
}
```

It probably makes sense to stay in the spirit of `debug` and only set `showSource` to true, when an environment variable is set.

e.g.

.babelrc

```js
{
  plugins: [
    ['debug-source', { showSource: process.env.DEBUG_SHOW_SOURCE === 'true' }]
  ];
}
```

This is not the default behavior, because babel (or bundlers utilizing babel) use heavy caching. Changes in environment variables usually do not cause a cache invalidation and the result will unexpectedly stay the same.
