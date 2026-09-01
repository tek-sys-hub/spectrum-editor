/**
 * Spectrum Editor - Color Palette Master
 * Curated, high-contrast, harmonious themes engineered for code readability.
 */

export const THEMES = {
  'spectrum-dark': {
    id: 'spectrum-dark',
    name: 'Spectrum Obsidian',
    type: 'dark',
    background: '#0D1117',
    surface: '#161B22',
    sidebar: '#0B0E14',
    border: '#30363D',
    text: '#E6EDF3',
    textMuted: '#8B949E',
    selection: 'rgba(56, 139, 253, 0.28)',
    activeLine: '#161B2288',
    cursor: '#58A6FF',
    palette: {
      keyword: '#FF7B72',       // Coral Red / Pink
      storage: '#FF7B72',       // Red / Pink
      function: '#D2A8FF',      // Electric Purple
      method: '#D2A8FF',        // Electric Purple
      string: '#A5D6FF',        // Sky Blue / Ice
      number: '#79C0FF',        // Light Blue
      boolean: '#FF7B72',       // Coral Red
      constant: '#79C0FF',      // Blue
      type: '#FFA657',          // Warm Amber / Gold
      class: '#FFA657',         // Warm Amber / Gold
      tag: '#7EE787',           // Emerald Green
      attribute: '#79C0FF',     // Light Blue
      attributeValue: '#A5D6FF',// Sky Blue
      comment: '#8B949E',       // Slate Grey
      operator: '#FF7B72',      // Coral Red
      punctuation: '#C9D1D9',    // Light Slate
      property: '#79C0FF',      // Cyan / Blue
      variable: '#E6EDF3',      // Bright White / Gray
      builtin: '#58A6FF',       // Vibrant Blue
      decorator: '#FFA657',     // Amber
      regexp: '#7EE787'         // Emerald
    }
  },

  'tokyo-night': {
    id: 'tokyo-night',
    name: 'Tokyo Twilight',
    type: 'dark',
    background: '#1A1B26',
    surface: '#24283B',
    sidebar: '#16161E',
    border: '#414868',
    text: '#C0CAF5',
    textMuted: '#565F89',
    selection: 'rgba(122, 162, 247, 0.3)',
    activeLine: '#292E4266',
    cursor: '#C0CAF5',
    palette: {
      keyword: '#BB9AF7',       // Soft Lavender
      storage: '#BB9AF7',       // Lavender
      function: '#7AA2F7',      // Tokyo Blue
      method: '#7AA2F7',        // Tokyo Blue
      string: '#9ECE6A',        // Spring Green
      number: '#FF9E64',        // Soft Orange
      boolean: '#FF9E64',       // Soft Orange
      constant: '#FF9E64',      // Soft Orange
      type: '#2AC3DE',          // Cyan / Aqua
      class: '#0DB9D7',         // Deep Aqua
      tag: '#F7768E',           // Crimson / Coral
      attribute: '#BB9AF7',     // Lavender
      attributeValue: '#9ECE6A',// Green
      comment: '#565F89',       // Deep Slate
      operator: '#89DDFF',      // Sky Cyan
      punctuation: '#9AA5CE',    // Muted Lavender
      property: '#73DACA',      // Mint
      variable: '#C0CAF5',      // Tokyo Silver
      builtin: '#7DCFFF',       // Bright Sky
      decorator: '#E0AF68',     // Gold
      regexp: '#B4F9F8'         // Mint Cyan
    }
  },

  'cyberpunk': {
    id: 'cyberpunk',
    name: 'Cyberpunk Neon',
    type: 'dark',
    background: '#120E24',
    surface: '#1A1435',
    sidebar: '#0C091A',
    border: '#FF2A8555',
    text: '#E3F2FD',
    textMuted: '#7D75A0',
    selection: 'rgba(255, 42, 133, 0.35)',
    activeLine: '#261C4C77',
    cursor: '#FFE600',
    palette: {
      keyword: '#FF2A85',       // Neon Hot Pink
      storage: '#FF2A85',       // Neon Hot Pink
      function: '#00F0FF',      // Cyber Cyan
      method: '#00F0FF',        // Cyber Cyan
      string: '#FFE600',        // Electric Yellow
      number: '#FF8800',        // Neon Orange
      boolean: '#FF8800',       // Neon Orange
      constant: '#FF8800',      // Neon Orange
      type: '#39FF14',          // Neon Lime
      class: '#39FF14',         // Neon Lime
      tag: '#FF2A85',           // Neon Pink
      attribute: '#00F0FF',     // Cyan
      attributeValue: '#FFE600',// Yellow
      comment: '#6E668C',       // Muted Violet
      operator: '#FF0055',      // Radical Red
      punctuation: '#B8AFF8',    // Lilac
      property: '#39FF14',      // Neon Green
      variable: '#E3F2FD',      // Crisp White
      builtin: '#00F0FF',       // Cyan
      decorator: '#FF8800',     // Neon Orange
      regexp: '#FFE600'         // Yellow
    }
  },

  'nordic-frost': {
    id: 'nordic-frost',
    name: 'Nordic Frost',
    type: 'dark',
    background: '#2E3440',
    surface: '#3B4252',
    sidebar: '#242933',
    border: '#4C566A',
    text: '#ECEFF4',
    textMuted: '#616E88',
    selection: 'rgba(136, 192, 208, 0.28)',
    activeLine: '#434C5E66',
    cursor: '#88C0D0',
    palette: {
      keyword: '#81A1C1',       // Frost Blue
      storage: '#81A1C1',       // Frost Blue
      function: '#88C0D0',      // Arctic Cyan
      method: '#88C0D0',        // Arctic Cyan
      string: '#A3BE8C',        // Auroral Green
      number: '#B48EAD',        // Auroral Purple
      boolean: '#81A1C1',       // Frost Blue
      constant: '#D08770',      // Auroral Orange
      type: '#8FBCBB',          // Frost Mint
      class: '#8FBCBB',         // Frost Mint
      tag: '#81A1C1',           // Frost Blue
      attribute: '#8FBCBB',     // Frost Mint
      attributeValue: '#A3BE8C',// Green
      comment: '#616E88',       // Polar Night Slate
      operator: '#81A1C1',      // Frost Blue
      punctuation: '#ECEFF4',    // Snow Storm
      property: '#D8DEE9',      // Snow Storm Dim
      variable: '#ECEFF4',      // Snow Storm White
      builtin: '#88C0D0',       // Arctic Cyan
      decorator: '#EBCB8B',     // Auroral Yellow
      regexp: '#EBCB8B'         // Yellow
    }
  },

  'solarized-dark': {
    id: 'solarized-dark',
    name: 'Solarized Precision',
    type: 'dark',
    background: '#002B36',
    surface: '#073642',
    sidebar: '#00212B',
    border: '#586E75',
    text: '#839496',
    textMuted: '#586E75',
    selection: 'rgba(38, 139, 210, 0.3)',
    activeLine: '#07364288',
    cursor: '#93A1A1',
    palette: {
      keyword: '#859900',       // Solar Green
      storage: '#859900',       // Solar Green
      function: '#268BD2',      // Solar Blue
      method: '#268BD2',        // Solar Blue
      string: '#2AA198',        // Solar Cyan
      number: '#D33682',        // Solar Magenta
      boolean: '#B58900',       // Solar Yellow
      constant: '#CB4B16',      // Solar Orange
      type: '#B58900',          // Solar Yellow
      class: '#B58900',         // Solar Yellow
      tag: '#268BD2',           // Solar Blue
      attribute: '#93A1A1',     // Light Base
      attributeValue: '#2AA198',// Cyan
      comment: '#586E75',       // Solar Gray
      operator: '#859900',      // Green
      punctuation: '#839496',    // Base0
      property: '#268BD2',      // Blue
      variable: '#839496',      // Base0
      builtin: '#6C71C4',       // Solar Violet
      decorator: '#CB4B16',     // Orange
      regexp: '#DC322F'         // Red
    }
  }
};

export const DEFAULT_THEME_ID = 'spectrum-dark';
