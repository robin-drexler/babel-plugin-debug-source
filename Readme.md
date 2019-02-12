# babel-plugin-debug-source

**THIS PACKAGE IS WIP! DO NOT USE YET**

Adds file path and loc information for [`debug`](https://www.npmjs.com/package/debug) calls.
Makes it easier to find the origin of debug messages.

## Installation

tbd

## Usage

In:

```js
const debug = require("debug")("my-app");
debug("hello");
```

Out:

```js
const debug = require("debug")("my-app");
debug("hello", "/Users/your/project/path/source.js:2:0");
```

## Todos

- Make `import` work
- Write tests
- Consider even more edge cases
