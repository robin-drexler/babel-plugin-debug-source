function getFilePathArgument(path, t, state) {
  return t.stringLiteral(
    `${state.file.opts.filename}:${path.node.loc.start.line}:${
      path.node.loc.start.column
    }`
  );
}

/**
 *
 */
function handleFactoryFunction(variableName, path, t, state) {
  const paths = path.scope.getBinding(variableName).referencePaths;
  if (!paths.length) {
    return;
  }

  // We only care about function invocations
  // Statements like `if (debug)` can be left untouched
  const variables = paths.filter(path => path.findParent(t.isCallExpression));
  variables.forEach(path => {
    // `debug('foo')('bar')`
    const epxressionStatement = path.findParent(t.isExpressionStatement);
    if (epxressionStatement) {
      return epxressionStatement
        .get('expression')
        .node.arguments.push(getFilePathArgument(path, t, state));
    }

    // const log = debug('foo');
    // log('bar')
    return handleIdentifier(path.findParent(t.isVariableDeclarator), t, state);
  });
}

function handleIdentifier(path, t, state) {
  const variableName = path.node.id.name;
  const paths = path.scope.getBinding(variableName).referencePaths;
  if (!paths.length) {
    return;
  }

  paths.forEach(path => {
    if (!t.isCallExpression(path.parent)) {
      return;
    }

    path.parent.arguments.push(getFilePathArgument(path, t, state));
  });
}

module.exports = function(babel) {
  const { types: t } = babel;
  return {
    visitor: {
      ImportDefaultSpecifier(path, state) {
        if (path.parentPath.get('source').node.value !== 'debug') {
          return;
        }
        return handleFactoryFunction(
          path.get('local').node.name,
          path,
          t,
          state
        );
      },
      CallExpression(path, state) {
        if (path.node.callee.name !== 'require') {
          return;
        }

        if (path.node.arguments[0].value !== 'debug') {
          return;
        }

        // immediate invocation `require('debug')('something')`
        if (t.isCallExpression(path.parentPath.get('callee'))) {
          const identifier = path.findParent(t.isVariableDeclarator);

          if (!identifier) {
            return;
          }
          return handleIdentifier(identifier, t, state);
        }

        // require with later usage
        // `const debug = require('debug');`
        // const log = debug('foo');
        // log('bar')

        // or debug('foo')('bar')

        // get whatever var was used to require `debug` to
        const variableDeclaration = path.findParent(t.isVariableDeclarator);

        // `require('debug')` without any variable assignment
        if (!variableDeclaration) {
          return;
        }
        const variableName = path.findParent(t.isVariableDeclarator).node.id
          .name;

        return handleFactoryFunction(variableName, path, t, state);
      }
    }
  };
};
