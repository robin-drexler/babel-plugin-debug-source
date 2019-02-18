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
npm install babel-plugin-debug-source
```

.babel.rc

```js
{
    "plugins": [
        "debug-source"
    ]
}
```
