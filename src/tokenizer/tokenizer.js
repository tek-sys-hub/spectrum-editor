/**
 * Spectrum Editor - Lexical Tokenizer & Syntax Highlighter
 * High-performance regex-driven syntax tokenizer for real-time code highlighting.
 */

import { LANGUAGE_RULES } from '../theme/tokenRules.js';
import { getTokenStyle, escapeHtml } from '../theme/styleMapper.js';
import { DEFAULT_THEME_ID } from '../theme/palettes.js';

export class Tokenizer {
  /**
   * Tokenize input source code into structured tokens
   * @param {string} code - Raw code string
   * @param {string} language - Target language ID (e.g. 'javascript', 'dart', 'html', 'python')
   * @returns {Array<{ type: string, value: string, index: number }>}
   */
  static tokenize(code, language = 'javascript') {
    if (!code) return [];
    const lang = (language || 'javascript').toLowerCase();

    if (lang === 'html' || lang === 'htm' || lang === 'xml') {
      return this.tokenizeHtml(code);
    }

    return this.tokenizeCode(code, lang);
  }

  /**
   * Specialized Tokenizer for HTML / XML markup
   */
  static tokenizeHtml(code) {
    const tokens = [];
    let i = 0;
    const len = code.length;

    while (i < len) {
      // 1. HTML Comment: <!-- ... -->
      if (code.startsWith('<!--', i)) {
        const end = code.indexOf('-->', i + 4);
        const commentEnd = end !== -1 ? end + 3 : len;
        tokens.push({ type: 'comment', value: code.slice(i, commentEnd), index: i });
        i = commentEnd;
        continue;
      }

      // 2. Tag Opening: <tag or </tag or <!DOCTYPE
      if (code[i] === '<') {
        let tagClose = code.indexOf('>', i);
        if (tagClose === -1) tagClose = len;

        const tagContent = code.slice(i, tagClose + 1);
        
        // Parse within the tag
        const tagTokens = this.parseHtmlTag(tagContent, i);
        tokens.push(...tagTokens);

        i = tagClose + 1;
        continue;
      }

      // 3. Text between tags
      let nextTag = code.indexOf('<', i);
      if (nextTag === -1) nextTag = len;
      const text = code.slice(i, nextTag);
      if (text) {
        tokens.push({ type: 'variable', value: text, index: i });
      }
      i = nextTag;
    }

    return tokens;
  }

  /**
   * Parse internal tokens of an HTML tag e.g. `<div id="app" class="flex">`
   */
  static parseHtmlTag(tagString, baseIndex) {
    const tokens = [];
    const tagRegex = /(<\/?[a-zA-Z0-9_\-:]+|\/?>)|([a-zA-Z0-9_\-:]+)(?=\s*=)|(=)|(".*?"|'.*?'|[^\s>]+)|(\s+)/g;
    let match;

    while ((match = tagRegex.exec(tagString)) !== null) {
      const idx = baseIndex + match.index;
      const [full, tag, attr, eq, val, space] = match;

      if (tag) {
        tokens.push({ type: 'tag', value: tag, index: idx });
      } else if (attr) {
        tokens.push({ type: 'attribute', value: attr, index: idx });
      } else if (eq) {
        tokens.push({ type: 'operator', value: eq, index: idx });
      } else if (val) {
        if (val.startsWith('"') || val.startsWith("'")) {
          tokens.push({ type: 'attributeValue', value: val, index: idx });
        } else {
          tokens.push({ type: 'attributeValue', value: val, index: idx });
        }
      } else if (space) {
        tokens.push({ type: 'whitespace', value: space, index: idx });
      }
    }

    return tokens;
  }

  /**
   * General Programming Language Tokenizer (JS, TS, Dart, Python, Rust, Go, CSS, etc.)
   */
  static tokenizeCode(code, lang) {
    const rules = LANGUAGE_RULES[lang] || LANGUAGE_RULES.javascript;
    const tokens = [];
    
    // Build keyword & builtin lookup sets
    const keywordSet = new Set(rules.keywords || []);
    const builtinSet = new Set(rules.builtins || []);
    const constantSet = new Set(rules.constants || []);
    const typeSet = new Set(rules.types || []);

    // Regular Expression patterns
    // 1. Comments: single line // or #, multi-line /* */, doc comments ///
    // 2. Strings: template ``, double "", single '', raw strings r"", multiline """
    // 3. Numbers: hex 0x..., floats 12.34, ints 123
    // 4. Decorators: @something
    // 5. Word identifiers: [a-zA-Z_$][a-zA-Z0-9_$]*
    // 6. Operators & Punctuation
    
    const isPython = lang === 'python';
    
    // Pattern assembly
    const commentPattern = isPython 
      ? '(?:#[^\\n]*)'
      : '(?:\\/\\/\\/[^\\n]*|\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)';
      
    const stringPattern = isPython
      ? '(?:"""[\\s\\S]*?"""|\'\'\'[\\s\\S]*?\'\'\'|[fFrRuUbB]?"(?:\\\\.|[^"\\\\\\n])*"|[fFrRuUbB]?\'(?:\\\\.|[^\'\\\\\\n])*\')'
      : '(?:`(?:\\\\.|[^`\\\\])*`|r?"(?:\\\\.|[^"\\\\\\n])*"|r?\'(?:\\\\.|[^\'\\\\\\n])*\')';

    const numberPattern = '\\b(?:0x[a-fA-F0-9]+|0b[01]+|0o[0-7]+|\\d+\\.?\\d*(?:[eE][+-]?\\d+)?)\\b';
    const decoratorPattern = '@[a-zA-Z_$][a-zA-Z0-9_$]*';
    const wordPattern = '[a-zA-Z_$][a-zA-Z0-9_$]*';
    const operatorPattern = '(?:=>|->|===|!==|==|!=|<=|>=|&&|\\|\\||\\+\\+|--|\\+=|-=|\\*=|\\/=|\\?\\?|::|\\.\\.\\.|[+\\-*\\/%&|^!=<>?~:])';
    const punctuationPattern = '[{}()\\[\\],;.]';
    const whitespacePattern = '\\s+';

    const masterRegex = new RegExp(
      `(${commentPattern})|(${stringPattern})|(${decoratorPattern})|(${numberPattern})|(${wordPattern})|(${operatorPattern})|(${punctuationPattern})|(${whitespacePattern})|([^\\s])`,
      'g'
    );

    let match;
    while ((match = masterRegex.exec(code)) !== null) {
      const [
        full,
        comment,
        str,
        decorator,
        num,
        word,
        op,
        punc,
        space,
        unknown
      ] = match;

      const index = match.index;

      if (comment) {
        tokens.push({ type: 'comment', value: comment, index });
      } else if (str) {
        tokens.push({ type: 'string', value: str, index });
      } else if (decorator) {
        tokens.push({ type: 'decorator', value: decorator, index });
      } else if (num) {
        tokens.push({ type: 'number', value: num, index });
      } else if (word) {
        // Classify the word identifier
        // Peek next non-space char to check if it's a function call e.g. word(
        const remaining = code.slice(index + word.length);
        const isFollowedByParen = /^\s*\(/.test(remaining);

        if (keywordSet.has(word)) {
          tokens.push({ type: 'keyword', value: word, index });
        } else if (constantSet.has(word)) {
          tokens.push({ type: 'constant', value: word, index });
        } else if (builtinSet.has(word)) {
          tokens.push({ type: 'builtin', value: word, index });
        } else if (typeSet.has(word) || /^[A-Z][a-zA-Z0-9_$]*$/.test(word)) {
          // PascalCase convention is typically a Type / Class / Widget
          tokens.push({ type: 'type', value: word, index });
        } else if (isFollowedByParen) {
          tokens.push({ type: 'function', value: word, index });
        } else if (/^[A-Z0-9_]{2,}$/.test(word)) {
          // ALL_CAPS constants
          tokens.push({ type: 'constant', value: word, index });
        } else {
          tokens.push({ type: 'variable', value: word, index });
        }
      } else if (op) {
        tokens.push({ type: 'operator', value: op, index });
      } else if (punc) {
        tokens.push({ type: 'punctuation', value: punc, index });
      } else if (space) {
        tokens.push({ type: 'whitespace', value: space, index });
      } else if (unknown) {
        tokens.push({ type: 'variable', value: unknown, index });
      }
    }

    return tokens;
  }

  /**
   * Convert code string to highlighted HTML spans using token styles
   * @param {string} code 
   * @param {string} language 
   * @param {string|Object} [theme=DEFAULT_THEME_ID] 
   * @returns {string} Fully highlighted HTML string
   */
  static highlight(code, language = 'javascript', theme = DEFAULT_THEME_ID) {
    if (!code) return '';
    const tokens = this.tokenize(code, language);

    return tokens.map(token => {
      if (token.type === 'whitespace') {
        return escapeHtml(token.value);
      }
      const style = getTokenStyle(token.type, language, theme);
      return style.wrap(token.value);
    }).join('');
  }
}
