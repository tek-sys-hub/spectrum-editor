/**
 * Spectrum Editor - Package Unit Test Suite
 */

import {
  getFileIcon,
  getFolderIcon,
  extractExtension,
  FILE_EXTENSION_MAP,
  SPECIAL_FILENAME_MAP,
  SVG_ICONS,
  THEMES,
  getTokenStyle,
  Tokenizer
} from '../src/index.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  \x1b[32m✔ PASS\x1b[0m: ${message}`);
    passed++;
  } else {
    console.error(`  \x1b[31m✘ FAIL\x1b[0m: ${message}`);
    failed++;
  }
}

console.log('\x1b[1m=== 1. Testing SVG File Icon Mapping & getFileIcon() ===\x1b[0m');

// Standard extensions
assert(getFileIcon('app.js').name === 'JavaScript', 'Resolves .js to JavaScript icon');
assert(getFileIcon('main.dart').name === 'Dart', 'Resolves .dart to Dart icon');
assert(getFileIcon('index.html').name === 'HTML5', 'Resolves .html to HTML5 icon');
assert(getFileIcon('script.py').name === 'Python', 'Resolves .py to Python icon');
assert(getFileIcon('notes.txt').name === 'Plain Text', 'Resolves .txt to Plain Text icon');
assert(getFileIcon('kernel.rs').name === 'Rust', 'Resolves .rs to Rust icon');
assert(getFileIcon('server.go').name === 'Go', 'Resolves .go to Go icon');
assert(getFileIcon('style.css').name === 'CSS3', 'Resolves .css to CSS3 icon');

// Special filenames
assert(getFileIcon('package.json').name === 'NPM / Node', 'Resolves package.json to NPM icon');
assert(getFileIcon('.gitignore').name === 'Git', 'Resolves .gitignore to Git icon');
assert(getFileIcon('Dockerfile').name === 'Docker', 'Resolves Dockerfile to Docker icon');

// Compound extensions
assert(extractExtension('component.test.tsx') === 'tsx', 'Handles compound test.tsx correctly');
assert(extractExtension('types.d.ts') === 'd.ts', 'Extracts compound .d.ts correctly');

// Edge cases and fallback safety
assert(getFileIcon('unknown_file_without_ext').name === 'Generic File', 'Safe fallback for file without extension');
assert(getFileIcon('').name === 'Generic File', 'Safe fallback for empty string');
assert(getFileIcon(null).name === 'Generic File', 'Safe fallback for null');
assert(getFileIcon(undefined).name === 'Generic File', 'Safe fallback for undefined');

// SVG string output mode
const svgStr = getFileIcon('main.dart', { asSvgString: true });
assert(typeof svgStr === 'string' && svgStr.includes('<svg'), 'Returns raw SVG string when asSvgString: true');

// Folder icon
assert(getFolderIcon(false).name === 'Folder', 'Returns closed folder icon');
assert(getFolderIcon(true).name === 'Open Folder', 'Returns open folder icon');

console.log('\n\x1b[1m=== 2. Testing Syntax Style Mapper & getTokenStyle() ===\x1b[0m');

const jsKeyword = getTokenStyle('keyword', 'javascript', 'spectrum-dark');
assert(jsKeyword.color === '#FF7B72', 'JavaScript keyword has correct Coral Red color in spectrum-dark');
assert(jsKeyword.cssStyle.includes('color: #FF7B72'), 'Generates valid inline CSS string');
assert(jsKeyword.className.includes('sp-token-keyword'), 'Generates valid CSS class');

const dartType = getTokenStyle('type', 'dart', 'spectrum-dark');
assert(dartType.fontWeight === '600', 'Dart types have bold weight for Widget emphasis');

const htmlTag = getTokenStyle('tag', 'html', 'tokyo-night');
assert(htmlTag.color === '#F7768E', 'HTML tag uses Tokyo Twilight palette color');

const pyFunc = getTokenStyle('function', 'python', 'cyberpunk');
assert(pyFunc.color === '#00F0FF', 'Python function uses Cyberpunk Neon Cyan');

console.log('\n\x1b[1m=== 3. Testing Tokenizer & Lexical Analyzer ===\x1b[0m');

// JavaScript tokenization
const jsTokens = Tokenizer.tokenize('function calculate(x) { return x * 2; }', 'javascript');
assert(jsTokens.some(t => t.type === 'keyword' && t.value === 'function'), 'Tokenizes JS keyword');
assert(jsTokens.some(t => t.type === 'function' && t.value === 'calculate'), 'Tokenizes JS function identifier');
assert(jsTokens.some(t => t.type === 'number' && t.value === '2'), 'Tokenizes JS number literal');

// Dart tokenization
const dartCode = 'class MyWidget extends StatelessWidget { void build() { print("Hi"); } }';
const dartTokens = Tokenizer.tokenize(dartCode, 'dart');
assert(dartTokens.some(t => t.type === 'type' && t.value === 'StatelessWidget'), 'Tokenizes Dart Widget class');
assert(dartTokens.some(t => t.type === 'builtin' && t.value === 'print'), 'Tokenizes Dart print() builtin');

// HTML tokenization
const htmlCode = '<div class="container" id="main"><span data-id="1">Text</span></div>';
const htmlTokens = Tokenizer.tokenize(htmlCode, 'html');
assert(htmlTokens.some(t => t.type === 'tag' && t.value === '<div'), 'Tokenizes HTML opening tag');
assert(htmlTokens.some(t => t.type === 'attribute' && t.value === 'class'), 'Tokenizes HTML attribute name');
assert(htmlTokens.some(t => t.type === 'attributeValue' && t.value.includes('container')), 'Tokenizes HTML attribute value');

// Python tokenization
const pyCode = 'def process_data(items: list):\n    # Process elements\n    print(f"Total: {len(items)}")';
const pyTokens = Tokenizer.tokenize(pyCode, 'python');
assert(pyTokens.some(t => t.type === 'keyword' && t.value === 'def'), 'Tokenizes Python def keyword');
assert(pyTokens.some(t => t.type === 'comment'), 'Tokenizes Python # comment');

// Highlighter HTML generation
const highlightedHtml = Tokenizer.highlight('const x = 100;', 'javascript', 'spectrum-dark');
assert(highlightedHtml.includes('class="sp-token') && highlightedHtml.includes('const'), 'Generates valid HTML highlighted markup');

console.log(`\n\x1b[1mSummary: ${passed} passed, ${failed} failed\x1b[0m\n`);

if (failed > 0) {
  process.exit(1);
}
