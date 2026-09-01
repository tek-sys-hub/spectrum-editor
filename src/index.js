/**
 * Spectrum Editor Customization Package
 * Complete, reusable editor toolkit for SVG file icons and syntax color themes.
 */

// Icon Exports
export {
  SVG_ICONS
} from './icons/svgDefinitions.js';

export {
  getFileIcon,
  getFolderIcon,
  extractExtension,
  FILE_EXTENSION_MAP,
  SPECIAL_FILENAME_MAP
} from './icons/iconMapper.js';

// Theme & Palette Exports
export {
  THEMES,
  DEFAULT_THEME_ID
} from './theme/palettes.js';

export {
  LANGUAGE_RULES
} from './theme/tokenRules.js';

export {
  getTokenStyle,
  escapeHtml
} from './theme/styleMapper.js';

// Tokenizer & Highlighter Exports
export {
  Tokenizer
} from './tokenizer/tokenizer.js';
