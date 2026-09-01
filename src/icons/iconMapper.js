/**
 * Spectrum Editor - SVG File Icon Resolver
 * Robust safety mapper linking file extensions and special filenames to SVG icons.
 */

import { SVG_ICONS } from './svgDefinitions.js';

/**
 * Extension to SVG Icon key mapping
 */
export const FILE_EXTENSION_MAP = {
  // JavaScript & TypeScript
  'js': 'javascript',
  'mjs': 'javascript',
  'cjs': 'javascript',
  'jsx': 'javascript',
  'ts': 'typescript',
  'tsx': 'typescript',
  'd.ts': 'typescript',

  // Dart & Flutter
  'dart': 'dart',

  // HTML & Templates
  'html': 'html',
  'htm': 'html',
  'xhtml': 'html',

  // Python & Notebooks
  'py': 'python',
  'pyw': 'python',
  'pyx': 'python',
  'ipynb': 'python',

  // Systems & Compiled Languages
  'rs': 'rust',
  'go': 'golang',
  'c': 'c',
  'h': 'c',
  'cpp': 'cpp',
  'cc': 'cpp',
  'cxx': 'cpp',
  'hpp': 'cpp',
  'hxx': 'cpp',
  'cs': 'csharp',
  'java': 'java',
  'class': 'java',
  'jar': 'java',
  'kt': 'kotlin',
  'kts': 'kotlin',
  'swift': 'swift',

  // Scripting & Backend
  'php': 'php',
  'phtml': 'php',
  'rb': 'ruby',
  'erb': 'ruby',
  'sh': 'bash',
  'bash': 'bash',
  'zsh': 'bash',
  'fish': 'bash',
  'sql': 'sql',

  // Styling & Web
  'css': 'css',
  'scss': 'sass',
  'sass': 'sass',
  'less': 'css',

  // Data & Configurations
  'json': 'json',
  'json5': 'json',
  'yaml': 'yaml',
  'yml': 'yaml',
  'xml': 'xml',
  'svg': 'xml',

  // Documentation & Text
  'md': 'markdown',
  'mdx': 'markdown',
  'txt': 'text',
  'log': 'text',
  'rtf': 'text',
  'env': 'bash'
};

/**
 * Exact filename to SVG Icon key mapping
 */
export const SPECIAL_FILENAME_MAP = {
  'package.json': 'npm',
  'package-lock.json': 'npm',
  'pubspec.yaml': 'dart',
  'pubspec.lock': 'dart',
  'cargo.toml': 'rust',
  'cargo.lock': 'rust',
  'go.mod': 'golang',
  'go.sum': 'golang',
  'dockerfile': 'docker',
  'docker-compose.yml': 'docker',
  'docker-compose.yaml': 'docker',
  '.gitignore': 'git',
  '.gitattributes': 'git',
  '.gitmodules': 'git',
  '.env': 'bash',
  '.env.local': 'bash',
  '.env.production': 'bash',
  'readme.md': 'markdown',
  'makefile': 'bash',
  'cmakelists.txt': 'cpp'
};

/**
 * Extract file extension safely from a given path or filename
 * @param {string} fileName 
 * @returns {string} Clean lowercase extension (without leading dot)
 */
export function extractExtension(fileName) {
  if (!fileName || typeof fileName !== 'string') return '';
  
  // Extract base filename if a full path is provided
  const baseName = fileName.replace(/\\/g, '/').split('/').pop().trim();
  if (!baseName) return '';

  // Check for compound extensions first (e.g., .d.ts, .spec.js, .test.tsx)
  const parts = baseName.toLowerCase().split('.');
  if (parts.length > 2) {
    const compound = `${parts[parts.length - 2]}.${parts[parts.length - 1]}`;
    if (FILE_EXTENSION_MAP[compound]) {
      return compound;
    }
  }

  // Handle dotfiles like .gitignore, .env
  if (baseName.startsWith('.') && parts.length === 2 && parts[0] === '') {
    return baseName.toLowerCase();
  }

  // Standard extension
  if (parts.length > 1) {
    return parts.pop().toLowerCase();
  }

  return '';
}

/**
 * Safety function to resolve the SVG file icon based on filename
 * @param {string} fileName - Name or path of the file
 * @param {Object} [options] - Configuration options
 * @param {boolean} [options.asSvgString=true] - Return raw SVG string or Icon metadata object
 * @param {string} [options.fallback='defaultFile'] - Fallback icon key if unmatched
 * @returns {Object|string} Icon definition or SVG string
 */
export function getFileIcon(fileName, options = {}) {
  const {
    asSvgString = false,
    fallback = 'defaultFile'
  } = options;

  // Safe fallback icon
  const defaultIcon = SVG_ICONS[fallback] || SVG_ICONS.defaultFile;

  if (!fileName || typeof fileName !== 'string') {
    return asSvgString ? defaultIcon.svg : defaultIcon;
  }

  const baseName = fileName.replace(/\\/g, '/').split('/').pop().trim().toLowerCase();
  
  // 1. Check Exact Special Filename match (e.g. package.json, Dockerfile, .gitignore)
  if (SPECIAL_FILENAME_MAP[baseName]) {
    const iconKey = SPECIAL_FILENAME_MAP[baseName];
    const icon = SVG_ICONS[iconKey] || defaultIcon;
    return asSvgString ? icon.svg : icon;
  }

  // 2. Extract and match by extension
  const ext = extractExtension(fileName);
  if (ext) {
    // Check if dotfile matched special filename map
    if (SPECIAL_FILENAME_MAP[ext]) {
      const iconKey = SPECIAL_FILENAME_MAP[ext];
      const icon = SVG_ICONS[iconKey] || defaultIcon;
      return asSvgString ? icon.svg : icon;
    }

    if (FILE_EXTENSION_MAP[ext]) {
      const iconKey = FILE_EXTENSION_MAP[ext];
      const icon = SVG_ICONS[iconKey] || defaultIcon;
      return asSvgString ? icon.svg : icon;
    }
  }

  // 3. Fallback for unknown extensions / files
  return asSvgString ? defaultIcon.svg : defaultIcon;
}

/**
 * Get folder icon (open or closed state)
 * @param {boolean} [isOpen=false] 
 * @param {boolean} [asSvgString=false] 
 * @returns {Object|string}
 */
export function getFolderIcon(isOpen = false, asSvgString = false) {
  const icon = isOpen ? SVG_ICONS.folderOpen : SVG_ICONS.folder;
  return asSvgString ? icon.svg : icon;
}
