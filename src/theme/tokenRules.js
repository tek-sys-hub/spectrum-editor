/**
 * Spectrum Editor - Language Syntax Rules & Token Definitions
 * Comprehensive keyword, type, built-in function, and operator registries.
 */

export const LANGUAGE_RULES = {
  javascript: {
    name: 'JavaScript',
    keywords: [
      'async', 'await', 'break', 'case', 'catch', 'class', 'const', 'continue',
      'debugger', 'default', 'delete', 'do', 'else', 'export', 'extends',
      'finally', 'for', 'function', 'if', 'import', 'in', 'instanceof',
      'let', 'new', 'return', 'super', 'switch', 'this', 'throw', 'try',
      'typeof', 'var', 'void', 'while', 'with', 'yield', 'from', 'as', 'static',
      'get', 'set', 'of'
    ],
    builtins: [
      'console', 'window', 'document', 'Math', 'JSON', 'Promise', 'Object',
      'Array', 'String', 'Number', 'Boolean', 'Symbol', 'Map', 'Set',
      'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval', 'fetch',
      'process', 'Buffer', 'require', 'module', 'exports'
    ],
    constants: ['true', 'false', 'null', 'undefined', 'NaN', 'Infinity'],
    types: ['any', 'unknown', 'never', 'void', 'string', 'number', 'boolean', 'symbol', 'bigint', 'Record', 'Partial'],
    comments: { line: '//', blockStart: '/*', blockEnd: '*/' },
    stringQuotes: ["'", '"', '`']
  },

  typescript: {
    name: 'TypeScript',
    keywords: [
      'abstract', 'any', 'as', 'async', 'await', 'boolean', 'break', 'case',
      'catch', 'class', 'const', 'constructor', 'continue', 'debugger',
      'declare', 'default', 'delete', 'do', 'else', 'enum', 'export', 'extends',
      'false', 'finally', 'for', 'from', 'function', 'get', 'if', 'implements',
      'import', 'in', 'infer', 'instanceof', 'interface', 'is', 'keyof', 'let',
      'module', 'namespace', 'never', 'new', 'null', 'number', 'object', 'of',
      'override', 'package', 'private', 'protected', 'public', 'readonly',
      'record', 'require', 'return', 'set', 'static', 'string', 'super',
      'switch', 'symbol', 'this', 'throw', 'true', 'try', 'type', 'typeof',
      'undefined', 'unique', 'unknown', 'var', 'void', 'while', 'with', 'yield'
    ],
    builtins: ['console', 'window', 'document', 'Math', 'JSON', 'Promise', 'fetch'],
    constants: ['true', 'false', 'null', 'undefined'],
    types: ['string', 'number', 'boolean', 'any', 'void', 'never', 'unknown', 'T', 'Promise', 'Array'],
    comments: { line: '//', blockStart: '/*', blockEnd: '*/' },
    stringQuotes: ["'", '"', '`']
  },

  dart: {
    name: 'Dart',
    keywords: [
      'abstract', 'as', 'assert', 'async', 'await', 'break', 'case', 'catch',
      'class', 'const', 'continue', 'covariant', 'default', 'deferred', 'do',
      'dynamic', 'else', 'enum', 'export', 'extends', 'extension', 'external',
      'factory', 'final', 'finally', 'for', 'Function', 'get', 'hide', 'if',
      'implements', 'import', 'in', 'interface', 'is', 'late', 'library', 'mixin',
      'new', 'null', 'of', 'on', 'operator', 'part', 'required', 'rethrow',
      'return', 'set', 'show', 'static', 'super', 'switch', 'sync', 'this',
      'throw', 'try', 'typedef', 'var', 'void', 'while', 'with', 'yield'
    ],
    builtins: [
      'print', 'runApp', 'setState', 'initState', 'dispose', 'build',
      'Navigator', 'Theme', 'ScaffoldMessenger', 'debugPrint', 'identical'
    ],
    types: [
      'Widget', 'StatelessWidget', 'StatefulWidget', 'State', 'BuildContext',
      'Container', 'Text', 'Column', 'Row', 'Center', 'Scaffold', 'AppBar',
      'Future', 'Stream', 'List', 'Map', 'Set', 'int', 'double', 'num', 'bool',
      'String', 'Object', 'Duration', 'Color', 'EdgeInsets', 'Key'
    ],
    constants: ['true', 'false', 'null'],
    comments: { line: '//', blockStart: '/*', blockEnd: '*/', doc: '///' },
    stringQuotes: ["'", '"', 'r"', "r'", '"""', "'''"]
  },

  html: {
    name: 'HTML',
    keywords: ['doctype', 'DOCTYPE', 'html', 'head', 'body', 'script', 'style'],
    builtins: [],
    types: [],
    constants: [],
    comments: { blockStart: '<!--', blockEnd: '-->' },
    stringQuotes: ['"', "'"]
  },

  python: {
    name: 'Python',
    keywords: [
      'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue',
      'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from',
      'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not',
      'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield', 'match', 'case'
    ],
    builtins: [
      'print', 'len', 'range', 'int', 'str', 'float', 'list', 'dict', 'set',
      'tuple', 'type', 'isinstance', 'enumerate', 'zip', 'map', 'filter',
      'sum', 'min', 'max', 'abs', 'round', 'open', 'input', 'dir', 'help',
      'super', 'property', 'classmethod', 'staticmethod', '__init__'
    ],
    constants: ['True', 'False', 'None', 'Ellipsis', 'NotImplemented'],
    types: ['int', 'str', 'float', 'bool', 'list', 'dict', 'tuple', 'set', 'bytes', 'Any', 'Optional', 'Union'],
    comments: { line: '#' },
    stringQuotes: ['"', "'", '"""', "'''", 'f"', "f'", 'r"', "r'"]
  },

  rust: {
    name: 'Rust',
    keywords: [
      'as', 'async', 'await', 'break', 'const', 'continue', 'crate', 'dyn',
      'else', 'enum', 'extern', 'false', 'fn', 'for', 'if', 'impl', 'in',
      'let', 'loop', 'match', 'mod', 'move', 'mut', 'pub', 'ref', 'return',
      'self', 'Self', 'static', 'struct', 'super', 'trait', 'true', 'type',
      'unsafe', 'use', 'where', 'while'
    ],
    builtins: ['println', 'format', 'panic', 'vec', 'Some', 'None', 'Ok', 'Err'],
    types: ['i8', 'i16', 'i32', 'i64', 'i128', 'u8', 'u16', 'u32', 'u64', 'u128', 'f32', 'f64', 'bool', 'char', 'str', 'String', 'Vec', 'Option', 'Result'],
    constants: ['true', 'false'],
    comments: { line: '//', blockStart: '/*', blockEnd: '*/' },
    stringQuotes: ['"', "'"]
  },

  golang: {
    name: 'Go',
    keywords: [
      'break', 'case', 'chan', 'const', 'continue', 'default', 'defer',
      'else', 'fallthrough', 'for', 'func', 'go', 'goto', 'if', 'import',
      'interface', 'map', 'package', 'range', 'return', 'select', 'struct',
      'switch', 'type', 'var'
    ],
    builtins: ['println', 'print', 'make', 'new', 'append', 'len', 'cap', 'close', 'panic', 'recover'],
    types: ['bool', 'string', 'int', 'int8', 'int16', 'int32', 'int64', 'uint', 'uint8', 'uint16', 'uint32', 'uint64', 'float32', 'float64', 'error', 'byte', 'rune'],
    constants: ['true', 'false', 'iota', 'nil'],
    comments: { line: '//', blockStart: '/*', blockEnd: '*/' },
    stringQuotes: ['"', '`', "'"]
  },

  css: {
    name: 'CSS',
    keywords: ['@import', '@media', '@keyframes', '@font-face', '@supports', '!important'],
    builtins: ['rgb', 'rgba', 'hsl', 'hsla', 'var', 'calc', 'url', 'linear-gradient', 'clamp'],
    types: [],
    constants: [],
    comments: { blockStart: '/*', blockEnd: '*/' },
    stringQuotes: ['"', "'"]
  },

  text: {
    name: 'Plain Text',
    keywords: [],
    builtins: [],
    types: [],
    constants: [],
    comments: {},
    stringQuotes: []
  }
};
