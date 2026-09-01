/**
 * Spectrum Editor - Syntax Style Mapper
 * Computes exact text color, weight, font-style and CSS rules for syntax tokens.
 */

import { THEMES, DEFAULT_THEME_ID } from './palettes.js';
import { LANGUAGE_RULES } from './tokenRules.js';

/**
 * Standard Token Type Categories:
 * - keyword: control flow, declarations (function, class, return, var, void)
 * - storage: modifiers, access levels (const, let, async, final, static)
 * - function: user functions, methods, invokables (print(), setState(), console.log())
 * - string: text literals ("hello", 'world', `template`)
 * - number: integer, float, hex literals (123, 0xFF, 3.14)
 * - boolean: true, false
 * - constant: NULL, undefined, ALL_CAPS constants
 * - type: class names, interfaces, types (Widget, BuildContext, Promise, int)
 * - tag: HTML/XML markup tags (<div>, <span>, <AppBar>)
 * - attribute: HTML/XML attributes (class=, href=, id=)
 * - attributeValue: values of HTML attributes
 * - comment: single-line, multi-line, doc comments (// note, <!-- text -->)
 * - operator: arithmetic, comparison, logical (+, -, ===, =>)
 * - punctuation: brackets, commas, semicolons ({}, [], (), ;, :)
 * - property: object keys, member properties (.name, .length)
 * - variable: identifiers, parameters
 * - builtin: language globals & standard library calls
 * - decorator: annotations & decorators (@override, @Component)
 */

/**
 * Map token types to font styling rules
 */
const TOKEN_FONT_STYLES = {
  keyword: { fontWeight: '600', fontStyle: 'normal' },
  storage: { fontWeight: '600', fontStyle: 'italic' },
  function: { fontWeight: '500', fontStyle: 'normal' },
  method: { fontWeight: '500', fontStyle: 'normal' },
  type: { fontWeight: '600', fontStyle: 'normal' },
  class: { fontWeight: '600', fontStyle: 'normal' },
  comment: { fontWeight: '400', fontStyle: 'italic' },
  string: { fontWeight: '400', fontStyle: 'normal' },
  tag: { fontWeight: '600', fontStyle: 'normal' },
  attribute: { fontWeight: '400', fontStyle: 'italic' },
  decorator: { fontWeight: '500', fontStyle: 'italic' },
  operator: { fontWeight: '500', fontStyle: 'normal' },
  number: { fontWeight: '400', fontStyle: 'normal' },
  constant: { fontWeight: '600', fontStyle: 'normal' }
};

/**
 * Resolves full styling information for a given token, language, and theme
 * @param {string} tokenType - Category of token (e.g. 'keyword', 'function', 'string', 'tag', 'comment')
 * @param {string} [language='javascript'] - Programming language identifier ('javascript', 'dart', 'html', etc.)
 * @param {string|Object} [theme=DEFAULT_THEME_ID] - Theme key string or custom theme object
 * @returns {Object} Style payload containing color, CSS style string, class name, and raw properties
 */
export function getTokenStyle(tokenType, language = 'javascript', theme = DEFAULT_THEME_ID) {
  // 1. Resolve Theme
  let activeTheme;
  if (typeof theme === 'string') {
    activeTheme = THEMES[theme] || THEMES[DEFAULT_THEME_ID];
  } else if (theme && typeof theme === 'object') {
    activeTheme = theme;
  } else {
    activeTheme = THEMES[DEFAULT_THEME_ID];
  }

  const palette = activeTheme.palette || THEMES[DEFAULT_THEME_ID].palette;
  const langKey = (language || 'javascript').toLowerCase();

  // Normalize token type
  const normalizedType = (tokenType || 'variable').toLowerCase();

  // 2. Resolve Color with hierarchical fallback
  let color = palette[normalizedType];

  if (!color) {
    switch (normalizedType) {
      case 'method':
        color = palette.function || '#D2A8FF';
        break;
      case 'storage':
        color = palette.keyword || '#FF7B72';
        break;
      case 'class':
      case 'interface':
      case 'struct':
        color = palette.type || '#FFA657';
        break;
      case 'attributevalue':
        color = palette.string || '#A5D6FF';
        break;
      case 'decorator':
        color = palette.builtin || '#58A6FF';
        break;
      default:
        color = palette.variable || activeTheme.text || '#E6EDF3';
    }
  }

  // 3. Language-specific stylistic adjustments
  const fontMeta = TOKEN_FONT_STYLES[normalizedType] || { fontWeight: '400', fontStyle: 'normal' };
  let { fontWeight, fontStyle } = fontMeta;

  // Specific fine-tuning per language
  if (langKey === 'dart') {
    if (normalizedType === 'type') {
      fontWeight = '600'; // Emphasize Flutter Widget classes
    }
  } else if (langKey === 'html') {
    if (normalizedType === 'tag') {
      fontWeight = '600';
    }
  } else if (langKey === 'python') {
    if (normalizedType === 'builtin') {
      fontStyle = 'italic';
    }
  }

  // 4. Generate CSS string and class name
  const cssStyle = `color: ${color}; font-weight: ${fontWeight}; font-style: ${fontStyle};`;
  const className = `sp-token sp-token-${normalizedType} sp-lang-${langKey}`;

  return {
    tokenType: normalizedType,
    language: langKey,
    theme: activeTheme.id || 'custom',
    color,
    fontWeight,
    fontStyle,
    cssStyle,
    className,
    // Helper to generate ready HTML span
    wrap: (content) => `<span class="${className}" style="${cssStyle}">${escapeHtml(content)}</span>`
  };
}

/**
 * Helper to escape HTML characters safely
 * @param {string} str 
 * @returns {string}
 */
export function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
