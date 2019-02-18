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
If not specified, the plugin will run if `DEBUG_SHOW_SOURCE` is set to `"true"`.

.babelrc

```js
{
  plugins: [['debug-source', { showSource: true }]];
}
```
