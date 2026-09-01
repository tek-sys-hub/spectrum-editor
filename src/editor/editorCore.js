/**
 * Spectrum Editor - Interactive Controller & UI Engine
 * Orchestrates file tree, active tabs, syntax highlighting synchronization, and theme switching.
 */

import { SAMPLE_FILES } from './sampleFiles.js';
import { getFileIcon, extractExtension } from '../icons/iconMapper.js';
import { THEMES, DEFAULT_THEME_ID } from '../theme/palettes.js';
import { getTokenStyle } from '../theme/styleMapper.js';
import { Tokenizer } from '../tokenizer/tokenizer.js';

export class EditorApp {
  constructor() {
    this.files = [...SAMPLE_FILES];
    this.activeFileId = this.files[0].id;
    this.currentThemeId = DEFAULT_THEME_ID;
    this.openTabs = this.files.slice(0, 5).map(f => f.id);

    // DOM Elements cache
    this.dom = {
      fileTree: document.getElementById('fileTree'),
      tabBar: document.getElementById('tabBar'),
      codeEditor: document.getElementById('codeEditor'),
      codeHighlight: document.getElementById('codeHighlight'),
      lineGutter: document.getElementById('lineGutter'),
      themeSelect: document.getElementById('themeSelect'),
      themePill: document.getElementById('themePill'),
      langBadge: document.getElementById('langBadge'),
      cursorPos: document.getElementById('cursorPos'),
      tokenCount: document.getElementById('tokenCount'),
      fileCount: document.getElementById('fileCount'),
      paletteGrid: document.getElementById('paletteGrid'),
      newFileInput: document.getElementById('newFileInput'),
      addFileBtn: document.getElementById('addFileBtn')
    };

    this.init();
  }

  init() {
    this.renderThemeOptions();
    this.renderFileTree();
    this.renderTabs();
    this.applyTheme(this.currentThemeId);
    this.loadFile(this.activeFileId);
    this.bindEvents();
  }

  getActiveFile() {
    return this.files.find(f => f.id === this.activeFileId) || this.files[0];
  }

  renderThemeOptions() {
    if (!this.dom.themeSelect) return;
    this.dom.themeSelect.innerHTML = '';
    Object.values(THEMES).forEach(theme => {
      const option = document.createElement('option');
      option.value = theme.id;
      option.textContent = theme.name;
      if (theme.id === this.currentThemeId) option.selected = true;
      this.dom.themeSelect.appendChild(option);
    });
  }

  applyTheme(themeId) {
    const theme = THEMES[themeId] || THEMES[DEFAULT_THEME_ID];
    this.currentThemeId = theme.id;

    // Apply CSS custom properties dynamically
    const root = document.documentElement;
    root.style.setProperty('--bg-editor', theme.background);
    root.style.setProperty('--bg-surface', theme.surface);
    root.style.setProperty('--bg-sidebar', theme.sidebar);
    root.style.setProperty('--border-color', theme.border);
    root.style.setProperty('--text-primary', theme.text);
    root.style.setProperty('--text-muted', theme.textMuted);
    root.style.setProperty('--selection-bg', theme.selection);
    root.style.setProperty('--active-line-bg', theme.activeLine);
    root.style.setProperty('--cursor-color', theme.cursor);

    if (this.dom.themePill) {
      this.dom.themePill.textContent = theme.name;
    }

    this.renderPaletteInspector(theme);
    this.updateHighlight();
  }

  renderPaletteInspector(theme) {
    if (!this.dom.paletteGrid) return;
    this.dom.paletteGrid.innerHTML = '';

    const tokensToDisplay = [
      'keyword', 'function', 'string', 'number', 'type', 'tag', 'attribute', 'comment', 'operator', 'constant'
    ];

    tokensToDisplay.forEach(tokenType => {
      const styleMeta = getTokenStyle(tokenType, this.getActiveFile().language, theme.id);
      const card = document.createElement('div');
      card.className = 'palette-chip';
      card.innerHTML = `
        <span class="chip-color-preview" style="background-color: ${styleMeta.color};"></span>
        <div class="chip-info">
          <span class="chip-name">${tokenType}</span>
          <span class="chip-hex">${styleMeta.color}</span>
        </div>
      `;
      this.dom.paletteGrid.appendChild(card);
    });
  }

  renderFileTree() {
    if (!this.dom.fileTree) return;
    this.dom.fileTree.innerHTML = '';

    this.files.forEach(file => {
      const li = document.createElement('li');
      li.className = `file-tree-item ${file.id === this.activeFileId ? 'active' : ''}`;
      li.dataset.fileId = file.id;

      const icon = getFileIcon(file.name);
      li.innerHTML = `
        <span class="file-icon-wrapper">${icon.svg}</span>
        <span class="file-name">${file.name}</span>
        <span class="file-tag">${file.language}</span>
      `;

      li.addEventListener('click', () => {
        if (!this.openTabs.includes(file.id)) {
          this.openTabs.push(file.id);
        }
        this.loadFile(file.id);
        this.renderTabs();
        this.renderFileTree();
      });

      this.dom.fileTree.appendChild(li);
    });

    if (this.dom.fileCount) {
      this.dom.fileCount.textContent = `${this.files.length} files`;
    }
  }

  renderTabs() {
    if (!this.dom.tabBar) return;
    this.dom.tabBar.innerHTML = '';

    this.openTabs.forEach(fileId => {
      const file = this.files.find(f => f.id === fileId);
      if (!file) return;

      const tab = document.createElement('div');
      tab.className = `tab-item ${file.id === this.activeFileId ? 'active' : ''}`;
      const icon = getFileIcon(file.name);

      tab.innerHTML = `
        <span class="tab-icon">${icon.svg}</span>
        <span class="tab-label">${file.name}</span>
        <button class="tab-close" title="Close Tab" data-close-id="${file.id}">&times;</button>
      `;

      tab.addEventListener('click', (e) => {
        if (e.target.classList.contains('tab-close')) {
          e.stopPropagation();
          this.closeTab(file.id);
          return;
        }
        this.loadFile(file.id);
        this.renderTabs();
        this.renderFileTree();
      });

      this.dom.tabBar.appendChild(tab);
    });
  }

  closeTab(fileId) {
    if (this.openTabs.length <= 1) return; // Keep at least one tab
    this.openTabs = this.openTabs.filter(id => id !== fileId);
    if (this.activeFileId === fileId) {
      this.activeFileId = this.openTabs[this.openTabs.length - 1];
      this.loadFile(this.activeFileId);
    }
    this.renderTabs();
    this.renderFileTree();
  }

  loadFile(fileId) {
    this.activeFileId = fileId;
    const file = this.getActiveFile();
    if (!file) return;

    if (this.dom.codeEditor) {
      this.dom.codeEditor.value = file.content;
    }

    if (this.dom.langBadge) {
      this.dom.langBadge.textContent = file.language.toUpperCase();
    }

    this.updateLineNumbers();
    this.updateHighlight();
    this.renderPaletteInspector(THEMES[this.currentThemeId]);
  }

  updateLineNumbers() {
    if (!this.dom.lineGutter || !this.dom.codeEditor) return;
    const lines = this.dom.codeEditor.value.split('\n').length;
    let html = '';
    for (let i = 1; i <= lines; i++) {
      html += `<div class="gutter-num">${i}</div>`;
    }
    this.dom.lineGutter.innerHTML = html;
  }

  updateHighlight() {
    if (!this.dom.codeEditor || !this.dom.codeHighlight) return;
    const code = this.dom.codeEditor.value;
    const file = this.getActiveFile();
    file.content = code;

    // Highlight code using our Tokenizer & Theme
    const highlighted = Tokenizer.highlight(code, file.language, this.currentThemeId);
    this.dom.codeHighlight.innerHTML = highlighted + '<br>'; // Extra br prevents scrolling jump

    // Compute token stats
    const tokens = Tokenizer.tokenize(code, file.language);
    if (this.dom.tokenCount) {
      this.dom.tokenCount.textContent = `${tokens.length} tokens`;
    }
  }

  syncScroll() {
    if (!this.dom.codeEditor) return;
    const top = this.dom.codeEditor.scrollTop;
    const left = this.dom.codeEditor.scrollLeft;

    if (this.dom.codeHighlight) {
      this.dom.codeHighlight.scrollTop = top;
      this.dom.codeHighlight.scrollLeft = left;
    }

    if (this.dom.lineGutter) {
      this.dom.lineGutter.scrollTop = top;
    }
  }

  updateCursorPos() {
    if (!this.dom.codeEditor || !this.dom.cursorPos) return;
    const pos = this.dom.codeEditor.selectionStart;
    const textBefore = this.dom.codeEditor.value.substring(0, pos);
    const lines = textBefore.split('\n');
    const lineNum = lines.length;
    const colNum = lines[lines.length - 1].length + 1;
    this.dom.cursorPos.textContent = `Ln ${lineNum}, Col ${colNum}`;
  }

  addNewFile(fileName) {
    if (!fileName || !fileName.trim()) return;
    const cleanName = fileName.trim();
    const ext = extractExtension(cleanName);

    // Map extension to language identifier
    let lang = 'text';
    if (['js', 'mjs', 'cjs'].includes(ext)) lang = 'javascript';
    else if (['ts', 'tsx'].includes(ext)) lang = 'typescript';
    else if (['dart'].includes(ext)) lang = 'dart';
    else if (['html', 'htm'].includes(ext)) lang = 'html';
    else if (['py', 'pyw'].includes(ext)) lang = 'python';
    else if (['rs'].includes(ext)) lang = 'rust';
    else if (['go'].includes(ext)) lang = 'golang';
    else if (['css', 'scss'].includes(ext)) lang = 'css';
    else if (['json'].includes(ext)) lang = 'json';

    const newId = `file-${Date.now()}`;
    const newFile = {
      id: newId,
      name: cleanName,
      language: lang,
      content: `// New file: ${cleanName}\n\n`
    };

    this.files.push(newFile);
    this.openTabs.push(newId);
    this.renderFileTree();
    this.loadFile(newId);
    this.renderTabs();
  }

  bindEvents() {
    if (this.dom.codeEditor) {
      this.dom.codeEditor.addEventListener('input', () => {
        this.updateLineNumbers();
        this.updateHighlight();
        this.updateCursorPos();
      });

      this.dom.codeEditor.addEventListener('scroll', () => this.syncScroll());
      this.dom.codeEditor.addEventListener('click', () => this.updateCursorPos());
      this.dom.codeEditor.addEventListener('keyup', () => this.updateCursorPos());

      // Support Tab key indentation
      this.dom.codeEditor.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          e.preventDefault();
          const start = this.dom.codeEditor.selectionStart;
          const end = this.dom.codeEditor.selectionEnd;
          const val = this.dom.codeEditor.value;
          this.dom.codeEditor.value = val.substring(0, start) + '  ' + val.substring(end);
          this.dom.codeEditor.selectionStart = this.dom.codeEditor.selectionEnd = start + 2;
          this.updateHighlight();
        }
      });
    }

    if (this.dom.themeSelect) {
      this.dom.themeSelect.addEventListener('change', (e) => {
        this.applyTheme(e.target.value);
      });
    }

    if (this.dom.addFileBtn && this.dom.newFileInput) {
      const handleAdd = () => {
        const val = this.dom.newFileInput.value;
        if (val) {
          this.addNewFile(val);
          this.dom.newFileInput.value = '';
        }
      };

      this.dom.addFileBtn.addEventListener('click', handleAdd);
      this.dom.newFileInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleAdd();
      });
    }
  }
}
