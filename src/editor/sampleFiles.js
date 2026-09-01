/**
 * Spectrum Editor - Preloaded Sample Files
 * Demonstrates syntax styling across multiple programming languages.
 */

export const SAMPLE_FILES = [
  {
    id: 'main-dart',
    name: 'main.dart',
    language: 'dart',
    content: `// Flutter State Management & Theme Controller
import 'package:flutter/material.dart';

void main() {
  runApp(const SpectrumApp());
}

class SpectrumApp extends StatefulWidget {
  const SpectrumApp({super.key});

  @override
  State<SpectrumApp> createState() => _SpectrumAppState();
}

class _SpectrumAppState extends State<SpectrumApp> {
  int _counter = 42;
  final String _version = "v2.5.0-spectrum";

  void _incrementCounter() {
    setState(() {
      _counter += 1;
      debugPrint('Counter updated: \$_counter');
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Spectrum Flutter Demo',
      theme: ThemeData.dark(),
      home: Scaffold(
        appBar: AppBar(
          title: Text('Spectrum Editor: \$_version'),
          elevation: 4.0,
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              const Text('Synthesizing dynamic color tokens:'),
              Text(
                '\$_counter',
                style: Theme.of(context).textTheme.headlineMedium,
              ),
            ],
          ),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: _incrementCounter,
          tooltip: 'Increment',
          child: const Icon(Icons.add_circle_outline),
        ),
      ),
    );
  }
}`
  },

  {
    id: 'app-js',
    name: 'app.js',
    language: 'javascript',
    content: `/**
 * Spectrum Editor Engine - Asynchronous Pipeline
 * Real-time syntax parsing and reactive state dispatching.
 */

import { Tokenizer } from './tokenizer/tokenizer.js';
import { getFileIcon } from './icons/iconMapper.js';

class SpectrumEngine {
  #activeTheme = 'spectrum-dark';
  #cache = new Map();

  constructor(options = {}) {
    this.debug = options.debug ?? true;
    this.version = "1.0.0";
    console.log(\`[SpectrumEngine] Initialized \${this.version}\`);
  }

  async parseSource(fileName, sourceCode) {
    const startTime = performance.now();
    const icon = getFileIcon(fileName);

    if (this.#cache.has(fileName)) {
      return this.#cache.get(fileName);
    }

    // Generate tokens and formatted spans
    const tokens = Tokenizer.tokenize(sourceCode, 'javascript');
    const elapsed = (performance.now() - startTime).toFixed(2);

    const result = {
      file: fileName,
      icon,
      tokenCount: tokens.length,
      durationMs: Number(elapsed)
    };

    this.#cache.set(fileName, result);
    return result;
  }
}

export const engine = new SpectrumEngine();
`
  },

  {
    id: 'index-html',
    name: 'index.html',
    language: 'html',
    content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Spectrum Editor &bull; Pro Suite</title>
    <link rel="stylesheet" href="styles/main.css" />
    <!-- Preload fonts for ultra-crisp typography -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
  </head>
  <body class="theme-spectrum-dark">
    <div id="app" class="editor-layout">
      <!-- Sidebar Navigation -->
      <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
          <span class="brand-title">EXPLORER</span>
        </div>
        <ul id="fileTree" class="file-tree" role="tree"></ul>
      </aside>

      <!-- Main Editor Canvas -->
      <main class="editor-main" role="main">
        <div class="tab-bar" id="tabBar"></div>
        <div class="editor-canvas" id="editorContainer">
          <div class="line-numbers" id="lineGutter"></div>
          <div class="code-view" id="codeHighlight"></div>
          <textarea id="codeEditor" spellcheck="false"></textarea>
        </div>
      </main>
    </div>
  </body>
</html>`
  },

  {
    id: 'script-py',
    name: 'pipeline.py',
    language: 'python',
    content: `#!/usr/bin/env python3
"""
Spectrum Data Analytics Pipeline
High-performance batch processing and ML feature transformation.
"""

import sys
import time
from typing import List, Dict, Optional
from dataclasses import dataclass

@dataclass
class TokenMetric:
    name: str
    frequency: int
    confidence: float = 0.98

class PipelineProcessor:
    def __init__(self, batch_size: int = 128) -> None:
        self.batch_size = batch_size
        self._metrics: List[TokenMetric] = []
        print(f"[Pipeline] Initialized with batch size {self.batch_size}")

    @property
    def total_tokens(self) -> int:
        return sum(m.frequency for m in self._metrics)

    async def ingest_stream(self, data_feed: List[Dict[str, any]]) -> bool:
        """Process incoming raw streams asynchronously."""
        if not data_feed:
            return False

        for item in data_feed:
            metric = TokenMetric(
                name=item.get("token", "UNKNOWN"),
                frequency=int(item.get("count", 1))
            )
            self._metrics.append(metric)

        time.sleep(0.01)
        return True

if __name__ == "__main__":
    processor = PipelineProcessor(batch_size=256)
    print(f"Total metrics processed: {processor.total_tokens}")
`
  },

  {
    id: 'cargo-rs',
    name: 'kernel.rs',
    language: 'rust',
    content: `// Spectrum Microkernel Memory Allocator
use std::sync::atomic::{AtomicUsize, Ordering};

pub struct MemoryPool {
    capacity: usize,
    allocated: AtomicUsize,
}

impl MemoryPool {
    pub const fn new(cap: usize) -> Self {
        Self {
            capacity: cap,
            allocated: AtomicUsize::new(0),
        }
    }

    pub fn allocate(&self, size: usize) -> Result<usize, &'static str> {
        let current = self.allocated.load(Ordering::Relaxed);
        if current + size > self.capacity {
            return Err("Out of memory in kernel arena");
        }
        self.allocated.fetch_add(size, Ordering::SeqCst);
        println!("Allocated {} bytes. Total: {}", size, current + size);
        Ok(size)
    }
}
`
  },

  {
    id: 'notes-txt',
    name: 'notes.txt',
    language: 'text',
    content: `Spectrum Editor Customization Suite - Release Notes
==================================================

1. SVG File Icon Resolver:
   - High-fidelity SVG vector icons for 20+ file extensions.
   - getFileIcon(fileName) with safe fallback and compound extension detection.

2. Syntax Styling Engine:
   - Language-aware token classification for JS, Dart, HTML, Python, Rust, Go.
   - getTokenStyle(tokenType, language, theme) with dynamic CSS properties.
   - 5 Curated Color Themes: Obsidian, Tokyo Twilight, Cyberpunk, Nordic Frost, Solarized.

3. Live Interactive UI:
   - Real-time line-synced editor with live token inspector.
   - Add/switch custom files seamlessly.
`
  }
];
